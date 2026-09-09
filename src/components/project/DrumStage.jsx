import { useEffect, useRef } from "react"

// You are standing inside a drum and the page is its inner wall. The wall is
// curved the whole way round, so the turn is a continuous function of distance,
// not a switch that trips near the floor: a block is dead flat only where the
// wall faces you head-on, and leans further the further below that it travels.
//
// Marking small pieces — a heading, a paragraph, a button — rather than whole
// sections is what puts the type on the drum too. A 600px section only ever
// turns as one slab, which reads as "the pictures move and the words don't".
const EYE = 0.38 // where the wall faces you head-on, as a share of viewport height
const MAX_DEG = 26 // turn once a block reaches the bottom of the viewport
const DEPTH = 850 // px of perspective; smaller is a wider-angle lens
const CURVE = 0.95 // <1 builds the lean early; >1 holds the middle flat for longer

export default function DrumStage({ children, className = "" }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let els = []
    const collect = () => {
      els = Array.from(root.querySelectorAll("[data-drum]"))
    }
    collect()

    let raf = 0
    const paint = () => {
      raf = 0
      const vh = window.innerHeight
      const eye = vh * EYE
      const span = vh - eye

      for (const el of els) {
        const box = el.getBoundingClientRect()
        // rotateX turns about the element's own middle, and that middle is the
        // fixed point of the rotation — so reading it back off the element we
        // are about to transform cannot feed into itself.
        const centre = box.top + box.height / 2
        // Distance below eye level, 0 at the flat line and 1 at the floor.
        const t = Math.min(Math.max((centre - eye) / span, 0), 1)
        if (t === 0) {
          if (el.style.transform) el.style.transform = ""
          continue
        }
        const deg = Math.pow(t, CURVE) * MAX_DEG
        el.style.transform = `perspective(${DEPTH}px) rotateX(${deg.toFixed(2)}deg)`
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    // Panels and headings mount over a couple of frames, so re-read the marked
    // set whenever the subtree changes rather than only on first paint.
    const mo = new MutationObserver(() => {
      collect()
      schedule()
    })
    mo.observe(root, { childList: true, subtree: true })

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    schedule()

    return () => {
      mo.disconnect()
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (raf) cancelAnimationFrame(raf)
      for (const el of els) el.style.transform = ""
    }
  }, [])

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  )
}
