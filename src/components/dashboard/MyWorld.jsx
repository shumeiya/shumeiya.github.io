import { useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import DottedMapWithoutCountries from "dotted-map/without-countries"
import { Globe2 } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import worldmapData from "../../data/worldmap.json"
import { experience } from "../../data/project"

const MAP_W = 99
const MAP_H = 50

const pinColors = ["var(--color-ac-pink)", "var(--color-ac-orange)", "var(--color-ac-green)"]

function curvePath(a, b) {
  const mx = (a.x + b.x) / 2
  const my = Math.min(a.y, b.y) - 8
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`
}

export default function MyWorldPanel() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  const { dotsSvg, points } = useMemo(() => {
    const map = new DottedMapWithoutCountries({ map: worldmapData })
    const dots = map
      .getSVG({
        radius: 0.22,
        color: "var(--color-box-2)",
        shape: "circle",
        backgroundColor: "transparent",
      })
      .replace("<svg ", '<svg width="100%" height="100%" preserveAspectRatio="none" ')
    const pts = experience.map((loc, i) => ({
      ...loc,
      ...map.addPin({ lat: loc.lat, lng: loc.lng }),
      color: pinColors[i % pinColors.length],
    }))
    return { dotsSvg: dots, points: pts }
  }, [])

  const minY = Math.min(...points.map((p) => p.y))

  return (
    <Panel ref={ref} className={`flex ${BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader icon={Globe2} label="MY EXPERIENCE" />

      <div className="relative w-full flex-1">
        <div
          className="absolute inset-0"
          dangerouslySetInnerHTML={{ __html: dotsSvg }}
        />

        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {points.slice(1).map((point, i) => {
            const prev = points[i]
            return (
              <motion.path
                key={point.city}
                d={curvePath(prev, point)}
                fill="none"
                stroke="var(--color-fog)"
                strokeWidth="0.3"
                strokeDasharray="1.2 1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView ? { pathLength: 1, opacity: 0.6 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.3 }}
              />
            )
          })}

          {points.map((point, i) => (
            <motion.circle
              key={point.city}
              cx={point.x}
              cy={point.y}
              r="1.1"
              fill={point.color}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.3 }}
              style={{ transformOrigin: `${point.x}px ${point.y}px` }}
            />
          ))}
        </svg>

        {points.map((point, i) => {
          const alignRight = point.x / MAP_W > 0.6
          const below = point.y !== minY
          return (
            <motion.div
              key={point.city}
              className="absolute flex items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-box-2/90 px-2 py-1 text-[9px] text-cream backdrop-blur sm:text-[10px]"
              style={{
                left: `${(point.x / MAP_W) * 100}%`,
                top: `${(point.y / MAP_H) * 100}%`,
                transform: `translate(${alignRight ? "-100%" : "0%"}, ${below ? "60%" : "-160%"})`,
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.3 }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: point.color }} />
              {point.coords}
            </motion.div>
          )
        })}
      </div>
    </Panel>
  )
}
