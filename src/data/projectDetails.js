// Case-study content for each project detail page, keyed by slug (see projectList in project.js).
// Sourced from the original case-study decks and product shots where available — kept close to
// what those documents actually said rather than invented after the fact.
//
// Every line a reader sees is tt("English", "中文") — the two languages sit side by side so a
// copy edit is one edit, not two files to keep in step. See src/i18n/t.js.
import { tt } from "../i18n/t"
import { kyrallWorkflow } from "./kyrallWorkflow"
import { kyrallBackground } from "./kyrallBackground"
import { kyrallCompetitors } from "./kyrallCompetitors"
// Commented out with the persona and story-map blocks below; put both back together.
// import { kyrallPersona } from "./kyrallPersona"
// import { kyrallStoryMap } from "./kyrallStoryMap"
import { kyrallSpec } from "./kyrallSpec"
import { kyrallCoreFlow } from "./kyrallCoreFlow"
import { kyrallExtensions } from "./kyrallExtensions"
import { kyrallLaunchData } from "./kyrallLaunchData"
// import { kyrallAiWorkflow } from "./kyrallAiWorkflow"
import { weatherPetsHero, weatherPetsTags, weatherPetsSummary, weatherPetsSections } from "./weatherPetsDeck"
import { codemaoHero, codemaoRole, codemaoSummary, codemaoTags, codemaoSections } from "./codemao"
import { abcMouseHero, abcMouseRole, abcMouseSummary, abcMouseTags, abcMouseSections } from "./abcMouse"
import { hmiHero, hmiRole, hmiSummary, hmiTags, hmiSections } from "./hmiDeck"
import { slowFoodHero, slowFoodRole, slowFoodSummary, slowFoodTags, slowFoodSections } from "./slowFood"

// TIDE: the Figma exports in /public/project/tide, with their pixel size so the
// frames that show them never reflow when an image lands.
const tideFrame = (name, w, h, label) => ({ src: `/project/tide/${name}.webp`, w, h, ...(label ? { label } : {}) })
const tideWall = (name, h) => tideFrame(`wall-${name}`, 560, h)

export const projectDetails = {
  kyrall: {
    role: tt("Sole Product Designer", "唯一产品设计师"),
    summary: tt(
      "Design and manufacture hardware at the speed of thought.From concept to manufacturable model in minutes.",
      "以思考的速度，设计并制造硬件。从概念到可制造的模型只需几分钟。"
    ),
    hero: {
      image: "/project/kyrall/4.png",
      headline: tt(
        "New Design Paradigm for the AI Era",
        "AI时代的新机械方式"
      ),
    },
    tags: [
      tt("0 to 1", "0到1"),
      tt("AI TOOL", "AI工具"),
      tt("Paramertic modeling", "参数化建模"),
      tt("Product analytics", "产品数据分析"),
    ],
    // The product clip opens the case study, between the hero and the first chapter,
    // with no words of its own — the hero has already said what Kyrall is.
    intro: [
      {
        type: "clip",
        src: "/dashboard/status.log/kyrall/kyrall.mp4",
        // The clip links to the live product; the pill shows on hover.
        href: "https://kyrall.com/",
        cta: tt("Try the product", "试用产品"),
      },
    ],
    sections: [
      {
        id: "workflow",
        label: tt("Work flow", "工作流"),
        lead: tt(
          "From 0 to 1: designing Kyrall's end-to-end product experience.",
          "从 0 到 1: 独立设计 Kyrall 的完整产品体验。"
        ),
        blocks: [{ type: "workflow", board: kyrallWorkflow }],
      },
      {
        id: "background",
        label: tt("Background", "需求背景"),
        blocks: [
          { type: "backgroundWho", act: kyrallBackground.whoAct },
          { type: "backgroundCompare", act: kyrallBackground.compareAct },
        ],
      },
      {
        id: "competitors",
        eyebrow: tt("Competitors", "竞品分析"),
        // Same arrangement as the Background board: the board opens with its own
        // title, so the page's heading stays for the chapter index and the outline
        // but is not drawn twice.
        label: tt("Competitors", "竞品分析"),
        // The board no longer draws its own title; the page sets it.
        heading: kyrallCompetitors.title,
        blocks: [{ type: "competitors", board: kyrallCompetitors }],
      },
      // Persona + user map chapter hidden for now; restore by uncommenting.
      // {
      // id: "persona",
      // eyebrow: tt("Persona", "用户画像"),
      // // The board opens with its own title, so the page's heading stays for the
      // // chapter index and the outline but is not drawn twice.
      // label: tt("Persona", "用户画像"),
      // // The board no longer draws its own title; the page sets it.
      // heading: kyrallPersona.title,
      // blocks: [
      // // The Figma boards, kept for reference but no longer on the page:
      // // { type: "persona", board: kyrallPersona },
      // // { type: "storymap", board: kyrallStoryMap },
      // { type: "personaCards", persona: kyrallPersona },
      // { type: "journeyMap", map: kyrallStoryMap },
      // ],
      // },
      {
        id: "loop",
        eyebrow: tt("Dashboard", "Dashboard"),
        // The board opens with its own title, so the page's heading stays for the
        // chapter index and the outline but is not drawn twice.
        label: tt("Core flow", "核心流程"),
        // The board no longer draws its own title; the page sets it.
        heading: kyrallCoreFlow.title,
        lead: kyrallCoreFlow.lead,
        blocks: [
          { type: "flowSteps", items: kyrallCoreFlow.steps },
          // The side-list player (PlayView), kept but no longer on the page:
          // { type: "playView", items: kyrallCoreFlow.play },
          // Workflow runs on its own; the four features line up as tabs below.
          {
            type: "clip",
            src: "/project/kyrall/play/workflow.mp4",
            ratio: "1920 / 1022",
            title: tt("Workflow", "工作流"),
            body: tt("Prompt input → Generate list", "输入描述，点击生成"),
          },
          // The tab player, kept but no longer on the page:
          // { type: "editorTabs", items: kyrallCoreFlow.play.slice(1).map((p) => ({ ...p, n: null })) },
          {
            type: "videoPair",
            gap: "visual",
            items: [
              {
                video: "/project/kyrall/play/input-all.mp4",
                poster: "/project/kyrall/play/input-all.jpg",
                title: tt("Multimodal input", "多模态输入"),
                body: tt("Image, mesh and file inputs.", "支持图片、Mesh、文件输入"),
              },
              {
                video: "/project/kyrall/play/preset-prompt.mp4",
                poster: "/project/kyrall/play/preset-prompt.jpg",
                title: tt("Preset prompts", "预设 Prompt"),
                body: tt("Prompts change with the onboarding role.", "根据 Onboarding 角色选择而改变"),
              },
              {
                video: "/project/kyrall/play/model-switch.mp4",
                poster: "/project/kyrall/play/model-switch.jpg",
                rate: 0.5,
                title: tt("Model switching", "生成模型切换"),
                body: tt("Generation models: Base / Reasoning.", "生成模型：Base / Reasoning"),
              },
              {
                video: "/project/kyrall/play/context-manager.mp4",
                poster: "/project/kyrall/play/context-manager.jpg",
                rate: 0.75,
                title: tt("Context Manager", "Context Manager"),
                body: tt("Add references from the Context Manager.", "从 Context Manager 添加参考"),
              },
            ],
          },
          {
            type: "subSection",
            heading: tt("Generation finished, straight into the Editor", "生成完成，直接进入 Editor"),
            text: tt(
              "Traditional CAD tooling, simplified: only the tools AI-assisted modelling really needs.",
              "简化传统 CAD 软件工具，只保留在 AI 辅助建模下最必要的工具。"
            ),
          },
          { type: "editorTabs", items: kyrallCoreFlow.tools },
          {
            type: "videoPair",
            items: [
              {
                video: "/project/kyrall/play/editor-share.mp4",
                poster: "/project/kyrall/play/editor-share.jpg",
                title: tt("Share", "分享"),
                body: tt(
                  "Generate a link to send to someone else; they can open the model without an account.",
                  "生成可访问的链接分享给其他用户，对方无需登录也能查看模型"
                ),
              },
              {
                video: "/project/kyrall/play/editor-export.mp4",
                poster: "/project/kyrall/play/editor-export.jpg",
                title: tt("Export in one step", "一步导出"),
                body: tt("Export as GLB, STEP or STL.", "可选择导出 GLB / STEP / STL 等格式"),
              },
            ],
          },
          // The Editor board (CoreFlowBoard) is kept in the repo but no longer on
          // the page — EditorTabs and the pair above tell this part now.
          // { type: "coreflow", board: kyrallCoreFlow },
        ],
      },
      {
        id: "extensions",
        eyebrow: tt("Extensions", "延展页面"),
        // Same as the core-flow board: it opens with its own title, so the page's
        // heading stays for the chapter index and the outline but is not drawn twice.
        label: tt("Extensions", "延展页面"),
        // The board no longer draws its own title; the page sets it.
        heading: kyrallExtensions.title,
        lead: kyrallExtensions.lead,
        blocks: [
          // The Figma board, kept for reference but no longer on the page:
          // { type: "extensions", board: kyrallExtensions },
          { type: "extensionsFlow", board: kyrallExtensions },
        ],
      },
      {
        id: "system",
        eyebrow: tt("Design System", "设计系统"),
        label: tt("Design System", "设计系统"),
        heading: tt(
          "Keep it consistent: document the system and its components.",
          "保持统一原则，沉淀设计系统与组件规范。"
        ),
        lead: kyrallSpec.body,
        // The card stack stays as the Figma board, used as a single illustration;
        // eyebrow, heading and lead are set by the page.
        blocks: [
          // The deck's overlapping card stack, kept but no longer on the page:
          // { type: "spec", board: kyrallSpec },
          { type: "specGallery" },
          // The same tokens in both modes: dark and light captures of the
          // Dashboard and the Editor, with a pill switch on each card.
          {
            type: "modeCompare",
            items: [
              {
                title: tt("Dashboard", "Dashboard"),
                dark: "/project/kyrall/system/dashboard-dark.png",
                light: "/project/kyrall/system/dashboard-light.png",
                darkLabel: tt("Dark", "深色"),
                lightLabel: tt("Light", "浅色"),
              },
              {
                title: tt("Editor", "Editor"),
                dark: "/project/kyrall/system/editor-dark.png",
                light: "/project/kyrall/system/editor-light.png",
                darkLabel: tt("Dark", "深色"),
                lightLabel: tt("Light", "浅色"),
              },
            ],
          },
        ],
      },
      {
        id: "launchdata",
        eyebrow: tt("Launch data", "上线数据"),
        // The board opens with its own title, so the page's heading stays for the
        // chapter index and the outline but is not drawn twice.
        label: tt("Launch data", "上线数据"),
        // The board no longer draws its own title; the page sets it.
        heading: kyrallLaunchData.title,
        lead: kyrallLaunchData.lead,
        blocks: [
          // The Figma board, kept for reference but no longer on the page:
          // { type: "launchdata", board: kyrallLaunchData },
          { type: "launchData", data: kyrallLaunchData },
        ],
      },
      // AI workflow chapter hidden for now — the board (kyrallAiWorkflow.js,
      // AiWorkflowBoard.jsx) is kept; re-enable by restoring this entry and the import.
      // {
      //   id: "aiworkflow",
      //   eyebrow: tt("AI workflow", "AI 工作流"),
      //   // The board opens with its own title, so the page's heading stays for the
      //   // chapter index and the outline but is not drawn twice.
      //   label: tt("AI workflow", "AI 工作流"),
      //   titleHidden: true,
      //   blocks: [{ type: "aiworkflow", board: kyrallAiWorkflow }],
      // },
    ],
  },
  // ABC Mouse (开心鼠) — the twelve boards of the Figma 「开心鼠」 page, rebuilt as page
  // content in src/data/abcMouse.js and drawn by AbcMouseDeck.jsx.
  "abc-mouse": {
    role: abcMouseRole,
    summary: abcMouseSummary,
    hero: abcMouseHero,
    tags: abcMouseTags,
    sections: abcMouseSections,
  },
  "weather-pets": {
    role: tt("UX/UI Designer · part-time front-end", "UX/UI 设计师 · 兼部分前端"),
    summary: weatherPetsSummary,
    hero: weatherPetsHero,
    tags: weatherPetsTags,
    sections: weatherPetsSections,
  },
  // Slow Food (GROW) — the Slow Food slides of the Figma 「作品集portfolio」 page,
  // rebuilt as page content in src/data/slowFood.js and drawn by SlowFoodDeck.jsx.
  "slow-food": {
    role: slowFoodRole,
    summary: slowFoodSummary,
    hero: slowFoodHero,
    tags: slowFoodTags,
    sections: slowFoodSections,
  },
  // HMI (Granstudio) — the slides of the Figma 「Granstudio」 page, rebuilt as page
  // content in src/data/hmiDeck.js and drawn by HmiDeck.jsx.
  hmi: {
    role: hmiRole,
    summary: hmiSummary,
    hero: hmiHero,
    tags: hmiTags,
    sections: hmiSections,
  },
  tide: {
    role: tt("UX/UI Designer", "UX/UI 设计师"),
    summary: tt(
      "Tide is an Italian digital consulting and design studio. This project involves designing the website for the studio.",
      "Tide 是一家意大利的数字咨询与设计工作室。这个项目是为它设计官方网站。"
    ),
    tags: [
      tt("UX/UI design", "UX/UI 设计"),
      tt("Website design", "网页设计"),
      tt("Mobile design", "移动端设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("Overview", "概览"),
        label: tt("Overview", "概览"),
        lead: tt("TIDE: studio website design.", "TIDE：工作室网站设计。"),
        blocks: [
          {
            type: "tideWall",
            columns: [
              { speed: 70, shots: [tideWall("home", 1288), tideWall("404", 315), tideWall("workshop", 815)] },
              { speed: 92, shots: [tideWall("chi", 1534), tideWall("contact", 829)] },
              { speed: 80, shots: [tideWall("challenge", 1253), tideWall("cosa", 1054)] },
              { speed: 100, shots: [tideWall("talk", 1280), tideWall("404", 315), tideWall("home", 1288)] },
            ],
            caption: tt(
              "The finished site: an underwater world for a studio named after the tide.",
              "完成的网站：为一家以「潮」为名的工作室造的一个水下世界。"
            ),
          },
        ],
      },
      {
        id: "introduction",
        eyebrow: tt("Introduction", "介绍"),
        label: tt("Introduction", "介绍"),
        lead: tt("“Put us to the test.”", "「来考考我们。」"),
        blocks: [
          {
            type: "tideLogo",
            caption: tt("The tide wordmark, at high tide.", "tide 的字标，正值涨潮。"),
          },
          {
            type: "note",
            text: tt(
              "Mission: to spread digital culture, be your daily source of inspiration, and even help your grandmother understand what you do. This is our mission: put us to the test.",
              "使命：传播数字文化，成为你每天的灵感来源，甚至让你奶奶也能明白你在做什么。这就是我们的使命：来考考我们。"
            ),
          },
          {
            text: tt(
              "That last line is the brief in disguise. A studio whose mission is to be understood by anyone cannot have a website that reads as industry jargon, which is what pushes the design toward an illustrated, explorable world rather than a conventional agency page.",
              "最后那句话其实就是伪装过的设计命题。一家以「让任何人都看得懂」为使命的工作室，官网不可能满是行业术语。这正是把设计推向一个可探索的插画世界，而不是一张常规代理公司页面的原因。"
            ),
          },
        ],
      },
      {
        id: "moodboard",
        eyebrow: tt("Moodboard", "情绪板"),
        label: tt("Moodboard", "情绪板"),
        lead: tt(
          "Sea, sun and shoreline, in flat blues and yellow.",
          "海、阳光与海岸线，用扁平的蓝与黄。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/tide/3.jpg",
            caption: tt(
              "Moodboard: waves, dunes, horizons and halftone textures in a blue and yellow palette.",
              "情绪板：浪、沙丘、地平线与网点肌理，统一在蓝黄色板里。"
            ),
          },
          {
            text: tt(
              "The brand palette takes its colours from the sea: nine of them in three tiers, each one named like a piece of advice.",
              "品牌色板取自海洋：一共九个颜色，分三级，每个颜色的名字都像一句叮嘱。"
            ),
          },
          {
            type: "swatches",
            groups: [
              {
                title: tt("Primary", "主色"),
                items: [
                  { hex: "#191B1E", label: "Go Black" },
                  { hex: "#FFFFFF", label: "Stay Essential" },
                  { hex: "#91A4FD", label: "Be Chilled" },
                ],
              },
              {
                title: tt("Secondary", "辅助色"),
                items: [
                  { hex: "#1E1F5D", label: "Get Deeper" },
                  { hex: "#F0D344", label: "Let's Play" },
                  { hex: "#E5EAF5", label: "Keep It Cool" },
                ],
              },
              {
                title: tt("Tertiary", "第三级"),
                items: [
                  { hex: "#587FFC", label: "Enjoy Yourself" },
                  { hex: "#CEC248", label: "Just Shine" },
                  { hex: "#DBDAC8", label: "Don't Stop" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "sitemap",
        eyebrow: tt("Site map", "站点地图"),
        label: tt("Site map", "站点地图"),
        lead: tt("Five top-level sections.", "五个一级栏目。"),
        blocks: [
          {
            type: "tideSitemap",
            tree: {
              label: "Homepage",
              children: [
                { label: "Who we are" },
                {
                  label: "What we do",
                  children: [{ label: "nPage nSingle project" }, { label: "Error 404 page" }],
                },
                {
                  label: "On wave",
                  children: [
                    { label: "Challenge", children: [{ label: "nPage nSingle challenge" }] },
                    { label: "Workshop", children: [{ label: "nPage nSingle workshop" }] },
                    { label: "Creative talk", children: [{ label: "nPage nSingle creative talk" }] },
                  ],
                },
                { label: "Community" },
                { label: "Contact" },
              ],
            },
            caption: tt(
              "What we do and On wave each open into single-project pages, with a 404 page planned from the start. Hover a page to trace it back to the homepage.",
              "「What we do」与「On wave」各自通向单项目页面，404 页面从一开始就在规划里。把鼠标移到任一页面上，可以看到它回到首页的路径。"
            ),
          },
        ],
      },
      {
        id: "wireframe",
        eyebrow: tt("Wireframe", "线框"),
        label: tt("Wireframe", "线框"),
        lead: tt("Structure first, on both breakpoints.", "先定结构，两个断点一起。"),
        blocks: [
          {
            type: "tideStrip",
            sets: [
              {
                id: "desktop",
                label: tt("Desktop", "桌面端"),
                width: 228,
                items: [
                  tideFrame("wf-home", 956, 2227, "Home"),
                  tideFrame("wf-chi", 955, 2728, "Chi siamo"),
                  tideFrame("wf-cosa", 956, 1681, "Cosa facciamo"),
                  tideFrame("wf-404", 955, 561, "404"),
                  tideFrame("wf-challenge", 956, 1670, "Challenge"),
                  tideFrame("wf-workshop", 955, 1400, "Workshop"),
                  tideFrame("wf-talk", 955, 1696, "Creative talk"),
                  tideFrame("wf-community", 956, 1681, "Community"),
                  tideFrame("wf-contact", 956, 1434, "Contatti"),
                ],
              },
              {
                id: "mobile",
                label: tt("Mobile", "移动端"),
                width: 128,
                items: [
                  tideFrame("wf-home-m", 450, 2717, "Home"),
                  tideFrame("wf-chi-m", 450, 2012, "Chi siamo"),
                  tideFrame("wf-cosa-m", 450, 1879, "Cosa facciamo"),
                  tideFrame("wf-404-m", 450, 904, "404"),
                  tideFrame("wf-challenge-m", 450, 1021, "Challenge"),
                  tideFrame("wf-workshop-m", 450, 916, "Workshop"),
                  tideFrame("wf-talk-m", 450, 1365, "Creative talk"),
                  tideFrame("wf-community-m", 450, 1044, "Community"),
                  tideFrame("wf-contact-m", 450, 1044, "Contatti"),
                ],
              },
            ],
            caption: tt(
              "Every page laid out end to end, then the same structure reflowed to one column. Drag or scroll sideways.",
              "每一页从头到尾排开，再把同一套结构重排成单列。可以左右拖动或滑动。"
            ),
          },
        ],
      },
      {
        id: "draft-one",
        eyebrow: tt("Draft one", "初稿一"),
        label: tt("Draft one", "初稿一"),
        lead: tt("Yellow and blue, cut by wave-shaped edges.", "黄与蓝，被波浪形的边缘切开。"),
        blocks: [
          {
            text: tt(
              "The first idea treats the page as one pour of yellow liquid: it enters at the top and runs through every section on its way to the footer. The notes below are the motion planned for each stop; press one to go there.",
              "第一个想法把整页当成一股黄色的液体：它从顶部流入，一路穿过每个板块，最后落进页脚。下面是为每一站设计的动效，点一下就能跳到那里。"
            ),
          },
          {
            type: "tideTour",
            pages: [
              {
                id: "draft1",
                url: "tide / draft 1",
                desktop: tideFrame("draft1", 1644, 4600),
                mobile: tideFrame("draft1-m", 390, 3376),
                stops: [
                  {
                    label: tt("Hero", "首屏"),
                    at: 0,
                    text: tt(
                      "The colours, patterns and text move inward on the page to form the final frame.",
                      "颜色、图案与文字从页面四周向内聚拢，拼成最终的画面。"
                    ),
                  },
                  {
                    label: tt("What we do", "我们做什么"),
                    at: 0.19,
                    text: tt(
                      "The pattern pours down like a liquid into the bowl below. Once filled, the bowl tips over and releases the colour and the text.",
                      "图案像液体一样倒进下方的碗里。碗装满后翻倒，把颜色和文字一起倒出来。"
                    ),
                  },
                  {
                    label: tt("Our best pieces", "代表作"),
                    at: 0.4,
                    text: tt(
                      "The yellow liquid keeps descending, revealing the text and images underneath as it passes.",
                      "黄色液体继续往下流，流过的地方露出底下的文字和图片。"
                    ),
                  },
                  {
                    label: tt("On wave", "浪上"),
                    at: 0.59,
                    text: tt(
                      "The liquid runs through a tube into a tank and fills it. At the end the plug at the bottom lifts and lets it flow out.",
                      "液体顺着管道流进水箱，把它灌满。动画结束时底部的塞子被提起，液体流了出去。"
                    ),
                  },
                  {
                    label: tt("Contact", "联系"),
                    at: 0.8,
                    text: tt(
                      "The flow comes to an end and pours into the footer of the page.",
                      "水流走到尽头，倒进页面的页脚。"
                    ),
                  },
                ],
              },
            ],
            caption: tt("Draft one, desktop and mobile side by side.", "初稿一，桌面端与移动端并排。"),
          },
        ],
      },
      {
        id: "draft-two",
        eyebrow: tt("Draft two", "初稿二"),
        label: tt("Draft two", "初稿二"),
        lead: tt("A second pass at the same structure.", "在同一套结构上再走一遍。"),
        blocks: [
          {
            text: tt(
              "The second draft drops the liquid and goes into the water itself: the page starts at the surface and sinks section by section, with a small animation waiting at each depth.",
              "第二稿放下了液体，直接进到水里：页面从水面开始，一个板块一个板块往下沉，每一层都有一段小动画等着。"
            ),
          },
          {
            type: "tideTour",
            pages: [
              {
                id: "draft2",
                url: "tide / draft 2",
                desktop: tideFrame("draft2", 1638, 4600),
                mobile: tideFrame("draft2-m", 390, 4233),
                stops: [
                  {
                    label: tt("What we do", "我们做什么"),
                    at: 0.17,
                    text: tt(
                      "Bubbles rise from below, each one carrying a service, and settle into the final frame.",
                      "气泡从下方升起，每个气泡带着一项服务，最后停在画面里。"
                    ),
                  },
                  {
                    label: tt("Our pearls", "我们的珍珠"),
                    at: 0.39,
                    text: tt(
                      "Clicking a project starts an animation that leads to its dedicated page.",
                      "点击一个项目，会有一段动画把你带到它的专属页面。"
                    ),
                  },
                  {
                    label: tt("On wave", "浪上"),
                    at: 0.58,
                    text: tt(
                      "The diver swims in and brings the words Creative Talk, Workshop and Challenge with it.",
                      "潜水员游进画面，把 Creative Talk、Workshop 和 Challenge 这几个词一起带出来。"
                    ),
                  },
                  {
                    label: tt("Contact", "联系"),
                    at: 0.8,
                    text: tt(
                      "Hovering or clicking Contact Us makes the moray eel light up the button, a play on the word “electrified” in the headline.",
                      "悬停或点击「联系我们」时，海鳗会把按钮点亮，呼应标题里「被电到」这个词。"
                    ),
                  },
                ],
              },
            ],
            caption: tt("Draft two, desktop and mobile.", "初稿二，桌面端与移动端。"),
          },
          {
            type: "clip",
            src: "/project/tide/draft2-bubbles.mp4",
            ratio: 1280 / 702,
            caption: tt(
              "The bubbles as they were animated for the prototype: web site, art direction, branding, digital strategy, illustration.",
              "原型里的气泡动画：网站、艺术指导、品牌、数字策略、插画。"
            ),
          },
        ],
      },
      {
        id: "final",
        eyebrow: tt("Final concept", "最终方案"),
        label: tt("Final concept", "最终方案"),
        lead: tt("Go under the surface.", "潜到水面之下。"),
        blocks: [
          {
            text: tt(
              "The final direction drops the shoreline and puts the visitor below the waterline: deep navy, seahorses, coral and pearl-lit shelves, with yellow kept as the accent that marks every action.",
              "最终方向舍掉海岸线，把访客带到水面以下：深海军蓝、海马、珊瑚与珍珠点亮的礁架，而黄色被留作点缀，用来标记每一个可操作的动作。"
            ),
          },
          {
            type: "tideTour",
            pages: [
              {
                id: "home",
                label: "Home",
                url: "tide / home",
                desktop: tideFrame("final-home", 1600, 3680),
                mobile: tideFrame("final-home-m", 390, 2955),
                stops: [
                  { label: tt("Nav", "导航"), at: 0 },
                  { label: tt("Studio introduction", "工作室介绍"), at: 0.06 },
                  { label: tt("Our work", "作品"), at: 0.235 },
                  { label: tt("Community", "社区"), at: 0.49 },
                  { label: tt("Contact", "联系"), at: 0.75 },
                ],
              },
              {
                id: "chi",
                label: "Chi siamo",
                url: "tide / chi siamo",
                desktop: tideFrame("final-chi", 1568, 4296),
                mobile: tideFrame("final-chi-m", 390, 2198),
              },
              {
                id: "cosa",
                label: "Cosa facciamo",
                url: "tide / cosa facciamo",
                desktop: tideFrame("final-cosa", 1553, 2922),
                mobile: tideFrame("final-cosa-m", 390, 2955),
              },
              {
                id: "challenge",
                label: "Challenge",
                url: "tide / mettiti alla prova / challenge",
                desktop: tideFrame("final-challenge", 1561, 3493),
                mobile: tideFrame("final-challenge-m", 390, 1402),
              },
              {
                id: "workshop",
                label: "Workshop",
                url: "tide / mettiti alla prova / workshop",
                desktop: tideFrame("final-workshop", 1601, 2329),
                mobile: tideFrame("final-workshop-m", 390, 1434),
              },
              {
                id: "talk",
                label: "Creative talk",
                url: "tide / mettiti alla prova / creative talk",
                desktop: tideFrame("final-talk", 1561, 3567),
                mobile: tideFrame("final-talk-m", 390, 1718),
              },
              {
                id: "contact",
                label: "Contattaci",
                url: "tide / contattaci",
                desktop: tideFrame("final-contact", 1541, 2281),
                mobile: tideFrame("final-contact-m", 390, 917),
              },
            ],
            caption: tt(
              "Seven pages on both breakpoints, stacked down one continuous seabed. The homepage runs navigation, studio introduction, Our Work, Community and Contact.",
              "七个页面，两个断点，沿着一片连续的海床依次向下排布。首页依次是导航、工作室介绍、作品、社区与联系。"
            ),
          },
        ],
      },
      {
        id: "prototyping",
        eyebrow: tt("Prototyping", "原型"),
        label: tt("Prototyping", "原型"),
        lead: tt("Clickable, on both breakpoints.", "两个断点都能点。"),
        blocks: [
          {
            text: tt(
              "Both breakpoints were wired up as clickable Figma prototypes. One interaction from them is rebuilt here: the 404 page, where the lost seahorse asks to be dragged back home.",
              "两个断点都接成了可点击的 Figma 原型。这里重做了其中一个交互：404 页面上，走丢的海马请你把它拖回家。"
            ),
          },
          {
            type: "tide404",
            hint: tt("Drag me home", "把我拖回家"),
            found: tt("Home again", "到家了"),
            caption: tt(
              "404, “Mi hai ritrovato!” Drag the seahorse to the coral marked Home.",
              "404，「Mi hai ritrovato！」把海马拖到标着 Home 的珊瑚那里。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The 404 is the detail that proves the concept. It was in the site map from the beginning and it keeps the illustration and the voice intact, so the one page a visitor reaches by accident still sounds like the studio.",
              "404 是那个证明概念成立的细节。它从一开始就在站点地图里，插画与语气都保持完整。于是访客唯一一个误入的页面，听起来仍然像这家工作室。"
            ),
          },
          {
            type: "links",
            items: [
              {
                label: tt("Figma prototype: website", "Figma 原型：网站"),
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=164%3A2180&node-id=695-5880&viewport=1996%2C-7389%2C0.14&t=tmlbfG0q5vuygwqL-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=695%3A6450",
                note: tt("The desktop site, clickable in Figma.", "桌面端网站，在 Figma 里可点击。"),
              },
              {
                label: tt("Figma prototype: mobile", "Figma 原型：移动端"),
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=44%3A6640&node-id=914-22478&viewport=472%2C-4392%2C0.25&t=05eNX3ysNf4cawCZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=914%3A22478",
                note: tt("The mobile site, clickable in Figma.", "移动端网站，在 Figma 里可点击。"),
              },
            ],
          },
        ],
      },
    ],
  },
  // CodeMao — rebuilt from the Figma file's 「导出」 deck; see src/data/codemao.js.
  codemao: {
    role: codemaoRole,
    summary: codemaoSummary,
    hero: codemaoHero,
    tags: codemaoTags,
    sections: codemaoSections,
  },
  "puzzle-game": {
    role: tt("UX/UI · Game Design", "UX/UI · 游戏化设计"),
    summary: tt(
      "This project focuses on enhancing the interactive experience of a mobile puzzle game by designing a process for a limited-time event where players collect puzzle pieces to complete storybooks. The goal is to improve player engagement and completion rates by introducing a tutorial that helps new users quickly understand the gameplay.",
      "这个项目要提升一款手机拼图游戏的互动体验：设计一个限时活动的流程，玩家收集拼图页来集成绘本。目标是通过一套能让新手迅速看懂玩法的引导，提高参与度与完成率。"
    ),
    tags: [
      tt("UX/UI design", "UX/UI 设计"),
      tt("Game design", "游戏化设计"),
      tt("Mobile design", "移动端设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("Overview", "概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Collect nine puzzle pages to complete a storybook.",
          "收集九张拼图页，集成一本绘本。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/hero.jpg",
            caption: tt(
              "Jigsaw Puzzle — a limited-time collection event inside a mobile puzzle game.",
              "Jigsaw Puzzle —— 手机拼图游戏里的一个限时收集活动。"
            ),
          },
          {
            text: tt(
              "Players enter the activity interface and complete the puzzle pages of the puzzle set (storybook) through the puzzle game. Collect 9 puzzle pages to create a puzzle set, and the newly created storybook is added to the bookshelf interface. Books on the bookshelf can be opened during or after the activity to play the puzzle pages again.",
              "玩家进入活动界面，通过拼图玩法完成拼图集（绘本）里的各页。收集满 9 张拼图页即可集成一册，新集成的绘本会被放进书架。书架上的书在活动期间或结束后都能打开，重玩其中的拼图页。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/1.jpg",
            caption: tt(
              "The event in one screen — a storybook cover, its puzzle pages, and Play.",
              "一屏看完整个活动 —— 绘本封面、它的拼图页，以及「开始」。"
            ),
          },
        ],
      },
      {
        id: "journey",
        eyebrow: tt("User journey map", "用户旅程图"),
        label: tt("User journey map", "用户旅程图"),
        lead: tt(
          "Analyze pain points and product opportunities to summarize design strategies.",
          "分析痛点与产品机会，归纳出设计策略。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Enter page", "进入页面"),
              tt("Select puzzle set", "选择拼图集"),
              tt("Beginner guide", "新手引导"),
              tt("Puzzle in progress", "拼图进行中"),
              tt("Complete puzzle", "完成拼图"),
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/2.jpg",
            caption: tt(
              "Stage, touchpoint, mood curve, pain points and opportunities across the five stages.",
              "五个阶段上的阶段、触点、情绪曲线、痛点与机会点。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Unaware of puzzle activities", "不知道有拼图活动"),
                text: tt(
                  "Resulting in low completion rates → promote puzzle set activities.",
                  "导致完成率偏低 → 加强拼图集活动的曝光。"
                ),
              },
              {
                term: tt("Overwhelming content", "内容过载"),
                text: tt(
                  "Difficult to decide, uncertain about the number of puzzles → categorize mainline and activities, display puzzle progress.",
                  "难以决定、不清楚一共有多少张 → 区分主线与活动，并显示拼图进度。"
                ),
              },
              {
                term: tt("Static guidance fails", "静态引导无效"),
                text: tt(
                  "Users do not understand quickly → interactive guidance, reducing user learning effort.",
                  "用户看不懂、上手慢 → 改为交互式引导，降低学习成本。"
                ),
              },
              {
                term: tt("Game ends without reward feedback", "结束时缺少奖励反馈"),
                text: tt(
                  "→ emotional engagement mechanism, coin reward mechanism.",
                  "→ 加入情绪共鸣机制与金币奖励机制。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "The mood curve is doing the real work here. It dips twice — once at selection, once after completion — and both dips become features: categorisation fixes the first, the reward moment fixes the second. The design strategy is readable straight off the curve.",
              "真正在干活的是那条情绪曲线。它有两次下陷 —— 一次在选择时，一次在完成之后 —— 两次下陷都变成了功能：分类解决前一次，奖励时刻解决后一次。设计策略可以直接从这条曲线上读出来。"
            ),
          },
        ],
      },
      {
        id: "motivation",
        eyebrow: tt("User motivation", "用户动机"),
        label: tt("User motivation", "用户动机"),
        lead: tt("A teenage audience, driven by attraction.", "以青少年为主的用户，被「吸引力」驱动。"),
        blocks: [
          {
            text: tt(
              "Pay attention to user experience, analyze user motivation to stimulate behavior, meet the demands of different roles, improve participation and completion rates, and enable users to reach multiple points of participation and achievement.",
              "关注用户体验，分析用户动机以激发行为，满足不同角色的需求，提升参与度与完成率，让用户获得多个参与与成就的落点。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/3.jpg",
            caption: tt(
              "User traits — a teenage group looking for engagement, belonging, identification; drive to use — excitement, accomplishment, emotional bond, enjoyment.",
              "用户特征 —— 一群寻求参与感、归属感与认同感的青少年；使用动力 —— 兴奋、成就、情感联结、乐趣。"
            ),
          },
        ],
      },
      {
        id: "strategy",
        eyebrow: tt("Design strategy", "设计策略"),
        label: tt("Design strategy", "设计策略"),
        lead: tt(
          "Three strategies, from the experience report and motivation analysis.",
          "三条策略，来自体验报告与动机分析。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Interaction experience", "交互体验"),
                text: tt(
                  "Swipe interaction method; pop-ups to reduce navigation; user action guidance.",
                  "滑动式交互；用弹层减少页面跳转；对用户操作给出引导。"
                ),
              },
              {
                term: tt("Content navigation", "内容导航"),
                text: tt(
                  "Puzzle set status visualization; puzzle set waterfall layout; categorized tags for faster search.",
                  "拼图集状态可视化；拼图集瀑布流布局；分类标签加快查找。"
                ),
              },
              {
                term: tt("Visual effects", "视觉表现"),
                text: tt(
                  "Playful typography; youthful and vibrant colors; unified components.",
                  "俏皮的字体排版；年轻鲜亮的色彩；统一的组件。"
                ),
              },
            ],
          },
          { type: "image", src: "/project/puzzle-game/4.jpg", caption: tt("The three strategy pillars.", "三根策略支柱。") },
        ],
      },
      {
        id: "emotional",
        eyebrow: tt("Emotional edition", "情绪定调"),
        label: tt("Emotional edition", "情绪定调"),
        lead: tt("Young · immersion · interesting.", "年轻 · 沉浸 · 有趣。"),
        blocks: [
          {
            text: tt(
              "Based on preliminary product research and analysis of the brand’s target user group, keywords for the ideal product have been derived, with children being the main group. The design style is youthful and lively, with soft and comfortable colors.",
              "基于前期产品调研与品牌目标用户分析，提炼出理想产品的关键词 —— 主力用户是儿童。设计风格年轻活泼，色彩柔和舒适。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Young", "年轻"),
                text: tt("Target audience mainly consists of teenagers.", "目标用户以青少年为主。"),
              },
              {
                term: tt("Immersion", "沉浸"),
                text: tt("Purple ambiance enhances immersion.", "紫色氛围增强沉浸感。"),
              },
              {
                term: tt("Interesting", "有趣"),
                text: tt("Enjoyable experiences enhance user loyalty.", "愉快的体验提升用户忠诚度。"),
              },
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/5.jpg",
            caption: tt("The three keywords and the imagery behind each.", "三个关键词，以及各自背后的意象。"),
          },
        ],
      },
      {
        id: "color",
        eyebrow: tt("Color standard", "色彩规范"),
        label: tt("Color standard", "色彩规范"),
        lead: tt("Childlike purple, with blue as the auxiliary.", "以童趣的紫为主色，蓝色为辅。"),
        blocks: [
          {
            text: tt(
              "The color selection is full of childlike purple as the main color, unifying the brand tone, and the accent color is blue from adjacent color series as the auxiliary color.",
              "主色选用充满童趣的紫色，统一品牌调性；点缀色取邻近色系中的蓝色作为辅助色。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/6.jpg",
            caption: tt(
              "Primary #9F7FFF–#8055FE, secondary #7C90FA, with #4460ED, #ED6FF7 and #E86124.",
              "主色 #9F7FFF–#8055FE，辅色 #7C90FA，另有 #4460ED、#ED6FF7 与 #E86124。"
            ),
          },
        ],
      },
      {
        id: "homepage",
        eyebrow: tt("Home page", "首页"),
        label: tt("Home page", "首页"),
        lead: tt(
          "Two tags, a waterfall of puzzle sets, and the player’s balance.",
          "两个标签页、一列瀑布流拼图集，以及玩家的余额。"
        ),
        blocks: [
          {
            text: tt(
              "The homepage is divided into two tags, each containing a category bar, coin information, and diamond information.",
              "首页分为两个标签页，各自包含分类栏、金币信息与钻石信息。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/7.jpg",
            caption: tt(
              "Category section (mainline + event), content section (puzzle set waterfall with upcoming, in-progress and completed states), and the account data section.",
              "分类区（主线 + 活动）、内容区（拼图集瀑布流，含未开始、进行中与已完成三种状态），以及账户数据区。"
            ),
          },
        ],
      },
      {
        id: "process",
        eyebrow: tt("Process display", "流程展示"),
        label: tt("Process display", "流程展示"),
        lead: tt(
          "Simple, intuitive interaction that lowers the difficulty of operation.",
          "简单直觉的交互，降低操作难度。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/8.jpg",
            caption: tt(
              "Landing page through to the completed puzzle — including the Play/Reserve state before an event begins, and the transition animation back to the puzzle set page on completion.",
              "从落地页一路到拼完 —— 包含活动开始前的「开始 / 预约」状态，以及完成后回到拼图集页面的过渡动画。"
            ),
          },
        ],
      },
      {
        id: "guidance",
        eyebrow: tt("Operation guidance", "操作引导"),
        label: tt("Operation guidance", "操作引导"),
        lead: tt(
          "Dynamic beginner guidance, not a static tutorial.",
          "动态的新手引导，而不是一份静态教程。"
        ),
        blocks: [
          {
            text: tt(
              "Adopting dynamic beginner guidance to guide users, further reducing the threshold for operation and improving usability.",
              "采用动态新手引导带着用户走，进一步降低操作门槛、提升易用性。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Swipe piece placement area", "滑动拼块区"),
                text: tt(
                  "Guide the user to the next step upon following the swipe instructions.",
                  "用户按提示滑动后，引导进入下一步。"
                ),
              },
              {
                term: tt("Puzzle play mechanics", "拼图玩法机制"),
                text: tt(
                  "As the user moves a piece, show the matching position. The piece will automatically snap into place when positioned correctly.",
                  "用户拖动拼块时显示匹配位置，位置正确时拼块会自动吸附到位。"
                ),
              },
              {
                term: tt("Zoom in/out puzzle", "缩放拼图"),
                text: tt(
                  "Pinch with two fingers to zoom in or out on the puzzle.",
                  "双指捏合，放大或缩小拼图。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/9.jpg",
            caption: tt(
              "Each gesture taught in place, at the moment it is needed.",
              "每个手势都就地教，教在它被需要的那一刻。"
            ),
          },
          {
            type: "note",
            text: tt(
              "This is the answer to the brief. “Static guidance fails to help users understand quickly” was the journey map’s third pain point, and the fix is that the tutorial stops being a screen the player dismisses and becomes a prompt attached to the action itself.",
              "这就是对命题的回答。「静态引导无法让用户迅速看懂」是旅程图里的第三个痛点，解法是：教程不再是一块玩家顺手划掉的界面，而变成贴在动作本身上的提示。"
            ),
          },
        ],
      },
      {
        id: "display",
        eyebrow: tt("Page display", "页面展示"),
        label: tt("Page display", "页面展示"),
        lead: tt("The finished screens.", "最终的界面。"),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/10.jpg",
            caption: tt(
              "Page display — the event list, puzzle sets and in-game puzzle screens.",
              "页面展示 —— 活动列表、拼图集，以及游戏内的拼图界面。"
            ),
          },
        ],
      },
    ],
  },
  "fire-rescue-drone": {
    role: tt("Product · System & UAV Design", "产品 · 系统与无人机设计"),
    summary: tt(
      "Urban villages exist in every fast-growing city in China. These villages have always been at the heart of the fire problem due to dense housing and narrow roads. Against the backdrop of future intelligent cities, this project creates an intelligent fire-fighting system for urban villages that intelligently responds to fires, helps residents fight fires, and assists firefighters.",
      "中国每一座快速扩张的城市里都有城中村。房屋密集、道路狭窄，让它们一直是消防问题的核心所在。以未来智慧城市为背景，这个项目为城中村设计了一套智能消防系统：智能响应火情、协助居民自救，并辅助消防员救援。"
    ),
    tags: [
      tt("Product design", "产品设计"),
      tt("System design", "系统设计"),
      tt("UAV design", "无人机设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("Overview", "概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Fire protection system design for urban villages.",
          "为城中村设计的消防系统。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/hero.jpg",
            caption: tt(
              "A paired drone and ground vehicle, dispatched ahead of the firefighters.",
              "一架无人机与一台地面车辆组成一对，比消防员先到现场。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("Background", "背景"),
        label: tt("Background", "背景"),
        lead: tt("Residential fire is where people actually die.", "真正死人的，是住宅火灾。"),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg1.jpg",
            caption: tt(
              "Residential fires are 44.8% of occurrences but 78.3% of the death toll; electrical appliances are the single biggest cause at 32.1%.",
              "住宅火灾占起火数的 44.8%，却占死亡人数的 78.3%；电器是最大单一诱因，占 32.1%。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg2.jpg",
            caption: tt(
              "Why urban villages burn — dense housing and narrow roads.",
              "城中村为什么易燃 —— 房屋密集、道路狭窄。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg3.jpg",
            caption: tt("Conditions on the ground.", "现场的实际状况。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg4.jpg",
            caption: tt(
              "The existing response, and where it loses time.",
              "现有的响应流程，以及它在哪里耗掉了时间。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg5.jpg",
            caption: tt("Background research summary.", "背景研究小结。"),
          },
          {
            type: "note",
            text: tt(
              "The 44.8% / 78.3% split is the whole argument for the project. Residential fire is not the most common kind of fire — it is the most lethal kind, and in an urban village the reason is access. That points the design at the minutes before the firefighters arrive rather than at firefighting itself.",
              "44.8% 与 78.3% 之间的落差，就是这个项目全部的理由。住宅火灾不是最常见的火灾，而是最致命的那一类 —— 在城中村，原因是「进不去」。这把设计指向消防员到场之前那几分钟，而不是灭火本身。"
            ),
          },
        ],
      },
      {
        id: "architecture",
        eyebrow: tt("System architecture", "系统架构"),
        label: tt("System architecture", "系统架构"),
        lead: tt("Scene, cloud, network, terminal.", "场景、云端、网络、终端。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Scene", "场景"),
                text: tt("Urban village, fire fighting, fire station.", "城中村、灭火救援、消防站。"),
              },
              {
                term: tt("Cloud system center", "云端系统中心"),
                text: tt(
                  "Cloud platform, big data, AI middleground and video platform on a SaaS cloud + IoT platform, running the risk perception system, intelligent decision system and fire safety system.",
                  "在 SaaS 云与物联网平台之上，由云平台、大数据、AI 中台与视频平台组成，运行风险感知系统、智能决策系统与消防安全系统。"
                ),
              },
              {
                term: tt("Multi-network", "多重网络"),
                text: tt(
                  "Service providers’ network, Alpha IOT private network, e-government network.",
                  "运营商网络、Alpha 物联网专网、电子政务网。"
                ),
              },
              {
                term: tt("System products", "系统硬件"),
                text: tt(
                  "Smoke detector, video monitoring, fire fighting UAV, fire car.",
                  "烟感探测器、视频监控、消防无人机、消防小车。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/arch.jpg",
            caption: tt(
              "The four layers, from scene down to terminal hardware.",
              "四个层级，从场景一直到终端硬件。"
            ),
          },
        ],
      },
      {
        id: "diagram",
        eyebrow: tt("System diagram", "系统图解"),
        label: tt("System diagram", "系统图解"),
        lead: tt(
          "Baishizhou, Nanshan District, Shenzhen — taken as the example.",
          "以深圳市南山区白石洲为例。"
        ),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "The whole urban village will be divided according to the main road and the density of houses.",
                "整个城中村按主干道与房屋密度划分区域。"
              ),
              tt(
                "Each partition is equipped with an intelligent fire sub-system according to the public space and number of houses.",
                "每个分区根据公共空间与房屋数量，配置一套智能消防子系统。"
              ),
              tt("Digitize and code each building and floor.", "为每栋楼、每一层做数字化编码。"),
              tt(
                "Install smoke sensors and alarms on each floor.",
                "每层安装烟感传感器与报警装置。"
              ),
              tt(
                "Plan the route of fire trucks and fire drones to each building.",
                "规划消防车与消防无人机到各栋楼的路径。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sys1.jpg",
            caption: tt(
              "Baishizhou divided into partitions A–L, each with its own sub-system, and every building and floor coded.",
              "白石洲被划分为 A–L 区，各自配一套子系统，每栋楼与每层都有编码。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sys2.jpg",
            caption: tt(
              "A fire in C-06-09 — detection, alert, dispatch, the vehicles arriving ahead of the firefighters, residents self-rescuing with delivered tools, and a precise rescue on arrival.",
              "C-06-09 起火 —— 探测、报警、调度，设备先于消防员抵达，居民用送到手上的工具自救，消防员到场后精准救援。"
            ),
          },
        ],
      },
      {
        id: "product-design",
        eyebrow: tt("Product design", "产品设计"),
        label: tt("Product design", "产品设计"),
        lead: tt("Geometry · rounded · affiliative.", "几何 · 圆润 · 亲和。"),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/mood.jpg",
            caption: tt(
              "Moodboard — soft geometry and rounded housings, approachable rather than industrial.",
              "情绪板 —— 柔和的几何与圆润的外壳，亲切而不工业。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sketch.jpg",
            caption: tt("Product sketches.", "产品草图。"),
          },
        ],
      },
      {
        id: "drone",
        eyebrow: tt("Fire fighting drone", "消防无人机"),
        label: tt("Fire fighting drone", "消防无人机"),
        lead: tt("Eyes above the fire.", "火场上方的那双眼睛。"),
        blocks: [
          {
            text: tt(
              "The Fire Fighting Drone is designed to transmit video information of the fire scene, assist firefighters in locating trapped persons, and throw fire extinguisher balls. When a fire breaks out, the drone quickly arrives at the scene, providing firefighters with real-time images. Simultaneously, firefighters can control the drone to release fire-extinguishing bombs, enhancing their ability to combat the fire effectively.",
              "消防无人机负责回传火场的视频信息、协助消防员定位被困人员，并投放灭火弹。火情发生时，无人机迅速抵达现场，为消防员提供实时画面；同时消防员可以操控它投放灭火弹，增强实际的灭火能力。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/drone.jpg",
            caption: tt("The fire fighting drone.", "消防无人机。"),
          },
        ],
      },
      {
        id: "car",
        eyebrow: tt("Fire fighting small car", "消防小车"),
        label: tt("Fire fighting small car", "消防小车"),
        lead: tt(
          "Hoses delivered up the stairs, before anyone arrives.",
          "在任何人到场之前，把水带送上楼。"
        ),
        blocks: [
          {
            text: tt(
              "The fire fighting vehicle is equipped to transmit video information of the fire scene, assist firefighters in locating trapped persons, and provide fire hoses to residents. When a fire occurs, the vehicle delivers fire hoses to residents by climbing stairs, enabling them to save themselves. Simultaneously, it transmits real-time information on the fire situation to the firefighters, aiding in their response efforts.",
              "消防小车负责回传火场视频、协助消防员定位被困人员，并向居民递送消防水带。火情发生时，小车爬楼把水带送到居民手上，让他们能够自救；同时把火情的实时信息传给消防员，辅助他们的处置。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/car.jpg",
            caption: tt("The stair-climbing ground vehicle.", "可爬楼梯的地面小车。"),
          },
        ],
      },
      {
        id: "exploded",
        eyebrow: tt("Product exploded view", "产品爆炸图"),
        label: tt("Exploded view", "爆炸图"),
        lead: tt("Three systems — PCB, body and battery.", "三大系统 —— 电路板、机身与电池。"),
        blocks: [
          {
            text: tt(
              "The main structure logic is to divide this machine into three main systems: PCB system, body system and battery system. The drone covers are metal (aluminium) made by die casting and CNC with anodic oxidation finishing, considering that this machine works in a high temperature environment. Components are connected using screws and nuts to make sure they stick tightly.",
              "主体结构逻辑是把整机分成三大系统：电路板系统、机身系统与电池系统。考虑到它要在高温环境下工作，无人机外壳采用金属（铝），以压铸加 CNC 成型、阳极氧化处理。各部件以螺栓螺母连接，确保结合紧密。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/exp1.jpg",
            caption: tt(
              "Drone exploded view — indicator and control panels, solar panel, PCB, motors, body covers, battery housing and the goods clamp.",
              "无人机爆炸图 —— 指示与控制面板、太阳能板、电路板、电机、机身外壳、电池仓与载物夹具。"
            ),
          },
          {
            text: tt(
              "Fire car structure is considered to use metal (aluminium) as the main material because of high temperature working. The metal covers are made by die casting and CNC with anodic oxidation finishing with laser-marking logo. All parts are connected with screws and nuts to make sure it is convenient to assemble or disassemble. Also component repairing is possible.",
              "消防小车同样因高温工况，以金属（铝）为主材。金属外壳以压铸加 CNC 成型、阳极氧化处理，并激光打标 logo。所有零件以螺栓螺母连接，便于装拆，也让部件维修成为可能。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/exp2.jpg",
            caption: tt("Ground vehicle exploded view.", "地面小车爆炸图。"),
          },
        ],
      },
      {
        id: "renders",
        eyebrow: tt("Renders", "渲染图"),
        label: tt("Renders", "渲染图"),
        lead: tt("The finished pair.", "完成的这一对。"),
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/r1.jpg", caption: tt("Drone render.", "无人机渲染图。") },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r2.jpg",
            caption: tt("Drone, alternate view.", "无人机，另一视角。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r3.jpg",
            caption: tt("Ground vehicle render.", "地面小车渲染图。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r4.jpg",
            caption: tt("Ground vehicle, alternate view.", "地面小车，另一视角。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r5.jpg",
            caption: tt("The system in context.", "系统置于真实场景中。"),
          },
        ],
      },
    ],
  },
  stationery: {
    role: tt("Product Designer", "产品设计师"),
    summary: tt(
      "This project uses the Four Treasures of the Study and traditional Chinese mortise and tenon joints, combined with ancient garden design, to explore Eastern art design. It seeks to promote a slow-paced lifestyle and harmony between humans and nature, highlighting traditional Chinese aesthetics.",
      "这个项目以文房四宝与中式榫卯为出发点，结合古典园林的造景手法，探索东方的艺术设计。它想提倡一种慢下来的生活方式与人与自然的和谐，凸显中国传统美学。"
    ),
    tags: [
      tt("Product design", "产品设计"),
      tt("Prototyping", "手作打样"),
      tt("Mortise and tenon joint", "榫卯结构"),
      tt("Traditional Chinese culture", "中国传统文化"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("Overview", "概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "“Place Life” series stationery product design.",
          "「置物生活」系列文具产品设计。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/stationery/hero.jpg",
            caption: tt(
              "A desk set built from the Four Treasures of the Study — brush, ink, paper and inkstone.",
              "一套由文房四宝衍生出的桌面器物 —— 笔、墨、纸、砚。"
            ),
          },
        ],
      },
      {
        id: "description",
        eyebrow: tt("Design description", "设计说明"),
        label: tt("Design description", "设计说明"),
        lead: tt(
          "A courtyard house, shrunk to the size of a desk.",
          "一座四合院，缩到一张书桌的尺度。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Four-sided box", "四合之形"),
                text: tt(
                  "The overall exterior shape draws inspiration from traditional Chinese courtyard buildings. The design is modeled after the four-sided courtyard layout.",
                  "整体外形取自中国传统合院建筑，依四面围合的院落格局造型。"
                ),
              },
              {
                term: tt("Frame art technique", "框景手法"),
                text: tt(
                  "Frame art is a traditional garden landscape technique. In the design, window frames are mimicked, placing selected landscape elements within the box. From the outside, it appears as a framed picture.",
                  "框景是传统园林的造景手法。设计中模拟窗棂，把选定的景物纳入盒内 —— 从外面看，便是一幅被框住的画。"
                ),
              },
              {
                term: tt("Garden landscape design", "园林造景"),
                text: tt(
                  "The garden design imitates natural landscapes with artificial mountains and waterscapes. Three mountains and a waterscape are created within the box’s interior.",
                  "园林以人工的山石水景模拟自然。盒内造出三山一水。"
                ),
              },
              {
                term: tt("Mountain and water curves", "山水曲线"),
                text: tt(
                  "The edges of the bottom lid are cut to mimic mountain and water curves, allowing for the placement of brushes.",
                  "底盖边缘依山水曲线切出起伏，正好可以搁笔。"
                ),
              },
              {
                term: tt("Ancient roof design", "古建屋面"),
                text: tt(
                  "The four sides of the box extract the curved lines from the roofs of ancient buildings, incorporating them into the design.",
                  "盒体四面提取古建屋顶的弧线，纳入造型之中。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/stationery/desc.jpg",
            caption: tt(
              "Each architectural reference and where it lands on the object.",
              "每一处建筑参照，以及它最终落在器物的哪个部位。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The borrowing works because it is structural rather than decorative. 框景 (frame art) is not applied as a pattern on the surface — it decides what you can see of the inkstone from outside, so the garden technique is doing the same job on the box that it does in a garden.",
              "这次借用之所以成立，是因为它是结构性的，而不是装饰性的。框景不是贴在表面的纹样 —— 它决定了你从外面能看到砚台的哪一部分，于是这个园林手法在盒子上干的活，和它在园林里干的活是同一件。"
            ),
          },
        ],
      },
      {
        id: "details",
        eyebrow: tt("Design details", "设计细节"),
        label: tt("Design details", "设计细节"),
        lead: tt("Held together by dovetail joints, not glue.", "靠燕尾榫咬合，而不是靠胶。"),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "The left and right sides are longer than the top and bottom sides. In the closed state, the left and right sides clamp onto the top and bottom sides.",
                "左右两侧比上下两侧更长，闭合时由左右夹住上下。"
              ),
              tt("The left and right sides of the box use dovetail joints.", "盒体左右两侧采用燕尾榫。"),
              tt(
                "The top and bottom lids share the dovetail joints, which complete the connection when closed.",
                "上下两盖共用同一组燕尾榫，闭合时连接才算完成。"
              ),
              tt(
                "The overall box’s four sides have beveled dovetail cuts, making it easier to connect the rectangular box sides.",
                "盒体四面均为斜切燕尾，让矩形盒体的各面更容易接合。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/stationery/details.jpg",
            caption: tt(
              "The joinery — how the four sides and two lids lock together.",
              "榫卯 —— 四面与两盖如何互相锁住。"
            ),
          },
        ],
      },
      {
        id: "product",
        eyebrow: tt("Product", "成品"),
        label: tt("Product", "成品"),
        lead: tt("The finished object.", "完成后的器物。"),
        blocks: [
          {
            type: "image",
            src: "/project/stationery/product.jpg",
            caption: tt("The complete “Place Life” set.", "完整的「置物生活」一套。"),
          },
          {
            type: "image",
            src: "/project/stationery/p1.jpg",
            caption: tt(
              "Closed — the framed landscape read through the lid.",
              "闭合 —— 透过盖面读到那幅被框住的山水。"
            ),
          },
          { type: "image", src: "/project/stationery/p2.jpg", caption: tt("The box from above.", "俯视盒体。") },
          {
            type: "image",
            src: "/project/stationery/p3.jpg",
            caption: tt(
              "Open — the inkstone basin as mountain and water, with the brush resting in the cut edge.",
              "打开 —— 砚池即是山水，笔搁在切出的边沿上。"
            ),
          },
          {
            type: "image",
            src: "/project/stationery/p4.jpg",
            caption: tt("Detail of the carved landscape.", "山水雕刻的细部。"),
          },
          { type: "image", src: "/project/stationery/p5.jpg", caption: tt("The set in use.", "使用中的这一套。") },
        ],
      },
    ],
  },
  "e-pack": {
    role: tt("Systemic Design · Master's thesis", "系统设计 · 硕士毕业论文"),
    summary: tt(
      "The thesis explores innovative smart packaging solutions in the Italian fashion industry, focusing on enhancing product sustainability and user engagement through systemic design. It aims to address critical issues within the fashion system by identifying trends and latent needs for smart packaging. The research proposes three integrable solutions: technologies for product traceability and authenticity, a system for collecting and reusing clothing, and a return and reuse system for e-commerce packaging. These strategies promote sustainability and encourage socially responsible consumer behavior.",
      "这篇论文探索意大利时尚产业中的智能包装方案，核心是用系统设计提升产品的可持续性与用户参与度。它通过识别智能包装的趋势与潜在需求，回应时尚系统内部的关键问题，并提出三个可整合的解法：产品溯源与防伪技术、衣物回收与再利用系统，以及电商包装的回收复用系统。这些策略共同推动可持续性，并鼓励具有社会责任感的消费行为。"
    ),
    tags: [
      tt("Systemic design", "系统设计"),
      tt("System design", "系统性设计"),
      tt("Smart packaging", "智能包装"),
      tt("Thesis", "毕业论文"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("Overview", "概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Smart packaging: a way to enhance Made in Italy fashion.",
          "智能包装：为「意大利制造」的时尚加值的一条路。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/cover.jpg",
            size: "lg",
            caption: tt(
              "E-PACK — a master’s thesis in systemic design.",
              "E-PACK —— 一篇系统设计方向的硕士毕业论文。"
            ),
          },
          {
            type: "links",
            items: [
              {
                label: tt("Presentation — Figma prototype", "答辩演示 —— Figma 原型"),
                href: "https://www.figma.com/proto/HC5WLsU4l2CVraHYpdUHbD/E-PACK-THESIS?page-id=3978%3A8666&node-id=3978-18781&viewport=947%2C5573%2C0.17&t=cHCRdfqYCdlyzdL6-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3978%3A18781",
                note: tt("The full thesis presentation.", "完整的论文演示。"),
              },
              {
                label: tt("Thesis — full document", "论文 —— 完整文档"),
                href: "https://drive.google.com/file/d/1b8AiW3tEfVoflgYm7ez3DLw2qAl1oCdy/view?usp=sharing",
                note: tt("The written thesis as a PDF.", "论文正文 PDF。"),
              },
            ],
          },
        ],
      },
      {
        id: "case-study",
        eyebrow: tt("Smart case study", "智能包装案例"),
        label: tt("Smart case study", "智能包装案例"),
        lead: tt(
          "What smart packaging already does, elsewhere.",
          "智能包装在别的行业里，已经做到了什么。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/case1.jpg",
            caption: tt(
              "Case analysis — 65 intelligent-packaging cases and 51 active-packaging cases, mapped by packaging level, reference sector and country.",
              "案例分析 —— 65 个智能包装案例与 51 个活性包装案例，按包装层级、所属行业与国家归类。"
            ),
          },
          { type: "image", src: "/project/e-pack/case2.jpg", caption: tt("Case analysis, continued.", "案例分析（续）。") },
          {
            type: "image",
            src: "/project/e-pack/case3.jpg",
            caption: tt("The technologies behind the cases.", "这些案例背后的技术。"),
          },
          {
            type: "note",
            text: tt(
              "The survey is what keeps the proposal grounded. Most of the 116 cases sit in food, beverage and pharmaceuticals rather than fashion — so the thesis is not inventing a technology, it is moving a proven one into a sector that has not adopted it.",
              "正是这份调研让提案站得住脚。116 个案例大多来自食品、饮料与医药，而不是时尚 —— 所以这篇论文不是在发明一项技术，而是把一项已被验证的技术，搬进一个尚未采用它的行业。"
            ),
          },
        ],
      },
      {
        id: "history",
        eyebrow: tt("History of Made in Italy", "「意大利制造」的历史"),
        label: tt("History of Made in Italy", "「意大利制造」的历史"),
        lead: tt(
          "Where the label came from, and what it now has to defend.",
          "这个标签从何而来，以及它如今要守住什么。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/hist1.jpg",
            caption: tt("The history of Made in Italy.", "「意大利制造」的历史。"),
          },
          {
            type: "image",
            src: "/project/e-pack/hist2.jpg",
            caption: tt("How the label is defined and certified.", "这个标签如何被定义与认证。"),
          },
          {
            type: "image",
            src: "/project/e-pack/hist3.jpg",
            caption: tt("The value and the vulnerability of the label.", "这个标签的价值，以及它的脆弱之处。"),
          },
        ],
      },
      {
        id: "fashion-system",
        eyebrow: tt("Fashion system", "时尚系统"),
        label: tt("Fashion system", "时尚系统"),
        lead: tt("The supply chain, drawn end to end.", "把供应链从头画到尾。"),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/sys1.jpg",
            caption: tt(
              "Supply chain of “Made in Italy” fashion — raw material through textile manufacture, garment manufacture, brand and retail.",
              "「意大利制造」时尚产业的供应链 —— 从原料，经纺织、成衣制造，到品牌与零售。"
            ),
          },
          {
            type: "image",
            src: "/project/e-pack/sys2.jpg",
            caption: tt("The system’s actors and flows.", "系统中的参与者与各条流。"),
          },
          {
            type: "image",
            src: "/project/e-pack/sys3.jpg",
            caption: tt(
              "Where waste and value leak out of the chain.",
              "废弃与价值从链条的哪些地方漏掉。"
            ),
          },
        ],
      },
      {
        id: "challenges",
        eyebrow: tt("Challenges and opportunities", "挑战与机会"),
        label: tt("Challenges and opportunities", "挑战与机会"),
        lead: tt(
          "Every challenge, matched to the opportunities that answer it.",
          "每一个挑战，都配上回应它的机会点。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/chal.jpg",
            caption: tt(
              "Challenges on the left, opportunities in the middle, and the case studies that evidence each one on the right — grouped as waste in Italy, product, and packaging.",
              "左侧是挑战，中间是机会，右侧是支撑它们的案例 —— 分为意大利的废弃物、产品与包装三组。"
            ),
          },
        ],
      },
      {
        id: "new-system",
        eyebrow: tt("New system", "新系统"),
        label: tt("New system", "新系统"),
        lead: tt("Three integrable solutions, in one flow.", "三个可整合的解法，接在同一条流上。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Traceability and authenticity", "溯源与防伪"),
                text: tt(
                  "A QR code on the label opens certification, traceability information and authentication — technologies for product traceability and authenticity.",
                  "吊牌上的二维码可打开认证、溯源信息与真伪验证 —— 即产品溯源与防伪技术。"
                ),
              },
              {
                term: tt("Collecting and reusing clothing", "衣物回收与再利用"),
                text: tt(
                  "A system for collecting and reusing clothing, routed through repair points, transformers and second-hand e-commerce.",
                  "一套衣物回收与再利用系统，经由修补点、改造方与二手电商流转。"
                ),
              },
              {
                term: tt("Return and reuse of packaging", "包装回收与复用"),
                text: tt(
                  "A return and reuse system for e-commerce packaging, carried back through logistics partners, pickup points and the collection company.",
                  "一套电商包装的回收复用系统，通过物流伙伴、自提点与回收公司把包装带回来。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/e-pack/hero.jpg",
            caption: tt(
              "The new system — packaging, material and process layers, with the old flows in orange and the new ones overlaid.",
              "新系统 —— 包装、材料与流程三层，旧流以橙色标出，新流叠加其上。"
            ),
          },
        ],
      },
      {
        id: "evaluation",
        eyebrow: tt("Evaluation", "评估"),
        label: tt("Evaluation", "评估"),
        lead: tt("Outcomes and impacts, over three horizons.", "三个时间跨度上的产出与影响。"),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/eval.jpg",
            caption: tt(
              "Short, medium and long term outcomes at micro, meso and macro scale — from efficient resource use and reduced waste through to a regenerated ecosystem and an enhanced Made in Italy.",
              "微观、中观与宏观尺度上的短、中、长期产出 —— 从资源高效利用与废弃减少，一直到生态系统的再生与「意大利制造」的升值。"
            ),
          },
        ],
      },
    ],
  },
  gobino: {
    role: tt("Systemic Design · Team project", "系统设计 · 团队项目"),
    summary: tt(
      "A systemic design study of Guido Gobino, the Turin chocolate maker — diagnosing the territory and the company, then proposing a new system of projects that closes its material flows and strengthens its link to Piedmont.",
      "对都灵巧克力品牌 Guido Gobino 所做的系统设计研究 —— 先对地域与企业做整体诊断，再提出一套新的项目系统，把它的物质流闭合起来，并加强它与皮埃蒙特的联系。"
    ),
    tags: [
      tt("Systemic design", "系统设计"),
      tt("System design", "系统性设计"),
      tt("Food system", "食品系统"),
      tt("Team project", "团队项目"),
    ],
    sections: [
      {
        id: "territory",
        eyebrow: tt("Territory", "地域"),
        label: tt("Holistic diagnosis — territory", "整体诊断 —— 地域"),
        lead: tt(
          "Piedmont, with a focus on the Metropolitan City of Turin.",
          "皮埃蒙特大区，重点是都灵都市区。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/1.jpg",
            caption: tt(
              "The territory — primary, secondary and tertiary sectors, population, waste, tourism and the history of chocolate in Turin.",
              "这片地域 —— 第一、第二、第三产业，人口、废弃物、旅游，以及都灵的巧克力历史。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/2.jpg",
            caption: tt(
              "The same diagnosis with the territory’s challenges marked on it.",
              "同一张诊断图，标出这片地域面临的挑战。"
            ),
          },
        ],
      },
      {
        id: "company",
        eyebrow: tt("Company", "企业"),
        label: tt("Holistic diagnosis — company", "整体诊断 —— 企业"),
        lead: tt(
          "Guido Gobino, chocolate maker in Turin since 1964.",
          "Guido Gobino，自 1964 年起在都灵做巧克力。"
        ),
        blocks: [
          {
            text: tt(
              "The history of Guido Gobino’s chocolate shop dates back to 1964. Careful selection of raw materials, complete control of the production chain, constant research into new flavours and accurate packaging design make Guido Gobino’s chocolate one of the best in Turin. Quality is credibility.",
              "Guido Gobino 这家巧克力店的历史可以追溯到 1964 年。对原料的严格挑选、对生产链的完整掌控、对新风味的持续研究，以及精准的包装设计，让它成为都灵最好的巧克力之一。品质即信誉。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/3.jpg",
            caption: tt(
              "Supply chain, competitors, company history and the calendar of production and arrival of raw materials.",
              "供应链、竞争者、企业历史，以及生产与原料到港的时间表。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/4.jpg",
            caption: tt(
              "The same diagnosis with the company’s challenges marked on it.",
              "同一张诊断图，标出企业面临的挑战。"
            ),
          },
        ],
      },
      {
        id: "maps",
        eyebrow: tt("System maps", "系统图"),
        label: tt("System maps", "系统图"),
        lead: tt("The flows as they run today.", "当下这些流实际的走法。"),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/8.jpg",
            caption: tt(
              "Linear map — cocoa and hazelnut in, chocolate out, with the outputs leaving the system.",
              "线性图 —— 可可与榛子进来、巧克力出去，副产物离开系统。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/7.jpg",
            caption: tt(
              "Systemic map — the same chain with its outputs routed back into local actors at town, regional and national scale.",
              "系统图 —— 同一条链条，副产物被导回城镇、区域与国家三个尺度上的本地参与者。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The pair is the argument. The two maps carry the same production chain, so the only difference is what happens to cocoa bean shells, hazelnut cuticles, jute and used packaging — waste in the first map, inputs to someone else in the second.",
              "这两张图本身就是论点。它们画的是同一条生产链，唯一的差别在于可可壳、榛子皮、麻袋与用过的包装去了哪里 —— 在第一张图里是废弃物，在第二张图里是别人的原料。"
            ),
          },
        ],
      },
      {
        id: "opportunities",
        eyebrow: tt("Challenges and opportunities", "挑战与机会"),
        label: tt("Challenges and opportunities", "挑战与机会"),
        lead: tt(
          "Company and territory challenges, against what could answer them.",
          "企业与地域的挑战，对上能回应它们的东西。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/5.jpg",
            caption: tt(
              "Every company and territory challenge linked to the opportunities that address it, evidenced by case studies.",
              "每个企业与地域挑战，都连向回应它的机会点，并由案例支撑。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/6.jpg",
            caption: tt(
              "Opportunities scored on innovation, financial return, social interest, networking and sustainability — selecting nine projects to take forward.",
              "机会点按创新性、财务回报、社会价值、网络联结与可持续性评分 —— 筛出九个项目继续推进。"
            ),
          },
        ],
      },
      {
        id: "roadmap",
        eyebrow: tt("Roadmap", "路线图"),
        label: tt("Roadmap", "路线图"),
        lead: tt(
          "Nine projects, across short, medium and long term.",
          "九个项目，分布在短、中、长期。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/9.jpg",
            caption: tt(
              "Roadmap — new products for the line-up, jute and paper packaging, cocoa certification, a communication strategy and the promotion of the chocolate district.",
              "路线图 —— 产品线的新品、麻与纸的包装、可可认证、传播策略，以及巧克力街区的推广。"
            ),
          },
        ],
      },
      {
        id: "evaluation",
        eyebrow: tt("Evaluation", "评估"),
        label: tt("Evaluate the system", "评估这个系统"),
        lead: tt(
          "Outcomes and impacts at micro, meso and macro scale.",
          "微观、中观与宏观尺度上的产出与影响。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/10.jpg",
            caption: tt(
              "Each project traced to its outcomes and impacts — from reduced environmental load and recycled waste through to increased territorial value and a stronger Made in Turin.",
              "每个项目都被追踪到它的产出与影响 —— 从环境负荷下降、废弃物被回收，一直到地域价值提升与更有分量的「都灵制造」。"
            ),
          },
          {
            type: "video",
            src: "https://www.youtube.com/embed/TqOcN8r7qaE",
            title: tt("Systemic Design for Guido Gobino", "Guido Gobino 的系统设计"),
            caption: tt("Project walkthrough.", "项目完整演示。"),
          },
          {
            type: "note",
            text: tt(
              "Credit where it is due: this was a team project for the Open Systems module of the Master’s in Systemic Design, with eight authors credited on every board.",
              "该署的名要署：这是系统设计硕士「开放系统」课程的团队项目，每一张图板上都署有八位作者。"
            ),
          },
        ],
      },
    ],
  },
}
