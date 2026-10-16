// The language context and the hooks that read it. Kept apart from the provider
// component so this file exports no components — which is what lets Vite's fast
// refresh keep its state when either half is edited.
import { createContext, useCallback, useContext, useMemo } from "react"
import { localize } from "./t"

export const LanguageContext = createContext(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>")
  return ctx
}

// `t(x)` resolves one wrapped string; `useLocale(data)` resolves a whole data
// tree at the boundary, so the components below it keep working on plain strings.
export function useT() {
  const { lang } = useLanguage()
  return useCallback((value) => localize(value, lang), [lang])
}

export function useLocale(data) {
  const { lang } = useLanguage()
  return useMemo(() => localize(data, lang), [data, lang])
}
