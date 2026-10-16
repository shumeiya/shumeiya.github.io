// About-page content, carried over from the 2025 site's about page.
// Logos live in /public/about; the two résumés in /public/documents.
//
// Every line a reader sees is written as tt("English", "中文") — see src/i18n/t.js.
// The page resolves the whole tree once at the top, so the components below it
// still receive plain strings.
import { tt } from "../i18n/t"

export const intro = {
  name: tt("Shumei Zhang", "张淑镁"),
  role: tt("UX & UI Designer", "UX / UI 设计师"),
  video: "https://www.youtube.com/embed/GgV5PRF9mPs",
  resumes: [
    // `href` is kept ASCII and hyphenated — spaces, @ and CJK in a URL are
    // fragile across servers and CDNs. `file` is what the browser saves it as,
    // so the reader still gets a name they can read.
    {
      label: tt("Download resume (EN)", "下载英文简历"),
      href: "/documents/shumei-zhang-resume.pdf",
      file: "Shumei Zhang — Resume.pdf",
    },
    {
      label: tt("Download resume (CN)", "下载中文简历"),
      href: "/documents/shumei-zhang-resume-cn.pdf",
      file: "张淑镁 — 交互设计简历.pdf",
    },
  ],
}

// Schooling, from the same résumé and kept in the same shape as `experience`
// so one component can lay both of them out. Newest first here — the page does
// not reverse this one; the résumé already reads this way.
export const education = [
  {
    school: tt("Politecnico di Torino", "都灵理工大学"),
    degree: tt("MSc in Systemic Design", "系统设计 硕士"),
    place: tt("Turin, Italy", "意大利 都灵"),
    period: "2021.10 – 2024.07",
    details: [
      { label: tt("GPA", "成绩"), text: tt("91 / 100", "91 / 100") },
      {
        label: tt("Coursework", "主要课程"),
        text: tt(
          "Innovative Design, Human-Computer Interaction, Virtual Design, Product Component Design, System Design, Ecology, Economic Project Management.",
          "创新设计、人机交互、虚拟设计、产品零部件设计、系统设计、生态学、经济项目管理。"
        ),
      },
    ],
  },
  {
    school: tt("Shenzhen University", "深圳大学"),
    degree: tt("Bachelor in Industrial Design", "工业设计 学士"),
    place: tt("Shenzhen, China", "中国 深圳"),
    period: "2017.09 – 2021.07",
    details: [
      { label: tt("GPA", "成绩"), text: tt("93 / 100", "93 / 100") },
      {
        label: tt("Coursework", "主要课程"),
        text: tt(
          "Design Thinking, Fundamentals of Product Design, Design Thinking and Innovation for Smart Products, Product Design Methodology, Ergonomics.",
          "设计思维、产品设计基础、智能产品的设计思维与创新、产品设计方法学、人因工程学。"
        ),
      },
    ],
  },
]

// Work history, transcribed from the current résumé. Oldest first — the page
// reverses it so the newest post is W/001, the way the reference ledger counts.
// `details` are the résumé's own bullets: `label` is the bolded lead-in, `group`
// names a project when one post covers more than one (Granstudio's two briefs).
export const experience = [
  {
    company: tt("Tencent CSIG Business Group", "腾讯 CSIG 事业群"),
    role: tt("Interaction Design Intern", "交互设计实习生"),
    place: tt("Shenzhen, China", "中国 深圳"),
    period: "2021.03 – 2021.07",
    logo: "/about/logo/abcmouse.png",
    details: [
      {
        label: tt("Interaction Design", "交互设计"),
        text: tt(
          "Responsible for the interactive design of gamified teaching activities, with over 10 activities already launched.",
          "负责游戏化教学活动的交互设计，已上线活动 10 个以上。"
        ),
      },
      {
        label: tt("User Testing", "用户测试"),
        text: tt(
          "Conducted user testing, observing interaction and completion rates, and iteratively optimizing results.",
          "开展用户测试，观察互动率与完成率，并据此迭代优化方案。"
        ),
      },
    ],
  },
  {
    company: tt("Dianmao Technology Co., Ltd.", "点猫科技（编程猫）"),
    role: tt("Interaction Designer", "交互设计师"),
    place: tt("Shenzhen, China", "中国 深圳"),
    period: "2021.07 – 2021.08",
    logo: "/about/logo/codemao.png",
    details: [
      {
        label: tt("Course Platform Design", "课程平台设计"),
        text: tt(
          "Drove iteration of the B-side admin platform from back-office usage data, covering course management, courseware templates and related functions.",
          "以后台使用数据驱动 B 端管理平台的迭代，覆盖课程管理、课件模板等相关功能。"
        ),
      },
      {
        label: tt("Design Iteration", "设计迭代"),
        text: tt(
          "Iterated the teacher-facing and student-facing designs of the in-school platform against user testing results and user data.",
          "结合用户测试结果与用户数据，迭代校内平台的教师端与学生端设计。"
        ),
      },
    ],
  },
  {
    company: tt("Granstudio", "Granstudio"),
    role: tt("HMI Design Intern", "HMI 设计实习生"),
    place: tt("Turin, Italy", "意大利 都灵"),
    period: "2024.02 – 2024.05",
    logo: "/about/logo/granstudio.png",
    invert: true,
    details: [
      {
        group: tt("Interactive / Visual Design for JIYUE Supercar", "极越超跑的交互 / 视觉设计"),
        label: tt("Interaction Design", "交互设计"),
        text: tt(
          "Defined and optimized infotainment system interaction design, establishing interaction guidelines.",
          "定义并优化车机信息娱乐系统的交互设计，建立交互规范。"
        ),
      },
      {
        label: tt("Visual Design", "视觉设计"),
        text: tt(
          "Converted conceptual ideas into visual and animation solutions through interaction analysis.",
          "通过交互分析，把概念想法转化为视觉与动效方案。"
        ),
      },
      {
        group: tt("HMI Experience Design for a Haier Smart Home Appliance", "海尔智能家电的 HMI 体验设计"),
        label: tt("Trend Research", "趋势研究"),
        text: tt(
          "Performed industry research on competitors, electronics, and in-car interfaces, summarizing 27 trends related to technology, UI, and UX.",
          "针对竞品、消费电子与车载界面做行业研究，梳理出 27 条技术、UI 与 UX 趋势。"
        ),
      },
      {
        label: tt("Conceptual Solutions", "概念方案"),
        text: tt(
          "Created innovative user experience concepts by integrating brand characteristics and research, generating 3 sets of conceptual proposals.",
          "结合品牌特征与研究结论，产出 3 套创新的用户体验概念提案。"
        ),
      },
      {
        label: tt("Solution Outputs", "方案交付"),
        text: tt(
          "Delivered one comprehensive set of user experience design solutions, covering the entire process from concept to UX/UI implementation.",
          "交付一套完整的用户体验设计方案，覆盖从概念到 UX/UI 落地的全流程。"
        ),
      },
    ],
  },
  {
    company: tt("DPS & wetter.com", "DPS & wetter.com"),
    role: tt("UX/UI Design Engineer", "UX/UI 设计工程师"),
    place: tt("Munich, Germany", "德国 慕尼黑"),
    period: "2024.09 – 2025.07",
    logo: "/about/logo/wetter.svg",
    details: [
      {
        label: tt("AI Concept & Research", "AI 概念与研究"),
        text: tt(
          "Surveyed 260 users and conducted 25 interviews to define a GenAI mascot-outfit weather app concept for younger audiences.",
          "调研 260 位用户、完成 25 场访谈，定义出面向年轻用户的「生成式 AI 吉祥物换装」天气应用概念。"
        ),
      },
      {
        label: tt("UX&UI Design & Prototyping", "UX / UI 设计与原型"),
        text: tt(
          "Developed an GenAi Mascot that adapts outfits to the weather, enhancing engagement through A/B-tested high-fidelity prototypes.",
          "做出会按天气换装的生成式 AI 吉祥物，并以 A/B 测试过的高保真原型提升用户参与度。"
        ),
      },
      {
        label: tt("Design System", "设计系统"),
        text: tt(
          "Built high-fidelity prototypes and iterated AI mascot interactions through testing, then implemented responsive UI using Tailwind CSS.",
          "搭建高保真原型，通过测试迭代 AI 吉祥物的交互，并用 Tailwind CSS 实现响应式界面。"
        ),
      },
      {
        label: tt("Frontend", "前端实现"),
        text: tt(
          "Developed the onboarding page and implemented responsive front-end styling for the mobile app",
          "开发 onboarding 引导页，并为移动端应用实现响应式前端样式。"
        ),
      },
    ],
  },
  {
    company: tt("Kyrall GmbH", "Kyrall GmbH"),
    role: tt("UX/UI Design Engineer", "UX/UI 设计工程师"),
    place: tt("Munich, Germany", "德国 慕尼黑"),
    period: tt("2025.09 – Present", "2025.09 – 至今"),
    current: true,
    // A near-white wordmark, so it is painted as a mask like the skill icons
    // rather than placed as an image — that way it takes a site token and is
    // legible on the light theme as well as the dark one.
    logo: "/about/logo/kyrall.svg",
    mask: true,
    details: [
      {
        label: tt("AI Strategy & Feature Definition", "AI 策略与功能定义"),
        text: tt(
          "Explored and defined AI-assisted CAD modeling features, including AI suggestions, generation guidance, and non-chatbox interaction patterns for engineering workflows.",
          "探索并定义 AI 辅助 CAD 建模的功能，包括 AI 建议、生成引导，以及面向工程流程的非对话框交互范式。"
        ),
      },
      {
        label: tt("Product & UX/UI Ownership", "产品与 UX/UI 主导"),
        text: tt(
          "Built the design system and led UX/UI design across the web app and website, shaping core product flows and iterating designs based on testing and feedback.",
          "搭建设计系统，主导 Web 应用与官网的 UX/UI 设计，定义核心产品流程，并依据测试与反馈持续迭代。"
        ),
      },
      {
        label: tt("AI Workflow Design", "AI 工作流设计"),
        text: tt(
          "Designed end-to-end workflows for AI-driven CAD generation, from multi-prompt input to generation feedback, waiting states, result review, and post-editing.",
          "设计 AI 驱动 CAD 生成的端到端流程：从多段提示输入，到生成反馈、等待状态、结果审阅与后续编辑。"
        ),
      },
      {
        label: tt("Frontend Implementation", "前端实现"),
        text: tt(
          "Implemented editor and dashboard UI components with React, HTML, and CSS, including layout, styling, and interaction logic.",
          "用 React、HTML 与 CSS 实现编辑器与 Dashboard 的界面组件，涵盖布局、样式与交互逻辑。"
        ),
      },
    ],
  },
]

// Tools, drawn as single-colour SVGs. The page renders them as CSS masks rather
// than images, so whatever each file paints itself is ignored and the icon takes
// a site token — which is also why they follow the light and dark themes. The
// space in Claude Code's filename is percent-encoded; a raw one breaks the URL.
//
// Names are product names, the same in both languages, so they are left unwrapped.
export const skills = [
  { name: "Figma", icon: "/about/skill/Figma.svg" },
  { name: "ProtoPie", icon: "/about/skill/Protopie.svg" },
  { name: "Webflow", icon: "/about/skill/Webflow.svg" },
  { name: "Illustrator", icon: "/about/skill/Illustrator.svg" },
  { name: "Photoshop", icon: "/about/skill/Photoshop.svg" },
  { name: "After Effects", icon: "/about/skill/Effects.svg" },
  { name: "Premiere Pro", icon: "/about/skill/Premiere.svg" },
  { name: "Rhino", icon: "/about/skill/Rhino.svg" },
  { name: "Blender", icon: "/about/skill/Blender.svg" },
  { name: "KeyShot", icon: "/about/skill/Keyshot.svg" },
  { name: "Onshape", icon: "/about/skill/Onshape.svg" },
  { name: "HTML", icon: "/about/skill/HTML.svg" },
  { name: "CSS", icon: "/about/skill/CSS.svg" },
  { name: "JavaScript", icon: "/about/skill/JavaScript.svg" },
  { name: "Claude Code", icon: "/about/skill/Claude%20Code.svg" },
  { name: "Codex", icon: "/about/skill/codex.svg" },
  { name: "ComfyUI", icon: "/about/skill/ComfyUI.svg" },
  { name: "Midjourney", icon: "/about/skill/Midjourney.svg" },
]

// Stickers strewn around the opening statement — the same cast as the dashboard's
// pile, resized down since nothing here is bigger than a few hundred pixels.
//
// Positions are percentages so the scatter keeps its shape as the column narrows.
// They were placed by walking the viewport's perimeter at even arc intervals —
// even ANGLES crowd the top and bottom, since on a 16:9 canvas those edges
// subtend twice the angle the sides do — then pulling each one inward by an
// alternating amount, so neighbours never share a depth and the run never reads
// as a row. Nothing lands inside the box the name and links occupy, and the
// three portraits are spaced onto different sides so they don't read as a set.
//
// `sm` marks the ones that drop away on a phone, where there is no room to strew.
// `drift` and `wobble` are how far each one sinks and turns as the curtain closes
// over it — varied per sticker so the pile jostles rather than moving as a slab.
// `depth` is how far it slides against the pointer: the bigger ones get the
// bigger numbers, so the near ones outrun the far ones and the field has depth.
export const scatter = [
  { src: "/about/scatter/s1.png", left: "10%", top: "19%", w: 175, rotate: -9, drift: 34, wobble: 7, depth: 22 },
  { src: "/about/scatter/s2.png", left: "85%", top: "17%", w: 150, rotate: 11, sm: true, drift: 52, wobble: -9, depth: 19 },
  { src: "/about/scatter/s3.png", left: "80%", top: "38%", w: 195, rotate: 7, sm: true, drift: 22, wobble: -5, depth: 24 },
  { src: "/about/scatter/s4.png", left: "64%", top: "90%", w: 165, rotate: -13, drift: 44, wobble: 11, depth: 21 },
  { src: "/about/scatter/s5.png", left: "65%", top: "22%", w: 190, rotate: 5, sm: true, drift: 18, wobble: 6, depth: 24 },
  { src: "/about/scatter/s7.png", left: "32%", top: "21%", w: 205, rotate: -6, sm: true, drift: 14, wobble: 4, depth: 26 },
  { src: "/about/scatter/s8.png", left: "45%", top: "17%", w: 150, rotate: 17, sm: true, drift: 48, wobble: -12, depth: 19 },
  { src: "/about/scatter/s9.png", left: "20%", top: "69%", w: 160, rotate: -11, sm: true, drift: 30, wobble: 8, depth: 20 },
  { src: "/about/scatter/s10.png", left: "26%", top: "86%", w: 135, rotate: 9, sm: true, drift: 26, wobble: -6, depth: 17 },
  { src: "/about/scatter/s11.png", left: "45%", top: "89%", w: 150, rotate: -8, sm: true, drift: 20, wobble: 5, depth: 19 },
  { src: "/about/scatter/s12.png", left: "73%", top: "76%", w: 145, rotate: 12, sm: true, drift: 16, wobble: -7, depth: 18 },
  { src: "/about/scatter/s13.png", left: "90%", top: "71%", w: 125, rotate: -14, sm: true, drift: 38, wobble: 9, depth: 16 },
  { src: "/about/scatter/s14.png", left: "10%", top: "52%", w: 130, rotate: 6, sm: true, drift: 12, wobble: -4, depth: 16 },
]
