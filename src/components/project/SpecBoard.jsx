import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Specification" board: nine specification pages dealt out as two
// staggered rows of cards that bleed off both edges and fade into the ground.
//
// Rebuilt in the page rather than exported per language — the card titles are real
// text again, and only the nine pages inside the cards stay as pictures, which is
// what they are. Gone, as on the other boards: the background grid, the dark slide
// panel, and the deck's own header block, which the page's section heading repeats.

const OX = 80
const OY = 0
const BOARD_W = 1760
const BOARD_H = 820
const MIN_SCALE = 0.45

// See BackgroundBoard: a size written here lands on screen at size × (column /
// BOARD_W). Rounded up, never down — these are floors.
const COLUMN_W = 1024
const onScreen = (target) => Math.ceil((target * BOARD_W) / COLUMN_W)
const SIZE_BODY = onScreen(16)
const SIZE_META = onScreen(14)

const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"
const PAGE = "var(--color-page)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/spec"

// The card deck's own geometry, in the frame's coordinates.
const ROW = [
  { y: 0, h: 400, imgH: 336, opacity: 0.45 },
  { y: 200, h: 420, imgH: 356, opacity: 1 },
]
const CARD_W = 440
const STACK_Y = 200
const STACK_H = 620

const at = (x, y, w, h) => ({
  position: "absolute",
  left: x - OX,
  top: y - OY,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

function Text({ x, y, w, children, size = SIZE_BODY, weight = 400, color = "var(--color-ink)", mono, tracking, lh = "normal", align, opacity }) {
  return (
    <p
      style={{
        ...at(x, y, w),
        fontFamily: mono ? MONO : SANS,
        fontSize: size,
        fontWeight: weight,
        lineHeight: lh,
        letterSpacing: tracking,
        color,
        textAlign: align,
        opacity,
        whiteSpace: w === undefined ? "nowrap" : undefined,
      }}
    >
      {children}
    </p>
  )
}

// The deck's three-bar glyph in the corner of every card. Three rules, not an asset.
function Menu({ x, y }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 22,
        height: 16,
        background: `repeating-linear-gradient(to bottom, ${ON_BAND} 0 2px, transparent 2px 7px)`,
      }}
    />
  )
}

// A gradient that sinks the row above it into the page.
//
// The deck can afford a gradient that only gets most of the way there, because its
// slide ground and the gradient's end are the same near-black. On the page the card
// surface and the page colour are much further apart, so a fade that stops at 70%
// leaves a bright lip along the bottom of every card: this one has to land on the
// page colour exactly where the cards end.
function Scrim({ top, height, from = "0%" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -80,
        top,
        width: 1920,
        height,
        background: `linear-gradient(to bottom, transparent ${from}, ${PAGE} 100%)`,
      }}
    />
  )
}

// One specification page, in its card.
function Card({ card, t }) {
  const row = ROW[card.row]
  return (
    <div
      style={{
        position: "absolute",
        left: card.x - OX,
        top: row.y,
        width: CARD_W,
        height: row.h,
        opacity: row.opacity,
      }}
    >
      <Chamfer fill={BAND} stroke={RULE} cut={12} />
      <p
        style={{
          position: "absolute",
          left: 24,
          top: 20,
          fontFamily: SANS,
          fontSize: SIZE_BODY,
          fontWeight: 500,
          lineHeight: 1.1,
          color: ON_BAND,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontFamily: MONO, letterSpacing: "0.6px" }}>{card.n} </span>
        {card.name}
      </p>
      <Menu x={394} y={24} />
      <div style={{ position: "absolute", left: 24, top: 64, width: 392, height: row.imgH, overflow: "hidden" }}>
        {/* The deck anchors each page top-left and lets it run past the frame, so a
            tall specification shows its head instead of being squashed. */}
        <img
          src={`${ART}/${card.file}`}
          alt={t(ui.specPage)}
          loading="lazy"
          style={{ position: "absolute", left: 0, top: 0, maxWidth: "none", ...card.img }}
        />
      </div>
    </div>
  )
}

export default function SpecBoard({ board }) {
  const t = useT()
  const hostRef = useRef(null)
  const [scale, setScale] = useState(MIN_SCALE)

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
            <Text x={80} y={0} w={1200} size={SIZE_BODY} lh={1.6}>
              {board.body}
            </Text>

            {/* ---- the stack ---- */}
            {/* Order matters here, and it is the deck's: the back row, the scrim that
                sinks it, then the front row on top of that scrim, then the scrim that
                sinks the front row's own feet. Drawing both scrims last would haze
                over the cards that are meant to be crisp. */}
            <div style={{ ...at(80, STACK_Y, 1760, STACK_H), overflow: "hidden" }}>
              {board.cards
                .filter((card) => card.row === 0)
                .map((card) => (
                  <Card key={card.file} card={card} t={t} />
                ))}
              <Scrim top={-2} height={470} from="28.936%" />
              {board.cards
                .filter((card) => card.row === 1)
                .map((card) => (
                  <Card key={card.file} card={card} t={t} />
                ))}
              <Scrim top={ROW[1].y + ROW[1].h - 220} height={220} />
            </div>
          </div>
        </div>
      </div>

      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
