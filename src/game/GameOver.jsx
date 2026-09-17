export default function GameOver({ onRestart }) {
  return (
    <div className="game-result game-over">
      <span className="result-kicker">HÀNH TRÌNH DỪNG LẠI</span>
      <h2>GAME OVER</h2>
      <p>Bạn đã trả lời sai câu hỏi của viên ngọc chết chóc.</p>
      <button type="button" className="start-game-button" onClick={onRestart}>
        CHƠI LẠI
      </button>
    </div>
  );
}
