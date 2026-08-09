import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import CategoryFilter from "../components/project/CategoryFilter"
import ProjectCard from "../components/project/ProjectCard"
import { projectCategories, projectList } from "../data/profile"

const SIZE_CLASSES = {
  lg: "col-span-2 row-span-2",
  wide: "col-span-2 row-span-1",
  tall: "col-span-1 row-span-2",
  sm: "col-span-1 row-span-1",
}

export default function MyProject() {
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
    <main className="px-4 pb-16 pt-4 sm:px-6 lg:px-2">
      <div className="mx-auto max-w-9xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono-tight text-xs text-ink/40"
        >
          // selected work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mt-2 font-serif text-4xl text-ink sm:text-5xl"
        >
          My Project
        </motion.h1>

        <div className="mt-6 border-b border-page-line pb-6 sm:mt-8 sm:pb-8">
          <CategoryFilter
            categories={projectCategories}
            counts={counts}
            active={active}
            onChange={setActive}
          />
        </div>

        <div className="mt-8 grid auto-rows-[170px] grid-cols-2 grid-flow-dense gap-3 sm:mt-10 sm:auto-rows-[190px] lg:grid-cols-4 lg:auto-rows-[210px] lg:gap-2">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              className={SIZE_CLASSES[project.size] ?? SIZE_CLASSES.sm}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
