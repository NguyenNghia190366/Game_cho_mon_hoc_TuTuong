import { motion } from "framer-motion";

import Reveal from "./Reveal";

export default function Timeline({ periods }) {
  return (
    <section id="timeline" className="section timeline-section">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">01 · HÀNH TRÌNH TƯ TƯỞNG</p>

          <h2>Các giai đoạn phát triển</h2>

          <p>
            Theo dõi hành trình hình thành và phát triển tư tưởng Hồ Chí Minh
            qua các bước ngoặt lịch sử.
          </p>
        </div>
      </Reveal>

      <div className="main-timeline">
        {/* đường timeline */}
        <motion.div
          className="timeline-main-line"
          initial={{
            scaleY: 0,
          }}
          whileInView={{
            scaleY: 1,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {periods.map((period, index) => (
          <motion.a
            key={period.id}
            href={`#period-${period.id}`}
            className={`main-timeline-item ${
              index % 2 === 0 ? "timeline-left" : "timeline-right"
            }`}
            initial={{
              opacity: 0,
              x: index % 2 === 0 ? -60 : 60,
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
              duration: 0.65,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* điểm timeline */}

            <motion.span
              className="timeline-node"
              whileHover={{
                scale: 1.4,
              }}
            />

            <motion.div
              className="timeline-summary-card"
              whileHover={{
                y: -6,
                scale: 1.015,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
              }}
            >
              <span className="timeline-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="timeline-year">{period.label}</span>

              <h3>{period.title}</h3>

              <p>{period.turning}</p>

              <span className="timeline-view">Xem giai đoạn ↓</span>
            </motion.div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
