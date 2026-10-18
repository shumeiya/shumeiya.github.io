// The "From 0 to 1" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frames "02 From 0 to 1 · EN" / "02 从0到1").
//
// Coordinates are the artboard's own, with its dead margins taken off: the deck's
// 1920 × 1080 slide is cropped to the band-and-tracks area it actually draws in
// (x 120 → 1800, y 290 → 954), which is the BOARD_W × BOARD_H box in WorkflowBoard.
// The deck's title block is dropped — the section heading above the figure says the
// same thing — and so is the background grid.
//
// `zh` on a card is the Chinese artboard's own position for it: the two language
// versions nudge a few cards apart because the copy sets to different widths, and
// following each artboard keeps both free of collisions.
import { tt } from "../i18n/t"

const LIME = "lime"
const DARK = "dark"
const GREY = "grey"

export const kyrallWorkflow = {
  // One column per stage: `x` is its centre line, `line` how far its rule drops,
  // `lit` whether rule and dot are the accent or grey.
  stages: [
    { x: 60, line: 416, lit: true, label: tt("Vision", "愿景") },
    { x: 210, line: 211, lit: false, label: tt("Research", "调研") },
    { x: 370, line: 74, lit: false, label: tt("Define", "定义") },
    { x: 540, line: 354, lit: true, label: tt("Design System", "设计系统") },
    { x: 840, line: 47, lit: true, label: tt("Design", "设计方案") },
    { x: 1150, line: 280, lit: true, label: tt("Handoff", "设计交付走查") },
    { x: 1310, line: 74, lit: false, label: tt("Launch", "上线") },
    { x: 1470, line: 82, lit: false, label: tt("Analytics", "数据分析") },
    { x: 1625, line: 278, lit: false, label: tt("Iterate", "迭代") },
  ],

  cards: [
    {
      x: 0,
      y: 496,
      zh: { y: 505 },
      fill: LIME,
      stroke: LIME,
      text: tt(
        "Vision: Design and build hardware at the speed of thought",
        "愿景：以思维的速度设计与制造硬件"
      ),
    },
    { x: 89, y: 291, fill: DARK, stroke: GREY, text: tt("Competitors: Zoo / AdamCAD", "竞品：Zoo / AdamCAD") },
    {
      x: 89,
      y: 350,
      fill: DARK,
      stroke: GREY,
      text: tt("Interaction ref: Onshape / SolidWorks", "工具交互逻辑：Onshape / SolidWorks"),
    },
    { x: 248, y: 154, fill: DARK, stroke: LIME, text: tt("IA: Core generation flow", "信息架构：核心生成流程") },
    {
      x: 405,
      y: 434,
      fill: LIME,
      stroke: LIME,
      text: tt("Design System: Visual language · Components · Tokens", "设计系统：视觉语言 · 组件库 · Token"),
    },
    {
      x: 640,
      y: 126,
      fill: LIME,
      stroke: LIME,
      text: tt("Core flow: Dashboard → Editor → Export", "核心链路：Dashboard → Editor → Export"),
    },
    { x: 640, y: 185, fill: DARK, stroke: LIME, text: tt("Navigation: 9 scenario pages", "导航：9 个场景页面") },
    { x: 640, y: 244, fill: DARK, stroke: LIME, text: tt("Editor: 10 tool interactions", "编辑器：10 种工具交互") },
    {
      x: 640,
      y: 303,
      fill: DARK,
      stroke: GREY,
      text: tt("States: Empty · Loading · Limit · Error", "状态：空 · 加载 · 限额 · 错误"),
    },
    {
      x: 1026,
      y: 360,
      zh: { x: 983, y: 317 },
      fill: DARK,
      stroke: LIME,
      text: tt("Handoff: Figma file · Dev notes", "交付：Figma 设计稿 · Design To Dev 标注"),
    },
    {
      x: 1026,
      y: 419,
      zh: { x: 983, y: 375 },
      fill: LIME,
      stroke: LIME,
      text: tt("Code: HTML / CSS", "代码：前端 HTML / CSS"),
    },
    { x: 1231, y: 154, zh: { x: 1217 }, fill: DARK, stroke: GREY, text: tt("Go live", "产品上线") },
    {
      x: 1340,
      y: 162,
      zh: { x: 1332 },
      fill: DARK,
      stroke: LIME,
      text: tt("PostHog: Friction mapping", "分析：PostHog · 摩擦定位"),
    },
    {
      x: 1340,
      y: 221,
      zh: { x: 1332, y: 220 },
      fill: DARK,
      stroke: GREY,
      // Two lines on the board, and they stay two: a tracking method and a research
      // method, not one sentence.
      text: [
        tt("Tracking: Events · Replay", "追踪：埋点 · Session Replay"),
        tt("Analysis: User interviews", "研究：用户访谈"),
      ],
    },
    {
      x: 1372,
      y: 358,
      zh: { x: 1401, y: 346 },
      fill: DARK,
      stroke: LIME,
      text: tt("Optimize: Friction fixes · Polish", "优化：摩擦点修复 · 体验优化"),
    },
    {
      x: 1288,
      y: 417,
      zh: { x: 1271, y: 404 },
      fill: DARK,
      stroke: GREY,
      text: tt("New: Fillet / Chamfer · Mesh Workspace", "新功能：Fillet / Chamfer · Mesh Workspace"),
    },
  ],

  // The two rails under the board. Fixed width, centred copy. `tone` picks the paint:
  // "grey" is the quiet band, "lime" the accent-outlined one. The accent rail is drawn
  // with no fill in the deck, where the grid showed through it; with the grid gone it
  // takes the same surface as the cards so its copy keeps its contrast.
  bars: [
    {
      x: 440,
      y: 561,
      w: 1240,
      tone: "grey",
      text: tt(
        "Design System upkeep: aligned with front-end, one shared set of interaction components",
        "Design System 持续维护：对齐前端，复用同一套交互组件"
      ),
    },
    {
      x: 1080,
      y: 618,
      w: 600,
      tone: "lime",
      text: tt(
        "Launch → Data → Iterate · Better UX, continuous new features",
        "上线 → 数据 → 迭代 · 优化体验，新功能持续扩展"
      ),
    },
  ],

}
