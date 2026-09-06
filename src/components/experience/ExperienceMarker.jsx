import { useId, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Briefcase, Globe, GraduationCap, MapPin } from "lucide-react"
import { toPercent } from "../../data/experience"

const ICONS = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  briefcase: Briefcase,
}

// Pill ⇄ card morph, and the staggered entrance of each line inside the card.
const BOX_T = { type: "tween", duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }
const LINE_T = (delay) => ({ type: "tween", duration: 0.6, ease: [0.44, 0, 0.56, 1], delay })
const LINE_HIDDEN = { opacity: 0.001, scale: 0.8 }
const LINE_SHOWN = { opacity: 1, scale: 1 }

// A marker floating over the dotted map. Collapsed it is a glassy pill holding the
// city's coordinates; hovered, focused or tapped it grows into a 176px card whose
// name glitches in and whose lines fade up one after the other.
export default function ExperienceMarker({ city, appearDelay = 0.5 }) {
  const [open, setOpen] = useState(false)
  const labelId = useId()
  const Icon = ICONS[city.icon] ?? Globe

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ ...toPercent(city.label), zIndex: city.z }}
    >
      <motion.div
        initial={{ opacity: 0.001, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: appearDelay }}
      >
        <motion.div
          layout
          transition={BOX_T}
          role="button"
          tabIndex={0}
          aria-expanded={open}
          aria-labelledby={labelId}
          onHoverStart={() => setOpen(true)}
          onHoverEnd={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              setOpen((v) => !v)
            }
          }}
          className={`exp-card flex cursor-pointer select-none overflow-hidden rounded-[6px] ${
            open
              ? "w-[150px] flex-col items-start justify-start gap-[4px] p-[8px]"
              : "w-max flex-row items-center justify-center gap-[1px] px-[4px] py-[3px]"
          }`}
        >
          {open ? (
            <>
              <motion.div
                layout="position"
                className="order-0 flex w-full items-center justify-start gap-[3px]"
              >
                <Icon size={9} strokeWidth={1.6} className="exp-ink shrink-0" />
                <span className="exp-ink whitespace-pre text-[9px] leading-[1.1]">
                  {city.name}
                </span>
              </motion.div>

              {city.blocks.map((lines, i) => (
                <motion.div
                  key={i}
                  initial={LINE_HIDDEN}
                  animate={LINE_SHOWN}
                  transition={LINE_T(0.2 + i * 0.2)}
                  className="w-full origin-left"
                >
                  {lines.map((line) => (
                    <p key={line} className="exp-line text-[9px] leading-[11px]">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </>
          ) : (
            <motion.div layout="position" className="flex items-center justify-center gap-[3px]">
              {city.current ? null : (
                <Globe size={9} strokeWidth={1.6} className="exp-line shrink-0" />
              )}
              <span
                id={labelId}
                className={`whitespace-pre text-center text-[8px] leading-[12px] ${
                  city.current ? "exp-ink" : "exp-line"
                }`}
              >
                {city.coords}
              </span>
              {city.current ? (
                <MapPin size={9} strokeWidth={1.6} className="exp-ink shrink-0" />
              ) : null}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
