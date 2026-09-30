import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { LangCode, SITE_LANG, LANGUAGES, isSupportedLang, translations, T } from "./i18n";

const STORAGE_KEY = "dark.lang";

function toLangPrefix(lang: LangCode): string {
  if (lang === "de" || lang === "nl" || lang === "en") return `/${lang}`;
  return "/en";
}

interface LanguageContextValue {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: T;
  dir: 'ltr' | 'rtl';
  langPrefix: string;
}

const dirFor = (l: LangCode): 'ltr' | 'rtl' =>
  LANGUAGES.find(x => x.code === l)?.dir ?? 'ltr';

const LanguageContext = createContext<LanguageContextValue>({
  lang: SITE_LANG,
  setLang: () => {},
  t: translations[SITE_LANG],
  dir: dirFor(SITE_LANG),
  langPrefix: toLangPrefix(SITE_LANG),
});

function initialLang(): LangCode {
  const path = window.location.pathname;
  const m = path.match(/^\/(de|nl|en)(\/|$)/);
  if (m && isSupportedLang(m[1])) return m[1] as LangCode;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && isSupportedLang(stored)) return stored;
  } catch { /* blocked storage */ }

  return SITE_LANG;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>(initialLang);

  const setLang = useCallback((next: LangCode) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch { /* */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dirFor(lang);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: translations[lang], dir: dirFor(lang), langPrefix: toLangPrefix(lang) }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
