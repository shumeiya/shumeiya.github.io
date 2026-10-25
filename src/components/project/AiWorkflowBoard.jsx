import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { createDeckArt, ACCENT, ACCENT_INK, ON_ACCENT, ON_BAND, RULE, CREAM, SANS } from "./deckArt"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "AI workflow" board: four generations of tooling along a timeline,
// the three-lane flow the work runs on now, and the skill that came out of it.
//
// Drawn at the deck's own coordinates, inside the page's reading column like every
// other section. Nothing here is an image — every box, rail and arrow is drawn, so
// the whole board takes the page's theme.

const OX = 80
const OY = 112
const BOARD_W = 1760
const BOARD_H = 2400
const MIN_SCALE = 0.45

const { at, Text, Rule, Head } = createDeckArt({ ox: OX, oy: OY, art: "" })

const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.035em" }

// Everything inside a box is placed against that box's own corner.
const box = (x, y, w, h) => ({
  position: "absolute",
  left: x,
  top: y,
  ...(w === undefined ? null : { width: w }),
  ...(h === undefined ? null : { height: h }),
})

function BoxText({ x, y, w, children, size = 20, weight = 400, color = ON_BAND, lh = 1.5, nowrap, style }) {
  return (
    <p
      style={{
        ...box(x, y, w),
        fontFamily: SANS,
        fontSize: size,
        fontWeight: weight,
        lineHeight: lh,
        color,
        ...(nowrap ? { whiteSpace: "nowrap" } : null),
        ...style,
      }}
    >
      {children}
    </p>
  )
}

// The deck's small chamfered label — a product name, an input, an outcome.
function Chip({ x, y, h = 30, children, lit, tone = RULE, size = 18, pad = 10 }) {
  return (
    <span
      style={{
        ...box(x, y),
        display: "inline-flex",
        alignItems: "center",
        height: h,
        padding: `0 ${pad}px`,
        position: "absolute",
        fontFamily: SANS,
        fontSize: size,
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: lit ? ON_ACCENT : CREAM,
        ...mono,
      }}
    >
      <Chamfer fill={lit ? ACCENT : undefined} stroke={lit ? ACCENT : tone} cut={6} width={1.5} />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  )
}

// A dashed rail — the lanes the flow runs along, and the loop back to the start.
function Dashed({ x, y, w, h }) {
  const vertical = w === undefined
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(x, y, vertical ? 1 : w, vertical ? h : 1),
        backgroundImage: `repeating-linear-gradient(${vertical ? "to bottom" : "to right"}, ${RULE} 0 6px, transparent 6px 12px)`,
      }}
    />
  )
}

// The deck's flow arrow: an elbow in the accent with a small solid head.
function Elbow({ points, color = ACCENT_INK, head = "right" }) {
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  const pad = 14
  const left = Math.min(...xs) - pad
  const top = Math.min(...ys) - pad
  const w = Math.max(...xs) - Math.min(...xs) + pad * 2
  const h = Math.max(...ys) - Math.min(...ys) + pad * 2
  const local = points.map(([x, y]) => [x - left, y - top])
  const tip = local[local.length - 1]
  const headPath =
    head === "right"
      ? `${tip[0]},${tip[1] - 6} ${tip[0] + 10},${tip[1]} ${tip[0]},${tip[1] + 6}`
      : head === "down"
        ? `${tip[0] - 6},${tip[1]} ${tip[0]},${tip[1] + 10} ${tip[0] + 6},${tip[1]}`
        : null
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ ...at(left, top, w, h), overflow: "visible" }}
    >
      <polyline points={local.map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth={2} />
      {headPath && <polygon points={headPath} fill={color} />}
    </svg>
  )
}

// ---- act 01 · the timeline --------------------------------------------------
const PHASE_X = [80, 436, 792, 1148, 1504]
const PHASE_W = 336
const PHASE_Y = 486
const PHASE_H = 470

function Phase({ data, x }) {
  return (
    <>
      {data.now ? (
        <span aria-hidden="true" style={{ ...at(x, 448, 12, 12), background: ACCENT, borderRadius: 2 }} />
      ) : (
        <span
          aria-hidden="true"
          style={{ ...at(x, 448, 12, 12), border: `1.5px solid ${RULE}`, borderRadius: 2, boxSizing: "border-box" }}
        />
      )}
      <Text x={x + 24} y={442} size={18} color={data.now ? ACCENT_INK : ON_BAND} lh={1.22} style={mono}>
        {data.when}
      </Text>
      <div style={at(x, PHASE_Y, PHASE_W, PHASE_H)}>
        <Chamfer
          fill="var(--deck-band)"
          stroke={data.now ? ACCENT : "var(--deck-band)"}
          cut={16}
          width={data.now ? 2 : 1}
        />
        <div style={{ position: "relative", width: PHASE_W, height: PHASE_H }}>
          <BoxText x={20} y={20} w={296} size={24} weight={500} color={CREAM} lh={1.25}>
            {data.name}
          </BoxText>
          <Chip x={20} y={60}>
            {data.tag}
          </Chip>
          <div style={{ ...box(20, 110, 296), display: "flex", flexDirection: "column", gap: 14 }}>
            {data.bullets.map((bullet, i) => (
              <div key={i} style={{ position: "relative", paddingLeft: 16 }}>
                <span
                  aria-hidden="true"
                  style={{ position: "absolute", left: 0, top: 9, width: 8, height: 8, background: ACCENT }}
                />
                <p style={{ fontFamily: SANS, fontSize: 18, lineHeight: 1.5, color: ON_BAND }}>{bullet}</p>
              </div>
            ))}
          </div>
          <div aria-hidden="true" style={{ ...box(20, 390, 296, 1), background: RULE }} />
          <BoxText x={20} y={406} w={296} size={18} color={ACCENT_INK}>
            {data.learn}
          </BoxText>
        </div>
      </div>
    </>
  )
}

// ---- act 02 · the lanes -----------------------------------------------------
const LANE_Y = [1246, 1396, 1546]
// Each step: where the deck puts it, and whether it is mine or the machine's.
const STEP_POS = [
  { x: 260, y: 1226, lit: true },
  { x: 520, y: 1376 },
  { x: 780, y: 1226, lit: true },
  { x: 1040, y: 1526, framed: true },
  { x: 1300, y: 1376 },
  { x: 1560, y: 1226, lit: true },
]
// The elbows that carry the flow from one step to the next.
const LINKS = [
  [[480, 1268], [508, 1268], [508, 1418]],
  [[740, 1418], [768, 1418], [768, 1268]],
  [[1000, 1268], [1028, 1268], [1028, 1568]],
  [[1260, 1568], [1288, 1568], [1288, 1418]],
  [[1520, 1418], [1548, 1418], [1548, 1268]],
]

function Step({ data, pos }) {
  return (
    <div style={at(pos.x, pos.y, 220, 84)}>
      <Chamfer
        fill={pos.lit ? ACCENT : "var(--deck-band)"}
        stroke={pos.lit ? ACCENT : pos.framed ? ACCENT : "var(--deck-band)"}
        cut={12}
        width={pos.framed ? 2 : 1}
      />
      <div style={{ position: "relative", width: 220, height: 84 }}>
        <BoxText x={16} y={14} w={188} size={20} weight={500} color={pos.lit ? ON_ACCENT : CREAM} lh={1.2} nowrap>
          {data.title}
        </BoxText>
        <BoxText x={16} y={46} w={188} size={18} color={pos.lit ? ON_ACCENT : ON_BAND} lh={1.22} nowrap>
          {data.sub}
        </BoxText>
      </div>
    </div>
  )
}

// ---- act 03 · the skill -----------------------------------------------------
const SKILL_X = [80, 674.667, 1269.333]
const SKILL_W = 570.667
const IN_Y = [2206, 2258, 2310]

export default function AiWorkflowBoard({ board }) {
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

  const { acts, phases, flow, skill, closing } = board

  return (
    <figure className="mt-8">
      <div ref={hostRef} className="no-scrollbar overflow-x-auto">
        <div style={{ width: BOARD_W * scale, height: BOARD_H * scale }}>
          <div
            className="kyrall-deck relative"
            style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${scale})`, transformOrigin: "top left" }}
          >
            {/* ---- header ---- */}
            <Text x={80} y={112} w={1700} size={48} weight={600} lh={1.2} color={CREAM}>
              {board.title}
            </Text>
            <Text x={80} y={182} w={1200} size={20} lh={1.5}>
              {board.lead}
            </Text>
            <Rule x={80} y={300} w={1760} />

            {/* ---- 01 · the timeline ---- */}
            <Head y={340} n={acts[0].n} title={acts[0].title} accent={acts[0].accent} titleY={342} />
            <div aria-hidden="true" style={{ ...at(80, 454, 1740, 1), background: RULE }} />
            {phases.map((phase, i) => (
              <Phase key={i} data={phase} x={PHASE_X[i]} />
            ))}
            <Rule x={80} y={1036} w={1760} />

            {/* ---- 02 · the flow ---- */}
            <Head y={1076} n={acts[1].n} title={acts[1].title} accent={acts[1].accent} titleY={1078} />
            {/* the loop back to the start, which the deck draws dashed */}
            <Dashed x={1670} y={1190} h={36} />
            <Dashed x={370} y={1190} w={1300} />
            <Dashed x={370} y={1190} h={24} />
            <svg aria-hidden="true" width={12} height={10} viewBox="0 0 12 10" style={at(364, 1214, 12, 10)}>
              <polygon points="0,0 12,0 6,10" fill={RULE} />
            </svg>
            <Text x={394} y={1164} size={18} color={ON_BAND} lh={1.22}>
              {flow.loopNote}
            </Text>

            {flow.lanes.map((lane, i) => (
              <div key={i}>
                <Dashed x={230} y={LANE_Y[i] + 22} w={1610} />
                {/* The deck's lane tag is 120 wide, which the Chinese fills exactly;
                    the English names are longer, so it grows rather than wrapping
                    inside a box only one line tall. */}
                <div
                  style={{
                    ...at(80, LANE_Y[i], undefined, 44),
                    minWidth: 120,
                    width: "max-content",
                    padding: "0 14px",
                  }}
                >
                  <Chamfer fill={lane.lit ? ACCENT : undefined} stroke={lane.lit ? ACCENT : CREAM} cut={10} width={1.5} />
                  <p
                    style={{
                      position: "relative",
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      fontFamily: SANS,
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: 1,
                      color: lane.lit ? ON_ACCENT : CREAM,
                    }}
                  >
                    {lane.name}
                  </p>
                </div>
                <Text x={80} y={LANE_Y[i] + 54} w={120} size={18} lh={1.5}>
                  {lane.caption}
                </Text>
              </div>
            ))}
            {LINKS.map((points, i) => (
              <Elbow key={i} points={points} />
            ))}
            {flow.steps.map((step, i) => (
              <Step key={i} data={step} pos={STEP_POS[i]} />
            ))}
            <Text x={80} y={1706} w={1700} size={20} lh={1.5}>
              {flow.note}
            </Text>
            <Rule x={80} y={1806} w={1760} />

            {/* ---- 03 · the skill ---- */}
            <Head y={1846} n={acts[2].n} title={acts[2].title} accent={acts[2].accent} titleY={1848} />
            {skill.cards.map((card, i) => (
              <div key={i} style={at(SKILL_X[i], 1936, SKILL_W, 230)}>
                <Chamfer fill="var(--deck-band)" stroke="var(--deck-band)" cut={16} width={1} />
                <div style={{ position: "relative", width: SKILL_W, height: 230 }}>
                  <BoxText x={24} y={24} size={18} color={ACCENT_INK} lh={1.22} nowrap style={mono}>
                    {card.n}
                  </BoxText>
                  <BoxText x={64} y={20} size={24} weight={500} color={CREAM} lh={1.2} nowrap>
                    {card.name}
                  </BoxText>
                  <BoxText x={24} y={76} w={522.667} size={20} lh={1.6}>
                    {card.body}
                  </BoxText>
                </div>
              </div>
            ))}
            {[657.667, 1252.333].map((x) => (
              <svg key={x} aria-hidden="true" width={10} height={12} viewBox="0 0 10 12" style={at(x, 2045, 10, 12)}>
                <polygon points="0,0 10,6 0,12" fill={ACCENT_INK} />
              </svg>
            ))}

            {/* what goes into the skill, and what comes out */}
            {skill.inputs.map((input, i) => (
              <Chip key={i} x={80 - OX} y={IN_Y[i] - OY}>
                {input}
              </Chip>
            ))}
            <Elbow points={[[180, 2221], [300, 2273]]} head={null} />
            <Elbow points={[[229, 2273], [300, 2273]]} head={null} />
            <Elbow points={[[188, 2325], [300, 2273]]} head={null} />
            <div style={at(300, 2243, 260, 60)}>
              <Chamfer fill={ACCENT} stroke={ACCENT} cut={12} width={1} />
              <p
                style={{
                  position: "relative",
                  width: 260,
                  height: 60,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: SANS,
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1,
                  color: ON_ACCENT,
                }}
              >
                {skill.hub}
              </p>
            </div>
            <Elbow points={[[560, 2273], [640, 2273]]} />
            {skill.outputs.map((output, i) => (
              <Chip key={i} x={670 - OX} y={IN_Y[i] - OY}>
                {output}
              </Chip>
            ))}

            <Rule x={80} y={2408} w={1760} />
            <Text x={80} y={2448} w={1700} size={28} weight={500} lh={1.4} color={CREAM}>
              {closing.title}
              <span style={{ color: ACCENT_INK }}>{closing.accent}</span>
            </Text>
          </div>
        </div>
      </div>

      {BOARD_W * scale > hostW + 1 && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
