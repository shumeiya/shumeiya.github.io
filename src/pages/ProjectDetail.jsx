import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { projectList } from "../data/project"
import { projectDetails } from "../data/projectDetails"
import DetailToc from "../components/project/DetailToc"
import ScrollRail from "../components/project/ScrollRail"
import DetailBlocks from "../components/project/DetailBlocks"

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projectList.find((p) => p.slug === slug)
  const detail = project && projectDetails[slug]

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

  const idx = projectList.findIndex((p) => p.slug === slug)
  const next = projectList[(idx + 1) % projectList.length]

  return (
    <main className="relative mx-auto max-w-9xl px-4 pb-28 pt-6 sm:px-6 lg:px-8">
      <DetailToc sections={detail.sections} active={active} />
      <ScrollRail />

      <div className="flex justify-center">
        <article className="min-w-0 max-w-2xl flex-1">
          <header className="mb-16">
            <p className="font-mono-tight text-xs uppercase tracking-wide text-fog">
              {project.category}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-fog">
              {detail.summary ?? project.description}
            </p>

            {detail.tags && (
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {detail.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 font-mono-tight text-[11px] uppercase tracking-wide text-fog"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-3 border-t border-line pt-5">
              <div>
                <dt className="font-mono-tight text-[11px] uppercase tracking-wide text-fog">Role</dt>
                <dd className="mt-1 text-sm text-ink">{detail.role}</dd>
              </div>
              <div>
                <dt className="font-mono-tight text-[11px] uppercase tracking-wide text-fog">Category</dt>
                <dd className="mt-1 text-sm text-ink">{project.category}</dd>
              </div>
            </dl>
          </header>

          {detail.sections.map((section) => (
            <section key={section.id} id={section.id} className="mb-20 scroll-mt-24">
              {section.eyebrow && (
                <p className="font-mono-tight text-xs uppercase tracking-wide text-fog">
                  {section.eyebrow}
                </p>
              )}
              <h2 className="mt-2 text-xl font-semibold text-cream sm:text-2xl">{section.label}</h2>

              {section.lead && (
                <p className="mt-3 text-base leading-relaxed text-ink sm:text-lg">{section.lead}</p>
              )}

              {section.blocks && <DetailBlocks blocks={section.blocks} accent={project.color} />}

              {section.body?.map((paragraph, i) => (
                <p key={i} className="mt-4 text-sm leading-relaxed text-fog sm:text-base">
                  {paragraph}
                </p>
              ))}

              {section.images?.length > 0 && (
                <div className="mt-6 grid gap-4">
                  {section.images.map((src) => (
                    <div key={src} className="overflow-hidden rounded-xl bg-box">
                      <img src={src} alt="" loading="lazy" className="w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          <footer className="mt-8 border-t border-line pt-8">
            <Link to={`/project/${next.slug}`} className="group flex items-center justify-between gap-4">
              <div>
                <p className="font-mono-tight text-xs uppercase tracking-wide text-fog">Next project</p>
                <p className="mt-1 text-lg font-medium text-cream">{next.name}</p>
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
