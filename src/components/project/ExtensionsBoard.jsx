import { useEffect, useRef, useState } from "react"
import { createDeckArt, CREAM, RULE } from "./deckArt"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The deck's "Extensions" board: the four pages that surround generation — projects,
// community, context, and the mesh workspace — each with its screens annotated.
//
// Drawn at the deck's own coordinates, inside the page's reading column like every
// other section: 1760 → 1024 is 0.58, so the deck's 20px lands at about 12px. The
// gutters the notes hang in are 130–540px wide and were measured for 20px Chinese,
// so type cannot be enlarged inside the frame without the notes bursting out.

const OX = 80
const OY = 112
const BOARD_W = 1760
const BOARD_H = 5390
// The floor the board stops shrinking at and starts scrolling sideways instead, the
// same one the other long boards use. The reading column sits well above it at 0.58.
const MIN_SCALE = 0.45

const { at, Text, Shot, Arrow, Note, Rule, Head } = createDeckArt({
  ox: OX,
  oy: OY,
  art: "/project/kyrall/extensions",
})

// The deck dims a whole screen and lays the parts it is talking about back over the
// top at full strength: a black scrim at 80%, which leaves the base at the fifth of
// its own brightness the frame is drawn at.
function Scrim({ x, y, w, h }) {
  return (
    <div
      aria-hidden="true"
      style={{ ...at(x, y, w, h), background: "rgba(0, 0, 0, 0.8)", border: `1px solid ${RULE}` }}
    />
  )
}

// Act 01's screens carry a caption rather than a note: a square and one line.
function Caption({ x, y, children }) {
  return (
    <>
      <span
        aria-hidden="true"
        style={{ ...at(x, y + 7, 12, 12), background: "var(--deck-accent)", borderRadius: 2 }}
      />
      <Text x={x + 24} y={y} size={20} weight={500} lh={1.3} color={CREAM}>
        {children}
      </Text>
    </>
  )
}

export default function ExtensionsBoard({ board }) {
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

  const { acts, labels, notes } = board
  const note = (key, x, y, w) => (
    <Note x={x} y={y} w={w} title={notes[key].title} body={notes[key].body} />
  )

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
            <Text x={80} y={190} w={1250} size={20} lh={1.6}>
              {board.lead}
            </Text>
            <Rule x={80} y={280} w={1760} />

            {/* ---- 01 · projects ---- */}
            <Head y={320} n={acts[0].n} title={acts[0].title} accent={acts[0].accent} titleY={322} />
            <Shot src="proj-main.png" x={80} y={394} w={1007.66} h={547} />
            <Shot src="proj-grid.png" x={1115} y={394} w={725} h={393.56} />
            <Shot src="proj-list.png" x={1115} y={852} w={725} h={393.56} />
            <Shot src="proj-loading.png" x={80} y={977.65} w={494.97} h={268.69} />
            <Shot src="proj-empty.png" x={593} y={977.65} w={494.97} h={268.69} />
            <Caption x={1422} y={797}>{labels.grid}</Caption>
            <Caption x={1422} y={1259}>{labels.list}</Caption>
            <Caption x={796} y={1259}>{labels.empty}</Caption>
            <Caption x={271} y={1259}>{labels.loading}</Caption>
            <Rule x={80} y={1381} w={1760} />

            {/* ---- 02 · community ---- */}
            <Head y={1423} n={acts[1].n} title={acts[1].title} accent={acts[1].accent} titleY={1425} />
            <Shot src="comm-base.png" x={80} y={1526} w={1236.6} h={663.52} />
            <Scrim x={80} y={1527} w={1237} h={663} />
            <Shot src="comm-banner.png" x={178.55} y={1584.05} w={1124.55} h={182.25} />
            <Shot src="comm-card-a.png" x={461.73} y={1820.3} w={275} h={338.84} />
            <Shot src="comm-card-b.png" x={1028.1} y={1820.3} w={275} h={338.84} />

            <Arrow from={[1303.5, 1673.5]} to={[1438, 1673.5]} />
            {note("banner", 1471, 1660, 230)}
            <Arrow from={[1303.5, 1990]} to={[1438, 1990]} />
            {note("modelCard", 1471, 1976, 242)}
            <Arrow from={[598.25, 2159]} to={[598.25, 2244.5]} />
            {note("tutorialCard", 555, 2253, 226)}
            <Arrow from={[1453, 1988]} to={[1453, 2401]} />

            <Shot src="comm-detail.png" x={436} y={2420} w={1047.33} h={561.97} />
            <Arrow from={[1472, 2638]} to={[1532, 2638]} />
            {note("prompt", 1569, 2626, 205)}
            <Arrow from={[886, 2764]} to={[374, 2764]} />
            {note("model", 179, 2753, 205)}
            <Arrow from={[509, 2805]} to={[509, 3031.5]} />
            {note("related", 526, 3044, 539)}
            <Rule x={80} y={3148} w={1760} />

            {/* ---- 03 · context manager ---- */}
            <Head y={3194} n={acts[2].n} title={acts[2].title} accent={acts[2].accent} titleY={3196} />
            <Shot src="context.png" x={411} y={3281} w={1098.97} h={596.57} />
            <Arrow from={[1493, 3350]} to={[1570, 3350]} />
            {note("level", 1607, 3338, 220)}
            <Arrow from={[1493, 3668]} to={[1570, 3668]} />
            {note("graph", 1607, 3656, 205)}
            <Arrow from={[819.5, 3587]} to={[345, 3587]} />
            {note("fileState", 187, 3575, 134)}
            <Arrow from={[495.5, 3826]} to={[345, 3826]} />
            {note("generate", 187, 3811, 174)}
            <Rule x={80} y={3961} w={1760} />

            {/* ---- 04 · mesh workspace ---- */}
            <Head y={4002} n={acts[3].n} title={acts[3].title} accent={acts[3].accent} titleY={4004} />
            <Shot src="mesh-base.png" x={411} y={4091} w={1098.97} h={596.57} />
            <Scrim x={411} y={4091} w={1099} h={597} />
            <Shot src="mesh-header.png" x={511.24} y={4145.07} w={937.37} h={27.61} />
            <Shot src="mesh-upload.png" x={511.24} y={4186.98} w={937.37} h={99.02} />
            <Shot src="mesh-folders.png" x={511.24} y={4310.31} w={145.8} h={209.75} />
            <Shot src="mesh-card-1.png" x={676.48} y={4363.82} w={184.68} h={199.18} />
            <Shot src="mesh-card-2.png" x={870.88} y={4363.82} w={184.68} h={199.26} />
            <Shot src="mesh-card-3.png" x={1065.28} y={4363.82} w={184.68} h={199.26} />

            <Arrow from={[889, 4160]} to={[1570, 4160]} />
            {note("space", 1607, 4148, 205)}
            <Arrow from={[510.5, 4239]} to={[345, 4239]} />
            {note("upload", 187, 4225, 184)}
            <Arrow from={[509, 4423]} to={[345, 4423]} />
            {note("folders", 187, 4408, 174)}
            <Arrow from={[963, 4572.5]} to={[963, 4749]} />
            {note("status", 981, 4759, 247)}
            {/* the one elbow on the board: out of the note, then down into the detail */}
            <Arrow from={[963, 4772]} via={[[537.5, 4772]]} to={[537.5, 4904.5]} />

            <Shot src="mesh-detail.png" x={301} y={4920} w={904.5} h={491} />
            <Arrow from={[1192, 4970]} to={[1299.5, 4970]} />
            {note("fileDetail", 1335, 4959, 209)}
            <Arrow from={[1192, 5211]} to={[1299.5, 5211]} />
            {note("input", 1335, 5200, 205)}
            <Arrow from={[1192, 5382]} to={[1299.5, 5382]} />
            {note("nextStep", 1335, 5371, 302)}
          </div>
        </div>
      </div>

      {BOARD_W * scale > hostW + 1 && (
        <figcaption className="mt-3 text-note leading-relaxed text-fog">{t(ui.scrollSideways)}</figcaption>
      )}
    </figure>
  )
}
