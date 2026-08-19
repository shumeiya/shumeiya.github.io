// Shared map asset + projection, kept out of component files so fast-refresh stays happy.
export { default as worldmapSvg } from "../../assets/worldmap.svg?raw"

// Equirectangular projection fitted to the map SVG (viewBox 950 x 620).
// x = A*lng + B, y = C*lat + D  →  returned as percentages of the container.
const PROJ = { A: 2.655, B: 458.11, C: -3.248, D: 333.66, W: 950, H: 620 }

export function project(lat, lng) {
  return {
    x: ((PROJ.A * lng + PROJ.B) / PROJ.W) * 100,
    y: ((PROJ.C * lat + PROJ.D) / PROJ.H) * 100,
  }
}
