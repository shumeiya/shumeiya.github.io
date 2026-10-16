import { useNavigate } from "react-router-dom"
import { Globe2 } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import WorldMap from "../myworld/WorldMap"
import { places } from "../../data/myworld"
import { useLocale, useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// Dashboard preview of the world map — same map + markers as the My World page.
// Clicking any marker jumps to the full page.
export default function MyWorldPanel() {
  const navigate = useNavigate()
  const localised = useLocale(places)
  const t = useT()

  return (
    <Panel className={`flex ${BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader icon={Globe2} label={t(ui.panelMyWorld)} />

      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <WorldMap
          places={localised}
          onSelect={() => navigate("/my-world")}
          style={{ height: "100%" }}
        />
      </div>
    </Panel>
  )
}
