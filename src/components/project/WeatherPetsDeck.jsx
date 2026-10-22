import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

// The WeatherPets case-study deck, rebuilt in the page — one board per slide, laid
// out the way the Kyrall boards are: on the page's own surface, under the section's
// eyebrow, with the page's hero carrying the opening.
//
// The source slides are 1920×1080 artboards. Scaling one of those down to a reading
// column would put the body copy at about 10px, so nothing here is scaled: each slide
// is rebuilt out of real boxes and real text, which is also what lets every grid
// collapse to a single column on a phone. What survives from the deck is its
// composition — the card grid per slide, and one accent card carrying the point.
// Content lives in src/data/weatherPetsDeck.js; colour in `.wp-deck` in index.css.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px), nothing
// below `text-note` (18px). That is why these boards run taller than their 16:9 source
// — the deck's own 18-to-22px-on-1920 copy would be unreadable at this width.

// The matrix marks a feature with a tick or a dash, which say nothing to a screen
// reader. These are module constants so `localize` can cache them by identity.
const HAS = tt("Yes", "有")
const HAS_NOT = tt("No", "无")

// --- primitives --------------------------------------------------------------

// Card surfaces. A card sets the four variables its contents read, so the same
// primitives work on the page's own box and on the one yellow card per slide that
// carries the slide's point — on yellow the quiet grey and the accent blue would
// both disappear, so each tone names its own.
const SURFACE = {
  // The ordinary card: the page's own box, with the page's own hairline.
  box: {
    background: "var(--color-box)",
    color: "var(--color-ink)",
    boxShadow: "inset 0 0 0 1px var(--color-line)",
    "--wp-quiet": "var(--color-fog)",
    "--wp-strong": "var(--wp-blue)",
    "--wp-soft": "var(--color-box-2)",
    "--wp-inset": "var(--color-box-2)",
  },
  // The slide's accent card. Its fill is the same in both themes, so everything on
  // it is set in the deck's navy rather than the page's ink.
  accent: {
    background: "var(--wp-accent)",
    color: "var(--wp-on-fill)",
    "--wp-quiet": "rgba(15, 27, 76, 0.66)",
    "--wp-strong": "#1a3bd6",
    "--wp-soft": "rgba(255, 255, 255, 0.5)",
    "--wp-inset": "rgba(255, 255, 255, 0.78)",
  },
}

// The three label fills. They do not flip with the theme — they are small, saturated
// and always set in the deck's navy, which reads on them on cream and on near-black.
const LABEL = {
  pink: "var(--wp-pink)",
  mint: "var(--wp-mint)",
  accent: "var(--wp-accent)",
  blue: "var(--wp-blue)",
  quiet: "var(--color-box-2)",
}

function Card({ tone = "box", className = "", children, style }) {
  return (
    <div className={`rounded-2xl p-5 sm:p-6 ${className}`} style={{ ...SURFACE[tone], ...style }}>
      {children}
    </div>
  )
}

function CardTitle({ children, className = "" }) {
  return <h3 className={`text-2xl font-semibold leading-tight ${className}`}>{children}</h3>
}

function Sub({ children, className = "" }) {
  return (
    <p className={`text-note leading-relaxed ${className}`} style={{ color: "var(--wp-quiet)" }}>
      {children}
    </p>
  )
}

function Body({ children, className = "" }) {
  return <p className={`text-copy leading-relaxed ${className}`}>{children}</p>
}

// A label chip. `tone` paints the fill; the ink is always the deck's navy, which is
// what the slides do — none of these fills is dark enough to need reversing out.
function Chip({ tone = "quiet", children, className = "" }) {
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-3 py-1 text-note font-medium leading-snug ${className}`}
      style={{
        background: LABEL[tone],
        // The three saturated fills are light in both themes and keep the deck's navy;
        // a quiet chip is the page's own box, so it takes the page's ink.
        color: tone === "quiet" ? "var(--color-ink)" : "var(--wp-on-fill)",
      }}
    >
      {children}
    </span>
  )
}

// A small numbered disc — the slides use these for ordered lists and annotations.
function Disc({ children, tone = "blue", size = "md" }) {
  const px = size === "sm" ? 28 : 36
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full text-note font-semibold"
      style={{
        width: px,
        height: px,
        background: tone === "blue" ? "var(--wp-blue)" : LABEL[tone],
        color: tone === "blue" ? "var(--color-page)" : "var(--wp-on-fill)",
      }}
    >
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="my-5 border-0 border-t" style={{ borderColor: "rgba(15,27,76,0.12)" }} />
}

// An artwork tile. The renders are transparent PNGs, so they sit on whatever the card
// gives them; `contain` keeps every pet whole rather than cropping to a square.
function Art({ src, alt, className = "", style }) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      className={`block h-full w-full object-contain ${className}`}
      style={style}
    />
  )
}

// A phone screen with its caption. The shots are 220×490 artboard frames exported at
// 2×, so they are given their own aspect ratio and allowed to shrink with the column.
function Shot({ src, caption, className = "" }) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="overflow-hidden rounded-xl" style={{ background: "var(--wp-soft)" }}>
        <img src={src} alt={caption ?? ""} loading="lazy" className="block h-auto w-full" />
      </div>
      {caption && (
        <figcaption
          className="mt-2.5 text-note leading-snug"
          style={{ color: "var(--wp-quiet)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// An arrow between steps. It points right while the steps sit in a row and turns to
// point down once they stack, which is the only way the sequence still reads on a phone.
function Arrow({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center text-2xl leading-none ${className}`}
      style={{ color: "var(--wp-blue)" }}
    >
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
    </span>
  )
}

// --- the board shell ---------------------------------------------------------

// A slide, on the page rather than on a panel. The page has already set the section's
// eyebrow ("02 · Overview") and keeps its heading for the chapter index; the board
// opens with the slide's own headline and standfirst, the way the Kyrall boards do.
function Board({ slide, children }) {
  return (
    <div className="wp-deck mt-4">
      <h3 className="text-2xl font-semibold leading-tight text-cream sm:text-3xl">
        {slide.title}
      </h3>
      {slide.lead && <p className="mt-3 max-w-3xl text-copy leading-relaxed text-fog">{slide.lead}</p>}
      <div className="mt-7">{children}</div>
    </div>
  )
}

// --- 02 · Overview -----------------------------------------------------------

function Overview({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
      <Card>
        {slide.rows.map((row, i) => (
          <div key={row.label}>
            {i > 0 && <Divider />}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
              <Chip tone={row.tone} className="self-start">
                {row.label}
              </Chip>
              <Body className="min-w-0 flex-1">{row.text}</Body>
            </div>
          </div>
        ))}
      </Card>

      <div className="grid gap-4 content-start">
        <Card>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <CardTitle>{slide.role.title}</CardTitle>
            <Chip>{slide.role.pill}</Chip>
          </div>
          <ul className="mt-4 space-y-2">
            {slide.role.items.map((item) => (
              <li key={item} className="flex gap-2.5 text-copy leading-relaxed">
                <span aria-hidden="true" style={{ color: "var(--wp-blue)" }}>
                  ·
                </span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>{slide.team.title}</CardTitle>
          <div className="mt-4 flex flex-wrap gap-2">
            {slide.team.pills.map((pill, i) => (
              <Chip key={pill} tone={i === 2 ? "accent" : "quiet"}>
                {pill}
              </Chip>
            ))}
          </div>
        </Card>
      </div>

      {/* The process, start to finish. It wraps rather than scrolls — a seven-step
          sequence reads fine on two or three lines, and nothing is hidden off-screen. */}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5 lg:col-span-2">
        {slide.steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className="rounded-full px-4 py-2 text-note font-medium"
              style={{
                background: i === slide.steps.length - 1 ? "var(--wp-accent)" : "var(--wp-inset)",
                color: "var(--wp-on-fill)",
              }}
            >
              {step}
            </span>
            {i < slide.steps.length - 1 && (
              <span aria-hidden="true" style={{ color: "var(--color-fog)" }}>
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

// --- 03 · Background ---------------------------------------------------------

// A stacked proportion bar. The segments are percentages of the same row, so they are
// given flex-grow weights rather than widths and the row stays exact at any size.
function StackedBar({ segments, className = "" }) {
  return (
    <div className={`flex h-11 overflow-hidden rounded-lg ${className}`}>
      {segments.map((seg, i) => (
        <div
          key={i}
          className="flex min-w-0 items-center px-3 text-note font-medium"
          style={{
            flex: `${seg.pct} 1 0%`,
            background: LABEL[seg.tone],
            color: seg.tone === "blue" ? "var(--color-page)" : "var(--wp-on-fill)",
          }}
        >
          {/* Only the dominant segment is labelled in place. A 5% slice has no room
              for a word, so the slide names the small ones in the legend instead. */}
          {i === 0 && <span className="truncate">{seg.label}</span>}
        </div>
      ))}
    </div>
  )
}

function Background({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
      <div className="grid gap-4 content-start">
        <div className="grid gap-4 sm:grid-cols-3">
          {slide.stats.map((stat) => (
            <Card key={stat.label} tone={stat.tone ?? "box"}>
              <p
                className="text-4xl font-bold tracking-tight"
                style={{ color: stat.tone === "accent" ? "var(--wp-on-fill)" : "var(--wp-strong)" }}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-note font-medium">{stat.label}</p>
            </Card>
          ))}
        </div>

        <Card>
          <CardTitle>{slide.revenue.title}</CardTitle>
          <StackedBar segments={slide.revenue.segments} className="mt-4" />
          <Sub className="mt-2 text-right">{slide.revenue.legend}</Sub>
          <Body className="mt-3">{slide.revenue.note}</Body>
        </Card>
      </div>

      <Card className="relative">
        {/* The cloud sticker, peeking over the card's shoulder the way it does in the
            deck. Hidden below `sm`, where there is no shoulder to peek over. */}
        <img
          src={slide.expectations.sticker}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -right-3 -top-10 hidden h-24 w-auto sm:block"
        />
        <CardTitle>{slide.expectations.title}</CardTitle>
        <Sub className="mt-1.5">{slide.expectations.sub}</Sub>
        <ol className="mt-5 space-y-4">
          {slide.expectations.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3">
              <Disc tone="accent">{i + 1}</Disc>
              <Body className="min-w-0 flex-1 font-medium">{item}</Body>
            </li>
          ))}
        </ol>
        <Divider />
        <Sub>{slide.expectations.note}</Sub>
      </Card>

      <Card tone="accent" className="relative flex items-center gap-4 lg:col-span-2">
        <div className="min-w-0 flex-1">
          <p className="text-note font-bold" style={{ color: "var(--wp-strong)" }}>
            {slide.hmw.label}
          </p>
          <p className="mt-2 max-w-3xl text-2xl font-bold leading-snug sm:text-3xl">{slide.hmw.text}</p>
        </div>
        <img
          src={slide.hmw.sticker}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none hidden h-28 w-auto shrink-0 sm:block"
        />
      </Card>

      <p className="text-note lg:col-span-2" style={{ color: "var(--color-fog)" }}>
        {slide.source}
      </p>
    </div>
  )
}

// --- 04 · Research -----------------------------------------------------------

function Research({ slide }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {slide.methods.map((m) => (
          <Card key={m.label}>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span
                className="text-4xl font-bold tracking-tight"
                style={{ color: "var(--wp-strong)" }}
              >
                {m.value}
              </span>
              <span className="text-copy font-semibold">{m.label}</span>
            </div>
            <Sub className="mt-3">{m.note}</Sub>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <Card className="flex flex-col">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <CardTitle>{slide.why.title}</CardTitle>
            <Sub>{slide.why.sub}</Sub>
          </div>
          {/* The label column is capped so the track keeps most of the width — the
              bars are the chart, and an `auto` label column eats them alive. */}
          <ul className="mt-5 space-y-4">
            {slide.why.bars.map((bar) => (
              <li
                key={bar.label}
                className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3"
              >
                <span className="text-note font-medium">{bar.label}</span>
                <span
                  className="h-8 overflow-hidden rounded-md"
                  style={{ background: "var(--wp-soft)" }}
                >
                  <span
                    className="block h-full rounded-md"
                    style={{
                      width: `${bar.pct}%`,
                      background: bar.tone === "accent" ? "var(--wp-accent)" : "var(--wp-blue)",
                    }}
                  />
                </span>
                <span className="text-copy font-bold" style={{ color: "var(--wp-strong)" }}>
                  {bar.pct}%
                </span>
              </li>
            ))}
          </ul>
          <Body className="mt-auto pt-5 font-medium" style={{ color: "var(--wp-strong)" }}>
            {slide.why.note}
          </Body>
        </Card>

        <Card className="flex flex-col">
          <CardTitle>{slide.what.title}</CardTitle>
          <p
            className="mt-3 text-5xl font-bold tracking-tight"
            style={{ color: "var(--wp-strong)" }}
          >
            {slide.what.big}
          </p>
          <p className="mt-2 text-copy font-medium">{slide.what.bigLabel}</p>
          <div className="mt-4 flex h-7 overflow-hidden rounded-md">
            {slide.what.segments.map((seg, i) => (
              <span key={i} style={{ flex: `${seg.pct} 1 0%`, background: LABEL[seg.tone] }} />
            ))}
          </div>
          <Sub className="mt-2">{slide.what.legend}</Sub>
          <Body className="mt-4">{slide.what.note}</Body>
          <Sub className="mt-auto pt-4">{slide.what.source}</Sub>
        </Card>

        <Card className="flex flex-col">
          <CardTitle>{slide.how.title}</CardTitle>
          <ul className="mt-5 space-y-5">
            {slide.how.items.map((item) => (
              <li key={item.problem}>
                <Chip tone="pink">{item.tag}</Chip>
                <p className="mt-2.5 text-copy font-medium">{item.problem}</p>
                <p className="mt-1 text-note" style={{ color: "var(--wp-strong)" }}>
                  → {item.fix}
                </p>
              </li>
            ))}
          </ul>
          <Sub className="mt-auto pt-5">{slide.how.note}</Sub>
        </Card>
      </div>
    </div>
  )
}

// --- 05 · Competitors --------------------------------------------------------

function Competitors({ slide }) {
  const t = useT()
  // Seven products across is wider than a reading column at 18px, so the matrix keeps
  // its own width and scrolls inside the card. The page itself never scrolls sideways.
  // The matrix is the slide, so it takes the full column and the three takeaways run
  // underneath it. Side by side they would squeeze the table into a permanent
  // horizontal scroll; at full width it fits outright on a laptop.
  return (
    <div className="grid gap-4">
      <Card className="min-w-0">
        <div className="-mx-1 overflow-x-auto px-1">
          {/* Fixed layout: with `auto`, a long row label steals width from the product
              columns until the ticks collide. Eleven rem for the labels and six and a
              half for each of the seven products is what the content actually needs. */}
          <table className="w-full min-w-[57rem] table-fixed border-collapse text-left">
            <colgroup>
              <col style={{ width: "11rem" }} />
              {slide.columns.map((col) => (
                <col key={col.name} style={{ width: "6.5rem" }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th className="pb-3 pr-3" />
                {slide.columns.map((col) => (
                  <th
                    key={col.name}
                    scope="col"
                    className="px-3 pb-3 align-bottom font-semibold"
                    style={col.highlight ? { background: "rgba(255,212,59,0.22)" } : undefined}
                  >
                    <span
                      className="block text-note leading-snug"
                      style={{ color: col.highlight ? "var(--wp-strong)" : "var(--wp-on-fill)" }}
                    >
                      {col.name}
                    </span>
                    <span className="block text-note font-normal" style={{ color: "var(--wp-quiet)" }}>
                      {col.region}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.rows.map((row) => (
                <tr key={row.label} className="border-t" style={{ borderColor: "rgba(15,27,76,0.1)" }}>
                  <th scope="row" className="py-3 pr-3 text-note font-semibold">
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      className="px-3 py-3 text-note"
                      style={
                        slide.columns[i].highlight ? { background: "rgba(255,212,59,0.22)" } : undefined
                      }
                    >
                      {cell === true ? (
                        <span
                          aria-label={t(HAS)}
                          className="inline-flex size-7 items-center justify-center rounded-full font-semibold"
                          style={{ background: "var(--wp-mint)", color: "var(--wp-on-fill)" }}
                        >
                          ✓
                        </span>
                      ) : cell === false ? (
                        <span aria-label={t(HAS_NOT)} style={{ color: "var(--wp-quiet)" }}>
                          —
                        </span>
                      ) : (
                        <span style={{ color: "var(--wp-strong)" }}>{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Sub className="mt-4">{slide.legend}</Sub>
      </Card>

      <div className="grid gap-4 content-start sm:grid-cols-3">
        {slide.takeaways.map((item) => (
          <Card key={item.no} tone={item.tone ?? "box"}>
            <div className="flex items-baseline gap-3">
              <span
                className="text-2xl font-bold"
                style={{ color: item.tone === "accent" ? "var(--wp-on-fill)" : "var(--wp-strong)" }}
              >
                {item.no}
              </span>
              <CardTitle>{item.title}</CardTitle>
            </div>
            <Body className="mt-3">{item.text}</Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

// --- 06 · Insights -----------------------------------------------------------

function Insights({ slide }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-3">
        {slide.cards.map((card) => (
          <Card key={card.title} className="flex flex-col">
            <Chip tone={card.tone} className="self-start">
              {card.tag}
            </Chip>
            <CardTitle className="mt-4">{card.title}</CardTitle>
            <Body className="mt-3">{card.text}</Body>
            <figure className="mt-auto rounded-xl p-4" style={{ background: "var(--wp-soft)" }}>
              <blockquote className="text-copy font-medium leading-relaxed" style={{ color: "var(--wp-strong)" }}>
                {card.quote}
              </blockquote>
              <figcaption className="mt-3 text-note" style={{ color: "var(--wp-quiet)" }}>
                {card.by}
              </figcaption>
            </figure>
          </Card>
        ))}
      </div>

      <Card>
        <div className="grid gap-5 lg:grid-cols-[1.3fr_auto_1fr] lg:items-center">
          <div className="min-w-0">
            <CardTitle>{slide.pains.title}</CardTitle>
            <ul className="mt-4 flex flex-wrap gap-2">
              {slide.pains.items.map((item) => (
                <li key={item}>
                  <Chip>{item}</Chip>
                </li>
              ))}
            </ul>
          </div>
          <Arrow />
          <div className="min-w-0 rounded-xl p-4" style={{ background: "var(--wp-accent)" }}>
            <p className="text-note font-bold" style={{ color: "var(--wp-strong)" }}>
              {slide.pains.opportunity.label}
            </p>
            <p className="mt-1.5 text-copy font-semibold leading-relaxed">
              {slide.pains.opportunity.text}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

// --- 07 · Co-creation --------------------------------------------------------

function CoCreation({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="grid gap-4 content-start">
        {slide.rounds.map((round) => (
          <Card key={round.tag}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <Chip tone={round.tone}>{round.tag}</Chip>
              <CardTitle className="min-w-0 flex-1">{round.hmw}</CardTitle>
            </div>

            <Sub className="mt-5">{round.clusterLabel}</Sub>
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {round.clusters.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>

            {round.voted && (
              <>
                <Sub className="mt-5">{round.votedLabel}</Sub>
                <ol className="mt-2.5 space-y-2.5">
                  {round.voted.map((v, i) => (
                    <li key={v} className="flex items-start gap-3">
                      <Disc size="sm">{i + 1}</Disc>
                      <span className="min-w-0 text-copy leading-relaxed">{v}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}

            {round.closing && (
              <Body className="mt-5 font-medium" style={{ color: "var(--wp-strong)" }}>
                {round.closing}
              </Body>
            )}
          </Card>
        ))}
      </div>

      <div className="grid gap-4 content-start">
        <h4 className="text-2xl font-semibold" style={{ color: "var(--color-cream)" }}>
          {slide.featuresTitle}
        </h4>
        {slide.features.map((f) => (
          <Card key={f.no} tone={f.tone ?? "box"}>
            <div className="flex items-start gap-4">
              <div
                className="size-24 shrink-0 overflow-hidden rounded-xl p-1.5"
                style={{ background: f.tone === "accent" ? "var(--wp-accent)" : "var(--wp-soft)" }}
              >
                <Art src={f.art} alt="" />
              </div>
              <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold" style={{ color: "var(--wp-strong)" }}>
                    {f.no}
                  </span>
                  <CardTitle>{f.title}</CardTitle>
                </div>
                <Body className="mt-2">{f.text}</Body>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// --- 08 · Pivot --------------------------------------------------------------

function Pivot({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
      <Card>
        <ol className="relative">
          {/* The spine. It stops short of the last disc so it reads as a path with an
              end rather than a rule that runs off the bottom of the card. */}
          <span
            aria-hidden="true"
            className="absolute bottom-8 left-[17px] top-8 w-0.5"
            style={{ background: "var(--wp-soft)" }}
          />
          {slide.timeline.map((item, i) => (
            <li key={item.step} className="relative flex items-start gap-4 pb-7 last:pb-0">
              <Disc tone={i === slide.timeline.length - 1 ? "accent" : "blue"}>{i + 1}</Disc>
              <div className="min-w-0 flex-1">
                <CardTitle>{item.step}</CardTitle>
                <Body className="mt-2">{item.text}</Body>
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
          <div className="min-w-0">
            <CardTitle>{slide.pairs.title}</CardTitle>
            <Sub className="mt-1.5">{slide.pairs.sub}</Sub>
          </div>
          <ul className="flex shrink-0 flex-wrap gap-2">
            {slide.pairs.legend.map((l) => (
              <li key={l.label}>
                <Chip tone={l.tone}>{l.label}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {slide.pairs.images.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-xl">
              <img src={img.src} alt={img.alt} loading="lazy" className="block h-auto w-full" />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// --- 09 · Iteration ----------------------------------------------------------

function Iteration({ slide }) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        {slide.panels.map((panel) => (
          <Card key={panel.tag}>
            <Chip tone={panel.tone ?? "quiet"}>{panel.tag}</Chip>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {panel.shots.map((shot) => (
                <Shot key={shot.src} src={shot.src} caption={shot.caption} />
              ))}
            </div>
          </Card>
        ))}
      </div>
      <ul className="flex flex-wrap gap-2">
        {slide.changes.map((c) => (
          <li key={c}>
            <span
              className="inline-block rounded-full px-4 py-2 text-note font-medium text-ink"
              style={{ background: "var(--color-box)", boxShadow: "inset 0 0 0 1px var(--color-line)" }}
            >
              {c}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- 10 · AI generation ------------------------------------------------------

function AiFlow({ slide }) {
  // The slide stacks the happy path over the pipeline over the three decisions. Kept
  // as the deck's two columns, the four pipeline nodes and the three decision cards
  // would each land in about 150px and break into a column of single words, so the
  // two strips of phone screens share the top row and the rest runs full width.
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          {/* Three screens with the flow arrows between them. The arrows are their own
              grid cells, so the row can break to one column without them floating. */}
          <div className="grid items-center gap-3 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <Shot src={slide.shots[0].src} caption={slide.shots[0].caption} />
            <Arrow />
            <Shot src={slide.shots[1].src} caption={slide.shots[1].caption} />
            <Arrow />
            <Shot src={slide.shots[2].src} caption={slide.shots[2].caption} />
          </div>
        </Card>

        <Card>
          <CardTitle>{slide.edges.title}</CardTitle>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {slide.edges.shots.map((shot) => (
              <Shot key={shot.src} src={shot.src} caption={shot.caption} />
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle>{slide.pipeline.title}</CardTitle>
        <ol className="mt-5 grid items-stretch gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {slide.pipeline.nodes.map((node, i) => (
            <li key={node} className="contents">
              <div
                className="flex items-center justify-center rounded-xl px-3 py-4 text-center text-note font-medium leading-snug"
                style={{
                  background:
                    i === slide.pipeline.nodes.length - 1 ? "var(--wp-accent)" : "var(--wp-soft)",
                  color: i === slide.pipeline.nodes.length - 1 ? "var(--wp-on-fill)" : "inherit",
                }}
              >
                {node}
              </div>
              {i < slide.pipeline.nodes.length - 1 && <Arrow className="justify-self-center" />}
            </li>
          ))}
        </ol>
        <Sub className="mt-4">{slide.pipeline.note}</Sub>
      </Card>

      <div className="grid items-start gap-4 sm:grid-cols-3">
        {slide.decisions.map((d) => (
          <Card key={d.title} tone={d.tone ?? "box"}>
            <CardTitle>{d.title}</CardTitle>
            <Body className="mt-2.5">{d.text}</Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

// --- 11 · Home screen --------------------------------------------------------

function Annotation({ item }) {
  return (
    <Card>
      <div className="flex items-start gap-3">
        <Disc>{item.no}</Disc>
        <div className="min-w-0">
          <CardTitle>{item.title}</CardTitle>
          <Body className="mt-2">{item.text}</Body>
        </div>
      </div>
    </Card>
  )
}

function HomeScreen({ slide }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_auto_1fr] xl:items-start">
      <div className="grid gap-4 content-start">
        {slide.left.map((item) => (
          <Annotation key={item.no} item={item} />
        ))}
      </div>

      {/* The key visual. It keeps its own width on the wide layout — a phone stretched
          to a third of the board would read as a tablet — and centres when stacked. */}
      <figure className="relative mx-auto w-full max-w-[18rem] xl:w-72">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/3 size-64 -translate-x-1/2 rounded-full"
          style={{ background: "var(--wp-accent)", opacity: 0.85 }}
        />
        <img
          src={slide.shot}
          alt=""
          loading="lazy"
          className="relative block h-auto w-full rounded-[1.75rem] shadow-xl"
        />
      </figure>

      <div className="grid gap-4 content-start">
        {slide.right.map((item) => (
          <Annotation key={item.no} item={item} />
        ))}
        <Card tone="accent">
          <CardTitle>{slide.outfits.title}</CardTitle>
          <ul className="mt-4 grid grid-cols-4 gap-2">
            {slide.outfits.images.map((img) => (
              <li key={img.src} className="aspect-[3/7]">
                <Art src={img.src} alt={img.alt} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}

// --- 12 · Testing ------------------------------------------------------------

function Testing({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <CardTitle>{slide.method.title}</CardTitle>

        <Chip tone="pink" className="mt-5">
          {slide.method.scriptTag}
        </Chip>
        <p
          className="mt-3 rounded-xl p-4 text-copy italic leading-relaxed"
          style={{ background: "var(--wp-soft)", color: "var(--wp-strong)" }}
        >
          {slide.method.script}
        </p>

        <Chip tone="mint" className="mt-6">
          {slide.method.bilingualTag}
        </Chip>
        <Body className="mt-3">{slide.method.bilingual}</Body>

        <Chip tone="accent" className="mt-6">
          {slide.method.recruitTag}
        </Chip>
        <ul className="mt-3 space-y-2">
          {slide.method.recruit.map((r) => (
            <li key={r} className="flex gap-2.5 text-copy leading-relaxed">
              <span aria-hidden="true" style={{ color: "var(--wp-blue)" }}>
                ·
              </span>
              <span className="min-w-0">{r}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <CardTitle>{slide.validate.title}</CardTitle>

        <Sub className="mt-5 font-semibold">{slide.validate.hypothesesLabel}</Sub>
        <ul className="mt-3 space-y-3">
          {slide.validate.hypotheses.map((h) => (
            <li key={h} className="flex items-start gap-3">
              <Disc tone="mint" size="sm">
                ?
              </Disc>
              <span className="min-w-0 text-copy leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        <Divider />

        <Sub className="font-semibold">{slide.validate.detailsLabel}</Sub>
        <ol className="mt-3 space-y-3">
          {slide.validate.details.map((d, i) => (
            <li key={d} className="flex items-start gap-3">
              <Disc size="sm">{i + 1}</Disc>
              <span className="min-w-0 text-copy leading-relaxed">{d}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card tone="accent" className="relative">
        <CardTitle>{slide.changes.title}</CardTitle>
        <ul className="mt-5 space-y-4">
          {slide.changes.items.map((item) => (
            <li key={item.result} className="rounded-xl p-4" style={{ background: "var(--wp-inset)" }}>
              <Sub className="font-semibold">{item.label}</Sub>
              <p className="mt-2 text-copy leading-relaxed">{item.text}</p>
              <p className="mt-3 text-copy font-bold" style={{ color: "var(--wp-strong)" }}>
                {item.result}
              </p>
            </li>
          ))}
        </ul>
        <img
          src={slide.changes.sticker}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none mt-4 ml-auto block h-28 w-auto"
        />
      </Card>
    </div>
  )
}

// --- 13 · Design to build ----------------------------------------------------

function Node({ title, sub, tone = "quiet" }) {
  return (
    <div
      className="rounded-xl px-4 py-3 text-center"
      style={{
        background: LABEL[tone] ?? "var(--wp-soft)",
        color: tone === "quiet" ? "var(--color-ink)" : "var(--wp-on-fill)",
      }}
    >
      <p className="text-copy font-semibold leading-snug">{title}</p>
      {sub && (
        <p className="mt-1 text-note leading-snug" style={{ color: "var(--wp-quiet)" }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function Build({ slide }) {
  const a = slide.architecture
  // The architecture takes the full column. Boxed into half of one, its nodes shrink
  // to about 140px and every label breaks into a column of single words.
  return (
    <div className="grid gap-4">
      <Card>
        <CardTitle>{a.title}</CardTitle>
        {/* The app sits above the backend, with the two services either side of it.
            On a narrow column the whole thing becomes one top-to-bottom chain, which
            is the same story told in one dimension instead of two. */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="sm:col-start-3">
              <Node title={a.app.title} sub={a.app.sub} tone="accent" />
            </div>
            <div
              aria-hidden="true"
              className="flex justify-center text-2xl leading-none sm:col-start-3"
              style={{ color: "var(--wp-blue)" }}
            >
              ↕
            </div>
            <div className="sm:col-start-1 sm:row-start-3">
              <Node title={a.sides[0].title} sub={a.sides[0].sub} />
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-2xl leading-none sm:col-start-2 sm:row-start-3"
              style={{ color: "var(--wp-blue)" }}
            >
              <span className="sm:hidden">↕</span>
              <span className="hidden sm:inline">⇄</span>
            </div>
            <div className="sm:col-start-3 sm:row-start-3">
              <Node title={a.backend.title} sub={a.backend.sub} />
            </div>
            <div
              aria-hidden="true"
              className="flex items-center justify-center text-2xl leading-none sm:col-start-4 sm:row-start-3"
              style={{ color: "var(--wp-blue)" }}
            >
              <span className="sm:hidden">↕</span>
              <span className="hidden sm:inline">⇄</span>
            </div>
            <div className="sm:col-start-5 sm:row-start-3">
              <Node title={a.sides[1].title} sub={a.sides[1].sub} />
            </div>
          </div>
        <Sub className="mt-5">{a.note}</Sub>
      </Card>

      <div className="grid items-start gap-4 lg:grid-cols-2">
      <Card tone="accent">
        <CardTitle>{slide.mvp.title}</CardTitle>
        <Body className="mt-3">{slide.mvp.text}</Body>
      </Card>

      <Card>
        <CardTitle>{slide.system.title}</CardTitle>
        <Sub className="mt-2">{slide.system.sub}</Sub>
        <ul className="mt-4 flex flex-wrap gap-2">
          {slide.system.pills.map((p) => (
            <li key={p}>
              <Chip>{p}</Chip>
            </li>
          ))}
        </ul>
        {/* The renders were exported with their Figma surface baked in, so the tile
            behind them is that exact value rather than a near miss. */}
        <ul className="mt-5 grid grid-cols-4 gap-2 rounded-xl p-3" style={{ background: "#DCEBFF" }}>
          {slide.system.images.map((img) => (
            <li key={img.src} className="aspect-[3/4]">
              <Art src={img.src} alt={img.alt} />
            </li>
          ))}
        </ul>
        <h4 className="mt-6 text-copy font-bold">{slide.system.engTitle}</h4>
        <ul className="mt-3 space-y-2">
          {slide.system.eng.map((e) => (
            <li key={e} className="flex gap-2.5 text-copy leading-relaxed">
              <span aria-hidden="true" style={{ color: "var(--wp-blue)" }}>
                ·
              </span>
              <span className="min-w-0">{e}</span>
            </li>
          ))}
        </ul>
      </Card>
      </div>
    </div>
  )
}

// --- 14 · After launch -------------------------------------------------------

// The install curve. Drawn in the data's own coordinates and stretched by the SVG's
// viewBox, with the axis labels and the callout pills kept as real HTML outside it —
// so the line scales with the card while nothing made of words ever does.
function InstallChart({ chart }) {
  const { points, max } = chart
  const last = points.length - 1
  const x = (i) => (i / last) * 100
  const y = (v) => (1 - v / max) * 100

  const line = points.map((v, i) => `${x(i)},${y(v)}`).join(" ")
  const area = `0,100 ${line} 100,100`

  // Eleven months of labels and a y axis need about 26rem before the months start
  // colliding, which is wider than a phone. Rather than shrink the type below the
  // page's floor, the plot keeps that width and scrolls inside the card.
  // `overflow-x: auto` clips vertically too, so the callouts need headroom inside the
  // scroll box — and one that sits near the ceiling is hung under its point instead
  // of over it, where there is no room left.
  return (
    <div className="-mx-1 mt-5 overflow-x-auto px-1 pt-9">
      <div className="min-w-[26rem]">
      <div className="flex gap-3">
        {/* Y axis. Laid out as a column of evenly spaced labels read bottom-up, which
            puts each one on its own gridline without any absolute positioning. */}
        <ul
          className="flex shrink-0 flex-col-reverse justify-between text-note"
          style={{ color: "var(--wp-quiet)", height: "16rem" }}
        >
          {chart.ticks.map((tick) => (
            <li key={tick} className="-translate-y-1/2 first:translate-y-0 last:translate-y-0">
              {tick.toLocaleString()}
            </li>
          ))}
        </ul>

        <div className="relative min-w-0 flex-1" style={{ height: "16rem" }}>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          >
            {chart.ticks.map((tick) => (
              <line
                key={tick}
                x1="0"
                x2="100"
                y1={y(tick)}
                y2={y(tick)}
                stroke="rgba(15,27,76,0.1)"
                strokeWidth="0.3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <polygon points={area} fill="var(--wp-blue)" opacity="0.12" />
            <polyline
              points={line}
              fill="none"
              stroke="var(--wp-blue)"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Dots and callouts, placed in percentages of the same box as the line. */}
          {points.map((v, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${x(i)}%`,
                top: `${y(v)}%`,
                background: "var(--wp-inset)",
                borderColor: "var(--wp-blue)",
              }}
            />
          ))}
          {chart.markers.map((m) => {
            const top = y(points[m.at])
            // A callout near either end is aligned to its own edge rather than
            // centred on its point, so it cannot hang off the side of the plot.
            const dx = m.at >= last - 1 ? "-100%" : m.at <= 1 ? "0" : "-50%"
            const dy = m.place === "below" ? "60%" : "-150%"
            return (
              <span
                key={m.at}
                className="absolute whitespace-nowrap rounded-full px-2.5 py-1 text-note font-medium"
                style={{
                  left: `${x(m.at)}%`,
                  top: `${top}%`,
                  transform: `translate(${dx}, ${dy})`,
                  background: LABEL[m.tone],
                  color: "var(--wp-on-fill)",
                }}
              >
                {m.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* X axis. Mirrors the plot's own left offset so the months line up under it. */}
      <div className="mt-2 flex gap-3">
        <span
          className="shrink-0 text-note opacity-0"
          aria-hidden="true"
          style={{ color: "var(--wp-quiet)" }}
        >
          {chart.ticks[chart.ticks.length - 1].toLocaleString()}
        </span>
        <ul
          className="flex min-w-0 flex-1 justify-between text-note"
          style={{ color: "var(--wp-quiet)" }}
        >
          {chart.months.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </div>
      <div className="mt-1 flex gap-3">
        <span
          className="shrink-0 text-note opacity-0"
          aria-hidden="true"
          style={{ color: "var(--wp-quiet)" }}
        >
          {chart.ticks[chart.ticks.length - 1].toLocaleString()}
        </span>
        <div className="flex min-w-0 flex-1 justify-between text-note" style={{ color: "var(--wp-quiet)" }}>
          <span>{chart.years[0]}</span>
          <span>{chart.years[1]}</span>
        </div>
      </div>
      </div>
    </div>
  )
}

function Aftermath({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
      <Card className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <CardTitle>{slide.chart.title}</CardTitle>
          <Sub>{slide.chart.sub}</Sub>
        </div>
        <InstallChart chart={slide.chart} />
        <p
          className="mt-5 rounded-xl p-4 text-copy font-medium leading-relaxed"
          style={{ background: "var(--wp-soft)", color: "var(--wp-strong)" }}
        >
          {slide.chart.read}
        </p>
      </Card>

      <div className="grid gap-4 content-start">
        <Card>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <CardTitle>{slide.reviews.title}</CardTitle>
            <Sub>{slide.reviews.sub}</Sub>
          </div>
          <ul className="mt-5 space-y-3">
            {slide.reviews.items.map((r, i) => (
              <li key={i} className="rounded-xl p-4" style={{ background: "var(--wp-soft)" }}>
                <p className="text-copy" style={{ color: "var(--wp-accent)" }}>
                  <span style={{ color: "#E8A800" }}>{"★".repeat(r.stars)}</span>
                  <span style={{ color: "var(--wp-quiet)" }}>{"☆".repeat(5 - r.stars)}</span>
                </p>
                <p className="mt-2 text-copy leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card tone="accent">
          <CardTitle>{slide.retro.title}</CardTitle>
          <Body className="mt-3">{slide.retro.text}</Body>
        </Card>
      </div>
    </div>
  )
}

// --- 15 · Outcome ------------------------------------------------------------

function Outcome({ slide }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <CardTitle>{slide.store.title}</CardTitle>
        <div className="mt-5 flex items-center gap-4">
          <img
            src={slide.store.icon}
            alt=""
            loading="lazy"
            className="size-20 shrink-0 rounded-2xl"
            style={{ background: "var(--wp-blue)" }}
          />
          <div className="min-w-0">
            <p className="text-2xl font-bold leading-tight">{slide.store.name}</p>
            <p className="mt-1.5 text-copy font-medium" style={{ color: "var(--wp-strong)" }}>
              {slide.store.publisher}
            </p>
          </div>
        </div>
        <ul className="mt-5 flex flex-wrap gap-2">
          {slide.store.pills.map((p) => (
            <li key={p}>
              <Chip>{p}</Chip>
            </li>
          ))}
        </ul>
        <p
          className="mt-5 rounded-xl p-4 text-copy leading-relaxed"
          style={{ background: "var(--wp-soft)", color: "var(--wp-strong)" }}
        >
          {slide.store.tagline}
        </p>
        <ul className="mt-5 space-y-2">
          {slide.store.facts.map((f) => (
            <li key={f} className="flex gap-2.5 text-copy leading-relaxed">
              <span aria-hidden="true" style={{ color: "var(--wp-blue)" }}>
                ·
              </span>
              <span className="min-w-0">{f}</span>
            </li>
          ))}
        </ul>
        <Sub className="mt-5">{slide.store.source}</Sub>
      </Card>

      <Card>
        <CardTitle>{slide.marketing.title}</CardTitle>
        <Sub className="mt-2">{slide.marketing.sub}</Sub>
        <img
          src={slide.marketing.banner}
          alt={slide.marketing.bannerAlt}
          loading="lazy"
          className="mt-4 block h-auto w-full rounded-xl"
        />
        <Sub className="mt-5 font-semibold">{slide.marketing.audienceLabel}</Sub>
        <ul className="mt-3 space-y-3">
          {slide.marketing.audiences.map((a) => (
            <li
              key={a.tag}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl p-4"
              style={{ background: "var(--wp-soft)" }}
            >
              <Chip tone={a.tone}>{a.tag}</Chip>
              <span className="min-w-0 flex-1 text-copy leading-relaxed">{a.text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-note font-bold" style={{ color: "var(--wp-strong)" }}>
          {slide.marketing.slogan}
        </p>
      </Card>

      <Card tone="accent">
        <CardTitle>{slide.reflectionsTitle}</CardTitle>
        <ul className="mt-5 space-y-3">
          {slide.reflections.map((r) => (
            <li key={r.no} className="rounded-xl p-4" style={{ background: "var(--wp-inset)" }}>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold" style={{ color: "var(--wp-strong)" }}>
                  {r.no}
                </span>
                <CardTitle>{r.title}</CardTitle>
              </div>
              <Body className="mt-2.5">{r.text}</Body>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

// --- the switchboard ---------------------------------------------------------

const BOARDS = {
  overview: Overview,
  background: Background,
  research: Research,
  competitors: Competitors,
  insights: Insights,
  cocreation: CoCreation,
  pivot: Pivot,
  iteration: Iteration,
  aiflow: AiFlow,
  homescreen: HomeScreen,
  testing: Testing,
  build: Build,
  aftermath: Aftermath,
  outcome: Outcome,
}

export default function WeatherPetsDeck({ slide }) {
  const Layout = BOARDS[slide.kind]
  if (!Layout) return null
  return (
    <Board slide={slide}>
      <Layout slide={slide} />
    </Board>
  )
}
