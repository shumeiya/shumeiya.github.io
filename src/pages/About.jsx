import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowUpRight, Download } from "lucide-react"
import { intro, education, experience, skills } from "../data/about"

const rise = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
}

function SectionHeading({ children }) {
  return (
    <h2 className="font-mono-tight text-xs uppercase tracking-[0.18em] text-fog">{children}</h2>
  )
}

// Logos arrive as transparent PNGs drawn for a white page — Granstudio's is flat black,
// so on the dark theme it would vanish. A fixed paper-coloured tile keeps every mark
// legible in both themes without inverting the colourful ones.
function LogoTile({ src, alt, className = "" }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-paper p-2.5 ${className}`}
    >
      <img src={src} alt={alt} loading="lazy" className="block h-full w-full object-contain" />
    </div>
  )
}

function Tag({ children }) {
  return (
    <li className="rounded-full border border-line px-3 py-1 font-mono-tight text-[11px] uppercase tracking-wide text-fog">
      {children}
    </li>
  )
}

export default function About() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono-tight text-xs uppercase tracking-[0.18em] text-fog">
          {intro.role}
        </p>
        <h1 className="mt-3 font-condensed text-5xl uppercase leading-[0.9] tracking-tight text-cream sm:text-7xl">
          {intro.name}
        </h1>

        <ul className="mt-7 flex flex-wrap gap-3">
          {intro.resumes.map((r) => (
            <li key={r.href}>
              <a
                href={r.href}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-ink/40 hover:text-cream"
              >
                <Download size={15} className="text-fog transition-colors group-hover:text-cream" />
                {r.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.header>

      {/* Self-introduction video */}
      <motion.section {...rise} transition={{ duration: 0.5 }} className="mb-20">
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-box">
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
      <section className="mb-20">
        <SectionHeading>Education</SectionHeading>
        <ul className="mt-6 space-y-4">
          {education.map((e, i) => (
            <motion.li
              key={e.school}
              {...rise}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex items-center gap-4 rounded-2xl bg-box p-4 sm:gap-5 sm:p-5"
            >
              <LogoTile src={e.logo} alt={e.school} className="size-14 sm:size-16" />
              <div className="min-w-0">
                <h3 className="text-base font-medium text-cream sm:text-lg">
                  {e.degree}
                  <span className="ml-2 font-mono-tight text-[11px] uppercase tracking-wide text-fog">
                    {e.level}
                  </span>
                </h3>
                <p className="mt-1 text-sm text-fog">{e.school}</p>
                <p className="mt-0.5 font-mono-tight text-xs text-fog">{e.period}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-20">
        <SectionHeading>Experience</SectionHeading>
        <ol className="mt-6 space-y-4">
          {experience.map((x, i) => (
            <motion.li
              key={`${x.company}-${x.period}`}
              {...rise}
              transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.05 }}
              className="rounded-2xl bg-box p-4 sm:p-5"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <LogoTile src={x.logo} alt={x.company} className="size-14 sm:size-16" />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-medium text-cream sm:text-lg">
                      {x.role}
                      {x.team && <span className="text-fog"> · {x.team}</span>}
                    </h3>
                    <p className="flex items-center gap-2 font-mono-tight text-xs text-fog">
                      {x.current && (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-ac-green"
                        />
                      )}
                      {x.period}
                    </p>
                  </div>

                  <p className="mt-1 text-sm text-ink">
                    {x.company}
                    <span className="text-fog"> — {x.place}</span>
                  </p>

                  {x.tags && (
                    <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
                      {x.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
        <p className="mt-5 text-center font-mono-tight text-xs uppercase tracking-[0.18em] text-fog">
          To be continued
        </p>
      </section>

      {/* Skills */}
      <section className="mb-20">
        <SectionHeading>Skill</SectionHeading>
        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
          {skills.map((s, i) => (
            <motion.li
              key={s.name}
              {...rise}
              transition={{ duration: 0.4, delay: (i % 5) * 0.04 }}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-box px-2 py-5"
            >
              <LogoTile src={s.icon} alt={s.name} className="size-12" />
              <span className="text-center text-xs text-fog">{s.name}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <motion.div {...rise} transition={{ duration: 0.5 }} className="border-t border-line pt-8">
        <Link to="/project" className="group flex items-center justify-between gap-4">
          <div>
            <p className="font-mono-tight text-xs uppercase tracking-wide text-fog">Next</p>
            <p className="mt-1 text-lg font-medium text-cream">Go to see my project</p>
          </div>
          <ArrowUpRight
            size={20}
            className="shrink-0 text-fog transition-colors group-hover:text-cream"
          />
        </Link>
      </motion.div>
    </main>
  )
}
