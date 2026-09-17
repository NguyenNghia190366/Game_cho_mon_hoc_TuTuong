import { Link } from "react-router-dom";

import ThoughtJourneyGame from "../game/ThoughtJourneyGame";

import "../game/styles/game.css";

export default function GamePage() {
  return (
    <main className="game-page">
      <header className="game-page-header">
        <Link to="/" className="back-home">
          ← Trở về website
        </Link>

        <span>HCM202 · HÀNH TRÌNH TƯ TƯỞNG</span>
      </header>

      <ThoughtJourneyGame />
    </main>
  );
}
