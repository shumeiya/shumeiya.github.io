import { tt } from "../i18n/t"

// The WeatherPets case study, as the V3 deck in Figma tells it (file
// 2026作品集 · page "weatherpets", frames "V3 · 01 封面" … "V3 · 16 成果与反思").
// The Chinese is the deck's own copy, word for word; the English is a
// translation of it. The cover folds into the page's hero; the other fifteen
// frames each become one section, drawn by WeatherPetsDeck.jsx.

const ART = "/project/weatherpets/deck"
const V3 = `${ART}/v3`

// --- 01 · Cover → the page header --------------------------------------------

export const weatherPetsSummary = tt(
  "An AI weather app built for wetter.com, Germany's leading weather platform: upload a photo of your pet and AI generates a weather pet of your own that dresses for the forecast.",
  "为德国头部天气平台 wetter.com 打造的 AI 天气应用：上传宠物照片，AI 生成会随天气换装的专属天气宠物。"
)

export const weatherPetsHero = {
  image: "/project/weatherpets/6.png",
  headline: tt("Let your pet be your weather reporter", "让你的宠物，成为你的天气播报员"),
  meta: [
    { label: tt("My role", "我的角色"), value: tt("UX/UI designer · part-time front-end", "UX/UI 设计师 · 兼部分前端") },
    { label: tt("Timeline", "项目周期"), value: "2024.09 – 2025.07" },
    { label: tt("Partner", "公司伙伴"), value: "wetter.com × DPS" },
    { label: tt("Launch result (DACH, 4 months)", "上线成果（德语区 4 个月）"), value: "Google Play · 5,600+" },
  ],
  stats: [],
}

export const weatherPetsTags = [
  tt("AI weather app", "AI 天气应用"),
  tt("UX/UI · 0 → 1", "UX/UI · 0 → 1"),
  tt("Live on Google Play", "Google Play 已上线"),
]

// --- 02 · Overview --------------------------------------------------------------

const overview = {
  id: "overview",
  nav: tt("Overview", "项目概览"),
  no: "02",
  eyebrow: tt("Overview", "Overview"),
  title: tt("Project overview", "项目概览"),
  kind: "overview",
  about: {
    tab: tt("About Project", "About Project"),
    brand: "WeatherPets",
    title: tt("Introduction", "项目介绍"),
    // `**…**` marks the words the deck set in yellow.
    text: tt(
      "A new product for younger audiences, explored with Germany's leading weather platform wetter.com. We turned checking the weather **from “weather data” into “a daily treat”**: upload a photo of your own pet, AI generates a weather pet, and the pet dresses for the weather, telling you today's forecast visually.",
      "德国头部天气平台 wetter.com 探索面向年轻人的新产品。我们把看天气**从「天气数据」变成「每日乐趣」**：上传自家宠物照片，AI 生成一个天气萌宠，天气萌宠会随天气换装，通过视觉的方式告诉你今天的天气。"
    ),
    shapes: [
      {
        tone: "card",
        title: tt("Challenge", "挑战"),
        sub: "Challenge",
        text: tt("Young people are used to the weather app that came with their phone", "年轻人更习惯用手机自带的天气 App"),
      },
      {
        tone: "blue",
        title: tt("Solution", "方案"),
        sub: "Solution",
        text: tt("Turn checking the weather into a daily treat: an AI-generated weather pet of your own that changes outfits", "将看天气变成每日乐趣，AI 生成会换装的专属天气宠物"),
      },
      {
        tone: "yellow",
        title: tt("Result", "结果"),
        sub: "Result",
        text: tt("Google Play (DACH, 4 months) · 5,600+", "Google Play (德语区4个月) · 5,600+"),
      },
    ],
  },
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
    pills: [tt("Product manager × 2", "产品经理 × 2"), tt("Engineer × 2", "工程师 × 2"), tt("Designer × 1 (me)", "设计师 × 1（我）")],
  },
  steps: [
    tt("Research", "调研"),
    tt("Define", "定义"),
    tt("Co-create", "共创"),
    tt("Design iteration", "设计迭代"),
    tt("Prototype testing", "原型测试"),
    tt("Build & launch", "开发上线"),
    tt("Marketing", "营销推广"),
  ],
}

// --- 03 · Background ------------------------------------------------------------

const background = {
  id: "background",
  nav: tt("Background", "项目背景"),
  no: "03",
  eyebrow: tt("Background", "Background"),
  title: tt("Background", "项目背景"),
  kind: "background",
  intro: {
    line: tt("wetter.com has an enormous user base, but its core users skew older.", "wetter.com 用户基础庞大，但主力用户偏年长。"),
    question: tt("The company's question: why won't young people download a third-party weather app?", "公司的疑惑：为什么年轻人不愿意下载第三方天气应用？"),
  },
  stats: [
    { value: "26M+", label: tt("wetter.com monthly unique users", "wetter.com月活独立用户"), note: tt("As of 2022, web and app combined", "截至 2022 年，Web 与 App 合计"), tone: "blue" },
    { value: "10M+", label: tt("Website and app downloads", "官网与 App 总下载量"), tone: "yellow" },
    { value: "87%", label: tt("Of revenue from advertising", "营收来自广告"), tone: "dark" },
  ],
  revenue: {
    title: tt("Revenue mix", "营收结构"),
    segments: [
      { label: tt("Ads 87%", "广告 87%"), pct: 87, tone: "blue" },
      { pct: 8, tone: "yellow" },
      { pct: 5, tone: "pale" },
    ],
    legend: tt("Content 8% · Software 5%", "内容 8% · 软件 5%"),
    note: tt(
      "Ad value depends on how active users are and how long they stay: the absence of younger users is the gap in future growth.",
      "广告价值取决于用户的活跃度与停留时长：年轻用户的缺席，就是未来增长的缺口。"
    ),
  },
  expectations: {
    tab: "Partner",
    title: tt("What the company expected", "公司的期待"),
    sub: tt("From internal company meetings", "来自公司内部会议"),
    items: [
      tt("Focus on long-term innovation, don't rush to monetise", "专注长期创新，不急于变现"),
      tt("Push the boundaries of what a weather app can be", "大胆推动天气 App 的边界"),
      tt("Think about how the next generation will interact with weather products", "思考年轻一代未来会怎样与天气产品互动"),
    ],
    note: tt(
      "Today: the core audience is 34 and older; users in their twenties are badly under-represented, which leaves a large growth gap.",
      "现状：主力用户为 34 岁以上，二十年代用户数量缺失严重，导致增长缺口很大"
    ),
    sticker: `${ART}/sticker-cloud.png`,
  },
  hmw: {
    label: "How might we…",
    text: tt("How might we make weather interesting and useful to young people again?", "我们如何让天气重新对年轻人变得有趣、有用？"),
    sticker: `${ART}/sticker-cat.png`,
  },
}

// --- 04 · Research --------------------------------------------------------------

const research = {
  id: "research",
  nav: tt("Research", "用户研究"),
  no: "04",
  eyebrow: tt("Research", "Research"),
  title: tt("User research", "用户研究"),
  kind: "research",
  metrics: [
    { value: "108", label: tt("valid survey responses", "份有效问卷"), note: tt("Including open-ended questions", "含开放式问题"), tone: "blue" },
    { value: "20", label: tt("in-depth interviews", "场深度访谈"), note: tt("Ages 6–25 · children, teenagers, young adults", "6–25 岁 · 儿童、青少年、年轻成人"), tone: "yellow" },
    { value: "953", label: tt("social media poll votes", "人社交媒体投票"), note: tt("“What do you use on your phone to check the weather?”", "「你在手机上用什么看天气？」"), tone: "dark" },
  ],
  why: {
    tag: tt("# Quantitative", "# 定量调研"),
    title: tt("Why do you check the weather?", "为什么看天气？"),
    sub: tt("Multiple choice · 108 responses", "多选 · 108 份问卷"),
    bars: [
      { label: tt("Decide what to wear", "决定穿搭"), pct: 75, tone: "yellow" },
      { label: tt("Plan outdoor activities", "安排户外活动"), pct: 63 },
      { label: tt("Plan a trip", "出行规划"), pct: 49 },
      { label: tt("Prepare for severe weather", "应对极端天气"), pct: 33 },
    ],
    note: tt(
      "The weather data itself doesn't matter; what matters is the motive behind the act of “checking the weather”.",
      "天气数据本身不重要，重要的是“看天气数据”这个动作背后的动机"
    ),
  },
  what: {
    tag: tt("# Social poll", "# 社交投票"),
    title: tt("What do you check it with?", "用什么看天气？"),
    big: "60%",
    segments: [
      { label: tt("Stock weather app 60%", "手机自带天气 60%"), pct: 60, tone: "blue" },
      { label: tt("Third-party app 38%", "第三方 App 38%"), pct: 38, tone: "yellow" },
      { label: tt("Don't check 2%", "不看 2%"), pct: 2, tone: "muted" },
    ],
    sub: tt("Of which iOS 58% / Android 42%", "其中 iOS 58% / Android 42%"),
    note: tt(
      "75% of survey respondents also use the stock weather app: the default app is the real competitor.",
      "问卷中 75% 也用手机自带天气：默认 App 才是最大的竞争对手。"
    ),
  },
  how: {
    tab: "Interview",
    title: tt("Reaching young people", "怎么接触到年轻人"),
    items: [
      { problem: tt("Ages 8–19 are hard to contact directly", "8–19 岁不好直接联系"), fix: tt("Recruited through parent groups, teachers, friends' younger siblings", "通过家长群、老师、亲友弟妹招募") },
      { problem: tt("Comprehension varies widely by age", "不同年龄认知差别大"), fix: tt("Wrote a separate interview guide for children", "为儿童单独设计访谈提纲") },
      { problem: tt("Participants get shy easily", "受访者容易害羞"), fix: tt("Opened with warm-up questions to get them talking", "先用暖场问题打开话匣子") },
    ],
    note: tt("Participants: 45% female · 55% male", "受访者：女 45% · 男 55%"),
  },
}

// --- 05 · Insights --------------------------------------------------------------

const insights = {
  id: "insights",
  nav: tt("Insights", "用户洞察"),
  no: "05",
  eyebrow: tt("Insights", "Insights"),
  title: tt("User insights", "用户洞察"),
  kind: "insights",
  cards: [
    {
      tab: "Insight 01",
      sticker: `${V3}/sticker-sun.png`,
      title: tt("Weather = a decision before leaving the house", "天气 = 出门前的决策"),
      text: tt(
        "What people really want to know is “what do I wear, do I need an umbrella”. 75% of respondents check the weather to decide what to wear.",
        "人们真正想知道的是「今天穿什么、要不要带伞」。75% 的受访者看天气是为了决定穿搭。"
      ),
      quote: tt("“Every morning before I leave, I look at what I should wear, whether it'll rain and when it stops.”", "「每天早上出门前，看看该穿什么，会不会下雨、什么时候停。」"),
      by: tt("— age 15 · open-ended answer", "— 15 岁 · 开放题"),
      tone: "pale",
    },
    {
      tab: "Insight 02",
      sticker: `${ART}/sticker-cat.png`,
      title: tt("They want the next step, not the number", "要的是下一步，不是数字"),
      text: tt(
        "Today's apps only hand over data and leave users to work out the next step in their heads; what matters is not the number but what comes after it.",
        "现有 App 只给数据，用户自己在脑海中换算成下一步行动；重要的不是数字，而是数字后的下一步。"
      ),
      quote: tt("“I looked today because I might need an umbrella.”", "「今天看了一眼，因为可能需要带伞。」"),
      by: tt("— age 16 · open-ended answer", "— 16 岁 · 开放题"),
      tone: "yellow",
    },
    {
      tab: "Insight 03",
      sticker: `${ART}/sticker-cloud.png`,
      title: tt("Good enough, so no switch", "够用，就不换"),
      text: tt(
        "Most people are basically satisfied with the stock weather app and can't be bothered to switch even when it isn't accurate. What's missing isn't more features but a reason to open a new app.",
        "大多数人对手机自带天气基本满意，就算不够准也懒得换。缺的不是更多功能，而是打开一个新 App 的理由。"
      ),
      quote: tt("“The app on my phone isn't very accurate, but it's enough for me.”", "「我手机上的 App 不太准，但对我来说够了。」"),
      by: tt("— age 19 · female · in-depth interview", "— 19 岁 · 女 · 深度访谈"),
      tone: "pale",
    },
  ],
  pains: {
    title: tt("Five recurring pain points", "5 个高频痛点"),
    items: [
      { text: tt("Inaccurate forecasts", "预报不准"), tone: "card" },
      { text: tt("Switching apps is a hassle", "换 App 门槛高"), tone: "card" },
      { text: tt("No personalised advice", "缺少个性化建议"), tone: "yellow" },
      { text: tt("No pollen / air quality data", "缺少花粉 / 空气质量数据"), tone: "yellow" },
      { text: tt("No alerts for sudden changes", "缺少突变天气提醒"), tone: "dark" },
    ],
  },
  opportunity: {
    label: "Design Opportunity",
    text: tt("Translate the weather into “what do I wear today”, and say it with some warmth", "把天气翻译成「今天怎么穿」，并用有温度的方式说出来"),
    sticker: `${ART}/sticker-golden.png`,
  },
}

// --- 06 · Competitors -----------------------------------------------------------

const competitors = {
  id: "competitors",
  nav: tt("Competitors", "竞品分析"),
  no: "06",
  eyebrow: tt("Competitors", "Competitors"),
  title: tt("Competitive analysis", "竞品分析"),
  lead: tt(
    "Representative products picked from Sensor Tower's German rankings (2024.09), plus representative products from other markets, compared across 17 features. The table below is an extract.",
    "基于 Sensor Tower 德国区排名（2024.09）选出代表性产品，同时挑选其他地区市场代表性产品，横向对比 17 项功能。下表为节选。"
  ),
  kind: "competitors",
  columns: [
    { name: "wetter.com", region: tt("Germany", "德国"), icon: `${V3}/icon-wettercom.png`, highlight: true },
    { name: "WeatherPro", region: tt("Germany", "德国"), icon: `${V3}/icon-weatherpro.png` },
    { name: "Weather Ch.", region: tt("USA", "美国"), icon: `${V3}/icon-weatherchannel.png` },
    { name: "AccuWeather", region: tt("USA", "美国"), icon: `${V3}/icon-accuweather.png` },
    { name: "Not Boring", region: tt("USA", "美国"), icon: `${V3}/icon-notboring.png` },
    { name: tt("Caiyun", "彩云天气"), region: tt("China", "中国"), icon: `${V3}/icon-caiyun.png` },
    { name: tt("Moji", "墨迹天气"), region: tt("China", "中国"), icon: `${V3}/icon-moji.png` },
  ],
  rows: [
    {
      label: tt("Forecast range", "预报天数"),
      cells: [tt("16 days", "16天"), tt("14 days", "14天"), tt("15 days", "15天"), tt("15 days", "15天"), tt("14 days", "14天"), tt("15 days", "15天"), tt("15 days", "15天")],
    },
    { label: tt("Personalised preferences", "个性化偏好"), cells: [false, false, true, true, false, true, false] },
    { label: tt("Custom interface styles", "界面风格自定义"), cells: [false, false, false, false, true, false, false] },
    { label: tt("Outfit advice", "穿衣建议"), cells: [false, false, false, false, false, true, true] },
    { label: tt("Activity suggestions", "活动关联"), cells: [true, false, true, false, false, true, false] },
    { label: tt("Social features", "社交功能"), cells: [false, false, false, false, false, false, true] },
    { label: tt("AI capability", "AI 能力"), cells: [false, false, false, false, false, tt("Chat", "对话"), tt("Cloud ID", "识云")] },
  ],
  summary: {
    title: tt("Summary", "竞品总结"),
    // `**…**` marks the words the deck set in blue.
    text: tt(
      "The basics (forecast range, radar, widgets) are completely commoditised; **outfit advice, social features and AI** only appear in Chinese products, and wetter.com is **missing all of them**; Not Boring Weather proves that a **stylised experience** on its own can attract young users.",
      "基础功能（预报天数、雷达、小组件）高度同质化；**穿衣建议、社交、AI** 只出现在国内产品中，wetter.com 在这几项上**全部空缺**；Not Boring Weather 证明了**风格化体验**本身就能吸引年轻人。"
    ),
  },
}

// --- 07 · Ideation --------------------------------------------------------------

const ideation = {
  id: "ideation",
  nav: tt("Ideation", "创意发散"),
  no: "07",
  eyebrow: tt("Ideation", "Ideation"),
  title: tt("Diverging on directions", "创意方向发散"),
  kind: "ideation",
  rounds: [
    {
      tag: "Round 01",
      tone: "pale",
      hmw: tt("HMW: how do we attract young people to a weather platform?", "HMW：如何吸引年轻人使用天气平台？"),
      clusterLabel: tt("AI clustered them into 5 groups", "AI 聚类成 5 类"),
      clusters: [
        tt("Personalisation & AI", "个性化与 AI"),
        tt("Devices & IoT", "设备与 IoT"),
        tt("Notifications", "通知提醒"),
        tt("Fun interactive experiences", "有趣的交互体验"),
        tt("Actionable weather insight", "可行动的天气洞察"),
      ],
      votedLabel: tt("Top three ideas by vote", "投票最高的 3 个想法"),
      voted: [
        tt("Outdoor activity assistant: plan sport and travel around the weather", "户外活动助手：按天气规划运动与出行"),
        tt("Weather-based activity and outfit recommendations", "基于天气的活动与穿搭推荐"),
        tt("Fun interaction, not boring data", "有趣的交互，而不是枯燥的数据"),
      ],
    },
    {
      tag: "Round 02",
      tone: "dark",
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
      closing: tt("→ These eventually settled into “share your weather story in one tap”", "→ 这些想法最终沉淀为「一键分享天气故事」"),
    },
  ],
  featuresTitle: tt("Three directions", "3 个方向"),
  features: [
    {
      no: "Feature 01",
      art: `${ART}/feat-1.png`,
      tone: "blue",
      title: tt("Personal outfit assistant", "个人穿搭助手"),
      text: tt("Outfit advice from live weather and how it actually feels, so you know what to wear to be comfortable today.", "根据实时天气与体感给出穿搭建议，告诉你今天穿什么才舒服。"),
    },
    {
      no: "Feature 02",
      art: `${ART}/feat-2.png`,
      tone: "yellow",
      title: tt("Weather mascot", "天气吉祥物"),
      text: tt("Create your own character; it dresses for the weather and reports it in a playful, interactive way.", "创建专属形象，它会随天气换装，用有趣、互动的方式播报天气。"),
    },
    {
      no: "Feature 03",
      art: `${ART}/feat-3.png`,
      tone: "pale",
      title: tt("Social sharing", "社交分享"),
      text: tt("Generate a weather story featuring your mascot's new look and share it to an Instagram story in one tap.", "一键生成带吉祥物新造型的天气故事，分享到 Instagram 快拍。"),
    },
  ],
}

// --- 08 · Business ideas --------------------------------------------------------

const business = {
  id: "business",
  nav: tt("Business ideas", "商业探讨"),
  no: "08",
  eyebrow: tt("Business Ideas", "Business Ideas"),
  title: tt("Early business thinking", "初期的商业探讨"),
  kind: "business",
  why: {
    pill: tt("Why do this", "为什么要做"),
    title: tt("The current ad model is wearing users down", "现有的广告模式在消耗用户"),
    text: tt(
      "wetter.com's revenue depends heavily on advertising (about 87%), but the ads are jarring: opening the app lands you in a full-screen ad that can't be closed for 3 seconds, and tapping into a feature page triggers another. The ads keep the product alive and drive users away at the same time. We wanted a way to monetise that doesn't intrude, and that users might even want to look at.",
      "wetter.com 的营收高度依赖广告（约 87%），但广告形式非常突兀：打开 App 先进全屏广告，3 秒后才能关闭；点进某个功能页时又会再弹一次。广告在养活产品的同时，也在赶走用户。我们想找到一种不打扰、甚至让用户愿意看的变现方式。"
    ),
    stats: [
      { value: "87%", label: tt("Of revenue from ads", "营收来自广告"), tone: "blue" },
      { value: "3s", label: tt("Forced wait on the splash ad", "开屏广告强制等待"), tone: "yellow" },
    ],
  },
  plans: [
    {
      tag: tt("Plan A", "方案 A"),
      tone: "card",
      title: tt("Brand outfit partnerships: ads worn on the body", "品牌合作换装：广告穿在身上"),
      text: tt(
        "Partner with clothing brands so the character wears real in-season pieces, with a brand tag hanging beside the clothes; tapping it jumps to the brand's page to buy. Advertising goes from “interrupting the content” to “being the content”, a direct answer to wetter.com's heavy dependence on ad revenue.",
        "与服装品牌合作，形象身上穿的是真实的当季单品，衣服旁挂品牌吊牌，点击即跳转到品牌页面购买。广告从「打扰内容」变成「内容本身」，直接回应 wetter.com 营收高度依赖广告的现状。"
      ),
      kv: [
        { k: tt("Revenue source", "收入来源"), v: tt("Brand placements + affiliate commission", "品牌投放 + 导购分成") },
        { k: tt("How it feels to users", "用户感受"), v: tt("Outfit advice that happens to inspire a purchase, without interrupting the weather", "穿搭建议顺带种草，不打扰看天气") },
      ],
      status: tt(
        "Status: stayed at the concept stage, no brands were actually approached; dropped together with the 1.0 human avatar when it became a pet mascot.",
        "状态：停留在概念阶段，未与品牌实际接洽；随 1.0 真人形象改为宠物吉祥物一同放弃。"
      ),
      phones: [`${V3}/biz-brand.png`],
    },
    {
      tag: tt("Plan B", "方案 B"),
      tone: "blue",
      title: tt("IP partnerships: pay to unlock famous characters", "IP 形象合作：付费解锁知名角色"),
      text: tt(
        "Partner with well-known people and cartoon IP (NBA stars, Harry Potter, Mario) so users can pay to have those characters report the weather. “Picking a character” becomes the paid moment, and the IP's fans bring in new users.",
        "与知名人物和卡通 IP 合作（如 NBA 球星、哈利波特、马里奥），用户付费即可用他们的形象来播报天气。把「选形象」变成付费点，也借 IP 的粉丝带来新用户。"
      ),
      kv: [
        { k: tt("Revenue source", "收入来源"), v: tt("Paid character unlocks + IP revenue share", "形象付费解锁 + IP 分成") },
        { k: tt("How it feels to users", "用户感受"), v: tt("Checking the weather with a character you love feels more like yours", "用喜欢的角色看天气，更有归属感") },
      ],
      status: tt(
        "Status: many testers wanted Harry Potter, which validated the pull of IP; listed as the next step in the final report, later shelved over licensing costs.",
        "状态：测试中很多人想选哈利·波特，验证了 IP 吸引力；终期汇报列为下一步，后因授权成本未推进。"
      ),
      phones: [`${V3}/biz-ip-1.png`, `${V3}/biz-ip-3.png`, `${V3}/biz-ip-2.png`],
    },
  ],
}

// --- 09 · Iteration -------------------------------------------------------------

const iteration = {
  id: "iteration",
  nav: tt("Iteration", "设计迭代"),
  no: "09",
  eyebrow: tt("Iteration", "Iteration"),
  title: tt("Design iteration 1.0 → 2.0", "设计迭代 1.0 → 2.0"),
  kind: "iteration",
  panels: [
    {
      tag: tt("BEFORE · Design 1.0 human avatar", "BEFORE · Design 1.0 真人形象"),
      tone: "grey",
      shots: [
        { src: `${ART}/d1-avatar.png`, caption: tt("Pick an avatar", "选择形象") },
        { src: `${ART}/d1-outfit.png`, caption: tt("Outfit onboarding", "穿搭引导") },
        { src: `${ART}/d1-home.png`, caption: tt("Home", "首页") },
      ],
    },
    {
      tag: tt("AFTER · Design 2.0 pet mascot", "AFTER · Design 2.0 宠物吉祥物"),
      tone: "blue",
      shots: [
        { src: `${ART}/d2-mascot.png`, caption: tt("Pick a mascot", "选择吉祥物") },
        { src: `${ART}/d2-upload.png`, caption: tt("Upload a pet photo", "上传宠物照片") },
        { src: `${ART}/d2-home.png`, caption: tt("Home", "首页"), hot: true },
      ],
    },
  ],
  changes: [
    { text: tt("Lead role: human avatar → pet (preset + AI-generated)", "主角：真人形象 → 宠物（预设 + AI 生成）"), tone: "dark" },
    { text: tt("Home: city landmark backdrop + “colder / warmer than yesterday”", "首页：城市地标背景 +「比昨天冷 / 热」"), tone: "pale" },
    { text: tt("Naming: Weather Buddy → WeatherPaws → WeatherPets", "命名：Weather Buddy → WeatherPaws → WeatherPets"), tone: "yellow" },
  ],
  sticker: `${V3}/sticker-sun.png`,
}

// --- 10 · The turn --------------------------------------------------------------

const turn = {
  id: "the-turn",
  nav: tt("The turn", "关键转折"),
  no: "10",
  eyebrow: tt("The Turn", "The Turn"),
  title: tt("Why “it”, in the end", "为什么是“它”"),
  kind: "turn",
  timeline: [
    {
      step: tt("Starting point · Design 1.0", "起点 · Design 1.0"),
      text: tt(
        "The user picks a human avatar and watches them dress for the weather; wetter's ads could also be woven seamlessly into the clothing, a new kind of advertising.",
        "用户挑选一个真人虚拟形象，看 TA 根据天气换装，同时还能将wetter的广告完美融入服装中，创建新的广告方式。"
      ),
    },
    {
      step: tt("Discovery", "发现"),
      text: tt(
        "Interviews and everyday observation showed how many people in Germany keep pets; the moment pets came up, participants visibly leaned in, and even those without pets loved animals.",
        "访谈和日常观察中发现，德国很多人养宠物；一聊到宠物，受访者明显更投入；即便没有宠物的受访者也非常喜爱动物。"
      ),
    },
    {
      step: tt("Early feedback", "早期反馈"),
      text: tt(
        "The pet mascot got a huge reaction in testing: one tester's grandmother changed her social media avatar to the AI-generated pet on the spot.",
        "测试中宠物吉祥物反响热烈：一位测试者的奶奶当场就把社交媒体头像换成了 AI 生成的萌宠。"
      ),
    },
    {
      step: tt("Decision", "决策"),
      text: tt(
        "Let users upload a photo of their own pet and have AI generate their weather pet. The emotional connection goes from “a weather reporter” to “my weather pet”.",
        "让用户上传自家宠物照片，AI 生成专属天气宠物。情感连接从「一个天气预报员」变成「我的天气萌宠」。"
      ),
      hot: true,
    },
  ],
  pairs: {
    title: tt("Real pet → AI weather pet", "真实宠物 → AI 天气宠物"),
    pill: tt("Real examples from user testing", "用户测试真实样例"),
    items: Array.from({ length: 9 }, (_, i) => ({
      real: `${V3}/pet-${i + 1}-real.png`,
      ai: `${V3}/pet-${i + 1}-ai.png`,
    })),
    altReal: tt("A user's real pet", "用户的真实宠物"),
    altAi: tt("The AI-generated weather pet", "AI 生成的天气宠物"),
  },
}

// --- 11 · AI mascot -------------------------------------------------------------

const aiMascot = {
  id: "ai-mascot",
  nav: tt("AI mascot", "AI 生成"),
  no: "11",
  eyebrow: tt("AI Mascot", "AI Mascot"),
  title: tt("Turning your pet into a weather reporter", "把宠物变成天气播报员"),
  kind: "aimascot",
  shots: [
    { src: `${ART}/gen-upload.png`, caption: tt("01  Upload a photo · shooting guidance", "01  上传照片 · 拍摄指引") },
    { src: `${ART}/gen-create.png`, caption: tt("02  New mascot · generations left", "02  新建吉祥物 · 剩余次数") },
    { src: `${ART}/gen-result.png`, caption: tt("03  Result · your weather pet", "03  生成结果 · 天气萌宠"), hot: true },
  ],
  decisions: [
    { title: tt("Guidance up front", "拍摄指引前置"), text: tt("Good and bad examples for light, a front-facing pose and a single pet", "正反例说明光线、正脸、单只宠物"), tone: "blue" },
    { title: tt("Failure is recoverable", "失败可恢复"), text: tt("Explain why, and offer a path to retry", "说明原因，并给出重试路径"), tone: "dark" },
    { title: tt("Cost stays in hand", "成本可控"), text: tt("A monthly generation limit + preset pets as fallback", "每月限次 + 预设宠物兜底"), tone: "yellow" },
  ],
  pipeline: {
    title: tt("The AI generation pipeline", "AI 生成链路"),
    nodes: [tt("Upload a photo", "上传照片"), tt("Vision identifies the breed", "Vision 识别品种"), tt("DALL·E 3 generates the pet", "DALL·E 3 生成宠物"), tt("Sun / rain / cold outfits", "晴/雨/冷 多套穿搭")],
    note: tt("Also evaluated: Image2Image · Inpainting · SAM2 · Midjourney", "也评估过：Image2Image · Inpainting · SAM2 · Midjourney"),
  },
  edges: {
    title: tt("Error states", "异常状态"),
    shots: [
      { src: `${ART}/err-upload.png`, caption: tt("Upload failed", "上传失败") },
      { src: `${ART}/err-generate.png`, caption: tt("Generation failed", "生成失败") },
      { src: `${ART}/err-quota.png`, caption: tt("Out of generations", "次数用完") },
    ],
  },
  sticker: `${ART}/sticker-cloud.png`,
}

// --- 12 · Home page -------------------------------------------------------------

const home = {
  id: "home-page",
  nav: tt("Home page", "首页体验"),
  no: "12",
  eyebrow: tt("Home Page", "Home Page"),
  title: tt("Open the app and know what to wear at a glance", "打开 App，一眼知道今天怎么穿"),
  lead: tt(
    "The home screen translates “weather data” into “advice”, making the pet part of the information rather than decoration.",
    "首页把「天气数据」翻译成「行动建议」，让宠物成为信息本身，而不只是装饰。"
  ),
  kind: "home",
  shot: `${V3}/home-phone.png`,
  sticker: `${V3}/sticker-sun.png`,
  left: [
    { no: "01", title: tt("A one-line conclusion", "一句话结论"), tag: tt("Added and validated in testing", "测试中加入并验证"), text: tt("“Colder / warmer than yesterday”: yesterday's feel as the reference point for deciding what to wear today.", "「比昨天冷 / 热」：用昨天的体感作参照，判断今天怎么穿。") },
    { no: "02", title: tt("City landmark backdrop", "城市地标背景"), text: tt("Silhouettes of Munich and other cities give a sense of place and make switching cities more obvious.", "慕尼黑等城市剪影，带来归属感，也让切换城市更直观。") },
    { no: "03", title: tt("Hourly forecast strip", "逐小时预报条"), text: tt("The efficiency of an ordinary weather app is preserved; the information isn't drowned by decoration.", "保留天气 App 的基础效率，信息不被装饰淹没。") },
  ],
  right: [
    { no: "04", title: tt("The pet dresses for the weather", "宠物随天气换装"), text: tt("Sunglasses in the sun, a raincoat in the rain, a scarf in the cold; tapping or dragging the pet triggers a small animation.", "晴天墨镜、雨天雨衣、冷天围巾；点击或拖动宠物还会触发小动画。") },
    { no: "05", title: tt("Share in one tap", "一键分享"), text: tt("Generate a weather story with the pet's new look and share it to Instagram.", "生成带宠物新造型的天气快拍，分享到 Instagram。") },
  ],
  outfits: {
    title: tt("One pet, a different outfit for every kind of weather", "同一只宠物，不同天气不同穿搭"),
    images: [
      { src: `${V3}/kitty-1.png`, alt: tt("Cat mascot in a knitted hat and scarf", "戴毛线帽围围巾的猫咪吉祥物") },
      { src: `${V3}/kitty-2.png`, alt: tt("Cat mascot with an umbrella", "拿伞的猫咪吉祥物") },
      { src: `${V3}/kitty-3.png`, alt: tt("Cat mascot in a trench coat", "穿风衣的猫咪吉祥物") },
      { src: `${V3}/kitty-4.png`, alt: tt("Cat mascot in sunglasses", "戴墨镜的猫咪吉祥物") },
    ],
  },
}

// --- 13 · Testing ---------------------------------------------------------------

const testing = {
  id: "testing",
  nav: tt("Testing", "用户测试"),
  no: "13",
  eyebrow: tt("Testing", "Testing"),
  title: tt("User testing", "用户测试"),
  kind: "testing",
  summary: {
    value: "23",
    label: tt("in-person test sessions", "场线下测试"),
    sub: tt("2024.11 · Munich · clickable Figma prototype", "2024.11 · 慕尼黑 · Figma 可点击原型"),
    goalsLabel: tt("Test goals", "测试目标"),
    goals: [
      tt("Interface design", "界面设计"),
      tt("Weather features", "天气功能"),
      tt("Mascot likeability", "吉祥物好感度"),
      tt("Photo-to-mascot generation", "照片生成吉祥物"),
      tt("Sharing", "分享功能"),
      tt("App name and brand", "App 名称与品牌"),
    ],
  },
  rounds: [
    {
      tab: tt("11.06 · 3 people", "11.06 · 3 人"),
      tone: "pale",
      title: tt("First hands-on", "第一次上手"),
      sub: tt("Clickable Figma prototype · pet mascot home screen", "Figma 可点击原型 · 宠物吉祥物首页"),
      findingsLabel: tt("Findings", "发现"),
      findings: [
        tt("No “°” next to the temperature, so it was read as a date", "温度旁没有「°」，被当成了日期"),
        tt("No hourly forecast; users asked for one unprompted", "没有逐小时预报，用户主动提出"),
        tt("The speech bubble was too long; nobody wanted to read it", "气泡文字太长，没人想读"),
        tt("Nobody tapped the city name to switch cities", "不会主动点击城市名切换城市"),
      ],
      changeLabel: tt("Changed in the next version", "下一版就改"),
      changes: [tt("→ Add the “°”", "→ 加上「°」"), tt("→ Add an hourly forecast strip", "→ 加入逐小时预报条"), tt("→ Trim the bubble copy", "→ 精简气泡文案")],
    },
    {
      tab: tt("11.07 · 12 people", "11.07 · 12 人"),
      tone: "dark",
      title: tt("Test, change, repeat: 3 versions in a day", "边测边改，一天 3 版"),
      sub: tt("A new prototype after every few people, re-tested the same day", "每测几个人就改一版原型，当天再验证"),
      versions: [
        { v: "V1", text: tt("AI summary copy", "AI 总结文案") },
        { v: "V2", text: tt("+ ° + hourly + colder than yesterday", "+ ° + 逐小时 + 比昨天冷") },
        { v: "V3", text: tt("Open-ended exploration", "开放式探索") },
      ],
      quote: {
        title: tt("“Colder than yesterday” was the favourite", "「比昨天冷」最受欢迎"),
        text: tt("“A few days ago I misread the weather and didn't wear enough; this would help me judge better.”", "「前几天我看错了天气，外套穿少了，这个功能能帮我判断得更好。」"),
        by: tt("age 20 · female", "20 岁 · 女"),
      },
      finding: tt("Dogs were the most popular mascot; people were most excited seeing their own pet generated", "狗是最受欢迎的吉祥物，看到自家宠物被生成时最兴奋"),
    },
    {
      tab: tt("11.12 · 3 people", "11.12 · 3 人"),
      tone: "yellow",
      title: tt("Across ages, and the store page", "跨年龄与商店页"),
      sub: tt("Added a 10-year-old and a 7-year-old, and tested the Google Play page", "加入 10 岁、7 岁儿童，并测试 Google Play 页面"),
      findingsLabel: tt("Findings", "发现"),
      findings: [
        tt("Children cared far more about the character and animation than the weather data, and wanted the pet to move and gesture", "孩子对形象和动画的兴趣远大于天气数据，希望宠物能动、会做手势"),
        tt("A 24-year-old found the character too childish and was happier with the stock weather app", "24 岁用户觉得形象偏低龄，更满足于手机自带天气"),
      ],
      quote: {
        title: tt("Unexpected win: every age group liked it", "意外收获：各年龄段都喜欢"),
        text: tt("“Now my mum sends me screenshots of the kitty every day.”", "「现在我妈每天都给我发 kitty 的截图。」"),
        by: tt("age 40 · male", "40 岁 · 男"),
      },
      changeLabel: tt("Next iteration", "下一版迭代"),
      changes: [tt("→ Tapping and dragging the pet triggers small animations", "→ 点击、拖动宠物触发小动画")],
      sticker: `${ART}/sticker-golden.png`,
    },
  ],
}

// --- 14 · Dev handoff -----------------------------------------------------------

const handoff = {
  id: "dev-handoff",
  nav: tt("Dev handoff", "设计到开发"),
  no: "14",
  eyebrow: tt("Dev Handoff", "Dev Handoff"),
  title: tt("From design to development", "设计到开发"),
  kind: "handoff",
  architecture: {
    title: tt("Technical architecture", "技术架构"),
    app: { title: "React Native App", sub: tt("iOS · Android · Web", "iOS · Android · Web") },
    backend: { title: tt("FastAPI backend", "FastAPI 后端"), sub: tt("Computes “colder / warmer than yesterday”, generates outfit advice", "计算「比昨天冷 / 热」生成穿搭建议") },
    sides: [
      { title: "Meteonomiqs API", sub: tt("Live weather + 7-day forecast", "实时天气 + 7 天预报") },
      { title: tt("AI generation service", "AI 生成服务"), sub: tt("Vision identifies the breed, DALL·E 3 generates the pet", "Vision 识别品种 DALL·E 3 生成宠物") },
    ],
    note: tt("Containerised deploys on Coolify · master is production · technical docs kept in mdbook", "Coolify 容器化部署 · master 分支即生产环境 · 技术文档用 mdbook 维护"),
  },
  mvp: {
    pill: tt("MVP scope trade-off", "MVP 范围取舍"),
    big: "3 × 5",
    text: tt(
      "The first version shipped only 3 outfits × 5 weather types, with playful copy adding a sense of variety: the cheapest way to test whether dressing up is genuinely appealing.",
      "第一版只做 3 套穿搭 × 5 种天气，再用趣味文案增加变化感：用最小成本验证「换装」是否真的有吸引力。"
    ),
    weather: [tt("☀ Sun", "☀ 晴"), tt("⛅ Cloudy", "⛅ 多云"), tt("🌧 Rain", "🌧 雨"), tt("🌤 Sun to cloud", "🌤 晴转多云"), tt("❄ Snow", "❄ 雪")],
  },
  system: {
    tab: "Design System",
    sub: tt("One set of components serving both the design file and the code, so less is lost in translation.", "一套组件同时服务设计稿和代码，减少还原误差。"),
    pills: [
      tt("Buttons · primary / secondary / tertiary", "按钮 · 主/次/三级"),
      tt("Weather widgets · light / dark", "天气小组件 · 亮/暗"),
      tt("3D weather icons × 26", "3D 天气图标 × 26"),
      tt("Mascot outfits and animation", "吉祥物换装与动画"),
      tt("Status bar · menu · search", "状态栏 · 菜单 · 搜索"),
      tt("Dialog · share sheet", "对话框 · 分享面板"),
    ],
    images: [
      { src: `${V3}/ds-kitty.png`, alt: tt("Cat mascot in a beret and sunglasses", "戴贝雷帽和墨镜的猫咪吉祥物") },
      { src: `${V3}/ds-fox.png`, alt: tt("Fox mascot in a yellow hoodie", "穿黄色连帽衫的狐狸吉祥物") },
      { src: `${V3}/ds-panda.png`, alt: tt("Panda mascot in sunglasses", "戴墨镜的熊猫吉祥物") },
      { src: `${V3}/ds-goose.png`, alt: tt("Goose mascot in a pink scarf", "围粉色围巾的鹅吉祥物") },
    ],
    engTitle: tt("My engineering contribution", "我的工程参与"),
    eng: [
      tt("Built part of the screens and interactions in React Native", "用 React Native 实现部分页面与交互"),
      tt("Kept design components and code components one to one", "设计组件与代码组件一一对应"),
      tt("Took part in on-device debugging and Android builds", "参与真机调试与 Android 构建"),
    ],
  },
}

// --- 15 · Launch ----------------------------------------------------------------

const launch = {
  id: "launch",
  nav: tt("Launch", "上线之后"),
  no: "15",
  eyebrow: tt("Launch", "Launch"),
  title: tt("After launch", "上线之后"),
  lead: tt(
    "Listed March 2025, delisted January 2026 (wetter.com was sold to the Funke media group around the same time). Install figures from AppBrain's public pages.",
    "2025 年 3 月上架，2026 年 1 月下架（同期 wetter.com 被出售给 Funke 媒体集团）。安装数据来自 AppBrain 公开页面。"
  ),
  kind: "launch",
  chart: {
    title: tt("Cumulative installs", "累计安装量"),
    big: "5,600+",
    sub: tt("Monthly approximations read off the AppBrain curve", "按 AppBrain 曲线读取的月度约数"),
    max: 6000,
    ticks: [0, 2000, 4000, 6000],
    points: [0, 60, 100, 150, 220, 780, 980, 3100, 4300, 5200, 5600],
    months: [tt("Mar", "3月"), tt("Apr", "4月"), tt("May", "5月"), tt("Jun", "6月"), tt("Jul", "7月"), tt("Aug", "8月"), tt("Sep", "9月"), tt("Oct", "10月"), tt("Nov", "11月"), tt("Dec", "12月"), tt("Jan", "1月")],
    markers: [
      { at: 6, tone: "card", place: "above", label: tt("22 Sep · past 1,000", "9.22 破 1,000") },
      { at: 9, tone: "yellow", place: "above", label: tt("1 Dec · past 5,000", "12.1 破 5,000") },
      { at: 10, tone: "blue", place: "below", label: tt("26 Jan · delisted", "1.26 下架") },
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
      { stars: 2, text: tt("Nice idea, but the AI often fails to generate, and even when it works the picture won't upload; there's too little to choose from and locations outside Europe are hard to find.", "想法很好，但 AI 经常生成失败，就算生成成功了，图片也传不上去；可选的东西太少，欧洲以外的地点也很难定位。") },
      { stars: 2, text: tt("The weather isn't accurate; the app freezes when picking a pet, and there's no way to customise.", "天气不准；选宠物的时候 App 会卡住，也没法自定义。") },
    ],
  },
  retro: {
    title: tt("My retrospective", "我的复盘"),
    text: tt(
      "The bad reviews cluster around AI generation and upload failures, freezing while picking a pet, and locations outside Europe: the fallbacks that were designed needed engineering to actually deliver them. Acquisition worked; stability of the experience held it back.",
      "差评集中在 AI 生成与上传失败、选择宠物卡住、海外定位：设计的兜底需要工程真正兑现。获客有效，体验稳定性拖了后腿。"
    ),
    sticker: `${ART}/sticker-cat.png`,
  },
}

// --- 16 · Reflection ------------------------------------------------------------

const reflection = {
  id: "reflection",
  nav: tt("Reflection", "成果反思"),
  no: "16",
  eyebrow: tt("Reflection", "Reflection"),
  title: tt("Outcome and reflection", "成果与反思"),
  kind: "reflection",
  store: {
    pill: tt("Live on Google Play", "Google Play 上架"),
    icon: `${ART}/app-icon.png`,
    name: "Weather Pets: Dose of Joy",
    publisher: "wetter.com GmbH",
    stats: [
      { value: "5,600+", label: tt("Cumulative installs", "累计安装") },
      { value: "10", label: tt("Months live", "在架月数") },
      { value: "1.0.0", label: tt("Version", "版本") },
    ],
    pills: [tt("Free", "免费"), tt("No in-app purchases", "无内购"), tt("Family friendly", "适合全家")],
    tagline: tt("Store description: Weather forecast + your pet = the cutest weather update! Generate your own AI mascot.", "商店简介：天气预报 + 你的宠物 = 最可爱的天气更新！生成你自己的 AI 吉祥物。"),
    source: tt("Sources: APKPure and AppBrain public pages", "来源：APKPure、AppBrain 公开页面"),
  },
  marketing: {
    title: tt("Marketing assets", "营销物料"),
    sub: tt("2 posters · Wix website · Google Ads in three sizes", "海报 2 版 · Wix 官网 · Google Ads 三种尺寸"),
    banner: `${V3}/ads-banner.png`,
    bannerAlt: tt("Google Ads landscape banner", "Google Ads 横版广告"),
    squares: [
      { src: `${V3}/ads-square-1.png`, alt: tt("Google Ads square banner, goose mascot", "Google Ads 方图，鹅吉祥物") },
      { src: `${V3}/ads-square-2.png`, alt: tt("Google Ads square banner, dog mascot", "Google Ads 方图，狗狗吉祥物") },
    ],
    audiences: [
      { tag: tt("Has a pet", "有宠物"), tone: "yellow", text: tt("Let your pet report the weather", "让宠物播报天气") },
      { tag: tt("No pet", "没宠物"), tone: "blue", text: tt("Adopt a digital pet", "领养数字宠物") },
    ],
  },
  takeaways: {
    tab: "Takeaways",
    items: [
      { no: "01", title: tt("Emotional value is a feature", "情绪价值也是功能"), text: tt("Young people aren't short of weather data; they're short of a reason to open the app. The pet turned “checking the weather” into “seeing what it's wearing today”.", "年轻人不缺天气数据，缺的是打开 App 的理由。宠物把「看天气」变成了「看看它今天穿什么」。") },
      { no: "02", title: tt("Take the small signals in testing seriously", "测试里的小信号，要当真"), text: tt("Already in testing someone said “the character is a bit childish, the stock app is enough”, which foreshadowed the weak retention after launch.", "测试时就有人说「形象偏低龄，自带的够用了」，这正是上线后留存不足的伏笔。") },
      { no: "03", title: tt("Even the name deserves validation", "小到名字也要验证"), text: tt("WeatherPaws → WeatherPets: however small the detail, it's worth putting in front of users.", "WeatherPaws → WeatherPets：再小的细节，也值得交给用户检验。") },
      { no: "04", title: tt("Design the failure in AI experiences, then make sure it ships", "AI 体验要设计「失败」，更要兑现"), text: tt("I'd define acceptance criteria for AI reliability with engineering far earlier, and put failure rate into testing.", "我会更早和工程一起定义 AI 可用性的验收标准，并把失败率纳入测试。") },
    ],
  },
  stickers: [`${ART}/sticker-golden.png`, `${V3}/sticker-sun.png`],
}

// The section eyebrow is the slide's number and chapter name — "02 · Overview" —
// which has to stay a wrapped string so it still switches language.
const localizedEyebrow = (slide) => ({
  __t: true,
  en: `${slide.no} · ${slide.eyebrow.en}`,
  zh: `${slide.no} · ${slide.eyebrow.zh}`,
})

// --- The deck, in order ---------------------------------------------------------

export const weatherPetsSlides = [
  overview,
  background,
  research,
  insights,
  competitors,
  ideation,
  business,
  iteration,
  turn,
  aiMascot,
  home,
  testing,
  handoff,
  launch,
  reflection,
]

// One section per slide. The board carries the slide's own title, so the page's
// heading stays for the chapter index and the document outline and is hidden
// from view.
export const weatherPetsSections = weatherPetsSlides.map((slide) => ({
  id: slide.id,
  eyebrow: localizedEyebrow(slide),
  label: slide.nav,
  titleHidden: true,
  blocks: [{ type: "wpdeck", slide }],
}))
