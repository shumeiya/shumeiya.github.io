// The "Background" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frames "04 Background · EN" / "04 需求背景 · 新版").
//
// Copy only. The drawing — nine hundred lines of coordinates — lives in
// BackgroundBoard.jsx, where it can sit next to the shapes it positions; what a
// translator or a copy edit needs to reach is here.
import { tt } from "../i18n/t"

export const kyrallBackground = {
  title: tt("A New Paradigm for Mechanical Design", "机械设计的新范式"),

  who: {
    eyebrow: tt("01 · WHO", "01 · WHO / 用户是谁"),
    title: tt("Mechanical engineers and R&D teams", "机械设计工程师与研发团队"),
    body: tt(
      "They own the whole design process from concept to manufacturable part, with high demands on precision, control and traceability.",
      "他们负责从概念到可制造零件的整个设计过程，对精度、可控性和可追溯性要求很高。"
    ),
    chips: [
      tt("Concept design", "概念设计"),
      tt("Detailed design", "详细设计"),
      tt("Team delivery", "团队交付"),
    ],
    needs: [
      {
        title: tt("Time", "时间"),
        body: tt(
          "Get a usable first version faster and shorten every iteration.",
          "更快拿到第一版可用的模型，缩短每一次迭代。"
        ),
      },
      {
        title: tt("Precision", "精度"),
        body: tt(
          "Results are inspectable and controllable; every dimension and relation is explicit.",
          "结果可检查、可控制，尺寸和关系都说得清。"
        ),
      },
      {
        title: tt("DFM", "DFM"),
        // The one the deck outlines in the accent.
        lit: true,
        body: tt(
          "What is generated is manufacturable, with no rework.",
          "生成出来的就是可制造的，不用再返工。"
        ),
      },
    ],
  },

  before: {
    eyebrow: tt("02 · BEFORE  /  The traditional workflow", "02 · BEFORE / 传统工作流"),
    title: tt(
      "Slow and fragmented design becomes expensive design",
      "设计效率的低下，最终都会变成预算的消耗和市场机会的流失"
    ),
    // The five silos. The first is the one Kyrall replaces, and the deck rings it.
    stages: [
      { n: "01", label: tt("CAD", "建模"), lit: true },
      { n: "02", label: tt("Simulation", "仿真") },
      { n: "03", label: tt("Prototyping", "打样") },
      { n: "04", label: tt("Testing", "测试") },
      { n: "05", label: tt("Manufacturing", "制造") },
    ],
    bracket: tt("Weeks", "Weeks"),
    panels: [
      {
        title: tt("Collecting requirements", "收集需求"),
        bar: tt("Design requirements", "设计需求文档"),
      },
      {
        title: tt("Tedious manual remodeling", "手动反复修改模型"),
        bar: tt("Every change means remodeling", "每一次变动都需要反复修改模型"),
      },
      { title: tt("Version N", "第 N 版"), bar: tt("One change, one more round", "改一次，再来一轮") },
    ],
    weeksWord: "WEEKS",
    timesWord: tt("Times", "Times"),
    costs: [
      {
        title: tt("Weeks lost to repetition", "时间浪费在重复上"),
        body: tt(
          "Engineering time spent on repetitive CAD work, hours lost to rework.",
          "工程时间花在重复的 CAD 工作上，大量工时消耗在返工中。"
        ),
      },
      {
        title: tt("Budget lost to changes", "项目预算因变更而流失"),
        body: tt(
          "Every requirement change means remodeling; rework and delays eat the budget.",
          "每一次需求变更都意味着重新建模，返工和延期直接吞掉预算。"
        ),
      },
      {
        title: tt("Opportunities lost in market", "错失的市场机会"),
        body: tt(
          "The longer the design cycle, the later the launch, the more market windows are missed.",
          "设计周期越长，产品上市越晚，错过的市场窗口就越多。"
        ),
      },
    ],
  },

  after: {
    eyebrow: tt("03 · AFTER  /  How Kyrall changes it", "03 · AFTER / Kyrall 怎么改变他们"),
    title: tt(
      "The new paradigm: an editable, manufacturable parametric model in minutes",
      "新的设计范式：几分钟给你一个可编辑、可制造的参数化模型"
    ),
    inputTitle: "Input",
    inputs: [
      tt("Requirement", "需求描述"),
      tt("Reference image", "参考图"),
      tt("Legacy design / Mesh", "旧设计 / Mesh"),
    ],
    steps: [
      {
        n: "01",
        title: tt("AI generates a parametric model", "AI 生成参数化模型"),
        body: tt(
          "Simple input, an editable parametric model within minutes.",
          "简单输入，几分钟内得到可编辑的参数化模型。"
        ),
      },
      {
        n: "02",
        title: tt("Refine in the Editor", "Editor 精细调整"),
        body: tt(
          "10 tools such as parameters, suggestions and measurement for deterministic checks and edits.",
          "参数、建议、测量等 10 种工具，确定性地检查和修改。"
        ),
      },
      {
        n: "03",
        title: tt("Export", "导出"),
        body: tt("Export STEP / STL directly, or share.", "STEP / STL 直接导出，或分享。"),
      },
    ],
    outputTitle: "Output",
    output: tt("A manufacturable, editable 3D parametric model", "可制造、可编辑的 3D 参数化模型"),
    outputNote: tt("Under 10 minutes per part", "单个零件 < 10 分钟"),
    bracket: tt("Hours", "Hours"),
  },

  oneLine: {
    eyebrow: tt("THE ONE LINE  /  What the product is about", "THE ONE LINE / 产品最核心的一句话"),
    // The deck runs the sentence in the loud language and the other one underneath.
    title: tt(
      "Design and manufacture hardware at the speed of thought",
      "以思维的速度设计与制造硬件，重新定义机械设计的范式"
    ),
    sub: tt(
      "REDEFINING THE MECHANICAL DESIGN PARADIGM",
      "Design and Manufacture Hardware at the Speed of Thought"
    ),
  },
}
