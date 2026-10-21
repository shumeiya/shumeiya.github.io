// The "Core flow" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "12 核心流程 · 长页").
//
// Copy only; the drawing lives in CoreFlowBoard.jsx. The deck frame is Chinese, so
// the English side is a translation.
//
// The deck hangs each note in a narrow gutter beside the product shot and points a
// leader line at the part it describes. Those gutters are 250–400px wide, measured
// for 20px Chinese; at the size the page needs they hold about two thirds of the
// words. So the notes sit under their figure in columns instead — see the component.
import { tt } from "../i18n/t"

export const kyrallCoreFlow = {
  title: tt(
    "One main line: from a single requirement to a model you can export",
    "一条主线：从一个需求输入，到可以导出的模型"
  ),
  lead: tt(
    "The Dashboard is laid out left to right along the workflow: recent models → the generation window → what is generating now. Describe it, press Generate, and the task runs in the background; the Execution Log shows every step, and when it finishes you land in the Editor to adjust and export.",
    "Dashboard 按工作流程从左到右排布：最近的模型 → 生成窗口 → 正在生成列表。输入描述、点击 Generate，任务在后台运行，进入 Execution Log 看到每一步，完成后直接进入 Editor 修改并导出。"
  ),
  // The seven steps across the top, and the shorter runs that head each act.
  steps: [
    tt("Prompt", "输入 Prompt"),
    tt("Agent", "Agent生成"),
    tt("Queue", "后台生成列表"),
    tt("Execution Log", "Execution Log"),
    tt("Done", "生成完成"),
    tt("Editor", "Editor 编辑"),
    tt("Export", "导出"),
  ],

  acts: [
    {
      n: "1",
      title: tt("Dashboard: three zones, laid out along the workflow", "Dashboard：按照工作流设计成三区结构"),
      steps: [0, 1, 2],
      notes: [
        {
          title: tt("Recently edited models", "最近编辑的模型"),
          body: tt(
            "On the left are the models worked on most recently, so a user can get straight back to where they left off.",
            "左侧是最近编辑过的模型，用户可以快速回到最近的工作，继续推进"
          ),
        },
        {
          title: tt("The generation window", "生成窗口"),
          body: tt(
            "In the middle: upload an image, mesh or file, add references from the Context Manager, type a description — and start a generation at any moment.",
            "中间是生成窗口：上传图片 / Mesh / 文件、从 Context Manager 添加参考、输入描述，随时开始一次生成"
          ),
        },
        {
          title: tt("What is generating now", "进行中的生成任务"),
          body: tt(
            "Generation runs in the background; each task shows a thumbnail and its state — generating, or finished.",
            "生成在后台进行，每个任务显示缩略图与生成状态（生成中 / 生成完成）"
          ),
        },
      ],
    },
    {
      n: "2",
      title: tt("Press Generate, and the task runs in the background", "点击 Generate，任务进入后台运行"),
      steps: [0, 1, 2],
      notes: [
        {
          title: tt("Nothing is interrupted", "不打断当前工作"),
          body: tt(
            "The task appears in the Generation Task list as Generating the moment you press Generate; you can keep browsing models or start the next one instead of waiting on the page.",
            "点击 Generate 后，任务立即出现在右侧「Generation Task」列表并显示 Generating；用户可以继续浏览模型、发起下一次生成，不必停在页面等待。"
          ),
        },
        {
          title: tt("State at a glance", "状态一眼可见"),
          body: tt(
            "The list carries progress and finish time; a Completed task opens on click, and the corner counts finished against total.",
            "列表显示进度状态与完成时间，Completed 后点击即可进入；右上角显示已完成 / 列表总数"
          ),
        },
      ],
    },
    {
      n: "3",
      title: tt("Execution Log: the generation is visible while it runs", "Execution Log：生成过程透明可见"),
      steps: [3],
      notes: [
        {
          title: tt("Five standard stages, each one openable", "标准化五个阶段，展开看子步骤"),
          body: tt(
            "Five standard generation stages, worked out with the ML team. Each opens to the step running inside it — so a user can see what the AI is doing, and the black box goes away.",
            "与 ML 组讨论构建标准化五个生成阶段，每个阶段可展开，看到正在执行的具体步骤。让用户理解 AI 在做什么，消除黑盒体验。"
          ),
        },
        {
          title: tt("Leave and come back whenever", "随时离开、随时回来"),
          body: tt(
            "New Generate in the corner starts the next task straight away; RUN IN BACKGROUND returns to the Dashboard, where the list still shows it running.",
            "右上角 New Generate 可以直接发起下一次任务；“RUN IN BACKGROUND” 回到 Dashboard，列表里依然能看到它在跑。"
          ),
        },
        {
          title: tt("A small hint while you wait", "操作小提示"),
          body: tt(
            "Product hints turn the wait into a way of getting to know the product.",
            "产品操作小提示，让等待过程变成了解产品的过程"
          ),
        },
      ],
    },
    {
      n: null,
      title: tt("Generation finished — straight into the Editor", "生成完成，直接进入 Editor"),
      steps: [4, 5, 6],
      notes: [
        {
          title: tt("The AI editor", "AI 编辑器"),
          body: tt(
            "Pick the component it applies to, type what you need, and the change lands on that component.",
            "选择相对应的组件，输入需求，直接修改组件"
          ),
        },
        {
          title: tt("The editor toolbar", "编辑器工具栏"),
          body: tt(
            "Traditional CAD tooling, cut down to what AI-assisted modelling actually needs — so there is far less to learn.",
            "简化传统 CAD 软件工具，只保留在 AI 辅助建模下最必要的工具，降低用户的学习成本。"
          ),
        },
      ],
    },
  ],

  // The five editor tools, then the three things you can do with a finished model.
  tools: [
    {
      file: "tool-1-params.png",
      title: tt("Parameters", "参数修改"),
      body: tt("Drag or type a dimension in the parameter panel and the model updates live.", "在参数面板直接拖动或输入尺寸，模型实时更新"),
    },
    {
      file: "tool-2-fillet.png",
      title: tt("Fillet / chamfer", "倒角 / 圆角工具"),
      body: tt("Select an edge, choose fillet or chamfer, type the value — it applies at once.", "选中边线，选择圆角 / 倒角，输入参数即时生效"),
    },
    {
      file: "tool-3-suggestion.png",
      title: tt("Sorted AI suggestions", "AI 建议分类"),
      body: tt("AI suggestions sorted by structure, fit, appearance, manufacturing and function.", "AI 建议按结构、配合、外观、制造、功能分类"),
    },
    {
      file: "tool-4-part.png",
      title: tt("Feature tree", "特征树"),
      body: tt("Show, hide or delete a feature on its own — which finds the problem faster.", "可单独显示 / 隐藏或删除，定位问题更快"),
    },
    {
      file: "tool-5-measure.png",
      title: tt("Measurement", "测量工具"),
      body: tt("Measure any dimension on the model, with units you can switch.", "测量模型任一尺寸，支持切换单位"),
    },
  ],

  outputs: [
    {
      file: "bot-history.png",
      w: 423,
      h: 236,
      title: tt("Version history", "历史记录工具"),
      body: tt(
        "Every generation and every edit is kept as a version, with a thumbnail to preview and one click to return to any step.",
        "每一次生成与修改都记录为一个版本，缩略图预览后可一键恢复到任意一步"
      ),
    },
    {
      file: "bot-share.png",
      w: 210,
      h: 171,
      title: tt("Share", "分享"),
      body: tt(
        "Generate a link to send to someone else; they can open the model without an account.",
        "生成可访问的链接分享给其他用户，对方无需登录也能查看模型"
      ),
    },
    {
      file: "bot-export.png",
      w: 210,
      h: 123,
      title: tt("Export in one step", "一步导出"),
      body: tt("Export as GLB, STEP or STL.", "可选择导出 GLB / STEP / STL 等格式"),
    },
  ],
}
