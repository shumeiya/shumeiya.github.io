// The "Design System" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "10 设计系统 · 新版").
//
// Copy only; the drawing lives in SystemBoard.jsx. The deck frame is Chinese, so the
// English side is a translation.
//
// The colour tokens are real data, not a picture of one — name and hex for both
// themes, so the table is text a reader can select and a search can find.
import { tt } from "../i18n/t"

export const kyrallSystem = {
  title: tt("One design language", "统一设计语言"),
  lead: tt(
    "A design system is not a separate branding exercise. It is the rule set that lets a product keep adding tools without fragmenting the experience: one set of colour tokens, two typefaces, a set of domain icons, and components that share their states.",
    "Design System 不是独立的品牌练习，而是让产品持续增加工具、同时不让体验碎片化的规则：一套颜色 Token、两种字体、一组领域图标和共享状态的组件。"
  ),

  colour: {
    eyebrow: tt("01 / Colour tokens", "01 / 颜色 Token"),
    title: tt("Semantic colour tokens", "语义化颜色 Token"),
    body: tt(
      "Light and dark run on one set of semantic tokens rather than a simple inversion: ky-yellow is only for primary action, selection and generation; ky-black and ky-white swap roles between the themes; the greys carry text hierarchy and grid lines.",
      "Light / Dark 两套主题使用同一组语义化 Token，而不是简单反色：ky-yellow 只用于主操作、选中与生成状态；ky-black 与 ky-white 在两套主题中互换角色；灰阶承担文本层级与网格线。"
    ),
    darkLabel: tt("Dark theme", "深色主题 · Dark"),
    lightLabel: tt("Light theme", "浅色主题 · Light"),
    // Each token's value in the two themes, and the ink each value needs on it.
    tokens: [
      { name: "ky-yellow", dark: "#C4FF35", light: "#C2F000" },
      { name: "ky-black", dark: "#191717", light: "#E9E9E9" },
      { name: "ky-white", dark: "#FDFDFD", light: "#191717" },
      { name: "ky-grey-1", dark: "#EFEDE8", light: "#5C5B59" },
      { name: "ky-grey-2", dark: "#DAD8D2", light: "#DAD8D2" },
      { name: "ky-grey-3", dark: "#5C5B59", light: "#C2C2C2" },
      { name: "grid-on-black", dark: "#2F2F2F", light: "#FDFDFD" },
      { name: "text-on-black", dark: "#878787", light: "#878787" },
      { name: "text-on-beige", dark: "#A5A095", light: "#2F2F2F" },
    ],
  },

  type: {
    eyebrow: tt("02 / Typography", "02 / 字体系统"),
    title: tt("A two-typeface system", "双字体系统"),
    body: tt(
      "Ufficio carries what the product says to a person; Ufficio Mono carries what the system reports — coordinates, parameters, IDs and states. Only three weights are used, 300 / 400 / 500, on the text-xs to text-9xl scale.",
      "Ufficio 承载产品沟通信息，Ufficio Mono 承载技术与系统信息：坐标、参数、ID 与状态。字重只用 300 / 400 / 500，字号沿用 text-xs 到 text-9xl 的刻度。"
    ),
    numeralsLabel: tt("Custom numerals", "自定义数字"),
  },

  icons: {
    eyebrow: tt("03 / Icon system", "03 / 图标系统"),
    title: tt("Domain-specific icons", "领域专属图标"),
    body: tt(
      "So CAD actions can be recognised without leaning on a text label forever. The icons and the logo are drawn on one geometric language.",
      "让 CAD 操作无需长期依赖文字标签也能被识别。Icon 与 Logo 保持同一几何设计语言。"
    ),
    keylinesLabel: tt("Shared geometry · symbol and icon", "共享的几何逻辑 · 符号与图标"),
    groups: [
      { label: tt("Navigation", "导航"), rows: ["icons-nav.png"] },
      { label: tt("Editing tools", "编辑工具"), rows: ["icons-edit1.png", "icons-edit2.png"] },
      { label: tt("General", "通用"), rows: ["icons-gen1.png", "icons-gen2.png"] },
    ],
  },

  components: {
    eyebrow: tt("04 / Component library", "04 / 组件库"),
    title: tt("The interaction grammar of the whole product", "组件库：贯穿整个产品的交互语法"),
    body: tt(
      "From Button and Field to Toolbar and Panel, the base components are reused across the product; all of them share one set of state rules, and hold up in both the light and the dark theme.",
      "从 Button、Field 到 Toolbar 与 Panel，基础组件在整个产品中复用；所有组件共享同一套状态规则，并在 Light / Dark 两种主题下保持一致。"
    ),
    // Figure plus caption. The pixel sizes are the exported artwork's own.
    items: [
      { file: "c-textarea.png", w: 316, h: 239, label: tt("Textarea", "文本域 · Textarea") },
      { file: "c-search.png", w: 317, h: 239, label: tt("Search bar", "搜索框 · Search bar") },
      { file: "c-dialog.png", w: 958, h: 597, label: tt("Dialog", "对话框 · Dialog") },
      { file: "c-checkbox.png", w: 180, h: 148, label: tt("Checkbox", "复选框 · Checkbox") },
      { file: "c-switch.png", w: 129, h: 93, label: tt("Switch", "开关 · Switch") },
      { file: "c-tag.png", w: 310, h: 105, label: tt("Tag", "标签 · Tag") },
      { file: "c-toolbar.png", w: 459, h: 291, label: tt("Toolbar panel", "工具栏面板 · Toolbar panel") },
      { file: "c-tabs.png", w: 200, h: 93, label: tt("Tabs", "分类页签 · Tabs") },
      { file: "c-pagination.png", w: 659, h: 36, label: tt("Pagination", "分页 · Pagination") },
    ],
  },
}
