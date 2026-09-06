import { motion } from "framer-motion"
import dottedWorld from "../../assets/dotted-world.svg?raw"
import { CHUANGHUA_PATHS } from "../../data/chuanghua"
import { MAP_VIEWBOX, anchors, arcs, cities } from "../../data/experience"
import ExperienceMarker from "./ExperienceMarker"

// A quadratic curve from `from` to `to`, pushed `bow` units off the chord along
// its normal — positive bows north. Same trick the reference site draws its
// hand-made flight paths with, just solved from the two endpoints instead.
function arcPath(from, to, bow) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy) || 1
  const cx = (from.x + to.x) / 2 + (-dy / len) * bow
  const cy = (from.y + to.y) / 2 + (dx / len) * bow
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

// Framer's "SVG Path Shimmer": a dim base stroke with a bright dash chasing
// along it. `pathLength={100}` normalises the path so one dash spec fits every
// arc; the offset sweeps 260 → 80 so the dash enters at one end and leaves at
// the other, then waits `loopDelay` before running again.
const SHIMMER_LENGTH = 80
const DASH_ARRAY = `${SHIMMER_LENGTH} 100`
const OFFSET_FROM = 100 + SHIMMER_LENGTH * 2
const OFFSET_TO = SHIMMER_LENGTH

function ShimmerArc({ d, color, loopDelay }) {
  return (
    <>
      <path d={d} className="exp-arc-base" fill="none" strokeLinecap="round" strokeWidth={0.16} />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={0.16}
        pathLength={100}
        strokeDasharray={DASH_ARRAY}
        initial={{ strokeDashoffset: OFFSET_FROM, opacity: 0 }}
        animate={{ strokeDashoffset: [OFFSET_FROM, OFFSET_TO], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 2,
          ease: [0.95, 0.04, 0.44, 1],
          times: [0, 0.01, 0.99, 1],
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: loopDelay,
        }}
      />
    </>
  )
}

// The dotted world map plus everything floating on top of it. The map SVG keeps
// its own aspect ratio so every marker's percentage lands on the grid cell it
// was measured against.
export default function ExperienceMap() {
  return (
    <div
      className="exp-map relative w-full"
      style={{ aspectRatio: `${MAP_VIEWBOX.width} / ${MAP_VIEWBOX.height}` }}
    >
      <div
        className="exp-dots pointer-events-none absolute inset-0"
        dangerouslySetInnerHTML={{ __html: dottedWorld }}
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        aria-hidden="true"
      >
        {arcs.map((arc) => (
          <ShimmerArc
            key={arc.id}
            d={arcPath(anchors[arc.from], anchors[arc.to], arc.bow)}
            color={arc.color}
            loopDelay={arc.loopDelay}
          />
        ))}

        {cities.map((city) => (
          <path
            key={city.id}
            d={CHUANGHUA_PATHS[city.shape]}
            fill={city.color}
            fillRule="evenodd"
            clipRule="evenodd"
            /* The 窗花 paths are drawn in a 100 x 100 box — scale one down to
               `shapeSize` viewBox units and hang it off its own centre. */
            transform={`translate(${city.dot.x} ${city.dot.y}) scale(${city.shapeSize / 100}) translate(-50 -50)`}
          />
        ))}
      </svg>

      {cities.map((city, i) => (
        <ExperienceMarker key={city.id} city={city} appearDelay={0.5 + i * 0.06} />
      ))}
    </div>
  )
}
