import { useEffect, useRef, useState } from "react";
import { experience } from "../data";

// ================================================================
//  Туршлага — зүүн талд том он "наалдаж" (sticky) үлдэнэ,
//  баруун талд гүйлгэхэд идэвхтэй ажил солигдож, он нь цифр бүрээрээ эргэлдэнэ.
//  Босоо шугам гүйлгэсэн хэмжээгээр дүүрнэ.
// ================================================================

// Цифр бүр солигдоход дээрээс доош гулсаж орж ирнэ
function RollingYear({ value }) {
  return (
    <div className="big-year" aria-label={value}>
      {value.split("").map((d, i) => (
        <span key={`${i}-${d}`} className="digit" style={{ animationDelay: `${i * 60}ms` }}>{d}</span>
      ))}
    </div>
  );
}

export default function ExperienceScroll() {
  // Он дарааллаар (хуучнаас шинэ рүү)
  const items = [...experience].reverse();
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  // Дэлгэцийн голд орж ирсэн ажлыг идэвхтэй болгоно
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Босоо шугамын дүүргэлт = жагсаалтаар хэр гүйлгэсэн бэ
  useEffect(() => {
    const onScroll = () => {
      const r = listRef.current.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      setProgress(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cur = items[active];

  return (
    <div className="xp">
      <div className="xp-sticky">
        <RollingYear value={cur.period.slice(0, 4)} />
        <p className="xp-step">{active + 1}-р алхам <span>/ {items.length}</span></p>
        <p className="xp-side mono"><i /> (02) Туршлага</p>
      </div>

      <ol className="xp-list" ref={listRef}>
        <span className="xp-line"><i style={{ height: `${progress * 100}%` }} /></span>
        {items.map((e, i) => (
          <li
            key={e.title}
            data-i={i}
            ref={(el) => (itemRefs.current[i] = el)}
            className={i === active ? "on" : i < active ? "past" : ""}
          >
            <span className="xp-dot" />
            <p className="xp-period">{e.period}</p>
            <h3>{e.title}</h3>
            <p className="xp-org"><b>{e.org}</b> · {e.short}</p>
            <p className="xp-detail">{e.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
