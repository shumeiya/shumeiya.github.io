import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Panel, { PanelHeader, TOP_ROW_HEIGHT } from "./Panel"
import { radarSkills } from "../../data/profile"

const CX = 100
const CY = 100
const R = 68 // radius of the hexagon spider-web (grid + labels)
const BLOB_R = R * 0.82 // radius the gradient blob uses — smaller → gradient tucks inside the web
const RINGS = [0.25, 0.5, 0.75, 1]
const LABEL_R = 1.08
const ANGLE_STEP = (Math.PI * 2) / radarSkills.length

function pointAt(index, fraction, radius = R) {
  const angle = -Math.PI / 2 + index * ANGLE_STEP
  return {
    x: CX + radius * fraction * Math.cos(angle),
    y: CY + radius * fraction * Math.sin(angle),
  }
}

function polygonPoints(fraction) {
  return radarSkills.map((_, i) => Object.values(pointAt(i, fraction)).join(",")).join(" ")
}

// The score vertices — each is one colour centre AND a lobe of the blob.
const VERTS = radarSkills.map((skill, i) => pointAt(i, skill.score / 100, BLOB_R))
const N = VERTS.length

// One bright hue per vertex — a high-contrast spectrum around the hexagon
// (blue → teal → green → yellow → orange → pink). Test palette; swap for the
// muted --color-ac-* tokens later if it's too vivid.
const VERT_HUES = [
  "#234D8F", // top        — blue
  "#B44043", // top-right  — teal
  "#FFF798", // bottom     — yellow
  "#EC6D3F", // bot-left   — orange
  "#83B29E", // bot-right  — green
  "#FD5172", // top-left   — pink
]

// ----- Blob geometry (rounded convex lobes + concave, morphing mid-edges) -----

const lerpPt = (a, b, t) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

const CORNER = 0.22 // shoulder distance (fraction of edge) → bigger = rounder lobe
const SHO_OUT = VERTS.map((v, i) => lerpPt(v, VERTS[(i + 1) % N], CORNER))
const SHO_IN = VERTS.map((v, i) => lerpPt(v, VERTS[(i - 1 + N) % N], CORNER))

const PHASE_A = radarSkills.map((_, i) => (i * 2.3999) % (Math.PI * 2))
const PHASE_B = radarSkills.map((_, i) => (i * 4.1231 + 1.7) % (Math.PI * 2))

const BASE_DEPTH = 0.28 // how far each mid-edge bows toward the centre (concave)
const DEPTH_AMP = 0.20 // how much that depth breathes over time
const LAT_AMP = 4 // sideways sway of the edge control point, in viewBox units
const BULGE = 0.80 // fixed outward rounding of each lobe → vertices stay put
const SPEED = 0.001 // radians per millisecond — faster, near the smooth ceiling

// A Path2D of the blob at time t: concave mid-edge then convex rounded corner.
function buildBlob(tMs) {
  const path = new Path2D()
  path.moveTo(SHO_OUT[0].x, SHO_OUT[0].y)

  for (let i = 0; i < N; i++) {
    const j = (i + 1) % N
    const po = SHO_OUT[i]
    const pin = SHO_IN[j]

    // Concave mid-edge: control pulled toward the centre + swayed.
    const mx = (po.x + pin.x) / 2
    const my = (po.y + pin.y) / 2
    const depth = BASE_DEPTH + DEPTH_AMP * Math.sin(tMs * SPEED + PHASE_A[i])
    const lat = LAT_AMP * Math.sin(tMs * SPEED * 0.7 + PHASE_B[i])
    let ux = pin.x - po.x
    let uy = pin.y - po.y
    const len = Math.hypot(ux, uy) || 1
    ux /= len
    uy /= len
    path.quadraticCurveTo(mx + (CX - mx) * depth + ux * lat, my + (CY - my) * depth + uy * lat, pin.x, pin.y)

    // Convex rounded corner: fixed outward control → the vertex never moves.
    const v = VERTS[j]
    path.quadraticCurveTo(v.x + (v.x - CX) * BULGE, v.y + (v.y - CY) * BULGE, SHO_OUT[j].x, SHO_OUT[j].y)
  }

  path.closePath()
  return path
}

// ----- Six-colour Gaussian blend field -----

const SIZE = 200 // canvas render size, matches the 0..200 viewBox coordinates
const SIGMA = 25 // spread of each colour source; smaller = purer hues, higher contrast

function resolveVertColors() {
  return radarSkills.map((_, i) => {
    const hex = VERT_HUES[i % VERT_HUES.length].replace("#", "")
    const full = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex
    const n = parseInt(full, 16)
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  })
}

// Paint the interior colour field once: every pixel is a Gaussian-weighted mix
// of the six vertex colours → pure near a vertex, pairwise between two, and a
// six-way blend toward the centre.
function renderField() {
  const off = document.createElement("canvas")
  off.width = off.height = SIZE
  const octx = off.getContext("2d")
  const img = octx.createImageData(SIZE, SIZE)
  const data = img.data
  const colors = resolveVertColors()
  const inv = 1 / (2 * SIGMA * SIGMA)

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let wr = 0
      let wg = 0
      let wb = 0
      let ws = 0
      for (let k = 0; k < N; k++) {
        const dx = x - VERTS[k].x
        const dy = y - VERTS[k].y
        const w = Math.exp(-(dx * dx + dy * dy) * inv)
        ws += w
        wr += w * colors[k][0]
        wg += w * colors[k][1]
        wb += w * colors[k][2]
      }
      const idx = (y * SIZE + x) * 4
      data[idx] = wr / ws
      data[idx + 1] = wg / ws
      data[idx + 2] = wb / ws
      data[idx + 3] = 255
    }
  }

  octx.putImageData(img, 0, 0)
  return off
}

export default function SkillToolPanel() {
  const ref = useRef(null)
  const canvasRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = SIZE
    canvas.height = SIZE
    const ctx = canvas.getContext("2d")

    let field = renderField()

    const draw = (tMs) => {
      ctx.clearRect(0, 0, SIZE, SIZE)
      ctx.save()
      ctx.clip(buildBlob(tMs))
      ctx.drawImage(field, 0, 0, SIZE, SIZE)
      ctx.restore()
    }

    // Re-blend when the light/dark theme flips.
    const observer = new MutationObserver(() => {
      field = renderField()
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      draw(0)
      return () => observer.disconnect()
    }

    let raf
    const start = performance.now()
    const loop = (now) => {
      draw(now - start)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <Panel ref={ref} className={`flex ${TOP_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader label="SKILL" />

      <div className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full max-w-100 -translate-y-8">
          {/* Six-colour blend field, clipped to the slowly-morphing blob. */}
          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ filter: "blur(4px)", transformOrigin: "center" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
            {RINGS.map((fraction) => (
              <polygon
                key={fraction}
                points={polygonPoints(fraction)}
                fill="none"
                stroke="var(--color-white)"
                strokeWidth="0.05"
              />
            ))}

            {radarSkills.map((skill, i) => {
              const p = pointAt(i, 1)
              return (
                <line
                  key={skill.label}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-white)"
                  strokeWidth="0.05"
                />
              )
            })}

          </svg>

          <div className="pointer-events-none absolute inset-0">
            {radarSkills.map((skill, i) => {
              const p = pointAt(i, LABEL_R)
              const xPct = (p.x / 200) * 100
              const yPct = (p.y / 200) * 100
              const alignClass =
                Math.abs(p.x - CX) < 4
                  ? "left-1/2 -translate-x-1/2 text-center"
                  : p.x > CX
                    ? "left-full text-left"
                    : "right-full text-right"
              return (
                <motion.div
                  key={skill.label}
                  className={`absolute w-18 -translate-y-1/2 text-[10px] leading-tight text-fog ${alignClass}`}
                  style={{
                    top: `${yPct}%`,
                    ...(alignClass.includes("text-center")
                      ? {}
                      : p.x > CX
                        ? { left: `${xPct}%` }
                        : { right: `${100 - xPct}%` }),
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <span className="block font-medium text-cream">{skill.label}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Panel>
  )
}
