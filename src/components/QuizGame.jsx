import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { RotateCcw, Sparkles } from "lucide-react";

import { quizQuestions } from "../data/quiz";

import Reveal from "./Reveal";

export default function QuizGame() {
  const [gameStarted, setGameStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selected, setSelected] = useState(null);

  const [score, setScore] = useState(0);

  const [finished, setFinished] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  const chooseAnswer = (index) => {
    if (selected !== null) {
      return;
    }

    setSelected(index);

    if (index === quizQuestions[currentQuestion].answer) {
      setScore((previousScore) => previousScore + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === quizQuestions.length - 1) {
      setFinished(true);

      return;
    }

    setCurrentQuestion((previous) => previous + 1);

    setSelected(null);
  };

  const current = quizQuestions[currentQuestion];

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section id="game" className="section game-section">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">04 · GAME ÔN TẬP</p>

          <h2>Hành trình 5 bước ngoặt</h2>

          <p>
            Trả lời các câu hỏi để kiểm tra khả năng nối sự kiện với chuyển biến
            tư tưởng.
          </p>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {/* START GAME */}

        {!gameStarted && (
          <motion.div
            key="start"
            className="game-start panel center"
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: -16,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <motion.div
              className="game-icon"
              animate={{
                rotate: [0, 10, -10, 0],

                scale: [1, 1.12, 1],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
              }}
            >
              <Sparkles size={44} />
            </motion.div>

            <h3>Sẵn sàng bắt đầu?</h3>

            <p>{quizQuestions.length} câu hỏi · 1 điểm cho mỗi câu đúng.</p>

            <motion.button
              className="btn primary"
              onClick={startGame}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              Bắt đầu game
            </motion.button>
          </motion.div>
        )}

        {/* QUESTION */}

        {gameStarted && !finished && (
          <motion.div
            key={`question-${currentQuestion}`}
            className="quiz panel"
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <div className="quiz-top">
              <span>
                Câu {currentQuestion + 1}/{quizQuestions.length}
              </span>

              <span>Điểm: {score}</span>
            </div>

            {/* Progress */}

            <div className="progress">
              <motion.div
                className="progress-fill"
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 0.45,
                }}
              />
            </div>

            <h3>{current.question}</h3>

            {/* Answers */}

            <div className="answers">
              {current.options.map((option, index) => {
                const isCorrect = index === current.answer;

                const isSelected = index === selected;

                let stateClass = "";

                if (selected !== null) {
                  if (isCorrect) {
                    stateClass = "correct";
                  } else if (isSelected) {
                    stateClass = "wrong";
                  }
                }

                return (
                  <motion.button
                    key={option}
                    className={`answer ${stateClass}`}
                    onClick={() => chooseAnswer(index)}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.06,
                    }}
                    whileHover={
                      selected === null
                        ? {
                            x: 6,
                          }
                        : {}
                    }
                    whileTap={
                      selected === null
                        ? {
                            scale: 0.99,
                          }
                        : {}
                    }
                  >
                    <span>{String.fromCharCode(65 + index)}</span>

                    {option}
                  </motion.button>
                );
              })}
            </div>

            {/* Next */}

            {selected !== null && (
              <motion.button
                className="btn primary next-btn"
                onClick={nextQuestion}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                whileHover={{
                  y: -2,
                }}
              >
                {currentQuestion === quizQuestions.length - 1
                  ? "Xem kết quả"
                  : "Câu tiếp theo"}
              </motion.button>
            )}
          </motion.div>
        )}

        {/* RESULT */}

        {finished && (
          <motion.div
            key="result"
            className="result panel center"
            initial={{
              opacity: 0,
              scale: 0.88,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
          >
            <motion.div
              className="score-circle"
              initial={{
                scale: 0.4,
                rotate: -40,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              <strong>
                {score}/{quizQuestions.length}
              </strong>
            </motion.div>

            <h3>
              {score === quizQuestions.length
                ? "Xuất sắc!"
                : score >= Math.ceil(quizQuestions.length * 0.7)
                  ? "Bạn nắm khá chắc hành trình."
                  : "Hãy xem lại timeline và thử lại nhé."}
            </h3>

            <motion.button
              className="btn primary"
              onClick={startGame}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <RotateCcw size={18} />
              Chơi lại
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
