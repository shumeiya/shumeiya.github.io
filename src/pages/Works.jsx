import { useEffect } from "react"
import CtaLink from "../components/CtaLink"
import WorkSection from "../components/project/WorkSection"
import DrumStage from "../components/project/DrumStage"
import { featuredWorks } from "../data/works"
import { useLocale, useT } from "../i18n/lang"
import { ui } from "../i18n/ui"

export default function Works() {
  // The reel's copy is resolved once here, so everything below it — section
  // headers, strip note panels — keeps working on plain strings.
  const works = useLocale(featuredWorks)
  const t = useT()

  // Sections only exist once React has painted, so a /project#tide deep link
  // lands at the top unless we re-run the jump ourselves after mount.
  useEffect(() => {
    const { hash } = window.location
    if (!hash) return
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (target) requestAnimationFrame(() => target.scrollIntoView())
  }, [])

  return (
    <main className="relative overflow-x-clip pb-24 lg:pb-[calc(6rem+200px)]">
      <DrumStage>
      {works.map((work, i) => (
        <WorkSection key={work.slug} work={work} index={i} total={works.length} />
      ))}

      <div id="see-others" className="mx-auto px-4 pt-24 sm:px-6 lg:px-8">
        <CtaLink to="/project/all">{t(ui.othersCta)}</CtaLink>
      </div>
      </DrumStage>
    </main>
  )
}
