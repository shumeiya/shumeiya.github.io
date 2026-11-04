import { useCallback, useEffect, useRef, useState } from "react"

// Interaction and motion pieces for the WeatherPets case study: a scroll reveal,
// a count-up for headline numbers, a before/after wipe, a segmented switch and a
// timed stepper. Everything honours prefers-reduced-motion: the reveal and the
// count-up show their end state at once, and nothing advances on its own.

export const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

// Is the element on screen? `once` keeps it true after the first sighting.
export function useInView(ref, { threshold = 0.25, once = false } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) setInView(false)
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, once])
  return inView
}

// --- reveal ------------------------------------------------------------------------
// One shared observer for every revealed element. The hidden starting state only
// applies once `wp-motion` is on <html>, which this sets on first use — so with
// no script, or reduced motion, nothing is ever hidden.
let revealIO = null
function observeReveal(el) {
  if (typeof window === "undefined" || reducedMotion()) return () => {}
  document.documentElement.classList.add("wp-motion")
  if (!revealIO) {
    revealIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in")
            revealIO.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    )
  }
  revealIO.observe(el)
  return () => revealIO?.unobserve(el)
}

export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    return observeReveal(ref.current)
  }, [])
  return ref
}

// --- count-up ------------------------------------------------------------------------
// "26M+", "5,600+", "87%", "3 × 5": the leading number counts up from zero when the
// figure comes into view; whatever follows it is set as is.
export function CountUp({ children }) {
  const text = String(children)
  const m = text.match(/^([\d][\d,]*(?:\.\d+)?)(.*)$/s)
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.6, once: true })
  const [shown, setShown] = useState(m ? null : text)

  useEffect(() => {
    if (!m) return
    const raw = m[1]
    const target = parseFloat(raw.replace(/,/g, ""))
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0
    const grouped = raw.includes(",")
    const fmt = (v) => {
      const s = v.toFixed(decimals)
      return grouped ? Number(s).toLocaleString("en-US", { minimumFractionDigits: decimals }) : s
    }
    if (!seen) {
      setShown(reducedMotion() ? raw : fmt(0))
      return
    }
    if (reducedMotion()) {
      setShown(raw)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const D = 1100
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / D)
      const eased = 1 - Math.pow(1 - p, 3)
      setShown(p >= 1 ? raw : fmt(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, text])

  return (
    <span ref={ref} className="tabular-nums">
      {m ? (
        <>
          {shown ?? m[1]}
          {m[2]}
        </>
      ) : (
        text
      )}
    </span>
  )
}

// --- wipe ------------------------------------------------------------------------------
// Two layers in one frame with a divider the reader drags: `before` on the left,
// `after` revealed from the right. `at` lets the parent set the divider (it glides
// there); once the reader drags, the reader is in charge. Arrow keys work too.
export function Wipe({ before, after, beforeLabel, afterLabel, at = 50, onGrab, className = "" }) {
  const host = useRef(null)
  const dragging = useRef(false)
  const [pos, setPos] = useState(at)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!held) setPos(at)
  }, [at, held])

  const moveTo = useCallback((x) => {
    const box = host.current?.getBoundingClientRect()
    if (!box?.width) return
    setPos(Math.min(100, Math.max(0, ((x - box.left) / box.width) * 100)))
  }, [])

  const grab = () => {
    if (!held) {
      setHeld(true)
      onGrab?.()
    }
  }
  const down = (e) => {
    dragging.current = true
    grab()
    e.currentTarget.setPointerCapture?.(e.pointerId)
    if (e.pointerType !== "touch") moveTo(e.clientX)
  }
  const move = (e) => dragging.current && moveTo(e.clientX)
  const up = (e) => {
    dragging.current = false
    e.currentTarget.releasePointerCapture?.(e.pointerId)
  }
  const key = (e) => {
    const step = e.shiftKey ? 10 : 4
    const to = e.key === "ArrowLeft" ? pos - step : e.key === "ArrowRight" ? pos + step : null
    if (to === null) return
    e.preventDefault()
    grab()
    setPos(Math.min(100, Math.max(0, to)))
  }

  const glide = held ? "" : "transition-[clip-path,left] duration-700 ease-out"
  return (
    <div
      ref={host}
      role="slider"
      tabIndex={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      aria-label={`${beforeLabel} / ${afterLabel}`}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onKeyDown={key}
      className={`group relative grid cursor-ew-resize touch-pan-y select-none overflow-hidden focus:outline-none ${className}`}
    >
      <div className="col-start-1 row-start-1">{before}</div>
      <div className={`col-start-1 row-start-1 ${glide}`} style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {after}
      </div>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 ${glide}`} style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-white/90 shadow-[0_0_12px_rgba(0,0,0,0.25)]" />
        <div className="absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-copy font-bold text-[#151821] shadow-lg transition-transform group-hover:scale-110 group-focus-visible:scale-110">
          ↔
        </div>
      </div>
      {beforeLabel && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-note font-bold text-white backdrop-blur">
          {beforeLabel}
        </span>
      )}
      {afterLabel && (
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-note font-bold text-white backdrop-blur">
          {afterLabel}
        </span>
      )}
    </div>
  )
}

// --- segmented switch ------------------------------------------------------------------
export function Segmented({ options, value, onChange, className = "" }) {
  return (
    <div role="tablist" className={`inline-flex flex-wrap gap-1 rounded-full p-1 ${className}`} style={{ background: "var(--wp-pale)" }}>
      {options.map((o, i) => {
        const on = i === value
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            className="rounded-full px-4 py-2 text-note font-bold transition-colors duration-300"
            style={on ? { background: "var(--wp-blue)", color: "#fff" } : { color: "var(--wp-link)" }}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}

// --- timed stepper ----------------------------------------------------------------------
// Advances `count` steps every `ms` while `run` is true; `progress` (0–1) is the
// time spent on the current step, for a bar. Picking a step restarts its clock.
export function useStepper(count, { ms = 5000, run = true } = {}) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [auto, setAuto] = useState(() => !reducedMotion())
  const go = (i) => {
    setStep(i)
    setProgress(0)
  }
  useEffect(() => {
    if (!run || !auto) return
    let raf = 0
    const t0 = performance.now() - progress * ms
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / ms)
      setProgress(p)
      if (p >= 1) {
        setStep((s) => (s + 1) % count)
        setProgress(0)
      } else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, auto, step, count, ms])
  return { step, progress, go, auto, setAuto }
}
