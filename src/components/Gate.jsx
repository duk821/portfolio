import { useEffect, useState } from "react";
import { contacts } from "../data";

// Эхний дэлгэц: мэндчилгээ — сайт эсвэл түүх сонгоно
export default function Gate({ ready, onChoose, sound, onSound }) {
  const [count, setCount] = useState(0);

  // 000 → 100 ачаалах тоолуур (дүрсүүд бэлэн болтол 99 дээр хүлээнэ)
  useEffect(() => {
    if (count >= 100) return;
    const t = setTimeout(() => setCount((c) => (c >= 99 && !ready ? 99 : c + 1)), 14);
    return () => clearTimeout(t);
  }, [count, ready]);

  const loaded = count >= 100;
  const email = contacts.find((c) => c.label === "Имэйл");
  const github = contacts.find((c) => c.label === "GitHub");

  return (
    <div className="gate">
      <p className="mono counter">{String(count).padStart(3, "0")} <span>{loaded ? "Бэлэн" : "Ачаалж байна"}</span></p>
      <h1 className={loaded ? "in" : ""}>Сайн уу, намайг Дөлгөөн гэдэг. <em>Хаанаас эхлэх үү?</em></h1>

      <div className={`choices ${loaded ? "in" : ""}`}>
        <button onClick={() => onChoose("site")}>
          <span className="mono">01</span>
          <b>Сайт</b>
          <small>Энгийнээр, өөрийн хурдаар</small>
        </button>
        <button onClick={() => onChoose("story")}>
          <span className="mono">02</span>
          <b>Түүх</b>
          <small>Доош гүйлгээд үзэх, дуутай</small>
        </button>
      </div>

      <button className={`sound-toggle mono ${sound ? "on" : ""}`} onClick={onSound}>
        <i /><i /><i /> {sound ? "Дуу асаалттай" : "Дуу асаах"}
      </button>

      <p className="gate-foot mono">
        <a href={email.href}>{email.value}</a> · <a href={github.href} target="_blank" rel="noreferrer">GitHub</a>
      </p>
    </div>
  );
}