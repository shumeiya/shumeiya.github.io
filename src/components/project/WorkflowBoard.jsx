import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useLanguage, useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "From 0 to 1" board, rebuilt in the page rather than exported as a
// picture — the copy is real text in both languages, selectable and searchable.
//
// Layout and colour are the deck's: nine stage columns, a rule dropping from each
// into the work it produced, accent chips for the work I drove and grey ones for
// context. What the deck's slide carried and the page doesn't need is gone — the
// background grid, the dark slide panel, the title block (the section heading above
// says the same thing) and the empty margins around the drawing.
//
// Everything is placed in the artboard's own coordinates and the whole box is scaled
// to the column it is given. On a narrow screen that would shrink the type into
// nothing, so below MIN_SCALE the board holds its size and the panel scrolls sideways
// instead; the scrollbar is hidden the way the page's own scrollbar is, so a bar
// never appears mid-article.

const BOARD_W = 1680
const BOARD_H = 664
const MIN_SCALE = 0.45

// The deck's palette, declared per theme on `.kyrall-deck` in index.css — the accent and
// the chip surface both have a light-mode counterpart, so the figure reads the same
// way on paper as it does on the slide.
const ACCENT = "var(--deck-accent)"
const ON_ACCENT = "var(--deck-on-accent)"
const SURFACE = "var(--deck-surface)"
const ON_SURFACE = "var(--deck-on-surface)"
const RULE = "var(--deck-rule)"

// The deck is set in Ufficio / Ufficio Mono, which the site doesn't ship. Urbanist is
// the closest geometric sans already loaded; the tracked-out uppercase stage names
// only hold their rhythm in a real monospace, so those get the system one.
const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

function Card({ card }) {
  const filled = card.fill === "lime"
  const lines = Array.isArray(card.text) ? card.text : [card.text]
  return (
    <div className="absolute" style={{ left: card.x, top: card.y, padding: "12px 18px" }}>
      <Chamfer fill={filled ? ACCENT : SURFACE} stroke={card.stroke === "lime" ? ACCENT : RULE} />
      <p
        className="relative whitespace-nowrap"
        style={{
          fontFamily: SANS,
          fontSize: 20,
          lineHeight: "normal",
          fontWeight: filled ? 500 : 400,
          color: filled ? ON_ACCENT : ON_SURFACE,
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  )
}

function Bar({ bar }) {
  return (
    <div
      className="absolute flex items-start justify-center"
      style={{ left: bar.x, top: bar.y, width: bar.w, height: 46, padding: "12px 0" }}
    >
      <Chamfer
        fill={bar.tone === "lime" ? SURFACE : "var(--deck-band)"}
        stroke={bar.tone === "lime" ? ACCENT : RULE}
      />
      <p
        className="relative whitespace-nowrap"
        style={{
          fontFamily: SANS,
          fontSize: 18,
          lineHeight: "normal",
          color: bar.tone === "lime" ? "var(--deck-on-rail)" : "var(--deck-on-band)",
        }}
      >
        {bar.text}
      </p>
    </div>
  )
}

export default function WorkflowBoard({ board }) {
  const { lang } = useLanguage()
  const t = useT()
  const hostRef = useRef(null)
  const [scale, setScale] = useState(MIN_SCALE)

  // Measured rather than queried in CSS: the scale feeds a transform, and a transform
  // can't read the width of its own container.
  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.max(MIN_SCALE, entry.contentRect.width / BOARD_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <figure className="mt-6">
      <div ref={hostRef} className="no-scrollbar overflow-x-auto">
        <div style={{ width: BOARD_W * scale, height: BOARD_H * scale }}>
          <div
            className="kyrall-deck relative"
            style={{
              width: BOARD_W,
              height: BOARD_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* The band the stage names sit in — its two rules, not its fill, which
                was a slide background. */}
            <div
              aria-hidden="true"
              className="absolute left-0 h-px w-full bg-line"
              style={{ top: 0 }}
            />
            <div
              aria-hidden="true"
              className="absolute left-0 h-px w-full bg-line"
              style={{ top: 69 }}
            />

            {board.stages.map((stage) => (
              <div key={stage.x}>
                <p
                  className="absolute -translate-x-1/2 whitespace-nowrap uppercase text-ink"
                  style={{
                    left: stage.x,
                    top: 23,
                    fontFamily: MONO,
                    fontSize: 20,
                    lineHeight: "normal",
                    fontWeight: 500,
                    letterSpacing: "1.2px",
                  }}
                >
                  {stage.label}
                </p>
                <div
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: stage.x - 4,
                    top: 76,
                    width: 8,
                    height: 8,
                    background: stage.lit ? ACCENT : RULE,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="absolute"
                  style={{
                    left: stage.x,
                    top: 80,
                    width: 1,
                    height: stage.line,
                    background: stage.lit ? ACCENT : RULE,
                  }}
                />
              </div>
            ))}

            {board.cards.map((card, i) => (
              <Card key={i} card={lang === "zh" && card.zh ? { ...card, ...card.zh } : card} />
            ))}
            {board.bars.map((bar, i) => (
              <Bar key={i} bar={bar} />
            ))}
          </div>
        </div>
      </div>

      {/* The board stops shrinking at MIN_SCALE, so from here down it is wider than
          the column — which is the only thing worth saying under the figure. */}
      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">
          {t(ui.scrollSideways)}
        </figcaption>
      )}
    </figure>
  )
}
