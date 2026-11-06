import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/extensions"

// The four Extensions pages in the page's own flow layout (the Figma board,
// ExtensionsBoard.jsx, is kept but no longer on the page). Each act keeps its
// numbered head and copy, runs its recording on the left, and lists the
// page's callouts as a quiet rail on the right, per Shumei's sketch; the rail
// holds every callout of that page and stays within the recording's height.
// Each recording loops on its own, so there is nothing to step through.
const ACTS = [
  {
    video: { src: `${ART}/projects.mp4`, poster: `${ART}/projects.jpg` },
    notes: ["projCards", "projViews", "projStates"],
  },
  {
    video: { src: `${ART}/community.mp4`, poster: `${ART}/community.jpg` },
    notes: ["banner", "modelCard", "tutorialCard", "prompt", "model", "related"],
  },
  {
    video: { src: `${ART}/context-manager.mp4`, poster: `${ART}/context-manager.jpg` },
    notes: ["level", "graph", "fileState", "generate"],
  },
  {
    video: { src: `${ART}/mesh-workspace.mp4`, poster: `${ART}/mesh-workspace.jpg` },
    notes: ["upload", "status", "fileDetail", "input", "nextStep"],
  },
]

function Clip({ video, title }) {
  return (
    <video
      src={video.src}
      poster={video.poster}
      width={1920}
      height={1022}
      className="block h-auto w-full rounded-xl bg-box"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={title}
    />
  )
}

export default function ExtensionsFlow({ board }) {
  const t = useT()
  const { acts, notes } = board

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

            {layout.notes ? (
              <div className="mt-visual grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <Clip video={layout.video} title={t(act.title)} />
                {/* Every callout of the page, as one quiet rail. The rail may not
                    run past the recording, so the notes sit a step smaller than
                    the grids elsewhere: 14px titles over 13px lines, the floor. */}
                <ul className="grid content-start gap-card sm:grid-cols-2 lg:flex lg:flex-col lg:justify-between lg:gap-y-0 lg:divide-y lg:divide-line lg:[&>li+li]:pt-1">
                  {layout.notes.map((key) => (
                    <li key={key}>
                      <p className="text-callout font-semibold tracking-tight text-cream">{t(notes[key].title)}</p>
                      <p className="text-note text-ink">{t(notes[key].body)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="mt-visual">
                <Clip video={layout.video} title={t(act.title)} />
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
