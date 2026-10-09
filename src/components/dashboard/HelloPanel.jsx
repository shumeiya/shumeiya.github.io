import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
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

      {/* The sticker pile covers the whole panel and claims pointerdown, so this link sits
          above it — but only as wide as the word itself, leaving the rest of the panel
          free to grab and fling stickers. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-fit"
      >
        <Link
          to="/about"
          aria-label="About Shumei Zhang"
          className="group inline-flex items-start gap-1 transition-transform duration-200 active:scale-[0.97] sm:gap-2"
        >
          <span className="block">
            <h2 className="font-serif text-3xl leading-[0.95] text-cream/90 transition-colors duration-300 group-hover:text-cream sm:text-6xl">
              Hello
            </h2>
            {/* Underline sweeps out from the left on hover. */}
            <span
              aria-hidden="true"
              className="mt-1 block h-px origin-left scale-x-0 bg-ink/40 transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 shrink-0 -translate-x-1 text-fog opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-cream group-hover:opacity-100 sm:size-8"
          />
        </Link>
      </motion.div>

      <StickerPile className="absolute inset-0 z-10" />
    </Panel>
  )
}
