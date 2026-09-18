import { useCallback, useEffect, useRef, useState } from "react";

import { GAME_STAGES } from "../data/gameStages";

import { STAGE_GEM_KNOWLEDGE } from "../data/gemKnowledge";

import { PLAYER_SPRITES } from "../data/playerSprites";

import { DEADLY_GEM_QUESTION, STAGE_ITEM_RULES } from "../data/stageItems";

import { ITEM_ASSETS } from "../data/itemAssets";

/* ======================================================
   GAME CONSTANTS
====================================================== */

const WORLD_WIDTH = 26000;

const CANVAS_WIDTH = 960;

const CANVAS_HEIGHT = 540;

const FLOOR_Y = 430;

const STAGE_GATE_OFFSET = 270;

/* Collision box của nhân vật */
const PLAYER_WIDTH = 38;

const PLAYER_HEIGHT = 72;

/* Kích thước sprite hiển thị */
const PLAYER_DRAW_MAX_WIDTH = 100;

const PLAYER_DRAW_HEIGHT = 96;

/* Physics */
const GRAVITY = 0.68;

const MAX_FALL_SPEED = 14;

const COYOTE_TIME = 120;

const JUMP_BUFFER_TIME = 130;

/* ======================================================
   MAIN HOOK
====================================================== */

export default function useGameEngine() {
  /* Canvas */

  const canvasRef = useRef(null);

  const frameRef = useRef(null);

  const lastTimeRef = useRef(0);

  /* Keyboard */

  const keysRef = useRef({});

  /* Assets */

  const spriteImagesRef = useRef({});

  const backgroundImagesRef = useRef({});

  const itemImagesRef = useRef({});

  /* Player */

  const playerRef = useRef(createInitialPlayer());

  /* Camera */

  const cameraRef = useRef({
    x: 0,
  });

  /* Stage items */

  const worldItemsRef = useRef([]);

  const chestsRef = useRef([]);

  const inventoryRef = useRef([]);

  const pendingQuestionItemRef = useRef(null);

  /* Completed stages */

  const completedRef = useRef([]);

  /* Current stage */

  const currentStageRef = useRef(0);

  const previousStageRef = useRef(0);

  const backgroundTransitionRef = useRef(1);

  /* React state */

  const [gameState, setGameState] = useState("intro");

  const [activeStage, setActiveStage] = useState(null);

  const [completedStages, setCompletedStages] = useState([]);

  const [collectedInsights, setCollectedInsights] = useState(0);

  const [clarity, setClarity] = useState(100);

  const [message, setMessage] = useState("");

  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const [inventory, setInventory] = useState([]);

  const [activeItemQuestion, setActiveItemQuestion] = useState(null);

  const [activeKnowledge, setActiveKnowledge] = useState(null);

  const [pickupNotice, setPickupNotice] = useState(null);

  useEffect(() => {
    if (!message) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setMessage((current) => (current === message ? "" : current));
    }, 3000);

    return () => window.clearTimeout(timeoutId);
  }, [message]);

  /* ======================================================
     PRELOAD IMAGES
  ====================================================== */

  useEffect(() => {
    /* Sprite */

    const loadedSprites = {};

    Object.entries(PLAYER_SPRITES).forEach(([animation, frames]) => {
      loadedSprites[animation] = frames.map((src) => {
        const image = new Image();

        image.src = src;

        return image;
      });
    });

    spriteImagesRef.current = loadedSprites;

    /* Background */

    const backgrounds = {};

    GAME_STAGES.forEach((stage) => {
      if (!stage.background) {
        return;
      }

      const image = new Image();

      image.src = stage.background;

      backgrounds[stage.id] = image;
    });

    backgroundImagesRef.current = backgrounds;

    const itemImages = {};

    Object.entries(ITEM_ASSETS).forEach(([name, src]) => {
      const image = new Image();

      image.src = src;

      itemImages[name] = image;
    });

    itemImagesRef.current = itemImages;
  }, []);

  /* ======================================================
     SYNC COMPLETED REF
  ====================================================== */

  useEffect(() => {
    completedRef.current = completedStages;
  }, [completedStages]);

  /* ======================================================
     START / RESET GAME
  ====================================================== */

  const startGame = useCallback(() => {
    playerRef.current = createInitialPlayer();

    cameraRef.current.x = 0;

    const world = createWorldObjects();

    worldItemsRef.current = world.items;

    chestsRef.current = world.chests;

    inventoryRef.current = [];

    pendingQuestionItemRef.current = null;

    completedRef.current = [];

    currentStageRef.current = 0;

    previousStageRef.current = 0;

    backgroundTransitionRef.current = 1;

    lastTimeRef.current = 0;

    setCompletedStages([]);

    setCollectedInsights(0);

    setClarity(100);

    setActiveStage(null);

    setMessage("");

    setCurrentStageIndex(0);

    setInventory([]);

    setActiveItemQuestion(null);

    setActiveKnowledge(null);

    setPickupNotice(null);

    setGameState("playing");
  }, []);

  /* ======================================================
     INTERACTION
  ====================================================== */

  const interact = useCallback(() => {
    const player = playerRef.current;

    const nearest = getNearestStage(player.x);

    if (!nearest) {
      setMessage("Hãy đến gần một mốc lịch sử để tương tác.");

      return;
    }

    if (completedRef.current.includes(nearest.id)) {
      setMessage("");

      return;
    }

    const stageIndex = GAME_STAGES.findIndex(
      (stage) => stage.id === nearest.id,
    );

    /* Không được bỏ qua stage trước */

    if (
      stageIndex > 0 &&
      !completedRef.current.includes(GAME_STAGES[stageIndex - 1].id)
    ) {
      setMessage("Bạn cần hoàn thành bước ngoặt trước đó.");

      return;
    }

    const rule = STAGE_ITEM_RULES[nearest.id];

    const collectedGems = inventoryRef.current.filter(
      (item) => item.type === "gem" && item.stageId === nearest.id,
    ).length;

    if (collectedGems < rule.requiredGems) {
      setMessage(
        `Bạn cần nộp đủ ${rule.requiredGems} viên ngọc của giai đoạn này (${collectedGems}/${rule.requiredGems}).`,
      );

      return;
    }

    setMessage("");

    setActiveStage(nearest);

    setGameState("challengeNotice");
  }, []);

  const acceptStageChallenge = useCallback(() => {
    if (!activeStage) {
      return;
    }

    setGameState("dialog");
  }, [activeStage]);

  const openInventory = useCallback(() => {
    if (gameState !== "playing") {
      return;
    }

    keysRef.current = {};

    setGameState("inventory");
  }, [gameState]);

  const closeInventory = useCallback(() => {
    setGameState("playing");
  }, []);

  const openNearbyChest = useCallback(() => {
    if (gameState !== "playing") {
      return;
    }

    const playerCenter = playerRef.current.x + playerRef.current.width / 2;
    const chest = chestsRef.current.find(
      (candidate) =>
        !candidate.opened && Math.abs(candidate.x - playerCenter) < 72,
    );

    if (!chest) {
      setMessage("Không có hộp nào đủ gần để mở.");

      return;
    }

    if (chest.locked) {
      const keyIndex = inventoryRef.current.findIndex(
        (item) => item.type === "key" && item.keyId === chest.keyId,
      );

      if (keyIndex < 0) {
        setMessage(`Hộp ${chest.number} cần đúng chìa khóa mới có thể mở.`);

        return;
      }

      const nextInventory = [...inventoryRef.current];

      nextInventory.splice(keyIndex, 1);

      updateInventory(nextInventory);
    }

    chest.opened = true;

    if (chest.contents.length === 0) {
      setMessage(`Hộp ${chest.number} không có vật phẩm.`);

      return;
    }

    const specialGem = chest.contents.find((item) => item.question);
    const knowledgeGems = chest.contents.filter((item) => !item.question);

    releaseChestGems(chest, knowledgeGems);

    if (specialGem) {
      startItemQuestion(specialGem);
    } else if (knowledgeGems.length > 0) {
      setMessage(
        `Hộp ${chest.number} đã mở. Hãy chạm vào ${knowledgeGems.length} viên ngọc phía trên hộp để nhận kiến thức.`,
      );
    } else {
      setMessage(`Hộp ${chest.number} không có vật phẩm.`);
    }
  }, [gameState]);

  /* ======================================================
     KEYBOARD INPUT
  ====================================================== */

  useEffect(() => {
    const keyDown = (event) => {
      const key = event.key.toLowerCase();

      if (["arrowleft", "arrowright", "arrowup", " "].includes(key)) {
        event.preventDefault();
      }

      keysRef.current[key] = true;

      /* Jump buffer */

      if (!event.repeat && (key === " " || key === "w" || key === "arrowup")) {
        playerRef.current.jumpQueuedUntil =
          performance.now() + JUMP_BUFFER_TIME;
      }

      /* E interact */

      if (!event.repeat && key === "e" && gameState === "playing") {
        interact();
      }

      if (!event.repeat && key === "o" && gameState === "playing") {
        openNearbyChest();
      }

      if (!event.repeat && (key === "b" || key === "i") && gameState === "playing") {
        openInventory();
      }

      /* ESC */

      if (key === "escape" && gameState === "dialog") {
        setActiveStage(null);

        setGameState("playing");
      }

      if (key === "escape" && gameState === "inventory") {
        closeInventory();
      }
    };

    const keyUp = (event) => {
      const key = event.key.toLowerCase();

      keysRef.current[key] = false;

      /*
       Nhả nút nhảy sớm
       => nhân vật nhảy thấp hơn.
      */

      if (
        (key === " " || key === "w" || key === "arrowup") &&
        playerRef.current.vy < -4
      ) {
        playerRef.current.vy *= 0.55;
      }
    };

    window.addEventListener("keydown", keyDown);

    window.addEventListener("keyup", keyUp);

    return () => {
      window.removeEventListener("keydown", keyDown);

      window.removeEventListener("keyup", keyUp);
    };
  }, [gameState, interact, openNearbyChest, openInventory, closeInventory]);

  /* ======================================================
     MOBILE CONTROL
  ====================================================== */

  const setControl = useCallback((control, active) => {
    keysRef.current[control] = active;

    if (control === "jump" && active) {
      playerRef.current.jumpQueuedUntil = performance.now() + JUMP_BUFFER_TIME;
    }

    if (control === "jump" && !active && playerRef.current.vy < -4) {
      playerRef.current.vy *= 0.55;
    }
  }, []);

  /* ======================================================
     ANSWER STAGE
  ====================================================== */

  const answerStage = useCallback(
    (selectedIndex, question) => {
      if (!activeStage || !question) {
        return false;
      }

      const correct = selectedIndex === question.answer;

      if (!correct) {
        setClarity((old) => Math.max(0, old - 10));

        return false;
      }

      setMessage("");

      return true;
    },
    [activeStage],
  );

  const completeStageChallenge = useCallback(() => {
    if (!activeStage) {
      return;
    }

    if (!completedRef.current.includes(activeStage.id)) {
      const nextCompleted = [...completedRef.current, activeStage.id];

      completedRef.current = nextCompleted;

      setCompletedStages(nextCompleted);
    }

    const isLastStage =
      activeStage.id === GAME_STAGES[GAME_STAGES.length - 1].id;

    setActiveStage(null);
    updateInventory([]);
    setGameState("playing");
    setMessage(
      "Bạn đã hoàn thành thử thách, vui lòng trải nghiệm giai đoạn tiếp theo.",
    );

    if (isLastStage) {
      window.setTimeout(() => {
        setGameState("complete");
      }, 3000);
    }
  }, [activeStage]);

  const answerItemQuestion = useCallback((selectedIndex) => {
    const question = activeItemQuestion;
    const item = pendingQuestionItemRef.current;

    if (!question || !item) {
      return false;
    }

    const correct = selectedIndex === question.answer;

    if (!correct && question.deadly) {
      item.collected = true;
      pendingQuestionItemRef.current = null;
      setActiveItemQuestion(null);
      setGameState("gameover");

      return false;
    }

    if (!correct) {
      setClarity((value) => Math.max(0, value - 5));

      return false;
    }

    item.collected = true;
    item.pending = false;

    if (!question.deadly) {
      collectRealGem(item);
      setMessage(`Trả lời đúng và nhận viên ngọc ${item.gemId}.`);
    } else {
      setMessage("Bạn đã vượt qua viên ngọc chết chóc.");
    }

    pendingQuestionItemRef.current = null;
    setActiveItemQuestion(null);
    setGameState("playing");

    return true;
  }, [activeItemQuestion]);

  /* ======================================================
     CLOSE DIALOG
  ====================================================== */

  const closeDialog = useCallback(() => {
    setActiveStage(null);

    setMessage("");

    setGameState("playing");
  }, []);

  const closeKnowledge = useCallback(() => {
    setActiveKnowledge(null);
    setMessage("");
    setGameState("playing");
  }, []);

  const viewPickedItem = useCallback(() => {
    if (!pickupNotice) {
      return;
    }

    if (pickupNotice.kind === "knowledge") {
      setActiveKnowledge(pickupNotice.payload);
      setPickupNotice(null);
      setGameState("knowledge");

      return;
    }

    setActiveItemQuestion(pickupNotice.payload);
    setPickupNotice(null);
    setGameState("itemQuestion");
  }, [pickupNotice]);

  function updateInventory(nextInventory) {
    inventoryRef.current = nextInventory;

    setInventory(nextInventory);
  }

  function collectRealGem(item) {
    if (inventoryRef.current.some((entry) => entry.instanceId === item.id)) {
      return;
    }

    item.collected = true;
    item.pending = false;

    const inventoryItem = {
      instanceId: item.id,
      type: "gem",
      stageId: item.stageId,
      label: item.knowledge
        ? `Viên ngọc ${item.gemId}: ${item.knowledge.title}`
        : `Viên ngọc ${item.gemId}`,
      shortLabel: item.gemId,
      knowledge: item.knowledge || null,
      question: item.question
        ? {
            text: item.question.question,
            correctAnswer: item.question.options[item.question.answer],
          }
        : null,
    };

    updateInventory([...inventoryRef.current, inventoryItem].slice(0, 25));
    setCollectedInsights((value) => value + 1);
    setClarity((value) => Math.min(100, value + 3));

    if (item.knowledge) {
      const stage = GAME_STAGES.find((candidate) => candidate.id === item.stageId);

      keysRef.current = {};
      setMessage("");
      setPickupNotice({
        kind: "knowledge",
        payload: {
          ...item.knowledge,
          gemId: item.gemId,
          year: stage?.year || item.stageId,
          stageTitle: stage?.title || "Kiến thức lịch sử",
        },
      });
      setGameState("pickupNotice");
    }
  }

  function releaseChestGems(chest, gems) {
    if (gems.length === 0) {
      return;
    }

    const spread = 74;

    gems.forEach((gem, index) => {
      if (gem.released || gem.collected) {
        return;
      }

      const centeredIndex = index - (gems.length - 1) / 2;

      gem.x = chest.x + centeredIndex * spread;
      gem.y = FLOOR_Y - 88 - (index % 2) * 52;
      gem.released = true;
      gem.fromChest = true;

      worldItemsRef.current.push(gem);
    });
  }

  function collectRealKey(item) {
    item.collected = true;

    updateInventory([
      ...inventoryRef.current,
      {
        instanceId: item.id,
        type: "key",
        stageId: item.stageId,
        keyId: item.keyId,
        label: `Chìa khóa mở hộp ${item.chestNumber}`,
        shortLabel: `K${item.chestNumber}`,
      },
    ].slice(0, 25));

    setMessage(`Đã nhặt chìa khóa mở hộp ${item.chestNumber}.`);
  }

  function startItemQuestion(item) {
    item.pending = true;
    pendingQuestionItemRef.current = item;
    keysRef.current = {};
    setPickupNotice({
      kind: item.question.deadly ? "deadly" : "quiz",
      payload: item.question,
    });
    setGameState("pickupNotice");
  }

  /* ======================================================
     GAME LOOP
  ====================================================== */

  useEffect(() => {
    if (gameState !== "playing") {
      return;
    }

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    let mounted = true;

    const loop = (timestamp) => {
      if (!mounted) {
        return;
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      /*
       delta normalized:
       1 ≈ 60 FPS.
      */

      const rawDelta = (timestamp - lastTimeRef.current) / 16.6667;

      const delta = Math.min(2, Math.max(0.25, rawDelta));

      lastTimeRef.current = timestamp;

      update(delta, timestamp);

      render(ctx, canvas, delta);

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      mounted = false;

      lastTimeRef.current = 0;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [gameState]);

  /* ======================================================
     UPDATE GAME
  ====================================================== */

  function update(delta, now) {
    const player = playerRef.current;

    const keys = keysRef.current;

    /* ========================================
       MOVEMENT INPUT
    ======================================== */

    const movingLeft = Boolean(keys.arrowleft || keys.a || keys.left);

    const movingRight = Boolean(keys.arrowright || keys.d || keys.right);

    /* Acceleration */

    if (movingLeft) {
      player.vx -= player.acceleration * delta;

      player.direction = -1;
    }

    if (movingRight) {
      player.vx += player.acceleration * delta;

      player.direction = 1;
    }

    /* Clamp speed */

    player.vx = clamp(player.vx, -player.maxSpeed, player.maxSpeed);

    /*
     Không bấm trái/phải
     => friction.
    */

    if (!movingLeft && !movingRight) {
      player.vx *= Math.pow(player.friction, delta);
    }

    if (Math.abs(player.vx) < 0.04) {
      player.vx = 0;
    }

    /* ========================================
       COYOTE TIME
    ======================================== */

    if (player.onGround) {
      player.lastGroundedAt = now;
    }

    const canJump =
      player.onGround || now - player.lastGroundedAt < COYOTE_TIME;

    /* ========================================
       JUMP BUFFER
    ======================================== */

    if (player.jumpQueuedUntil > now && canJump) {
      player.vy = player.jumpForce;

      player.onGround = false;

      player.jumpQueuedUntil = 0;
    }

    /* ========================================
       GRAVITY
    ======================================== */

    player.vy += GRAVITY * delta;

    player.vy = Math.min(player.vy, MAX_FALL_SPEED);

    /* ========================================
       POSITION
    ======================================== */

    player.x += player.vx * delta;

    player.y += player.vy * delta;

    /* ========================================
       FLOOR COLLISION
    ======================================== */

    if (player.y + player.height >= FLOOR_Y) {
      player.y = FLOOR_Y - player.height;

      player.vy = 0;

      player.onGround = true;

      player.lastGroundedAt = now;
    }

    /* World boundary */

    player.x = clamp(player.x, 25, WORLD_WIDTH - player.width - 25);

    /* ========================================
       GATES
    ======================================== */

    applyStageGates(player);

    /* ========================================
       COLLECT
    ======================================== */

    checkWorldItems(player);

    /* ========================================
       DETECT CURRENT ERA
    ======================================== */

    detectCurrentStage(player.x);

    /* ========================================
       PLAYER ANIMATION
    ======================================== */

    updatePlayerAnimation(player, now);

    /* ========================================
       CAMERA
    ======================================== */

    updateCamera(player, delta);

    /* Background crossfade */

    if (backgroundTransitionRef.current < 1) {
      backgroundTransitionRef.current = Math.min(
        1,
        backgroundTransitionRef.current + 0.025 * delta,
      );
    }
  }

  /* ======================================================
     CAMERA
  ====================================================== */

  function updateCamera(player, delta) {
    /*
     Nhân vật nằm hơi lệch trái
     để nhìn được phía trước.
    */

    const targetCamera = player.x - CANVAS_WIDTH * 0.34;

    const smoothness = 1 - Math.pow(0.88, delta);

    cameraRef.current.x += (targetCamera - cameraRef.current.x) * smoothness;

    cameraRef.current.x = clamp(
      cameraRef.current.x,
      0,
      WORLD_WIDTH - CANVAS_WIDTH,
    );
  }

  /* ======================================================
     STAGE DETECTION
  ====================================================== */

  function detectCurrentStage(playerX) {
    let detectedIndex = 0;

    for (let index = 0; index < GAME_STAGES.length - 1; index++) {
      const current = GAME_STAGES[index];
      const nextStageStart = current.x + STAGE_GATE_OFFSET;

      if (playerX >= nextStageStart) {
        detectedIndex = index + 1;
      }
    }

    if (detectedIndex === currentStageRef.current) {
      return;
    }

    previousStageRef.current = currentStageRef.current;

    currentStageRef.current = detectedIndex;

    backgroundTransitionRef.current = 0;

    setCurrentStageIndex(detectedIndex);
  }

  /* ======================================================
     GATES
  ====================================================== */

  function applyStageGates(player) {
    GAME_STAGES.forEach((stage, index) => {
      /*
         Stage cuối không cần gate.
        */

      if (index >= GAME_STAGES.length - 1) {
        return;
      }

      if (completedRef.current.includes(stage.id)) {
        return;
      }

      const gateX = stage.x + STAGE_GATE_OFFSET;

      /*
         Không cho đi qua bên phải
         khi gate còn khóa.
        */

      const rightEdge = player.x + player.width;

      if (rightEdge > gateX && player.x < gateX + 80 && player.vx >= 0) {
        player.x = gateX - player.width - 1;

        player.vx = 0;

        setMessage(
          `Hoàn thành bước ngoặt ${stage.year} để mở khóa con đường phía trước.`,
        );
      }
    });
  }

  /* ======================================================
     COLLECTIBLES
  ====================================================== */

  function checkWorldItems(player) {
    for (const item of worldItemsRef.current) {
      if (item.collected || item.pending) {
        continue;
      }

      const playerCenterX = player.x + player.width / 2;

      const playerCenterY = player.y + player.height / 2;

      const dx = playerCenterX - item.x;

      const dy = playerCenterY - item.y;

      if (Math.abs(dx) < 32 && Math.abs(dy) < 55) {
        if (item.type === "gem") {
          if (item.question) {
            startItemQuestion(item);
          } else {
            collectRealGem(item);
          }

          return;
        }

        item.collected = true;

        if (item.type === "key") {
          collectRealKey(item);
        } else if (item.type === "fakeKey") {
          setMessage("Đây là chìa khóa giả và không thể cho vào balo.");
        } else if (item.type === "deadlyGem") {
          item.collected = false;
          startItemQuestion(item);
        } else {
          setMessage(
            item.gemId
              ? `Ngọc ${item.gemId} là ngọc giả và không thể cho vào balo.`
              : "Đây là viên ngọc giả và không thể cho vào balo.",
          );
        }

        return;
      }
    }
  }

  /* ======================================================
     PLAYER ANIMATION
  ====================================================== */

  function updatePlayerAnimation(player, now) {
    let nextAnimation = "idle";

    if (!player.onGround) {
      nextAnimation = player.vy < 1 ? "jump" : "fall";
    } else if (Math.abs(player.vx) > 0.25) {
      nextAnimation = "walk";
    }

    /* Animation changed */

    if (nextAnimation !== player.animation) {
      player.animation = nextAnimation;

      player.frame = 0;

      player.lastFrameAt = now;
    }

    const frames = spriteImagesRef.current[player.animation];

    if (!frames || frames.length === 0) {
      return;
    }

    /* Jump có frame theo độ cao */

    if (player.animation === "jump") {
      if (frames.length === 1) {
        player.frame = 0;
      } else if (player.vy < -7) {
        player.frame = 0;
      } else if (player.vy < -2) {
        player.frame = Math.min(1, frames.length - 1);
      } else {
        player.frame = frames.length - 1;
      }

      return;
    }

    /* Fall */

    if (player.animation === "fall") {
      player.frame = 0;

      return;
    }

    /* FPS */

    let fps = 5;

    if (player.animation === "walk") {
      /*
       Chạy nhanh =>
       animation chân nhanh hơn.
      */

      const speedRatio = Math.abs(player.vx) / player.maxSpeed;

      fps = 7 + speedRatio * 6;
    }

    const interval = 1000 / fps;

    if (now - player.lastFrameAt >= interval) {
      player.lastFrameAt = now;

      player.frame = (player.frame + 1) % frames.length;
    }
  }

  /* ======================================================
     RENDER
  ====================================================== */

  function render(ctx, canvas) {
    const cameraX = cameraRef.current.x;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackground(ctx, canvas);

    drawWorld(ctx, cameraX, canvas.width);

    drawStages(ctx, cameraX);

    drawChests(ctx, cameraX);

    drawWorldItems(ctx, cameraX);

    drawPlayer(ctx, cameraX);

    drawInteractionHint(ctx, cameraX);
  }

  /* ======================================================
     BACKGROUND
  ====================================================== */

  function drawBackground(ctx, canvas) {
    const currentStage = GAME_STAGES[currentStageRef.current];

    const previousStage = GAME_STAGES[previousStageRef.current];

    const currentImage = backgroundImagesRef.current[currentStage?.id];

    const previousImage = backgroundImagesRef.current[previousStage?.id];

    const transition = backgroundTransitionRef.current;

    /* Base fallback */

    drawBackgroundFallback(ctx, canvas, currentStageRef.current);

    /*
     Previous image.
    */

    if (previousImage && isImageReady(previousImage)) {
      ctx.save();

      ctx.globalAlpha = 1 - transition;

      drawCoverImage(ctx, previousImage, canvas);

      ctx.restore();
    }

    /*
     Current image.
    */

    if (currentImage && isImageReady(currentImage)) {
      ctx.save();

      ctx.globalAlpha = transition;

      drawCoverImage(ctx, currentImage, canvas);

      ctx.restore();
    }

    /*
     Dark overlay giúp sprite,
     checkpoint dễ nhìn.
    */

    const overlay = ctx.createLinearGradient(0, 0, 0, canvas.height);

    overlay.addColorStop(0, "rgba(7,10,16,0.18)");

    overlay.addColorStop(0.58, "rgba(7,10,16,0.22)");

    overlay.addColorStop(1, "rgba(7,10,16,0.66)");

    ctx.fillStyle = overlay;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  /* ======================================================
     WORLD / GROUND
  ====================================================== */

  function drawWorld(ctx, cameraX, width) {
    /*
     Ground semi transparent
     để vẫn thấy background.
    */

    const groundGradient = ctx.createLinearGradient(
      0,
      FLOOR_Y,
      0,
      CANVAS_HEIGHT,
    );

    groundGradient.addColorStop(0, "rgba(32,30,28,.92)");

    groundGradient.addColorStop(1, "rgba(14,14,16,.98)");

    ctx.fillStyle = groundGradient;

    ctx.fillRect(0, FLOOR_Y, width, CANVAS_HEIGHT - FLOOR_Y);

    ctx.strokeStyle = "rgba(222,190,120,.28)";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(0, FLOOR_Y);

    ctx.lineTo(width, FLOOR_Y);

    ctx.stroke();

    /*
     Timeline ticks.
    */

    for (let x = 0; x < WORLD_WIDTH; x += 200) {
      const sx = x - cameraX;

      if (sx < -50 || sx > width + 50) {
        continue;
      }

      ctx.fillStyle = "rgba(255,255,255,.08)";

      ctx.fillRect(sx, FLOOR_Y + 20, 2, 18);
    }
  }

  /* ======================================================
     STAGE CHECKPOINTS
  ====================================================== */

  function drawStages(ctx, cameraX) {
    GAME_STAGES.forEach((stage, index) => {
      const x = stage.x - cameraX;

      if (x < -300 || x > CANVAS_WIDTH + 300) {
        return;
      }

      const completed = completedRef.current.includes(stage.id);

      /* Glow */

      const glow = ctx.createRadialGradient(
        x,
        FLOOR_Y - 110,
        5,
        x,
        FLOOR_Y - 110,
        100,
      );

      glow.addColorStop(
        0,
        completed ? "rgba(76,197,138,.24)" : "rgba(217,173,89,.20)",
      );

      glow.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = glow;

      ctx.beginPath();

      ctx.arc(x, FLOOR_Y - 110, 100, 0, Math.PI * 2);

      ctx.fill();

      /* Pillar */

      ctx.fillStyle = completed ? "#4cc58a" : "#d9ad59";

      ctx.fillRect(x - 2, FLOOR_Y - 160, 4, 160);

      /* Node */

      ctx.beginPath();

      ctx.arc(x, FLOOR_Y - 160, 12, 0, Math.PI * 2);

      ctx.fill();

      /* Year */

      ctx.textAlign = "center";

      ctx.fillStyle = "#ffffff";

      ctx.font = "700 17px system-ui";

      ctx.fillText(stage.year, x, FLOOR_Y - 205);

      /* Title */

      ctx.fillStyle = "rgba(255,255,255,.74)";

      ctx.font = "13px system-ui";

      drawWrappedText(ctx, stage.title, x, FLOOR_Y - 184, 220, 18);

      /* Gate */

      if (index < GAME_STAGES.length - 1 && !completed) {
        drawGate(ctx, stage.x + 270 - cameraX);
      }
    });
  }

  function drawGate(ctx, x) {
    ctx.save();

    ctx.fillStyle = "rgba(217,173,89,.22)";

    ctx.fillRect(x - 8, FLOOR_Y - 132, 16, 132);

    ctx.strokeStyle = "rgba(217,173,89,.65)";

    ctx.lineWidth = 2;

    ctx.strokeRect(x - 8, FLOOR_Y - 132, 16, 132);

    ctx.fillStyle = "#e5bd6c";

    ctx.textAlign = "center";

    ctx.font = "700 11px system-ui";

    ctx.fillText("LOCKED", x, FLOOR_Y - 145);

    ctx.restore();
  }

  /* ======================================================
     COLLECTIBLES
  ====================================================== */

  function drawChests(ctx, cameraX) {
    chestsRef.current.forEach((chest) => {
      const x = chest.x - cameraX;

      if (x < -70 || x > CANVAS_WIDTH + 70) {
        return;
      }

      const image = chest.opened
        ? itemImagesRef.current.openChest
        : itemImagesRef.current.closedChest;

      if (isImageReady(image)) {
        const width = chest.opened ? 58 : 54;
        const height = chest.opened ? 60 : 52;

        ctx.drawImage(image, x - width / 2, FLOOR_Y - height, width, height);
      } else {
        ctx.fillStyle = chest.opened ? "#9e5549" : "#c46c5b";
        ctx.fillRect(x - 24, FLOOR_Y - 42, 48, 42);
      }

      if (chest.locked && !chest.opened) {
        ctx.fillStyle = "#f6d776";
        ctx.font = "700 11px system-ui";
        ctx.textAlign = "center";
        ctx.fillText("🔒", x, FLOOR_Y - 52);
      }
    });
  }

  function drawWorldItems(ctx, cameraX) {
    const now = performance.now();

    worldItemsRef.current.forEach((item) => {
      if (item.collected || item.pending) {
        return;
      }

      const x = item.x - cameraX;

      if (x < -30 || x > CANVAS_WIDTH + 30) {
        return;
      }

      const bob = Math.sin(now / 350 + item.x) * 5;

      const y = item.y + bob;

      if (item.type === "key" || item.type === "fakeKey") {
        const keyImage = itemImagesRef.current.key;

        ctx.save();

        if (isImageReady(keyImage)) {
          ctx.drawImage(keyImage, x - 17, y - 25, 34, 34);
        } else {
          ctx.fillStyle = "#d6a85d";
          ctx.fillRect(x - 4, y - 20, 8, 28);
        }

        ctx.restore();

        return;
      }

      /*
         Outer glow.
        */

      const glow = ctx.createRadialGradient(x, y, 2, x, y, 23);

      const dangerous = item.type === "deadlyGem";

      glow.addColorStop(
        0,
        dangerous
          ? "rgba(218,165,55,.68)"
          : "rgba(246,215,118,.6)",
      );

      glow.addColorStop(1, "rgba(246,215,118,0)");

      ctx.fillStyle = glow;

      ctx.beginPath();

      ctx.arc(x, y, 23, 0, Math.PI * 2);

      ctx.fill();

      /*
         Core.
        */

      ctx.fillStyle = dangerous ? "#d4a43d" : "#f6d776";

      ctx.beginPath();

      ctx.arc(x, y, 7, 0, Math.PI * 2);

      ctx.fill();

      ctx.strokeStyle = dangerous
        ? "rgba(245,205,115,.72)"
        : "rgba(255,240,180,.6)";

      ctx.lineWidth = 1;

      ctx.beginPath();

      ctx.arc(x, y, 14, 0, Math.PI * 2);

      ctx.stroke();
    });
  }

  /* ======================================================
     PLAYER SPRITE
  ====================================================== */

  function drawPlayer(ctx, cameraX) {
    const player = playerRef.current;

    const screenX = player.x - cameraX;

    const screenY = player.y;

    /* Shadow */

    const heightAboveGround = Math.max(0, FLOOR_Y - (player.y + player.height));

    const shadowScale = clamp(1 - heightAboveGround / 220, 0.35, 1);

    ctx.save();

    ctx.fillStyle = `rgba(0,0,0,${0.3 * shadowScale})`;

    ctx.beginPath();

    ctx.ellipse(
      screenX + player.width / 2,
      FLOOR_Y + 3,
      27 * shadowScale,
      7 * shadowScale,
      0,
      0,
      Math.PI * 2,
    );

    ctx.fill();

    ctx.restore();

    /* Sprite */

    const frames = spriteImagesRef.current[player.animation];

    if (!frames || frames.length === 0) {
      drawPlayerFallback(ctx, screenX, screenY, player);

      return;
    }

    const frameIndex = clamp(player.frame, 0, frames.length - 1);

    const image = frames[frameIndex];

    if (!isImageReady(image)) {
      drawPlayerFallback(ctx, screenX, screenY, player);

      return;
    }

    /*
     Sprite rộng hơn hitbox.
     Canh giữa ảnh trên collision box.
    */

    const spriteScale = Math.min(
      PLAYER_DRAW_MAX_WIDTH / image.naturalWidth,
      PLAYER_DRAW_HEIGHT / image.naturalHeight,
    );

    const drawWidth = image.naturalWidth * spriteScale;

    const drawHeight = image.naturalHeight * spriteScale;

    const drawX = screenX - (drawWidth - player.width) / 2;

    const drawY = player.y + player.height - drawHeight;

    ctx.save();

    /*
     Flip horizontal
     nếu quay trái.
    */

    if (player.direction === -1) {
      ctx.translate(drawX + drawWidth, 0);

      ctx.scale(-1, 1);

      ctx.drawImage(image, 0, drawY, drawWidth, drawHeight);
    } else {
      ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
    }

    ctx.restore();
  }

  /* ======================================================
     FALLBACK CHARACTER
  ====================================================== */

  function drawPlayerFallback(ctx, x, y, player) {
    ctx.save();

    /* Body */

    ctx.fillStyle = "#dfc16f";

    ctx.fillRect(x + 8, y + 24, 22, 35);

    /* Head */

    ctx.fillStyle = "#f0d2af";

    ctx.beginPath();

    ctx.arc(x + 19, y + 13, 11, 0, Math.PI * 2);

    ctx.fill();

    /* Legs */

    ctx.fillStyle = "#776447";

    ctx.fillRect(x + 8, y + 56, 8, 16);

    ctx.fillRect(x + 22, y + 56, 8, 16);

    ctx.restore();
  }

  /* ======================================================
     INTERACTION UI
  ====================================================== */

  function drawInteractionHint(ctx, cameraX) {
    const player = playerRef.current;

    const playerCenter = player.x + player.width / 2;

    const nearbyChest = chestsRef.current.find(
      (chest) => !chest.opened && Math.abs(chest.x - playerCenter) < 72,
    );

    if (nearbyChest) {
      drawHintBox(
        ctx,
        nearbyChest.x - cameraX,
        FLOOR_Y - 105,
        "O  ·  Mở hộp",
      );

      return;
    }

    const stage = getNearestStage(player.x);

    if (!stage || completedRef.current.includes(stage.id)) {
      return;
    }

    const x = stage.x - cameraX;

    drawHintBox(ctx, x, FLOOR_Y - 285, "E  ·  Nộp ngọc");
  }

  function drawHintBox(ctx, x, y, text) {
    const boxWidth = 148;
    const boxHeight = 38;
    const bx = x - boxWidth / 2;

    ctx.save();
    ctx.fillStyle = "rgba(10,12,16,.85)";
    roundRect(ctx, bx, y, boxWidth, boxHeight, 9);
    ctx.fill();
    ctx.strokeStyle = "rgba(217,173,89,.4)";
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.font = "700 13px system-ui";
    ctx.fillText(text, x, y + 24);
    ctx.restore();
  }

  /* ======================================================
     RETURN
  ====================================================== */

  return {
    canvasRef,

    gameState,

    activeStage,

    currentStage: GAME_STAGES[currentStageIndex],

    currentStageIndex,

    completedStages,

    collectedInsights,

    clarity,

    message,

    inventory,

    activeItemQuestion,

    activeKnowledge,

    pickupNotice,

    requiredGems: STAGE_ITEM_RULES[GAME_STAGES[currentStageIndex].id].requiredGems,

    stageGems: inventory.filter((item) => item.type === "gem").length,

    keyCount: inventory.filter((item) => item.type === "key").length,

    startGame,

    answerStage,

    acceptStageChallenge,

    completeStageChallenge,

    setControl,

    interact,

    openNearbyChest,

    openInventory,

    closeInventory,

    answerItemQuestion,

    closeKnowledge,

    viewPickedItem,

    closeDialog,
  };
}

/* ======================================================
   INITIAL PLAYER
====================================================== */

function createInitialPlayer() {
  return {
    x: 120,

    y: FLOOR_Y - PLAYER_HEIGHT,

    width: PLAYER_WIDTH,

    height: PLAYER_HEIGHT,

    vx: 0,

    vy: 0,

    direction: 1,

    onGround: true,

    acceleration: 0.62,

    maxSpeed: 5.6,

    friction: 0.78,

    jumpForce: -13.2,

    lastGroundedAt: 0,

    jumpQueuedUntil: 0,

    animation: "idle",

    frame: 0,

    lastFrameAt: 0,
  };
}

/* ======================================================
   CREATE STAGE ITEMS
====================================================== */

function createWorldObjects() {
  const items = [];
  const chests = [];

  GAME_STAGES.forEach((stage, stageIndex) => {
    const rule = STAGE_ITEM_RULES[stage.id];
    const stageKnowledge = STAGE_GEM_KNOWLEDGE[stage.id] || [];
    const gems = stageKnowledge.map((knowledge) => ({
      id: `${stage.id}-gem-${knowledge.id}`,
      type: "gem",
      stageId: stage.id,
      gemId: knowledge.id,
      knowledge,
      collected: false,
    }));

    const previousStage = GAME_STAGES[stageIndex - 1];
    const zoneStart = previousStage ? previousStage.x + 325 : 220;
    const zoneEnd = stage.x - 125;
    const chestList = Array.from({ length: rule.chestCount }, (_, index) => {
      const number = index + 1;
      const locked = rule.lockedChests.includes(number);

      return {
        id: `${stage.id}-chest-${number}`,
        stageId: stage.id,
        number,
        x: distributeX(index, rule.chestCount, zoneStart, zoneEnd),
        locked,
        keyId: locked ? `${stage.id}-key-${number}` : null,
        opened: false,
        contents: [],
      };
    });

    const shuffledGems = shuffle([...gems]);
    const chestGems = shuffledGems.splice(0, rule.gemsInChests);
    const targetChests = shuffle([...chestList]).slice(
      0,
      Math.min(chestList.length, chestGems.length),
    );

    chestGems.forEach((gem, index) => {
      const chest = targetChests[index % targetChests.length];

      chest.contents.push(gem);
    });

    chests.push(...chestList);

    const looseItems = [...shuffledGems];

    chestList
      .filter((chest) => chest.locked)
      .forEach((chest) => {
        looseItems.push({
          id: `${chest.keyId}-pickup`,
          type: "key",
          stageId: stage.id,
          keyId: chest.keyId,
          chestNumber: chest.number,
          collected: false,
        });
      });

    for (let index = 0; index < rule.fakeKeys; index += 1) {
      looseItems.push({
        id: `${stage.id}-fake-key-${index + 1}`,
        type: "fakeKey",
        stageId: stage.id,
        collected: false,
      });
    }

    for (let index = 0; index < (rule.fakeGems || 0); index += 1) {
      looseItems.push({
        id: `${stage.id}-fake-gem-${index + 1}`,
        type: "fakeGem",
        stageId: stage.id,
        collected: false,
      });
    }

    for (const gemId of rule.convertedFakeGemIds || []) {
      looseItems.push({
        id: `${stage.id}-converted-fake-gem-${gemId}`,
        type: "fakeGem",
        stageId: stage.id,
        gemId,
        collected: false,
      });
    }

    if (rule.deadlyFakeGem) {
      looseItems.push({
        id: `${stage.id}-deadly-gem`,
        type: "deadlyGem",
        stageId: stage.id,
        question: DEADLY_GEM_QUESTION,
        collected: false,
      });
    }

    const distributedItems = shuffle(looseItems);

    distributedItems.forEach((item, index) => {
      const lane = index % 3;

      item.x = distributeX(index, distributedItems.length, zoneStart, zoneEnd);
      item.y = FLOOR_Y - 70 - lane * 48;
      items.push(item);
    });
  });

  return { items, chests };
}

function distributeX(index, count, start, end) {
  if (count <= 0) {
    return start;
  }

  return start + ((index + 1) / (count + 1)) * (end - start);
}

function shuffle(values) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));

    [values[index], values[target]] = [values[target], values[index]];
  }

  return values;
}

/* ======================================================
   NEAREST STAGE
====================================================== */

function getNearestStage(playerX) {
  let nearest = null;

  let nearestDistance = Infinity;

  GAME_STAGES.forEach((stage) => {
    const distance = Math.abs(playerX - stage.x);

    if (distance < nearestDistance && distance < 120) {
      nearest = stage;

      nearestDistance = distance;
    }
  });

  return nearest;
}

/* ======================================================
   BACKGROUND FALLBACK
====================================================== */

function drawBackgroundFallback(ctx, canvas, stageIndex) {
  /*
   Mỗi giai đoạn có tone khác nhau
   ngay cả khi ảnh chưa load.
  */

  const colors = [
    ["#132536", "#37281f"],
    ["#192038", "#332634"],
    ["#242033", "#3b2820"],
    ["#172a2a", "#23352a"],
    ["#29221b", "#442b20"],
    ["#20252a", "#312b28"],
    ["#18273a", "#272634"],
    ["#222329", "#352d27"],
  ];

  const pair = colors[stageIndex % colors.length];

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, pair[0]);

  gradient.addColorStop(1, pair[1]);

  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

/* ======================================================
   DRAW COVER IMAGE
====================================================== */

function drawCoverImage(ctx, image, canvas) {
  const imageRatio = image.width / image.height;

  const canvasRatio = canvas.width / canvas.height;

  let sourceWidth = image.width;

  let sourceHeight = image.height;

  let sourceX = 0;

  let sourceY = 0;

  if (imageRatio > canvasRatio) {
    sourceWidth = image.height * canvasRatio;

    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / canvasRatio;

    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.drawImage(
    image,

    sourceX,
    sourceY,

    sourceWidth,
    sourceHeight,

    0,
    0,

    canvas.width,
    canvas.height,
  );
}

/* ======================================================
   IMAGE READY
====================================================== */

function isImageReady(image) {
  return Boolean(image && image.complete && image.naturalWidth > 0);
}

/* ======================================================
   TEXT WRAP
====================================================== */

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");

  const lines = [];

  let currentLine = "";

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;

    const width = ctx.measureText(testLine).width;

    if (width > maxWidth && currentLine) {
      lines.push(currentLine);

      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * lineHeight);
  });
}

/* ======================================================
   ROUND RECT
====================================================== */

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();

  ctx.moveTo(x + r, y);

  ctx.lineTo(x + width - r, y);

  ctx.quadraticCurveTo(x + width, y, x + width, y + r);

  ctx.lineTo(x + width, y + height - r);

  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);

  ctx.lineTo(x + r, y + height);

  ctx.quadraticCurveTo(x, y + height, x, y + height - r);

  ctx.lineTo(x, y + r);

  ctx.quadraticCurveTo(x, y, x + r, y);

  ctx.closePath();
}

/* ======================================================
   CLAMP
====================================================== */

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
