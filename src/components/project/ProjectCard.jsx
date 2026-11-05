import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

/**
 * One cell of the archive grid: a 16:9 cover with the caption underneath it,
 * in the flow, so the text is never squeezed into a gap or laid over the image.
 * 16:9 because that is what most of the cover artwork already is, so it shows
 * whole; `project.cover` swaps in another image where the hero is the wrong
 * shape, and `project.coverPosition` moves the crop where the centre is not
 * the subject.
 *
 * It is a list item that animates its own layout, which is what lets the grid
 * close up smoothly when the filter takes cards away. The ref is forwarded
 * because AnimatePresence's popLayout mode measures the element it removes.
 */
const ProjectCard = forwardRef(function ProjectCard({ project }, ref) {
  return (
    <motion.li
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0"
    >
      <Link to={project.href} data-cursor-label="view" className="group block">
        <div className="aspect-video overflow-hidden rounded-2xl bg-box ring-1 ring-inset ring-ink/5">
          <img
            src={project.cover ?? project.image}
            alt=""
            loading="lazy"
            style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <h2 className="mt-4 truncate text-xl font-medium leading-tight text-ink lg:mt-5 lg:text-2xl">
          {project.name}
        </h2>
        {project.description && (
          <p className="mt-2 line-clamp-2 max-w-[60ch] text-pretty text-[15px] leading-normal text-fog lg:text-base">
            {project.description}
          </p>
        )}
      </Link>
    </motion.li>
  )
})

export default ProjectCard
