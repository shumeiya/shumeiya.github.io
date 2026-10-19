import { useEffect, useRef, useState } from "react"
import { Chamfer } from "./deck"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Background" poster, rebuilt in the page rather than exported as a
// picture — the copy is real text in both languages, selectable and searchable.
//
// Everything is placed in the artboard's own coordinates (the Figma frame, with its
// dead margins taken off) and the whole box is scaled to the column it is given.
// Below MIN_SCALE the type stops being legible, so the board holds its size and the
// panel scrolls sideways instead; the scrollbar is hidden the way the page's own
// scrollbar is, so a bar never appears mid-article.
//
// What the slide carried and the page doesn't need is gone: the background grid and
// the dark slide panel. Colour comes from `.kyrall-deck` in index.css, which has a
// light-mode counterpart for every value, the picture frames included — the deck's
// white 3D renders are darkened there (`deck-render`) and its white CAD tiles take a
// hairline frame (`deck-tile`) so both still read once the card turns to paper.

const OX = 78
const OY = 136
const BOARD_W = 1762
// The stacked WHO block is this much taller than the side-by-side one it replaced,
// so everything below it moves down by the same amount and the board grows. The
// figure includes the gap the deck leaves between acts, which the taller block needs
// more of than the shallow one did.
const WHO_SHIFT = 564
// Re-spacing the BEFORE and AFTER acts at the page's type sizes adds this much again:
// the deck's gaps were measured around 18px Chinese, and at 25px the same numbers read
// as crowding. One break between acts is 128, a title sits 46 under its eyebrow, and
// the first thing under a title sits 76 below it.
const SPACING_GROW = 311
const BOARD_H = 2411 + SPACING_GROW + WHO_SHIFT
const MIN_SCALE = 0.45

// The board is drawn at artboard scale and then scaled into the reading column, so a
// size written here lands on screen at size × (column / BOARD_W) — about 0.58 at the
// column's full width. These are written the other way round: the artboard number
// that puts a wanted size on the reader's screen.
const COLUMN_W = 1024
// Rounded up, never down: these are floors, and 24 would land at 13.95px.
const onScreen = (target) => Math.ceil((target * BOARD_W) / COLUMN_W)
const SIZE_BODY = onScreen(16)
// Every act's eyebrow and section title is set from this pair, so the four acts read
// at one size rather than at whatever the slide happened to give each of them.
const SIZE_META = onScreen(14)
const SIZE_TITLE = 50
const SIZE_COST = onScreen(18)

// The bracket chips are 44 tall and their word is one line of SIZE_META at 1.4, so
// this is where that line starts if it is to sit in the middle of the box.
const CHIP_H = 44
const CHIP_TEXT_Y = (top) => top + (CHIP_H - SIZE_META * 1.4) / 2

// A bracket chip sits ON its bracket's rule, not under it. Both brackets are drawn
// 48 tall, but the rule inside each SVG is at a different fraction of its own height
// — 24 of 49.562 for hours, 25.562 of 50.2902 for weeks — so the chip's top is
// derived rather than guessed at.
const BRACKET_H = 48
const RULE_IN = { hours: (BRACKET_H * 24) / 49.562, weeks: (BRACKET_H * 25.562) / 50.2902 }
const CHIP_Y = (bracketY, which) => bracketY + RULE_IN[which] - CHIP_H / 2

const ACCENT = "var(--deck-accent)"
const ACCENT_INK = "var(--deck-accent-ink)"
const SURFACE = "var(--deck-surface)"
const ON_SURFACE = "var(--deck-on-surface)"
const RULE = "var(--deck-rule)"
const BAND = "var(--deck-band)"
const ON_BAND = "var(--deck-on-band)"
const FIGURE = "var(--deck-figure)"
const ON_FIGURE = "var(--deck-on-figure)"
const ON_RULE = "var(--deck-on-rule)"

const SANS = "var(--font-display)"
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace'

const ART = "/project/kyrall/background"

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

// Line art from the deck, used as a mask so the drawing keeps its exact shape while
// the theme decides its colour.
function Art({ src, x, y, w, h, color = ACCENT_INK, rotate }) {
  const mask = {
    maskImage: `url(${ART}/${src})`,
    WebkitMaskImage: `url(${ART}/${src})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  }
  return (
    <div
      aria-hidden="true"
      style={{ ...at(x, y, w, h), background: color, ...mask, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    />
  )
}

// The deck's dashes: 2.02 on, 2.02 off.
function Dashes({ x, y, len, vertical, color = ON_FIGURE }) {
  const dir = vertical ? "to bottom" : "to right"
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(x, y, vertical ? 1 : len, vertical ? len : 1),
        background: `repeating-linear-gradient(${dir}, ${color} 0 2.02px, transparent 2.02px 4.04px)`,
      }}
    />
  )
}

// The rulers inside the before-panels: 1px ticks at a fixed pitch.
function Ticks({ x, y, w, pitch }) {
  return (
    <div
      aria-hidden="true"
      style={{
        ...at(x, y, w, 48),
        background: `repeating-linear-gradient(to right, ${RULE} 0 1px, transparent 1px ${pitch}px)`,
      }}
    />
  )
}

// One cell of a sprite sheet, cropped exactly as the deck crops it.
function Sprite({ sheet, x, y, w, h, img, className }) {
  return (
    <div aria-hidden="true" className={className} style={{ ...at(x, y, w, h), overflow: "hidden" }}>
      {/* `maxWidth: none` is load-bearing: the stylesheet caps images at 100% of their
          box, which would silently undo the crop's horizontal scale. */}
      <img src={`${ART}/${sheet}`} alt="" style={{ position: "absolute", maxWidth: "none", ...img }} />
    </div>
  )
}

// --- the board ---------------------------------------------------------------

export default function BackgroundBoard({ board }) {
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

  const { who, before, after, oneLine } = board

  // Geometry constants lifted straight from the frame.
  // The deck set these 220 wide with 165px of air between them, which fits a 18px
  // Chinese label. At the size the page needs, "05 MANUFACTURING" is wider than the
  // card — so the air pays for the width: 307 wide, 56 apart, same span.
  const STAGE_X = [80, 443, 806, 1169, 1532]
  const STAGE_W = 307
  const PANEL = [
    { x: 80, w: 439, pitch: 13.3015 },
    { x: 579, w: 761, pitch: 24.6397 },
    { x: 1400, w: 439, pitch: 13.3015 },
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

            {/* ---- 01 · WHO ---- */}
            <Text x={80} y={334} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {who.eyebrow}
            </Text>
            <Text x={80} y={380} size={SIZE_TITLE} weight={500} color="var(--color-cream)">
              {who.title}
            </Text>
            <Text x={80} y={462} w={1100} size={SIZE_BODY} lh={1.5}>
              {who.body}
            </Text>
            {/* Auto-width rather than the deck's fixed boxes: at this size the two
                languages no longer set to the same widths. */}
            <div style={{ ...at(80, 576), display: "flex", gap: 20 }}>
              {who.chips.map((chip, i) => (
                <span
                  key={i}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    height: 52,
                    padding: "0 20px",
                    fontFamily: SANS,
                    fontSize: SIZE_META,
                    lineHeight: 1,
                    color: "var(--color-ink)",
                  }}
                >
                  <Chamfer stroke={RULE} cut={8} width={1} />
                  <span style={{ position: "relative" }}>{chip}</span>
                </span>
              ))}
            </div>
            {/* The deck points this chevron sideways, from the copy to the cards. The
                cards are underneath now, so it turns to point at them. */}
            <Art src="chevron.svg" x={914} y={654} w={91} h={115} rotate={90} />
            {who.needs.map((need, i) => {
              const x = [80, 680, 1280][i]
              return (
                <div key={i}>
                  <div style={at(x, 790, 560, 290)}>
                    <Chamfer stroke={need.lit ? ACCENT : RULE} cut={12} />
                  </div>
                  <Text x={x + 32} y={820} size={55} weight={500} color="var(--color-cream)">
                    {need.title}
                  </Text>
                  <Text x={x + 32} y={908} w={496} size={SIZE_BODY} lh={1.5}>
                    {need.body}
                  </Text>
                </div>
              )
            })}

            {/* Everything below the WHO block keeps the deck's own coordinates and
                is simply offset, so the acts below did not have to be renumbered. */}
            <div style={{ position: "absolute", left: 0, top: WHO_SHIFT, width: BOARD_W }}>
            {/* ---- 02 · BEFORE ---- */}
            <Text x={80} y={644} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {before.eyebrow}
            </Text>
            <Text x={80} y={684} size={SIZE_TITLE} weight={500} color="var(--color-cream)">
              {before.title}
            </Text>
            {/* the five silos — picture frames, so they keep a dark surface */}
            {before.stages.map((stage, i) => (
              <div key={i}>
                <div
                  style={{
                    ...at(STAGE_X[i], 818, STAGE_W, 226),
                    background: FIGURE,
                    border: `${stage.lit ? 2 : 1}px solid ${stage.lit ? ACCENT : RULE}`,
                  }}
                />
                <div
                  style={{
                    ...at(STAGE_X[i], 818 + 182, STAGE_W, 32),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: ON_FIGURE,
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: SIZE_META + 2, fontWeight: 500, letterSpacing: "0.4px", lineHeight: 1.1 }}>
                    {stage.n}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: SIZE_META, fontWeight: 500 }}>{stage.label}</span>
                </div>
              </div>
            ))}
            <Sprite className="deck-render" sheet="stage-icons.png" x={154} y={830} w={160} h={160} img={{ height: "201.05%", left: "-10.13%", top: "-6.96%", width: "348.1%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={510} y={830} w={174} h={160} img={{ height: "207.17%", left: "-56.18%", top: "-107.18%", width: "330%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={880} y={830} w={160} h={160} img={{ height: "201.05%", left: "-230.7%", top: "-6.96%", width: "348.1%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={1243} y={833} w={160} h={153} img={{ height: "226.9%", left: "-177.63%", top: "-115.65%", width: "375%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={1611} y={835} w={150} h={150} img={{ height: "201.05%", left: "-130.19%", top: "-6.96%", width: "348.1%" }} />
            {[395, 758, 1121, 1484].map((x) => (
              <Dashes key={x} x={x} y={965} len={40} color={RULE} />
            ))}

            {/* the weeks bracket */}
            <Art src="bracket-weeks.svg" x={80} y={1068} w={1760} h={48} />
            <div style={at(876, CHIP_Y(1068, "weeks"), 169, CHIP_H)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={10} width={1.5} />
            </div>
            <Text x={876} y={CHIP_TEXT_Y(CHIP_Y(1068, "weeks"))} w={169} size={SIZE_META} weight={500} mono tracking="0.24px" lh={1.4} align="center" color={ACCENT_INK}>
              {before.bracket}
            </Text>

            {/* the three before-panels — picture frames again */}
            {PANEL.map((panel, i) => (
              <div key={i}>
                <div
                  style={{
                    ...at(panel.x, 1138, panel.w, 243),
                    background: FIGURE,
                    border: `2px solid ${ACCENT}`,
                  }}
                />
                <Text
                  x={panel.x + 24}
                  y={1138 + (i === 1 ? 22 : 25)}
                  w={panel.w - 48}
                  size={SIZE_META}
                  weight={500}
                  align="center"
                  color={ON_FIGURE}
                >
                  {before.panels[i].title}
                </Text>
                <Ticks x={panel.x + 25} y={1251} w={panel.w - 50} pitch={panel.pitch} />
                <div style={{ ...at(panel.x + 25, 1313, panel.w - 50, 43), background: RULE }} />
                <Text
                  x={panel.x + 25}
                  y={1319}
                  w={panel.w - 50}
                  size={SIZE_META}
                  weight={300}
                  align="center"
                  color={ON_RULE}
                >
                  {before.panels[i].bar}
                </Text>
              </div>
            ))}
            <Sprite sheet="fig-brief.png" x={216} y={1196} w={167} h={111} img={{ height: "155.15%", left: "-16.46%", top: "-21.59%", width: "136.67%" }} />
            <Sprite sheet="fig-version.png" x={1510} y={1188} w={219} h={126} img={{ height: "146.39%", left: "-4.3%", top: "-20.07%", width: "109.07%" }} />
            {[
              [656, { height: "217.59%", left: "-89.22%", top: "-5.56%", width: "385.13%" }],
              [760, { height: "276.47%", left: "-238.7%", top: "-18.82%", width: "488.33%" }],
              [864, { height: "208.86%", left: "-269.35%", top: "-10.26%", width: "371.46%" }],
              [968, { height: "220.66%", left: "-43.42%", top: "-107.04%", width: "388.78%" }],
              [1072, { height: "224.88%", left: "-154.49%", top: "-109.09%", width: "398.23%" }],
              [1176, { height: "255.43%", left: "-307.77%", top: "-130.98%", width: "450.89%" }],
            ].map(([x, img]) => (
              <Sprite key={x} className="deck-tile" sheet="fig-remodel.png" x={x} y={1203} w={88} h={83} img={img} />
            ))}
            <Dashes x={525} y={1259.5} len={48} vertical color={RULE} />
            <Dashes x={1346} y={1259.5} len={48} vertical color={RULE} />

            {/* what it costs */}
            <Art src="num-68.svg" x={80} y={1461} w={180} h={64.28} />
            <Text x={277} y={1476} size={28} weight={500} lh={1.5} color={ACCENT_INK}>
              {before.weeksWord}
            </Text>
            <Art src="num-4.svg" x={619} y={1461} w={63.73} h={63.92} />
            <Art src="num-0.svg" x={690.73} y={1466.82} w={64} h={64.26} />
            <Art src="num-pct.svg" x={762.73} y={1496.23} w={27.09} h={28.69} />
            <Art src="num-x.svg" x={1410} y={1461} w={56.09} h={64} />
            <Art src="word-times.svg" x={1482} y={1496} w={107.3} h={28.41} />
            <Art src="chevron.svg" x={1179} y={1516.5} w={91} h={115} />
            {before.costs.map((cost, i) => (
              <div key={i}>
                <Text x={[80, 619, 1410][i]} y={1551} w={[480, 480, 420][i]} size={SIZE_COST} weight={500} lh={1.4} color="var(--color-cream)">
                  {cost.title}
                </Text>
                <Text x={[80, 619, 1410][i]} y={1610} w={[480, 480, 420][i]} size={SIZE_META} lh={1.5}>
                  {cost.body}
                </Text>
              </div>
            ))}

            {/* ---- 03 · AFTER ---- */}
            <Text x={80} y={1850} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {after.eyebrow}
            </Text>
            <Text x={80} y={1890} size={SIZE_TITLE} weight={500} color="var(--color-cream)">
              {after.title}
            </Text>

            {/* The deck's five cards were sized around 18px Chinese. At the page's
                sizes the copy needs roughly a third more room, so the row buys it
                twice over: the two outer gaps come down from 100 to 56, and every
                card grows taller. The span is still 78 → 1838. */}
            <div style={at(78, 2026, 330, 420)}>
              <Chamfer stroke={RULE} fill={SURFACE} cut={{ tr: 16 }} />
            </div>
            <Text x={102} y={2050} size={SIZE_COST} weight={500} color="var(--color-cream)">
              {after.inputTitle}
            </Text>
            {/* Auto-width, like the WHO chips: the deck's fixed boxes were measured
                for 18px, and the two languages no longer set to the same widths. */}
            <div style={{ ...at(102, 2112), display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
              {after.inputs.map((input, i) => (
                <span
                  key={i}
                  style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    height: 46,
                    padding: "0 18px",
                    fontFamily: SANS,
                    fontSize: SIZE_META,
                    lineHeight: 1,
                    color: "var(--color-ink)",
                  }}
                >
                  <Chamfer stroke={RULE} cut={{ tr: 8 }} width={1} />
                  <span style={{ position: "relative" }}>{input}</span>
                </span>
              ))}
            </div>

            {after.steps.map((step, i) => {
              const x = [464, 807, 1150][i]
              return (
                <div key={i}>
                  <div style={at(x, 2026, 303, 420)}>
                    <Chamfer stroke={ACCENT} fill={SURFACE} cut={{ tr: 16 }} />
                  </div>
                  <Text x={x + 24} y={2050} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
                    {step.n}
                  </Text>
                  <Text x={x + 24} y={2090} w={255} size={SIZE_COST} weight={500} lh={1.2} color="var(--color-cream)">
                    {step.title}
                  </Text>
                  {/* One offset for all three: the deck nudged each card's body to
                      sit under a title of its own length, which only holds for one
                      language. A fixed start keeps the three bodies on one line. */}
                  <Text x={x + 24} y={2186} w={255} size={SIZE_META} lh={1.5}>
                    {step.body}
                  </Text>
                </div>
              )
            })}

            <div style={at(1509, 2026, 329, 420)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={{ tr: 16 }} />
            </div>
            <Text x={1533} y={2050} size={SIZE_COST} weight={500} color={ACCENT_INK}>
              {after.outputTitle}
            </Text>
            <Text x={1533} y={2096} w={281} size={SIZE_COST} weight={500} lh={1.3} color="var(--color-cream)">
              {after.output}
            </Text>
            <Text x={1533} y={2356} w={281} size={SIZE_META} lh={1.5}>
              {after.outputNote}
            </Text>

            {/* the connectors between the flow cards, in the gaps they bridge */}
            {[
              [408, 56],
              [767, 40],
              [1110, 40],
              [1453, 56],
            ].map(([x, w]) => (
              <div key={x} aria-hidden="true" style={{ ...at(x, 2236, w, 2), background: ACCENT_INK }} />
            ))}
            {[
              [408, 56],
              [767, 40],
              [1110, 40],
              [1453, 56],
            ].map(([x, w]) => (
              <div key={`c${x}`} aria-hidden="true" style={{ ...at(x, 2241.5, w, 2), background: ACCENT_INK }} />
            ))}

            <Art src="bracket-hours.svg" x={464} y={2462} w={989} h={48} />
            <div style={at(874, CHIP_Y(2462, "hours"), 169, CHIP_H)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={10} width={1.5} />
            </div>
            <Text x={874} y={CHIP_TEXT_Y(CHIP_Y(2462, "hours"))} w={169} size={SIZE_META} weight={500} mono tracking="0.24px" lh={1.4} align="center" color={ACCENT_INK}>
              {after.bracket}
            </Text>

            {/* ---- the one line ---- */}
            <div style={at(80, 2638, 1760, 220)}>
              <Chamfer stroke={ACCENT} cut={12} />
            </div>
            <Text x={128} y={2678} size={SIZE_META} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {oneLine.eyebrow}
            </Text>
            <Text x={128} y={2718} size={56} weight={500} color={ACCENT_INK}>
              {oneLine.title}
            </Text>
            <Text x={128} y={2804} size={20} weight={500} mono tracking="0.8px">
              {oneLine.sub}
            </Text>
            </div>
          </div>
        </div>
      </div>

      {scale <= MIN_SCALE && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">
          {t(ui.scrollSideways)}
        </figcaption>
      )}
    </figure>
  )
}
