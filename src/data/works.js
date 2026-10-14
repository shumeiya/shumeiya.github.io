// Featured works — the reel the /project page walks through, one screenful per
// project. Order and cast live here: swap a slug in `featured` to re-cast the
// reel; name, colour and detail link are pulled from projectList so nothing forks.
import { projectList } from "./project"

const featured = ["kyrall", "weather-pets", "codemao", "abc-mouse"]

// Each project's strip is a row of big rounded panels that loops forever. Every
// panel is the same 16:9 frame, so the row keeps one rhythm whatever is in it.
//   shots — the screens inside, filling the frame; several in one panel split it
//           into equal columns and each fills its own
// A `note` panel is a short text plate, used to break up the run of images:
//   tone  — "surface" (neutral) or "accent" (the project's colour)
// Screens under /gallery/works/ came from the 2025 project files.
const panels = {
  kyrall: [
    { shots: ["/project/kyrall/1.png"] },
    { shots: ["/project/kyrall/2.png"] },
    { shots: ["/project/kyrall/122.png"] },
    { shots: ["/project/kyrall/123.png"] },
    { shots: ["/project/kyrall/62.png"] },
  ],
  "weather-pets": [
    { shots: ["/project/weatherpets/1.png"] },
    { shots: ["/project/weatherpets/4.png"] },
    { shots: ["/project/weatherpets/3.png"] },
    { shots: ["/project/weatherpets/5.png"] },
  ],
  "slow-food": [
    { shots: ["/gallery/slowfood.jpg"] },
    { shots: ["/gallery/detail/slowfood-mockup.jpg"] },
    { shots: ["/gallery/works/slow-food/screen-28.jpg", "/gallery/works/slow-food/screen-27.jpg"] },
    {
      shots: [
        "/gallery/works/slow-food/screen-24.jpg",
        "/gallery/works/slow-food/screen-25.jpg",
        "/gallery/works/slow-food/screen-26.jpg",
      ],
    },
    {
      shots: [
        "/gallery/works/slow-food/screen-30.jpg",
        "/gallery/works/slow-food/screen-32.jpg",
        "/gallery/works/slow-food/screen-33.jpg",
      ],
    },
    {
      kind: "note",
      tone: "accent",
      eyebrow: "Brand + Web",
      title: "Ingredients as characters",
      body: "Illustrated produce carries the identity from the mark through to every screen of the app.",
    },
  ],
  codemao: [
    { shots: ["/project/codemao/1.png"] },
    { shots: ["/project/codemao/2.png"] },
    { shots: ["/project/codemao/7.png"] },
    { shots: ["/project/codemao/4.png"] },
    { shots: ["/project/codemao/5.png"] },
  ],
  "abc-mouse": [
    { shots: ["/project/abc-mouse/new_banner.webp"] },
    { shots: ["/project/abc-mouse/hero.jpg"] },
    { shots: ["/project/abc-mouse/11.png"] },
  ],
  hmi: [
    { shots: ["/gallery/hmi.jpg"] },
    { shots: ["/gallery/detail/hmi-mockup.jpg"] },
    { shots: ["/gallery/works/hmi/personas.jpg"] },
    { shots: ["/gallery/works/hmi/nav-states.jpg"] },
    { shots: ["/gallery/works/hmi/driving-modes.jpg"] },
    {
      kind: "note",
      tone: "accent",
      eyebrow: "Granstudio",
      title: "Two screens, one system",
      body: "Navigation, vehicle status and media laid out so the cluster and the centre display never contradict each other.",
    },
  ],
}

// The eyebrow line above each title and the lead paragraph under it. Written for
// this layout — the archive grid uses the shorter `description` from projectList.
const meta = {
  "kyrall": {
    year: "now",
    isNew: true,
    lead: "Start building now from concept to manufacturable model in minutes.",
  },
  "weather-pets": {
    year: "2025",
    isNew: true,
    lead: "A weather app concept built around an animated companion pet, whose mood and behaviour react to the forecast — so checking the weather becomes something you want to do.",
  },
  codemao: {
    year: "2021",
    lead: "A ToB platform upgrade at Codemao — the CMS schools and training institutions use to run programming courses, rebuilt around what teachers actually do with it.",
  },
  "abc-mouse": {
    year: "2020",
    lead: "Educational app design for Tencent's ToC learning platform, built with a cross-border team — gamified activities for 3-8 year olds, grounded in how children that age actually learn.",
  },
  "slow-food": {
    year: "2023",
    lead: "Brand and web design for Slow Food, built around a playful, ingredient-led visual identity that runs from the mark through to the live site.",
  },
  hmi: {
    year: "2022",
    lead: "Automotive HMI interaction design at Granstudio — navigation, vehicle status and media control laid out across the instrument cluster and the centre display.",
  },
}

export const featuredWorks = featured.map((slug) => {
  const project = projectList.find((p) => p.slug === slug)
  return { ...project, ...meta[slug], panels: panels[slug] ?? [] }
})
