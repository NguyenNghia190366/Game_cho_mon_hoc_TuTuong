import { motion } from "framer-motion";

import Reveal from "./Reveal";

export default function PeriodDetail({ period, index }) {
  return (
    <section id={`period-${period.id}`} className="section period-section">
      {/* Số thứ tự lớn phía sau */}

      <motion.div
        className="period-background-number"
        initial={{
          opacity: 0,
          x: 80,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* HEADER GIAI ĐOẠN */}

      <Reveal>
        <div className="period-header">
          <div className="period-index">
            GIAI ĐOẠN {String(index + 1).padStart(2, "0")}
          </div>

          <div className="period-year">{period.label}</div>

          <h2>{period.title}</h2>
        </div>
      </Reveal>

      {/* Ý CHÍNH + BỐI CẢNH */}

      <div className="overview-grid">
        <Reveal delay={0.08}>
          <motion.article
            className="panel lift-panel"
            whileHover={{
              y: -5,
            }}
          >
            <span className="panel-label">Ý CHÍNH</span>

            <p>{period.summary}</p>
          </motion.article>
        </Reveal>

        <Reveal delay={0.16}>
          <motion.article
            className="panel lift-panel"
            whileHover={{
              y: -5,
            }}
          >
            <span className="panel-label">BỐI CẢNH</span>

            <p>{period.context}</p>
          </motion.article>
        </Reveal>
      </div>

      {/* TIÊU ĐỀ MỐC LỊCH SỬ */}

      <Reveal>
        <div className="sub-heading">
          <span>CÁC MỐC LỊCH SỬ</span>

          <h3>Những sự kiện tạo nên chuyển biến</h3>
        </div>
      </Reveal>

      {/* DANH SÁCH MỐC */}

      <div className="milestone-list">
        {period.milestones.map((item, milestoneIndex) => (
          <motion.article
            className="milestone"
            key={`${item.time}-${milestoneIndex}`}
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              duration: 0.55,

              delay: milestoneIndex * 0.07,

              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.div
              className="milestone-time"
              whileHover={{
                x: 6,
              }}
            >
              {item.time}
            </motion.div>

            <div className="milestone-body">
              <h4>{item.title}</h4>

              <p>{item.meaning}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* BƯỚC NGOẶT */}

      <Reveal delay={0.1}>
        <motion.div
          className="turning-point"
          whileHover={{
            y: -5,
          }}
          transition={{
            type: "spring",
            stiffness: 280,
            damping: 22,
          }}
        >
          <span>BƯỚC NGOẶT / CHUYỂN BIẾN TƯ TƯỞNG</span>

          <p>{period.turning}</p>
        </motion.div>
      </Reveal>

      {/* MŨI TÊN NỐI GIAI ĐOẠN */}

      {index < 4 && (
        <motion.div
          className="period-connector"
          initial={{
            opacity: 0,
            height: 0,
          }}
          whileInView={{
            opacity: 1,
            height: 90,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
        >
          <span />

          <p>Tiếp tục hành trình</p>

          <strong>↓</strong>
        </motion.div>
      )}
    </section>
  );
}
