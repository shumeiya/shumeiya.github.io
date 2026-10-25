// The "AI workflow" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "17 AI 工作流 · 长页").
//
// Copy only; the drawing lives in AiWorkflowBoard.jsx. The deck has no English twin
// for this frame, so the English side is a translation — written to the length each
// box holds, since the deck sized them all for 20px Chinese.
import { tt } from "../i18n/t"

export const kyrallAiWorkflow = {
  title: tt("Four generations of tools; my position has not moved", "工具换了四代，我的位置没变"),
  lead: tt(
    "Since starting Kyrall in Sep 2025 the AI tools have turned over every few months. As the team's only designer I have kept adjusting how I use them — what has not changed: I define the problem, set the constraints and make the final call; AI analyses, cross-checks, drafts and executes in bulk.",
    "从 2025.09 做 Kyrall 至今，AI 工具每几个月换一代。作为团队唯一的设计师，我一直在调整怎么用它们——不变的是：我定义问题、给出约束、做最终判断；AI 负责分析对照、生成粗稿和批量执行。"
  ),

  acts: [
    {
      n: "01",
      title: tt("Five phases in a year: ", "一年五个阶段："),
      accent: tt("from sparring partner to executor", "从「陪练」到「执行者」"),
    },
    {
      n: "02",
      title: tt("The workflow now: I define, AI executes, ", "现在的工作流：我定义，AI 执行，"),
      accent: tt("the design system constrains", "设计系统约束"),
    },
    {
      n: "03",
      title: tt("Codified: Kyrall Layout Skill, ", "沉淀：Kyrall Layout Skill，"),
      accent: tt("so the team lays out its own", "让团队自助排版"),
    },
  ],

  // Act 01 — the timeline. The last card is the one the deck lights up.
  phases: [
    {
      when: "2025.09",
      name: tt("The GPT era", "GPT 时代"),
      tag: "ChatGPT",
      bullets: [
        tt(
          "Gathered material and analysed requirements — GPT as the sparring partner a one-person design team does not have.",
          "收集资料、分析需求，把 GPT 当作一个一人设计团队的「陪练」，和它讨论方案。"
        ),
        tt(
          "For front-end pages I pasted whole files to GPT, had it explain, then edited — clumsy, but it taught me the front end.",
          "做前端页面时把整个文件代码复制给 GPT，让它解释再修改——笨，但让我读懂了前端。"
        ),
      ],
      learn: tt("Learned: AI is someone to think with, not a tool.", "学到：AI 先是讨论对象，不是生产工具"),
    },
    {
      when: tt("Winter 2025", "2025 冬"),
      name: tt("Claude moves into VS Code", "Claude 进 VS Code"),
      tag: "Claude Code · GPT",
      bullets: [
        tt("Vibe coding matured; Claude started writing the code directly.", "Vibe coding 开始成熟，让 Claude 直接写代码。"),
        tt(
          "I still did not trust one AI: the same question went to GPT and Claude, and I picked between the two answers.",
          "还不信任单个 AI：同一个问题同时给 GPT 和 Claude，两边出方案，我来选。"
        ),
      ],
      learn: tt("Learned: cross-checking instead of trust.", "学到：用对照代替信任，顺便补上前端知识"),
    },
    {
      when: tt("Spring 2026", "2026 春"),
      name: tt("Generative pages, a trial", "生成式页面试水"),
      tag: "Figma Make · Lovart",
      bullets: [
        tt("Tried letting them generate the first draft of a page.", "尝试让它们直接生成页面初稿。"),
        tt(
          "What came back was existing pages stitched together with no logic — dropped.",
          "结果是搜罗现有页面拼凑，没有逻辑——放弃。"
        ),
      ],
      learn: tt("Learned: what they lack is intent, not visuals.", "学到：生成工具缺的不是画面，是设计意图"),
    },
    {
      when: tt("Spring 2026", "2026 春"),
      name: "GPT Image 2",
      tag: "GPT Image 2",
      bullets: [
        tt(
          "Analyse the requirement with GPT first and write down my own thinking, then let Image 2 produce a rough direction.",
          "先和 GPT 一起分析需求、写清楚我自己的思考，再让 Image 2 输出粗略方案。"
        ),
        tt(
          "The first time an AI's rough proposal was worth using as a starting point.",
          "第一次觉得 AI 出的「粗方案」可以当起点。"
        ),
      ],
      learn: tt("Learned: the thinking you put in decides the output.", "学到：输入的思考质量决定输出"),
    },
    {
      when: tt("Now", "现在"),
      name: tt("The MCP workflow", "MCP 工作流"),
      tag: "GPT · Claude · Figma MCP",
      now: true,
      bullets: [
        tt(
          "GPT and Claude discuss the requirement at the same time, checking each other; I put my own thinking in.",
          "GPT 与 Claude 同时讨论需求、互为对照；我输入自己的思考。"
        ),
        tt(
          "The design system and components in Figma go to Claude too, and MCP writes the rough draft straight into the file for me to revise.",
          "把 Figma 里的设计系统和组件一起给 Claude，通过 MCP 直接在文件里出粗方案，我再修改定稿。"
        ),
      ],
      learn: tt("Now: AI executes inside my constraints; I judge.", "现状：AI 在我的约束下执行，我做判断"),
    },
  ],

  // Act 02 — the three lanes and the six steps that run across them.
  flow: {
    loopNote: tt("Not good enough → back to defining, re-constrain", "不满意则回到定义，重新约束"),
    lanes: [
      { name: tt("Me", "我"), caption: tt("Intent · trade-offs · sign-off", "意图 · 原则 · 取舍 · 终审"), lit: true },
      { name: "AI", caption: tt("Compare · draft · execute", "分析对照 · 生成粗稿 · 批量执行") },
      {
        name: tt("Design system", "设计系统"),
        caption: tt("Tokens · type · components", "约束 AI 的输入：Token · 字体 · 组件"),
      },
    ],
    steps: [
      { title: tt("Define the problem", "定义问题"), sub: tt("Need, goal, limits", "需求、目标、边界") },
      { title: tt("GPT ↔ Claude", "GPT ↔ Claude 讨论"), sub: tt("Two answers, compared", "同题出方案，互为对照") },
      { title: tt("Put my thinking in", "输入我的思考"), sub: tt("Pick one, state intent", "选方案、写清楚意图") },
      { title: "Design System", sub: tt("Tokens / components", "Token / 组件 / 排版规则") },
      { title: tt("MCP rough draft", "Claude 通过 MCP 出粗稿"), sub: tt("Straight into Figma", "直接写进 Figma 文件") },
      { title: tt("Revise · sign off", "修改 · 定稿"), sub: tt("Final review", "终审，必要时推翻") },
    ],
    note: tt(
      "This portfolio is itself a product of that workflow: bilingual, a dozen long pages — I dictated the intent, Claude executed in Figma, and I reviewed it page by page.",
      "这本作品集本身就是这套流程的产物：中英双语、十余页长页，由我口述意图、Claude 在 Figma 里执行、我逐页审改完成。"
    ),
  },

  // Act 03 — what the workflow left behind.
  skill: {
    cards: [
      {
        n: "01",
        name: tt("Problem", "问题"),
        body: tt(
          "The team had a slide template, but still came to me for layout and visuals — I became the bottleneck.",
          "团队有了 slide 模板，但做排版和视觉时还是习惯来找我——我成了瓶颈。"
        ),
      },
      {
        n: "02",
        name: tt("Approach", "做法"),
        body: tt(
          "Handed the design system, past marketing material and slide pages to Claude together, and distilled a Kyrall Layout Skill.",
          "把设计系统、过往的 marketing 材料和 slide 页面一起交给 Claude，沉淀成一个 Kyrall Layout Skill。"
        ),
      },
      {
        n: "03",
        name: tt("Result", "结果"),
        body: tt(
          "Team members lay out with the skill directly and most requests are met on the spot; I went from typesetter to rule-maker.",
          "团队成员直接用 skill 排版，大部分需求当场满足；要求更高时我再接手。我从「排版工」变成「规则制定者」。"
        ),
      },
    ],
    inputs: [
      tt("Design system", "设计系统"),
      tt("Marketing material", "Marketing 材料"),
      tt("Slide templates", "Slide 模板"),
    ],
    hub: "Kyrall Layout Skill",
    outputs: [
      tt("The team generates slides / visuals", "团队成员自助生成 slide / 视觉"),
      tt("Covers most day-to-day needs", "满足大部分日常需求"),
      tt("Higher bar → I take over", "更高要求 → 我接手"),
    ],
  },

  closing: {
    title: tt("Four generations of AI, my position has not moved: ", "AI 换了四代，我的位置没变："),
    accent: tt(
      "define the problem, set the constraints, make the final call.",
      "定义问题、给出约束、做最终判断。"
    ),
  },
}
