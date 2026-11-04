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

标题用 Tailwind 的 `text-xl` 及以上。项目页的 `<main>` 带 `case-type` class，在它内部这些档位被重新指向 Apple 的标题层级：`text-xl` 20、`text-2xl` 22（Title 2）、`text-3xl` 28（Title 1）、`text-4xl` 34（Large Title，章节标题）、`text-5xl` 40（项目大标题）、`text-6xl` 48，各自带收紧的行高。不要在项目页用 `sm:text-base` 这类响应式缩小字号。

注意 `WeatherPetsDeck.jsx`、`AbcMouseDeck.jsx` 和 `HmiDeck.jsx` **不在**例外名单里：它们是用真实 DOM 重排的，照常守这条规定。

**唯一例外**：`WorkflowBoard.jsx`、`BackgroundBoard.jsx`、`CompetitorsBoard.jsx`、`PersonaBoard.jsx`、`StoryMapBoard.jsx`、`SpecBoard.jsx`、`CoreFlowBoard.jsx`、`ExtensionsBoard.jsx` 和 `LaunchDataBoard.jsx` 这几块 Figma 图板复刻。它们用的是 Figma 画板坐标，整块靠 `transform: scale()` 缩放，内部的 `size={18}` 不是屏幕像素，而是画板像素。图板是插图，不是页面正文。

## 间距规定（项目详情页）

参考 Apple 的 8pt 网格（16 以下用 4pt）。index.css 的 `@theme` 里按「角色」定义了间距，Tailwind 会生成 `mt-visual`、`mb-chapter`、`gap-card`、`space-y-body` 这类 utility。结构性间距一律用这些名字，不要写裸数字：

| token | 值 | 用在哪 |
| --- | --- | --- |
| `chapter` | 96px（lg 起 128px） | 章节 ↔ 章节（section 的 `mb-chapter`） |
| `section` | 64px | 章节内的小节 ↔ 小节 |
| `visual` | 32px | 标题或正文 → 它引出的图板、卡片组、图片 |
| `lead` | 16px | 标题 → 引导句；段落 ↔ 段落 |
| `body` | 12px | 小节标题 → 正文；图 → 图注；列表行间 |
| `tight` | 8px | eyebrow → 标题 |
| `card` | 16px | 卡片之间的间隔 |

新 token 不要用 Tailwind 已有的关键词命名（比如 `block`、`flex`、`grid`、`full`、`screen`）：Tailwind 会顺带生成 `inline-block` 这类同名 class，把原来的样式覆盖掉。

Kyrall 的图板不再自己画章节标题：标题和引导句写在 `projectDetails.js` 的 `heading` / `lead` 里，由页面按章节标题样式（34px 半粗）统一渲染（`heading` 是页面上显示的标题，`label` 是左侧目录的短名字）。图板只从第一块内容开始画，用 `CUT` 把画板内容往上收。新做的图板也照这个来。

章节标题被图板或 deck 自己画（`titleHidden` 且没有 `lead`）时，图板顶边就是标题，ProjectDetail 会把它拉到 eyebrow 下方 `tight` 的位置。

图板、deck 内部的细节间距可以用普通 Tailwind 数字，但只能取网格上的值：4/8/12/16/24/32/40/48/56/64…（`mt-1/2/3/4/6/8/10/12/14/16`）。不要用 `0.5`、`1.5`、`2.5`、`3.5`、`5`、`7`、`9`、`11` 这些落在网格外的档位。

## Kyrall 配色

Kyrall 项目浅色模式只用两个主色加一个点缀：墨黑 `#191717` 和暖灰 `#efede8`，点缀是 Kyrall 品牌绿 `#c2f000`（`--color-kyrall`，深色模式下 `#c4ff35`）。品牌绿在浅色模式下只做填充和标记（色块、小圆点、进度条），上面的字用墨黑，**不能用作文字颜色**，因为它在白底上读不清。卡片底色统一用 `bg-band`（`--color-band`：浅色 `#efede8`，深色 `#171c29`，跟网站深色卡片同一个偏蓝的色系），不要再写 `bg-[#efede8] dark:bg-[...]` 这种裸色值，深色模式也不要用中性灰。图板的颜色全部走 index.css 里 `.kyrall-deck` 的 `--deck-*` 变量（`--deck-band` 也指向 `--color-band`）；`WorkflowBoard` 带 `kyrall-deck--keep`，保留原来的深绿配色。

改动后自查：

```sh
grep -n "text-\(xs\|sm\|base\|lg\|\[1[0-9]px\]\)" \
  src/pages/ProjectDetail.jsx \
  src/components/project/{DetailToc,DetailBlocks,ProjectHero,ScrollRail,BackgroundWho,BackgroundCompare,PlayView,PersonaCards,JourneyMap,LaunchData,WeatherPetsDeck,AbcMouseDeck,HmiDeck}.jsx
```

应该零命中。间距自查（同样这几个文件，应该零命中）：

```sh
grep -nE "(^|[ \"'\`:])-?(mt|mb|my|pt|pb|py|p|gap|gap-x|gap-y|space-y|space-x)-(0\.5|1\.5|2\.5|3\.5|5|7|9|11)\b" \
  src/pages/ProjectDetail.jsx \
  src/components/project/{DetailToc,DetailBlocks,ProjectHero,ScrollRail,BackgroundWho,BackgroundCompare,PlayView,PersonaCards,JourneyMap,LaunchData,WeatherPetsDeck,AbcMouseDeck,HmiDeck}.jsx
```

注意只查这几个文件：`src/components/project/` 下还有 `ProjectCard.jsx`、`CategoryFilter.jsx`、`WorkSection.jsx`、`WorkStrip.jsx`，那些是 `/project` 列表页的卡片，不在这条规定的范围里。
