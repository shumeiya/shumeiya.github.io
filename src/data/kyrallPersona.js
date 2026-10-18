// The "Persona" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "06 Persona · 新版").
//
// Copy only; the drawing lives in PersonaBoard.jsx. The deck frame is Chinese, so
// the English side is a translation. Each card is a fixed 560px column in the
// board's own coordinates, so a line that runs much longer in English will push
// the sections below it down — keep the two languages about the same length.
import { tt } from "../i18n/t"

export const kyrallPersona = {
  title: tt(
    "Personas: roles around a mechanical team",
    "用户画像：围绕机械工程团队的主要角色"
  ),

  // The two section headings repeat on every card, so they live here once.
  goalLabel: tt("GOAL  /  Goal", "GOAL  /  目标"),
  painLabel: tt("PAIN  /  Pain", "PAIN  /  痛点"),
  chanceLabel: tt("KYRALL opportunity", "KYRALL 的机会"),

  cards: [
    {
      photo: "tobias.jpg",
      stage: tt("Stage · Concept design", "阶段 · 概念设计"),
      name: "Tobias",
      meta: tt("48 · Senior mechanical design engineer", "48 · 资深机械设计工程师"),
      quote: tt(
        "“I need a few options to discuss early in a project, but modelling each one from scratch is far too slow.”",
        "“我需要在项目早期就拿出几个能讨论的方案，但每个方案都要从头建模，太慢了。”"
      ),
      goal: tt(
        "Produce concept models worth discussing and evaluating, early in the project.",
        "在项目早期快速产出可讨论、可评估的概念模型。"
      ),
      pain: tt(
        "Traditional CAD modelling is slow — a design iteration often takes weeks, and many early models are never used.",
        "传统 CAD 建模慢，一次设计迭代往往要数周；很多早期模型最后用不上。"
      ),
      chances: [
        tt("AI generation", "AI 生成"),
        tt("Parametric editing", "参数化可编辑"),
        tt("AI suggestions", "AI 建议"),
      ],
    },
    {
      photo: "marcus.jpg",
      stage: tt("Stage · Detailed design", "阶段 · 详细设计"),
      name: "Marcus",
      meta: tt("27 · Mechanical design engineer", "27 · 机械设计工程师"),
      quote: tt(
        "“All I get is a scan or an STL. I have to redraw it from nothing before I can change anything.”",
        "“客户给的只有一个扫描件或 STL，我得对着它从零重画一遍，才能开始真正的改动。”"
      ),
      goal: tt(
        "Turn scans, STLs and legacy models straight into editable parametric CAD — no rebuilding from scratch.",
        "把拿到手的扫描件、STL 和旧模型直接变成可编辑的参数化 CAD，不用从头重建。"
      ),
      pain: tt(
        "Most existing parts are only mesh or drawings, with no feature tree; every change means reversing by hand, then fixing fillets and dimensions again.",
        "现有零件大多只有 Mesh 或图纸，没有特征树；每次改动都要先手动逆向，再反复修倒角和尺寸。"
      ),
      chances: [tt("Mesh → CAD", "Mesh → CAD"), tt("Fillet / chamfer", "圆角 / 倒角")],
    },
    {
      photo: "alexandra.jpg",
      stage: tt("Stage · Team delivery", "阶段 · 团队交付"),
      name: "Alexandra",
      meta: tt("41 · Head of mechanical R&D", "41 · 机械研发团队负责人"),
      quote: tt(
        "“Requirements in docs, drawings in email, models on everyone's machine — every delivery means reconciling it again.”",
        "“需求在文档里，图纸在邮件里，模型在每个人自己的电脑里，交付时总要重新对一遍。”"
      ),
      goal: tt(
        "Keep requirements, documents and models traceable across the team, so delivery is predictable.",
        "让需求、文档和模型在团队中可追溯，交付更稳定。"
      ),
      pain: tt(
        "Requirements, drawings and legacy CAD data are scattered across different tools and hard to reuse.",
        "需求、图纸和旧 CAD 数据分散在不同工具里，难以复用。"
      ),
      chances: [tt("Context management", "上下文管理"), tt("Team workspace", "团队空间")],
    },
  ],
}
