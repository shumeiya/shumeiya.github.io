import { useCallback, useEffect, useMemo, useState } from "react"
import { DEFAULT_LANG, LANGS, localize } from "./t"
import { LanguageContext } from "./lang"
import { ui } from "./ui"

const STORAGE_KEY = "lang"

// A stored choice wins; failing that the browser's own preference decides, so a
// Chinese-language visitor lands on the Chinese site without touching anything.
// index.html resolves the same thing before first paint, so the CJK font stack is
// already in force and the page never flashes in one language before the other.
function initialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (LANGS.includes(stored)) return stored
  } catch {
    // Private mode or blocked storage — fall through to the browser preference.
  }
  const nav = typeof navigator !== "undefined" ? navigator.language || "" : ""
  return nav.toLowerCase().startsWith("zh") ? "zh" : DEFAULT_LANG
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
