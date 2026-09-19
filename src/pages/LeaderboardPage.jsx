import { Link } from "react-router-dom";

import LeaderboardTable from "../game/LeaderboardTable";
import { readLeaderboard, sortLeaderboard } from "../game/leaderboard";

import "../game/styles/game.css";

export default function LeaderboardPage() {
  const leaderboard = sortLeaderboard(readLeaderboard());

  return (
    <main className="game-page">
      <header className="game-page-header">
        <Link to="/" className="back-home">
          ← Trở về website
        </Link>

        <span>HCM202 · HÀNH TRÌNH TƯ TƯỞNG</span>
      </header>

      <section className="game-result leaderboard-screen standalone-leaderboard">
        <span className="result-kicker">BẢNG XẾP HẠNG</span>
        <h2>Những hành trình nổi bật</h2>
        <p className="leaderboard-rule">
          Xếp hạng theo độ sáng tỏ, sau đó ưu tiên người hoàn thành nhanh hơn.
        </p>

        {leaderboard.length > 0 ? (
          <LeaderboardTable entries={leaderboard} />
        ) : (
          <div className="leaderboard-empty">
            Chưa có người chơi nào hoàn thành hành trình. Hãy là người đầu tiên nhé!
          </div>
        )}

        <div className="leaderboard-page-actions">
          <Link to="/" className="secondary-button leaderboard-link-button">
            TRỞ VỀ TRANG CHÍNH
          </Link>
          <Link to="/game" className="start-game-button leaderboard-link-button">
            VÀO GAME
          </Link>
        </div>
      </section>
    </main>
  );
}
