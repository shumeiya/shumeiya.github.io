import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { intro, education, experience, skills } from "../data/about"

const rise = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
}

// Sections announce themselves in small caps against a hairline, so the page is
// structured by typography and space rather than by boxes.
function Section({ label, children, className = "" }) {
  return (
    <section className={`mt-24 ${className}`}>
      <h2 className="flex items-center gap-5 font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
        <span className="shrink-0">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

// Logos are transparent PNGs drawn for a white page — Granstudio's is flat black and
// would vanish on the dark theme. A small paper-coloured disc keeps every mark legible
// in both themes while staying quiet enough not to compete with the type.
function LogoDot({ src, alt }) {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-paper">
      <img src={src} alt={alt} loading="lazy" className="block size-6 object-contain" />
    </span>
  )
}

// One row of the CV: period on the left, everything else on the right.
function Row({ period, current, children }) {
  return (
    <li className="group grid gap-x-10 gap-y-3 border-t border-line py-7 sm:grid-cols-[150px_1fr]">
      <p className="flex items-center gap-2 font-mono-tight text-xs tabular-nums text-fog transition-colors duration-300 group-hover:text-ink">
        {current && (
          <span aria-hidden="true" className="size-1.5 rounded-full bg-ac-green" />
        )}
        {period}
      </p>
      <div className="min-w-0">{children}</div>
    </li>
  )
}

// Meta reads as one typographic line — slashes instead of pills, which keeps the
// row calm and lets the eye run straight across it.
function Meta({ items }) {
  return (
    <p className="mt-3 text-xs leading-relaxed text-fog">
      {items.map((t, i) => (
        <span key={t}>
          {i > 0 && <span className="mx-2 text-line">/</span>}
          {t}
        </span>
      ))}
    </p>
  )
}

export default function About() {
  return (
    <main className="mx-auto w-full max-w-3xl px-5 pb-32 pt-10 sm:px-6 sm:pt-16 lg:px-8">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
          {intro.role}
        </p>
        <h1 className="mt-5 font-condensed text-[17vw] uppercase leading-[0.84] tracking-[-0.02em] text-cream sm:text-[7.5rem]">
          {intro.name.split(" ").map((word) => (
            <span key={word} className="block">
              {word}
            </span>
          ))}
        </h1>

        <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          {intro.resumes.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                download
                className="group inline-flex items-center gap-2 text-sm text-ink transition-colors hover:text-cream"
              >
                <ArrowDown
                  size={14}
                  className="text-fog transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-cream"
                />
                <span className="relative">
                  {r.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-ink/40 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </motion.header>

      {/* Self-introduction video */}
      <motion.section {...rise} transition={{ duration: 0.6 }} className="mt-16">
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-line bg-box">
          <iframe
            src={intro.video}
            title={`${intro.name} — self introduction`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </motion.section>

      {/* Education */}
      <Section label="Education">
        <ul>
          {education.map((e, i) => (
            <motion.div key={e.school} {...rise} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <Row period={e.period}>
                <div className="flex gap-4">
                  <LogoDot src={e.logo} alt={e.school} />
                  <div className="min-w-0 pt-1">
                    <h3 className="text-lg font-medium leading-tight text-cream">
                      {e.degree}
                      <span className="ml-2.5 align-middle font-mono-tight text-[10px] uppercase tracking-[0.14em] text-fog">
                        {e.level}
                      </span>
                    </h3>
                    <p className="mt-2 text-sm text-ink">{e.school}</p>
                  </div>
                </div>
              </Row>
            </motion.div>
          ))}
        </ul>
      </Section>

      {/* Experience */}
      <Section label="Experience">
        <ol>
          {experience.map((x, i) => (
            <motion.div
              key={`${x.company}-${x.period}`}
              {...rise}
              transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
            >
              <Row period={x.period} current={x.current}>
                <div className="flex gap-4">
                  <LogoDot src={x.logo} alt={x.company} />
                  <div className="min-w-0 pt-1">
                    <h3 className="text-lg font-medium leading-tight text-cream">{x.role}</h3>
                    <p className="mt-2 text-sm text-ink">
                      {x.company}
                      {x.team && <span className="text-fog"> · {x.team}</span>}
                    </p>
                    <p className="mt-1 text-sm text-fog">{x.place}</p>
                    {x.tags && <Meta items={x.tags} />}
                  </div>
                </div>
              </Row>
            </motion.div>
          ))}
        </ol>
        <p className="border-t border-line pt-7 font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
          To be continued
        </p>
      </Section>

      {/* Skills */}
      <Section label="Skill">
        <ul className="grid grid-cols-3 gap-x-6 gap-y-9 sm:grid-cols-5">
          {skills.map((s, i) => (
            <motion.li
              key={s.name}
              {...rise}
              transition={{ duration: 0.45, delay: (i % 5) * 0.04 }}
              className="flex flex-col items-center gap-3"
            >
              <LogoDot src={s.icon} alt={s.name} />
              <span className="text-center text-xs text-fog">{s.name}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <motion.div {...rise} transition={{ duration: 0.5 }} className="mt-24 border-t border-line">
        <Link to="/project" className="group flex items-center justify-between gap-6 py-8">
          <div>
            <p className="font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
              Next
            </p>
            <p className="mt-2 text-2xl font-medium text-cream sm:text-3xl">
              Go to see my project
            </p>
          </div>
          <ArrowUpRight
            size={26}
            className="shrink-0 text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream"
          />
        </Link>
      </motion.div>
    </main>
  )
}
