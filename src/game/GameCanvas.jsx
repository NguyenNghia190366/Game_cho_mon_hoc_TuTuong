export default function GameCanvas({ canvasRef, message }) {
  return (
    <div className="game-canvas-wrapper">
      <canvas
        ref={canvasRef}
        width="960"
        height="540"
        className="game-canvas"
        aria-label="Bản đồ hành trình tư tưởng từ năm 1911 đến 1969"
      />

      {message && (
        <div className="game-toast" role="status" aria-live="polite">
          {message}
        </div>
      )}
    </div>
  );
}
