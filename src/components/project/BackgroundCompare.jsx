import { useT } from "../../i18n/lang"

// The "same part, two ways" act of the Kyrall background: manual modeling in
// Onshape against generative modeling in Kyrall, side by side. Each column has a
// slot for a screen recording (`video: { src }`) and a measured time (`time`);
// until they are supplied the column shows its label and points only.
//
// Type follows the project scale (Footnote / Title 2 / Body / Headline). The
// Kyrall column is the only place the brand green appears: a marker on its
// kicker, so the eye lands on the "after" without a second colour.
function Column({ col }) {
  const t = useT()
  return (
    <div className="flex flex-col rounded-2xl bg-[#efede8] p-6 dark:bg-[#2f2f2f]">
      {col.video && (
        <div className="relative -mx-6 -mt-6 mb-6 aspect-video overflow-hidden rounded-t-2xl bg-black">
          <video
            src={col.video.src}
            className="block h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>
      )}
      <p className="flex items-center gap-2 font-mono-tight text-note uppercase tracking-wide text-fog">
        {col.accent && <span aria-hidden="true" className="size-2 rounded-full bg-kyrall" />}
        {t(col.kicker)}
      </p>
      <p className="mt-tight text-2xl font-semibold tracking-tight text-cream">{t(col.title)}</p>
      <ul className="mt-lead space-y-body">
        {col.points.map((point, i) => (
          <li key={i} className="flex gap-3 text-copy text-ink">
            <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-ink/40" />
            <span>{t(point)}</span>
          </li>
        ))}
      </ul>
      {col.time && (
        <p className="mt-6 border-t border-line pt-4 text-callout text-fog">
          {t(col.timeLabel)} <span className="ml-1 font-semibold text-cream">{t(col.time)}</span>
        </p>
      )}
    </div>
  )
}

export default function BackgroundCompare({ act }) {
  const t = useT()
  return (
    <div className="mt-section">
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.kicker)}</p>
      <h3 className="mt-tight text-2xl font-semibold tracking-tight text-cream">{t(act.title)}</h3>
      <p className="mt-body max-w-2xl text-copy text-ink">{t(act.body)}</p>

      <div className="mt-visual grid gap-card md:grid-cols-2">
        {act.columns.map((col) => (
          <Column key={t(col.title)} col={col} />
        ))}
      </div>

      {act.closing && (
        <p className="mt-section text-3xl font-semibold tracking-tight text-cream">{t(act.closing)}</p>
      )}
    </div>
  )
}
