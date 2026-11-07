import { useT } from "../../i18n/lang"
import { Wipe } from "./wpMotion"

// Light and dark mode of the same screen under the Design System chapter.
// An optional intro recording runs full width above (the light theme in
// motion), then each card is a before/after wipe: the dark capture
// underneath, the light one revealed by a divider the reader drags (arrow
// keys work too), with the mode names as small pills in the lower corners.
export default function ModeCompare({ items, intro }) {
  const t = useT()
  return (
    <div className="mt-visual">
      {intro && (
        <div className="mb-visual">
          <p className="text-copy font-semibold tracking-tight text-cream">{t(intro.title)}</p>
          <video
            src={intro.video}
            poster={intro.poster}
            width={1920}
            height={1022}
            className="mt-body block h-auto w-full rounded-xl bg-box"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t(intro.title)}
          />
        </div>
      )}
      <div className="grid gap-card lg:grid-cols-2">
      {items.map((item, i) => (
        <div key={i}>
          <p className="text-copy font-semibold tracking-tight text-cream">{t(item.title)}</p>
          <Wipe
            className="mt-body rounded-xl"
            before={
              <img
                src={item.dark}
                alt={`${t(item.title)} · ${t(item.darkLabel)}`}
                width={1920}
                height={1042}
                loading="lazy"
                draggable={false}
                className="block h-auto w-full"
              />
            }
            after={
              <img
                src={item.light}
                alt={`${t(item.title)} · ${t(item.lightLabel)}`}
                width={1920}
                height={1042}
                loading="lazy"
                draggable={false}
                className="block h-auto w-full"
              />
            }
            beforeLabel={t(item.darkLabel)}
            afterLabel={t(item.lightLabel)}
          />
        </div>
      ))}
      </div>
    </div>
  )
}
