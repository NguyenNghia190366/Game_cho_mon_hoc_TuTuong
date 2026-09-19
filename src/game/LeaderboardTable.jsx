import { formatDateTime, formatDuration } from "./leaderboard";

export default function LeaderboardTable({ entries, currentEntryId = null }) {
  return (
    <div className="leaderboard-table-wrap">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Hạng</th>
            <th>Tên người chơi</th>
            <th>Bắt đầu</th>
            <th>Hoàn thành</th>
            <th>Tổng thời gian</th>
            <th>Độ sáng tỏ</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr
              key={entry.id}
              className={entry.id === currentEntryId ? "is-current-player" : ""}
            >
              <td>#{index + 1}</td>
              <td>{entry.name}</td>
              <td>{formatDateTime(entry.startedAt)}</td>
              <td>{formatDateTime(entry.finishedAt)}</td>
              <td>{entry.duration || formatDuration(entry.durationMs)}</td>
              <td>{entry.clarity}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
