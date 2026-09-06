import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Clock3 } from "lucide-react"
import Panel, { PanelHeader, TOP_ROW_HEIGHT } from "./Panel"
import { CHUANGHUA_PATHS } from "../../data/chuanghua"

function Chuanghua({ variant, color, className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d={CHUANGHUA_PATHS[variant]} fill={color} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  )
}

// "enjoy life" cells — a little yellow smiley instead of a blank square.
function SmileyFace({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="47" fill="var(--color-ac-yellow)" />
      <circle cx="36" cy="41" r="6.5" fill="#3a2f10" />
      <circle cx="64" cy="41" r="6.5" fill="#3a2f10" />
      <path
        d="M31 60 Q50 79 69 60"
        fill="none"
        stroke="#3a2f10"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Projects I'm building right now.
const PROJECTS = [
  { key: "kyrall", name: "Kyrall", pct: 55, variant: 4, color: "var(--color-ac-green)" },
  { key: "aitool", name: "AITool Explore", pct: 18, variant: 3, color: "var(--color-ac-blue)" },
  { key: "embodied", name: "Embodied AI", pct: 12, variant: 1, color: "var(--color-ac-pink)" },
  { key: "website", name: "Personal Website", pct: 5, variant: 2, color: "var(--color-ac-red)" },
]
const ENJOY = { key: "enjoy", name: "Enjoy Life", pct: 10 }
const ALL_BY_KEY = Object.fromEntries([...PROJECTS, ENJOY].map((p) => [p.key, p]))

// Hover-preview media per project. Empty for now — drop files in later, e.g.:
//   images → { type: "images", sources: ["/preview/kyrall-1.png", "/preview/kyrall-2.png"] }
//   video  → { type: "video",  sources: ["/preview/kyrall.mp4"] }
const PREVIEW_MEDIA = {
  kyrall: { type: "video", sources: ["/dashboard/status.log/kyrall/kyrall.mp4"] },
  aitool: { type: "images", sources: [] },
  embodied: { type: "images", sources: [] },
  website: { type: "images", sources: [] },
  enjoy: { type: "images", sources: [] },
}

// GitHub calendar geometry: 8 months (Jan'26 → Aug'26) × 4 cells = 32 columns,
// 7 rows = Mon → Sun. Rows 0–4 are weekdays, rows 5–6 the weekend.
const COLS = 32
const ROWS = 7
const WEEKDAY_ROWS = 5
const TOTAL = COLS * ROWS
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]
const DAY_LABELS = { 0: "Mon", 2: "Wed", 4: "Fri" }

// Cell counts per region (they must sum to each region's cell count):
//   weekday area = 5 × 32 = 160, weekend area = 2 × 32 = 64.
// Kyrall lives mostly on weekdays; personal website + enjoy life fill the weekend;
// aitool / Embodied AI are scattered across both.
// Kyrall + website are placed by rules (below); these bags fill whatever cells are left.
const WEEKDAY_COUNTS = { aitool: 21, enjoy: 5 }
const WEEKEND_FILL_COUNTS = { aitool: 19, enjoy: 18 }
// How many Kyrall each month's weekend gets. Month indexes: Jan0 … Jun5, Jul6, Aug7.
// June is loaded (6); July is heavy (4); Mar/Apr/Aug get none; the rest default to 1.
const WEEKEND_KYRALL_DEFAULT = 1
const WEEKEND_KYRALL_BY_MONTH = { 2: 0, 3: 0, 5: 6, 6: 3, 7: 0 }
// Weeks (0–3, within a month) whose whole weekend column (Sat + Sun) is forced to Kyrall.
// July's first weekend is fully Kyrall.
const WEEKEND_FULL_WEEKS = { 6: [0] }
// Weeks that must NOT get a weekend Kyrall — July's last weekend stays clear…
const WEEKEND_KYRALL_EXCLUDE_WEEKS = { 6: [3] }
// Weekday (Mon–Fri) Kyrall per week-column (32 weeks, Jan→Aug). Kyrall launched Jul 6,
// so Jun through early-July is the busiest stretch; Jan/Feb are lighter. Every column is
// ≥1 (no empty week). Must total 111, and May–Aug (cols 16–31) must stay ≤57 so Embodied
// (20 weekday cells, confined to May–Aug) still fits.
const WEEKDAY_KYRALL_BY_COL = [
  3, 3, 3, 3, // Jan
  3, 3, 3, 3, // Feb
  4, 4, 4, 4, // Mar
  4, 4, 4, 4, // Apr
  2, 2, 3, 3, // May
  5, 5, 5, 5, // Jun — peak
  5, 5, 1, 5, // Jul — first two weeks peak (through Jul 6); last week (col 27) stays full
  5, 2, 1, 1, // Aug — first week (col 28) stays full
]
// Projects that only appear from a certain month onward. Each is placed explicitly
// (weekend-heavy) before the random bags fill the rest.
//   personal website → from July;  Embodied AI → from May.
const CONSTRAINED = [
  { key: "website", months: [6, 7], weekend: 8, weekday: 3 },
  { key: "embodied", months: [4, 5, 6, 7], weekend: 7, weekday: 20 },
]

const PROJECT_BY_KEY = Object.fromEntries(PROJECTS.map((p) => [p.key, p]))

// Deterministic PRNG so the layout is scattered but stable across renders.
function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function fillRegion(counts, rng) {
  const bag = []
  for (const [key, n] of Object.entries(counts)) {
    for (let i = 0; i < n; i++) bag.push(key)
  }
  return shuffle(bag, rng)
}

// All grid indexes inside the given months, between rowStart and rowEnd (inclusive).
function monthCells(months, rowStart, rowEnd) {
  const out = []
  for (const m of months) {
    for (let r = rowStart; r <= rowEnd; r++) {
      for (let c = m * 4; c < m * 4 + 4; c++) out.push(r * COLS + c)
    }
  }
  return out
}

// Drop `count` copies of `value` into random still-empty cells among `cells`.
function placeInto(cells, count, value, grid, rng) {
  const avail = cells.filter((i) => grid[i] == null)
  shuffle(avail, rng)
  for (let k = 0; k < count && k < avail.length; k++) grid[avail[k]] = value
}

// Fill the empty cells in [from, to) from a pre-built bag.
function fillNulls(grid, from, to, bag) {
  let bi = 0
  for (let i = from; i < to; i++) if (grid[i] == null) grid[i] = bag[bi++]
}

function buildGrid() {
  const rng = mulberry32(20260809)
  const grid = new Array(TOTAL).fill(null)
  const weekendBase = WEEKDAY_ROWS * COLS
  const weekendRows = ROWS - WEEKDAY_ROWS

  // 1) Kyrall on weekends, per month (with forced full weekend weeks).
  for (let m = 0; m < MONTHS.length; m++) {
    const target = WEEKEND_KYRALL_BY_MONTH[m] ?? WEEKEND_KYRALL_DEFAULT
    let placed = 0
    for (const w of WEEKEND_FULL_WEEKS[m] || []) {
      const c = m * 4 + w
      for (let rr = 0; rr < weekendRows; rr++) {
        grid[weekendBase + rr * COLS + c] = "kyrall"
        placed++
      }
    }
    const excluded = WEEKEND_KYRALL_EXCLUDE_WEEKS[m] || []
    const rest = []
    for (let rr = 0; rr < weekendRows; rr++) {
      for (let c = m * 4; c < m * 4 + 4; c++) {
        if (excluded.includes(c - m * 4)) continue
        const idx = weekendBase + rr * COLS + c
        if (grid[idx] == null) rest.push(idx)
      }
    }
    shuffle(rest, rng)
    for (let k = 0; placed < target && k < rest.length; k++, placed++) grid[rest[k]] = "kyrall"
  }

  // 2) weekday (Mon–Fri) Kyrall, per week-column — this sets the frequency curve
  //    (Jun → early-July peak, Jan/Feb lighter) and keeps every week ≥1.
  WEEKDAY_KYRALL_BY_COL.forEach((n, c) => {
    const cells = []
    for (let r = 0; r < WEEKDAY_ROWS; r++) cells.push(r * COLS + c)
    shuffle(cells, rng)
    for (let k = 0; k < n && k < cells.length; k++) grid[cells[k]] = "kyrall"
  })

  // 3) projects that only start from a given month, placed weekend-first.
  for (const { key, months, weekend, weekday } of CONSTRAINED) {
    placeInto(monthCells(months, WEEKDAY_ROWS, ROWS - 1), weekend, key, grid, rng)
    placeInto(monthCells(months, 0, WEEKDAY_ROWS - 1), weekday, key, grid, rng)
  }

  // 4) fill the remaining weekday cells, then the remaining weekend cells.
  fillNulls(grid, 0, weekendBase, fillRegion(WEEKDAY_COUNTS, rng))
  fillNulls(grid, weekendBase, TOTAL, fillRegion(WEEKEND_FILL_COUNTS, rng))

  return grid
}

const GRID = buildGrid()

function LivePulse() {
  return (
    <span className="flex items-center gap-1.5 text-fog">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ac-green opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ac-green" />
      </span>
      <span className="font-mono-tight text-[10px] uppercase tracking-wide">in progress</span>
    </span>
  )
}

function CellMark({ projectKey, className }) {
  const project = PROJECT_BY_KEY[projectKey]
  if (project) return <Chuanghua variant={project.variant} color={project.color} className={className} />
  return <SmileyFace className={className} />
}

// Right-side preview: shows the hovered project's media (image slideshow or video).
// No assets yet, so it renders a labelled placeholder until PREVIEW_MEDIA is filled.
function ProjectPreview({ activeKey }) {
  const meta = activeKey ? ALL_BY_KEY[activeKey] : null
  const media = activeKey ? PREVIEW_MEDIA[activeKey] : null
  const hasMedia = !!(media && media.sources && media.sources.length)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setIdx(0)
    if (!hasMedia || media.type !== "images" || media.sources.length < 2) return
    const t = setInterval(() => setIdx((i) => (i + 1) % media.sources.length), 1800)
    return () => clearInterval(t)
  }, [activeKey, hasMedia, media])

  if (!meta) return <div className="min-h-0 flex-1" />

  return (
    <div
      className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg border border-dashed"
      style={{ borderColor: "var(--color-box-2)" }}
    >
      {hasMedia && media.type === "video" ? (
        <video
          key={activeKey}
          src={media.sources[0]}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : hasMedia ? (
        <img src={media.sources[idx]} alt={meta.name} className="h-full w-full object-cover" />
      ) : (
        <div className="flex flex-col items-center gap-1.5 text-center">
          <CellMark projectKey={activeKey} className="h-7 w-7" />
          <span className="text-xs text-cream">{meta.name}</span>
          <span className="font-mono-tight text-[9px] uppercase tracking-wide text-fog">
            preview coming soon
          </span>
        </div>
      )}
    </div>
  )
}

export default function StatusLog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [hoveredKey, setHoveredKey] = useState(null)

  return (
    <Panel ref={ref} className={`flex ${TOP_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader label="STATUS.LOG" right={<LivePulse />} />

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {/* top row: legend (left) + hover preview (right) — fills the space above the calendar */}
        <div className="flex min-h-0 flex-1 items-stretch gap-4">
          <div className="flex flex-col gap-y-1">
            {[...PROJECTS, ENJOY].map((p) => (
            <div
              key={p.key}
              onMouseEnter={() => setHoveredKey(p.key)}
              onMouseLeave={() => setHoveredKey(null)}
              className="flex cursor-pointer items-center gap-1.5 transition-opacity duration-200"
              style={{ opacity: hoveredKey && hoveredKey !== p.key ? 0.4 : 1 }}
            >
              <CellMark projectKey={p.key} className="h-3 w-3 shrink-0" />
              <span className="text-xs text-cream">{p.name}</span>
              <span className="font-mono-tight text-[10px] tabular-nums text-fog">{p.pct}%</span>
              </div>
            ))}
          </div>

          <ProjectPreview activeKey={hoveredKey} />
        </div>

        <div className="flex shrink-0 flex-col gap-1">
          {/* month labels */}
          <div className="flex">
            <div className="w-7 shrink-0" />
            <div
              className="grid flex-1"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {MONTHS.map((month, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap text-[8px] leading-none text-fog"
                  style={{ gridColumn: `${i * 4 + 1} / span 4` }}
                >
                  {month}
                </span>
              ))}
            </div>
          </div>

          {/* day labels + cells */}
          <div className="flex">
            <div
              className="grid w-7 shrink-0 gap-px pr-1"
              style={{ gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: ROWS }).map((_, r) => (
                <span
                  key={r}
                  className="flex items-center justify-end text-[8px] leading-none text-fog"
                >
                  {DAY_LABELS[r] || ""}
                </span>
              ))}
            </div>

            <div
              className="grid flex-1 gap-px"
              style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
            >
              {GRID.map((key, i) => {
                const r = Math.floor(i / COLS)
                const c = i % COLS
                const dim = hoveredKey && key !== hoveredKey
                return (
                  <motion.div
                    key={i}
                    className="flex aspect-square items-center justify-center"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.25, delay: c * 0.012 + r * 0.004, ease: "easeOut" }}
                  >
                    <div
                      className="flex h-full w-full items-center justify-center transition-all duration-200"
                      style={{
                        opacity: dim ? 0.1 : 1,
                        transform: hoveredKey && !dim ? "scale(1.2)" : "scale(1)",
                      }}
                    >
                      <CellMark projectKey={key} className="h-[85%] w-[85%]" />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
