import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import NameScatter from "../components/about/NameScatter"
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

// Framer runs its appear animations as springs, and these are the two it uses:
// a quick one for small pieces, a long slow one for whole blocks. Reused rather
// than re-typed so the page keeps one cadence.
const SPRING = { type: "spring", bounce: 0.2, duration: 0.4 }
const SPRING_SLOW = { type: "spring", bounce: 0, duration: 1.2 }

// One strewn sticker. Three jobs stacked on one another, which is why there are
// two elements and a motion value rather than one tidy div: the wrapper owns the
// placement and the resting tilt, `progress` sinks and turns it as the curtain
// comes over, and motion owns the fade. Placement cannot live on the inner
// element because motion overwrites its transform to run the fade.
function Sticker({ s, i, progress }) {
  const y = useTransform(progress, [0, 1], [0, s.drift ?? 0])
  const rotate = useTransform(progress, [0, 1], [0, s.wobble ?? 0])
  return (
    <span
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
        style={{ y, rotate }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="block w-full"
      />
    </span>
  )
}

// A line of the ledger that carries a crest. The crest sits at a fixed spot in
// the row — between the title and the school — and flashes in on hover rather
// than trailing the pointer, so it lands in the same place every time.
function LedgerRow({ index, title, note, meta, logo, alt, delay = 0 }) {
  const [lit, setLit] = useState(false)
  return (
    <li
      onPointerEnter={() => setLit(true)}
      onPointerLeave={() => setLit(false)}
      className="group relative flex flex-col gap-5"
    >
      <Rule delay={delay} />
      <div className="flex flex-col gap-4 py-2 md:flex-row md:items-baseline md:gap-10">
        <span className="shrink-0 font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog md:w-[90px]">
          {index}
        </span>
        <h3 className="flex-1 text-[22px] leading-[1.1] tracking-[-0.02em] text-cream">
          <Words text={title} delay={delay + 0.04} />
          {note && (
            <span className="ml-2.5 align-middle font-mono-tight text-[10px] uppercase tracking-[0.14em] text-fog">
              {note}
            </span>
          )}
        </h3>
        <span className="shrink-0 text-sm leading-[1.2] text-fog md:w-[280px] md:text-right">
          {meta}
        </span>
      </div>

      {/* The crest. Decorative — the row already names the school. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <AnimatePresence>
          {lit && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.3 }}
              className="flex size-[120px] items-center justify-center overflow-hidden rounded-full bg-paper shadow-lg"
            >
              <img src={logo} alt={alt} className="size-[86px] object-contain" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </li>
  )
}

// Text arrives a word at a time, each one starting small and nearly transparent.
// The words are inline-block because a transform does nothing to an inline box,
// and the space between them is a real text node so the line still wraps and
// still reads as one sentence to a screen reader.
function Words({ text, className = "", delay = 0, as: Tag = "span" }) {
  const words = text.split(" ")
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <motion.span
            initial={{ opacity: 0.001, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ ...SPRING, delay: delay + i * 0.04 }}
            className="inline-block"
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  )
}

// The rule draws itself out from the left — scaled, not grown, with its origin
// pinned to the near corner the way the reference sets transform-origin.
function Rule({ delay = 0 }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ ...SPRING, delay }}
      style={{ transformOrigin: "0% 100%" }}
      className="h-px w-full bg-line"
    />
  )
}

export default function About() {
  const curtain = useRef(null)
  // How far the curtain has travelled over the opening, 0 to 1 across the first
  // screenful. Drives the jostle on the stickers below it.
  const { scrollY } = useScroll()
  const covered = useTransform(scrollY, [0, 700], [0, 1], { clamp: true })

  return (
    <>
      {/* No max-width, and the gutters are narrow: the reference runs full-bleed on
          30px of side padding, which is what gives its rows room to breathe.
          Its own vertical rhythm too — 120px above, 150px below, tightening at
          each breakpoint. */}
      <main className="w-full px-[15px] pb-[150px] pt-20 md:px-5 md:py-[60px] lg:px-[30px] lg:pb-[150px] lg:pt-[120px]">
      {/* Hero — stickers strewn around a single centred statement, the way the
          reference page opens: mostly air, with the eye pulled to one line. */}
      {/* The opening is the curtain: it pins at the top of the viewport for one
          screenful while everything after it rides up and covers it. The cover
          has to be opaque for that to read, which is what the layer below is
          for. */}
      <header
        ref={curtain}
        className="sticky top-0 z-0 grid h-screen place-items-center overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
          {scatter.map((s, i) => (
            <Sticker key={s.src} s={s} i={i} progress={covered} />
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

      {/* Everything past the opening travels as one opaque sheet, so it covers the
          curtain instead of letting it show through. Flex, not block: a block
          would let the first child's top margin collapse out through it, and the
          sheet would start below its own background with the curtain showing in
          the gap. */}
      <div className="relative z-10 flex flex-col bg-page">
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

      {/* Education — the same ledger shape as the posts below, and the only place
          the crests appear: under the pointer, not in the line. */}
      <section className="mt-[120px]">
        <Words
          as="p"
          text="Education"
          className="font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog"
        />
        <ul className="mt-12 flex flex-col gap-5">
          {education.map((e, i) => (
            <LedgerRow
              key={e.school}
              index={`E/${String(i + 1).padStart(3, "0")}`}
              title={e.degree}
              note={e.level}
              meta={`${e.school} · ${e.period}`}
              logo={e.logo}
              alt={e.school}
              delay={i * 0.06}
            />
          ))}
        </ul>
      </section>

      {/* Work Experience — the reference's own measurements: a two-column row on
          a 15px gap, each column taking half; the title boxed to 377px; 46px
          down the left, 60px down the right, 20px between entries. Type is 22px
          for the post and 14px for everything else, the labels in caps. */}
      <section className="mt-[120px]">
        <Words
          as="p"
          text="My Experience"
          className="font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog"
        />
        <Words
          as="h2"
          text="Work Experience"
          delay={0.08}
          className="mt-4 font-condensed text-5xl uppercase leading-[0.9] tracking-tight text-cream sm:text-7xl"
        />

        <ol className="mt-16 flex flex-col gap-[60px]">
          {[...experience].reverse().map((x, i) => {
            const title = [x.company, x.role, x.team, x.place, x.period]
              .filter(Boolean)
              .join(" | ")
            return (
              <li key={`${x.company}-${x.period}`} className="flex flex-col gap-[15px] md:flex-row md:items-start">
                {/* Left: the post and its mark, pinned while its own entry is on
                    screen. Sticky inside the row — so it holds at 150px down the
                    viewport, rides along as the particulars scroll past, and is
                    let go only when this entry's bottom catches up with it, which
                    is the next post arriving to push it out. The column has to
                    stretch to the row's full height or the pin has nowhere to
                    travel. */}
                <div className="flex flex-1 flex-col self-stretch">
                  <div className="flex flex-col gap-[30px] md:sticky md:top-[150px]">
                    <div className="flex items-start gap-3">
                      <LogoDot src={x.logo} alt={x.company} />
                      <Words
                        as="h3"
                        text={title}
                        className="max-w-[377px] text-[22px] leading-[1.1] tracking-[-0.02em] text-cream"
                      />
                    </div>
                    <p className="flex items-center gap-2 font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog">
                      {x.current && (
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-ac-green" />
                      )}
                      W/{String(i + 1).padStart(3, "0")}
                    </p>
                  </div>
                </div>

                {/* Right: the particulars, each ruled off above. */}
                <div className="flex flex-1 flex-col gap-[60px]">
                  <p className="font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog">
                    Details:
                  </p>
                  <div className="flex flex-col gap-5">
                    {(x.tags ?? []).map((t, j) => (
                      <div key={t} className="flex flex-col gap-5">
                        <Rule delay={j * 0.06} />
                        <div className="flex w-full items-start justify-between">
                          <div className="flex w-[90%] items-start gap-[19px]">
                            <span className="shrink-0 whitespace-pre font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog">
                              [ {i + 1}.{j + 1}
                            </span>
                            <Words
                              text={t}
                              delay={0.06 + j * 0.06}
                              className="text-sm leading-[1.2] text-ink"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="mt-[60px] flex flex-col gap-5">
          <Rule />
          <p className="font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-fog">
            To be continued
          </p>
        </div>
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

      {/* The sign-off: the name dropped into a heap along the floor of the band. */}
      <NameScatter text="shumeizhang" className="mt-[120px] h-[46vh] min-h-[300px] w-full" />

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
      </div>

    </main>
    </>
  )
}
