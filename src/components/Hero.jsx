import { motion } from "framer-motion";

import { ArrowDown, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
const containerAnimation = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemAnimation = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Hero() {
  return (
    <section id="hero" className="hero">
      {/* Vòng chuyển động 1 */}

      <motion.div
        className="hero-orbit orbit-one"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Vòng chuyển động 2 */}

      <motion.div
        className="hero-orbit orbit-two"
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Ánh sáng nền */}

      <motion.div
        className="hero-glow"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.55, 0.8, 0.55],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Nội dung */}

      <motion.div
        className="hero-content"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <motion.p variants={itemAnimation} className="eyebrow">
          HCM202 · WEBSITE TƯƠNG TÁC
        </motion.p>

        <motion.h1 variants={itemAnimation}>
          Hành trình tư tưởng
          <span>qua các bước ngoặt lịch sử</span>
        </motion.h1>

        <motion.p variants={itemAnimation} className="hero-copy">
          Khám phá quá trình hình thành và phát triển tư tưởng Hồ Chí Minh qua
          các giai đoạn, sự kiện, chuyển biến nhận thức và bước ngoặt lịch sử.
        </motion.p>

        <motion.div variants={itemAnimation} className="hero-actions">
          <motion.a
            className="btn primary"
            href="#timeline"
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            Bắt đầu khám phá
            <ArrowDown size={18} />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Mũi tên chuyển động */}

      <motion.div
        className="scroll-indicator"
        animate={{
          y: [0, 10, 0],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
      >
        <ArrowDown size={22} />
      </motion.div>
    </section>
  );
}
