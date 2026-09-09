import { motion } from "framer-motion"
import Panel, { TOP_ROW_HEIGHT } from "./Panel"
import StickerPile from "./StickerPile"

export default function HelloPanel() {
  return (
    <Panel className={`flex ${TOP_ROW_HEIGHT} flex-col justify-between p-2 sm:p-3`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--color-ink) 18%, transparent) 1px, transparent 1px)",
          backgroundSize: "13px 13px",
          maskImage:
            "radial-gradient(ellipse at 100% 40%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 100% 40%, black, transparent 70%)",
        }}
      />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative font-serif text-3xl leading-[0.95] text-cream/90 sm:text-6xl"
      >
        Hello
      </motion.h2>


      <StickerPile className="absolute inset-0 z-10" />
    </Panel>
  )
}
