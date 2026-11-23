import { useEffect, useState } from "react";
import { useLang } from "../lang";

// Эхний дэлгэц: мэндчилгээ — сайт эсвэл түүх сонгоно
export default function Gate({ ready, onChoose, sound, onSound }) {
  const { t, lang, setLang, data: { contacts } } = useLang();
  const [count, setCount] = useState(0);

  // 000 → 100 ачаалах тоолуур (дүрсүүд бэлэн болтол 99 дээр хүлээнэ)
  useEffect(() => {
    if (count >= 100) return;
    const t = setTimeout(() => setCount((c) => (c >= 99 && !ready ? 99 : c + 1)), 14);
    return () => clearTimeout(t);
  }, [count, ready]);

  const loaded = count >= 100;
  const email = contacts.find((c) => c.type === "email");
  const github = contacts.find((c) => c.type === "github");

  return (
    <div className="gate">
      <div className="gate-lang mono">
        <button className={lang === "mn" ? "on" : ""} onClick={() => setLang("mn")}>МН</button>
        <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
      </div>
      <p className="mono counter">{String(count).padStart(3, "0")} <span>{loaded ? t.ready : t.loading}</span></p>
      <h1 className={loaded ? "in" : ""}>{t.gateTitle} <em>{t.gateDim}</em></h1>

      <div className={`choices ${loaded ? "in" : ""}`}>
        <button onClick={() => onChoose("site")}>
          <span className="mono">01</span>
          <b>{t.choiceSite}</b>
          <small>{t.choiceSiteSub}</small>
        </button>
        <button onClick={() => onChoose("story")}>
          <span className="mono">02</span>
          <b>{t.choiceStory}</b>
          <small>{t.choiceStorySub}</small>
        </button>
      </div>

      <button className={`sound-toggle mono ${sound ? "on" : ""}`} onClick={onSound}>
        <i /><i /><i /> {sound ? t.soundOn : t.soundOff}
      </button>

      <p className="gate-foot mono">
        <a href={email.href}>{email.value}</a> · <a href={github.href} target="_blank" rel="noreferrer">GitHub</a>
      </p>
    </div>
  );
}
