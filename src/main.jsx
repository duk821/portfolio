import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Фонтууд локалаар (Монгол Ө, Ү үсэг дэмждэг cyrillic-ext)
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import App from "./App";
import { LangProvider } from "./lang";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
