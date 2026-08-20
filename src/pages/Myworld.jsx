import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Masonry from "../components/myworld/Masonry"
import { worldImages } from "../data/myworld"

// A serpentine "road": images stand in rows on a horizontal line that U-turns at each
// row end to snake down to the next row. Rows can have different lengths.
const ROWS = 3
const Y_TOP = 0.28 // road y of the first row (fraction of height)
const Y_BOTTOM = 0.86 // road y of the last row
const STROKE = 38 // line thickness (px)
// Line colour. Theme-aware via the --color-road token (light/dark values in index.css).
// Or set a fixed CSS colour here (e.g. "#DCD3C5") to opt out of theme switching.
const STROKE_COLOR = "var(--color-road)"
const IMG_SCALE = 1.12 // multiplier on every image's base width
const EXIT_X = 0.88 // where the line rounds a corner and drops straight down (fraction)
const EXIT_CORNER = 120 // radius (px) of that bottom corner — bigger = rounder

// How many images each row holds, taken in worldImages order (row 0 = first N, …).
// Must sum to worldImages.length; otherwise it falls back to an even split.
const ROW_COUNTS = [7, 6, 5]

// Per-row road extent [leftFrac, rightFrac] — different lengths. The turn ends are
// shared (row0.right == row1.right, row1.left == row2.left) so the U-turns are clean
// semicircles; the free ends (row0 left, row2 right) set how much the lengths differ.
// Within a row, images are spaced evenly across this range — wider range = more spread.
const ROW_X = [
  [0.1, 0.9], // row 0 — reaches furthest left → longest
  [0.14, 0.9], // row 1
  [0.14, 0.75], // row 2 — ends short → shortest
]

// First-open animation — the line draws at constant speed while each image pops in as
// the line reaches it.
const LINE_START = 0.3
const LINE_DUR = 4.2
const POP_LEAD = 0.22

function rowSizes(n, rows) {
  const base = Math.floor(n / rows)
  const rem = n % rows
  return Array.from({ length: rows }, (_, r) => base + (r < rem ? 1 : 0))
}

// One image standing on the road. Pops in as the line reaches it; on hover it lifts to
// the front, scales up a touch, and reveals its name (+ optional caption).
function RoadImage({ img, x, y, delay, onSelect }) {
  const [hover, setHover] = useState(false)
  const hoverable = img.hover !== false // set `hover: false` in data to disable
  const hasShadow = img.shadow !== false // set `shadow: false` in data to drop the shadow
  const clickable = hoverable && img.photos?.length > 0 // opens a photo-wall page
  return (
    <div
      className={`absolute ${hoverable ? "" : "pointer-events-none"}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
        zIndex: img.z ?? 10, // stays fixed on hover — layering never changes
      }}
      onMouseEnter={hoverable ? () => setHover(true) : undefined}
      onMouseLeave={hoverable ? () => setHover(false) : undefined}
    >
      {/* Name + optional caption — revealed on hover, always below the image. */}
      {hoverable && (
        <div
          className={`pointer-events-none absolute left-1/2 top-full mt-2 w-max max-w-56 -translate-x-1/2 text-center transition-all duration-200 ${
            hover ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
          }`}
        >
          <div className="text-sm font-semibold leading-tight text-ink">{img.name}</div>
          {img.caption && (
            <div className="mt-0.5 text-xs italic leading-snug text-fog">{img.caption}</div>
          )}
        </div>
      )}

      {/* Outer layer = the staggered pop-in (has the delay). */}
      <motion.div
        style={{ transformOrigin: "center bottom" }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          opacity: { duration: 0.2, delay },
          scale: { duration: 0.3, delay, ease: [0.34, 1.56, 0.64, 1] },
        }}
      >
        {/* Inner layer = hover scale only — spring, no delay, so it snaps back on leave. */}
        <motion.img
          src={encodeURI(img.src)}
          alt={img.name}
          draggable={false}
          onClick={clickable ? () => onSelect(img) : undefined}
          className={`block max-w-none select-none ${clickable ? "cursor-pointer" : ""}`}
          style={{
            width: img.w * IMG_SCALE,
            transformOrigin: "center bottom",
            filter: hasShadow ? "drop-shadow(0 7px 6px rgba(0,0,0,0.22))" : "none",
          }}
          whileHover={hoverable ? { scale: 1.06 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
      </motion.div>
    </div>
  )
}

// Full-screen photo-wall page for a clicked image. Back button + Esc close it.
function PlaceDetail({ place, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-page"
    >
      <div className="mx-auto max-w-9xl px-4 pb-28 pt-16 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-6 flex flex-row justify-between"
        >
          <button
            onClick={onClose}
            className="mb-3 flex items-center gap-1.5 text-base text-ink/60 transition-colors hover:text-ink"
          >
            <ArrowLeft size={20} /> Back
          </button>
          <div className="text-right">
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              {place.name}
            </h1>
            {place.caption && (
              <p className="mt-1 ml-auto max-w-md text-sm italic text-fog">{place.caption}</p>
            )}
          </div>
        </motion.header>

        <Masonry items={place.photos} />
      </div>
    </motion.div>
  )
}

export default function Myworld() {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const r = el.getBoundingClientRect()
      setSize({ w: r.width, h: r.height })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { placed, pathD, total } = useMemo(() => {
    const W = size.w
    const H = size.h
    if (!W || !H) return { placed: [], pathD: "", total: 0 }

    const sizes =
      ROW_COUNTS.length === ROWS && ROW_COUNTS.reduce((a, b) => a + b, 0) === worldImages.length
        ? ROW_COUNTS
        : rowSizes(worldImages.length, ROWS)
    const rowY = Array.from(
      { length: ROWS },
      (_, r) => (Y_TOP + (Y_BOTTOM - Y_TOP) * (ROWS > 1 ? r / (ROWS - 1) : 0)) * H
    )
    const Lpx = ROW_X.map(([l]) => l * W)
    const Rpx = ROW_X.map(([, r]) => r * W)

    // Each road: [A → B] in drawing direction. Row 0 also enters from the left edge.
    const A = [] // start x of each road (drawing direction)
    const B = [] // end x
    for (let r = 0; r < ROWS; r++) {
      if (r % 2 === 0) {
        A[r] = r === 0 ? 0 : Lpx[r]
        B[r] = Rpx[r]
      } else {
        A[r] = Rpx[r]
        B[r] = Lpx[r]
      }
    }

    // Cumulative drawn length at the start of each road (for the pop sync).
    const connLen = (r) => Math.PI * (Math.abs(rowY[r + 1] - rowY[r]) / 2) // semicircle
    const cumBefore = [0]
    for (let r = 1; r < ROWS; r++) {
      cumBefore[r] = cumBefore[r - 1] + Math.abs(B[r - 1] - A[r - 1]) + connLen(r - 1)
    }

    // Place images along each road, bottom-centre on the line.
    const placed = []
    let idx = 0
    for (let r = 0; r < ROWS; r++) {
      const m = sizes[r]
      const lo = Lpx[r]
      const hi = Rpx[r]
      for (let j = 0; j < m; j++) {
        const img = worldImages[idx]
        const t = m > 1 ? j / (m - 1) : 0.5
        const autoX = r % 2 === 0 ? lo + (hi - lo) * t : hi - (hi - lo) * t
        // `x` in data (0..1 fraction of width) overrides the even spacing for that image.
        const x = img.x != null ? img.x * W : autoX
        const cum = cumBefore[r] + Math.abs(x - A[r])
        placed.push({ img, x, y: rowY[r], cum, row: r })
        idx++
      }
    }

    // Build the path: road, then a semicircle U-turn to the next road, … then exit.
    let d = `M ${A[0]},${rowY[0]} L ${B[0]},${rowY[0]}`
    for (let r = 0; r < ROWS - 1; r++) {
      const radius = Math.abs(rowY[r + 1] - rowY[r]) / 2
      const sweep = r % 2 === 0 ? 1 : 0 // right U-turn (cw) on even rows, left (ccw) on odd
      d += ` A ${radius},${radius} 0 0 ${sweep} ${A[r + 1]},${rowY[r + 1]}`
      d += ` L ${B[r + 1]},${rowY[r + 1]}`
    }
    // Exit: run a little past the last image, round a corner, then drop straight down
    // out of the bottom edge.
    const lastY = rowY[ROWS - 1]
    const lastX = B[ROWS - 1]
    const cornerR = Math.min(EXIT_CORNER, (H - lastY) * 0.85) // clamped so a drop remains
    const dropX = Math.max(lastX + cornerR + 10, EXIT_X * W)
    d += ` L ${dropX - cornerR},${lastY}`
    d += ` A ${cornerR},${cornerR} 0 0 1 ${dropX},${lastY + cornerR}`
    d += ` L ${dropX},${H}`

    const exitLen =
      dropX - cornerR - lastX + (Math.PI * cornerR) / 2 + (H - lastY - cornerR)
    const total =
      cumBefore[ROWS - 1] + Math.abs(B[ROWS - 1] - A[ROWS - 1]) + exitLen

    return { placed, pathD: d, total }
  }, [size.w, size.h])

  return (
    <main ref={ref} className="relative h-[calc(100vh-3.5rem)] min-h-130 w-full overflow-hidden">
      {/* The road — drawn on at constant speed, behind the images. */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {pathD && (
          <motion.path
            d={pathD}
            fill="none"
            style={{ stroke: STROKE_COLOR }}
            strokeWidth={STROKE}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: LINE_DUR, delay: LINE_START, ease: "linear" }}
          />
        )}
      </svg>

      {/* Images standing on the road — pop in as the line reaches them. */}
      {placed.map(({ img, x, y, cum }) => {
        const f = total ? cum / total : 0
        const delay = Math.max(0, LINE_START + f * LINE_DUR - POP_LEAD)
        return <RoadImage key={img.id} img={img} x={x} y={y} delay={delay} onSelect={setSelected} />
      })}

      <AnimatePresence>
        {selected && <PlaceDetail place={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  )
}
