import { useEffect, useState } from "react";

// Доод талын хөвөгч удирдлага: Лаб · Сайт/Түүх солих · дуу
// + баруун захад хуудсыг хэр гүйлгэснийг харуулах шугамын хэмжүүр
export default function Dock({ mode, onMode, onLab, sound, onSound }) {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mode]);

  const ticks = 60;

  return (
    <>
      <div className="dock">
        <button className="dock-icon" onClick={onLab} title="Лаб терминал" aria-label="Лаб терминал">&lt;/&gt;</button>
        <div className="seg">
          <button className={mode === "site" ? "on" : ""} onClick={() => onMode("site")}>Сайт</button>
          <button className={mode === "story" ? "on" : ""} onClick={() => onMode("story")}>Түүх</button>
        </div>
        <span className="dock-lang">МН</span>
        <button className={`dock-icon sound ${sound ? "on" : ""}`} onClick={onSound} title="Дуу" aria-label="Дуу асаах/унтраах">
          <i /><i /><i />
        </button>
      </div>

      <div className="ruler" aria-hidden="true">
        {Array.from({ length: ticks }).map((_, i) => (
          <i key={i} className={`${i / ticks <= scroll ? "on" : ""} ${i % 10 === 0 ? "long" : ""}`} />
        ))}
      </div>
    </>
  );
}
