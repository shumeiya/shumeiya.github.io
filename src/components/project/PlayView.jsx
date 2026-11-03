import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
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
// It only runs while it is on screen, starts paused for readers who ask for
// reduced motion, and the button in the frame pauses and resumes it.
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
    <div ref={rootRef} className="mt-visual pb-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] lg:items-center">
      <ol className="border-b border-line">
        {items.map((it, i) => {
          const on = i === active
          return (
            <li key={i} className="border-t border-line">
              <button
                type="button"
                onClick={() => go(i)}
                aria-pressed={on}
                className="group flex w-full items-baseline gap-6 py-4 text-left"
              >
                <span className={`font-mono-tight text-note ${on ? "text-cream" : "text-fog"}`}>{it.n}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-2xl font-semibold tracking-tight transition-colors ${
                      on ? "text-cream" : "text-fog group-hover:text-ink"
                    }`}
                  >
                    {t(it.title)}
                  </span>
                  {on && it.clips?.length > 1 && (
                    <span className="mt-2 flex flex-wrap gap-x-2 font-mono-tight text-note uppercase tracking-wide">
                      {it.clips.map((c, k) => (
                        <span key={k} className={k === clip ? "text-cream" : "text-fog"}>
                          {k > 0 && <span aria-hidden="true" className="mr-2 text-fog">·</span>}
                          {t(c.label)}
                        </span>
                      ))}
                    </span>
                  )}
                </span>
              </button>
              {on && (
                <div aria-hidden="true" className="-mt-1 mb-4 h-0.5 bg-line">
                  <div className="h-full bg-kyrall" style={{ width: `${progress * 100}%` }} />
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="relative aspect-[1600/852] overflow-hidden rounded-xl border border-line bg-[#191717]">
        {clips.length ? (
          <video
            key={clips[clip].src}
            ref={videoRef}
            src={clips[clip].src}
            poster={clips[clip].poster}
            className="block h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTime}
            onEnded={onEnded}
            aria-label={`${t(item.title)}${clips.length > 1 ? ` · ${t(clips[clip].label)}` : ""}`}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-callout text-white/60">{t(ui.videoComingSoon)}</p>
          </div>
        )}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={t(playing ? ui.pause : ui.play)}
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-md border border-white/20 bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  )
}
