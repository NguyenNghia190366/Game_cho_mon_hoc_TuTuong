import { GAME_STAGES } from "./data/gameStages";

export default function GameHUD({
  completedStages,
  insights,
  clarity,
  stageGems = 0,
  requiredGems = 0,
  keyCount = 0,
}) {
  const progress = (completedStages.length / GAME_STAGES.length) * 100;

  return (
    <div className="game-hud">
      <div className="hud-top">
        <div>
          <span className="hud-label">TIẾN TRÌNH TƯ TƯỞNG</span>

          <strong>
            {completedStages.length}/{GAME_STAGES.length}
          </strong>
        </div>

        <div>
          <span className="hud-label">NGỌC GIAI ĐOẠN</span>

          <strong>{stageGems}/{requiredGems}</strong>
        </div>

        <div>
          <span className="hud-label">CHÌA KHÓA</span>

          <strong>{keyCount}</strong>
        </div>

        <div>
          <span className="hud-label">ĐỘ SÁNG TỎ</span>

          <strong>{clarity}%</strong>
        </div>
      </div>

      <div className="game-progress">
        <div
          className="game-progress-value"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="thought-progress">
        {GAME_STAGES.map((stage) => {
          const unlocked = completedStages.includes(stage.id);

          return (
            <div
              key={stage.id}
              className={unlocked ? "thought-node unlocked" : "thought-node"}
            >
              <span />

              <small>{stage.year}</small>
            </div>
          );
        })}
      </div>

    </div>
  );
}
