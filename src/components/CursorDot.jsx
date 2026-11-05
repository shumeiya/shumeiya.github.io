import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useT } from "../i18n/lang"
import { ui } from "../i18n/ui"

// The site's own cursor: a small dot inside a thin ring, both pinned to the
// mouse. Over something clickable the ring opens up and the dot drops out; over
// a project it turns into a solid disc that says what a click will do. It
// replaces the native cursor, so it only exists where there is a real mouse — a
// touch screen never mounts it and keeps its normal behaviour.
//
// Colour: everything is drawn in the theme's ink with a hairline of the page
// colour around it, so it reads on a light page, a dark page and any cover image
// without blending or inverting what is underneath. See `.cursor-dot` in index.css.

const FINE_POINTER = "(hover: hover) and (pointer: fine)"

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
    const text = textRef.current
    if (!enabled || !dot || !text) return

    const root = document.documentElement
    root.classList.add("custom-cursor")

    let x = -100
    let y = -100
    let frame = 0

    // Position and state are written straight to the node, once per frame: a
    // React state update per mouse move would re-render for nothing.
    const paint = () => {
      frame = 0
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
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
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const onMove = (e) => {
      // A finger on a hybrid device: step aside rather than chase the touch.
      if (e.pointerType !== "mouse") {
        delete dot.dataset.visible
        return
      }
      x = e.clientX
      y = e.clientY
      dot.dataset.visible = ""
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
    window.addEventListener("scroll", schedule, { capture: true, passive: true })
    window.addEventListener("blur", onLeave)
    root.addEventListener("mouseleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      root.classList.remove("custom-cursor")
      window.removeEventListener("pointermove", onMove, { capture: true })
      window.removeEventListener("pointerdown", onDown, { capture: true })
      window.removeEventListener("pointerup", onUp, { capture: true })
      window.removeEventListener("pointercancel", onUp, { capture: true })
      window.removeEventListener("scroll", schedule, { capture: true })
      window.removeEventListener("blur", onLeave)
      root.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  // On <body>, outside the app's own tree, so no ancestor's overflow, transform
  // or stacking order can clip it or put it underneath something.
  return createPortal(
    <div ref={ref} aria-hidden="true" className="cursor-dot">
      <span className="cursor-ring" />
      <span className="cursor-disc">
        <span ref={textRef} />
      </span>
      <span className="cursor-core" />
    </div>,
    document.body
  )
}
