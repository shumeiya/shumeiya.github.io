import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { createDeckArt, ACCENT, ACCENT_INK, ON_ACCENT, ON_BAND, CREAM, SANS } from "./deckArt"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Core flow" board: one pass down the product, from a prompt to an
// exported model, in four acts.
//
// This one is drawn at the deck's own coordinates — every note sits in the gutter
// the deck put it in, with the arrow that points at the part of the UI it describes.
//
// It holds the page's reading column, the same 1024px box every other section uses,
// and the whole frame scales into it: 1760 → 1024 is 0.58, so the deck's own 20px
// lands at about 12px on screen. That is the price of keeping the deck's geometry —
// the gutters are 250–560px wide and were measured for 20px Chinese, so type cannot
// be enlarged inside the frame without the notes bursting out of them.

const OX = 80
const OY = 112
const BOARD_W = 1760
const BOARD_H = 4248
// The floor the board stops shrinking at and starts scrolling sideways instead —
// the same one the design-system board above it uses, so the two behave alike on a
// narrow screen. The reading column sits well above it at 0.58.
const MIN_SCALE = 0.45

const { at, Text, Shot, Arrow, Bracket, Note, Rule } = createDeckArt({
  ox: OX,
  oy: OY,
  art: "/project/kyrall/coreflow",
})

// The deck's step pill. Width follows the text, so a longer translation widens the
// pill instead of overflowing a box the deck sized for Chinese. A step is outlined
// until the act it belongs to is the one being told, and filled from then on.
function Pill({ children, lit }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 44,
        padding: "0 16px",
        fontFamily: SANS,
        fontSize: 20,
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: lit ? ON_ACCENT : CREAM,
      }}
    >
      {/* An unlit pill takes Chamfer's own default fill — the page colour — which is
          what the deck does: the background grid stops at the pill's edge. */}
      <Chamfer fill={lit ? ACCENT : undefined} stroke={lit ? ACCENT : CREAM} cut={10} width={2} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// `rx` anchors the row's right edge instead of its left. The deck's act rows end
// flush with the board's right margin, and a pill is only as wide as its label — so
// left-anchoring them pushes the Chinese run past the edge of the board.
// `lit` is `true` for a row that is wholly lit, or the index of the one step the
// row is about; a row with any lit step carries accent arrows between its pills.
function PillRow({ x, rx, y, items, lit }) {
  const place =
    rx === undefined ? at(x, y) : { position: "absolute", right: OX + BOARD_W - rx, top: y - OY }
  const isLit = (i) => lit === true || lit === i
  const arrow = lit === undefined ? CREAM : ACCENT_INK
  return (
    <div style={{ ...place, display: "flex", alignItems: "center", gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {i > 0 && (
            <span
              aria-hidden="true"
              style={{ width: 10, height: 12, background: arrow, clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
            />
          )}
          <Pill lit={isLit(i)}>{item}</Pill>
        </div>
      ))}
    </div>
  )
}

// An act's number in its chamfered square, then the act's name — the subject in the
// page's own ink, the point of the act in the accent, as the deck sets it.
function ActHead({ y, n, title, accent, x = 80, titleX = 140 }) {
  return (
    <>
      {n && (
        <>
          <div style={at(x, y, 44, 44)}>
            <Chamfer fill={ACCENT} stroke={ACCENT} cut={8} />
          </div>
          <div
            style={{
              ...at(x, y, 44, 44),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: SANS,
              fontSize: 24,
              fontWeight: 500,
              color: ON_ACCENT,
            }}
          >
            {n}
          </div>
        </>
      )}
      <Text x={titleX} y={y - 2} size={36} weight={500} color={CREAM}>
        {title}
        <span style={{ color: ACCENT_INK }}>{accent}</span>
      </Text>
    </>
  )
}

// The Dashboard is four nodes in the deck — a shell and three panes laid over it.
const DASH = { x: 428, y: 561, w: 1064, h: 577.58 }
const PANES = [
  { src: "dash-left.png", x: 507.99, y: 776.86, w: 231.15, h: 344.08 },
  { src: "dash-mid.png", x: 746.2, y: 776.86, w: 467.6, h: 344.08 },
  { src: "dash-right.png", x: 1220.85, y: 776.86, w: 247.62, h: 344.08 },
]
const TOOL_X = [105, 468.5, 832, 1195.5, 1559]
const TOOL_CAP_X = [138, 501, 864, 1228, 1592]
const TOOL_CAP_W = 290

export default function CoreFlowBoard({ board }) {
  const t = useT()
  const hostRef = useRef(null)
  const [scale, setScale] = useState(MIN_SCALE)
  const [hostW, setHostW] = useState(0)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setHostW(entry.contentRect.width)
      setScale(Math.min(1, Math.max(MIN_SCALE, entry.contentRect.width / BOARD_W)))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { acts, tools, outputs, steps } = board

  return (
    <figure className="mt-8">
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
            <Text x={80} y={112} w={1700} size={48} weight={600} lh={1.2} color={CREAM}>
              {board.title}
            </Text>
            <Text x={80} y={190} w={1620} size={20} lh={1.6}>
              {board.lead}
            </Text>
            <PillRow x={80} y={296} items={steps} />
            <Rule x={80} y={380} w={1760} />

            {/* ---- act 1 · Dashboard ---- */}
            <ActHead y={421} n="1" title={acts[0].title} accent={acts[0].titleAccent} />
            <PillRow rx={1840} y={421} items={acts[0].steps.map((i) => steps[i])} lit />

            <Shot src="dashboard.png" x={DASH.x} y={DASH.y} w={DASH.w} h={DASH.h} />
            {PANES.map((pane) => (
              <Shot key={pane.src} {...pane} />
            ))}

            <Arrow from={[506.5, 795]} to={[353.5, 795]} />
            <Note x={134} y={776} w={290} title={acts[0].notes[0].title} body={acts[0].notes[0].body} dy={14} />

            <Arrow from={[982, 1121]} to={[982, 1214.5]} />
            <Note x={747} y={1222} w={520} title={acts[0].notes[1].title} body={acts[0].notes[1].body} dy={14} />

            <Arrow from={[1464, 797]} to={[1543, 797]} />
            <Note x={1587} y={776} w={253} title={acts[0].notes[2].title} body={acts[0].notes[2].body} dy={14} />
            <Rule x={80} y={1456} w={1760} />

            {/* ---- act 2 · the queue, and act 3 · Execution Log ---- */}
            <ActHead y={1523} n="3" title={acts[2].title} accent={acts[2].titleAccent} />
            <ActHead
              y={1523}
              n="2"
              title={acts[1].title}
              accent={acts[1].titleAccent}
              x={1206}
              titleX={1266}
            />

            <Note x={146} y={1589} w={490} title={acts[2].notes[0].title} body={acts[2].notes[0].body} dy={14} />
            <Note x={675} y={1589} w={560} title={acts[2].notes[1].title} body={acts[2].notes[1].body} dy={14} />
            <Shot src="execlog.png" x={146} y={1752} w={987} h={535.76} />
            <Arrow from={[640, 2280]} to={[640, 2324]} />
            <Note x={586} y={2332} w={460} title={acts[2].notes[2].title} body={acts[2].notes[2].body} dy={14} />

            <Note x={1293} y={1612} w={545} title={acts[1].notes[0].title} body={acts[1].notes[0].body} dy={14} />
            <Note x={1293} y={1773} w={545} title={acts[1].notes[1].title} body={acts[1].notes[1].body} dy={14} />
            <Shot src="task-a.png" x={1264} y={1956} w={421} h={144} />
            <Shot src="task-b.png" x={1264} y={2143} w={421} h={144} />
            <Arrow from={[1264, 2030]} to={[1137, 2030]} />
            <Arrow from={[1660, 928.5]} to={[1660, 1490]} />
            <Arrow from={[1474, 2288]} to={[1474, 2493]} />
            <Rule x={80} y={2461} w={1760} />

            {/* ---- act 4 · Editor ---- */}
            <ActHead y={2521} title={acts[3].title} accent={acts[3].titleAccent} x={80} titleX={144} />
            <PillRow rx={1840} y={2520} items={acts[3].steps.map((i) => steps[i])} lit={1} />
            <Shot src="editor.png" x={607} y={2606} w={1232.68} h={669.15} />

            <Arrow from={[941, 2785]} to={[420, 2785]} />
            <Note x={308} y={2764} w={260} title={acts[3].notes[0].title} body={acts[3].notes[0].body} dy={14} />
            <Arrow from={[632.5, 3011]} to={[457, 3011]} />
            <Arrow from={[290, 3015]} to={[290, 3288]} />
            <Note x={308} y={2995} w={260} title={acts[3].notes[1].title} body={acts[3].notes[1].body} dy={14} />

            {/* the editor's tool rail */}
            <Bracket x={105} y={3344} w={1705} />
            {tools.map((tool, i) => (
              <div key={tool.file}>
                <Shot src={tool.file} x={TOOL_X[i]} y={3391} w={256.5} h={318} />
                <Note
                  x={TOOL_CAP_X[i]}
                  y={3734}
                  w={Math.min(TOOL_CAP_W, 1840 - TOOL_CAP_X[i])}
                  title={tool.title}
                  body={tool.body}
                  dy={14}
                />
              </div>
            ))}

            {/* what you leave with */}
            <Bracket x={105} y={3875} w={1705} />
            <Arrow from={[305, 3875]} to={[305, 3950]} />
            <Shot src="bot-history.png" x={108} y={3929} w={423} h={235.5} />
            <Shot src="bot-share.png" x={1170.5} y={3994} w={210} h={170.25} />
            <Shot src="bot-export.png" x={1568.5} y={4042} w={210} h={122.25} />
            <Arrow from={[586.5, 4104]} to={[1140, 4104]} />
            <PillRow x={731} y={4043} items={acts[3].steps.slice(1).map((i) => steps[i])} lit={1} />
            {outputs.map((out, i) => (
              <Note
                key={out.file}
                x={[138, 1194, 1592][i]}
                y={4181}
                w={[400, 330, 248][i]}
                title={out.title}
                body={out.body}
                dy={14}
              />
            ))}
          </div>
        </div>
      </div>

      {BOARD_W * scale > hostW + 1 && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
