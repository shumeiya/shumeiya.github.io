export const profile = {
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
  { name: "ABC Mouse", tag: "Tencent · Learning UX", image: "/gallery/abcmouse.jpg", color: "var(--color-ac-orange)" },
  { name: "TIDE", tag: "App Design System", image: "/gallery/tide.jpg", color: "var(--color-ac-blue)" },
  { name: "Slow Food", tag: "Brand / Web Design", image: "/gallery/slowfood.jpg", color: "var(--color-ac-green)" },
  { name: "HMI", tag: "Granstudio · Automotive", image: "/gallery/hmi.jpg", color: "var(--color-ac-red)" },
  { name: "CodeMao", tag: "Platform Design", image: "/gallery/codemao.jpg", color: "var(--color-ac-pink)" },
  { name: "Weather Pets", tag: "wetter.com · App Concept", image: "/gallery/weatherpets.jpg", color: "var(--color-ac-orange)" },
  { name: "Puzzle Game", tag: "Gamification", image: "/gallery/puzzle.jpg", color: "var(--color-ac-green)" },
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
  { key: "hmi", label: "HMI" },
  { key: "brand", label: "Brand" },
  { key: "game", label: "Game" },
  { key: "product", label: "Product" },
]

// "size" drives the bento-grid span in MyProject.jsx — lg (2x2), wide (2x1), tall (1x2), sm (1x1).
export const projectList = [
  {
    name: "ABC Mouse",
    category: "UX/UI",
    categories: ["uxui"],
    description: "Educational app design for Tencent's ToC learning platform, built with a cross-border team.",
    image: "/gallery/abcmouse.jpg",
    color: "var(--color-ac-orange)",
    href: "#",
    size: "lg",
  },
  {
    name: "TIDE",
    category: "UX/UI",
    categories: ["uxui"],
    description: "App design system for a lifestyle platform, from component library to shipped screens.",
    image: "/gallery/tide.jpg",
    color: "var(--color-ac-blue)",
    href: "#",
    size: "tall",
  },
  {
    name: "Slow Food",
    category: "Brand",
    categories: ["brand"],
    description: "Brand and web design exploring a playful, ingredient-led visual identity.",
    image: "/gallery/slowfood.jpg",
    color: "var(--color-ac-green)",
    href: "#",
    size: "sm",
  },
  {
    name: "HMI Design",
    category: "HMI",
    categories: ["hmi"],
    description: "Automotive HMI interaction design at Granstudio, for an international design team.",
    image: "/gallery/hmi.jpg",
    color: "var(--color-ac-red)",
    href: "#",
    size: "sm",
  },
  {
    name: "CodeMao",
    category: "UX/UI",
    categories: ["uxui"],
    description: "Platform design for a ToB course management product at Dianmao Technology.",
    image: "/gallery/codemao.jpg",
    color: "var(--color-ac-pink)",
    href: "#",
    size: "wide",
  },
  {
    name: "Weather Pets",
    category: "UX/UI",
    categories: ["uxui"],
    description: "A playful weather app concept with animated companion pets, explored at wetter.com.",
    image: "/gallery/weatherpets.jpg",
    color: "var(--color-ac-orange)",
    href: "#",
    size: "sm",
  },
  {
    name: "Puzzle Game",
    category: "Game",
    categories: ["game"],
    description: "A jigsaw puzzle app with smooth, tactile interaction design.",
    image: "/gallery/puzzle.jpg",
    size: "sm",
    color: "var(--color-ac-green)",
    href: "#",
  },
  {
    name: "Fire Rescue Drone",
    category: "Product",
    categories: ["product"],
    description: "Industrial design concept for a rescue drone, from form study to rendered product shots.",
    image: "/gallery/firesystem.jpg",
    color: "var(--color-ac-green)",
    href: "#",
    size: "wide",
  },
]
