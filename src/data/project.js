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
  { name: tt("Kyrall Web App", "Kyrall 网页应用"), slug: "kyrall", tag: tt("AI CAD Modeling", "AI 建模工具"), image: "/project/kyrall/1.png", color: "var(--color-ac-green)" },
  { name: tt("Weather Pets", "天气宠物"), slug: "weather-pets", tag: tt("AI Weather APP", "AI 天气应用"), image: "/project/weatherpets/1.png", color: "var(--color-white)" },
  { name: tt("CodeMao", "编程猫"), slug: "codemao", tag: tt("ToB Platform Design", "B端平台设计"), image: "/project/codemao/cover.jpg", color: "var(--color-ac-blue)" },
  { name: tt("ABC Mouse", "ABC Mouse"), slug: "abc-mouse", tag: tt("Tencent ·Online Education", "腾讯 · 在线教育"), image: "/project/abc-mouse/cover.jpg", color: "var(--color-ac-white)" },
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

/**
 * The archive (ProjectArchive.jsx) — an even grid of 16:9 covers, in this
 * order: left to right, top to bottom.
 *
 * `image` is the project's landscape hero and is what the card shows. `cover`
 * swaps in another picture where the hero is the wrong shape for a 16:9 frame,
 * and `coverPosition` (a CSS object-position) moves the crop where the subject
 * is off-centre. `description` is the two-line blurb under the title.
 */
export const projectList = [
  {
    name: tt("Kyrall Web App", "Kyrall 网页应用"),
    slug: "kyrall",
    category: tt("AI Product", "AI 产品"),
    categories: ["ai", "uxui"],
    description: tt(
      "An AI tool that takes an idea from concept to a manufacturable model in minutes.",
      "一个 AI 工具：把一个想法在几分钟内，从概念推进到可直接制造的模型。"
    ),
    image: "/project/kyrall/1.png",
    color: "var(--color-kyrall)",
    href: "/project/kyrall",
  },
  {
    name: tt("Weather Pets", "天气宠物"),
    slug: "weather-pets",
    category: tt("AI Product", "AI 产品"),
    categories: ["ai", "uxui"],
    description: tt(
      "A playful weather app concept with animated companion pets, explored at wetter.com.",
      "在 wetter.com 探索的天气应用概念 —— 用会动的陪伴宠物，让查天气变成一件想做的事。"
    ),
    image: "/gallery/weatherpets.jpg",
    // Same artwork as the gallery image, which is only 640px wide: this is the
    // full-resolution copy the project's strip on /project opens with.
    cover: "/project/weatherpets/1.png",
    color: "var(--color-ac-orange)",
    href: "/project/weather-pets",
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
    // The gallery image is 640px wide and soft at card size; this is the
    // opening panel of the project's strip on /project, at full resolution.
    cover: "/project/codemao/1.png",
    color: "var(--color-ac-pink)",
    href: "/project/codemao",
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
    // Nearly square, with the drone in the upper half.
    coverPosition: "50% 10%",
    color: "var(--color-ac-green)",
    href: "/project/fire-rescue-drone",
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
    color: "var(--color-ac-green)",
    href: "/project/slow-food",
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
    // The gallery image is 640px wide and soft at card size. This is the same
    // scene at 1920px with the Chinese lettering (「启蒙英语 就上腾讯开心鼠」),
    // which is the banner as it shipped; 1.png is the unlettered scene the
    // detail page's hero uses.
    cover: "/project/abc-mouse/cover.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/abc-mouse",
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
    color: "var(--color-ac-green)",
    href: "/project/puzzle-game",
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
    // The hero is a 3.5:1 banner; this is the box itself, opened along its joints.
    cover: "/project/stationery/p2.jpg",
    color: "var(--color-ac-orange)",
    href: "/project/stationery",
  },
]
