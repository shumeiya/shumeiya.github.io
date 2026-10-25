// The "Launch data" board from the Kyrall deck, transcribed from the Figma source
// (file XLWOr79xdX6g4OmJc1zGNw — frame "16 上线数据", with the English copy taken
// from its twin frame "16 Launch Data · EN").
//
// Copy and figures only; the drawing lives in LaunchDataBoard.jsx. The deck's own
// English frame grows two of the cards by 50px to fit longer sentences; this one
// keeps a single geometry for both languages, so a couple of the English notes are
// written to the length the Chinese box holds.
import { tt } from "../i18n/t"

export const kyrallLaunchData = {
  title: tt("Seven weeks live: the data validates the core flow", "上线 7 周：数据验证了核心流程"),
  lead: tt(
    "PostHog web analytics + product events · 1 Jul – 19 Aug 2026 · Data shows where to look, not the answer.",
    "PostHog Web Analytics + 产品事件 · 2026.07.01 – 08.19 · 数据只告诉我该看哪里，不直接给出答案。"
  ),

  // The deck sets a second, Latin line under each Chinese label; the English frame
  // drops it, since it would repeat the line above.
  stats: [
    { value: "11.3K", label: tt("Visitors", "访客"), sub: tt("", "Visitors") },
    { value: "68.3K", label: tt("Page views", "页面浏览"), sub: tt("", "Page views") },
    { value: "1620", label: tt("Prompt submissions", "次生成"), sub: tt("", "Prompt submissions") },
    { value: "6m29s", label: tt("Avg. session duration", "平均会话时长"), sub: tt("", "Session duration") },
  ],

  // `w` is the deck's own bar width in board px against a 572px track — the funnel
  // is drawn on a designed scale, not a linear one.
  funnel: {
    tag: "01 / FUNNEL",
    title: tt("From landing page to Editor", "从落地页到 Editor 的漏斗"),
    rows: [
      { label: tt("Landing visitors", "落地页访客"), value: "9721", w: 572 },
      { label: tt("Sign-up", "注册"), value: "1201", w: 201.05, delta: "12.4%" },
      { label: tt("Dashboard", "Dashboard"), value: "1104", w: 192.76, delta: "91.9%" },
      { label: tt("Editor", "Editor"), value: "694", w: 152.83, delta: "62.9%", lit: true },
    ],
    note: tt(
      "Almost no loss after sign-up (91.9%); six in ten reach a model in the first session. The landing page is not the problem.",
      "注册后几乎不流失（91.9%），六成用户在首个会话里拿到模型并进入 Editor；落地页不是问题，摩擦在后面。"
    ),
  },

  retention: {
    tag: "02 / RETENTION",
    title: tt("Week-1 retention stabilised after launch", "上线后 W1 留存趋稳"),
    points: [
      { x: "7/5", v: 2.4 },
      { x: "7/12", v: 6.1 },
      { x: "7/19", v: 4.4 },
      { x: "7/26", v: 5.4 },
      { x: "8/2", v: 5.7 },
      { x: "8/9", v: 5.9 },
    ],
    note: tt(
      "Launch week (Hacker News traffic) retained only 2.4%; later cohorts hold at 4.4–6.1% with no decline. LinkedIn is the best-retaining source (7.4%).",
      "发布周（HN 流量）W1 留存仅 2.4%，之后各周稳定在 4.4–6.1%、无下滑；LinkedIn 来源留存最高（7.4%）。"
    ),
    flag: tt(
      "Still low in absolute terms → next: track generation success and model satisfaction",
      "绝对值仍偏低 → 下一步补齐生成成功率与模型满意度埋点"
    ),
  },

  editor: {
    tag: "03 / EDITOR",
    title: tt("Value signals in the Editor", "Editor 的价值信号"),
    donut: {
      pct: 72,
      label: tt("AI suggestion acceptance", "AI 建议采纳率"),
      sub: tt("150 accepted / 58 ignored; Aesthetic highest at 77.6%", "150 采纳 / 58 忽略，外观类最高 77.6%"),
    },
    barsTitle: tt("Panel opened → action taken", "打开面板 → 完成操作"),
    // `w` against a 240px track, as the deck draws them.
    bars: [
      { label: "Export", value: "56.2%", w: 134.88, lit: true },
      { label: "Parameter", value: "50%", w: 120, lit: true },
      { label: "Measurement", value: "37.8%", w: 90.72 },
      { label: "Suggestion", value: "18.5%", w: 44.4 },
      { label: "History", value: "15.8%", w: 37.92 },
    ],
    note: tt(
      "Export completes in a median 4 s — the clearest value-realisation event.",
      "导出中位 4 秒完成，是最清晰的价值兑现事件。"
    ),
  },

  next: {
    tag: "04 / NEXT",
    title: tt("What the data points to next", "数据指向的下一步"),
    items: [
      {
        p: "P0",
        title: tt("Editor is the biggest friction point", "Editor 是最大摩擦点"),
        body: tt(
          "36.1% bounce and 57.5 rage clicks per 100 visitors; combine with session replays to locate the elements.",
          "36.1% 跳出、每百访客 57.5 次 Rage Click，结合 Session Replay 定位具体元素"
        ),
      },
      {
        p: "P0",
        title: tt("Simplify onboarding", "简化 Onboarding"),
        body: tt(
          "Nobody picked the Medical role and step 2 has no downstream use: merge roles, drop the Domain step.",
          "Medical 角色零选择、第二步与后续无关联：合并角色、去掉 Domain 步骤"
        ),
      },
      {
        p: "P1",
        title: tt("47% take no action after generating", "47% 用户生成后无动作"),
        body: tt(
          "Add success-rate, duration and satisfaction tracking to separate model quality from UX issues.",
          "补齐生成成功率 / 时长 / 满意度埋点，区分是模型质量还是体验问题"
        ),
      },
      {
        p: "P1",
        title: tt("Rebalance acquisition", "获客渠道调整"),
        body: tt(
          "HN traffic is one-off and Twitter barely retains; LinkedIn and organic search bring the best users.",
          "HN 流量一次性、Twitter 几乎无留存；LinkedIn 与自然搜索质量最高"
        ),
      },
    ],
  },
}
