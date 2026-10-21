// Interface copy — the strings that live in the layout rather than in the
// content files: nav, buttons, panel headers, labels. Content copy stays in
// /src/data next to the thing it describes.
import { tt } from "./t"

export const ui = {
  // Document
  siteTitle: tt("Shumei Zhang — Product & UX Designer", "张淑镁 — 产品与交互设计师"),

  // Nav
  navDashboard: tt("Dashboard", "主页"),
  navAbout: tt("About", "关于我"),
  navProjects: tt("Projects", "项目"),
  navStudies: tt("Studies", "阅读"),
  navMyWorld: tt("My world", "我的世界"),
  navHome: tt("Back to dashboard", "返回主页"),
  toggleTheme: tt("Toggle dark mode", "切换深色模式"),
  toggleLang: tt("Switch language", "切换语言"),
  langEn: tt("English", "English"),
  langZh: tt("中文", "中文"),

  // Dashboard panels
  hello: tt("Hello", "你好"),
  helloAria: tt("About Shumei Zhang", "关于张淑镁"),
  panelMyWorld: tt("MY WORLD", "我的世界"),
  panelProjects: tt("PROJECTS", "项目"),
  panelSkill: tt("SKILL", "技能"),
  panelStatus: tt("STATUS.LOG", "状态日志"),
  viewAll: tt("View all", "查看全部"),
  inProgress: tt("in progress", "进行中"),
  hoverAProject: tt("hover a project", "悬停查看项目"),
  previewComingSoon: tt("preview coming soon", "预览即将上线"),

  // Projects reel (/project)
  badgeNew: tt("New", "最新"),
  viewCaseStudy: tt("View Case Study", "查看案例"),
  othersLead: tt(
    "Four of the projects I keep coming back to. The rest of the shelf — early work, side projects and studies — lives in the archive.",
    "这是我最常回看的四个项目。其余的——早期作品、个人项目与研究——都收在归档里。"
  ),
  seeOthers: tt("See others", "查看其他"),

  // Archive (/project/all)
  allProjects: tt("All projects", "全部项目"),

  // Case study (/project/:slug)
  labelRole: tt("Role", "角色"),
  labelCategory: tt("Category", "类别"),
  nextProject: tt("Next project", "下一个项目"),
  sectionIndex: tt("Section index", "章节目录"),
  // Alt text for the Spec board's thumbnails: each one is a picture of a page of
  // the written specification, which is not apparent from the image itself.
  specPage: tt("A page of the design specification", "设计规范的一页"),
  // Shown under a figure that is wider than the column it is read in.
  scrollSideways: tt("Scroll sideways to see the whole board", "左右滑动查看完整图板"),

  // About
  aboutExperience: tt("Work Experience", "工作经历"),
  aboutEducation: tt("Education", "教育背景"),
  aboutSkills: tt("Skills", "技能工具"),
  aboutCta: tt("Go to see my project", "来看看我的项目"),
  selfIntro: tt("self introduction", "自我介绍"),

  // My world
  back: tt("Back", "返回"),
  gallery: tt("Image accordion gallery", "图片手风琴画廊"),

  // Misc
  comingSoon: tt("coming soon", "敬请期待"),
}

// Calendar labels for the STATUS.LOG heat-map.
export const months = [
  tt("Jan", "1月"),
  tt("Feb", "2月"),
  tt("Mar", "3月"),
  tt("Apr", "4月"),
  tt("May", "5月"),
  tt("Jun", "6月"),
  tt("Jul", "7月"),
  tt("Aug", "8月"),
]

export const dayLabels = { 0: tt("Mon", "一"), 2: tt("Wed", "三"), 4: tt("Fri", "五") }
