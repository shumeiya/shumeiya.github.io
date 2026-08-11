import { useMemo, useState } from "react"
import CategoryFilter from "../components/project/CategoryFilter"
import ProjectCard from "../components/project/ProjectCard"
import { projectCategories, projectList } from "../data/project"

export default function Project() {
  const [active, setActive] = useState("all")

  const counts = useMemo(() => {
    const c = { all: projectList.length }
    for (const cat of projectCategories) {
      if (cat.key === "all") continue
      c[cat.key] = projectList.filter((p) => p.categories.includes(cat.key)).length
    }
    return c
  }, [])

  const visible = useMemo(
    () => (active === "all" ? projectList : projectList.filter((p) => p.categories.includes(active))),
    [active]
  )

  return (
    <main className="relative min-h-screen px-4 pb-28 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-9xl">
        {/* Sticky header — giant faded title (left) sits above the grid so cards
            scroll behind it; filter pills (right) stay pinned and clickable. */}
        <header className="sticky top-14 z-30 mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="pointer-events-none select-none text-xl font-semibold leading-[0.9] tracking-tight text-ink/20 sm:text-2xl lg:text-4xl">
            Project
          </h1>
          <CategoryFilter
            categories={projectCategories}
            counts={counts}
            active={active}
            onChange={setActive}
          />
        </header>

        <div className="relative z-10 grid auto-rows-36 grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-47 lg:auto-rows-52 lg:grid-cols-4 lg:gap-2">
          {visible.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
