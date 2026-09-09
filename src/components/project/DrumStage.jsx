import { useEffect, useRef } from "react"

// The page is the inner wall of a drum, and the bottom LIP of the viewport is
// where that wall curls away under you, like the end of a sheet going back onto
// the roll.
//
// A mask cannot do this: masks hide, they do not bend. Transforming the real
// elements cannot either, because a transform applies to a whole element — an
// image taller than the lip would tilt in one piece instead of staying flat on
// top and folding only along its lower edge.
//
// So the lip is built from SLICES horizontal strips of an inert copy of the
// page. Each strip is a flat quad, but every one is turned a little further
// than the one above it and hung off the end of it, so the chain approximates
// an arc — a single strip is the straight bevel this replaces. The window
// paints the page background first, so it hides the flat original underneath
// and what you see in that band is only ever the curled copy.
const LIP = 200 // px of viewport bottom that curls — the arc length of the paper
const SLICES = 7 // strips approximating the arc; one would be a straight fold
const CURL = 55 // total degrees the paper turns through, top of lip to bottom
const DEPTH = 900 // px of perspective; smaller is a wider-angle lens
const BLEED = 1 // px of overlap, so no seam shows between neighbouring strips

// WorkStrip drives these inline every frame. The copies are dead snapshots, so
// their transforms have to be carried across or the seams tear mid-drag.
const LIVE = ".work-stage, .work-row, .work-panel"

// Where each strip hangs and how far it is turned. Walking the arc once: the
// bottom edge of one strip is the top edge of the next.
function arc() {
  const h = LIP / SLICES
  const step = (CURL / SLICES) * (Math.PI / 180)
  const out = []
  let y = 0
  let z = 0
  for (let i = 0; i < SLICES; i += 1) {
    const angle = (i + 0.5) * step
    out.push({ top: i * h, y, z, deg: (angle * 180) / Math.PI, h })
    y += h * Math.cos(angle)
    z += h * Math.sin(angle)
  }
  return out
}

export default function DrumStage({ children, className = "" }) {
  const rootRef = useRef(null)
  const stageRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    if (!root || !stage) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const strips = arc()
    let clones = []
    let liveFrom = []
    let liveTo = []

    const build = () => {
      stage.textContent = ""
      clones = []
      liveTo = []
      liveFrom = Array.from(root.querySelectorAll(LIVE))

      for (const s of strips) {
        const slot = document.createElement("div")
        slot.className = "drum-slice"
        slot.style.height = `${s.h + BLEED}px`
        slot.style.transform =
          `translate3d(0, ${s.y.toFixed(2)}px, ${s.z.toFixed(2)}px)` +
          ` rotateX(${s.deg.toFixed(2)}deg)`

        const copy = root.cloneNode(true)
        // Duplicate ids would break #slug deep links and getElementById.
        copy.removeAttribute("id")
        for (const n of copy.querySelectorAll("[id]")) n.removeAttribute("id")
        copy.style.position = "absolute"
        copy.style.top = "0"
        copy.style.willChange = "transform"

        const mine = Array.from(copy.querySelectorAll(LIVE))
        // framer-motion parks a section at opacity 0 until it scrolls into view,
        // and a snapshot taken before that freezes it there for good — which is
        // how the lip once dropped headings and buttons on the floor. The copy
        // is decorative, so force every node to its settled look and let the
        // sync below own the handful that really do keep moving.
        const animated = new Set(mine)
        for (const n of copy.querySelectorAll("[style]")) {
          if (animated.has(n)) continue
          n.style.removeProperty("opacity")
          n.style.removeProperty("transform")
        }

        slot.appendChild(copy)
        stage.appendChild(slot)
        clones.push({ copy, top: s.top })
        liveTo.push(mine)
      }
    }
    build()

    let raf = 0
    const paint = () => {
      raf = 0
      const box = root.getBoundingClientRect()
      // Where the copies have to sit so their content lands under the real
      // page's: the window's top edge is already LIP px up from the floor, and
      // each strip is a further `top` px along the arc.
      const shift = box.top - (window.innerHeight - LIP)
      const left = `${box.left}px`
      const width = `${box.width}px`

      for (let i = 0; i < clones.length; i += 1) {
        const { copy, top } = clones[i]
        // This runs every frame — the reel animates without the page scrolling
        // — so only ever write a value that actually changed. Reading a style
        // string is free; assigning one costs a style recalc.
        const move = `translateY(${(shift - top).toFixed(1)}px)`
        if (copy.style.transform !== move) copy.style.transform = move
        if (copy.style.left !== left) copy.style.left = left
        if (copy.style.width !== width) copy.style.width = width

        const mine = liveTo[i]
        for (let k = 0; k < liveFrom.length; k += 1) {
          const to = mine[k]
          if (to && to.style.transform !== liveFrom[k].style.transform) {
            to.style.transform = liveFrom[k].style.transform
          }
        }
      }
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    // Rebuild on structural changes only — WorkStrip rewrites inline styles
    // every frame, and observing attributes would rebuild the copies forever.
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
      stage.textContent = ""
    }
  }, [])

  return (
    <>
      <div ref={rootRef} className={className}>
        {children}
      </div>
      <div
        aria-hidden="true"
        className="drum-lip"
        style={{ height: `${LIP}px`, perspective: `${DEPTH}px` }}
      >
        <div ref={stageRef} className="drum-lip-stage" />
      </div>
    </>
  )
}
