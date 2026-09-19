import { getStageQuestionCount } from "./data/stageQuizzes";

export default function StageChallengeNotice({ stage, onAccept }) {
  const questionCount = getStageQuestionCount(stage.id);

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="game-dialog stage-challenge-notice">
        <div className="dialog-year">{stage.year}</div>
        <div className="challenge-label">MỞ KHÓA THỬ THÁCH</div>

        <h2>Chúc mừng cậu đã thu thập đủ ngọc!</h2>

        <p>
          Để vượt qua mốc này, hãy vượt qua thêm thử thách bằng cách trả lời{" "}
          <strong>{questionCount} câu hỏi</strong> nhé.
        </p>

        <button type="button" className="primary-button" onClick={onAccept}>
          CHẤP NHẬN THỬ THÁCH
        </button>
      </div>
    </div>
  );
}
