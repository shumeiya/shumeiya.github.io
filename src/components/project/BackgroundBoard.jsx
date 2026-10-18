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
const BOARD_H = 2411
const MIN_SCALE = 0.45

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
function Art({ src, x, y, w, h, color = ACCENT_INK }) {
  const mask = {
    maskImage: `url(${ART}/${src})`,
    WebkitMaskImage: `url(${ART}/${src})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  }
  return <div aria-hidden="true" style={{ ...at(x, y, w, h), background: color, ...mask }} />
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

function Chip({ x, y, w, h, cut, children, size = 18 }) {
  const pad = h === 44 ? [16, 10] : [14, 8]
  return (
    <>
      <div style={at(x, y, w, h)}>
        <Chamfer stroke={RULE} cut={cut} width={1} />
      </div>
      <Text x={x + pad[0]} y={y + pad[1]} size={size}>
        {children}
      </Text>
    </>
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
  const STAGE_X = [80, 465, 850, 1235, 1620]
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
            <Text x={80} y={334} size={18} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {who.eyebrow}
            </Text>
            <Text x={80} y={374} size={36} weight={500} color="var(--color-cream)">
              {who.title}
            </Text>
            <Text x={80} y={438} w={720} size={20} lh={1.6}>
              {who.body}
            </Text>
            {who.chips.map((chip, i) => (
              <Chip key={i} x={[80, 253, 422][i]} y={526} w={[161, 157, 144][i]} h={44} cut={8}>
                {chip}
              </Chip>
            ))}
            <Art src="chevron.svg" x={857} y={370} w={91} h={115} />
            {who.needs.map((need, i) => {
              const x = [980, 1267, 1553][i]
              return (
                <div key={i}>
                  <div style={at(x, 361, 267, 225)}>
                    <Chamfer stroke={need.lit ? ACCENT : RULE} cut={12} />
                  </div>
                  <Text x={x + 24} y={389} size={40} weight={500} color="var(--color-cream)">
                    {need.title}
                  </Text>
                  <Text x={x + 24} y={454} w={219} size={18} lh={1.5}>
                    {need.body}
                  </Text>
                </div>
              )
            })}

            {/* ---- 02 · BEFORE ---- */}
            <Text x={80} y={644} size={18} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {before.eyebrow}
            </Text>
            <Text x={80} y={684} size={40} weight={500} color="var(--color-cream)">
              {before.title}
            </Text>
            {/* the five silos — picture frames, so they keep a dark surface */}
            {before.stages.map((stage, i) => (
              <div key={i}>
                <div
                  style={{
                    ...at(STAGE_X[i], 818, 220, 226),
                    background: FIGURE,
                    border: `${stage.lit ? 2 : 1}px solid ${stage.lit ? ACCENT : RULE}`,
                  }}
                />
                <div
                  style={{
                    ...at(STAGE_X[i], 818 + 184, 220, 22),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    color: ON_FIGURE,
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 500, letterSpacing: "0.4px", lineHeight: 1.1 }}>
                    {stage.n}
                  </span>
                  <span style={{ fontFamily: SANS, fontSize: 18, fontWeight: 500 }}>{stage.label}</span>
                </div>
              </div>
            ))}
            <Sprite className="deck-render" sheet="stage-icons.png" x={110} y={830} w={160} h={160} img={{ height: "201.05%", left: "-10.13%", top: "-6.96%", width: "348.1%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={488} y={830} w={174} h={160} img={{ height: "207.17%", left: "-56.18%", top: "-107.18%", width: "330%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={880} y={830} w={160} h={160} img={{ height: "201.05%", left: "-230.7%", top: "-6.96%", width: "348.1%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={1265} y={833} w={160} h={153} img={{ height: "226.9%", left: "-177.63%", top: "-115.65%", width: "375%" }} />
            <Sprite className="deck-render" sheet="stage-icons.png" x={1655} y={835} w={150} h={150} img={{ height: "201.05%", left: "-130.19%", top: "-6.96%", width: "348.1%" }} />
            {[306, 691, 1076, 1461].map((x) => (
              <Dashes key={x} x={x} y={965} len={113} color={RULE} />
            ))}

            {/* the weeks bracket */}
            <Art src="bracket-weeks.svg" x={80} y={1068} w={1760} h={48} />
            <div style={at(876, 1068, 169, 44)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={10} width={1.5} />
            </div>
            <Text x={876} y={1081} w={169} size={24} weight={500} mono tracking="0.24px" lh={1.4} align="center" color={ACCENT_INK}>
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
                  size={22}
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
                  y={1323}
                  w={panel.w - 50}
                  size={20}
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
            <Art src="num-68.svg" x={80} y={1441} w={180} h={64.28} />
            <Text x={277} y={1476} size={28} weight={500} lh={1.5} color={ACCENT_INK}>
              {before.weeksWord}
            </Text>
            <Art src="num-4.svg" x={619} y={1441} w={63.73} h={63.92} />
            <Art src="num-0.svg" x={690.73} y={1446.82} w={64} h={64.26} />
            <Art src="num-pct.svg" x={762.73} y={1476.23} w={27.09} h={28.69} />
            <Art src="num-x.svg" x={1410} y={1441} w={56.09} h={64} />
            <Art src="word-times.svg" x={1482} y={1476} w={107.3} h={28.41} />
            <Art src="chevron.svg" x={1179} y={1496.5} w={91} h={115} />
            {before.costs.map((cost, i) => (
              <div key={i}>
                <Text x={[80, 619, 1410][i]} y={1531} w={420} size={28} weight={500} lh={1.5} color="var(--color-cream)">
                  {cost.title}
                </Text>
                <Text x={[80, 619, 1410][i]} y={1583} w={[371, 406, 376][i]} size={20} lh={1.5}>
                  {cost.body}
                </Text>
              </div>
            ))}

            {/* ---- 03 · AFTER ---- */}
            <Text x={80} y={1752} size={18} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {after.eyebrow}
            </Text>
            <Text x={80} y={1792} size={40} weight={500} color="var(--color-cream)">
              {after.title}
            </Text>

            <div style={at(78, 1887, 300, 271)}>
              <Chamfer stroke={RULE} fill={SURFACE} cut={{ tr: 16 }} />
            </div>
            <Text x={102} y={1911} size={22} weight={500} color="var(--color-cream)">
              {after.inputTitle}
            </Text>
            {after.inputs.map((input, i) => (
              <Chip key={i} x={102} y={1887 + [70, 122, 174][i]} w={[135, 167, 203][i]} h={40} cut={{ tr: 8 }}>
                {input}
              </Chip>
            ))}

            {after.steps.map((step, i) => {
              const x = [478, 831, 1185][i]
              return (
                <div key={i}>
                  <div style={at(x, 1887, 313, 271)}>
                    <Chamfer stroke={ACCENT} fill={SURFACE} cut={{ tr: 16 }} />
                  </div>
                  <Text x={x + 24} y={1907} size={18} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
                    {step.n}
                  </Text>
                  <Text x={x + 24} y={1939} w={265} size={26} weight={500} color="var(--color-cream)">
                    {step.title}
                  </Text>
                  <Text x={x + 24} y={i === 0 ? 2017 : 1985} w={265} size={18} lh={1.5}>
                    {step.body}
                  </Text>
                </div>
              )
            })}

            <div style={at(1598, 1887, 240, 271)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={{ tr: 16 }} />
            </div>
            <Text x={1622} y={1911} size={22} weight={500} color={ACCENT_INK}>
              {after.outputTitle}
            </Text>
            <Text x={1622} y={1950} w={192} size={22} weight={500} lh={1.4} color="var(--color-cream)">
              {after.output}
            </Text>
            <Text x={1622} y={2090} w={192} size={18}>
              {after.outputNote}
            </Text>

            {/* the connectors between the flow cards */}
            {[
              [378, 60],
              [791, 40],
              [1144, 41],
              [1538, 60],
            ].map(([x, w]) => (
              <div key={x} aria-hidden="true" style={{ ...at(x, 2016, w, 2), background: ACCENT_INK }} />
            ))}
            {[
              [378, 100],
              [791, 40],
              [1144, 41],
              [1498, 100],
            ].map(([x, w]) => (
              <div key={`c${x}`} aria-hidden="true" style={{ ...at(x, 2021.5, w, 2), background: ACCENT_INK }} />
            ))}

            <Art src="bracket-hours.svg" x={478} y={2174} w={1020} h={48} />
            <div style={at(904, 2200, 169, 44)}>
              <Chamfer stroke={ACCENT} fill={SURFACE} cut={10} width={1.5} />
            </div>
            <Text x={904} y={2213} w={169} size={24} weight={500} mono tracking="0.24px" lh={1.4} align="center" color={ACCENT_INK}>
              {after.bracket}
            </Text>

            {/* ---- the one line ---- */}
            <div style={at(80, 2327, 1760, 220)}>
              <Chamfer stroke={ACCENT} cut={12} />
            </div>
            <Text x={128} y={2367} size={18} weight={500} mono tracking="1.08px" color={ACCENT_INK}>
              {oneLine.eyebrow}
            </Text>
            <Text x={128} y={2407} size={56} weight={500} color={ACCENT_INK}>
              {oneLine.title}
            </Text>
            <Text x={128} y={2493} size={20} weight={500} mono tracking="0.8px">
              {oneLine.sub}
            </Text>
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
