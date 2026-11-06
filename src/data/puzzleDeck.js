// Jigsaw Puzzle (拼图游戏) — the case-study deck, as page content.
//
// The source is the right-hand column of the Figma 「拼图游戏」 file: ten 1920-wide
// slides, one chapter each. Every word here is the deck's own, as real text in
// both languages; nothing is a flattened export of a slide. The artwork (the
// phone mock-ups, the three mood photographs, the 3D puzzle cube, the coins, the
// three card states) is exported from the same file into
// /public/project/puzzle-game/deck/.
//
// Each entry is one slide. `kind` picks the layout in PuzzleDeck.jsx, which
// re-lays the slide as tiles on the page's grid; the rest is that layout's content.
import { tt } from "../i18n/t"

const ART = "/project/puzzle-game/deck"
const art = (name) => `${ART}/${name}.webp`

// --- The page header -------------------------------------------------------
//
// The deck's cover ("JIGSAW PUZZLE") is rebuilt as the first tile of the Overview;
// the page's own hero takes the closing slide's wall of screens as its backdrop.

export const puzzleRole = tt("UX/UI · Game Design", "UX/UI · 游戏化设计")

export const puzzleSummary = tt(
  "A limited-time event inside a mobile puzzle game: players collect puzzle pages to complete storybooks. The work covers the event flow, a dynamic beginner guide, and the visual system that carries both.",
  "手机拼图游戏里的一个限时活动：玩家收集拼图页，集成一本本绘本。工作涵盖活动流程、动态新手引导，以及承载这两者的视觉系统。"
)

export const puzzleHero = {
  image: art("display"),
  headline: tt("Collect nine puzzle pages to complete a storybook.", "收集九张拼图页，集成一本绘本。"),
}

export const puzzleTags = [
  tt("UX/UI design", "UX/UI 设计"),
  tt("Game design", "游戏化设计"),
  tt("Mobile design", "移动端设计"),
]

// --- The slides ------------------------------------------------------------

// 01 · Cover — the title, the brief in one paragraph, and the event screen.
const cover = {
  kind: "cover",
  topLeft: tt("Jigsaw Puzzle · 2025", "拼图游戏 · 2025"),
  topRight: tt("Interface design", "界面设计"),
  title: ["JIGSAW", "PUZZLE"],
  text: tt(
    "Players enter the activity interface and complete the puzzle pages of the puzzle set (storybook) through the puzzle game. Collect 9 puzzle pages to create a puzzle set. The newly created storybook is added to the bookshelf, where it can be opened during or after the activity to play its puzzle pages again.",
    "玩家进入活动界面，通过拼图玩法完成拼图集（绘本）里的各页。收集满 9 张拼图页即可集成一册，新集成的绘本会被放进书架；活动期间或结束后都能从书架打开它，重玩其中的拼图页。"
  ),
  tag: tt("Game design", "游戏化设计"),
  phone: art("cover-phone"),
}

// 02 · User journey map — five stages, a mood curve, and what each dip becomes.
const journey = {
  kind: "journey",
  labels: {
    stage: tt("Stage", "阶段"),
    touch: tt("Touchpoint", "触点"),
    mood: tt("Mood curve", "心情曲线"),
    pain: tt("Pain points", "痛点"),
    opp: tt("Opportunities", "机会点"),
  },
  stages: [
    {
      name: tt("Enter page", "进入页面"),
      touch: tt("Puzzle set activity", "拼图集活动"),
      pain: tt("Unaware of puzzle activities, resulting in low completion rates", "不知道有拼图活动，完成率低"),
      opp: tt("Promote puzzle set activities", "推送拼图集活动"),
    },
    {
      name: tt("Select puzzle set", "选择拼图集"),
      touch: tt("Mainline and event puzzle sets", "主线和活动拼图集"),
      pain: tt("Overwhelming content, difficult to decide; uncertain about the number of puzzles", "内容太多，无法抉择；不知道拼图数量"),
      opp: tt("Categorize mainline and activities; display puzzle progress", "分类主线和活动；展示拼图状态"),
    },
    {
      name: tt("Beginner guide", "新手引导"),
      touch: tt("Guiding gesture", "引导手势"),
      pain: tt("Static guidance fails to help users understand quickly", "静态引导无法让用户快速理解"),
      opp: tt("Interactive guidance; reduce user learning effort", "动态引导，降低用户理解成本"),
    },
    {
      name: tt("Puzzle in progress", "拼图中"),
      touch: tt("Puzzle interface and hints", "拼图界面及提示"),
      pain: null,
      opp: null,
    },
    {
      name: tt("Complete puzzle", "完成拼图"),
      touch: tt("Completion popup", "完成弹窗"),
      pain: tt("Game ends without reward feedback", "结束游戏，无奖励反馈"),
      opp: tt("Emotional engagement mechanism; coin reward mechanism", "情感化机制；金币奖励机制"),
    },
  ],
}

// 03 · User motivation — who plays, and what keeps them playing.
const motivation = {
  kind: "motivation",
  left: {
    label: tt("User traits", "用户特征"),
    title: tt("Teenage group", "年轻群体"),
    text: tt("Active users are mostly teenagers.", "活跃用户以青少年为主。"),
    bubbles: [
      { text: tt("User experience", "体验感"), size: "sm" },
      { text: tt("Engagement", "参与感"), size: "lg" },
      { text: tt("Belonging", "归属感"), size: "sm" },
      { text: tt("Identification", "认同感"), size: "md" },
    ],
  },
  center: {
    img: art("cube"),
    caption: tt("Motivations of users", "用户动机"),
  },
  right: {
    label: tt("Drive to use", "使用动力"),
    title: tt("Attraction-driven", "吸引力驱动"),
    text: tt("Fun and appeal are the biggest drivers.", "有趣和吸引力是最大的动力。"),
    bubbles: [
      { text: tt("Excitement", "兴奋感"), size: "sm" },
      { text: tt("Accomplishment", "成就感"), size: "lg" },
      { text: tt("Enjoyment", "愉悦感"), size: "sm" },
      { text: tt("Emotional bond", "情感联结"), size: "md" },
    ],
  },
}

// 04 · Design strategy — three pillars, three bullets each.
const strategy = {
  kind: "strategy",
  cards: [
    {
      icon: "circle",
      title: tt("Interaction experience", "交互体验"),
      items: [
        tt("Swipe interaction method", "滑动式交互"),
        tt("Pop-ups to reduce navigation", "用弹层减少页面跳转"),
        tt("User action guidance", "对用户操作给出引导"),
      ],
    },
    {
      icon: "bars",
      title: tt("Content navigation", "内容导航"),
      items: [
        tt("Puzzle set status visualization", "拼图集状态可视化"),
        tt("Puzzle set waterfall layout", "拼图集瀑布流布局"),
        tt("Categorized tags for faster search", "分类标签加快查找"),
      ],
    },
    {
      icon: "star",
      title: tt("Visual effects", "视觉表现"),
      items: [
        tt("Playful typography", "俏皮的字体排版"),
        tt("Youthful and vibrant colors", "年轻鲜亮的色彩"),
        tt("Unified components", "统一的组件"),
      ],
    },
  ],
}

// 05 · Emotional edition — three keywords and the imagery behind each.
const emotional = {
  kind: "emotional",
  keys: [
    {
      icon: `${ART}/icon-young.svg`,
      color: "#ff6f86",
      title: tt("Young", "年轻"),
      text: tt("Target audience mainly consists of teenagers.", "目标用户以青少年为主。"),
    },
    {
      icon: `${ART}/icon-immersion.svg`,
      color: "#6a5cff",
      title: tt("Immersion", "沉浸"),
      text: tt("Purple ambiance enhances immersion.", "紫色氛围增强沉浸感。"),
    },
    {
      icon: `${ART}/icon-interesting.svg`,
      color: "#f07a2c",
      title: tt("Interesting", "有趣"),
      text: tt("Enjoyable experiences enhance user loyalty.", "愉快的体验提升用户忠诚度。"),
    },
  ],
  photos: [
    { img: art("mood-immersion"), label: tt("Immersion", "沉浸") },
    { img: art("mood-young"), label: tt("Young", "年轻") },
    { img: art("mood-interesting"), label: tt("Interesting", "有趣") },
  ],
}

// 06 · Color standard — the palette, as the deck states it.
const colors = {
  kind: "colors",
  primary: { label: tt("Primary color", "主色"), hex: "#9F7FFF – #8055FE", bg: "linear-gradient(90deg, #9f7fff 0%, #8055fe 100%)" },
  secondary: { label: tt("Secondary color", "辅色"), hex: "#7C90FA", bg: "#7c90fa" },
  accents: [
    { hex: "#4460ED", top: "#4460ed", bottom: "#7c90fa" },
    { hex: "#ED6FF7", top: "#ed6ff7", bottom: "#e24cf0" },
    { hex: "#E86124", top: "#e86124", bottom: "#f08a2e" },
  ],
}

// 07 · Home page — the event list, annotated.
const home = {
  kind: "home",
  phone: art("home-phone"),
  coin: art("coin"),
  parts: [
    {
      title: tt("Category section", "分类区"),
      text: tt("Mainline + event categories", "主线 + 活动分类"),
      callout: tt("Clear categorization", "清晰的分类"),
    },
    {
      title: tt("Content section", "内容区"),
      text: tt("Puzzle set waterfall display", "拼图集瀑布流展示"),
      callout: tt("Simple and recognizable", "简单易识别"),
      states: [
        {
          img: art("card-upcoming"),
          name: tt("Upcoming event", "未开始"),
          notes: [tt("Condition", "解锁条件"), tt("Event duration", "活动时间"), tt("Event name", "活动名称")],
        },
        {
          img: art("card-progress"),
          name: tt("In progress", "进行中"),
          notes: [tt("Event duration", "活动时间"), tt("Event name", "活动名称"), tt("Progress bar", "进度条")],
        },
        {
          img: art("card-done"),
          name: tt("Completed", "已完成"),
          notes: [tt("Full artwork, no label", "完整画面，不带标签")],
        },
      ],
    },
    {
      title: tt("Account data section", "账户数据区"),
      text: tt("Diamond count + coin count", "钻石数 + 金币数"),
      callout: tt("Increase enjoyment", "提升愉悦感"),
    },
  ],
}

// 08 · Process display — landing page through to the completed puzzle.
const process = {
  kind: "process",
  steps: [
    {
      img: art("flow-1"),
      title: tt("Landing page", "落地页"),
      text: tt(
        "When users enter the app, the latest puzzle set activities are shown first, with notifications to raise awareness and participation. If the event has not started yet, the Play button reads Reserve, and users are notified when the event begins.",
        "用户进入 App 时，优先展示最新的拼图集活动，并用通知提高曝光、增加参与。活动尚未开始时，「开始」按钮改为「预约」，活动开始后用户会收到通知。"
      ),
    },
    {
      img: art("flow-2"),
      title: tt("Puzzle set page", "拼图集页"),
      text: tt(
        "The storybook's cover, its nine pages down the side, and one Play button.",
        "绘本封面、侧边的九张拼图页，以及一个「开始」按钮。"
      ),
    },
    {
      img: art("flow-3"),
      title: tt("Puzzle in progress", "拼图进行中"),
      text: tt(
        "Pieces sit in a tray below the board; a hint button sits in the corner.",
        "拼块排在画板下方的托盘里，提示按钮在角落。"
      ),
    },
    {
      img: art("flow-4"),
      title: tt("Complete puzzle", "完成拼图"),
      text: tt(
        "When the user completes the last puzzle piece, a transition animation plays and redirects to the puzzle set page.",
        "用户拼上最后一块时播放过渡动画，并回到拼图集页面。"
      ),
    },
  ],
}

// 09 · Operation guidance — each gesture taught in place, as it is needed.
const guidance = {
  kind: "guidance",
  items: [
    {
      img: art("guide-1"),
      title: tt("Swipe piece placement area", "滑动拼块区"),
      text: tt("Guide the user to the next step upon following the swipe instructions.", "用户按提示滑动后，引导进入下一步。"),
    },
    {
      img: art("guide-2"),
      title: tt("Puzzle play mechanics", "拼图玩法机制"),
      text: tt(
        "As the user moves a piece, show the matching position. The piece will automatically snap into place when positioned correctly.",
        "用户拖动拼块时显示匹配位置，位置正确时拼块会自动吸附到位。"
      ),
    },
    {
      img: art("guide-3"),
      title: tt("Zoom in/out puzzle", "缩放拼图"),
      text: tt("Pinch with two fingers to zoom in or out on the puzzle.", "双指捏合，放大或缩小拼图。"),
    },
  ],
}

// 10 · Page display — the finished screens, in one wall.
const display = {
  kind: "display",
  img: art("display"),
  alt: tt("The event list, puzzle sets and in-game puzzle screens.", "活动列表、拼图集，以及游戏内的拼图界面。"),
}

// --- The chapters ----------------------------------------------------------

const deck = (slide) => ({ type: "pzdeck", slide })

export const puzzleSections = [
  {
    id: "overview",
    eyebrow: tt("Overview", "概览"),
    label: tt("Overview", "概览"),
    heading: tt("Overview", "概览"),
    lead: tt(
      "This project improves the interactive experience of a mobile puzzle game by designing the flow of a limited-time event, in which players collect puzzle pages to complete storybooks. The goal is higher engagement and completion, helped by a tutorial that lets new players understand the gameplay quickly.",
      "这个项目要提升一款手机拼图游戏的互动体验：设计一个限时活动的流程，玩家收集拼图页来集成绘本。目标是更高的参与度与完成率，并通过一套能让新手迅速看懂玩法的引导来实现。"
    ),
    blocks: [deck(cover)],
  },
  {
    id: "journey",
    eyebrow: tt("User journey map", "用户旅程图"),
    label: tt("User journey map", "用户旅程图"),
    heading: tt("User journey map", "用户旅程地图"),
    lead: tt(
      "Analyze user pain points and product opportunities through a user journey map to summarize design strategies.",
      "通过用户旅程地图分析用户痛点和产品机会点，从而总结设计策略。"
    ),
    blocks: [
      deck(journey),
      {
        type: "note",
        text: tt(
          "The mood curve is doing the real work here. It dips twice, once at selection and once after completion, and both dips become features: categorisation fixes the first, the reward moment fixes the second.",
          "真正在干活的是那条情绪曲线。它有两次下陷，一次在选择时，一次在完成之后，两次下陷都变成了功能：分类解决前一次，奖励时刻解决后一次。"
        ),
      },
    ],
  },
  {
    id: "motivation",
    eyebrow: tt("User motivation", "用户动机"),
    label: tt("User motivation", "用户动机"),
    heading: tt("User motivation", "用户动机"),
    lead: tt(
      "Pay attention to user experience, analyze user motivation to stimulate behavior, meet the demands of different roles, improve participation and completion rates, and enable users to reach multiple points of participation and achievement.",
      "关注用户体验，分析用户动机以激发行为，满足不同角色的需求，提升参与度与完成率，让用户获得多个参与与成就的落点。"
    ),
    blocks: [deck(motivation)],
  },
  {
    id: "strategy",
    eyebrow: tt("Design strategy", "设计策略"),
    label: tt("Design strategy", "设计策略"),
    heading: tt("Design strategy", "设计策略"),
    lead: tt(
      "Developed product design strategy based on the user experience report and user motivation.",
      "基于体验报告与用户动机分析，制定产品设计策略。"
    ),
    blocks: [deck(strategy)],
  },
  {
    id: "emotional",
    eyebrow: tt("Emotional edition", "情绪定调"),
    label: tt("Emotional edition", "情绪定调"),
    heading: tt("Emotional edition", "情绪定调"),
    lead: tt(
      "Based on preliminary product research and analysis of the brand's target user group, keywords for the ideal product have been derived, with children being the main group. The design style is youthful and lively, with soft and comfortable colors.",
      "基于前期产品调研与品牌目标用户分析，提炼出理想产品的关键词，主力用户是儿童。设计风格年轻活泼，色彩柔和舒适。"
    ),
    blocks: [deck(emotional)],
  },
  {
    id: "color",
    eyebrow: tt("Color standard", "色彩规范"),
    label: tt("Color standard", "色彩规范"),
    heading: tt("Color standard", "色彩规范"),
    lead: tt(
      "The color selection is full of childlike purple as the main color, unifying the brand tone, and the accent color is blue from the adjacent color series as the auxiliary color.",
      "主色选用充满童趣的紫色，统一品牌调性；点缀色取邻近色系中的蓝色作为辅助色。"
    ),
    blocks: [deck(colors)],
  },
  {
    id: "homepage",
    eyebrow: tt("Home page", "首页"),
    label: tt("Home page", "首页"),
    heading: tt("Home page", "首页"),
    lead: tt(
      "The homepage is divided into two tags, each containing a category bar, coin information, and diamond information.",
      "首页分为两个标签页，各自包含分类栏、金币信息与钻石信息。"
    ),
    blocks: [deck(home)],
  },
  {
    id: "process",
    eyebrow: tt("Process display", "流程展示"),
    label: tt("Process display", "流程展示"),
    heading: tt("Process display", "流程展示"),
    lead: tt(
      "Simple and intuitive interaction that lowers the difficulty of operation, in line with the user research results and user attributes.",
      "用简单直觉的交互降低操作难度，与用户研究结果和用户属性保持一致。"
    ),
    blocks: [deck(process)],
  },
  {
    id: "guidance",
    eyebrow: tt("Operation guidance", "操作引导"),
    label: tt("Operation guidance", "操作引导"),
    heading: tt("Operation guidance", "操作引导"),
    lead: tt(
      "Adopting dynamic beginner guidance to guide users, further reducing the threshold for operation and improving usability.",
      "采用动态新手引导带着用户走，进一步降低操作门槛、提升易用性。"
    ),
    blocks: [
      deck(guidance),
      {
        type: "note",
        text: tt(
          "This is the answer to the brief. “Static guidance fails to help users understand quickly” was the journey map's third pain point, and the fix is that the tutorial stops being a screen the player dismisses and becomes a prompt attached to the action itself.",
          "这就是对命题的回答。「静态引导无法让用户迅速看懂」是旅程图里的第三个痛点，解法是：教程不再是一块玩家顺手划掉的界面，而变成贴在动作本身上的提示。"
        ),
      },
    ],
  },
  {
    id: "display",
    eyebrow: tt("Page display", "页面展示"),
    label: tt("Page display", "页面展示"),
    heading: tt("Page display", "页面展示"),
    lead: tt("The finished screens.", "最终的界面。"),
    blocks: [deck(display)],
  },
]
