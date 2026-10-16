import { useEffect, useRef } from "react"
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import NameScatter from "../components/about/NameScatter"
import { intro, education, experience, skills, scatter} from "../data/about"
import { useLocale, useT } from "../i18n/lang"
import { ui } from "../i18n/ui"
import { splitUnits } from "../i18n/t"

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
    <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="block size-6 object-contain" />
      ) : (
        // No mark on file for this one. A monogram in the same disc keeps the
        // row's rhythm instead of leaving a hole where every other row has one.
        <span aria-hidden="true" className="font-condensed text-base uppercase leading-none text-page">
          {alt?.[0] ?? ""}
        </span>
      )}
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

// Where the pointer is across the viewport, as -1 to 1 on each axis, run through
// a soft spring so the field eases after the cursor instead of snapping to it.
// Coarse pointers get nothing: there is no hover on a phone, and a touch would
// only make the stickers jump to wherever the last tap landed.
function usePointerField() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ease = { stiffness: 55, damping: 18, mass: 0.7 }
  const sx = useSpring(x, ease)
  const sy = useSpring(y, ease)

  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const move = (e) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener("pointermove", move, { passive: true })
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])

  return [sx, sy]
}

// One strewn sticker. Four jobs stacked on one another, which is why there are
// two elements and a handful of motion values rather than one tidy div: the
// wrapper owns the placement and the resting tilt, `progress` sinks and turns it
// as the curtain comes over, the pointer slides it, and motion owns the fade.
// Placement cannot live on the inner element because motion overwrites its
// transform to run the fade.
//
// The pointer slide and the curtain's sink share the vertical axis, so they are
// summed into one value rather than fighting over `y`.
function Sticker({ s, i, progress, px, py }) {
  const depth = s.depth ?? 0
  const x = useTransform(px, (v) => v * depth)
  const y = useTransform([progress, py], ([p, v]) => p * (s.drift ?? 0) + v * depth)
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
        style={{ x, y, rotate }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="block w-full"
      />
    </span>
  )
}

// One entry of the ledger — the shape both halves of the CV are set in.
//
// Left: the post and its mark, pinned while its own entry is on screen. Sticky
// inside the row, so it holds at 150px down the viewport, rides along as the
// particulars scroll past, and is let go only when this entry's bottom catches
// up with it — which is the next post arriving to push it out. The column has
// to stretch to the row's full height or the pin has nowhere to travel.
//
// Right: the particulars, ruled off from one another and bulleted.
function CvEntry({ heading, meta = [], footer, name, logo, invert, mask, details = [] }) {
  return (
    <li className="flex flex-col gap-[30px]">
      {/* The rule that opens each entry runs under both columns, so one post is
          read off from the next rather than only its own particulars being
          ruled off from each other. */}
      <Rule />
      <div className="flex flex-col gap-[15px] md:flex-row md:items-start">
        <div className="flex flex-1 flex-col self-stretch">
          <div className="flex flex-col gap-[30px] md:sticky md:top-[150px]">
            <div className="flex flex-col gap-3">
              <Words
                as="h3"
                text={heading}
                className="max-w-[377px] text-[22px] leading-[1.1] tracking-[-0.02em] text-cream"
              />
              {meta.length > 0 && (
                <p className="flex flex-col gap-1 text-sm leading-[1.4] text-fog">
                  {meta.map((m, k) => (
                    <Words key={m} text={m} delay={0.04 + k * 0.04} />
                  ))}
                </p>
              )}
            </div>
          </div>

          {/* The mark, as it was drawn — no disc behind it. `mt-auto` drops it
              to the foot of the column, so it closes the entry the way the rule
              opens it. Without the disc the monochrome-dark logos would vanish
              into the dark theme, so those carry `invert` and are flipped back
              into view. */}
          {/* The foot of the column is the mark's slot. A school has no logo on
              this page, so its name stands in — set in the display face, since
              it is filling a wordmark's place. Unlike the logos it is never
              hidden on a phone: dropping it would lose the institution. */}
          {footer ? (
            <p className="mt-auto pt-10 font-condensed text-2xl uppercase leading-none tracking-tight text-cream">
              {footer}
            </p>
          ) : logo ? (
            mask ? (
              // A monochrome wordmark: painted as a mask so it takes a site
              // token and reads on both themes, the way the skill icons do.
              <span
                aria-label={name}
                role="img"
                className="mt-auto hidden h-8 w-[200px] max-w-full bg-cream md:block"
                style={{
                  maskImage: `url(${logo})`,
                  WebkitMaskImage: `url(${logo})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "left center",
                  WebkitMaskPosition: "left center",
                }}
              />
            ) : (
              <img
                src={logo}
                alt={name}
                loading="lazy"
                className={`mt-auto hidden h-10 w-auto max-w-[200px] object-contain object-left md:block ${
                  invert ? "dark:invert" : ""
                }`}
              />
            )
          ) : null}
        </div>

        {/* The particulars. No heading over them — the rule and the bullets say
            what this column is, and the post opposite says whose it is. */}
        <div className="flex flex-1 flex-col gap-5">
          {details.map((d, j) => (
            <div key={`${d.label}-${j}`} className="flex flex-col gap-5">
              {/* A post covering more than one brief names each one above its
                  own run of bullets. */}
              {d.group && (
                <p
                  className={`font-mono-tight text-sm uppercase leading-[1.6em] tracking-[-0.02em] text-cream ${
                    j > 0 ? "mt-5" : ""
                  }`}
                >
                  {d.group}
                </p>
              )}
              {/* The first entry's own rule would sit right under the one that
                  opens the row, so it starts straight in. */}
              {(j > 0 || d.group) && <Rule delay={j * 0.06} />}
              <div className="flex w-full items-start justify-between">
                <div className="flex w-[90%] items-start gap-[19px]">
                  {/* Drawn, not typed: Urbanist's own bullet glyph is a speck at
                      this size. 10px down puts a 5px disc on the optical centre
                      of a 24px first line. */}
                  <span
                    aria-hidden="true"
                    className="mt-[10px] size-[5px] shrink-0 rounded-full bg-ink"
                  />
                  {/* The lead-in carries the weight the résumé gives it by going
                      brighter, not bolder — Urbanist's heavier cuts would fight
                      the condensed headings. A sentence is dozens of words, so
                      they arrive on a much shorter step than a heading's. */}
                  <p className="text-base leading-[1.5] text-ink">
                    <span className="text-cream">{d.label}: </span>
                    <Words text={d.text} delay={0.06 + j * 0.06} step={0.012} />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </li>
  )
}


// Text arrives a word at a time, each one starting small and nearly transparent.
// The words are inline-block because a transform does nothing to an inline box,
// and the space between them is a real text node so the line still wraps and
// still reads as one sentence to a screen reader.
function Words({ text, className = "", delay = 0, step = 0.04, as: Tag = "span" }) {
  // A word is the unit in English; Chinese has no spaces to split on, so there
  // the unit is the character and nothing is inserted between them.
  const { units, joiner } = splitUnits(text)
  return (
    <Tag className={className}>
      {units.map((w, i) => (
        <span key={`${w}-${i}`}>
          <motion.span
            initial={{ opacity: 0.001, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ ...SPRING, delay: delay + i * step }}
            className="inline-block"
          >
            {w}
          </motion.span>
          {joiner && i < units.length - 1 ? joiner : null}
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
  // The whole page's copy, resolved once: the ledger rows, the résumé links and
  // the skill names all come out of here as plain strings.
  const copy = useLocale({ intro, education, experience, skills })
  const t = useT()
  const curtain = useRef(null)
  // How far the curtain has travelled over the opening, 0 to 1 across the first
  // screenful. Drives the jostle on the stickers below it.
  const { scrollY } = useScroll()
  const covered = useTransform(scrollY, [0, 700], [0, 1], { clamp: true })
  const [px, py] = usePointerField()

  return (
    <>
      {/* No max-width, and the gutters are narrow: the reference runs full-bleed on
          30px of side padding, which is what gives its rows room to breathe.
          Its own vertical rhythm too — 120px above, 150px below, tightening at
          each breakpoint. */}
      <main className="w-full px-4 pb-37.5 md:px-5 md:pb-15 lg:px-8 lg:pb-37.5">
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
            <Sticker key={s.src} s={s} i={i} progress={covered} px={px} py={py} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-center"
        >
          <p className="font-mono-tight text-md uppercase tracking-[0.22em] text-fog">
            {copy.intro.role}
          </p>
          <h1 className="mt-5 font-condensed text-[15vw] uppercase leading-none tracking-[0.02em] text-cream sm:text-[8rem]">
            {/* One line per word, which is what the display setting is built for.
                A Chinese name has no spaces, so it stays on one line rather than
                being stacked a character at a time. */}
            {copy.intro.name.split(" ").map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
          </h1>

          <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {copy.intro.resumes.map((r) => (
              <li key={r.href}>
                <a
                  href={r.href}
                  download={r.file ?? true}
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
            src={copy.intro.video}
            title={`${copy.intro.name} — ${t(ui.selfIntro)}`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </motion.section>

      {/* Work Experience — the reference's own measurements: a two-column row on
          a 15px gap, each column taking half; the title boxed to 377px; 46px
          down the left, 60px down the right, 20px between entries. Type is 22px
          for the post and 14px for everything else, the labels in caps. */}
      <section className="mt-[120px]">
        <Words
          as="h2"
          text={t(ui.aboutExperience)}
          delay={0.08}
          className="font-condensed text-5xl uppercase leading-none text-cream sm:text-7xl"
        />

        <ol className="mt-16 flex flex-col gap-[60px]">
          {[...copy.experience].reverse().map((x) => (
            <CvEntry
              key={`${x.company}-${x.period}`}
              heading={x.role}
              meta={[x.period, x.place].filter(Boolean)}
              name={x.company}
              logo={x.logo}
              invert={x.invert}
              mask={x.mask}
              current={x.current}
              details={x.details}
            />
          ))}
        </ol>

      </section>

      {/* Education — the same ledger, after the posts: the schooling reads as
          the footnote to the career rather than the preamble to it. */}
      <section className="mt-[120px]">
        <Words
          as="h2"
          text={t(ui.aboutEducation)}
          delay={0.08}
          className="font-condensed text-5xl uppercase leading-none text-cream sm:text-7xl"
        />

        <ol className="mt-16 flex flex-col gap-[60px]">
          {copy.education.map((e) => (
            <CvEntry
              key={e.school}
              heading={e.degree}
              meta={[e.period, e.place].filter(Boolean)}
              footer={e.school}
              name={e.school}
              details={e.details}
            />
          ))}
        </ol>
      </section>

      {/* Skills */}
      <Section>
         <Words
          as="h2"
          text={t(ui.aboutSkills)}
          delay={0.08}
          className="font-condensed text-5xl uppercase leading-none text-cream sm:text-7xl"
        />
        <ul className="mt-16 grid grid-cols-4 gap-x-2 gap-y-8 sm:grid-cols-6 lg:grid-cols-9">
          {copy.skills.map((s, i) => (
            <motion.li
              key={s.name}
              {...rise}
              transition={{ duration: 0.45, delay: (i % 5) * 0.04 }}
              className="group flex flex-col items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="block size-18 bg-ink transition-colors duration-300 group-hover:bg-cream"
                style={{
                  maskImage: `url(${s.icon})`,
                  WebkitMaskImage: `url(${s.icon})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              <span className="text-center text-base text-fog transition-colors duration-300 group-hover:text-ink">
                {s.name}
              </span>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* The sign-off: the name dropped into a heap along the floor of the band. */}
      <NameScatter text="shumeizhang" className=" h-[46vh] min-h-[300px] w-full" />

      {/* CTA */}
      <motion.div {...rise} transition={{ duration: 0.5 }} className="mt-24 border-t border-line">
        <Link to="/project" className="group flex items-center justify-between gap-6 py-8">
          <p className="text-2xl font-medium text-cream sm:text-3xl lg:text-8xl">
            {/* The underline is positioned rather than in flow, so sweeping it in
                never changes this line's height or shifts the arrow beside it.
                It wipes out to the right and back in from the left — the same
                idiom the résumé links use — and the text leans after the arrow.
                Both rule and offset grow with the type, or a hairline under
                96px copy reads as a stray scratch. */}
            <span className="relative inline-block transition-transform duration-300 group-hover:translate-x-1">
              {t(ui.aboutCta)}
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-right scale-x-0 bg-cream transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100 lg:-bottom-3 lg:h-1"
              />
            </span>
          </p>
          <ArrowUpRight
            strokeWidth={1.5}
            className="size-20 shrink-0 text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cream sm:size-32"
          />
        </Link>
      </motion.div>
      </div>

    </main>
    </>
  )
}
