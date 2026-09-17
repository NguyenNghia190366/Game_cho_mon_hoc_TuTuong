import { GAME_STAGES } from "./data/gameStages";

export default function GameResult({ insights, clarity, onRestart }) {
  return (
    <div className="game-result">
      <span className="result-kicker">HÀNH TRÌNH HOÀN THÀNH</span>

      <h2>
        1911
        <span>→</span>
        1969
      </h2>

      <div className="result-chain">
        {GAME_STAGES.map((stage, index) => (
          <div key={stage.id} className="result-stage">
            <span>{stage.year}</span>

            <strong>{stage.unlock}</strong>

            {index < GAME_STAGES.length - 1 && <b>↓</b>}
          </div>
        ))}
      </div>

      <div className="result-summary">
        <p>
          Toàn bộ hành trình thể hiện quá trình phát triển từ
          <strong> lòng yêu nước và tìm đường cứu nước</strong>, đến lựa chọn
          <strong> con đường cách mạng vô sản</strong>, hình thành đường lối
          cách mạng, giành chính quyền, bảo vệ độc lập và tiếp tục phát triển tư
          tưởng về xây dựng và thống nhất đất nước.
        </p>
      </div>

      <div className="result-stats">
        <div>
          <span>Mảnh nhận thức</span>

          <strong>{insights}</strong>
        </div>

        <div>
          <span>Độ sáng tỏ</span>

          <strong>{clarity}%</strong>
        </div>
      </div>

      <button type="button" className="start-game-button" onClick={onRestart}>
        CHƠI LẠI
      </button>
    </div>
  );
}
