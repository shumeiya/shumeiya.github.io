# 项目规则 / Project rules

## 字号规定（项目详情页）

项目详情页（`/project/:slug`，即 `src/pages/ProjectDetail.jsx` 及 `src/components/project/` 下为它服务的组件）参考 Apple 的文字层级，正文 16px：

- **正文一律 16px**，行高 1.6，中文版和英文版完全一致，不因语言、不因断点而变。
- **任何文字不得小于 13px**（Apple Footnote）。标签、eyebrow、图注的下限就是 13px。

落地方式：index.css 里定义了三个语义 utility，项目页不要再直接写 `text-xs` / `text-sm` / `text-base` / `text-lg` 或 `text-[1xpx]` 这类字号：

| class | 字号 / 行高 | 用途 |
| --- | --- | --- |
| `text-copy` | 16px / 1.6 | 正文、列表项、链接标题（Body） |
| `text-callout` | 14px / 1.5 | 次级说明、用时这类附注（Callout） |
| `text-note` | 13px / 1.4 | 标签、eyebrow、图注 —— 这是地板（Footnote） |

标题用 Tailwind 的 `text-xl` 及以上。项目页的 `<main>` 带 `case-type` class，在它内部这些档位被重新指向 Apple 的标题层级：`text-xl` 20、`text-2xl` 22（Title 2）、`text-3xl` 28（Title 1，章节标题）、`text-4xl` 34、`text-5xl` 40（项目大标题）、`text-6xl` 48，各自带收紧的行高。不要在项目页用 `sm:text-base` 这类响应式缩小字号。

注意 `WeatherPetsDeck.jsx`、`AbcMouseDeck.jsx` 和 `HmiDeck.jsx` **不在**例外名单里：它们是用真实 DOM 重排的，照常守这条规定。

**唯一例外**：`WorkflowBoard.jsx`、`BackgroundBoard.jsx`、`CompetitorsBoard.jsx`、`PersonaBoard.jsx`、`StoryMapBoard.jsx`、`SpecBoard.jsx`、`CoreFlowBoard.jsx`、`ExtensionsBoard.jsx` 和 `LaunchDataBoard.jsx` 这几块 Figma 图板复刻。它们用的是 Figma 画板坐标，整块靠 `transform: scale()` 缩放，内部的 `size={18}` 不是屏幕像素，而是画板像素。图板是插图，不是页面正文。

## Kyrall 配色

Kyrall 项目浅色模式只用两个主色加一个点缀：墨黑 `#191717` 和暖灰 `#efede8`，点缀是 Kyrall 品牌绿 `#c2f000`（`--color-kyrall`，深色模式下 `#c4ff35`）。品牌绿在浅色模式下只做填充和标记（色块、小圆点、进度条），上面的字用墨黑，**不能用作文字颜色**，因为它在白底上读不清。图板的颜色全部走 index.css 里 `.kyrall-deck` 的 `--deck-*` 变量；`WorkflowBoard` 带 `kyrall-deck--keep`，保留原来的深绿配色。

改动后自查：

```sh
grep -n "text-\(xs\|sm\|base\|lg\|\[1[0-9]px\]\)" \
  src/pages/ProjectDetail.jsx \
  src/components/project/{DetailToc,DetailBlocks,ProjectHero,ScrollRail,BackgroundWho,BackgroundCompare,WeatherPetsDeck,AbcMouseDeck,HmiDeck}.jsx
```

应该零命中。注意只查这几个文件：`src/components/project/` 下还有 `ProjectCard.jsx`、`CategoryFilter.jsx`、`WorkSection.jsx`、`WorkStrip.jsx`，那些是 `/project` 列表页的卡片，不在这条规定的范围里。
