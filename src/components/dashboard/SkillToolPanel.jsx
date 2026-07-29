import { useRef } from "react"
import { useInView } from "framer-motion"
import { BarChart3 } from "lucide-react"
import Panel, { PanelHeader } from "./Panel"
import { skills, tools } from "../../data/profile"

const accents = [
  "var(--color-lime)",
  "var(--color-mint)",
  "var(--color-violet)",
  "var(--color-pink)",
  "var(--color-coral)",
  "var(--color-amber)",
  "var(--color-gold)",
  "var(--color-lime)",
]

const NUM_BARS = 56
const bars = Array.from({ length: NUM_BARS }, (_, i) => {
  const group = Math.floor(i / (NUM_BARS / skills.length))
  return {
    color: accents[group % accents.length],
    height: 18 + 72 * Math.abs(Math.sin(i * 1.35 + group * 0.6)),
    delay: i * 0.012,
  }
})

export default function SkillToolPanel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <Panel ref={ref} className="flex h-85 flex-col p-5 sm:p-6 lg:h-90">
      <PanelHeader icon={BarChart3} label="DESIGN SKILL MATRIX" />

      <div className="grid flex-1 grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-[11px] font-semibold tracking-wide text-cream">SKILL</p>
          <ul className="space-y-1.5">
            {skills.map((skill) => (
              <li key={skill.label} className="flex items-center justify-between gap-2 text-[11px]">
                <span className="truncate text-fog">{skill.label}</span>
                <span className="shrink-0 rounded-md bg-ink-2 px-1.5 py-0.5 font-mono-tight text-[9px] text-cream">
                  {skill.score}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-2 text-right text-[11px] font-semibold tracking-wide text-cream">TOOL</p>
          <ul className="space-y-1.5 text-right">
            {tools.map((tool) => (
              <li key={tool} className="text-[11px] text-fog">
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3 shrink-0 font-mono-tight text-[10px] text-fog">
        // always <span className="text-lime">iterating</span>, always{" "}
        <span className="text-mint">improving</span>
      </p>

      <div className="mt-3 flex h-8 shrink-0 items-end gap-0.75">
        {bars.map((bar, i) => (
          <div
            key={i}
            className="flex-1 rounded-full transition-[height] duration-700 ease-out"
            style={{
              backgroundColor: bar.color,
              height: inView ? `${bar.height}%` : "4%",
              transitionDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>
    </Panel>
  )
}
