// "My World" — the cities my study and work have passed through, pinned on the
// dotted world map in the dashboard panel.
//
// Coordinates live in the *map SVG's own viewBox space* (66 x 38), which is what
// `scripts/generate-dotted-map.mjs` prints. Keeping them here (instead of raw
// lat/lng) means the dots always land exactly on a grid cell of the dotted map.
//   `dot`    where the marker sits on the map — the real projected grid cell.
//   `shape`  which 窗花 (paper-cut) shape marks it, 1-4 — same shapes and the
//            same shape↔colour pairing STATUS.LOG uses, so the two panels read
//            as one system. `shapeSize` is its width in viewBox units.
//   `label`  where the pill / card floats, hand-placed so nothing collides.
//   `color`  a design-system accent token, so the map recolours with the theme.
//   `z`      stacking order, so an expanded card covers its neighbours.

export const MAP_VIEWBOX = { width: 66, height: 38 }

// Percent helpers — markers are absolutely positioned in % of the map box.
export const toPercent = ({ x, y }) => ({
  left: `${(x / MAP_VIEWBOX.width) * 100}%`,
  top: `${(y / MAP_VIEWBOX.height) * 100}%`,
})

export const cities = [
  {
    id: "shenzhen",
    name: "SHENZHEN",
    coords: "22.5431° N, 114.0579° E",
    color: "var(--color-ac-blue)",
    icon: "graduation-cap",
    dot: { x: 53, y: 19 },
    shape: 3,
    shapeSize: 1,
    label: { x: 52, y: 25.5 },
    z: 2,
    blocks: [
      ["/ BA in Industrial Design at Shenzhen University"],
      ["/ First interaction design internship at Tencent"],
    ],
  },
  {
    id: "turin",
    name: "TORINO",
    coords: "45.0703° N, 7.6869° E",
    color: "var(--color-ac-green)",
    icon: "book-open",
    // Torino and Munich are barely 4° apart — adjacent grid cells. The
    // ornaments are small enough to sit on their true cells without touching.
    dot: { x: 32, y: 14 },
    shape: 4,
    shapeSize: 0.85,
    label: { x: 17.5, y: 21 },
    z: 2,
    blocks: [["/ MSc in Systemic Design at Politecnico di Torino"]],
  },
  {
    id: "munich",
    name: "MUNICH",
    coords: "48.1351° N, 11.5820° E",
    color: "var(--color-ac-red)",
    icon: "briefcase",
    dot: { x: 33, y: 13 },
    shape: 2,
    shapeSize: 1,
    // Where I am now — its pill wears a map pin instead of the globe and prints
    // its coordinates in full ink.
    current: true,
    label: { x: 22, y: 8.5 },
    z: 3,
    blocks: [
      ["/ Interaction design for AI product projects at wetter.com"],
      ["/ Interaction design and front-end for CAD AI products at Kyrall"],
    ],
  },
]

// The flight paths between them, in travel order. `bow` is how far the quadratic
// control point is pushed off the chord, in viewBox units — positive arcs north.
// Each arc runs a shimmer in the colour of the city it departs from, on its own
// loop delay so the two never pulse in sync.
export const arcs = [
  { id: "sz-tur", from: "shenzhen", to: "turin", bow: 13.6, color: "var(--color-ac-blue)", loopDelay: 0.3 },
  { id: "tur-muc", from: "turin", to: "munich", bow: -1, color: "var(--color-ac-green)", loopDelay: 0.9 },
]

// Where each arc starts and lands — the city dots, by id.
export const anchors = Object.fromEntries(cities.map((c) => [c.id, c.dot]))
