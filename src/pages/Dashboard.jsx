import HelloPanel from "../components/dashboard/HelloPanel"
import StatusLog from "../components/dashboard/StatusLog"
import SkillToolPanel from "../components/dashboard/SkillToolPanel"
import ProjectGallery from "../components/dashboard/ProjectGallery"
import MyWorldPanel from "../components/dashboard/MyWorldPanel"

export default function Dashboard() {
  return (
    <main className="px-4 pb-4 sm:px-6 lg:px-2">
      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-2">
        <div className="lg:col-span-4">
          <HelloPanel />
        </div>
        <div className="lg:col-span-3">
          <SkillToolPanel />
        </div>
        <div className="lg:col-span-5">
          <StatusLog />
        </div>


        <div className="lg:col-span-5">
          <MyWorldPanel />
        </div>
        <div className="lg:col-span-7">
          <ProjectGallery />
        </div>
      </div>
    </main>
  )
}
