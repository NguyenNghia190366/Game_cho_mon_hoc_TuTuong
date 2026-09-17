import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Timeline from "../components/Timeline";
import PeriodDetail from "../components/PeriodDetail";
import Journey from "../components/Journey";
import Footer from "../components/Footer";

import { periods } from "../data/periods";

export default function HomePage() {
  return (
    <div className="app">
      <Navbar />

      <Hero />

      <Timeline periods={periods} />

      <div id="periods">
        {periods.map((period, index) => (
          <PeriodDetail key={period.id} period={period} index={index} />
        ))}
      </div>

      <Journey />

      <section className="section game-promo">
        <div className="section-heading">
          <p className="eyebrow">TRẢI NGHIỆM TƯƠNG TÁC</p>

          <h2>Hành trình tư tưởng 1911–1969</h2>

          <p>
            Trực tiếp đi qua các bước ngoặt lịch sử và mở khóa quá trình phát
            triển tư tưởng.
          </p>

          <Link to="/game" className="btn primary">
            Vào game
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
