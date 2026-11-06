// The HMI (Granstudio) case study, laid out for the page rather than for a slide.
//
// The source is a deck of 1920×1080 slides: a title in the corner, the content
// floating in the middle. On a page that reads as loose pieces with nothing holding
// them, so every chapter here is rebuilt on one system instead: the page draws the
// chapter title large, and the content sits under it in rounded tiles on a quiet
// grey surface, left-aligned, on one grid. Sequences become chains and timelines,
// before/after pairs become a comparison table, and the deck's long centred flows
// stop being centred. The words and the artwork are the deck's own; only the
// arrangement is new.
//
// Every tile grid is a real grid, so three across becomes one across on a phone
// without any of it being scaled. One purple marks the path the project designs
// (manual → autonomous), as it does in the deck. Colour lives in `.hmi-deck` in
// index.css; copy in src/data/hmiDeck.js.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (16px),
// nothing below `text-note` (13px). The two diagrams on the Interface board draw
// their shapes in SVG but set their labels in HTML on top, so the labels keep to
// those sizes however wide the tile is.
//
// Motion is small and tied to what the content is: tiles rise in as they arrive,
// side-by-side tiles a beat apart; a sequence (the chat, a flow, a chain of steps)
// plays in order once its tile is on screen; the transition's arrow draws itself;
// and the breath light breathes, at the pace of a resting breath. All of it runs
// on the shared reveal in wpMotion.jsx and CSS in index.css, and none of it runs
// under prefers-reduced-motion.
import { ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react"
import { useReveal } from "./wpMotion"

// --- primitives ---------------------------------------------------------------

const ACCENT = "var(--hmi-accent)"
const RULE = "var(--hmi-rule)"

const nn = (i) => String(i + 1).padStart(2, "0")

// `**…**` in a string marks the words the slide set in bold.
function Rich({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/)
  return parts.map((part, i) =>
    i % 2 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

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
// follow the block in, i-th in line (see `.hmi-seq` in index.css).
const seq = (i) => ({ "--i": i })

// The one surface everything sits on. `lit` is the purple-tinted variant for the
// part of a sequence the project actually designs.
function Tile({ lit, pad = "p-6 sm:p-8", className = "", children, ...rest }) {
  return (
    <Rise className={`hmi-tile rounded-3xl ${pad} ${lit ? "hmi-tile--lit" : ""} ${className}`} {...rest}>
      {children}
    </Rise>
  )
}

// A tile's own title.
function Title({ children, className = "" }) {
  return <h3 className={`text-2xl font-semibold tracking-tight text-cream ${className}`}>{children}</h3>
}

// The small caps label: a step number, "FLOW", a column name.
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

// A sequence read top to bottom: a dot (or a number) per step, joined by a rail.
// `accentLast` marks the step the sequence arrives at.
function Timeline({ items, numbered, accentLast, className = "" }) {
  return (
    <ol className={className}>
      {items.map((step, i) => {
        const isLast = i === items.length - 1
        const accent = accentLast && isLast
        return (
          <li key={i} className="hmi-seq flex gap-4" style={seq(i)}>
            <span aria-hidden="true" className={`flex shrink-0 flex-col items-center ${numbered ? "w-8" : "w-2"}`}>
              {numbered ? (
                <span
                  className="flex size-8 items-center justify-center rounded-full text-callout font-semibold"
                  style={{
                    background: accent ? ACCENT : "var(--hmi-chip)",
                    color: accent ? "var(--hmi-on-accent)" : "var(--color-ink)",
                  }}
                >
                  {i + 1}
                </span>
              ) : (
                <span className="mt-2 size-2 rounded-full" style={{ background: accent ? ACCENT : "var(--hmi-dot)" }} />
              )}
              {!isLast && <span className={`w-px flex-1 ${numbered ? "my-2" : "mt-2"}`} style={{ background: RULE }} />}
            </span>
            <span
              className={`leading-snug ${numbered ? "pt-1 text-xl font-medium" : "text-copy"} ${
                isLast ? "" : numbered ? "pb-8" : "pb-6"
              }`}
              style={{ color: accent ? ACCENT : "var(--color-ink)" }}
            >
              {step}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

// A sequence read left to right: chips joined by chevrons, wrapping where the row
// runs out — which is what lets a five-step stage sit in one line on a laptop and
// in three on a phone.
function Chain({ items, lit }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((step, i) => (
        <li key={i} className="hmi-seq flex min-w-0 items-center gap-2" style={seq(i)}>
          <span
            className="min-w-0 rounded-2xl px-4 py-2 text-copy leading-snug"
            style={{ background: "var(--hmi-chip)", color: lit ? ACCENT : "var(--color-ink)" }}
          >
            {step}
          </span>
          {i < items.length - 1 && (
            <ChevronRight
              aria-hidden="true"
              size={16}
              className="shrink-0"
              style={{ color: lit ? ACCENT : "var(--color-fog)" }}
            />
          )}
        </li>
      ))}
    </ol>
  )
}

// A screen export — the cluster or the centre display. A hairline keeps the pale
// renders reading as objects on the pale tile.
function Screen({ src, alt = "", className = "", children }) {
  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="block h-auto w-full rounded-2xl"
        style={{ boxShadow: `0 0 0 1px ${RULE}` }}
      />
      {children}
    </div>
  )
}

// The breath-light photographs were pasted into the deck on their own white ground.
// On the light tile that white is multiplied away so they sit straight on the
// surface; on the dark one they keep a white card (see `.hmi-photo` in index.css).
//
// With `off` (the same photograph, unlit) the light breathes: the lit frame fades
// in and out over the unlit one on a four-second cycle. `phase` offsets the cycle
// so three lights in a row do not pulse as one.
function Photo({ src, off, phase = 0, alt = "", className = "" }) {
  return (
    <div className={`hmi-photo aspect-[5/4] overflow-hidden rounded-2xl ${className}`}>
      <div className="hmi-photo-in relative h-full w-full">
        <img src={off ?? src} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
        {off && (
          <img
            src={src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="hmi-breathe absolute inset-0 block h-full w-full object-cover"
            style={{ animationDelay: `${-phase}s` }}
          />
        )}
      </div>
    </div>
  )
}

// A cut-out illustration — the seated figures, the wheel, G-Va. Drawn in dark inks,
// so on the dark page it gets a pale well to stand on; on the light page the well
// is the tile's own grey.
function Well({ src, alt = "", className = "", imgClassName = "max-h-full" }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl ${className}`}
      style={{ background: "var(--hmi-well)" }}
    >
      <img src={src} alt={alt} loading="lazy" className={`block max-w-full object-contain ${imgClassName}`} />
    </div>
  )
}

// The deck's mode pill: a blue-grey gradient with white type.
function Pill({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-center text-copy font-medium leading-snug ${className}`}
      style={{ background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }}
    >
      {children}
    </div>
  )
}

// A wireframe box: grey, labelled, nothing else.
function Wire({ children, className = "", style, tone = 2 }) {
  return (
    <div
      className={`flex items-center justify-center rounded-lg p-2 text-center text-note leading-snug ${className}`}
      style={{ background: tone === 2 ? "var(--hmi-wire-2)" : "var(--hmi-wire)", color: "var(--color-ink)", ...style }}
    >
      {children}
    </div>
  )
}

// --- Background: the six SAE levels ---------------------------------------------

// Three across on a phone, so the six postures read as two short rows that can be
// compared at a glance; six across on a laptop.
function Levels({ slide }) {
  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-6 sm:gap-x-card sm:gap-y-8 lg:grid-cols-6">
      {slide.levels.map((level, i) => (
        <Rise as="li" key={level.img} delay={i * 60}>
          <Well src={level.img} className="aspect-square p-2 sm:p-4" />
          <p className="mt-2 text-copy font-semibold text-ink sm:mt-body">{level.n}</p>
          <p className="text-note text-fog">{level.label}</p>
        </Rise>
      ))}
    </ul>
  )
}

// --- Design trends: where we are, and where it is heading -------------------------

function Trends({ slide }) {
  return (
    <Tile className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
      <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
        <img src={slide.flag} alt="" className="block h-12 w-auto lg:h-20" />
        <div>
          <p className="text-3xl font-semibold tracking-tight text-cream lg:text-5xl">{slide.here}</p>
          <p className="text-callout text-fog lg:mt-1">{slide.hereNote}</p>
        </div>
      </div>
      <ul>
        {slide.items.map((item, i) => {
          const more = i === slide.items.length - 1
          return (
            <li
              key={item}
              className={`hmi-seq flex items-center gap-3 py-3 lg:gap-4 lg:py-4 ${i ? "border-t" : ""}`}
              style={{ borderColor: RULE, ...seq(i) }}
            >
              <ArrowRight
                aria-hidden="true"
                size={16}
                className="shrink-0 lg:size-5"
                style={{ color: more ? "var(--color-fog)" : ACCENT }}
              />
              <span
                className={`text-copy font-semibold leading-snug lg:text-2xl lg:tracking-tight ${
                  more ? "text-fog" : "text-cream"
                }`}
              >
                {item}
              </span>
            </li>
          )
        })}
      </ul>
    </Tile>
  )
}

// --- User interview: three drivers ------------------------------------------------

function Interview({ slide }) {
  return (
    <ul className="grid gap-card lg:grid-cols-3">
      {slide.people.map((person, i) => (
        <Tile as="li" key={person.avatar} pad="p-6" delay={i * 80}>
          <div className="flex items-center gap-4">
            <img src={person.avatar} alt="" loading="lazy" className="block size-16 shrink-0 rounded-full object-cover" />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-cream">{person.name}</h3>
              {person.meta.map((line) => (
                <p key={line} className="text-note text-fog">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <ul className="mt-6">
            {person.quotes.map((quote) => (
              <li key={quote} className="border-t py-3 text-copy text-fog last:pb-0" style={{ borderColor: RULE }}>
                <Rich text={quote} />
              </li>
            ))}
          </ul>
        </Tile>
      ))}
    </ul>
  )
}

// --- User journey map: five stages -------------------------------------------------

// One row per stage: its name on the left, its steps as a chain on the right. The
// two stages the project designs are the lit ones.
function Journey({ slide }) {
  return (
    <ol className="grid gap-card">
      {slide.stages.map((stage, i) => (
        <Tile
          as="li"
          key={stage.label}
          lit={stage.lit}
          pad="p-6"
          className="grid gap-4 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-center lg:gap-8"
        >
          <div>
            <Label accent={stage.lit}>{nn(i)}</Label>
            <h3
              className="mt-1 text-xl font-semibold leading-snug"
              style={{ color: stage.lit ? ACCENT : "var(--color-cream)" }}
            >
              {stage.label}
            </h3>
          </div>
          <Chain items={stage.steps} lit={stage.lit} />
        </Tile>
      ))}
    </ol>
  )
}

// --- Possible scenarios: three ways in ----------------------------------------------

function Scenarios({ slide }) {
  return (
    <ol className="grid gap-card lg:grid-cols-3">
      {slide.columns.map((col, i) => {
        const ink = col.lit ? ACCENT : "var(--color-cream)"
        return (
          <Tile as="li" key={col.title} lit={col.lit} pad="p-6" delay={i * 80}>
            <span className="block text-5xl font-semibold leading-none tracking-tight" style={{ color: ink }}>
              {i + 1}
            </span>
            <h3 className="mt-4 text-xl font-semibold leading-snug lg:min-h-14" style={{ color: ink }}>
              {col.title}
            </h3>
            <Timeline items={col.steps} accentLast className="mt-6" />
          </Tile>
        )
      })}
    </ol>
  )
}

// --- Key point: what the research adds up to -----------------------------------------

// Five statements as a bento: two wide, three narrow. On a phone a bento of five
// is five tall cards, so there each becomes a short row — number, then statement —
// at body size.
function KeyPoints({ slide }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-2 sm:gap-card lg:grid-cols-6">
      {slide.items.map((item, i) => (
        <Tile
          as="li"
          key={item}
          delay={i * 60}
          pad="p-4 sm:p-8"
          className={`flex items-baseline gap-3 sm:flex-col sm:items-stretch sm:justify-between sm:gap-8 ${
            i === 0 ? "sm:col-span-2 lg:col-span-3" : i === 1 ? "lg:col-span-3" : "lg:col-span-2"
          }`}
        >
          <Label className="shrink-0">{nn(i)}</Label>
          <p className="text-copy font-medium leading-snug text-ink sm:text-xl">{item}</p>
        </Tile>
      ))}
    </ol>
  )
}

// --- Design point: the light and the channels ----------------------------------------

function DesignPoint({ slide }) {
  const { light, channels } = slide
  return (
    <div className="grid gap-card lg:grid-cols-2">
      <Tile className="flex flex-col">
        <Title>{light.title}</Title>
        <div className="mt-body space-y-body">
          {light.notes.map((note) => (
            <p key={note} className="text-copy text-fog">
              {note}
            </p>
          ))}
        </div>
        <ul className="mt-auto grid grid-cols-3 gap-3 pt-8">
          {light.images.map((src, i) => (
            <li key={src}>
              <Photo src={src} off={light.off} phase={i * 1.3} />
            </li>
          ))}
        </ul>
      </Tile>
      <Tile className="flex flex-col" delay={80}>
        <Title>{channels.title}</Title>
        <p className="mt-body text-copy text-fog">{channels.note}</p>
        <ul className="mt-auto grid grid-cols-3 gap-3 pt-8">
          {channels.images.map((src, i) => (
            <li key={src}>
              <Well src={src} className="aspect-[5/4] p-2" imgClassName={i === 2 ? "max-h-full rounded-md" : "max-h-full"} />
            </li>
          ))}
        </ul>
      </Tile>
    </div>
  )
}

// --- Voice interaction: G-Va and the flow ---------------------------------------------

// The dialogue as a message thread: the driver on the right in the deck's blue-grey,
// G-Va on the left in the neutral chip, so who is speaking reads from the side alone.
function Chat({ slide }) {
  return (
    <Tile>
      <ol className="flex flex-col gap-3">
        {slide.messages.map((m, i) => {
          const mine = m.from === "user"
          return (
            <li key={i} className={`hmi-seq flex items-end gap-3 ${mine ? "justify-end" : "justify-start"}`} style={seq(i * 2)}>
              {!mine && <img src={slide.robot} alt="G-Va" loading="lazy" className="block h-14 w-auto shrink-0" />}
              <p
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-copy leading-snug ${
                  mine ? "rounded-br-md" : "rounded-bl-md"
                }`}
                style={
                  mine
                    ? { background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }
                    : { background: "var(--hmi-chip)", color: "var(--color-ink)" }
                }
              >
                {m.text}
              </p>
            </li>
          )
        })}
      </ol>
    </Tile>
  )
}

function Flow({ title, items }) {
  return (
    <Tile className="flex flex-col justify-between gap-8" delay={80}>
      <Label>{title}</Label>
      <Timeline items={items} numbered accentLast />
    </Tile>
  )
}

function Voice({ slide }) {
  return (
    <div className="grid gap-card lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
      <Chat slide={slide} />
      <Flow title="FLOW" items={slide.flow} />
    </div>
  )
}

// --- Mechanical interaction: the lever and the light -----------------------------------

function Mechanical({ slide }) {
  return (
    <div className="grid gap-card">
      <div className="grid gap-card lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Rise>
          <Well src={slide.wheel} className="h-full rounded-3xl p-6 sm:p-8" imgClassName="max-h-72" />
        </Rise>
        <Flow title="FLOW" items={slide.flow} />
      </div>
      <Tile>
        <Title>{slide.lightTitle}</Title>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-12">
          {/* The slide captions the first light on its own and the other two together. */}
          <div className="grid grid-cols-3 content-start gap-x-3 gap-y-2">
            {slide.lights.map((l, i) => (
              <Photo key={l.img} src={l.img} off={slide.lightOff} phase={i * 1.3} />
            ))}
            <p className="text-center text-note text-fog">{slide.lights[0].caption}</p>
            <p className="col-span-2 text-center text-note text-fog">{slide.lightsCaption}</p>
          </div>
          <dl>
            {slide.lightPoints.map((p, i) => (
              <div
                key={p.term}
                className={i ? "border-t py-4 last:pb-0" : "pb-4"}
                style={{ borderColor: RULE }}
              >
                <dt className="text-copy font-semibold text-ink">{p.term}</dt>
                <dd className="mt-1 text-copy text-fog">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Tile>
    </div>
  )
}

// --- Interface: visible area and reach zones --------------------------------------------

// The cluster behind the wheel rim: a 684×256 frame, its visible area a rectangle
// whose top corners are rounded off by the rim, the two corners left over its blind
// spots. The labels are HTML so they hold their size.
function DashboardDiagram({ d }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "684 / 256" }}>
      <svg aria-hidden="true" viewBox="0 0 684 256" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect width="684" height="256" fill="var(--hmi-blind)" />
        <path d="M0 256 V 125 A 190 125 0 0 1 190 0 H 494 A 190 125 0 0 1 684 125 V 256 Z" fill="var(--hmi-zone-1)" />
      </svg>
      <span className="absolute left-[3%] top-[8%] text-note leading-tight text-ink">{d.blind}</span>
      <span className="absolute right-[3%] top-[8%] text-right text-note leading-tight text-ink">{d.blind}</span>
      <span className="absolute inset-x-0 top-[52%] text-center text-copy font-medium text-ink">{d.visible}</span>
    </div>
  )
}

// The centre display, 900×506, in three reach zones that curve with the driver's arm.
function ConsoleDiagram({ c }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "900 / 506" }}>
      <svg aria-hidden="true" viewBox="0 0 900 506" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect width="900" height="506" fill="var(--hmi-zone-3)" />
        <path d="M0 0 H 440 C 500 140, 570 340, 630 506 H 0 Z" fill="var(--hmi-zone-2)" />
        <path d="M0 0 H 200 C 290 150, 370 330, 400 506 H 0 Z" fill="var(--hmi-zone-1)" />
      </svg>
      <div className="absolute inset-0 grid grid-cols-3 items-center px-[2%]">
        {c.zones.map((z) => (
          <span key={z} className="px-1 text-center text-note font-medium leading-snug text-ink">
            {z}
          </span>
        ))}
      </div>
    </div>
  )
}

// Title, diagram, then the photograph the diagram was read off. The two diagrams
// are different shapes, so each is centred in the space its tile has left.
function InterfaceTile({ title, photo, delay, children }) {
  return (
    <Tile className="flex flex-col" delay={delay}>
      <Title>{title}</Title>
      <div className="flex flex-1 items-center py-6">{children}</div>
      <div className="flex h-40 items-center justify-center">
        <img src={photo} alt="" loading="lazy" className="block max-h-full max-w-full rounded-xl object-contain" />
      </div>
    </Tile>
  )
}

function Interface({ slide }) {
  const { dashboard: d, console: c } = slide
  return (
    <div className="grid gap-card lg:grid-cols-2">
      <InterfaceTile title={d.title} photo={d.photo}>
        <DashboardDiagram d={d} />
      </InterfaceTile>
      <InterfaceTile title={c.title} photo={c.photo} delay={80}>
        <ConsoleDiagram c={c} />
      </InterfaceTile>
    </div>
  )
}

// --- Dashboard: wireframe, then both modes -----------------------------------------------

function DashboardWire({ w }) {
  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl" style={{ background: "var(--hmi-wire)" }}>
      <Wire className="rounded-none py-3">{w.gear}</Wire>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 p-3 sm:gap-4 sm:p-4">
        <Wire className="min-h-28 self-center">{w.driving}</Wire>
        <div className="flex flex-col items-center gap-3">
          <Wire className="w-[70%] py-2">{w.nav}</Wire>
          <Wire className="min-h-32 w-full">{w.road}</Wire>
        </div>
        <Wire className="min-h-28 self-center">{w.custom}</Wire>
      </div>
    </div>
  )
}

function ModeTile({ m, delay }) {
  return (
    <Tile as="figure" className="flex flex-col" delay={delay}>
      <figcaption>
        <Title>{m.caption}</Title>
      </figcaption>
      <Screen src={m.img} alt={m.caption} className="mt-6" />
      <p className="mt-4 flex items-center gap-3 text-copy leading-snug text-ink">
        <img src={m.icon} alt="" className="block size-10 shrink-0" />
        <span>{m.callout}</span>
      </p>
    </Tile>
  )
}

function Dashboard({ slide }) {
  return (
    <div className="grid gap-card">
      <Tile>
        <Title>{slide.wire.caption}</Title>
        <div className="mt-6">
          <DashboardWire w={slide.wire} />
        </div>
      </Tile>
      <div className="grid gap-card lg:grid-cols-2">
        <ModeTile m={slide.manual} />
        <ModeTile m={slide.auto} delay={80} />
      </div>
      {/* What turns the first screen into the second. */}
      <Tile pad="px-6 py-4 sm:px-8" className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: ACCENT, color: "var(--hmi-on-accent)" }}
        >
          <ArrowRight size={16} />
        </span>
        <p className="text-copy font-medium text-ink">{slide.between}</p>
      </Tile>
    </div>
  )
}

// --- Central console display --------------------------------------------------------------

// The console wireframes are grids rather than pinned boxes: the slide's three bands
// (header, body, footer) and the body's columns survive, but a label that needs two
// lines on a phone makes its row taller instead of colliding with its neighbour.
function ConsoleWireManual({ slide, b }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl" style={{ background: "var(--hmi-wire)" }}>
      <Wire className="rounded-none py-2">{slide.header}</Wire>
      <div className="grid min-h-56 grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr_auto] gap-3 p-3 sm:gap-4 sm:p-6">
        <Wire className="self-start py-3 sm:py-4">{b.nav}</Wire>
        <span />
        <Wire className="w-[70%] self-start justify-self-end py-2">{b.zoom}</Wire>
        <span className="col-span-3 self-center text-center text-note text-ink">{b.map}</span>
        <Wire className="self-end py-2">{b.search}</Wire>
        <span />
        <Wire className="self-end py-3">{b.dest}</Wire>
      </div>
      <Wire className="rounded-none py-2">{slide.footer}</Wire>
    </div>
  )
}

function ConsoleWireAuto({ slide, b }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl" style={{ background: "var(--hmi-wire)" }}>
      <Wire className="rounded-none py-2">{slide.header}</Wire>
      <div className="grid min-h-56 grid-cols-2 gap-3 p-3 sm:gap-4 sm:p-6">
        <Wire>{b.map}</Wire>
        <div className="relative grid grid-cols-[1.4fr_1fr] grid-rows-2 gap-2">
          <Wire />
          <Wire className="row-span-2" />
          <Wire />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center p-2 text-center text-note leading-snug text-ink">
            {b.custom}
          </span>
        </div>
      </div>
      <Wire className="rounded-none py-2">{slide.footer}</Wire>
    </div>
  )
}

function ConsoleMode({ slide, m, delay, Wire: WireFrame }) {
  return (
    <Tile as="figure" className="flex flex-col" delay={delay}>
      <figcaption>
        <Title>{m.caption}</Title>
        <p className="mt-body text-copy text-fog">{m.note}</p>
      </figcaption>
      <div className="mt-auto pt-6">
        <WireFrame slide={slide} b={m.boxes} />
        <Screen src={m.img} alt={m.caption} className="mt-4" />
      </div>
    </Tile>
  )
}

function Console({ slide }) {
  return (
    <div className="grid gap-card lg:grid-cols-2">
      <ConsoleMode slide={slide} m={slide.manual} Wire={ConsoleWireManual} />
      <ConsoleMode slide={slide} m={slide.auto} delay={80} Wire={ConsoleWireAuto} />
    </div>
  )
}

// --- Mode transition: side by side ----------------------------------------------------------

function TransitionCell({ cell }) {
  if (cell.fit === "contain") {
    return <Photo src={cell.img} off={cell.off} className="mx-auto w-full max-w-40" />
  }
  return (
    <Screen src={cell.img} className="self-start sm:self-auto">
      {/* Overlaid on the screen, as in the deck, once the cell is wide enough to
          hold it; under the screen on a phone. */}
      {cell.badge && (
        <span
          className="mt-2 block rounded-lg px-2 py-1 text-center text-note font-medium sm:absolute sm:bottom-[6%] sm:left-1/2 sm:mt-0 sm:-translate-x-1/2 sm:whitespace-nowrap sm:px-4"
          style={{ background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }}
        >
          {cell.badge}
        </span>
      )}
    </Screen>
  )
}

// A comparison table: the two modes across the top, one row per thing that changes.
// On a laptop the name of the change is the first column; on a phone it becomes the
// row's heading and the two states stay side by side under it. The first change —
// the voice prompt — has nothing to show, so its row is the arrow itself.
function Transition({ slide }) {
  return (
    <Tile pad="p-4 sm:p-8">
      <div className="grid grid-cols-2 items-center gap-x-4 gap-y-6 lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-8">
        <span aria-hidden="true" className="hidden lg:block" />
        <Pill>{slide.manual}</Pill>
        <Pill>{slide.auto}</Pill>
        {slide.rows.map((row, i) => (
          <div key={row.label} className="contents">
            <span aria-hidden="true" className="col-span-full h-px" style={{ background: RULE }} />
            <div className="col-span-2 lg:col-span-1">
              <Label>{nn(i)}</Label>
              <h3 className="mt-1 text-xl font-semibold leading-snug text-cream">{row.label}</h3>
            </div>
            {row.left ? (
              <>
                <TransitionCell cell={row.left} />
                <TransitionCell cell={row.right} />
              </>
            ) : (
              <span aria-hidden="true" className="col-span-2 flex items-center" style={{ color: ACCENT }}>
                <span className="hmi-draw h-px flex-1 bg-current" />
                <ArrowRight size={20} className="hmi-seq -ml-2 shrink-0" style={seq(6)} />
              </span>
            )}
          </div>
        ))}
      </div>
    </Tile>
  )
}

// --- ProtoPie: the walkthrough, G-Va, the two links ------------------------------------------

function LinkTile({ link, delay }) {
  return (
    <Rise
      as="a"
      delay={delay}
      href={link.href}
      target="_blank"
      rel="noreferrer"
      className="hmi-tile group flex flex-col justify-between gap-8 rounded-3xl p-6 no-underline sm:p-8"
    >
      <span className="flex items-start justify-between gap-4">
        <span className="text-2xl font-semibold tracking-tight text-cream">{link.label}</span>
        <span
          aria-hidden="true"
          className="hmi-go flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300"
        >
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5"
          />
        </span>
      </span>
      <span className="text-copy text-fog">{link.note}</span>
    </Rise>
  )
}

function Prototype({ slide }) {
  return (
    <div>
      <Rise as="figure">
        <div className="hmi-tile aspect-video w-full overflow-hidden rounded-3xl">
          <iframe
            src={slide.video.src}
            title={slide.video.title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
        <figcaption className="mt-body text-note text-fog">{slide.video.caption}</figcaption>
      </Rise>
      <div className="mt-visual grid gap-card lg:grid-cols-3">
        <Tile className="flex items-center gap-4">
          <img src={slide.robot} alt="G-Va" loading="lazy" className="hmi-float block h-24 w-auto shrink-0" />
          <p
            className="hmi-seq rounded-3xl rounded-bl-md px-4 py-3 text-copy font-medium leading-snug text-ink"
            style={{ background: "var(--hmi-chip)", ...seq(2) }}
          >
            {slide.hello}
          </p>
        </Tile>
        {slide.links.map((link, i) => (
          <LinkTile key={link.href} link={link} delay={(i + 1) * 80} />
        ))}
      </div>
      {/* The deck's own asterisked notes on using the prototype. */}
      <ul className="mt-lead space-y-body">
        {slide.notes.map((note) => (
          <li key={note} className="flex gap-2 text-callout text-fog">
            <span aria-hidden="true">*</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- the switchboard ------------------------------------------------------------

const BOARDS = {
  levels: Levels,
  trends: Trends,
  interview: Interview,
  journey: Journey,
  scenarios: Scenarios,
  keypoints: KeyPoints,
  designpoint: DesignPoint,
  voice: Voice,
  mechanical: Mechanical,
  interface: Interface,
  dashboard: Dashboard,
  console: Console,
  transition: Transition,
  prototype: Prototype,
}

export default function HmiDeck({ slide }) {
  const Board = BOARDS[slide.kind]
  if (!Board) return null
  return (
    <div className="hmi-deck mt-visual">
      <Board slide={slide} />
    </div>
  )
}
