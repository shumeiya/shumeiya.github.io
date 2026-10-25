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
    year: tt("2026", "2026"),
    isAi: true,
    lead: tt(
      "Design and manufacture hardware at the speed of thought.",
      "AI时代的设计方式，用思维的速度建模"
    ),
  },
  "weather-pets": {
    year: "2025",
    isAi: true,
    lead: tt(
      "Transform your daily forecast into a fun, personalized experience with your own AI-powered weather buddy.",
      "今天的天气如何？让你的天气萌宠为你播报吧。"
    ),
  },
  codemao: {
    year: "2021",
    lead: tt(
      "ToB platform design for CodeMao,a digital management system and user operation tool for course data analysis, course management, and more.",
      "编程猫 B 端教育专用数字化管理后台系统与用户运营工具，用于课程数据分析、课程管理等"
    ),
  },
  "abc-mouse": {
    year: "2020",
    lead: tt(
      "Tencent's ABC Mouse is an online education platform for children aged 3-8, designed to help them learn and grow through short videos and mini-games in a fun way.",
      "腾讯开心鼠为3-8岁的儿童打造的在线教育平台，以短视频和小游戏的形式让小朋友在有趣的过程中学习成长。"
    ),
  },
}

export const featuredWorks = featured.map((slug) => {
  const project = projectList.find((p) => p.slug === slug)
  return { ...project, ...meta[slug], panels: panels[slug] ?? [] }
})
