import { useRef } from "react"
import { useT } from "../../i18n/lang"
import { useInView, useStepper } from "./wpMotion"

// The Editor's five tools, presented the way adam.new presents a section: one
// large frame on top and a row of numbered tabs underneath — no thumbnail
// strip. The active tab carries a progress line along its top rule and the
// sequence advances on its own; picking a tab hands control to the reader.
//
// Until a tool has its screen recording, the frame holds the tool's panel
// screenshot on the band; give an item `video` (and it plays, advancing when
// it ends). Honour prefers-reduced-motion via useStepper (no auto-advance).
export default function EditorTabs({ items, base = "/project/kyrall/coreflow" }) {
  const t = useT()
  const root = useRef(null)
  const inView = useInView(root, { threshold: 0.35 })
  const steps = useStepper(items.length, { ms: 6000, run: inView })
  const it = items[steps.step]
  const pick = (i) => {
    steps.setAuto(false)
    steps.go(i)
  }

  return (
    <div ref={root} className="mt-visual">
      <div className="flex aspect-[1920/1022] items-center justify-center overflow-hidden rounded-xl bg-band">
        {it.video ? (
          <video
            key={it.video}
            src={it.video}
            className="wp-swap block h-full w-full object-cover"
            autoPlay={inView && steps.auto}
            muted
            playsInline
            preload="auto"
            onEnded={() => steps.auto && steps.go((steps.step + 1) % items.length)}
            aria-label={t(it.title)}
          />
        ) : (
          <img
            key={it.file}
            src={`${base}/${it.file}`}
            alt={t(it.title)}
            className="wp-swap h-full object-contain py-6"
          />
        )}
      </div>

      <ol className="no-scrollbar mt-4 flex gap-x-6 overflow-x-auto lg:grid lg:grid-cols-5 lg:gap-x-4">
        {items.map((item, i) => {
          const on = i === steps.step
          return (
            <li key={i} className="min-w-[11rem] flex-1 lg:min-w-0">
              {/* The tab's top rule; under the active tab the progress runs along it. */}
              <div aria-hidden="true" className="relative h-px bg-line">
                {on && (
                  <div
                    className="absolute -top-px left-0 h-[3px] bg-kyrall"
                    style={{ width: `${(steps.auto ? steps.progress : 1) * 100}%` }}
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
