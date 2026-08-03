import { motion } from "framer-motion"
import Panel, { TOP_ROW_HEIGHT } from "./Panel"

export default function HelloPanel() {
  return (
    <Panel className={`flex ${TOP_ROW_HEIGHT} flex-col justify-between p-5 sm:p-6`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(242,240,234,0.18) 1px, transparent 1px)",
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
        className="relative font-serif text-5xl leading-[0.95] text-cream/90 sm:text-6xl"
      >
        Hello
        <br />
        Stranger
      </motion.h2>

      <p className="relative mt-8 max-w-xs font-mono-tight text-[11px] leading-relaxed text-fog sm:text-xs">
        let stranger = user.current();
        <br />
        <span className="text-lime">{"> "}</span>The terminal is open.
        <br />
        Type nothing. Just explore.
        <span className="animate-pulse">_</span>
      </p>
    </Panel>
  )
}
