import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import WorkStrip from "./WorkStrip"

// One project, one screenful. The write-up and the first panel share the same
// left edge (--work-indent), and the panels run taller than the fold so the
// strip is still unfolding as you scroll into the next project.

export default function WorkSection({ work }) {
  return (
    <section id={work.slug} className="relative pb-16 pt-14 sm:pt-16">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="work-indent pr-5 sm:pr-8"
      >
        <div className="mb-4 flex items-center gap-3">
          {work.isNew && (
            <span className="rounded-full border border-ink/40 px-3.5 py-1 font-mono-tight text-xs uppercase tracking-wide text-ink">
              New
            </span>
          )}
          <span className="font-mono-tight text-sm tracking-wide text-ink/70">{work.year}</span>
        </div>

        <h2 className="font-condensed mb-5 text-[clamp(3rem,6.5vw,8rem)] uppercase leading-[0.82] tracking-[-0.01em] text-ink">
          {work.name}
        </h2>

        <p className="mb-7 max-w-[58ch] text-lg leading-snug text-ink/85 sm:text-2xl">
          {work.lead}
        </p>

        <Link
          to={work.href}
          className="inline-flex items-center rounded-full border border-ink/30 px-8 py-4 text-base text-ink transition-colors hover:border-ink hover:bg-ink hover:text-page sm:text-lg"
        >
          View Case Study
        </Link>
      </motion.header>

      <div className="mt-10 sm:mt-12">
        <WorkStrip panels={work.panels} accent={work.color} indent="var(--work-indent)" />
      </div>
    </section>
  )
}
