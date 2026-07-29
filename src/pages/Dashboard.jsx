import HelloPanel from "../components/dashboard/HelloPanel"
import TimeGauge from "../components/dashboard/TimeGauge"
import SkillToolPanel from "../components/dashboard/SkillToolPanel"
import GalleryPanel from "../components/dashboard/GalleryPanel"
import WorldMapPanel from "../components/dashboard/WorldMapPanel"

export default function Dashboard() {
  return (
    <main className="px-4 pb-4 pt-2 sm:px-6 lg:px-4">
      <div className="mx-auto grid max-w-9xl grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
        <div className="lg:col-span-4">
          <HelloPanel />
        </div>
        <div className="lg:col-span-4">
          <TimeGauge />
        </div>
        <div className="lg:col-span-4">
          <SkillToolPanel />
        </div>

        <div className="lg:col-span-7">
          <GalleryPanel />
        </div>
        <div className="lg:col-span-5">
          <WorldMapPanel />
        </div>
      </div>
    </main>
  )
}
