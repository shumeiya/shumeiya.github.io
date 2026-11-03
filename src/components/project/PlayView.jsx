import { useEffect, useRef, useState } from "react"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// A numbered feature list on the left and its screen recording on the right,
// played through in order the way adam.new presents its workspace section.
//
// Each item has zero or more clips. The active item's clips play one after
// another; when the last one ends, the next item starts. The thin bar under the
// active item fills across all of its clips. An item with no clip yet holds a
// placeholder for HOLD_MS so the sequence keeps moving.
//
// It only runs while it is on screen. For readers who ask for reduced motion it
// starts still, and plays once they pick an item. The recording is shown whole,
// at its own proportions, with no frame around it.
const HOLD_MS = 4000

export default function PlayView({ items }) {
  const t = useT()
  const [active, setActive] = useState(0)
  const [clip, setClip] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(
    () => !(typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  )
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)
  const videoRef = useRef(null)

  const item = items[active]
  const clips = item.clips ?? []
  const running = playing && inView

  const go = (i) => {
    setActive(i)
    setPlaying(true)
    setClip(0)
    setProgress(0)
  }
  const next = () => go((active + 1) % items.length)

  // Run only while the section is visible.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Play or pause the current clip with the run state.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (running) v.play().catch(() => {})
    else v.pause()
  }, [running, active, clip])

  // An item without a clip holds its placeholder for HOLD_MS.
  useEffect(() => {
    if (clips.length || !running) return
    let raf = 0
    const start = performance.now() - progress * HOLD_MS
    const tick = (now) => {
      const p = Math.min(1, (now - start) / HOLD_MS)
      setProgress(p)
      if (p >= 1) next()
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, running, clips.length])

  const onTime = (e) => {
    const v = e.currentTarget
    if (!v.duration) return
    setProgress((clip + v.currentTime / v.duration) / clips.length)
  }
  const onEnded = () => {
    if (clip < clips.length - 1) setClip(clip + 1)
    else next()
  }

  return (
    <div ref={rootRef} className="mt-visual grid gap-8 pb-8 lg:grid-cols-[21rem_minmax(0,1fr)]">
      <ol className="flex flex-col border-t border-line lg:h-full">
        {items.map((it, i) => {
          const on = i === active
          return (
            <li key={i} className="flex flex-col lg:flex-1">
              <button
                type="button"
                onClick={() => go(i)}
                aria-pressed={on}
                className="group flex w-full items-center py-4 text-left lg:flex-1 lg:py-0"
              >
                <span className="flex w-full items-baseline gap-4">
                <span className={`w-6 shrink-0 font-mono-tight text-note tabular-nums ${on ? "text-cream" : "text-fog"}`}>
                  {it.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-2xl font-semibold tracking-tight transition-colors ${
                      on ? "text-cream" : "text-fog group-hover:text-ink"
                    }`}
                  >
                    {t(it.title)}
                  </span>
                  {/* One line under the active title. An item with several clips
                      lists them and lights the one playing; the rest carry a line
                      of their own, so every item opens to the same height. */}
                  {on && it.clips?.length > 1 ? (
                    <span className="mt-1 flex flex-wrap gap-x-2 text-callout">
                      {it.clips.map((c, k) => (
                        <span key={k} className={k === clip ? "text-cream" : "text-fog"}>
                          {k > 0 && <span aria-hidden="true" className="mr-2 text-fog">·</span>}
                          {t(c.label)}
                        </span>
                      ))}
                    </span>
                  ) : (
                    on && it.line && <span className="mt-1 block text-callout text-fog">{t(it.line)}</span>
                  )}
                </span>
                </span>
              </button>
              {/* The row's divider. Under the active item the progress runs along it,
                  a touch thicker than the hairline, so the two read as one line. */}
              <div aria-hidden="true" className="relative h-px bg-line">
                {on && (
                  <div
                    className="absolute -top-px left-0 h-[3px] bg-kyrall"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div>
        {clips.length ? (
          <video
            key={clips[clip].src}
            ref={videoRef}
            src={clips[clip].src}
            poster={clips[clip].poster}
            width={1600}
            height={852}
            className="block h-auto w-full"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTime}
            onEnded={onEnded}
            aria-label={`${t(item.title)}${clips.length > 1 ? ` · ${t(clips[clip].label)}` : ""}`}
          />
        ) : (
          <div className="flex aspect-[1600/852] items-center justify-center bg-[#efede8] dark:bg-[#2f2f2f]">
            <p className="text-callout text-fog">{t(ui.videoComingSoon)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
