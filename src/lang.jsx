import { createContext, useContext, useEffect, useState } from "react";
import * as mn from "./data";
import * as en from "./data.en";

// ================================================================
//  Хэл солих (МН / EN).
//  - data.js / data.en.js — агуулга (намтар, бүтээл, туршлага ...)
//  - UI доорх — товч, гарчиг зэрэг жижиг бичвэрүүд
//  Компонент дотор: const { t, data, lang } = useLang();
// ================================================================

const UI = {
  mn: {
    // Эхлэх дэлгэц
    ready: "Бэлэн", loading: "Ачаалж байна",
    gateTitle: "Сайн уу, намайг Дөлгөөн гэдэг.", gateDim: "Хаанаас эхлэх үү?",
    choiceSite: "Сайт", choiceSiteSub: "Энгийнээр, өөрийн хурдаар",
    choiceStory: "Түүх", choiceStorySub: "Доош гүйлгээд үзэх, дуутай",
    soundOn: "Дуу асаалттай", soundOff: "Дуу асаах",
    // Түүх
    skipToSite: "Сайт руу алгасах →", scrollHint: "↓ гүйлгэ", enterSite: "Сайтыг үзэх",
    // Сайт
    nav: { about: "Тухай", work: "Туршлага", building: "Одоо", projects: "Бүтээл", beyond: "Кодоос гадна", contact: "Холбоо" },
    watchStory: "▶ Түүх үзэх",
    heroName: ["Ганболд", "Дөлгөөн"], heroSub: "миний түүх", heroHint: "Хөргийг хулганаараа сэгсрээд үз ↗",
    sec: { about: "Тухай", work: "Туршлага", building: "Одоо хийж буй", projects: "Бүтээлүүд", beyond: "Кодоос гадна", contact: "Холбоо" },
    beyondLead: ["Ширээний теннисний ширээ, бүжгийн тайзан дээр ч бас", "тэмцдэг."],
    place: () => "-р байр", individual: "Ганцаарчилсан",
    contactLead: "Шинэ орчинд, шинэ хамт олонтой ажиллах боломж, дадлага эсвэл хамтарсан төсөл байна уу? Холбогдоорой.",
    copied: "✓ Хуулагдлаа", copyEmail: "Имэйл хуулах",
    cvTitle: "Миний CV", cvText: "Боловсрол, ажлын туршлага, ур чадвар, шагналууд — нэг хуудсанд.",
    download: "Татах", openCv: "Нээж үзэх ↗",
    footerLeft: "Г.Дөлгөөн — Улаанбаатар", footerRight: "React дээр гараар бүтээв · ↑↑↓↓←→←→BA",
    close: "Хаах", visitSite: "Сайт үзэх ↗", githubCode: "GitHub код ↗", docOnly: "Баримт бичгийн хэлбэрээр хийгдсэн",
    step: (n) => `${n}-р алхам`, comingSoon: "Удахгүй нээгдэнэ", soon: "удахгүй",
    // Dock
    lab: "Лаб терминал", site: "Сайт", story: "Түүх", sound: "Дуу",
  },
  en: {
    ready: "Ready", loading: "Loading",
    gateTitle: "Hi, I'm Dulguun.", gateDim: "Where do you want to start?",
    choiceSite: "Site", choiceSiteSub: "Simple, at your own pace",
    choiceStory: "Story", choiceStorySub: "Scroll through it, with sound",
    soundOn: "Sound on", soundOff: "Turn on sound",
    skipToSite: "Skip to site →", scrollHint: "↓ scroll", enterSite: "Enter the site",
    nav: { about: "About", work: "Experience", building: "Now", projects: "Work", beyond: "Beyond code", contact: "Contact" },
    watchStory: "▶ Watch story",
    heroName: ["Dulguun", "Ganbold"], heroSub: "my story", heroHint: "Shake the portrait with your mouse ↗",
    sec: { about: "About", work: "Experience", building: "Now building", projects: "Work", beyond: "Beyond code", contact: "Contact" },
    beyondLead: ["At the table tennis table and on the dance stage, I", "compete too."],
    place: (n) => ({ 1: "st", 2: "nd", 3: "rd" }[n] || "th") + " place", individual: "Individual",
    contactLead: "Have an opportunity to work with a new team, an internship or a project in mind? Get in touch.",
    copied: "✓ Copied", copyEmail: "Copy email",
    cvTitle: "My CV", cvText: "Education, work experience, skills and awards — on one page.",
    download: "Download", openCv: "Open ↗",
    footerLeft: "Dulguun G. — Ulaanbaatar", footerRight: "Hand-built with React · ↑↑↓↓←→←→BA",
    close: "Close", visitSite: "Visit site ↗", githubCode: "GitHub code ↗", docOnly: "Delivered as a document",
    step: (n) => `Step ${n}`, comingSoon: "Coming soon", soon: "soon",
    lab: "Lab terminal", site: "Site", story: "Story", sound: "Sound",
  },
};

const LangContext = createContext(null);

// Эхлэх хэл: URL (?lang=en) → өмнө сонгосон → МН
const initialLang = () => {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "en" || q === "mn") return q;
  try { return localStorage.getItem("lang") || "mn"; } catch { return "mn"; }
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "Dulguun G. · Portfolio" : "Г.Дөлгөөн · Портфолио";
    try { localStorage.setItem("lang", lang); } catch { /* хадгалах боломжгүй */ }
  }, [lang]);

  const value = { lang, setLang, t: UI[lang], data: lang === "en" ? en : mn };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
