import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/persona"

// The Kyrall user journey in the page's own flow layout (the Figma board,
// StoryMapBoard.jsx, is kept but no longer on the page): five stages across, the
// three personas down, one cell per person per stage. The two stages Kyrall owns
// (`lit`) carry the green stage marker and an outlined cell. On narrow screens
// the map scrolls sideways rather than squeezing five columns into a phone.
// A supporting chapter, so the cells run at the 13px floor.
export default function JourneyMap({ map }) {
  const t = useT()
  const cols = "grid grid-cols-[9rem_repeat(5,minmax(0,1fr))] gap-2"
  return (
    <div className="mt-section">
      <h3 className="text-2xl font-semibold tracking-tight text-cream">{t(map.title)}</h3>

      <div className="no-scrollbar mt-visual overflow-x-auto">
        <div className="min-w-[56rem]">
          {/* stages */}
          <div className={cols}>
            <span aria-hidden="true" />
            {map.stages.map((s) => (
              <div
                key={s.n}
                className={`flex items-baseline gap-2 rounded-md px-3 py-2 ${
                  s.lit ? "bg-kyrall text-[#191717]" : "border border-ink/20 text-ink"
                }`}
              >
                <span className="font-mono-tight text-note tabular-nums">{s.n}</span>
                <span className="text-note font-semibold">{t(s.label)}</span>
              </div>
            ))}
          </div>

          {/* one row per persona */}
          {map.rows.map((row) => (
            <div key={row.name} className={`${cols} mt-2`}>
              <div className="flex flex-col justify-start pr-2 pt-2">
                <img src={`${ART}/${row.photo}`} alt="" loading="lazy" className="size-10 rounded-lg object-cover" />
                <p className="mt-2 text-callout font-semibold text-cream">{row.name}</p>
                <p className="text-note text-fog">{t(row.role)}</p>
              </div>
              {row.cells.map((cell, i) => (
                <div
                  key={i}
                  className={`flex flex-col rounded-xl p-3 ${
                    map.stages[i].lit
                      ? "border border-ink bg-[#efede8] dark:bg-[#2f2f2f]"
                      : "bg-[#efede8] dark:bg-[#2f2f2f]"
                  }`}
                >
                  <p className="text-note text-ink">{t(cell.text)}</p>
                  {cell.chips?.length > 0 && (
                    <ul className="mt-auto flex flex-wrap gap-1 pt-3">
                      {cell.chips.map((c, k) => (
                        <li key={k} className="rounded-md border border-ink/20 px-2 py-1 text-note text-ink">
                          {t(c)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
