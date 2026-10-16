import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import Panel, { TOP_ROW_HEIGHT } from "./Panel"
import StickerPile from "./StickerPile"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

export default function HelloPanel() {
  const t = useT()

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
          aria-label={t(ui.helloAria)}
          className="group inline-flex items-start gap-1.5 transition-transform duration-200 active:scale-[0.97] sm:gap-3"
        >
          {/* The underline is positioned, not in flow, so sweeping it in on hover never
              changes this span's height or nudges the arrow beside it. */}
          <span className="relative block">
            <h2 className="font-serif text-3xl leading-[0.95] text-cream/90 transition-colors duration-300 group-hover:text-cream sm:text-6xl">
              {t(ui.hello)}
            </h2>
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-ink/40 transition-transform duration-300 group-hover:scale-x-100"
            />
          </span>
          {/* lucide insets this glyph ~29% inside its 24x24 box, so the SVG's top edge
              sits above the visible arrow by more than the font's own ascender gap —
              measured at 14px of padding against 10.5px of gap. The negative margin
              closes that 3.5px difference so the arrow starts level with Hello's cap. */}
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.75}
            className="-mt-[3px] size-7 shrink-0 -translate-x-1 text-fog opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-cream group-hover:opacity-100 sm:-mt-1 sm:size-12"
          />
        </Link>
      </motion.div>

      <StickerPile className="absolute inset-0 z-10" />
    </Panel>
  )
}
