// Generates src/assets/dotted-world.svg — the dotted world map behind the
// "MY EXPERIENCE" panel. Run with `node scripts/generate-dotted-map.mjs`
// after changing MAP_OPTIONS; the result is committed so the app never has to
// pay the (multi-second) grid computation at runtime.
import fs from "node:fs"
import path from "node:path"
import DottedMap from "dotted-map"

export const MAP_OPTIONS = {
  height: 38,
  grid: "vertical",
  region: { lat: { min: -58, max: 76 }, lng: { min: -152, max: 178 } },
}

const map = new DottedMap(MAP_OPTIONS)

// Cities pinned on the map — kept in sync with src/data/experience.js.
const CITIES = [
  { id: "shenzhen", lat: 22.5431, lng: 114.0579 },
  { id: "turin", lat: 45.0703, lng: 7.6869 },
  { id: "munich", lat: 48.1351, lng: 11.582 },
]

const svg = map
  .getSVG({ radius: 0.32, color: "#ffffff", shape: "circle" })
  .replace(' style="background-color: transparent"', "")
  .replace(/fill="#ffffff"/g, 'fill="currentColor"')
  .replace(/\n\s*/g, "")

const out = path.join(import.meta.dirname, "../src/assets/dotted-world.svg")
fs.writeFileSync(out, svg + "\n")

const [, , , w, h] = svg.match(/viewBox="(\S+) (\S+) (\S+) (\S+)"/)
console.log(`wrote ${out}  viewBox ${w}x${h}  aspect ${(w / h).toFixed(4)}`)
console.log("grid positions (x/y, and as % of the map box):")
for (const c of CITIES) {
  const p = map.getPin({ lat: c.lat, lng: c.lng })
  console.log(
    `  ${c.id.padEnd(14)} x:${p.x} y:${p.y}  →  ${((p.x / w) * 100).toFixed(2)}% ${((p.y / h) * 100).toFixed(2)}%`
  )
}
