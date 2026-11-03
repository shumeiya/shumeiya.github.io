// The "Specification" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "11 设计准则 · 新版").
//
// Copy only; the drawing lives in SpecBoard.jsx. This replaces the flat per-language
// export the section used to carry: the headings and card titles are text again, and
// only the nine specification pages stay as pictures — which is what they are.
//
// `img` is the deck's own crop for each thumbnail: a percentage of the card's image
// box, anchored top-left, so a tall specification page shows its head rather than
// being squashed into the frame.
import { tt } from "../i18n/t"

export const kyrallSpec = {
  // The deck's own header — its number, title, kicker rule and subtitle — is dropped:
  // the page's section heading above the board already says all of it.
  body: tt(
    "Across Dashboard, Editor and the Mesh workspace, the specification keeps the experience consistent and the team fast: colour tokens, type, icons and component rules are documented so new features reuse the same interaction grammar and users have less to learn.",
    "面对 Dashboard、Editor、Mesh 工作区等多个产品面，保证体验形态的一致性与团队协作效率，持续沉淀颜色 Token、字体、图标与组件规范，让新功能可以直接复用同一套交互语法，减少用户学习成本。"
  ),

  // `row` 0 is the receding back row, 1 the front one. `x` is the deck's own
  // position in the frame, bleed and all — the cards that run off both edges are
  // part of the picture.
  cards: [
    { n: "05.", name: tt("Logo", "标志 Logo"), file: "s05-logo.jpg", row: 0, x: -200, img: { height: "282.69%", width: "100%" } },
    { n: "06.", name: tt("Spacing", "间距 Spacing"), file: "s06-spacing.jpg", row: 0, x: 264, img: { height: "181.07%", width: "100%" } },
    { n: "07.", name: tt("Icon", "图标 Icon"), file: "s07-icon.jpg", row: 0, x: 728, img: { height: "158.95%", width: "100%" } },
    { n: "08.", name: tt("Sidebar", "侧边栏 Sidebar"), file: "s08-sidebar.jpg", row: 0, x: 1192, img: { height: "183.9%", width: "100%" } },
    { n: "09.", name: tt("Toolbar", "工具栏 Toolbar"), file: "s09-toolbar.jpg", row: 0, x: 1656, img: { height: "110.89%", width: "100%" } },
    { n: "01.", name: tt("Color", "颜色 Color"), file: "s01-color.jpg", row: 1, x: 44, img: { height: "100%", width: "100.89%" } },
    { n: "02.", name: tt("Typography", "字体 Typography"), file: "s02-type.jpg", row: 1, x: 508, img: { height: "106.67%", width: "100%" } },
    { n: "03.", name: tt("Button", "按钮 Button"), file: "s03-button.jpg", row: 1, x: 972, img: { height: "100%", width: "175.4%" } },
    { n: "04.", name: tt("Dialog", "对话框 Dialog"), file: "s04-dialog.jpg", row: 1, x: 1436, img: { height: "100%", width: "145.64%" } },
  ],
}
