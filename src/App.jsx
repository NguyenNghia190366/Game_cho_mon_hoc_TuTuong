import { HashRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import LeaderboardPage from "./pages/LeaderboardPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/game" element={<GamePage />} />

        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </HashRouter>
  );
}
