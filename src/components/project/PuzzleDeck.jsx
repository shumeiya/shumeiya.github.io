// The Jigsaw Puzzle case study, laid out for the page rather than for a slide.
//
// The source is a deck of 1920-wide slides, each with a huge display title in the
// corner and the content floating under it. On the page the chapter title is drawn
// by ProjectDetail, so every slide here is only its content, rebuilt on one system:
// rounded tiles on the page's quiet surface, left-aligned, on one grid. The journey
// map becomes a real table (and a list of stage cards on a phone), the strategy
// cards a real grid, the palette real swatches. The words and the artwork are the
// deck's own; only the arrangement is new. One purple, the game's own, marks what
// the deck marked in purple. Colour lives in `.puzzle-deck` in index.css; copy in
// src/data/puzzleDeck.js.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (16px),
// nothing below `text-note` (13px). The cover's "JIGSAW PUZZLE" is a logotype,
// not running text, so it alone is set larger than the scale.
//
// Motion is the shared reveal in wpMotion.jsx: tiles rise in as they arrive, and
// the pieces inside a tile (bubbles, cards, steps) follow a beat apart. None of it
// runs under prefers-reduced-motion.
import { useId } from "react"
import { useReveal } from "./wpMotion"

// --- primitives ---------------------------------------------------------------

const ACCENT = "var(--pz-accent)"

const nn = (i) => String(i + 1).padStart(2, "0")

// Rises in when it reaches the viewport. `delay` (ms) staggers siblings that
// arrive together.
function Rise({ as: Tag = "div", delay = 0, style, children, ...rest }) {
  const ref = useReveal()
  return (
    <Tag ref={ref} data-reveal="" style={delay ? { "--reveal-delay": `${delay}ms`, ...style } : style} {...rest}>
      {children}
    </Tag>
  )
}

// One step of a sequence inside a rising block: `seq(i)` on a child makes it
// follow the block in, i-th in line (see `.pz-seq` in index.css).
const seq = (i) => ({ "--i": i })

// The one surface everything sits on.
function Tile({ as, delay, pad = "p-6 sm:p-8", className = "", children, ...rest }) {
  return (
    <Rise as={as} delay={delay} className={`pz-tile rounded-3xl ${pad} ${className}`} {...rest}>
      {children}
    </Rise>
  )
}

// The small caps label: a step number, a row name, "User traits".
function Label({ children, accent, className = "" }) {
  return (
    <p
      className={`font-mono-tight text-note uppercase tracking-wide ${accent ? "" : "text-fog"} ${className}`}
      style={accent ? { color: ACCENT } : undefined}
    >
      {children}
    </p>
  )
}

// --- 01 · Cover ---------------------------------------------------------------
// The deck's title slide: the logotype, the brief, and the event screen, on the
// game's own purple. The ink here is white in both themes, as it is on the slide.

function Cover({ slide }) {
  return (
    <Tile className="pz-cover relative isolate overflow-hidden text-white" pad="p-6 sm:p-10">
      <span aria-hidden="true" className="pz-display pz-watermark">
        {slide.title[0]}
      </span>
      <div className="flex items-center justify-between gap-4 border-b border-white/40 pb-3 font-mono-tight text-note uppercase tracking-wide text-white/80">
        <span>{slide.topLeft}</span>
        <span className="text-right">{slide.topRight}</span>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="pz-display pz-logotype leading-none">
            <span className="block">{slide.title[0]}</span>
            <span className="pz-outline block">{slide.title[1]}</span>
          </p>
          <p className="mt-8 max-w-xl text-copy text-white/85">{slide.text}</p>
          <p className="mt-8 text-xl font-semibold uppercase tracking-wide">{slide.tag}</p>
        </div>
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <img src={slide.phone} alt="" loading="lazy" className="w-full max-w-[300px] lg:max-w-[360px]" />
        </div>
      </div>
    </Tile>
  )
}

// --- 02 · User journey map ----------------------------------------------------
// Five stages across, five rows down. From md the table keeps the slide's shape;
// on a phone each stage becomes its own card, with the curve kept above them.

// The deck's mood curve, as drawn: a filled wash under a stroked line. Stretched
// to the row's width (the shape is the content, not its proportions); the stroke
// keeps its weight.
function MoodCurve({ className = "" }) {
  // The curve is drawn twice (table and cards; one is always hidden), and a
  // gradient looked up by id inside a hidden subtree paints nothing, so each
  // copy owns its ids.
  const id = useId()
  return (
    <svg viewBox="0 0 1214 172" preserveAspectRatio="none" aria-hidden="true" className={`block h-32 w-full ${className}`}>
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5a40e" stopOpacity="0.5" />
          <stop offset="1" stopColor="#f5a40e" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e26a00" />
          <stop offset="1" stopColor="#ffc26c" />
        </linearGradient>
      </defs>
      <path
        d="M482.409 21.5569C351.251 9.75357 419.139 150.97 312.644 150.969C160.089 150.968 260.896 125.127 109.658 113.696C72.5172 110.889 13.0186 30.6962 13.0186 30.6962V170.343H1214.02V32.9707C1093.85 44.3555 1162.2 121.255 1039.43 116.918C914.169 112.492 950.552 -4.40687 825.977 2.64966C718.648 8.72933 728.042 109.771 619.838 107.804C523.277 106.049 576.906 30.061 482.409 21.5569Z"
        fill={`url(#${id}-fill)`}
      />
      <path
        d="M1214.02 33.0487C1093.85 44.4621 1162.2 121.555 1039.43 117.207C914.169 112.77 950.552 -4.42286 825.977 2.65141C718.648 8.74637 728.042 110.042 619.838 108.07C523.277 106.31 576.906 30.1317 482.409 21.6062C351.251 9.77318 419.139 151.344 312.644 151.344C160.089 151.343 260.896 125.156 109.658 113.696C72.5172 110.882 13.0186 30.6962 13.0186 30.6962"
        fill="none"
        stroke={`url(#${id}-line)`}
        strokeWidth="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

function RowLabel({ children, className = "" }) {
  return (
    <p className={`text-copy font-medium ${className}`} style={{ color: ACCENT }}>
      {children}
    </p>
  )
}

function Journey({ slide }) {
  const { labels, stages } = slide
  const cell = "px-2 text-center text-callout text-ink"
  return (
    <Tile>
      {/* The table */}
      <div className="pz-journey hidden md:grid md:gap-x-4" style={{ gridTemplateColumns: "7rem repeat(5, minmax(0, 1fr))" }}>
        <RowLabel className="self-center">{labels.stage}</RowLabel>
        <ol className="pz-stage col-span-5 grid grid-cols-5 rounded-full py-3">
          {stages.map((s, i) => (
            <li key={i} className="pz-seq px-2 text-center text-callout font-medium text-white" style={seq(i)}>
              {s.name}
            </li>
          ))}
        </ol>

        <RowLabel className="pt-8">{labels.touch}</RowLabel>
        {stages.map((s, i) => (
          <p key={i} className={`${cell} pb-8 pt-8`}>
            {s.touch}
          </p>
        ))}

        <RowLabel className="pz-row pt-6">{labels.mood}</RowLabel>
        <div className="pz-row col-span-5 pt-6">
          <MoodCurve />
        </div>

        <RowLabel className="pz-row pt-6">{labels.pain}</RowLabel>
        {stages.map((s, i) => (
          <p key={i} className={`pz-row ${cell} pb-6 pt-6`}>
            {s.pain}
          </p>
        ))}

        <RowLabel className="pz-row pt-6">{labels.opp}</RowLabel>
        {stages.map((s, i) => (
          <p key={i} className={`pz-row ${cell} pb-6 pt-6`}>
            {s.opp}
          </p>
        ))}
        <span aria-hidden="true" className="pz-row col-span-6" />
      </div>

      {/* The same, one stage at a time */}
      <div className="md:hidden">
        <RowLabel>{labels.mood}</RowLabel>
        <MoodCurve className="mt-2" />
        <ol className="mt-6 space-y-3">
          {stages.map((s, i) => (
            <li key={i} className="pz-seq rounded-2xl bg-box p-4" style={seq(i)}>
              <p className="flex items-center gap-3">
                <span className="pz-stage flex size-8 shrink-0 items-center justify-center rounded-full text-note font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-copy font-semibold text-cream">{s.name}</span>
              </p>
              <dl className="mt-3 space-y-2">
                {[
                  [labels.touch, s.touch],
                  [labels.pain, s.pain],
                  [labels.opp, s.opp],
                ]
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-note font-medium" style={{ color: ACCENT }}>
                        {k}
                      </dt>
                      <dd className="text-copy text-ink">{v}</dd>
                    </div>
                  ))}
              </dl>
            </li>
          ))}
        </ol>
      </div>
    </Tile>
  )
}

// --- 03 · User motivation -----------------------------------------------------
// Two clouds of bubbles either side of the puzzle cube: who the players are, and
// what keeps them playing.

const BUBBLE = { sm: "size-24", md: "size-28", lg: "size-32" }

function Cluster({ data, align }) {
  const text = align === "right" ? "lg:text-right" : "lg:text-left"
  return (
    <div>
      <ul className={`flex flex-wrap items-center justify-center gap-3 ${align === "right" ? "lg:justify-start" : "lg:justify-end"}`}>
        {data.bubbles.map((b, i) => (
          <li
            key={i}
            className={`pz-bubble pz-seq ${BUBBLE[b.size] ?? BUBBLE.md} ${i % 2 ? "lg:translate-y-6" : ""} px-3 text-callout`}
            style={seq(i)}
          >
            {b.text}
          </li>
        ))}
      </ul>
      <div className={`mt-8 text-center ${text}`}>
        <Label>{data.label}</Label>
        <p className="mt-2 text-2xl font-semibold tracking-tight text-cream">{data.title}</p>
        <p className="mt-2 text-copy text-fog">{data.text}</p>
      </div>
    </div>
  )
}

function Motivation({ slide }) {
  return (
    <Tile>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-8">
        <Cluster data={slide.left} align="left" />
        <div className="flex flex-col items-center">
          <img src={slide.center.img} alt="" loading="lazy" className="pz-float size-40" />
          <p className="mt-2 text-note text-fog">{slide.center.caption}</p>
        </div>
        <Cluster data={slide.right} align="right" />
      </div>
    </Tile>
  )
}

// --- 04 · Design strategy -----------------------------------------------------

function StrategyIcon({ kind }) {
  if (kind === "bars")
    return (
      <svg width="48" height="48" viewBox="0 0 64 60" aria-hidden="true" className="block">
        <rect x="5" y="5" width="54" height="50" fill="none" stroke="#4f75ff" strokeWidth="10" />
        <rect x="5" y="5" width="30" height="50" fill="none" stroke="#4f75ff" strokeWidth="10" />
      </svg>
    )
  return (
    <img
      src={`/project/puzzle-game/deck/icon-${kind}.svg`}
      alt=""
      className="block size-12"
    />
  )
}

function Strategy({ slide }) {
  return (
    <ol className="grid gap-card md:grid-cols-3">
      {slide.cards.map((c, i) => (
        <Tile as="li" key={i} delay={i * 120}>
          <StrategyIcon kind={c.icon} />
          <h3 className="mt-6 text-2xl font-semibold tracking-tight text-cream">{c.title}</h3>
          <ul className="mt-4 space-y-2">
            {c.items.map((item, j) => (
              <li key={j} className="pz-seq flex gap-3 text-copy text-ink" style={seq(j)}>
                <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink/40" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Tile>
      ))}
    </ol>
  )
}

// --- 05 · Emotional edition ---------------------------------------------------

function Emotional({ slide }) {
  return (
    <Tile>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <ul className="space-y-8 lg:col-span-5">
          {slide.keys.map((k, i) => (
            <li key={i} className="pz-seq flex items-start gap-4" style={seq(i)}>
              <img src={k.icon} alt="" className="size-14 shrink-0" />
              <div>
                <p className="text-2xl font-semibold uppercase tracking-tight" style={{ color: k.color }}>
                  {k.title}
                </p>
                <p className="mt-1 text-copy text-fog">{k.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-3 gap-3 lg:col-span-7">
          {slide.photos.map((p, i) => (
            <li key={i} className="pz-seq relative overflow-hidden rounded-2xl" style={seq(i + 3)}>
              <img src={p.img} alt="" loading="lazy" className="block h-auto w-full" />
              <span className="absolute bottom-3 left-3 text-note font-semibold uppercase tracking-wide text-white sm:bottom-4 sm:left-4">
                {p.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  )
}

// --- 06 · Color standard ------------------------------------------------------
// The swatches as the deck states them: a name, a hex, and the colour itself. The
// hex is the content, so it is set in the mono face and never abbreviated.

function Swatch({ label, hex, style, delay, className = "", children }) {
  return (
    <Rise delay={delay} className={`relative flex min-h-48 flex-col overflow-hidden rounded-3xl p-6 text-white ${className}`} style={style}>
      {children}
      <div className="relative">
        {label && <p className="text-copy font-semibold">{label}</p>}
        <p className="font-mono-tight text-copy font-semibold tracking-wide">{hex}</p>
      </div>
    </Rise>
  )
}

function Colors({ slide }) {
  return (
    <div className="grid gap-card sm:grid-cols-2 lg:grid-cols-6">
      <Swatch label={slide.primary.label} hex={slide.primary.hex} style={{ background: slide.primary.bg }} className="lg:col-span-4" />
      <Swatch label={slide.secondary.label} hex={slide.secondary.hex} style={{ background: slide.secondary.bg }} delay={100} className="lg:col-span-2" />
      {slide.accents.map((a, i) => (
        <Swatch key={a.hex} hex={a.hex} style={{ background: a.top }} delay={200 + i * 100} className="lg:col-span-2">
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[42%]" style={{ background: a.bottom }} />
        </Swatch>
      ))}
    </div>
  )
}

// --- 07 · Home page -----------------------------------------------------------
// The event list on the left; on the right, the three regions it is built from
// and what each one is for, with the three states a puzzle set can be in.

function Home({ slide }) {
  return (
    <Tile>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="relative mx-auto w-full max-w-[320px] lg:col-span-5 lg:mx-0">
          <img src={slide.phone} alt="" loading="lazy" className="block h-auto w-full" />
          <img src={slide.coin} alt="" loading="lazy" className="pz-float absolute -left-8 bottom-16 w-28 sm:-left-12 sm:w-32" />
        </div>
        <ol className="lg:col-span-7">
          {slide.parts.map((p, i) => (
            <li key={i} className="pz-seq pz-dashed grid gap-4 py-6 first:pt-0 sm:grid-cols-[minmax(0,1fr)_auto]" style={seq(i)}>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-tight text-cream">{p.title}</h3>
                <p className="mt-1 text-copy text-fog">{p.text}</p>
                {p.states && (
                  <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                    {p.states.map((s, j) => (
                      <li key={j}>
                        <img src={s.img} alt="" loading="lazy" className="block h-auto w-full max-w-[150px]" />
                        <p className="mt-3 text-callout font-medium text-ink">{s.name}</p>
                        <p className="mt-1 text-note text-fog">{s.notes.join(" · ")}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <p className="chip self-start text-copy font-medium" style={{ color: ACCENT }}>
                {p.callout}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Tile>
  )
}

// --- 08 · Process display -----------------------------------------------------

function Process({ slide }) {
  return (
    <ol className="grid gap-card sm:grid-cols-2 xl:grid-cols-4">
      {slide.steps.map((s, i) => (
        <Tile as="li" key={i} delay={i * 100} pad="p-6">
          <Label accent>{nn(i)}</Label>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-cream">{s.title}</h3>
          <img src={s.img} alt="" loading="lazy" className="mx-auto mt-6 block w-full max-w-[260px]" />
          {s.text && <p className="mt-6 text-copy text-fog">{s.text}</p>}
        </Tile>
      ))}
    </ol>
  )
}

// --- 09 · Operation guidance --------------------------------------------------
// The three guided gestures, on the white ground the hands were drawn on.

function Guidance({ slide }) {
  return (
    <Tile className="pz-paper">
      <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
        {slide.items.map((it, i) => (
          <li key={i} className="pz-seq text-center" style={seq(i)}>
            <h3 className="text-xl font-semibold tracking-tight">{it.title}</h3>
            <img src={it.img} alt="" loading="lazy" className="mx-auto mt-6 block w-full max-w-[300px]" />
            <p className="pz-paper-fog mx-auto mt-6 max-w-xs text-copy">{it.text}</p>
          </li>
        ))}
      </ol>
    </Tile>
  )
}

// --- 10 · Page display --------------------------------------------------------

function Display({ slide }) {
  return (
    <Rise className="overflow-hidden rounded-3xl">
      <img src={slide.img} alt={slide.alt} loading="lazy" className="block h-auto w-full" />
    </Rise>
  )
}

// --- the deck -------------------------------------------------------------------

const BOARDS = {
  cover: Cover,
  journey: Journey,
  motivation: Motivation,
  strategy: Strategy,
  emotional: Emotional,
  colors: Colors,
  home: Home,
  process: Process,
  guidance: Guidance,
  display: Display,
}

export default function PuzzleDeck({ slide }) {
  const Board = BOARDS[slide.kind]
  if (!Board) return null
  return (
    <div className="puzzle-deck mt-visual">
      <Board slide={slide} />
    </div>
  )
}
