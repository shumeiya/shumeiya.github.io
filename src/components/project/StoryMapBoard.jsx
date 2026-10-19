import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

const OX = 80
const OY = 136
const BOARD_W = 1760
const BOARD_H = 1300
const MIN_SCALE = 0.45

// See BackgroundBoard: a size written here lands on screen at size × (column /
// BOARD_W). Rounded up, never down — these are floors.
const COLUMN_W = 1024
const onScreen = (target) => Math.ceil((target * BOARD_W) / COLUMN_W)
const SIZE_META = onScreen(14)

// The grid, in artboard coordinates.
const PERSON_W = 200
const COL_X = [290, 602, 914, 1226, 1538]
const COL_W = 300
// Same gap under the title as the Persona board above it, so the two boards in this
// section open the same way.
const STAGE_Y = 252
const STAGE_H = 50
// Tall enough for the worst cell: four lines of English plus three pills, each of
// which takes a row of its own at this size.
const ROW_Y = [326, 706, 1086]
const ROW_H = 350

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const ON_ACCENT = "var(--deck-on-accent)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

// The three faces are the Persona board's — one copy of each, not two.
const ART = "/project/kyrall/persona"

const at = (x, y, w, h) => ({
  position: "absolute",
  left: x - OX,
  top: y - OY,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

function Text({ x, y, w, children, size = SIZE_META, weight = 400, color = "var(--color-ink)", mono, tracking, lh = "normal", align }) {
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
        whiteSpace: w === undefined ? "nowrap" : undefined,
      }}
    >
      {children}
    </p>
  )
}

// The deck's pills. Width follows the text, so a longer translation widens the pill
// rather than overflowing a box the deck sized for Chinese.
function Pill({ children }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        minHeight: 40,
        padding: "8px 14px",
        fontFamily: SANS,
        fontSize: SIZE_META,
        lineHeight: 1.3,
        color: ACCENT_INK,
      }}
    >
      <Chamfer fill={BAND} stroke={ACCENT} cut={5} width={1.5} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// One stage header: the number on the left, the stage's own word on the right, in
// the mono position the deck gave it.
function Stage({ stage, x }) {
  const ink = stage.lit ? ON_ACCENT : ON_BAND
  return (
    <>
      <div style={at(x, STAGE_Y, COL_W, STAGE_H)}>
        <Chamfer fill={stage.lit ? ACCENT : BAND} stroke={stage.lit ? ACCENT : RULE} cut={8} />
      </div>
      <Text
        x={x + 16}
        y={STAGE_Y + 13}
        size={SIZE_META}
        weight={500}
        mono
        tracking="1.08px"
        color={stage.lit ? ON_ACCENT : ACCENT_INK}
      >
        {stage.n}
      </Text>
      <Text
        x={x}
        y={STAGE_Y + 13}
        w={COL_W - 16}
        size={SIZE_META}
        weight={500}
        mono
        tracking="0.8px"
        align="right"
        color={ink}
      >
        {stage.label}
      </Text>
    </>
  )
}

// One cell. Its copy flows rather than sitting at a fixed offset: the deck's offsets
// were measured for Chinese, and an English line that wraps once more would push the
// pills out of the box.
function Cell({ cell, x, y, lit }) {
  return (
    <div style={at(x, y, COL_W, ROW_H)}>
      <Chamfer fill={BAND} stroke={lit ? ACCENT : RULE} cut={10} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
        <p style={{ fontFamily: SANS, fontSize: SIZE_META, lineHeight: 1.5, color: ON_BAND }}>{cell.text}</p>
        {cell.chips && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {cell.chips.map((chip) => (
              <Pill key={chip}>{chip}</Pill>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function StoryMapBoard({ board }) {
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
    <figure className="mt-7">
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

            {board.stages.map((stage, c) => (
              <Stage key={stage.n} stage={stage} x={COL_X[c]} />
            ))}

            {board.rows.map((row, r) => {
              const y = ROW_Y[r]
              return (
                <div key={row.name}>
                  {/* the person this row belongs to */}
                  <div style={{ ...at(80, y + 6, 120, 120), border: `1px solid ${ACCENT}` }}>
                    <img
                      src={`${ART}/${row.photo}`}
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>
                  <Text x={80} y={y + 140} size={30} weight={500} color="var(--color-cream)">
                    {row.name}
                  </Text>
                  <Text x={80} y={y + 184} w={PERSON_W} size={SIZE_META} lh={1.3} color={ON_BAND}>
                    {row.role}
                  </Text>

                  {row.cells.map((cell, c) => (
                    <Cell key={c} cell={cell} x={COL_X[c]} y={y} lit={board.stages[c].lit} />
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
