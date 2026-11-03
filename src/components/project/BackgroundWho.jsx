import { useT } from "../../i18n/lang"

// The "who it's for" act of the Kyrall background, told in the page's own flow
// layout rather than as a Figma board. Type follows the project scale:
// Footnote kicker, Title 2 heading, Body paragraph, Headline card titles.
// Two colours (ink and the warm band) and the Kyrall green as a single marker.
export default function BackgroundWho({ act }) {
  const t = useT()
  return (
    <div className="mt-block">
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.kicker)}</p>
      <h3 className="mt-tight text-2xl font-semibold tracking-tight text-cream">{t(act.title)}</h3>
      <p className="mt-body max-w-2xl text-copy text-ink">{t(act.body)}</p>

      <p className="mt-block font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.needsLabel)}</p>
      <ul className="mt-body grid gap-card sm:grid-cols-3">
        {act.needs.map((need, i) => (
          <li key={i} className="rounded-2xl bg-[#efede8] p-6 dark:bg-[#2f2f2f]">
            <span aria-hidden="true" className="block h-1 w-6 rounded-full bg-kyrall" />
            <p className="mt-lead text-xl font-semibold text-cream">{t(need.title)}</p>
            <p className="mt-tight text-copy text-ink">{t(need.body)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
