// The ABC Mouse (开心鼠) case-study deck, rebuilt in the page — one board per Figma
// frame from page 7's 「开心鼠 · 新版排版」, drawn on the page's own surface with the
// page's hero carrying the cover.
//
// The source frames are 1920-wide artboards. Scaling one down to a reading column
// would put the copy at about 10px, so nothing here is scaled: each board is rebuilt
// out of real boxes and real text, which is also what lets every grid collapse to a
// single column on a phone. The deck's own board backgrounds — white, cream, a
// full-bleed yellow — do not come across, because the page already has a surface and
// it has two themes. What does come across is the composition and the palette used
// as marks: the yellow highlighter behind each board name, yellow fills and pills, a
// near-black slab for the two conclusions, a plain card for a neutral item and a
// yellow-tinted one for the item the board is pointing at. Colour lives in
// `.abc-deck` in index.css; copy in src/data/abcMouse.js.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px), nothing
// below `text-note` (18px). That is why these boards run taller than their 16:9 source.

// --- colour ------------------------------------------------------------------

const ACCENT = "var(--abc-accent)"
const ON_ACCENT = "var(--abc-on-accent)"
const ACCENT_INK = "var(--abc-accent-ink)"
const PALE = "var(--abc-pale)"
const ON_PALE = "var(--abc-on-pale)"
const PALE_QUIET = "var(--abc-pale-quiet)"
const PALE_EDGE = "var(--abc-pale-edge)"
const QUIET = "var(--abc-quiet)"
const NO = "var(--abc-no)"
const ON_NO = "var(--abc-on-no)"
const YES = "var(--abc-yes)"
const ON_YES = "var(--abc-on-yes)"

// The page's own card: its box colour and its hairline, drawn inside so the card
// never grows by the border. `CARD_LIT` is the deck's tinted card — the one it uses
// to mark the option a board is pointing at.
const CARD = { background: "var(--color-box)", boxShadow: "inset 0 0 0 1px var(--color-line)" }
const CARD_LIT = { background: PALE, color: ON_PALE, boxShadow: `inset 0 0 0 1px ${PALE_EDGE}` }

// --- primitives ----------------------------------------------------------------

// The board's own header: the name with the deck's yellow run behind its lower half,
// the other language's name under it, and the chapter number held off to the right.
// The number wraps under the title on a phone rather than squeezing it.
function Head({ no, title, sub }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-line pb-5">
      <div className="min-w-0">
        <h3 className="text-3xl font-bold leading-[1.3] tracking-tight text-cream sm:text-4xl">
          <span className="abc-mark">{title}</span>
        </h3>
        <p className="mt-2.5 font-mono-tight text-note uppercase tracking-[0.18em]" style={{ color: QUIET }}>
          {sub}
        </p>
      </div>
      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-[2px] w-8" style={{ background: "var(--color-ink)" }} />
        <span className="font-condensed text-2xl leading-none tracking-wider text-cream">{no}</span>
      </div>
    </header>
  )
}

// A sub-heading inside a board — 「用户分析 / USER ANALYSIS」, 「交互逻辑 / INTERACTION
// LOGIC」. Smaller than the board's own name, same two-language shape.
function SubHead({ title, sub, className = "" }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${className}`}>
      <h4 className="text-2xl font-bold leading-tight tracking-tight text-cream">{title}</h4>
      {sub && (
        <span className="font-mono-tight text-note uppercase tracking-[0.18em]" style={{ color: QUIET }}>
          {sub}
        </span>
      )}
    </div>
  )
}

// A plain card, or the yellow-tinted one that marks the board's chosen item.
function Card({ lit, children, className = "", style }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${className}`} style={{ ...(lit ? CARD_LIT : CARD), ...style }}>
      {children}
    </div>
  )
}

// The deck's pill. `dark` is the near-black label, `accent` the yellow one, `pale` the
// tinted one, `quiet` the page's own outlined box, and `no` / `yes` the two verdicts.
const PILL = {
  dark: { background: "var(--abc-band)", color: "var(--abc-on-band)", boxShadow: "inset 0 0 0 1px var(--abc-band-edge)" },
  accent: { background: ACCENT, color: ON_ACCENT },
  pale: { background: PALE, color: ON_PALE, boxShadow: `inset 0 0 0 1px ${PALE_EDGE}` },
  quiet: { background: "var(--color-box)", color: "var(--color-ink)", boxShadow: "inset 0 0 0 1px var(--color-line)" },
  no: { background: NO, color: ON_NO },
  yes: { background: YES, color: ON_YES },
}

function Pill({ tone = "dark", children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-note font-semibold leading-snug ${className}`}
      style={PILL[tone]}
    >
      {children}
    </span>
  )
}

// A numbered disc in the deck's yellow.
function Disc({ children, size = 40, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-condensed text-xl leading-none tracking-wider ${className}`}
      style={{ width: size, height: size, background: ACCENT, color: ON_ACCENT }}
    >
      {children}
    </span>
  )
}

function Dot({ color = ACCENT, className = "" }) {
  return (
    <span aria-hidden="true" className={`mt-[0.6em] size-2.5 shrink-0 rounded-full ${className}`} style={{ background: color }} />
  )
}

// A bulleted list. `tone` colours the bullet — the deck marks pains red and solutions
// green, and everything else takes the yellow.
function Lines({ items, tone = ACCENT, color, className = "" }) {
  return (
    <ul className={`space-y-2.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-copy leading-relaxed" style={color ? { color } : undefined}>
          <Dot color={tone} />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// The deck's arrow — a thin stroke with an open head, pointing right. `className`
// turns it for the breakpoint where its row stacks.
function Arrow({ size = 30, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 24"
      width={size}
      height={size * 0.75}
      className={`shrink-0 ${className}`}
      style={{ color: "var(--color-ink)" }}
    >
      <path d="M2 12h26M20 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// The near-black conclusion slab — the deck's way of saying "this is the point".
// Carries its own label pill; the phrases it turns on are set in the yellow.
function Band({ label, children, className = "" }) {
  return (
    <div className={`abc-band flex flex-col gap-4 rounded-2xl px-5 py-5 sm:flex-row sm:items-start sm:gap-6 sm:px-7 sm:py-6 ${className}`}>
      {label && (
        <span className="shrink-0">
          <Pill tone="accent">{label}</Pill>
        </span>
      )}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

// Copy with the phrases the board sets in its accent.
function Marked({ parts }) {
  return parts.map((part, i) =>
    part.hot ? (
      <strong key={i} className="font-semibold" style={{ color: ACCENT }}>
        {part.text}
      </strong>
    ) : (
      <span key={i}>{part.text}</span>
    )
  )
}

// A screenshot, framed with the page's hairline, with its caption if it has one.
function Shot({ src, alt = "", caption, className = "", frameClassName = "" }) {
  const frame = (
    <div className={`overflow-hidden rounded-xl bg-box ring-1 ring-line ${frameClassName}`}>
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </div>
  )
  if (!caption) return <div className={className}>{frame}</div>
  return (
    <figure className={`min-w-0 ${className}`}>
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
    <div className="grid items-stretch gap-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4 lg:gap-6">
      <Card>
        <Pill tone="dark">{before.label}</Pill>
        <div className="mt-5 overflow-hidden rounded-xl bg-white ring-1 ring-line">
          <img src={before.image} alt="ABCmouse" loading="lazy" className="block h-auto w-full" />
        </div>
        <p className="mt-5 text-2xl font-bold leading-tight text-cream">{before.heading}</p>
        <p className="mt-3 text-copy leading-relaxed" style={{ color: QUIET }}>
          {before.text}
        </p>
      </Card>

      {/* The arrow between the two states, turned down once the cards stack. */}
      <div className="flex items-center justify-center md:self-center">
        <span
          className="flex size-12 items-center justify-center rounded-full"
          style={{ background: "var(--abc-band)", boxShadow: "inset 0 0 0 1px var(--abc-band-edge)" }}
        >
          <svg aria-hidden="true" viewBox="0 0 32 24" width="22" height="17" className="rotate-90 md:rotate-0" style={{ color: ACCENT }}>
            <path d="M3 12h25M20 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      <Card lit>
        <Pill tone="accent">{after.label}</Pill>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {after.images.map((src) => (
            <div key={src} className="overflow-hidden rounded-xl">
              <img src={src} alt="" loading="lazy" className="block aspect-[1/0.93] h-auto w-full object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-5 text-2xl font-bold leading-tight">{after.heading}</p>
        <p className="mt-3 text-copy leading-relaxed" style={{ color: PALE_QUIET }}>
          {after.text}
        </p>
      </Card>
    </div>
  )
}

// --- 02 · Existing issues -------------------------------------------------------

function Issues({ slide }) {
  const { design, users, goalLabel, goal } = slide
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
        <Card>
          <div className="grid grid-cols-2 gap-3">
            {design.shots.map((src) => (
              <Shot key={src} src={src} />
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-2 gap-3 text-center text-note" style={{ color: QUIET }}>
            {design.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <p className="mt-6 text-2xl font-bold leading-tight text-cream">{design.heading}</p>
          <Lines items={design.lines} className="mt-4" />
        </Card>

        <Card>
          <Shot src={users.image} />
          <p className="mt-2.5 text-center text-note" style={{ color: QUIET }}>
            {users.label}
          </p>
          <p className="mt-6 text-2xl font-bold leading-tight text-cream">{users.heading}</p>
          <Lines items={users.lines} className="mt-4" />
        </Card>
      </div>

      <Band label={goalLabel} className="mt-5">
        <p className="text-2xl font-bold leading-[1.5]">
          <Marked parts={goal} />
        </p>
      </Band>
    </div>
  )
}

// --- 03 · Work flow -------------------------------------------------------------

// The loop that closes the five steps. From `lg` it is an arch over the row, drawn as
// a three-sided box whose open bottom sits on the cards; below that the cards stack
// and the loop becomes a pill above them, because an arch over a column would be a
// frame around nothing.
const LOOP_H = 46

function Workflow({ slide }) {
  const { steps, loop } = slide
  return (
    <div>
      <div className="lg:hidden">
        <Pill tone="accent">↻ {loop}</Pill>
      </div>

      {/* The arch, lg and up. Inset by a tenth on each side so its legs come down on
          the first and last card's centre. */}
      <div aria-hidden="true" className="relative hidden lg:block" style={{ height: LOOP_H + 18 }}>
        <div
          className="absolute bottom-0 left-[10%] right-[10%] rounded-t-[22px] border-[3px] border-b-0"
          style={{ height: LOOP_H, borderColor: ACCENT }}
        />
        <div
          className="absolute left-[10%] -translate-x-1/2"
          style={{ bottom: -2, borderLeft: "7px solid transparent", borderRight: "7px solid transparent", borderTop: `11px solid ${ACCENT}` }}
        />
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: 18 }}>
          <Pill tone="accent" className="whitespace-nowrap">
            {loop}
          </Pill>
        </div>
      </div>

      <ol className="mt-6 grid gap-x-3 gap-y-6 sm:grid-cols-2 lg:mt-0 lg:grid-cols-5">
        {steps.map((step) => (
          <li key={step.no} className="flex flex-col">
            <div
              className="flex flex-col items-center justify-center rounded-2xl px-4 py-5 text-center"
              style={{ background: ACCENT, color: ON_ACCENT, minHeight: 112 }}
            >
              <span className="font-condensed text-xl leading-none tracking-[0.2em]">{step.no}</span>
              <span className="mt-2 text-2xl font-bold leading-tight">{step.name}</span>
            </div>
            <p className="mt-4 text-center text-copy font-bold" style={{ color: ACCENT_INK }}>
              {step.role}
            </p>
            <p className="mt-1.5 text-center text-copy leading-relaxed" style={{ color: QUIET }}>
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

// --- 04 · Stakeholder -----------------------------------------------------------

function Party({ party }) {
  return (
    <li className="flex flex-col items-center text-center">
      <div className="size-24 overflow-hidden rounded-full sm:size-28" style={{ background: PALE }}>
        <img src={party.image} alt="" loading="lazy" className="block h-full w-full object-cover object-top" />
      </div>
      <p className="mt-3 text-copy font-bold leading-snug text-cream">{party.name}</p>
      <p className="mt-1 text-note leading-snug" style={{ color: QUIET }}>
        {party.want}
      </p>
    </li>
  )
}

function Stakeholder({ slide }) {
  const { parties, goal, bloom } = slide
  const n = bloom.levels.length
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Card className="flex flex-col">
        {/* The four parties around the goal. The goal sits between the two rows
            rather than inside a ring, which at column width would have no middle. */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5">
          {parties.slice(0, 2).map((party) => (
            <Party key={party.name} party={party} />
          ))}
          <li className="col-span-2 flex justify-center py-1">
            <span
              className="flex max-w-[19rem] items-center justify-center rounded-full px-5 py-4 text-center text-copy font-bold leading-snug"
              style={{ background: PALE, color: ON_PALE, boxShadow: `inset 0 0 0 1px ${PALE_EDGE}` }}
            >
              {goal}
            </span>
          </li>
          {parties.slice(2).map((party) => (
            <Party key={party.name} party={party} />
          ))}
        </ul>
      </Card>

      <Card className="flex flex-col">
        <p className="text-center text-2xl font-bold leading-tight text-cream">{bloom.heading}</p>
        <ol className="mt-5 flex flex-col items-center gap-2">
          {bloom.levels.map((level, i) => (
            <li
              key={level.name}
              className="rounded-xl py-2.5 text-center"
              style={{
                width: `${44 + (56 * i) / (n - 1)}%`,
                minWidth: "11rem",
                ...(level.lit === "accent"
                  ? { background: ACCENT, color: ON_ACCENT }
                  : level.lit === "pale"
                    ? { background: PALE, color: ON_PALE, boxShadow: `inset 0 0 0 1px ${PALE_EDGE}` }
                    : { background: "var(--color-box-2)", color: "var(--color-ink)" }),
              }}
            >
              <span className="text-copy font-bold">{level.name}</span>
            </li>
          ))}
        </ol>

        <dl className="mt-6 space-y-2.5">
          {bloom.notes.map((note) => (
            <div key={note.term} className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <dt className="shrink-0">
                <Pill tone="pale">{note.term}</Pill>
              </dt>
              <dd className="min-w-0 text-copy leading-snug text-ink">{note.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-note leading-relaxed" style={{ color: QUIET }}>
          {bloom.note}
        </p>
      </Card>
    </div>
  )
}

// --- 05 · Research framework and the user ---------------------------------------

function Framework({ slide }) {
  const { user, object, action, feedback, users } = slide
  return (
    <div>
      {/* User ↔ Object, with the exchange between them. The two sit side by side from
          sm up and stack on a phone, where the arrows turn to point down. */}
      <div className="grid items-stretch gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6">
        <Card className="flex flex-col items-center justify-center text-center">
          <span className="font-condensed text-3xl leading-none tracking-wider text-cream">{user.name}</span>
          <ul className="mt-4 space-y-1 text-copy leading-relaxed" style={{ color: QUIET }}>
            {user.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>

        <div className="flex items-center justify-center gap-3 py-2 sm:flex-col sm:px-2 sm:py-0">
          <Pill tone="quiet">{action}</Pill>
          {/* A rotated SVG keeps its unrotated box, so each arrow gets a square cell
              of its own — without it the two turned arrows overlap on a phone. */}
          <span className="flex gap-1 sm:flex-col sm:gap-1.5">
            <span className="grid size-7 place-items-center">
              <Arrow size={26} className="rotate-90 sm:rotate-0" />
            </span>
            <span className="grid size-7 place-items-center">
              <Arrow size={26} className="-rotate-90 sm:rotate-180" />
            </span>
          </span>
          <Pill tone="quiet">{feedback}</Pill>
        </div>

        <Card lit className="flex flex-col items-center justify-center text-center">
          <span className="font-condensed text-3xl leading-none tracking-wider">{object.name}</span>
          <ul className="mt-4 space-y-1 text-copy leading-relaxed" style={{ color: PALE_QUIET }}>
            {object.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>
      </div>

      {/* 用户分析 — the board's second half. */}
      <SubHead title={users.heading} sub={users.sub} className="mt-12" />

      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {users.piaget.stages.map((stage) => (
          <li key={stage.age} className="rounded-2xl p-5" style={stage.lit ? { background: ACCENT, color: ON_ACCENT } : CARD}>
            <p className="font-condensed text-3xl leading-none tracking-wide" style={{ color: stage.lit ? ON_ACCENT : ACCENT_INK }}>
              {stage.age}
              {stage.unit && <span className="ml-1.5 text-xl">{stage.unit}</span>}
            </p>
            <p className="mt-2.5 text-copy font-bold leading-snug" style={{ color: stage.lit ? ON_ACCENT : "var(--color-cream)" }}>
              {stage.name}
            </p>
            <p className="mt-2 text-note leading-relaxed" style={{ color: stage.lit ? ON_ACCENT : QUIET }}>
              {stage.text}
            </p>
            {stage.lit && (
              <span className="mt-3 inline-block">
                <Pill tone="dark">{users.piaget.badge}</Pill>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-right text-note italic" style={{ color: QUIET }}>
        {users.piaget.caption}
      </p>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-4">
        <Card>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-copy font-bold text-cream">{users.bartle.heading}</p>
            <p className="font-mono-tight text-note tracking-[0.12em]" style={{ color: QUIET }}>
              {users.bartle.axes}
            </p>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {users.bartle.quadrants.map((q) => (
              <li key={q.name} className="rounded-xl p-4" style={q.lit ? CARD_LIT : { background: "var(--color-box-2)", color: "var(--color-ink)" }}>
                <p className="flex flex-wrap items-center gap-2 text-copy font-bold leading-snug">
                  {q.name}
                  {q.lit && <Pill tone="accent">{users.bartle.badge}</Pill>}
                </p>
                <p className="mt-1.5 text-note leading-snug" style={{ color: q.lit ? PALE_QUIET : QUIET }}>
                  {q.text}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-note italic" style={{ color: QUIET }}>
            {users.bartle.caption}
          </p>
        </Card>

        <div className="flex flex-col items-center justify-center gap-3 lg:px-1">
          {users.bridges.map((bridge) => (
            <span key={bridge} className="flex items-center gap-2.5">
              <Arrow size={26} className="rotate-90 lg:rotate-0" />
              <span
                className="rounded-full px-4 py-2 text-center text-copy font-bold leading-snug text-cream"
                style={{ boxShadow: "inset 0 0 0 2px var(--color-ink)" }}
              >
                {bridge}
              </span>
            </span>
          ))}
        </div>

        <Card lit className="space-y-5">
          {users.traits.map((trait) => (
            <div key={trait.name}>
              <p className="text-copy font-bold leading-snug">{trait.name}</p>
              <p className="mt-1.5 text-note leading-relaxed" style={{ color: PALE_QUIET }}>
                {trait.text}
              </p>
            </div>
          ))}
        </Card>
      </div>

      <Band label={users.conclusionLabel} className="mt-6">
        <p className="text-2xl font-bold leading-[1.5]">
          <Marked parts={users.conclusion} />
        </p>
      </Band>
    </div>
  )
}

// --- 06 · Action analysis -------------------------------------------------------

// The deck's + and = between the three terms of its rule formula.
function Operator({ kind }) {
  return (
    <span aria-hidden="true" className="flex items-center justify-center self-center" style={{ color: ACCENT_INK }}>
      <svg viewBox="0 0 32 32" width="28" height="28">
        {kind === "plus" ? (
          <path d="M16 5v22M5 16h22" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        ) : (
          <path d="M6 11h20M6 21h20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        )}
      </svg>
    </span>
  )
}

function Actions({ slide }) {
  const { why, motives, how, formula, band } = slide
  return (
    <div>
      <Pill tone="dark">{why}</Pill>

      <div className="mt-5 space-y-4">
        {motives.map((motive) => (
          <div key={motive.name} className="grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,11fr)] lg:gap-5">
            <Card className="flex flex-col justify-center">
              <p className="text-2xl font-bold leading-tight text-cream">{motive.name}</p>
              <p className="mt-2 text-copy leading-relaxed" style={{ color: QUIET }}>
                {motive.quote}
              </p>
            </Card>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {motive.shots.map((shot) => (
                <li key={shot.src}>
                  <Card className="!p-2.5">
                    <Shot src={shot.src} frameClassName="ring-0" />
                    <p className="mt-2 text-center text-note leading-snug" style={{ color: QUIET }}>
                      {shot.label}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Pill tone="dark">{how}</Pill>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-stretch sm:gap-4">
        {formula.map((group, i) => (
          <div key={group.name} className="contents">
            <Card lit={group.lit} className="flex h-full flex-col">
              <p className="text-copy font-bold leading-snug" style={group.lit ? undefined : { color: "var(--color-cream)" }}>
                {group.name}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Pill tone={group.lit ? "accent" : "quiet"}>{item}</Pill>
                  </li>
                ))}
              </ul>
            </Card>
            {i < formula.length - 1 && <Operator kind={i === formula.length - 2 ? "equals" : "plus"} />}
          </div>
        ))}
      </div>

      <Band className="mt-6">
        <ul className="space-y-2.5">
          {band.map((line) => (
            <li key={line} className="flex gap-3 text-copy leading-relaxed">
              <Dot />
              <span className="min-w-0">{line}</span>
            </li>
          ))}
        </ul>
      </Band>
    </div>
  )
}

// --- 07 · Feedback --------------------------------------------------------------

// The deck's verdict pill: a red NO or a green YES.
function Verdict({ ok }) {
  return <Pill tone={ok ? "yes" : "no"}>{ok ? "YES" : "NO"}</Pill>
}

function Feedback({ slide }) {
  const { positive, negative, instant, delayed } = slide
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <p className="text-2xl font-bold leading-tight text-cream">{positive.name}</p>
        <ul className="mt-5 space-y-3">
          {positive.rows.map((row) => (
            <li
              key={row.text}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl px-4 py-3"
              style={{ background: "var(--color-box-2)" }}
            >
              <Verdict ok={row.ok} />
              <span className="min-w-0 flex-1 text-copy leading-snug text-ink">{row.text}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <p className="text-2xl font-bold leading-tight text-cream">{negative.name}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {negative.shots.map((shot) => (
            <div key={shot.src}>
              <Shot src={shot.src} />
              <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-copy leading-snug text-ink">
                <Verdict ok={shot.ok} />
                <span className="min-w-0 flex-1">{shot.text}</span>
              </p>
            </div>
          ))}
        </div>
      </Card>

      {[instant, delayed].map((cell) => (
        <Card key={cell.name} lit>
          <p className="text-2xl font-bold leading-tight">{cell.name}</p>
          <Shot src={cell.image} className="mt-5" frameClassName="bg-transparent ring-0" />
          <p className="mt-4 text-copy leading-relaxed" style={{ color: PALE_QUIET }}>
            {cell.text}
          </p>
        </Card>
      ))}
    </div>
  )
}

// --- 08 · Persona ---------------------------------------------------------------

function PersonaCard({ person, labels }) {
  const term = "font-mono-tight text-note uppercase tracking-wide"
  return (
    <article className="relative flex flex-col rounded-2xl px-5 pb-6 pt-6" style={CARD}>
      {/* The photo stands in the card's top-right corner, as it does on the board. */}
      <img
        src={person.image}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute right-3 top-4 h-[150px] w-auto object-contain object-top sm:h-[180px]"
      />
      <div className="min-h-[150px] pr-[108px] sm:min-h-[180px] sm:pr-[130px]">
        <p className="font-condensed text-4xl leading-none tracking-wide text-cream">{person.name}</p>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-copy font-bold text-cream">
          {person.age}
          <Pill tone="pale">{person.badge}</Pill>
        </p>
        <div className="mt-2 text-note leading-snug" style={{ color: QUIET }}>
          {person.facts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </div>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {person.quotes.map((quote) => (
          <li key={quote}>
            <span
              className="inline-block rounded-lg px-3 py-1.5 text-note leading-snug"
              style={{ background: PALE, color: ON_PALE, boxShadow: `inset 0 0 0 1px ${PALE_EDGE}` }}
            >
              {quote}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-copy leading-relaxed" style={{ color: QUIET }}>
        {person.bio}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
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
        <Lines items={person.frustrations} tone={NO} className="mt-2" />
      </div>
    </article>
  )
}

function Persona({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {slide.people.map((person) => (
        <PersonaCard key={person.name} person={person} labels={slide.labels} />
      ))}
    </div>
  )
}

// --- 09 · Pain points and solutions ---------------------------------------------

function Painpoints({ slide }) {
  const { labels, groups, images } = slide
  return (
    <div>
      <div className="space-y-9">
        {groups.map((group) => (
          <section key={group.no}>
            <h4 className="flex items-baseline gap-3 text-2xl font-bold leading-tight text-cream">
              <span className="shrink-0 font-condensed tracking-wider" style={{ color: ACCENT_INK }}>
                {group.no}
              </span>
              <span className="min-w-0">{group.heading}</span>
            </h4>

            {/* Pains on the left, solutions on the right, the arrow between them —
                turned to point down once the two columns stack. */}
            <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:gap-5">
              <Card>
                <Pill tone="dark">{labels.pain}</Pill>
                <Lines items={group.pains} tone={NO} color={QUIET} className="mt-4" />
              </Card>
              <Arrow size={30} className="justify-self-center rotate-90 lg:rotate-0" />
              <Card lit>
                <Pill tone="accent">{labels.solution}</Pill>
                <Lines items={group.solutions} tone={YES} className="mt-4" />
              </Card>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] sm:items-start">
        {images.map((image) => (
          <Shot key={image.src} src={image.src} alt={image.alt} caption={image.alt} />
        ))}
      </div>
    </div>
  )
}

// --- 10 · Case study ------------------------------------------------------------

// One interaction step: its note and its screens. The deck alternates which side the
// note sits on, so `flip` swaps the two from `lg` up; below that the note always
// leads, because a column reads top to bottom whatever the deck did.
function CaseStep({ step, flip }) {
  return (
    <li
      className={`grid items-center gap-5 lg:gap-8 ${
        flip ? "lg:grid-cols-[minmax(0,11fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,11fr)]"
      }`}
    >
      <div className={`min-w-0 ${flip ? "lg:order-2" : ""}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Pill tone="accent">{step.no}</Pill>
          <span className="min-w-0 text-2xl font-bold leading-tight text-cream">{step.name}</span>
        </p>
        <p className="mt-3 text-copy leading-relaxed" style={{ color: QUIET }}>
          {step.text}
        </p>
      </div>
      <ul className={`grid min-w-0 gap-3 ${step.shots.length > 1 ? "sm:grid-cols-2" : "sm:max-w-md"} ${flip ? "lg:order-1" : ""}`}>
        {step.shots.map((shot) => (
          <li key={shot.src}>
            <Shot src={shot.src} alt={shot.label} caption={shot.label} />
          </li>
        ))}
      </ul>
    </li>
  )
}

function Case({ slide }) {
  const { brief, flowLabel, flowSteps, logic, layout, ixd } = slide
  const row = "grid gap-y-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-5"
  return (
    <div>
      {/* The brief: two labelled lines and the numbered flow. */}
      <dl className="space-y-4">
        {brief.map((item) => (
          <div key={item.label} className={row}>
            <dt>
              <Pill tone="dark">{item.label}</Pill>
            </dt>
            <dd className="min-w-0 text-copy leading-relaxed text-ink">{item.text}</dd>
          </div>
        ))}
        <div className={row}>
          <dt>
            <Pill tone="dark">{flowLabel}</Pill>
          </dt>
          <dd className="min-w-0">
            <ol className="space-y-3">
              {flowSteps.map((step, i) => (
                <li key={step} className="flex gap-3.5">
                  <Disc size={34}>{`0${i + 1}`}</Disc>
                  <span className="min-w-0 pt-1 text-copy leading-relaxed text-ink">{step}</span>
                </li>
              ))}
            </ol>
          </dd>
        </div>
      </dl>

      {/* The flow chart is a wide artboard. It keeps a readable width and scrolls
          sideways on a narrow screen rather than shrinking its labels to nothing. */}
      <SubHead title={logic.label} sub={logic.sub} className="mt-10" />
      <figure className="mt-4">
        <div className="no-scrollbar overflow-x-auto rounded-xl bg-box ring-1 ring-line">
          <img src={logic.image} alt={logic.alt} loading="lazy" className="block h-auto w-[1100px] max-w-none lg:w-full" />
        </div>
        <figcaption className="mt-2 text-note leading-snug lg:hidden" style={{ color: QUIET }}>
          {logic.alt}
        </figcaption>
      </figure>

      <SubHead title={layout.label} sub={layout.sub} className="mt-10" />
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
        <div className="grid gap-3 sm:grid-cols-2">
          {layout.shots.map((shot) => (
            <Shot key={shot.src} src={shot.src} alt={shot.alt} />
          ))}
        </div>
        <Card lit>
          <Lines items={layout.points} tone={ON_PALE} />
        </Card>
      </div>

      <SubHead title={ixd.label} sub={ixd.sub} className="mt-10" />
      <ol className="mt-5 space-y-8 lg:space-y-10">
        {ixd.steps.map((step, i) => (
          <CaseStep key={step.no} step={step} flip={i % 2 === 1} />
        ))}
      </ol>

      {/* The legend from the foot of the board: who still has to sign each note off. */}
      <div className="abc-band mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl px-5 py-4 sm:px-6">
        <span className="text-note font-semibold" style={{ color: ACCENT }}>
          {ixd.legend.label}
        </span>
        <ul className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
          {ixd.legend.items.map((item) => (
            <li key={item.text} className="flex items-center gap-2 text-note leading-snug">
              <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full" style={{ background: item.tone }} />
              {item.text}
            </li>
          ))}
        </ul>
        <span className="sm:ml-auto">
          <Pill tone="accent">{ixd.legend.tail}</Pill>
        </span>
      </div>
    </div>
  )
}

// --- 11 · Other case ------------------------------------------------------------

function Gallery({ slide }) {
  return (
    <div className="relative">
      {/* The deck's two mice, from lg up where there is margin for them to sit in. */}
      <img
        src={slide.mice.plane}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -top-28 right-0 hidden w-[112px] lg:block"
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slide.shots.map((shot) => (
          <li key={shot.src}>
            <Shot src={shot.src} alt={shot.alt} />
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <ul className="flex flex-wrap gap-2.5">
          {slide.labels.map((label) => (
            <li key={label}>
              <Pill tone="accent">{label}</Pill>
            </li>
          ))}
        </ul>
        <img src={slide.mice.wave} alt="" loading="lazy" className="pointer-events-none hidden h-24 w-auto shrink-0 sm:block" />
      </div>
    </div>
  )
}

// --- the deck ----------------------------------------------------------------

const BOARDS = {
  background: Background,
  issues: Issues,
  workflow: Workflow,
  stakeholder: Stakeholder,
  framework: Framework,
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
      <Head no={slide.no} title={slide.title} sub={slide.sub} />
      <Board slide={slide} />
    </div>
  )
}
