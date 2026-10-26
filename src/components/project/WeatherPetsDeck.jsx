import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

// The WeatherPets case-study deck, rebuilt in the page — one board per slide, drawn
// on the page's own surface under the section's eyebrow, with the page's hero
// carrying the opening.
//
// The source slides are 1920×1080 artboards tiled with cards. Scaling one of those
// down to a reading column would put the body copy at about 10px, so nothing here is
// scaled, and the cards are gone too: what the site does everywhere else is lay copy
// straight on the page with hairlines between rows, so every board here is a column
// of rows — a label on the left, the content on the right, the way the page's own
// definition lists and meta rows are set — and the grid collapses to one column on a
// phone. What survives from the deck is its palette, used as marks rather than as
// surfaces: the three label fills, the app's blue for numbers and rules, and a yellow
// highlighter run under the one line per board that holds its point. One boxed
// call-out per board at most, for the paragraph that is the board's conclusion.
// Content lives in src/data/weatherPetsDeck.js; colour in `.wp-deck` in index.css.
//
// Type follows the project-page rule in CLAUDE.md: body is `text-copy` (20px), nothing
// below `text-note` (18px). That is why these boards run taller than their 16:9 source
// — the deck's own 18-to-22px-on-1920 copy would be unreadable at this width.

// The matrix marks a feature with a tick or a dash, which say nothing to a screen
// reader. These are module constants so `localize` can cache them by identity.
const HAS = tt("Yes", "有")
const HAS_NOT = tt("No", "无")

// --- colour --------------------------------------------------------------------

const ACCENT = "var(--wp-accent)"
const BLUE = "var(--wp-blue)" // fills: discs, bars, rules
const BLUE_INK = "var(--wp-blue-ink)" // type
const ON_BLUE = "var(--wp-on-blue)"
const ON_FILL = "var(--wp-on-fill)"
const QUIET = "var(--wp-quiet)"
const TRAY = "var(--wp-tray)"

// The three label fills. They do not flip with the theme — they are small, saturated
// and always set in the deck's navy, which reads on them on cream and on near-black.
const FILL = {
  pink: "var(--wp-pink)",
  mint: "var(--wp-mint)",
  accent: ACCENT,
  blue: BLUE,
}

// --- primitives ------------------------------------------------------------------

// A coloured dot — the smallest way to carry a tone next to a label.
function Dot({ tone, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`wp-edge inline-block size-2.5 shrink-0 rounded-full ${className}`}
      style={{ background: FILL[tone] ?? FILL.blue }}
    />
  )
}

// A short rule in the app's blue, or in yellow for the one item a board turns on.
// See `.wp-edge` in index.css for why the yellow one is outlined on paper.
function Rule({ tone }) {
  return (
    <span
      aria-hidden="true"
      className="wp-edge block h-1.5 rounded-full"
      style={{ background: tone === "accent" ? ACCENT : BLUE }}
    />
  )
}

// A label chip. A toned chip takes one of the deck's fills and its navy; a quiet chip
// is the page's own box with the page's hairline and ink.
function Chip({ tone = "quiet", children, className = "" }) {
  const quiet = tone === "quiet"
  return (
    <span
      className={`inline-block shrink-0 rounded-full px-3 py-1 text-note font-medium leading-snug ${className}`}
      style={
        quiet
          ? {
              background: "var(--color-box)",
              color: "var(--color-ink)",
              boxShadow: "inset 0 0 0 1px var(--color-line)",
            }
          : { background: FILL[tone], color: ON_FILL }
      }
    >
      {children}
    </span>
  )
}

// A small numbered disc — the slides use these for ordered lists and annotations.
function Disc({ children, tone = "blue", size = "md" }) {
  const px = size === "sm" ? 28 : 36
  const blue = tone === "blue"
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 items-center justify-center rounded-full text-note font-semibold"
      style={{
        width: px,
        height: px,
        background: blue ? BLUE : FILL[tone],
        color: blue ? ON_BLUE : ON_FILL,
      }}
    >
      {children}
    </span>
  )
}

// The highlighter — see `.wp-hi` in index.css.
function Hi({ children }) {
  return <span className="wp-hi">{children}</span>
}

// A big figure, set in the site's display face and the app's blue.
function Num({ children, className = "" }) {
  return (
    <span
      className={`font-condensed leading-none tracking-normal ${className}`}
      style={{ color: BLUE_INK }}
    >
      {children}
    </span>
  )
}

function Body({ children, className = "", style }) {
  return (
    <p className={`text-copy leading-relaxed text-ink ${className}`} style={style}>
      {children}
    </p>
  )
}

function Note({ children, className = "" }) {
  return (
    <p className={`text-note leading-relaxed ${className}`} style={{ color: QUIET }}>
      {children}
    </p>
  )
}

// A bulleted list with the app's blue for the bullet.
function Bullets({ items, className = "" }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-copy leading-relaxed text-ink">
          <Dot tone="blue" className="mt-[0.6em]" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  )
}

// The deck's arrow. It points right while the things it joins sit in a row and turns
// to point down once they stack; `turn` names the breakpoint where the row forms.
const TURN = {
  sm: "rotate-90 sm:rotate-0",
  lg: "rotate-90 lg:rotate-0",
  down: "rotate-90",
}

function Arrow({ turn = "sm", className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center ${className}`}
      style={{ color: BLUE_INK }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" className={TURN[turn]}>
        <path
          d="M4 16h22M18 8l8 8-8 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

// An artwork tile. The renders are transparent PNGs, so they sit on whatever the tray
// gives them; `contain` keeps every pet whole rather than cropping to a square.
function Art({ src, alt, className = "" }) {
  return (
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      className={`block h-full w-full object-contain ${className}`}
    />
  )
}

// A phone screen with its caption, on the deck's pale tray. The shots are 220×490
// artboard frames exported at 2×, so they keep their own ratio and shrink with the
// column.
function Shot({ src, caption, className = "" }) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div className="overflow-hidden rounded-2xl p-2" style={{ background: TRAY }}>
        <img src={src} alt={caption ?? ""} loading="lazy" className="block h-auto w-full rounded-xl" />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-note leading-snug" style={{ color: QUIET }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// One of the deck's 3D stickers, kept out of the way of the copy.
function Sticker({ src, className = "" }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none block w-auto ${className}`}
    />
  )
}

// A row of the board: a label column on the left, the content on the right, a
// hairline above. Below `lg` the label stacks over the content. `chip` replaces the
// label with one of the deck's toned chips; `aside` is a sticker or a note that lives
// in the label column's spare height on the wide layout.
function Row({ title, sub, chip, tone, aside, children, className = "" }) {
  return (
    <section
      className={`grid gap-y-4 border-t border-line py-7 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[14rem_minmax(0,1fr)] ${className}`}
    >
      <div className="min-w-0">
        {chip ? (
          <div>{chip}</div>
        ) : (
          <h4 className="flex items-start gap-2.5 text-copy font-semibold leading-snug text-cream">
            {tone && <Dot tone={tone} className="mt-[0.5em]" />}
            <span className="min-w-0">{title}</span>
          </h4>
        )}
        {sub && (
          <p className="mt-1.5 text-note leading-relaxed" style={{ color: QUIET }}>
            {sub}
          </p>
        )}
        {aside && <div className="mt-5 hidden lg:block">{aside}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

// A big figure with its label under it, ruled off at the top in the app's blue — or
// in yellow for the one figure a board turns on.
function Stat({ value, label, note, tone }) {
  return (
    <div>
      <Rule tone={tone} />
      <Num className="mt-4 block text-5xl">{value}</Num>
      <p className="mt-3 text-copy font-medium leading-snug text-ink">{label}</p>
      {note && <Note className="mt-1">{note}</Note>}
    </div>
  )
}

// The board's point, said large and run under the highlighter.
function Point({ label, children, sticker, className = "" }) {
  return (
    <div className={`flex items-center gap-6 border-t border-line py-8 ${className}`}>
      <div className="min-w-0 flex-1">
        {label && (
          <p className="font-mono-tight text-note uppercase tracking-wide" style={{ color: BLUE_INK }}>
            {label}
          </p>
        )}
        <p className="mt-3 max-w-3xl text-2xl font-semibold leading-[1.45] text-cream sm:text-3xl">
          <Hi>{children}</Hi>
        </p>
      </div>
      {sticker && <Sticker src={sticker} className="hidden h-28 shrink-0 sm:block" />}
    </div>
  )
}

// The one boxed thing a board may have: the paragraph that is its conclusion. The
// box is the page's own (the hero's stat tiles are cut from the same cloth); the
// yellow lives in the label.
function Callout({ label, children, sticker, className = "" }) {
  return (
    <div
      className={`relative rounded-2xl bg-box p-5 sm:p-6 ${className}`}
      style={{ boxShadow: "inset 0 0 0 1px var(--color-line)" }}
    >
      <Chip tone="accent">{label}</Chip>
      <div className="mt-4 text-copy leading-relaxed text-ink">{children}</div>
      {sticker && (
        <Sticker src={sticker} className="absolute -top-12 right-4 hidden h-28 sm:block" />
      )}
    </div>
  )
}

// A stacked proportion bar. The segments are percentages of the same row, so they are
// given flex-grow weights rather than widths and the row stays exact at any size.
function StackedBar({ segments, className = "", labelled = true, height = "h-10" }) {
  return (
    <div className={`flex gap-0.5 ${height} ${className}`}>
      {segments.map((seg, i) => (
        <div
          key={i}
          className="wp-edge flex min-w-0 items-center rounded-md px-3 text-note font-medium"
          style={{
            flex: `${seg.pct} 1 0%`,
            background: FILL[seg.tone],
            color: seg.tone === "blue" ? ON_BLUE : ON_FILL,
          }}
        >
          {/* Only the dominant segment is labelled in place. A 5% slice has no room
              for a word, so the slide names the small ones in the legend instead. */}
          {labelled && i === 0 && seg.label && <span className="truncate">{seg.label}</span>}
        </div>
      ))}
    </div>
  )
}

// --- the board shell -------------------------------------------------------------

// A slide, on the page rather than on a panel. The page has already set the section's
// eyebrow ("02 · Overview") and keeps its heading for the chapter index; the board
// opens with the slide's own headline and standfirst.
function Board({ slide, children }) {
  return (
    <div className="wp-deck mt-4">
      <h3 className="max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-cream sm:text-4xl">
        {slide.title}
      </h3>
      {slide.lead && (
        <p className="mt-4 max-w-3xl text-copy leading-relaxed" style={{ color: QUIET }}>
          {slide.lead}
        </p>
      )}
      <div className="mt-8">{children}</div>
    </div>
  )
}

// --- 02 · Overview ---------------------------------------------------------------

function Overview({ slide }) {
  return (
    <div>
      {slide.rows.map((row) => (
        <Row key={row.label} chip={<Chip tone={row.tone}>{row.label}</Chip>}>
          <Body className={row.tone === "accent" ? "font-medium" : ""}>{row.text}</Body>
        </Row>
      ))}

      <Row title={slide.role.title}>
        <div className="mb-4">
          <Chip tone="accent">{slide.role.pill}</Chip>
        </div>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {slide.role.items.map((item) => (
            <li key={item} className="flex gap-3 text-copy leading-relaxed text-ink">
              <Dot tone="blue" className="mt-[0.6em]" />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </Row>

      <Row title={slide.team.title}>
        <ul className="flex flex-wrap gap-2">
          {slide.team.pills.map((pill, i) => (
            <li key={pill}>
              <Chip tone={i === 2 ? "accent" : "quiet"}>{pill}</Chip>
            </li>
          ))}
        </ul>
      </Row>

      {/* The process, start to finish. It wraps rather than scrolls — a seven-step
          sequence reads fine on two or three lines, and nothing is hidden off-screen. */}
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-line pt-7">
        {slide.steps.map((step, i) => {
          const last = i === slide.steps.length - 1
          return (
            <li key={step} className="flex items-center gap-3">
              <span className="flex items-center gap-2.5">
                <Disc size="sm" tone={last ? "accent" : "blue"}>
                  {i + 1}
                </Disc>
                <span className="text-note font-medium text-ink">{step}</span>
              </span>
              {!last && <span aria-hidden="true" className="h-px w-5 bg-line" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// --- 03 · Background -------------------------------------------------------------

function Background({ slide }) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {slide.stats.map((stat) => (
          <Stat key={stat.label} value={stat.value} label={stat.label} tone={stat.tone} />
        ))}
      </div>

      <Row title={slide.revenue.title} className="mt-8">
        <StackedBar segments={slide.revenue.segments} />
        <Note className="mt-2 text-right">{slide.revenue.legend}</Note>
        <Body className="mt-4">{slide.revenue.note}</Body>
      </Row>

      <Row
        title={slide.expectations.title}
        sub={slide.expectations.sub}
        aside={<Sticker src={slide.expectations.sticker} className="h-24" />}
      >
        <ol className="space-y-4">
          {slide.expectations.items.map((item, i) => (
            <li key={item} className="flex items-start gap-3">
              <Disc tone="accent">{i + 1}</Disc>
              <Body className="min-w-0 flex-1 font-medium">{item}</Body>
            </li>
          ))}
        </ol>
        <Note className="mt-5">{slide.expectations.note}</Note>
      </Row>

      <Point label={slide.hmw.label} sticker={slide.hmw.sticker}>
        {slide.hmw.text}
      </Point>

      <Note className="border-t border-line pt-5">{slide.source}</Note>
    </div>
  )
}

// --- 04 · Research ---------------------------------------------------------------

function Research({ slide }) {
  return (
    <div>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 lg:grid-cols-4">
        {slide.methods.map((m) => (
          <Stat key={m.label} value={m.value} label={m.label} note={m.note} />
        ))}
      </div>

      <Row title={slide.why.title} sub={slide.why.sub} className="mt-8">
        {/* The label column is capped so the track keeps most of the width — the bars
            are the chart, and an `auto` label column eats them alive. */}
        <ul className="space-y-3.5">
          {slide.why.bars.map((bar) => (
            <li key={bar.label} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3">
              <span className="text-note font-medium leading-snug text-ink">{bar.label}</span>
              <span className="h-8 overflow-hidden rounded-md" style={{ background: TRAY }}>
                <span
                  className="wp-edge block h-full rounded-md"
                  style={{ width: `${bar.pct}%`, background: bar.tone === "accent" ? ACCENT : BLUE }}
                />
              </span>
              <Num className="text-2xl">{bar.pct}%</Num>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-copy font-semibold leading-[1.6] text-cream">
          <Hi>{slide.why.note}</Hi>
        </p>
      </Row>

      <Row title={slide.what.title} sub={slide.what.source}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <Num className="text-5xl">{slide.what.big}</Num>
          <span className="text-copy font-medium text-ink">{slide.what.bigLabel}</span>
        </div>
        <StackedBar segments={slide.what.segments} className="mt-4" height="h-5" labelled={false} />
        <Note className="mt-2">{slide.what.legend}</Note>
        <Body className="mt-4">{slide.what.note}</Body>
      </Row>

      <Row title={slide.how.title} sub={slide.how.note}>
        <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-3">
          {slide.how.items.map((item) => (
            <li key={item.problem}>
              <Chip tone="pink">{item.tag}</Chip>
              <p className="mt-3 text-copy font-medium leading-snug text-ink">{item.problem}</p>
              <p className="mt-1.5 text-note leading-relaxed" style={{ color: BLUE_INK }}>
                → {item.fix}
              </p>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

// --- 05 · Competitors ------------------------------------------------------------

function Competitors({ slide }) {
  const t = useT()
  const hot = { background: "var(--wp-hot)" }
  // Seven products across is wider than a reading column at 18px, so the matrix keeps
  // its own width and scrolls inside its row. The page itself never scrolls sideways.
  return (
    <div>
      <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
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
                  className="px-3 pb-3 pt-3 align-bottom font-semibold"
                  style={col.highlight ? hot : undefined}
                >
                  <span
                    className="block text-note leading-snug"
                    style={{ color: col.highlight ? BLUE_INK : "var(--color-ink)" }}
                  >
                    {col.name}
                  </span>
                  <span className="block text-note font-normal" style={{ color: QUIET }}>
                    {col.region}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <th scope="row" className="py-3 pr-3 text-note font-semibold text-ink">
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className="px-3 py-3 text-note"
                    style={slide.columns[i].highlight ? hot : undefined}
                  >
                    {cell === true ? (
                      <span
                        aria-label={t(HAS)}
                        className="inline-flex size-7 items-center justify-center rounded-full font-semibold"
                        style={{ background: FILL.mint, color: ON_FILL }}
                      >
                        ✓
                      </span>
                    ) : cell === false ? (
                      <span aria-label={t(HAS_NOT)} style={{ color: QUIET }}>
                        —
                      </span>
                    ) : (
                      <span className="font-medium" style={{ color: BLUE_INK }}>
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note className="mt-3">{slide.legend}</Note>

      <ol className="mt-8 grid gap-x-8 gap-y-8 border-t border-line pt-7 sm:grid-cols-3">
        {slide.takeaways.map((item) => (
          <li key={item.no}>
            <Num className="block text-4xl">{item.no}</Num>
            <p className="mt-3 text-copy font-semibold leading-snug text-cream">
              {item.tone === "accent" ? <Hi>{item.title}</Hi> : item.title}
            </p>
            <Body className="mt-2.5" style={{ color: QUIET }}>
              {item.text}
            </Body>
          </li>
        ))}
      </ol>
    </div>
  )
}

// --- 06 · Insights ---------------------------------------------------------------

function Insights({ slide }) {
  return (
    <div>
      <ul className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
        {slide.cards.map((card) => (
          <li key={card.title} className="flex flex-col">
            <div>
              <Chip tone={card.tone}>{card.tag}</Chip>
            </div>
            <h4 className="mt-4 text-2xl font-semibold leading-tight text-cream">{card.title}</h4>
            <Body className="mt-3">{card.text}</Body>
            <figure className="mt-auto border-l-4 pl-4 pt-5" style={{ borderColor: FILL[card.tone] }}>
              <blockquote className="text-copy italic leading-relaxed text-ink">{card.quote}</blockquote>
              <figcaption className="mt-2 text-note" style={{ color: QUIET }}>
                {card.by}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <Row title={slide.pains.title} className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {slide.pains.items.map((item) => (
            <li key={item}>
              <Chip>{item}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-start gap-3">
          <Arrow turn="down" className="mt-0.5" />
          <div className="min-w-0">
            <p className="font-mono-tight text-note uppercase tracking-wide" style={{ color: BLUE_INK }}>
              {slide.pains.opportunity.label}
            </p>
            <p className="mt-2 text-2xl font-semibold leading-[1.45] text-cream">
              <Hi>{slide.pains.opportunity.text}</Hi>
            </p>
          </div>
        </div>
      </Row>
    </div>
  )
}

// --- 07 · Co-creation ------------------------------------------------------------

function CoCreation({ slide }) {
  return (
    <div>
      {slide.rounds.map((round) => (
        <Row key={round.tag} chip={<Chip tone={round.tone}>{round.tag}</Chip>}>
          <h4 className="text-2xl font-semibold leading-tight text-cream">{round.hmw}</h4>

          <Note className="mt-5">{round.clusterLabel}</Note>
          <ul className="mt-2.5 flex flex-wrap gap-2">
            {round.clusters.map((c) => (
              <li key={c}>
                <Chip>{c}</Chip>
              </li>
            ))}
          </ul>

          {round.voted && (
            <>
              <Note className="mt-5">{round.votedLabel}</Note>
              <ol className="mt-2.5 space-y-2.5">
                {round.voted.map((v, i) => (
                  <li key={v} className="flex items-start gap-3">
                    <Disc size="sm">{i + 1}</Disc>
                    <span className="min-w-0 text-copy leading-relaxed text-ink">{v}</span>
                  </li>
                ))}
              </ol>
            </>
          )}

          {round.closing && (
            <p className="mt-5 text-copy font-semibold leading-[1.6] text-cream">
              <Hi>{round.closing}</Hi>
            </p>
          )}
        </Row>
      ))}

      <div className="border-t border-line pt-7">
        <h4 className="text-2xl font-semibold leading-tight text-cream">{slide.featuresTitle}</h4>
        <ol className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-3">
          {slide.features.map((f) => {
            const hot = f.tone === "accent"
            return (
              <li key={f.no}>
                <div
                  className="aspect-square overflow-hidden rounded-2xl p-5"
                  style={{ background: hot ? ACCENT : TRAY }}
                >
                  <Art src={f.art} alt="" />
                </div>
                <div className="mt-4 flex items-baseline gap-3">
                  <Num className="text-2xl">{f.no}</Num>
                  <p className="text-copy font-semibold leading-snug text-cream">
                    {hot ? <Hi>{f.title}</Hi> : f.title}
                  </p>
                </div>
                <Body className="mt-2" style={{ color: QUIET }}>
                  {f.text}
                </Body>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

// --- 08 · Pivot ------------------------------------------------------------------

function Pivot({ slide }) {
  const last = slide.timeline.length - 1
  return (
    <div>
      {/* The path. Four steps in a row, each ruled off at the top in blue and the last
          in yellow — the rules join into one line across the board, and on a phone the
          steps stack with their rules still marking the order. */}
      <ol className="grid gap-x-6 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {slide.timeline.map((item, i) => (
          <li key={item.step}>
            <Rule tone={i === last ? "accent" : "blue"} />
            <div className="mt-4">
              <Disc tone={i === last ? "accent" : "blue"}>{i + 1}</Disc>
            </div>
            <p className="mt-3 text-copy font-semibold leading-snug text-cream">{item.step}</p>
            <Body className="mt-2" style={{ color: QUIET }}>
              {item.text}
            </Body>
          </li>
        ))}
      </ol>

      <Row
        title={slide.pairs.title}
        sub={slide.pairs.sub}
        className="mt-8"
        aside={
          <ul className="flex flex-wrap gap-2">
            {slide.pairs.legend.map((l) => (
              <li key={l.label}>
                <Chip tone={l.tone}>{l.label}</Chip>
              </li>
            ))}
          </ul>
        }
      >
        <ul className="mb-4 flex flex-wrap gap-2 lg:hidden">
          {slide.pairs.legend.map((l) => (
            <li key={l.label}>
              <Chip tone={l.tone}>{l.label}</Chip>
            </li>
          ))}
        </ul>
        <ul className="grid gap-3 sm:grid-cols-2">
          {slide.pairs.images.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-xl">
              <img src={img.src} alt={img.alt} loading="lazy" className="block h-auto w-full" />
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

// --- 09 · Iteration --------------------------------------------------------------

function Iteration({ slide }) {
  return (
    <div>
      <div className="grid items-start gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
        {slide.panels.map((panel, i) => (
          <div key={panel.tag} className="contents">
            {i > 0 && <Arrow turn="lg" className="justify-self-center lg:mt-24" />}
            <div className="min-w-0">
              <Chip tone={panel.tone ?? "quiet"}>{panel.tag}</Chip>
              <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
                {panel.shots.map((shot) => (
                  <Shot key={shot.src} src={shot.src} caption={shot.caption} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ul className="mt-8 grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {slide.changes.map((c) => (
          <li key={c} className="flex gap-3 text-copy leading-relaxed text-ink">
            <Dot tone="accent" className="mt-[0.6em]" />
            <span className="min-w-0">{c}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// --- 10 · AI generation ----------------------------------------------------------

function AiFlow({ slide }) {
  const last = slide.pipeline.nodes.length - 1
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
        {/* Three screens with the flow arrows between them. The arrows are their own
            grid cells; on a phone they go and the three screens sit side by side,
            which is the same sequence read left to right. */}
        <div className="grid grid-cols-3 items-center gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:gap-3">
          <Shot src={slide.shots[0].src} caption={slide.shots[0].caption} />
          <Arrow className="hidden sm:flex" />
          <Shot src={slide.shots[1].src} caption={slide.shots[1].caption} />
          <Arrow className="hidden sm:flex" />
          <Shot src={slide.shots[2].src} caption={slide.shots[2].caption} />
        </div>

        <ol>
          {slide.decisions.map((d) => (
            <li key={d.title} className="border-t border-line py-5 first:pt-0 first:border-t-0 lg:first:border-t lg:first:pt-5">
              <p className="text-copy font-semibold leading-snug text-cream">
                {d.tone === "accent" ? <Hi>{d.title}</Hi> : d.title}
              </p>
              <Body className="mt-2" style={{ color: QUIET }}>
                {d.text}
              </Body>
            </li>
          ))}
        </ol>
      </div>

      <Row title={slide.pipeline.title} sub={slide.pipeline.note} className="mt-8">
        <ol className="grid items-stretch gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {slide.pipeline.nodes.map((node, i) => (
            <li key={node} className="contents">
              <div
                className="flex items-center justify-center rounded-xl px-3 py-4 text-center text-note font-medium leading-snug"
                style={{
                  background: i === last ? ACCENT : TRAY,
                  color: i === last ? ON_FILL : "var(--color-ink)",
                }}
              >
                {node}
              </div>
              {i < last && <Arrow className="justify-self-center" />}
            </li>
          ))}
        </ol>
      </Row>

      <Row title={slide.edges.title}>
        <div className="grid max-w-2xl grid-cols-3 gap-2.5 sm:gap-3">
          {slide.edges.shots.map((shot) => (
            <Shot key={shot.src} src={shot.src} caption={shot.caption} />
          ))}
        </div>
      </Row>
    </div>
  )
}

// --- 11 · Home screen ------------------------------------------------------------

function Annotation({ item }) {
  return (
    <li className="flex items-start gap-3 border-t border-line pt-4">
      <Disc>{item.no}</Disc>
      <div className="min-w-0">
        <p className="text-copy font-semibold leading-snug text-cream">{item.title}</p>
        <Body className="mt-1.5" style={{ color: QUIET }}>
          {item.text}
        </Body>
      </div>
    </li>
  )
}

function HomeScreen({ slide }) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10">
        {/* The key visual first on a phone, between the two columns of notes on the
            wide layout. It keeps its own width there — a phone stretched to a third
            of the board would read as a tablet. */}
        <figure className="relative order-first mx-auto w-full max-w-[17rem] lg:order-none lg:w-64">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[30%] size-56 -translate-x-1/2 rounded-full"
            style={{ background: ACCENT, opacity: 0.85 }}
          />
          <img
            src={slide.shot}
            alt=""
            loading="lazy"
            className="relative block h-auto w-full rounded-[1.75rem] shadow-xl"
          />
        </figure>

        <ol className="grid gap-5 content-start lg:order-first">
          {slide.left.map((item) => (
            <Annotation key={item.no} item={item} />
          ))}
        </ol>

        <ol className="grid gap-5 content-start">
          {slide.right.map((item) => (
            <Annotation key={item.no} item={item} />
          ))}
        </ol>
      </div>

      <Row title={slide.outfits.title} className="mt-10">
        <ul className="grid max-w-2xl grid-cols-4 gap-2 rounded-2xl p-3 sm:p-4" style={{ background: ACCENT }}>
          {slide.outfits.images.map((img) => (
            <li key={img.src} className="aspect-[3/7]">
              <Art src={img.src} alt={img.alt} />
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

// --- 12 · Testing ----------------------------------------------------------------

function Testing({ slide }) {
  const m = slide.method
  const v = slide.validate
  return (
    <div>
      <Row title={m.title}>
        <div className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-5">
            <div>
              <Chip tone="pink">{m.scriptTag}</Chip>
            </div>
            <blockquote
              className="rounded-xl p-4 text-copy italic leading-relaxed text-ink"
              style={{ background: TRAY }}
            >
              {m.script}
            </blockquote>
          </div>
          <div className="grid gap-3 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-5">
            <div>
              <Chip tone="mint">{m.bilingualTag}</Chip>
            </div>
            <Body>{m.bilingual}</Body>
          </div>
          <div className="grid gap-3 sm:grid-cols-[14rem_minmax(0,1fr)] sm:gap-5">
            <div>
              <Chip tone="accent">{m.recruitTag}</Chip>
            </div>
            <Bullets items={m.recruit} />
          </div>
        </div>
      </Row>

      <Row title={v.title}>
        <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
          <div>
            <p className="font-mono-tight text-note uppercase tracking-wide" style={{ color: QUIET }}>
              {v.hypothesesLabel}
            </p>
            <ul className="mt-3 space-y-3">
              {v.hypotheses.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Disc tone="mint" size="sm">
                    ?
                  </Disc>
                  <span className="min-w-0 text-copy leading-relaxed text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono-tight text-note uppercase tracking-wide" style={{ color: QUIET }}>
              {v.detailsLabel}
            </p>
            <ol className="mt-3 space-y-3">
              {v.details.map((d, i) => (
                <li key={d} className="flex items-start gap-3">
                  <Disc size="sm">{i + 1}</Disc>
                  <span className="min-w-0 text-copy leading-relaxed text-ink">{d}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Row>

      <Row title={slide.changes.title} aside={<Sticker src={slide.changes.sticker} className="h-32" />}>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {slide.changes.items.map((item) => (
            <li key={item.result}>
              <Rule tone="accent" />
              <p className="mt-4 font-mono-tight text-note uppercase tracking-wide" style={{ color: QUIET }}>
                {item.label}
              </p>
              <Body className="mt-2">{item.text}</Body>
              <p className="mt-3 text-copy font-semibold leading-relaxed" style={{ color: BLUE_INK }}>
                {item.result}
              </p>
            </li>
          ))}
        </ul>
      </Row>
    </div>
  )
}

// --- 13 · Design to build --------------------------------------------------------

function NodeBox({ title, sub, tone }) {
  const hot = tone === "accent"
  return (
    <div
      className="rounded-xl px-4 py-3 text-center"
      style={{ background: hot ? ACCENT : TRAY, color: hot ? ON_FILL : "var(--color-ink)" }}
    >
      <p className="text-copy font-semibold leading-snug">{title}</p>
      {sub && (
        <p className="mt-1 text-note leading-snug" style={{ color: hot ? ON_FILL : QUIET }}>
          {sub}
        </p>
      )}
    </div>
  )
}

function Link2({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center ${className}`}
      style={{ color: BLUE_INK }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28">
        <path
          d="M16 4v24M9 11l7-7 7 7M9 21l7 7 7-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function Build({ slide }) {
  const a = slide.architecture
  return (
    <div>
      <Row title={a.title} sub={a.note}>
        {/* The app sits above the backend, with the two services either side of it.
            On a narrow column the whole thing becomes one top-to-bottom chain, which
            is the same story told in one dimension instead of two. */}
        <div className="grid gap-2.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="sm:col-start-3">
            <NodeBox title={a.app.title} sub={a.app.sub} tone="accent" />
          </div>
          <Link2 className="sm:col-start-3" />
          <div className="sm:col-start-1 sm:row-start-3">
            <NodeBox title={a.sides[0].title} sub={a.sides[0].sub} />
          </div>
          <Link2 className="sm:col-start-2 sm:row-start-3 sm:rotate-90" />
          <div className="sm:col-start-3 sm:row-start-3">
            <NodeBox title={a.backend.title} sub={a.backend.sub} />
          </div>
          <Link2 className="sm:col-start-4 sm:row-start-3 sm:rotate-90" />
          <div className="sm:col-start-5 sm:row-start-3">
            <NodeBox title={a.sides[1].title} sub={a.sides[1].sub} />
          </div>
        </div>
      </Row>

      <Callout label={slide.mvp.title} className="mt-2">
        {slide.mvp.text}
      </Callout>

      <Row title={slide.system.title} sub={slide.system.sub} className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {slide.system.pills.map((p) => (
            <li key={p}>
              <Chip>{p}</Chip>
            </li>
          ))}
        </ul>
        {/* The renders were exported with their Figma surface baked in, so the tile
            behind them is that exact value rather than a near miss. */}
        <ul
          className="mt-5 grid max-w-2xl grid-cols-4 gap-2 rounded-2xl p-3"
          style={{ background: "var(--wp-render)" }}
        >
          {slide.system.images.map((img) => (
            <li key={img.src} className="aspect-[3/4]">
              <Art src={img.src} alt={img.alt} />
            </li>
          ))}
        </ul>
        <h5 className="mt-7 text-copy font-semibold text-cream">{slide.system.engTitle}</h5>
        <Bullets items={slide.system.eng} className="mt-3" />
      </Row>
    </div>
  )
}

// --- 14 · After launch -----------------------------------------------------------

// The install curve. Drawn in the data's own coordinates and stretched by the SVG's
// viewBox, with the axis labels and the callout pills kept as real HTML outside it —
// so the line scales with the row while nothing made of words ever does.
function InstallChart({ chart }) {
  const { points, max } = chart
  const last = points.length - 1
  const x = (i) => (i / last) * 100
  const y = (v) => (1 - v / max) * 100

  const line = points.map((v, i) => `${x(i)},${y(v)}`).join(" ")
  const area = `0,100 ${line} 100,100`
  const axis = chart.ticks[chart.ticks.length - 1].toLocaleString()

  // Eleven months of labels and a y axis need about 26rem before the months start
  // colliding, which is wider than a phone. Rather than shrink the type below the
  // page's floor, the plot keeps that width and scrolls inside the row.
  // `overflow-x: auto` clips vertically too, so the callouts need headroom inside the
  // scroll box — and one that sits near the ceiling is hung under its point instead
  // of over it, where there is no room left.
  return (
    <div className="no-scrollbar -mx-1 overflow-x-auto px-1 pt-9">
      <div className="min-w-[26rem]">
        <div className="flex gap-3">
          {/* Y axis. Laid out as a column of evenly spaced labels read bottom-up, which
              puts each one on its own gridline without any absolute positioning. */}
          <ul
            className="flex shrink-0 flex-col-reverse justify-between text-note"
            style={{ color: QUIET, height: "16rem" }}
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
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <polygon points={area} fill={BLUE} opacity="0.14" />
              <polyline
                points={line}
                fill="none"
                stroke={BLUE}
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
                className="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-page"
                style={{ left: `${x(i)}%`, top: `${y(v)}%`, borderColor: BLUE }}
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
                    background: FILL[m.tone],
                    color: ON_FILL,
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
          <span className="shrink-0 text-note opacity-0" aria-hidden="true">
            {axis}
          </span>
          <ul className="flex min-w-0 flex-1 justify-between text-note" style={{ color: QUIET }}>
            {chart.months.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div className="mt-1 flex gap-3">
          <span className="shrink-0 text-note opacity-0" aria-hidden="true">
            {axis}
          </span>
          <div className="flex min-w-0 flex-1 justify-between text-note" style={{ color: QUIET }}>
            <span>{chart.years[0]}</span>
            <span>{chart.years[1]}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Five stars, filled in the deck's yellow and outlined in the page's ink so the empty
// ones still read on either theme. The count is in the label, so a screen reader is
// not told about five glyphs.
function Stars({ n }) {
  return (
    <span role="img" aria-label={`${n} / 5`} className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.6l-5.8 3.1 1.1-6.5L2.6 9.6l6.5-.9z"
            fill={i < n ? ACCENT : "none"}
            stroke="var(--color-ink)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}

function Aftermath({ slide }) {
  return (
    <div>
      <Row title={slide.chart.title} sub={slide.chart.sub}>
        <InstallChart chart={slide.chart} />
        <p className="mt-6 max-w-2xl text-copy font-semibold leading-[1.6] text-cream">
          <Hi>{slide.chart.read}</Hi>
        </p>
      </Row>

      <Row title={slide.reviews.title} sub={slide.reviews.sub}>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {slide.reviews.items.map((r, i) => (
            <li key={i}>
              <Stars n={r.stars} />
              <Body className="mt-3 italic">{r.text}</Body>
            </li>
          ))}
        </ul>
      </Row>

      <Callout label={slide.retro.title} className="mt-2">
        {slide.retro.text}
      </Callout>
    </div>
  )
}

// --- 15 · Outcome ----------------------------------------------------------------

function Outcome({ slide }) {
  const s = slide.store
  const mk = slide.marketing
  return (
    <div>
      <Row title={s.title} sub={s.source}>
        <div className="flex items-start gap-5">
          <img
            src={s.icon}
            alt=""
            loading="lazy"
            className="size-20 shrink-0 rounded-2xl"
            style={{ background: BLUE }}
          />
          <div className="min-w-0">
            <p className="text-2xl font-semibold leading-tight text-cream">{s.name}</p>
            <p className="mt-1.5 text-copy font-medium" style={{ color: BLUE_INK }}>
              {s.publisher}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {s.pills.map((p) => (
                <li key={p}>
                  <Chip>{p}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Body className="mt-5 italic" style={{ color: QUIET }}>
          {s.tagline}
        </Body>
        <Bullets items={s.facts} className="mt-4" />
      </Row>

      <Row title={mk.title} sub={mk.sub}>
        <div className="grid gap-6 sm:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] sm:gap-8">
          <img src={mk.banner} alt={mk.bannerAlt} loading="lazy" className="block h-auto w-full rounded-xl" />
          <div className="min-w-0">
            <p className="font-mono-tight text-note uppercase tracking-wide" style={{ color: QUIET }}>
              {mk.audienceLabel}
            </p>
            <ul className="mt-3 space-y-4">
              {mk.audiences.map((a) => (
                <li key={a.tag}>
                  <Chip tone={a.tone}>{a.tag}</Chip>
                  <Body className="mt-2">{a.text}</Body>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-copy font-semibold leading-[1.6] text-cream">
              <Hi>{mk.slogan}</Hi>
            </p>
          </div>
        </div>
      </Row>

      <div className="border-t border-line pt-7">
        <h4 className="text-2xl font-semibold leading-tight text-cream">{slide.reflectionsTitle}</h4>
        <ol className="mt-6 grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {slide.reflections.map((r) => (
            <li key={r.no}>
              <Num className="block text-4xl">{r.no}</Num>
              <p className="mt-3 text-copy font-semibold leading-snug text-cream">{r.title}</p>
              <Body className="mt-2.5" style={{ color: QUIET }}>
                {r.text}
              </Body>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

// --- the switchboard -------------------------------------------------------------

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
