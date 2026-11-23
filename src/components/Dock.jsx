import { useEffect, useState } from "react";
import { useLang } from "../lang";

// Доод талын хөвөгч удирдлага: Лаб · Сайт/Түүх солих · дуу
// + баруун захад хуудсыг хэр гүйлгэснийг харуулах шугамын хэмжүүр
export default function Dock({ mode, onMode, onLab, sound, onSound }) {
  const { t, lang, setLang } = useLang();
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
        <button className="dock-icon" onClick={onLab} title={t.lab} aria-label={t.lab}>&lt;/&gt;</button>
        <div className="seg">
          <button className={mode === "site" ? "on" : ""} onClick={() => onMode("site")}>{t.site}</button>
          <button className={mode === "story" ? "on" : ""} onClick={() => onMode("story")}>{t.story}</button>
        </div>
        <div className="dock-lang" role="group" aria-label="Хэл / Language">
          <button className={lang === "mn" ? "on" : ""} onClick={() => setLang("mn")}>МН</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className={`dock-icon sound ${sound ? "on" : ""}`} onClick={onSound} title={t.sound} aria-label={t.sound}>
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
