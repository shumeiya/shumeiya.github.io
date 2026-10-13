import { useMemo, useState } from "react"
import CategoryFilter from "../components/project/CategoryFilter"
import ProjectCard from "../components/project/ProjectCard"
import { projectCategories, projectList } from "../data/project"

export default function ProjectArchive() {
  const [active, setActive] = useState("all")

  const counts = useMemo(() => {
    const c = { all: projectList.length }
    for (const cat of projectCategories) {
      if (cat.key === "all") continue
      c[cat.key] = projectList.filter((p) => p.categories.includes(cat.key)).length
    }
    return c
  }, [])

  // Filtering never removes a card — the whole archive stays on screen and the
  // off-category ones just fade to greyscale, so the layout never jumps.
  const matches = (project) => active === "all" || project.categories.includes(active)

  return (
    <main className="relative min-h-screen px-4 pb-28 pt-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-9xl">
        {/* Sticky header — giant faded title (left) sits above the grid so cards
            scroll behind it; filter pills (right) stay pinned and clickable. */}
        <header className="sticky top-14 z-30 mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="pointer-events-none select-none text-xl font-semibold leading-[0.9] tracking-tight text-ink/20 sm:text-2xl lg:text-4xl">
            All projects
          </h1>
          <CategoryFilter
            categories={projectCategories}
            counts={counts}
            active={active}
            onChange={setActive}
          />
        </header>

        <div className="bento relative z-10 pb-10">
          <div className="bento-grid grid grid-flow-dense grid-cols-2 lg:grid-cols-4">
            {projectList.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                dimmed={!matches(project)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
