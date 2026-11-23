import { useEffect, useRef, useState } from "react";
import { useLang } from "../lang";

const HORSE = (caption) => String.raw`
        ,--,
  _ ___/ /\|
 ;( )__, )
; //   '--;
  \     |
   ^    ^      ` + caption;

// Терминалын бичвэрүүд (МН / EN)
const TXT = {
  mn: {
    welcome: (n) => `Тавтай морил, ${n}-ийн лабораторид! Командуудыг харах бол "тусламж" гэж бичнэ үү.`,
    help: [
      "Боломжит командууд:",
      "  хэн       — намайг товч танилцуулна",
      "  туршлага  — ажлын туршлага",
      "  бүтээл    — бүтээлүүдийн жагсаалт",
      "  шагнал    — спортын амжилтууд",
      "  холбоо    — холбоо барих мэдээлэл",
      "  cv        — CV татах",
      "  очих [хэсэг] — тухайн хэсэг рүү очно (тухай | бүтээл | холбоо)",
      "  огноо, цэвэрлэх, гарах",
      "  ... бас хэдэн нууц команд бий 🤫",
    ],
    cv: (i) => `📄 CV татаж байна... (${i})`,
    horse: "Дэл сүүл намируулсан морь давхиж байна...",
    snow: "❄ Монголын өвөл ирлээ!",
    tennis: ["  🏓  пинг...", "         ...понг!  🏓", "Ширээний теннисээр Монгол улсын аваргын 3-р байр 🥉"],
    dance: "💃 Бүжгийн горим асаалаа! (Korea Open 2022 — 1-р байр 🥇)",
    sudo: "Уучлаарай, энэ серверийн админ нь би 😎",
    rhel: "Red Hat Enterprise Linux 9 — 8-аас 9 руу ахиулах заавраа би бичсэн шүү 😉",
    goHint: "Жишээ: очих бүтээл | очих тухай | очих холбоо",
    notFound: (c) => `"${c}" гэсэн команд олдсонгүй. "тусламж" гэж бичнэ үү.`,
    title: "терминал", host: "лаб", placeholder: "Команд бичих",
    quick: ["тусламж", "хэн", "туршлага", "шагнал", "морь"],
    locale: "mn-MN",
  },
  en: {
    welcome: (n) => `Welcome to ${n}'s lab! Type "help" to see the commands.`,
    help: [
      "Available commands:",
      "  whoami    — a quick intro",
      "  exp       — work experience",
      "  work      — list of projects",
      "  awards    — sports achievements",
      "  contact   — contact info",
      "  cv        — download my CV",
      "  goto [section] — jump to a section (about | work | contact)",
      "  date, clear, exit",
      "  ... and a few secret commands 🤫",
    ],
    cv: (i) => `📄 Downloading CV... (${i})`,
    horse: "A Mongolian horse gallops by, mane in the wind...",
    snow: "❄ Mongolian winter has arrived!",
    tennis: ["  🏓  ping...", "         ...pong!  🏓", "3rd place at the Mongolian National Table Tennis Championship 🥉"],
    dance: "💃 Dance mode on! (Korea Open 2022 — 1st place 🥇)",
    sudo: "Sorry, I'm the admin of this server 😎",
    rhel: "Red Hat Enterprise Linux 9 — I wrote the 8 → 9 upgrade guide 😉",
    goHint: "Example: goto work | goto about | goto contact",
    notFound: (c) => `Command "${c}" not found. Type "help".`,
    title: "terminal", host: "lab", placeholder: "Type a command",
    quick: ["help", "whoami", "exp", "awards", "horse"],
    locale: "en-US",
  },
};

// Монгол ба англи команд аль алинд нь ажиллана
const ALIAS = {
  "тусламж": "help", "хэн": "whoami", "туршлага": "exp", "бүтээл": "work", "шагнал": "awards", "холбоо": "contact",
  "огноо": "date", "морь": "horse", "цас": "snow", "теннис": "tennis", "бүжиг": "dance",
  "цэвэрлэх": "clear", "гарах": "exit", "очих": "goto",
};
const SECTIONS = {
  "тухай": "about", "туршлага": "work", "бүтээл": "projects", "одоо": "building", "холбоо": "contact", "шагнал": "beyond", "нүүр": "top",
  about: "about", exp: "work", experience: "work", work: "projects", projects: "projects", now: "building", contact: "contact", awards: "beyond", home: "top",
};

// "Лаб" — терминал. Команд бүр текстийн массив буцаадаг функц.
export default function Lab({ onClose, toggleSnow }) {
  const { lang, data: { me, projects, contacts, experience, cv } } = useLang();
  const T = TXT[lang];
  const [lines, setLines] = useState([T.welcome(me.shortName)]);
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
    help: () => T.help,
    whoami: () => [`${me.name} — ${me.role}`, me.tagline],
    exp: () => experience.map((e) => `  ${e.period.padEnd(12)} ${e.title} @ ${e.org}`),
    work: () => projects.map((p, i) => `  ${i + 1}. ${p.title} — ${p.type}`),
    awards: () => me.awards.map((a) => `  ${a.icon} ${a.place.padEnd(10)} ${a.title} ${a.year}`),
    contact: () => contacts.map((c) => `  ${c.label.padEnd(10)} ${c.value}`),
    cv: () => {
      const a = document.createElement("a");
      a.href = cv.file; a.download = "";
      a.click();
      return [T.cv(cv.info)];
    },
    date: () => [new Date().toLocaleString(T.locale)],
    // ——— Нууц командууд ———
    horse: () => HORSE(T.horse).split("\n"),
    snow: () => { toggleSnow(); return [T.snow]; },
    tennis: () => T.tennis,
    dance: () => { toggleSnow(); return [T.dance]; },
    sudo: () => [T.sudo],
    rhel: () => [T.rhel],
  };

  const run = (raw) => {
    const text = raw.trim();
    const prompt = `${me.shortName}@${T.host}:~$ ${text}`;
    if (!text) return setLines((l) => [...l, prompt]);
    const [typed, arg] = text.toLowerCase().split(/\s+/);
    const cmd = ALIAS[typed] || typed;
    if (cmd === "clear") return setLines([]);
    if (cmd === "exit") return onClose();

    const out = [prompt];
    if (cmd === "goto") {
      if (SECTIONS[arg]) { go(SECTIONS[arg]); return; }
      out.push(T.goHint);
    } else if (commands[cmd]) out.push(...commands[cmd]());
    else out.push(T.notFound(typed));
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
      <div className="lab" onClick={(e) => { e.stopPropagation(); inputRef.current?.focus(); }} role="dialog" aria-label={T.title}>
        <div className="lab-bar">
          <i className="red" onClick={onClose} /><i className="yellow" /><i className="green" />
          <span>{me.shortName}@{T.host} — {T.title}</span>
        </div>
        <div className="lab-body">
          {lines.map((l, i) => <pre key={i}>{l}</pre>)}
          <div className="prompt">
            <span>{me.shortName}@{T.host}:~$</span>
            <input ref={inputRef} autoFocus value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey} aria-label={T.placeholder} spellCheck="false" autoCapitalize="off" />
          </div>
          <div className="quick">
            {T.quick.map((c) => (
              <button key={c} onClick={() => run(c)}>{c}</button>
            ))}
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
