import { Globe2 } from "lucide-react"
import Panel, { PanelHeader, BOTTOM_ROW_HEIGHT } from "./Panel"
import ExperienceMap from "../experience/ExperienceMap"

// Dashboard panel: a dotted world map with the cities my study and work have
// passed through, each one a pill that opens into a card.
export default function MyWorldPanel() {
  return (
    <Panel className={`exp-panel flex ${BOTTOM_ROW_HEIGHT} flex-col p-2 sm:p-3`}>
      <PanelHeader icon={Globe2} label="MY WORLD" />

      <div className="flex min-h-0 flex-1 items-center justify-center">
        <ExperienceMap />
      </div>
    </Panel>
  )
}
