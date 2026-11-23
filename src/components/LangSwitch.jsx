import { useLang } from "../lang";

// МН / EN солих товч — дарахад цагаан "бөмбөлөг" нөгөө тал руу гулсана
export default function LangSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  const next = lang === "mn" ? "en" : "mn";

  return (
    <button
      className={`lang-switch ${className}`}
      data-lang={lang}
      onClick={() => setLang(next)}
      aria-label={lang === "mn" ? "Switch to English" : "Монгол хэл рүү шилжих"}
      title={lang === "mn" ? "English" : "Монгол"}
    >
      <span className="lang-thumb" aria-hidden="true" />
      <span className={`lang-opt ${lang === "mn" ? "on" : ""}`}>МН</span>
      <span className={`lang-opt ${lang === "en" ? "on" : ""}`}>EN</span>
    </button>
  );
}
