// The ABC Mouse (开心鼠) case-study deck, rebuilt in the page — one board per Figma
// frame, drawn on the page's own surface under the section's eyebrow, with the page's
// hero carrying the cover.
//
// The source frames are 1920-wide artboards. Scaling one down to a reading column
// would put the copy at about 10px, so nothing here is scaled, and the deck's
// surfaces are gone too: what the site does everywhere else is lay copy straight on
// the page with hairlines between rows, so every board here is a column of rows — a
// label on the left, the content on the right, the way the page's own definition
// lists and meta rows are set — and the grid collapses to one column on a phone. Any
// card is the page's own `bg-box` with its hairline. What survives from the deck is
// its composition — the two-up before/after, the five-step loop, the four parties and
// Bloom's pyramid, the four-cell feedback matrix, the three persona cards with the
// photo breaking the card's top edge — and its palette, used as marks rather than as
// surfaces: the orange for discs, chips, rules and the fat arrow; the pale yellow as
// a highlighter under the one line per board that holds its point. Content lives in
// src/data/abcMouse.js; colour in `.abc-deck` in index.css.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px), nothing
// below `text-note` (18px). That is why these boards run taller than their 16:9 source.

// --- colour ------------------------------------------------------------------

const ACCENT = "var(--abc-accent)" // fills, rules, marks
const ACCENT_INK = "var(--abc-accent-ink)" // orange as type
const ON_ACCENT = "var(--abc-on-accent)"
const PALE = "var(--abc-pale)"
const ON_PALE = "var(--abc-on-pale)"
const BAND = "var(--abc-band)"
const ON_BAND = "var(--abc-on-band)"
const PINK = "var(--abc-pink)"
const QUIET = "var(--abc-quiet)"

// The page's own card: its box colour and its hairline, drawn inside so the card never
// grows by the border.
const BOX = { background: "var(--color-box)", boxShadow: "inset 0 0 0 1px var(--color-line)" }

// --- primitives ----------------------------------------------------------------

// The board's own heading — 「项目背景 / Background」: the title in the display face,
// a slanted orange tick, and the other language's name quiet beside it.
function Head({ title, sub }) {
  return (
    <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-condensed text-3xl leading-none tracking-wide text-cream sm:text-4xl">{title}</span>
      <span
        aria-hidden="true"
        className="inline-block h-6 w-[3px] self-center rounded-full rotate-[18deg]"
        style={{ background: ACCENT }}
      />
      <span className="text-xl font-medium leading-none" style={{ color: QUIET }}>
        {sub}
      </span>
    </div>
  )
}

// A row of the board: a label column on the left, the content on the right, a
// hairline above. Below `lg` the label stacks over the content. The label is the
// deck's orange display label, set in the ink that holds on the page.
function Row({ label, note, children, className = "" }) {
  return (
    <section
      className={`grid gap-y-4 border-t border-line py-7 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[14rem_minmax(0,1fr)] ${className}`}
    >
      <div className="min-w-0">
        <h4 className="font-condensed text-2xl leading-tight tracking-wide" style={{ color: ACCENT_INK }}>
          {label}
        </h4>
        {note && (
          <p className="mt-1.5 text-note leading-relaxed" style={{ color: QUIET }}>
            {note}
          </p>
        )}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

// A board with no label column still starts under the same hairline.
function Plain({ children, className = "" }) {
  return <div className={`border-t border-line pt-7 ${className}`}>{children}</div>
}

function Card({ children, className = "", style }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${className}`} style={{ ...BOX, ...style }}>
      {children}
    </div>
  )
}

// A label chip in one of the deck's fills and its dark ink, or the page's own quiet box.
const FILL = {
  accent: [ACCENT, ON_ACCENT],
  pale: [PALE, ON_PALE],
  pink: [PINK, ON_PALE],
}

function Chip({ tone = "accent", children, className = "" }) {
  const fill = FILL[tone]
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-note font-medium leading-snug ${className}`}
      style={
        fill
          ? { background: fill[0], color: fill[1] }
          : { background: "var(--color-box)", color: "var(--color-ink)", boxShadow: "inset 0 0 0 1px var(--color-line)" }
      }
    >
      {children}
    </span>
  )
}

// A numbered disc in the deck's orange.
function Disc({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full font-condensed text-xl tracking-wider ${className}`}
      style={{ background: ACCENT, color: ON_ACCENT }}
    >
      {children}
    </span>
  )
}

// A small orange dot — the bullet.
function Dot({ className = "", color = ACCENT }) {
  return <span aria-hidden="true" className={`mt-[0.6em] size-2 shrink-0 rounded-full ${className}`} style={{ background: color }} />
}

function Lines({ items, className = "" }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-copy leading-relaxed text-ink">
          <Dot />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// Copy with a few phrases underlined — the board underlines the words its sentence
// turns on. `parts` is [{ text, u }].
function Marked({ parts }) {
  return parts.map((part, i) => (part.u ? <u key={i}>{part.text}</u> : <span key={i}>{part.text}</span>))
}

// The board's point, said large and run under the highlighter — see `.abc-hi`.
function Point({ children, className = "" }) {
  return (
    <p className={`max-w-3xl text-2xl font-semibold leading-[1.55] text-cream ${className}`}>
      <span className="abc-hi">{children}</span>
    </p>
  )
}

// The deck's fat orange arrow. It points right by default; `className` turns it —
// `rotate-90` for down, and the responsive variants for a row that forms at a
// breakpoint.
function Arrow({ size = 32, className = "" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 81 65" width={size} height={size * 0.8} className={`shrink-0 ${className}`}>
      <path
        d="M45.1 32.3c0-5.7-4.7-10.4-10.4-10.4H10.4C4.7 21.9 0 26.6 0 32.3s4.7 10.4 10.4 10.4h24.3c5.7 0 10.4-4.7 10.4-10.4Z"
        fill={ACCENT}
      />
      <path
        d="M52 2.9l24.5 20.6c4.3 3.6 5.6 8.4 3.4 13.2-1.4 3.2-4 5.4-5.9 7.1L52 61.7c-3.5 3-7.8 3.6-11.4 2.2-2.4-.9-4.5-2.7-6-5.3-.6-1.3-.9-2.7-1-4.3 0 0 4-15.1 4-21.8S33.3 11.5 33.3 11.5c0-1.9.4-3.6 1.1-5.1 1.4-2.4 3.4-4.1 5.6-5.1.1 0 .2-.1.4-.1 3.6-1.5 7.9-.8 11.4 2.1Z"
        fill={ACCENT}
      />
    </svg>
  )
}

// The deck's ✕ and ✓, in its orange — never a glyph, which would take the text colour.
function Mark({ ok, size = 22 }) {
  return ok ? (
    <svg aria-hidden="true" viewBox="0 0 57 45" width={size * 1.27} height={size} className="shrink-0">
      <path
        d="M52.5 4.5c-2.5-2.5-6.6-2.5-9.1 0L16.6 31.3c-2.5 2.5-2.5 6.6 0 9.1s6.6 2.5 9.1 0l26.8-26.8c2.5-2.5 2.5-6.6 0-9.1Z"
        fill={ACCENT}
      />
      <path
        d="M24.5 40.4c2.5-2.5 2.5-6.6 0-9.1L13.7 20.5c-2.5-2.5-6.6-2.5-9.1 0s-2.5 6.6 0 9.1l10.8 10.8c2.5 2.5 6.6 2.5 9.1 0Z"
        fill={ACCENT}
      />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 45 45" width={size} height={size} className="shrink-0">
      <path
        d="M40.4 4.5c-2.5-2.5-6.6-2.5-9.1 0L4.5 31.3c-2.5 2.5-2.5 6.6 0 9.1s6.6 2.5 9.1 0L40.4 13.7c2.5-2.5 2.5-6.6 0-9.1Z"
        fill={ACCENT}
      />
      <path
        d="M40.4 40.4c2.5-2.5 2.5-6.6 0-9.1L13.7 4.5c-2.5-2.5-6.6-2.5-9.1 0s-2.5 6.6 0 9.1l26.8 26.8c2.5 2.5 6.6 2.5 9.1 0Z"
        fill={ACCENT}
      />
    </svg>
  )
}

// A screenshot, framed with the page's hairline, and its caption if it has one.
function Shot({ src, alt = "", caption, className = "", imgClassName = "" }) {
  const frame = (
    <div className={`overflow-hidden rounded-xl bg-box ring-1 ring-line ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={`block h-auto w-full ${imgClassName}`} />
    </div>
  )
  if (!caption) return frame
  return (
    <figure className="min-w-0">
      {frame}
      <figcaption className="mt-2 text-note leading-snug" style={{ color: QUIET }}>
        {caption}
      </figcaption>
    </figure>
  )
}

// --- 01 · Background ------------------------------------------------------------

function Background({ slide }) {
  const { before, after } = slide
  return (
    <Plain className="grid items-stretch gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 lg:gap-6">
      <Card>
        <Chip tone="quiet">{before.label}</Chip>
        <div className="mt-4 overflow-hidden rounded-xl bg-white ring-1 ring-line">
          <img src={before.image} alt="ABCmouse" loading="lazy" className="block h-auto w-full" />
        </div>
        <p className="mt-5 text-2xl font-semibold leading-tight text-cream">{before.heading}</p>
        <Lines items={before.lines} className="mt-3" />
      </Card>

      <Arrow size={44} className="justify-self-center self-center rotate-90 md:rotate-0" />

      <Card>
        <Chip tone="accent">{after.label}</Chip>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {after.images.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl ring-1 ring-line">
              <img src={src} alt="" loading="lazy" className="block aspect-[1/0.93] h-auto w-full object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-2xl font-semibold leading-tight text-cream">{after.heading}</p>
        <Lines items={after.lines} className="mt-3" />
      </Card>
    </Plain>
  )
}

// --- 02 · Existing issues -------------------------------------------------------

function Issues({ slide }) {
  const { design, users, goal } = slide
  const split = "grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start"
  return (
    <div>
      <Row label={design.heading}>
        <div className={split}>
          <div className="grid grid-cols-2 gap-x-3 gap-y-2">
            {design.labels.map((label) => (
              <div key={label}>
                <Chip tone="quiet">{label}</Chip>
              </div>
            ))}
            {design.shots.map((shot) => (
              <Shot key={shot.src} src={shot.src} />
            ))}
          </div>
          <Lines items={design.lines} />
        </div>
      </Row>

      <Row label={users.heading}>
        <div className={split}>
          <Shot src={users.image} caption={users.label} />
          <Lines items={users.lines} />
        </div>
      </Row>

      <Point className="pt-2">
        <Marked parts={goal} />
      </Point>
    </div>
  )
}

// --- 03 · Work flow -------------------------------------------------------------

// The rail the five discs sit on. Each step draws its own slice, so the rail meets
// the disc centres without anyone measuring anything: below `lg` it runs down the
// left of the list, from the first disc to the last; from `lg` it runs across the
// top, and the loop that closes the five steps arches over it from the last disc
// back to the first.
const V = { start: "top-5 bottom-0", mid: "top-0 bottom-0", end: "top-0 h-5" }
const H = { start: "lg:left-1/2 lg:right-0", mid: "lg:left-0 lg:right-0", end: "lg:left-0 lg:right-1/2" }

function RailSlice({ edge }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute left-[18.5px] w-[3px] ${V[edge]} lg:bottom-auto lg:top-[18.5px] lg:h-[3px] lg:w-auto ${H[edge]}`}
      style={{ background: ACCENT }}
    />
  )
}

const LOOP_H = 44

function Workflow({ slide }) {
  const { steps, loop } = slide
  const edge = (i) => (i === 0 ? "start" : i === steps.length - 1 ? "end" : "mid")
  return (
    <Plain>
      <div className="lg:hidden">
        <Chip tone="accent">↻ {loop}</Chip>
      </div>

      <ol className="relative mt-6 grid lg:mt-0 lg:grid-cols-5">
        {/* The loop, lg only: an arch from the last disc's centre (90% across) back to
            the first's (10%) — its legs run down behind the two discs — with the
            label sitting on its top edge. */}
        <li aria-hidden="true" className="relative hidden lg:col-span-5 lg:block" style={{ height: LOOP_H + 16 }}>
          <div
            className="absolute left-[10%] right-[10%] rounded-t-3xl border-[3px] border-b-0"
            style={{ bottom: -20, height: LOOP_H, borderColor: ACCENT }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: `calc(100% + 20px - ${LOOP_H}px)` }}
          >
            <Chip tone="accent" className="whitespace-nowrap">
              ↻ {loop}
            </Chip>
          </div>
        </li>

        {steps.map((step, i) => (
          <li key={step.no} className="relative flex gap-4 pb-8 lg:flex-col lg:items-center lg:px-3 lg:pb-0 lg:text-center">
            <RailSlice edge={edge(i)} />
            <Disc className="relative z-10">{step.no}</Disc>
            <div className="min-w-0 pt-1 lg:mt-4 lg:pt-0">
              <p className="font-condensed text-2xl leading-tight tracking-wide text-cream">{step.name}</p>
              <div className="mt-2">
                <Chip tone="pale">{step.role}</Chip>
              </div>
              <p className="mt-2.5 text-copy leading-relaxed text-ink">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Plain>
  )
}

// --- 04 · Stakeholder -----------------------------------------------------------

function Stakeholder({ slide }) {
  const { parties, goal, bloom } = slide
  const n = bloom.levels.length
  return (
    <div>
      <Row label={goal}>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {parties.map((party) => (
            <li key={party.name} className="flex flex-col items-center rounded-2xl px-3 py-5 text-center" style={BOX}>
              <div className="size-24 overflow-hidden rounded-full" style={{ background: PALE }}>
                <img src={party.image} alt="" loading="lazy" className="block h-full w-full object-cover object-top" />
              </div>
              <p className="mt-3 text-copy font-semibold leading-snug text-cream">{party.name}</p>
              <p className="mt-1 text-note leading-snug" style={{ color: QUIET }}>
                {party.want}
              </p>
            </li>
          ))}
        </ul>
      </Row>

      <Row label={bloom.caption}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-center">
          <ol className="flex flex-col items-center gap-2">
            {bloom.levels.map((level, i) => {
              const aside = bloom.asides[i]
              return (
                <li key={level} className="flex w-full flex-col items-center">
                  <div
                    className="rounded-xl py-2.5 text-center"
                    style={{
                      width: `${42 + (58 * i) / (n - 1)}%`,
                      background: `color-mix(in srgb, ${ACCENT} ${Math.round((100 * i) / (n - 1)) * 0.75}%, ${PALE})`,
                      color: ON_PALE,
                    }}
                  >
                    <span className="font-condensed text-xl tracking-wider sm:text-2xl">{level}</span>
                  </div>
                  {aside && (
                    <p className="mt-1 text-center text-note leading-snug" style={{ color: QUIET }}>
                      {aside}
                    </p>
                  )}
                </li>
              )
            })}
          </ol>
          <Card>
            <p className="border-l-[3px] pl-4 text-copy leading-relaxed text-ink" style={{ borderColor: ACCENT }}>
              {bloom.note}
            </p>
          </Card>
        </div>
      </Row>
    </div>
  )
}

// --- 05 · Research framework ----------------------------------------------------

function Bubble({ name, lines }) {
  return (
    <Card className="flex flex-col items-center text-center">
      <span className="font-condensed text-3xl leading-none tracking-wider" style={{ color: ACCENT_INK }}>
        {name}
      </span>
      <ul className="mt-4 space-y-1 text-copy leading-relaxed text-ink">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </Card>
  )
}

function Framework({ slide }) {
  return (
    <Plain className="grid items-stretch gap-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-4 lg:gap-6">
      <Bubble name={slide.user.name} lines={slide.user.lines} />
      {/* The exchange between the two. Horizontal on anything but a phone, where the
          cards stack and the arrows turn to meet them. */}
      <div className="flex items-center justify-center gap-3 sm:flex-col sm:gap-2">
        <Chip tone="accent">{slide.action}</Chip>
        <Arrow size={30} className="rotate-90 sm:rotate-0" />
        <Arrow size={30} className="-rotate-90 sm:rotate-180" />
        <Chip tone="pale">{slide.feedback}</Chip>
      </div>
      <Bubble name={slide.object.name} lines={slide.object.lines} />
    </Plain>
  )
}

// --- 06 · User analysis ---------------------------------------------------------

function Stage({ stage }) {
  const lit = stage.lit
  return (
    <li className="rounded-2xl p-5" style={lit ? { background: ACCENT, color: ON_ACCENT } : BOX}>
      <p className="font-condensed text-2xl leading-none tracking-wider" style={{ color: lit ? ON_ACCENT : ACCENT_INK }}>
        {stage.age}
      </p>
      <p className="mt-2 text-copy font-semibold leading-snug" style={{ color: lit ? ON_ACCENT : "var(--color-cream)" }}>
        {stage.name}
      </p>
      <p className="mt-2 text-note leading-snug" style={{ color: lit ? ON_ACCENT : QUIET }}>
        {stage.text}
      </p>
    </li>
  )
}

// Bartle's four types on their two axes. The axes are a hairline cross behind the
// cells; the two types the users turn out to be sit on the deck's pale fill.
function Quadrant({ bartle }) {
  const { axes, quadrants } = bartle
  const axis = "font-mono-tight text-note uppercase tracking-wide"
  return (
    <div className="rounded-2xl p-4 sm:p-5" style={BOX}>
      <p className={`${axis} text-center`} style={{ color: QUIET }}>
        {axes.top}
      </p>
      <div className="mt-2 flex items-stretch gap-2">
        <p className={`${axis} shrink-0 self-center [writing-mode:vertical-rl] rotate-180`} style={{ color: QUIET }}>
          {axes.left}
        </p>
        <div className="relative grid min-w-0 flex-1 grid-cols-2 gap-3">
          <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-[3px] -translate-x-1/2 rounded-full" style={{ background: ACCENT }} />
          <div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full" style={{ background: ACCENT }} />
          {quadrants.map((q) => (
            <div
              key={q.name}
              className="relative flex flex-col justify-center rounded-xl px-3 py-4 text-center"
              style={q.lit ? { background: PALE, color: ON_PALE } : undefined}
            >
              <p className="text-copy font-semibold leading-snug" style={{ color: q.lit ? ON_PALE : "var(--color-cream)" }}>
                {q.name}
              </p>
              <p className="mt-1 text-note leading-snug" style={{ color: q.lit ? ON_PALE : QUIET }}>
                {q.text}
              </p>
            </div>
          ))}
        </div>
        <p className={`${axis} shrink-0 self-center [writing-mode:vertical-rl]`} style={{ color: QUIET }}>
          {axes.right}
        </p>
      </div>
      <p className={`${axis} mt-2 text-center`} style={{ color: QUIET }}>
        {axes.bottom}
      </p>
    </div>
  )
}

function Users({ slide }) {
  const { piaget, bartle, bridges, traits, conclusion } = slide
  return (
    <div>
      <Row label={piaget.caption}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {piaget.stages.map((stage) => (
            <Stage key={stage.age} stage={stage} />
          ))}
        </ol>
      </Row>

      <Row label={bartle.caption}>
        {/* The board reads top to bottom here: the four types, the two the users
            turn out to be, and the traits that follow from them. */}
        <Quadrant bartle={bartle} />

        <div className="my-5 grid gap-4 sm:grid-cols-2">
          {bridges.map((bridge) => (
            <div key={bridge} className="flex flex-col items-center gap-2">
              <Arrow size={26} className="rotate-90" />
              <span
                className="rounded-xl border-[3px] px-4 py-1.5 text-center font-condensed text-xl tracking-wide text-cream"
                style={{ borderColor: ACCENT }}
              >
                {bridge}
              </span>
              <Arrow size={26} className="rotate-90" />
            </div>
          ))}
        </div>

        <Card className="grid gap-5 sm:grid-cols-3">
          {traits.map((trait) => (
            <div key={trait.name}>
              <p className="font-condensed text-2xl leading-none tracking-wide" style={{ color: ACCENT_INK }}>
                {trait.name}
              </p>
              <p className="mt-2 text-copy leading-relaxed text-ink">{trait.text}</p>
            </div>
          ))}
        </Card>
      </Row>

      <Point className="pt-2">
        <Marked parts={conclusion} />
      </Point>
    </div>
  )
}

// --- 07 · Action analysis -------------------------------------------------------

function Glyph({ kind }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" width="32" height="32" className="shrink-0 justify-self-center">
      <rect x="0" y="13.5" width="36" height="9" rx="4.5" fill={ACCENT} />
      {kind === "plus" ? (
        <rect x="13.5" y="0" width="9" height="36" rx="4.5" fill={ACCENT} />
      ) : (
        <>
          <rect x="0" y="4" width="36" height="9" rx="4.5" fill={ACCENT} />
          <rect x="0" y="23" width="36" height="9" rx="4.5" fill={ACCENT} />
          <rect x="0" y="13.5" width="36" height="9" rx="4.5" fill="var(--color-page)" />
        </>
      )}
    </svg>
  )
}

function Actions({ slide }) {
  const { why, motives, how, formula, band } = slide
  return (
    <div>
      <Row label={why}>
        <div className="space-y-8">
          {motives.map((motive) => (
            <div key={motive.name} className="grid gap-4 md:grid-cols-[minmax(0,4fr)_minmax(0,9fr)] md:items-center md:gap-6">
              <div>
                <Chip tone="accent">{motive.name}</Chip>
                <p className="mt-3 text-copy font-medium leading-relaxed text-cream">{motive.quote}</p>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {motive.shots.map((shot) => (
                  <li key={shot.src}>
                    <Shot src={shot.src} caption={shot.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Row>

      <Row label={how}>
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
          {formula.map((group, i) => (
            <div key={group.name} className="contents">
              <Card className="h-full">
                <p className="text-copy font-semibold leading-snug text-cream">{group.name}</p>
                <Lines items={group.items} className="mt-3" />
              </Card>
              {i < formula.length - 1 && <Glyph kind={i === formula.length - 2 ? "equals" : "plus"} />}
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2.5 rounded-2xl px-5 py-5 sm:px-7" style={{ background: BAND, color: ON_BAND }}>
          {band.map((line) => (
            <li key={line} className="flex gap-3 text-copy leading-relaxed">
              <Dot color={ON_BAND} />
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

// --- 08 · Feedback --------------------------------------------------------------

function Cell({ name, children }) {
  return (
    <Card>
      <p className="font-condensed text-2xl leading-none tracking-wide" style={{ color: ACCENT_INK }}>
        {name}
      </p>
      {children}
    </Card>
  )
}

function Feedback({ slide }) {
  const { positive, negative, instant, delayed } = slide
  return (
    <Plain className="grid gap-4 sm:grid-cols-2">
      <Cell name={positive.name}>
        <ul className="mt-5 space-y-4">
          {positive.rows.map((row) => (
            <li key={row.text} className="flex items-start gap-3 text-copy leading-relaxed text-ink">
              <Mark ok={row.ok} />
              <span className="min-w-0">{row.text}</span>
            </li>
          ))}
        </ul>
      </Cell>

      <Cell name={negative.name}>
        {/* Two up only once the card is wide enough for two 20px columns; below
            lg each shot sits beside its line instead. */}
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {negative.shots.map((shot) => (
            <div key={shot.src} className="flex items-center gap-4 lg:block">
              <Shot src={shot.src} className="w-36 shrink-0 sm:w-44 lg:w-full" />
              <p className="flex min-w-0 items-start gap-2.5 text-copy leading-snug text-ink lg:mt-3">
                <Mark ok={shot.ok} />
                <span className="min-w-0">{shot.text}</span>
              </p>
            </div>
          ))}
        </div>
      </Cell>

      <Cell name={instant.name}>
        <Shot src={instant.image} className="mt-5" />
        <p className="mt-4 text-copy leading-relaxed text-ink">{instant.text}</p>
      </Cell>

      <Cell name={delayed.name}>
        <Shot src={delayed.image} className="mt-5" />
        <p className="mt-4 text-copy leading-relaxed text-ink">{delayed.text}</p>
      </Cell>
    </Plain>
  )
}

// --- 09 · Persona ---------------------------------------------------------------

function PersonaCard({ person, labels }) {
  const term = "font-mono-tight text-note uppercase tracking-wide"
  return (
    <article className="relative rounded-2xl px-5 pb-6 pt-6" style={BOX}>
      {/* The photo breaks the top edge, as it does on the board. */}
      <img
        src={person.image}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -top-10 right-3 h-[200px] w-auto object-contain"
      />
      <div className="min-h-[160px] pr-[130px]">
        <span
          className="inline-block rounded-full px-4 py-1 font-condensed text-2xl leading-tight tracking-wider"
          style={{ background: ACCENT, color: ON_ACCENT }}
        >
          {person.name}
        </span>
        <p className="mt-3 text-copy font-semibold leading-snug text-cream">{person.age}</p>
        {person.stage && (
          <p className="text-copy font-medium leading-snug" style={{ color: ACCENT_INK }}>
            {person.stage}
          </p>
        )}
        <div className="mt-1.5 text-note leading-snug" style={{ color: QUIET }}>
          {person.facts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-1">
        {person.quotes.map((quote) => (
          <li key={quote} className="text-copy font-medium leading-snug" style={{ color: ACCENT_INK }}>
            {quote}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-copy leading-relaxed text-ink">{person.bio}</p>

      <dl className="mt-5 grid grid-cols-[2fr_3fr] gap-x-4 border-t border-line pt-4">
        <div>
          <dt className={term} style={{ color: QUIET }}>
            {labels.goal}
          </dt>
          <dd className="mt-1 text-copy leading-snug text-ink">{person.goal}</dd>
        </div>
        <div>
          <dt className={term} style={{ color: QUIET }}>
            {labels.traits}
          </dt>
          <dd className="mt-1 text-copy leading-snug text-ink">{person.traits}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <p className={term} style={{ color: QUIET }}>
          {labels.frustrations}
        </p>
        <Lines items={person.frustrations} className="mt-1.5" />
      </div>
    </article>
  )
}

function Persona({ slide }) {
  return (
    // More top room than the other boards: the photos stand above the cards' top edge.
    <div className="grid gap-x-5 gap-y-14 border-t border-line pt-16 lg:grid-cols-3">
      {slide.people.map((person) => (
        <PersonaCard key={person.name} person={person} labels={slide.labels} />
      ))}
    </div>
  )
}

// --- 10 · Pain points and solutions ---------------------------------------------

function Painpoints({ slide }) {
  return (
    <div>
      {slide.groups.map((group) => (
        <Row key={group.heading} label={group.heading}>
          {/* Problem → solution, side by side from sm up. On a phone the two columns
              would be too narrow for a 20px line, so each pair stacks with the arrow
              turned to point down. */}
          <ul className="space-y-3">
            {group.rows.map(([problem, solution], i) => (
              <li
                key={i}
                className="grid gap-y-2 rounded-xl px-4 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-x-5"
                style={BOX}
              >
                <p className="text-copy leading-relaxed" style={{ color: QUIET }}>
                  {problem}
                </p>
                <Arrow size={24} className={`rotate-90 sm:rotate-0 ${problem ? "" : "hidden sm:block"}`} />
                <p className="text-copy font-medium leading-relaxed text-ink">{solution}</p>
              </li>
            ))}
          </ul>
        </Row>
      ))}
      <div className="grid gap-4 border-t border-line pt-7 sm:grid-cols-[11fr_13fr] sm:items-start">
        {slide.images.map((image) => (
          <Shot key={image.src} src={image.src} alt={image.alt} caption={image.alt} />
        ))}
      </div>
    </div>
  )
}

// --- 11 · Case ------------------------------------------------------------------

function Case({ slide }) {
  const { brief, logic, layout, ixd } = slide
  return (
    <div>
      {brief.map((item) => (
        <Row key={item.label} label={item.label}>
          {item.text && <p className="text-copy leading-relaxed text-ink">{item.text}</p>}
          {item.steps && (
            <ol className="space-y-3">
              {item.steps.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <Disc>{i + 1}</Disc>
                  <span className="min-w-0 pt-1.5 text-copy leading-relaxed text-ink">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </Row>
      ))}

      <Row label={logic.label}>
        <Shot src={logic.image} />
      </Row>

      <Row label={layout.label}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-center">
          <Shot src={layout.image} />
          <ul className="space-y-2.5">
            {layout.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-copy font-medium leading-relaxed text-cream">
                <Arrow size={22} className="mt-1" />
                <span className="min-w-0">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Row>

      <Row label={ixd.label}>
        <div className="grid gap-6 md:grid-cols-2">
          {ixd.boards.map((board) => (
            <figure key={board.image}>
              <Shot src={board.image} />
              <ul className="mt-3 space-y-1.5">
                {board.notes.map((note) => (
                  <li key={note} className="flex gap-3 text-copy leading-relaxed text-ink">
                    <Dot />
                    <span className="min-w-0">{note}</span>
                  </li>
                ))}
              </ul>
            </figure>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:items-center">
          <div className="flex items-center gap-3">
            <Shot src={ixd.legend.image} className="w-44 shrink-0 sm:w-56" />
            <Arrow size={26} />
            <p className="text-copy font-medium leading-snug text-cream">{ixd.legend.text}</p>
          </div>
          <Shot src={ixd.transition} />
        </div>
      </Row>
    </div>
  )
}

// --- 12 · Other case ------------------------------------------------------------

function Gallery({ slide }) {
  return (
    <Plain className="relative">
      <img
        src={slide.mice.plane}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -top-[6.5rem] right-0 hidden w-[120px] lg:block"
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slide.shots.map((shot) => (
          <li key={shot.src}>
            <Shot src={shot.src} alt={shot.alt} caption={shot.alt} />
          </li>
        ))}
      </ul>
      <div className="mt-8 flex items-end justify-between gap-6">
        <ul className="flex flex-wrap gap-2">
          {slide.labels.map((label) => (
            <li key={label}>
              <Chip tone="pink">{label}</Chip>
            </li>
          ))}
        </ul>
        <img src={slide.mice.wave} alt="" loading="lazy" className="pointer-events-none hidden h-24 w-auto shrink-0 sm:block" />
      </div>
    </Plain>
  )
}

// --- the deck ----------------------------------------------------------------

const BOARDS = {
  background: Background,
  issues: Issues,
  workflow: Workflow,
  stakeholder: Stakeholder,
  framework: Framework,
  users: Users,
  actions: Actions,
  feedback: Feedback,
  persona: Persona,
  painpoints: Painpoints,
  case: Case,
  gallery: Gallery,
}

export default function AbcMouseDeck({ slide }) {
  const Board = BOARDS[slide.kind]
  if (!Board) return null
  return (
    <div className="abc-deck mt-6">
      <Head title={slide.title} sub={slide.sub} />
      <Board slide={slide} />
    </div>
  )
}
