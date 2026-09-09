import { useCallback, useEffect, useRef, useState } from "react"

// The row of panels sits on a single 3D stage: one perspective, one vanishing
// point. Leaning the stage back on rotateX is what bows the panels — the further
// a panel sits from the vanishing point, the harder its edges skew, which is the
// curl you see at the left and right of the strip.
const DEPTH = 1500 // px of perspective; smaller is a wider-angle lens
const BASE_TILT = 4 // the stage never sits perfectly flat — panels always read as 3D
const TILT_DEG = 7 // how much more it leans as it crosses the viewport
const TURN_DEG = 4 // extra turn on panels away from the middle
const EASE = 0.14 // how fast the row catches up to where it's headed

// The row is rendered COPIES times over and the offset wraps by the width of one
// copy, so the strip runs forever in both directions and the panel before the
// first one is always visible bleeding in from the left. Keeping the offset in
// the middle copy means the neighbours on both sides are always drawn — which
// holds as long as one copy is at least a viewport wide (true for 2+ panels).
const COPIES = 3

const SIZE = {
  md: "w-[86vw] sm:w-[44vw] lg:w-[38vw]",
  lg: "w-[88vw] sm:w-[56vw] lg:w-[50vw]",
  xl: "w-[92vw] sm:w-[64vw] lg:w-[58vw]",
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

export default function WorkStrip({ panels, accent }) {
  const clipRef = useRef(null)
  const stageRef = useRef(null)
  const rowRef = useRef(null)
  const probeRef = useRef(null)
  const panelRefs = useRef([])

  const pos = useRef({ x: 0, target: 0 })
  const setWidth = useRef(0)
  const started = useRef(false)
  const rafRef = useRef(0)
  const liveRef = useRef(false)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)

  const count = panels.length
  const loop = count > 1 ? Array.from({ length: COPIES * count }, (_, i) => panels[i % count]) : panels

  const paintRef = useRef(() => {})
  const schedule = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(() => paintRef.current())
  }, [])

  paintRef.current = () => {
    rafRef.current = 0
    const clip = clipRef.current
    const stage = stageRef.current
    const row = rowRef.current
    if (!clip || !stage || !row) return

    const p = pos.current
    const indent = probeRef.current?.offsetWidth ?? 0

    // One copy's width — the distance between the same panel in copy 0 and copy 1.
    if (count > 1 && panelRefs.current[count] && panelRefs.current[0]) {
      setWidth.current = panelRefs.current[count].offsetLeft - panelRefs.current[0].offsetLeft
    }
    const set = setWidth.current

    // Open on the first panel at the indent, with the panel before it bleeding
    // in from the left.
    if (!started.current && set > 0) {
      started.current = true
      p.x = set - indent
      p.target = p.x
    }

    // Wrap into the middle copy, carrying the target along so the easing in
    // flight isn't disturbed.
    if (set > 0) {
      const delta = p.target - p.x
      while (p.x >= set * 2) p.x -= set
      while (p.x < set) p.x += set
      p.target = p.x + delta
    }

    p.x += (p.target - p.x) * EASE
    if (Math.abs(p.target - p.x) < 0.4) p.x = p.target

    // Where the strip sits in the viewport, as roughly -1 (below) to 1 (above).
    const box = clip.getBoundingClientRect()
    const lean = clamp(
      (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight,
      -1,
      1
    )

    stage.style.transform = `rotateX(${BASE_TILT + lean * TILT_DEG}deg)`
    row.style.transform = `translate3d(${-p.x}px, 0, 0)`

    // Panel positions come from layout (offsetLeft) rather than
    // getBoundingClientRect, so the transforms we write can't feed back into the
    // measurements we read next frame.
    const mid = clip.clientWidth / 2
    let nearest = 0
    let best = Infinity
    panelRefs.current.forEach((el, i) => {
      if (!el) return
      const centre = el.offsetLeft + el.offsetWidth / 2 - p.x
      const t = clamp((centre - mid) / mid, -1.5, 1.5)
      el.style.transform = `rotateY(${-t * TURN_DEG}deg)`
      const dist = Math.abs(centre - mid)
      if (dist < best) {
        best = dist
        nearest = i % count
      }
    })

    if (nearest !== activeRef.current) {
      activeRef.current = nearest
      setActive(nearest)
    }

    if (liveRef.current) schedule()
  }

  // The loop only runs while the strip is on screen — off-screen sections cost
  // nothing.
  useEffect(() => {
    const clip = clipRef.current
    if (!clip) return
    const io = new IntersectionObserver(
      ([entry]) => {
        liveRef.current = entry.isIntersecting
        if (entry.isIntersecting) schedule()
      },
      { rootMargin: "20% 0px" }
    )
    io.observe(clip)
    const onResize = () => {
      started.current = false // re-open on the first panel at the new indent
      schedule()
    }
    window.addEventListener("resize", onResize)
    return () => {
      io.disconnect()
      window.removeEventListener("resize", onResize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [schedule])

  // Trackpad / horizontal wheel. Vertical intent is left alone so the page keeps
  // scrolling normally over the strip.
  useEffect(() => {
    const clip = clipRef.current
    if (!clip) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      pos.current.target += e.deltaX
      schedule()
    }
    clip.addEventListener("wheel", onWheel, { passive: false })
    return () => clip.removeEventListener("wheel", onWheel)
  }, [schedule])

  // Drag to pan. The first few px of a gesture decide whether it belongs to the
  // strip or to the page, so a vertical swipe on a phone still scrolls the page.
  useEffect(() => {
    const clip = clipRef.current
    if (!clip) return
    let startX = 0
    let startY = 0
    let from = 0
    let axis = null // null = undecided, "x" = ours, "y" = the page's

    const down = (e) => {
      axis = null
      startX = e.clientX
      startY = e.clientY
      from = pos.current.target
    }
    const move = (e) => {
      if (e.buttons === 0) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      if (axis === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y"
        if (axis === "x") {
          clip.setPointerCapture(e.pointerId)
          clip.style.cursor = "grabbing"
        }
      }
      if (axis !== "x") return
      e.preventDefault()
      pos.current.target = from - dx
      schedule()
    }
    const up = (e) => {
      if (axis === "x" && clip.hasPointerCapture(e.pointerId)) {
        clip.releasePointerCapture(e.pointerId)
      }
      axis = null
      clip.style.cursor = ""
    }

    clip.addEventListener("pointerdown", down)
    clip.addEventListener("pointermove", move)
    clip.addEventListener("pointerup", up)
    clip.addEventListener("pointercancel", up)
    return () => {
      clip.removeEventListener("pointerdown", down)
      clip.removeEventListener("pointermove", move)
      clip.removeEventListener("pointerup", up)
      clip.removeEventListener("pointercancel", up)
    }
  }, [schedule])

  // Jump to a panel — of its identical copies, head for whichever is closest, so
  // the strip never takes the long way round.
  const goTo = (i) => {
    const indent = probeRef.current?.offsetWidth ?? 0
    const here = pos.current.x
    let bestTarget = null
    for (let c = 0; c < COPIES; c += 1) {
      const el = panelRefs.current[c * count + i]
      if (!el) continue
      const candidate = el.offsetLeft - indent
      if (bestTarget === null || Math.abs(candidate - here) < Math.abs(bestTarget - here)) {
        bestTarget = candidate
      }
    }
    if (bestTarget !== null) {
      pos.current.target = bestTarget
      schedule()
    }
  }

  return (
    <div className="select-none">
      <div
        ref={clipRef}
        className="work-clip relative cursor-grab"
        style={{ perspective: `${DEPTH}px`, perspectiveOrigin: "50% 0%" }}
      >
        {/* Measures --work-indent in px so the row can align its first panel with
            the heading above it. */}
        <div
          ref={probeRef}
          aria-hidden="true"
          className="pointer-events-none absolute h-0"
          style={{ width: "var(--work-indent)" }}
        />
        <div ref={stageRef} className="work-stage">
          <div ref={rowRef} className="work-row flex items-stretch gap-4 sm:gap-5">
            {loop.map((panel, i) => (
              <article
                key={i}
                ref={(el) => (panelRefs.current[i] = el)}
                aria-hidden={i >= count ? "true" : undefined}
                className={`work-panel h-[58vh] max-h-[720px] min-h-[300px] shrink-0 overflow-hidden rounded-[2rem] sm:h-[66vh] ${
                  SIZE[panel.size] ?? SIZE.lg
                }`}
                style={{
                  backgroundColor: panel.tone === "accent" ? accent : "var(--color-box)",
                  color: panel.tone === "accent" ? "var(--color-paper-ink)" : undefined,
                }}
              >
                {panel.kind === "note" ? (
                  <div className="flex h-full flex-col justify-between p-7 sm:p-10">
                    <p className="font-mono-tight text-xs uppercase tracking-wide opacity-60">
                      {panel.eyebrow}
                    </p>
                    <div>
                      <h4 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {panel.title}
                      </h4>
                      <p className="max-w-sm text-sm leading-relaxed opacity-70 sm:text-base">
                        {panel.body}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full flex-col">
                    {panel.label && (
                      <p className="shrink-0 px-6 pt-6 text-center text-sm text-ink/70 sm:pt-7 sm:text-base">
                        {panel.label}
                      </p>
                    )}
                    <div className="flex min-h-0 flex-1 items-center justify-center gap-3 p-5 sm:gap-4 sm:p-7">
                      {panel.shots.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt={panel.label ?? ""}
                          loading="lazy"
                          draggable={false}
                          className="h-full w-auto max-w-full rounded-2xl object-contain"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Position dots — also the only affordance that says the row pans. */}
      {count > 1 && (
        <div className="mt-7 flex items-center justify-center gap-2.5">
          {panels.map((panel, i) => (
            <button
              key={panel.label ?? panel.title ?? i}
              onClick={() => goTo(i)}
              aria-label={`Show ${panel.label ?? panel.title ?? `panel ${i + 1}`}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                i === active ? "bg-ink" : "bg-ink/25 hover:bg-ink/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
