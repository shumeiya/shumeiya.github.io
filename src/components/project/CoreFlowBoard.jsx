import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Core flow" board: one pass down the product, from a prompt to an
// exported model, in four acts.
//
// The deck hangs each note in a 250–400px gutter beside the product shot and runs a
// leader line into the part it describes. Those gutters were measured for 20px
// Chinese; at the size this page holds — 16px of body, nothing under 14px — they
// take about two thirds of the words, and there is no 1.4× of spare width next to a
// full-bleed screenshot to find. So the notes drop under their own figure in
// columns. That keeps every figure, every word, the numbering, the step pills and
// the reading order; what it gives up is the leader lines, since a note under a
// figure is no longer pointing at one corner of it.

const OX = 80
const OY = 56
const BOARD_W = 1760
const MIN_SCALE = 0.45

// See BackgroundBoard: a size written here lands on screen at size × (column /
// BOARD_W). Rounded up, never down — these are floors.
const COLUMN_W = 1024
const onScreen = (target) => Math.ceil((target * BOARD_W) / COLUMN_W)
const SIZE_BODY = onScreen(16)
const SIZE_META = onScreen(14)
const SIZE_ACT = 36
const SIZE_NOTE = onScreen(17)

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const ON_ACCENT = "var(--deck-on-accent)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/coreflow"

const at = (x, y, w, h) => ({
  position: "absolute",
  left: x - OX,
  top: y - OY,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

function Text({ x, y, w, children, size = SIZE_BODY, weight = 400, color = "var(--color-ink)", mono, tracking, lh = "normal" }) {
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

// A product screenshot, placed and sized in board coordinates.
function Shot({ src, x, y, w, h }) {
  return (
    <img
      src={`${ART}/${src}`}
      alt=""
      loading="lazy"
      style={{ ...at(x, y, w, h), display: "block", maxWidth: "none" }}
    />
  )
}

// The deck's step pill. Width follows the text, so a translation that runs longer
// widens the pill instead of overflowing a box the deck sized for Chinese.
function Pill({ children, lit }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        height: 48,
        padding: "0 18px",
        fontFamily: SANS,
        fontSize: SIZE_META,
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: lit ? ON_ACCENT : ON_BAND,
      }}
    >
      <Chamfer fill={lit ? ACCENT : BAND} stroke={lit ? ACCENT : RULE} cut={8} width={1.5} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// A run of pills with the deck's chevron between them.
function PillRow({ x, y, items, lit }) {
  return (
    <div style={{ ...at(x, y), display: "flex", alignItems: "center", gap: 14 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {i > 0 && (
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 12,
                background: ACCENT_INK,
                clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              }}
            />
          )}
          <Pill lit={lit}>{item}</Pill>
        </div>
      ))}
    </div>
  )
}

// One note: the deck's accent dot, a heading, and the body under it. Title and body
// flow rather than sitting at fixed offsets — a heading that wraps to two lines in
// one language would otherwise land on top of its own body in the other.
function Note({ x, y, w, title, body }) {
  return (
    <div style={at(x, y, w)}>
      <p
        style={{
          position: "relative",
          paddingLeft: 26,
          fontFamily: SANS,
          fontSize: SIZE_NOTE,
          fontWeight: 500,
          lineHeight: 1.3,
          color: "var(--color-cream)",
        }}
      >
        <span
          aria-hidden="true"
          style={{ position: "absolute", left: 0, top: 9, width: 12, height: 12, background: ACCENT, borderRadius: 2 }}
        />
        {title}
      </p>
      <p style={{ marginTop: 12, fontFamily: SANS, fontSize: SIZE_BODY, lineHeight: 1.6, color: ON_BAND }}>
        {body}
      </p>
    </div>
  )
}

// The head of an act: its number in a chamfered square, then the act's name.
function ActHead({ x, y, n, title }) {
  return (
    <>
      {n && (
        <>
          <div style={at(x, y, 52, 52)}>
            <Chamfer fill={ACCENT} stroke={ACCENT} cut={8} />
          </div>
          <Text
            x={x}
            y={y + 12}
            w={52}
            size={SIZE_BODY}
            weight={500}
            mono
            color={ON_ACCENT}
            lh={1.1}
          >
            <span style={{ display: "block", textAlign: "center" }}>{n}</span>
          </Text>
        </>
      )}
      <Text x={n ? x + 72 : x} y={y + 4} size={SIZE_ACT} weight={500} color="var(--color-cream)">
        {title}
      </Text>
    </>
  )
}

// The deck's wide bracket, which gathers the editor's tools under one span.
function Bracket({ x, y, w }) {
  return (
    <div aria-hidden="true" style={at(x, y, w, 14)}>
      <span style={{ position: "absolute", left: 0, top: 13, width: w, height: 1, background: ACCENT_INK }} />
      <span style={{ position: "absolute", left: 0, top: 0, width: 1, height: 14, background: ACCENT_INK }} />
      <span style={{ position: "absolute", right: 0, top: 0, width: 1, height: 14, background: ACCENT_INK }} />
    </div>
  )
}

export default function CoreFlowBoard({ board }) {
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

  const { acts, tools, outputs } = board

  // --- the vertical rhythm ----------------------------------------------------
  const LEAD_Y = 190
  const STEPS_Y = 372
  const RULE1_Y = 470

  // Act 1 — the Dashboard. The deck lays its shell and three panes out as separate
  // nodes; `K` scales the whole group together so the panes keep their places.
  const A1 = 530
  const DASH = { x: 340, y: A1 + 140, k: 1.165 }
  const dashW = 1064 * DASH.k
  const dashH = 577.58 * DASH.k
  const PANES = [
    { src: "dash-left.png", dx: 79.99, dy: 215.86, w: 231.15, h: 344.08 },
    { src: "dash-mid.png", dx: 318.2, dy: 215.86, w: 467.6, h: 344.08 },
    { src: "dash-right.png", dx: 792.85, dy: 215.86, w: 247.62, h: 344.08 },
  ]
  const A1_NOTES = DASH.y + dashH + 70
  const RULE2_Y = A1_NOTES + 300

  // Act 2 — the two task cards, stacked and centred, notes underneath.
  const A2 = RULE2_Y + 60
  const TASKS_Y = A2 + 140
  const TASK_W = 421 * 1.3
  const TASK_H = 144 * 1.3
  const TASK_X = 80 + (1760 - TASK_W) / 2
  const A2_NOTES = TASKS_Y + TASK_H + 40 + TASK_H + 70
  const RULE3_Y = A2_NOTES + 300

  // Act 3 — the Execution Log.
  const A3 = RULE3_Y + 60
  const LOG = { x: 466, y: A3 + 140, w: 987 * 1.24, h: 535.76 * 1.24 }
  const A3_NOTES = LOG.y + LOG.h + 70
  const RULE4_Y = A3_NOTES + 300

  // Act 4 — the Editor, its tool rail, and what you leave with.
  const A4 = RULE4_Y + 60
  const EDITOR = { x: 380, y: A4 + 140, w: 1233 * 1.13, h: 669 * 1.13 }
  const A4_NOTES = EDITOR.y + EDITOR.h + 70
  const TOOLS_Y = A4_NOTES + 260
  const TOOL_W = 257 * 1.1
  const TOOL_H = 318 * 1.1
  const TOOL_X = [80, 424, 768, 1112, 1456]
  const TOOL_CAP = TOOLS_Y + TOOL_H + 36
  // A five-line caption in the longer language still has to clear the row below it.
  const OUT_Y = TOOL_CAP + 420
  const OUT_X = [80, 740, 1300]
  const OUT_CAP = OUT_Y + 290

  const BOARD_H = OUT_CAP + 240 - OY

  const rule = (y) => (
    <div key={`r${y}`} aria-hidden="true" style={{ ...at(80, y, 1760, 1), background: RULE }} />
  )

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
            <div style={at(80, 56)}>
              <Pill>{board.label}</Pill>
            </div>
            <Text x={80} y={136} w={1600} size={48} weight={500} lh={1.2} color="var(--color-cream)">
              {board.title}
            </Text>
            <Text x={80} y={LEAD_Y + 50} w={1680} size={SIZE_BODY} lh={1.6}>
              {board.lead}
            </Text>
            <PillRow x={80} y={STEPS_Y} items={board.steps} />
            {rule(RULE1_Y)}

            {/* ---- act 1 · Dashboard ---- */}
            <ActHead x={80} y={A1} n={acts[0].n} title={acts[0].title} />
            <PillRow x={1180} y={A1 - 2} items={acts[0].steps.map((i) => board.steps[i])} lit />
            <Shot src="dashboard.png" x={DASH.x} y={DASH.y} w={dashW} h={dashH} />
            {PANES.map((pane) => (
              <Shot
                key={pane.src}
                src={pane.src}
                x={DASH.x + pane.dx * DASH.k}
                y={DASH.y + pane.dy * DASH.k}
                w={pane.w * DASH.k}
                h={pane.h * DASH.k}
              />
            ))}
            {acts[0].notes.map((note, i) => (
              <Note key={i} x={[80, 680, 1280][i]} y={A1_NOTES} w={560} title={note.title} body={note.body} />
            ))}
            {rule(RULE2_Y)}

            {/* ---- act 2 · the queue ---- */}
            <ActHead x={80} y={A2} n={acts[1].n} title={acts[1].title} />
            <Shot src="task-a.png" x={TASK_X} y={TASKS_Y} w={TASK_W} h={TASK_H} />
            <Shot src="task-b.png" x={TASK_X} y={TASKS_Y + TASK_H + 40} w={TASK_W} h={TASK_H} />
            {acts[1].notes.map((note, i) => (
              <Note key={i} x={[80, 980][i]} y={A2_NOTES} w={760} title={note.title} body={note.body} />
            ))}
            {rule(RULE3_Y)}

            {/* ---- act 3 · Execution Log ---- */}
            <ActHead x={80} y={A3} n={acts[2].n} title={acts[2].title} />
            <PillRow x={1480} y={A3 - 2} items={acts[2].steps.map((i) => board.steps[i])} lit />
            <Shot src="execlog.png" x={LOG.x} y={LOG.y} w={LOG.w} h={LOG.h} />
            {acts[2].notes.map((note, i) => (
              <Note key={i} x={[80, 680, 1280][i]} y={A3_NOTES} w={560} title={note.title} body={note.body} />
            ))}
            {rule(RULE4_Y)}

            {/* ---- act 4 · Editor ---- */}
            <ActHead x={80} y={A4} n={acts[3].n} title={acts[3].title} />
            <PillRow x={1180} y={A4 - 2} items={acts[3].steps.map((i) => board.steps[i])} lit />
            <Shot src="editor.png" x={EDITOR.x} y={EDITOR.y} w={EDITOR.w} h={EDITOR.h} />
            {acts[3].notes.map((note, i) => (
              <Note key={i} x={[80, 980][i]} y={A4_NOTES} w={760} title={note.title} body={note.body} />
            ))}

            <Bracket x={80} y={TOOLS_Y - 44} w={1760} />
            {tools.map((tool, i) => (
              <div key={tool.file}>
                <Shot src={tool.file} x={TOOL_X[i]} y={TOOLS_Y} w={TOOL_W} h={TOOL_H} />
                <Note x={TOOL_X[i]} y={TOOL_CAP} w={300} title={tool.title} body={tool.body} />
              </div>
            ))}

            <Bracket x={80} y={OUT_Y - 44} w={1760} />
            {outputs.map((out, i) => (
              <div key={out.file}>
                <Shot src={out.file} x={OUT_X[i]} y={OUT_Y} w={out.w * 1.1} h={out.h * 1.1} />
                <Note x={OUT_X[i]} y={OUT_CAP} w={520} title={out.title} body={out.body} />
              </div>
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
