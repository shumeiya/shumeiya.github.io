import { useEffect, useRef, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { projectList } from "../data/project"
import { projectDetails } from "../data/projectDetails"
import DetailToc from "../components/project/DetailToc"
import ScrollRail from "../components/project/ScrollRail"
import DetailBlocks from "../components/project/DetailBlocks"
import ProjectHero from "../components/project/ProjectHero"
import { useLocale, useT } from "../i18n/lang"
import { ui } from "../i18n/ui"
import { MotionContext, useAutoReveal } from "../components/project/wpMotion"

// Case studies with scroll motion, and which blocks rise in on each. WeatherPets
// handles its own (its cards reveal themselves); the others use the auto reveal.
const MOTION = {
  // Blocks that sit straight in a section, or inside the plain wrapper a section
  // gets when its board draws the title; the wrapper itself is not a block.
  codemao:
    "article > section > :is(figure, dl, ul, ol, div[class]:not([class*='first-child'])), article > section > div:is(:not([class]), [class*='first-child']) > :is(figure, dl, ul, ol, div)",
  "abc-mouse": ".abc-deck :is(header, figure, ul, ol, dl, [class*='rounded-2xl'])",
  // HMI's tiles reveal themselves (HmiDeck.jsx); the page only brings in the
  // chapter titles and the lead under them.
  hmi: "article > section > :is(h2, h2 + p)",
  // Same for Slow Food: its tiles reveal themselves (SlowFoodDeck.jsx).
  "slow-food": "article > section > :is(h2, h2 + p)",
}
// TIDE is built from the same shared blocks as CodeMao, so it rises in the same way.
MOTION.tide = MOTION.codemao

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = useLocale(projectList.find((p) => p.slug === slug))
  const detail = useLocale(project && projectDetails[slug])
  const nextProject = useLocale(projectList)
  const t = useT()
  const mainRef = useRef(null)
  useAutoReveal(mainRef, MOTION[slug], [slug, t])

  const [active, setActive] = useState(detail?.sections[0]?.id)
  useEffect(() => {
    if (!detail) return
    let raf = 0

    const paint = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let current = detail.sections[0].id
      for (const section of detail.sections) {
        const el = document.getElementById(section.id)
        if (el && el.getBoundingClientRect().top <= line) current = section.id
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [detail])

  if (!project || !detail) return <Navigate to="/project" replace />

  // The "next project" chain is set by hand for the main case studies, so the
  // reader is led through the featured ones in the reel's own order; anything
  // else falls back to list order.
  const NEXT = { kyrall: "hmi", hmi: "weather-pets", "weather-pets": "codemao", codemao: "abc-mouse" }
  const idx = nextProject.findIndex((p) => p.slug === slug)
  const next =
    (NEXT[slug] && nextProject.find((p) => p.slug === NEXT[slug])) ||
    nextProject[(idx + 1) % nextProject.length]

  return (
    <main ref={mainRef} className={`${MOTION[slug] ? "motion-page " : ""}case-type relative mx-auto w-full min-w-0 px-4 pb-28 pt-6 sm:px-6 lg:px-8 xl:px-52`}>
      <DetailToc sections={detail.sections} active={active} />
      <ScrollRail />

      <MotionContext.Provider value={!!MOTION[slug]}>
      <article>
        <ProjectHero project={project} detail={detail} />
        {detail.intro && (
          <div className="mb-chapter">
            <DetailBlocks blocks={detail.intro} accent={project.color} />
          </div>
        )}

        {detail.sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-chapter scroll-mt-24">
            {section.eyebrow && (
              <p className="font-mono-tight text-note uppercase tracking-wide text-fog">
                {section.eyebrow}
              </p>
            )}
            <h2
              className={
                section.titleHidden
                  ? "sr-only"
                  : "mt-tight text-4xl font-semibold tracking-tight text-cream"
              }
            >
              {section.heading ?? section.label}
            </h2>

            {section.lead && (
              <p className="mt-lead max-w-3xl text-copy text-ink">{section.lead}</p>
            )}

            {/* When the board or deck draws the chapter title itself, its top edge is
                the title, so it sits one eyebrow-gap under the eyebrow, not a block-gap. */}
            {section.blocks && (
              <div className={section.titleHidden && !section.lead ? "[&>*:first-child]:mt-tight" : undefined}>
                <DetailBlocks blocks={section.blocks} accent={project.color} />
              </div>
            )}

            {section.body?.map((paragraph, i) => (
              <p key={i} className="mt-lead text-copy text-fog">
                {paragraph}
              </p>
            ))}

            {section.images?.length > 0 && (
              <div className="mt-visual grid gap-card">
                {section.images.map((src) => (
                  <div key={src} className="bg-box">
                    <img src={src} alt="" loading="lazy" className="block h-auto w-full" />
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        <footer className="mt-8 border-t border-line pt-8">
          <Link to={`/project/${next.slug}`} className="group flex items-center justify-between gap-4">
            <div>
              <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(ui.nextProject)}</p>
              <p className="mt-1 text-copy font-medium text-cream">{next.name}</p>
            </div>
            <ArrowUpRight
              size={20}
              className="shrink-0 text-fog transition-colors group-hover:text-cream"
            />
          </Link>
        </footer>
      </article>
      </MotionContext.Provider>
    </main>
  )
}
