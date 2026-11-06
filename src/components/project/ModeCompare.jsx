import { useState } from "react"
import { useT } from "../../i18n/lang"

// Light and dark mode of the same screen, side by side under the Design System
// chapter. Each card carries a small pill switch (the chip utilities, so the
// control looks like the rest of the Kyrall page) and crossfades between the
// two captures; both are in the DOM, so the swap is instant. The dark capture
// leads, since the product itself is dark-first.
function ModeCard({ item }) {
  const t = useT()
  const [mode, setMode] = useState(0) // 0 dark, 1 light
  const shots = [
    { src: item.dark, label: t(item.darkLabel) },
    { src: item.light, label: t(item.lightLabel) },
  ]
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-copy font-semibold tracking-tight text-cream">{t(item.title)}</p>
        <div role="tablist" className="inline-flex gap-1">
          {shots.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={i === mode}
              onClick={() => setMode(i)}
              className={i === mode ? "chip-accent" : "chip"}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-body grid overflow-hidden rounded-xl">
        {shots.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={`${t(item.title)} · ${s.label}`}
            width={1920}
            height={1042}
            loading="lazy"
            className={`col-start-1 row-start-1 block h-auto w-full transition-opacity duration-500 ${
              i === mode ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function ModeCompare({ items }) {
  return (
    <div className="mt-visual grid gap-card lg:grid-cols-2">
      {items.map((item, i) => (
        <ModeCard key={i} item={item} />
      ))}
    </div>
  )
}
