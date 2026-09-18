import { useMemo, useState } from "react";

import { STAGE_QUIZZES } from "./data/stageQuizzes";

export default function GameDialog({ stage, onAnswer, onComplete, onClose }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const questions = STAGE_QUIZZES[stage.id] || [];
  const question = questions[questionIndex];

  const shuffledOptions = useMemo(
    () =>
      (question?.options || [])
        .map((text, originalIndex) => ({ text, originalIndex }))
        .sort(() => Math.random() - 0.5),
    [question],
  );
  const correctDisplayIndex = shuffledOptions.findIndex(
    (option) => option.originalIndex === question?.answer,
  );

  const selectAnswer = (originalIndex, displayIndex) => {
    if (showExplanation) {
      return;
    }

    const correct = onAnswer(originalIndex, question);

    setAnswerState({ selected: displayIndex, correct });

    if (correct) {
      setShowExplanation(true);
    }
  };

  const acknowledgeExplanation = () => {
    const isLastQuestion = questionIndex === questions.length - 1;

    if (isLastQuestion) {
      onComplete();
      return;
    }

    setQuestionIndex((index) => index + 1);
    setAnswerState(null);
    setShowExplanation(false);
  };

  if (!question) {
    return null;
  }

  return (
    <div className="dialog-overlay" role="dialog" aria-modal="true">
      <div className="game-dialog stage-quiz-dialog">
        <div className="dialog-year">{stage.year}</div>

        <h2>{stage.title}</h2>

        <div className="challenge-label">
          THỬ THÁCH NHẬN THỨC · CÂU {questionIndex + 1}/{questions.length}
        </div>

        <h3>{question.question}</h3>

        <div className="game-options">
          {shuffledOptions.map((option, index) => {
            let className = "game-option";

            if (answerState?.correct && option.originalIndex === question.answer) {
              className += " correct";
            } else if (
              answerState &&
              !answerState.correct &&
              index === answerState.selected
            ) {
              className += " wrong";
            }

            return (
              <button
                key={`${option.originalIndex}-${option.text}`}
                type="button"
                className={className}
                disabled={showExplanation}
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
            Câu trả lời chưa đúng. Hãy đọc lại các lựa chọn và thử lại nhé.
          </div>
        )}

        {showExplanation && (
          <div className="quiz-explanation">
            <span>ĐÁP ÁN VÀ GIẢI THÍCH</span>
            <h3>
              Đáp án đúng: {String.fromCharCode(65 + correctDisplayIndex)}. {question.options[question.answer]}
            </h3>
            <p>{question.explanation}</p>

            <button
              type="button"
              className="primary-button"
              onClick={acknowledgeExplanation}
            >
              ĐÃ HIỂU
            </button>
          </div>
        )}

        {!showExplanation && (
          <div className="dialog-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
