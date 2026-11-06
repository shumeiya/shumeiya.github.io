import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/extensions"

// The four Extensions pages in the page's own flow layout (the Figma board,
// ExtensionsBoard.jsx, is kept but no longer on the page). Each act gets a
// numbered head, the screen itself, and its callouts as a quiet grid of notes
// underneath, in place of the deck's gutter arrows. Act 01 plays a recording
// of the Projects page instead of the five state screenshots.
const ACTS = [
  { video: { src: `${ART}/projects.mp4`, poster: `${ART}/projects.jpg` } },
  {
    screens: [
      { src: "comm-base.png", notes: ["banner", "modelCard", "tutorialCard"] },
      { src: "comm-detail.png", notes: ["prompt", "model", "related"] },
    ],
  },
  {
    screens: [{ src: "context.png", notes: ["level", "graph", "fileState", "generate"] }],
  },
  {
    screens: [
      { src: "mesh-base.png", notes: ["space", "upload", "folders", "status"] },
      { src: "mesh-detail.png", notes: ["fileDetail", "input", "nextStep"] },
    ],
  },
]

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

            {layout.video && (
              <video
                src={layout.video.src}
                poster={layout.video.poster}
                width={1920}
                height={1022}
                className="mt-visual block h-auto w-full rounded-xl bg-box"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={t(act.title)}
              />
            )}

            {layout.screens?.map((screen) => (
              <div key={screen.src}>
                <img
                  src={`${ART}/${screen.src}`}
                  alt={t(act.title)}
                  loading="lazy"
                  className="mt-visual block h-auto w-full rounded-xl"
                />
                <ul
                  className={`mt-6 grid gap-card sm:grid-cols-2 ${
                    screen.notes.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"
                  }`}
                >
                  {screen.notes.map((key) => (
                    <li key={key} className="border-t border-line pt-3">
                      <p className="text-copy font-semibold tracking-tight text-cream">{t(notes[key].title)}</p>
                      <p className="mt-1 text-callout text-ink">{t(notes[key].body)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )
      })}
    </div>
  )
}
