import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Clock3 } from "lucide-react"
import Panel, { PanelHeader, PANEL_HEIGHT } from "./Panel"
import { useCountUp } from "../../hooks/useCountUp"
import { timeline } from "../../data/profile"

const CX = 100
const CY = 96
const R = 78
const FRACTION = Math.min(0.94, Math.max(0.12, timeline.hours / 6000))

function pointOnArc(fraction) {
  const angle = Math.PI * (1 - fraction)
  return {
    x: CX + R * Math.cos(angle),
    y: CY - R * Math.sin(angle),
  }
}

const arcPath = `M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`
const pointer = pointOnArc(FRACTION)

export default function TimeGauge() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const hours = useCountUp(timeline.hours, { start: inView, duration: 1.6 })

  return (
    <Panel ref={ref} className={`flex ${PANEL_HEIGHT} flex-col p-5 sm:p-6`}>
      <PanelHeader icon={Clock3} label="DESIGN TIME SPENT" />

      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="font-mono-tight text-3xl font-medium tabular-nums text-cream sm:text-4xl">
          {hours.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-fog">Hours</p>

        <svg viewBox="0 0 200 112" className="mt-2 w-full max-w-[210px]">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-pink)" />
              <stop offset="55%" stopColor="var(--color-violet)" />
              <stop offset="100%" stopColor="var(--color-mint)" />
            </linearGradient>
          </defs>

          <path d={arcPath} fill="none" stroke="var(--color-ink-2)" strokeWidth="6" strokeLinecap="round" />

          <motion.path
            d={arcPath}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: FRACTION } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          <circle cx={CX - R} cy={CY} r="3" fill="var(--color-ink-2)" />
          <circle cx={CX + R} cy={CY} r="3" fill="var(--color-ink-2)" />

          <motion.circle
            cx={pointer.x}
            cy={pointer.y}
            r="5"
            fill="var(--color-cream)"
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1 }}
          />
        </svg>
      </div>

      <div className="relative flex items-end justify-between text-xs">
        <div>
          <p className="font-medium text-cream">{timeline.start.city}</p>
          <p className="text-fog">{timeline.start.year}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-cream">{timeline.end.city}</p>
          <p className="text-fog">{timeline.end.year}</p>
        </div>
      </div>
    </Panel>
  )
}
