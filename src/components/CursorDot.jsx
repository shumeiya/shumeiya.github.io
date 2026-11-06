import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useT } from "../i18n/lang"
import { ui } from "../i18n/ui"

// The site's own cursor: a small dot that eases after the mouse and trails a
// short tail of fainter, smaller dots while it is moving. Over something
// clickable the dot only grows a little; over a project it turns into a solid
// disc that says what a click will do. It replaces the native cursor, so it only
// exists where there is a real mouse: a touch screen never mounts it and keeps
// its normal behaviour.
//
// Colour: everything is drawn in the theme's ink, and the dot carries a hairline
// of the page colour, so it reads on a light page, a dark page and any cover
// image without blending or inverting what is underneath. See `.cursor-dot` in
// index.css.

const FINE_POINTER = "(hover: hover) and (pointer: fine)"

// The tail: each dot chases the one in front of it, so the chain bends through
// a turn instead of sliding as a rigid line. Sizes and strengths step down along
// it; the numbers are the head's own size and opacity scaled per link.
const HEAD = 8
const TAIL = Array.from({ length: 7 }, (_, i) => ({
  size: HEAD * (0.85 - i * 0.09),
  opacity: 0.28 - i * 0.035,
}))
// How much of the remaining distance is closed each frame: the head after the
// mouse, and each tail dot after its leader.
const HEAD_EASE = 0.35
const TAIL_EASE = 0.42

// The native cursor is hidden with `cursor: none !important`, so the computed
// cursor can no longer say what is interactive. These selectors say it instead.
// `data-cursor="click" | "drag"` opts any other element in by hand.
const CLICKABLE =
  'a[href], button:not(:disabled), [role="button"], summary, label, select, .cursor-pointer, [data-cursor="click"]'
const DRAGGABLE = '.cursor-grab, .cursor-ew-resize, .decor-slot img, [data-cursor="drag"]'

// `data-cursor-label="view" | "swipe"` on an element turns the cursor into the
// labelled disc anywhere inside it. The nearest one wins, so a control inside
// a labelled area opts back out with an empty `data-cursor-label=""`.
const LABELLED = "[data-cursor-label]"

// Some surfaces set the cursor from script as the pointer moves (the sticker
// pile only says "grab" while a sticker is actually under the mouse). An inline
// declaration is still readable after the stylesheet overrides it.
const INLINE_CLICK = new Set(["pointer"])
const INLINE_DRAG = new Set(["grab", "grabbing", "ew-resize", "move"])

// What the cursor should be over `target`: a mode ("click" opens the ring fully,
// "drag" a little, "" leaves it at rest) and, over a project, a label key.
function read(target) {
  if (!(target instanceof Element)) return { mode: "", label: "" }

  const label = target.closest(LABELLED)?.dataset.cursorLabel ?? ""

  if (target.closest(CLICKABLE)) return { mode: "click", label }
  if (target.closest(DRAGGABLE)) return { mode: "drag", label }
  for (let node = target; node && node !== document.documentElement; node = node.parentElement) {
    const inline = node.style?.cursor
    if (INLINE_CLICK.has(inline)) return { mode: "click", label }
    if (INLINE_DRAG.has(inline)) return { mode: "drag", label }
  }
  return { mode: "", label }
}

export default function CursorDot() {
  const [enabled, setEnabled] = useState(() => window.matchMedia(FINE_POINTER).matches)
  const ref = useRef(null)
  const headRef = useRef(null)
  const textRef = useRef(null)
  const t = useT()

  // The words on the disc, by label key. Kept in a ref so the pointer handlers
  // below read the current language without being torn down and rebuilt.
  const words = useRef({})
  useEffect(() => {
    words.current = { view: t(ui.cursorView), swipe: t(ui.cursorSwipe) }
  }, [t])

  // A laptop with a touch screen can gain or lose its mouse mid-session.
  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER)
    const onChange = () => setEnabled(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const dot = ref.current
    const head = headRef.current
    const text = textRef.current
    if (!enabled || !dot || !head || !text) return

    const root = document.documentElement
    root.classList.add("custom-cursor")

    // With reduced motion the dot sits exactly on the mouse and has no tail.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tail = still ? [] : [...dot.querySelectorAll(".cursor-tail")].map((el) => ({ el, x: -100, y: -100 }))

    let x = -100 // where the mouse is
    let y = -100
    let cx = -100 // where the head has got to
    let cy = -100
    let frame = 0
    let stale = true // the element under the mouse needs reading again

    // What is under the mouse is read at the mouse, not at the head: the head
    // lags a few pixels and would report the thing the pointer has just left.
    const readTarget = () => {
      stale = false
      const { mode, label } = read(document.elementFromPoint(x, y))
      dot.dataset.mode = mode
      const word = words.current[label]
      if (word) {
        // The word is left in place when the disc closes, so it fades out with
        // the disc instead of vanishing a beat before it.
        text.textContent = word
        dot.dataset.label = ""
      } else {
        delete dot.dataset.label
      }
    }

    // Everything is written straight to the nodes: a React state update per
    // frame would re-render for nothing. The loop only runs while something is
    // still travelling, and stops once the chain has caught up with the mouse.
    const loop = () => {
      frame = 0
      if (stale) readTarget()

      const ease = still ? 1 : HEAD_EASE
      cx += (x - cx) * ease
      cy += (y - cy) * ease
      head.style.transform = `translate3d(${cx}px, ${cy}px, 0)`

      let px = cx
      let py = cy
      let travel = Math.abs(x - cx) + Math.abs(y - cy)
      for (const link of tail) {
        link.x += (px - link.x) * TAIL_EASE
        link.y += (py - link.y) * TAIL_EASE
        link.el.style.transform = `translate3d(${link.x}px, ${link.y}px, 0)`
        travel += Math.abs(px - link.x) + Math.abs(py - link.y)
        px = link.x
        py = link.y
      }

      // The tail is only drawn while it is strung out; at rest it has folded
      // into the head and fades away.
      const moving = travel > 0.3
      dot.toggleAttribute("data-moving", moving)
      if (moving) frame = requestAnimationFrame(loop)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      // A finger on a hybrid device: step aside rather than chase the touch.
      if (e.pointerType !== "mouse") {
        delete dot.dataset.visible
        return
      }
      x = e.clientX
      y = e.clientY
      // Appearing: start on the mouse, not flying in from off screen.
      if (!("visible" in dot.dataset)) {
        cx = x
        cy = y
        for (const link of tail) {
          link.x = x
          link.y = y
        }
        dot.dataset.visible = ""
      }
      stale = true
      schedule()
    }
    const onScroll = () => {
      stale = true
      schedule()
    }
    const onDown = () => (dot.dataset.pressed = "")
    const onUp = () => delete dot.dataset.pressed
    const onLeave = () => delete dot.dataset.visible

    // Capture phase, so a component that stops propagation can't freeze the dot.
    window.addEventListener("pointermove", onMove, { capture: true, passive: true })
    window.addEventListener("pointerdown", onDown, { capture: true, passive: true })
    window.addEventListener("pointerup", onUp, { capture: true, passive: true })
    window.addEventListener("pointercancel", onUp, { capture: true, passive: true })
    // Scrolling moves the page under a still mouse, which changes what it is over.
    window.addEventListener("scroll", onScroll, { capture: true, passive: true })
    window.addEventListener("blur", onLeave)
    root.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove("custom-cursor")
      window.removeEventListener("pointermove", onMove, { capture: true })
      window.removeEventListener("pointerdown", onDown, { capture: true })
      window.removeEventListener("pointerup", onUp, { capture: true })
      window.removeEventListener("pointercancel", onUp, { capture: true })
      window.removeEventListener("scroll", onScroll, { capture: true })
      window.removeEventListener("blur", onLeave)
      root.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  // On <body>, outside the app's own tree, so no ancestor's overflow, transform
  // or stacking order can clip it or put it underneath something. The tail is
  // listed first so the head is painted over it.
  return createPortal(
    <div ref={ref} aria-hidden="true" className="cursor-dot">
      {TAIL.map((link, i) => (
        <span
          key={i}
          className="cursor-tail"
          style={{ width: link.size, height: link.size, "--o": link.opacity.toFixed(3) }}
        />
      ))}
      <span ref={headRef} className="cursor-head">
        <span className="cursor-core" />
        <span className="cursor-disc">
          <span ref={textRef} />
        </span>
      </span>
    </div>,
    document.body
  )
}
