import { useEffect, useRef, useState } from "react"
import { useT } from "../../i18n/lang"
import { CountUp, Segmented, Wipe, useInView, useReveal, useStepper } from "./wpMotion"
import { tt } from "../../i18n/t"
import { ui } from "../../i18n/ui"

// The WeatherPets case study, rebuilt from the V3 deck in Figma — one board per
// slide, frames "V3 · 02" to "V3 · 16" (the cover folds into the page hero).
//
// The deck's composition and its look are kept: rounded cards in the app's blue,
// a warm yellow and near-black, a pale blue ground, folder tabs on the cards that
// carry a label, tilted pills, 3D stickers peeking over card edges, and four of the
// slides (Insights, The Turn, Home Page, Launch) set on a full colour stage the way
// they were in the deck. Nothing is scaled: every slide is rebuilt from real boxes
// and text, and every grid collapses to one column on a phone.
//
// Colour lives in `.wp-deck` in index.css — the strong fills never flip, the pale
// ground and white cards turn into dark tints in dark mode. Copy lives in
// src/data/weatherPetsDeck.js, taken word for word from the deck.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (18px),
// nothing below `text-note` (18px).

const HAS = tt("Yes", "有")
const HAS_NOT = tt("No", "无")

// --- colour ----------------------------------------------------------------------

const BLUE = "var(--wp-blue)"
const YELLOW = "var(--wp-yellow)"
const NIGHT = "var(--wp-night)"
const ON_FILL = "var(--wp-on-fill)"
const INK = "var(--wp-ink)"
const QUIET = "var(--wp-quiet)"
const LINK = "var(--wp-link)"
const PALE = "var(--wp-pale)"
const PALE_2 = "var(--wp-pale-2)"
const CARD = "var(--wp-card)"
const RING = "inset 0 0 0 1px var(--wp-ring)"

// Each surface names its own ground, ink, quiet ink and highlight ink, so the same
// pieces work on any card. Blue keeps its quiet ink at full white: white at 85% on
// the blue drops under AA.
const TONE = {
  card: { bg: CARD, fg: INK, q: QUIET, hl: LINK, ring: true },
  pale: { bg: PALE, fg: INK, q: QUIET, hl: LINK },
  grey: { bg: "var(--wp-grey)", fg: INK, q: QUIET, hl: LINK },
  blue: { bg: BLUE, fg: "#ffffff", q: "#ffffff", hl: YELLOW },
  yellow: { bg: YELLOW, fg: ON_FILL, q: "rgba(21,24,33,0.78)", hl: "var(--wp-link-on-yellow)" },
  dark: { bg: NIGHT, fg: "#ffffff", q: "rgba(255,255,255,0.75)", hl: YELLOW, ring: true },
  night2: { bg: "var(--wp-night-2)", fg: "#ffffff", q: "rgba(255,255,255,0.7)", hl: YELLOW },
  // The card laid on a fill or on a slide's panel. White in light mode; in dark
  // mode the dark card, so it no longer glares on the dark panels.
  white: { bg: CARD, fg: INK, q: QUIET, hl: LINK, ring: true },
}

const surface = (tone) => {
  const t = TONE[tone] ?? TONE.card
  return { background: t.bg, color: t.fg, boxShadow: t.ring ? RING : undefined }
}

// --- primitives ------------------------------------------------------------------

// `**…**` marks the words the slide set in its highlight colour.
function Rich({ text, color }) {
  return String(text)
    .split(/\*\*(.+?)\*\*/)
    .map((part, i) =>
      i % 2 ? (
        <strong key={i} className="font-bold" style={{ color }}>
          {part}
        </strong>
      ) : (
        <span key={i}>{part}</span>
      )
    )
}

// A rounded card in one of the deck's tones.
function Card({ tone = "card", className = "", style, children }) {
  const ref = useReveal()
  return (
    <div ref={ref} data-reveal="" className={`relative rounded-[1.75rem] p-6 sm:p-6 ${className}`} style={{ ...surface(tone), ...style }}>
      {children}
    </div>
  )
}

// A card with a folder tab — "▶ About Project", "▶ Insight 01". The tab is the same
// fill as the body and overlaps its top corner, so the two read as one shape.
function TabCard({ tone = "card", tab, align = "left", className = "", bodyClass = "", children }) {
  const s = surface(tone)
  const ref = useReveal()
  return (
    <div ref={ref} data-reveal="" className={`relative flex flex-col ${className}`}>
      <div className={`flex ${align ==="right"?"justify-end":""}`}>
        <div
          className="wp-round rounded-t-[1.25rem] px-6 pb-6 pt-3 text-copy font-extrabold"
          style={{ background: s.background, color: TONE[tone].hl === YELLOW ? "#ffffff" : TONE[tone].hl }}
        >
          ▶ {tab}
        </div>
      </div>
      <div
        className={`relative -mt-4 flex-1 rounded-[1.75rem] p-6 sm:p-6 ${align ==="right"?"rounded-tr-none":"rounded-tl-none"} ${bodyClass}`}
        style={{ background: s.background, color: s.color }}
      >
        {children}
      </div>
    </div>
  )
}

// A pill. The deck set these at a slight hand-placed tilt; the page keeps them
// straight (`tilt` is accepted and ignored), with a hairline outline at most.
// eslint-disable-next-line no-unused-vars
function Pill({ tone = "white", tilt = "", outline = false, className = "", children }) {
  const t = TONE[tone]
  return (
    <span
      className={`inline-block rounded-full px-4 py-2 text-note font-bold ${className}`}
      style={{
        background: t.bg,
        color: t.fg,
        boxShadow: outline ? `inset 0 0 0 1px ${INK}` : t.ring ? RING : undefined,
      }}
    >
      {children}
    </span>
  )
}

// A label pill in the "link" ink — the deck's small blue-on-pale tags.
function Tag({ onPale = false, children, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full px-3.5 py-1 text-note font-bold ${className}`}
      style={{ background: onPale ? CARD : PALE, color: LINK }}
    >
      {children}
    </span>
  )
}

function Num({ children, className = "", style }) {
  return (
    <span className={`wp-round font-extrabold ${className}`} style={style}>
      {typeof children === "string" ? <CountUp>{children}</CountUp> : children}
    </span>
  )
}

function Disc({ children, tone = "blue", size = 40 }) {
  const fill = { blue: BLUE, yellow: YELLOW, white: "#ffffff" }[tone]
  return (
    <span
      aria-hidden="true"
      className="wp-round inline-flex shrink-0 items-center justify-center rounded-full text-copy font-extrabold"
      style={{ width: size, height: size, background: fill, color: tone === "blue" ? "#ffffff" : ON_FILL }}
    >
      {children}
    </span>
  )
}

function Dot({ color = BLUE, className = "" }) {
  return <span aria-hidden="true" className={`inline-block size-2.5 shrink-0 rounded-full ${className}`} style={{ background: color }} />
}

function Bullets({ items, color = BLUE, className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-copy">
          <Dot color={color} className="mt-[0.47em]" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Sticker({ src, className = "" }) {
  return <img src={src} alt="" aria-hidden="true" loading="lazy" className={`pointer-events-none block h-auto select-none ${className}`} />
}

// A phone screen in the deck's frame: near-black for the current design, grey for
// the one it replaced, yellow for the screen a slide is pointing at.
const FRAME = { dark: "#151821", grey: "#b8c0cc", yellow: "#ffc531" }

function Phone({ src, alt = "", frame = "dark", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.4rem] border-[5px] bg-white shadow-[0_14px_28px_rgba(10,42,102,0.2)] ${className}`}
      style={{ borderColor: FRAME[frame] }}
    >
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </div>
  )
}

// The deck's round arrow button between two steps. It points right while the steps
// sit in a row and turns down once they stack.
function ArrowDisc({ tone = "blue", turn = "sm", size = 44, className = "" }) {
  const rot = { sm: "rotate-90 sm:rotate-0", lg: "rotate-90 lg:rotate-0", none: "" }[turn]
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size, background: tone === "blue" ? BLUE : YELLOW, color: tone === "blue" ? "#fff" : ON_FILL }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5} className={rot}>
        <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

// --- the board shell ---------------------------------------------------------------

// A slide. The title and lead always sit plainly on the page, set like every
// other case study's chapter title; `stage` puts only the slide's content on one
// of the deck's full colour backdrops.
function Board({ slide, stage, children }) {
  const st = stage ? TONE[stage] : null
  const head = (
    <>
      <h3 className="text-4xl font-semibold tracking-tight text-cream">{slide.title}</h3>
      {slide.lead && (
        <p className="mt-lead max-w-3xl text-copy" style={{ color: QUIET }}>
          {slide.lead}
        </p>
      )}
    </>
  )
  if (!stage) {
    return (
      <div className="wp-deck mt-tight">
        {head}
        <div className="mt-visual">{children}</div>
      </div>
    )
  }
  return (
    <div className="wp-deck mt-tight">
      {head}
      <div
        className={`relative mt-visual overflow-hidden rounded-[2rem] px-4 py-6 sm:rounded-[2.5rem] sm:p-8 lg:p-8 ${
          stage === "dark" ? "wp-checker" : ""
        }`}
        style={
          stage === "dark"
            ? { ...surface(stage), backgroundColor: st.bg }
            : { background: "var(--wp-panel)", color: INK }
        }
      >
        {children}
      </div>
    </div>
  )
}

// --- 02 · Overview ------------------------------------------------------------------

// The three shapes under the introduction: a cloud-topped white card, a blue card
// with one rounded flank, a plain yellow card.
const SHAPE = {
  card: "rounded-[1.75rem] rounded-t-[3.5rem]",
  blue: "rounded-[1.75rem] rounded-r-[4.5rem]",
  yellow: "rounded-[1.75rem]",
}

function Overview({ slide }) {
  const a = slide.about
  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1.75fr_1fr]">
        <TabCard tone="dark" tab={a.tab} align="right" bodyClass="flex flex-col lg:p-8">
          <p className="wp-round text-[22px] font-extrabold">✦ {a.brand}</p>
          <h4 className="mt-1 text-2xl font-semibold tracking-tight">{a.title}</h4>
          <p className="mt-4 max-w-3xl text-copy" style={{ color: TONE.dark.q }}>
            <Rich text={a.text} color={YELLOW} />
          </p>
          <ul className="mt-auto grid gap-4 pt-8 sm:grid-cols-3">
            {a.shapes.map((sh) => {
              const t = TONE[sh.tone === "card" ? "white" : sh.tone]
              return (
                <li key={sh.sub} className={`p-6 ${SHAPE[sh.tone]}`} style={{ background: t.bg, color: t.fg }}>
                  <p className="text-2xl font-black">{sh.title}</p>
                  <p className="wp-round mt-1 text-note font-bold" style={{ color: t.q }}>
                    {sh.sub}
                  </p>
                  <p className="mt-3 text-copy">{sh.text}</p>
                </li>
              )
            })}
          </ul>
        </TabCard>

        <div className="grid content-start gap-6">
          <Card tone="pale">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-2xl font-semibold tracking-tight">{slide.role.title}</h4>
              <Pill tone="yellow" tilt="-rotate-3">
                {slide.role.pill}
              </Pill>
            </div>
            <Bullets items={slide.role.items} className="mt-6" />
          </Card>
          <Card tone="blue" className="lg:pr-24">
            <h4 className="text-2xl font-semibold tracking-tight">{slide.team.title}</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {slide.team.pills.map((p, i) => (
                <li key={p}>
                  <span
                    className="inline-block rounded-full px-4 py-2 text-note font-bold"
                    style={i === 2 ? { background: YELLOW, color: ON_FILL } : { background: "#fff", color: "#0058d6" }}
                  >
                    {p}
                  </span>
                </li>
              ))}
            </ul>
            <Sticker src="/project/weatherpets/deck/sticker-cloud.png" className="absolute -right-3 -top-12 hidden w-28 sm:block" />
          </Card>
        </div>
      </div>

      {/* The process, start to finish. Dotted links stretch to fill each line, so
          the seven steps sit evenly whether they take one line or three. */}
      <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-3">
        {slide.steps.map((step, i) => {
          const last = i === slide.steps.length - 1
          const tone = i === 5 ? "yellow" : i % 2 ? "pale" : "card"
          return (
            <li key={step} className={`flex items-center gap-2 ${last ?"":"flex-1"}`}>
              <Pill tone={tone} outline className="whitespace-nowrap">
                <span className="wp-round">{String(i + 1).padStart(2, "0")}</span>&nbsp; {step}
              </Pill>
              {!last && <span aria-hidden="true" className="h-0 min-w-4 flex-1 border-t-[3px] border-dotted" style={{ borderColor: "var(--color-ink)" }} />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// --- 03 · Background ----------------------------------------------------------------

function Background({ slide }) {
  const [big, ...small] = slide.stats
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="grid content-start gap-6">
          <Card>
            <p className="text-copy font-black">{slide.intro.line}</p>
            <p className="mt-2 text-copy font-medium" style={{ color: LINK }}>
              {slide.intro.question}
            </p>
          </Card>

          <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr]">
            <Card tone="blue" className="wp-checker flex flex-col justify-end overflow-visible sm:min-h-[16rem]">
              <Sticker src={slide.expectations.sticker} className="absolute -top-8 right-2 w-24 sm:w-32" />
              <Num className="text-5xl sm:text-6xl">{big.value}</Num>
              <p className="mt-4 text-[22px] font-black">{big.label}</p>
              <p className="mt-1 text-note">{big.note}</p>
            </Card>
            <div className="grid gap-6">
              {small.map((s) => (
                <Card key={s.value} tone={s.tone} className="flex flex-col justify-center">
                  <Num className="text-4xl" style={{ color: s.tone === "dark" ? YELLOW : undefined }}>
                    {s.value}
                  </Num>
                  <p className="mt-2 text-copy font-bold">{s.label}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card>
            <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
              <h4 className="text-copy font-semibold">{slide.revenue.title}</h4>
              <div className="flex h-9 gap-2">
                {slide.revenue.segments.map((seg, i) => (
                  <span
                    key={i}
                    className="flex min-w-0 items-center rounded-full px-3 text-note font-bold"
                    style={{
                      flex: `${seg.pct} 1 0%`,
                      background: seg.tone === "blue" ? BLUE : seg.tone === "yellow" ? YELLOW : PALE_2,
                      color: "#fff",
                    }}
                  >
                    {seg.label && <span className="truncate">{seg.label}</span>}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-right text-note" style={{ color: QUIET }}>
              {slide.revenue.legend}
            </p>
            <p className="mt-2 text-copy">{slide.revenue.note}</p>
          </Card>
        </div>

        <TabCard tab={slide.expectations.tab}>
          <h4 className="text-2xl font-semibold tracking-tight">{slide.expectations.title}</h4>
          <p className="mt-1 text-note" style={{ color: QUIET }}>
            {slide.expectations.sub}
          </p>
          <ol className="mt-6 space-y-6">
            {slide.expectations.items.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                <Disc tone={i === 1 ? "yellow" : "blue"} size={52}>
                  {i + 1}
                </Disc>
                <span className="text-copy font-bold">{item}</span>
              </li>
            ))}
          </ol>
          <hr className="my-6 border-0 border-t-2" style={{ borderColor: PALE_2 }} />
          <p className="text-copy" style={{ color: QUIET }}>
            {slide.expectations.note}
          </p>
        </TabCard>
      </div>

      <Card tone="dark" className="flex flex-col gap-4 overflow-visible sm:flex-row sm:items-center sm:gap-8 sm:pr-36">
        <Pill tone="yellow" tilt="rotate-3" className="wp-round self-start text-copy sm:self-center">
          {slide.hmw.label}
        </Pill>
        <p className="text-2xl font-black">{slide.hmw.text}</p>
        <Sticker src={slide.hmw.sticker} className="absolute -top-14 right-6 hidden w-28 sm:block" />
      </Card>
    </div>
  )
}

// --- 04 · Research --------------------------------------------------------------------

function Research({ slide }) {
  const w = slide.what
  let start = 0
  const stops = w.segments
    .map((s) => {
      const color = s.tone === "blue" ? BLUE : s.tone === "yellow" ? YELLOW : "#5f6b7e"
      const stop = `${color} ${start}% ${start + s.pct}%`
      start += s.pct
      return stop
    })
    .join(", ")
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        {slide.metrics.map((m) => (
          <Card key={m.value} tone={m.tone}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Num className="text-5xl" style={{ color: m.tone === "dark" ? YELLOW : undefined }}>
                {m.value}
              </Num>
              <span className="text-copy font-black">{m.label}</span>
            </div>
            <p className="mt-3 text-copy" style={{ color: TONE[m.tone].q }}>
              {m.note}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[1.55fr_1fr_1.1fr]">
        <Card className="flex flex-col md:col-span-2 xl:col-span-1" style={{ boxShadow: "inset 0 0 0 2px var(--wp-pale-2)" }}>
          <Tag className="self-start">{slide.why.tag}</Tag>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-4">
            <h4 className="text-2xl font-semibold tracking-tight">{slide.why.title}</h4>
            <span className="text-note" style={{ color: QUIET }}>
              {slide.why.sub}
            </span>
          </div>
          <ul className="mt-6 space-y-6">
            {slide.why.bars.map((b) => (
              <li key={b.label} className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3 sm:grid-cols-[minmax(0,9rem)_1fr_auto]">
                <span className="text-note font-medium">{b.label}</span>
                <span className="h-9 overflow-hidden rounded-full" style={{ background: PALE }}>
                  <span className="block h-full rounded-full" style={{ width: `${b.pct}%`, background: b.tone === "yellow" ? YELLOW : BLUE }} />
                </span>
                <Num className="w-14 text-right text-2xl" style={{ color: b.tone === "yellow" ? INK : LINK }}>
                  {b.pct}%
                </Num>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-6">
            <p className="inline-block rounded-2xl px-4 py-3 text-copy font-bold sm:rounded-full" style={{ background: NIGHT, color: "#fff", boxShadow: RING }}>
              {slide.why.note}
            </p>
          </div>
        </Card>

        <Card tone="pale">
          <Tag onPale>{w.tag}</Tag>
          <h4 className="mt-3 text-2xl font-semibold tracking-tight">{w.title}</h4>
          <div className="relative mx-auto my-6 size-44 rounded-full" style={{ background: `conic-gradient(${stops})` }}>
            <div className="absolute inset-6 flex items-center justify-center rounded-full" style={{ background: PALE }}>
              <Num className="text-3xl" style={{ color: LINK }}>
                {w.big}
              </Num>
            </div>
          </div>
          <ul className="space-y-2">
            {w.segments.map((s) => (
              <li key={s.pct} className="flex items-center gap-3 text-note font-medium">
                <Dot color={s.tone === "blue" ? BLUE : s.tone === "yellow" ? YELLOW : "#5f6b7e"} />
                {s.label}
              </li>
            ))}
          </ul>
          <p className="mt-2 pl-[22px] text-note" style={{ color: QUIET }}>
            {w.sub}
          </p>
          <p className="mt-4 text-copy font-bold" style={{ color: LINK }}>
            {w.note}
          </p>
        </Card>

        <TabCard tone="dark" tab={slide.how.tab}>
          <h4 className="text-2xl font-semibold tracking-tight">{slide.how.title}</h4>
          <ol className="mt-6 space-y-6">
            {slide.how.items.map((it, i) => (
              <li key={it.problem} className="flex gap-4">
                <Num className="text-2xl" style={{ color: YELLOW }}>
                  {String(i + 1).padStart(2, "0")}
                </Num>
                <div className="min-w-0">
                  <p className="text-copy font-bold">{it.problem}</p>
                  <p className="mt-1 text-copy" style={{ color: TONE.dark.q }}>
                    → {it.fix}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <span className="mt-6 inline-block rounded-full px-4 py-2 text-note font-bold" style={{ background: BLUE, color: "#fff" }}>
            {slide.how.note}
          </span>
        </TabCard>
      </div>
    </div>
  )
}

// --- 05 · Insights ---------------------------------------------------------------------

const PAIN_TILT = ["rotate-3", "-rotate-3", "-rotate-2", "rotate-2", "rotate-1"]

function Insights({ slide }) {
  return (
    <div className="grid gap-6">
      <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {slide.cards.map((c) => (
          <li key={c.tab} className="relative flex">
            <TabCard tone="card" tab={c.tab} className="w-full" bodyClass="flex flex-col">
              <h4 className="pr-14 text-2xl font-semibold tracking-tight">{c.title}</h4>
              <p className="mt-3 text-copy" style={{ color: QUIET }}>
                {c.text}
              </p>
              <figure className="mt-auto pt-6">
                <div className="rounded-[1.25rem] p-6" style={c.tone === "yellow" ? { background: YELLOW, color: ON_FILL } : { background: PALE, color: LINK }}>
                  <blockquote className="text-copy font-bold">{c.quote}</blockquote>
                  <figcaption className="mt-3 text-note" style={{ color: c.tone === "yellow" ? "rgba(21,24,33,0.78)" : QUIET }}>
                    {c.by}
                  </figcaption>
                </div>
              </figure>
            </TabCard>
            <Sticker src={c.sticker} className="absolute -top-8 right-3 w-16 sm:w-20" />
          </li>
        ))}
      </ul>

      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h4 className="text-2xl font-semibold tracking-tight" style={{ color: INK }}>{slide.pains.title}</h4>
          <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-6">
            {slide.pains.items.map((p, i) => (
              <li key={p.text}>
                <Pill tone={p.tone === "card" ? "white" : p.tone} tilt={PAIN_TILT[i]} className="px-5 py-2 text-copy font-black">
                  {p.text}
                </Pill>
              </li>
            ))}
          </ul>
        </div>
        <Card tone="yellow" className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="wp-round text-copy font-extrabold" style={{ color: "var(--wp-link-on-yellow)" }}>
              {slide.opportunity.label}
            </p>
            <p className="mt-2 text-2xl font-black">{slide.opportunity.text}</p>
          </div>
          <Sticker src={slide.opportunity.sticker} className="hidden w-20 shrink-0 sm:block" />
        </Card>
      </div>
    </div>
  )
}

// --- 06 · Competitors ------------------------------------------------------------------

function Competitors({ slide }) {
  const t = useT()
  return (
    <div>
      {/* Seven products across is wider than a reading column at 18px, so the
          matrix keeps its own width and scrolls sideways inside its box. Each
          product is one rounded column, wetter.com's in the deck's blue. */}
      <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pb-2 pt-10">
        <div className="flex min-w-[61rem] gap-2">
          <div className="flex w-[9.5rem] shrink-0 flex-col">
            <div className="h-[7.5rem]" />
            {slide.rows.map((row) => (
              <div key={row.label} className="flex h-14 items-center gap-2">
                <span className="whitespace-nowrap rounded-full px-3 py-1 text-note font-bold" style={{ background: CARD, color: INK, boxShadow: RING }}>
                  {row.label}
                </span>
                <span aria-hidden="true" className="h-0 flex-1 border-t-2 border-dotted" style={{ borderColor: BLUE }} />
              </div>
            ))}
          </div>
          {slide.columns.map((col, ci) => {
            const hot = col.highlight
            return (
              <div key={col.name} className="relative flex flex-1 flex-col rounded-[1.5rem] pb-2" style={{ background: hot ? BLUE : CARD, boxShadow: hot ? undefined : RING }}>
                <img
                  src={col.icon}
                  alt=""
                  loading="lazy"
                  className="absolute -top-8 left-1/2 size-14 -translate-x-1/2 rounded-2xl border-4 border-white shadow-[0_6px_14px_rgba(10,41,102,0.18)]"
                />
                <div className="flex h-[7.5rem] flex-col items-center justify-end rounded-t-[1.5rem] px-2 pb-3 text-center" style={{ background: hot ? YELLOW : PALE_2, color: hot ? ON_FILL : INK }}>
                  <span className="text-note font-bold">{col.name}</span>
                  <span className="text-note">{col.region}</span>
                </div>
                {slide.rows.map((row, ri) => {
                  const cell = row.cells[ci]
                  return (
                    <div key={row.label} className="flex h-14 items-center justify-center">
                      {cell === true ? (
                        <span
                          role="img"
                          aria-label={t(HAS)}
                          className="inline-flex size-8 items-center justify-center rounded-full text-note font-black"
                          style={hot ? { background: "#fff", color: "#0058d6" } : { background: BLUE, color: "#fff" }}
                        >
                          ✓
                        </span>
                      ) : cell === false ? (
                        <span role="img" aria-label={t(HAS_NOT)} className="block h-1 w-5 rounded-full" style={{ background: hot ? "rgba(255,255,255,0.75)" : "var(--wp-dash)" }} />
                      ) : (
                        <span className="text-note font-bold" style={{ color: hot ? "#fff" : ri === 0 ? QUIET : LINK }}>
                          {cell}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
      <p className="mt-1 text-note 2xl:hidden" style={{ color: QUIET }}>
        {t(ui.scrollTable)}
      </p>

      <div className="mt-6 grid gap-3 rounded-[2rem] px-6 py-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:rounded-full sm:px-12" style={{ background: YELLOW, color: ON_FILL }}>
        <h4 className="text-2xl font-semibold tracking-tight">{slide.summary.title}</h4>
        <p className="text-copy font-medium">
          <Rich text={slide.summary.text} color="var(--wp-link-on-yellow)" />
        </p>
      </div>
    </div>
  )
}

// --- 07 · Ideation -------------------------------------------------------------------

function Ideation({ slide }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
      <div className="grid content-start gap-8">
        {slide.rounds.map((r, i) => (
          <div key={r.tag} className="relative">
            <Pill tone={i ? "blue" : "yellow"} tilt={i ? "-rotate-3" : "rotate-3"} className="wp-round absolute -top-4 left-6 z-10 text-copy font-extrabold">
              {r.tag}
            </Pill>
            <Card tone={r.tone} className="pt-10 sm:pt-10">
              <h4 className="text-2xl font-semibold tracking-tight">{r.hmw}</h4>
              <p className="mt-4 text-note" style={{ color: TONE[r.tone].q }}>
                {r.clusterLabel}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {r.clusters.map((c) => (
                  <li key={c}>
                    <span
                      className="inline-block rounded-full px-3.5 py-1 text-note font-bold"
                      style={r.tone === "dark" ? { background: "rgba(255,255,255,0.1)", color: "#fff" } : { background: CARD, color: LINK }}
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
              {r.voted && (
                <>
                  <p className="mt-6 text-note" style={{ color: QUIET }}>
                    {r.votedLabel}
                  </p>
                  <ol className="mt-3 space-y-2">
                    {r.voted.map((v, vi) => (
                      <li key={v} className="flex items-start gap-3">
                        <Disc size={30}>
                          <span className="text-note">{vi + 1}</span>
                        </Disc>
                        <span className="text-copy font-medium">{v}</span>
                      </li>
                    ))}
                  </ol>
                </>
              )}
              {r.closing && (
                <p className="mt-6 inline-block rounded-2xl px-4 py-2 text-copy font-black sm:rounded-full" style={{ background: YELLOW, color: ON_FILL }}>
                  {r.closing}
                </p>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* The deck's curled arrow, from the two rounds into the three directions. */}
      <svg aria-hidden="true" viewBox="0 0 90 120" className="hidden w-20 self-center lg:block" style={{ color: "var(--color-ink)" }}>
        <path d="M86 10C50 8 30 30 44 48s34-2 14-12S8 50 14 104" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="M2 92l12 18 12-18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div>
        <h4 className="text-2xl font-semibold tracking-tight" style={{ color: "var(--color-cream)" }}>
          {slide.featuresTitle}
        </h4>
        <ol className="mt-6 grid gap-6">
          {slide.features.map((f) => (
            <li key={f.no}>
              <Card tone={f.tone} className="flex items-center gap-6 p-4 sm:p-6">
                {/* The art is square with its own pale ground; filling the circle
                    edge to edge lets that ground be the disc, with no corners showing. */}
                <div className="size-24 shrink-0 overflow-hidden rounded-full sm:size-28">
                  <img src={f.art} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="wp-round text-note font-extrabold" style={{ color: TONE[f.tone].q }}>
                    {f.no}
                  </p>
                  <p className="text-[22px] font-black">{f.title}</p>
                  <p className="mt-2 text-copy" style={{ color: TONE[f.tone].q }}>
                    {f.text}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// --- 08 · Business ideas ------------------------------------------------------------

function Business({ slide }) {
  const w = slide.why
  const [plan, setPlan] = useState(0)
  return (
    <div className="grid gap-6">
      <Card tone="dark" className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-x-10 2xl:grid-cols-[15rem_1fr_auto] 2xl:items-center">
        <div>
          <Pill tone="yellow">{w.pill}</Pill>
          <h4 className="mt-3 text-2xl font-semibold tracking-tight">{w.title}</h4>
        </div>
        <p className="text-copy" style={{ color: TONE.dark.q }}>
          {w.text}
        </p>
        <div className="grid grid-cols-2 gap-3 lg:col-start-2 lg:flex 2xl:col-start-auto">
          {w.stats.map((s) => (
            <div key={s.value} className="w-full rounded-[1.25rem] p-4 lg:w-40" style={{ background: TONE[s.tone].bg, color: TONE[s.tone].fg }}>
              <Num className="text-4xl">{s.value}</Num>
              <p className="mt-2 text-note font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Plan A and Plan B behind a switch: one at a time, at full width. */}
      <Segmented options={slide.plans.map((p) => p.tag)} value={plan} onChange={setPlan} className="justify-self-start" />
      <div>
        {[slide.plans[plan]].map((p) => {
          const blue = p.tone === "blue"
          return (
            <Card key={p.title} tone={p.tone} className={`wp-swap grid gap-6 overflow-hidden sm:grid-cols-[1fr_auto] lg:gap-10 ${blue ?"wp-checker":""}`} style={blue ? { backgroundColor: BLUE } : undefined}>
              <div className="min-w-0">
                <h4 className="text-2xl font-semibold tracking-tight">{p.title}</h4>
                <p className="mt-3 text-copy" style={{ color: TONE[p.tone].q }}>
                  {p.text}
                </p>
                <dl className="mt-6 grid gap-3">
                  {p.kv.map((kv) => (
                    <div key={kv.k} className="rounded-[1.25rem] px-5 py-3" style={blue ? { background: "#fff", color: ON_FILL } : { background: PALE }}>
                      <dt className="text-note font-bold" style={{ color: blue ? "#0058d6" : LINK }}>
                        {kv.k}
                      </dt>
                      <dd className="mt-1 text-copy font-medium">{kv.v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 rounded-[1.25rem] px-5 py-4 text-copy font-bold" style={{ background: NIGHT, color: YELLOW, boxShadow: RING }}>
                  {p.status}
                </p>
              </div>

              {/* The phones: one tilted screen for Plan A, a fan of three for Plan B. */}
              <div className="relative mx-auto flex w-full max-w-[17rem] items-center justify-center py-4 sm:w-56 lg:w-64 2xl:w-52">
                <span aria-hidden="true" className="absolute inset-x-0 top-1/2 mx-auto aspect-square w-[85%] -translate-y-1/2 rounded-full" style={{ background: blue ? "rgba(255,255,255,0.18)" : YELLOW }} />
                {p.phones.length === 1 ? (
                  <Phone src={p.phones[0]} className="relative w-[70%] -rotate-3 sm:w-full" />
                ) : (
                  <div className="relative flex w-full items-center justify-center">
                    <Phone src={p.phones[0]} className="absolute left-0 w-[42%] rotate-6" />
                    <Phone src={p.phones[2]} className="absolute right-0 w-[42%] -rotate-6" />
                    <Phone src={p.phones[1]} frame="yellow" className="relative z-10 w-[56%]" />
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// --- 09 · Iteration ---------------------------------------------------------------

function Iteration({ slide }) {
  const [before, after] = slide.panels
  // Design 1.0 and 2.0 share one frame behind a switch. Both panels are laid in
  // the same grid cell, so the phones keep their places and the change reads as
  // one screen turning into the other; the inactive panel fades out underneath.
  const [v, setV] = useState(1)
  const panels = [before, after]
  const Panel = ({ panel, on }) => (
    <Card
      tone={panel.tone}
      className="col-start-1 row-start-1 h-full transition-[opacity,transform] duration-500 ease-out"
      style={{
        ...(panel.tone === "blue" ? { backgroundColor: BLUE } : null),
        opacity: on ? 1 : 0,
        transform: on ? "none" : "scale(0.985)",
        pointerEvents: on ? "auto" : "none",
      }}
    >
      <ul className="grid grid-cols-3 gap-3 sm:gap-6" aria-hidden={!on}>
        {panel.shots.map((sh) => (
          <li key={sh.src} className="min-w-0">
            <Phone src={sh.src} alt={sh.caption} frame={panel.tone === "grey" ? "grey" : sh.hot ? "yellow" : "dark"} className="mx-auto max-w-[12rem] shadow-none" />
            <p className="mt-3 text-center text-note font-bold" style={{ color: TONE[panel.tone].q }}>
              {sh.caption}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  )
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented options={panels.map((p) => p.tag)} value={v} onChange={setV} />
        <Sticker src={slide.sticker} className="pointer-events-none hidden w-14 sm:block" />
      </div>
      <div className="mt-6 grid">
        {panels.map((p, k) => (
          <Panel key={p.tag} panel={p} on={k === v} />
        ))}
      </div>
      <ul className="mt-6 flex flex-wrap gap-3">
        {slide.changes.map((c) => (
          <li key={c.text}>
            <span className="inline-block rounded-[1.25rem] px-4 py-2 text-note font-bold sm:rounded-full" style={{ background: TONE[c.tone].bg, color: c.tone === "pale" ? LINK : TONE[c.tone].fg, boxShadow: c.tone === "dark" ? RING : undefined }}>
              {c.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- 10 · The turn -----------------------------------------------------------------

function Turn({ slide, t }) {
  const p = slide.pairs
  const root = useRef(null)
  const inView = useInView(root, { threshold: 0.3 })
  const steps = useStepper(slide.timeline.length, { ms: 6500, run: inView })

  // The pets cycle on their own until the reader picks one or drags the divider.
  // Each new pair arrives with the divider far right (the real photo) and glides
  // left to uncover the AI pet.
  const [pair, setPair] = useState(0)
  const [at, setAt] = useState(50)
  const [autoPets, setAutoPets] = useState(true)
  useEffect(() => {
    setAt(92)
    const id = setTimeout(() => setAt(38), 450)
    return () => clearTimeout(id)
  }, [pair])
  useEffect(() => {
    if (!inView || !autoPets || !steps.auto) return
    const id = setInterval(() => setPair((k) => (k + 1) % p.items.length), 3800)
    return () => clearInterval(id)
  }, [inView, autoPets, steps.auto, p.items.length])
  const pick = (k) => {
    setAutoPets(false)
    setPair(k)
  }
  const it = p.items[pair]
  const frame = "flex aspect-[4/3] items-center justify-center p-6"

  return (
    <div ref={root} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* The four beats of the decision as a stepper: one open at a time, the
          bar under it timing the move to the next. */}
      <Card tone="dark" className="sm:p-8">
        <ol>
          {slide.timeline.map((st, i) => {
            const on = i === steps.step
            return (
              <li key={i} className="border-b border-white/10 last:border-b-0">
                <button
                  type="button"
                  onClick={() => {
                    steps.setAuto(false)
                    steps.go(i)
                  }}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <Disc tone={st.hot ? "yellow" : "blue"} size={36}>
                    {i + 1}
                  </Disc>
                  <span
                    className="text-xl font-semibold tracking-tight transition-colors duration-300"
                    style={{ color: on ? (st.hot ? YELLOW : "#fff") : "rgba(255,255,255,0.55)" }}
                  >
                    {st.step}
                  </span>
                </button>
                {on && (
                  <div className="wp-swap pb-4 pl-12">
                    <p className="text-copy" style={{ color: TONE.dark.q }}>
                      {st.text}
                    </p>
                    <div aria-hidden="true" className="mt-4 h-0.5 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(steps.auto ? steps.progress : 1) * 100}%`, background: st.hot ? YELLOW : BLUE }}
                      />
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </Card>

      {/* Real pet → AI pet as one frame with a divider, nine pairs underneath. */}
      <Card className="flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-2xl font-semibold tracking-tight">{p.title}</h4>
          <Pill tone="blue">{p.pill}</Pill>
        </div>
        <Wipe
          key={pair}
          className="mt-6 rounded-[1.25rem]"
          at={at}
          onGrab={() => setAutoPets(false)}
          beforeLabel={t(p.altReal)}
          afterLabel={t(p.altAi)}
          before={
            <div className={frame} style={{ background: PALE }}>
              <img key={it.real} src={it.real} alt={t(p.altReal)} className="wp-swap h-full w-full object-contain" draggable={false} />
            </div>
          }
          after={
            <div className={frame} style={{ background: BLUE }}>
              <img key={it.ai} src={it.ai} alt={t(p.altAi)} className="wp-swap h-full w-full object-contain" draggable={false} />
            </div>
          }
        />
        <ul className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 py-1">
          {p.items.map((x, k) => (
            <li key={k} className="shrink-0">
              <button
                type="button"
                onClick={() => pick(k)}
                aria-label={`${t(p.altAi)} ${k + 1}`}
                aria-pressed={k === pair}
                className="block size-14 overflow-hidden rounded-xl p-1 transition-transform duration-300 hover:-translate-y-0.5"
                style={{ background: BLUE, boxShadow: k === pair ? `0 0 0 3px ${YELLOW}` : "none", opacity: k === pair ? 1 : 0.7 }}
              >
                <img src={x.ai} alt="" loading="lazy" className="h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// --- 11 · AI mascot ----------------------------------------------------------------

function AiMascot({ slide }) {
  return (
    <div className="relative grid gap-6 2xl:grid-cols-[1.45fr_1fr]">
      <Sticker src={slide.sticker} className="absolute -top-28 right-0 hidden w-28 sm:block" />
      <div className="grid content-start gap-6">
        <Card className="sm:p-8">
          {/* Three screens with the flow between them. On a phone the arrows go
              and the screens sit side by side — the same sequence, left to right. */}
          <ol className="grid grid-cols-3 items-start gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-4">
            {slide.shots.map((s, i) => (
              <li key={s.src} className="contents">
                <div className="min-w-0">
                  <Phone src={s.src} alt={s.caption} frame={s.hot ? "yellow" : "dark"} />
                  <p
                    className="mt-3 rounded-2xl px-3 py-2 text-center text-note font-bold"
                    style={s.hot ? { background: YELLOW, color: ON_FILL } : { background: PALE, color: LINK }}
                  >
                    {s.caption}
                  </p>
                </div>
                {i < slide.shots.length - 1 && (
                  <span className="hidden pt-[90%] sm:block">
                    <ArrowDisc turn="none" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Card>
        <ul className="grid gap-4 sm:grid-cols-3">
          {slide.decisions.map((d) => (
            <li key={d.title}>
              <Card tone={d.tone} className="h-full p-6 sm:p-6">
                <p className="text-copy font-black">{d.title}</p>
                <p className="mt-2 text-copy" style={{ color: TONE[d.tone].q }}>
                  {d.text}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid content-start gap-6 lg:grid-cols-2 2xl:grid-cols-1">
        <Card tone="dark">
          <h4 className="text-2xl font-semibold tracking-tight">{slide.pipeline.title} <span style={{ color: YELLOW }}>✦</span></h4>
          <ol className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
            {slide.pipeline.nodes.map((n, i) => {
              const last = i === slide.pipeline.nodes.length - 1
              return (
                <li key={n} className="flex min-h-[5.5rem] items-center justify-center rounded-[1.25rem] px-3 py-3 text-center text-note font-bold" style={{ background: last ? YELLOW : "#fff", color: ON_FILL }}>
                  {n}
                </li>
              )
            })}
          </ol>
          <p className="mt-4 text-note" style={{ color: TONE.dark.q }}>
            {slide.pipeline.note}
          </p>
        </Card>
        <Card tone="blue" className="wp-checker" style={{ backgroundColor: BLUE }}>
          <h4 className="text-2xl font-semibold tracking-tight">{slide.edges.title}</h4>
          <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-6">
            {slide.edges.shots.map((s) => (
              <li key={s.src} className="flex min-w-0 flex-col items-center">
                <Phone src={s.src} alt={s.caption} className="w-full" />
                <span className="-mt-4 relative rounded-full bg-white px-3 py-1 text-center text-note font-bold" style={{ color: "#0058d6" }}>
                  {s.caption}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

// --- 12 · Home page ------------------------------------------------------------------

function Annotation({ item }) {
  return (
    <li>
      <Card tone="white" className="flex h-full gap-4 p-6 sm:p-6">
        <Disc tone="yellow" size={48}>
          <span className="text-copy">{item.no}</span>
        </Disc>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[22px] font-black">{item.title}</p>
            {item.tag && <Pill tone="yellow" className="px-3 py-1">{item.tag}</Pill>}
          </div>
          <p className="mt-2 text-copy" style={{ color: TONE.white.q }}>
            {item.text}
          </p>
        </div>
      </Card>
    </li>
  )
}

function Home({ slide }) {
  return (
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
      <figure className="relative mx-auto w-full max-w-[16rem] py-6 lg:order-2 lg:w-60 xl:w-72">
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 aspect-square w-[145%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: YELLOW }} />
        <Phone src={slide.shot} className="relative rounded-[2.25rem] border-[7px]" />
        <Sticker src={slide.sticker} className="absolute -right-8 top-0 w-20" />
      </figure>
      <ol className="grid content-start gap-6 lg:order-1">
        {slide.left.map((it) => (
          <Annotation key={it.no} item={it} />
        ))}
      </ol>
      <div className="grid content-start gap-6 lg:order-3">
        <ol className="grid gap-6">
          {slide.right.map((it) => (
            <Annotation key={it.no} item={it} />
          ))}
        </ol>
        <Card tone="dark">
          <p className="text-copy font-black" style={{ color: YELLOW }}>
            {slide.outfits.title}
          </p>
          <ul className="mt-4 grid grid-cols-4 gap-2">
            {slide.outfits.images.map((img) => (
              <li key={img.src} className="aspect-[512/706]">
                <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-contain" />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

// --- 13 · Testing --------------------------------------------------------------------

function Testing({ slide }) {
  const s = slide.summary
  const [round, setRound] = useState(0)
  return (
    <div className="grid gap-8">
      <Card tone="pale" className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
        <div className="flex items-center gap-4 lg:border-r-2 lg:pr-10" style={{ borderColor: PALE_2 }}>
          <Num className="text-5xl" style={{ color: LINK }}>
            {s.value}
          </Num>
          <div>
            <p className="text-[22px] font-black">{s.label}</p>
            <p className="mt-1 text-note" style={{ color: QUIET }}>
              {s.sub}
            </p>
          </div>
        </div>
        <div>
          <p className="text-copy font-black">{s.goalsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.goals.map((g) => (
              <li key={g}>
                <span className="inline-block rounded-full px-3.5 py-1 text-note font-bold" style={{ background: CARD, color: LINK, boxShadow: "inset 0 0 0 1px var(--wp-pale-2)" }}>
                  {g}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* The three rounds behind a date switch: one at a time, laid out wide —
          what was tested on the left, what changed on the right. */}
      <div>
        <Segmented options={slide.rounds.map((r) => r.tab)} value={round} onChange={setRound} />
        {[slide.rounds[round]].map((r) => {
          const tone = TONE[r.tone]
          return (
            <div key={r.tab} className="wp-swap mt-6">
              <TabCard tone={r.tone} tab={r.tab} className="w-full" bodyClass="grid gap-x-10 lg:grid-cols-2">
                <div>
                <h4 className="text-2xl font-semibold tracking-tight">{r.title}</h4>
                <p className="mt-2 text-note" style={{ color: tone.q }}>
                  {r.sub}
                </p>

                {r.findings && (
                  <>
                    <p className="mt-6 text-copy font-black" style={{ color: r.tone === "pale" ? LINK : tone.fg }}>
                      {r.findingsLabel}
                    </p>
                    <Bullets items={r.findings} color={r.tone === "yellow" ? NIGHT : BLUE} className="mt-2" />
                  </>
                )}

                {r.versions && (
                  <ul className="mt-6 space-y-2">
                    {r.versions.map((v) => (
                      <li key={v.v} className="flex items-center gap-4 rounded-xl px-4 py-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <Num className="text-copy" style={{ color: YELLOW }}>
                          {v.v}
                        </Num>
                        <span className="text-copy font-medium">{v.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {r.finding && <Bullets items={[r.finding]} color={YELLOW} className="mt-6" />}
                </div>
                <div className="lg:pt-1">
                {r.quote && (
                  <div className="mt-6 rounded-[1.25rem] p-6 lg:first:mt-0" style={r.tone === "dark" ? { background: YELLOW, color: ON_FILL } : { background: "#fff", color: ON_FILL }}>
                    <p className="text-copy font-black" style={{ color: r.tone === "dark" ? ON_FILL : "#0058d6" }}>
                      {r.quote.title}
                    </p>
                    <p className="mt-2 text-copy">{r.quote.text}</p>
                    <p className="mt-2 text-note" style={{ color: r.tone === "dark" ? "#5a4300" : "#5f6b7e" }}>
                      {r.quote.by}
                    </p>
                  </div>
                )}


                {r.changes && (
                  <div className="mt-6 rounded-[1.25rem] p-6 lg:first:mt-0" style={{ background: r.tone === "pale" ? CARD : "#fff", color: r.tone === "pale" ? INK : ON_FILL }}>
                    <p className="text-copy font-black" style={{ color: r.tone === "pale" ? LINK : "#0058d6" }}>
                      {r.changeLabel}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {r.changes.map((c) => (
                        <li key={c} className="text-copy font-bold">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                </div>
                {r.sticker && <Sticker src={r.sticker} className="absolute -top-10 right-6 hidden w-20 sm:block" />}
              </TabCard>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- 14 · Dev handoff -----------------------------------------------------------------

function Node({ title, sub, tone }) {
  const t = TONE[tone]
  return (
    <div className="rounded-[1.25rem] px-4 py-4 text-center" style={{ background: t.bg, color: t.fg }}>
      <p className="text-copy font-black">{title}</p>
      {sub && (
        <p className="mt-1 text-note" style={{ color: t.q }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function Dotted({ vertical = false, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`block ${vertical ?"mx-auto h-8 w-0 border-l-[3px]":"h-0 w-full border-t-[3px]"} border-dotted ${className}`}
      style={{ borderColor: YELLOW }}
    />
  )
}

function Handoff({ slide }) {
  const a = slide.architecture
  const m = slide.mvp
  const d = slide.system
  return (
    <div className="grid gap-6 2xl:grid-cols-[1.1fr_1fr]">
      <div className="grid content-start gap-6">
        <Card tone="dark" className="sm:p-8">
          <h4 className="text-2xl font-semibold tracking-tight">
            {a.title} <span style={{ color: YELLOW }}>✦</span>
          </h4>
          {/* The app sits above the backend, the two services either side of it. On
              a narrow column it becomes one top-to-bottom chain. */}
          <div className="mt-6 grid items-center sm:grid-cols-[1fr_2.5rem_1fr_2.5rem_1fr]">
            <div className="sm:col-start-3">
              <Node title={a.app.title} sub={a.app.sub} tone="yellow" />
            </div>
            <Dotted vertical className="sm:col-start-3" />
            <div className="sm:col-start-3 sm:row-start-3">
              <Node title={a.backend.title} sub={a.backend.sub} tone="white" />
            </div>
            <Dotted vertical className="sm:hidden" />
            <div className="sm:col-start-1 sm:row-start-3">
              <Node title={a.sides[0].title} sub={a.sides[0].sub} tone="blue" />
            </div>
            <Dotted className="hidden sm:col-start-2 sm:row-start-3 sm:block" />
            <Dotted vertical className="sm:hidden" />
            <div className="sm:col-start-5 sm:row-start-3">
              <Node title={a.sides[1].title} sub={a.sides[1].sub} tone="blue" />
            </div>
            <Dotted className="hidden sm:col-start-4 sm:row-start-3 sm:block" />
          </div>
          <p className="mt-6 text-center text-copy" style={{ color: TONE.dark.q }}>
            {a.note}
          </p>
        </Card>

        <Card className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
          <div>
            <Pill tone="yellow" tilt="rotate-3">
              {m.pill}
            </Pill>
            <Num className="mt-3 block whitespace-nowrap text-5xl sm:text-6xl" style={{ color: LINK }}>
              {m.big}
            </Num>
          </div>
          <div>
            <p className="text-copy" style={{ color: QUIET }}>
              {m.text}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {m.weather.map((w) => (
                <li key={w}>
                  <Tag>{w}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <TabCard tab={d.tab}>
        <p className="text-copy font-bold">{d.sub}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {d.pills.map((p) => (
            <li key={p}>
              <Tag>{p}</Tag>
            </li>
          ))}
        </ul>
        <ul className="wp-checker mt-6 grid max-w-3xl grid-cols-4 gap-2 rounded-[1.5rem] p-3 sm:gap-4 sm:p-6" style={{ backgroundColor: BLUE }}>
          {d.images.map((img) => (
            <li key={img.src} className="flex aspect-[3/4] items-end justify-center">
              <img src={img.src} alt={img.alt} loading="lazy" className="max-h-full w-full object-contain" />
            </li>
          ))}
        </ul>
        <h5 className="mt-8 text-[22px] font-black">{d.engTitle}</h5>
        <Bullets items={d.eng} color={YELLOW} className="mt-3" />
      </TabCard>
    </div>
  )
}

// --- 15 · Launch --------------------------------------------------------------------

// The install curve, on the slide's dark stage. Drawn in the data's own coordinates
// and stretched by the SVG's viewBox; axis labels and callouts are real HTML, so the
// line scales with the card while nothing made of words does.
function InstallChart({ chart }) {
  const { points, max } = chart
  const plot = useRef(null)
  const drawn = useInView(plot, { threshold: 0.15, once: true })
  const last = points.length - 1
  const x = (i) => (i / last) * 100
  const y = (v) => (1 - v / max) * 100
  const line = points.map((v, i) => `${x(i)},${y(v)}`).join(" ")
  const area = `0,100 ${line} 100,100`
  const axis = "rgba(255,255,255,0.65)"
  return (
    <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pt-10">
      <div ref={plot} className="min-w-[30rem]">
        <div className="flex gap-3">
          <ul className="wp-round relative w-12 shrink-0 text-note font-bold" style={{ color: axis, height: "clamp(12rem, 18vw, 15rem)" }}>
            {chart.ticks.map((tick) => (
              <li key={tick} className="absolute right-0 -translate-y-1/2" style={{ top: `${y(tick)}%` }}>
                {tick}
              </li>
            ))}
          </ul>
          {/* The plot wipes in from the left once it is on screen — the line, the
              area, the points and the markers together, as if being drawn. */}
          <div
            className="relative min-w-0 flex-1 motion-safe:transition-[clip-path] motion-safe:duration-[1800ms] motion-safe:ease-out"
            style={{ height: "clamp(12rem, 18vw, 15rem)", clipPath: drawn ? "inset(-60% -10% -60% 0)" : "inset(-60% 100% -60% 0)" }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="wp-install-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#0066ee" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#0066ee" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {chart.ticks.map((tick) => (
                <line key={tick} x1="0" x2="100" y1={y(tick)} y2={y(tick)} stroke="rgba(255,255,255,0.12)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              <polygon points={area} fill="url(#wp-install-fill)" />
              <polyline points={line} fill="none" stroke={YELLOW} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
            {points.map((v, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]"
                style={{ left: `${x(i)}%`, top: `${y(v)}%`, background: "#22273a", borderColor: YELLOW }}
              />
            ))}
            {chart.markers.map((mk) => {
              const dx = mk.at >= last - 1 ? "-100%" : "-50%"
              const dy = mk.place === "below" ? "45%" : "-145%"
              const t = TONE[mk.tone === "card" ? "white" : mk.tone]
              return (
                <span
                  key={mk.at}
                  className="absolute whitespace-nowrap rounded-full px-3 py-1 text-note font-bold"
                  style={{ left: `${x(mk.at)}%`, top: `${y(points[mk.at])}%`, transform: `translate(${dx}, ${dy})`, background: t.bg, color: t.fg }}
                >
                  {mk.label}
                </span>
              )
            })}
          </div>
        </div>
        <div className="mt-2 flex gap-3">
          <span className="w-12 shrink-0" aria-hidden="true" />
          <ul className="flex min-w-0 flex-1 justify-between text-note" style={{ color: axis }}>
            {chart.months.map((mo) => (
              <li key={mo}>{mo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Stars({ n }) {
  return (
    <span role="img" aria-label={`${n} / 5`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9z"
            fill={i < n ? "#f5a400" : "none"}
            stroke={i < n ? "#f5a400" : INK}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}

function Launch({ slide }) {
  const c = slide.chart
  return (
    <div className="grid gap-6 2xl:grid-cols-[1.6fr_1fr]">
      <Card tone="night2" className="sm:p-8">
        <h4 className="text-copy font-semibold">{c.title}</h4>
        <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-1">
          <Num className="text-4xl" style={{ color: YELLOW }}>
            {c.big}
          </Num>
          <span className="text-note" style={{ color: TONE.night2.q }}>
            {c.sub}
          </span>
        </div>
        <InstallChart chart={c} />
        <p className="mt-6 rounded-[1.25rem] px-5 py-3 text-copy" style={{ background: BLUE, color: "#fff" }}>
          {c.read}
        </p>
      </Card>

      <div className="grid content-start gap-6 lg:grid-cols-2 2xl:grid-cols-1">
        <Card>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h4 className="text-2xl font-semibold tracking-tight">{slide.reviews.title}</h4>
            <span className="text-note" style={{ color: QUIET }}>
              {slide.reviews.sub}
            </span>
          </div>
          <ul className="mt-6 grid gap-4">
            {slide.reviews.items.map((r, i) => (
              <li key={i} className="rounded-[1.5rem] p-6" style={{ background: PALE }}>
                <Stars n={r.stars} />
                <p className="mt-2 text-copy">{r.text}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card tone="yellow" className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <h4 className="text-2xl font-semibold tracking-tight">{slide.retro.title}</h4>
            <p className="mt-3 text-copy font-medium]">{slide.retro.text}</p>
          </div>
          <Sticker src={slide.retro.sticker} className="hidden w-24 shrink-0 sm:block" />
        </Card>
      </div>
    </div>
  )
}

// --- 16 · Reflection -----------------------------------------------------------------

function Reflection({ slide }) {
  const s = slide.store
  const m = slide.marketing
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
        <Card tone="blue" className="wp-checker" style={{ backgroundColor: BLUE }}>
          <span className="inline-block rounded-full bg-white px-4 py-2 text-note font-black" style={{ color: "#0058d6" }}>
            {s.pill}
          </span>
          <div className="mt-6 flex items-center gap-4">
            <img src={s.icon} alt="" loading="lazy" className="size-24 shrink-0 rounded-[1.75rem] border-4 border-white" style={{ background: "#2f6bff" }} />
            <div className="min-w-0">
              <p className="wp-round text-2xl font-extrabold">{s.name}</p>
              <p className="wp-round mt-2 text-note font-bold" style={{ color: YELLOW }}>
                {s.publisher}
              </p>
            </div>
          </div>
          <ul className="mt-6 grid grid-cols-3 gap-3">
            {s.stats.map((st) => (
              <li key={st.label} className="rounded-[1.25rem] bg-white p-4" style={{ color: ON_FILL }}>
                <Num className="block text-2xl" style={{ color: "#0058d6" }}>
                  {st.value}
                </Num>
                <span className="mt-2 block text-note font-bold">{st.label}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-6 flex flex-wrap gap-2">
            {s.pills.map((p) => (
              <li key={p}>
                <Pill tone="yellow" className="px-3.5 py-1">
                  {p}
                </Pill>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-copy font-medium">{s.tagline}</p>
          <p className="mt-6 text-note">{s.source}</p>
        </Card>

        <Card tone="pale">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h4 className="text-2xl font-semibold tracking-tight">{m.title}</h4>
            <span className="text-note" style={{ color: QUIET }}>
              {m.sub}
            </span>
          </div>
          <img src={m.banner} alt={m.bannerAlt} loading="lazy" className="mt-6 block h-auto w-full rounded-[1.25rem]" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_1.1fr]">
            {m.squares.map((sq) => (
              <img key={sq.src} src={sq.src} alt={sq.alt} loading="lazy" className="block aspect-square w-full rounded-[1.1rem] object-cover" />
            ))}
            <ul className="col-span-2 grid grid-cols-2 gap-3 sm:col-span-1 sm:grid-cols-1">
              {m.audiences.map((au) => (
                <li key={au.tag}>
                  <Pill tone={au.tone} className="px-3 py-1">
                    {au.tag}
                  </Pill>
                  <p className="mt-2 text-copy">{au.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <TabCard tone="yellow" tab={slide.takeaways.tab} className="md:col-span-2 2xl:col-span-1">
          <ol className="grid gap-3 md:grid-cols-2 2xl:grid-cols-1">
            {slide.takeaways.items.map((it) => (
              <li key={it.no} className="rounded-[1.5rem] bg-white p-6" style={{ color: ON_FILL }}>
                <div className="flex items-center gap-3">
                  <Disc size={36}>
                    <span className="text-note">{it.no}</span>
                  </Disc>
                  <p className="text-copy font-black">{it.title}</p>
                </div>
                <p className="mt-2 text-copy" style={{ color: "#5f6b7e" }}>
                  {it.text}
                </p>
              </li>
            ))}
          </ol>
        </TabCard>
      </div>

      {/* The deck's closing "Thanks for watching" band: a slide ending, not a web
          page one, so it is left out.
            <div className="wp-checker relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-9 sm:py-8" style={{ backgroundColor: BLUE, color: "#fff" }}>
        <div className="relative z-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 sm:pr-40">
          <div>
            <p className="wp-round text-4xl font-extrabold sm:text-5xl">Thanks for watching!</p>
          </div>
          <p className="wp-round text-copy font-bold">WeatherPets · Shumei Zhang · UX/UI Designer</p>
        </div>
        <div className="absolute -bottom-2 right-4 hidden items-end sm:flex">
          <Sticker src={slide.stickers[0]} className="w-28" />
          <Sticker src={slide.stickers[1]} className="-ml-2 mb-16 w-16" />
        </div>
      </div>
      */}
    </div>
  )
}

// --- the switchboard ------------------------------------------------------------------

const BOARDS = {
  overview: { C: Overview },
  background: { C: Background },
  research: { C: Research },
  insights: { C: Insights, stage: "blue" },
  competitors: { C: Competitors },
  ideation: { C: Ideation },
  business: { C: Business },
  iteration: { C: Iteration },
  turn: { C: Turn, stage: "yellow" },
  aimascot: { C: AiMascot },
  home: { C: Home, stage: "blue" },
  testing: { C: Testing },
  handoff: { C: Handoff },
  launch: { C: Launch, stage: "dark" },
  reflection: { C: Reflection },
}

export default function WeatherPetsDeck({ slide }) {
  const t = useT()
  const entry = BOARDS[slide.kind]
  if (!entry) return null
  const { C, stage } = entry
  return (
    <Board slide={slide} stage={stage}>
      <C slide={slide} t={t} />
    </Board>
  )
}
