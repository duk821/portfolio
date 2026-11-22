import { useEffect, useRef } from "react";
import { story } from "../data";
import { chime } from "../audio";

// Түүх горим: бүлэг бүр дэлгэц дүүрэн. Гүйлгэхэд идэвхтэй бүлэг солигдож,
// тоосонцор шинэ дүрс рүү урсана (дүрсийг App дахь ParticleField зурна).
export default function Story({ active, onActive, onFinish }) {
  const refs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const i = Number(e.target.dataset.i);
          onActive(i);
          chime(i);
        }
      });
    }, { threshold: 0.6 });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [onActive]);

  return (
    <div className="story">
      <div className="story-hud mono">
        <span>{String(active).padStart(2, "0")} / {String(story.length - 1).padStart(2, "0")}</span>
        <div className="progress"><i style={{ width: `${(active / (story.length - 1)) * 100}%` }} /></div>
        <button onClick={onFinish}>Сайт руу алгасах →</button>
      </div>

      {story.map((ch, i) => (
        <section key={i} data-i={i} ref={(el) => (refs.current[i] = el)} className={`chapter ${active === i ? "on" : ""} ${i % 2 ? "alt" : ""}`}>
          <div className="chapter-text">
            <p className="mono">{String(i).padStart(2, "0")} — {ch.label}</p>
            <h2>
              {ch.lines[0].split("|")[0]}{" "}
              <span className="dim">{ch.lines[0].split("|")[1]}</span>
            </h2>
            <p className="chapter-sub">{ch.lines[1]}</p>
            {i === 0 && <p className="mono hint">↓ гүйлгэ</p>}
            {i === story.length - 1 && <button className="enter" onClick={onFinish}>Сайтыг үзэх <em>→</em></button>}
          </div>
        </section>
      ))}
    </div>
  );
}
