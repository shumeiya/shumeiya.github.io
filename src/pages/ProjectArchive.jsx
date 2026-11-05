import { useMemo, useState } from "react"
import { AnimatePresence } from "framer-motion"
import CategoryFilter from "../components/project/CategoryFilter"
import ProjectCard from "../components/project/ProjectCard"
import { projectCategories, projectList } from "../data/project"
import { useLocale, useT } from "../i18n/lang"
import { ui } from "../i18n/ui"

// The archive is an index, so it is laid out as one: a title block in the same
// voice as the Projects reel (condensed capitals over a hairline), then an even
// grid where every project gets the same cover, the same caption and the same
// weight. Two to a row, so each cover is large enough to read; one on a phone.
export default function ProjectArchive() {
  const [active, setActive] = useState("all")
  // Cards and filter pills read their copy from here; `categories` / `key` are
  // untranslated identifiers, so the filtering logic below is unaffected.
  const projects = useLocale(projectList)
  const categories = useLocale(projectCategories)
  const t = useT()

  const counts = useMemo(() => {
    const c = { all: projectList.length }
    for (const cat of projectCategories) {
      if (cat.key === "all") continue
      c[cat.key] = projectList.filter((p) => p.categories.includes(cat.key)).length
    }
    return c
  }, [])

  const shown = projects.filter((p) => active === "all" || p.categories.includes(active))

  return (
    <main className="relative min-h-screen px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-32 lg:pt-16">
      <header className="border-b border-line pb-6 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:pb-8">
        <h1 className="font-condensed text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.9] tracking-[-0.01em] text-ink">
          {t(ui.allProjects)}
        </h1>

        <CategoryFilter
          categories={categories}
          counts={counts}
          active={active}
          onChange={setActive}
          className="mt-6 lg:mt-0"
        />
      </header>

      <ul className="mt-8 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:mt-10 lg:gap-y-16">
        {/* popLayout lifts a leaving card out of the flow at once, so the ones
            that stay slide into their new cells instead of waiting for it. */}
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </ul>
    </main>
  )
}
