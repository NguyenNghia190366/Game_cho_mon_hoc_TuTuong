export default function KnowledgeDialog({ knowledge, onContinue }) {
  if (!knowledge) {
    return null;
  }

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="game-dialog knowledge-dialog">
        <div className="dialog-year">{knowledge.year}</div>

        <h2>{knowledge.stageTitle}</h2>

        <div className="challenge-label">VIÊN NGỌC KIẾN THỨC {knowledge.gemId}</div>

        <div className="knowledge-content">
          <span>{knowledge.gemId}</span>
          <h3>{knowledge.title}</h3>

          <strong>Sự kiện và nội dung</strong>
          <p>{knowledge.event}</p>

          <strong>Ý nghĩa đối với tư tưởng</strong>
          <p>{knowledge.meaning}</p>

          <strong>Mối liên hệ</strong>
          <p>{knowledge.connection}</p>
        </div>

        <div className="dialog-actions">
          <button type="button" className="primary-button" onClick={onContinue}>
            TIẾP TỤC
          </button>
        </div>
      </div>
    </div>
  );
}
