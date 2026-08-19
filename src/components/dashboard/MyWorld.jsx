import { useNavigate } from "react-router-dom"
import { Globe2 } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import WorldMap from "../myworld/WorldMap"
import { places } from "../../data/myworld"

// Dashboard preview of the world map — same map + markers as the My World page.
// Clicking any marker jumps to the full page.
export default function MyWorldPanel() {
  const navigate = useNavigate()

  return (
    <Panel className={`flex ${BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader icon={Globe2} label="MY WORLD" />

      <div className="flex flex-1 items-center justify-center overflow-hidden">
        <WorldMap
          places={places}
          onSelect={() => navigate("/my-world")}
          style={{ height: "100%" }}
        />
      </div>
    </Panel>
  )
}
