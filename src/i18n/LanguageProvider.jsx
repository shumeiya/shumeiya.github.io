import { useCallback, useEffect, useMemo, useState } from "react"
import { DEFAULT_LANG, LANGS, localize } from "./t"
import { LanguageContext } from "./lang"
import { ui } from "./ui"

// Same key index.html reads before first paint.
const STORAGE_KEY = "lang-v2"

// A stored choice wins; failing that every visitor starts in English, whatever
// their browser's language. index.html resolves the same thing before first
// paint, so the CJK font stack is already in force and the page never flashes in
// one language before the other.
function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(stored)) return stored
  } catch {
    // Private mode or blocked storage — fall through to the default.
  }
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Nothing to do — the choice just won't survive a reload.
    }
    // `lang` on the root is what tells the browser which font and line-breaking
    // rules to use; `data-lang` is what the stylesheet hooks on to.
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"
    document.documentElement.dataset.lang = lang
    document.title = localize(ui.siteTitle, lang)
  }, [lang])

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "zh" : "en")), [])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, toggle])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
