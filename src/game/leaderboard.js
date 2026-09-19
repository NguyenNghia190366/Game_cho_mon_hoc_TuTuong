export const LEADERBOARD_STORAGE_KEY = "hcm202_leaderboard_v1";

export function formatDuration(durationMs) {
  const totalSeconds = Math.max(0, Math.floor((Number(durationMs) || 0) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours} tiếng ${minutes} phút ${seconds} giây`;
}

export function formatDateTime(value) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(value));
}

export function readLeaderboard() {
  try {
    const saved = JSON.parse(localStorage.getItem(LEADERBOARD_STORAGE_KEY) || "[]");

    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function sortLeaderboard(entries) {
  return [...entries].sort(
    (first, second) =>
      second.clarity - first.clarity ||
      first.durationMs - second.durationMs ||
      new Date(first.finishedAt).getTime() - new Date(second.finishedAt).getTime(),
  );
}
