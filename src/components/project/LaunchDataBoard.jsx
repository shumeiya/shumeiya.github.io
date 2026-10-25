import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { createDeckArt, ACCENT, ACCENT_INK, ON_ACCENT, ON_BAND, CREAM, SANS } from "./deckArt"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Launch data" board: seven weeks of PostHog numbers read as one
// argument — the funnel holds, retention is flat but low, the Editor is where the
// value lands, and here is what to do next.
//
// Drawn at the deck's own coordinates, inside the page's reading column like every
// other section. Nothing here is a screenshot: the funnel bars, the retention line
// and the acceptance ring are all drawn, so they take the page's own theme.

const OX = 80
const OY = 112
const BOARD_W = 1760
const BOARD_H = 1180
const MIN_SCALE = 0.45

const { at, Text, Rule } = createDeckArt({ ox: OX, oy: OY, art: "" })

// The deck's dim bar: the accent held back so the lit one carries the eye.
const DIM = 0.4
// A track is the surface lifted, not a colour of its own, so it follows the theme.
const TRACK = "rgba(127, 127, 127, 0.45)"

// The deck's small Latin type is set in a monospace it tracks out; the page has no
// mono face, so the tracking is what carries the look.
const mono = { fontFamily: "var(--font-mono)", letterSpacing: "0.035em" }

// A card: the deck's chamfered box, filled with the band colour.
function Card({ x, y, w, h, children }) {
  return (
    <div style={at(x, y, w, h)}>
      <Chamfer fill="var(--deck-band)" stroke="var(--deck-band)" cut={16} width={1} />
      <div style={{ position: "relative", width: w, height: h }}>{children}</div>
    </div>
  )
}

// Inside a card everything is placed against the card's own corner.
function cardAt(x, y, w, h) {
  return {
    position: "absolute",
    left: x,
    top: y,
    ...(w === undefined ? null : { width: w }),
    ...(h === undefined ? null : { height: h }),
  }
}

function CardText({ x, y, w, children, size = 20, weight = 400, color = ON_BAND, lh = 1.35, style }) {
  return (
    <p style={{ ...cardAt(x, y, w), fontSize: size, fontWeight: weight, lineHeight: lh, color, fontFamily: SANS, ...style }}>
      {children}
    </p>
  )
}

// A card's eyebrow and name, which every card on this board opens with.
function CardHead({ tag, title }) {
  return (
    <>
      <CardText x={24} y={24} size={18} weight={500} color={ACCENT_INK} style={mono}>
        {tag}
      </CardText>
      <CardText x={24} y={52} size={24} weight={500} color={CREAM} lh={1.33}>
        {title}
      </CardText>
    </>
  )
}

// The big launch numbers. Digits run large and the units that follow them run
// small on the same baseline, the way the deck sets them.
const DIGIT = 86
const UNIT = 54

function Stat({ x, value, label, sub }) {
  const parts = value.split(/([0-9.]+)/).filter(Boolean)
  return (
    <>
      <p
        style={{
          ...at(x, 250),
          display: "flex",
          alignItems: "baseline",
          whiteSpace: "nowrap",
          fontFamily: SANS,
          fontWeight: 700,
          lineHeight: 1,
          color: ACCENT_INK,
          // The deck's box starts at the top of the digits; a line box starts above it.
          transform: "translateY(-14px)",
        }}
      >
        {parts.map((part, i) => (
          <span key={i} style={{ fontSize: /[0-9.]/.test(part) ? DIGIT : UNIT }}>
            {part}
          </span>
        ))}
      </p>
      <Text x={x} y={334} size={20} weight={500} color={CREAM} lh={1.3}>
        {label}
      </Text>
      {sub && (
        <Text x={x} y={366} size={18} color={ON_BAND} lh={1.22} style={mono}>
          {sub}
        </Text>
      )}
    </>
  )
}

// 01 — the funnel. Each step is a bar on the deck's own scale with the count set
// inside it, and the step-to-step rate hung at the right.
const FUNNEL_ROWS_Y = [110, 202, 294, 386]

function Funnel({ data }) {
  return (
    <Card x={80} y={450} w={620} h={560}>
      <CardHead tag={data.tag} title={data.title} />
      {data.rows.map((row, i) => {
        const y = FUNNEL_ROWS_Y[i]
        return (
          <div key={i}>
            <CardText x={24} y={y} size={20} color={CREAM} lh={1.25}>
              {row.label}
            </CardText>
            {row.delta && (
              <p
                style={{
                  ...cardAt(24, y + 2, 572),
                  textAlign: "right",
                  fontSize: 18,
                  lineHeight: 1.22,
                  color: ACCENT_INK,
                  ...mono,
                }}
              >
                → {row.delta}
              </p>
            )}
            <div
              style={{
                ...cardAt(24, y + 30, row.w, 44),
                background: row.lit ? ACCENT : ACCENT_INK,
                opacity: row.lit ? 1 : DIM,
                borderRadius: 4,
              }}
            />
            <p
              style={{
                ...cardAt(24, y + 40, row.w - 12),
                textAlign: "right",
                fontSize: 20,
                lineHeight: 1.35,
                color: row.lit ? ON_ACCENT : CREAM,
                ...mono,
              }}
            >
              {row.value}
            </p>
          </div>
        )
      })}
      <CardText x={24} y={484} w={572} size={18} lh={1.5}>
        {data.note}
      </CardText>
    </Card>
  )
}

// 02 — week-1 retention. The deck's plot area: x from 40 to 492, and 0% to 6%
// mapped onto y 358.67 down to 138.67.
const PLOT_X0 = 40
const PLOT_X1 = 492
const PLOT_Y0 = 358.666
const PCT = (358.666 - 138.666) / 6 // board px per percentage point
// Where the deck hangs each reading against its marker: above, except at the two
// points where a label above would run into the line.
const READING_DY = [-33, -33, 11, -33, 11, -33]

function Retention({ data }) {
  const px = (i) => PLOT_X0 + ((PLOT_X1 - PLOT_X0) * i) / (data.points.length - 1)
  const py = (v) => PLOT_Y0 - v * PCT
  const line = data.points.map((p, i) => `${px(i)},${py(p.v)}`).join(" ")
  return (
    <Card x={740} y={449} w={540} h={560}>
      <CardHead tag={data.tag} title={data.title} />
      {[0, 2, 4, 6].map((pct) => (
        <div key={pct}>
          <div
            aria-hidden="true"
            style={{ ...cardAt(PLOT_X0, py(pct), PLOT_X1 - PLOT_X0, 1), background: "var(--deck-rule)", opacity: 0.5 }}
          />
          <p style={{ ...cardAt(494, py(pct) - 10, 25), fontSize: 18, lineHeight: 1.22, color: ON_BAND, ...mono }}>
            {pct}%
          </p>
        </div>
      ))}
      <svg
        aria-hidden="true"
        width={PLOT_X1 - PLOT_X0 + 20}
        height={260}
        viewBox={`${PLOT_X0 - 10} 100 ${PLOT_X1 - PLOT_X0 + 20} 260`}
        style={cardAt(PLOT_X0 - 10, 100, PLOT_X1 - PLOT_X0 + 20, 260)}
      >
        <polyline points={line} fill="none" stroke={ACCENT_INK} strokeWidth={2} />
        {data.points.map((p, i) => (
          <rect key={i} x={px(i) - 5} y={py(p.v) - 5} width={10} height={10} rx={1} fill={ACCENT_INK} />
        ))}
      </svg>
      {data.points.map((p, i) => (
        <div key={i}>
          <p
            style={{
              ...cardAt(px(i) - 25, py(p.v) + READING_DY[i], 50),
              textAlign: "center",
              fontSize: 18,
              lineHeight: 1.22,
              color: CREAM,
              ...mono,
            }}
          >
            {p.v}%
          </p>
          <p
            style={{ ...cardAt(px(i) - 25, 368.666, 50), textAlign: "center", fontSize: 18, lineHeight: 1.22, color: ON_BAND, ...mono }}
          >
            {p.x}
          </p>
        </div>
      ))}
      <CardText x={24} y={398.666} w={452} size={18} lh={1.5}>
        {data.note}
      </CardText>
      <CardText x={24} y={498.666} w={468} size={18} lh={1.5} color={ACCENT_INK}>
        {data.flag}
      </CardText>
    </Card>
  )
}

// 03 — the Editor's value signals: the acceptance ring, then where a panel that
// gets opened actually ends in an action.
const RING_R = 60
const RING_C = 2 * Math.PI * RING_R

function EditorCard({ data }) {
  const { donut } = data
  return (
    <Card x={1320} y={450} w={520} h={560}>
      <CardHead tag={data.tag} title={data.title} />
      <svg width={140} height={140} viewBox="0 0 140 140" style={cardAt(24, 110, 140, 140)} aria-hidden="true">
        <circle cx={70} cy={70} r={RING_R} fill="none" stroke={TRACK} strokeWidth={20} />
        <circle
          cx={70}
          cy={70}
          r={RING_R}
          fill="none"
          stroke={ACCENT_INK}
          strokeWidth={20}
          strokeDasharray={`${(RING_C * donut.pct) / 100} ${RING_C}`}
          transform="rotate(-90 70 70)"
        />
      </svg>
      <p
        style={{
          ...cardAt(24, 110, 140, 140),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: SANS,
          fontSize: 28,
          fontWeight: 500,
          color: CREAM,
        }}
      >
        {donut.pct}%
      </p>
      <CardText x={184} y={120} w={312} size={20} weight={500} color={CREAM} lh={1.35}>
        {donut.label}
      </CardText>
      <CardText x={184} y={154} w={312} size={18} lh={1.5}>
        {donut.sub}
      </CardText>

      <CardText x={24} y={262} size={18} lh={1.22} style={mono}>
        {data.barsTitle}
      </CardText>
      {data.bars.map((bar, i) => {
        const y = 290 + i * 36
        return (
          <div key={bar.label}>
            <CardText x={24} y={y} size={18} color={CREAM} lh={1.22} style={mono}>
              {bar.label}
            </CardText>
            <div aria-hidden="true" style={{ ...cardAt(150, y + 8, 240, 10), background: TRACK, borderRadius: 4 }} />
            <div
              aria-hidden="true"
              style={{
                ...cardAt(150, y + 8, bar.w, 10),
                background: bar.lit ? ACCENT : ACCENT_INK,
                opacity: bar.lit ? 1 : DIM,
                borderRadius: 4,
              }}
            />
            <p
              style={{ ...cardAt(300, y, 176), textAlign: "right", fontSize: 18, lineHeight: 1.22, color: CREAM, ...mono }}
            >
              {bar.value}
            </p>
          </div>
        )
      })}
      <CardText x={24} y={478} w={452} size={18} lh={1.5}>
        {data.note}
      </CardText>
    </Card>
  )
}

// 04 — the next moves, each carrying the priority the deck gave it.
const NEXT_X = [80, 526, 972, 1418]

function NextCard({ item, x }) {
  const lit = item.p === "P0"
  return (
    <div style={at(x, 1130, 422, 150)}>
      <Chamfer fill="color-mix(in srgb, var(--deck-band) 55%, transparent)" stroke="var(--deck-rule)" cut={14} width={1} />
      <div style={{ position: "relative", width: 422, height: 150 }}>
        <div style={cardAt(24, 24, 40, 24)}>
          <Chamfer fill={lit ? ACCENT : undefined} stroke={lit ? ACCENT : CREAM} cut={6} width={1.5} />
          <p
            style={{
              position: "relative",
              width: 40,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              lineHeight: 1,
              color: lit ? ON_ACCENT : CREAM,
              ...mono,
            }}
          >
            {item.p}
          </p>
        </div>
        <CardText x={76} y={24} w={322} size={20} weight={500} color={CREAM} lh={1.25}>
          {item.title}
        </CardText>
        <CardText x={24} y={68} w={374} size={18} lh={1.5}>
          {item.body}
        </CardText>
      </div>
    </div>
  )
}

export default function LaunchDataBoard({ board }) {
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

  const { stats, next } = board

  return (
    <figure className="mt-8">
      <div ref={hostRef} className="no-scrollbar overflow-x-auto">
        <div style={{ width: BOARD_W * scale, height: BOARD_H * scale }}>
          <div
            className="kyrall-deck relative"
            style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${scale})`, transformOrigin: "top left" }}
          >
            <Text x={80} y={112} w={1700} size={48} weight={600} lh={1.2} color={CREAM}>
              {board.title}
            </Text>
            <Text x={80} y={182} w={1700} size={20} lh={1.25}>
              {board.lead}
            </Text>
            {stats.map((stat, i) => (
              <Stat key={i} x={[80, 520, 960, 1400][i]} {...stat} />
            ))}
            <Rule x={80} y={410} w={1760} />

            <Funnel data={board.funnel} />
            <Retention data={board.retention} />
            <EditorCard data={board.editor} />

            <Text x={80} y={1050} size={18} weight={500} color={ACCENT_INK} style={mono}>
              {next.tag}
            </Text>
            <Text x={80} y={1078} size={24} weight={500} color={CREAM} lh={1.3}>
              {next.title}
            </Text>
            {next.items.map((item, i) => (
              <NextCard key={i} item={item} x={NEXT_X[i]} />
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
