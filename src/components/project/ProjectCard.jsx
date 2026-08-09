import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function ProjectCard({ project, index, className = "" }) {
  return (
    <motion.a
      href={project.href}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
      className={`group relative block overflow-hidden rounded-2xl bg-paper-ink ${className}`}
    >
      <img
        src={project.image}
        alt={project.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <span
        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-paper-ink"
        style={{ backgroundColor: project.color }}
      >
        {project.category}
      </span>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper-ink via-paper-ink/80 to-transparent p-4">
        <h3 className="text-base font-medium text-paper sm:text-lg">{project.name}</h3>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-1.5 text-sm text-paper/60">{project.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-paper/80">
              View Project
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
