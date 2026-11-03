import { useT } from "../../i18n/lang"

// The "who it's for" act of the Kyrall background, told in the page's own flow
// layout rather than as a Figma board: a kicker, a heading, a short paragraph
// and the three needs as cards. Reflows for any width and switches language
// without anything drifting out of place.
export default function BackgroundWho({ act }) {
  const t = useT()
  return (
    <div className="mt-8">
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.kicker)}</p>
      <h3 className="mt-2 text-xl font-semibold text-cream">{t(act.title)}</h3>
      <p className="mt-3 max-w-3xl text-copy leading-relaxed text-ink">{t(act.body)}</p>

      <p className="mt-8 font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.needsLabel)}</p>
      <ul className="mt-3 grid gap-4 sm:grid-cols-3">
        {act.needs.map((need) => (
          <li key={need.title.en} className="rounded-lg border border-line bg-box-2/60 p-5">
            <p className="text-xl font-semibold text-cream">{t(need.title)}</p>
            <p className="mt-2 text-copy leading-relaxed text-ink">{t(need.body)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
