import { useState } from "react";

export default function GameIntro({ onStart }) {
  const [screen, setScreen] = useState("intro");

  /* ====================================
     INTRO
  ==================================== */

  if (screen === "intro") {
    return (
      <section className="game-screen game-intro">
        <div className="intro-content">
          <span className="game-kicker">HCM202 · INTERACTIVE JOURNEY</span>

          <h1>
            HÀNH TRÌNH
            <span>TƯ TƯỞNG</span>
          </h1>

          <div className="intro-years">
            <span>1911</span>

            <div className="intro-year-line" />

            <span>1969</span>
          </div>

          <p className="intro-description">
            Bạn sẽ vào vai một người khám phá lịch sử, đi xuyên qua những bước
            ngoặt quan trọng trong quá trình hình thành và phát triển tư tưởng
            Hồ Chí Minh.
          </p>

          <div className="intro-timeline">
            <span>1911</span>

            <b>→</b>

            <span>1920</span>

            <b>→</b>

            <span>1930</span>

            <b>→</b>

            <span>1935</span>

            <b>→</b>

            <span>1945</span>

            <b>→</b>

            <span>1954</span>

            <b>→</b>

            <span>1969</span>
          </div>

          <button
            type="button"
            className="start-game-button"
            onClick={() => setScreen("guide")}
          >
            TIẾP TỤC
          </button>
        </div>
      </section>
    );
  }

  /* ====================================
     GUIDE
  ==================================== */

  return (
    <section className="game-screen game-guide">
      <div className="guide-container">
        <span className="game-kicker">TRƯỚC KHI BẮT ĐẦU</span>

        <h2>Hướng dẫn chơi</h2>

        <p className="guide-description">
          Di chuyển qua dòng thời gian, khám phá từng bước ngoặt và hoàn thành
          thử thách để tiếp tục hành trình.
        </p>

        <div className="guide-grid">
          <article className="guide-card">
            <div className="guide-key">A</div>

            <div className="guide-key">←</div>

            <h3>Sang trái</h3>
          </article>

          <article className="guide-card">
            <div className="guide-key">D</div>

            <div className="guide-key">→</div>

            <h3>Sang phải</h3>
          </article>

          <article className="guide-card">
            <div className="guide-key long">SPACE</div>

            <h3>Nhảy</h3>
          </article>

          <article className="guide-card">
            <div className="guide-key interaction">E</div>

            <h3>Nộp ngọc tại điểm khám phá</h3>
          </article>

          <article className="guide-card">
            <div className="guide-key interaction">O</div>

            <h3>Mở hộp</h3>
          </article>

          <article className="guide-card">
            <div className="guide-key interaction">B</div>

            <h3>Mở balo</h3>
          </article>
        </div>

        <div className="guide-mission">
          <span>NHIỆM VỤ</span>

          <h3>Hoàn thiện hành trình tư tưởng</h3>

          <div className="mission-step">
            <strong>01</strong>

            <p>Di chuyển qua từng giai đoạn từ năm 1911 đến năm 1969.</p>
          </div>

          <div className="mission-step">
            <strong>02</strong>

            <p>
              Thu thập <b>viên ngọc vàng</b>, chìa khóa và khám phá các hộp vật
              phẩm trên đường.
            </p>
          </div>

          <div className="mission-step">
            <strong>03</strong>

            <p>
              Khi đã đủ ngọc, đến gần điểm khám phá và nhấn
              <b> E </b>
              để nộp ngọc.
            </p>
          </div>

          <div className="mission-step">
            <strong>04</strong>

            <p>
              Trả lời đúng thử thách để mở khóa bước ngoặt và giai đoạn tiếp
              theo.
            </p>
          </div>
        </div>

        <div className="guide-warning">
          <span>!</span>

          <p>
            Bạn không thể vượt qua cổng thời gian nếu chưa hoàn thành bước ngoặt
            của giai đoạn hiện tại.
          </p>
        </div>

        <div className="guide-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => setScreen("intro")}
          >
            ← QUAY LẠI
          </button>

          <button type="button" className="start-game-button" onClick={onStart}>
            BẮT ĐẦU HÀNH TRÌNH
          </button>
        </div>
      </div>
    </section>
  );
}
