import { useMemo, useState } from "react";
import LeaderboardTable from "./LeaderboardTable";
import {
  LEADERBOARD_STORAGE_KEY,
  formatDuration,
  readLeaderboard,
  sortLeaderboard,
} from "./leaderboard";

export default function GameResult({
  insights,
  clarity,
  startedAt,
  finishedAt,
  onRestart,
}) {
  const [playerName, setPlayerName] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerEntryId, setPlayerEntryId] = useState(null);
  const [error, setError] = useState("");

  const durationMs = useMemo(() => {
    const start = new Date(startedAt || finishedAt || Date.now()).getTime();
    const finish = new Date(finishedAt || Date.now()).getTime();

    return Math.max(0, finish - start);
  }, [startedAt, finishedAt]);

  const playerRank = leaderboard.findIndex((entry) => entry.id === playerEntryId) + 1;

  const saveScore = (event) => {
    event.preventDefault();

    const normalizedName = playerName.trim().replace(/\s+/g, " ");

    if (!normalizedName) {
      setError("Cậu hãy nhập tên trước khi xem bảng xếp hạng nhé.");
      return;
    }

    const entry = {
      id: `${finishedAt || new Date().toISOString()}-${Math.random().toString(36).slice(2, 9)}`,
      name: normalizedName.slice(0, 40),
      startedAt,
      finishedAt,
      durationMs,
      duration: formatDuration(durationMs),
      clarity: Math.max(0, Math.min(100, clarity)),
    };
    const nextLeaderboard = sortLeaderboard([...readLeaderboard(), entry]);

    try {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(nextLeaderboard));
    } catch {
      setError("Không thể lưu bảng xếp hạng trên thiết bị này.");
      return;
    }

    setLeaderboard(nextLeaderboard);
    setPlayerEntryId(entry.id);
    setError("");
  };

  if (!playerEntryId) {
    return (
      <div className="game-result leaderboard-name-screen">
        <span className="result-kicker">HÀNH TRÌNH HOÀN THÀNH</span>
        <h2>Chúc mừng!</h2>

        <p className="leaderboard-intro">
          Cậu đã thu thập {insights} viên ngọc với độ sáng tỏ {clarity}% trong{" "}
          <strong>{formatDuration(durationMs)}</strong>.
        </p>

        <form className="leaderboard-name-form" onSubmit={saveScore}>
          <label htmlFor="leaderboard-player-name">Tên của cậu</label>
          <input
            id="leaderboard-player-name"
            type="text"
            value={playerName}
            maxLength={40}
            autoComplete="name"
            autoFocus
            placeholder="Nhập tên người chơi"
            onChange={(event) => {
              setPlayerName(event.target.value);
              setError("");
            }}
          />

          {error && <p className="leaderboard-error">{error}</p>}

          <button type="submit" className="start-game-button">
            LƯU VÀ XEM BẢNG XẾP HẠNG
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="game-result leaderboard-screen">
      <span className="result-kicker">BẢNG XẾP HẠNG</span>
      <h2>Cậu đang đứng hạng #{playerRank}</h2>
      <p className="leaderboard-rule">
        Xếp hạng theo độ sáng tỏ, sau đó ưu tiên người hoàn thành nhanh hơn.
      </p>

      <LeaderboardTable entries={leaderboard} currentEntryId={playerEntryId} />

      <button type="button" className="start-game-button" onClick={onRestart}>
        CHƠI LẠI
      </button>
    </div>
  );
}
