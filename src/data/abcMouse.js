// ABC Mouse (开心鼠) — Tencent's learning app for 3–8 year olds, rebuilt as page content.
//
// The source is the Figma file's 「开心鼠」 page: twelve 1920-wide boards, each one
// chapter of the case — background, issues, workflow, stakeholders, the research
// framework, the user, their behaviour, feedback, personas, pain points, one worked
// case and a gallery. The page keeps that order and, as far as a page that reflows
// can, each board's own composition. Nothing is a flattened export: every word is real
// text in both languages and every box is a real box, so the boards read on a phone.
// Artwork is exported from the same file into /public/project/abc-mouse/deck/.
//
// Each entry is one board. `kind` picks the layout in AbcMouseDeck.jsx; the rest is
// that layout's content. `title` / `sub` are the board's own two-language heading —
// 「项目背景 / Background」 on the board — which is why the page's section heading is
// hidden for these and the board draws its own.
import { tt } from "../i18n/t"

const ART = "/project/abc-mouse/deck"

// --- The page header -------------------------------------------------------

export const abcMouseRole = tt("UX · Interaction & Game Design", "UX · 交互与游戏化设计")

export const abcMouseSummary = tt(
  "ABC Mouse (开心鼠) is Tencent's online learning app for children aged 3–8, built on the American ABCmouse with a cross-border team. The work covered research, interaction and game design — one design language for both teams, so the app and its content stopped pulling apart.",
  "开心鼠（ABC Mouse）是腾讯面向 3–8 岁儿童的在线教育应用，主要有思维、英语、编程、语文等模块。"
)

export const abcMouseHero = {
  image: "/project/abc-mouse/1.png",
  headline: tt("An online learning app for children aged 3–8.", "针对 3–8 岁儿童的在线教育应用"),
  meta: [
    { label: tt("Role", "角色"), value: abcMouseRole },
    { label: tt("Scope", "范围"), value: tt("iPad app · learning games", "iPad 应用 · 学习游戏") },
    { label: tt("Team", "团队"), value: tt("Tencent × Age of Learning (US)", "腾讯 × Age of Learning（美国）") },
  ],
}

export const abcMouseTags = [
  tt("UX design", "用户体验设计"),
  tt("Interaction design", "交互设计"),
  tt("Children's design", "儿童设计"),
  tt("Game design", "游戏化设计"),
  tt("Usability testing", "可用性测试"),
]

// --- 01 · Background ----------------------------------------------------------

const background = {
  id: "background",
  nav: tt("Background", "项目背景"),
  no: "01",
  kind: "background",
  title: tt("Background", "项目背景"),
  sub: tt("项目背景", "Background"),
  before: {
    label: tt("Before", "前身"),
    image: `${ART}/logo.jpg`,
    heading: tt("Online learning for ages 2–8", "2-8岁儿童在线教育应用"),
    lines: [
      tt("Created by the American ed-tech company Age of Learning, Inc.", "由美国教育科技公司 Age of Learning, Inc. 创建"),
      tt(
        "Mainly English — covering reading and language arts, math, science, health, social studies, music and art.",
        "主要为英语，涵盖阅读和语言艺术、数学、科学、健康、社会研究、音乐和艺术"
      ),
    ],
  },
  after: {
    label: tt("Now", "现在"),
    images: [`${ART}/kid.jpg`, `${ART}/radar.jpg`],
    heading: tt("Online learning for ages 3–8", "3-8岁儿童在线教育应用"),
    lines: [
      tt("China's top-ranked online learning app (2021).", "中国在线教育排名第一的应用程序（2021）"),
      tt(
        "Brings the English in, and adds thinking, Chinese and coding content made for Chinese users.",
        "引进英语，增加适合中国用户的思维、语文和编程内容"
      ),
    ],
  },
}

// --- 02 · Existing issues -----------------------------------------------------

const issues = {
  id: "issues",
  nav: tt("Issues", "原有问题"),
  no: "02",
  kind: "issues",
  title: tt("Existing issues", "原有问题"),
  sub: tt("原有问题", "Existing issues"),
  design: {
    shots: [
      { src: `${ART}/tencent-1.jpg`, col: 0 },
      { src: `${ART}/us-1.jpg`, col: 1 },
      { src: `${ART}/tencent-2.jpg`, col: 0 },
      { src: `${ART}/us-2.jpg`, col: 1 },
    ],
    labels: [tt("Tencent team", "腾讯团队"), tt("US team", "美国团队")],
    heading: tt("Inconsistent design", "设计不一致"),
    lines: [
      tt("The overall style is not uniform", "整体风格不统一"),
      tt("The app and its content barely relate", "APP与内容关联性差"),
      tt("Cross-border collaboration: high communication cost, slow optimisation", "跨国合作：沟通成本高，优化进度慢"),
    ],
  },
  users: {
    image: `${ART}/test.jpg`,
    label: tt("Usability testing", "用户可用性测试"),
    heading: tt("Users who “don't take to it”", "用户“水土不服”"),
    lines: [
      tt("In usability testing, completion rates were low", "可用性测试中，用户完成率低下"),
      tt("and users easily got frustrated and avoidant", "且用户容易产生沮丧和逃避情绪"),
      tt("The usability test results were not ideal", "可用性测试结果不理想"),
    ],
  },
  // The goal line, with the three phrases the board underlines.
  goal: [
    { text: tt("Goal: raise the ", "目标：通过") },
    { text: tt("completion rate", "设计一致性"), u: true },
    { text: tt(" through ", "且以") },
    { text: tt("design consistency", "较低成本"), u: true },
    { text: tt(", at a ", "增强用户体验提高") },
    { text: tt("lower cost", "完成率"), u: true },
    { text: tt(".", ""), },
  ],
}

// --- 03 · Work flow -----------------------------------------------------------

const workflow = {
  id: "workflow",
  nav: tt("Work flow", "工作流程"),
  no: "03",
  kind: "workflow",
  title: tt("Work flow", "工作流程"),
  sub: tt("工作流程", "Work Flow"),
  loop: tt("Release · collect data · iterate", "更新版本  数据回收  迭代优化"),
  steps: [
    {
      no: "01",
      name: tt("Define needs", "确定需求"),
      role: tt("Decide", "决策"),
      text: tt("Balance user experience against resources", "平衡用户体验和资源"),
    },
    { no: "02", name: tt("Interaction", "交互设计"), role: tt("Design", "设计"), text: tt("Interaction design", "交互设计") },
    {
      no: "03",
      name: tt("Visual design", "视觉设计"),
      role: tt("Follow up", "跟进"),
      text: tt("Advise on sound and visual effects", "提供视听效果建议"),
    },
    {
      no: "04",
      name: tt("Development", "开发"),
      role: tt("Follow up", "跟进"),
      text: tt("Check the result so the final build holds its quality", "检查效果以确保最终版本的质量"),
    },
    {
      no: "05",
      name: tt("Testing", "测试"),
      role: tt("User testing", "用户测试"),
      text: tt(
        "Run usability tests and user interviews, catch problems early and iterate",
        "进行可用性测试和用户访谈及时发现问题并更新迭代"
      ),
    },
  ],
}

// --- 04 · Stakeholders --------------------------------------------------------

const stakeholder = {
  id: "stakeholder",
  nav: tt("Stakeholders", "利益相关者"),
  no: "04",
  kind: "stakeholder",
  title: tt("Stakeholder analysis", "利益相关者分析"),
  sub: tt("利益相关者分析", "Stakeholder"),
  goal: tt("Goal: balance user experience and cost", "目标：平衡 用户体验和成本"),
  parties: [
    { name: tt("Children", "孩子"), want: tt("Have fun, learn something", "玩的开心 学到知识"), image: `${ART}/child.png` },
    { name: tt("Teaching team", "教研团队"), want: tt("Pass on knowledge", "传递知识"), image: `${ART}/teacher.png` },
    { name: tt("Parents", "家长"), want: tt("See the child learn", "让孩子学到知识"), image: `${ART}/parents.png` },
    { name: tt("Product team", "产品团队"), want: tt("Low cost, high return", "低成本，高回报"), image: `${ART}/team.jpg` },
  ],
  bloom: {
    levels: ["Creating", "Evaluating", "Analyzing", "Applying", "Understanding", "Remembering"],
    note: tt(
      "ABC Mouse's learn-by-doing model and its courses meet the teaching team's needs.",
      "ABC Mouse 的学习实践模式和课程满足是教学团队的需求。"
    ),
    // Side notes, keyed by level index.
    asides: {
      4: tt("Reinforced with interactive games", "互动游戏强化"),
      5: tt("Explained in animated video", "用动画视频讲解知识点"),
    },
    caption: tt("Bloom's taxonomy of educational objectives", "Bloom's 教育目标分类法"),
  },
}

// --- 05 · Research framework --------------------------------------------------

const framework = {
  id: "framework",
  nav: tt("Framework", "研究框架"),
  no: "05",
  kind: "framework",
  title: tt("Research framework", "研究框架"),
  sub: tt("研究框架", "Research Framework"),
  user: { name: "User", lines: [tt("Child psychology", "儿童心理"), tt("Bartle's player types", "Bartle游戏化玩家类型")] },
  object: {
    name: "Object",
    lines: [tt("Gamification mechanics", "游戏化机制"), tt("Scene building", "场景构建"), tt("Design principles", "设计原则")],
  },
  action: "Action",
  feedback: "Feedback",
}

// --- 06 · User analysis -------------------------------------------------------

const users = {
  id: "users",
  nav: tt("Users", "用户分析"),
  no: "06",
  kind: "users",
  title: tt("User analysis", "用户分析"),
  sub: tt("用户分析", "User Analysis"),
  piaget: {
    stages: [
      {
        age: "0-2",
        name: tt("Sensorimotor", "感知运动阶段"),
        text: tt("Children explore and understand the world through senses and movement.", "儿童通过感官和动作来探索和了解周围的世界"),
      },
      {
        age: "2-7",
        name: tt("Preoperational", "前运算阶段"),
        text: tt(
          "Thinking becomes symbolic, but not yet logical.",
          "这一阶段儿童的思维发展出了象征性，但还未能进行逻辑思考"
        ),
        lit: true,
      },
      {
        age: "7-11",
        name: tt("Concrete operational", "后运算阶段"),
        text: tt(
          "Logic begins to apply to concrete information: simple reasoning and operations.",
          "开始能够使用逻辑思维处理具体信息，能够进行一些简单的逻辑推理和操作"
        ),
      },
      {
        age: "11+",
        name: tt("Formal operational", "形式运算阶段"),
        text: tt("Abstract thought and systematic logical reasoning.", "此阶段的个体能够进行抽象思考和系统的逻辑推理"),
      },
    ],
    caption: "Cognitive Development: The Theory of Jean Piaget",
  },
  bartle: {
    axes: { top: "ACTING", bottom: "INTERACTING", left: "PLAYERS", right: "WORLD" },
    quadrants: [
      { name: tt("Killers", "击败者"), text: tt("Seek competition and fights; love to confront", "寻求竞争和战斗 喜欢对抗") },
      { name: tt("Achievers", "成就者"), text: tt("Rewards, points, passes", "奖励、积分、通行证"), lit: true },
      { name: tt("Socialisers", "社交达人"), text: tt("Here for people more than for the game", "强调社交而非游戏本身") },
      { name: tt("Explorers", "探险家"), text: tt("Discover the world's secrets, explore the unknown", "发现世界秘密探索未知"), lit: true },
    ],
    caption: "Bartle's Player Types for Gamification",
  },
  bridges: [tt("Achiever-based gamification", "基于成就者的游戏化"), tt("Explorer-based gamification", "基于探索者的游戏化")],
  traits: [
    { name: tt("Curiosity", "好奇心"), text: tt("Loves exploring and nature; short on focus", "喜欢探索、热爱自然、缺乏专注力") },
    { name: tt("Achievement", "成就感"), text: tt("Be the hero, take on the unknown, love collecting", "成为英雄、挑战未知、热衷收集") },
    {
      name: tt("Self-direction", "自我导向性"),
      text: tt("In a make-believe game world, players struggle to step outside their own frame", "假定的游戏环境中，玩家难以跳出自己的思维框架"),
    },
  ],
  conclusion: [
    { text: tt("Our users are 3–8 years old — Piaget's ", "我们的用户年龄为 3-8 岁，符合 Piaget 的") },
    { text: tt("preoperational stage", "前运算阶段"), u: true },
    { text: tt(". They show the traits of the ", "。他们表现出与战斗者玩家类型中的") },
    { text: tt("Explorer", "探险家"), u: true },
    { text: tt(" and ", "和") },
    { text: tt("Achiever", "成就者"), u: true },
    { text: tt(" player types.", "相关的特征。") },
  ],
}

// --- 07 · Action analysis -----------------------------------------------------

const actions = {
  id: "actions",
  nav: tt("Behaviour", "行为分析"),
  no: "07",
  kind: "actions",
  title: tt("Action analysis", "行为分析"),
  sub: tt("行为分析", "Action Analysis"),
  why: tt("Motivation (why)", "动机(why)"),
  motives: [
    {
      name: tt("Explorers", "探险家"),
      quote: tt("“I want to see what's here”", "“我想看看这里有什么”"),
      shots: [
        { src: `${ART}/act-interact.png`, label: tt("Free play with elements", "与元素自由互动") },
        { src: `${ART}/act-scene.png`, label: tt("Changing scenes", "多变的场景") },
        { src: `${ART}/act-feedback.png`, label: tt("Exploring triggers more feedback", "探索并引发更多反馈") },
        { src: `${ART}/act-story.png`, label: tt("Curious stories", "好奇故事") },
      ],
    },
    {
      name: tt("Achievers", "成就者"),
      quote: tt("“I want more points and rewards”", "“我要拿到更多的分数和奖励”"),
      shots: [
        { src: `${ART}/act-hero.png`, label: tt("Playing the lead", "主角假设") },
        { src: `${ART}/act-collect.png`, label: tt("Trading and collecting", "换取和收集") },
        { src: `${ART}/act-win.png`, label: tt("Winning and praise", "胜利和赞扬") },
        { src: `${ART}/act-challenge.png`, label: tt("A little challenge", "小有挑战") },
      ],
    },
  ],
  how: tt("Rules (how)", "规则(how)"),
  formula: [
    {
      name: tt("What rules need", "游戏规则要求"),
      items: [tt("Clear and simple", "清晰易懂"), tt("Fits the user's cognition", "符合用户认知"), tt("Accepted by people", "被人们认可")],
    },
    { name: tt("Young players", "年轻玩者"), items: [tt("Instinctive behaviour", "本能的行为"), tt("Willing to try new things", "愿意尝试新事物")] },
    { name: tt("Game rules", "游戏规则"), items: [tt("Simple, clear operations", "操作简洁明了"), tt("Room for mistakes", "容错机会")] },
  ],
  band: [
    tt(
      "Users aged 3–5 are explorers: design more exploratory games, with more playful effects and feedback.",
      "3-5岁的用户是探索者，我们可以设计更多探索性的游戏，更好玩的效果和反馈。"
    ),
    tt(
      "Users aged 6–8 are achievers: use goals, scores and rewards for more challenging games.",
      "6-8岁的用户是成就者，我们可以通过目标、分数和奖励进行更具挑战性的游戏。"
    ),
    tt(
      "Rules should be simple and clear, matched to the user's cognitive level, with enough room to make mistakes.",
      "游戏规则应该简单明了，符合用户的认知水平，并提供足够的犯错空间"
    ),
  ],
}

// --- 08 · Feedback ------------------------------------------------------------

const feedback = {
  id: "feedback",
  nav: tt("Feedback", "反馈"),
  no: "08",
  kind: "feedback",
  title: tt("Feedback", "反馈"),
  sub: tt("反馈", "Feedback"),
  positive: {
    name: tt("Positive feedback", "正反馈"),
    rows: [
      { ok: false, text: tt("Short praise with no feeling — “wow”, “great”", "简短无情感赞扬，比如“哇”、“好棒”") },
      { ok: true, text: tt("Warm praise — “You did it! You're amazing!”", "情感充沛赞扬，比如“你完成了！你真棒！”") },
    ],
  },
  negative: {
    name: tt("Negative feedback", "负反馈"),
    shots: [
      { src: `${ART}/fb-strong.png`, ok: false, text: tt("Strong negative feedback, a warning sound", "强烈负反馈，警告声") },
      { src: `${ART}/fb-mild.png`, ok: true, text: tt("Mild feedback: a shake plus encouragement", "轻微反馈，晃动+鼓励") },
    ],
  },
  instant: {
    name: tt("Instant feedback", "即时反馈"),
    image: `${ART}/fb-instant.png`,
    text: tt(
      "Suits activities that need high, sustained engagement — constant encouragement towards a “follow-along” state of focus.",
      "适合需要高且长时间的用户参与的活动，不断激励以实现“跟随”专注状态"
    ),
  },
  delayed: {
    name: tt("Delayed feedback", "延时反馈"),
    image: `${ART}/fb-delayed.png`,
    text: tt(
      "Suits high-reward scenes: it stretches the game's whole life cycle, and rewarding engagement spread over time builds stickiness.",
      "适用于高奖励场景，延长游戏整体生命周期，通过激励分散时间段的参与来增强用户粘性"
    ),
  },
}

// --- 09 · Persona -------------------------------------------------------------

const persona = {
  id: "persona",
  nav: tt("Persona", "用户画像"),
  no: "09",
  kind: "persona",
  title: tt("Persona", "用户画像"),
  sub: tt("用户画像", "Persona"),
  labels: { goal: tt("Goal", "目标"), traits: tt("Traits", "特征"), frustrations: tt("Frustrations", "挫折") },
  people: [
    {
      name: "Frey",
      age: tt("Age 4", "4岁"),
      stage: tt("Preoperational stage", "前运算阶段"),
      facts: [tt("Education: kindergarten", "教育程度：幼儿园"), tt("Lives in: Shenzhen, Guangdong", "居住地：广东深圳")],
      image: `${ART}/frey.png`,
      quotes: [
        tt("“Tap here and see what it is”", "“点一下这里看看是什么”"),
        tt("“How do I do this?”", "“这要怎么做呢？”"),
        tt("“This is taking way too long”", "“这也太长时间了吧”"),
      ],
      bio: tt(
        "Frey is an explorer. Learning games leave him unsure what to do; he needs clear onboarding, a simple interface, engaging feedback — and room to get it wrong.",
        "Frey 是一位探索者，他觉得教育游戏令人不知道怎么操作，他需要清晰的入门指导、简单的用户界面和引人入胜的反馈，还有容错机制。"
      ),
      goal: tt("Enjoy the experience", "享受体验乐趣"),
      traits: tt("Curious / experience-driven / intuitive", "好奇/体验驱动/直觉的"),
      frustrations: [
        tt("Interface information is hard to understand", "界面信息难以理解"),
        tt("Unsure what an interface action will do", "界面操作的不确定性"),
        tt("No patience for a 20-minute lesson", "没有耐心完成20分钟的学习"),
      ],
    },
    {
      name: "Amy",
      age: tt("Age 7", "7岁"),
      stage: tt("Concrete operational stage", "具体运算阶段"),
      facts: [tt("Education: primary, year 2", "教育程度：小学二年级"), tt("Lives in: Shanghai", "居住地：上海")],
      image: `${ART}/amy.png`,
      quotes: [tt("“I want to get this reward”", "“我要得到这个奖励”"), tt("“I want a higher score”", "“我想要获得更高的分数”")],
      bio: tt(
        "Amy is an achiever. She needs positive, constructive feedback made for her, goal-driven game setups and the game's reward mechanics.",
        "Amy 是一个成就者，她需要量身定制的积极和建设性的反馈、目标导向的游戏设置和游戏的激励机制。"
      ),
      goal: tt("A high score, a sense of achievement", "高分获得成就感"),
      traits: tt("Competitive / result-driven / logical", "好胜/结果驱动/逻辑性"),
      frustrations: [
        tt("Little interest in the learning games out there", "对现有的教育游戏缺乏兴趣"),
        tt("Negative feedback is deflating", "对负面反馈很沮丧"),
      ],
    },
    {
      name: "Sofia",
      age: tt("Age 36", "36岁"),
      stage: null,
      facts: [tt("Occupation: designer", "职业：设计师"), tt("Education: master's", "教育程度：硕士"), tt("Lives in: Shanghai", "居住地：上海")],
      image: `${ART}/sofia.png`,
      quotes: [
        tt("“I hope my child learns more”", "“希望孩子学到更多”"),
        tt("“It mustn't be so game-like that she gets hooked”", "“不可以过度游戏化让孩子沉迷”"),
      ],
      bio: tt(
        "Sofia is a working mother looking for a product where her child learns through play, so that teaching is less of a burden on her.",
        "Sofia 是一个职业妈妈，她在寻找一个能让孩子通过玩乐去学习的产品，从而去减轻她的教学负担。"
      ),
      goal: tt("Learning through play", "玩中学习"),
      traits: tt("Values education / loves her child", "价值观教育/爱孩子"),
      frustrations: [
        tt("The child needs help to finish on her own", "孩子需要帮助才能独立完成"),
        tt("Interest fades, so the purchase goes to waste", "孩子难以维持兴趣，导致购买后浪费"),
        tt("Too game-like and the child gets hooked", "太过游戏话容易让孩子沉迷"),
      ],
    },
  ],
}

// --- 10 · Pain points and solutions -------------------------------------------

const painpoints = {
  id: "painpoints",
  nav: tt("Pain points", "痛点和方案"),
  no: "10",
  kind: "painpoints",
  title: tt("Pain points and solutions", "痛点和解决方案"),
  sub: tt("痛点和解决方案", "Painpoints and solutions"),
  groups: [
    {
      heading: tt("01 Flow: strip out complexity, keep it simple and clear", "01  流程：消除复杂性保持简单易懂"),
      // One row per arrow on the board; a null problem is a solution with no
      // matching complaint beside it.
      rows: [
        [tt("A long, slow process", "漫长缓慢的过程"), tt("Simplify the flow, make interaction more efficient", "简化流程，提高交互效率")],
        [null, tt("Let parents set usage time flexibly", "家长可以灵活设置产品使用时间")],
        [tt("Unclear guidance", "指导不明确"), tt("Voice, video or interactive guidance, chosen by complexity", "根据复杂性选择语音、视频或者交互式引导")],
        [tt("Feedback that is wrong and late", "反馈不当且不及时"), tt("Strengthen positive feedback, soften negative", "优化正反馈，削弱负反馈")],
      ],
    },
    {
      heading: tt("02 Interface: a hierarchy for interface elements", "02  界面：规范界面元素的层级结构"),
      rows: [
        [
          tt("UI hierarchy unclear, priorities muddled", "UI层次不清晰，优先级混乱"),
          tt("Standardise the element hierarchy; separate what can be operated from what can't", "规范界面元素层次结构，区分可操作和不可操作区域"),
        ],
        [tt("Inconsistent visual style", "视觉风格不一致"), tt("Unify the visual style", "统一视觉风格")],
      ],
    },
    {
      heading: tt("03 Gamification: reposition it to be both fun and educational", "03  游戏化：重新定位游戏化程度，使其兼具趣味性和教育性"),
      rows: [
        [
          tt("Monotonous play with no story", "玩法单调缺乏故事性"),
          tt("Tie games to real-life scenes to aid understanding and add playability", "与现实生活场景结合，提高用户理解力，增强可玩性"),
        ],
      ],
    },
  ],
  images: [
    { src: `${ART}/ui-before-after.jpg`, alt: tt("Interface hierarchy, before and after", "界面层级：前后对比") },
    { src: `${ART}/game-before-after.jpg`, alt: tt("Gamification, before and after", "游戏化：前后对比") },
  ],
}

// --- 11 · Case ----------------------------------------------------------------

const showcase = {
  id: "case",
  nav: tt("Case", "案例演示"),
  no: "11",
  kind: "case",
  title: tt("Case study", "案例演示"),
  sub: tt("案例演示", "Case"),
  brief: [
    { label: tt("Goal", "目标需求"), text: tt("Learn addition with a ten-frame: making ten.", "用十格阵学习加法，学会凑十") },
    {
      label: tt("Requirement", "需求分析"),
      text: tt(
        "Give two groups of nine objects and one ten-frame. The child drags both kinds of object to fill the frame, then picks how many of each were used.",
        "需要给出两组分别为9个的物体，一个十格阵，让用户拖动两种物体填满十格阵，并选出每种物体各用了几个"
      ),
    },
    {
      label: tt("Flow", "流程"),
      steps: [
        tt(
          "The child freely drags or taps objects from the two groups of nine into the ten-frame to make ten (the two groups can be mixed).",
          "小朋友先自由地从给出的两组9个选项物品中拖拽/点击物品进入到十格阵进行凑十（两组选项可以交错拖拽/点击）"
        ),
        tt("Once the frame is full, the next step — “count check” — begins.", "十格阵满进入下一环节“数量考察”"),
        tt("The child counts each kind of object placed in the frame and picks the right number.", "小朋友分别数一数自己所放入十格阵的物品的数量，选择正确的数量选项"),
      ],
    },
  ],
  logic: { label: tt("Interaction logic", "交互逻辑"), image: `${ART}/case-flow.png` },
  layout: {
    label: tt("Interface layout", "界面布局"),
    image: `${ART}/case-layout.png`,
    points: [
      tt("A supermarket scene from everyday life", "采用超市购物的生活场景"),
      tt("A simple, clear picture", "画面简单明了"),
      tt("A standard interface hierarchy", "规范界面层级结构"),
    ],
  },
  ixd: {
    label: tt("Interaction design", "交互设计"),
    boards: [
      { image: `${ART}/case-ixd-a.png`, notes: [tt("Drag or tap — two ways to operate", "允许拖拽/点击 两种操作方案")] },
      {
        image: `${ART}/case-ixd-b.png`,
        notes: [
          tt("No input for a long time", "长时间无操作情况"),
          tt("Transitions", "转场变化"),
          tt("Positive and negative feedback", "正负反馈"),
          tt("Global feedback / error correction", "全局反馈/纠错机制"),
        ],
      },
    ],
    legend: { image: `${ART}/case-legend.png`, text: tt("The whole flow, considered", "考虑全流程") },
    transition: `${ART}/case-transition.png`,
  },
}

// --- 12 · Other case ----------------------------------------------------------

const gallery = {
  id: "gallery",
  nav: tt("Gallery", "其他活动"),
  no: "12",
  kind: "gallery",
  title: tt("Visual output for other activities", "其他活动的视觉输出"),
  sub: tt("其他活动的视觉输出", "Other case"),
  shots: [
    { src: `${ART}/other-paint.jpg`, alt: tt("Tap to colour", "点击操作 涂色") },
    { src: `${ART}/other-tshirt.jpg`, alt: tt("Three options with a guide picture", "带示意图三个选项") },
    { src: `${ART}/other-kitchen.jpg`, alt: tt("Negative feedback + unrecognised", "负反馈+未识别") },
    { src: `${ART}/other-fish.jpg`, alt: tt("Feeding game", "喂鱼") },
    { src: `${ART}/other-train.jpg`, alt: tt("Layout: number and quantity", "界面布局（数字+数量）") },
    { src: `${ART}/other-geoboard.jpg`, alt: tt("Connect the dots", "连点点") },
  ],
  labels: ["Creative Design", "Game Design", "For children", "Math and Thinking"],
  mice: { plane: `${ART}/mouse-plane.png`, wave: `${ART}/mouse-wave.png` },
}

// --- The sections the detail page walks ---------------------------------------

const boards = [background, issues, workflow, stakeholder, framework, users, actions, feedback, persona, painpoints, showcase, gallery]

export const abcMouseSections = boards.map((board) => ({
  id: board.id,
  eyebrow: tt(`${board.no} · ${board.title.en}`, `${board.no} · ${board.title.zh}`),
  label: board.nav,
  // The board draws its own two-language title, so the page's heading stays for
  // the chapter index and the outline but is not drawn twice.
  titleHidden: true,
  blocks: [{ type: "abcdeck", slide: board }],
}))
