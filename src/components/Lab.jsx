import { useEffect, useRef, useState } from "react";
import { me, projects, contacts, experience } from "../data";

const HORSE = String.raw`
        ,--,
  _ ___/ /\|
 ;( )__, )
; //   '--;
  \     |
   ^    ^      Дэл сүүл намируулсан морь давхиж байна...`;

// "Лаб" — терминал. Команд бүр текстийн массив буцаадаг функц.
export default function Lab({ onClose, toggleSnow }) {
  const [lines, setLines] = useState([`Тавтай морил, ${me.shortName}-ийн лабораторид! Командуудыг харах бол "тусламж" гэж бичнэ үү.`]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const go = (id) => { onClose(); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 150); };

  const commands = {
    "тусламж": () => [
      "Боломжит командууд:",
      "  хэн       — намайг товч танилцуулна",
      "  туршлага  — ажлын туршлага",
      "  бүтээл    — бүтээлүүдийн жагсаалт",
      "  шагнал    — спортын амжилтууд",
      "  холбоо    — холбоо барих мэдээлэл",
      "  очих [хэсэг] — тухайн хэсэг рүү очно (тухай | бүтээл | холбоо)",
      "  огноо, цэвэрлэх, гарах",
      "  ... бас хэдэн нууц команд бий 🤫",
    ],
    "хэн": () => [`${me.name} — ${me.role}`, me.tagline],
    "туршлага": () => experience.map((e) => `  ${e.period.padEnd(12)} ${e.title} @ ${e.org}`),
    "бүтээл": () => projects.map((p, i) => `  ${i + 1}. ${p.title} — ${p.type}`),
    "шагнал": () => me.awards.map((a) => `  ${a.icon} ${a.place.padEnd(8)} ${a.title} ${a.year}`),
    "холбоо": () => contacts.map((c) => `  ${c.label.padEnd(10)} ${c.value}`),
    "огноо": () => [new Date().toLocaleString("mn-MN")],
    // ——— Нууц командууд ———
    "морь": () => HORSE.split("\n"),
    "цас": () => { toggleSnow(); return ["❄ Монголын өвөл ирлээ!"]; },
    "теннис": () => ["  🏓  пинг...", "         ...понг!  🏓", "Ширээний теннисээр Монгол улсын аваргын 3-р байр 🥉"],
    "бүжиг": () => { toggleSnow(); return ["💃 Бүжгийн горим асаалаа! (Korea Open 2022 — 1-р байр 🥇)"]; },
    "sudo": () => ["Уучлаарай, энэ серверийн админ нь би 😎"],
    "rhel": () => ["Red Hat Enterprise Linux 9 — 8-аас 9 руу ахиулах заавраа би бичсэн шүү 😉"],
  };

  const run = (raw) => {
    const text = raw.trim();
    const prompt = `${me.shortName}@лаб:~$ ${text}`;
    if (!text) return setLines((l) => [...l, prompt]);
    const [cmd, arg] = text.toLowerCase().split(/\s+/);
    if (cmd === "цэвэрлэх" || cmd === "clear") return setLines([]);
    if (cmd === "гарах" || cmd === "exit") return onClose();

    const out = [prompt];
    if (cmd === "очих") {
      const map = { "тухай": "about", "туршлага": "work", "бүтээл": "projects", "одоо": "building", "холбоо": "contact", "шагнал": "beyond", "нүүр": "top" };
      if (map[arg]) { go(map[arg]); return; }
      out.push("Жишээ: очих бүтээл | очих тухай | очих холбоо");
    } else if (commands[cmd]) out.push(...commands[cmd]());
    else out.push(`"${cmd}" гэсэн команд олдсонгүй. "тусламж" гэж бичнэ үү.`);
    setLines((l) => [...l, ...out]);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      run(input);
      if (input.trim()) setHistory((h) => [input, ...h]);
      setInput(""); setHIndex(-1);
    } else if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = Math.min(hIndex + 1, history.length - 1);
      setHIndex(i); setInput(history[i]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.max(hIndex - 1, -1);
      setHIndex(i); setInput(i === -1 ? "" : history[i]);
    }
  };

  return (
    <div className="lab-backdrop" onClick={onClose}>
      <div className="lab" onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }} role="dialog" aria-label="Лаб терминал">
        <div className="lab-bar">
          <i className="red" onClick={onClose} /><i className="yellow" /><i className="green" />
          <span>{me.shortName}@лаб — терминал</span>
        </div>
        <div className="lab-body">
          {lines.map((l, i) => <pre key={i}>{l}</pre>)}
          <div className="prompt">
            <span>{me.shortName}@лаб:~$</span>
            <input ref={inputRef} autoFocus value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey} aria-label="Команд бичих" spellCheck="false" autoCapitalize="off" />
          </div>
          <div className="quick">
            {["тусламж", "хэн", "туршлага", "шагнал", "морь"].map((c) => (
              <button key={c} onClick={() => run(c)}>{c}</button>
            ))}
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
