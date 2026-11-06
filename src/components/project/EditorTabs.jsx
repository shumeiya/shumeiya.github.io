import { useEffect, useRef, useState } from "react"
import { useT } from "../../i18n/lang"
import { reducedMotion, useInView } from "./wpMotion"

// A section's recordings, presented the way adam.new presents a section: one
// large recording on top and a row of numbered tabs underneath — no thumbnail
// strip. The Editor's tools and the Dashboard's features both run through it.
// The active tab carries a progress line along its top rule, fed by the video
// itself; when a recording ends the next tab starts — also after the reader
// picks a tab, so the sequence always moves on.
//
// A tab holds one recording (`video`) or a run of them (`clips`, each with an
// optional label and playback rate); the progress line spans the whole run.
//
// It only plays while on screen, and under prefers-reduced-motion nothing
// plays or advances until the reader picks a tab.
const COLS = { 4: "lg:grid-cols-4", 5: "lg:grid-cols-5", 6: "lg:grid-cols-6" }

export default function EditorTabs({ items }) {
  const t = useT()
  const root = useRef(null)
  const videoRef = useRef(null)
  const inView = useInView(root, { threshold: 0.35 })
  const [step, setStep] = useState(0)
  const [clip, setClip] = useState(0)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState(() => !reducedMotion())
  const it = items[step]
  const clips = it.clips ?? [{ src: it.video, poster: it.poster }]
  const current = clips[Math.min(clip, clips.length - 1)]

  const pick = (i) => {
    setPlaying(true)
    setStep(i)
    setClip(0)
    setProgress(0)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.playbackRate = current?.rate ?? 1
    if (inView && playing) v.play().catch(() => {})
    else v.pause()
  }, [inView, playing, step, clip, current])

  const onTime = (e) => {
    const v = e.currentTarget
    if (v.duration) setProgress((clip + v.currentTime / v.duration) / clips.length)
  }
  const onEnded = () => {
    if (clip < clips.length - 1) {
      setClip(clip + 1)
    } else {
      setStep((s) => (s + 1) % items.length)
      setClip(0)
      setProgress(0)
    }
  }

  return (
    <div ref={root} className="mt-visual">
      <div className="overflow-hidden rounded-xl bg-band">
        {current?.src ? (
          <video
            key={current.src}
            ref={videoRef}
            src={current.src}
            poster={current.poster}
            width={1920}
            height={1022}
            className="wp-swap block h-auto w-full"
            muted
            playsInline
            preload="auto"
            onTimeUpdate={onTime}
            onEnded={onEnded}
            aria-label={t(it.title)}
          />
        ) : (
          <img key={it.file} src={it.poster} alt={t(it.title)} className="block h-auto w-full" />
        )}
      </div>

      <ol
        className={`no-scrollbar mt-4 flex gap-x-6 overflow-x-auto lg:grid lg:gap-x-4 ${
          COLS[items.length] ?? "lg:grid-cols-6"
        }`}
      >
        {items.map((item, i) => {
          const on = i === step
          const itemClips = item.clips ?? []
          return (
            <li key={i} className="min-w-[10rem] flex-1 lg:min-w-0">
              {/* The tab's top rule; under the active tab the progress runs along it. */}
              <div aria-hidden="true" className="relative h-px bg-line">
                {on && (
                  <div
                    className="absolute -top-px left-0 h-[3px] bg-kyrall"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </div>
              <button type="button" onClick={() => pick(i)} aria-pressed={on} className="w-full pb-2 pt-3 text-left">
                <span className={`font-mono-tight text-note tabular-nums ${on ? "text-cream" : "text-fog"}`}>
                  {item.n ?? `0${i + 1}`}
                </span>
                <span
                  className={`mt-1 block text-copy font-semibold tracking-tight transition-colors duration-300 ${
                    on ? "text-cream" : "text-fog"
                  }`}
                >
                  {t(item.title)}
                </span>
                {/* Under the active title: a tab with several clips lists them and
                    lights the one playing; otherwise its one line of body. */}
                {on && itemClips.length > 1 ? (
                  <span className="wp-swap mt-1 flex flex-wrap gap-x-2 text-note">
                    {itemClips.map((c, k) => (
                      <span key={k} className={k === clip ? "text-cream" : "text-fog"}>
                        {k > 0 && <span aria-hidden="true" className="mr-2 text-fog">·</span>}
                        {t(c.label)}
                      </span>
                    ))}
                  </span>
                ) : (
                  on &&
                  (item.body ?? item.line) && (
                    <span className="wp-swap mt-1 block text-note text-fog">{t(item.body ?? item.line)}</span>
                  )
                )}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
