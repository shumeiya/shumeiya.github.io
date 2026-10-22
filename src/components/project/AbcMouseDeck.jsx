// The ABC Mouse (开心鼠) case-study deck, rebuilt in the page — one board per Figma
// frame, drawn on the page's own surface under the section's eyebrow, with the page's
// hero carrying the cover.
//
// The source frames are 1920-wide artboards. Scaling one down to a reading column
// would put the copy at about 10px, so nothing here is scaled: each board is rebuilt
// out of real boxes and real text, which is also what lets every grid collapse to a
// single column on a phone. What survives from the deck is its composition — the
// two-up before/after, the five-step loop, the ring of stakeholders beside Bloom's
// pyramid, the four-cell feedback matrix, the three persona cards with the photo
// breaking the card's top edge. Content lives in src/data/abcMouse.js; colour in
// `.abc-deck` in index.css.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px), nothing
// below `text-note` (18px). That is why these boards run taller than their 16:9 source.

// --- colour ------------------------------------------------------------------

const ACCENT = "var(--abc-accent)"
const ACCENT_INK = "var(--abc-accent-ink)"
const PALE = "var(--abc-pale)"
const ON_PALE = "var(--abc-on-pale)"
const BAND = "var(--abc-band)"
const ON_BAND = "var(--abc-on-band)"
const GREY = "var(--abc-grey)"
const PINK = "var(--abc-pink)"

// --- primitives ----------------------------------------------------------------

// The board's own heading — 「项目背景 / Background」: the title in the display face,
// a slanted hairline, and the other language's name in grey, slanted, a step smaller.
function Head({ title, sub }) {
  return (
    <div className="mb-8 flex flex-wrap items-end gap-x-3 gap-y-1">
      <span className="font-condensed text-3xl font-bold leading-none tracking-wide text-cream sm:text-4xl">
        {title}
      </span>
      <span aria-hidden="true" className="mb-1 inline-block h-7 w-px rotate-[18deg]" style={{ background: GREY }} />
      <span className="font-condensed text-2xl italic leading-none tracking-wider sm:text-3xl" style={{ color: GREY }}>
        {sub}
      </span>
    </div>
  )
}

// A line of orange display copy — the board's emphasised labels.
function Accent({ children, className = "", as: Tag = "p", style }) {
  return (
    <Tag className={`font-condensed italic ${className}`} style={{ color: ACCENT_INK, ...style }}>
      {children}
    </Tag>
  )
}

// Copy with a few phrases underlined — the board underlines the words its sentence
// turns on. `parts` is [{ text, u }].
function Marked({ parts }) {
  return parts.map((part, i) =>
    part.u ? (
      <u key={i} className="underline decoration-2 underline-offset-[6px]">
        {part.text}
      </u>
    ) : (
      <span key={i}>{part.text}</span>
    )
  )
}

// The deck's fat orange arrow. `dir` rotates it; the glyph itself is the Figma vector.
function Arrow({ dir = "right", size = 36, className = "" }) {
  const rotate = { right: 0, down: 90, left: 180, up: 270 }[dir]
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 81 65"
      width={size}
      height={size * 0.8}
      className={`shrink-0 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
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
function Mark({ ok, size = 24 }) {
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

function Shot({ src, alt = "", className = "", style }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`block h-auto w-full rounded-xl ${className}`}
      style={{ background: "var(--color-box)", ...style }}
    />
  )
}

// --- 01 · Background ------------------------------------------------------------

function Background({ slide }) {
  const { before, after } = slide
  return (
    <div className="grid items-start gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-6">
      <div className="text-center">
        <p className="font-condensed text-2xl font-bold italic text-cream">{before.label}</p>
        <div className="mx-auto mt-4 max-w-sm overflow-hidden rounded-2xl bg-white">
          <img src={before.image} alt="ABCmouse" loading="lazy" className="block h-auto w-full" />
        </div>
        <p className="mt-6 font-condensed text-2xl font-bold italic text-cream">{before.heading}</p>
        {before.lines.map((line) => (
          <p key={line} className="mt-1 text-copy leading-relaxed text-fog">
            {line}
          </p>
        ))}
      </div>

      <Arrow size={56} className="justify-self-center rotate-90 md:mt-48 md:rotate-0" />

      <div className="text-center">
        <Accent className="text-2xl font-bold">{after.label}</Accent>
        <div className="mt-4 grid grid-cols-2 gap-1 overflow-hidden rounded-2xl">
          {after.images.map((src) => (
            <img key={src} src={src} alt="" loading="lazy" className="block aspect-[1/0.93] h-auto w-full object-cover" />
          ))}
        </div>
        <Accent className="mt-6 text-2xl font-bold">{after.heading}</Accent>
        {after.lines.map((line) => (
          <p key={line} className="mt-1 text-copy leading-relaxed text-fog">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

// --- 02 · Existing issues -------------------------------------------------------

function Issues({ slide }) {
  const { design, users, goal } = slide
  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[11fr_9fr] lg:gap-8">
        <div className="text-center">
          <div className="grid grid-cols-2 gap-2.5">
            {design.shots.map((shot) => (
              <Shot key={shot.src} src={shot.src} className="rounded-lg" />
            ))}
          </div>
          <div className="mt-2.5 grid grid-cols-2 text-note text-fog">
            {design.labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
          <Accent className="mt-6 text-2xl font-bold">{design.heading}</Accent>
          {design.lines.map((line) => (
            <p key={line} className="mt-1 text-copy leading-relaxed text-ink">
              {line}
            </p>
          ))}
        </div>

        <div className="text-center">
          <Shot src={users.image} className="rounded-lg" />
          <p className="mt-2.5 text-note text-fog">{users.label}</p>
          <Accent className="mt-6 text-2xl font-bold">{users.heading}</Accent>
          {users.lines.map((line) => (
            <p key={line} className="mt-1 text-copy leading-relaxed text-ink">
              {line}
            </p>
          ))}
        </div>
      </div>

      <Accent className="mt-12 text-center text-2xl font-bold leading-relaxed">
        <Marked parts={goal} />
      </Accent>
    </div>
  )
}

// --- 03 · Work flow -------------------------------------------------------------

// The loop that closes the five steps — a bar across the top with a leg down to
// the first card and one up from the last. Each of the nine cells (five cards and
// four arrows) draws its own slice of the bar, so it meets the card centres without
// anyone measuring anything; the two end cells add the corners and the legs.
const LOOP_H = 44

function LoopSlice({ edge }) {
  const base = { position: "absolute", top: -LOOP_H, height: LOOP_H, borderColor: ACCENT, borderStyle: "solid" }
  if (edge === "start") {
    return (
      <>
        <div
          aria-hidden="true"
          style={{ ...base, left: "50%", right: 0, borderWidth: "3px 0 0 3px", borderTopLeftRadius: 20 }}
        />
        {/* Arrowhead, pointing down into the first card. */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -12,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: `12px solid ${ACCENT}`,
          }}
        />
      </>
    )
  }
  if (edge === "end") {
    return (
      <>
        <div
          aria-hidden="true"
          style={{ ...base, left: 0, right: "50%", borderWidth: "3px 3px 0 0", borderTopRightRadius: 20 }}
        />
        {/* The tail, pointing up out of the last card. */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: -14,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `12px solid ${ACCENT}`,
          }}
        />
      </>
    )
  }
  return <div aria-hidden="true" style={{ ...base, left: 0, right: 0, borderWidth: "3px 0 0 0" }} />
}

function Workflow({ slide }) {
  const { steps, loop } = slide
  return (
    <div className="lg:pt-16">
      {/* Below lg the loop is a label; the bar needs the cards in one row. */}
      <Accent className="mb-6 text-center text-2xl font-bold lg:hidden">↻ {loop}</Accent>

      <div className="relative flex flex-col items-stretch gap-4 lg:flex-row lg:items-start lg:gap-0">
        <Accent className="absolute left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-page px-4 text-2xl font-bold lg:block"
          as="p"
          // Sits on the bar: the bar's top edge is LOOP_H above the cards.
          style={{ top: -LOOP_H }}
        >
          {loop}
        </Accent>

        {steps.map((step, i) => (
          <div key={step.no} className="contents">
            <div className="relative flex min-w-0 flex-1 flex-col items-center text-center">
              <div className="hidden lg:contents">
                <LoopSlice edge={i === 0 ? "start" : i === steps.length - 1 ? "end" : "mid"} />
              </div>
              <div
                className="flex w-full max-w-[220px] flex-col items-center justify-center rounded-2xl px-3 py-5 text-white"
                style={{ background: ACCENT, minHeight: 120 }}
              >
                <span className="font-condensed text-2xl italic leading-none tracking-widest">{step.no}</span>
                <span className="mt-2 font-condensed text-2xl font-bold italic leading-tight">{step.name}</span>
              </div>
              <Accent className="mt-4 text-xl font-bold">{step.role}</Accent>
              <p className="mt-1 max-w-[240px] text-copy leading-relaxed text-ink">{step.text}</p>
            </div>

            {i < steps.length - 1 && (
              <div className="relative flex shrink-0 items-start justify-center lg:w-12 lg:pt-11">
                <div className="hidden lg:contents">
                  <LoopSlice edge="mid" />
                </div>
                <Arrow size={34} className="rotate-90 lg:rotate-0" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// --- 04 · Stakeholder -----------------------------------------------------------

function Party({ party }) {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-full text-center"
      style={{ background: PALE, color: ON_PALE }}
    >
      <p className="mx-auto mt-[9%] max-w-[84%] font-condensed text-xl font-bold italic leading-tight">
        {party.name}
      </p>
      <p className="mx-auto mt-1 max-w-[72%] text-note leading-snug">{party.want}</p>
      <img
        src={party.image}
        alt=""
        loading="lazy"
        className="absolute bottom-0 left-1/2 h-[46%] w-auto max-w-[84%] -translate-x-1/2 object-contain object-bottom"
      />
    </div>
  )
}

function Stakeholder({ slide }) {
  const { parties, goal, bloom } = slide
  const n = bloom.levels.length
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
      <div className="relative mx-auto w-full max-w-[520px]">
        {/* The faint ring the four stand on, and the goal at its centre — from sm up,
            where the circles are big enough to leave the middle free. On a phone the
            goal sits between the two rows instead. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[13%] hidden rounded-full border-[3px] sm:block"
          style={{ borderColor: PALE }}
        />
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
          <Accent className="max-w-[40%] text-center text-xl font-bold leading-snug">{goal}</Accent>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-[30%] sm:gap-y-[18%]">
          {parties.slice(0, 2).map((party) => (
            <Party key={party.name} party={party} />
          ))}
          <Accent className="col-span-2 py-2 text-center text-xl font-bold sm:hidden">{goal}</Accent>
          {parties.slice(2).map((party) => (
            <Party key={party.name} party={party} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col items-center gap-3 lg:w-[66%]">
          {bloom.levels.map((level, i) => {
            const aside = bloom.asides[i]
            const noted = i === 3
            return (
              <div key={level} className="relative flex w-full flex-col items-center">
                <div
                  className="relative flex items-center justify-center rounded-xl py-2.5"
                  style={{
                    width: `${42 + (58 * i) / (n - 1)}%`,
                    background: `color-mix(in srgb, ${ACCENT} ${Math.round((100 * i) / (n - 1)) * 0.75}%, ${PALE})`,
                    color: ON_PALE,
                  }}
                >
                  <span className="font-condensed text-xl font-bold italic tracking-wider sm:text-2xl">{level}</span>

                  {/* Dotted leads, desktop only: the note hangs off Applying; the
                      stakeholders feed Understanding. */}
                  {noted && (
                    <div
                      aria-hidden="true"
                      className="absolute left-full top-1/2 hidden w-8 -translate-y-[6px] border-t-[3px] border-dotted lg:block"
                      style={{ borderColor: ACCENT }}
                    />
                  )}
                  {i === 4 && (
                    <div
                      aria-hidden="true"
                      className="absolute right-full top-1/2 hidden w-[calc(2.5rem+4%)] border-t-[3px] border-dotted lg:block"
                      style={{ borderColor: ACCENT }}
                    />
                  )}
                  {aside && (
                    <span className="absolute left-full top-1/2 ml-3 hidden w-[200px] -translate-y-1/2 text-note leading-snug text-ink lg:block">
                      {aside}
                    </span>
                  )}
                  {noted && (
                    <span
                      className="absolute left-full top-1/2 ml-8 hidden w-[190px] -translate-y-[88%] rounded-xl px-3 py-2 text-note leading-snug lg:block"
                      style={{ background: PALE, color: ON_PALE }}
                    >
                      {bloom.note}
                    </span>
                  )}
                </div>
                {aside && <span className="mt-1 text-note text-fog lg:hidden">{aside}</span>}
                {noted && (
                  <span className="mt-1 max-w-sm text-center text-note text-fog lg:hidden">{bloom.note}</span>
                )}
              </div>
            )
          })}
        </div>
        <p className="mt-5 text-center text-note text-fog lg:w-[66%]">{bloom.caption}</p>
      </div>
    </div>
  )
}

// --- 05 · Research framework ----------------------------------------------------

function Bubble({ name, lines }) {
  return (
    <div
      className="flex aspect-square w-[clamp(150px,30vw,300px)] shrink-0 flex-col items-center justify-center rounded-full px-5 text-center"
      style={{ background: PALE, color: ON_PALE }}
    >
      <span className="font-condensed text-2xl font-bold italic leading-none tracking-wider sm:text-3xl">{name}</span>
      <span className="mt-2 flex flex-col text-note leading-snug">
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </span>
    </div>
  )
}

// A rule with a head — the exchange between the two. Horizontal on anything but a
// phone, where the circles stack and the rules turn to meet them.
function Rule({ head }) {
  const tip =
    head === "right"
      ? { right: -2, top: -5, borderLeft: `12px solid ${ACCENT}`, borderTop: "7px solid transparent", borderBottom: "7px solid transparent" }
      : { left: -2, top: -5, borderRight: `12px solid ${ACCENT}`, borderTop: "7px solid transparent", borderBottom: "7px solid transparent" }
  return (
    <div aria-hidden="true" className="relative h-[3px] w-full" style={{ background: ACCENT }}>
      <span className="absolute" style={tip} />
    </div>
  )
}

function Framework({ slide }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-5 md:gap-10">
      <Bubble name={slide.user.name} lines={slide.user.lines} />
      <div className="flex w-full max-w-[420px] flex-1 items-center justify-center sm:w-auto sm:min-w-[120px]">
        {/* Desktop: two rules, out and back. */}
        <div className="hidden w-full flex-col items-stretch gap-2 sm:flex">
          <Accent className="text-center text-2xl font-bold tracking-wider">{slide.action}</Accent>
          <Rule head="right" />
          <Rule head="left" />
          <Accent className="text-center text-2xl font-bold tracking-wider">{slide.feedback}</Accent>
        </div>
        {/* Phone: the same exchange turned on end. */}
        <div className="flex items-center gap-4 sm:hidden">
          <Accent className="text-2xl font-bold tracking-wider">{slide.action}</Accent>
          <Arrow dir="down" size={40} />
          <Arrow dir="up" size={40} />
          <Accent className="text-2xl font-bold tracking-wider">{slide.feedback}</Accent>
        </div>
      </div>
      <Bubble name={slide.object.name} lines={slide.object.lines} />
    </div>
  )
}

// --- 06 · User analysis ---------------------------------------------------------

function Stage({ stage }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-3xl px-6 py-6 text-center sm:aspect-square sm:rounded-full sm:px-[9%] sm:py-0"
      style={{
        background: stage.lit ? `color-mix(in srgb, ${ACCENT} 45%, ${PALE})` : PALE,
        color: ON_PALE,
      }}
    >
      <span className="font-condensed text-2xl font-bold italic leading-none tracking-wider">{stage.age}</span>
      <span className="mt-1.5 font-condensed text-xl font-bold italic leading-tight">{stage.name}</span>
      <span className="mt-2 text-note leading-snug">{stage.text}</span>
    </div>
  )
}

// The bracket from Piaget's two middle stages down to the traits card — desktop only,
// where the four stages sit in one row and the card sits at the right.
function PiagetLead() {
  const leg = { position: "absolute", borderLeft: `3px solid ${ACCENT}` }
  return (
    <div aria-hidden="true" className="relative hidden h-14 lg:block">
      <div style={{ ...leg, left: "37.5%", top: 0, height: 28 }} />
      <div style={{ ...leg, left: "62.5%", top: 0, height: 28 }} />
      <div style={{ position: "absolute", left: "37.5%", right: "14%", top: 28, borderTop: `3px solid ${ACCENT}` }} />
      <div style={{ ...leg, left: "86%", top: 28, height: 20 }} />
      <div
        className="absolute -translate-x-1/2"
        style={{
          left: "calc(86% + 1.5px)",
          top: 44,
          borderLeft: "9px solid transparent",
          borderRight: "9px solid transparent",
          borderTop: `12px solid ${ACCENT}`,
        }}
      />
    </div>
  )
}

function Quadrant({ bartle }) {
  const { axes, quadrants } = bartle
  const cell = (q) =>
    q.lit ? (
      <div
        key={q.name}
        className="flex w-[84%] max-w-[160px] flex-col items-center justify-center self-center justify-self-center rounded-3xl px-3 py-3 text-center sm:aspect-square sm:w-[76%] sm:rounded-full sm:py-0"
        style={{ background: PALE, color: ON_PALE }}
      >
        <span className="font-condensed text-xl font-bold italic">{q.name}</span>
        <span className="mt-1 text-note leading-snug">{q.text}</span>
      </div>
    ) : (
      <div key={q.name} className="flex flex-col items-center justify-center px-3 text-center">
        <span className="font-condensed text-xl font-bold italic text-ink">{q.name}</span>
        <span className="mt-1 text-note leading-snug text-fog">{q.text}</span>
      </div>
    )
  const label = "absolute font-condensed text-note italic tracking-[0.2em] text-ink"
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] sm:aspect-square">
      {/* Axes. */}
      <div aria-hidden="true" className="absolute bottom-[7%] left-1/2 top-[7%] w-[2px] -translate-x-1/2 bg-ink" />
      <div aria-hidden="true" className="absolute left-[3%] right-[3%] top-1/2 h-[2px] -translate-y-1/2 bg-ink" />
      <span aria-hidden="true" className="absolute left-1/2 top-[7%] -translate-x-1/2 -translate-y-full border-x-[6px] border-b-[10px] border-x-transparent border-b-ink" />
      <span aria-hidden="true" className="absolute right-[3%] top-1/2 -translate-y-1/2 translate-x-full border-y-[6px] border-l-[10px] border-y-transparent border-l-ink" />
      <span className={`${label} left-[54%] top-[4%]`}>{axes.top}</span>
      <span className={`${label} bottom-[4%] left-[54%]`}>{axes.bottom}</span>
      <span className={`${label} left-[3%] top-[45%]`}>{axes.left}</span>
      <span className={`${label} right-[3%] top-[45%]`}>{axes.right}</span>
      <div className="absolute inset-x-[4%] inset-y-[13%] grid grid-cols-2 grid-rows-2 gap-y-[10%]">
        {quadrants.map(cell)}
      </div>
    </div>
  )
}

function Users({ slide }) {
  const { piaget, bartle, bridges, traits, conclusion } = slide
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {piaget.stages.map((stage) => (
          <Stage key={stage.age} stage={stage} />
        ))}
      </div>
      <p className="mt-3 text-right text-note italic text-fog">{piaget.caption}</p>
      <PiagetLead />

      <div className="mt-8 grid items-center gap-8 lg:mt-2 lg:grid-cols-[7fr_auto_5fr]">
        <div>
          <Quadrant bartle={bartle} />
          <p className="mt-2 text-note italic text-fog">{bartle.caption}</p>
        </div>

        <div className="flex flex-col items-center justify-around gap-8 self-stretch">
          {bridges.map((bridge) => (
            <div key={bridge} className="flex flex-col items-center gap-2 lg:flex-row lg:gap-3">
              <Arrow size={30} className="rotate-90 lg:rotate-0" />
              <span
                className="rounded-md border-[3px] px-4 py-1.5 font-condensed text-xl font-bold italic text-ink"
                style={{ borderColor: ACCENT }}
              >
                {bridge}
              </span>
              <Arrow size={30} className="rotate-90 lg:rotate-0" />
            </div>
          ))}
        </div>

        <div
          className="flex flex-col justify-around gap-7 rounded-2xl px-6 py-8 text-center"
          style={{ background: ACCENT, color: ON_PALE }}
        >
          {traits.map((trait) => (
            <div key={trait.name}>
              <p className="font-condensed text-2xl font-bold italic">{trait.name}</p>
              <p className="mt-1.5 text-copy leading-relaxed">{trait.text}</p>
            </div>
          ))}
        </div>
      </div>

      <Accent className="mx-auto mt-12 max-w-3xl text-center text-2xl font-bold leading-relaxed">
        <Marked parts={conclusion} />
      </Accent>
    </div>
  )
}

// --- 07 · Action analysis -------------------------------------------------------

function Pill({ children }) {
  return (
    <Accent
      as="p"
      className="inline-block rounded-xl border-[3px] px-7 py-1 text-2xl font-bold shadow-[0_3px_10px_rgba(0,0,0,0.08)]"
      style={{ borderColor: ACCENT }}
    >
      {children}
    </Accent>
  )
}

function Glyph({ kind }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 36 36" width="36" height="36" className="shrink-0">
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
      <Pill>{why}</Pill>
      <div className="mt-6 space-y-8">
        {motives.map((motive) => (
          <div key={motive.name} className="grid items-center gap-4 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,12fr)] lg:gap-6">
            <div className="flex items-center gap-4 lg:block">
              <div>
                <p className="font-condensed text-xl font-bold italic text-ink">{motive.name}</p>
                <p className="text-copy leading-relaxed text-ink">{motive.quote}</p>
              </div>
              <Arrow size={32} className="lg:hidden" />
            </div>
            <Arrow size={32} className="hidden lg:block" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {motive.shots.map((shot) => (
                <figure key={shot.src}>
                  <Shot src={shot.src} className="rounded-lg" />
                  <figcaption className="mt-1.5 text-center text-note leading-snug text-fog">{shot.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Pill>{how}</Pill>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-6">
        {formula.map((group, i) => (
          <div key={group.name} className="contents">
            <div className="flex flex-col items-center text-center">
              <p className="font-condensed text-xl font-bold italic text-ink">{group.name}</p>
              <p className="mt-2 flex flex-col items-center text-copy leading-relaxed text-ink">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </div>
            {i < formula.length - 1 && <Glyph kind={i === formula.length - 2 ? "equals" : "plus"} />}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl px-6 py-6 text-center sm:px-10" style={{ background: BAND, color: ON_BAND }}>
        {band.map((line) => (
          <p key={line} className="text-copy leading-relaxed">
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

// --- 08 · Feedback --------------------------------------------------------------

function Feedback({ slide }) {
  const { positive, negative, instant, delayed } = slide
  const cell = "px-2 py-6 sm:px-7 sm:py-8"
  const title = "text-2xl font-bold"
  const rule = { borderColor: ACCENT }
  return (
    <div className="grid sm:grid-cols-2">
      <div className={`${cell} border-b-[3px] border-dashed sm:border-r-[3px]`} style={rule}>
        <Accent className={title}>{positive.name}</Accent>
        <ul className="mt-6 space-y-5">
          {positive.rows.map((row) => (
            <li key={row.text} className="flex items-center gap-4 text-copy leading-relaxed text-ink">
              <Mark ok={row.ok} size={26} />
              <span>{row.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${cell} border-b-[3px] border-dashed`} style={rule}>
        <Accent className={title}>{negative.name}</Accent>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {negative.shots.map((shot) => (
            <div key={shot.src}>
              <Shot src={shot.src} className="rounded-lg" />
              <p className="mt-3 flex items-center gap-2.5 text-copy leading-snug text-ink">
                <Mark ok={shot.ok} size={22} />
                <span>{shot.text}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${cell} border-dashed sm:border-r-[3px]`} style={rule}>
        <Accent className={title}>{instant.name}</Accent>
        <Shot src={instant.image} className="mx-auto mt-5 max-w-sm rounded-lg" />
        <p className="mx-auto mt-5 max-w-md text-center text-copy leading-relaxed text-ink">{instant.text}</p>
      </div>

      <div className={cell}>
        <Accent className={title}>{delayed.name}</Accent>
        <Shot src={delayed.image} className="mx-auto mt-5 max-w-sm rounded-lg" />
        <p className="mx-auto mt-5 max-w-md text-center text-copy leading-relaxed text-ink">{delayed.text}</p>
      </div>
    </div>
  )
}

// --- 09 · Persona ---------------------------------------------------------------

function PersonaCard({ person, labels }) {
  return (
    <div className="relative rounded-2xl px-5 pb-6 pt-6" style={{ background: PALE, color: ON_PALE }}>
      {/* The photo breaks the top edge, as it does on the board. */}
      <img
        src={person.image}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -top-12 right-2 h-[230px] w-auto object-contain"
      />
      <div className="min-h-[190px] pr-[150px]">
        <p
          className="inline-block bg-white px-4 py-1 font-condensed text-3xl italic leading-none tracking-wider"
          style={{ color: ACCENT_INK, clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)" }}
        >
          {person.name}
        </p>
        <Accent className="mt-2 text-2xl font-bold leading-none">{person.age}</Accent>
        {person.stage && <Accent className="mt-1 text-note font-bold">{person.stage}</Accent>}
        <div className="mt-1.5 text-note leading-snug" style={{ color: ACCENT_INK }}>
          {person.facts.map((fact) => (
            <p key={fact}>{fact}</p>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-1">
        {person.quotes.map((quote) => (
          <li key={quote}>
            <Accent className="text-note font-bold">{quote}</Accent>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-note leading-relaxed" style={{ opacity: 0.85 }}>
        {person.bio}
      </p>

      <div className="mt-6 grid grid-cols-[2fr_3fr] gap-x-4">
        <div>
          <p className="font-condensed text-xl font-bold italic">{labels.goal}</p>
          <p className="mt-1 text-copy leading-snug">{person.goal}</p>
        </div>
        <div>
          <p className="font-condensed text-xl font-bold italic">{labels.traits}</p>
          <p className="mt-1 text-copy leading-snug">{person.traits}</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-condensed text-xl font-bold italic">{labels.frustrations}</p>
        <ul className="mt-1 space-y-0.5">
          {person.frustrations.map((item) => (
            <li key={item} className="text-copy leading-snug">
              –{item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function Persona({ slide }) {
  return (
    <div className="grid gap-x-5 gap-y-16 pt-10 md:grid-cols-3">
      {slide.people.map((person) => (
        <PersonaCard key={person.name} person={person} labels={slide.labels} />
      ))}
    </div>
  )
}

// --- 10 · Pain points and solutions ---------------------------------------------

function Painpoints({ slide }) {
  const dot = (
    <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-ink" />
  )
  return (
    <div>
      <div className="space-y-9">
        {slide.groups.map((group) => (
          <div key={group.heading}>
            <Accent className="text-2xl font-bold">{group.heading}</Accent>
            {/* Problem → solution, side by side from sm up. On a phone the two
                columns would be too narrow for a 20px line, so each pair stacks
                with the arrow turned to point down. */}
            <div className="mt-3 grid gap-y-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-x-8 sm:gap-y-2.5 sm:pl-6">
              {group.rows.map(([problem, solution], i) => (
                <div key={i} className="grid gap-y-1.5 sm:contents">
                  <p className="flex gap-3 text-copy leading-relaxed text-ink">
                    {problem && dot}
                    <span>{problem}</span>
                  </p>
                  <Arrow size={26} className="ml-5 rotate-90 sm:ml-0 sm:mt-1 sm:rotate-0" />
                  <p className="flex gap-3 text-copy leading-relaxed text-ink">
                    {dot}
                    <span>{solution}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid items-center gap-4 sm:grid-cols-[11fr_13fr]">
        {slide.images.map((image) => (
          <Shot key={image.src} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  )
}

// --- 11 · Case ------------------------------------------------------------------

function CaseLabel({ children }) {
  return <Accent className="text-2xl font-bold">{children}</Accent>
}

function Case({ slide }) {
  const { brief, logic, layout, ixd } = slide
  return (
    <div className="space-y-10">
      {brief.map((item) => (
        <div key={item.label}>
          <CaseLabel>{item.label}</CaseLabel>
          {item.text && <p className="mt-2 text-copy leading-relaxed text-ink sm:pl-4">{item.text}</p>}
          {item.steps && (
            <ol className="mt-2 list-decimal space-y-1 pl-9 text-copy leading-relaxed text-ink sm:pl-12">
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      ))}

      <div>
        <CaseLabel>{logic.label}</CaseLabel>
        <Shot src={logic.image} className="mt-4" />
      </div>

      <div>
        <CaseLabel>{layout.label}</CaseLabel>
        <div className="mt-4 grid items-center gap-5 lg:grid-cols-[7fr_auto_4fr]">
          <Shot src={layout.image} />
          <Arrow size={36} className="hidden lg:block" />
          <div className="text-center lg:text-left">
            {layout.points.map((point) => (
              <p key={point} className="font-condensed text-xl font-bold italic leading-relaxed text-ink">
                {point}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <CaseLabel>{ixd.label}</CaseLabel>
        <div className="mt-4 grid gap-6 lg:grid-cols-[5fr_4fr_5fr] lg:gap-4">
          <div>
            <Shot src={ixd.boards[0].image} />
            <ul className="mt-3 space-y-2 lg:hidden">
              {ixd.boards[0].notes.map((note) => (
                <li key={note} className="flex items-center gap-2 font-condensed text-xl font-bold italic text-ink">
                  <Arrow dir="up" size={24} />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: the notes sit between the two boards, each pointing at its board. */}
          <div className="hidden flex-col gap-7 pt-[18%] lg:flex">
            {ixd.boards[0].notes.map((note) => (
              <p key={note} className="flex items-center gap-2 font-condensed text-xl font-bold italic leading-tight text-ink">
                <Arrow dir="left" size={26} />
                {note}
              </p>
            ))}
            {ixd.boards[1].notes.map((note) => (
              <p key={note} className="flex items-center justify-end gap-2 text-right font-condensed text-xl font-bold italic leading-tight text-ink">
                {note}
                <Arrow dir="right" size={26} />
              </p>
            ))}
          </div>

          <div>
            <Shot src={ixd.boards[1].image} />
            <ul className="mt-3 space-y-2 lg:hidden">
              {ixd.boards[1].notes.map((note) => (
                <li key={note} className="flex items-center gap-2 font-condensed text-xl font-bold italic text-ink">
                  <Arrow dir="up" size={24} />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid items-center gap-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Shot src={ixd.legend.image} className="w-auto max-w-[280px] flex-1 rounded-lg" />
            <Arrow size={28} />
            <p className="font-condensed text-xl font-bold italic text-ink">{ixd.legend.text}</p>
          </div>
          <Shot src={ixd.transition} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

// --- 12 · Other case ------------------------------------------------------------

function Gallery({ slide }) {
  return (
    <div className="relative">
      <img
        src={slide.mice.plane}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -top-28 right-0 hidden w-[170px] lg:block"
      />
      <img
        src={slide.mice.wave}
        alt=""
        loading="lazy"
        className="pointer-events-none absolute -bottom-4 left-0 hidden w-[120px] lg:block"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:px-28">
        {slide.shots.map((shot) => (
          <Shot key={shot.src} src={shot.src} alt={shot.alt} className="rounded-lg" />
        ))}
      </div>
      <ul className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-2 text-copy lg:px-28" style={{ color: PINK }}>
        {slide.labels.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ul>
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
