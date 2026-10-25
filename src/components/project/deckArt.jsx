import { Chamfer } from "./deck"

// The drawing kit the deck's long boards are built from: a frame is replicated at
// its own Figma coordinates, so everything here takes those coordinates and turns
// them into absolute positions inside a box that the board then scales as a whole.
//
// `createDeckArt` binds the kit to one board's origin — the top-left corner of the
// frame's content, which is what the board crops its empty margins down to.

export const ACCENT = "var(--deck-accent)"
// Type and line art rather than fills: the deck's yellow-green on the page itself,
// which darkens to ink weight in light mode. Every arrow and bracket is drawn in it.
export const ACCENT_INK = "var(--deck-accent-ink)"
export const ON_ACCENT = "var(--deck-on-accent)"
export const RULE = "var(--deck-rule)"
export const ON_BAND = "var(--deck-on-band)"
export const CREAM = "var(--color-cream)"
export const SANS = "var(--font-display)"

// The deck's connector: a 2px rule with a filled diamond where it leaves the thing
// it is about, and an open chevron where it arrives at the words.
const LEAD_W = 2
const DIAMOND = 5 // half-width; the deck's is a touch taller than it is wide
const HEAD_BACK = 10 // how far the chevron's arms reach back from the tip
const HEAD_SPREAD = 7.5
const PAD = 14 // room in the box for the head and the diamond

// The deck's wide bracket: a rule whose two ends turn 45° down and away, the same
// cut the chamfered cards use.
const BRACKET_H = 24

export function createDeckArt({ ox, oy, art }) {
  const at = (x, y, w, h) => ({
    position: "absolute",
    left: x - ox,
    top: y - oy,
    ...(w === undefined ? null : { width: w }),
    ...(h === undefined ? null : { height: h }),
  })

  function Text({ x, y, w, children, size = 20, weight = 400, color = "var(--color-ink)", lh = "normal", style }) {
    return (
      <p
        style={{
          ...at(x, y, w),
          fontFamily: SANS,
          fontSize: size,
          fontWeight: weight,
          lineHeight: lh,
          color,
          whiteSpace: w === undefined ? "nowrap" : undefined,
          ...style,
        }}
      >
        {children}
      </p>
    )
  }

  function Shot({ src, x, y, w, h }) {
    return (
      <img
        src={`${art}/${src}`}
        alt=""
        loading="lazy"
        style={{ ...at(x, y, w, h), display: "block", maxWidth: "none" }}
      />
    )
  }

  // `via` carries the corners of an elbowed connector; the head follows the last leg.
  function Arrow({ from, to, via = [] }) {
    const points = [from, ...via, to]
    const xs = points.map((p) => p[0])
    const ys = points.map((p) => p[1])
    const left = Math.min(...xs) - PAD
    const top = Math.min(...ys) - PAD
    const w = Math.max(...xs) - Math.min(...xs) + PAD * 2
    const h = Math.max(...ys) - Math.min(...ys) + PAD * 2
    const local = points.map(([x, y]) => [x - left, y - top])
    const a = local[0]
    const b = local[local.length - 1]
    const prev = local[local.length - 2]
    const deg = (Math.atan2(b[1] - prev[1], b[0] - prev[0]) * 180) / Math.PI
    return (
      <svg
        aria-hidden="true"
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ ...at(left, top, w, h), overflow: "visible" }}
      >
        <polyline
          points={local.map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke={ACCENT_INK}
          strokeWidth={LEAD_W}
        />
        <polygon
          points={`${a[0] - DIAMOND},${a[1]} ${a[0]},${a[1] - DIAMOND - 0.5} ${a[0] + DIAMOND},${a[1]} ${a[0]},${a[1] + DIAMOND + 0.5}`}
          fill={ACCENT_INK}
        />
        <polyline
          points={`${b[0] - HEAD_BACK},${b[1] - HEAD_SPREAD} ${b[0]},${b[1]} ${b[0] - HEAD_BACK},${b[1] + HEAD_SPREAD}`}
          fill="none"
          stroke={ACCENT_INK}
          strokeWidth={LEAD_W}
          transform={`rotate(${deg} ${b[0]} ${b[1]})`}
        />
      </svg>
    )
  }

  function Bracket({ x, y, w }) {
    return (
      <svg
        aria-hidden="true"
        width={w}
        height={BRACKET_H}
        viewBox={`0 0 ${w} ${BRACKET_H}`}
        style={at(x, y, w, BRACKET_H)}
      >
        <path
          d={`M 0 ${BRACKET_H} L ${BRACKET_H} 0 L ${w - BRACKET_H} 0 L ${w} ${BRACKET_H}`}
          fill="none"
          stroke={ACCENT_INK}
          strokeWidth={LEAD_W}
        />
      </svg>
    )
  }

  // The square that marks where a note or a caption starts.
  function Dot({ x, y }) {
    return <span aria-hidden="true" style={{ ...at(x, y, 12, 12), background: ACCENT, borderRadius: 2 }} />
  }

  // One note at the deck's own position: its square, its heading, then the body.
  // Heading and body flow rather than sitting at separate coordinates — a heading
  // that wraps to two lines in one language would otherwise land on its own body in
  // the other. `dy` is where the deck hangs the square against the heading.
  function Note({ x, y, w, title, body, dy = 7 }) {
    return (
      <>
        <Dot x={x - 24} y={y + dy} />
        <div style={at(x, y, w)}>
          <p style={{ fontFamily: SANS, fontSize: 20, fontWeight: 500, lineHeight: 1.3, color: CREAM }}>{title}</p>
          {body && (
            <p style={{ marginTop: 12, fontFamily: SANS, fontSize: 20, lineHeight: 1.6, color: ON_BAND }}>{body}</p>
          )}
        </div>
      </>
    )
  }

  function Rule({ x, y, w }) {
    return <div aria-hidden="true" style={{ ...at(x, y, w, 1), background: RULE }} />
  }

  // A numbered act: the number in its chamfered square, then the act's name — the
  // subject in the page's own ink, the point of it in the accent, as the deck sets it.
  function Head({ y, n, title, accent, x = 80, titleX = 140, titleY = y, size = 36 }) {
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
                fontSize: 20,
                fontWeight: 500,
                color: ON_ACCENT,
              }}
            >
              {n}
            </div>
          </>
        )}
        <Text x={titleX} y={titleY} size={size} weight={500} color={CREAM}>
          {title}
          {accent && <span style={{ color: ACCENT_INK }}>{accent}</span>}
        </Text>
      </>
    )
  }

  return { at, Text, Shot, Arrow, Bracket, Dot, Note, Rule, Head }
}
