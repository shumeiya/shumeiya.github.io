
import { tt } from "../i18n/t"

const ART = "/project/weatherpets/deck"

// --- The page header -------------------------------------------------------
//
// The deck's cover slide, folded into the page's own hero: the key visual runs
// full-bleed behind the opening, and the four facts the cover printed in boxes
// become the hero's meta row.

export const weatherPetsSummary = tt(
  "Upload a photo of your own pet and AI turns it into a weather mascot that dresses for the forecast, so checking the weather becomes a small daily pleasure.",
  "上传自家宠物照片，AI 生成会随天气换装的专属天气宠物，把每天看天气变成一件开心的小事。"
)

export const weatherPetsHero = {
  image: "/project/weatherpets/6.png",
  headline: tt("WeatherPets:Enjoy doses of joy daily!", "天气宠物：每天一剂快乐！"),
  meta: [
    { label: tt("My role", "我的角色"), value: tt("UX/UI designer · Front-end", "UX/UI 设计师 · 兼部分前端") },
    { label: tt("Timeline", "项目周期"), value: "2024.09 – 2025.07" },
    { label: tt("Partner", "公司"), value: "wetter.com × DPS" },
  ],
  stats: [
  ],
}

export const weatherPetsTags = [
  tt("AI product", "AI 应用"),
  tt("UX/UI design", "UX/UI 设计"),
  tt("0→1 launch", "0→1 上线"),
  tt("User research", "用户研究"),
]

// --- 02 · Overview ----------------------------------------------------------

const overview = {
  id: "overview",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Overview", "项目概览"),
  no: "02",
  eyebrow: tt("Overview", "项目概览"),
  title: tt("The whole project in one line", "一句话看懂这个项目"),
  lead: tt(
    "Exploring a new product for younger audiences with Germany's leading weather platform — research, design, testing and launch, end to end.",
    "为德国头部天气平台 wetter.com 探索面向年轻人的新产品，从 0 到 1 完成调研、设计、测试与上线。"
  ),
  kind: "overview",
  rows: [
    {
      tone: "pink",
      label: tt("Challenge", "挑战"),
      text: tt(
        "wetter.com's core audience skews older, while younger users simply open the weather app that came with their phone. How do you make a weather product interesting to them again?",
        "wetter.com 的主力用户偏年长，年轻人更习惯直接打开手机自带的天气 App。如何让年轻人重新对天气产品产生兴趣？"
      ),
    },
    {
      tone: "mint",
      label: tt("Solution", "方案"),
      text: tt(
        "Move from reading data to having company: the user uploads a pet photo, AI generates their own weather pet, and it dresses for the forecast and tells them whether today is colder or warmer than yesterday.",
        "从「看数据」转向「有陪伴」：用户上传宠物照片，AI 生成专属天气宠物，它会随天气换装，并告诉你今天比昨天冷还是热。"
      ),
    },
    {
      tone: "accent",
      label: tt("Result", "结果"),
      text: tt(
        "After research, two co-creation rounds and several rounds of user testing, it shipped on Google Play as “Weather Pets: Dose of Joy”, published by wetter.com GmbH — free, no in-app purchases, rated for the whole family.",
        "历经调研、两轮共创和多轮用户测试，以「Weather Pets: Dose of Joy」在 Google Play 上架，发布方为 wetter.com GmbH，免费、无内购、适合全家使用。"
      ),
    },
  ],
  role: {
    title: tt("My role", "我的角色"),
    pill: tt("Only designer on the team", "团队唯一设计师"),
    items: [
      tt("User research: surveys, in-depth interviews, competitive analysis", "用户研究：问卷、深度访谈、竞品分析"),
      tt("Interaction and visual design: Design 1.0 → 2.0", "交互与视觉设计：Design 1.0 → 2.0"),
      tt("Design system, weather icons and mascot visuals", "设计系统、天气图标与吉祥物视觉"),
      tt("Usability testing and iteration", "可用性测试与迭代"),
      tt("Marketing assets: posters, website, Google Ads", "营销物料：海报、官网、Google Ads"),
      tt("Part of the front-end build (React Native)", "部分前端开发（React Native）"),
    ],
  },
  team: {
    title: tt("A five-person cross-functional team", "5 人跨职能团队"),
    pills: [
      tt("Product manager × 2", "产品经理 × 2"),
      tt("Engineer × 2 (AI · backend / full stack)", "工程师 × 2（AI·后端 / 前后端）"),
      tt("Designer × 1 (me)", "设计师 × 1（我）"),
    ],
  },
  steps: [
    tt("Research", "调研"),
    tt("Define", "定义"),
    tt("Co-create", "共创"),
    tt("Prototype & test", "原型测试"),
    tt("Iterate", "迭代"),
    tt("Build & ship", "开发上线"),
    tt("Market", "营销推广"),
  ],
}

// --- 03 · Background --------------------------------------------------------

const background = {
  id: "background",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Background", "项目背景"),
  no: "03",
  eyebrow: tt("Background", "项目背景"),
  title: tt("A leading weather platform is losing the next generation", "一个头部天气平台，正在错过年轻人"),
  lead: tt(
    "wetter.com has an enormous user base, but it skews older — younger users default to the weather app already on their phone.",
    "wetter.com 拥有庞大的用户基础，但主力用户偏年长；年轻人更习惯打开手机自带的天气 App。"
  ),
  kind: "background",
  stats: [
    { value: tt("26M+", "2,600万+"), label: tt("Monthly unique users", "月活独立用户") },
    { value: tt("10M+", "1,000万+"), label: tt("Website and app downloads", "官网与 App 总下载量") },
    { value: "87%", label: tt("Of revenue from advertising", "营收来自广告"), tone: "accent" },
  ],
  revenue: {
    title: tt("Revenue mix", "营收结构"),
    segments: [
      { label: tt("Ads 87%", "广告 87%"), pct: 87, tone: "blue" },
      { label: tt("Content 8%", "内容 8%"), pct: 8, tone: "mint" },
      { label: tt("Software 5%", "软件 5%"), pct: 5, tone: "pink" },
    ],
    legend: tt("Content 8% · Software 5%", "内容 8% · 软件 5%"),
    note: tt(
      "Ad value depends on how active users are and how long they stay — the absence of younger users is the gap in future growth.",
      "广告价值取决于用户的活跃度与停留时长——年轻用户的缺席，就是未来增长的缺口。"
    ),
  },
  expectations: {
    title: tt("What the partner wanted", "合作方的期待"),
    sub: tt("From the first partner meeting", "来自第一次合作方会议"),
    items: [
      tt("Focus on long-term innovation, don't rush to monetise", "专注长期创新，不急于变现"),
      tt("Push the boundaries of what a weather app can be", "大胆推动天气 App 的边界"),
      tt("Think about how the next generation will interact with weather products", "思考年轻一代未来会怎样与天气产品互动"),
    ],
    note: tt(
      "Today: the core audience is 24 and older; main competitor WetterOnline has roughly 20M monthly users.",
      "现状：主力用户为 24 岁以上；主要竞品 WetterOnline 月活约 2,000 万。"
    ),
    sticker: `${ART}/sticker-cloud.png`,
  },
  hmw: {
    label: "How might we…",
    text: tt(
      "How might we make weather interesting and useful to young people again?",
      "我们如何让天气重新对年轻人变得有趣、有用？"
    ),
    sticker: `${ART}/sticker-cat.png`,
  },
  source: tt(
    "Sources: wetter.com first partner meeting (2024.09); Wikipedia and wetter.com's public careers pages.",
    "数据来源：wetter.com 首次合作方会议（2024.09）；维基百科、wetter.com 招聘页等公开资料"
  ),
}

// --- 04 · Research ----------------------------------------------------------

const research = {
  id: "research",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Research", "用户研究"),
  no: "04",
  eyebrow: tt("User research", "用户研究"),
  title: tt("First, the real question: how do young people read the weather?", "先搞清楚：年轻人到底怎么看天气？"),
  lead: tt(
    "Quantitative, qualitative and competitive tracks run in parallel, inside the “Rip the Product” research sprint of September–November 2024.",
    "定量、定性、竞品三条线并行，在 2024 年 9–11 月的「Rip the Product」研究冲刺中完成。"
  ),
  kind: "research",
  methods: [
    { value: "108", label: tt("valid survey responses", "份有效问卷"), note: tt("including 16 open-ended answers", "含 16 份开放题回答") },
    { value: "18", label: tt("in-depth interviews", "场深度访谈"), note: tt("5 more scheduled, ages 8–18", "另有 5 场已排期，覆盖 8–18 岁") },
    { value: "953", label: tt("social poll votes", "人社交投票"), note: tt("“What do you use for weather on your iPhone?”", "「你在 iPhone 上用什么看天气？」") },
    { value: "7", label: tt("competitors analysed", "款竞品分析"), note: tt("leading weather products in Europe, the US and China", "欧美与国内代表性天气产品") },
  ],
  why: {
    title: tt("Why do you check the weather?", "为什么看天气？"),
    sub: tt("Multiple choice · 108 responses", "多选 · 108 份问卷"),
    bars: [
      { label: tt("Decide what to wear", "决定穿搭"), pct: 75, tone: "accent" },
      { label: tt("Plan outdoor activities", "安排户外活动"), pct: 63 },
      { label: tt("Plan a trip", "出行规划"), pct: 49 },
      { label: tt("Prepare for severe weather", "应对极端天气"), pct: 33 },
    ],
    note: tt(
      "Getting dressed is the number one reason people check — which became the starting point for the product direction.",
      "穿搭是看天气的第一动机——这成为后来产品方向的起点。"
    ),
  },
  what: {
    title: tt("What do you check it with?", "用什么看天气？"),
    big: "60%",
    bigLabel: tt("use the weather app built into their iPhone", "用 iPhone 自带的天气 App"),
    segments: [
      { pct: 60, tone: "blue" },
      { pct: 38, tone: "mint" },
      { pct: 2, tone: "pink" },
    ],
    legend: tt("Third-party apps 38% · Don't check 2%", "第三方 App 38% · 不看 2%"),
    note: tt(
      "75% of survey respondents also use the stock weather app — the default is the real competitor.",
      "问卷中 75% 的人同样使用手机自带天气——默认 App 才是最大的竞争对手。"
    ),
    source: tt("Source: 953-vote social poll", "来源：953 人社交投票"),
  },
  how: {
    title: tt("How the interviews ran", "访谈怎么做"),
    items: [
      {
        tag: tt("Hard to reach", "难触达"),
        problem: tt("Ages 8–19 are difficult to contact directly", "8–19 岁不好直接联系"),
        fix: tt("Recruited through parent groups, teachers, friends' younger siblings", "通过家长群、老师、亲友弟妹招募"),
      },
      {
        tag: tt("Different minds", "理解差异"),
        problem: tt("Comprehension varies widely by age", "不同年龄认知差别大"),
        fix: tt("Wrote a separate interview guide for children", "为儿童单独设计访谈提纲"),
      },
      {
        tag: tt("Shy", "怕生"),
        problem: tt("Participants get shy easily", "受访者容易害羞"),
        fix: tt("Opened with warm-up questions to get them talking", "先用暖场问题打开话匣子"),
      },
    ],
    note: tt("Participants: 45% female · 55% male", "受访者性别：女 45% · 男 55%"),
  },
}

// --- 05 · Competitors -------------------------------------------------------

const competitors = {
  id: "competitors",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Competitors", "竞品分析"),
  no: "05",
  eyebrow: tt("Competitive analysis", "竞品分析"),
  title: tt("Everyone competes on forecast days; nobody asks what you're wearing", "大家都在拼预报天数，没人关心你今天穿什么"),
  lead: tt(
    "Seven representative products picked from Sensor Tower's German rankings (2024.09), compared across 17 features. The table below is an extract.",
    "基于 Sensor Tower 德国区排名（2024.09）选出 7 款代表性产品，横向对比 17 项功能。下表为节选。"
  ),
  kind: "competitors",
  columns: [
    { name: "wetter.com", region: tt("Germany", "德国"), highlight: true },
    { name: "WeatherPro", region: tt("Germany", "德国") },
    { name: "Weather Channel", region: tt("USA", "美国") },
    { name: "AccuWeather", region: tt("USA", "美国") },
    { name: "Not Boring", region: tt("USA", "美国") },
    { name: tt("Caiyun", "彩云天气"), region: tt("China", "中国") },
    { name: tt("Moji", "墨迹天气"), region: tt("China", "中国") },
  ],
  rows: [
    {
      label: tt("Forecast range", "预报天数"),
      cells: [
        tt("16 days", "16天"), tt("14 days", "14天"), tt("15 days", "15天"),
        tt("15 days", "15天"), tt("14 days", "14天"), tt("15 days", "15天"), tt("15 days", "15天"),
      ],
    },
    { label: tt("Personalised preferences", "个性化偏好"), cells: [false, false, true, true, false, true, false] },
    { label: tt("Custom interface styles", "界面风格自定义"), cells: [false, false, false, false, true, false, false] },
    { label: tt("Outfit advice", "穿衣建议"), cells: [false, false, false, false, false, true, true] },
    { label: tt("Activity suggestions", "活动关联"), cells: [true, false, true, false, false, true, false] },
    { label: tt("Social features", "社交功能"), cells: [false, false, false, false, false, false, true] },
    {
      label: tt("AI capability", "AI 能力"),
      cells: [false, false, false, false, false, tt("Chat", "对话"), tt("Cloud ID", "识云")],
    },
  ],
  legend: tt("✓ has the feature　— doesn't", "✓ 有该功能　— 无"),
  takeaways: [
    {
      no: "01",
      title: tt("The basics are completely commoditised", "基础功能高度同质化"),
      text: tt(
        "Forecast range, radar and widgets are table stakes — there is no differentiation left there.",
        "预报天数、雷达、小组件几乎人人都有，很难再拉开差距。"
      ),
    },
    {
      no: "02",
      title: tt("A gap in the European market", "欧洲市场的空白"),
      text: tt(
        "Outfit advice, social features and AI only show up in Chinese products; wetter.com has none of them.",
        "穿衣建议、社交、AI 只出现在国内产品中，wetter.com 在这几项上全部空缺。"
      ),
      tone: "accent",
    },
    {
      no: "03",
      title: tt("Young users want personality", "年轻人要「有个性」"),
      text: tt(
        "Not Boring Weather attracts young users with a stylised interface — the experience itself is the selling point.",
        "Not Boring Weather 用风格化界面吸引年轻人——体验本身就是卖点。"
      ),
    },
  ],
}

// --- 06 · Insights ----------------------------------------------------------

const insights = {
  id: "insights",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Insights", "用户洞察"),
  no: "06",
  eyebrow: tt("User insights", "用户洞察"),
  title: tt("Checking the weather isn't only about reading data", "看天气，不只是看数据"),
  lead: tt(
    "Putting the survey, the open-ended answers, the interviews and the desk research side by side, three signals kept coming back.",
    "把问卷、开放题、访谈和桌面调研放在一起，三个信号反复出现。"
  ),
  kind: "insights",
  cards: [
    {
      tone: "pink",
      tag: tt("Insight 01", "洞察 01"),
      title: tt("Weather = a decision before leaving the house", "天气 = 出门前的决策"),
      text: tt(
        "What people actually want to know is “what do I wear, do I need an umbrella”. 75% check the weather to decide what to wear.",
        "人们真正想知道的是「今天穿什么、要不要带伞」。75% 的受访者看天气是为了决定穿搭。"
      ),
      quote: tt(
        "“Every morning before I leave, I look at what I should wear, whether it'll rain and when it stops.”",
        "「每天早上出门前，看看该穿什么，会不会下雨、什么时候停。」"
      ),
      by: tt("— age 15, open-ended answer", "— 15 岁，开放题"),
    },
    {
      tone: "mint",
      tag: tt("Insight 02", "洞察 02"),
      title: tt("They want advice, not numbers", "要的是建议，不是数字"),
      text: tt(
        "Today's apps hand over data and leave the user to convert it into action; parents check the weather to confirm their kid is dressed warmly enough.",
        "现有 App 只给数据，用户得自己换算成行动；家长看天气，是为了确认孩子穿得够不够。"
      ),
      quote: tt(
        "“I looked today because I might need an umbrella.”",
        "「今天看了一眼，因为可能需要带伞。」"
      ),
      by: tt("— age 16, open-ended answer", "— 16 岁，开放题"),
    },
    {
      tone: "accent",
      tag: tt("Insight 03", "洞察 03"),
      title: tt("Emotional value is underrated", "情绪价值被低估"),
      text: tt(
        "Climate anxiety makes people check more often, for a sense of control; humour and personalisation can serve the information need and the emotional one at once.",
        "气候焦虑让人们更频繁地查看天气以获得掌控感；幽默与个性化能同时照顾信息需求和情绪需求。"
      ),
      quote: tt(
        "People refresh weather apps every few minutes, just to find a little reassurance in the uncertainty.",
        "人们会每隔几分钟刷一次天气 App，只为在不确定中找到一点安心。"
      ),
      by: tt("— desk research: The Guardian, 2023", "— 桌面调研：The Guardian，2023"),
    },
  ],
  pains: {
    title: tt("Five recurring pain points", "5 个高频痛点"),
    items: [
      tt("Inaccurate forecasts", "预报不准"),
      tt("No personalised advice", "缺少个性化建议"),
      tt("No alerts for sudden changes", "缺少突变天气提醒"),
      tt("Switching apps is a hassle", "换 App 门槛高"),
      tt("No pollen / air quality data", "缺少花粉 / 空气质量数据"),
    ],
    opportunity: {
      label: tt("Design opportunity", "设计机会"),
      text: tt(
        "Translate the weather into “what do I wear today”, and say it with some warmth",
        "把天气翻译成「今天怎么穿」，并用有温度的方式说出来"
      ),
    },
  },
}

// --- 07 · Co-creation -------------------------------------------------------

const cocreation = {
  id: "cocreation",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Co-creation", "共创收敛"),
  no: "07",
  eyebrow: tt("Co-creation", "共创与收敛"),
  title: tt("Two co-creation rounds, converging on three core features", "两轮共创，收敛出 3 个核心功能"),
  lead: tt(
    "Five of us diverged and voted on Miro, then used AI to cluster the ideas and turned the top directions into low-fidelity prototypes.",
    "5 人团队在 Miro 上发散、投票，再用 AI 对想法聚类，把高票方向落成低保真原型。"
  ),
  kind: "cocreation",
  rounds: [
    {
      tone: "pink",
      tag: tt("Round one", "第一轮"),
      hmw: tt("HMW: how do we attract young people to a weather platform?", "HMW：如何吸引年轻人使用天气平台？"),
      clusterLabel: tt("AI clustered them into 5 groups", "AI 聚类成 5 类"),
      clusters: [
        tt("Personalisation & AI", "个性化与 AI"),
        tt("Devices & IoT", "设备与 IoT"),
        tt("Notifications", "通知提醒"),
        tt("Interface experience", "界面体验"),
        tt("Actionable weather insight", "可行动的天气洞察"),
      ],
      votedLabel: tt("Top three ideas by vote", "投票最高的 3 个想法"),
      voted: [
        tt("AI outdoor assistant: plan sport and travel around the weather", "AI 户外活动助手：按天气规划运动与出行"),
        tt("Weather-based activity and outfit recommendations", "基于天气的活动与穿搭推荐"),
        tt("“Fun interaction, not boring data”", "「有趣的交互，而不是枯燥的数据」"),
      ],
    },
    {
      tone: "mint",
      tag: tt("Round two", "第二轮"),
      hmw: tt("HMW: how do we make weather cool to young people again?", "HMW：如何让天气对年轻人重新变酷？"),
      clusterLabel: tt("Social and gamified ideas clustered together", "社交与游戏化的点子集中出现"),
      clusters: [
        tt("Forecast prediction game", "天气预测比赛"),
        tt("Friends' weather wall", "好友天气墙"),
        tt("Weather alerts you can like and comment on", "可点赞评论的天气通知"),
        tt("Live weather wallpaper", "动态天气壁纸"),
        tt("XR weather experience", "XR 天气体验"),
        tt("AI-generated weather stories", "AI 生成的天气快拍"),
      ],
      closing: tt(
        "These eventually settled into “share your weather story in one tap”.",
        "这些想法最终沉淀为「一键分享天气故事」。"
      ),
    },
  ],
  featuresTitle: tt("Converged → three core features", "收敛 → 3 个核心功能"),
  features: [
    {
      no: "01",
      art: `${ART}/feat-1.png`,
      title: tt("Personal outfit assistant", "个人穿搭助手"),
      text: tt(
        "Outfit advice from live weather and how it actually feels, so you know what to wear to be comfortable today.",
        "根据实时天气与体感给出穿搭建议，告诉你今天穿什么才舒服。"
      ),
    },
    {
      no: "02",
      art: `${ART}/feat-2.png`,
      tone: "accent",
      title: tt("Weather mascot", "天气吉祥物"),
      text: tt(
        "Create your own character; it dresses for the weather and reports it in a playful, interactive way.",
        "创建专属形象，它会随天气换装，用有趣、互动的方式播报天气。"
      ),
    },
    {
      no: "03",
      art: `${ART}/feat-3.png`,
      title: tt("Social sharing", "社交分享"),
      text: tt(
        "Generate a weather story featuring your mascot's new look and share it to an Instagram story in one tap.",
        "一键生成带吉祥物新造型的天气故事，分享到 Instagram 快拍。"
      ),
    },
  ],
}

// --- 08 · Pivot -------------------------------------------------------------

const pivot = {
  id: "pivot",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("The pivot", "关键转折"),
  no: "08",
  eyebrow: tt("The pivot", "关键转折"),
  title: tt("Why pets, in the end?", "为什么最后是「宠物」？"),
  lead: tt(
    "From “pick an avatar” to “generate my own pet” — the single most important turn the project took.",
    "从「挑一个虚拟形象」到「生成我自己的宠物」——整个项目最关键的一次转向。"
  ),
  kind: "pivot",
  timeline: [
    {
      step: tt("Starting point · Design 1.0", "起点 · Design 1.0"),
      text: tt(
        "The user picks a human avatar and watches them dress for the weather.",
        "用户挑选一个真人虚拟形象，看 TA 根据天气换装。"
      ),
    },
    {
      step: tt("Discovery", "发现"),
      text: tt(
        "Interviews and everyday observation showed how many people in Germany keep pets — and the moment pets came up, participants visibly leaned in.",
        "访谈和日常观察中发现，德国很多人养宠物；一聊到宠物，受访者明显更投入。"
      ),
    },
    {
      step: tt("Validation", "验证"),
      text: tt(
        "We added a pet mascot to the MVP and the reaction was overwhelming — even a classmate's grandmother loved it.",
        "做 MVP 时加入宠物吉祥物，大家的反应非常热烈——连同学的奶奶都很喜欢。"
      ),
    },
    {
      step: tt("Decision", "决策"),
      text: tt(
        "Let users upload a photo of their own pet and have AI generate their weather pet. The emotional connection goes from “a character” to “my pet”.",
        "让用户上传自家宠物照片，AI 生成专属天气宠物。情感连接从「一个角色」变成「我的宠物」。"
      ),
    },
  ],
  pairs: {
    title: tt("User's real pet → AI-generated weather pet", "用户上传的真实宠物 → AI 生成的天气宠物"),
    sub: tt("Real examples from user testing", "来自用户测试的真实样例"),
    legend: [
      { label: tt("Real photo", "真实照片"), tone: "quiet" },
      { label: tt("AI weather pet", "AI 天气宠物"), tone: "accent" },
    ],
    images: [
      { src: `${ART}/pair-1.png`, alt: tt("A bird photo and its AI weather pet", "小鸟照片与生成的天气宠物") },
      { src: `${ART}/pair-2.png`, alt: tt("A dog photo and its AI weather pet", "狗狗照片与生成的天气宠物") },
      { src: `${ART}/pair-3.png`, alt: tt("A cat photo and its AI weather pet", "猫咪照片与生成的天气宠物") },
      { src: `${ART}/pair-4.png`, alt: tt("A spotted dog photo and its AI weather pet", "花斑狗照片与生成的天气宠物") },
    ],
  },
}

// --- 09 · Iteration ---------------------------------------------------------

const iteration = {
  id: "iteration",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Iteration", "设计迭代"),
  no: "09",
  eyebrow: tt("Design iteration", "设计迭代"),
  title: tt("Design 1.0 → 2.0: the lead role goes from person to pet", "Design 1.0 → 2.0：主角从「人」换成「宠物」"),
  lead: tt(
    "The information architecture barely moved. Swap the lead role, and the emotional temperature of the whole experience changes.",
    "信息架构基本不变，换掉「主角」之后，体验的情感温度完全不同。"
  ),
  kind: "iteration",
  panels: [
    {
      tag: tt("Design 1.0 · human avatar", "Design 1.0 · 真人形象"),
      shots: [
        { src: `${ART}/d1-avatar.png`, caption: tt("Pick an avatar", "选择形象") },
        { src: `${ART}/d1-outfit.png`, caption: tt("Outfit onboarding", "穿搭引导") },
        { src: `${ART}/d1-home.png`, caption: tt("Home", "首页") },
      ],
    },
    {
      tag: tt("Design 2.0 · pet mascot", "Design 2.0 · 宠物吉祥物"),
      tone: "accent",
      shots: [
        { src: `${ART}/d2-mascot.png`, caption: tt("Pick a mascot", "选择吉祥物") },
        { src: `${ART}/d2-upload.png`, caption: tt("Upload a pet photo", "上传宠物照片") },
        { src: `${ART}/d2-home.png`, caption: tt("Home", "首页") },
      ],
    },
  ],
  changes: [
    tt("Lead role: human avatar → pet (preset + AI-generated)", "主角：真人形象 → 宠物（预设 + AI 生成）"),
    tt("Home: city skyline backdrop + “colder / warmer than yesterday”", "首页：城市地标背景 +「比昨天冷 / 热」提示"),
    tt("Naming: Weather Buddy → WeatherPaws → WeatherPets", "命名：Weather Buddy → WeatherPaws → WeatherPets"),
  ],
}

// --- 10 · AI generation -----------------------------------------------------

const aiflow = {
  id: "ai-generation",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("AI pets", "AI 生成"),
  no: "10",
  eyebrow: tt("Core experience ①", "核心体验 ①"),
  title: tt("Turning your pet into your own weather reporter", "把你的宠物，变成专属天气播报员"),
  lead: tt(
    "Upload one photo; AI identifies the breed, generates the mascot, then prepares outfits for different weather. The design work sat in the guidance before generation and the fallback when it fails.",
    "上传一张照片，AI 识别品种、生成吉祥物，再为不同天气备好穿搭。设计重点在「生成前的引导」和「失败时的兜底」。"
  ),
  kind: "aiflow",
  shots: [
    { src: `${ART}/gen-upload.png`, caption: tt("Upload a photo · shooting guidance", "上传照片 · 拍摄指引") },
    { src: `${ART}/gen-create.png`, caption: tt("New mascot · generations left this week", "新建吉祥物 · 本周剩余次数") },
    { src: `${ART}/gen-result.png`, caption: tt("Result · my pets", "生成结果 · 我的宠物们") },
  ],
  decisions: [
    {
      title: tt("Guidance up front", "拍摄指引前置"),
      text: tt(
        "Good and bad examples side by side: good light, front-facing, one pet, nothing in the way — quality improves at the source.",
        "用正反例说明：光线好、正脸、单只宠物、无遮挡，从源头提升生成质量。"
      ),
    },
    {
      title: tt("Failure is recoverable", "失败可恢复"),
      text: tt(
        "Upload and generation failures both explain why and offer a path to retry.",
        "上传失败、生成失败都说明原因，并给出重试路径。"
      ),
    },
    {
      title: tt("Cost stays in hand", "成本可控"),
      tone: "accent",
      text: tt(
        "A weekly generation limit plus preset pets as fallback, balancing AI cost against the experience.",
        "每周限次生成 + 预设宠物兜底，平衡 AI 成本与体验。"
      ),
    },
  ],
  pipeline: {
    title: tt("The AI generation pipeline", "AI 生成链路"),
    nodes: [
      tt("Upload a photo", "上传照片"),
      tt("OpenAI Vision identifies the breed", "OpenAI Vision 识别品种"),
      tt("DALL·E 3 generates the mascot", "DALL·E 3 生成吉祥物"),
      tt("Outfits for sun / rain / cold", "晴 / 雨 / 冷 多套穿搭"),
    ],
    note: tt(
      "Also evaluated: Image2Image · Inpainting · SAM2 · Midjourney",
      "也评估过：Image2Image · Inpainting · SAM2 · Midjourney"
    ),
  },
  edges: {
    title: tt("Don't forget when it doesn't go well", "别忘了「不顺利」的时候"),
    shots: [
      { src: `${ART}/err-upload.png`, caption: tt("Upload failed", "上传失败") },
      { src: `${ART}/err-generate.png`, caption: tt("Generation failed", "生成失败") },
      { src: `${ART}/err-quota.png`, caption: tt("Out of generations", "次数用完") },
    ],
  },
}

// --- 11 · Home screen -------------------------------------------------------

const homescreen = {
  id: "home-screen",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Home screen", "首页体验"),
  no: "11",
  eyebrow: tt("Core experience ②", "核心体验 ②"),
  title: tt("Open the app and know what to wear at a glance", "打开 App，一眼知道今天怎么穿"),
  lead: tt(
    "The home screen translates weather data into advice, and makes the pet part of the information rather than decoration on top of it.",
    "首页把「天气数据」翻译成「行动建议」，让宠物成为信息本身，而不只是装饰。"
  ),
  kind: "homescreen",
  shot: `${ART}/home-hero.png`,
  left: [
    {
      no: "01",
      title: tt("A one-line conclusion", "一句话结论"),
      text: tt(
        "“Colder / warmer than yesterday”: yesterday's feel as the reference point for deciding what to wear today.",
        "「比昨天冷 / 热」：用昨天的体感作参照，判断今天怎么穿。"
      ),
    },
    {
      no: "02",
      title: tt("City landmark backdrop", "城市地标背景"),
      text: tt(
        "Silhouettes of Munich and other cities give a sense of place and make switching cities more obvious.",
        "慕尼黑等城市剪影，带来归属感，也让切换城市更直观。"
      ),
    },
    {
      no: "03",
      title: tt("Hourly forecast strip", "逐小时预报条"),
      text: tt(
        "The efficiency of an ordinary weather app is preserved; the information isn't drowned by decoration.",
        "保留天气 App 的基础效率，信息不被装饰淹没。"
      ),
    },
  ],
  right: [
    {
      no: "04",
      title: tt("The pet dresses for the weather", "宠物随天气换装"),
      text: tt(
        "Sunglasses in the sun, a raincoat in the rain, a scarf in the cold; tapping or dragging the pet triggers a small animation.",
        "晴天墨镜、雨天雨衣、冷天围巾；点击或拖动宠物还会触发小动画。"
      ),
    },
    {
      no: "05",
      title: tt("Share in one tap", "一键分享"),
      text: tt(
        "Generate a weather story with the pet's new look and share it to Instagram.",
        "生成带宠物新造型的天气快拍，分享到 Instagram。"
      ),
    },
  ],
  outfits: {
    title: tt("One pet, a different outfit for every kind of weather", "同一只宠物，不同天气不同穿搭"),
    images: [
      { src: `${ART}/outfit-1.png`, alt: tt("Cat mascot in a trench coat", "穿风衣的猫咪吉祥物") },
      { src: `${ART}/outfit-2.png`, alt: tt("Mascot in summer clothes", "穿夏装的吉祥物") },
      { src: `${ART}/outfit-3.png`, alt: tt("Cat mascot in a jacket", "穿夹克的猫咪吉祥物") },
      { src: `${ART}/outfit-4.png`, alt: tt("Mascot in sunglasses", "戴墨镜的吉祥物") },
    ],
  },
}

// --- 12 · Testing -----------------------------------------------------------

const testing = {
  id: "testing",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Testing", "用户测试"),
  no: "12",
  eyebrow: tt("User testing", "用户测试"),
  title: tt("Two or three ideas a week, decided by users", "每周测 2–3 个想法，让用户替我们做决定"),
  lead: tt(
    "Repeated “Rip the Product” rounds plus scenario-based usability tests, with the prototype available in both English and German.",
    "多轮「Rip the Product」迭代 + 场景化可用性测试，原型同时提供英语和德语版本。"
  ),
  kind: "testing",
  method: {
    title: tt("How we tested", "怎么测"),
    scriptTag: tt("Scenario task script", "场景化任务脚本"),
    script: tt(
      "“You're looking for a new weather app. Please use this prototype as naturally as you normally would.” “It's now 9:30 the next morning and you open the app again — feel free to explore the buttons.”",
      "「你正在寻找一款新的天气 App，请像平时一样自然地使用这个原型。」 「现在是第二天早上 9:30，你再次打开 App，可以开始探索各个按钮。」"
    ),
    bilingualTag: tt("Bilingual prototype", "双语原型"),
    bilingual: tt(
      "Both the prototype and the test script were prepared in English and German.",
      "原型与测试脚本都准备了英语和德语两个版本。"
    ),
    recruitTag: tt("Recruiting", "招募方式"),
    recruit: [
      tt("A pool of users who had opted into testing", "已同意参与测试的用户池"),
      tt("Gift-card prize draw as an incentive", "礼品卡抽奖激励"),
      tt("Social media recruiting", "社交媒体招募"),
    ],
  },
  validate: {
    title: tt("What we validated", "验证什么"),
    hypothesesLabel: tt("Product hypotheses", "产品假设"),
    hypotheses: [
      tt("Is a personalised weather report more engaging?", "个性化天气播报是否更吸引人？"),
      tt("Do people like the mascot?", "吉祥物是否被喜欢？"),
      tt("Does the outfit change spark curiosity and bring people back?", "换装能否引发好奇、带来回访？"),
      tt("Are users willing to share to social media?", "用户是否愿意分享到社交媒体？"),
    ],
    detailsLabel: tt("Interaction details", "交互细节"),
    details: [
      tt("How does the UI feel compared to the last version?", "UI 相比上一版感觉如何？"),
      tt("Is adding a city a smooth flow?", "添加城市的流程是否顺畅？"),
      tt("Does dragging and tapping the pet feel responsive?", "拖动、点击宠物的互动是否流畅？"),
      tt("Is the menu button next to the pet clear?", "宠物旁的菜单按钮是否清楚？"),
    ],
  },
  changes: {
    title: tt("What it changed", "带来的改变"),
    items: [
      {
        label: tt("Feedback", "反馈"),
        text: tt("“WeatherPaws” is hard to read and hard to understand", "「WeatherPaws」读不顺，也看不懂"),
        result: tt("→ Renamed to WeatherPets", "→ 改名 WeatherPets"),
      },
      {
        label: tt("Feedback", "反馈"),
        text: tt("The pet mascot got the strongest reaction in testing", "测试中大家对宠物吉祥物的反应最热烈"),
        result: tt("→ Pet becomes the lead role, plus AI generation", "→ 主角换成宠物，并加入 AI 生成"),
      },
    ],
    sticker: `${ART}/sticker-golden.png`,
  },
}

// --- 13 · Design to build ---------------------------------------------------

const build = {
  id: "build",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Build", "设计到开发"),
  no: "13",
  eyebrow: tt("Design to build", "设计到开发"),
  title: tt("From file to store listing — the designer writes code too", "从设计稿到上架：设计师也下场写代码"),
  lead: tt(
    "With engineering stretched thin, I took on part of the React Native front end so the design intent landed in the product more completely.",
    "开发资源紧张时，我承担了部分 React Native 前端开发，让设计意图更完整地落进产品。"
  ),
  kind: "build",
  architecture: {
    title: tt("Technical architecture", "技术架构"),
    app: { title: "React Native App", sub: tt("iOS · Android · Web", "iOS · Android · Web") },
    backend: {
      title: tt("FastAPI backend", "FastAPI 后端"),
      sub: tt("Computes “colder / warmer than yesterday”, generates outfit advice", "计算「比昨天冷 / 热」、生成穿搭建议"),
    },
    sides: [
      {
        title: tt("Meteonomiqs weather API", "Meteonomiqs 天气 API"),
        sub: tt("Live weather + 7-day forecast", "实时天气 + 7 天预报"),
      },
      {
        title: tt("AI generation service", "AI 生成服务"),
        sub: tt("Vision identifies the breed, DALL·E 3 generates pet and outfits", "Vision 识别品种，DALL·E 3 生成宠物与穿搭"),
      },
    ],
    note: tt(
      "Containerised deploys on Coolify · master is production · technical docs kept in mdbook",
      "Coolify 容器化部署 · master 分支即生产环境 · 技术文档用 mdbook 维护"
    ),
  },
  mvp: {
    title: tt("MVP scope trade-off", "MVP 范围取舍"),
    text: tt(
      "To get the prototype into users' hands quickly, the first version shipped only 3 outfits × 5 weather types (sun / cloud / rain / sun-to-cloud / snow), with playful copy adding the sense of variety — the cheapest way to test whether dressing up is genuinely appealing.",
      "为了尽快把原型交到用户手里，第一版只做 3 套穿搭 × 5 种天气（晴 / 多云 / 雨 / 晴转多云 / 雪），再用趣味文案增加变化感——用最小成本验证「换装」是否真的有吸引力。"
    ),
  },
  system: {
    title: tt("Design system", "设计系统"),
    sub: tt(
      "One set of components serving both the design file and the code, so less is lost in translation.",
      "一套组件同时服务设计稿和代码，减少还原误差。"
    ),
    pills: [
      tt("Buttons · primary / secondary / tertiary", "按钮 · 主 / 次 / 三级"),
      tt("Weather widgets · light / dark", "天气小组件 · 亮色 / 暗色"),
      tt("3D weather icons × 26", "3D 天气图标 × 26"),
      tt("Mascot component · outfit and animation states", "吉祥物组件 · 换装与动画状态"),
      tt("Status bar · menu · search · dialog · share sheet", "状态栏 · 菜单 · 搜索 · 对话框 · 分享面板"),
    ],
    images: [
      { src: `${ART}/ds-1.png`, alt: tt("Mascot with a beret", "戴贝雷帽的吉祥物") },
      { src: `${ART}/ds-2.png`, alt: tt("Mascot in sunglasses", "戴墨镜的吉祥物") },
      { src: `${ART}/ds-3.png`, alt: tt("Human avatar in a yellow coat", "穿黄色外套的真人形象") },
      { src: `${ART}/ds-4.png`, alt: tt("Human avatar in a green jacket", "穿绿色夹克的真人形象") },
    ],
    engTitle: tt("My engineering contribution", "我的工程参与"),
    eng: [
      tt("Built part of the screens and interactions in React Native", "用 React Native 实现部分页面与交互"),
      tt("Kept design components and code components one to one", "设计组件与代码组件一一对应"),
      tt("Took part in on-device debugging and Android builds", "参与真机调试与 Android 构建"),
    ],
  },
}

// --- 14 · After launch ------------------------------------------------------

const aftermath = {
  id: "aftermath",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("After launch", "上线之后"),
  no: "14",
  eyebrow: tt("After launch", "上线之后"),
  title: tt("5,600+ installs, and two reviews that made me think", "5,600+ 次安装，和两条让我反思的差评"),
  lead: tt(
    "Listed March 2025, delisted January 2026 (wetter.com was sold to the Funke media group around the same time). Install figures from AppBrain's public pages.",
    "2025 年 3 月上架，2026 年 1 月下架（同期 wetter.com 被出售给 Funke 媒体集团）。安装数据来自 AppBrain 公开页面。"
  ),
  kind: "aftermath",
  chart: {
    title: tt("Cumulative installs", "累计安装量"),
    sub: tt("Monthly approximations read off the AppBrain curve", "按 AppBrain 曲线读取的月度约数"),
    max: 6000,
    ticks: [0, 2000, 4000, 6000],
    points: [0, 60, 100, 150, 220, 780, 980, 3100, 4300, 5200, 5600],
    months: [
      tt("Mar", "3月"), tt("Apr", "4月"), tt("May", "5月"), tt("Jun", "6月"),
      tt("Jul", "7月"), tt("Aug", "8月"), tt("Sep", "9月"), tt("Oct", "10月"),
      tt("Nov", "11月"), tt("Dec", "12月"), tt("Jan", "1月"),
    ],
    years: ["2025", "2026"],
    // `place` is the side of the curve each callout hangs on — the last two sit close
    // together near the ceiling, so one goes above the line and one below it.
    markers: [
      { at: 6, tone: "mint", place: "above", label: tt("22 Sep · past 1,000", "9.22 破 1,000") },
      { at: 9, tone: "accent", place: "above", label: tt("1 Dec · past 5,000", "12.1 破 5,000") },
      { at: 10, tone: "pink", place: "below", label: tt("26 Jan 2026 · delisted", "2026.1.26 下架") },
    ],
    read: tt(
      "Growth is concentrated in September–December, and after mid-December there is almost nothing new: marketing brought downloads, but the product never grew on its own.",
      "增长集中在 9–12 月，12 月中之后几乎没有新增：推广能带来下载，但产品没有形成自然增长。"
    ),
  },
  reviews: {
    title: tt("Real user reviews", "真实用户评价"),
    sub: tt("Google Play · translated from the English originals", "Google Play · 译自英文原评"),
    items: [
      {
        stars: 2,
        text: tt(
          "“Nice idea, but the AI often fails to generate, and even when it works the picture won't upload; there's too little to choose from and locations outside Europe are hard to find.”",
          "「想法很好，但 AI 经常生成失败，就算生成成功了，图片也传不上去；可选的东西太少，欧洲以外的地点也很难定位。」"
        ),
      },
      {
        stars: 2,
        text: tt(
          "“The weather isn't accurate; the app freezes when picking a pet, and there's no way to customise.”",
          "「天气不准；选宠物的时候 App 会卡住，也没法自定义。」"
        ),
      },
    ],
  },
  retro: {
    title: tt("My retrospective", "我的复盘"),
    text: tt(
      "The bad reviews cluster around AI generation and upload failures, freezing while picking a pet, and locations outside Europe — the fallbacks designed on page 10 needed engineering to actually deliver them. Acquisition worked; stability of the experience held it back.",
      "差评集中在 AI 生成与上传失败、选择宠物卡住、海外定位——第 10 页设计的兜底，需要工程真正兑现。获客有效，体验稳定性拖了后腿。"
    ),
  },
}

// --- 15 · Outcome -----------------------------------------------------------

const outcome = {
  id: "outcome",
  // Short enough for the left-hand chapter index, which sits in the page margin
  // and would otherwise run across the board at its 28px active size.
  nav: tt("Outcome", "成果反思"),
  no: "15",
  eyebrow: tt("Outcome & reflection", "成果与反思"),
  title: tt("Shipped — and what I took away", "上线，以及我学到的"),
  lead: tt(
    "From a DPS partner project to a product published under wetter.com's own name.",
    "从一次 DPS 合作项目，走到 wetter.com 名下正式发布的产品。"
  ),
  kind: "outcome",
  store: {
    title: tt("Live on Google Play", "Google Play 上架"),
    icon: `${ART}/app-icon.png`,
    name: "Weather Pets: Dose of Joy",
    publisher: "wetter.com GmbH",
    pills: [tt("Free", "免费"), tt("No in-app purchases", "无内购"), tt("Family friendly", "适合全家")],
    tagline: tt(
      "Store description: Weather forecast + your pet = the cutest weather update! Generate your own AI mascot.",
      "商店简介：天气预报 + 你的宠物 = 最可爱的天气更新！生成你自己的 AI 吉祥物。"
    ),
    facts: [
      tt("About 5,600 cumulative installs (AppBrain)", "累计安装约 5,600 次（AppBrain）"),
      tt("Live for roughly 10 months, delisted January 2026", "在架约 10 个月，2026 年 1 月下架"),
      tt("Version 1.0.0 · Android 7.0+", "版本 1.0.0 · Android 7.0+"),
    ],
    source: tt("Sources: APKPure and AppBrain public pages", "来源：APKPure、AppBrain 公开页面"),
  },
  marketing: {
    title: tt("Marketing assets", "营销物料"),
    sub: tt("2 posters · Wix website · Google Ads in three sizes", "海报 2 版 · Wix 官网 · Google Ads 三种尺寸"),
    banner: `${ART}/ads-banner.png`,
    bannerAlt: tt("Google Ads landscape banner", "Google Ads 横版广告"),
    audienceLabel: tt("Copy written for two audiences", "针对两类人群写文案"),
    audiences: [
      {
        tag: tt("Has a pet", "有宠物"),
        tone: "accent",
        text: tt("Upload a photo and let your pet report the weather", "上传照片，让你的宠物来播报天气"),
      },
      {
        tag: tt("No pet", "没宠物"),
        tone: "mint",
        text: tt("Adopt a digital weather pet: no walks, no shedding", "领养一只数字天气宠物：不用遛，也不掉毛"),
      },
    ],
    slogan: tt("Slogan: Who's the cutest weatherman? Your pet!", "Slogan：Who's the cutest weatherman? Your pet!"),
  },
  reflectionsTitle: tt("What I learned", "我学到的"),
  reflections: [
    {
      no: "01",
      title: tt("Emotional value is a feature", "情绪价值也是功能"),
      text: tt(
        "Young people aren't short of weather data; they're short of a reason to open the app. The pet turned “checking the weather” into “seeing what it's wearing today”.",
        "年轻人不缺天气数据，缺的是打开 App 的理由。宠物把「看天气」变成了「看看它今天穿什么」。"
      ),
    },
    {
      no: "02",
      title: tt("Even the name deserves validation", "小到名字也要验证"),
      text: tt(
        "WeatherPaws → WeatherPets: however small the detail, it's worth putting in front of users.",
        "WeatherPaws → WeatherPets：再小的细节，也值得交给用户检验。"
      ),
    },
    {
      no: "03",
      title: tt("Design the failure — then make sure it ships", "AI 体验要设计「失败」，更要兑现"),
      text: tt(
        "The bad reviews after launch all concerned generation and upload failures. I'd now define acceptance criteria for AI reliability with engineering far earlier, and put failure rate into testing.",
        "上线后差评集中在生成和上传失败。我会更早和工程一起定义 AI 可用性的验收标准，并把失败率纳入测试。"
      ),
    },
  ],
}

// The section eyebrow is the slide's number and chapter name — "02 · Overview" —
// which has to stay a wrapped string so it still switches language.
const localizedEyebrow = (slide) => ({
  __t: true,
  en: `${slide.no} · ${slide.eyebrow.en}`,
  zh: `${slide.no} · ${slide.eyebrow.zh}`,
})

// --- The deck, in order -----------------------------------------------------

export const weatherPetsSlides = [
  overview,
  background,
  research,
  competitors,
  insights,
  cocreation,
  pivot,
  iteration,
  aiflow,
  homescreen,
  testing,
  build,
  aftermath,
  outcome,
]

// One section per slide. The board carries the slide's own eyebrow, title and lead
// — the page's heading would say all three a second time — so the heading is kept
// for the chapter index and the document outline and hidden from view.
export const weatherPetsSections = weatherPetsSlides.map((slide) => ({
  id: slide.id,
  eyebrow: localizedEyebrow(slide),
  // The board opens with the slide's own headline, so the page's heading stays for
  // the chapter index and the outline but is not drawn twice — the same arrangement
  // the Kyrall boards use.
  label: slide.nav,
  titleHidden: true,
  blocks: [{ type: "wpdeck", slide }],
}))
