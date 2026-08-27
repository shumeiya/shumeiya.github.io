import { useNavigate } from "react-router-dom"
import { LayoutGrid, ArrowRight } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import AccordionGallery from "../reactbits/AccordionGallery"
import { galleryProjects } from "../../data/project"

const featured = galleryProjects.slice(0, 4)

// The gallery items keep their route on `link` so each panel stays a real anchor
// (middle-click / open-in-new-tab still work); `onItemSelect` intercepts plain
// clicks so the router handles them without a full page reload.
const items = featured.map(p => ({
  image: p.image,
  label: p.name,
  sublabel: p.tag,
  color: p.color,
  link: `/project/${p.slug}`,
  slug: p.slug,
}))

export default function ProjectGallery() {
  const navigate = useNavigate()

  return (
    <Panel className={`flex ${BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader
        icon={LayoutGrid}
        label="PROJECTS"
        right={
          <button
            onClick={() => navigate("/project")}
            className="flex items-center gap-1 font-mono-tight text-xs text-fog transition-colors hover:text-cream"
          >
            View all
            <ArrowRight size={12} strokeWidth={2} />
          </button>
        }
      />

      <div className="min-h-0 flex-1">
        <AccordionGallery
          items={items}
          height="100%"
          defaultIndex={0}
          gap={8}
          radius={12}
          expandRatio={0.5}
          tilt={6}
          parallax={0.45}
          grayscale={false}
          overlayColor="#05080d"
          textColor="var(--color-paper)"
          accentColor="var(--color-ac-orange)"
          panelColor="var(--color-box-2)"
          onItemSelect={item => navigate(`/project/${item.slug}`)}
          className="max-[520px]:!flex-row"
        />
      </div>
    </Panel>
  )
}
