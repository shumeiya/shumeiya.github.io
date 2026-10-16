// Featured works — the reel the /project page walks through, one screenful per
// project. Order and cast live here: swap a slug in `featured` to re-cast the
// reel; name, colour and detail link are pulled from projectList so nothing forks.
import { tt } from "../i18n/t"
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
      eyebrow: tt("Brand + Web", "品牌 + 网页"),
      title: tt("Ingredients as characters", "把食材画成角色"),
      body: tt(
        "Illustrated produce carries the identity from the mark through to every screen of the app.",
        "插画化的农产品，把品牌识别从标志一路带到 App 的每一屏。"
      ),
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
      eyebrow: tt("Granstudio", "Granstudio"),
      title: tt("Two screens, one system", "两块屏，一套系统"),
      body: tt(
        "Navigation, vehicle status and media laid out so the cluster and the centre display never contradict each other.",
        "导航、车辆状态与媒体的排布方式，让仪表盘与中控屏永远不会互相矛盾。"
      ),
    },
  ],
}

// The eyebrow line above each title and the lead paragraph under it. Written for
// this layout — the archive grid uses the shorter `description` from projectList.
const meta = {
  "kyrall": {
    year: tt("now", "进行中"),
    isNew: true,
    lead: tt(
      "Start building now from concept to manufacturable model in minutes.",
      "现在就开始动手：从概念到可直接制造的模型，只要几分钟。"
    ),
  },
  "weather-pets": {
    year: "2025",
    isNew: true,
    lead: tt(
      "A weather app concept built around an animated companion pet, whose mood and behaviour react to the forecast — so checking the weather becomes something you want to do.",
      "一个围绕会动的陪伴宠物展开的天气应用概念：它的心情与举动随预报变化 —— 于是查天气变成一件你愿意主动去做的事。"
    ),
  },
  codemao: {
    year: "2021",
    lead: tt(
      "A ToB platform upgrade at Codemao — the CMS schools and training institutions use to run programming courses, rebuilt around what teachers actually do with it.",
      "编程猫的 ToB 平台升级 —— 学校与培训机构用来开设编程课的后台系统，围绕老师真实的使用方式重做了一遍。"
    ),
  },
  "abc-mouse": {
    year: "2020",
    lead: tt(
      "Educational app design for Tencent's ToC learning platform, built with a cross-border team — gamified activities for 3-8 year olds, grounded in how children that age actually learn.",
      "为腾讯 ToC 教育平台做的学习 App 设计，与跨国团队共同完成 —— 面向 3-8 岁孩子的游戏化活动，建立在这个年龄真实的学习方式之上。"
    ),
  },
  "slow-food": {
    year: "2023",
    lead: tt(
      "Brand and web design for Slow Food, built around a playful, ingredient-led visual identity that runs from the mark through to the live site.",
      "为 Slow Food 做的品牌与网页设计：一套以食材为主角、带点俏皮的视觉识别，从标志一路延伸到上线的站点。"
    ),
  },
  hmi: {
    year: "2022",
    lead: tt(
      "Automotive HMI interaction design at Granstudio — navigation, vehicle status and media control laid out across the instrument cluster and the centre display.",
      "在 Granstudio 做的汽车 HMI 交互设计 —— 把导航、车辆状态与媒体控制，分布在仪表盘与中控屏之间。"
    ),
  },
}

export const featuredWorks = featured.map((slug) => {
  const project = projectList.find((p) => p.slug === slug)
  return { ...project, ...meta[slug], panels: panels[slug] ?? [] }
})
