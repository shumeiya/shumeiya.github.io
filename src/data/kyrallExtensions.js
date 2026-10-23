// The "Extensions" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "13 延展页面 · 长页", with the English copy
// taken from its twin frame "13 Extensions · EN").
//
// Copy only; the drawing lives in ExtensionsBoard.jsx. Each note sits in a gutter
// the deck sized for 20px Chinese, so a few of the English lines are written to the
// same length rather than translated word for word.
import { tt } from "../i18n/t"

export const kyrallExtensions = {
  title: tt(
    "Around generation: Projects, Community, Context, Mesh to CAD",
    "围绕生成的四个场景页面：项目管理、社区、上下文管理、MeshToCAD"
  ),
  lead: tt(
    "Beyond generating, users need to manage models, find inspiration in the community, give the AI team context and turn existing meshes into editable CAD. The four pages share one set of navigation, cards and state rules.",
    "生成之外，用户还需要管理模型、从社区获得灵感、给 AI 提供团队上下文，以及把已有的 Mesh 变成可编辑的 CAD。四个页面共用同一套导航、卡片与状态规则。"
  ),

  // The four acts. The deck sets the subject in white and the point of it in accent.
  acts: [
    { n: "01", title: tt("Projects", "项目管理页面") },
    {
      n: "02",
      title: tt("Community: ", "社区："),
      accent: tt("tutorials and models you can reuse", "教程和可直接复用模型"),
    },
    {
      n: "03",
      title: tt("Context Manager: ", "上下文管理："),
      accent: tt("a team / personal knowledge base", "打造团队/个人知识图库"),
    },
    {
      n: "04",
      title: tt("Mesh Workspace: ", "网格工作台："),
      accent: tt("turn a mesh into editable CAD", "把 mesh 变成可编辑的 CAD"),
    },
  ],

  // Act 01 carries captions rather than notes — one state per screen.
  labels: {
    grid: tt("Grid view", "网格视图"),
    list: tt("List view", "列表视图"),
    loading: tt("Loading state", "加载状态"),
    empty: tt("Empty state", "空状态"),
  },

  notes: {
    banner: {
      title: tt("Banner", "Banner"),
      body: tt("Shows the latest tutorials and product updates.", "展示最新内容的教程以及产品更新的内容"),
    },
    modelCard: {
      title: tt("Model card", "模型卡片"),
      body: tt(
        "Shows what the product can generate — inspiration that also sets the right expectations.",
        "展示产品能生成什么样的模型，给予用户灵感同时控制用户对模型生成预期"
      ),
    },
    tutorialCard: {
      title: tt("Tutorial card", "教程卡片"),
      body: tt(
        "Text and images explain features and usage so users get started fast.",
        "以图文形式讲清产品功能和用法，让用户快速上手"
      ),
    },
    prompt: {
      title: tt("Reusable prompt", "可复用 Prompt"),
      body: tt("Edit an existing prompt to generate a similar model.", "直接修改现有 prompt 生成类似想要的模型"),
    },
    model: {
      title: tt("Reusable model", "可复用模型"),
      body: tt("Copy and Editing turns any model into your own starting point.", "一键 Copy and Editing 把模型变成自己的起点"),
    },
    related: {
      title: tt("Related models", "相关模型"),
      body: tt(
        "Related models at the bottom of the detail page lead from one part to similar designs.",
        "详情页底部推荐相关模型，顺着一个零件能找到同类设计"
      ),
    },

    level: {
      title: tt("Knowledge base level", "知识库等级"),
      body: tt(
        "Scores file quality and encourages uploading more high-quality files.",
        "量化文件的质量，鼓励用户上传更多高质量文件"
      ),
    },
    graph: {
      title: tt("Knowledge graph", "知识图谱"),
      body: tt("Shows the relations between files, concepts and generations.", "展示文件、概念与生成之间的关系"),
    },
    fileState: {
      title: tt("File status", "文件状态"),
      body: tt("File availability is visible at a glance.", "文件可用状态清晰可见"),
    },
    generate: {
      title: tt("Generate", "连接生成"),
      body: tt("Select context and generate the model you need.", "选择上下文，快速生成所需模型"),
    },

    space: {
      title: tt("Personal and org space", "个人与组织空间"),
      body: tt(
        "Personal files are private; org files are visible to the whole team.",
        "个人文件只有自己可见，组织文件对团队所有成员可见"
      ),
    },
    upload: {
      title: tt("Upload area", "上传区"),
      body: tt(
        "Upload a mesh, pick units and folder; it is rebuilt as a parametric model.",
        "上传 mesh 文件可选单位、文件夹，提交后重建为参数化模型"
      ),
    },
    folders: {
      title: tt("Folders", "文件夹管理"),
      body: tt("Keeps different project teams organised.", "让团队中不同项目组管理更方便"),
    },
    status: {
      title: tt("Conversion status", "转换状态"),
      body: tt("Status shows on the card; action buttons appear when done.", "卡片上直接显示转换状态，完成后出现可操作按钮"),
    },
    fileDetail: {
      title: tt("File details", "模型文件详情"),
      body: tt("Every conversion run is fully traceable.", "文件转换情况全可追溯"),
    },
    input: {
      title: tt("Input", "Input 内容"),
      body: tt("The original input is kept and traceable.", "Input 的内容也可追溯"),
    },
    nextStep: {
      title: tt("Next step", "连接下一步"),
      body: tt(
        "Jump straight to the next step: open in the Editor or in Onshape.",
        "直接转跳下一步编辑，可在 editor 或在传统工具 Onshape 中打开"
      ),
    },
  },
}
