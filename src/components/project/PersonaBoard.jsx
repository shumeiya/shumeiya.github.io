import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Persona" board, rebuilt in the page the way the other boards are: the
// artboard's own coordinates, scaled to whatever column it is given, every word real
// text in both languages.
//
// Gone, as on the other boards: the background grid, the dark slide panel, and the
// "01 · PERSONA" label chip the page's own section eyebrow already says. The deck's
// one-line intro under the title is dropped too, to match Background and Competitors.
//
// The three cards are identical in structure, so unlike the other two boards this one
// draws a card rather than a list of coordinates — the only per-card geometry is the
// column it sits in.

const OX = 80
const OY = 136
const BOARD_W = 1760
const BOARD_H = 729
const MIN_SCALE = 0.45

const CARD_W = 560
const CARD_H = 613
// The deck leaves 93 under its title, which is a slide's proportion, not a page's —
// at the scale the board renders that reads as a hole. 49 puts the gap at about
// three quarters of the title's own size.
const CARD_Y = 252
const CARD_X = [80, 680, 1280]

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const ON_ACCENT = "var(--deck-on-accent)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/persona"

// Figma coordinates in, CSS box out.
const at = (x, y, w, h) => ({
  position: "absolute",
  left: x - OX,
  top: y - OY,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

function Text({ x, y, w, children, size = 20, weight = 400, color = "var(--color-ink)", mono, tracking, lh = "normal" }) {
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
        whiteSpace: w === undefined ? "nowrap" : undefined,
      }}
    >
      {children}
    </p>
  )
}

// The deck's pills. Width follows the text so a longer translation widens the pill
// instead of overflowing a box the deck sized for Chinese.
function Pill({ children, filled }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 34,
        padding: "0 12px",
        fontFamily: SANS,
        fontSize: 18,
        lineHeight: 1,
        color: filled ? ON_ACCENT : ACCENT_INK,
      }}
    >
      <Chamfer fill={filled ? ACCENT : BAND} stroke={ACCENT} cut={6} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// The deck's small mono heading above each block of a card.
function Label({ children }) {
  return (
    <p
      style={{
        fontFamily: MONO,
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: "0.96px",
        lineHeight: 1.2,
        color: ACCENT_INK,
      }}
    >
      {children}
    </p>
  )
}

function Section({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      <p style={{ marginTop: 8, fontFamily: SANS, fontSize: 20, lineHeight: 1.5, color: ON_BAND }}>{children}</p>
    </div>
  )
}

// One persona card, drawn in the board's coordinates from the column it starts in.
function Card({ x, card, labels }) {
  return (
    <>
      <div style={at(x, CARD_Y, CARD_W, CARD_H)}>
        <Chamfer fill={BAND} stroke={RULE} cut={12} />
      </div>

      <div style={{ ...at(x + 28, CARD_Y + 28, 140, 140), border: `1px solid ${ACCENT}` }}>
        <img
          src={`${ART}/${card.photo}`}
          alt=""
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div style={{ ...at(x + 188, CARD_Y + 34), display: "flex" }}>
        <Pill>{card.stage}</Pill>
      </div>
      <Text x={x + 188} y={CARD_Y + 80} size={28} weight={500} color="var(--color-cream)">
        {card.name}
      </Text>
      <Text x={x + 188} y={CARD_Y + 120} size={18} color={ON_BAND}>
        {card.meta}
      </Text>

      {/* The deck pins each of the four blocks to its own y, which only works for
          Chinese: an English line that wraps once more would run into the heading
          below it. So the body is a flow column over the deck's own region — top
          and bottom stay where the deck put them, and a longer translation eats
          into the space between blocks instead of the next block. */}
      <div
        style={{
          ...at(x + 28, CARD_Y + 200, 504, 381),
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p style={{ fontFamily: SANS, fontSize: 20, lineHeight: 1.5, color: ON_BAND }}>{card.quote}</p>

        <Section label={labels.goal}>{card.goal}</Section>
        <Section label={labels.pain}>{card.pain}</Section>

        <div>
          <Label>{labels.chance}</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
            {card.chances.map((chance) => (
              <Pill key={chance} filled>
                {chance}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default function PersonaBoard({ board }) {
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

  const labels = { goal: board.goalLabel, pain: board.painLabel, chance: board.chanceLabel }

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
            <Text x={80} y={136} w={1400} size={56} weight={500} lh={1.2} color="var(--color-cream)">
              {board.title}
            </Text>

            {board.cards.map((card, i) => (
              <Card key={card.name} x={CARD_X[i]} card={card} labels={labels} />
            ))}
          </div>
        </div>
      </div>

      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
