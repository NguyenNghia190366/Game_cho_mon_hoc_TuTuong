import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <strong>HCM202 · Hành trình tư tưởng qua các bước ngoặt lịch sử</strong>
    </motion.footer>
  );
}
