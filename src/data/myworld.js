// "My World" — places I've been, pinned onto the world map.
// Each place: a photo marker on the map (cover), and a photo wall for the detail view.
// `caption` is an optional text layer — set it to a sentence to show one on hover,
// or leave it null/empty to show just the place name. Add more places by appending
// an entry with lat/lng; the map projects it automatically.

import { tt } from "../i18n/t"

const COVER_MUNICH = "/myworld主图/慕尼黑.png"
const COVER_BARCELONA = "/myworld主图/巴塞罗那.png"

// Barcelona photo wall — the real shots in /public/myworld主图/巴塞罗那.
const barcelonaPhotos = [
  "IMG_8344 2.jpg",
  "IMG_8347 2.jpg",
  "IMG_8348 2.jpg",
  "IMG_8352 2.jpg",
  "IMG_8354 2.jpg",
  "IMG_8359 2.jpg",
  "IMG_8396.jpg",
  "IMG_8398.jpg",
  "IMG_8405.jpg",
  "IMG_8406.jpg",
  "IMG_8407.jpg",
  "IMG_8408.jpg",
  "IMG_8409.jpg",
  "IMG_8416.jpg",
  "IMG_8420.jpg",
  "IMG_8422.jpg",
  "IMG_8442.jpg",
  "IMG_8447.jpg",
  "IMG_8448.jpg",
  "IMG_8538.jpg",
  "IMG_8671.jpg",
  "IMG_8699 2.jpg",
  "IMG_8895 2.jpg",
  "IMG_8922 2.jpg",
  "IMG_8970.jpg",
].map((f) => ({ src: `/myworld主图/巴塞罗那/${f}`, alt: tt("Barcelona", "巴塞罗那") }))

// Venice photo wall — the real shots in /public/myworld主图/威尼斯.
const venicePhotos = [
  "IMG_2136 2.jpg",
  "IMG_2141 2.jpg",
  "IMG_2155 2.jpg",
  "IMG_2175 2.jpg",
  "IMG_2202 2.jpg",
  "IMG_2535 2.jpg",
  "IMG_2883 2.jpg",
  "IMG_2890 2.jpg",
  "IMG_2895 2.jpg",
].map((f) => ({ src: `/myworld主图/威尼斯/${f}`, alt: tt("Venezia", "威尼斯") }))

// RaoPing photo wall — the real shots in /public/myworld主图/饶平.
const raopingPhotos = [
  "IMG_1791.JPG",
  "IMG_1802.JPG",
  "IMG_1813.JPG",
  "IMG_1876.JPG",
  "IMG_1903.JPG",
  "IMG_1905.JPG",
  "IMG_1916.JPG",
  "IMG_1944.JPG",
].map((f) => ({ src: `/myworld主图/饶平/${f}`, alt: tt("RaoPing", "饶平") }))

// Mittenwald photo wall — the real shots in /public/myworld主图/mitternwald.
const mittenwaldPhotos = [
  "IMG_2130.JPG",
  "IMG_2134.JPG",
  "IMG_2136.JPG",
  "IMG_2147.JPG",
  "IMG_2153.JPG",
  "IMG_2157.JPG",
  "IMG_2165.JPG",
  "IMG_2167.JPG",
  "IMG_2168.JPG",
].map((f) => ({ src: `/myworld主图/mitternwald/${f}`, alt: tt("Mittenwald", "米滕瓦尔德") }))

// Turin photo wall — the real shots in /public/myworld主图/都灵.
const turinPhotos = [
  "8FBF74AA-B5C1-48CE-A5D7-8778DBFD415F.JPG",
  "IMG_5077.jpg",
  "IMG_5082.jpg",
  "IMG_5102.jpg",
  "IMG_9931.jpg",
].map((f) => ({ src: `/myworld主图/都灵/${f}`, alt: tt("Turin", "都灵") }))

// Rothenburg photo wall — the real shots in /public/myworld主图/罗滕堡.
const rothenburgPhotos = [
  "IMG_2851.jpg",
  "IMG_2861.jpg",
  "IMG_2862.jpg",
  "IMG_2863.jpg",
  "IMG_2864.jpg",
  "IMG_2912.jpg",
  "IMG_2926.jpg",
  "IMG_2944.jpg",
  "IMG_2953.jpg",
  "IMG_2956.jpg",
].map((f) => ({ src: `/myworld主图/罗滕堡/${f}`, alt: tt("Rothenburg", "罗滕堡") }))

// Munich has no photo folder yet — placeholder wall from /public/gallery until you add one.
const munichPhotos = ["weatherpets", "slowfood", "tide", "hmi", "abcmouse", "codemao"].map((n) => ({
  src: `/gallery/${n}.jpg`,
  alt: tt("Munich", "慕尼黑"),
}))

export const places = [
  {
    id: "barcelona",
    place: tt("Barcelona", "巴塞罗那"),
    country: tt("Spain", "西班牙"),
    year: "2023",
    lat: 41.39,
    lng: 2.17,
    coords: "41.39° N, 2.17° E",
    caption: null, // no one-liner — shows just the name on hover
    cover: COVER_BARCELONA,
    photos: [{ src: COVER_BARCELONA, alt: tt("Barcelona", "巴塞罗那") }, ...barcelonaPhotos],
  },
]

export const intro = tt(
  "Every place I've been became a piece of the world I carry.",
  "我去过的每一个地方，都成了我随身带着的那个世界的一块。"
)

// Scattered-images page — these get strewn across the canvas and connected, in this
// order, by the white line starting from the top-left corner. Reorder freely.
// `w`       base display width in px; heights follow each image's natural ratio.
// `z`       (optional) stacking order for overlaps — bigger = in front (default 10).
// `caption` (optional) a sentence shown under the name on hover.
// `shadow`  (optional) set to false to remove the drop shadow.
// `hover`   (optional) set to false to disable hover (no zoom/label, mouse passes through).
// `x`       (optional) manual horizontal position, 0..1 of width — overrides even spacing.
// `photos`  (optional) array of {src, alt} — clicking the image opens a photo-wall page.
export const worldImages = [
  { id: "5", name: "", src: "/myworld主图/5.png", w: 120, z:5, shadow: false, hover: false },
  { id: "dongguan", name: tt("DongGuan", "东莞"), src: "/myworld主图/1东莞.png", w: 130, caption: tt("Where I grew up.", "我长大的地方。"),x: 0.22 },
  { id: "15", name: "", src: "/myworld主图/15.png", w: 140, z:5, shadow: false, hover: false,x: 0.32 },
  { id: "raoping", name: tt("RaoPing", "饶平"), src: "/myworld主图/2饶平.png", w: 200, caption: tt("My hometown", "我的故乡"),x: 0.46, photos: raopingPhotos  },
  // { id: "guangzhou", name: "GuangZhou", src: "/myworld主图/3广州.png", w: 160 },
  // { id: "panda", name: "", src: "/myworld主图/4熊猫.png", w: 330, z:5, shadow: false, hover: false },
  // { id: "chongqing", name: "ChongQing", src: "/myworld主图/5重庆.png", w: 140 },
  { id: "shenzhenu", name: tt("ShenZhen Uni", "深大"), src: "/myworld主图/6深大.png", w: 200, caption: tt("where the dream start", "梦开始的地方") },
  { id: "13", name: "", src: "/myworld主图/13.png", w: 140, z:5, shadow: false, hover: false },
  { id: "beijing", name: tt("Beijing", "北京"), src: "/myworld主图/7北京.png", w: 220 },
  { id: "turin", name: tt("Turin", "都灵"), src: "/myworld主图/8都灵.png", w: 160, z:5, caption: tt("The place where I don't want to go back", "最不想再回去的地方"), photos: turinPhotos  },
    { id: "4", name: "", src: "/myworld主图/4.png", w: 140, z:5, shadow: false, hover: false },
  { id: "rome", name: tt("Rome", "罗马"), src: "/myworld主图/9罗马.png", w: 160 },
  // { id: "milan", name: "Milan", src: "/myworld主图/10米兰.png", w: 160 },
  { id: "venice", name: tt("Venezia", "威尼斯"), src: "/myworld主图/11威尼斯.png", w: 160, photos: venicePhotos },
  { id: "barcelona", name: tt("Barcelona", "巴塞罗那"), src: "/myworld主图/12巴塞罗那.png", w: 140, photos: barcelonaPhotos },
  { id: "1", name: "", src: "/myworld主图/1.png", w: 120, z:5, shadow: false, hover: false },
  // { id: "hamburg", name: "Hamburg", src: "/myworld主图/13汉堡.png", w: 160, x: 0.22 },
  { id: "2", name: "", src: "/myworld主图/2.png", w: 120, z:5, shadow: false, hover: false  },
  { id: "rothenburg", name: tt("Rothenburg", "罗滕堡"), src: "/myworld主图/14罗滕堡.png", w: 160, photos: rothenburgPhotos  },
  { id: "3", name: "", src: "/myworld主图/3.png", w: 220, z:5, shadow: false, hover: false },
  { id: "mittenwald", name: tt("Mittenwald", "米滕瓦尔德"), src: "/myworld主图/15mittenwald.png", w: 160, photos: mittenwaldPhotos },
  { id: "munich", name: tt("Munich", "慕尼黑"), src: "/myworld主图/16慕尼黑.png", w: 165, caption: tt("The city I now wake up in.", "我现在每天醒来的城市。"), photos: munichPhotos },


]
