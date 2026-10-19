// The "StoryMap" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "07 StoryMap · 新版").
//
// Copy only; the drawing lives in StoryMapBoard.jsx. The deck frame is Chinese, so
// the English side is a translation — kept short, because every cell is a fixed box
// in the board's own coordinates and a line that runs long pushes the chips out.
//
// The three people are the same ones the Persona board introduces, and they reuse
// its photographs rather than carrying their own copies.
import { tt } from "../i18n/t"

export const kyrallStoryMap = {
  title: tt(
    "User journey: the same work, on the new workflow",
    "用户旅程：使用新的工作流程提高工作效率"
  ),

  // The deck sets each stage twice — the Chinese word on the left, the English on
  // the right. At the page's sizes the pair no longer fits the bar ("遇见 Kyrall" and
  // "DISCOVER" overlap by 50px), so each language keeps only its own word, in the
  // mono position the deck gave the English one. `lit` marks the two stages Kyrall
  // owns, which the deck fills with the accent.
  stages: [
    { n: "01", label: tt("TRIGGER", "触发") },
    { n: "02", label: tt("FRUSTRATION", "受挫") },
    { n: "03", label: tt("DISCOVER", "遇见 Kyrall") },
    { n: "04", label: tt("USE", "使用"), lit: true },
    { n: "05", label: tt("VALUE", "价值"), lit: true },
  ],

  rows: [
    {
      photo: "tobias.jpg",
      name: "Tobias",
      role: tt("Senior design engineer", "资深机械设计工程师"),
      cells: [
        {
          text: tt(
            "A project kicks off; I need concept directions to discuss with the PM, fast.",
            "新项目启动，需要尽快和 PM 讨论几个概念方向"
          ),
        },
        {
          text: tt(
            "A rough model in traditional CAD takes days, and most options are dropped anyway.",
            "传统 CAD 建一个粗模型要好几天，而且很多方案最后被放弃"
          ),
        },
        {
          text: tt(
            "Describe it in words, add a hand sketch, and an editable 3D model lands in minutes.",
            "用文字描述需求，输入手绘的草图，几分钟拿到可编辑的 3D 模型"
          ),
        },
        {
          text: tt(
            "Generate with AI, tune the dimensions, restructure on its suggestions.",
            "先让 AI 生成，再用参数化编辑微调尺寸，按 AI 建议改结构"
          ),
          chips: [
            tt("AI generation", "AI 生成"),
            tt("Parametric editing", "参数化可编辑"),
            tt("AI suggestions", "AI 建议"),
          ],
        },
        {
          text: tt(
            "Several directions compared in a day, with a model to take into review.",
            "一天内比较多个方向，带着模型进入评审"
          ),
          chips: [tt("Share", "分享"), tt("Export", "导出")],
        },
      ],
    },
    {
      photo: "marcus.jpg",
      name: "Marcus",
      role: tt("Mechanical design engineer", "机械设计工程师"),
      cells: [
        {
          text: tt(
            "The client sends a scan or an STL, and asks for changes on top of it.",
            "客户只给了一个扫描件或 STL，要在它基础上新增需求"
          ),
        },
        {
          text: tt(
            "A mesh can't be edited — the only way in is to redraw it from nothing.",
            "网格无法直接编辑，只能对着它从零重画一遍"
          ),
        },
        {
          text: tt(
            "Upload to Mesh Workspace; it rebuilds parametric CAD with a feature tree.",
            "上传到 Mesh Workspace，重建出带特征树的参数化 CAD"
          ),
        },
        {
          text: tt(
            "Ask the Editor's AI for the change, adjust fillets and chamfers directly.",
            "在 Editor 里用 AI 输入新增需求，直接改圆角 / 倒角，不用再手动建模"
          ),
          chips: [tt("Mesh → CAD", "Mesh → CAD"), tt("Fillet / chamfer", "圆角 / 倒角")],
        },
        {
          text: tt(
            "Reverse engineering skipped; detailed design continues in Onshape.",
            "跳过逆向建模，直接在 Onshape 中继续详细设计"
          ),
          chips: [tt("Open in Onshape", "Open in Onshape")],
        },
      ],
    },
    {
      photo: "alexandra.jpg",
      name: "Alexandra",
      role: tt("Head of mechanical R&D", "机械研发团队负责人"),
      cells: [
        {
          text: tt(
            "Several projects at once; requirements, drawings and standards sit everywhere.",
            "团队同时推进多个项目，需求和图纸以及各种设计规范散落各处"
          ),
        },
        {
          text: tt(
            "New people can't find the context, so the same questions come back every time.",
            "新成员找不到上下文，同样的问题反复出现，设计约束和公司规范问题需要一一校对"
          ),
        },
        {
          text: tt(
            "Requirement docs, drawings and legacy CAD all go into context management.",
            "把需求文档、图纸和旧 CAD 上传到上下文管理"
          ),
        },
        {
          text: tt(
            "Models generate from the team's own knowledge, shared in the team workspace.",
            "基于团队知识快速生成模型，在团队空间里共享"
          ),
          chips: [tt("Context management", "上下文管理"), tt("Team workspace", "团队空间")],
        },
        {
          text: tt(
            "Design decisions stay traceable, and the team works in one workspace.",
            "设计决策可追溯，团队可以在同一个工作空间协作"
          ),
          chips: [tt("Team workspace", "团队空间"), tt("Share", "Share")],
        },
      ],
    },
  ],
}
