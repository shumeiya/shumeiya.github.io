import { useEffect, useRef } from "react"

// The page is the inner wall of a drum, and the bottom LIP of the viewport is
// where that wall starts curving away under you.
//
// A mask cannot do this: masks hide, they do not bend. Transforming the real
// elements cannot either, because a transform applies to a whole element — an
// image taller than the lip would tilt in one piece instead of staying flat on
// top and folding only along its lower edge.
//
// So the lip is a second, inert copy of the page: a fixed window pinned to the
// bottom of the viewport, holding a clone shifted by the scroll offset so it
// lines up pixel-for-pixel with the real page behind it, and turned on rotateX.
// The window paints the page background first, so it hides the flat original
// underneath and what you see in that strip is only ever the folded copy.
const LIP = 200 // px of viewport bottom that folds
const DEG = 16 // how far the lip is turned
const DEPTH = 900 // px of perspective; smaller is a wider-angle lens

// WorkStrip drives these inline every frame. The clone is a dead snapshot, so
// their transforms have to be copied across or the seam tears mid-drag.
const LIVE = ".work-stage, .work-row, .work-panel"

export default function DrumStage({ children, className = "" }) {
  const rootRef = useRef(null)
  const lipRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const lip = lipRef.current
    if (!root || !lip) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let clone = null
    let liveFrom = []
    let liveTo = []

    const build = () => {
      if (clone) clone.remove()
      clone = root.cloneNode(true)
      // Duplicate ids would break #slug deep links and getElementById.
      clone.removeAttribute("id")
      for (const n of clone.querySelectorAll("[id]")) n.removeAttribute("id")
      clone.style.position = "absolute"
      clone.style.top = "0"
      clone.style.willChange = "transform"
      lip.firstChild.appendChild(clone)
      liveFrom = Array.from(root.querySelectorAll(LIVE))
      liveTo = Array.from(clone.querySelectorAll(LIVE))

      // framer-motion parks a section at opacity 0 until it scrolls into view,
      // and a snapshot taken before that freezes it there for good — which is
      // how the lip ended up dropping headings and buttons on the floor. The
      // copy is decorative, so force every node to its settled look and let the
      // sync below own the handful that really do keep moving.
      const animated = new Set(liveTo)
      for (const n of clone.querySelectorAll("[style]")) {
        if (animated.has(n)) continue
        n.style.removeProperty("opacity")
        n.style.removeProperty("transform")
      }
    }
    build()

    let raf = 0
    const paint = () => {
      raf = 0
      if (!clone) return
      const box = root.getBoundingClientRect()
      // Where the clone has to sit so its content lands under the real page's:
      // the window's own top edge is already LIP px up from the viewport floor.
      const shift = box.top - (window.innerHeight - LIP)
      // This runs every frame — the reel animates without the page scrolling —
      // so only ever write a value that actually changed. Reading a style
      // string is free; assigning one costs a style recalc.
      const move = `translateY(${shift.toFixed(1)}px)`
      if (clone.style.transform !== move) clone.style.transform = move
      const left = `${box.left}px`
      if (clone.style.left !== left) clone.style.left = left
      const width = `${box.width}px`
      if (clone.style.width !== width) clone.style.width = width
      for (let i = 0; i < liveFrom.length; i++) {
        const to = liveTo[i]
        if (to && to.style.transform !== liveFrom[i].style.transform) {
          to.style.transform = liveFrom[i].style.transform
        }
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    // Rebuild on structural changes only — WorkStrip rewrites inline styles
    // every frame, and observing attributes would rebuild the clone forever.
    const mo = new MutationObserver(() => {
      build()
      schedule()
    })
    mo.observe(root, { childList: true, subtree: true })

    // The reel animates without the page scrolling, so poll alongside it.
    let live = true
    const tick = () => {
      if (!live) return
      paint()
      requestAnimationFrame(tick)
    }
    tick()

    window.addEventListener("resize", schedule)
    schedule()

    return () => {
      live = false
      mo.disconnect()
      window.removeEventListener("resize", schedule)
      if (raf) cancelAnimationFrame(raf)
      if (clone) clone.remove()
    }
  }, [])

  return (
    <>
      <div ref={rootRef} className={className}>
        {children}
      </div>
      <div
        ref={lipRef}
        aria-hidden="true"
        className="drum-lip"
        style={{ height: `${LIP}px`, perspective: `${DEPTH}px` }}
      >
        <div className="drum-lip-stage" style={{ transform: `rotateX(${DEG}deg)` }} />
      </div>
    </>
  )
}
