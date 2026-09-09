import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import WorkSection from "../components/project/WorkSection"
import DrumStage from "../components/project/DrumStage"
import { featuredWorks } from "../data/works"

export default function Works() {
  // Sections only exist once React has painted, so a /project#tide deep link
  // lands at the top unless we re-run the jump ourselves after mount.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [])

  return (
    <main className="relative overflow-x-clip pb-[calc(6rem+200px)]">
      <DrumStage>
      {featuredWorks.map((work, i) => (
        <WorkSection key={work.slug} work={work} index={i} total={featuredWorks.length} />
      ))}

      <div id="see-others" className="mx-auto flex max-w-9xl flex-col items-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="max-w-md text-base text-fog">
          Four of the projects I keep coming back to. The rest of the shelf — early work,
          side projects and studies — lives in the archive.
        </p>
        <Link
          to="/project/all"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-8 py-4 text-lg text-ink transition-colors hover:border-ink hover:bg-ink hover:text-page"
        >
          See others
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      </DrumStage>
    </main>
  )
}
