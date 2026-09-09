import { createContext, useContext, useState } from "react";

export type Lang = "en" | "zh";

interface LangCtx {
  lang: Lang;

  toggle: () => void;
}

const LangContext = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () => setLang((l) => (l === "en" ? "zh" : "en"));

  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
