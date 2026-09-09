// Featured works — the reel the /project page walks through, one screenful per
// project. Order and cast live here: swap a slug in `featured` to re-cast the
// reel; name, colour and detail link are pulled from projectList so nothing forks.
import { projectList } from "./project"

const featured = ["weather-pets", "slow-food", "hmi", "tide"]

// Each project's strip is a row of big rounded panels that loops forever. A panel
// groups screens that belong together and captions them once, at the top — so a
// flow reads as one exhibit rather than a handful of loose cards.
//   label — the caption centred at the top of the panel
//   tone  — "surface" (neutral) or "accent" (the project's colour)
//   size  — how much of the viewport width the panel eats
//   shots — the screens inside, laid out in a row
// A `note` panel is a short text plate, used to break up the run of images.
// Screens under /gallery/works/ came from the 2025 project files; add more to a
// panel's `shots` array and it just gets wider.
const panels = {
  // Only one screen exists for this one so far — drop more paths into `shots`
  // (or add panels here) and it fills out like the others.
  "weather-pets": [
    { label: "Forecast + companion pet", size: "xl", shots: ["/gallery/weatherpets.jpg"] },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "wetter.com",
      title: "A forecast you'd want to open",
      body: "The pet's mood and behaviour follow the weather, so the daily check-in earns its place on the home screen.",
    },
    {
      kind: "note",
      size: "md",
      eyebrow: "Role",
      title: "Concept + interaction",
      body: "Explored inside the forecast team: concept, interaction design and the visual system.",
    },
  ],
  "slow-food": [
    { label: "Brand identity", size: "lg", shots: ["/gallery/slowfood.jpg"] },
    { label: "Site in use", size: "xl", shots: ["/gallery/detail/slowfood-mockup.jpg"] },
    {
      label: "Onboarding",
      size: "md",
      shots: ["/gallery/works/slow-food/screen-28.jpg", "/gallery/works/slow-food/screen-27.jpg"],
    },
    {
      label: "Plant & harvest tracking",
      size: "lg",
      shots: [
        "/gallery/works/slow-food/screen-24.jpg",
        "/gallery/works/slow-food/screen-25.jpg",
        "/gallery/works/slow-food/screen-26.jpg",
      ],
    },
    {
      label: "Recipes & restaurants",
      size: "lg",
      shots: [
        "/gallery/works/slow-food/screen-30.jpg",
        "/gallery/works/slow-food/screen-32.jpg",
        "/gallery/works/slow-food/screen-33.jpg",
      ],
    },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "Brand + Web",
      title: "Ingredients as characters",
      body: "Illustrated produce carries the identity from the mark through to every screen of the app.",
    },
  ],
  hmi: [
    { label: "Cluster + centre display", size: "lg", shots: ["/gallery/hmi.jpg"] },
    { label: "In the car", size: "xl", shots: ["/gallery/detail/hmi-mockup.jpg"] },
    { label: "Driver personas", size: "lg", shots: ["/gallery/works/hmi/personas.jpg"] },
    { label: "Navigation states", size: "xl", shots: ["/gallery/works/hmi/nav-states.jpg"] },
    { label: "Manual vs autonomous", size: "lg", shots: ["/gallery/works/hmi/driving-modes.jpg"] },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "Granstudio",
      title: "Two screens, one system",
      body: "Navigation, vehicle status and media laid out so the cluster and the centre display never contradict each other.",
    },
  ],
  tide: [
    { label: "Component library", size: "lg", shots: ["/gallery/tide.jpg"] },
    { label: "Shipped screens", size: "xl", shots: ["/gallery/detail/tide-mockup.jpg"] },
    { label: "Brand cover", size: "lg", shots: ["/gallery/works/tide/cover.jpg"] },
    { label: "Editorial pages", size: "md", shots: ["/gallery/works/tide/editorial.jpg"] },
    { label: "Site layouts", size: "xl", shots: ["/gallery/works/tide/pages.jpg"] },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "Design system",
      title: "Library and product in lockstep",
      body: "Built component by component, so the system and the shipped screens never drifted apart.",
    },
  ],
}

// The eyebrow line above each title and the lead paragraph under it. Written for
// this layout — the archive grid uses the shorter `description` from projectList.
const meta = {
  "weather-pets": {
    year: "2025",
    isNew: true,
    lead: "A weather app concept built around an animated companion pet, whose mood and behaviour react to the forecast — so checking the weather becomes something you want to do.",
  },
  "slow-food": {
    year: "2023",
    lead: "Brand and web design for Slow Food, built around a playful, ingredient-led visual identity that runs from the mark through to the live site.",
  },
  hmi: {
    year: "2022",
    lead: "Automotive HMI interaction design at Granstudio — navigation, vehicle status and media control laid out across the instrument cluster and the centre display.",
  },
  tide: {
    year: "2021",
    lead: "A design system for TIDE, a lifestyle app — component library and shipped screens designed together so the two never drifted apart.",
  },
}

export const featuredWorks = featured.map((slug) => {
  const project = projectList.find((p) => p.slug === slug)
  return { ...project, ...meta[slug], panels: panels[slug] ?? [] }
})
