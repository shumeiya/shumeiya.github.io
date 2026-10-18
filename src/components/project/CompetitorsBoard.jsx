import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Competitive analysis" board, rebuilt in the page the way the other two
// boards are: the artboard's own coordinates, scaled to whatever column it is given,
// with every word real text in both languages rather than a flattened export.
//
// What the slide carried and the page doesn't need is gone: the background grid, the
// dark slide panel, and the "01 · COMPETITORS" label chip, which the page's own
// section eyebrow already says. Colour comes from `.kyrall-deck` in index.css.
//
// The one thing that cannot flip with the theme is a competitor's logo: four brands,
// four different inks, two of them white. They sit on a small constant-dark tile —
// which is what the deck draws anyway, a 28px rounded rectangle per mark.

const OX = 80
const OY = 136
const BOARD_W = 1760
const BOARD_H = 864
const MIN_SCALE = 0.45

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const ON_ACCENT = "var(--deck-on-accent)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"
// Not a deck token: `--deck-figure` flips with the theme now, and this must not.
// Four brands, four inks, two of them white — they only survive on a dark ground.
const LOGO_TILE = "#191717"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/competitors"

// Figma coordinates in, CSS box out.
const at = (x, y, w, h) => ({
  position: "absolute",
  left: x - OX,
  top: y - OY,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

// --- primitives --------------------------------------------------------------

function Text({ x, y, w, children, size = 20, weight = 400, color = "var(--color-ink)", mono, tracking, lh = "normal", align }) {
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

// A table cell: chamfered box with its copy centred inside it. The copy is centred
// rather than placed at the deck's per-cell offsets because the two languages set to
// different numbers of lines — a fixed top would strand the shorter one.
function Cell({ x, y, w, h, fill, stroke, cut = 8, size = 20, color, children }) {
  return (
    <div style={{ ...at(x, y, w, h), display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Chamfer fill={fill} stroke={stroke} cut={cut} />
      <span
        style={{
          position: "relative",
          padding: "0 16px",
          fontFamily: SANS,
          fontSize: size,
          lineHeight: 1.4,
          textAlign: "center",
          color,
        }}
      >
        {children}
      </span>
    </div>
  )
}

// The deck's pills. Width follows the text, so a translation that runs longer simply
// makes a wider pill instead of overflowing a fixed box.
function Pill({ children, stroke, color, fill, size = 18, cut = 6 }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 36,
        padding: "0 12px",
        fontFamily: SANS,
        fontSize: size,
        lineHeight: 1,
        color,
      }}
    >
      <Chamfer fill={fill} stroke={stroke} cut={cut} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// A dashed ring of the positioning map, given by its centre and radius.
function Ring({ cx, cy, r }) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(cx - r, cy - r, r * 2, r * 2),
        borderRadius: "50%",
        border: `1px dashed ${RULE}`,
      }}
    />
  )
}

// The glow behind Kyrall's position: four concentric discs, the deck's own opacities.
function Glow({ cx, cy }) {
  return [
    [76, 0.08],
    [50, 0.14],
    [26, 0.25],
    [10, 1],
  ].map(([r, opacity]) => (
    <div
      key={r}
      aria-hidden="true"
      style={{
        ...at(cx - r, cy - r, r * 2, r * 2),
        borderRadius: "50%",
        background: ACCENT,
        opacity,
      }}
    />
  ))
}

// An axis arrowhead — a 12px triangle pointing right or up.
function Arrow({ x, y, up }) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(x, y, 12, 12),
        background: RULE,
        clipPath: up ? "polygon(50% 0, 0 100%, 100% 100%)" : "polygon(100% 50%, 0 0, 0 100%)",
      }}
    />
  )
}

// A competitor's mark. Brand ink is not ours to re-theme, so the tile under it stays
// dark in both themes; without it the two white marks would vanish on paper.
function Logo({ src, x, y }) {
  return (
    <div
      aria-hidden="true"
      style={{ ...at(x, y, 28, 28), borderRadius: 6, background: LOGO_TILE, overflow: "hidden" }}
    >
      <img src={`${ART}/${src}`} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
    </div>
  )
}

// --- the board ---------------------------------------------------------------

export default function CompetitorsBoard({ board }) {
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

  const { matrix, columns, rows, summary } = board

  // Geometry lifted straight from the frame.
  const COL_X = [810, 1070, 1330, 1590]
  const COL_W = 250
  const ROWS = [
    { y: 362, h: 92 },
    { y: 464, h: 92 },
    { y: 566, h: 124 },
    { y: 700, h: 124 },
  ]
  // The positioning map, in frame coordinates: panel, axis cross, Kyrall's spot.
  const MAP = { x: 80, y: 296, w: 560, h: 528 }
  const ORIGIN = { x: 360, y: 596 }
  const MARKS = [
    { src: "logo-mecagent.png", x: 213, y: 438, label: "MecAgent", lx: 251, ly: 441 },
    { src: "logo-adam.png", x: 435, y: 507, label: "Adam", lx: 473, ly: 510 },
    { src: "logo-backflip.png", x: 247, y: 518, label: "Backflip", lx: 285, ly: 521 },
    { src: "logo-zoo.png", x: 269, y: 656, label: "Zoo", lx: 307, ly: 659 },
  ]

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
            {/* ---- header ---- */}
            <Text x={80} y={136} size={56} weight={500} color="var(--color-cream)">
              {board.title}
            </Text>

            {/* ---- positioning map ---- */}
            <div style={at(MAP.x, MAP.y, MAP.w, MAP.h)}>
              <Chamfer fill={BAND} stroke={RULE} cut={12} />
            </div>
            <Text x={104} y={316} size={18} weight={500} mono tracking="0.96px" color={ACCENT_INK}>
              {matrix.eyebrow}
            </Text>

            <Ring cx={ORIGIN.x} cy={ORIGIN.y} r={60} />
            <Ring cx={ORIGIN.x} cy={ORIGIN.y} r={120} />
            <Ring cx={ORIGIN.x} cy={ORIGIN.y} r={180} />
            <div aria-hidden="true" style={{ ...at(120, ORIGIN.y - 0.75, 480, 1.5), background: RULE }} />
            <div aria-hidden="true" style={{ ...at(ORIGIN.x - 0.75, 376, 1.5, 408), background: RULE }} />
            <Arrow x={594} y={590} />
            <Arrow x={354} y={370} up />

            <Glow cx={520} cy={456} />
            {/* The wordmark is a drawing, so it is masked rather than tinted — it then
                takes the theme's reading value for the deck's yellow-green. */}
            <div
              aria-hidden="true"
              style={{
                ...at(481, 479, 83.56, 12.93),
                background: ACCENT_INK,
                maskImage: `url(${ART}/kyrall-mark.svg)`,
                WebkitMaskImage: `url(${ART}/kyrall-mark.svg)`,
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
              }}
            />

            {MARKS.map((mark) => (
              <div key={mark.label}>
                <Logo src={mark.src} x={mark.x} y={mark.y} />
                <Text x={mark.lx} y={mark.ly} size={18} color={ON_BAND}>
                  {mark.label}
                </Text>
              </div>
            ))}

            <div style={{ ...at(472, 336), display: "flex" }}>
              <Pill fill={ACCENT} stroke={ACCENT} color={ON_ACCENT}>
                {matrix.chip}
              </Pill>
            </div>

            <Text x={210} y={348} w={300} size={18} align="center" color={ON_BAND}>
              {matrix.top}
            </Text>
            <Text x={210} y={784} w={300} size={18} align="center" color={ON_BAND}>
              {matrix.bottom}
            </Text>
            <Text x={90} y={603} w={120} size={18} align="right" color={ON_BAND}>
              {matrix.left}
            </Text>
            <Text x={496} y={610} w={120} size={18} align="right" color={ON_BAND}>
              {matrix.right}
            </Text>

            {/* ---- the comparison table ---- */}
            {columns.map((name, c) => (
              <Cell
                key={name}
                x={COL_X[c]}
                y={296}
                w={COL_W}
                h={56}
                fill={ACCENT}
                stroke={ACCENT}
                size={22}
                color={ON_ACCENT}
              >
                <span style={{ fontWeight: 500 }}>{name}</span>
              </Cell>
            ))}

            {rows.map((row, r) => {
              const { y, h } = ROWS[r]
              const accent = row.tone === "accent"
              return (
                <div key={r}>
                  <Text
                    x={660}
                    y={y + h / 2 - 14}
                    w={130}
                    size={20}
                    weight={500}
                    align="right"
                    color="var(--color-cream)"
                  >
                    {row.label}
                  </Text>
                  {row.cells.map((cell, c) =>
                    Array.isArray(cell) ? (
                      <div
                        key={c}
                        style={{
                          ...at(COL_X[c], y, COL_W, h),
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <Chamfer fill={BAND} stroke={RULE} cut={8} />
                        {cell.map((pill, i) => (
                          <Pill
                            key={i}
                            stroke={accent ? ACCENT : RULE}
                            fill={BAND}
                            color={accent ? ACCENT_INK : ON_BAND}
                          >
                            {pill}
                          </Pill>
                        ))}
                      </div>
                    ) : (
                      <Cell key={c} x={COL_X[c]} y={y} w={COL_W} h={h} fill={BAND} stroke={RULE} color={ON_BAND}>
                        {cell}
                      </Cell>
                    )
                  )}
                </div>
              )
            })}

            {/* ---- the takeaway rail ---- */}
            <div style={at(80, 854, 1760, 146)}>
              <Chamfer fill={ACCENT} stroke={ACCENT} cut={12} />
            </div>
            <Text x={112} y={910} size={28} weight={500} color={ON_ACCENT}>
              {summary.label}
            </Text>
            <Text x={280} y={882} w={1528} size={20} lh={1.5} color={ON_ACCENT}>
              {summary.body}
            </Text>
          </div>
        </div>
      </div>

      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
