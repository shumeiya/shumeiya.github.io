import { useState } from "react"
import { motion } from "framer-motion"
import Panel, { BOTTOM_ROW_HEIGHT } from "./Panel"
import { galleryProjects } from "../../data/project"

// Free-form diamond composition — bottom-left to top-right diagonal, center = largest anchor.
// left/top are the diamond's center point (%). size is the pre-rotation side length, as a
// % of the panel's HEIGHT (the constrained dimension in this wide, short panel) so diamonds
// stay proportionate instead of ballooning to the panel's full height.
const layout = [
  { left: 12, top: 68, size: 30, z: 10, text: "below-left" },
  { left: 27, top: 42, size: 34, z: 20, text: "left" },
  { left: 46, top: 52, size: 44, z: 10, text: "above", anchor: true },
  { left: 40, top: 85, size: 15, z: 30, text: "below", hideOnMobile: true },
  { left: 64, top: 27, size: 32, z: 20, text: "above-right" },
  { left: 80, top: 52, size: 26, z: 20, text: "right" },
  { left: 93, top: 15, size: 14, z: 30, text: "below-right", hideOnMobile: true },
]

const ANSWER = "A designer who ships pixels with intent."

export default function ProjectGallery() {
  const [hovered, setHovered] = useState(null)

  return (
    <Panel className={`${BOTTOM_ROW_HEIGHT} p-0`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rotate-45 rounded-[3rem] border border-ink/5"
          style={{ left: "-16%", top: "-38%", width: "50%", aspectRatio: "1 / 1" }}
        />
        <div
          className="absolute rotate-45 rounded-[3rem] border border-ink/5"
          style={{ right: "-14%", top: "4%", width: "42%", aspectRatio: "1 / 1" }}
        />
        <div
          className="absolute rotate-45 rounded-[3rem] border border-ink/5"
          style={{ left: "34%", bottom: "-34%", width: "34%", aspectRatio: "1 / 1" }}
        />
      </div>

      <div className="relative h-full w-full">
        {galleryProjects.map((project, i) => {
          const pos = layout[i % layout.length]
          const isHovered = hovered === i
          const isDimmed = hovered !== null && !isHovered

          return (
            <motion.div
              key={project.name}
              className={`absolute ${pos.hideOnMobile ? "hidden sm:block" : ""}`}
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
                height: `${pos.size}%`,
                aspectRatio: "1 / 1",
                zIndex: isHovered ? 50 : pos.z,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div
                className={`h-full w-full transition-all duration-300 ${isDimmed ? "opacity-70" : "opacity-100"}`}
                style={{ transform: isHovered ? "translateY(-6px) scale(1.05)" : "translateY(0) scale(1)" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={`h-full w-full origin-center rotate-45 overflow-hidden rounded-xl border transition-all duration-300 ${
                    isHovered
                      ? "border-paper/50 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.6)]"
                      : "border-paper/10 shadow-lg"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover"
                    style={{ transform: "rotate(-45deg) scale(1.5)" }}
                  />
                </div>
                <span
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.color, left: "50%", top: "6%" }}
                />
              </div>

              <ProjectLabel project={project} pos={pos} isHovered={isHovered} isDimmed={isDimmed} />
            </motion.div>
          )
        })}

      </div>
    </Panel>
  )
}

const TEXT_POSITION = {
  "below-left": { style: { left: "3%", top: "92%" }, transform: "translate(0, 0)", align: "text-left" },
  left: { style: { left: "2%", top: "42%" }, transform: "translateY(-50%)", align: "text-left" },
  above: { style: { left: "46%", top: "8%" }, transform: "translate(-50%, 0)", align: "text-center" },
  below: { style: { left: "40%", top: "98%" }, transform: "translate(-50%, 0)", align: "text-center" },
  "above-right": { style: { left: "62%", top: "2%" }, transform: "translate(0, 0)", align: "text-left" },
  right: { style: { right: "3%", top: "52%" }, transform: "translateY(-50%)", align: "text-right" },
  "below-right": { style: { left: "89%", top: "34%" }, transform: "translate(-50%, 0)", align: "text-center" },
}

function ProjectLabel({ project, pos, isHovered, isDimmed }) {
  const config = TEXT_POSITION[pos.text]

  return (
    <div
      className={`pointer-events-none absolute w-24 transition-opacity duration-300 ${config.align} ${
        isDimmed ? "opacity-70" : "opacity-100"
      }`}
      style={{ ...config.style, transform: config.transform }}
    >
      <p
        className={`font-medium leading-tight transition-colors duration-300 ${
          pos.anchor ? "text-base sm:text-lg" : "text-[11px] sm:text-xs"
        } ${isHovered ? "text-paper" : "text-paper/75"}`}
        style={{ textShadow: "0 1px 8px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)" }}
      >
        {project.name}
      </p>
      {pos.text !== "below" && (
        <p
          className={`mt-0.5 font-mono-tight text-[9px] transition-colors duration-300 ${
            isHovered ? "text-paper/80" : "text-paper/50"
          }`}
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.85), 0 1px 2px rgba(0,0,0,0.9)" }}
        >
          {project.tag}
        </p>
      )}
    </div>
  )
}
