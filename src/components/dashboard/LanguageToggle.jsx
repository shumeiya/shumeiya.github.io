import { useLanguage, useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// Sits beside the light/dark switch and is cut from the same `.glass` as the
// nav pills (see index.css). Both options stay on screen rather
// than one button flipping between them — a single "中" gives no clue whether it
// is naming the current language or the one a click would take you to.
const OPTIONS = [
  { code: "en", short: "EN", label: ui.langEn },
  { code: "zh", short: "中", label: ui.langZh },
]

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()
  const t = useT()

  return (
    <div
      role="group"
      aria-label={t(ui.toggleLang)}
      className="glass flex h-8 shrink-0 items-center gap-0.5 rounded-full p-0.5"
    >
      {OPTIONS.map((o) => {
        const isActive = lang === o.code
        return (
          <button
            key={o.code}
            onClick={() => setLang(o.code)}
            aria-pressed={isActive}
            aria-label={t(o.label)}
            className={`flex h-7 min-w-7 items-center justify-center rounded-full px-1.5 font-mono-tight text-[11px] leading-none transition-colors ${
              isActive ? "glass-well text-cream" : "text-ink/50 hover:text-ink"
            }`}
          >
            {o.short}
          </button>
        )
      })}
    </div>
  )
}
