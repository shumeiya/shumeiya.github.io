// The Slow Food (GROW) case study, laid out for the page rather than for a slide.
//
// The source is a deck: 1920×1080 slides and three that run several screens tall,
// each one a single picture with its copy set around it. Shown as slides, every
// one of them fills the screen and shrinks to nothing on a phone. So each chapter
// is rebuilt from its parts instead: the page draws the chapter title, and the
// content sits under it in rounded tiles on one grid. A slide's photograph becomes
// one tile among several, a tall slide becomes a run of tiles, the app's screens
// stand in small phone frames a few across, and nothing is ever a single image
// the height of the window.
//
// Every tile grid is a real grid, so three across becomes one across on a phone
// without any of it being scaled. One green (the GROW green) marks numbers, terms
// and the path through a sequence. Colour lives in `.sf-deck` in index.css; copy
// in src/data/slowFood.js.
//
// The deck's illustrations were drawn on white, so they stand on `Paper`, a ground
// that stays pale in dark mode; nothing but pictures goes on it.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (16px),
// nothing below `text-note` (13px). Tiles rise in on the shared reveal in
// wpMotion.jsx, side-by-side tiles a beat apart; none of it runs under
// prefers-reduced-motion.
import { ChevronRight, Plus, Repeat, Sprout, Store, Users } from "lucide-react"
import { useReveal } from "./wpMotion"

// --- primitives ---------------------------------------------------------------

const ACCENT = "var(--sf-accent)"
const ACCENT_INK = "var(--sf-accent-ink)"
const RULE = "var(--sf-rule)"

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

// The one surface everything sits on. `lit` is the green-tinted variant.
function Tile({ lit, pad = "p-6 sm:p-8", className = "", children, ...rest }) {
  return (
    <Rise className={`sf-tile min-w-0 rounded-3xl ${pad} ${lit ? "sf-tile--lit" : ""} ${className}`} {...rest}>
      {children}
    </Rise>
  )
}

// The ground the deck's white-backed artwork stands on.
function Paper({ className = "", children, ...rest }) {
  return (
    <div className={`sf-paper overflow-hidden rounded-2xl ${className}`} {...rest}>
      {children}
    </div>
  )
}

function Title({ children, className = "" }) {
  return <h3 className={`text-2xl font-semibold tracking-tight text-cream ${className}`}>{children}</h3>
}

// The small caps label: a step number, a group name.
function Label({ children, accent, className = "" }) {
  return (
    <p
      className={`font-mono-tight text-note uppercase tracking-wide ${accent ? "" : "text-fog"} ${className}`}
      style={accent ? { color: ACCENT_INK } : undefined}
    >
      {children}
    </p>
  )
}

// A round number badge: a step in a list, a callout on a screen.
function Num({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex size-6 shrink-0 items-center justify-center rounded-full text-note font-semibold ${className}`}
      style={{ background: ACCENT, color: "var(--sf-on-accent)" }}
    >
      {children}
    </span>
  )
}

// Terms and what they mean, one under another: the deck's blue sub-heads.
function Defs({ items, numbered, className = "" }) {
  return (
    <dl className={`space-y-6 ${className}`}>
      {items.map((item, i) => (
        <div key={item.term} className={numbered ? "flex gap-4" : undefined}>
          {numbered && <Num className="mt-1">{i + 1}</Num>}
          <div className="min-w-0">
            <dt className="text-xl font-semibold tracking-tight" style={{ color: ACCENT_INK }}>
              {item.term}
            </dt>
            <dd className="mt-2 text-copy text-fog">
              <Rich text={item.text} />
            </dd>
          </div>
        </div>
      ))}
    </dl>
  )
}

// An app screen in a phone frame. The bezel is a thin 3px line, not a thick
// device body: the screen is what is being shown. The radii are percentages of
// the box, so the corners stay round at any width.
function Phone({ src, alt = "", className = "" }) {
  return (
    <div className={`sf-phone relative ${className}`} style={{ borderRadius: "8% / 3.7%", padding: 3 }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: "390 / 844", borderRadius: "6.5% / 3%" }}>
        <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
      </div>
    </div>
  )
}

// A row of phones with a caption under each. On a phone the row scrolls sideways
// at a readable size; from `sm` up it is an even grid.
function Screens({ items, className = "" }) {
  return (
    <ul className={`no-scrollbar -mx-2 flex snap-x gap-4 overflow-x-auto px-2 sm:mx-0 sm:grid sm:overflow-visible sm:px-0 ${className}`}>
      {items.map((screen) => (
        <li key={screen.src} className="w-36 shrink-0 snap-start sm:w-auto">
          <Phone src={screen.src} alt={screen.caption} />
          <p className="mt-body text-center text-callout text-fog">{screen.caption}</p>
        </li>
      ))}
    </ul>
  )
}

// --- Background: the town, then the organisation ---------------------------------

function Background({ slide }) {
  return (
    <div className="grid gap-card">
      {slide.parts.map((part, i) => (
        <Tile key={part.img} className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
          <Paper className={`p-4 ${i % 2 ? "lg:order-2" : ""}`}>
            <img
              src={part.img}
              alt=""
              loading="lazy"
              className="mx-auto block max-h-72 w-full object-contain lg:max-h-96"
              style={{ aspectRatio: part.ratio }}
            />
          </Paper>
          <div>
            <Title>{part.title}</Title>
            <Defs items={part.items} className="mt-6" />
          </div>
        </Tile>
      ))}
    </div>
  )
}

// --- Research: the restaurant -----------------------------------------------------

function Research({ slide }) {
  return (
    <div className="grid gap-card">
      <div className="grid gap-card lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Tile pad="p-4" className="flex flex-col">
          <Paper className="flex flex-1 items-center justify-center p-4">
            <img src={slide.photo} alt="" loading="lazy" className="block max-h-64 w-auto max-w-full object-contain lg:max-h-80" />
          </Paper>
          <p className="mt-body px-2 text-note text-fog">{slide.caption}</p>
        </Tile>
        <div className="grid content-start gap-card">
          {slide.facts.map((fact, i) => (
            <Tile key={fact.term} delay={(i + 1) * 80}>
              <h3 className="text-xl font-semibold tracking-tight" style={{ color: ACCENT_INK }}>
                {fact.term}
              </h3>
              <p className="mt-2 text-copy text-fog">
                <Rich text={fact.text} />
              </p>
            </Tile>
          ))}
        </div>
      </div>

      <Tile>
        <Title>{slide.findingsTitle}</Title>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-card">
          {slide.figures.map((figure) => (
            <li key={figure.value} className="sf-chip rounded-2xl p-4 sm:p-6">
              <p className="text-3xl font-semibold tracking-tight sm:text-5xl" style={{ color: ACCENT_INK }}>
                {figure.value}
              </p>
              <p className="mt-2 text-note text-fog sm:text-callout">{figure.label}</p>
            </li>
          ))}
        </ul>
        <ol className="mt-6 grid gap-x-12 lg:grid-cols-2">
          {slide.findings.map((finding, i) => (
            <li key={i} className="flex gap-4 border-t py-4" style={{ borderColor: RULE }}>
              <Num className="mt-1">{i + 1}</Num>
              <p className="min-w-0 text-copy text-fog">
                <Rich text={finding} />
              </p>
            </li>
          ))}
        </ol>
      </Tile>
    </div>
  )
}

// --- Interview: three guests --------------------------------------------------------

function Interview({ slide }) {
  return (
    <ul className="grid gap-card lg:grid-cols-3">
      {slide.people.map((person, i) => (
        <Tile as="li" key={person.name} pad="p-6" delay={i * 80} className="flex flex-col">
          <div className="flex items-center gap-4">
            <img
              src={person.photo}
              alt=""
              loading="lazy"
              className="block aspect-[2/3] w-20 shrink-0 rounded-2xl object-cover"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-cream">{person.name}</h3>
              {person.meta.map((line) => (
                <p key={line} className="text-note text-fog">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="mt-6 text-copy text-fog">
            <Rich text={person.quote} />
          </p>
          <div className="mt-auto pt-6">
            <ul className="flex flex-wrap gap-2">
              {person.tags.map((tag) => (
                <li key={tag} className="sf-chip rounded-full px-3 py-1 text-note text-ink">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t pt-4 text-copy font-semibold" style={{ borderColor: RULE, color: ACCENT_INK }}>
              {person.verdict}
            </p>
          </div>
        </Tile>
      ))}
    </ul>
  )
}

// --- Design task: three goals -----------------------------------------------------

function Task({ slide }) {
  return (
    <Tile className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center lg:gap-12">
      <Paper className="flex items-center justify-center p-8">
        <img src={slide.lockup} alt="Plant your slow dishes" loading="lazy" className="block w-40 max-w-full lg:w-56" />
      </Paper>
      <Defs items={slide.goals} numbered />
    </Tile>
  )
}

// --- Case study: four references on five axes --------------------------------------

function Dots({ score }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="size-3 rounded-full"
          style={{ background: i < score ? "var(--sf-score)" : "var(--sf-dot)" }}
        />
      ))}
    </span>
  )
}

function Cases({ slide }) {
  return (
    <ul className="grid gap-card md:grid-cols-2">
      {slide.items.map((item, i) => (
        <Tile as="li" key={item.img} pad="p-6" delay={(i % 2) * 80}>
          <div className="flex gap-4">
            <img
              src={item.img}
              alt=""
              loading="lazy"
              className="block aspect-[19/20] w-28 shrink-0 self-start rounded-2xl object-cover sm:w-40"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight text-cream">{item.name}</h3>
              <p className="mt-1 text-callout" style={{ color: ACCENT_INK }}>
                {item.tagline}
              </p>
              <dl className="mt-4 space-y-1">
                {slide.axes.map((axis, a) => (
                  <div key={axis} className="flex items-center gap-3">
                    <dd>
                      <Dots score={item.scores[a]} />
                      <span className="sr-only">{item.scores[a]} / 5</span>
                    </dd>
                    <dt className="text-note text-fog">{axis}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <p className="mt-6 text-copy text-fog">{item.text}</p>
        </Tile>
      ))}
    </ul>
  )
}

// --- Persona: three visitors --------------------------------------------------------

function Persona({ slide }) {
  return (
    <ul className="grid gap-card lg:grid-cols-3">
      {slide.people.map((person, i) => (
        <Tile as="li" key={person.name} pad="p-0" delay={i * 80} className="flex overflow-hidden lg:flex-col">
          {/* The cut-out stands on the deck's green hill. */}
          <div className="relative w-28 shrink-0 sm:w-44 lg:h-64 lg:w-full">
            <span
              aria-hidden="true"
              className="absolute inset-x-3 bottom-0 top-1/4 rounded-t-full lg:inset-x-1/4"
              style={{ background: ACCENT }}
            />
            <img
              src={person.img}
              alt=""
              loading="lazy"
              className="absolute inset-x-0 bottom-0 mx-auto block h-full max-h-64 w-full object-contain object-bottom pt-4"
            />
          </div>
          <div className="min-w-0 flex-1 p-6">
            <h3 className="text-2xl font-semibold tracking-tight text-cream">{person.name}</h3>
            <p className="text-callout" style={{ color: ACCENT_INK }}>
              {person.who}
            </p>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="font-mono-tight text-note uppercase tracking-wide text-fog">{slide.hobbyLabel}</dt>
                <dd className="text-copy text-ink">{person.hobby}</dd>
              </div>
              <div>
                <dt className="font-mono-tight text-note uppercase tracking-wide text-fog">{slide.goalLabel}</dt>
                <dd className="text-copy text-ink">{person.goal}</dd>
              </div>
            </dl>
            <p className="mt-4 border-t pt-4 text-copy font-semibold text-cream" style={{ borderColor: RULE }}>
              {person.quote}
            </p>
          </div>
        </Tile>
      ))}
    </ul>
  )
}

// --- Project overview: the loop, and its two halves -----------------------------------

const ICONS = { sprout: Sprout, community: Users, booking: Store }

function Glyph({ name, className = "" }) {
  const Icon = ICONS[name]
  return (
    <span
      aria-hidden="true"
      className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${className}`}
      style={{ background: ACCENT, color: "var(--sf-on-accent)" }}
    >
      <Icon size={24} />
    </span>
  )
}

function Overview({ slide }) {
  return (
    <div className="grid gap-card">
      <Tile>
        <Label accent>{slide.loopLabel}</Label>
        <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {slide.loop.map((item, i) => (
            <li key={item.label} className="relative">
              <Paper className="flex h-28 items-center justify-center p-3">
                {item.img ? (
                  <img src={item.img} alt="" loading="lazy" className="block max-h-full max-w-full object-contain" />
                ) : (
                  <Glyph name={item.icon} />
                )}
              </Paper>
              <p className="mt-body flex items-center gap-2 text-copy font-semibold text-cream">
                <Num>{i + 1}</Num>
                {item.label}
              </p>
              {i < slide.loop.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  size={16}
                  className="absolute -right-3 top-12 hidden text-fog lg:block"
                />
              )}
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-start gap-3 border-t pt-4 text-copy text-fog" style={{ borderColor: RULE }}>
          <Repeat aria-hidden="true" size={20} className="mt-1 shrink-0" style={{ color: ACCENT_INK }} />
          {slide.loopBack}
        </p>
      </Tile>

      <div className="grid gap-card lg:grid-cols-2">
        <Tile>
          <div className="flex items-center gap-4">
            <Paper className="flex size-20 shrink-0 items-center justify-center p-2">
              <img src={slide.app.img} alt="" loading="lazy" className="block max-h-full max-w-full object-contain" />
            </Paper>
            <Title>{slide.app.title}</Title>
          </div>
          <ul className="mt-6">
            {slide.app.items.map((item) => (
              <li key={item.label} className="flex items-center gap-4 border-t py-4 last:pb-0" style={{ borderColor: RULE }}>
                <Glyph name={item.icon} />
                <div className="min-w-0">
                  <p className="text-copy font-semibold text-cream">{item.label}</p>
                  <p className="text-callout text-fog">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile delay={80}>
          <div className="flex items-center gap-4">
            <Paper className="flex size-20 shrink-0 items-center justify-center p-2">
              <img src={slide.restaurant.img} alt="" loading="lazy" className="block max-h-full max-w-full object-contain" />
            </Paper>
            <div className="min-w-0">
              <Title>{slide.restaurant.title}</Title>
              <ul className="mt-2 flex flex-wrap items-center gap-2">
                {slide.restaurant.partners.map((partner, i) => (
                  <li key={partner.label} className="flex items-center gap-2 text-note text-fog">
                    {i > 0 && <Plus aria-hidden="true" size={12} />}
                    <span className="sf-paper flex h-6 items-center rounded px-1">
                      <img src={partner.img} alt="" loading="lazy" className="block h-4 w-auto" />
                    </span>
                    {partner.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ol className="mt-6 grid grid-cols-2 gap-3">
            {slide.restaurant.items.map((item, i) => (
              <li key={item.label}>
                <Paper className="flex h-24 items-center justify-center p-3">
                  <img src={item.img} alt="" loading="lazy" className="block max-h-full max-w-full object-contain" />
                </Paper>
                <p className="mt-body flex items-center gap-2 text-copy font-semibold text-cream">
                  <Num>{i + 1}</Num>
                  {item.label}
                </p>
              </li>
            ))}
          </ol>
        </Tile>
      </div>
    </div>
  )
}

// --- App design: the app in three parts ------------------------------------------------

function AppDesign({ slide }) {
  return (
    <Tile className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
      <div className="flex justify-center gap-4">
        {slide.screens.map((screen, i) => (
          <Phone key={screen.src} src={screen.src} alt={screen.alt} className={`w-32 sm:w-40 ${i ? "mt-8" : "mb-8"}`} />
        ))}
      </div>
      <Defs items={slide.features} numbered />
    </Tile>
  )
}

// --- Online planting: three steps, three screens -----------------------------------------

function Planting({ slide }) {
  return (
    <div className="grid gap-card">
      <ol className="grid gap-card lg:grid-cols-3">
        {slide.steps.map((step, i) => (
          <Tile as="li" key={step.card} pad="p-6" delay={i * 80}>
            <Label accent>{nn(i)}</Label>
            <Title className="mt-2">{step.title}</Title>
            <Paper className="mt-6 flex h-36 items-center justify-center gap-4 p-4">
              <img src={step.card} alt="" loading="lazy" className="block h-full w-auto" />
              <ChevronRight aria-hidden="true" size={16} className="shrink-0" style={{ color: "#249a48" }} />
              <img
                src={step.extra}
                alt=""
                loading="lazy"
                className={`block min-w-0 object-contain ${
                  step.extraKind === "wide" ? "max-h-full shrink" : step.extraKind === "icon" ? "h-16 w-auto" : "h-full w-auto"
                }`}
              />
            </Paper>
            <p className="mt-6 text-copy font-semibold text-cream">{step.lead}</p>
            <p className="mt-2 text-copy text-fog">{step.text}</p>
          </Tile>
        ))}
      </ol>

      <ul className="grid gap-card lg:grid-cols-3">
        {slide.screens.map((screen, i) => (
          <Tile as="li" key={screen.src} pad="p-6" delay={i * 80} className="flex items-center gap-6 lg:flex-col lg:items-stretch">
            {/* What is on each screen is listed beside it, not numbered on top of
                it: the screens are shown clean. */}
            <Phone src={screen.src} alt={screen.title} className="w-36 shrink-0 sm:w-44 lg:mx-auto" />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight text-cream">{screen.title}</h3>
              <ul className="mt-4 space-y-2">
                {screen.marks.map((mark) => (
                  <li key={mark.label} className="flex items-start gap-3 text-copy text-fog">
                    <span aria-hidden="true" className="mt-2 size-2 shrink-0 rounded-full" style={{ background: ACCENT }} />
                    {mark.label}
                  </li>
                ))}
              </ul>
            </div>
          </Tile>
        ))}
      </ul>
    </div>
  )
}

// --- Story community -----------------------------------------------------------------

function Community({ slide }) {
  return (
    <div className="grid gap-card lg:grid-cols-2">
      {slide.groups.map((group, i) => (
        <Tile key={group.label} pad="p-6" delay={i * 80}>
          <Title>{group.label}</Title>
          <p className="mt-2 text-copy text-fog">{group.text}</p>
          <Screens items={group.screens} className="mt-6 sm:grid-cols-3" />
        </Tile>
      ))}
    </div>
  )
}

// --- Restaurant booking -----------------------------------------------------------------

function Booking({ slide }) {
  return (
    <Tile className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div>
        <ul>
          {slide.points.map((point, i) => (
            <li key={i} className={`flex gap-4 py-4 ${i ? "border-t" : "pt-0"}`} style={{ borderColor: RULE }}>
              <Num className="mt-1">{i + 1}</Num>
              <p className="min-w-0 text-copy text-fog">{point}</p>
            </li>
          ))}
        </ul>
        <img
          src={slide.banner}
          alt=""
          loading="lazy"
          className="mt-4 block h-auto w-full max-w-sm rounded-2xl"
          style={{ aspectRatio: "963 / 450" }}
        />
      </div>
      <Screens items={slide.screens} className="sm:mx-auto sm:w-full sm:max-w-sm sm:grid-cols-2" />
    </Tile>
  )
}

// --- Space redesign: the courtyard, zone by zone -----------------------------------------

function Swatch({ color, className = "" }) {
  return <span aria-hidden="true" className={`block h-4 w-8 shrink-0 rounded ${className}`} style={{ background: color }} />
}

function Shot({ shot }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: shot.ratio }}>
        <img src={shot.src} alt={shot.title ?? ""} loading="lazy" className="block h-full w-full object-cover" />
      </div>
      {shot.title && (
        <figcaption className="mt-body">
          <p className="text-copy font-semibold text-cream">{shot.title}</p>
          <p className="mt-1 text-copy text-fog">{shot.text}</p>
        </figcaption>
      )}
    </figure>
  )
}

function Area({ area }) {
  const single = area.shots.length === 1
  const head = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <Swatch color={area.color} />
          <Title>{area.title}</Title>
        </div>
        <p className="mt-3 max-w-2xl text-copy text-fog">{area.text}</p>
        {area.cards && (
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {area.cards.map((card) => (
              <li key={card.label} className="flex items-center gap-3 whitespace-nowrap text-callout text-fog">
                <span className="sf-paper block rounded-lg p-1">
                  <img src={card.src} alt="" loading="lazy" className="block h-16 w-auto" />
                </span>
                {card.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Paper className="w-16 shrink-0 p-1 sm:w-20">
        <img src={area.mini} alt="" loading="lazy" className="block h-auto w-full" style={{ aspectRatio: "316 / 380" }} />
      </Paper>
    </div>
  )

  if (single)
    return (
      <Tile className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
        {head}
        <Shot shot={area.shots[0]} />
      </Tile>
    )

  return (
    <Tile>
      {head}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:gap-card">
        {area.shots.map((shot) => (
          <Shot key={shot.src} shot={shot} />
        ))}
      </div>
    </Tile>
  )
}

function Space({ slide }) {
  return (
    <div className="grid gap-card">
      <Tile className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
        <div className="flex justify-center gap-4">
          <Paper className="p-3">
            <img src={slide.plan} alt="" loading="lazy" className="block h-56 w-auto sm:h-72" />
          </Paper>
          <Paper className="p-3">
            <img src={slide.zones} alt="" loading="lazy" className="block h-56 w-auto sm:h-72" />
          </Paper>
        </div>
        <div>
          <p className="text-xl font-medium leading-snug text-cream">{slide.statement}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {slide.legend.map((item) => (
              <li key={item.label} className="flex items-center gap-2 text-note text-fog">
                <Swatch color={item.color} className="w-4" />
                {item.label}
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t pt-6" style={{ borderColor: RULE }}>
            <Defs items={slide.ideas} numbered />
          </div>
        </div>
      </Tile>

      {slide.areas.map((area) => (
        <Area key={area.mini} area={area} />
      ))}
    </div>
  )
}

// --- User journey: sixteen steps in four stretches ---------------------------------------

function Journey({ slide }) {
  let n = 0
  return (
    <div>
      {slide.phases.map((phase, p) => (
        <section key={phase.label} className={p ? "mt-visual" : undefined}>
          <Label accent>
            {nn(p)} · {phase.label}
          </Label>
          <ol className="mt-body grid grid-cols-2 gap-2 sm:gap-card lg:grid-cols-4">
            {phase.steps.map((step, i) => {
              n += 1
              return (
                <Tile as="li" key={step.img} pad="p-3 sm:p-4" delay={i * 60}>
                  <Paper className="flex h-32 items-center justify-center p-3 sm:h-40">
                    <img src={step.img} alt="" loading="lazy" className="block max-h-full max-w-full object-contain" />
                  </Paper>
                  <div className="p-1 pt-4 sm:p-2 sm:pt-4">
                    <p className="font-mono-tight text-note" style={{ color: ACCENT_INK }}>
                      {String(n).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold leading-snug tracking-tight text-cream">{step.title}</h3>
                    {step.text && <p className="mt-2 text-copy leading-normal text-fog">{step.text}</p>}
                  </div>
                </Tile>
              )
            })}
          </ol>
        </section>
      ))}
      <Tile lit className="mt-card flex items-center gap-4" pad="p-6">
        <Repeat aria-hidden="true" size={24} className="shrink-0" style={{ color: ACCENT_INK }} />
        <p className="text-xl font-semibold tracking-tight text-cream">{slide.loop}</p>
      </Tile>
    </div>
  )
}

// --- Visual design: the identity, and where it goes -----------------------------------------

function Visual({ slide }) {
  const last = slide.uses.length - 1
  return (
    <div className="grid gap-card">
      <div className="grid gap-card lg:grid-cols-3">
        <Tile className="lg:col-span-2">
          <Label>{slide.logoLabel}</Label>
          <Paper className="mt-4 flex items-center justify-center p-6 sm:p-8">
            <img src={slide.logo} alt="GROW" loading="lazy" className="block h-auto w-full max-w-md" style={{ aspectRatio: "1387 / 426" }} />
          </Paper>
          <ul className="mt-4 flex flex-wrap gap-2">
            {slide.ideas.map((idea) => (
              <li key={idea} className="sf-chip rounded-full px-3 py-1 text-note font-semibold" style={{ color: ACCENT_INK }}>
                {idea}
              </li>
            ))}
          </ul>
        </Tile>

        <Tile delay={80}>
          <Label>{slide.colorLabel}</Label>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {slide.colors.map((color) => (
              <li key={color}>
                <span className="sf-swatch block h-16 rounded-2xl" style={{ background: color }} />
                <p className="mt-2 font-mono-tight text-note text-fog">{color}</p>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile className="lg:col-span-3">
          <Label>{slide.typeLabel}</Label>
          <ul className="mt-4 grid gap-card sm:grid-cols-2">
            {slide.faces.map((face) => (
              <li key={face.name}>
                <Paper className="flex h-28 items-center px-6">
                  <img src={face.img} alt={face.name} loading="lazy" className="block h-auto w-full max-w-xs" style={{ aspectRatio: face.ratio }} />
                </Paper>
                <p className="mt-body text-callout text-fog">
                  <span className="font-semibold text-ink">{face.role}</span> · {face.name}
                </p>
              </li>
            ))}
          </ul>
        </Tile>
      </div>

      <div>
        <Label className="mt-4">{slide.usesLabel}</Label>
        <ul className="mt-body grid grid-cols-2 gap-2 sm:gap-card md:grid-cols-3 lg:grid-cols-4">
          {slide.uses.map((use, i) => (
            <Rise
              as="li"
              key={use.src}
              delay={(i % 4) * 60}
              className={`relative overflow-hidden rounded-2xl ${i >= last - 1 ? "max-md:col-span-2 lg:col-span-2" : ""} ${
                i === last ? "max-lg:md:col-span-3" : ""
              }`}
            >
              <img src={use.src} alt={use.label} loading="lazy" className="block h-32 w-full object-cover sm:h-44 lg:h-52" />
              {/* A hairline, so the pale mock-ups keep an edge on the white page. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ boxShadow: `inset 0 0 0 1px ${RULE}` }}
              />
              <span className="sf-caption absolute bottom-2 left-2 rounded-full px-3 py-1 text-note">{use.label}</span>
            </Rise>
          ))}
        </ul>
      </div>
    </div>
  )
}

// --- Discounted cash flow ------------------------------------------------------------------

function Dcf({ slide }) {
  return (
    <div className="grid gap-card">
      <div className="grid gap-card lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Tile>
          <Label>{slide.costLabel}</Label>
          {slide.costs.map((cost) => (
            <div key={cost.label} className="mt-6">
              <h3 className="text-xl font-semibold tracking-tight text-cream">{cost.label}</h3>
              <ul className="mt-2">
                {cost.groups.map((group) => (
                  <li key={group.label} className="border-t py-3 last:pb-0" style={{ borderColor: RULE }}>
                    <p className="text-copy font-semibold" style={{ color: ACCENT_INK }}>
                      {group.label}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li key={item} className="sf-chip rounded-full px-3 py-1 text-note text-ink">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Tile>

        <div className="grid content-start gap-card">
          <Tile delay={80}>
            <Label>{slide.sheetLabel}</Label>
            <div className="mt-4 grid gap-3">
              {slide.sheets.map((sheet) => (
                <Paper key={sheet.src} className="p-2">
                  <img src={sheet.src} alt="" loading="lazy" className="block h-auto w-full" style={{ aspectRatio: sheet.ratio }} />
                </Paper>
              ))}
            </div>
          </Tile>

          <ul className="grid gap-card sm:grid-cols-3">
            {slide.scenarios.map((scenario, i) => (
              <Tile as="li" key={scenario.npv} lit={scenario.lit} pad="p-6" delay={(i + 2) * 80}>
                <Label accent={scenario.lit}>{scenario.name}</Label>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-cream">{scenario.pbp}</p>
                <p className="text-note text-fog">{slide.rowLabels.pbp}</p>
                <dl className="mt-4 border-t pt-4" style={{ borderColor: RULE }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <dt className="text-note text-fog">{slide.rowLabels.npv}</dt>
                    <dd className="text-copy font-semibold text-ink">{scenario.npv}</dd>
                  </div>
                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-2">
                    <dt className="text-note text-fog">{slide.rowLabels.irr}</dt>
                    <dd className="text-copy font-semibold text-ink">{scenario.irr}</dd>
                  </div>
                </dl>
              </Tile>
            ))}
          </ul>
        </div>
      </div>

      <Tile lit>
        <p className="text-2xl font-semibold tracking-tight text-cream">{slide.conclusion}</p>
      </Tile>
    </div>
  )
}

// --- the switchboard ------------------------------------------------------------

const BOARDS = {
  background: Background,
  research: Research,
  interview: Interview,
  task: Task,
  cases: Cases,
  persona: Persona,
  overview: Overview,
  app: AppDesign,
  planting: Planting,
  community: Community,
  booking: Booking,
  space: Space,
  journey: Journey,
  visual: Visual,
  dcf: Dcf,
}

export default function SlowFoodDeck({ slide }) {
  const Board = BOARDS[slide.kind]
  if (!Board) return null
  return (
    <div className="sf-deck mt-visual">
      <Board slide={slide} />
    </div>
  )
}
