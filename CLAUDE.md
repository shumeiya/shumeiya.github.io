# 项目规则 / Project rules

## 字号死规定（项目详情页）

项目详情页（`/project/:slug`，即 `src/pages/ProjectDetail.jsx` 及 `src/components/project/` 下为它服务的组件）里：

- **正文一律 20px**，中文版和英文版完全一致，不因语言、不因断点而变。
- **任何文字不得小于 18px**。标签、eyebrow、图注、次级说明的下限就是 18px。

落地方式：index.css 里定义了两个语义 utility，项目页不要再直接写 Tailwind 的 `text-xs` / `text-sm` / `text-base` / `text-lg` 之类的字号类：

| class | 字号 | 用途 |
| --- | --- | --- |
| `text-copy` | 20px | 正文、列表项、lead、链接标题 |
| `text-note` | 18px | 标签、eyebrow、图注、次级说明 —— 这是地板，不是常用值 |

标题可以比 20px 大（`text-xl` = 20px 起步，`text-2xl`、`text-3xl` 等都可以）。响应式缩小字号（`sm:text-base` 这类）在项目页一律不要用 —— 小屏也得守住这两个数。

**唯一例外**：`WorkflowBoard.jsx`、`BackgroundBoard.jsx`、`CompetitorsBoard.jsx`、`PersonaBoard.jsx`、`StoryMapBoard.jsx`、`SpecBoard.jsx` 和 `CoreFlowBoard.jsx` 这几块 Figma 图板复刻。它们用的是 Figma 画板坐标，整块靠 `transform: scale()` 缩放，内部的 `size={18}` 不是屏幕像素，而是画板像素。在那里强行套这条规则会把复刻的版式拆散。图板是插图，不是页面正文。

改动后自查：

```sh
grep -n "text-\(xs\|sm\|base\|lg\|\[1[0-9]px\]\)" \
  src/pages/ProjectDetail.jsx \
  src/components/project/{DetailToc,DetailBlocks,ProjectHero,ScrollRail,WorkflowBoard,BackgroundBoard,CompetitorsBoard,PersonaBoard,StoryMapBoard,SpecBoard,CoreFlowBoard}.jsx
```

应该零命中。注意只查这几个文件：`src/components/project/` 下还有 `ProjectCard.jsx`、`CategoryFilter.jsx`、`WorkSection.jsx`、`WorkStrip.jsx`，那些是 `/project` 列表页的卡片，不在这条规定的范围里。
