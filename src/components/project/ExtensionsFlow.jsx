import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/extensions"

// The four Extensions pages in the page's own flow layout (the Figma board,
// ExtensionsBoard.jsx, is kept but no longer on the page). Each act keeps its
// numbered head, runs its recording on the left, and makes one point on the
// right: a title and a tight paragraph (the act's `brief` in the data file),
// centred against the recording. The recordings loop on their own.
const ACTS = [
  { video: { src: `${ART}/projects.mp4`, poster: `${ART}/projects.jpg` } },
  { video: { src: `${ART}/community.mp4`, poster: `${ART}/community.jpg` } },
  { video: { src: `${ART}/context-manager.mp4`, poster: `${ART}/context-manager.jpg` } },
  { video: { src: `${ART}/mesh-workspace.mp4`, poster: `${ART}/mesh-workspace.jpg` } },
]

export default function ExtensionsFlow({ board }) {
  const t = useT()
  const { acts } = board

  return (
    <div className="mt-visual">
      {ACTS.map((layout, i) => {
        const act = acts[i]
        return (
          <section key={act.n} className={i > 0 ? "mt-section" : undefined}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono-tight text-note tabular-nums text-fog">{act.n}</span>
              <h3 className="text-2xl font-semibold tracking-tight text-cream">
                {t(act.title)}
                {act.accent && <span className="font-medium text-fog">{t(act.accent)}</span>}
              </h3>
            </div>

            <div className="mt-visual grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <video
                src={layout.video.src}
                poster={layout.video.poster}
                width={1920}
                height={1022}
                className="block h-auto w-full rounded-xl bg-box"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t(act.title)}
              />
              <div className="lg:self-center">
                <h4 className="text-xl font-semibold tracking-tight text-cream">{t(act.brief.title)}</h4>
                <p className="mt-body text-copy text-ink">{t(act.brief.body)}</p>
              </div>
            </div>
          </section>
        )
      })}
    </div>
  )
}
