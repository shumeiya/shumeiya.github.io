import { useState } from "react"
import { motion } from "framer-motion"
import Panel, { PANEL_HEIGHT } from "./Panel"
import { galleryProjects } from "../../data/profile"

const layout = [
  { left: 4, top: 10, rotate: -8, width: 30, z: 3 },
  { left: 39, top: 3, rotate: 5, width: 19, z: 2, hideOnMobile: true },
  { left: 68, top: 9, rotate: -4, width: 27, z: 3 },
  { left: 2, top: 58, rotate: 6, width: 24, z: 2 },
  { left: 30, top: 70, rotate: -6, width: 19, z: 1, hideOnMobile: true },
  { left: 54, top: 62, rotate: 8, width: 25, z: 2 },
  { left: 80, top: 64, rotate: -10, width: 18, z: 1, hideOnMobile: true },
]

const ANSWER = "A designer who ships pixels with intent."

export default function GalleryPanel() {
  const [revealed, setRevealed] = useState(false)

  return (
    <Panel className={`${PANEL_HEIGHT} p-0`}>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="0" x2="50%" y2="50%" stroke="var(--color-line)" />
        <line x1="100%" y1="0" x2="50%" y2="50%" stroke="var(--color-line)" />
        <line x1="0" y1="100%" x2="50%" y2="50%" stroke="var(--color-line)" />
        <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="var(--color-line)" />
      </svg>

      <div className="relative h-full w-full">
        {galleryProjects.map((project, i) => {
          const pos = layout[i % layout.length]
          return (
            <motion.figure
              key={project.name}
              className={`group absolute overflow-hidden rounded-lg shadow-2xl ${
                pos.hideOnMobile ? "hidden sm:block" : ""
              }`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                width: `${pos.width}%`,
                zIndex: pos.z,
                rotate: `${pos.rotate}deg`,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            >
              <img
                src={project.image}
                alt={project.name}
                className="aspect-4/3 w-full object-cover brightness-75 transition-all duration-300 group-hover:brightness-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/90 to-transparent p-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] font-medium text-cream">{project.name}</p>
              </figcaption>
              <span
                className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </motion.figure>
          )
        })}

        <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
          <button
            onClick={() => setRevealed((v) => !v)}
            className="rounded-full bg-cream px-5 py-2 text-xs font-medium text-ink shadow-lg transition-transform hover:scale-105 sm:text-sm"
          >
            Who are you?
          </button>
          <motion.span
            initial={false}
            animate={{ opacity: revealed ? 1 : 0.9, filter: revealed ? "blur(0px)" : "blur(6px)" }}
            transition={{ duration: 0.4 }}
            className="max-w-55 cursor-pointer rounded-full bg-ink-2/80 px-4 py-1.5 text-center font-mono-tight text-[10px] text-cream backdrop-blur"
            onClick={() => setRevealed((v) => !v)}
          >
            {ANSWER}
          </motion.span>
        </div>
      </div>
    </Panel>
  )
}
