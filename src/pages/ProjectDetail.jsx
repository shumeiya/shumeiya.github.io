import { useEffect, useState } from "react"
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

export default function ProjectDetail() {
  const { slug } = useParams()
  // Resolved per language and cached by source object, so `detail` keeps a
  // stable identity between renders and the scroll-spy effect below doesn't
  // re-subscribe on every paint.
  const project = useLocale(projectList.find((p) => p.slug === slug))
  const detail = useLocale(project && projectDetails[slug])
  const nextProject = useLocale(projectList)
  const t = useT()

  const [active, setActive] = useState(detail?.sections[0]?.id)

  // Scroll-spy — the last section whose heading has crossed the reading line wins, so short
  // sections between tall images still get their turn as the active chapter.
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

  const idx = nextProject.findIndex((p) => p.slug === slug)
  const next = nextProject[(idx + 1) % nextProject.length]

  return (
    // `w-full` is load-bearing. This <main> is an item of the app shell's column
    // flex container, and `mx-auto` — an auto margin on the cross axis — cancels the
    // stretch that would otherwise give it the container's width, leaving it to size
    // to fit-content, whose floor is its own min-content. One wide figure then drags
    // the whole page wider than the screen and the document scrolls sideways. A
    // definite width stops that; `max-w-9xl` still caps it on a wide display.
    <main className="relative mx-auto w-full min-w-0 max-w-9xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <DetailToc sections={detail.sections} active={active} />
      <ScrollRail />

      <div className="flex justify-center">
        <article className="min-w-0 max-w-5xl flex-1">
          <ProjectHero project={project} detail={detail} />

          {detail.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-20 scroll-mt-24">
              {section.eyebrow && (
                <p className="font-mono-tight text-note uppercase tracking-wide text-fog">
                  {section.eyebrow}
                </p>
              )}
              {/* A section whose figure carries its own title doesn't need the page's
                  one twice over — but the heading still has to exist, for the chapter
                  index that links to it and for the document outline. */}
              <h2
                className={
                  section.titleHidden
                    ? "sr-only"
                    : "mt-2 text-xl font-semibold text-cream sm:text-2xl"
                }
              >
                {section.label}
              </h2>

              {section.lead && (
                <p className="mt-3 text-copy leading-relaxed text-ink">{section.lead}</p>
              )}

              {section.blocks && <DetailBlocks blocks={section.blocks} accent={project.color} />}

              {section.body?.map((paragraph, i) => (
                <p key={i} className="mt-4 text-copy leading-relaxed text-fog">
                  {paragraph}
                </p>
              ))}

              {section.images?.length > 0 && (
                <div className="mt-6 grid gap-4">
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
      </div>
    </main>
  )
}
