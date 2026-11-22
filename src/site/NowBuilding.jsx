import { useState } from "react";
import { projects, nowBuilding } from "../data";
import DotCanvas from "../particles/DotCanvas";

// "Одоо хийж буй" — accordion картууд.
// Идэвхтэй карт өнгөтэй, том дэлгэгдэж цэгэн зурагтай; бусад нь нарийн, нэр нь босоо.
// Карт дээр дарах (эсвэл хулганаар очих) үед тэр нь дэлгэгдэнэ.
export default function NowBuilding() {
  const [active, setActive] = useState(0);
  const cards = nowBuilding.cards.map((c) => ({ ...c, p: projects.find((x) => x.id === c.projectId) }));

  return (
    <div className="acc">
      {cards.map((c, i) => {
        const on = i === active;
        return (
          <article
            key={c.projectId}
            className={`acc-card ${on ? "on" : ""}`}
            style={{ "--c": c.color }}
            onClick={() => setActive(i)}
            onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(i)}
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setActive(i)}
            aria-expanded={on}
          >
            <span className="acc-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="acc-dot" />
            <h3 className="acc-title">{c.p.title}</h3>

            <div className="acc-body">
              <div className="acc-art">{on && <DotCanvas shape={c.shape} dark="rgba(0,0,0,0.75)" />}</div>
              <div className="acc-text">
                <p className="acc-desc">{c.p.desc}</p>
                {c.building && (
                  <ul className="acc-steps">
                    {c.steps.map((s) => <li key={s.label} className={s.state}><i />{s.label}</li>)}
                  </ul>
                )}
                <p className="acc-tech">{c.p.tech.join("   ")}</p>
                <div className="acc-foot">
                  <span>{c.building && <b className="pulse" />}{c.status}</span>
                  {c.p.demo
                    ? <a href={c.p.demo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>Сайт үзэх ↗</a>
                    : c.building && <span className="soon">Удахгүй нээгдэнэ</span>}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
