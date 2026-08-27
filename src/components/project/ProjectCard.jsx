import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const MotionLink = motion.create(Link)

// Bento cell size — every card fills a fixed grid region (col x row span).
const SPAN = {
  lg: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  sm: "col-span-1 row-span-1",
}

export default function ProjectCard({ project, index }) {
  const span = SPAN[project.size] ?? SPAN.sm

  return (
    <MotionLink
      to={project.href}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className={`group relative block overflow-hidden rounded-xl bg-box ${span}`}
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />

      {/* Label overlay — keeps the grid perfectly tiled while staying readable. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-3 pt-10">
        <h3 className="truncate text-base font-medium text-white">{project.name}</h3>
        {project.category && (
          <span className="shrink-0 text-sm text-white/60">{project.category}</span>
        )}
      </div>
    </MotionLink>
  )
}
