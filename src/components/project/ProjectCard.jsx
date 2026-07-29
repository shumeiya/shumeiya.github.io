import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export default function ProjectCard({ project, index }) {
  return (
    <motion.a
      href={project.href}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-2xl bg-ink text-cream"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-medium text-ink"
          style={{ backgroundColor: project.color }}
        >
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium">{project.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-fog">{project.description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-cream/80 transition-colors group-hover:text-cream">
          View Project
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
