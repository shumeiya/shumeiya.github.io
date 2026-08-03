import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { BarChart3 } from "lucide-react"
import Panel, { PanelHeader, TOP_ROW_HEIGHT } from "./Panel"
import { radarSkills } from "../../data/profile"

const CX = 100
const CY = 100
const R = 68
const RINGS = [0.25, 0.5, 0.75, 1]
const LABEL_R = 1.24
const ANGLE_STEP = (Math.PI * 2) / radarSkills.length

function pointAt(index, fraction) {
  const angle = -Math.PI / 2 + index * ANGLE_STEP
  return {
    x: CX + R * fraction * Math.cos(angle),
    y: CY + R * fraction * Math.sin(angle),
  }
}

function polygonPoints(fraction) {
  return radarSkills.map((_, i) => Object.values(pointAt(i, fraction)).join(",")).join(" ")
}

const dataPolygon = radarSkills
  .map((skill, i) => Object.values(pointAt(i, skill.score / 100)).join(","))
  .join(" ")

export default function SkillToolPanel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <Panel ref={ref} className={`flex ${TOP_ROW_HEIGHT} flex-col p-5 sm:p-6`}>
      <PanelHeader icon={BarChart3} label="DESIGN SKILL MATRIX" />

      <div className="flex flex-1 items-center justify-center">
        <div className="relative aspect-square w-full max-w-[220px]">
          <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-lime)" />
                <stop offset="55%" stopColor="var(--color-mint)" />
                <stop offset="100%" stopColor="var(--color-violet)" />
              </linearGradient>
            </defs>

            {RINGS.map((fraction) => (
              <polygon
                key={fraction}
                points={polygonPoints(fraction)}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="0.5"
              />
            ))}

            {radarSkills.map((skill, i) => {
              const p = pointAt(i, 1)
              return (
                <line
                  key={skill.label}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--color-line)"
                  strokeWidth="0.5"
                />
              )
            })}

            <motion.polygon
              points={dataPolygon}
              fill="url(#radarGradient)"
              fillOpacity="0.25"
              stroke="url(#radarGradient)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ transformOrigin: `${CX}px ${CY}px` }}
            />

            {radarSkills.map((skill, i) => {
              const p = pointAt(i, skill.score / 100)
              return (
                <motion.circle
                  key={skill.label}
                  cx={p.x}
                  cy={p.y}
                  r="2.5"
                  fill="var(--color-cream)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                />
              )
            })}
          </svg>

          <div className="pointer-events-none absolute inset-0">
            {radarSkills.map((skill, i) => {
              const p = pointAt(i, LABEL_R)
              const xPct = (p.x / 200) * 100
              const yPct = (p.y / 200) * 100
              const alignClass =
                Math.abs(p.x - CX) < 4
                  ? "left-1/2 -translate-x-1/2 text-center"
                  : p.x > CX
                    ? "left-full text-left"
                    : "right-full text-right"
              return (
                <motion.div
                  key={skill.label}
                  className={`absolute w-[62px] -translate-y-1/2 text-[8px] leading-tight text-fog sm:text-[9px] ${alignClass}`}
                  style={{
                    top: `${yPct}%`,
                    ...(alignClass.includes("text-center")
                      ? {}
                      : p.x > CX
                        ? { left: `${xPct}%` }
                        : { right: `${100 - xPct}%` }),
                  }}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <span className="block font-medium text-cream">{skill.label}</span>
                  <span className="font-mono-tight text-fog">{skill.score}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Panel>
  )
}
