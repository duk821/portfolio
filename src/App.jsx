import { useCallback, useEffect, useState } from "react";
import { useLang } from "./lang";
import { buildShapes } from "./particles/shapes";
import ParticleField from "./particles/ParticleField";
import Gate from "./components/Gate";
import Story from "./components/Story";
import Site from "./site/Site";
import Lab from "./components/Lab";
import Snow from "./components/Snow";
import Dock from "./components/Dock";
import { setAmbient } from "./audio";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// URL-аас горимыг уншина: ?v=site эсвэл ?v=story
const initialMode = () => {
  const v = new URLSearchParams(window.location.search).get("v");
  return v === "site" || v === "story" ? v : "gate";
};

export default function App() {
  const [mode, setMode] = useState(initialMode); // gate | site | story
  const [shapes, setShapes] = useState(null);
  const [chapter, setChapter] = useState(0);
  const [sound, setSound] = useState(false);
  const [lab, setLab] = useState(false);
  const { data: { story } } = useLang();
  const [snow, setSnow] = useState(false);

  // Тоосонцрын дүрсүүдийг нэг удаа бэлдэнэ (гар утсан дээр цөөн цэг)
  useEffect(() => {
    const n = window.innerWidth < 760 ? 1400 : 2600;
    document.fonts.ready.then(() => buildShapes(n, "/me-dots.jpg")).then(setShapes);
  }, []);

  useEffect(() => { setAmbient(sound); }, [sound]);

  // Горим солигдоход URL шинэчилж, дээш гүйлгэнэ
  const go = useCallback((m) => {
    setMode(m);
    const url = m === "gate" ? window.location.pathname : `?v=${m}`;
    window.history.replaceState(null, "", url);
    window.scrollTo(0, 0);
    if (m === "story") setSound(true);
  }, []);

  const switchMode = (m) => { if (m === "story") setChapter(0); go(m); };

  // Easter egg: Konami код → цас
  useEffect(() => {
    let pos = 0;
    const onKey = (e) => {
      pos = e.key === KONAMI[pos] ? pos + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) { setSnow((s) => !s); pos = 0; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Горим бүрт тоосонцрын дүрс, байрлал
  const field = {
    gate: { shape: "portrait", layout: "center", scale: 0.9, className: "dim" },
    story: { shape: story[chapter].shape, layout: "right", scale: 0.62, className: "" },
    site: { shape: "portrait", layout: "right", scale: 0.62, className: "site-field" },
  }[mode];

  return (
    <div className={`app mode-${mode}`}>
      <ParticleField shapes={shapes} {...field} />

      {mode === "gate" && <Gate ready={!!shapes} onChoose={go} sound={sound} onSound={() => setSound((s) => !s)} />}
      {mode === "story" && <Story active={chapter} onActive={setChapter} onFinish={() => go("site")} />}
      {mode === "site" && <Site onStory={() => switchMode("story")} />}

      {mode !== "gate" && (
        <Dock mode={mode} onMode={switchMode} onLab={() => setLab(true)} sound={sound} onSound={() => setSound((s) => !s)} />
      )}

      {lab && <Lab onClose={() => setLab(false)} toggleSnow={() => setSnow((s) => !s)} />}
      {snow && <Snow />}
    </div>
  );
}
