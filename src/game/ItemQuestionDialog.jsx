import { useMemo, useState } from "react";

function shuffledOptions(question) {
  return question.options
    .map((text, originalIndex) => ({ text, originalIndex }))
    .sort(() => Math.random() - 0.5);
}

export default function ItemQuestionDialog({ question, onAnswer }) {
  const options = useMemo(() => shuffledOptions(question), [question]);
  const [wrongIndex, setWrongIndex] = useState(null);

  const select = (option, index) => {
    const correct = onAnswer(option.originalIndex);

    if (!correct) {
      setWrongIndex(index);
    }
  };

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="game-dialog item-question-dialog">
        <div className="challenge-label">
          {question.deadly ? "VIÊN NGỌC CHẾT CHÓC" : "VIÊN NGỌC ĐẶC BIỆT"}
        </div>

        <h3>{question.question}</h3>

        <div className="game-options">
          {options.map((option, index) => (
            <button
              key={`${option.originalIndex}-${option.text}`}
              type="button"
              className={`game-option ${wrongIndex === index ? "wrong" : ""}`}
              onClick={() => select(option, index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option.text}
            </button>
          ))}
        </div>

        {wrongIndex !== null && !question.deadly && (
          <div className="answer-hint">
            Chưa đúng. Hãy thử lại để nhận viên ngọc này.
          </div>
        )}
      </div>
    </div>
  );
}

