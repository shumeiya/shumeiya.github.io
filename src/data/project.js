import { tt } from "../i18n/t"

export const project = {
  name: "Shumei",
  fullName: tt("Shumei Zhang", "张淑镁"),
  role: tt("UX/UI Designer", "UX/UI 设计师"),
  tagline: tt(
    "UX/UI Designer based in Munich, Germany — passionate about creating meaningful digital experiences at the intersection of technology and design.",
    "现居德国慕尼黑的 UX/UI 设计师 —— 热衷于在技术与设计的交汇处，做出真正有意义的数字体验。"
  ),
  location: tt("Munich, Germany", "德国 慕尼黑"),
  status: tt("Open to new projects", "正在寻找新的项目机会"),
  email: "hello@shumeizhang.design",
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Instagram", href: "#" },
  ],
}

export const stats = [
  { label: tt("Years Designing", "设计年限"), value: 8, suffix: "+" },
  { label: tt("Projects Shipped", "交付项目"), value: 14, suffix: "" },
  { label: tt("Hours in Figma", "Figma 小时数"), value: 5320, suffix: "" },
  { label: tt("Cups of Tea", "喝过的茶"), value: 999, suffix: "+" },
]

// Powers the "Design Time Spent" gauge — a career timeline compressed into an arc.
export const timeline = {
  hours: 5320,
  start: { year: 2017, city: tt("Shenzhen", "深圳") },
  end: { year: 2026, city: tt("Munich", "慕尼黑") },
}

// Powers the "Design Skill Matrix" hexagon radar chart — 0-100 scale, edit scores here.
export const radarSkills = [
  { label: tt("UX & UI", "用户体验与界面"), score: 95 },
  { label: tt("Prototype", "原型设计"), score: 90 },
  { label: tt("Vibe Coding", "AI 编程"), score: 70 },
  { label: tt("Data Research & Analysis", "数据研究与分析"), score: 75 },
  { label: tt("Design System", "设计系统"), score: 80 },
  { label: tt("Product Thinking", "产品思维"), score: 85 },
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
  { city: tt("Shenzhen, China", "中国 深圳"), year: "2017", lat: 22.5431, lng: 114.0579, coords: "22.5431° N, 114.0579° E" },
  { city: tt("Turin, Italy", "意大利 都灵"), year: "2021", lat: 45.0703, lng: 7.6869, coords: "45.0703° N, 7.6869° E" },
  { city: tt("Munich, Germany", "德国 慕尼黑"), year: "2024", lat: 48.1351, lng: 11.5820, coords: "48.1351° N, 11.5820° E" },
]

export const galleryProjects = [
  { name: tt("Kyrall Web App", "Kyrall 网页应用"), slug: "kyrall", tag: tt("ai tool", "AI 工具"), image: "/project/kyrall/1.png", color: "var(--color-ac-blue)" },
  { name: tt("Weather Pets", "天气宠物"), slug: "weather-pets", tag: tt("wetter.com · App Concept", "wetter.com · 应用概念"), image: "/gallery/weatherpets.jpg", color: "var(--color-ac-orange)" },
  { name: tt("Slow Food", "慢食 Slow Food"), slug: "slow-food", tag: tt("Service / System Design", "服务 / 系统设计"), image: "/gallery/slowfood.jpg", color: "var(--color-ac-green)" },
  { name: tt("HMI", "车机 HMI"), slug: "hmi", tag: tt("Automotive · HMI", "汽车 · 人机交互"), image: "/gallery/hmi.jpg", color: "var(--color-ac-red)" },
  { name: tt("ABC Mouse", "ABC Mouse"), slug: "abc-mouse", tag: tt("Tencent · Learning UX", "腾讯 · 教育体验"), image: "/gallery/abcmouse.jpg", color: "var(--color-ac-orange)" },
  { name: tt("CodeMao", "编程猫"), slug: "codemao", tag: tt("Platform Design", "平台设计"), image: "/gallery/codemao.jpg", color: "var(--color-ac-pink)" },
  { name: tt("Puzzle Game", "拼图游戏"), slug: "puzzle-game", tag: tt("Gamification", "游戏化设计"), image: "/gallery/puzzle.jpg", color: "var(--color-ac-green)" },
]

export const projects = galleryProjects.map((p) => ({
  name: p.name,
  tag: p.tag,
  color: p.color,
  href: "#",
}))

export const projectCategories = [
  { key: "all", label: tt("All", "全部") },
  { key: "uxui", label: tt("UX/UI", "UX/UI") },
  { key: "ai", label: tt("AI Product", "AI 产品") },
  { key: "hmi", label: tt("HMI", "HMI") },
  { key: "product", label: tt("Product", "产品") },
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
    name: tt("Kyrall Web App", "Kyrall 网页应用"),
    slug: "kyrall",
    category: tt("AI Product", "AI 产品"),
    categories: ["ai"],
    description: tt(
      "An AI tool that takes an idea from concept to a manufacturable model in minutes.",
      "一个 AI 工具：把一个想法在几分钟内，从概念推进到可直接制造的模型。"
    ),
    image: "/project/kyrall/1.png",
    color: "var(--color-ac-blue)",
    href: "/project/kyrall",
    shape: "lg",
    place: "lg:col-start-1 lg:row-start-1",
  },
  {
    name: tt("Weather Pets", "天气宠物"),
    slug: "weather-pets",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "A playful weather app concept with animated companion pets, explored at wetter.com.",
      "在 wetter.com 探索的天气应用概念 —— 用会动的陪伴宠物，让查天气变成一件想做的事。"
    ),
    image: "/gallery/weatherpets.jpg",
    // Phone cropped out of the landscape hero — the app is mobile-only.
    cover: "/gallery/covers/weatherpets-portrait.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/weather-pets",
    shape: "portrait",
    place: "lg:col-start-3 lg:row-start-1",
  },
  {
    name: tt("TIDE", "TIDE"),
    slug: "tide",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "App design system for a lifestyle platform, from component library to shipped screens.",
      "生活方式平台的 App 设计系统，从组件库一路做到上线页面。"
    ),
    image: "/gallery/tide.jpg",
    color: "var(--color-ac-blue)",
    href: "/project/tide",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-1",
  },
  {
    name: tt("CodeMao", "编程猫"),
    slug: "codemao",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "Upgrading the ToB CMS platform schools use to run Codemao programming courses.",
      "升级学校用来开设编程猫编程课的 ToB 后台管理平台。"
    ),
    image: "/gallery/codemao.jpg",
    color: "var(--color-ac-pink)",
    href: "/project/codemao",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-2",
  },
  {
    name: tt("Fire Rescue Drone", "消防救援无人机"),
    slug: "fire-rescue-drone",
    category: tt("Product", "产品"),
    categories: ["product"],
    description: tt(
      "Industrial design concept for a rescue drone, from form study to rendered product shots.",
      "救援无人机的工业设计概念，从形态研究一直做到产品渲染图。"
    ),
    image: "/gallery/firesystem.jpg",
    color: "var(--color-ac-green)",
    href: "/project/fire-rescue-drone",
    shape: "sm",
    place: "lg:col-start-1 lg:row-start-3",
  },
  {
    name: tt("Slow Food", "慢食 Slow Food"),
    slug: "slow-food",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "Reviving a Slow Food restaurant in Bra with an app for virtual planting and offline activities.",
      "用一个结合虚拟种植与线下活动的 App，让布拉的慢食餐厅重新活起来。"
    ),
    image: "/gallery/slowfood.jpg",
    // Shipped app screen — already phone-shaped, no crop needed.
    cover: "/gallery/works/slow-food/screen-26.jpg",
    color: "var(--color-ac-green)",
    href: "/project/slow-food",
    shape: "portrait",
    place: "lg:col-start-2 lg:row-start-3",
  },
  {
    name: tt("ABC Mouse", "ABC Mouse"),
    slug: "abc-mouse",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "Educational app design for Tencent's ToC learning platform, built with a cross-border team.",
      "为腾讯 ToC 教育平台做的儿童学习 App 设计，与跨国团队协作完成。"
    ),
    image: "/gallery/abcmouse.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/abc-mouse",
    shape: "lg",
    place: "lg:col-start-3 lg:row-start-3",
  },
  {
    name: tt("Guido Gobino", "Guido Gobino"),
    slug: "gobino",
    category: tt("Product", "产品"),
    categories: ["product"],
    description: tt(
      "Systemic design for a Turin chocolate maker — closing its material flows.",
      "为都灵一家巧克力品牌做的系统设计 —— 把它的物质流闭合起来。"
    ),
    image: "/project/gobino/1.jpg",
    color: "var(--color-ac-red)",
    href: "/project/gobino",
    shape: "sm",
    place: "lg:col-start-1 lg:row-start-4",
  },
  {
    name: tt("Puzzle Game", "拼图游戏"),
    slug: "puzzle-game",
    category: tt("UX/UI", "UX/UI"),
    categories: ["uxui"],
    description: tt(
      "A jigsaw puzzle app with smooth, tactile interaction design.",
      "一款拼图 App，交互顺滑、触感扎实。"
    ),
    image: "/gallery/puzzle.jpg",
    // Phone cropped out of the two-device mockup.
    cover: "/gallery/covers/puzzle-portrait.jpg",
    color: "var(--color-ac-green)",
    href: "/project/puzzle-game",
    shape: "portrait",
    place: "lg:col-start-1 lg:row-start-5",
  },
  {
    name: tt("HMI Design", "车机 HMI 设计"),
    slug: "hmi",
    category: tt("HMI", "HMI"),
    categories: ["hmi"],
    description: tt(
      "Designing the handover from manual to autonomous driving mode, prototyped in ProtoPie.",
      "设计手动驾驶与自动驾驶之间的接管过程，并用 ProtoPie 做成原型。"
    ),
    image: "/gallery/hmi.jpg",
    color: "var(--color-ac-red)",
    href: "/project/hmi",
    shape: "lg",
    place: "lg:col-start-2 lg:row-start-5",
  },
  {
    name: tt("E-Pack", "E-Pack"),
    slug: "e-pack",
    category: tt("Product", "产品"),
    categories: ["product"],
    description: tt(
      "Master's thesis — smart packaging as a way to enhance Made in Italy fashion.",
      "硕士毕业设计 —— 以智能包装为「意大利制造」的时尚产业加值。"
    ),
    image: "/project/e-pack/cover.jpg",
    color: "var(--color-ac-green)",
    href: "/project/e-pack",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-5",
  },
  {
    name: tt("Place Life", "置物生活"),
    slug: "stationery",
    category: tt("Product", "产品"),
    categories: ["product"],
    description: tt(
      "Desk stationery built from the Four Treasures of the Study and Chinese mortise-and-tenon joints.",
      "从文房四宝与中式榫卯出发，设计的一套桌面文具。"
    ),
    image: "/project/stationery/hero.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/stationery",
    shape: "sm",
    place: "lg:col-start-4 lg:row-start-6",
  },
]
