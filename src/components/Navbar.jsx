import { Link, useLocation } from "react-router-dom";

import { motion } from "framer-motion";

export default function Navbar() {
  const location = useLocation();

  const onHome = location.pathname === "/";

  return (
    <motion.header
      className="topbar"
      initial={{
        y: -70,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
    >
      <Link to="/" className="brand">
        <span className="brand-dot" />
        HÀNH TRÌNH TƯ TƯỞNG
      </Link>

      <nav>
        {onHome ? (
          <>
            <a href="#timeline">Timeline</a>

            <a href="#periods">Các giai đoạn</a>

            <a href="#journey">Tổng kết</a>
          </>
        ) : null}

        <Link to="/game" className="game-nav-link">
          GAME
        </Link>
      </nav>
    </motion.header>
  );
}
