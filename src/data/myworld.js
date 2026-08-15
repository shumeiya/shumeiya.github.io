// "My World" — every place I've been became a piece of the world I carry.
// Photos are the primary layer; the one-line `caption` is an optional text layer
// (shown on hover, or pinned via the Captions toggle), never a forced structure.
//
// Covers currently reuse the two placeholder mains in /public/myworld主图.
// Inner photo walls reuse /public/gallery for now — swap `photos` per place later.

const MAIN_1 = "/myworld主图/image 1.png"
const MAIN_3 = "/myworld主图/image 3.png"

const GALLERY = [
  "/gallery/weatherpets.jpg",
  "/gallery/slowfood.jpg",
  "/gallery/tide.jpg",
  "/gallery/hmi.jpg",
  "/gallery/abcmouse.jpg",
  "/gallery/codemao.jpg",
  "/gallery/puzzle.jpg",
  "/gallery/firesystem.jpg",
]

// Pull a stable-looking subset of the gallery, cycling so every place differs a bit.
function wallFor(startIndex, count, cover) {
  const photos = [{ src: cover, alt: "cover" }]
  for (let i = 0; i < count; i++) {
    const src = GALLERY[(startIndex + i) % GALLERY.length]
    photos.push({ src, alt: `photo ${i + 1}` })
  }
  return photos
}

export const places = [
  {
    id: "kyoto",
    place: "Kyoto, Japan",
    year: "2023",
    coords: "35.0116° N, 135.7681° E",
    caption: "Quiet streets that taught me to slow down.",
    cover: MAIN_1,
    photos: wallFor(0, 6, MAIN_1),
  },
  {
    id: "turin",
    place: "Turin, Italy",
    year: "2021",
    coords: "45.0703° N, 7.6869° E",
    caption: "Where the years of studying became a home.",
    cover: MAIN_3,
    photos: wallFor(2, 5, MAIN_3),
  },
  {
    id: "munich",
    place: "Munich, Germany",
    year: "2024",
    coords: "48.1351° N, 11.5820° E",
    caption: "The city I now wake up in.",
    cover: MAIN_1,
    photos: wallFor(4, 6, MAIN_1),
  },
  {
    id: "shenzhen",
    place: "Shenzhen, China",
    year: "2017",
    coords: "22.5431° N, 114.0579° E",
    caption: "The first place that shaped how I see.",
    cover: MAIN_3,
    photos: wallFor(1, 5, MAIN_3),
  },
  {
    id: "lisbon",
    place: "Lisbon, Portugal",
    year: "2022",
    coords: "38.7223° N, 9.1393° W",
    caption: "Light on tiles, and a long afternoon.",
    cover: MAIN_1,
    photos: wallFor(3, 6, MAIN_1),
  },
  {
    id: "reykjavik",
    place: "Reykjavík, Iceland",
    year: "2023",
    coords: "64.1466° N, 21.9426° W",
    caption: "Emptiness that felt strangely full.",
    cover: MAIN_3,
    photos: wallFor(5, 5, MAIN_3),
  },
]

export const intro = "Every place I've been became a piece of the world I carry."
