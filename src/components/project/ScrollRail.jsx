import { useEffect, useRef } from "react"

const TICKS = 45
const MAJOR_EVERY = 4
const PEAK = 1.8 // scaleX at the tick under the playhead
const RADIUS = 6 // ticks either side that still get magnified

// Right-hand ruler minimap — a fixed column of ticks where the ones nearest the current scroll
// position stretch outward, so the bulge tracks reading position. Transforms are written straight
// to the DOM rather than through state: this runs on every scroll frame across 45 nodes.
export default function ScrollRail() {
  const tickRefs = useRef([])

  useEffect(() => {
    let raf = 0

    const paint = () => {
      raf = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      const center = progress * (TICKS - 1)

      tickRefs.current.forEach((el, i) => {
        if (!el) return
        const d = Math.abs(i - center)
        const falloff = d >= RADIUS ? 0 : Math.pow(1 - (d / RADIUS) ** 2, 1.6)
        el.style.transform = `scaleX(${1 + (PEAK - 1) * falloff})`
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
    >
      {Array.from({ length: TICKS }, (_, i) => {
        const isMajor = i % MAJOR_EVERY === 0
        return (
          <div
            key={i}
            ref={(el) => (tickRefs.current[i] = el)}
            className={`h-0.5 rounded-[1px] ${isMajor ? "w-5 bg-fog" : "w-2.5 bg-line"}`}
            style={{ transformOrigin: "100% 0", transition: "transform 0.1s linear" }}
          />
        )
      })}
    </div>
  )
}
