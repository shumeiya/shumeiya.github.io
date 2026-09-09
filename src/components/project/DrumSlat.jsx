import { useEffect, useRef } from "react"

// You are standing inside a drum and the page is its inner wall — closer to a
// slot-machine reel than a flat page. A block reads flat while it sits at eye
// level, then turns about its own middle as that middle drops into the bottom
// BAND of the viewport: top edge rolling away, lower edge swinging toward you.
//
// Tracking the block's centre rather than its top edge is what makes the turn
// visible at all. These blocks run ~600px tall, so by the time a top edge
// reaches the band the whole block has already left the screen.
const BAND = 1 / 5 // share of the viewport that bends
const MAX_DEG = 26 // turn at the very bottom of the band
const DEPTH = 850 // px of perspective; smaller is a wider-angle lens
const CURVE = 1.6 // <2 keeps the middle of the band visibly turned, not just the lip

// One rAF loop and one scroll listener for every slat on the page.
const slats = new Set()
let raf = 0
let listening = false

function paint() {
  raf = 0
  const vh = window.innerHeight
  const edge = vh * (1 - BAND)
  const span = vh - edge

  for (const { outer, inner } of slats) {
    // Measured on the *untransformed* outer node: reading the node we are about
    // to rotate would feed its own displacement back in and make it shiver.
    const box = outer.getBoundingClientRect()
    const centre = box.top + box.height / 2
    const t = Math.min(Math.max((centre - edge) / span, 0), 1)
    if (t === 0) {
      inner.style.transform = ""
      continue
    }
    // Ease in, so the surface curves away instead of kinking at the band edge.
    const deg = Math.pow(t, CURVE) * MAX_DEG
    inner.style.transform = `perspective(${DEPTH}px) rotateX(${deg.toFixed(2)}deg)`
  }
}

function schedule() {
  if (!raf) raf = requestAnimationFrame(paint)
}

function subscribe(entry) {
  slats.add(entry)
  if (!listening) {
    listening = true
    addEventListener("scroll", schedule, { passive: true })
    addEventListener("resize", schedule)
  }
  schedule()
  return () => {
    slats.delete(entry)
    entry.inner.style.transform = ""
    if (slats.size === 0 && listening) {
      listening = false
      removeEventListener("scroll", schedule)
      removeEventListener("resize", schedule)
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }
  }
}

export default function DrumSlat({ children, className = "" }) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    return subscribe({ outer, inner })
  }, [])

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="drum-slat">
        {children}
      </div>
    </div>
  )
}
