import { useCallback, useRef, useState } from "react"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// Two screens of the same page, one old and one new, stacked in the same frame with
// a divider the reader drags across them.
//
// Why a slider and not two pictures side by side: the point of this comparison is
// that the two layouts occupy the *same* places — the nav, the tabs, the table all
// moved a little, and seeing that means seeing one on top of the other. Side by side,
// the eye has to carry a measurement across a gutter and gives up.
//
// The new version is the bottom layer and the old one is clipped over it, so the
// divider reads as "the new one is already underneath, you are wiping the old one
// away" rather than as two unrelated images meeting at a seam.
//
// The two sources must be the same pixel size and framed the same way, or the divider
// slides across a step. See /public/project/codemao/compare-{old,new}.jpg.

// Pointer handling, in one place. A press moves the divider immediately for a mouse or
// a pen — the cursor is already exactly where the reader means — but not for a finger,
// which would make a page scroll that happens to start on the figure jolt the divider
// before the browser has decided the gesture is a scroll at all. On touch the divider
// only follows once the finger has actually moved.
export default function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  caption,
  // The sources' own aspect ratio, width ÷ height. The frame takes its height from
  // this rather than from the loaded image, so nothing reflows when the images land.
  ratio = 1600 / 1100,
}) {
  const t = useT()
  const hostRef = useRef(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(50)

  const moveTo = useCallback((clientX) => {
    const el = hostRef.current
    if (!el) return
    const box = el.getBoundingClientRect()
    if (!box.width) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    if (e.pointerType !== "touch") moveTo(e.clientX)
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    moveTo(e.clientX)
  }

  const stop = (e) => {
    dragging.current = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }

  // Arrow keys nudge, Home/End jump to either end — the whole control reachable
  // without a pointer, which a clip-path wipe otherwise is not.
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2
    const to =
      e.key === "ArrowLeft" ? pos - step
      : e.key === "ArrowRight" ? pos + step
      : e.key === "Home" ? 0
      : e.key === "End" ? 100
      : null
    if (to === null) return
    e.preventDefault()
    setPos(Math.min(100, Math.max(0, to)))
  }

  return (
    <figure className="mt-6">
      <div
        ref={hostRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="relative w-full select-none overflow-hidden rounded-xl border border-line bg-box"
        // `pan-y` and not `none`: a vertical swipe over the figure still scrolls the
        // page, a horizontal one is ours.
        style={{ aspectRatio: ratio, touchAction: "pan-y", cursor: "ew-resize" }}
      >
        {/* Underneath: the new version, whole. */}
        <img
          src={after}
          alt={afterLabel}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />

        {/* On top: the old version, clipped to everything left of the divider. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <img
            src={before}
            alt={beforeLabel}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* The two corner labels. Each one hides when the divider passes it, so the
            label never sits over the version it is not naming. */}
        <span
          className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-mono-tight text-note uppercase tracking-wide text-white transition-opacity"
          style={{ opacity: pos > 14 ? 1 : 0 }}
        >
          {beforeLabel}
        </span>
        <span
          className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 font-mono-tight text-note uppercase tracking-wide text-white transition-opacity"
          style={{ opacity: pos < 86 ? 1 : 0 }}
        >
          {afterLabel}
        </span>

        {/* The divider. `touch-action: none` here only — a drag that starts on the
            handle is never a page scroll. */}
        <div
          role="slider"
          tabIndex={0}
          aria-label={t(ui.compareHandle)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
          onKeyDown={onKeyDown}
          className="group absolute inset-y-0 z-10 w-10 -translate-x-1/2 cursor-ew-resize outline-none"
          style={{ left: `${pos}%`, touchAction: "none" }}
        >
          <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/90" />
          {/* The focus ring lives on the grip rather than on the 40px-wide hit area,
              which is invisible and would draw a ring around nothing. */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/55 text-white backdrop-blur-sm group-focus-visible:ring-2 group-focus-visible:ring-white group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-black/40"
          >
            {/* Two chevrons, drawn rather than imported — the icon set's arrows are
                not a pair and a pair is the whole message. */}
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 7 5 12l4.5 5M14.5 7l4.5 5-4.5 5" />
            </svg>
          </span>
        </div>
      </div>

      <figcaption className="mt-2.5 text-note leading-relaxed text-fog">
        {caption ? `${caption} ` : ""}
        {t(ui.compareHint)}
      </figcaption>
    </figure>
  )
}
