import { useEffect, useRef } from "react"

// You are standing inside a drum and the page is its inner wall — closer to a
// slot-machine reel than a flat page. Everything marked `data-drum` inside the
// stage reads flat while it sits at eye level, then turns about its own middle
// as that middle drops into the bottom BAND of the viewport: top edge rolling
// away, lower edge swinging toward you.
//
// Marking small pieces — a heading, a paragraph, a button — rather than whole
// sections is what puts the type on the drum too. A 600px section only ever
// turns as one slab, which reads as "the pictures move and the words don't".
const BAND = 1 / 5 // share of the viewport that bends
const MAX_DEG = 26 // turn at the very bottom of the band
const DEPTH = 850 // px of perspective; smaller is a wider-angle lens
const CURVE = 1.6 // <2 keeps the middle of the band visibly turned, not just the lip

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
      const edge = vh * (1 - BAND)
      const span = vh - edge

      for (const el of els) {
        const box = el.getBoundingClientRect()
        // rotateX turns about the element's own middle, and that middle is the
        // fixed point of the rotation — so reading it back off the element we
        // are about to transform cannot feed into itself.
        const centre = box.top + box.height / 2
        const t = Math.min(Math.max((centre - edge) / span, 0), 1)
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
