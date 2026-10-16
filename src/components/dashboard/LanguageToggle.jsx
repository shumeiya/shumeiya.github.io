import { useLanguage, useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// Sits beside the light/dark switch and is built out of the same glass: a
// hairline border over a blurred panel fill. Both options stay on screen rather
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
      className="flex h-8 shrink-0 items-center gap-0.5 rounded-full border border-line/60 bg-box/50 p-0.5 shadow-sm backdrop-blur-xl backdrop-saturate-150"
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
              isActive ? "bg-box-2/90 text-cream shadow-sm" : "text-ink/50 hover:text-ink"
            }`}
          >
            {o.short}
          </button>
        )
      })}
    </div>
  )
}
