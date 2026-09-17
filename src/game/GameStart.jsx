export default function GameStart({ onStart }) {
  return (
    <div className="game-screen">
      <span className="game-kicker">HCM202 · 2D JOURNEY GAME</span>

      <h1>
        HÀNH TRÌNH
        <br />
        <span>TƯ TƯỞNG</span>
      </h1>

      <p className="game-subtitle">
        Khám phá những bước ngoặt từ năm 1911 đến 1969.
      </p>

      <div className="game-instruction-grid">
        <div>
          <strong>A / D</strong>

          <span>Di chuyển</span>
        </div>

        <div>
          <strong>SPACE</strong>

          <span>Nhảy</span>
        </div>

        <div>
          <strong>E</strong>

          <span>Tương tác</span>
        </div>
      </div>

      <div className="game-goal">
        <strong>NHIỆM VỤ</strong>

        <p>
          Đi qua 8 bước ngoặt lịch sử, thu thập các mảnh nhận thức và hoàn thiện
          chuỗi phát triển:
        </p>

        <div>
          Yêu nước
          <span>→</span>
          Tìm đường cứu nước
          <span>→</span>
          Cách mạng vô sản
          <span>→</span>
          Đường lối cách mạng
          <span>→</span>
          Giành và bảo vệ độc lập
          <span>→</span>
          Xây dựng đất nước
        </div>
      </div>

      <button type="button" className="start-game-button" onClick={onStart}>
        BẮT ĐẦU HÀNH TRÌNH
      </button>
    </div>
  );
}
