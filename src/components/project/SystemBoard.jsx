import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Design System" board — four acts: colour tokens, the two typefaces,
// the icon set, the component library.
//
// The slide runs 1920 × 4123 and sizes everything around 18px Chinese, which lands
// near 10px once the board is scaled into the reading column. Every piece of the
// board's own copy is sized from `onScreen()` here instead — the artboard number that
// puts a wanted size on the reader's screen — and the layout is re-proportioned to
// pay for it. The palette is the clearest case: nine swatches across one row cannot
// hold a 25px token name, so it becomes five across and two down.
//
// What stays artwork is artwork: the type specimens (set in Ufficio, which the site
// does not have), the icon tiles, the keyline drawings and the component mock-ups.
// Their internal lettering is part of the picture, not page copy, so the 14px floor
// does not apply inside them — the same rule the boards' 3D renders follow.

const OX = 80
const OY = 112
const BOARD_W = 1760
const MIN_SCALE = 0.45

const COLUMN_W = 1024
const onScreen = (target) => Math.ceil((target * BOARD_W) / COLUMN_W)
const SIZE_BODY = onScreen(16)
const SIZE_META = onScreen(14)
const SIZE_TITLE = 40

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_ACCENT = "var(--deck-on-accent)"
const ON_BAND = "var(--deck-on-band)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/system/fig"

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

// An exported piece of the deck's artwork, placed in board coordinates and scaled to
// the box it is given.
function Fig({ src, x, y, w, h }) {
  return (
    <img
      src={`${ART}/${src}`}
      alt=""
      loading="lazy"
      style={{ ...at(x, y, w, h), display: "block", objectFit: "contain", maxWidth: "none" }}
    />
  )
}

// The rule and heading block that opens each act.
function ActHead({ y, eyebrow, title, body }) {
  return (
    <>
      <div aria-hidden="true" style={{ ...at(80, y, 1760, 1), background: RULE }} />
      <Text x={80} y={y + 24} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
        {eyebrow}
      </Text>
      <Text x={80} y={y + 66} size={SIZE_TITLE} weight={500} color="var(--color-cream)">
        {title}
      </Text>
      <Text x={80} y={y + 128} w={1700} size={SIZE_BODY} lh={1.5}>
        {body}
      </Text>
    </>
  )
}

// One colour chip. The deck prints the hex on the colour itself, so the ink has to
// follow the value rather than the theme.
function Swatch({ x, y, w, name, value }) {
  const hex = value.replace("#", "")
  const lum =
    (parseInt(hex.slice(0, 2), 16) * 299 + parseInt(hex.slice(2, 4), 16) * 587 + parseInt(hex.slice(4, 6), 16) * 114) /
    1000
  const ink = lum > 140 ? "#191717" : "#FDFDFD"
  return (
    <div style={{ ...at(x, y, w, 130), background: value, border: `1px solid ${RULE}` }}>
      <p
        style={{
          position: "absolute",
          left: 16,
          top: 14,
          fontFamily: MONO,
          fontSize: SIZE_META,
          letterSpacing: "1.08px",
          color: ink,
          opacity: 0.6,
        }}
      >
        {name}
      </p>
      <p
        style={{
          position: "absolute",
          left: 16,
          bottom: 14,
          fontFamily: MONO,
          fontSize: SIZE_BODY,
          fontWeight: 500,
          letterSpacing: "1.2px",
          color: ink,
        }}
      >
        {value}
      </p>
    </div>
  )
}

// Dark and Light are two readings of one token set, so the board shows one at a time
// and this switches between them — the deck stacked both, which at page sizes is a
// lot of chips to scan before the difference becomes visible.
function ThemeSwitch({ x, y, value, onChange, labels }) {
  const W = 288
  const H = 56
  const SEG = (W - 8) / 2
  return (
    <div style={at(x, y, W, H)} role="group">
      <Chamfer fill={BAND} stroke={RULE} cut={10} />
      {["dark", "light"].map((key, i) => {
        const on = value === key
        return (
          <button
            key={key}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(key)}
            style={{
              position: "absolute",
              left: 4 + i * SEG,
              top: 4,
              width: SEG,
              height: H - 8,
              padding: 0,
              border: 0,
              background: "transparent",
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: SIZE_META,
              fontWeight: 500,
              letterSpacing: "1.08px",
              color: on ? ON_ACCENT : ON_BAND,
            }}
          >
            {on && <Chamfer fill={ACCENT} stroke={ACCENT} cut={8} />}
            <span style={{ position: "relative" }}>{labels[key]}</span>
          </button>
        )
      })}
    </div>
  )
}

// The deck fits nine swatches in one row; at this size five fit, so the row wraps.
const SW_X = [96, 445, 794, 1143, 1492]
const SW_W = 332

function Palette({ y, label, tokens, pick }) {
  return (
    <>
      <div style={at(80, y, 1760, 355)}>
        <Chamfer fill={BAND} stroke={RULE} cut={12} />
      </div>
      <Text x={96} y={y + 16} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
        {label}
      </Text>
      {tokens.map((token, i) => (
        <Swatch
          key={token.name}
          x={SW_X[i % 5]}
          y={y + 62 + Math.floor(i / 5) * 147}
          w={SW_W}
          name={token.name}
          value={pick(token)}
        />
      ))}
    </>
  )
}

export default function SystemBoard({ board }) {
  const t = useT()
  const hostRef = useRef(null)
  const [scale, setScale] = useState(MIN_SCALE)
  // Opens on whichever theme the reader is already in, so the first palette they see
  // is the one they can check against the page around it.
  const [palette, setPalette] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light"
  )

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.max(MIN_SCALE, entry.contentRect.width / BOARD_W))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { colour, type, icons, components } = board

  // --- the vertical rhythm, act by act ---------------------------------------
  const COLOUR_Y = 340
  const TYPE_Y = 1019
  const ICON_Y = 2189
  // The icon act runs long — five rows of tiles plus the keyline drawings — so the
  // component act starts below where they end, not at a round number.
  const COMP_Y = 4419

  // Four specimen columns, as the deck arranges them.
  const SPEC_Y = TYPE_Y + 244
  // The component grid: three across, uniform cards.
  const CARD_W = 576
  const CARD_H = 400
  const CARD_X = [80, 672, 1264]
  const COMP_GRID_Y = COMP_Y + 244

  const BOARD_H = COMP_GRID_Y + 3 * CARD_H + 2 * 24 - OY

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
            <Text x={80} y={112} size={56} weight={500} color="var(--color-cream)">
              {board.title}
            </Text>
            <Text x={80} y={200} w={1680} size={SIZE_BODY} lh={1.5}>
              {board.lead}
            </Text>

            {/* ---- 01 · colour tokens ---- */}
            <ActHead y={COLOUR_Y} eyebrow={colour.eyebrow} title={colour.title} body={colour.body} />
            <ThemeSwitch
              x={1552}
              y={COLOUR_Y + 58}
              value={palette}
              onChange={setPalette}
              labels={{ dark: "Dark", light: "Light" }}
            />
            <Palette
              y={COLOUR_Y + 244}
              label={palette === "dark" ? colour.darkLabel : colour.lightLabel}
              tokens={colour.tokens}
              pick={(token) => (palette === "dark" ? token.dark : token.light)}
            />

            {/* ---- 02 · typography ---- */}
            <ActHead y={TYPE_Y} eyebrow={type.eyebrow} title={type.title} body={type.body} />
            <Fig src="type-sans-weights.png" x={80} y={SPEC_Y} w={428} h={276} />
            <Fig src="type-sans-sample.png" x={80} y={SPEC_Y + 292} w={428} h={276} />
            <Fig src="type-ky.png" x={524} y={SPEC_Y} w={428} h={568} />
            <Fig src="type-mono-weights.png" x={968} y={SPEC_Y} w={428} h={276} />
            <Fig src="type-mono-sample.png" x={968} y={SPEC_Y + 292} w={428} h={276} />
            <Fig src="type-0r.png" x={1412} y={SPEC_Y} w={428} h={568} />
            <Text x={80} y={SPEC_Y + 604} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {type.numeralsLabel}
            </Text>
            {/* The export carries the deck's own "自定义数字" label; the heading above
                says it in both languages, so the top of the artwork is clipped off. */}
            <div style={{ ...at(80, SPEC_Y + 644, 1540, 152), overflow: "hidden" }}>
              <img
                className="deck-ink"
                src={`${ART}/type-numerals.png`}
                alt=""
                loading="lazy"
                style={{ position: "absolute", left: 0, top: -30, width: 1540, height: 182, maxWidth: "none" }}
              />
            </div>

            {/* ---- 03 · icons ---- */}
            <ActHead y={ICON_Y} eyebrow={icons.eyebrow} title={icons.title} body={icons.body} />
            {(() => {
              let y = ICON_Y + 244
              const out = []
              icons.groups.forEach((group) => {
                out.push(
                  <Text
                    key={`l${y}`}
                    x={80}
                    y={y}
                    size={SIZE_META}
                    weight={500}
                    mono
                    tracking="1.08px"
                    color={ACCENT_INK}
                  >
                    {group.label}
                  </Text>
                )
                y += 38
                group.rows.forEach((row) => {
                  out.push(<Fig key={row} src={row} x={80} y={y} w={1760} h={206} />)
                  y += 218
                })
                y += 26
              })
              out.push(
                <Text key="kl" x={80} y={y} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
                  {icons.keylinesLabel}
                </Text>
              )
              out.push(<Fig key="klf" src="keylines.png" x={80} y={y + 38} w={740} h={580} />)
              return out
            })()}

            {/* ---- 04 · components ---- */}
            <ActHead y={COMP_Y} eyebrow={components.eyebrow} title={components.title} body={components.body} />
            {components.items.map((item, i) => {
              const x = CARD_X[i % 3]
              const y = COMP_GRID_Y + Math.floor(i / 3) * (CARD_H + 24)
              // Fit the artwork inside the card without ever blowing it up.
              const boxW = CARD_W - 64
              const boxH = CARD_H - 110
              const k = Math.min(boxW / item.w, boxH / item.h, 1.6)
              return (
                <div key={item.file}>
                  <div style={{ ...at(x, y, CARD_W, CARD_H), border: `1px dashed ${RULE}` }} />
                  <Text x={x + 24} y={y + 22} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
                    {item.label}
                  </Text>
                  <Fig
                    src={item.file}
                    x={x + (CARD_W - item.w * k) / 2}
                    y={y + 76 + (boxH - item.h * k) / 2}
                    w={item.w * k}
                    h={item.h * k}
                  />
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
