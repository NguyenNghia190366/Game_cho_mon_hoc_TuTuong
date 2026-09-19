import GameCanvas from "./GameCanvas";

import GameHUD from "./GameHUD";

import GameDialog from "./GameDialog";

import GameIntro from "./GameIntro";

import GameResult from "./GameResult";

import GameOver from "./GameOver";

import InventoryPanel from "./InventoryPanel";

import ItemQuestionDialog from "./ItemQuestionDialog";

import KnowledgeDialog from "./KnowledgeDialog";

import PickupNotice from "./PickupNotice";

import StageChallengeNotice from "./StageChallengeNotice";

import { ITEM_ASSETS } from "./data/itemAssets";

import useGameEngine from "./hooks/useGameEngine";

import "./styles/game.css";

export default function ThoughtJourneyGame() {
  const {
    canvasRef,

    gameState,

    activeStage,

    currentStage,

    completedStages,

    collectedInsights,

    clarity,

    message,

    inventory,

    activeItemQuestion,

    activeKnowledge,

    pickupNotice,

    startedAt,

    finishedAt,

    requiredGems,

    stageGems,

    keyCount,

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
  } = useGameEngine();

  if (gameState === "intro") {
    return <GameIntro onStart={startGame} />;
  }

  if (gameState === "complete") {
    return (
      <GameResult
        insights={collectedInsights}
        clarity={clarity}
        startedAt={startedAt}
        finishedAt={finishedAt}
        onRestart={startGame}
      />
    );
  }

  if (gameState === "gameover") {
    return <GameOver onRestart={startGame} />;
  }

  return (
    <section className="thought-game">
      <GameHUD
        currentStage={currentStage}
        completedStages={completedStages}
        insights={collectedInsights}
        clarity={clarity}
        stageGems={stageGems}
        requiredGems={requiredGems}
        keyCount={keyCount}
      />

      <GameCanvas canvasRef={canvasRef} message={message} />

      <div className="game-controls">
        <button
          type="button"
          onPointerDown={() => setControl("left", true)}
          onPointerUp={() => setControl("left", false)}
        >
          ←
        </button>

        <button
          type="button"
          onPointerDown={() => setControl("right", true)}
          onPointerUp={() => setControl("right", false)}
        >
          →
        </button>

        <button
          type="button"
          onPointerDown={() => setControl("jump", true)}
          onPointerUp={() => setControl("jump", false)}
        >
          ↑
        </button>

        <button type="button" className="interact-button" onClick={interact}>
          E
        </button>

        <button type="button" className="chest-button" onClick={openNearbyChest}>
          O
        </button>

        <button
          type="button"
          className="inventory-button"
          onClick={openInventory}
          aria-label="Mở balo"
        >
          <img src={ITEM_ASSETS.backpack} alt="" />
        </button>
      </div>

      {gameState === "dialog" && activeStage && (
        <GameDialog
          key={activeStage.id}
          stage={activeStage}
          onAnswer={answerStage}
          onComplete={completeStageChallenge}
          onClose={closeDialog}
        />
      )}

      {gameState === "challengeNotice" && activeStage && (
        <StageChallengeNotice
          stage={activeStage}
          onAccept={acceptStageChallenge}
        />
      )}

      {gameState === "inventory" && (
        <InventoryPanel items={inventory} onClose={closeInventory} />
      )}

      {gameState === "itemQuestion" && activeItemQuestion && (
        <ItemQuestionDialog
          question={activeItemQuestion}
          onAnswer={answerItemQuestion}
        />
      )}

      {gameState === "knowledge" && activeKnowledge && (
        <KnowledgeDialog
          knowledge={activeKnowledge}
          onContinue={closeKnowledge}
        />
      )}

      {gameState === "pickupNotice" && pickupNotice && (
        <PickupNotice notice={pickupNotice} onView={viewPickedItem} />
      )}
    </section>
  );
}
