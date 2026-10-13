// Featured works — the reel the /project page walks through, one screenful per
// project. Order and cast live here: swap a slug in `featured` to re-cast the
// reel; name, colour and detail link are pulled from projectList so nothing forks.
import { projectList } from "./project"

const featured = ["kyrall", "weather-pets", "codemao", "abc-mouse"]

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
  kyrall: [
    { label: "Automating design for the physical world", size: "xl", shots: ["/project/kyrall/121.png"] },
    // Same dashboard in both themes — one exhibit, so one panel and one caption.
    {
      label: "Dashboard — dark & light",
      size: "xl",
      shots: ["/project/kyrall/122.png", "/project/kyrall/123.png"],
    },
    { label: "Model editor + AI edit", size: "xl", shots: ["/project/kyrall/62.png"] },
  ],
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
  codemao: [
    { label: "Codemao CMS — course management for schools and training institutions", size: "xl", shots: ["/project/codemao/1.jpg"] },
    { label: "The platform in use", size: "xl", shots: ["/gallery/detail/codemao-mockup.jpg"] },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "Codemao",
      title: "Three weeks, P0 only",
      body: "The framework was tangled and the platform had to be in schools before September. So the work was a prioritised set of changes that leave the structure standing — triage, not a redesign.",
    },
    { label: "Super Courseware — editable templates and a simplified teaching flow", size: "xl", shots: ["/project/codemao/5.jpg"] },
    { label: "Structure and feature access, reorganised", size: "xl", shots: ["/project/codemao/9.jpg"] },
    { label: "Courseware types — image, slideshow, video, built-in tools", size: "lg", shots: ["/project/codemao/ui-a.jpg"] },
  ],
  "abc-mouse": [
    { label: "ABC Mouse — learning games for children aged 3-8", size: "xl", shots: ["/project/abc-mouse/hero.jpg"] },
    {
      label: "Before — ABCmouse (US). Now — the Chinese edition.",
      size: "xl",
      shots: ["/project/abc-mouse/1.jpg", "/project/abc-mouse/2.jpg"],
    },
    {
      kind: "note",
      tone: "accent",
      size: "md",
      eyebrow: "Tencent",
      title: "The same product, drawn twice",
      body: "A cross-border team: the American product on one side, the Chinese edition on the other, and a design language that had to hold across both.",
    },
    { label: "Frey, Amy and Sofia — who the activities are built for", size: "xl", shots: ["/project/abc-mouse/13.jpg"] },
    { label: "Each painpoint against its solution, before and after", size: "xl", shots: ["/project/abc-mouse/10.jpg"] },
    { label: "Child psychology and player types, resolved into gamification", size: "lg", shots: ["/project/abc-mouse/users.jpg"] },
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
