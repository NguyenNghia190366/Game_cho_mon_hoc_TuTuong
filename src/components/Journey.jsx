import { motion } from "framer-motion";

import Reveal from "./Reveal";

const steps = [
  "Yêu nước",
  "Tìm đường cứu nước",
  "Cách mạng vô sản",
  "Đường lối cách mạng Việt Nam",
  "Giành & bảo vệ độc lập",
  "Xây dựng đất nước",
];

export default function Journey() {
  return (
    <section id="journey" className="section journey">
      <Reveal>
        <div className="section-heading">
          <p className="eyebrow">03 · TOÀN BỘ HÀNH TRÌNH</p>

          <h2>Một dòng phát triển xuyên suốt</h2>
        </div>
      </Reveal>

      <div className="journey-line">
        {steps.map((step, index) => (
          <div className="journey-item" key={step}>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.88,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -5,
                scale: 1.04,
              }}
            >
              {step}
            </motion.div>

            {index < steps.length - 1 && (
              <motion.span
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08 + 0.18,
                }}
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
