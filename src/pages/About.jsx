import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { intro, education, experience, skills, scatter, opener } from "../data/about"

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
    <main className="mx-auto w-full max-w-5xl px-5 pb-32 pt-6 sm:px-6 lg:px-8">
      {/* Hero — stickers strewn around a single centred statement, the way the
          reference page opens: mostly air, with the eye pulled to one line. */}
      <header className="relative isolate grid min-h-[78vh] place-items-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          {/* Two elements on purpose: motion writes the element's transform to run
              its own animation, so the placement and the tilt have to live on a
              wrapper or they get overwritten the moment the fade starts. */}
          {scatter.map((s, i) => (
            <span
              key={s.src}
              className={`absolute ${s.sm ? "hidden sm:block" : "block"}`}
              style={{
                left: s.left,
                top: s.top,
                width: s.w,
                maxWidth: "22vw",
                transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
              }}
            >
              <motion.img
                src={s.src}
                alt=""
                loading="lazy"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="block w-full"
              />
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <p className="font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
            {intro.role}
          </p>
          <h1 className="mt-5 font-condensed text-[15vw] uppercase leading-[0.84] tracking-[-0.02em] text-cream sm:text-[8rem]">
            {intro.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>
          <p className="mt-7 font-mono-tight text-xs tracking-[0.14em] text-fog sm:text-sm">
            {opener}
          </p>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
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
        </motion.div>
      </header>

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

      {/* Work Experience — the reference page's ledger format: each post gets a
          running W/00n mark, and its particulars are numbered off it. Reversed to
          newest-first, which is the order that reading actually wants. */}
      <section className="mt-28">
        <p className="font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
          My Experience
        </p>
        <h2 className="mt-4 font-condensed text-5xl uppercase leading-[0.9] tracking-tight text-cream sm:text-7xl">
          Work Experience
        </h2>

        <ol className="mt-14">
          {[...experience].reverse().map((x, i) => (
            <motion.li
              key={`${x.company}-${x.period}`}
              {...rise}
              transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.04 }}
              className="group border-t border-line py-9"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <h3 className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium leading-tight text-cream sm:text-xl">
                    <LogoDot src={x.logo} alt={x.company} />
                    <span>{x.company}</span>
                    <span aria-hidden="true" className="text-line">|</span>
                    <span>{x.role}</span>
                    {x.team && (
                      <>
                        <span aria-hidden="true" className="text-line">|</span>
                        <span className="text-fog">{x.team}</span>
                      </>
                    )}
                  </h3>
                  <p className="mt-3 flex flex-wrap items-center gap-x-2.5 font-mono-tight text-xs tabular-nums text-fog">
                    {x.current && (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-ac-green" />
                    )}
                    <span>{x.place}</span>
                    <span aria-hidden="true" className="text-line">|</span>
                    <span>{x.period}</span>
                  </p>
                </div>

                <span className="shrink-0 font-mono-tight text-xs tabular-nums tracking-[0.14em] text-fog transition-colors duration-300 group-hover:text-ink">
                  W/{String(i + 1).padStart(3, "0")}
                </span>
              </div>

              {x.tags && (
                <div className="mt-7 sm:grid sm:grid-cols-[150px_1fr] sm:gap-x-10">
                  <p className="font-mono-tight text-xs text-fog">Details:</p>
                  <ul className="mt-4 space-y-3 sm:mt-0">
                    {x.tags.map((t, j) => (
                      <li key={t} className="flex gap-4 text-sm text-ink">
                        <span className="shrink-0 font-mono-tight text-xs tabular-nums text-fog">
                          [ {i + 1}.{j + 1}
                        </span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.li>
          ))}
        </ol>
        <p className="border-t border-line pt-7 font-mono-tight text-[11px] uppercase tracking-[0.22em] text-fog">
          To be continued
        </p>
      </section>

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
