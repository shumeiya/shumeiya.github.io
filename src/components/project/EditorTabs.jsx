import { useEffect, useRef, useState } from "react"
import { useT } from "../../i18n/lang"
import { reducedMotion, useInView } from "./wpMotion"

// The Editor's tools, presented the way adam.new presents a section: one large
// recording on top and a row of numbered tabs underneath — no thumbnail strip.
// The active tab carries a progress line along its top rule, fed by the video
// itself; when a recording ends the next tool starts. Picking a tab hands
// control to the reader: its recording then loops in place.
//
// It only plays while on screen, and under prefers-reduced-motion nothing
// plays or advances until the reader picks a tab.
export default function EditorTabs({ items }) {
  const t = useT()
  const root = useRef(null)
  const videoRef = useRef(null)
  const inView = useInView(root, { threshold: 0.35 })
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [auto, setAuto] = useState(() => !reducedMotion())
  const [playing, setPlaying] = useState(() => !reducedMotion())
  const it = items[step]

  const pick = (i) => {
    setAuto(false)
    setPlaying(true)
    setStep(i)
    setProgress(0)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (inView && playing) v.play().catch(() => {})
    else v.pause()
  }, [inView, playing, step])

  const onTime = (e) => {
    const v = e.currentTarget
    if (v.duration) setProgress(v.currentTime / v.duration)
  }
  const onEnded = (e) => {
    if (auto) {
      setStep((s) => (s + 1) % items.length)
      setProgress(0)
    } else {
      e.currentTarget.currentTime = 0
      e.currentTarget.play().catch(() => {})
    }
  }

  return (
    <div ref={root} className="mt-visual">
      <div className="overflow-hidden rounded-xl bg-band">
        {it.video ? (
          <video
            key={it.video}
            ref={videoRef}
            src={it.video}
            poster={it.poster}
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

      <ol className="no-scrollbar mt-4 flex gap-x-6 overflow-x-auto lg:grid lg:grid-cols-6 lg:gap-x-4">
        {items.map((item, i) => {
          const on = i === step
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
                  {`0${i + 1}`}
                </span>
                <span
                  className={`mt-1 block text-copy font-semibold tracking-tight transition-colors duration-300 ${
                    on ? "text-cream" : "text-fog"
                  }`}
                >
                  {t(item.title)}
                </span>
                {on && <span className="wp-swap mt-1 block text-note text-fog">{t(item.body)}</span>}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
