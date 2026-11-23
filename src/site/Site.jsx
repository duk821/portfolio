import { useEffect, useState } from "react";
import { me, projects as allProjects, contacts, nowBuilding, cv } from "../data";
import Reveal from "../components/Reveal";
import Thumb from "../components/Thumb";
import ExperienceScroll from "./ExperienceScroll";
import NowBuilding from "./NowBuilding";

// "Одоо хийж буй" төслийг бүтээлүүдийн жагсаалтаас хасна
const projects = allProjects.filter((p) => p.id !== nowBuilding.projectId);

const NAV = [["about", "Тухай"], ["work", "Туршлага"], ["building", "Одоо"], ["projects", "Бүтээл"], ["beyond", "Кодоос гадна"], ["contact", "Холбоо"]];

// Хэсгийн гарчиг: "01 — Тухай" маягийн дугаартай
function Head({ n, title }) {
  return (
    <Reveal className="sec-head">
      <span className="sec-num">({n})</span>
      <h2>{title}</h2>
    </Reveal>
  );
}

// Энгийн "сайт" горим — дугаарласан хэсгүүдтэй, минимал редакцын загвар
export default function Site({ onStory }) {
  const [preview, setPreview] = useState(null); // хулганыг дагах бүтээлийн зураг
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(false);
  const email = contacts.find((c) => c.label === "Имэйл");
  const p = allProjects.find((x) => x.id === open);

  useEffect(() => {
    const onEsc = (e) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(email.value); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* */ }
  };

  return (
    <div className="site">
      <nav className="snav mono">
        <a href="#top" className="snav-name">Г.Дөлгөөн</a>
        <div className="snav-links">
          {NAV.map(([id, label], i) => <a key={id} href={`#${id}`}><span>{String(i + 1).padStart(2, "0")}</span>{label}</a>)}
        </div>
        <div className="snav-actions">
          <a className="snav-cv" href={cv.file} download>CV ↓</a>
          <button className="snav-story" onClick={onStory}>▶ Түүх үзэх</button>
        </div>
      </nav>

      {/* 00 — Нүүр: нэр, чиглэл, нэг өгүүлбэр. Баруун талд тоосонцрон хөрөг (App-д зурагдана) */}
      <header id="top" className="s-hero">
        <p className="mono">00 — {me.location}</p>
        <h1>Ганболд<br />Дөлгөөн</h1>
        <p className="italic-sub"><em>миний түүх</em></p>
        <p className="s-role">{me.role}</p>
        <p className="s-tag">{me.tagline}</p>
        <p className="mono s-hint">Хөргийг хулганаараа сэгсрээд үз ↗</p>
      </header>

      <section id="about" className="s-sec">
        <Head n="01" title="Тухай" />
        <div className="two-col">
          <Reveal className="lead-text">
            <p>{me.bio[0]}</p>
          </Reveal>
          <Reveal delay={120} className="body-text">
            <p>{me.bio[1]}</p>
            <p>{me.bio[2]}</p>
            <div className="skills-inline">
              {me.skills.map((g) => (
                <div key={g.group}>
                  <p className="mono">{g.group}</p>
                  <p>{g.items.map(([n]) => n).join(" · ")}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="work" className="s-sec xp-sec">
        <Head n="02" title="Туршлага" />
        <ExperienceScroll />
      </section>

      <section id="building" className="s-sec">
        <Head n="03" title="Одоо хийж буй" />
        <NowBuilding />
      </section>

      <section id="projects" className="s-sec">
        <Head n="04" title="Бүтээлүүд" />
        <ul className="rows" onMouseLeave={() => setPreview(null)}>
          {projects.map((proj, i) => (
            <Reveal as="li" key={proj.id}>
              <button
                className="row proj-row"
                onMouseEnter={() => setPreview(proj)}
                onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
                onClick={() => setOpen(proj.id)}
              >
                <span className="proj-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="proj-main">
                  <h3>{proj.title}</h3>
                  <p className="proj-type">{proj.type} · {proj.year}</p>
                </div>
                <div className="proj-tech">{proj.tech.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="proj-mini"><Thumb project={proj} /></div>
                <span className="proj-arrow" aria-hidden="true">↗</span>
              </button>
            </Reveal>
          ))}
        </ul>
        {preview && (
          <div className="float-preview" style={{ transform: `translate(${pos.x + 24}px, ${pos.y - 90}px)` }}>
            <Thumb project={preview} />
          </div>
        )}
      </section>

      <section id="beyond" className="s-sec">
        <Head n="05" title="Кодоос гадна" />
        <Reveal><p className="lead-text narrow">Ширээний теннисний ширээ, бүжгийн тайзан дээр ч бас <em>тэмцдэг.</em></p></Reveal>
        <ul className="award-cards">
          {me.awards.map((a, i) => (
            <Reveal as="li" key={i} delay={(i % 3) * 80} className={`award-card p${a.place[0]}`}>
              <div className="award-top">
                <span className="award-place">{a.place[0]}<small>-р байр</small></span>
                <span className="award-emoji">{a.icon}</span>
              </div>
              <h3>{a.title.split(" — ")[0]}</h3>
              <p>{a.title.split(" — ")[1] || "Ганцаарчилсан"}{a.year && ` · ${a.year}`}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section id="contact" className="s-sec contact">
        <Head n="06" title="Холбоо" />
        <Reveal>
          <p className="body-text narrow">Шинэ орчинд, шинэ хамт олонтой ажиллах боломж, дадлага эсвэл хамтарсан төсөл байна уу? Холбогдоорой.</p>
          <a className="big-mail" href={email.href}>{email.value}</a>
          <div className="contact-links mono">
            <button onClick={copy}>{copied ? "✓ Хуулагдлаа" : "Имэйл хуулах"}</button>
            {contacts.filter((c) => c.label !== "Имэйл").map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer">{c.label} ↗</a>
            ))}
          </div>
        </Reveal>

        {/* CV татах */}
        <Reveal className="cv-card">
          <div className="cv-icon" aria-hidden="true">
            <span>PDF</span>
          </div>
          <div className="cv-text">
            <h3>Миний CV</h3>
            <p>Боловсрол, ажлын туршлага, ур чадвар, шагналууд — нэг хуудсанд.</p>
            <small className="mono">{cv.info}</small>
          </div>
          <div className="cv-btns">
            <a className="cv-btn" href={cv.file} download>Татах <span>↓</span></a>
            <a className="cv-btn ghost" href={cv.file} target="_blank" rel="noreferrer">Нээж үзэх ↗</a>
          </div>
        </Reveal>

        <footer className="s-foot mono">
          <span>© {new Date().getFullYear()} Г.Дөлгөөн — Улаанбаатар</span>
          <span>React дээр гараар бүтээв · ↑↑↓↓←→←→BA</span>
        </footer>
      </section>

      {p && (
        <div className="modal-backdrop" onClick={() => setOpen(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={p.title}>
            <button className="modal-close" onClick={() => setOpen(null)} aria-label="Хаах">✕</button>
            <Thumb project={p} />
            <div className="modal-body">
              <p className="mono">{p.type} · {p.year}</p>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <p className="mono tech">{p.tech.join(" · ")}</p>
              <div className="contact-links mono">
                {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Сайт үзэх ↗</a>}
                {p.code && <a href={p.code} target="_blank" rel="noreferrer">GitHub код ↗</a>}
                {!p.demo && !p.code && <span>Баримт бичгийн хэлбэрээр хийгдсэн</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
