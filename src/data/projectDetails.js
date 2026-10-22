// Case-study content for each project detail page, keyed by slug (see projectList in project.js).
// Sourced from the original case-study decks and product shots where available — kept close to
// what those documents actually said rather than invented after the fact.
//
// Every line a reader sees is tt("English", "中文") — the two languages sit side by side so a
// copy edit is one edit, not two files to keep in step. See src/i18n/t.js.
import { tt } from "../i18n/t"
import { kyrallWorkflow } from "./kyrallWorkflow"
import { kyrallBackground } from "./kyrallBackground"
import { kyrallCompetitors } from "./kyrallCompetitors"
import { kyrallPersona } from "./kyrallPersona"
import { kyrallStoryMap } from "./kyrallStoryMap"
import { kyrallSpec } from "./kyrallSpec"
import { kyrallCoreFlow } from "./kyrallCoreFlow"
import { weatherPetsHero, weatherPetsTags, weatherPetsSummary, weatherPetsSections } from "./weatherPetsDeck"

export const projectDetails = {
  kyrall: {
    role: tt("Sole Product Designer", "唯一产品设计师"),
    summary: tt(
      "Designing Kyrall from zero as its sole product designer.",
      "作为唯一的产品设计师，从零开始设计 Kyrall。"
    ),
    hero: {
      image: "/project/kyrall/4.png",
      headline: tt(
        "Design and manufacture hardware at the speed of thought.",
        "以思考的速度，设计并制造硬件。"
      ),
    },
    tags: [
      tt("0→1 product design", "0→1 产品设计"),
      tt("AI + CAD", "AI + CAD"),
      tt("Design system", "设计系统"),
      tt("Product analytics", "产品数据分析"),
    ],
    sections: [
      {
        id: "workflow",
        label: tt("Work flow", "工作流"),
        lead: tt(
          "From 0 to 1: designing Kyrall's end-to-end product experience.",
          "从 0 到 1: 独立设计 Kyrall 的完整产品体验。"
        ),
        blocks: [{ type: "workflow", board: kyrallWorkflow }],
      },
      {
        id: "background",
        eyebrow: tt("01 · Background", "01 · 需求背景"),
        // The board opens with its own title, so the page's heading stays for the
        // chapter index and the outline but is not drawn twice.
        label: tt("Background", "需求背景"),
        titleHidden: true,
        blocks: [{ type: "background", board: kyrallBackground }],
      },
      {
        id: "competitors",
        eyebrow: tt("02 · Competitors", "02 · 竞品分析"),
        // Same arrangement as the Background board: the board opens with its own
        // title, so the page's heading stays for the chapter index and the outline
        // but is not drawn twice.
        label: tt("Competitors", "竞品分析"),
        titleHidden: true,
        blocks: [{ type: "competitors", board: kyrallCompetitors }],
      },
      {
        id: "persona",
        eyebrow: tt("03 · Persona", "03 · 用户画像"),
        // The board opens with its own title, so the page's heading stays for the
        // chapter index and the outline but is not drawn twice.
        label: tt("Persona", "用户画像"),
        titleHidden: true,
        blocks: [
          { type: "persona", board: kyrallPersona },
          { type: "storymap", board: kyrallStoryMap },
        ],
      },
      {
        id: "system",
        eyebrow: tt("05 · Design System", "05 · 设计系统"),
        label: tt("Design System", "设计系统"),
        lead: tt(
          "Keep it consistent: document the system and its components.",
          "保持统一原则，沉淀设计系统与组件规范。"
        ),
        blocks: [{ type: "spec", board: kyrallSpec }],
      },
      {
        id: "loop",
        eyebrow: tt("06 · Core flow", "06 · 核心流程"),
        // The board opens with its own title, so the page's heading stays for the
        // chapter index and the outline but is not drawn twice.
        label: tt("Core flow", "核心流程"),
        titleHidden: true,
        blocks: [{ type: "coreflow", board: kyrallCoreFlow }],
      },
      {
        id: "evidence",
        eyebrow: tt("13 · Real usage", "13 · 真实使用"),
        label: tt("Evidence", "证据"),
        lead: tt(
          "Once the product was live, I stopped relying only on design assumptions.",
          "产品上线之后，我就不再只靠设计假设了。"
        ),
        blocks: [
          {
            text: tt(
              "Kyrall went public with a Hacker News post on July 6. The traffic spike gave the team its first real dataset, and PostHog product events and web analytics showed that the Editor — the core product surface — was also the clearest friction area.",
              "7 月 6 日，Kyrall 以一篇 Hacker News 帖子公开亮相。那波流量给团队带来了第一份真实数据：PostHog 的产品事件与网站分析显示，编辑器 —— 产品的核心界面 —— 同时也是摩擦最明显的地方。"
            ),
          },
          {
            type: "stats",
            items: [
              {
                value: "36.1%",
                label: tt("Editor bounce rate", "编辑器跳出率"),
                note: tt(
                  "Highest in-product bounce among major product pages.",
                  "主要产品页面中最高的站内跳出率。"
                ),
              },
              {
                value: "57.5",
                label: tt("Rage clicks per 100 visitors", "每 100 位访客的暴力点击数"),
                note: tt("Highest observed friction signal.", "观测到的最强摩擦信号。"),
              },
              {
                value: "47.39%",
                label: tt("No tracked Editor action", "生成后无任何编辑器动作"),
                note: tt(
                  "After generation, a large share did not continue in the Editor.",
                  "生成之后，相当大一部分用户没有在编辑器里继续操作。"
                ),
              },
              {
                value: "56.2%",
                label: tt("Export open → action", "打开导出 → 实际导出"),
                note: tt(
                  "Export appeared as a strong value-realisation signal.",
                  "导出显现为一个强烈的价值实现信号。"
                ),
              },
            ],
          },
          {
            type: "bullets",
            title: tt("What the data changed", "数据改变了什么"),
            items: [
              tt(
                "Prioritize Editor diagnosis over cosmetic homepage optimization.",
                "把编辑器的问题诊断排在首页视觉优化之前。"
              ),
              tt(
                "Treat Export and Parameter as meaningful post-generation behaviors.",
                "把「导出」与「参数」当作生成之后有意义的行为来看。"
              ),
              tt(
                "Separate low adoption from low value: discoverability, comprehension and actual need are different hypotheses.",
                "把「使用率低」和「价值低」分开：可发现性、可理解性与真实需求，是三个不同的假设。"
              ),
            ],
          },
          {
            text: tt(
              "Data window: Jul 1 – Aug 19, 2026. Some product events cover Jul 22 – Aug 19.",
              "数据窗口：2026 年 7 月 1 日 – 8 月 19 日；部分产品事件为 7 月 22 日 – 8 月 19 日。"
            ),
          },
          {
            text: tt(
              "The analytics could not distinguish whether users stopped because of model quality, generation failure, waiting, unclear next steps, or Editor interaction friction. So the next step was better evidence, not an immediate redesign.",
              "数据分不清用户停下来，是因为模型质量、生成失败、等待太久、不知道下一步，还是编辑器本身的交互摩擦。所以下一步该做的是取得更好的证据，而不是立刻重做设计。"
            ),
          },
          {
            type: "steps",
            items: [
              tt("Signal", "信号"),
              tt("Gap", "缺口"),
              tt("Track", "埋点"),
              tt("Observe", "观察"),
              tt("Explain", "解释"),
            ],
          },
          {
            text: tt(
              "Two corrections came out of that loop. Front-end errors were confirmed as expected rather than a broken pipeline — Kyrall runs Sentry for error tracking, not PostHog — and with those corrections in place the friction point resolved to /signup, not the parts of the product that had been suspected first.",
              "这个循环带来两处修正。一是前端报错被确认属于预期范围，而不是链路坏了 —— Kyrall 用 Sentry 做错误追踪，而不是 PostHog；二是修正之后，摩擦点落到了 /signup，而不是最初被怀疑的那几块产品界面。"
            ),
          },
          {
            text: tt(
              "One early hypothesis did not survive the data. The theory was that retention was capped by users hitting the generation quota; in the analysis window the quota ceiling was triggered four times, nowhere near enough to account for the numbers. The bet was specific enough to be falsifiable, so it was dropped rather than defended.",
              "有一个早期假设没能活过数据：原本认为留存被生成额度卡住了，但在分析窗口内，额度上限只被触发了四次，远不足以解释那些数字。这个判断足够具体、因此可以被否证 —— 于是它被放弃，而不是被辩护。"
            ),
          },
          {
            type: "note",
            text: tt(
              "Evidence-informed, not metric-driven. A number can identify a suspicious part of the journey. It cannot automatically tell me what to redesign.",
              "被证据启发，而不是被指标驱动。一个数字能指出旅程里值得怀疑的一段，但它不会自动告诉我该重做哪里。"
            ),
          },
        ],
      },
    ],
  },
  "abc-mouse": {
    role: tt("UX · Interaction & Game Design", "UX · 交互与游戏化设计"),
    summary: tt(
      "ABC Mouse (开心鼠) is Tencent's online education app for children aged 3–8. The work covered research, interaction and game design — raising completion rates and lowering cost through a design language consistent across the Chinese and American teams.",
      "ABC Mouse（开心鼠）是腾讯面向 3–8 岁儿童的在线教育应用。这段工作覆盖研究、交互与游戏化设计 —— 用一套在中美两个团队之间保持一致的设计语言，提高完成率、降低成本。"
    ),
    tags: [
      tt("UX design", "用户体验设计"),
      tt("Interaction design", "交互设计"),
      tt("Children design", "儿童设计"),
      tt("Game design", "游戏化设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Tencent · ABC Mouse online education app design.",
          "腾讯 · ABC Mouse 在线教育应用设计。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/hero.jpg",
            caption: tt(
              "ABC Mouse — learning games for children aged 3–8.",
              "ABC Mouse —— 面向 3–8 岁儿童的学习游戏。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("01 · Background", "01 · 背景"),
        label: tt("Background", "背景"),
        lead: tt(
          "An American product, rebuilt for Chinese children.",
          "一个美国产品，为中国孩子重做一遍。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/1.jpg",
            size: "md",
            caption: tt("Before — ABCmouse, the original US product.", "之前 —— 美国原版产品 ABCmouse。"),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Before · 2–8 year olds", "之前 · 2–8 岁"),
                text: tt(
                  "Created by the American educational technology company Age of Learning, Inc. The application primarily covers English, reading and language arts, math, science, health, social studies, music, and art.",
                  "由美国教育科技公司 Age of Learning, Inc. 开发，内容主要覆盖英语、阅读与语言、数学、科学、健康、社会、音乐与美术。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/2.jpg",
            size: "md",
            caption: tt("Now — 开心鼠, the Chinese edition.", "现在 —— 中国版「开心鼠」。"),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Now · 3–8 year olds", "现在 · 3–8 岁"),
                text: tt(
                  "China’s top-ranked online education application (2021). It introduces English and adds content tailored to the thinking, language, and coding needs of Chinese users.",
                  "2021 年中国在线教育应用排名第一。引入英语课程，并针对中国用户的思维、语言与编程需求补充内容。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "issues",
        eyebrow: tt("02 · Existing issues", "02 · 现存问题"),
        label: tt("Existing issues", "现存问题"),
        lead: tt("Two teams, two visual languages, one app.", "两个团队、两套视觉语言、一个应用。"),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/3.jpg",
            caption: tt(
              "The same product, drawn twice — Tencent team screens above, American team screens beside them.",
              "同一个产品被画了两遍 —— 上方是腾讯团队的界面，旁边是美国团队的界面。"
            ),
          },
          {
            type: "bullets",
            title: tt("Design inconsistencies", "设计不一致"),
            items: [
              tt("Overall style is not uniform.", "整体风格不统一。"),
              tt("Discrepancies between the app and the content.", "应用与内容之间存在割裂。"),
              tt(
                "Cross-country collaboration: high communication costs, slow progress.",
                "跨国协作：沟通成本高、推进缓慢。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/4.jpg",
            size: "md",
            caption: tt("User usability testing.", "用户可用性测试。"),
          },
          {
            type: "bullets",
            title: tt("User “discomfort”", "用户的「不适」"),
            items: [
              tt(
                "In usability testing, users have low completion rates and easily experience frustration and avoidance.",
                "可用性测试中，用户完成率偏低，容易产生挫败与回避。"
              ),
              tt("Usability test results are not ideal.", "可用性测试的结果并不理想。"),
            ],
          },
          {
            type: "note",
            text: tt(
              "Design goal — enhance user experience and completion rates through consistent design, and lower costs. Worth noticing that consistency is doing double duty here: it is both the user-facing fix for a confusing app and the internal fix for an expensive cross-border handoff. One decision, two different payoffs.",
              "设计目标 —— 以一致的设计提升体验与完成率，同时降低成本。值得注意的是，「一致性」在这里干了两份活：它既是面向用户、解决应用混乱的办法，也是对内、解决昂贵跨国交接的办法。一个决定，两种收益。"
            ),
          },
        ],
      },
      {
        id: "workflow",
        eyebrow: tt("03 · Work flow", "03 · 工作流程"),
        label: tt("Work flow", "工作流程"),
        lead: tt(
          "Update versions · data collection · iteration optimization.",
          "版本更新 · 数据收集 · 迭代优化。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Identify requirements", "需求确认"),
              tt("Interaction design", "交互设计"),
              tt("Visual design", "视觉设计"),
              tt("Development", "开发跟进"),
              tt("Testing", "测试"),
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/5.jpg",
            caption: tt(
              "Five stages, and what the designer owns in each — decision, design, follow up, follow up, user testing.",
              "五个阶段，以及设计师在每个阶段负责什么 —— 决策、设计、跟进、跟进、用户测试。"
            ),
          },
        ],
      },
      {
        id: "stakeholder",
        eyebrow: tt("04 · Stakeholder", "04 · 利益相关者"),
        label: tt("Stakeholder", "利益相关者"),
        lead: tt(
          "Four parties pulling the product in four directions.",
          "四方力量，把产品往四个方向拉。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              { term: tt("Children", "孩子"), text: tt("Enjoy playing and learning.", "玩得开心，也学到东西。") },
              {
                term: tt("Parents", "家长"),
                text: tt("Ensure their children learn knowledge.", "确认孩子真的学到了知识。"),
              },
              { term: tt("Teaching team", "教研团队"), text: tt("Transmit knowledge.", "把知识传递出去。") },
              {
                term: tt("Product team", "产品团队"),
                text: tt("Achieve low cost and high returns.", "低成本、高回报。"),
              },
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/6.jpg",
            caption: tt(
              "Balancing user experience and cost — and ABC Mouse’s learning modules mapped onto Bloom’s Taxonomy, from Remembering up to Creating.",
              "在体验与成本之间取平衡 —— 并把 ABC Mouse 的学习模块对应到布鲁姆分类法上，从「记忆」一路到「创造」。"
            ),
          },
        ],
      },
      {
        id: "framework",
        eyebrow: tt("05 · Research framework", "05 · 研究框架"),
        label: tt("Research framework", "研究框架"),
        lead: tt(
          "User and object, joined by action and feedback.",
          "用户与对象，由行为与反馈连起来。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/7.jpg",
            size: "lg",
            caption: tt(
              "The user side brings child psychology and Bartle’s player types; the object side brings gamification mechanisms, scene construction and design principles.",
              "用户这一侧带来儿童心理学与巴图的玩家类型；对象那一侧带来游戏化机制、场景构建与设计原则。"
            ),
          },
        ],
      },
      {
        id: "users",
        eyebrow: tt("06 · User analysis", "06 · 用户分析"),
        label: tt("User analysis", "用户分析"),
        lead: tt(
          "Who a 3–8 year old actually is, according to two models.",
          "用两个模型，看清 3–8 岁的孩子究竟是谁。"
        ),
        blocks: [
          {
            text: tt(
              "Our users are aged 3–8 years, aligning with Piaget’s Preoperational Stage. They exhibit traits associated with Explorers and Achievers in Bartle’s player type model.",
              "我们的用户是 3–8 岁儿童，对应皮亚杰认知发展阶段中的「前运算阶段」；在巴图的玩家类型模型里，他们表现出「探索者」与「成就者」的特征。"
            ),
          },
          {
            type: "image",
            src: "/project/abc-mouse/users.jpg",
            caption: tt(
              "Piaget’s cognitive development stages above, Bartle’s player types below — resolving into curiosity, a sense of achievement, and self-guidance.",
              "上方是皮亚杰的认知发展阶段，下方是巴图的玩家类型 —— 最终收束为好奇心、成就感与自主性。"
            ),
          },
          {
            type: "note",
            text: tt(
              "This is the move that makes the rest of the project defensible. “Children get frustrated” is an observation; “our users sit in the Preoperational Stage and split into Explorers and Achievers” is a model you can design different game rules against — and it is exactly what the next two sections do.",
              "正是这一步，让后面的设计站得住脚。「孩子会受挫」只是一个观察；「我们的用户处在前运算阶段，并分成探索者与成就者」才是一个能据以设计出不同游戏规则的模型 —— 而接下来两节做的就是这件事。"
            ),
          },
        ],
      },
      {
        id: "action",
        eyebrow: tt("07 · Action analysis", "07 · 行为分析"),
        label: tt("Action analysis", "行为分析"),
        lead: tt(
          "Why they play, and how the rules should answer.",
          "他们为什么玩，以及规则该怎么回应。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Explorers", "探索者"),
                text: tt(
                  "“I want to see what’s here.” Interact freely with elements, diverse scenes, explore and trigger more feedback, curious stories.",
                  "「我想看看这里有什么。」自由地与元素互动、多样的场景、探索并触发更多反馈、让人好奇的故事。"
                ),
              },
              {
                term: tt("Achievers", "成就者"),
                text: tt(
                  "“I want to get more points and rewards.” Role play, collect and exchange, victory and praise, small challenges.",
                  "「我想拿到更多分数和奖励。」角色扮演、收集与兑换、胜利与表扬、小小的挑战。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/8.jpg",
            caption: tt(
              "Why and how — game rules plus young players’ intrinsic behaviours, resolving into simple operation with room for trial and error.",
              "为什么与怎么做 —— 游戏规则叠上低龄玩家的内在行为，最后收束为「操作简单、留足试错空间」。"
            ),
          },
          {
            type: "bullets",
            items: [
              tt(
                "For users aged 3–5 explorers, design more exploratory games with more engaging effects and feedback.",
                "面向 3–5 岁的探索者，多做探索型游戏，给更丰富的效果与反馈。"
              ),
              tt(
                "For users aged 6–8 achievers, incorporate goals, scores, and rewards for more challenging games.",
                "面向 6–8 岁的成就者，加入目标、分数与奖励，做更有挑战性的游戏。"
              ),
              tt(
                "Game rules should be simple and clear, matching the user’s cognitive level, and providing ample room for trial and error.",
                "游戏规则要简单清晰，匹配用户的认知水平，并留出充足的试错空间。"
              ),
            ],
          },
        ],
      },
      {
        id: "feedback",
        eyebrow: tt("08 · Feedback", "08 · 反馈"),
        label: tt("Feedback", "反馈"),
        lead: tt(
          "Praise, correction, and when each should arrive.",
          "表扬、纠正，以及它们各自该在什么时候出现。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Positive feedback", "正向反馈"),
                text: tt(
                  "Not simple, emotionless praise such as “Wow” or “Great” — emotion-rich praise such as “You did it! You’re amazing!”",
                  "不是「哇」「很好」这类平淡无情绪的表扬，而是带情绪的肯定：「你做到了！你真厉害！」"
                ),
              },
              {
                term: tt("Negative feedback", "负向反馈"),
                text: tt(
                  "Not strong negative feedback with warning sounds — gentle feedback with prompts and encouragement.",
                  "不是伴着警示音的强烈否定，而是带提示与鼓励的温和反馈。"
                ),
              },
              {
                term: tt("Immediate feedback", "即时反馈"),
                text: tt(
                  "Suitable for activities requiring high focus and prolonged engagement. Continuous motivation maintains user attention.",
                  "适合需要高度专注、持续投入的活动。连续的激励维持注意力。"
                ),
              },
              {
                term: tt("Delayed feedback", "延迟反馈"),
                text: tt(
                  "Suitable for high-reward scenarios, extending the overall game lifecycle. Encourages sustained user engagement through periodic rewards.",
                  "适合高奖励的场景，能拉长整个游戏的生命周期，用周期性奖励鼓励持续参与。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/9.jpg",
            caption: tt(
              "Feedback design — what to say, how firmly to say it, and when.",
              "反馈设计 —— 说什么、说得多重、什么时候说。"
            ),
          },
        ],
      },
      {
        id: "persona",
        eyebrow: tt("09 · Persona", "09 · 用户画像"),
        label: tt("Persona", "用户画像"),
        lead: tt(
          "An explorer, an achiever, and the mother paying for both.",
          "一个探索者、一个成就者，以及替他们付钱的妈妈。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/13.jpg",
            caption: tt(
              "Frey (4, explorer), Amy (7, achiever) and Sofia (36, working mother) — each with goals, characteristics and frustrations.",
              "Frey（4 岁，探索者）、Amy（7 岁，成就者）与 Sofia（36 岁，职场妈妈）—— 各有自己的目标、特征与烦恼。"
            ),
          },
          {
            type: "note",
            text: tt(
              "Sofia is the persona that keeps the gamification honest. Her frustration — “do not over-gamify and make children addicted” — sits directly against Amy’s need for points and rewards. The product has to motivate the child without alarming the parent, and that tension is the real constraint on how far the reward loops can go.",
              "Sofia 是那个让游戏化不至于走偏的角色。她的担忧 —— 「不要过度游戏化、让孩子上瘾」—— 正好与 Amy 对分数和奖励的需求相对。产品必须既激励孩子、又不惊动家长，而这份张力正是奖励循环能走多远的真正约束。"
            ),
          },
        ],
      },
      {
        id: "solutions",
        eyebrow: tt("10 · Painpoints and solutions", "10 · 痛点与方案"),
        label: tt("Painpoints and solutions", "痛点与方案"),
        lead: tt("Three problem areas, each paired with its fix.", "三类问题，各配一套解法。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt(
                  "01 Process · eliminate complexity, maintain simplicity",
                  "01 流程 · 去掉复杂，保持简单"
                ),
                text: tt(
                  "Lengthy, slow process; unclear guidance; untimely feedback → simplify processes and enhance interaction efficiency; flexible product usage timing for parents; choose appropriate language, video, or interactive guides based on complexity; optimize positive feedback and reduce negative feedback.",
                  "流程冗长缓慢、引导不清、反馈不及时 → 精简流程、提升交互效率；让家长能灵活安排使用时间；按复杂度选择语言、视频或互动式引导；优化正向反馈、减少负向反馈。"
                ),
              },
              {
                term: tt("02 Interface · standardize hierarchical structure", "02 界面 · 统一层级结构"),
                text: tt(
                  "Unclear UI hierarchy with mixed priorities, and inconsistent visual style → standardize element hierarchy, distinguish operable areas, and unify visual style.",
                  "界面层级不清、优先级混杂、视觉风格不统一 → 规范元素层级，区分可操作区域，统一视觉风格。"
                ),
              },
              {
                term: tt(
                  "03 Gamification · redefine gamification for educational and enjoyable experiences",
                  "03 游戏化 · 重新定义「既好玩又能学」的游戏化"
                ),
                text: tt(
                  "Lack of story in gameplay → integrate real-life scenarios to enhance user understanding and engagement.",
                  "玩法缺少故事性 → 融入真实生活场景，提升理解与参与度。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/10.jpg",
            caption: tt(
              "Each painpoint against its solution, with before-and-after screens underneath.",
              "每个痛点与对应方案并排，下方是改版前后的界面。"
            ),
          },
        ],
      },
      {
        id: "case",
        eyebrow: tt("11 · Case demonstration", "11 · 案例演示"),
        label: tt("Case demonstration", "案例演示"),
        lead: tt(
          "One activity, carried from objective to interaction flow.",
          "一个活动，从教学目标一路做到交互流程。"
        ),
        blocks: [
          {
            text: tt(
              "Objective: users should learn to add and subtract within ten. The needs analysis turns that into groups of 9 objects and a grid of 10, so a child practises moving two types of object into the grid until it is full, using different quantities of each.",
              "目标：让孩子学会十以内的加减法。需求分析把它转译成 9 个一组的物件与一个十格的格子 —— 孩子要把两类物件按不同数量放进格子，直到填满。"
            ),
          },
          {
            type: "bullets",
            title: tt("Process", "流程"),
            items: [
              tt(
                "Drag/drop or click items into the 10-grid from 9 options.",
                "从 9 个选项中拖拽或点击，把物件放入十格。"
              ),
              tt("Once the grid is full, proceed to the next activity.", "格子填满后，进入下一个活动。"),
              tt(
                "Select the correct total count of objects placed in the grid.",
                "选出放进格子里的物件总数。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/abc-mouse/11.jpg",
            caption: tt(
              "Objective, needs analysis, process, interaction logic, interface and interaction flow — a supermarket shopping scenario keeps the interface simple and clear, with a standardized hierarchy of elements.",
              "目标、需求分析、流程、交互逻辑、界面与交互流 —— 以超市购物的场景，让界面保持简洁清晰、元素层级统一。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The interaction flow is where the user research cashes out. Long periods of inactivity, scenario changes, positive and negative feedback, and the overall error mechanism each get a branch — the frustration and avoidance seen in usability testing is designed for explicitly, rather than assumed away.",
              "交互流程是用户研究真正兑现的地方。长时间无操作、场景切换、正负向反馈、整体的错误机制，各自都有一条分支 —— 可用性测试里看到的挫败与回避，是被明确设计进去的，而不是被假设掉的。"
            ),
          },
        ],
      },
      {
        id: "visual",
        eyebrow: tt("12 · Visual output", "12 · 视觉产出"),
        label: tt("Visual output", "视觉产出"),
        lead: tt("The same system, across other cases.", "同一套系统，用在其他案例上。"),
        blocks: [
          {
            type: "image",
            src: "/project/abc-mouse/12.jpg",
            caption: tt(
              "Creative design, game design, for children, math and thinking — consistent treatment across activities.",
              "创意设计、游戏设计、儿童向、数学与思维 —— 不同活动之间保持一致的处理方式。"
            ),
          },
        ],
      },
    ],
  },
  // Rebuilt from the WeatherPets Figma deck — one board per slide, laid out the way
  // the Kyrall case study is: the page's own hero on top, then a board per chapter
  // drawn on the page's surface. Content and boards live in weatherPetsDeck.js.
  "weather-pets": {
    role: tt("UX/UI Designer · part-time front-end", "UX/UI 设计师 · 兼部分前端"),
    summary: weatherPetsSummary,
    hero: weatherPetsHero,
    tags: weatherPetsTags,
    sections: weatherPetsSections,
  },
  "slow-food": {
    role: tt("UX/UI · Service & System Design", "UX/UI · 服务与系统设计"),
    summary: tt(
      "In the post-pandemic era, this project aims to revive a Slow Food-themed restaurant through innovative design and interactive experiences. It includes an app for virtual planting and offline activities.",
      "在后疫情时代，这个项目希望用创新设计与互动体验，让一家以「慢食」为主题的餐厅重新活起来 —— 其中包含一个结合虚拟种植与线下活动的应用。"
    ),
    tags: [
      tt("Service design", "服务设计"),
      tt("System design", "系统设计"),
      tt("UX/UI", "UX/UI"),
      tt("Brand identity", "品牌形象"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt("“Grow” — a Slow Food experience for Bra.", "「Grow」—— 为布拉设计的慢食体验。"),
        blocks: [
          {
            text: tt(
              "GROW connects an app to a restaurant. Users grow vegetables virtually, earn a Harvest Card, and redeem it for real ingredients they pick themselves before the meal is cooked in front of them — so “Slow Food” is something they take part in rather than only eat.",
              "GROW 把一个应用与一家餐厅连起来。用户在线上种菜，攒到一张「收获卡」，到店兑换成真实食材、亲手采摘，再看着它在眼前被做成一餐 —— 于是「慢食」变成一件他们参与的事，而不只是吃到的东西。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/1.jpg",
            caption: tt(
              "Key visual — the GROW app, “Plant your slow dishes”.",
              "主视觉 —— GROW 应用，「种出你的慢食」。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("01 · Background", "01 · 背景"),
        label: tt("Background", "背景"),
        lead: tt(
          "Bra, Piedmont — where the Slow Food movement began.",
          "皮埃蒙特的布拉 —— 慢食运动的发源地。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/slow-food/2.jpg",
            caption: tt(
              "Bra in context — Slow Food, the University of Gastronomic Sciences and the Salsiccia di Bra all originate here.",
              "布拉的背景 —— 慢食组织、美食科学大学与布拉香肠都发源于此。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Gastronomic Cultural Center", "美食文化中心"),
                text: tt(
                  "Bra, birthplace of Slow Food, is renowned for its cheese, wine, sausages, and home to Italy’s University of Gastronomic Sciences.",
                  "布拉是慢食运动的发源地，以奶酪、葡萄酒与香肠闻名，也是意大利美食科学大学的所在地。"
                ),
              },
              {
                term: tt("Tourist Place", "旅游目的地"),
                text: tt(
                  "Bra, with its historic Baroque churches, town hall, and medieval streets, is a popular tourist destination near the Alps, offering beautiful natural landscapes.",
                  "布拉有巴洛克教堂、市政厅与中世纪街道，又靠近阿尔卑斯山，自然景观优美，是颇受欢迎的旅游地。"
                ),
              },
              {
                term: tt("Art and Cultural Center", "艺术与文化中心"),
                text: tt(
                  "Bra, birthplace of the Slow Food movement, is renowned for its Italian culinary culture, cheese, wine, sausages, and the University of Gastronomic Sciences.",
                  "作为慢食运动的发源地，布拉以意大利饮食文化、奶酪、葡萄酒、香肠以及美食科学大学而知名。"
                ),
              },
              {
                term: tt("Global Organization", "全球性组织"),
                text: tt(
                  "Founded in 1989, Slow Food aims to oppose fast food culture and promote a food production and consumption approach that is “good, clean, and fair.”",
                  "慢食组织成立于 1989 年，旨在对抗快餐文化，推动「好的、干净的、公平的」食物生产与消费方式。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/3.jpg",
            size: "lg",
            caption: tt(
              "The Slow Food organization — philosophy, reach and partners.",
              "慢食组织 —— 理念、覆盖范围与合作方。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Organizational Philosophy", "组织理念"),
                text: tt(
                  "It promotes local culinary traditions, sustainable sourcing, and fair, healthy food practices.",
                  "推广本地饮食传统、可持续采购，以及公平而健康的食物实践。"
                ),
              },
              {
                term: tt("Global Organization", "全球性组织"),
                text: tt(
                  "Slow Food, now in 122 countries with over 83,000 members, collaborates with governments and international organizations to advocate for food safety, agricultural policy, and biodiversity.",
                  "慢食组织目前覆盖 122 个国家、拥有超过 83,000 名成员，与各国政府及国际组织合作，推动食品安全、农业政策与生物多样性议题。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/4.jpg",
            size: "md",
            caption: tt(
              "Osteria del Boccondivino — the site of the intervention, and the research findings behind it.",
              "Osteria del Boccondivino —— 项目介入的场地，以及背后的调研结论。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Slowfood", "慢食"),
                text: tt(
                  "Slow Food collaborates with many Italian restaurants, but Osteria del Boccondivino is the only official Slow Food restaurant.",
                  "慢食组织与许多意大利餐厅合作，但 Osteria del Boccondivino 是唯一的官方慢食餐厅。"
                ),
              },
              {
                term: tt("Visitor Traffic", "客流"),
                text: tt(
                  "Interviews and on-site recordings revealed that the restaurant’s weekday and Saturday visitor traffic exceeds typical levels by more than double, making it one of Italy’s top-performing establishments.",
                  "访谈与现场记录显示，这家餐厅在工作日与周六的客流超出同类两倍以上，是意大利经营表现最好的餐厅之一。"
                ),
              },
              {
                term: tt("Research Summary", "调研小结"),
                text: tt(
                  "The restaurant only accepts phone reservations, with 1 in 5 visitors turned away due to limits. Poor information synchronization results in unlisted random closures on Google Maps, occurring three times in seven surveys.",
                  "餐厅只接受电话预订，每五位到店客人中就有一位因位置已满被拒。信息同步不佳，Google 地图上没有标注的临时歇业，在七次走访中出现了三次。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "The constraint that shaped everything after this: demand was never the problem. A restaurant turning away one in five visitors doesn’t need more awareness — it needs a way to hold onto the people it cannot seat today.",
              "之后所有设计都被这个约束塑形：需求从来不是问题。一家要拒掉五分之一客人的餐厅，不需要更多知名度 —— 它需要一个办法，把今天坐不下的人留住。"
            ),
          },
        ],
      },
      {
        id: "design-task",
        eyebrow: tt("02 · Design task", "02 · 设计任务"),
        label: tt("Design task", "设计任务"),
        lead: tt(
          "Three outcomes the design had to serve at once.",
          "设计必须同时服务的三个结果。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/slow-food/31.jpg",
            caption: tt(
              "The design task, framed across the restaurant, the organization and the town.",
              "设计任务，放在餐厅、组织与城镇三个尺度上来看。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Innovative Experience", "创新体验"),
                text: tt(
                  "By combining online and offline innovative methods, we aim to enhance the “Slow Food” experience and service at the restaurant. We hope that users can feel the presence of “Slow Food” not only while tasting the cuisine but also through the production of ingredients and the preparation of food.",
                  "通过线上线下结合的创新方式，提升餐厅的「慢食」体验与服务。我们希望用户不只在品尝菜品时感受到慢食，也能在食材的生长与料理的过程中感受到它。"
                ),
              },
              {
                term: tt("Expand Slow Food’s Influence", "扩大慢食的影响力"),
                text: tt(
                  "We believe that user sharing is one of the most effective ways of spreading our message. Therefore, we hope that users will share their stories after their experience, becoming our advocates. This will enhance the influence of the Slow Food organization on social media, allowing more people to learn about Slow Food.",
                  "我们相信用户的分享是最有效的传播方式之一。因此希望用户在体验之后讲出自己的故事，成为我们的倡导者 —— 这会提升慢食组织在社交媒体上的影响力，让更多人了解慢食。"
                ),
              },
              {
                term: tt("Boost Bra’s Tourism Economy", "带动布拉的旅游经济"),
                text: tt(
                  "We hope that through this project, more people will be encouraged to travel to Bra, further boosting the local tourism industry.",
                  "我们希望通过这个项目吸引更多人前往布拉，进一步带动当地的旅游业。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "case-study",
        eyebrow: tt("03 · Case study", "03 · 案例研究"),
        label: tt("Case study", "案例研究"),
        lead: tt(
          "Four farm-to-table references, scored on the same five axes.",
          "四个「从农场到餐桌」的参考案例，按同样的五个维度打分。"
        ),
        blocks: [
          {
            text: tt(
              "Stedsans, Segev Kitchen Garden and Blue Hill were each rated on Innovative, Experience, Emotion, Comfortable and Sustainable, so the benchmark produced a comparable profile rather than a mood board.",
              "Stedsans、Segev Kitchen Garden 与 Blue Hill 各自在「创新、体验、情感、舒适、可持续」五项上被评分 —— 于是这份对标产出的是可比较的轮廓，而不是一张情绪板。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/5.jpg",
            caption: tt(
              "Benchmark — each reference scored on the same five criteria.",
              "对标 —— 每个参考案例都按同样的五项标准评分。"
            ),
          },
        ],
      },
      {
        id: "persona",
        eyebrow: tt("04 · Persona", "04 · 用户画像"),
        label: tt("Persona", "用户画像"),
        lead: tt(
          "Three visitors, three different reasons to slow down.",
          "三位到访者，三种慢下来的理由。"
        ),
        blocks: [
          {
            text: tt(
              "Emma Petit (41, lawyer) wants to escape the hustle and follow the natural order. Giulia Ferrari (25, student) travels to understand how other people live. Leonardo Rossi (33, doctor) wants unique cuisine without giving up a healthy diet.",
              "Emma Petit（41 岁，律师）想逃开忙乱，跟随自然的节律；Giulia Ferrari（25 岁，学生）旅行是为了理解别人怎么生活；Leonardo Rossi（33 岁，医生）想吃到独特的菜，又不愿放弃健康饮食。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/6.jpg",
            caption: tt(
              "Personas — hobbies, life goals and the line each one lives by.",
              "用户画像 —— 各自的爱好、人生目标，以及他们所信的那句话。"
            ),
          },
        ],
      },
      {
        id: "project-overview",
        eyebrow: tt("05 · Project overview", "05 · 项目总览"),
        label: tt("Project overview", "项目总览"),
        lead: tt(
          "One loop that runs from the app into the restaurant and back out again.",
          "一个闭环：从应用走进餐厅，再从餐厅走出来。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Seed card", "种子卡"),
              tt("Online planting", "线上种植"),
              tt("Harvest card", "收获卡"),
              tt("Restaurant", "餐厅"),
              tt("Community", "社区"),
            ],
          },
          {
            text: tt(
              "A seed card — ordinary or special edition — starts the online planting. Completing it earns a Harvest Card, which is redeemed at the restaurant for a planting experience, harvesting, and kitchen preparation using local ingredients. The visit then feeds the community, which sparks interest in Bra and returns as the next reservation.",
              "一张种子卡 —— 普通版或特别版 —— 开启线上种植。种成之后得到一张收获卡，到餐厅兑换为种植体验、采摘，以及用本地食材现场料理。这次到访又反哺社区，激起别人对布拉的兴趣，再变成下一笔预订。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/7.jpg",
            caption: tt(
              "Service system — how the app, the card, the restaurant and the community close the loop.",
              "服务系统 —— 应用、卡片、餐厅与社区如何把这个环闭上。"
            ),
          },
        ],
      },
      {
        id: "storyboard",
        eyebrow: tt("06 · Storyboard", "06 · 故事板"),
        label: tt("Storyboard", "故事板"),
        lead: tt("The same loop, told as one visitor’s day.", "同一个闭环，换成一位客人的一天来讲。"),
        blocks: [
          {
            text: tt(
              "Sofia hears about Slow Food from a friend, plants online, travels to Bra, books a table, harvests her own ingredients, watches the meal being prepared, and leaves with a story to share.",
              "Sofia 从朋友那里听说慢食，在线上种菜，前往布拉，订下位置，亲手采摘食材，看着这餐被做出来，带着一个可以讲的故事离开。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/8.jpg",
            caption: tt(
              "Storyboard — from the first conversation to the shared story.",
              "故事板 —— 从最初那次聊天，到最后被分享出去的故事。"
            ),
          },
        ],
      },
      {
        id: "app-design",
        eyebrow: tt("07 · App design", "07 · 应用设计"),
        label: tt("App design", "应用设计"),
        lead: tt("GROW — Slow Food Experience.", "GROW —— 慢食体验。"),
        blocks: [
          {
            type: "image",
            src: "/project/slow-food/9.jpg",
            caption: tt(
              "GROW — launch screen and onboarding, “Plant your slow dishes”.",
              "GROW —— 启动页与引导流程，「种出你的慢食」。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("1 · Online Planting", "1 · 线上种植"),
                text: tt(
                  "Online planting allows users to experience the growth process of vegetables and fruits from planting to maturity. Successful online planting can earn a Harvest Card, which can be exchanged for ingredients during a meal.",
                  "线上种植让用户体验蔬果从播种到成熟的完整过程。种植成功可获得一张收获卡，用餐时可兑换为食材。"
                ),
              },
              {
                term: tt("2 · Story Community", "2 · 故事社区"),
                text: tt(
                  "Here, users can share planting stories, dining experiences, and their insights on “Slow Food.” They can also read stories from others. We will feature interesting stories to attract more users through this method.",
                  "用户可以在这里分享种植故事、用餐体验，以及自己对「慢食」的理解，也能读到别人的故事。我们会推荐有意思的故事，以此吸引更多用户。"
                ),
              },
              {
                term: tt("3 · Restaurant Reservation", "3 · 餐厅预订"),
                text: tt(
                  "Users can book a restaurant reservation online and view the menu for the day. They can also learn about some activities the Slow Food organization is currently conducting.",
                  "用户可以在线预订餐厅、查看当天菜单，也能了解慢食组织正在进行的活动。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/10.jpg",
            caption: tt(
              "Get online seed card → experience online planting → obtain harvest card. Planting simulates seasonal change, weather and real growth; watering, pest control and fertilization run the full cycle.",
              "领取线上种子卡 → 体验线上种植 → 获得收获卡。种植会模拟季节更替、天气与真实生长；浇水、除虫、施肥，走完整个周期。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/11.jpg",
            caption: tt(
              "Planting home page and planting screens — planting-area temperature, plant status data, time to maturity, and the harvest operation once the plant is mature.",
              "种植首页与种植界面 —— 种植区温度、作物状态数据、距成熟时间，以及成熟后的采收操作。"
            ),
          },
          {
            type: "bullets",
            title: tt("Share community", "分享社区"),
            items: [
              tt(
                "Users can view photos and stories shared by other users.",
                "用户可以看到其他人分享的照片与故事。"
              ),
              tt(
                "Users can find check-in points during their journey in Bra, take photos to check in for more information, and receive random rewards.",
                "用户在布拉的行程中可以找到打卡点，拍照打卡获取更多信息，并随机获得奖励。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/12.jpg",
            caption: tt(
              "Story community — the shared feed, check-in points mapped across Bra, photo authentication and the seed-card reward.",
              "故事社区 —— 分享信息流、散布在布拉各处的打卡点、照片验证，以及种子卡奖励。"
            ),
          },
          {
            type: "bullets",
            title: tt("Restaurant booking", "餐厅预订"),
            items: [
              tt(
                "Users can see the latest activities of the restaurant, such as the release of a new season’s seed cards.",
                "用户可以看到餐厅的最新动态，比如新一季种子卡的发布。"
              ),
              tt(
                "Users can directly book a dinner reservation at the restaurant here.",
                "用户可以直接在这里预订餐厅的晚餐。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/13.jpg",
            caption: tt(
              "Today’s menu and the booking calendar — the fix for a phone-only reservation system.",
              "当日菜单与预订日历 —— 针对「只能电话预订」的解法。"
            ),
          },
        ],
      },
      {
        id: "space-design",
        eyebrow: tt("08 · Space design", "08 · 空间设计"),
        label: tt("Space design", "空间设计"),
        lead: tt(
          "Based on site surveys, the outdoor space of the restaurant has been redesigned — three main areas and one corridor.",
          "基于现场勘察，餐厅的室外空间被重新设计 —— 三个主要区域加一条走廊。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Planting Experience Area", "种植体验区"),
                text: tt(
                  "Using special online seed cards or harvest cards, users will have the opportunity to plant or harvest ingredients in the restaurant’s planting area. Harvested vegetables are included in the diner’s meal for free, and the hands-on experience helps deepen their understanding of the “Slow Food” philosophy.",
                  "凭特别版线上种子卡或收获卡，用户可以在餐厅的种植区亲手种下或采收食材。采收的蔬菜会免费加入这一餐，而这份亲手参与，让他们对「慢食」理念的理解更深一层。"
                ),
              },
              {
                term: tt("Open Kitchen", "开放厨房"),
                text: tt(
                  "The area has two parts. The reception service area moved to the entrance/exit to streamline restaurant flow — the original reception sat in an inside corner and was hard to find. The kitchen itself is transparent and open, so users can watch food being prepared while they eat.",
                  "这个区域分两部分。接待服务区被移到出入口，以理顺动线 —— 原来的接待台位于内侧角落，很难找到。厨房本身则是透明开放的，用户可以边吃边看菜被做出来。"
                ),
              },
              {
                term: tt("Exhibition Corridor", "展示走廊"),
                text: tt(
                  "There is a corridor at the restaurant entrance, with posters promoting programs and events on both sides.",
                  "餐厅入口处有一条走廊，两侧是宣传项目与活动的海报。"
                ),
              },
              {
                term: tt("Eating Area", "用餐区"),
                text: tt(
                  "In the outdoor dining area, users can comfortably enjoy their meals while watching the food preparation process, adding more enjoyment to their dining experience.",
                  "在室外用餐区，用户可以舒适地享用这一餐，同时看着料理的过程 —— 让这顿饭多一层乐趣。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/slow-food/16.jpg",
            caption: tt(
              "Plan — indoor dining, exhibition corridor, outdoor dining, open kitchen and planting area.",
              "平面图 —— 室内用餐、展示走廊、室外用餐、开放厨房与种植区。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/17.jpg",
            caption: tt("Exhibition corridor at the entrance.", "入口处的展示走廊。"),
          },
          {
            type: "image",
            src: "/project/slow-food/18.jpg",
            caption: tt(
              "Open kitchen — a front reception area moved to the entrance to streamline flow, and the kitchen itself opened up to the dining area.",
              "开放厨房 —— 接待区前移至入口以理顺动线，厨房本身向用餐区敞开。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/19.jpg",
            caption: tt(
              "Planting area — seed cards plant a crop here, harvest cards pick one, and what is harvested goes into the diner’s meal for free.",
              "种植区 —— 种子卡在这里种下作物，收获卡在这里采收，而采收所得免费进入这一餐。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/20.jpg",
            caption: tt("Eating area — the outdoor dining space.", "用餐区 —— 室外的用餐空间。"),
          },
        ],
      },
      {
        id: "user-journey",
        eyebrow: tt("09 · User journey", "09 · 用户旅程"),
        label: tt("User journey", "用户旅程"),
        lead: tt(
          "Sixteen steps, from a friend’s seed card back to a friend’s seed card.",
          "十六步 —— 从朋友递来的一张种子卡，回到递给朋友的一张种子卡。"
        ),
        blocks: [
          {
            text: tt(
              "Friend sharing → get the online seed card → start online planting → harvest → book a restaurant → explore city → take photos → obtain rewards → exhibition viewing → reception service → ingredient harvesting → ingredient delivery → dining → checkout → share stories → friend sharing.",
              "朋友分享 → 领取线上种子卡 → 开始线上种植 → 收获 → 预订餐厅 → 探索城市 → 拍照打卡 → 获得奖励 → 参观展示 → 接待服务 → 采摘食材 → 食材送厨 → 用餐 → 结账 → 分享故事 → 再分享给朋友。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/21.jpg",
            caption: tt(
              "User journey — the loop closes when the checkout hands over the next seed card.",
              "用户旅程 —— 当结账时递出下一张种子卡，这个环就闭上了。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The checkout is the hinge. Handing over a new seed card at the moment of payment is what turns a single visit into the start of the next one — the journey map is a circle rather than a line because of that one step.",
              "结账是那个铰链。在付钱的那一刻递出一张新的种子卡，把「一次到访」变成「下一次的开始」—— 正因为这一步，旅程图才是一个圆，而不是一条线。"
            ),
          },
        ],
      },
      {
        id: "design-visivo",
        eyebrow: tt("10 · Design visivo", "10 · 视觉设计"),
        label: tt("Design visivo", "视觉设计"),
        lead: tt(
          "Plant elements, unconstrained spacing, natural growth.",
          "植物元素、不受拘束的间距、自然的生长感。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/slow-food/22.jpg",
            caption: tt(
              "Logo — the G built from two sprouting leaves, on a construction grid.",
              "标志 —— 由两片新芽构成的 G，置于制图网格上。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/23.jpg",
            caption: tt(
              "Typefaces — PP Eiko for display, Sofia Pro for text.",
              "字体 —— 标题用 PP Eiko，正文用 Sofia Pro。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/24.jpg",
            caption: tt(
              "Palette — #249A48, #66B447, #4B80B8 and #231815.",
              "色板 —— #249A48、#66B447、#4B80B8 与 #231815。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/25.jpg",
            caption: tt(
              "Applications — seed card packaging, menus, posters, aprons, tableware and the social campaign.",
              "应用延展 —— 种子卡包装、菜单、海报、围裙、餐具与社交媒体投放。"
            ),
          },
        ],
      },
      {
        id: "business",
        eyebrow: tt("11 · Discounted cash flow", "11 · 现金流折现"),
        label: tt("Business case", "商业测算"),
        lead: tt(
          "According to the DCF neutral evaluation, the project can break even by the 10th quarter.",
          "按 DCF 中性情景测算，项目可在第 10 个季度回本。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/slow-food/26.jpg",
            caption: tt(
              "Cost structure — fixed costs across space, development, human resources and marketing; variable costs in ingredients.",
              "成本结构 —— 固定成本分布在空间、开发、人力与营销上，可变成本在食材上。"
            ),
          },
          {
            type: "image",
            src: "/project/slow-food/27.jpg",
            caption: tt(
              "Twelve-quarter model, across the development phase and the launch phase.",
              "十二个季度的测算模型，覆盖开发期与上线期。"
            ),
          },
          {
            type: "stats",
            items: [
              {
                value: tt("9th quarter", "第 9 季度"),
                label: tt("Optimistic", "乐观情景"),
                note: "NPV 341,761.62 · TIR 19.38%",
              },
              {
                value: tt("10th quarter", "第 10 季度"),
                label: tt("Neutral", "中性情景"),
                note: "NPV 159,615.85 · TIR 11.55%",
              },
              {
                value: tt("12th quarter", "第 12 季度"),
                label: tt("Pessimistic", "悲观情景"),
                note: "NPV 100,068.14 · TIR 8.17%",
              },
            ],
          },
          {
            text: tt(
              "All three scenarios return a positive NPV, so the question the model answers is not whether the project pays back but how long the restaurant has to carry it — between nine and twelve quarters.",
              "三种情景的净现值都为正，所以这个模型回答的不是「项目能不能回本」，而是「餐厅要扛多久」—— 九到十二个季度之间。"
            ),
          },
        ],
      },
    ],
  },
  hmi: {
    role: tt("UX/UI · HMI Design", "UX/UI · 人机交互设计"),
    summary: tt(
      "This project designs the transition from Manual to Autonomous Driving mode in self-driving cars. It includes creating interactive elements for a seamless and intuitive handover from driver to vehicle control.",
      "这个项目设计自动驾驶汽车从手动模式切换到自动模式的过程，包括为「驾驶员交给车辆」这一次控制权移交，设计顺畅而直觉的交互元素。"
    ),
    tags: [
      tt("HMI design", "HMI 设计"),
      tt("Automotive UX", "汽车体验设计"),
      tt("Interaction design", "交互设计"),
      tt("ProtoPie", "ProtoPie"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "HMI design for autonomous driving mode switching.",
          "自动驾驶模式切换的 HMI 设计。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/hmi/1.jpg",
            caption: tt(
              "Instrument cluster and central console, across manual and autonomous states.",
              "仪表盘与中控屏，在手动与自动两种状态下的样子。"
            ),
          },
        ],
      },
      {
        id: "brief",
        eyebrow: tt("01 · Design task brief", "01 · 设计任务"),
        label: tt("Design brief", "设计任务"),
        lead: tt("The handover moment is the design problem.", "交接的那一刻，就是设计问题本身。"),
        blocks: [
          {
            text: tt(
              "Introduction of fully autonomous cars is no longer a distant reality. As we prepare to design for vehicles capable of self-driving, the moment of handover of control from human (driver) to computer (vehicle) will be of great importance. This exercise is going to design this transition moment from Manual Driving mode to Autonomous Driving mode in a car.",
              "完全自动驾驶的汽车已不再遥远。当我们开始为能够自行驾驶的车辆做设计，控制权从人（驾驶员）交到计算机（车辆）手上的那一刻，就变得格外重要。这个课题要设计的，正是车内从手动驾驶模式切换到自动驾驶模式的那一刻。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("02 · Background", "02 · 背景"),
        label: tt("Background", "背景"),
        lead: tt(
          "Mode switching is now a core vehicle control function.",
          "模式切换，如今已是一项核心的车辆控制功能。"
        ),
        blocks: [
          {
            text: tt(
              "With the popularization of assisted driving functions such as L2 and L3, the mode switch between driver-controlled and vehicle-controlled driving has become an important vehicle control function.",
              "随着 L2、L3 等辅助驾驶功能普及，「由人控制」与「由车控制」之间的模式切换，已经成为一项重要的车辆控制功能。"
            ),
          },
          {
            type: "image",
            src: "/project/hmi/2.jpg",
            size: "lg",
            caption: tt(
              "SAE levels 0–5, from no driving automation to full driving automation.",
              "SAE 的 0–5 级，从完全无自动化到完全自动驾驶。"
            ),
          },
        ],
      },
      {
        id: "interview",
        eyebrow: tt("03 · User interview", "03 · 用户访谈"),
        label: tt("User interview", "用户访谈"),
        lead: tt(
          "Three drivers already living with L2/L3 systems.",
          "三位已经天天在用 L2/L3 系统的驾驶员。"
        ),
        blocks: [
          {
            text: tt(
              "Yang (35, Guangzhou, Avatr 11 with Huawei ADS 2.0), Hu (29, Shenzhen, AITO M5 with Huawei ADS 2.0) and Gao (24, Shenzhen, BMW 325Li M) described where the current systems lose them.",
              "杨（35 岁，广州，阿维塔 11 配华为 ADS 2.0）、胡（29 岁，深圳，问界 M5 配华为 ADS 2.0）与高（24 岁，深圳，宝马 325Li M）分别讲了现有系统在哪些地方让他们失去信心。"
            ),
          },
          {
            type: "image",
            src: "/project/hmi/3.jpg",
            caption: tt(
              "Interview output — what each driver actually said about autonomous driving.",
              "访谈产出 —— 每位驾驶员对自动驾驶的原话。"
            ),
          },
          {
            type: "bullets",
            title: tt("Output", "结论"),
            items: [
              tt("1 / Safety issues", "1 / 安全问题"),
              tt("2 / Trust issues", "2 / 信任问题"),
              tt("3 / Insufficient alerts", "3 / 提示不足"),
            ],
          },
          {
            type: "note",
            text: tt(
              "The quotes split cleanly into two different problems. Yang and Hu describe a capability gap — the system is “dumb” in complex conditions. Gao describes a liability gap — “if an accident happens in autonomous driving mode, who will be responsible?” Interface design can only answer the first. That boundary is worth naming rather than designing past.",
              "这些原话干净地分成两类问题。杨与胡说的是能力差距 —— 复杂路况下系统「太笨」；高说的是责任归属 ——「如果在自动驾驶模式下出了事故，谁负责？」界面设计只能回答前者。这条边界值得说清楚，而不是绕过去硬做。"
            ),
          },
        ],
      },
      {
        id: "scenario",
        eyebrow: tt("04 · Scenario analysis", "04 · 场景分析"),
        label: tt("Scenario analysis", "场景分析"),
        lead: tt(
          "Three ways a driver arrives in autonomous mode.",
          "驾驶员进入自动驾驶模式的三条路。"
        ),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "Directly enter autonomous driving mode — user starts the car, sets navigation, enters autonomous driving mode.",
                "直接进入自动驾驶模式 —— 用户启动车辆、设定导航、进入自动驾驶。"
              ),
              tt(
                "Manual mode transitioning to autonomous driving mode — the scenario this project designs for.",
                "从手动模式切换到自动驾驶模式 —— 本项目要设计的场景。"
              ),
              tt(
                "Re-enter after exiting — autonomous driving failure warning, driver takes control, system indicates autonomous driving is available again.",
                "退出后再次进入 —— 自动驾驶失效告警、驾驶员接管、系统提示自动驾驶重新可用。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/hmi/4.jpg",
            caption: tt(
              "Scenario analysis — the middle path, manual into autonomous, is the one taken forward.",
              "场景分析 —— 中间那条「手动转自动」，是被选中继续深入的一条。"
            ),
          },
        ],
      },
      {
        id: "journey",
        eyebrow: tt("05 · User journey map", "05 · 用户旅程图"),
        label: tt("User journey map", "用户旅程图"),
        lead: tt(
          "Five stages, from getting in the car to driving it again.",
          "五个阶段 —— 从上车，到再次自己开。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Ready to depart", "准备出发"),
              tt("Manual driving", "手动驾驶"),
              tt("Preparing to enter", "准备切换"),
              tt("Autonomous mode", "自动驾驶"),
              tt("Exiting", "退出"),
            ],
          },
          {
            type: "image",
            src: "/project/hmi/13.jpg",
            caption: tt(
              "Journey map — entry and exit are mirrored sequences, each with its own confirmation and notification.",
              "旅程图 —— 进入与退出是互为镜像的两段流程，各有自己的确认与提示。"
            ),
          },
        ],
      },
      {
        id: "summary",
        eyebrow: tt("06 · Analysed summary", "06 · 分析小结"),
        label: tt("Analysed summary", "分析小结"),
        lead: tt("Three problems the design has to solve.", "设计必须解决的三个问题。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("1 · Safety", "1 · 安全"),
                text: tt(
                  "Continuous monitoring and timely warnings under static/dynamic scenarios.",
                  "在静态与动态场景下持续监测，并及时告警。"
                ),
              },
              {
                term: tt("2 · Trust issues", "2 · 信任"),
                text: tt(
                  "Drivers’ trust issues with the autonomous driving system.",
                  "驾驶员对自动驾驶系统的信任问题。"
                ),
              },
              {
                term: tt("3 · Operational efficiency", "3 · 操作效率"),
                text: tt(
                  "Simplify operational pathways through multiple channels, while preventing accidental entry into autonomous driving mode. Different scenarios can use different interaction methods.",
                  "用多种通道简化操作路径，同时防止误入自动驾驶模式。不同场景可以用不同的交互方式。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "Efficiency and error prevention pull in opposite directions here: every channel added to make entry easier is another way to enter the mode by accident. The voice flow’s confirmation step is where that tension gets resolved explicitly.",
              "效率与防误操作在这里往两个方向拉：每多一条让进入更容易的通道，就多一条误入的路径。语音流程里的那一步确认，就是这股张力被明确化解的地方。"
            ),
          },
        ],
      },
      {
        id: "plan",
        eyebrow: tt("07 · Design plan", "07 · 设计方案"),
        label: tt("Design plan", "设计方案"),
        lead: tt(
          "Tell the driver what the car is doing, before it needs them back.",
          "在车需要人接手之前，先让人知道车在做什么。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/hmi/6.jpg",
            size: "md",
            caption: tt(
              "Status breathing light — green for normal, orange for possible takeover, red for manual takeover required.",
              "状态呼吸灯 —— 绿色表示正常，橙色表示可能需要接管，红色表示必须手动接管。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Status Breathing Light", "状态呼吸灯"),
                text: tt(
                  "The complexity of the situation is displayed through the status light, informing the driver of the driving status.",
                  "用状态灯呈现当前路况的复杂程度，让驾驶员知道行驶状态。"
                ),
              },
              {
                term: tt("Seat Vibration Takeover Alert", "座椅振动接管提示"),
                text: tt(
                  "When the driver needs to take over the steering wheel, pre-alert through seat vibration to warn the driver.",
                  "当驾驶员需要接手方向盘时，通过座椅振动提前预警。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/hmi/7.jpg",
            size: "sm",
            caption: tt(
              "Seat vibration — a haptic pre-alert that does not compete for the driver’s eyes.",
              "座椅振动 —— 一种不跟眼睛抢注意力的触觉预警。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The light and the vibration are deliberately different channels. The breathing light is ambient and continuous — it answers “how is it going?” without being asked. The seat is interruptive and only fires once attention is actually required. Putting both on screen would have meant the driver has to look at a display to learn they need to look at the road.",
              "灯与振动被刻意放在两条不同的通道上。呼吸灯是环境性的、持续的 —— 它不用被问就回答「现在怎么样」；座椅是打断性的，只在真的需要注意力时才触发。如果两者都放在屏幕上，就意味着驾驶员得先看屏幕，才知道自己该看路。"
            ),
          },
        ],
      },
      {
        id: "switching",
        eyebrow: tt("08 · Switching methods", "08 · 切换方式"),
        label: tt("Three switching methods", "三种切换方式"),
        lead: tt(
          "One mode, three ways in — matched to what the driver’s hands and eyes are already doing.",
          "一个模式，三种进入方式 —— 各自配合驾驶员此刻的手与眼在做什么。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Voice interaction", "语音交互"),
                text: tt(
                  "Enter voice command to switch to autonomous driving mode.",
                  "说出语音指令，切换到自动驾驶模式。"
                ),
              },
              {
                term: tt("Mechanical interaction", "机械交互"),
                text: tt(
                  "Pull the lever twice to enter autonomous driving mode.",
                  "连拨两次拨杆，进入自动驾驶模式。"
                ),
              },
              {
                term: tt("Interface interaction", "界面交互"),
                text: tt(
                  "Select “Autonomous Driving” on the central control panel.",
                  "在中控屏上选择「自动驾驶」。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "voice",
        eyebrow: tt("09 · Voice interaction", "09 · 语音交互"),
        label: tt("Voice interaction", "语音交互"),
        lead: tt("Evoke → command → confirm → enter.", "唤醒 → 指令 → 确认 → 进入。"),
        blocks: [
          {
            type: "image",
            src: "/project/hmi/11.jpg",
            caption: tt(
              "G-Va — the voice assistant dialogue, and the four-step flow behind it.",
              "G-Va —— 语音助手的对话，以及它背后的四步流程。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Convenience", "便捷"),
                text: tt(
                  "Activate autonomous driving through simple voice commands without manual operation.",
                  "用简单的语音指令开启自动驾驶，无需动手操作。"
                ),
              },
              {
                term: tt("Safety", "安全"),
                text: tt(
                  "Allows the driver to activate autonomous driving while keeping both hands on the wheel, reducing distractions.",
                  "让驾驶员双手不离方向盘也能开启自动驾驶，减少分心。"
                ),
              },
              {
                term: tt("Error Prevention", "防误操作"),
                text: tt(
                  "Voice confirmation commands prevent accidental entry into autonomous driving mode.",
                  "语音确认指令，避免误入自动驾驶模式。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "mechanical",
        eyebrow: tt("10 · Mechanical interaction", "10 · 机械交互"),
        label: tt("Mechanical interaction", "机械交互"),
        lead: tt(
          "Toggle the levers twice to enter autonomous driving mode.",
          "连拨两次拨杆，进入自动驾驶模式。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/hmi/before13.jpg",
            caption: tt(
              "Lever toggle — a deliberate double action, so the mode cannot be entered by a single accidental knock.",
              "拨杆切换 —— 刻意设成两次动作，避免被一次误碰就进入该模式。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Precision", "精确"),
                text: tt(
                  "Mechanical controls typically provide accurate input, reducing the possibility of errors.",
                  "机械控件通常能提供准确的输入，降低出错的可能。"
                ),
              },
              {
                term: tt("Intuitiveness", "直觉"),
                text: tt(
                  "Physical buttons and switches offer more intuitive and easily understandable operations.",
                  "实体按键与开关的操作更直觉、更容易被理解。"
                ),
              },
              {
                term: tt("Immediate Feedback", "即时反馈"),
                text: tt(
                  "Immediate physical feedback confirms the user’s actions.",
                  "即时的物理反馈，确认用户的操作已经生效。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "interface",
        eyebrow: tt("11 · Interface design", "11 · 界面设计"),
        label: tt("Interface design", "界面设计"),
        lead: tt(
          "Where the driver can actually see and reach.",
          "驾驶员真正看得到、伸手够得着的地方。"
        ),
        blocks: [
          {
            text: tt(
              "The dashboard has a visible area and two blind-spot corners behind the wheel rim; the central console splits into optimal, easy-to-touch and hard-to-touch zones. Both constrain where mode-critical information and controls can live.",
              "仪表盘有一块可视区域，以及被方向盘轮辐遮住的两个盲角；中控屏则分为最佳区、易触区与难触区。这两点共同限定了「与模式相关的关键信息与控件」能放在哪里。"
            ),
          },
          {
            type: "image",
            src: "/project/hmi/5.jpg",
            caption: tt(
              "Visible area and blind spots on the dashboard; reach zones on the central console display.",
              "仪表盘的可视区与盲区；中控屏的可触及分区。"
            ),
          },
          {
            type: "image",
            src: "/project/hmi/14.jpg",
            caption: tt(
              "Dashboard design — wireframe, then manual and autonomous states. The background colour changes and an icon prompt is added to indicate the road supports autonomous driving.",
              "仪表盘设计 —— 先是线框，然后是手动与自动两种状态。背景色会变化，并加入一个图标提示，表明当前道路支持自动驾驶。"
            ),
          },
          {
            type: "image",
            src: "/project/hmi/15.jpg",
            caption: tt(
              "Central console design — in manual mode, a 3D navigation map suits drivers attending to route and road; in autonomous mode the map drops to 2D and minimises, giving room to entertainment and other content.",
              "中控屏设计 —— 手动模式下用 3D 导航地图，契合驾驶员对路线与路况的关注；自动模式下地图降为 2D 并缩小，把空间让给娱乐与其他内容。"
            ),
          },
          {
            type: "note",
            text: tt(
              "This is the clearest expression of the whole project: the same screen carries different information density depending on who is driving. The interface doesn’t just report the mode change — it behaves as though the mode changed.",
              "这是整个项目最清楚的一次表达：同一块屏幕，根据「此刻是谁在开」承载不同的信息密度。界面不只是在报告模式变了 —— 它的行为本身就像模式真的变了。"
            ),
          },
        ],
      },
      {
        id: "transition",
        eyebrow: tt("12 · Mode transition", "12 · 模式切换"),
        label: tt("Mode transition", "模式切换"),
        lead: tt(
          "What changes, all at once, at the moment of handover.",
          "交接的那一刻，有哪些东西同时改变。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Prompt voice", "语音提示"),
              tt("Breathing light on", "呼吸灯亮起"),
              tt("Dashboard change", "仪表盘切换"),
              tt("Console change", "中控屏切换"),
            ],
          },
          {
            type: "image",
            src: "/project/hmi/16.jpg",
            caption: tt(
              "Manual to autonomous — prompt voice, the breathing light coming on, and the two displays changing together.",
              "手动转自动 —— 语音提示、呼吸灯亮起，以及两块屏幕一同切换。"
            ),
          },
        ],
      },
      {
        id: "prototype",
        eyebrow: tt("13 · Prototype", "13 · 原型"),
        label: tt("Prototype", "原型"),
        lead: tt("Built and testable in ProtoPie.", "用 ProtoPie 做成，可以直接试。"),
        blocks: [
          {
            type: "image",
            src: "/project/hmi/17.jpg",
            size: "sm",
            caption: tt("G-Va, the in-car voice assistant.", "G-Va，车内语音助手。"),
          },
          {
            type: "links",
            items: [
              {
                label: tt("Open the ProtoPie prototype", "打开 ProtoPie 原型"),
                href: "https://cloud.protopie.io/p/9e757d1212756acd5da5a625",
                note: tt(
                  "The interactive mode-switching prototype, running in the browser.",
                  "可交互的模式切换原型，直接在浏览器里运行。"
                ),
              },
            ],
          },
          {
            type: "bullets",
            title: tt("Before you try it", "试用之前"),
            items: [
              tt(
                "ProtoPie cannot activate voice recognition through a voice command, so when G-Va appears you need to click G-Va first. After clicking, normal voice interaction can proceed.",
                "ProtoPie 无法用语音指令唤起语音识别，所以当 G-Va 出现时，需要先点一下 G-Va，之后就能正常进行语音交互。"
              ),
              tt(
                "The keyword to activate the autonomous driving mode is “autonomous driving mode”.",
                "开启自动驾驶模式的关键词是「autonomous driving mode」。"
              ),
            ],
          },
          {
            type: "video",
            src: "https://www.youtube.com/embed/DHkhgsyEwds",
            title: tt(
              "HMI Design for Autonomous Driving Mode Switching",
              "自动驾驶模式切换的 HMI 设计"
            ),
            caption: tt(
              "Walkthrough of the full mode-switching interaction.",
              "完整模式切换交互的演示。"
            ),
          },
        ],
      },
    ],
  },
  tide: {
    role: tt("UX/UI Designer", "UX/UI 设计师"),
    summary: tt(
      "Tide is an Italian digital consulting and design studio. This project involves designing the website for the studio.",
      "Tide 是一家意大利的数字咨询与设计工作室。这个项目是为它设计官方网站。"
    ),
    tags: [
      tt("UX/UI design", "UX/UI 设计"),
      tt("Website design", "网页设计"),
      tt("Mobile design", "移动端设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt("TIDE — studio website design.", "TIDE —— 工作室网站设计。"),
        blocks: [
          {
            type: "image",
            src: "/project/tide/1.jpg",
            caption: tt(
              "The finished site — an underwater world for a studio named after the tide.",
              "完成的网站 —— 为一家以「潮」为名的工作室造的一个水下世界。"
            ),
          },
        ],
      },
      {
        id: "introduction",
        eyebrow: tt("01 · Introduction", "01 · 介绍"),
        label: tt("Introduction", "介绍"),
        lead: tt("“Put us to the test.”", "「来考考我们。」"),
        blocks: [
          {
            type: "image",
            src: "/project/tide/2.jpg",
            size: "md",
            caption: tt("The TIDE wordmark.", "TIDE 的字标。"),
          },
          {
            type: "note",
            text: tt(
              "Mission — to spread digital culture, be your daily source of inspiration, and even help your grandmother understand what you do. This is our mission: put us to the test.",
              "使命 —— 传播数字文化，成为你每天的灵感来源，甚至让你奶奶也能明白你在做什么。这就是我们的使命：来考考我们。"
            ),
          },
          {
            text: tt(
              "That last line is the brief in disguise. A studio whose mission is to be understood by anyone cannot have a website that reads as industry jargon, which is what pushes the design toward an illustrated, explorable world rather than a conventional agency page.",
              "最后那句话其实就是伪装过的设计命题。一家以「让任何人都看得懂」为使命的工作室，官网不可能满是行业术语 —— 这正是把设计推向一个可探索的插画世界，而不是一张常规代理公司页面的原因。"
            ),
          },
        ],
      },
      {
        id: "moodboard",
        eyebrow: tt("02 · Moodboard", "02 · 情绪板"),
        label: tt("Moodboard", "情绪板"),
        lead: tt(
          "Sea, sun and shoreline, in flat blues and yellow.",
          "海、阳光与海岸线，用扁平的蓝与黄。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/tide/3.jpg",
            caption: tt(
              "Moodboard — waves, dunes, horizons and halftone textures in a blue and yellow palette.",
              "情绪板 —— 浪、沙丘、地平线与网点肌理，统一在蓝黄色板里。"
            ),
          },
        ],
      },
      {
        id: "sitemap",
        eyebrow: tt("03 · Site map", "03 · 站点地图"),
        label: tt("Site map", "站点地图"),
        lead: tt("Five top-level sections.", "五个一级栏目。"),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Who we are", "我们是谁"),
              tt("What we do", "我们做什么"),
              tt("On wave", "浪上"),
              tt("Community", "社区"),
              tt("Contact", "联系"),
            ],
          },
          {
            type: "image",
            src: "/project/tide/4.jpg",
            caption: tt(
              "Site map — What we do and On wave each open into single-project pages, with a 404 page planned from the start.",
              "站点地图 —— 「我们做什么」与「浪上」各自通向单项目页面，404 页面从一开始就在规划里。"
            ),
          },
        ],
      },
      {
        id: "wireframe",
        eyebrow: tt("04 · Wireframe", "04 · 线框"),
        label: tt("Wireframe", "线框"),
        lead: tt("Structure first, on both breakpoints.", "先定结构，两个断点一起。"),
        blocks: [
          {
            type: "image",
            src: "/project/tide/5.jpg",
            caption: tt(
              "Website wireframes — every page laid out end to end.",
              "网站线框 —— 每一页从头到尾排开。"
            ),
          },
          {
            type: "image",
            src: "/project/tide/6.jpg",
            caption: tt(
              "Mobile wireframes — the same structure reflowed to one column.",
              "移动端线框 —— 同一套结构，重排成单列。"
            ),
          },
        ],
      },
      {
        id: "draft-one",
        eyebrow: tt("05 · Draft one", "05 · 初稿一"),
        label: tt("Draft one", "初稿一"),
        lead: tt("Yellow and blue, cut by wave-shaped edges.", "黄与蓝，被波浪形的边缘切开。"),
        blocks: [
          {
            type: "image",
            src: "/project/tide/7.jpg",
            caption: tt("Draft one — desktop and mobile side by side.", "初稿一 —— 桌面端与移动端并排。"),
          },
          { type: "image", src: "/project/tide/8.jpg", caption: tt("The full draft-one flow.", "初稿一的完整流程。") },
        ],
      },
      {
        id: "draft-two",
        eyebrow: tt("06 · Draft two", "06 · 初稿二"),
        label: tt("Draft two", "初稿二"),
        lead: tt("A second pass at the same structure.", "在同一套结构上再走一遍。"),
        blocks: [
          {
            type: "image",
            src: "/project/tide/9.jpg",
            caption: tt("Draft two — desktop and mobile.", "初稿二 —— 桌面端与移动端。"),
          },
          { type: "image", src: "/project/tide/10.jpg", caption: tt("The full draft-two flow.", "初稿二的完整流程。") },
        ],
      },
      {
        id: "final",
        eyebrow: tt("07 · Final concept", "07 · 最终方案"),
        label: tt("Final concept", "最终方案"),
        lead: tt("Go under the surface.", "潜到水面之下。"),
        blocks: [
          {
            text: tt(
              "The final direction drops the shoreline and puts the visitor below the waterline — deep navy, seahorses, coral and pearl-lit shelves, with yellow kept as the accent that marks every action.",
              "最终方向舍掉海岸线，把访客带到水面以下 —— 深海军蓝、海马、珊瑚与珍珠点亮的礁架，而黄色被留作点缀，用来标记每一个可操作的动作。"
            ),
          },
          {
            type: "image",
            src: "/project/tide/11.jpg",
            caption: tt(
              "Homepage — navigation, studio introduction, Our Work, Community and Contact, stacked down one continuous seabed.",
              "首页 —— 导航、工作室介绍、作品、社区与联系，沿着一片连续的海床依次向下排布。"
            ),
          },
          {
            type: "image",
            src: "/project/tide/12.jpg",
            caption: tt(
              "Interior pages carrying the same illustrated world.",
              "内页延续同一个插画世界。"
            ),
          },
          {
            type: "image",
            src: "/project/tide/13.jpg",
            caption: tt("Further pages from the final concept.", "最终方案的其他页面。"),
          },
          {
            type: "image",
            src: "/project/tide/14.jpg",
            caption: tt(
              "404 — “Mi hai ritrovato!” The error page is part of the world rather than an exception to it.",
              "404 ——「Mi hai ritrovato！」错误页是这个世界的一部分，而不是它的例外。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The 404 is the detail that proves the concept. It was in the site map from the beginning and it keeps the illustration and the voice intact, so the one page a visitor reaches by accident still sounds like the studio.",
              "404 是那个证明概念成立的细节。它从一开始就在站点地图里，插画与语气都保持完整 —— 于是访客唯一一个误入的页面，听起来仍然像这家工作室。"
            ),
          },
        ],
      },
      {
        id: "prototyping",
        eyebrow: tt("08 · Prototyping", "08 · 原型"),
        label: tt("Prototyping", "原型"),
        lead: tt("Clickable, on both breakpoints.", "两个断点都能点。"),
        blocks: [
          { type: "image", src: "/project/tide/15.jpg", caption: tt("Desktop prototype.", "桌面端原型。") },
          {
            type: "image",
            src: "/project/tide/16.jpg",
            caption: tt("Mobile prototype — “Cosa facciamo”.", "移动端原型 ——「Cosa facciamo」。"),
          },
          {
            type: "links",
            items: [
              {
                label: tt("Figma prototype — website", "Figma 原型 —— 网站"),
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=164%3A2180&node-id=695-5880&viewport=1996%2C-7389%2C0.14&t=tmlbfG0q5vuygwqL-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=695%3A6450",
                note: tt("The desktop site, clickable in Figma.", "桌面端网站，在 Figma 里可点击。"),
              },
              {
                label: tt("Figma prototype — mobile", "Figma 原型 —— 移动端"),
                href: "https://www.figma.com/proto/eDGeo82EfFAId4IMVqHtWq/Wireframe---redesign?page-id=44%3A6640&node-id=914-22478&viewport=472%2C-4392%2C0.25&t=05eNX3ysNf4cawCZ-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=914%3A22478",
                note: tt("The mobile site, clickable in Figma.", "移动端网站，在 Figma 里可点击。"),
              },
            ],
          },
        ],
      },
    ],
  },
  codemao: {
    role: tt("UX/UI Designer", "UX/UI 设计师"),
    summary: tt(
      "Codemao Programming Online Education provides a specialized CMS platform designed as a digital management backend for schools, educational institutions, and online education providers. This platform streamlines the management and organization of educational content, offering tools for content creation, user management, data analysis, and course administration, all in one integrated system.",
      "编程猫在线编程教育提供一套专门的 CMS 平台，作为学校、教育机构与在线教育服务商的数字化管理后台。它把教学内容的管理与组织理顺，在一个系统里同时提供内容创建、用户管理、数据分析与课程管理的工具。"
    ),
    tags: [
      tt("ToB design", "ToB 设计"),
      tt("CMS platform", "CMS 平台"),
      tt("UX/UI", "UX/UI"),
      tt("Design system", "设计系统"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt("A B-side platform upgrade, shipped in three weeks.", "一次 B 端平台升级，三周交付。"),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/1.jpg",
            caption: tt(
              "The Codemao CMS platform — course management for schools and training institutions.",
              "编程猫 CMS 平台 —— 面向学校与培训机构的课程管理。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("01 · Background", "01 · 背景"),
        label: tt("Background", "背景"),
        lead: tt("A company moving from consumer to business.", "一家正从 C 端转向 B 端的公司。"),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/company.jpg",
            size: "sm",
            caption: tt(
              "Codemao — the top programming education company in China.",
              "编程猫 —— 中国头部的编程教育公司。"
            ),
          },
          {
            text: tt(
              "Codemao: the top programming education companies in China. With a mission to “let children enjoy the fun of creative coding,” Codemao focuses on independently developing programming tools for young learners. It provides online and offline coding education for children aged 7–16.",
              "编程猫是中国头部的编程教育公司之一。以「让孩子享受创造编程的乐趣」为使命，专注自主研发面向低龄学习者的编程工具，为 7–16 岁儿童提供线上与线下的编程教育。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/market.jpg",
            size: "lg",
            caption: tt(
              "The B-end business — partnerships with schools and external training institutions.",
              "B 端业务 —— 与学校及校外培训机构的合作。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Shift from C-end to B-end business", "从 C 端转向 B 端"),
                text: tt(
                  "Under the national educational policy of reducing double pressures, the company is shifting its main focus from C-end (consumer) to B-end (business). The B-end business primarily involves partnerships with schools and external training institutions.",
                  "在「双减」政策背景下，公司把主要重心从 C 端转向 B 端。B 端业务主要是与学校及校外培训机构合作。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "demand",
        eyebrow: tt("02 · Demand", "02 · 需求"),
        label: tt("The brief", "需求背景"),
        lead: tt("B-side business platform upgrade 2.0.", "B 端业务平台升级 2.0。"),
        blocks: [
          {
            type: "defs",
            items: [
              { term: tt("Users", "用户"), text: tt("School teachers and students.", "学校的老师与学生。") },
              {
                term: tt("Goal", "目标"),
                text: tt(
                  "Enable more teachers and students to use the Codemao platform to complete programming courses.",
                  "让更多老师与学生，能用编程猫平台完整地上完编程课。"
                ),
              },
              {
                term: tt("Task content", "工作内容"),
                text: tt(
                  "Analyze issues based on user interviews and backend data. Perform demand analysis by combining user needs and journey. Collaborate with the PM to prioritize requirements. Complete P0-level requirements. Coordinate demand alignment with developers.",
                  "基于用户访谈与后台数据分析问题；结合用户需求与旅程做需求分析；与产品经理一起排需求优先级；完成 P0 级需求；与开发对齐需求。"
                ),
              },
              {
                term: tt("Demand timeline", "时间安排"),
                text: tt(
                  "Three weeks, with a one-week turnaround for each interaction.",
                  "共三周，每一版交互一周内出。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "reason",
        eyebrow: tt("03 · Reason for upgrade", "03 · 升级的原因"),
        label: tt("Why now", "为什么是现在"),
        lead: tt(
          "Two reasons to rebuild, and two reasons it could not be a rebuild.",
          "两个必须重做的理由，以及两个「不能重做」的理由。"
        ),
        blocks: [
          { text: tt("Because…", "因为……") },
          {
            type: "defs",
            items: [
              {
                term: tt("Unable to meet current user needs", "已经满足不了现在的用户需求"),
                text: tt(
                  "Due to previous focus on C-end business, the B-end business platform has not been updated for a long time and can no longer meet current user needs.",
                  "由于此前重心在 C 端，B 端平台长期没有更新，已经无法满足当下的用户需求。"
                ),
              },
              {
                term: tt("Seeking more partnerships", "争取更多合作"),
                text: tt(
                  "The goal is to use the upgraded product to secure more campus partnerships.",
                  "希望用升级后的产品，拿下更多校园合作。"
                ),
              },
            ],
          },
          { text: tt("However…", "但是……") },
          {
            type: "defs",
            items: [
              {
                term: tt("Framework confusion and feature redundancy", "框架混乱、功能冗余"),
                text: tt(
                  "Previous “quick fixes” have led to a confusing structure with some redundant features.",
                  "此前的「快速修补」让结构变得混乱，还留下一些冗余功能。"
                ),
              },
              {
                term: tt("Inability to conduct a complete overhaul", "无法彻底重构"),
                text: tt(
                  "With the need to enter campuses before September, time is limited, making a large-scale overhaul unfeasible. The focus will be on meeting prioritized needs.",
                  "必须在九月前进校，时间有限，大规模重构不可行。重点放在满足优先级最高的需求。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "This is the constraint that defines the whole project. The structural problem and the deadline point in opposite directions, so the work could not be “fix the framework” — it had to be a prioritised set of P0 changes that leave the broken structure standing. Worth being honest that this is triage, not a redesign.",
              "这个约束定义了整个项目。结构问题与交付期限指向相反的方向，所以工作不可能是「修好框架」—— 只能是一组排好优先级的 P0 改动，而把那个有问题的结构留在原地。老实说，这是分诊，不是重设计。"
            ),
          },
        ],
      },
      {
        id: "data",
        eyebrow: tt("04 · Data analysis", "04 · 数据分析"),
        label: tt("Data analysis", "数据分析"),
        lead: tt(
          "Teachers visit the platform. They do not teach from it.",
          "老师会打开平台，但不用它上课。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/4.jpg",
            caption: tt(
              "Weekly teaching-related data for teachers’ activity — visit rate, teaching rate and weekly average teaching sessions.",
              "老师教学相关的周度数据 —— 访问率、授课率与周均授课次数。"
            ),
          },
          {
            type: "stats",
            items: [
              {
                value: "75%",
                label: tt("Platform visits", "平台访问率"),
                note: tt("Teachers do come to the platform.", "老师确实会来平台。"),
              },
              {
                value: "55%",
                label: tt("Using platform courseware for teaching", "使用平台课件授课"),
                note: tt(
                  "Only — platform courseware do not fully meet teaching needs.",
                  "仅此 —— 平台课件没有完全满足教学需要。"
                ),
              },
              {
                value: "80%+",
                label: tt("Course video playback", "课程视频播放率"),
                note: tt("Videos get opened.", "视频是会被打开的。"),
              },
              {
                value: "7.69%",
                label: tt("Effective video playback rate", "视频有效播放率"),
                note: tt(
                  "Only — platform courseware serve as reference and supplementary teaching aids, not the lesson itself.",
                  "仅此 —— 平台课件只是参考与补充教具，而不是这堂课本身。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "The gap between 80% playback and 7.69% effective playback is the entire finding. The courseware isn’t being rejected — it’s being opened, sampled, and abandoned, which points at the format of the material rather than its existence.",
              "80% 的播放率与 7.69% 的有效播放率之间的落差，就是全部的发现。课件没有被拒绝 —— 它被打开、被试了几眼、然后被放下，这指向的是材料的形式，而不是它存不存在。"
            ),
          },
        ],
      },
      {
        id: "interview",
        eyebrow: tt("05 · User interview", "05 · 用户访谈"),
        label: tt("User interview", "用户访谈"),
        lead: tt("What teachers actually do instead.", "老师实际上是怎么做的。"),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "Many teachers directly use self-created PPT lessons instead of the Codemao platform.",
                "许多老师直接用自己做的 PPT 上课，而不用编程猫平台。"
              ),
              tt(
                "The courseware are primarily video-based, but the video resolution is relatively low — single videos contain multiple teaching segments/tasks.",
                "课件以视频为主，但清晰度偏低 —— 一个视频里塞着多个教学环节与任务。"
              ),
              tt(
                "Teachers expect their teaching content to be integrated into the platform, but they are unable to edit courseware.",
                "老师希望把自己的教学内容整合进平台，但课件无法编辑。"
              ),
              tt(
                "During teaching, teachers need to switch between course videos, documents, and creation tools.",
                "上课过程中，老师需要在课程视频、文档与创作工具之间来回切换。"
              ),
            ],
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Flexibility and compatibility", "灵活性与兼容性"),
                text: tt(
                  "Platform courseware lack flexibility and compatibility.",
                  "平台课件缺乏灵活性与兼容性。"
                ),
              },
              {
                term: tt("Format and experience", "形式与体验"),
                text: tt(
                  "Demand for multiple course formats; the teaching experience needs improvement.",
                  "需要多种课程形式；授课体验有待提升。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "problem",
        eyebrow: tt("06 · Problem identification", "06 · 问题定位"),
        label: tt("Problem identification", "问题定位"),
        lead: tt(
          "Four problems, scoped to what three weeks could reach.",
          "四个问题，范围收在三周能做到的程度内。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Switching wastes teaching time", "切换浪费上课时间"),
                text: tt(
                  "Course materials are mainly video-based, and teachers must switch between multiple files during teaching. The video quality is relatively low — one video contains multiple teaching segments/tasks — so during the lesson teachers move constantly between course videos, documents, and creation tools.",
                  "课程材料以视频为主，老师上课时必须在多个文件之间切换。视频质量偏低 —— 一个视频里包含多个教学环节与任务 —— 于是整堂课里，老师不断在课程视频、文档与创作工具之间来回。"
                ),
              },
              {
                term: tt("Courseware cannot be edited", "课件无法编辑"),
                text: tt(
                  "Teachers request the ability to edit course content, but currently course materials do not support editing.",
                  "老师希望能编辑课程内容，但目前课件并不支持编辑。"
                ),
              },
              {
                term: tt("Live data cannot be accurately captured", "课堂数据无法准确采集"),
                text: tt(
                  "Teachers repeatedly send materials, lesson documents, and course resources in the same way — open package, display course resources — leading to a chaotic and redundant workflow.",
                  "老师用同一套方式反复发放素材、课堂文档与课程资源 —— 打开课包、展示课程资源 —— 导致流程混乱而重复。"
                ),
              },
              {
                term: tt("No support for external tools", "不支持外部工具"),
                text: tt(
                  "Currently, only kitten3 web pages and Haige web pages (wood) are supported.",
                  "目前只支持 kitten3 网页与海龟编辑器（wood）网页。"
                ),
              },
            ],
          },
        ],
      },
      {
        id: "analysis",
        eyebrow: tt("07 · Demand analysis", "07 · 需求分析"),
        label: tt("Demand analysis", "需求分析"),
        lead: tt(
          "What has to be true before the lesson, and during it.",
          "上课前与上课中，分别必须成立的事。"
        ),
        blocks: [
          {
            type: "bullets",
            title: tt("Before class", "课前"),
            items: [
              tt(
                "Teachers can edit and enhance course materials to align with their own teaching plans.",
                "老师可以编辑与补充课程材料，让它贴合自己的教学计划。"
              ),
            ],
          },
          {
            type: "bullets",
            title: tt("During class — do not waste teaching time", "课中 —— 不浪费上课时间"),
            items: [
              tt(
                "Once class begins, teachers and students can quickly enter the teaching state. Teachers can start teaching with one simple operation without having to navigate through multiple course packages.",
                "一上课，师生就能迅速进入教学状态。老师只需一个简单操作即可开讲，不必在多个课包里翻找。"
              ),
              tt(
                "Teachers can follow the teaching flow to give lessons without needing to switch between multiple course files to display content.",
                "老师可以顺着教学流程往下讲，不必为了展示内容在多个课程文件之间切换。"
              ),
              tt(
                "Teachers can directly assist students in starting their creations, eliminating the need for on-site guidance and monitoring of student actions.",
                "老师可以直接协助学生开始创作，不必逐个到座位边指导与盯着操作。"
              ),
            ],
          },
          {
            type: "bullets",
            title: tt("During class — a better teaching experience", "课中 —— 更好的授课体验"),
            items: [
              tt(
                "Courses are better suited for different age groups, with more robust tools. For younger students, support for the “kids” creation tool is available, while higher elementary grades have tools like “kitten4” for support.",
                "课程更贴合不同年龄段，工具也更完整：低龄学生支持「kids」创作工具，小学高年级则有「kitten4」之类的工具支撑。"
              ),
            ],
          },
        ],
      },
      {
        id: "solution",
        eyebrow: tt("08 · Design solution", "08 · 设计方案"),
        label: tt("Design solution", "设计方案"),
        lead: tt("Super Courseware.", "超级课件。"),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/5.jpg",
            size: "lg",
            caption: tt(
              "Super Courseware — editable templates, compatibility with multiple courseware types, a simplified teaching process and an enhanced teaching experience.",
              "超级课件 —— 可编辑的模板、兼容多种课件类型、简化的授课流程，以及更好的授课体验。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The solution answers the 7.69% directly: if teachers abandon the video because it bundles several tasks into one file, then the unit of courseware has to become the teaching step, not the video. Everything downstream — step configuration, multiple segment types, import — follows from that one reframing.",
              "方案直接回答了那个 7.69%：如果老师放弃视频，是因为它把好几个任务捆在一个文件里，那课件的单位就必须从「视频」变成「教学步骤」。后面所有的东西 —— 步骤配置、多种环节类型、导入 —— 都是从这一次重新定义推出来的。"
            ),
          },
        ],
      },
      {
        id: "userflow",
        eyebrow: tt("09 · User flow", "09 · 用户流程"),
        label: tt("User flow", "用户流程"),
        lead: tt(
          "Regular courseware stays. Super Courseware branches off it.",
          "普通课件保留，超级课件在它旁边分出一条支线。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/userflow.jpg",
            caption: tt(
              "User flow — the Super Courseware path adds editing, teaching-step creation, step configuration and local import alongside the existing upload flow.",
              "用户流程 —— 超级课件这条路径，在既有上传流程之外，加入了编辑、创建教学步骤、步骤配置与本地导入。"
            ),
          },
        ],
      },
      {
        id: "code",
        eyebrow: tt("10 · Design code", "10 · 设计规范"),
        label: tt("Design code", "设计规范"),
        lead: tt("Functions restructured into three levels.", "功能被重新组织成三个层级。"),
        blocks: [
          {
            text: tt(
              "Based on product features, functions are restructured into three levels: background, content, and global control. Global control serves as the core functionality area, with top navigation and side navigation modules.",
              "依据产品特性，功能被重新组织成三层：底层背景、内容区与全局控制。全局控制是核心功能区，包含顶部导航与侧边导航两个模块。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/7.jpg",
            caption: tt(
              "Top navigation bar, left navigation bar, content area and background area — and what each is responsible for.",
              "顶部导航栏、左侧导航栏、内容区与背景区 —— 以及各自负责什么。"
            ),
          },
        ],
      },
      {
        id: "system",
        eyebrow: tt("11 · Design system", "11 · 设计系统"),
        label: tt("Design system", "设计系统"),
        lead: tt("Colour standards and a 12-column grid.", "色彩规范与 12 栏网格。"),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/8.jpg",
            caption: tt(
              "Primary #3490FF with secondary and text-emphasis scales; a 1440px page with a 1168px content area on 12 equal columns.",
              "主色 #3490FF，配辅助色与文字强调色阶；页面宽 1440px，内容区 1168px，分为 12 等栏。"
            ),
          },
        ],
      },
      {
        id: "interface",
        eyebrow: tt("12 · Interface design", "12 · 界面设计"),
        label: tt("Interface design", "界面设计"),
        lead: tt("Old against new, one key result at a time.", "新旧对照，一个 KR 一个 KR 地看。"),
        blocks: [
          {
            type: "image",
            src: "/project/codemao/9.jpg",
            caption: tt(
              "KR1 · Improve user experience — refine structure and organize feature access. Hierarchy lines added, the course package entry moved under Course Package List, entry points streamlined.",
              "KR1 · 提升体验 —— 梳理结构、整理功能入口。加入层级分隔线，课包入口移到「课包列表」之下，入口被精简。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/10.jpg",
            caption: tt(
              "KR1 · Optimize interaction flow — Courses → Course List → Course Editing Page, with default and editing modes and an empty state for no advanced courseware.",
              "KR1 · 优化交互流程 —— 课程 → 课程列表 → 课程编辑页，包含默认与编辑两种模式，以及「暂无高级课件」的空状态。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/11.jpg",
            caption: tt(
              "Advanced Courseware Editing Page, empty state — add a step, import from an external source, and choose a teaching step type.",
              "高级课件编辑页的空状态 —— 添加步骤、从外部导入，以及选择教学步骤类型。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/ui-a.jpg",
            caption: tt(
              "Supports various courseware types — teaching segment as image, and as slideshow with a thumbnail list.",
              "支持多种课件类型 —— 教学环节可以是图片，也可以是带缩略图列表的幻灯片。"
            ),
          },
          {
            type: "image",
            src: "/project/codemao/ui-b.jpg",
            caption: tt(
              "And as video with a built-in player, as a built-in creation tool, and as attachment/file download.",
              "也可以是内置播放器的视频、内置的创作工具，或是附件与文件下载。"
            ),
          },
        ],
      },
    ],
  },
  "puzzle-game": {
    role: tt("UX/UI · Game Design", "UX/UI · 游戏化设计"),
    summary: tt(
      "This project focuses on enhancing the interactive experience of a mobile puzzle game by designing a process for a limited-time event where players collect puzzle pieces to complete storybooks. The goal is to improve player engagement and completion rates by introducing a tutorial that helps new users quickly understand the gameplay.",
      "这个项目要提升一款手机拼图游戏的互动体验：设计一个限时活动的流程，玩家收集拼图页来集成绘本。目标是通过一套能让新手迅速看懂玩法的引导，提高参与度与完成率。"
    ),
    tags: [
      tt("UX/UI design", "UX/UI 设计"),
      tt("Game design", "游戏化设计"),
      tt("Mobile design", "移动端设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Collect nine puzzle pages to complete a storybook.",
          "收集九张拼图页，集成一本绘本。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/hero.jpg",
            caption: tt(
              "Jigsaw Puzzle — a limited-time collection event inside a mobile puzzle game.",
              "Jigsaw Puzzle —— 手机拼图游戏里的一个限时收集活动。"
            ),
          },
          {
            text: tt(
              "Players enter the activity interface and complete the puzzle pages of the puzzle set (storybook) through the puzzle game. Collect 9 puzzle pages to create a puzzle set, and the newly created storybook is added to the bookshelf interface. Books on the bookshelf can be opened during or after the activity to play the puzzle pages again.",
              "玩家进入活动界面，通过拼图玩法完成拼图集（绘本）里的各页。收集满 9 张拼图页即可集成一册，新集成的绘本会被放进书架。书架上的书在活动期间或结束后都能打开，重玩其中的拼图页。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/1.jpg",
            caption: tt(
              "The event in one screen — a storybook cover, its puzzle pages, and Play.",
              "一屏看完整个活动 —— 绘本封面、它的拼图页，以及「开始」。"
            ),
          },
        ],
      },
      {
        id: "journey",
        eyebrow: tt("01 · User journey map", "01 · 用户旅程图"),
        label: tt("User journey map", "用户旅程图"),
        lead: tt(
          "Analyze pain points and product opportunities to summarize design strategies.",
          "分析痛点与产品机会，归纳出设计策略。"
        ),
        blocks: [
          {
            type: "steps",
            items: [
              tt("Enter page", "进入页面"),
              tt("Select puzzle set", "选择拼图集"),
              tt("Beginner guide", "新手引导"),
              tt("Puzzle in progress", "拼图进行中"),
              tt("Complete puzzle", "完成拼图"),
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/2.jpg",
            caption: tt(
              "Stage, touchpoint, mood curve, pain points and opportunities across the five stages.",
              "五个阶段上的阶段、触点、情绪曲线、痛点与机会点。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Unaware of puzzle activities", "不知道有拼图活动"),
                text: tt(
                  "Resulting in low completion rates → promote puzzle set activities.",
                  "导致完成率偏低 → 加强拼图集活动的曝光。"
                ),
              },
              {
                term: tt("Overwhelming content", "内容过载"),
                text: tt(
                  "Difficult to decide, uncertain about the number of puzzles → categorize mainline and activities, display puzzle progress.",
                  "难以决定、不清楚一共有多少张 → 区分主线与活动，并显示拼图进度。"
                ),
              },
              {
                term: tt("Static guidance fails", "静态引导无效"),
                text: tt(
                  "Users do not understand quickly → interactive guidance, reducing user learning effort.",
                  "用户看不懂、上手慢 → 改为交互式引导，降低学习成本。"
                ),
              },
              {
                term: tt("Game ends without reward feedback", "结束时缺少奖励反馈"),
                text: tt(
                  "→ emotional engagement mechanism, coin reward mechanism.",
                  "→ 加入情绪共鸣机制与金币奖励机制。"
                ),
              },
            ],
          },
          {
            type: "note",
            text: tt(
              "The mood curve is doing the real work here. It dips twice — once at selection, once after completion — and both dips become features: categorisation fixes the first, the reward moment fixes the second. The design strategy is readable straight off the curve.",
              "真正在干活的是那条情绪曲线。它有两次下陷 —— 一次在选择时，一次在完成之后 —— 两次下陷都变成了功能：分类解决前一次，奖励时刻解决后一次。设计策略可以直接从这条曲线上读出来。"
            ),
          },
        ],
      },
      {
        id: "motivation",
        eyebrow: tt("02 · User motivation", "02 · 用户动机"),
        label: tt("User motivation", "用户动机"),
        lead: tt("A teenage audience, driven by attraction.", "以青少年为主的用户，被「吸引力」驱动。"),
        blocks: [
          {
            text: tt(
              "Pay attention to user experience, analyze user motivation to stimulate behavior, meet the demands of different roles, improve participation and completion rates, and enable users to reach multiple points of participation and achievement.",
              "关注用户体验，分析用户动机以激发行为，满足不同角色的需求，提升参与度与完成率，让用户获得多个参与与成就的落点。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/3.jpg",
            caption: tt(
              "User traits — a teenage group looking for engagement, belonging, identification; drive to use — excitement, accomplishment, emotional bond, enjoyment.",
              "用户特征 —— 一群寻求参与感、归属感与认同感的青少年；使用动力 —— 兴奋、成就、情感联结、乐趣。"
            ),
          },
        ],
      },
      {
        id: "strategy",
        eyebrow: tt("03 · Design strategy", "03 · 设计策略"),
        label: tt("Design strategy", "设计策略"),
        lead: tt(
          "Three strategies, from the experience report and motivation analysis.",
          "三条策略，来自体验报告与动机分析。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Interaction experience", "交互体验"),
                text: tt(
                  "Swipe interaction method; pop-ups to reduce navigation; user action guidance.",
                  "滑动式交互；用弹层减少页面跳转；对用户操作给出引导。"
                ),
              },
              {
                term: tt("Content navigation", "内容导航"),
                text: tt(
                  "Puzzle set status visualization; puzzle set waterfall layout; categorized tags for faster search.",
                  "拼图集状态可视化；拼图集瀑布流布局；分类标签加快查找。"
                ),
              },
              {
                term: tt("Visual effects", "视觉表现"),
                text: tt(
                  "Playful typography; youthful and vibrant colors; unified components.",
                  "俏皮的字体排版；年轻鲜亮的色彩；统一的组件。"
                ),
              },
            ],
          },
          { type: "image", src: "/project/puzzle-game/4.jpg", caption: tt("The three strategy pillars.", "三根策略支柱。") },
        ],
      },
      {
        id: "emotional",
        eyebrow: tt("04 · Emotional edition", "04 · 情绪定调"),
        label: tt("Emotional edition", "情绪定调"),
        lead: tt("Young · immersion · interesting.", "年轻 · 沉浸 · 有趣。"),
        blocks: [
          {
            text: tt(
              "Based on preliminary product research and analysis of the brand’s target user group, keywords for the ideal product have been derived, with children being the main group. The design style is youthful and lively, with soft and comfortable colors.",
              "基于前期产品调研与品牌目标用户分析，提炼出理想产品的关键词 —— 主力用户是儿童。设计风格年轻活泼，色彩柔和舒适。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Young", "年轻"),
                text: tt("Target audience mainly consists of teenagers.", "目标用户以青少年为主。"),
              },
              {
                term: tt("Immersion", "沉浸"),
                text: tt("Purple ambiance enhances immersion.", "紫色氛围增强沉浸感。"),
              },
              {
                term: tt("Interesting", "有趣"),
                text: tt("Enjoyable experiences enhance user loyalty.", "愉快的体验提升用户忠诚度。"),
              },
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/5.jpg",
            caption: tt("The three keywords and the imagery behind each.", "三个关键词，以及各自背后的意象。"),
          },
        ],
      },
      {
        id: "color",
        eyebrow: tt("05 · Color standard", "05 · 色彩规范"),
        label: tt("Color standard", "色彩规范"),
        lead: tt("Childlike purple, with blue as the auxiliary.", "以童趣的紫为主色，蓝色为辅。"),
        blocks: [
          {
            text: tt(
              "The color selection is full of childlike purple as the main color, unifying the brand tone, and the accent color is blue from adjacent color series as the auxiliary color.",
              "主色选用充满童趣的紫色，统一品牌调性；点缀色取邻近色系中的蓝色作为辅助色。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/6.jpg",
            caption: tt(
              "Primary #9F7FFF–#8055FE, secondary #7C90FA, with #4460ED, #ED6FF7 and #E86124.",
              "主色 #9F7FFF–#8055FE，辅色 #7C90FA，另有 #4460ED、#ED6FF7 与 #E86124。"
            ),
          },
        ],
      },
      {
        id: "homepage",
        eyebrow: tt("06 · Home page", "06 · 首页"),
        label: tt("Home page", "首页"),
        lead: tt(
          "Two tags, a waterfall of puzzle sets, and the player’s balance.",
          "两个标签页、一列瀑布流拼图集，以及玩家的余额。"
        ),
        blocks: [
          {
            text: tt(
              "The homepage is divided into two tags, each containing a category bar, coin information, and diamond information.",
              "首页分为两个标签页，各自包含分类栏、金币信息与钻石信息。"
            ),
          },
          {
            type: "image",
            src: "/project/puzzle-game/7.jpg",
            caption: tt(
              "Category section (mainline + event), content section (puzzle set waterfall with upcoming, in-progress and completed states), and the account data section.",
              "分类区（主线 + 活动）、内容区（拼图集瀑布流，含未开始、进行中与已完成三种状态），以及账户数据区。"
            ),
          },
        ],
      },
      {
        id: "process",
        eyebrow: tt("07 · Process display", "07 · 流程展示"),
        label: tt("Process display", "流程展示"),
        lead: tt(
          "Simple, intuitive interaction that lowers the difficulty of operation.",
          "简单直觉的交互，降低操作难度。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/8.jpg",
            caption: tt(
              "Landing page through to the completed puzzle — including the Play/Reserve state before an event begins, and the transition animation back to the puzzle set page on completion.",
              "从落地页一路到拼完 —— 包含活动开始前的「开始 / 预约」状态，以及完成后回到拼图集页面的过渡动画。"
            ),
          },
        ],
      },
      {
        id: "guidance",
        eyebrow: tt("08 · Operation guidance", "08 · 操作引导"),
        label: tt("Operation guidance", "操作引导"),
        lead: tt(
          "Dynamic beginner guidance, not a static tutorial.",
          "动态的新手引导，而不是一份静态教程。"
        ),
        blocks: [
          {
            text: tt(
              "Adopting dynamic beginner guidance to guide users, further reducing the threshold for operation and improving usability.",
              "采用动态新手引导带着用户走，进一步降低操作门槛、提升易用性。"
            ),
          },
          {
            type: "defs",
            items: [
              {
                term: tt("Swipe piece placement area", "滑动拼块区"),
                text: tt(
                  "Guide the user to the next step upon following the swipe instructions.",
                  "用户按提示滑动后，引导进入下一步。"
                ),
              },
              {
                term: tt("Puzzle play mechanics", "拼图玩法机制"),
                text: tt(
                  "As the user moves a piece, show the matching position. The piece will automatically snap into place when positioned correctly.",
                  "用户拖动拼块时显示匹配位置，位置正确时拼块会自动吸附到位。"
                ),
              },
              {
                term: tt("Zoom in/out puzzle", "缩放拼图"),
                text: tt(
                  "Pinch with two fingers to zoom in or out on the puzzle.",
                  "双指捏合，放大或缩小拼图。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/puzzle-game/9.jpg",
            caption: tt(
              "Each gesture taught in place, at the moment it is needed.",
              "每个手势都就地教，教在它被需要的那一刻。"
            ),
          },
          {
            type: "note",
            text: tt(
              "This is the answer to the brief. “Static guidance fails to help users understand quickly” was the journey map’s third pain point, and the fix is that the tutorial stops being a screen the player dismisses and becomes a prompt attached to the action itself.",
              "这就是对命题的回答。「静态引导无法让用户迅速看懂」是旅程图里的第三个痛点，解法是：教程不再是一块玩家顺手划掉的界面，而变成贴在动作本身上的提示。"
            ),
          },
        ],
      },
      {
        id: "display",
        eyebrow: tt("09 · Page display", "09 · 页面展示"),
        label: tt("Page display", "页面展示"),
        lead: tt("The finished screens.", "最终的界面。"),
        blocks: [
          {
            type: "image",
            src: "/project/puzzle-game/10.jpg",
            caption: tt(
              "Page display — the event list, puzzle sets and in-game puzzle screens.",
              "页面展示 —— 活动列表、拼图集，以及游戏内的拼图界面。"
            ),
          },
        ],
      },
    ],
  },
  "fire-rescue-drone": {
    role: tt("Product · System & UAV Design", "产品 · 系统与无人机设计"),
    summary: tt(
      "Urban villages exist in every fast-growing city in China. These villages have always been at the heart of the fire problem due to dense housing and narrow roads. Against the backdrop of future intelligent cities, this project creates an intelligent fire-fighting system for urban villages that intelligently responds to fires, helps residents fight fires, and assists firefighters.",
      "中国每一座快速扩张的城市里都有城中村。房屋密集、道路狭窄，让它们一直是消防问题的核心所在。以未来智慧城市为背景，这个项目为城中村设计了一套智能消防系统：智能响应火情、协助居民自救，并辅助消防员救援。"
    ),
    tags: [
      tt("Product design", "产品设计"),
      tt("System design", "系统设计"),
      tt("UAV design", "无人机设计"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Fire protection system design for urban villages.",
          "为城中村设计的消防系统。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/hero.jpg",
            caption: tt(
              "A paired drone and ground vehicle, dispatched ahead of the firefighters.",
              "一架无人机与一台地面车辆组成一对，比消防员先到现场。"
            ),
          },
        ],
      },
      {
        id: "background",
        eyebrow: tt("01 · Background", "01 · 背景"),
        label: tt("Background", "背景"),
        lead: tt("Residential fire is where people actually die.", "真正死人的，是住宅火灾。"),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg1.jpg",
            caption: tt(
              "Residential fires are 44.8% of occurrences but 78.3% of the death toll; electrical appliances are the single biggest cause at 32.1%.",
              "住宅火灾占起火数的 44.8%，却占死亡人数的 78.3%；电器是最大单一诱因，占 32.1%。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg2.jpg",
            caption: tt(
              "Why urban villages burn — dense housing and narrow roads.",
              "城中村为什么易燃 —— 房屋密集、道路狭窄。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg3.jpg",
            caption: tt("Conditions on the ground.", "现场的实际状况。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg4.jpg",
            caption: tt(
              "The existing response, and where it loses time.",
              "现有的响应流程，以及它在哪里耗掉了时间。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/bg5.jpg",
            caption: tt("Background research summary.", "背景研究小结。"),
          },
          {
            type: "note",
            text: tt(
              "The 44.8% / 78.3% split is the whole argument for the project. Residential fire is not the most common kind of fire — it is the most lethal kind, and in an urban village the reason is access. That points the design at the minutes before the firefighters arrive rather than at firefighting itself.",
              "44.8% 与 78.3% 之间的落差，就是这个项目全部的理由。住宅火灾不是最常见的火灾，而是最致命的那一类 —— 在城中村，原因是「进不去」。这把设计指向消防员到场之前那几分钟，而不是灭火本身。"
            ),
          },
        ],
      },
      {
        id: "architecture",
        eyebrow: tt("02 · System architecture", "02 · 系统架构"),
        label: tt("System architecture", "系统架构"),
        lead: tt("Scene, cloud, network, terminal.", "场景、云端、网络、终端。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Scene", "场景"),
                text: tt("Urban village, fire fighting, fire station.", "城中村、灭火救援、消防站。"),
              },
              {
                term: tt("Cloud system center", "云端系统中心"),
                text: tt(
                  "Cloud platform, big data, AI middleground and video platform on a SaaS cloud + IoT platform, running the risk perception system, intelligent decision system and fire safety system.",
                  "在 SaaS 云与物联网平台之上，由云平台、大数据、AI 中台与视频平台组成，运行风险感知系统、智能决策系统与消防安全系统。"
                ),
              },
              {
                term: tt("Multi-network", "多重网络"),
                text: tt(
                  "Service providers’ network, Alpha IOT private network, e-government network.",
                  "运营商网络、Alpha 物联网专网、电子政务网。"
                ),
              },
              {
                term: tt("System products", "系统硬件"),
                text: tt(
                  "Smoke detector, video monitoring, fire fighting UAV, fire car.",
                  "烟感探测器、视频监控、消防无人机、消防小车。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/arch.jpg",
            caption: tt(
              "The four layers, from scene down to terminal hardware.",
              "四个层级，从场景一直到终端硬件。"
            ),
          },
        ],
      },
      {
        id: "diagram",
        eyebrow: tt("03 · System diagram", "03 · 系统图解"),
        label: tt("System diagram", "系统图解"),
        lead: tt(
          "Baishizhou, Nanshan District, Shenzhen — taken as the example.",
          "以深圳市南山区白石洲为例。"
        ),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "The whole urban village will be divided according to the main road and the density of houses.",
                "整个城中村按主干道与房屋密度划分区域。"
              ),
              tt(
                "Each partition is equipped with an intelligent fire sub-system according to the public space and number of houses.",
                "每个分区根据公共空间与房屋数量，配置一套智能消防子系统。"
              ),
              tt("Digitize and code each building and floor.", "为每栋楼、每一层做数字化编码。"),
              tt(
                "Install smoke sensors and alarms on each floor.",
                "每层安装烟感传感器与报警装置。"
              ),
              tt(
                "Plan the route of fire trucks and fire drones to each building.",
                "规划消防车与消防无人机到各栋楼的路径。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sys1.jpg",
            caption: tt(
              "Baishizhou divided into partitions A–L, each with its own sub-system, and every building and floor coded.",
              "白石洲被划分为 A–L 区，各自配一套子系统，每栋楼与每层都有编码。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sys2.jpg",
            caption: tt(
              "A fire in C-06-09 — detection, alert, dispatch, the vehicles arriving ahead of the firefighters, residents self-rescuing with delivered tools, and a precise rescue on arrival.",
              "C-06-09 起火 —— 探测、报警、调度，设备先于消防员抵达，居民用送到手上的工具自救，消防员到场后精准救援。"
            ),
          },
        ],
      },
      {
        id: "product-design",
        eyebrow: tt("04 · Product design", "04 · 产品设计"),
        label: tt("Product design", "产品设计"),
        lead: tt("Geometry · rounded · affiliative.", "几何 · 圆润 · 亲和。"),
        blocks: [
          {
            type: "image",
            src: "/project/fire-rescue-drone/mood.jpg",
            caption: tt(
              "Moodboard — soft geometry and rounded housings, approachable rather than industrial.",
              "情绪板 —— 柔和的几何与圆润的外壳，亲切而不工业。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/sketch.jpg",
            caption: tt("Product sketches.", "产品草图。"),
          },
        ],
      },
      {
        id: "drone",
        eyebrow: tt("05 · Fire fighting drone", "05 · 消防无人机"),
        label: tt("Fire fighting drone", "消防无人机"),
        lead: tt("Eyes above the fire.", "火场上方的那双眼睛。"),
        blocks: [
          {
            text: tt(
              "The Fire Fighting Drone is designed to transmit video information of the fire scene, assist firefighters in locating trapped persons, and throw fire extinguisher balls. When a fire breaks out, the drone quickly arrives at the scene, providing firefighters with real-time images. Simultaneously, firefighters can control the drone to release fire-extinguishing bombs, enhancing their ability to combat the fire effectively.",
              "消防无人机负责回传火场的视频信息、协助消防员定位被困人员，并投放灭火弹。火情发生时，无人机迅速抵达现场，为消防员提供实时画面；同时消防员可以操控它投放灭火弹，增强实际的灭火能力。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/drone.jpg",
            caption: tt("The fire fighting drone.", "消防无人机。"),
          },
        ],
      },
      {
        id: "car",
        eyebrow: tt("06 · Fire fighting small car", "06 · 消防小车"),
        label: tt("Fire fighting small car", "消防小车"),
        lead: tt(
          "Hoses delivered up the stairs, before anyone arrives.",
          "在任何人到场之前，把水带送上楼。"
        ),
        blocks: [
          {
            text: tt(
              "The fire fighting vehicle is equipped to transmit video information of the fire scene, assist firefighters in locating trapped persons, and provide fire hoses to residents. When a fire occurs, the vehicle delivers fire hoses to residents by climbing stairs, enabling them to save themselves. Simultaneously, it transmits real-time information on the fire situation to the firefighters, aiding in their response efforts.",
              "消防小车负责回传火场视频、协助消防员定位被困人员，并向居民递送消防水带。火情发生时，小车爬楼把水带送到居民手上，让他们能够自救；同时把火情的实时信息传给消防员，辅助他们的处置。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/car.jpg",
            caption: tt("The stair-climbing ground vehicle.", "可爬楼梯的地面小车。"),
          },
        ],
      },
      {
        id: "exploded",
        eyebrow: tt("07 · Product exploded view", "07 · 产品爆炸图"),
        label: tt("Exploded view", "爆炸图"),
        lead: tt("Three systems — PCB, body and battery.", "三大系统 —— 电路板、机身与电池。"),
        blocks: [
          {
            text: tt(
              "The main structure logic is to divide this machine into three main systems: PCB system, body system and battery system. The drone covers are metal (aluminium) made by die casting and CNC with anodic oxidation finishing, considering that this machine works in a high temperature environment. Components are connected using screws and nuts to make sure they stick tightly.",
              "主体结构逻辑是把整机分成三大系统：电路板系统、机身系统与电池系统。考虑到它要在高温环境下工作，无人机外壳采用金属（铝），以压铸加 CNC 成型、阳极氧化处理。各部件以螺栓螺母连接，确保结合紧密。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/exp1.jpg",
            caption: tt(
              "Drone exploded view — indicator and control panels, solar panel, PCB, motors, body covers, battery housing and the goods clamp.",
              "无人机爆炸图 —— 指示与控制面板、太阳能板、电路板、电机、机身外壳、电池仓与载物夹具。"
            ),
          },
          {
            text: tt(
              "Fire car structure is considered to use metal (aluminium) as the main material because of high temperature working. The metal covers are made by die casting and CNC with anodic oxidation finishing with laser-marking logo. All parts are connected with screws and nuts to make sure it is convenient to assemble or disassemble. Also component repairing is possible.",
              "消防小车同样因高温工况，以金属（铝）为主材。金属外壳以压铸加 CNC 成型、阳极氧化处理，并激光打标 logo。所有零件以螺栓螺母连接，便于装拆，也让部件维修成为可能。"
            ),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/exp2.jpg",
            caption: tt("Ground vehicle exploded view.", "地面小车爆炸图。"),
          },
        ],
      },
      {
        id: "renders",
        eyebrow: tt("08 · Renders", "08 · 渲染图"),
        label: tt("Renders", "渲染图"),
        lead: tt("The finished pair.", "完成的这一对。"),
        blocks: [
          { type: "image", src: "/project/fire-rescue-drone/r1.jpg", caption: tt("Drone render.", "无人机渲染图。") },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r2.jpg",
            caption: tt("Drone, alternate view.", "无人机，另一视角。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r3.jpg",
            caption: tt("Ground vehicle render.", "地面小车渲染图。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r4.jpg",
            caption: tt("Ground vehicle, alternate view.", "地面小车，另一视角。"),
          },
          {
            type: "image",
            src: "/project/fire-rescue-drone/r5.jpg",
            caption: tt("The system in context.", "系统置于真实场景中。"),
          },
        ],
      },
    ],
  },
  stationery: {
    role: tt("Product Designer", "产品设计师"),
    summary: tt(
      "This project uses the Four Treasures of the Study and traditional Chinese mortise and tenon joints, combined with ancient garden design, to explore Eastern art design. It seeks to promote a slow-paced lifestyle and harmony between humans and nature, highlighting traditional Chinese aesthetics.",
      "这个项目以文房四宝与中式榫卯为出发点，结合古典园林的造景手法，探索东方的艺术设计。它想提倡一种慢下来的生活方式与人与自然的和谐，凸显中国传统美学。"
    ),
    tags: [
      tt("Product design", "产品设计"),
      tt("Prototyping", "手作打样"),
      tt("Mortise and tenon joint", "榫卯结构"),
      tt("Traditional Chinese culture", "中国传统文化"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "“Place Life” series stationery product design.",
          "「置物生活」系列文具产品设计。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/stationery/hero.jpg",
            caption: tt(
              "A desk set built from the Four Treasures of the Study — brush, ink, paper and inkstone.",
              "一套由文房四宝衍生出的桌面器物 —— 笔、墨、纸、砚。"
            ),
          },
        ],
      },
      {
        id: "description",
        eyebrow: tt("01 · Design description", "01 · 设计说明"),
        label: tt("Design description", "设计说明"),
        lead: tt(
          "A courtyard house, shrunk to the size of a desk.",
          "一座四合院，缩到一张书桌的尺度。"
        ),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Four-sided box", "四合之形"),
                text: tt(
                  "The overall exterior shape draws inspiration from traditional Chinese courtyard buildings. The design is modeled after the four-sided courtyard layout.",
                  "整体外形取自中国传统合院建筑，依四面围合的院落格局造型。"
                ),
              },
              {
                term: tt("Frame art technique", "框景手法"),
                text: tt(
                  "Frame art is a traditional garden landscape technique. In the design, window frames are mimicked, placing selected landscape elements within the box. From the outside, it appears as a framed picture.",
                  "框景是传统园林的造景手法。设计中模拟窗棂，把选定的景物纳入盒内 —— 从外面看，便是一幅被框住的画。"
                ),
              },
              {
                term: tt("Garden landscape design", "园林造景"),
                text: tt(
                  "The garden design imitates natural landscapes with artificial mountains and waterscapes. Three mountains and a waterscape are created within the box’s interior.",
                  "园林以人工的山石水景模拟自然。盒内造出三山一水。"
                ),
              },
              {
                term: tt("Mountain and water curves", "山水曲线"),
                text: tt(
                  "The edges of the bottom lid are cut to mimic mountain and water curves, allowing for the placement of brushes.",
                  "底盖边缘依山水曲线切出起伏，正好可以搁笔。"
                ),
              },
              {
                term: tt("Ancient roof design", "古建屋面"),
                text: tt(
                  "The four sides of the box extract the curved lines from the roofs of ancient buildings, incorporating them into the design.",
                  "盒体四面提取古建屋顶的弧线，纳入造型之中。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/stationery/desc.jpg",
            caption: tt(
              "Each architectural reference and where it lands on the object.",
              "每一处建筑参照，以及它最终落在器物的哪个部位。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The borrowing works because it is structural rather than decorative. 框景 (frame art) is not applied as a pattern on the surface — it decides what you can see of the inkstone from outside, so the garden technique is doing the same job on the box that it does in a garden.",
              "这次借用之所以成立，是因为它是结构性的，而不是装饰性的。框景不是贴在表面的纹样 —— 它决定了你从外面能看到砚台的哪一部分，于是这个园林手法在盒子上干的活，和它在园林里干的活是同一件。"
            ),
          },
        ],
      },
      {
        id: "details",
        eyebrow: tt("02 · Design details", "02 · 设计细节"),
        label: tt("Design details", "设计细节"),
        lead: tt("Held together by dovetail joints, not glue.", "靠燕尾榫咬合，而不是靠胶。"),
        blocks: [
          {
            type: "bullets",
            items: [
              tt(
                "The left and right sides are longer than the top and bottom sides. In the closed state, the left and right sides clamp onto the top and bottom sides.",
                "左右两侧比上下两侧更长，闭合时由左右夹住上下。"
              ),
              tt("The left and right sides of the box use dovetail joints.", "盒体左右两侧采用燕尾榫。"),
              tt(
                "The top and bottom lids share the dovetail joints, which complete the connection when closed.",
                "上下两盖共用同一组燕尾榫，闭合时连接才算完成。"
              ),
              tt(
                "The overall box’s four sides have beveled dovetail cuts, making it easier to connect the rectangular box sides.",
                "盒体四面均为斜切燕尾，让矩形盒体的各面更容易接合。"
              ),
            ],
          },
          {
            type: "image",
            src: "/project/stationery/details.jpg",
            caption: tt(
              "The joinery — how the four sides and two lids lock together.",
              "榫卯 —— 四面与两盖如何互相锁住。"
            ),
          },
        ],
      },
      {
        id: "product",
        eyebrow: tt("03 · Product", "03 · 成品"),
        label: tt("Product", "成品"),
        lead: tt("The finished object.", "完成后的器物。"),
        blocks: [
          {
            type: "image",
            src: "/project/stationery/product.jpg",
            caption: tt("The complete “Place Life” set.", "完整的「置物生活」一套。"),
          },
          {
            type: "image",
            src: "/project/stationery/p1.jpg",
            caption: tt(
              "Closed — the framed landscape read through the lid.",
              "闭合 —— 透过盖面读到那幅被框住的山水。"
            ),
          },
          { type: "image", src: "/project/stationery/p2.jpg", caption: tt("The box from above.", "俯视盒体。") },
          {
            type: "image",
            src: "/project/stationery/p3.jpg",
            caption: tt(
              "Open — the inkstone basin as mountain and water, with the brush resting in the cut edge.",
              "打开 —— 砚池即是山水，笔搁在切出的边沿上。"
            ),
          },
          {
            type: "image",
            src: "/project/stationery/p4.jpg",
            caption: tt("Detail of the carved landscape.", "山水雕刻的细部。"),
          },
          { type: "image", src: "/project/stationery/p5.jpg", caption: tt("The set in use.", "使用中的这一套。") },
        ],
      },
    ],
  },
  "e-pack": {
    role: tt("Systemic Design · Master's thesis", "系统设计 · 硕士毕业论文"),
    summary: tt(
      "The thesis explores innovative smart packaging solutions in the Italian fashion industry, focusing on enhancing product sustainability and user engagement through systemic design. It aims to address critical issues within the fashion system by identifying trends and latent needs for smart packaging. The research proposes three integrable solutions: technologies for product traceability and authenticity, a system for collecting and reusing clothing, and a return and reuse system for e-commerce packaging. These strategies promote sustainability and encourage socially responsible consumer behavior.",
      "这篇论文探索意大利时尚产业中的智能包装方案，核心是用系统设计提升产品的可持续性与用户参与度。它通过识别智能包装的趋势与潜在需求，回应时尚系统内部的关键问题，并提出三个可整合的解法：产品溯源与防伪技术、衣物回收与再利用系统，以及电商包装的回收复用系统。这些策略共同推动可持续性，并鼓励具有社会责任感的消费行为。"
    ),
    tags: [
      tt("Systemic design", "系统设计"),
      tt("System design", "系统性设计"),
      tt("Smart packaging", "智能包装"),
      tt("Thesis", "毕业论文"),
    ],
    sections: [
      {
        id: "overview",
        eyebrow: tt("00 · Overview", "00 · 概览"),
        label: tt("Overview", "概览"),
        lead: tt(
          "Smart packaging: a way to enhance Made in Italy fashion.",
          "智能包装：为「意大利制造」的时尚加值的一条路。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/cover.jpg",
            size: "lg",
            caption: tt(
              "E-PACK — a master’s thesis in systemic design.",
              "E-PACK —— 一篇系统设计方向的硕士毕业论文。"
            ),
          },
          {
            type: "links",
            items: [
              {
                label: tt("Presentation — Figma prototype", "答辩演示 —— Figma 原型"),
                href: "https://www.figma.com/proto/HC5WLsU4l2CVraHYpdUHbD/E-PACK-THESIS?page-id=3978%3A8666&node-id=3978-18781&viewport=947%2C5573%2C0.17&t=cHCRdfqYCdlyzdL6-1&scaling=contain&content-scaling=fixed&starting-point-node-id=3978%3A18781",
                note: tt("The full thesis presentation.", "完整的论文演示。"),
              },
              {
                label: tt("Thesis — full document", "论文 —— 完整文档"),
                href: "https://drive.google.com/file/d/1b8AiW3tEfVoflgYm7ez3DLw2qAl1oCdy/view?usp=sharing",
                note: tt("The written thesis as a PDF.", "论文正文 PDF。"),
              },
            ],
          },
        ],
      },
      {
        id: "case-study",
        eyebrow: tt("01 · Smart case study", "01 · 智能包装案例"),
        label: tt("Smart case study", "智能包装案例"),
        lead: tt(
          "What smart packaging already does, elsewhere.",
          "智能包装在别的行业里，已经做到了什么。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/case1.jpg",
            caption: tt(
              "Case analysis — 65 intelligent-packaging cases and 51 active-packaging cases, mapped by packaging level, reference sector and country.",
              "案例分析 —— 65 个智能包装案例与 51 个活性包装案例，按包装层级、所属行业与国家归类。"
            ),
          },
          { type: "image", src: "/project/e-pack/case2.jpg", caption: tt("Case analysis, continued.", "案例分析（续）。") },
          {
            type: "image",
            src: "/project/e-pack/case3.jpg",
            caption: tt("The technologies behind the cases.", "这些案例背后的技术。"),
          },
          {
            type: "note",
            text: tt(
              "The survey is what keeps the proposal grounded. Most of the 116 cases sit in food, beverage and pharmaceuticals rather than fashion — so the thesis is not inventing a technology, it is moving a proven one into a sector that has not adopted it.",
              "正是这份调研让提案站得住脚。116 个案例大多来自食品、饮料与医药，而不是时尚 —— 所以这篇论文不是在发明一项技术，而是把一项已被验证的技术，搬进一个尚未采用它的行业。"
            ),
          },
        ],
      },
      {
        id: "history",
        eyebrow: tt("02 · History of Made in Italy", "02 · 「意大利制造」的历史"),
        label: tt("History of Made in Italy", "「意大利制造」的历史"),
        lead: tt(
          "Where the label came from, and what it now has to defend.",
          "这个标签从何而来，以及它如今要守住什么。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/hist1.jpg",
            caption: tt("The history of Made in Italy.", "「意大利制造」的历史。"),
          },
          {
            type: "image",
            src: "/project/e-pack/hist2.jpg",
            caption: tt("How the label is defined and certified.", "这个标签如何被定义与认证。"),
          },
          {
            type: "image",
            src: "/project/e-pack/hist3.jpg",
            caption: tt("The value and the vulnerability of the label.", "这个标签的价值，以及它的脆弱之处。"),
          },
        ],
      },
      {
        id: "fashion-system",
        eyebrow: tt("03 · Fashion system", "03 · 时尚系统"),
        label: tt("Fashion system", "时尚系统"),
        lead: tt("The supply chain, drawn end to end.", "把供应链从头画到尾。"),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/sys1.jpg",
            caption: tt(
              "Supply chain of “Made in Italy” fashion — raw material through textile manufacture, garment manufacture, brand and retail.",
              "「意大利制造」时尚产业的供应链 —— 从原料，经纺织、成衣制造，到品牌与零售。"
            ),
          },
          {
            type: "image",
            src: "/project/e-pack/sys2.jpg",
            caption: tt("The system’s actors and flows.", "系统中的参与者与各条流。"),
          },
          {
            type: "image",
            src: "/project/e-pack/sys3.jpg",
            caption: tt(
              "Where waste and value leak out of the chain.",
              "废弃与价值从链条的哪些地方漏掉。"
            ),
          },
        ],
      },
      {
        id: "challenges",
        eyebrow: tt("04 · Challenges and opportunities", "04 · 挑战与机会"),
        label: tt("Challenges and opportunities", "挑战与机会"),
        lead: tt(
          "Every challenge, matched to the opportunities that answer it.",
          "每一个挑战，都配上回应它的机会点。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/chal.jpg",
            caption: tt(
              "Challenges on the left, opportunities in the middle, and the case studies that evidence each one on the right — grouped as waste in Italy, product, and packaging.",
              "左侧是挑战，中间是机会，右侧是支撑它们的案例 —— 分为意大利的废弃物、产品与包装三组。"
            ),
          },
        ],
      },
      {
        id: "new-system",
        eyebrow: tt("05 · New system", "05 · 新系统"),
        label: tt("New system", "新系统"),
        lead: tt("Three integrable solutions, in one flow.", "三个可整合的解法，接在同一条流上。"),
        blocks: [
          {
            type: "defs",
            items: [
              {
                term: tt("Traceability and authenticity", "溯源与防伪"),
                text: tt(
                  "A QR code on the label opens certification, traceability information and authentication — technologies for product traceability and authenticity.",
                  "吊牌上的二维码可打开认证、溯源信息与真伪验证 —— 即产品溯源与防伪技术。"
                ),
              },
              {
                term: tt("Collecting and reusing clothing", "衣物回收与再利用"),
                text: tt(
                  "A system for collecting and reusing clothing, routed through repair points, transformers and second-hand e-commerce.",
                  "一套衣物回收与再利用系统，经由修补点、改造方与二手电商流转。"
                ),
              },
              {
                term: tt("Return and reuse of packaging", "包装回收与复用"),
                text: tt(
                  "A return and reuse system for e-commerce packaging, carried back through logistics partners, pickup points and the collection company.",
                  "一套电商包装的回收复用系统，通过物流伙伴、自提点与回收公司把包装带回来。"
                ),
              },
            ],
          },
          {
            type: "image",
            src: "/project/e-pack/hero.jpg",
            caption: tt(
              "The new system — packaging, material and process layers, with the old flows in orange and the new ones overlaid.",
              "新系统 —— 包装、材料与流程三层，旧流以橙色标出，新流叠加其上。"
            ),
          },
        ],
      },
      {
        id: "evaluation",
        eyebrow: tt("06 · Evaluation", "06 · 评估"),
        label: tt("Evaluation", "评估"),
        lead: tt("Outcomes and impacts, over three horizons.", "三个时间跨度上的产出与影响。"),
        blocks: [
          {
            type: "image",
            src: "/project/e-pack/eval.jpg",
            caption: tt(
              "Short, medium and long term outcomes at micro, meso and macro scale — from efficient resource use and reduced waste through to a regenerated ecosystem and an enhanced Made in Italy.",
              "微观、中观与宏观尺度上的短、中、长期产出 —— 从资源高效利用与废弃减少，一直到生态系统的再生与「意大利制造」的升值。"
            ),
          },
        ],
      },
    ],
  },
  gobino: {
    role: tt("Systemic Design · Team project", "系统设计 · 团队项目"),
    summary: tt(
      "A systemic design study of Guido Gobino, the Turin chocolate maker — diagnosing the territory and the company, then proposing a new system of projects that closes its material flows and strengthens its link to Piedmont.",
      "对都灵巧克力品牌 Guido Gobino 所做的系统设计研究 —— 先对地域与企业做整体诊断，再提出一套新的项目系统，把它的物质流闭合起来，并加强它与皮埃蒙特的联系。"
    ),
    tags: [
      tt("Systemic design", "系统设计"),
      tt("System design", "系统性设计"),
      tt("Food system", "食品系统"),
      tt("Team project", "团队项目"),
    ],
    sections: [
      {
        id: "territory",
        eyebrow: tt("01 · Territory", "01 · 地域"),
        label: tt("Holistic diagnosis — territory", "整体诊断 —— 地域"),
        lead: tt(
          "Piedmont, with a focus on the Metropolitan City of Turin.",
          "皮埃蒙特大区，重点是都灵都市区。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/1.jpg",
            caption: tt(
              "The territory — primary, secondary and tertiary sectors, population, waste, tourism and the history of chocolate in Turin.",
              "这片地域 —— 第一、第二、第三产业，人口、废弃物、旅游，以及都灵的巧克力历史。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/2.jpg",
            caption: tt(
              "The same diagnosis with the territory’s challenges marked on it.",
              "同一张诊断图，标出这片地域面临的挑战。"
            ),
          },
        ],
      },
      {
        id: "company",
        eyebrow: tt("02 · Company", "02 · 企业"),
        label: tt("Holistic diagnosis — company", "整体诊断 —— 企业"),
        lead: tt(
          "Guido Gobino, chocolate maker in Turin since 1964.",
          "Guido Gobino，自 1964 年起在都灵做巧克力。"
        ),
        blocks: [
          {
            text: tt(
              "The history of Guido Gobino’s chocolate shop dates back to 1964. Careful selection of raw materials, complete control of the production chain, constant research into new flavours and accurate packaging design make Guido Gobino’s chocolate one of the best in Turin. Quality is credibility.",
              "Guido Gobino 这家巧克力店的历史可以追溯到 1964 年。对原料的严格挑选、对生产链的完整掌控、对新风味的持续研究，以及精准的包装设计，让它成为都灵最好的巧克力之一。品质即信誉。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/3.jpg",
            caption: tt(
              "Supply chain, competitors, company history and the calendar of production and arrival of raw materials.",
              "供应链、竞争者、企业历史，以及生产与原料到港的时间表。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/4.jpg",
            caption: tt(
              "The same diagnosis with the company’s challenges marked on it.",
              "同一张诊断图，标出企业面临的挑战。"
            ),
          },
        ],
      },
      {
        id: "maps",
        eyebrow: tt("03 · System maps", "03 · 系统图"),
        label: tt("System maps", "系统图"),
        lead: tt("The flows as they run today.", "当下这些流实际的走法。"),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/8.jpg",
            caption: tt(
              "Linear map — cocoa and hazelnut in, chocolate out, with the outputs leaving the system.",
              "线性图 —— 可可与榛子进来、巧克力出去，副产物离开系统。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/7.jpg",
            caption: tt(
              "Systemic map — the same chain with its outputs routed back into local actors at town, regional and national scale.",
              "系统图 —— 同一条链条，副产物被导回城镇、区域与国家三个尺度上的本地参与者。"
            ),
          },
          {
            type: "note",
            text: tt(
              "The pair is the argument. The two maps carry the same production chain, so the only difference is what happens to cocoa bean shells, hazelnut cuticles, jute and used packaging — waste in the first map, inputs to someone else in the second.",
              "这两张图本身就是论点。它们画的是同一条生产链，唯一的差别在于可可壳、榛子皮、麻袋与用过的包装去了哪里 —— 在第一张图里是废弃物，在第二张图里是别人的原料。"
            ),
          },
        ],
      },
      {
        id: "opportunities",
        eyebrow: tt("04 · Challenges and opportunities", "04 · 挑战与机会"),
        label: tt("Challenges and opportunities", "挑战与机会"),
        lead: tt(
          "Company and territory challenges, against what could answer them.",
          "企业与地域的挑战，对上能回应它们的东西。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/5.jpg",
            caption: tt(
              "Every company and territory challenge linked to the opportunities that address it, evidenced by case studies.",
              "每个企业与地域挑战，都连向回应它的机会点，并由案例支撑。"
            ),
          },
          {
            type: "image",
            src: "/project/gobino/6.jpg",
            caption: tt(
              "Opportunities scored on innovation, financial return, social interest, networking and sustainability — selecting nine projects to take forward.",
              "机会点按创新性、财务回报、社会价值、网络联结与可持续性评分 —— 筛出九个项目继续推进。"
            ),
          },
        ],
      },
      {
        id: "roadmap",
        eyebrow: tt("05 · Roadmap", "05 · 路线图"),
        label: tt("Roadmap", "路线图"),
        lead: tt(
          "Nine projects, across short, medium and long term.",
          "九个项目，分布在短、中、长期。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/9.jpg",
            caption: tt(
              "Roadmap — new products for the line-up, jute and paper packaging, cocoa certification, a communication strategy and the promotion of the chocolate district.",
              "路线图 —— 产品线的新品、麻与纸的包装、可可认证、传播策略，以及巧克力街区的推广。"
            ),
          },
        ],
      },
      {
        id: "evaluation",
        eyebrow: tt("06 · Evaluation", "06 · 评估"),
        label: tt("Evaluate the system", "评估这个系统"),
        lead: tt(
          "Outcomes and impacts at micro, meso and macro scale.",
          "微观、中观与宏观尺度上的产出与影响。"
        ),
        blocks: [
          {
            type: "image",
            src: "/project/gobino/10.jpg",
            caption: tt(
              "Each project traced to its outcomes and impacts — from reduced environmental load and recycled waste through to increased territorial value and a stronger Made in Turin.",
              "每个项目都被追踪到它的产出与影响 —— 从环境负荷下降、废弃物被回收，一直到地域价值提升与更有分量的「都灵制造」。"
            ),
          },
          {
            type: "video",
            src: "https://www.youtube.com/embed/TqOcN8r7qaE",
            title: tt("Systemic Design for Guido Gobino", "Guido Gobino 的系统设计"),
            caption: tt("Project walkthrough.", "项目完整演示。"),
          },
          {
            type: "note",
            text: tt(
              "Credit where it is due: this was a team project for the Open Systems module of the Master’s in Systemic Design, with eight authors credited on every board.",
              "该署的名要署：这是系统设计硕士「开放系统」课程的团队项目，每一张图板上都署有八位作者。"
            ),
          },
        ],
      },
    ],
  },
}
