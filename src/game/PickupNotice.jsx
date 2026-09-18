export default function PickupNotice({ notice, onView }) {
  if (!notice) {
    return null;
  }

  const isQuiz = notice.kind === "quiz";
  const isDeadly = notice.kind === "deadly";

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="game-dialog pickup-notice">
        <div className="pickup-notice-gem" aria-hidden="true" />

        <div className="challenge-label">
          {isDeadly
            ? "NGỌC CHẾT CHÓC"
            : isQuiz
              ? "NGỌC CÓ CÂU HỎI"
              : "NGỌC KIẾN THỨC"}
        </div>

        <h2>
          {isDeadly
            ? "Bạn đã vô tình chạm vào viên ngọc chết chóc, hãy giải câu đố trong đây để an toàn."
            : isQuiz
              ? "Bạn đã nhặt được ngọc có câu hỏi, hãy trả lời câu hỏi này."
              : "Bạn đã nhặt được ngọc kiến thức, hãy xem kiến thức bên trong."}
        </h2>

        {isDeadly && (
          <p className="deadly-notice-rule">
            Trả lời sai: Trò chơi kết thúc · Trả lời đúng: An toàn
          </p>
        )}

        <button type="button" className="primary-button" onClick={onView}>
          XEM
        </button>
      </div>
    </div>
  );
}
