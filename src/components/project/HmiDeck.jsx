// The HMI (Granstudio) case-study deck, rebuilt in the page — one board per slide,
// laid out the way the WeatherPets and ABC Mouse boards are: on the page's own
// surface, under the section's eyebrow, with the page's hero carrying the cover.
//
// The source slides are 1920×1080 artboards. Scaling one of those down to the
// reading column would put its 24px copy at about 13px, so nothing here is scaled:
// each slide is rebuilt out of real boxes, real text and the slide's own exported
// artwork, which is also what lets every two- and five-column composition collapse
// to one column on a phone. What survives from the deck is its composition — a
// diagram on the left and its flow on the right, two modes side by side with the
// change named between them — and its two inks: the navy the headings use and the
// one purple that marks the path the project designs. Colour lives in `.hmi-deck`
// in index.css; copy in src/data/hmiDeck.js.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px),
// nothing below `text-note` (18px). The two diagrams on the Interface board draw
// their shapes in SVG but set their labels in HTML on top, so the labels keep to
// those sizes however wide the column is.

// --- primitives ---------------------------------------------------------------

const ACCENT = "var(--hmi-accent)"
const TITLE = "var(--hmi-title)"
const LINE = "var(--hmi-line)"

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

// A slide's own subheading: "FLOW", "Breath Light", "Dashboard". Navy, centred.
function Heading({ children, className = "", accent }) {
  return (
    <h3
      className={`text-center text-2xl font-semibold leading-tight ${className}`}
      style={{ color: accent ? ACCENT : TITLE }}
    >
      {children}
    </h3>
  )
}

// The deck's thin arrow: a hairline with a small open head, pointing down.
function DownArrow({ lit, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 36"
      width="12"
      height="36"
      className={`mx-auto block shrink-0 ${className}`}
      style={{ color: lit ? ACCENT : LINE }}
    >
      <line x1="6" y1="0" x2="6" y2="34" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1 29 L6 35 L11 29" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

// One step in a sequence, with the arrow that leads to the next.
function Steps({ items, lit, last, className = "" }) {
  return (
    <ol className={`flex flex-col items-center ${className}`}>
      {items.map((step, i) => {
        const isLast = i === items.length - 1
        const purple = lit || (last && isLast)
        return (
          <li key={i} className="flex flex-col items-center">
            <span
              className="block max-w-[16rem] text-center text-copy leading-snug"
              style={{ color: purple ? ACCENT : "var(--color-ink)" }}
            >
              {step}
            </span>
            {!isLast && <DownArrow lit={lit} className="my-2" />}
          </li>
        )
      })}
    </ol>
  )
}

// The deck's outlined flow box, and the "FLOW" column built from them.
function FlowBox({ children }) {
  return (
    <div
      className="w-full rounded-xl border px-5 py-4 text-center text-copy leading-snug text-ink"
      style={{ borderColor: LINE }}
    >
      {children}
    </div>
  )
}

function Flow({ title, items }) {
  return (
    <div className="mx-auto w-full max-w-sm">
      <Heading className="mb-6">{title}</Heading>
      <ol className="flex flex-col items-center">
        {items.map((item, i) => (
          <li key={i} className="flex w-full flex-col items-center">
            <FlowBox>{item}</FlowBox>
            {i < items.length - 1 && <DownArrow className="my-1" />}
          </li>
        ))}
      </ol>
    </div>
  )
}

// A screen export — the cluster or the centre display — with its own soft shadow
// so the pale renders still read as objects on the pale page.
function Screen({ src, alt = "", className = "", children }) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ boxShadow: "0 1px 0 var(--color-line)" }}>
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      {children}
    </div>
  )
}

// The breath-light photographs were pasted in with their own white ground, so they
// get a white card in both themes rather than a transparent cut-out.
function Light({ src, alt = "", className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl ${className}`}
      style={{ background: "var(--hmi-figure)", aspectRatio: "1.2" }}
    >
      <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
    </div>
  )
}

// The deck's mode pill: a blue-grey gradient with white type.
function Pill({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl px-6 py-3 text-center text-copy font-medium ${className}`}
      style={{ background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }}
    >
      {children}
    </div>
  )
}

// A hairline that ends in a dot — the deck's way of tying a note to a thing.
function Tie({ className = "" }) {
  return (
    <span aria-hidden="true" className={`flex items-center ${className}`} style={{ color: LINE }}>
      <span className="h-px flex-1 bg-current" />
      <span className="size-2 rounded-full bg-current" />
    </span>
  )
}

// A wireframe box: grey, labelled, nothing else.
function Wire({ children, className = "", style, tone = 2 }) {
  return (
    <div
      className={`flex items-center justify-center rounded-sm p-2 text-center text-note leading-snug ${className}`}
      style={{ background: tone === 2 ? "var(--hmi-wire-2)" : "var(--hmi-wire)", color: "var(--hmi-on-wire)", ...style }}
    >
      {children}
    </div>
  )
}

// --- 01 · Background: the six SAE levels ----------------------------------------

function Levels({ slide }) {
  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-6 sm:gap-x-10">
        {slide.levels.map((level) => (
          <li key={level.img} className="flex flex-col items-center text-center">
            <img src={level.img} alt="" loading="lazy" className="block h-34 w-auto max-w-full object-contain sm:h-30" />
            <p className="mt-4 text-copy font-medium text-ink">{level.n}</p>
            <p className="mt-0.5 max-w-[14rem] text-note leading-snug text-fog">{level.label}</p>
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-12 max-w-3xl text-center text-copy leading-relaxed text-ink">{slide.statement}</p>
    </div>
  )
}

// --- 02 · Design trends: the flag and the fan -----------------------------------

// The fan of dashed curves is drawn once in a unit box and stretched to the gap it
// has to cross; `non-scaling-stroke` keeps the dashes the same weight however the
// box is stretched. On a phone the gap disappears and the list simply follows.
function Trends({ slide }) {
  const n = slide.items.length
  return (
    <div className="grid items-center gap-8 sm:grid-cols-[auto_minmax(4rem,8rem)_1fr] sm:gap-0">
      <div className="flex flex-col items-center sm:items-end sm:pr-2">
        <img src={slide.flag} alt="" className="block h-24 w-auto" />
        <p className="mt-2 text-2xl font-semibold leading-none" style={{ color: TITLE }}>
          {slide.here}
        </p>
        <p className="mt-1 text-note text-fog">{slide.hereNote}</p>
      </div>
      <svg
        aria-hidden="true"
        className="hidden h-full w-full sm:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ color: TITLE, minHeight: `${n * 4.5}rem` }}
      >
        {slide.items.map((_, i) => {
          const y = ((i + 0.5) / n) * 100
          return (
            <path
              key={i}
              d={`M0 50 C 45 50, 55 ${y}, 100 ${y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="7 6"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
      <ul className="flex flex-col justify-between gap-6 sm:min-h-[18rem]">
        {slide.items.map((item) => (
          <li key={item} className="flex items-center gap-4">
            <span aria-hidden="true" className="size-4 shrink-0 rounded-full" style={{ background: TITLE }} />
            <span className="text-copy font-semibold leading-snug" style={{ color: TITLE }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- 03 · User interview: three drivers ------------------------------------------

function Person({ person }) {
  return (
    <article>
      <div className="flex items-center gap-5">
        <img src={person.avatar} alt="" loading="lazy" className="block size-24 shrink-0 rounded-full object-cover sm:size-28" />
        <div>
          <h3 className="text-2xl font-semibold" style={{ color: TITLE }}>
            {person.name}
          </h3>
          {person.meta.map((line) => (
            <p key={line} className="mt-0.5 text-note leading-snug text-fog">
              {line}
            </p>
          ))}
        </div>
      </div>
      <ul className="mt-5 space-y-2">
        {person.quotes.map((quote) => (
          <li key={quote} className="flex gap-3 text-copy leading-relaxed text-fog">
            <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-ink/40" />
            <span>
              <Rich text={quote} />
            </span>
          </li>
        ))}
      </ul>
    </article>
  )
}

// The slide staggers its three people — two down the left, one on the right sitting
// between them — and the grid keeps that: the right-hand column centres itself.
function Interview({ slide }) {
  const [a, b, c] = slide.people
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
      <div className="flex flex-col gap-12">
        <Person person={a} />
        <Person person={b} />
      </div>
      <div className="lg:self-center">
        <Person person={c} />
      </div>
    </div>
  )
}

// --- 04 · User journey map: five stages -------------------------------------------

function Journey({ slide }) {
  return (
    <ol className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {slide.stages.map((stage) => (
        <li key={stage.label} className="flex flex-col items-center">
          <div
            className="flex min-h-[5.5rem] w-full items-center justify-center rounded-lg border px-3 py-3 text-center text-copy leading-snug text-ink"
            style={{ borderColor: LINE }}
          >
            {stage.label}
          </div>
          <Steps items={stage.steps} lit={stage.lit} className="mt-6" />
        </li>
      ))}
    </ol>
  )
}

// --- 05 · Possible scenarios: three ways in -------------------------------------

function Scenarios({ slide }) {
  return (
    <ol className="grid gap-x-8 gap-y-12 md:grid-cols-3">
      {slide.columns.map((col, i) => (
        <li key={col.title} className="flex flex-col items-center">
          <span className="text-3xl font-semibold leading-none" style={{ color: col.lit ? ACCENT : "var(--color-ink)" }}>
            {i + 1}
          </span>
          <h3
            className="mt-4 max-w-[18rem] text-center text-copy font-semibold leading-snug"
            style={{ color: col.lit ? ACCENT : "var(--color-ink)" }}
          >
            {col.title}
          </h3>
          <Steps items={col.steps} last className="mt-6" />
        </li>
      ))}
    </ol>
  )
}

// --- 07 · Design point: the light and the channels ------------------------------

function DesignPoint({ slide }) {
  const { light, channels } = slide
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
      <div className="flex flex-col items-center">
        <Heading>{light.title}</Heading>
        <ul className="mt-6 grid w-full max-w-md grid-cols-3 gap-3">
          {light.images.map((src) => (
            <li key={src}>
              <Light src={src} />
            </li>
          ))}
        </ul>
        {light.notes.map((note) => (
          <p key={note} className="mt-4 max-w-md text-center text-note leading-relaxed text-fog">
            {note}
          </p>
        ))}
      </div>
      <div className="flex flex-col items-center">
        <Heading>{channels.title}</Heading>
        <ul className="mt-6 grid w-full max-w-md grid-cols-3 items-center gap-3">
          {channels.images.map((src, i) => (
            <li key={src} className="flex h-28 items-center justify-center">
              <img
                src={src}
                alt=""
                loading="lazy"
                className={`block max-h-full w-auto max-w-full object-contain ${i === 2 ? "rounded-md" : ""}`}
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-md text-center text-note leading-relaxed text-fog">{channels.note}</p>
      </div>
    </div>
  )
}

// --- 08 · Voice interaction: G-Va and the flow -----------------------------------

function Chat({ slide }) {
  return (
    <div className="rounded-3xl p-5 sm:p-7" style={{ background: "var(--hmi-chat)" }}>
      <ol className="flex flex-col gap-4">
        {slide.messages.map((m, i) => {
          const mine = m.from === "user"
          return (
            <li key={i} className={`flex items-end gap-3 ${mine ? "justify-end" : "justify-start"}`}>
              {!mine && <img src={slide.robot} alt="G-Va" loading="lazy" className="block h-20 w-auto shrink-0" />}
              <p
                className={`max-w-[75%] px-4 py-2.5 text-note leading-snug sm:max-w-[70%] ${
                  mine ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"
                }`}
                style={{ background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }}
              >
                {m.text}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Voice({ slide }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
      <Chat slide={slide} />
      <Flow title="FLOW" items={slide.flow} />
    </div>
  )
}

// --- 09 · Mechanical interaction: the lever and the light -------------------------

function Mechanical({ slide }) {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
      <div className="flex flex-col items-center">
        {/* The wheel render was pasted in on its own white ground, like the lights. */}
        <div className="w-full max-w-md overflow-hidden rounded-2xl" style={{ background: "var(--hmi-figure)" }}>
          <img src={slide.wheel} alt="" loading="lazy" className="block w-full" />
        </div>
        <ul className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
          {slide.lights.map((l) => (
            <li key={l.img}>
              <Light src={l.img} />
            </li>
          ))}
        </ul>
        {/* The slide captions the first light on its own and the other two together. */}
        <div className="mt-2 grid w-full max-w-md grid-cols-3 gap-3 text-center text-note text-fog">
          <p>{slide.lights[0].caption}</p>
          <p className="col-span-2">{slide.lightsCaption}</p>
        </div>
      </div>
      <div>
        <Flow title="FLOW" items={slide.flow} />
        <Heading className="mt-10">{slide.lightTitle}</Heading>
        <ul className="mt-5 space-y-4">
          {slide.lightPoints.map((p) => (
            <li key={p.term} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1 shrink-0 rounded-full bg-ink/40" />
              <div>
                <p className="text-copy font-semibold text-ink">{p.term}</p>
                <p className="text-copy leading-relaxed text-fog">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// --- 10 · Interface: visible area and reach zones --------------------------------

// The cluster behind the wheel rim: a 684×256 frame, its visible area a rectangle
// whose top corners are rounded off by the rim, the two corners left over its blind
// spots. The labels are HTML so they hold their size.
function DashboardDiagram({ d }) {
  return (
    <div className="relative w-full" style={{ aspectRatio: "684 / 256" }}>
      <svg aria-hidden="true" viewBox="0 0 684 256" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect x="0.75" y="0.75" width="682.5" height="254.5" fill="var(--hmi-blind)" stroke={LINE} strokeWidth="1.5" />
        <path
          d="M0.75 255.25 V 125 A 190 125 0 0 1 190.75 0.75 H 493.25 A 190 125 0 0 1 683.25 125 V 255.25 Z"
          fill="var(--hmi-zone-1)"
          stroke={LINE}
          strokeWidth="1.5"
        />
      </svg>
      <span className="absolute left-[2%] top-[6%] text-note leading-tight text-ink">{d.blind}</span>
      <span className="absolute right-[2%] top-[6%] text-right text-note leading-tight text-ink">{d.blind}</span>
      <span className="absolute inset-x-0 top-[55%] text-center text-copy text-ink">{d.visible}</span>
    </div>
  )
}

// The centre display, 900×506, in three reach zones that curve with the driver's arm.
function ConsoleDiagram({ c }) {
  const fills = ["var(--hmi-zone-1)", "var(--hmi-zone-2)", "var(--hmi-zone-3)"]
  return (
    <div className="relative w-full" style={{ aspectRatio: "900 / 506" }}>
      <svg aria-hidden="true" viewBox="0 0 900 506" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <rect x="0.75" y="0.75" width="898.5" height="504.5" fill={fills[2]} />
        <path d="M0.75 0.75 H 440 C 500 140, 570 340, 630 505.25 H 0.75 Z" fill={fills[1]} />
        <path d="M0.75 0.75 H 200 C 290 150, 370 330, 400 505.25 H 0.75 Z" fill={fills[0]} />
        <rect x="0.75" y="0.75" width="898.5" height="504.5" fill="none" stroke={LINE} strokeWidth="1.5" />
      </svg>
      <div className="absolute inset-0 grid grid-cols-3 items-center px-[2%]">
        {c.zones.map((z) => (
          <span key={z} className="px-1 text-center text-note leading-snug text-ink">
            {z}
          </span>
        ))}
      </div>
    </div>
  )
}

function Interface({ slide }) {
  const { dashboard: d, console: c } = slide
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-end lg:gap-10">
      <div className="flex flex-col items-center">
        <Heading className="mb-5">{d.title}</Heading>
        <DashboardDiagram d={d} />
        <img src={d.photo} alt="" loading="lazy" className="mt-6 block w-full max-w-[18rem] rounded-md" />
      </div>
      <div className="flex flex-col items-center">
        <Heading className="mb-5">{c.title}</Heading>
        <ConsoleDiagram c={c} />
        <img src={c.photo} alt="" loading="lazy" className="mt-6 block w-full max-w-[28rem] rounded-md" />
      </div>
    </div>
  )
}

// --- 11 · Dashboard: wireframe, then both modes ----------------------------------

function DashboardWire({ w }) {
  return (
    <figure className="mx-auto w-full max-w-2xl">
      <div className="rounded-md p-0" style={{ background: "var(--hmi-wire)" }}>
        <Wire className="rounded-b-none py-2.5">{w.gear}</Wire>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-3 p-3 sm:gap-4 sm:p-4">
          <Wire className="min-h-[7rem] self-center">{w.driving}</Wire>
          <div className="flex flex-col items-center gap-3">
            <Wire className="w-[60%] py-2">{w.nav}</Wire>
            <Wire className="min-h-[9rem] w-full">{w.road}</Wire>
          </div>
          <Wire className="min-h-[7rem] self-center">{w.custom}</Wire>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-2xl" style={{ color: TITLE }}>
        {w.caption}
      </figcaption>
    </figure>
  )
}

function Callout({ icon, text }) {
  return (
    <p className="flex items-center gap-3 text-note leading-snug text-ink">
      <img src={icon} alt="" className="block size-11 shrink-0" />
      <span>{text}</span>
    </p>
  )
}

function ModeScreen({ m }) {
  return (
    <figure className="flex min-w-0 flex-col">
      <Callout icon={m.icon} text={m.callout} />
      <Screen src={m.img} alt={m.caption} className="mt-3" />
      <figcaption className="mt-4 text-center text-2xl" style={{ color: TITLE }}>
        {m.caption}
      </figcaption>
    </figure>
  )
}

function Dashboard({ slide }) {
  return (
    <div>
      <DashboardWire w={slide.wire} />
      <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_minmax(9rem,11rem)_1fr] lg:gap-6">
        <ModeScreen m={slide.manual} />
        <div className="flex flex-col items-center lg:px-1">
          <span aria-hidden="true" className="hidden w-full items-center lg:flex" style={{ color: LINE }}>
            <span className="size-2 rounded-full bg-current" />
            <span className="h-px flex-1 bg-current" />
            <span className="size-2 rounded-full bg-current" />
          </span>
          <DownArrow className="lg:hidden" />
          <p className="mt-2 max-w-[14rem] text-center text-note leading-snug text-fog">{slide.between}</p>
        </div>
        <ModeScreen m={slide.auto} />
      </div>
    </div>
  )
}

// --- 12 · Central console display ------------------------------------------------

// The console wireframes are grids rather than pinned boxes: the slide's three bands
// (header, body, footer) and the body's three columns survive, but a label that needs
// two lines on a phone makes its row taller instead of colliding with its neighbour.
function ConsoleWireManual({ slide, b }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md" style={{ background: "var(--hmi-wire)" }}>
      <Wire className="rounded-none py-2">{slide.header}</Wire>
      <div className="grid grid-cols-[1fr_auto_1fr] grid-rows-[auto_1fr_auto] gap-3 p-3 sm:gap-4 sm:p-5" style={{ minHeight: "11rem" }}>
        <Wire className="self-start py-3 sm:py-4">{b.nav}</Wire>
        <span />
        <Wire className="justify-self-end self-start w-[70%] py-2">{b.zoom}</Wire>
        <span className="col-span-3 self-center text-center text-note text-ink">{b.map}</span>
        <Wire className="self-end py-1.5">{b.search}</Wire>
        <span />
        <Wire className="self-end py-2.5">{b.dest}</Wire>
      </div>
      <Wire className="rounded-none py-2">{slide.footer}</Wire>
    </div>
  )
}

function ConsoleWireAuto({ slide, b }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-md" style={{ background: "var(--hmi-wire)" }}>
      <Wire className="rounded-none py-2">{slide.header}</Wire>
      <div className="grid grid-cols-[1fr_1fr] gap-3 p-3 sm:gap-4 sm:p-5" style={{ minHeight: "11rem" }}>
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

function ConsoleMode({ slide, m, Wire: WireFrame }) {
  return (
    <figure className="flex min-w-0 flex-col">
      <WireFrame slide={slide} b={m.boxes} />
      <Screen src={m.img} alt={m.caption} className="mt-6" />
      <figcaption className="mt-4 text-center text-2xl" style={{ color: TITLE }}>
        {m.caption}
      </figcaption>
      <p className="mt-3 flex gap-3 text-note leading-snug text-fog">
        <Tie className="mt-[0.6em] w-8 shrink-0" />
        <span>{m.note}</span>
      </p>
    </figure>
  )
}

function Console({ slide }) {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-10">
      <ConsoleMode slide={slide} m={slide.manual} Wire={ConsoleWireManual} />
      <ConsoleMode slide={slide} m={slide.auto} Wire={ConsoleWireAuto} />
    </div>
  )
}

// --- 13 · Mode transition: side by side ------------------------------------------

function TransitionCell({ cell }) {
  if (!cell) return null
  if (cell.fit === "contain") {
    return (
      <div className="flex justify-center">
        <Light src={cell.img} className="w-full max-w-[12rem]" />
      </div>
    )
  }
  return (
    <Screen src={cell.img}>
      {cell.badge && (
        <span
          className="absolute bottom-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-4 py-1 text-note font-medium"
          style={{ background: "var(--hmi-bubble)", color: "var(--hmi-on-bubble)" }}
        >
          {cell.badge}
        </span>
      )}
    </Screen>
  )
}

// Each change is one row: the manual state, the name of the change, the autonomous
// state. On a laptop the name sits between the two on a tie that points right; on a
// phone the row stacks and the tie turns into a down arrow.
function Transition({ slide }) {
  return (
    <div className="grid gap-y-10 lg:grid-cols-[1fr_minmax(10rem,13rem)_1fr] lg:gap-x-6 lg:gap-y-8">
      <Pill className="lg:self-center">{slide.manual}</Pill>
      <TransitionLabel label={slide.rows[0].label} />
      <Pill className="lg:self-center">{slide.auto}</Pill>
      {slide.rows.slice(1).map((row) => (
        <div key={row.label} className="contents">
          <div className="lg:self-center">
            <TransitionCell cell={row.left} />
          </div>
          <TransitionLabel label={row.label} />
          <div className="lg:self-center">
            <TransitionCell cell={row.right} />
          </div>
        </div>
      ))}
    </div>
  )
}

function TransitionLabel({ label }) {
  return (
    <div className="flex flex-col items-center self-center">
      <Tie className="hidden w-full lg:flex" />
      <DownArrow className="lg:hidden" />
      <p className="mt-2 text-center text-note leading-snug" style={{ color: TITLE }}>
        {label}
      </p>
    </div>
  )
}

// --- 14 · ProtoPie: G-Va says hello ---------------------------------------------

function Gva({ slide }) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <img src={slide.robot} alt="G-Va" loading="lazy" className="block h-28 w-auto" />
      <p className="text-copy text-ink">{slide.hello}</p>
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
  designpoint: DesignPoint,
  voice: Voice,
  mechanical: Mechanical,
  interface: Interface,
  dashboard: Dashboard,
  console: Console,
  transition: Transition,
  gva: Gva,
}

export default function HmiDeck({ slide }) {
  const Board = BOARDS[slide.kind]
  if (!Board) return null
  return (
    <div className="hmi-deck mt-8">
      <Board slide={slide} />
    </div>
  )
}
