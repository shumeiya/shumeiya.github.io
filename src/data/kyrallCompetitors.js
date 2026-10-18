// The "Competitive analysis" board from the Kyrall deck, transcribed from the Figma
// source (file XLWOr79xdX6g4OmJc1zGNw — frame "08 竞品分析 · 新版").
//
// Copy only; the drawing lives in CompetitorsBoard.jsx. The deck frame is Chinese,
// so the English side is a translation rather than a second original — kept short
// per cell, because every cell is a fixed 250px box in the board's own coordinates.
import { tt } from "../i18n/t"

export const kyrallCompetitors = {
  title: tt("Competitive positioning and where the gap is", "竞品定位与差异化机会"),

  matrix: {
    eyebrow: tt("POSITIONING MAP", "POSITIONING MAP  /  定位矩阵"),
    chip: tt("Where we aim", "目标定位"),
    // The four quadrant labels, in the order top / bottom / left / right.
    // The axis labels sit in narrow slots either side of the chart's own axes, so
    // the English has to stay about as short as the Chinese.
    top: tt("Inside the workflow", "嵌入现有工作流"),
    bottom: tt("Standalone platform", "独立平台"),
    left: tt("Low constraint", "低工程约束"),
    right: tt("High constraint", "高工程约束"),
  },

  // Column order is the deck's: Adam, Zoo, MecAgent, Backflip. Brand names are not
  // translated, so the headers carry no `tt`.
  columns: ["Adam", "Zoo", "MecAgent", "Backflip"],

  rows: [
    {
      label: tt("Positioning", "产品定位"),
      cells: [
        tt("An AI CAD workbench for hardware teams", "硬件团队的 AI CAD 工作台"),
        tt("AI-native CAD on its own kernel", "自研内核的 AI 原生 CAD"),
        tt("An AI modelling assistant inside SolidWorks", "SolidWorks 内的 AI 建模助手"),
        tt("Drawings and scans into parametric CAD", "图纸、扫描件转参数化 CAD"),
      ],
    },
    {
      label: tt("Users", "目标用户"),
      cells: [
        tt("Solo engineers → hardware teams", "个人工程师 → 硬件团队"),
        tt("Engineers and hardware developers", "工程师与硬件开发者"),
        tt("Mechanical engineers, design studios", "机械工程师、设计室"),
        tt("Manufacturers and their engineers", "制造企业与工程师"),
      ],
    },
    {
      label: tt("Strengths", "核心优势"),
      tone: "accent",
      cells: [
        [tt("Largest user base", "用户量最大"), tt("DFM / simulation shipped", "DFM / 仿真已上线")],
        [tt("Own kernel + KCL", "自研内核 + KCL"), tt("Open API", "开放 API")],
        [tt("Deeply embedded in SW", "深度嵌入 SW"), tt("Transparent pricing", "定价透明")],
        [tt("10M+ training samples", "千万级训练数据"), tt("Scan → feature tree", "扫描件 → 特征树")],
      ],
    },
    {
      label: tt("Gaps", "核心痛点"),
      cells: [
        [tt("Shaky on large assemblies", "大装配不稳"), tt("No mesh reversing", "无 Mesh 逆向")],
        [tt("Requires migrating CAD", "需迁移 CAD"), tt("Mostly single parts", "以单零件为主")],
        [tt("Locked to one CAD", "绑定单一 CAD"), tt("No mesh input", "不支持 Mesh 输入")],
        [tt("Fusion only", "只适配 Fusion"), tt("Single parts, no assemblies", "单零件、无装配")],
      ],
    },
  ],

  summary: {
    label: tt("Takeaway", "竞品总结"),
    body: tt(
      "Each one covers a single stretch: Adam and MecAgent generate from a prompt inside CAD, Backflip reverse-engineers scans, Zoo asks you to migrate to its platform. Between generation and a real Onshape workflow, nothing. Kyrall covers the whole chain — text, image and mesh in, a parametric model in minutes, adjusted in the Editor, then imported into Onshape with feature tree, parameters and mates intact.",
      "竞品各自只覆盖链路的一段：Adam、MecAgent 擅长在 CAD 内按提示生成，Backflip 擅长扫描件逆向，Zoo 要求迁移到自有平台；生成后的快速调整和进入 Onshape 工作流仍是空白。Kyrall 把这条链路做完整：文字、图片、Mesh 多种输入，短时间内生成参数化模型；在 Editor 中用极易上手的工具快速调整；再带完整特征树、参数与 Mate 导入 Onshape，直接继续编辑、无需重建。"
    ),
  },
}
