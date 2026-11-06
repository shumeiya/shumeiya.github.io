import { useT } from "../../i18n/lang"

// Kyrall's launch data in the page's own flow layout (the Figma board,
// LaunchDataBoard.jsx, is kept but no longer on the page): the headline numbers,
// three cards (funnel, week-1 retention, Editor value signals) and the next steps.
//
// Charts are HTML and an SVG line drawn to the card's width, so every label stays
// on the project type scale instead of scaling with an artboard. In light mode
// the Kyrall green is only ever a fill or a marker; anything readable is ink.
const CARD = "rounded-2xl bg-band p-6"

function Tag({ children }) {
  return <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{children}</p>
}

function CardHead({ tag, title }) {
  const t = useT()
  return (
    <>
      <Tag>{tag}</Tag>
      <p className="mt-tight text-xl font-semibold text-cream">{t(title)}</p>
    </>
  )
}

// "11.3K" → the number large, the unit letters a step down, as the deck sets them.
function StatValue({ value }) {
  const parts = value.split(/([0-9.]+)/).filter(Boolean)
  return (
    <p className="text-5xl font-semibold tracking-tight text-cream dark:text-kyrall">
      {parts.map((p, i) =>
        /[0-9]/.test(p) ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="text-3xl">
            {p}
          </span>
        )
      )}
    </p>
  )
}

function Funnel({ data }) {
  const t = useT()
  const max = data.rows[0].w
  return (
    <div className={`${CARD} flex flex-col`}>
      <CardHead tag={data.tag} title={data.title} />
      <ul className="mt-6 space-y-3">
        {data.rows.map((r, i) => (
          <li key={i}>
            <div className="flex items-baseline justify-between text-callout">
              <span className="text-ink">{t(r.label)}</span>
              {r.delta && <span className="text-fog">→ {r.delta}</span>}
            </div>
            <div
              className={`mt-1 flex h-8 items-center justify-end rounded-md px-3 ${r.lit ? "bg-kyrall" : "bg-kyrall/40"}`}
              style={{ width: `${Math.max(18, (r.w / max) * 100)}%` }}
            >
              <span className="text-note font-medium tabular-nums text-[#191717]">{r.value}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-callout text-ink">{t(data.note)}</p>
    </div>
  )
}

// Week-1 retention: a line over a 0–8% scale. The line is an SVG stretched to the
// box; the markers and every label are HTML placed by percentage, so text never
// stretches with it.
function Retention({ data }) {
  const t = useT()
  const MAX = 8
  const n = data.points.length
  const X0 = 4
  const X1 = 86
  const x = (i) => X0 + (i / (n - 1)) * (X1 - X0)
  const y = (v) => (1 - v / MAX) * 100
  const line = data.points.map((p, i) => `${x(i)},${y(p.v)}`).join(" ")
  return (
    <div className={`${CARD} flex flex-col`}>
      <CardHead tag={data.tag} title={data.title} />
      <div className="mt-6">
        <div className="relative h-44">
          {[0, 2, 4, 6].map((g) => (
            <div key={g} className="absolute inset-x-0" style={{ top: `${y(g)}%` }}>
              <div className="border-t border-ink/10" style={{ width: `${X1 + 2}%` }} />
              <span className="absolute right-0 -translate-y-1/2 text-note tabular-nums text-fog">{g}%</span>
            </div>
          ))}
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <polyline points={line} fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="text-ink" />
          </svg>
          {data.points.map((p, i) => {
            // A point lower than its neighbours (a dip, or the first point before
            // a rise) takes its label underneath, so the line never crosses it.
            const prev = data.points[i - 1]?.v ?? Infinity
            const next = data.points[i + 1]?.v ?? Infinity
            const below = p.v <= prev && p.v <= next
            return (
              <div key={i} className="absolute" style={{ left: `${x(i)}%`, top: `${y(p.v)}%` }}>
                <span className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-kyrall ring-1 ring-[#191717]" />
                <span
                  className={`absolute -translate-x-1/2 whitespace-nowrap text-note tabular-nums text-ink ${
                    below ? "translate-y-2" : "-translate-y-6"
                  }`}
                >
                  {p.v}%
                </span>
              </div>
            )
          })}
        </div>
        <div className="relative mt-3 h-5">
          {data.points.map((p, i) => (
            <span
              key={i}
              className="absolute -translate-x-1/2 text-note tabular-nums text-fog"
              style={{ left: `${x(i)}%` }}
            >
              {p.x}
            </span>
          ))}
        </div>
      </div>
      {data.note && <p className="mt-6 text-callout text-ink">{t(data.note)}</p>}
      <p className="mt-auto pt-4 text-callout font-medium text-cream">{t(data.flag)}</p>
    </div>
  )
}

function Editor({ data }) {
  const t = useT()
  const R = 40
  const C = 2 * Math.PI * R
  const maxW = 240
  return (
    <div className={`${CARD} flex flex-col`}>
      <CardHead tag={data.tag} title={data.title} />
      <div className="mt-6 flex items-center gap-4">
        <div className="relative size-24 shrink-0">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={R} fill="none" strokeWidth="14" className="stroke-ink/10" />
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              strokeWidth="14"
              strokeDasharray={`${(data.donut.pct / 100) * C} ${C}`}
              className="stroke-kyrall"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-cream">
            {data.donut.pct}%
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-callout font-semibold text-cream">{t(data.donut.label)}</p>
          <p className="mt-1 text-note text-fog">{t(data.donut.sub)}</p>
        </div>
      </div>

      <p className="mt-6 text-callout text-ink">{t(data.barsTitle)}</p>
      <ul className="mt-3 space-y-2">
        {data.bars.map((b) => (
          <li key={b.label} className="grid grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-3">
            <span className="text-note text-ink">{b.label}</span>
            <span className="h-2 rounded-full bg-ink/10">
              <span
                className={`block h-full rounded-full ${b.lit ? "bg-kyrall" : "bg-ink/40"}`}
                style={{ width: `${(b.w / maxW) * 100}%` }}
              />
            </span>
            <span className="text-right text-note tabular-nums text-ink">{b.value}</span>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-6 text-callout text-ink">{t(data.note)}</p>
    </div>
  )
}

function Next({ data }) {
  const t = useT()
  return (
    <div className="mt-section">
      <Tag>{data.tag}</Tag>
      <h3 className="mt-tight text-2xl font-semibold tracking-tight text-cream">{t(data.title)}</h3>
      <ul className="mt-visual grid gap-card sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((it, i) => (
          <li key={i} className={CARD}>
            <span className={it.p === "P0" ? "chip-accent" : "chip"}>{it.p}</span>
            <p className="mt-3 text-copy font-semibold text-cream">{t(it.title)}</p>
            <p className="mt-2 text-callout text-ink">{t(it.body)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function LaunchData({ data }) {
  const t = useT()
  return (
    <>
      <dl className="mt-visual grid grid-cols-2 gap-x-card gap-y-8 border-b border-line pb-8 lg:grid-cols-4">
        {data.stats.map((s) => (
          <div key={s.value}>
            <dd>
              <StatValue value={s.value} />
            </dd>
            <dt className="mt-2 text-callout text-ink">{t(s.label)}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-visual grid gap-card lg:grid-cols-3">
        <Funnel data={data.funnel} />
        <Retention data={data.retention} />
        <Editor data={data.editor} />
      </div>

      {/* 04 / NEXT, kept but not shown for now: <Next data={data.next} /> */}
    </>
  )
}
