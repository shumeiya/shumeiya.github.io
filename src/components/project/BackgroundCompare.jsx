import { useT } from "../../i18n/lang"

// The "same part, two ways" act of the Kyrall background: manual modeling in
// Onshape against generative modeling in Kyrall, side by side. Each column
// has a slot for a screen recording with a stopwatch overlay (`video`); until
// a recording is supplied the column shows its label and points only, and the
// "time taken" line stays out.
function Column({ col }) {
  const t = useT()
  return (
    <div className="flex flex-col rounded-lg border border-line bg-box-2/60 p-5">
      {col.video && (
        <div className="relative -mx-5 -mt-5 mb-5 aspect-video overflow-hidden rounded-t-lg border-b border-line bg-black">
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
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(col.kicker)}</p>
      <p className="mt-1 text-xl font-semibold text-cream">{t(col.title)}</p>
      <ul className="mt-4 space-y-2.5">
        {col.points.map((point) => (
          <li key={point.en} className="flex gap-3 text-copy leading-relaxed text-ink">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink/40" />
            <span>{t(point)}</span>
          </li>
        ))}
      </ul>
      {col.time && (
        <p className="mt-5 border-t border-line pt-3 font-mono-tight text-note uppercase tracking-wide text-fog">
          {t(col.timeLabel)} · <span className="text-cream">{t(col.time)}</span>
        </p>
      )}
    </div>
  )
}

export default function BackgroundCompare({ act }) {
  const t = useT()
  return (
    <div className="mt-14">
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(act.kicker)}</p>
      <h3 className="mt-2 text-xl font-semibold text-cream">{t(act.title)}</h3>
      <p className="mt-3 max-w-3xl text-copy leading-relaxed text-ink">{t(act.body)}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {act.columns.map((col) => (
          <Column key={col.title.en} col={col} />
        ))}
      </div>

      {act.closing && (
        <p className="mt-10 text-2xl font-semibold leading-snug text-cream sm:text-3xl">{t(act.closing)}</p>
      )}
    </div>
  )
}
