import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutGrid, ArrowRight } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import AccordionGallery from "../reactbits/AccordionGallery"
import { galleryProjects } from "../../data/project"
import { useLocale, useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

const featured = galleryProjects.slice(0, 4)

// The gallery items keep their route on `link` so each panel stays a real anchor
// (middle-click / open-in-new-tab still work); `onItemSelect` intercepts plain
// clicks so the router handles them without a full page reload.
const toItems = (projects) =>
  projects.map(p => ({
    image: p.image,
    label: p.name,
    sublabel: p.tag,
    color: p.color,
    link: `/project/${p.slug}`,
    slug: p.slug,
  }))

// The width under which AccordionGallery's own stylesheet stacks its panels.
const STACKED = "(max-width: 520px)"

// What a collapsed panel is held to once stacked (the gallery's 84px floor), and
// the gap between panels: three of each sit under the open cover.
const STACK_REST = 3 * 84 + 3 * 8

export default function ProjectGallery() {
  const navigate = useNavigate()
  const items = toItems(useLocale(featured))
  const t = useT()

  // On a phone the row of four leaves each panel tall and narrow, and a 16:9
  // cover fitted into that is a thin band with empty panel above and below it.
  // Stacked, every panel is the full width: the open one shows its cover whole
  // and the other three show a slice of theirs.
  const [stacked, setStacked] = useState(() => window.matchMedia(STACKED).matches)
  useEffect(() => {
    const query = window.matchMedia(STACKED)
    const onChange = () => setStacked(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return (
    // Stacked, the panel is as tall as the gallery needs rather than the fixed
    // row height the dashboard gives it everywhere else.
    <Panel className={`flex ${stacked ? "" : BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader
        icon={LayoutGrid}
        label={t(ui.panelProjects)}
        right={
          <button
            onClick={() => navigate("/project")}
            className="flex items-center gap-1 font-mono-tight text-xs text-fog transition-colors hover:text-cream"
          >
            {t(ui.viewAll)}
            <ArrowRight size={12} strokeWidth={2} />
          </button>
        }
      />

      {/* Every panel in the gallery is a project, so the cursor says "View" here.
          Stacked, the height is worked out from the width: a 16:9 cover at the
          gallery's own width (56.25cqw) plus the three collapsed panels. */}
      <div
        className={stacked ? "[container-type:inline-size]" : "min-h-0 flex-1"}
        data-cursor-label="view"
      >
        <AccordionGallery
          items={items}
          height={stacked ? `calc(56.25cqw + ${STACK_REST}px)` : "100%"}
          orientation={stacked ? "vertical" : "horizontal"}
          defaultIndex={0}
          gap={8}
          radius={12}
          activeAspect={stacked ? 16 / 9 : 3 / 2}
          minItemSize={64}
          // Ceiling on the active card's share. 0.64 is what 3:2 works out to at the panel's
          // usual proportions, so the aspect holds as-is and only a very tall row gets clamped.
          expandRatio={0.64}
          tilt={6}
          parallax={0.45}
          grayscale={false}
          dim={0}
          shadow={false}
          overlayColor="#05080d"
          textColor="var(--color-paper)"
          accentColor="var(--color-ac-orange)"
          panelColor="var(--color-box-2)"
          onItemSelect={item => navigate(`/project/${item.slug}`)}
        />
      </div>
    </Panel>
  )
}
