import { useMemo, useState } from "react";

export default function GameDialog({ stage, onAnswer, onClose, skipStory = false }) {
  const [page, setPage] = useState(skipStory ? stage.story.length : 0);

  const [answerState, setAnswerState] = useState(null);

  const shuffledOptions = useMemo(
    () =>
      stage.options
        .map((text, originalIndex) => ({ text, originalIndex }))
        .sort(() => Math.random() - 0.5),
    [stage],
  );

  if (!stage) {
    return null;
  }

  const storyFinished = page >= stage.story.length;

  const selectAnswer = (originalIndex, displayIndex) => {
    const correct = onAnswer(originalIndex);

    setAnswerState({
      selected: displayIndex,
      correct,
    });
  };

  return (
    <div className="dialog-overlay">
      <div className="game-dialog">
        <div className="dialog-year">{stage.year}</div>

        <h2>{stage.title}</h2>

        {!storyFinished ? (
          <>
            <div className="story-page">
              <span>
                {page + 1}/{stage.story.length}
              </span>

              <p>{stage.story[page]}</p>
            </div>

            <div className="dialog-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={onClose}
              >
                Đóng
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={() => setPage((old) => old + 1)}
              >
                {page === stage.story.length - 1 ? "Đến thử thách" : "Tiếp tục"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="challenge-label">THỬ THÁCH NHẬN THỨC</div>

            <h3>{stage.question}</h3>

            <div className="game-options">
              {shuffledOptions.map((option, index) => {
                let className = "game-option";

                if (answerState) {
                  if (option.originalIndex === stage.answer) {
                    className += " correct";
                  } else if (index === answerState.selected) {
                    className += " wrong";
                  }
                }

                return (
                  <button
                    key={`${option.originalIndex}-${option.text}`}
                    type="button"
                    className={className}
                    disabled={answerState?.correct}
                    onClick={() => selectAnswer(option.originalIndex, index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>

                    {option.text}
                  </button>
                );
              })}
            </div>

            {answerState && !answerState.correct && (
              <div className="answer-hint">
                <strong>Gợi ý:</strong>

                {stage.hint}
              </div>
            )}

            {answerState?.correct && (
              <div className="unlock-box">
                <span>MỞ KHÓA</span>

                <strong>{stage.unlock}</strong>

                <p>{stage.transformation}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
