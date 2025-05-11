import { useState, useContext, createContext } from "react";
import { defaultLang, LangKey, languages } from "../contants/languages";

type LangContextType = {
  lang: LangKey;
  t: (path: string) => string;
  setLang: (lang: LangKey) => void;
};

const LanguageContext = createContext<LangContextType | null>(null);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<LangKey>(defaultLang);

  const t = (path: string): string => {
    const keys = path.split(".");
    let value: any = languages[lang];
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return path; // fallback
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
