export default function GameCanvas({ canvasRef }) {
  return (
    <div className="game-canvas-wrapper">
      <canvas
        ref={canvasRef}
        width="960"
        height="540"
        className="game-canvas"
        aria-label="Bản đồ hành trình tư tưởng từ năm 1911 đến 1969"
      />
    </div>
  );
}
