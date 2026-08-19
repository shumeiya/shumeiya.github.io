import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { worldImages } from "../data/myworld"

// Deterministic PRNG so the scatter is stable across re-renders.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
const SEED = 20260817
const JITTER = 0.7 // 0 = tidy grid, 1 = fully scattered within each cell

// Curve smoothing (0 = straight, ~0.3 = rounder). Control points come from each
// point's neighbours, so adjacent segments share a tangent → smooth joins, no corners.
const CURVE_SMOOTH = 0.22
// Extra "bow": on each leg, a waypoint is inserted near the end, offset perpendicular
// to the straight line, so the leg curves into an arc → rounder bends. It bows toward
// the OUTSIDE of the turn, so corners become wide sweeps.
const WP_POS = 0.62 // waypoint position along the leg (0..1), nearer the end
const WP_OFFSET = 0.2 // perpendicular offset as a fraction of the leg length

// Interleaved intro timing (per image): image appears + shakes, THEN the segment of
// curve leading to it draws, THEN the next image, and so on.
const IMG_IN = 0.35 // s for an image to pop in before its line segment draws
const DRAW = 0.45 // s to draw one segment
const CYCLE = IMG_IN + DRAW // s per image, start-to-start

function computeLayout(n, seed = SEED) {
  const rnd = mulberry32(seed)
  const cols = Math.ceil(Math.sqrt(n))
  const rows = Math.ceil(n / cols)
  return Array.from({ length: n }, (_, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    const cx = (col + 0.5) / cols
    const cy = (row + 0.5) / rows
    return {
      x: clamp(cx + (rnd() - 0.5) * (JITTER / cols), 0.12, 0.88),
      y: clamp(cy + (rnd() - 0.5) * (JITTER / rows), 0.14, 0.86),
      rot: (rnd() - 0.5) * 16,
    }
  })
}

// --- Smooth curve helpers ---
function lineProps(a, b) {
  return { len: Math.hypot(b[0] - a[0], b[1] - a[1]), ang: Math.atan2(b[1] - a[1], b[0] - a[0]) }
}
function controlPoint(cur, prev, next, reverse) {
  const p = prev || cur
  const n = next || cur
  const o = lineProps(p, n)
  const ang = o.ang + (reverse ? Math.PI : 0)
  const len = o.len * CURVE_SMOOTH
  return [cur[0] + Math.cos(ang) * len, cur[1] + Math.sin(ang) * len]
}
// Sign of the turn at B when going A → B → C (>0 left, <0 right).
function turnSign(A, B, C) {
  const cross = (B[0] - A[0]) * (C[1] - B[1]) - (B[1] - A[1]) * (C[0] - B[0])
  return cross > 0 ? 1 : cross < 0 ? -1 : 0
}

// Insert a bow waypoint before each real point: near the end of the leg, pushed
// perpendicular to the leg toward the OUTSIDE of the upcoming turn. Returns the
// augmented point list plus the indices of the original ("real") points within it.
function augmentWithBows(pts) {
  const aug = [pts[0]]
  const realIdx = [0]
  const nGaps = pts.length - 1
  for (let i = 0; i < nGaps; i++) {
    const A = pts[i]
    const B = pts[i + 1]
    const dx = B[0] - A[0]
    const dy = B[1] - A[1]
    const len = Math.hypot(dx, dy) || 1
    const px = -dy / len // perpendicular unit
    const py = dx / len
    // Offset y = py * off; so sign = sign(py) bows the waypoint DOWN, -sign(py) UP.
    const down = py > 0 ? 1 : -1
    let sign
    if (i === nGaps - 2) {
      sign = down // leg into the final image (Munich): arc downward
    } else if (i === nGaps - 1) {
      sign = -down // final leg to the screen corner: arc upward, so it stays on-screen
    } else {
      const C = pts[i + 2]
      sign = C ? -turnSign(A, B, C) : down
      if (sign === 0) sign = 1
    }
    const off = WP_OFFSET * len * sign
    const W = [A[0] + dx * WP_POS + px * off, A[1] + dy * WP_POS + py * off]
    aug.push(W, B)
    realIdx.push(aug.length - 1)
  }
  return { aug, realIdx }
}

// One smooth cubic ending at aug[i], control points from its neighbours (continuity).
function cubicTo(aug, i) {
  const cur = aug[i - 1]
  const next = aug[i]
  const cps = controlPoint(cur, aug[i - 2], next, false)
  const cpe = controlPoint(next, cur, aug[i + 1], true)
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${next[0]},${next[1]}`
}

// One drawable path per real point (per image): the bowed, smooth curve from the
// previous real point to this one. Split for the interleaved draw-on animation, but
// control points come from the full augmented list, so joins stay tangent-continuous.
function segmentPaths(pts) {
  const { aug, realIdx } = augmentWithBows(pts)
  const segs = []
  for (let k = 1; k < realIdx.length; k++) {
    const s = realIdx[k - 1]
    const e = realIdx[k]
    let d = `M ${aug[s][0]},${aug[s][1]}`
    for (let i = s + 1; i <= e; i++) d += " " + cubicTo(aug, i)
    segs.push(d)
  }
  return segs
}

export default function Myworld() {
  const ref = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const layout = useMemo(() => {
    const base = computeLayout(worldImages.length)
    // Swap Rome ↔ Barcelona positions (keeping the connection order) so the route
    // flows right-to-left without crossing itself.
    const a = worldImages.findIndex((w) => w.id === "rome")
    const b = worldImages.findIndex((w) => w.id === "barcelona")
    if (a > -1 && b > -1) [base[a], base[b]] = [base[b], base[a]]
    // Munich: place it low-right so the final leg sweeps out to the bottom-right corner.
    const m = worldImages.findIndex((w) => w.id === "munich")
    if (m > -1) base[m] = { ...base[m], x: 0.66, y: 0.78 }
    return base
  }, [])

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

  // Curve pieces: top-left corner → each image centre, one Bézier per gap.
  const ready = size.w > 0 && size.h > 0
  const segments = useMemo(() => {
    if (!ready) return []
    // Top-left corner → each image centre → bottom-right corner.
    const pts = [
      [0, 0],
      ...layout.map((p) => [p.x * size.w, p.y * size.h]),
      [size.w, size.h],
    ]
    return segmentPaths(pts)
  }, [ready, layout, size.w, size.h])

  return (
    <main ref={ref} className="relative h-[calc(100vh-3.5rem)] min-h-130 w-full overflow-hidden">
      {/* Connecting curve — one segment per image, drawn on right after that image
          appears. Segments share tangents at each junction, so the whole thing reads
          as one smooth curve. Sits behind the images. */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {ready &&
          segments.map((seg, i) => {
            // Image segments draw right after their image pops in; the final segment
            // (to the bottom-right corner) draws right after the last image's segment.
            const drawDelay =
              i < worldImages.length ? i * CYCLE + IMG_IN : worldImages.length * CYCLE
            return (
              <motion.path
                key={i}
                d={seg}
                fill="none"
                stroke="#ffffff"
                strokeWidth="20"
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: DRAW, delay: drawDelay, ease: "easeInOut" },
                  // Stay hidden until the draw starts, so the round cap doesn't show a
                  // dot at the segment's start point beforehand.
                  opacity: { duration: 0.001, delay: drawDelay },
                }}
              />
            )
          })}
      </svg>

      {/* Scattered images — appear one at a time, each with a little shake, in step
          with the line reaching them. */}
      {worldImages.map((img, i) => {
        const { x, y, rot } = layout[i]
        return (
          <div
            key={img.id}
            className="absolute z-10"
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.img
              src={encodeURI(img.src)}
              alt={img.name}
              draggable={false}
              className="block max-w-none select-none"
              style={{ width: img.w }}
              initial={{ opacity: 0, scale: 0.5, rotate: rot }}
              animate={{ opacity: 1, scale: 1, rotate: rot }}
              transition={{
                opacity: { duration: 0.18, delay: i * CYCLE },
                scale: { duration: 0.3, delay: i * CYCLE, ease: [0.34, 1.56, 0.64, 1] },
              }}
            />
          </div>
        )
      })}
    </main>
  )
}
