export const project = {
  name: "Shumei",
  fullName: "Shumei Zhang",
  role: "UX/UI Designer",
  tagline:
    "UX/UI Designer based in Munich, Germany — passionate about creating meaningful digital experiences at the intersection of technology and design.",
  location: "Munich, Germany",
  status: "Open to new projects",
  email: "hello@shumeizhang.design",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Instagram", href: "#" },
  ],
}

export const stats = [
  { label: "Years Designing", value: 8, suffix: "+" },
  { label: "Projects Shipped", value: 14, suffix: "" },
  { label: "Hours in Figma", value: 5320, suffix: "" },
  { label: "Cups of Tea", value: 999, suffix: "+" },
]

// Powers the "Design Time Spent" gauge — a career timeline compressed into an arc.
export const timeline = {
  hours: 5320,
  start: { year: 2017, city: "Shenzhen" },
  end: { year: 2026, city: "Munich" },
}

// Powers the "Design Skill Matrix" hexagon radar chart — 0-100 scale, edit scores here.
export const radarSkills = [
  { label: "UX & UI", score: 95 },
  { label: "Prototype", score: 90 },
  { label: "Vibe Coding", score: 70 },
  { label: "Data Research & Analysis", score: 75 },
  { label: "Design System", score: 80 },
  { label: "Product Thinking", score: 85 },
]

export const tools = [
  "Figma",
  "Protopie",
  "Webflow",
  "Adobe XD",
  "After Effects",
  "Photoshop",
  "Illustrator",
  "Rhino",
  "Blender",
]

// Real career path — Bachelor's in Shenzhen, Master's + Granstudio in Turin, wetter.com in Munich.
export const experience = [
  { city: "Shenzhen, China", year: "2017", lat: 22.5431, lng: 114.0579, coords: "22.5431° N, 114.0579° E" },
  { city: "Turin, Italy", year: "2021", lat: 45.0703, lng: 7.6869, coords: "45.0703° N, 7.6869° E" },
  { city: "Munich, Germany", year: "2024", lat: 48.1351, lng: 11.5820, coords: "48.1351° N, 11.5820° E" },
]

export const galleryProjects = [
  { name: "Kyrall Web App", slug: "kyrall", tag: "ai tool", image: "/project/kyrall/1.png", color: "var(--color-ac-blue)" },
  { name: "Weather Pets", slug: "weather-pets", tag: "wetter.com · App Concept", image: "/gallery/weatherpets.jpg", color: "var(--color-ac-orange)" },
  { name: "Slow Food", slug: "slow-food", tag: "Service / System Design", image: "/gallery/slowfood.jpg", color: "var(--color-ac-green)" },
  { name: "HMI", slug: "hmi", tag: "Automotive · HMI", image: "/gallery/hmi.jpg", color: "var(--color-ac-red)" },
  { name: "ABC Mouse", slug: "abc-mouse", tag: "Tencent · Learning UX", image: "/gallery/abcmouse.jpg", color: "var(--color-ac-orange)" },
  { name: "CodeMao", slug: "codemao", tag: "Platform Design", image: "/gallery/codemao.jpg", color: "var(--color-ac-pink)" },
  { name: "Puzzle Game", slug: "puzzle-game", tag: "Gamification", image: "/gallery/puzzle.jpg", color: "var(--color-ac-green)" },
]

export const projects = galleryProjects.map((p) => ({
  name: p.name,
  tag: p.tag,
  color: p.color,
  href: "#",
}))

export const projectCategories = [
  { key: "all", label: "All" },
  { key: "uxui", label: "UX/UI" },
  { key: "ai", label: "AI Product" },
  { key: "hmi", label: "HMI" },
  { key: "product", label: "Product" },
]

// "size" drives the bento-grid span in MyProject.jsx — lg (2x2), wide (2x1), tall (1x2), sm (1x1).
/**
 * Archive bento grid (ProjectArchive.jsx).
 *
 * `shape` picks the tile: "lg" = a 2x2 wide cover for the meaty projects,
 * "sm" = the same ratio at 1x1, "portrait" = a 1x2 phone-shaped cover for the
 * mobile-first work. `cover` overrides `image` when the card needs a portrait
 * crop the landscape hero can't give.
 *
 * `place` pins the tile on the 4-column desktop grid, which is three bands of
 * two rows. Every band holds one big cover, one phone and two small covers, but
 * in a different arrangement, so neither a row nor a column ever repeats the
 * same shape twice running:
 *
 *   rows 1-2   big . .   phone   small / small
 *   rows 3-4   small     phone   big . .
 *              small
 *   rows 5-6   phone     big . .         small / small
 *
 * Below lg the grid drops to two columns and places the tiles itself, so the
 * source order below is the reading order: left to right, top to bottom.
 */
export const projectList = [
  {
    name: "Kyrall Web App",
    slug: "kyrall",
    category: "AI Product",
    categories: ["ai"],
    description: "An AI tool that takes an idea from concept to a manufacturable model in minutes.",
    image: "/project/kyrall/1.png",
    color: "var(--color-ac-blue)",
    href: "/project/kyrall",
    shape: "lg",
    place: "lg:col-start-1 lg:row-start-1",
  },
  {
    name: "Weather Pets",
    slug: "weather-pets",
    category: "UX/UI",
    categories: ["uxui"],
    description: "A playful weather app concept with animated companion pets, explored at wetter.com.",
    image: "/gallery/weatherpets.jpg",
    // Phone cropped out of the landscape hero — the app is mobile-only.
    cover: "/gallery/covers/weatherpets-portrait.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/weather-pets",
    shape: "portrait",
    place: "lg:col-start-3 lg:row-start-1",
  },
  {
    name: "TIDE",
    slug: "tide",
    category: "UX/UI",
    categories: ["uxui"],
    description: "App design system for a lifestyle platform, from component library to shipped screens.",
    image: "/gallery/tide.jpg",
    color: "var(--color-ac-blue)",
    href: "/project/tide",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-1",
  },
  {
    name: "CodeMao",
    slug: "codemao",
    category: "UX/UI",
    categories: ["uxui"],
    description: "Upgrading the ToB CMS platform schools use to run Codemao programming courses.",
    image: "/gallery/codemao.jpg",
    color: "var(--color-ac-pink)",
    href: "/project/codemao",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-2",
  },
  {
    name: "Fire Rescue Drone",
    slug: "fire-rescue-drone",
    category: "Product",
    categories: ["product"],
    description: "Industrial design concept for a rescue drone, from form study to rendered product shots.",
    image: "/gallery/firesystem.jpg",
    color: "var(--color-ac-green)",
    href: "/project/fire-rescue-drone",
    shape: "sm",
    place: "lg:col-start-1 lg:row-start-3",
  },
  {
    name: "Slow Food",
    slug: "slow-food",
    category: "UX/UI",
    categories: ["uxui"],
    description: "Reviving a Slow Food restaurant in Bra with an app for virtual planting and offline activities.",
    image: "/gallery/slowfood.jpg",
    // Shipped app screen — already phone-shaped, no crop needed.
    cover: "/gallery/works/slow-food/screen-26.jpg",
    color: "var(--color-ac-green)",
    href: "/project/slow-food",
    shape: "portrait",
    place: "lg:col-start-2 lg:row-start-3",
  },
  {
    name: "ABC Mouse",
    slug: "abc-mouse",
    category: "UX/UI",
    categories: ["uxui"],
    description: "Educational app design for Tencent's ToC learning platform, built with a cross-border team.",
    image: "/gallery/abcmouse.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/abc-mouse",
    shape: "lg",
    place: "lg:col-start-3 lg:row-start-3",
  },
  {
    name: "Guido Gobino",
    slug: "gobino",
    category: "Product",
    categories: ["product"],
    description: "Systemic design for a Turin chocolate maker — closing its material flows.",
    image: "/project/gobino/1.jpg",
    color: "var(--color-ac-red)",
    href: "/project/gobino",
    shape: "sm",
    place: "lg:col-start-1 lg:row-start-4",
  },
  {
    name: "Puzzle Game",
    slug: "puzzle-game",
    category: "UX/UI",
    categories: ["uxui"],
    description: "A jigsaw puzzle app with smooth, tactile interaction design.",
    image: "/gallery/puzzle.jpg",
    // Phone cropped out of the two-device mockup.
    cover: "/gallery/covers/puzzle-portrait.jpg",
    color: "var(--color-ac-green)",
    href: "/project/puzzle-game",
    shape: "portrait",
    place: "lg:col-start-1 lg:row-start-5",
  },
  {
    name: "HMI Design",
    slug: "hmi",
    category: "HMI",
    categories: ["hmi"],
    description: "Designing the handover from manual to autonomous driving mode, prototyped in ProtoPie.",
    image: "/gallery/hmi.jpg",
    color: "var(--color-ac-red)",
    href: "/project/hmi",
    shape: "lg",
    place: "lg:col-start-2 lg:row-start-5",
  },
  {
    name: "E-Pack",
    slug: "e-pack",
    category: "Product",
    categories: ["product"],
    description: "Master's thesis — smart packaging as a way to enhance Made in Italy fashion.",
    image: "/project/e-pack/cover.jpg",
    color: "var(--color-ac-green)",
    href: "/project/e-pack",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-5",
  },
  {
    name: "Place Life",
    slug: "stationery",
    category: "Product",
    categories: ["product"],
    description: "Desk stationery built from the Four Treasures of the Study and Chinese mortise-and-tenon joints.",
    image: "/project/stationery/hero.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/stationery",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-6",
  },
]
