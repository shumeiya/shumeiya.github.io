import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, MapPin, Type } from "lucide-react"
import Masonry from "../components/myworld/Masonry"
import { places, intro } from "../data/myworld"

// Deterministic PRNG so the "random" scatter is stable across re-renders (no jumping).
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

// "Controlled random" — lay a grid of anchor cells, then apply a bounded jitter,
// rotation and scale inside each cell. Free-scattered look, but cells keep them apart.
function computeLayout(n, seed = 20260813) {
  const rnd = mulberry32(seed)
  const cols = Math.min(n, Math.max(2, Math.round(Math.sqrt(n * 1.6))))
  const rows = Math.ceil(n / cols)
  const cellW = 100 / cols
  const cellH = 100 / rows

  return Array.from({ length: n }, (_, i) => {
    const row = Math.floor(i / cols)
    const col = i % cols
    // Centre the last (possibly short) row so it never looks left-heavy.
    const itemsInRow = Math.min(cols, n - row * cols)
    const rowOffset = ((cols - itemsInRow) / 2) * cellW

    const baseX = rowOffset + cellW * (col + 0.5)
    const baseY = cellH * (row + 0.5)

    return {
      left: clamp(baseX + (rnd() - 0.5) * cellW * 0.42, 9, 91),
      top: clamp(baseY + (rnd() - 0.5) * cellH * 0.42, 12, 88),
      rot: (rnd() - 0.5) * 11, // degrees
      scale: 0.86 + rnd() * 0.26,
    }
  })
}

function PlaceMarker({ place, pos, index, showCaptions, onSelect }) {
  return (
    <div
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 hover:z-30"
      style={{ left: `${pos.left}%`, top: `${pos.top}%`, width: "clamp(140px, 16vw, 216px)" }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(place)}
        initial={{ opacity: 0, scale: 0.6, rotate: pos.rot }}
        animate={{ opacity: 1, scale: pos.scale, rotate: pos.rot }}
        whileHover={{ rotate: 0, scale: pos.scale * 1.07, y: -6 }}
        transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
        className="relative block w-full cursor-pointer overflow-hidden"
        aria-label={`${place.place}, ${place.year}`}
      >
        <img
          src={encodeURI(place.cover)}
          alt={place.place}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 px-3 pb-2 pt-8">
          <span className="truncate text-xs font-medium text-white">{place.place}</span>
          <span className="shrink-0 text-[10px] text-white/70">{place.year}</span>
        </div>
      </motion.button>

      {/* Optional text layer — the "shaping" one-liner. Hover-revealed, or pinned. */}
      <div
        className={`pointer-events-none absolute left-1/2 top-full mt-2 w-[150%] -translate-x-1/2 text-center transition-opacity duration-300 ${
          showCaptions ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <p className="text-[11px] italic leading-snug text-fog">{place.caption}</p>
      </div>
    </div>
  )
}

function PlaceDetail({ place, onClose }) {
  // Lock body scroll + close on Escape while the wall is open.
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
      className="fixed inset-0 z-40 overflow-y-auto bg-page"
    >
      <div className="mx-auto max-w-9xl px-4 pb-28 pt-20 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <button
              onClick={onClose}
              className="mb-3 flex items-center gap-1.5 text-sm text-ink/60 transition-colors hover:text-ink"
            >
              <ArrowLeft size={15} /> Back to my world
            </button>
            <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              {place.place}
            </h1>
            <p className="mt-1 max-w-md text-sm italic text-fog">{place.caption}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-xs text-ink/60">
            <span className="rounded-full border border-line bg-box-2 px-3 py-1.5">{place.year}</span>
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-box-2 px-3 py-1.5">
              <MapPin size={12} /> {place.coords}
            </span>
          </div>
        </motion.header>

        <Masonry items={place.photos} />
      </div>
    </motion.div>
  )
}

export default function Myworld() {
  const [selected, setSelected] = useState(null)
  const [showCaptions, setShowCaptions] = useState(false)

  const layout = useMemo(() => computeLayout(places.length), [])

  return (
    <main className="relative min-h-screen px-4 pb-28 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-9xl">
        <header className="mb-2 flex items-start justify-between gap-4">
          <div className="pointer-events-none select-none">
            <h1 className="text-3xl font-semibold leading-[0.9] tracking-tight text-ink/20 sm:text-4xl lg:text-5xl">
              My World
            </h1>
            <p className="mt-2 max-w-sm text-sm text-fog">{intro}</p>
          </div>

          <button
            onClick={() => setShowCaptions((v) => !v)}
            aria-pressed={showCaptions}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
              showCaptions
                ? "border-ac-green bg-box-2 text-ink"
                : "border-line bg-box-2 text-ink/60 hover:text-ink"
            }`}
          >
            <Type size={13} />
            {showCaptions ? "Captions on" : "Captions off"}
          </button>
        </header>

        {/* Scatter canvas — markers are absolutely placed by percentage anchors. */}
        <div className="relative h-[calc(100vh-9rem)] min-h-[560px] w-full">
          {places.map((place, i) => (
            <PlaceMarker
              key={place.id}
              place={place}
              pos={layout[i]}
              index={i}
              showCaptions={showCaptions}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <PlaceDetail place={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </main>
  )
}
