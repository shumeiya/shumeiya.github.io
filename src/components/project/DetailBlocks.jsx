// Typed content blocks for a case-study section. A deck-shaped case study needs
// more than paragraphs — figures, definition rows, a process sequence and the
// author's own caveats all carry meaning that flattens into mush if they are
// written as prose. Each block keeps its own shape and its own visual weight.

function Text({ text }) {
  return <p className="mt-4 text-sm leading-relaxed text-fog sm:text-base">{text}</p>
}

// The author talking about their own work — an open question, a caveat, a risk
// they are still watching. Set apart so it never reads as product copy.
function Note({ text }) {
  return (
    <p className="mt-6 border-l-2 border-line bg-box-2/60 py-3 pl-4 pr-3 text-sm italic leading-relaxed text-fog">
      {text}
    </p>
  )
}

function Bullets({ title, items }) {
  return (
    <div className="mt-6">
      {title && (
        <p className="font-mono-tight text-[11px] uppercase tracking-wide text-fog">{title}</p>
      )}
      <ul className={`${title ? "mt-3" : ""} space-y-2.5`}>
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-fog sm:text-base">
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
          <dt className="font-mono-tight text-[11px] uppercase tracking-wide text-ink">{d.term}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-fog">{d.text}</dd>
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
          <dt className="mt-1 text-sm font-medium text-ink">{s.label}</dt>
          {s.note && <p className="mt-1 text-sm leading-relaxed text-fog">{s.note}</p>}
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
          <span className="rounded-full border border-line px-3 py-1.5 font-mono-tight text-[11px] uppercase tracking-wide text-ink">
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

function Figure({ src, caption }) {
  return (
    <figure className="mt-6">
      <div className="overflow-hidden rounded-xl bg-box">
        <img src={src} alt={caption ?? ""} loading="lazy" className="w-full object-cover" />
      </div>
      {caption && <figcaption className="mt-2.5 text-xs leading-relaxed text-fog">{caption}</figcaption>}
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
        return <Figure key={i} src={block.src} caption={block.caption} />
      default:
        return <Text key={i} text={block.text} />
    }
  })
}
