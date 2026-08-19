// "My World" — places I've been, pinned onto the world map.
// Each place: a photo marker on the map (cover), and a photo wall for the detail view.
// `caption` is an optional text layer — set it to a sentence to show one on hover,
// or leave it null/empty to show just the place name. Add more places by appending
// an entry with lat/lng; the map projects it automatically.

const COVER_MUNICH = "/myworld主图/慕尼黑.png"
const COVER_BARCELONA = "/myworld主图/巴塞罗那.png"

// Barcelona photo wall — the real shots in /public/myworld主图/巴塞罗那.
const barcelonaPhotos = [
  "IMG_8393 2.jpg",
  "IMG_8394.jpg",
  "IMG_8405.jpg",
  "IMG_8408.jpg",
  "IMG_8409.jpg",
  "IMG_8420.jpg",
  "IMG_8422.jpg",
].map((f) => ({ src: `/myworld主图/巴塞罗那/${f}`, alt: "Barcelona" }))

// Munich has no photo folder yet — placeholder wall from /public/gallery until you add one.
const munichPhotos = ["weatherpets", "slowfood", "tide", "hmi", "abcmouse", "codemao"].map((n) => ({
  src: `/gallery/${n}.jpg`,
  alt: "Munich",
}))

export const places = [
  {
    id: "munich",
    place: "Munich",
    country: "Germany",
    year: "2024",
    lat: 48.14,
    lng: 11.58,
    coords: "48.14° N, 11.58° E",
    caption: "The city I now wake up in.", // optional one-liner
    cover: COVER_MUNICH,
    photos: [{ src: COVER_MUNICH, alt: "Munich" }, ...munichPhotos],
  },
  {
    id: "barcelona",
    place: "Barcelona",
    country: "Spain",
    year: "2023",
    lat: 41.39,
    lng: 2.17,
    coords: "41.39° N, 2.17° E",
    caption: null, // no one-liner — shows just the name on hover
    cover: COVER_BARCELONA,
    photos: [{ src: COVER_BARCELONA, alt: "Barcelona" }, ...barcelonaPhotos],
  },
]

export const intro = "Every place I've been became a piece of the world I carry."

// Scattered-images page — these get strewn across the canvas and connected, in this
// order, by the white line starting from the top-left corner. Reorder freely.
// `w` is the base display width in px; heights follow each image's natural ratio.
export const worldImages = [
  { id: "dongguan", name: "东莞", src: "/myworld主图/1东莞.png", w: 150 },
  { id: "guangzhou", name: "广州", src: "/myworld主图/2广州.png", w: 150 },
  { id: "beijing", name: "北京", src: "/myworld主图/3北京.png", w: 150 },
  { id: "rome", name: "罗马", src: "/myworld主图/4罗马.png", w: 150 },
  { id: "milan", name: "米兰", src: "/myworld主图/5米兰.png", w: 170 },
  { id: "barcelona", name: "巴塞罗那", src: "/myworld主图/巴塞罗那.png", w: 140 },
  { id: "munich", name: "慕尼黑", src: "/myworld主图/慕尼黑.png", w: 150 },
]
