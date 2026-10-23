import { ArrowUpRight } from "lucide-react"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"
import WorkflowBoard from "./WorkflowBoard"
import BackgroundBoard from "./BackgroundBoard"
import CompetitorsBoard from "./CompetitorsBoard"
import PersonaBoard from "./PersonaBoard"
import StoryMapBoard from "./StoryMapBoard"
import SpecBoard from "./SpecBoard"
import CoreFlowBoard from "./CoreFlowBoard"
import ExtensionsBoard from "./ExtensionsBoard"
import WeatherPetsDeck from "./WeatherPetsDeck"
import CompareSlider from "./CompareSlider"
import CodemaoFlow from "./CodemaoFlow"
import AbcMouseDeck from "./AbcMouseDeck"

// Typed content blocks for a case-study section. A deck-shaped case study needs
// more than paragraphs — figures, definition rows, a process sequence and the
// author's own caveats all carry meaning that flattens into mush if they are
// written as prose. Each block keeps its own shape and its own visual weight.

function Text({ text }) {
  return <p className="mt-4 text-copy leading-relaxed text-fog">{text}</p>
}

// The author talking about their own work — an open question, a caveat, a risk
// they are still watching. Set apart so it never reads as product copy.
function Note({ text }) {
  return (
    <p className="mt-6 border-l-2 border-line bg-box-2/60 py-3 pl-4 pr-3 text-copy italic leading-relaxed text-fog">
      {text}
    </p>
  )
}

function Bullets({ title, items }) {
  return (
    <div className="mt-6">
      {title && (
        <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{title}</p>
      )}
      <ul className={`${title ? "mt-3" : ""} space-y-2.5`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-copy leading-relaxed text-fog">
            <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ink/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Term + gloss, two up. The deck used five-across rows; at reading-column width
// that turns into unreadable slivers, so they stack two at a time instead.
function Defs({ items }) {
  return (
    <dl className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
      {items.map((d) => (
        <div key={d.term} className="border-t border-line pt-3">
          <dt className="font-mono-tight text-note uppercase tracking-wide text-ink">{d.term}</dt>
          <dd className="mt-1.5 text-copy leading-relaxed text-fog">{d.text}</dd>
        </div>
      ))}
    </dl>
  )
}

function Stats({ items, accent }) {
  return (
    <dl
      className="mt-6 grid gap-x-6 gap-y-6 border-t-2 pt-5 sm:grid-cols-2"
      style={{ borderColor: accent }}
    >
      {items.map((s) => (
        <div key={s.label}>
          <dd className="text-3xl font-semibold tracking-tight text-cream">{s.value}</dd>
          <dt className="mt-1 text-copy font-medium text-ink">{s.label}</dt>
          {s.note && <p className="mt-1 text-note leading-relaxed text-fog">{s.note}</p>}
        </div>
      ))}
    </dl>
  )
}

// A sequence that is a sequence — the arrows are the content.
function Steps({ items }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
      {items.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-line px-3 py-1.5 font-mono-tight text-note uppercase tracking-wide text-ink">
            {step}
          </span>
          {i < items.length - 1 && (
            <span aria-hidden="true" className="text-fog">
              →
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

// Figures run the full reading column by default. Tall or near-square images swamp the
// column at that width, so `size` caps them and centres the result — the image is still
// uncropped, just rendered smaller.
const FIGURE_SIZE = {
  sm: "max-w-xs",
  md: "max-w-md",
  lg: "max-w-lg",
}

function Figure({ src, caption, size }) {
  const cap = FIGURE_SIZE[size]
  return (
    <figure className={`mt-6${cap ? ` ${cap} mx-auto` : ""}`}>
      <div className="bg-box">
        <img src={src} alt={caption ?? ""} loading="lazy" className="block h-auto w-full" />
      </div>
      {caption && <figcaption className="mt-2.5 text-note leading-relaxed text-fog">{caption}</figcaption>}
    </figure>
  )
}

// Several shots of the same thing in its different states, read as a set rather than
// as a column of unrelated figures. Two up on anything but a phone: these are wide
// screens, and at full column width five of them turn the section into a scroll.
function Shots({ items }) {
  return (
    <ul className="mt-6 grid gap-x-5 gap-y-6 sm:grid-cols-2">
      {items.map((shot) => (
        <li key={shot.src}>
          <div className="overflow-hidden rounded-lg border border-line bg-box">
            <img src={shot.src} alt={shot.caption ?? ""} loading="lazy" className="block h-auto w-full" />
          </div>
          {shot.caption && (
            <p className="mt-2.5 text-note leading-relaxed text-fog">
              {shot.label && <span className="font-medium text-ink">{shot.label} · </span>}
              {shot.caption}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

// The numbered call-outs that sit under a screen in the source deck — ① ② ③ pinned
// to places on the picture. The pins themselves don't survive the move to a page that
// reflows, but the numbering does, and it is what ties a note to a screen.
function Numbers({ title, items }) {
  return (
    <div className="mt-6">
      {title && <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{title}</p>}
      <ol className={`${title ? "mt-3" : ""} space-y-3`}>
        {items.map((item, i) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line font-mono-tight text-note text-ink"
            >
              {i + 1}
            </span>
            <span className="text-copy leading-relaxed text-fog">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

// The deck states its brief as an equation — three things added up to one outcome.
// It reads as a claim about causation, which a bullet list does not, so it keeps the
// shape it was written in.
function Formula({ terms, result }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 border-t-2 border-line pt-5">
      {terms.map((term, i) => (
        <span key={term} className="flex items-center gap-3">
          <span className="text-copy font-medium text-ink">{term}</span>
          <span aria-hidden="true" className="text-copy text-fog">
            {i < terms.length - 1 ? "+" : "="}
          </span>
        </span>
      ))}
      <span className="text-copy font-semibold text-cream">{result}</span>
    </div>
  )
}

// The palette, as the specification states it: a swatch, its hex, and the job it does.
// The hex is the content here — this is a spec page, not decoration — so it is set in
// the mono face and never abbreviated. The groups are the specification's own: the
// action colour is one thing, the status colours another, the text ramp a third, and
// flattening the three into one wall of chips loses the point it was making.
function Swatches({ groups }) {
  return (
    <div className="mt-6 space-y-7">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{group.title}</p>
          <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {group.items.map((s) => (
              <li key={s.hex + s.label}>
                <div className="h-16 rounded-lg border border-line" style={{ background: s.hex }} />
                <p className="mt-2 font-mono-tight text-note uppercase tracking-wide text-ink">{s.hex}</p>
                <p className="text-note leading-relaxed text-fog">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

// A table that was a table in the source and stays one here.
//
// The weekly teaching report is the evidence the whole case study rests on — the four
// headline percentages are read off it — so it is transcribed rather than screenshotted:
// it survives a text search, a screen reader, and the site's own two themes, none of
// which a picture of a spreadsheet does.
//
// Eleven columns do not fit a reading column at 18px, so the table scrolls sideways
// with its first column pinned — a week with no label on it is a row of loose numbers.
function DataTable({ title, head, rows, foot, note }) {
  const t = useT()
  // Pinned cells need an opaque ground of their own, or the scrolling columns show
  // through them.
  const stick = "sticky left-0 z-10 bg-box"
  const cell = "whitespace-nowrap px-3 py-2.5 text-note tabular-nums"
  return (
    <figure className="mt-6">
      {title && <figcaption className="mb-2.5 text-note font-medium text-ink">{title}</figcaption>}
      <div className="no-scrollbar overflow-x-auto rounded-xl border border-line bg-box">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`${cell} font-medium text-ink ${i === 0 ? stick : "text-right"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b border-line/60">
                {row.map((v, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className={`${cell} ${stick} font-medium text-ink`}>
                      {v}
                    </th>
                  ) : (
                    <td key={i} className={`${cell} text-right text-fog`}>
                      {v || "—"}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
          {foot && (
            // The average row is a summary of the three above it, not a fourth week.
            <tfoot>
              <tr className="border-t-2 border-line">
                {foot.map((v, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className={`${cell} ${stick} font-medium text-ink`}>
                      {v}
                    </th>
                  ) : (
                    <td key={i} className={`${cell} text-right font-medium text-ink`}>
                      {v || "—"}
                    </td>
                  )
                )}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
      <p className="mt-2.5 text-note leading-relaxed text-fog">
        {note ? `${note} ` : ""}
        {t(ui.scrollTable)}
      </p>
    </figure>
  )
}

// The specification's grid page, drawn rather than quoted: a 1440×900 frame with its
// top bar, its side navigation and a 12-column container. Percentages all the way down,
// so the proportions survive being shown at whatever width the column happens to be.
function GridSpec({ labels }) {
  return (
    <figure className="mt-6">
      <div
        className="w-full overflow-hidden rounded-xl border border-line bg-box p-3"
        style={{ aspectRatio: 1440 / 900 }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line">
          {/* Header — 60 of the frame's 900. */}
          <div
            className="flex shrink-0 items-center justify-center border-b border-line bg-box-2"
            style={{ height: `${(60 / 900) * 100}%` }}
          >
            <span className="font-mono-tight text-note uppercase tracking-wide text-ink">
              {labels.header}
            </span>
          </div>
          <div className="flex min-h-0 flex-1">
            {/* Sider — 208 of the frame's 1440. */}
            <div
              className="flex shrink-0 items-center justify-center border-r border-line bg-box-2"
              style={{ width: `${(208 / 1440) * 100}%` }}
            >
              <span className="font-mono-tight text-note uppercase tracking-wide text-ink">
                {labels.sider}
              </span>
            </div>
            {/* Container — the 12 columns. The gutter is the spec's own 24px against a
                1168px container, as a proportion so it holds at any rendered width.
                The padding is not: percentage padding resolves against the container's
                *width* on all four sides, so a vertical one written that way would not
                be the 24px it claims. A flat inset instead. */}
            <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
              <div className="flex min-h-0 flex-1 gap-[2.05%]">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="min-w-0 flex-1 rounded-sm bg-ink/10" />
                ))}
              </div>
              <p className="mt-2 text-center font-mono-tight text-note uppercase tracking-wide text-ink">
                {labels.container}
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

// Something the reader can go and open for themselves — a live prototype, a repo.
// Worth its own affordance: a case study that links the real artifact is more
// convincing than one that only shows pictures of it.
function Links({ items }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start justify-between gap-4 border-t border-line pt-3"
          >
            <span className="min-w-0">
              <span className="block text-copy font-medium text-ink transition-colors group-hover:text-cream">
                {l.label}
              </span>
              {l.note && <span className="mt-1 block text-note leading-relaxed text-fog">{l.note}</span>}
            </span>
            <ArrowUpRight
              size={16}
              className="mt-0.5 shrink-0 text-fog transition-colors group-hover:text-cream"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

// An embedded walkthrough. The 16:9 frame matches the source footage, so nothing
// is letterboxed or cropped — it is the video's own ratio, not an arbitrary crop.
function Video({ src, title, caption }) {
  return (
    <figure className="mt-6">
      <div className="aspect-video w-full overflow-hidden bg-box">
        <iframe
          src={src}
          title={title ?? "Video"}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      {caption && <figcaption className="mt-2.5 text-note leading-relaxed text-fog">{caption}</figcaption>}
    </figure>
  )
}

export default function DetailBlocks({ blocks, accent }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case "note":
        return <Note key={i} text={block.text} />
      case "bullets":
        return <Bullets key={i} title={block.title} items={block.items} />
      case "defs":
        return <Defs key={i} items={block.items} />
      case "stats":
        return <Stats key={i} items={block.items} accent={accent} />
      case "steps":
        return <Steps key={i} items={block.items} />
      case "image":
        return <Figure key={i} src={block.src} caption={block.caption} size={block.size} />
      case "shots":
        return <Shots key={i} items={block.items} />
      case "numbers":
        return <Numbers key={i} title={block.title} items={block.items} />
      case "formula":
        return <Formula key={i} terms={block.terms} result={block.result} />
      case "swatches":
        return <Swatches key={i} groups={block.groups} />
      case "table":
        return (
          <DataTable
            key={i}
            title={block.title}
            head={block.head}
            rows={block.rows}
            foot={block.foot}
            note={block.note}
          />
        )
      case "gridspec":
        return <GridSpec key={i} labels={block.labels} />
      case "compare":
        return (
          <CompareSlider
            key={i}
            before={block.before}
            after={block.after}
            beforeLabel={block.beforeLabel}
            afterLabel={block.afterLabel}
            caption={block.caption}
            ratio={block.ratio}
          />
        )
      case "flow":
        return <CodemaoFlow key={i} board={block.board} />
      case "links":
        return <Links key={i} items={block.items} />
      case "video":
        return <Video key={i} src={block.src} title={block.title} caption={block.caption} />
      case "workflow":
        return <WorkflowBoard key={i} board={block.board} accent={accent} />
      case "background":
        return <BackgroundBoard key={i} board={block.board} />
      case "competitors":
        return <CompetitorsBoard key={i} board={block.board} />
      case "persona":
        return <PersonaBoard key={i} board={block.board} />
      case "storymap":
        return <StoryMapBoard key={i} board={block.board} />
      case "spec":
        return <SpecBoard key={i} board={block.board} />
      case "coreflow":
        return <CoreFlowBoard key={i} board={block.board} />
      case "extensions":
        return <ExtensionsBoard key={i} board={block.board} />
      case "wpdeck":
        return <WeatherPetsDeck key={i} slide={block.slide} />
      case "abcdeck":
        return <AbcMouseDeck key={i} slide={block.slide} />
      default:
        return <Text key={i} text={block.text} />
    }
  })
}
