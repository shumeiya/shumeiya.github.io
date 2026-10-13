import { motion } from "framer-motion"
import { Link } from "react-router-dom"

/**
 * Bento tile. A row unit is 0.85 of a column (see .bento-grid in index.css), so
 * these spans land at: a double-width cover, the same ratio at single width,
 * and a two-row single column that comes out near 9:16 — the phone shape used
 * for the mobile-first projects.
 *
 * `project.place` pins the tile on the desktop grid; below lg it is absent and
 * the grid places tiles itself.
 */
const SHAPE = {
  lg: "col-span-2 row-span-2",
  sm: "col-span-1 row-span-1",
  portrait: "col-span-1 row-span-2",
}

const MotionLink = motion.create(Link)

export default function ProjectCard({ project, index, dimmed = false }) {
  const span = SHAPE[project.shape] ?? SHAPE.sm

  return (
    <MotionLink
      to={project.href}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className={`group relative block ${span} ${project.place ?? ""}`}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-xl bg-box transition-all duration-500 ${
          dimmed ? "opacity-40 grayscale" : "opacity-100 grayscale-0"
        }`}
      >
        <img
          src={project.cover ?? project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      {/* Caption rides in the grid's row gap so it never crops the cover. */}
      <div
        className={`absolute inset-x-0 top-full flex items-baseline justify-between gap-3 pt-2 transition-opacity duration-500 ${
          dimmed ? "opacity-35" : "opacity-100"
        }`}
      >
        <h3 className="truncate text-sm font-medium text-ink sm:text-base">{project.name}</h3>
        {project.category && (
          <span className="shrink-0 font-mono-tight text-[11px] uppercase tracking-wide text-fog sm:text-xs">
            {project.category}
          </span>
        )}
      </div>
    </MotionLink>
  )
}
