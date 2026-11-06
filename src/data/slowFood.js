// Slow Food (GROW) — the case-study deck, as page content.
//
// The source is the Slow Food column of the Figma 「作品集portfolio」 page: sixteen
// slides, most 1920×1080 and three of them several screens tall. Every word here is
// the deck's own, as real text in both languages; nothing is a flattened export of
// a slide. The artwork (photographs, renders, cut-outs, cards) is cropped out of
// the same file into /public/project/slow-food/deck/, and the app screens come
// from the SlowFood app file, one image per screen.
//
// Each entry is one slide. `kind` picks the layout in SlowFoodDeck.jsx, which
// re-lays the slide as tiles on the page's grid; the rest is that layout's content.
// `**…**` inside a string marks the words the slide set in bold.
import { tt } from "../i18n/t"

const ART = "/project/slow-food/deck"
const art = (name) => `${ART}/${name}.webp`

// --- The page header -------------------------------------------------------
//
// The deck's cover ("SlowFood 体验设计") folds into the page's own hero.

export const slowFoodRole = tt("UX/UI · Service & System Design", "UX/UI · 服务与系统设计")

export const slowFoodSummary = tt(
  "An experience design for the Slow Food restaurant in Bra: an app for growing vegetables online, and a courtyard rebuilt so guests harvest what they eat.",
  "为 Bra 的慢食协会餐厅做的创新体验设计：一个线上种菜的 App，加上一处重新设计的院子，让客人亲手收获自己要吃的菜。"
)

export const slowFoodHero = {
  image: "/project/slow-food/1.jpg",
  headline: tt("Plant your slow dishes.", "种出你的慢食。"),
}

export const slowFoodTags = [
  tt("Service design", "服务设计"),
  tt("System design", "系统设计"),
  tt("UX/UI", "UX/UI"),
  tt("Brand identity", "品牌形象"),
]

// --- The slides ------------------------------------------------------------

// 02–03 · Background — the town, then the organisation.
const background = {
  kind: "background",
  parts: [
    {
      title: tt("The city of Bra", "城市 Bra"),
      img: art("bra-map"),
      ratio: "1500 / 1435",
      items: [
        {
          term: tt("A capital of food culture", "美食文化中心"),
          text: tt(
            "Bra is the birthplace of the international **Slow Food** movement. Its food culture is rooted in Italian tradition and known for fine **cheese, wine** and **sausage**, and it is home to Italy’s **only University of Gastronomic Sciences**.",
            "Bra 是国际组织 **Slow Food** 运动的诞生地。Bra 的饮食文化深受意大利传统影响，以高质量的**奶酪、葡萄酒**和**香肠**等产品闻名，并且这里拥有意大利**唯一一所美食科学大学**。"
          ),
        },
        {
          term: tt("A place to travel to", "旅游度假地"),
          text: tt(
            "Bra has many **historic buildings**, from Baroque churches and the town hall to medieval streets. It sits close to **the Alps**, with a beautiful landscape around it, which makes it a good place to visit.",
            "Bra 拥有多处**历史悠久的建筑**，包括巴洛克风格的教堂和市政厅以及中世纪的街道等。同时地理位置靠近**阿尔卑斯**，拥有美丽的自然景观，成为了旅游的好去处。"
          ),
        },
        {
          term: tt("A centre of art and culture", "艺术和文化中心"),
          text: tt(
            "Every year Bra hosts **wine, food and music festivals**, and the important **white truffle fair**, drawing visitors and food lovers from all over the world.",
            "Bra 每年都会举办多种文化活动，包括**葡萄酒节、美食节和音乐节**等，还有重要的**白松露节**，吸引了来自世界各地的游客和美食爱好者。"
          ),
        },
      ],
    },
    {
      title: tt("Slow Food", "Slow Food"),
      img: art("slowfood-community"),
      ratio: "1191 / 842",
      items: [
        {
          term: tt("An international organisation", "国际性组织"),
          text: tt(
            "Founded in 1989, Slow Food sets out to **oppose fast-food culture** and to promote food that is produced and eaten in a way that is **“good, clean and fair”**.",
            "Slow Food 成立于 1989 年，其宗旨是**反对快餐文化**，提倡**「好、干净、公正」**的食品生产和消费方式。"
          ),
        },
        {
          term: tt("What it stands for", "组织理念"),
          text: tt(
            "It defends the **food culture** of each **local** ecoregion, the fruit and vegetables that belong to it, and local farming. Food should be **sustainable** for the environment, **fair** to producers and **healthy** for the people who eat it.",
            "提倡维持**当地**生态区的**饮食文化**，使用与之相关的蔬果、促进当地饲养业及农业。强调食物应该对**环境可持续**，对生产者**公平**，同时对消费者**健康**。"
          ),
        },
        {
          term: tt("Its reach", "影响力"),
          text: tt(
            "Slow Food is now present in **122 countries**, with more than **83,000 members**. Beyond consumers, it works **with governments and international bodies** to shape **laws and policy** on food safety, agriculture and biodiversity.",
            "Slow Food 已发展至全球 **122 个国家**，有超过 **83,000 名会员**。Slow Food 不仅在消费者层面产生影响，还通过与**政府机构和国际组织的合作**，推动了有关食品安全、农业政策和生物多样性的**法规和政策的制定**。"
          ),
        },
      ],
    },
  ],
}

// 04 · Research — the restaurant itself.
const research = {
  kind: "research",
  photo: art("osteria"),
  caption: "Osteria del Boccondivino · Slow Food Promozione S.r.l.",
  facts: [
    {
      term: tt("Slow Food", "Slow Food"),
      text: tt(
        "Slow Food works with many Italian restaurants, but Osteria del Boccondivino is its **only** official one.",
        "Slow Food 与许多意大利餐厅合作，但是 Osteria del Boccondivino 餐厅是 Slow Food **唯一**官方餐厅。"
      ),
    },
    {
      term: tt("Visitor traffic", "客流量"),
      text: tt(
        "From interviews with the manager and several full on-site recordings we got the traffic for weekdays and Saturdays. Even capped by its capacity, the restaurant sees **more than twice the traffic of an ordinary one**, which puts it **among the busiest** in Italy.",
        "通过对餐厅经理的访谈以及多次现场的全过程记录，我们得到了餐厅的工作日以及周六的客流量，在受容纳量的影响下，该餐厅的客流量依旧**远超一般餐厅的两倍**，在意大利属于**「顶流」**情况。"
      ),
    },
  ],
  findingsTitle: tt("What the research found", "调研总结"),
  figures: [
    { value: "2×", label: tt("the traffic of an ordinary restaurant", "一般餐厅的客流量") },
    { value: "1/5", label: tt("of visitors cannot get a table", "的游客无法到餐厅体验") },
    { value: "3/7", label: tt("of our visits found it closed", "的调研遇到餐厅没开门") },
  ],
  findings: [
    tt(
      "No online booking: a table can only be reserved **by phone**.",
      "餐厅无法线上预约，只能通过**电话预约**。"
    ),
    tt(
      "Because of booking and capacity, **1 in 5 visitors cannot eat at the restaurant**.",
      "由于预约和容纳量，会有 **1/5 游客无法到餐厅体验**。"
    ),
    tt(
      "**Information is out of sync.** The restaurant is closed on Sundays and sometimes takes a day off at random, yet the hours on Google Maps are not updated, so visitors arrive to a closed door. That happened on **3 of our 7 visits**. The **menu also changes** with the season and the day’s delivery, and **guests have no way to know**.",
      "**信息同步不到位**。餐厅周日不开门，平时偶尔会随机休假，谷歌地图营业时间未做调整，游客容易跑空。在 **7 次调研中有 3 次跑空**。另外，**菜单**根据时季和当天运输的蔬菜**而改变**，**客户难以知晓**。"
    ),
    tt("**Nothing new in the service experience.**", "**服务体验无创新。**"),
  ],
}

// 05 · Interview — three guests, and what each one took away.
const interview = {
  kind: "interview",
  people: [
    {
      photo: art("interview-kai"),
      name: "Kai Wang",
      meta: [
        tt("Chinese student, 27", "中国留学生，27 岁"),
        tt("Four years in Turin", "在都灵居住四年"),
        tt("Wants to try the food of different places", "希望尝试不同地方的美食"),
      ],
      quote: tt(
        "“I’ve seen that little snail logo in some Italian restaurants, but **I didn’t know what it was**. Before going in I saw some of the organisation’s publicity outside, but I didn’t really understand their philosophy. While eating, **I didn’t feel this restaurant was any different from the others**.”",
        "「有在一些意大利餐厅见过那个小蜗牛的标志，但**不知道是什么**。在进入这家餐厅之前，我在外面看到了一些关于该组织的宣传，但我并不了解他们的理念。在用餐时，我也**没有感觉到这家餐厅与其他餐厅有什么不同**。」"
      ),
      tags: [tt("Unaware of it", "不了解"), tt("No different from the rest", "与其他没有区别")],
      verdict: tt("Never felt what Slow Food stands for", "没感受到 Slow Food 传达的理念"),
    },
    {
      photo: art("interview-sofia"),
      name: "Sofia Serrano",
      meta: [
        tt("Mexican student, 24", "墨西哥学生，24 岁"),
        tt("On exchange in Italy", "意大利交换学习"),
        tt("Loves Italian culture and food", "喜欢意大利文化和美食"),
      ],
      quote: tt(
        "“**I know a bit** about Slow Food; you see it on some Italian menus. But after eating there, honestly, I think it **lacks character**. Bra has other traditional restaurants with real character where you can eat more local food at a fair price. So I **wouldn’t recommend** it to someone visiting Bra for the first time, unless they are really interested in the Slow Food organisation.”",
        "「我对 Slow Food **有一定的了解**，一些意大利餐厅的菜单能看到。但我体验过那家餐厅之后，老实说，我觉得它**缺乏特色**，在布拉还有其他有特色的传统餐厅，在那里你可以以合理的价格吃到更多当地美食。因此，我**不建议**第一次来 Bra 的人尝试这家餐厅，除非他们对 Slow Food 组织很有兴趣。」"
      ),
      tags: [tt("Knows a bit", "有一定了解"), tt("Its character doesn’t come through", "没有更好地体现出特色")],
      verdict: tt("Other local restaurants do it better", "当地其他传统餐厅体验更好"),
    },
    {
      photo: art("interview-lucia"),
      name: "Lucia Bianchi",
      meta: [
        tt("Italian, 40", "意大利人，40 岁"),
        tt("Travels everywhere with her kids", "带娃旅游达人"),
        tt("Loves regional food and local stories", "喜爱地方美食和当地故事"),
      ],
      quote: tt(
        "“**I had heard of it before**, so I brought my family specially. Outside the door I saw a lot about their story and thought it was a great thing, so I went in with high expectations. But eating there was **not much different** from any other restaurant. The waiters didn’t tell us the story behind the dishes or the ingredients either.”",
        "「我**之前听说过**，所以特地带家人一起来体验。在进入餐厅之前，我在门外看到了很多关于他们故事的宣传，我觉得这是一个伟大事情，所以我带着很多期待进去了。但我觉得在这家餐厅吃饭和其他餐厅**没有太多区别**。服务员也没有介绍菜肴或食材背后的故事。」"
      ),
      tags: [tt("Knows a bit", "有一定了解"), tt("Came to Bra for it", "特地去 Bra 体验")],
      verdict: tt("The service fell short of expectations", "服务体验没有符合期待"),
    },
  ],
}

// 06 · Design task — three outcomes at once.
const task = {
  kind: "task",
  lockup: art("plant-lockup"),
  goals: [
    {
      term: tt("An innovative experience", "创新体验"),
      text: tt(
        "Raise the restaurant’s “slow food” experience and service by **joining online and offline**. Guests should feel Slow Food not only when they taste the food, but also in how the ingredients are grown and how the dish is made, and so understand it better.",
        "通过**线上线下相结合**的创新方式，提高餐厅的「慢食」体验和服务。我们希望用户不仅能在品尝美食的过程中感受到 Slow Food 的存在，还能从食材的生产、食物的制作等方面感受到 Slow Food 的存在，从而更好地理解 Slow Food。"
      ),
    },
    {
      term: tt("Widen Slow Food’s influence", "扩大 Slow Food 的影响"),
      text: tt(
        "**Guests sharing** is one of the most effective ways to spread a message, so we want them to tell their story after the visit and **speak for us**. That raises Slow Food’s presence on social media and lets more people know it.",
        "我们认为**用户分享**是最有效的传播方式之一，因此我们希望用户在体验后分享他们的故事，**让用户为我们代言**。以此来提高 Slow Food 组织在社交媒体的影响力，让更多的人了解 Slow Food。"
      ),
    },
    {
      term: tt("Help Bra’s tourism economy", "帮助 Bra 的旅游经济"),
      text: tt(
        "Slow Food gave the area new energy, but it still lacks the innovation to draw wider attention. With this project we hope more people travel to Bra, and that **its tourism grows a step further**.",
        "Bra「Slow Food」的出现为该地区的发展注入了新的动力，但仍然缺乏足够的创新来吸引更多人的关注。我们希望通过这个项目能让更多的人来到 Bra 旅行，使 Bra 的**旅游业更进一步发展**。"
      ),
    },
  ],
}

// 07 · Case study — four farm-to-table references on the same five axes.
const AXES = [
  tt("Innovation", "创新"),
  tt("Experience", "体验"),
  tt("Emotion", "情感"),
  tt("Comfort", "舒适感"),
  tt("Sustainability", "可持续性"),
]

const cases = {
  kind: "cases",
  axes: AXES,
  items: [
    {
      img: art("case-stedsans"),
      name: "Stedsans",
      tagline: tt(
        "In Danish, “stedsans” means a sense of place or direction; you can also read it as “terroir”.",
        "丹麦语「Stedsans」意思是「地方 / 方向」，也可将其解释为「风土」"
      ),
      text: tt(
        "They moved the farm into the city and built the restaurant on it: before the meal, guests walk through the farm, feel how fresh the ingredients are, and can try picking some themselves.",
        "他们把农场搬到了城市里，并在那里建起了餐厅：顾客需要在用餐前漫步农场，感受食材的新鲜，还可以尝试亲自采摘。"
      ),
      scores: [3, 5, 4, 3, 4],
    },
    {
      img: art("case-segev-garden"),
      name: "Segev Kitchen Garden",
      tagline: tt("Harvested in the morning, plated in the afternoon", "上午收获，下午装盘"),
      text: tt(
        "The restaurant grows all the vegetables it serves in one huge garden, and adjusts the menu to the harvest so that what reaches the table is always the freshest.",
        "餐厅使用一个巨大的种植园来满足所有的蔬菜消费，并根据蔬菜的收成情况随时调整菜单，以确保提供最新鲜的蔬菜。"
      ),
      scores: [3, 3, 3, 4, 4],
    },
    {
      img: art("case-bluehill"),
      name: "Blue Hill",
      tagline: tt("From farm to table", "从农场到餐桌"),
      text: tt(
        "Blue Hill is a farm-to-table restaurant. It has no fixed menu, only a list of what is in season on the farm. Most of the produce comes from Blue Hill Farm.",
        "蓝山餐厅是一家从农场到餐桌的餐厅。餐厅没有固定菜单，但会列出来自农场的时令食材清单。原材料主要来自蓝山农场。"
      ),
      scores: [4, 3, 4, 3, 3],
    },
    {
      img: art("case-segev-greenhouse"),
      name: "Segev Kitchen Garden",
      tagline: tt("A greenhouse inside the restaurant", "餐厅内温室种植"),
      text: tt(
        "Vegetables grow inside the restaurant, ready to use at any moment. Guests see how fresh the food is, relax, and trust the food and the place more.",
        "蔬菜在餐厅内种植，随时可以使用，让顾客感受到食材的新鲜，放松心情，增强对食物和餐厅的信心。"
      ),
      scores: [4, 4, 4, 4, 5],
    },
  ],
}

// 08 · Persona — three visitors.
const HOBBY = tt("Likes", "喜好")
const GOAL = tt("Looks for", "生活追求")

const persona = {
  kind: "persona",
  hobbyLabel: HOBBY,
  goalLabel: GOAL,
  people: [
    {
      img: art("persona-emma"),
      name: "Emma Petit",
      who: tt("41, lawyer", "41 岁，律师"),
      hobby: tt("Cycling trips, cooking", "骑自行车旅行、做饭"),
      goal: tt(
        "To get away from the noise and enjoy the quiet. To slow life down, be part of nature and follow its rhythm.",
        "远离喧嚣，享受宁静。放慢生活节奏，将自己融入大自然，顺应自然发展规律。"
      ),
      quote: tt("“Nature is the real law.”", "「自然才是真正的法则。」"),
    },
    {
      img: art("persona-giulia"),
      name: "Giulia Ferrari",
      who: tt("25, student", "25 岁，学生"),
      hobby: tt("Photography, travel", "摄影、旅游"),
      goal: tt(
        "To get to know people and culture in a fun way, and explore how a city relates to nature.",
        "以有趣的方式了解人文，探索城市与自然的关系。"
      ),
      quote: tt(
        "“The point of travelling is to understand how people in different places live.”",
        "「旅行的意义在于了解不同地方人们的不同生活方式。」"
      ),
    },
    {
      img: art("persona-leonardo"),
      name: "Leonardo Rossi",
      who: tt("33, pharmacist", "33 岁，药剂师"),
      hobby: tt("Growing plants, hiking, good food", "绿色种植、徒步旅行、美食"),
      goal: tt(
        "To taste food he hasn’t had before, without giving up a healthy diet.",
        "品尝到不一样的美食，能兼顾饮食健康。"
      ),
      quote: tt(
        "“Only a healthy diet makes a healthy life.”",
        "「只有健康的饮食，才能有健康的生活。」"
      ),
    },
  ],
}

// 09 · Project overview — the loop between the app and the restaurant.
const overview = {
  kind: "overview",
  loopLabel: tt("The loop", "闭环"),
  loop: [
    { img: art("card-paper"), label: tt("Seed card", "种子卡") },
    { img: art("card-seed"), label: tt("Online planting", "线上种植") },
    { img: art("card-harvest"), label: tt("Harvest card", "收获卡") },
    { img: art("ov-osteria"), label: tt("The restaurant", "餐厅") },
    { icon: "community", label: tt("Community", "社区") },
  ],
  loopBack: tt(
    "Stories in the community spark interest in Bra, and a chance to draw the next seed card.",
    "社区里的故事激发对 Bra 的兴趣，也带来下一次抽卡机会。"
  ),
  app: {
    title: tt("The app", "线上 App"),
    img: art("ov-phones"),
    items: [
      {
        icon: "sprout",
        label: tt("Online planting", "线上种植"),
        note: tt("Seed card, special-edition seed card", "种子卡、特别版种子卡"),
      },
      {
        icon: "community",
        label: tt("Community", "社区"),
        note: tt("Sparks interest in Bra, a chance to draw a card", "激发 Bra 的兴趣、抽卡机会"),
      },
      {
        icon: "booking",
        label: tt("Restaurant booking", "餐厅预订"),
        note: tt("Today’s menu, book a table", "当日菜单、在线订位"),
      },
    ],
  },
  restaurant: {
    title: tt("The restaurant", "餐厅"),
    img: art("ov-osteria"),
    partners: [
      { img: art("ov-slowfood"), label: "Slow Food" },
      { img: art("ov-local"), label: tt("Local ingredients", "当地材料") },
    ],
    items: [
      { img: art("ov-planting"), label: tt("Try planting", "体验种植") },
      { img: art("ov-harvest"), label: tt("Harvest the produce", "收获果实") },
      { img: art("ov-chefs"), label: tt("Cooked in the kitchen", "后厨制作") },
      { img: art("ov-dining"), label: tt("Dining", "用餐") },
    ],
  },
}

// 10 · App design — what the app does, in three parts.
const app = {
  kind: "app",
  screens: [
    { src: art("app-splash"), alt: tt("GROW launch screen", "GROW 启动页") },
    { src: art("app-plant"), alt: tt("Plant your slow dishes", "Plant your slow dishes 引导页") },
  ],
  features: [
    {
      term: tt("Online planting", "线上种植"),
      text: tt(
        "Planting online lets people follow an ingredient from seed to ripeness. A successful crop earns a harvest card, exchanged for ingredients when dining at the restaurant. Online planting follows the laws of nature.",
        "在线种植让用户从蔬菜瓜果的种植中体验食材的生长成熟过程，线上种植成功可以获得收获卡，进行线下就餐时兑换食材。线上种植会遵循自然规律。"
      ),
    },
    {
      term: tt("Story community", "故事社区"),
      text: tt(
        "Here people share their planting stories, their meals and what “slow food” means to them, and read the stories of others. We pick the interesting ones to promote, and draw new users that way.",
        "在这里，用户可以分享种植故事、用餐体验和对「慢食」的感悟，也可以看到其他人的故事。我们将挑选有趣的故事进行新的推广，通过这种方式吸引用户。"
      ),
    },
    {
      term: tt("Restaurant booking", "餐厅预订"),
      text: tt(
        "Book a table online and see the menu of the day, and find out what the Slow Food organisation is currently running.",
        "可以线上预订餐厅，并了解当天的菜单。同时可以了解到慢食组织正在进行的一些活动。"
      ),
    },
  ],
}

// 11 · Online planting — three steps, then the three screens they happen on.
const planting = {
  kind: "planting",
  steps: [
    {
      title: tt("Get an online seed card", "获得线上种子卡"),
      card: art("card-scan"),
      extra: art("card-paper"),
      extraKind: "card",
      lead: tt(
        "Scan a paper seed card to get an online one",
        "扫描纸质种子卡，可以获得线上种子卡"
      ),
      text: tt(
        "Paper seed cards come with a meal at the restaurant. Online ones can also be earned directly, through the city exploration tour, promotions or sharing with friends.",
        "通过餐厅就餐可以获得纸质种子卡，或者通过线上城市探索之旅、促销活动、与朋友分享等直接获得线上种子卡。"
      ),
    },
    {
      title: tt("Grow it online", "体验线上种植"),
      card: art("card-seed"),
      extra: art("actions-grow"),
      extraKind: "wide",
      lead: tt("Go through the planting itself", "体验线上种植过程"),
      text: tt(
        "Planting simulates the four seasons, the weather at the restaurant’s own plot and the way real vegetables grow, so it feels like the real thing.",
        "线上种植过程会模拟四季变化、餐厅种植地的天气变化、真实蔬果成长的过程，让用户体验到真实的种植感。"
      ),
    },
    {
      title: tt("Earn a harvest card", "获得收获卡"),
      card: art("card-harvest"),
      extra: art("action-harvest"),
      extraKind: "icon",
      lead: tt("Harvest when the crop is ripe", "作物成熟后收获"),
      text: tt(
        "A successful crop earns a harvest card, exchanged for ingredients when dining at the restaurant.",
        "线上种植成功可以获得收获卡，进行线下就餐时兑换食材。"
      ),
    },
  ],
  screens: [
    {
      src: art("app-grow-home"),
      title: tt("Planting home", "种植主页"),
      marks: [
        { x: 74, y: 14.5, label: tt("Seed cards", "种子卡") },
        { x: 80, y: 51, label: tt("Harvest cards", "收获卡") },
      ],
    },
    {
      src: art("app-grow-plant"),
      title: tt("Planting page · growing", "种植页 · 种植过程"),
      marks: [
        { x: 14, y: 22, label: tt("Temperature at the plot", "种植地气温") },
        { x: 90, y: 33, label: tt("Plant status data", "种植物状态数据") },
        { x: 86, y: 52, label: tt("Time to ripeness", "距离成熟时间") },
        { x: 20, y: 60, label: tt("Plant status", "种植物状态") },
        { x: 50, y: 71, label: tt("Planting actions", "种植操作") },
      ],
    },
    {
      src: art("app-grow-harvest"),
      title: tt("Planting page · harvest", "种植页 · 收获过程"),
      marks: [
        { x: 86, y: 52, label: tt("The plant is ripe", "种植物成熟") },
        { x: 68, y: 76, label: tt("Harvest action", "收获操作") },
      ],
    },
  ],
}

// 12 · Story community.
const community = {
  kind: "community",
  groups: [
    {
      label: tt("Stories", "故事流"),
      text: tt(
        "People see the photos and stories other users share.",
        "用户可以看到其他用户分享的照片和故事。"
      ),
      screens: [
        { src: art("app-feed-garden"), caption: tt("Planting", "种植") },
        { src: art("app-feed-food"), caption: tt("Slow food", "慢食") },
        { src: art("app-feed-restaurant"), caption: tt("Restaurant", "餐厅") },
      ],
    },
    {
      label: tt("Check-ins", "城市打卡"),
      text: tt(
        "On the way around Bra they find check-in points, take a photo to learn more about the place, and receive a random reward.",
        "用户还可以在 Bra 的旅途中找到打卡点，拍照打卡以了解更多信息，并可以获得随机奖励。"
      ),
      screens: [
        { src: art("app-explore-map"), caption: tt("Find a point", "找到打卡点") },
        { src: art("app-explore-photo"), caption: tt("Take the photo", "拍照打卡") },
        { src: art("app-explore-reward"), caption: tt("Pick a reward", "获得奖励") },
      ],
    },
  ],
}

// 12 · Restaurant booking.
const booking = {
  kind: "booking",
  banner: art("app-booking-banner"),
  points: [
    tt(
      "The page shows what is new at the restaurant, such as the arrival of a new season’s seed cards.",
      "在这个页面上，用户可以看到餐厅的最新活动（如新一季种子卡的出现）。"
    ),
    tt(
      "Dinner at the restaurant can be booked right here.",
      "此外，用户还可以在此直接预订餐厅晚餐。"
    ),
  ],
  screens: [
    { src: art("app-booking-home"), caption: tt("News and today’s menu", "最新活动与当日菜单") },
    { src: art("app-booking-calendar"), caption: tt("Pick a date and time", "选择日期和时间") },
  ],
}

// 13 · Space redesign — the courtyard, zone by zone.
const ZONE = {
  indoor: "#d9d9d9",
  corridor: "#ffe2b0",
  dining: "#f1cdcb",
  kitchen: "#4b80b8",
  planting: "#a5d38f",
}

const space = {
  kind: "space",
  plan: art("space-plan"),
  zones: art("space-zones"),
  statement: tt(
    "After surveying the site, the restaurant’s outdoor space was redesigned. It is divided into three main areas and one corridor.",
    "据实地考察，对餐厅的室外空间进行了重新设计。空间被划分为三个主要区域和一条走廊。"
  ),
  legend: [
    { color: ZONE.indoor, label: tt("Indoor dining", "室内用餐区") },
    { color: ZONE.corridor, label: tt("Exhibition corridor", "展览走廊") },
    { color: ZONE.dining, label: tt("Outdoor dining", "室外用餐区") },
    { color: ZONE.kitchen, label: tt("Open kitchen", "开放式厨房") },
    { color: ZONE.planting, label: tt("Planting area", "种植区") },
  ],
  ideas: [
    {
      term: tt("A place to plant", "种植体验区"),
      text: tt(
        "With a special online seed card or a harvest card, guests get to plant or harvest the raw ingredients themselves in the restaurant’s planting area, and understand “slow food” by doing it.",
        "使用线上特殊种子卡或者收获卡，用户将有机会在餐厅的种植区亲自种植或收获食物的原材料，从而通过亲身体验加深对「慢食」的理解。"
      ),
    },
    {
      term: tt("An open kitchen", "开放厨房"),
      text: tt(
        "Cooking is made open and transparent. Guests see how the food is made while they eat, and take in the “slow” way of making it.",
        "将食物制作过程公开透明化，用户可以边吃边了解食物是如何制作的，从而体验「慢食」的制作过程。"
      ),
    },
  ],
  areas: [
    {
      color: ZONE.corridor,
      mini: art("space-mini-corridor"),
      title: tt("Exhibition corridor", "展览走廊"),
      text: tt(
        "A corridor runs from the entrance, with posters for programmes and events on both walls.",
        "餐厅入口处有一条走廊，走廊两侧张贴着宣传节目和活动的海报。"
      ),
      shots: [{ src: art("space-corridor"), ratio: "1500 / 881" }],
    },
    {
      color: ZONE.kitchen,
      mini: art("space-mini-kitchen"),
      title: tt("Open kitchen", "开放式厨房"),
      text: tt(
        "The area has two parts: the reception desk and the open kitchen.",
        "该区域由两部分组成，一部分是前台服务区，另一部分是开放式厨房。"
      ),
      shots: [
        {
          src: art("space-reception"),
          ratio: "1500 / 893",
          title: tt("Reception", "接待服务区"),
          text: tt(
            "The reception desk sits at the entrance and exit, which straightens out the restaurant’s flow. The old one was in a corner indoors and hard to find.",
            "接待服务区设在入口 / 出口处，合理化餐厅流程。（原来的接待处位于室内的一个角落，很难找到）"
          ),
        },
        {
          src: art("space-kitchen"),
          ratio: "1500 / 883",
          title: tt("Open kitchen", "开放式厨房"),
          text: tt(
            "Guests watch the food being made up close, a more direct way to take in how “slowly” it is prepared.",
            "开放式厨房可以让用户近距离观看食物制作，更直观地体验「缓慢」的食物制作过程。"
          ),
        },
      ],
    },
    {
      color: ZONE.planting,
      mini: art("space-mini-planting"),
      title: tt("Planting area", "种植区"),
      text: tt(
        "Here guests plant their own vegetables with a special seed card from the app. With a harvest card they pick their own, and what they harvest goes into their meal for free.",
        "在这一区域，用户可凭特殊种子卡（App 上）在种植区种植自己的蔬菜。用户还可以使用收获卡采摘自己的蔬菜（收获的蔬菜将免费包含在消费者的食物）。"
      ),
      cards: [
        { src: art("card-special"), label: tt("Special seed card", "特殊种子卡") },
        { src: art("card-harvest"), label: tt("Harvest card", "收获卡") },
      ],
      shots: [
        { src: art("space-planting-a"), ratio: "1500 / 957" },
        { src: art("space-planting-b"), ratio: "1500 / 961" },
      ],
    },
    {
      color: ZONE.dining,
      mini: art("space-mini-dining"),
      title: tt("Dining area", "用餐区"),
      text: tt(
        "In the open-air dining area guests enjoy the meal in comfort while watching it being made, which adds to the pleasure of eating.",
        "在露天用餐区，用户可以一边舒适地享受美食，一边观看食物的制作过程，为用餐增添更多乐趣。"
      ),
      shots: [{ src: art("space-dining"), ratio: "1500 / 875" }],
    },
  ],
}

// 14 · User journey — sixteen steps in four stretches.
const step = (n, title, text) => ({ img: art(`journey-${String(n).padStart(2, "0")}`), title, text })

const journey = {
  kind: "journey",
  phases: [
    {
      label: tt("Plant online", "线上种植"),
      steps: [
        step(
          1,
          tt("A friend shares", "朋友分享"),
          tt("A friend tells you about GROW and hands you a card.", "朋友告诉你 Grow 项目，并给了一张卡片")
        ),
        step(
          2,
          tt("Get an online seed card", "获得线上种子卡"),
          tt(
            "Download the app, scan the card with your phone and receive a seed card.",
            "下载 App 并用手机扫描卡片，得到了一张种子卡"
          )
        ),
        step(3, tt("Start planting", "开始种植"), tt("Begin planting online.", "开始体验线上种植")),
        step(
          4,
          tt("Harvest", "收获"),
          tt("Finish the crop and earn a harvest card.", "完成线上种植，收获一张收获卡")
        ),
      ],
    },
    {
      label: tt("Explore Bra", "探索 Bra"),
      steps: [
        step(
          5,
          tt("Book the restaurant", "预订餐厅"),
          tt("See the menu online and book.", "在线查看菜单并预订食物")
        ),
        step(
          6,
          tt("Explore the city", "探索城市"),
          tt(
            "Follow your interests, go where you want to go and look around.",
            "追随自己的兴趣，去你想去的地方，浏览当地"
          )
        ),
        step(
          7,
          tt("Photo check-in", "拍照打卡"),
          tt("Photograph a local sight to activate the place.", "拍照打卡当地景点，激活地点")
        ),
        step(
          8,
          tt("Get a reward", "获得奖励"),
          tt("The check-in succeeds and a random reward arrives.", "打卡成功，随机获得奖励")
        ),
      ],
    },
    {
      label: tt("At the restaurant", "到店体验"),
      steps: [
        step(
          9,
          tt("See the exhibition", "观看展览"),
          tt(
            "Before going in, look at the small exhibition in the corridor.",
            "在进入餐厅之前，观看走廊上的小型展览活动"
          )
        ),
        step(
          10,
          tt("Reception", "前台接待"),
          tt(
            "Show the booking and the harvest card, and get to harvest the ingredients yourself.",
            "出示预订和收获卡，得到亲自收获食材的机会"
          )
        ),
        step(11, tt("Pick the ingredients", "采摘食材"), null),
        step(
          12,
          tt("Hand them over", "食材交递"),
          tt(
            "Give the vegetables to the chef, who starts preparing the food.",
            "将收获的蔬菜交给厨师，由他开始准备食物"
          )
        ),
      ],
    },
    {
      label: tt("Dine and share", "用餐与分享"),
      steps: [
        step(
          13,
          tt("Dine", "用餐"),
          tt(
            "Enjoy the meal while watching the food being prepared.",
            "在享用美食的同时观察食物的准备过程"
          )
        ),
        step(
          14,
          tt("Pay", "买单"),
          tt(
            "After the meal you receive a new seed card at the till.",
            "用餐结束后，您会在收银台收到一张新的种子卡"
          )
        ),
        step(
          15,
          tt("Share the story", "分享故事"),
          tt(
            "Tell the community about the planting and the meal.",
            "在社区分享自己关于种植过程和用餐体验的故事"
          )
        ),
        step(
          16,
          tt("Share with a friend", "朋友分享"),
          tt("Give the seed card to another friend.", "与其他朋友分享赠送种子卡")
        ),
      ],
    },
  ],
  loop: tt("The last step is the first step of the next guest.", "最后一步，就是下一位客人的第一步。"),
}

// 15 · Visual design — the identity and where it goes.
const visual = {
  kind: "visual",
  logo: art("logo-grid"),
  logoLabel: tt("Logo", "LOGO"),
  ideas: [tt("Plant elements", "植物元素"), tt("Irregular spacing", "不规则间距"), tt("Natural growth", "自然生长")],
  typeLabel: tt("Typefaces", "字体"),
  faces: [
    { role: tt("Headings", "标题"), img: art("type-eiko"), name: "PP Eiko", ratio: "862 / 220" },
    { role: tt("Body", "正文"), img: art("type-sofia"), name: "Sofia Pro", ratio: "745 / 200" },
  ],
  colorLabel: tt("Colours", "颜色"),
  colors: ["#249A48", "#66B447", "#4B80B8", "#231815"],
  usesLabel: tt("Applications", "应用延展"),
  uses: [
    { src: art("brand-wrap"), label: tt("Wrapping paper", "包装纸") },
    { src: art("brand-menu"), label: tt("Menu", "菜单") },
    { src: art("brand-namecard"), label: tt("Name card", "名片") },
    { src: art("brand-bags"), label: tt("Bags", "购物袋") },
    { src: art("brand-posters"), label: tt("Wall posters", "墙面海报") },
    { src: art("brand-boxes"), label: tt("Packaging", "包装盒") },
    { src: art("brand-aprons"), label: tt("Aprons", "围裙") },
    { src: art("brand-billboard"), label: tt("Outdoor advertising", "户外广告") },
    { src: art("brand-storycards"), label: tt("Story cards", "故事卡片") },
    { src: art("brand-social"), label: tt("Social media", "社交媒体") },
  ],
}

// 16 · Discounted cash flow.
const dcf = {
  kind: "dcf",
  costLabel: tt("Cost structure", "成本结构"),
  costs: [
    {
      label: tt("Fixed costs", "固定成本"),
      groups: [
        {
          label: tt("Space design", "空间设计"),
          items: [
            tt("Outdoor dining", "室外用餐区"),
            tt("Open kitchen", "开放式厨房"),
            tt("Planting area", "种植区"),
            tt("Property and fees", "物业等费用"),
          ],
        },
        {
          label: tt("Development and upkeep", "开发和维护"),
          items: [tt("App", "App"), tt("Server rental", "服务器租赁")],
        },
        {
          label: tt("Human resources", "人力资源"),
          items: [tt("The project", "项目整体"), tt("App operations", "App 运营"), tt("Restaurant service", "餐厅服务")],
        },
        {
          label: tt("Marketing", "市场营销"),
          items: [tt("Online promotion", "线上推广营销"), tt("Offline promotion", "线下推广营销")],
        },
      ],
    },
    {
      label: tt("Variable costs", "可变成本"),
      groups: [
        {
          label: tt("Running and upkeep", "运行和维护"),
          items: [tt("Restaurant ingredients", "餐厅食材")],
        },
      ],
    },
  ],
  sheetLabel: tt("Twelve-quarter model", "十二个季度的测算表"),
  sheets: [
    { src: art("dcf-costs"), ratio: "1800 / 830" },
    { src: art("dcf-flow"), ratio: "1800 / 752" },
  ],
  rowLabels: {
    npv: tt("NPV", "净现值 NPV"),
    irr: tt("IRR", "折现率 TIR"),
    pbp: tt("Payback", "偿还期 PBP"),
  },
  scenarios: [
    { name: tt("Optimistic", "乐观"), npv: "341,761.62", irr: "19.38%", pbp: tt("9th quarter", "第 9 季度") },
    { name: tt("Neutral", "中性"), npv: "159,615.85", irr: "11.55%", pbp: tt("10th quarter", "第 10 季度"), lit: true },
    { name: tt("Pessimistic", "悲观"), npv: "100,068.14", irr: "8.17%", pbp: tt("12th quarter", "第 12 季度") },
  ],
  conclusion: tt(
    "By the neutral DCF estimate, the project breaks even in the tenth quarter.",
    "根据 DCF 中性评估，该项目可以在第十个季度达到盈亏平衡点。"
  ),
}

// --- Sections ----------------------------------------------------------------
//
// One slide, one chapter. `label` is the short name in the chapter index;
// `heading` is the title the page draws.

const slide = (kind) => [{ type: "sfdeck", slide: kind }]

// The deck pairs each Chinese title with its English name ("项目背景 / Background").
// The Chinese page keeps that as the eyebrow; on the English page it would only
// repeat the heading, so it is left out there.
const en = (name) => tt("", name)

export const slowFoodSections = [
  {
    id: "background",
    eyebrow: en("Background"),
    label: tt("Background", "项目背景"),
    heading: tt("Background", "项目背景"),
    blocks: slide(background),
  },
  {
    id: "research",
    eyebrow: en("Research"),
    label: tt("Research", "餐厅调研"),
    heading: tt("Researching the restaurant", "餐厅调研"),
    blocks: slide(research),
  },
  {
    id: "interview",
    eyebrow: en("Interview"),
    label: tt("Interview", "用户访谈"),
    heading: tt("User interviews", "用户访谈"),
    blocks: slide(interview),
  },
  {
    id: "design-task",
    eyebrow: en("Design task"),
    label: tt("Design task", "设计目标"),
    heading: tt("Design goals", "设计目标"),
    blocks: slide(task),
  },
  {
    id: "case-study",
    eyebrow: en("Case study"),
    label: tt("Case study", "相关案例"),
    heading: tt("Related cases", "相关案例"),
    blocks: slide(cases),
  },
  {
    id: "persona",
    eyebrow: en("Persona"),
    label: tt("Persona", "用户画像"),
    heading: tt("Personas", "用户画像"),
    blocks: slide(persona),
  },
  {
    id: "project-overview",
    eyebrow: en("Project overview"),
    label: tt("Overview", "项目设计"),
    heading: tt("The project", "项目设计"),
    lead: tt(
      "A seed card starts the planting online. A finished crop earns a harvest card, redeemed at the restaurant for planting, harvesting and a meal cooked with local ingredients. The visit then feeds the community, which sends the next guest to Bra.",
      "一张种子卡开启线上种植。种成之后得到收获卡，到餐厅兑换成体验种植、收获果实，以及用当地材料现做的一餐。这次到访再回到社区，把下一位客人带到 Bra。"
    ),
    blocks: slide(overview),
  },
  {
    id: "app-design",
    eyebrow: en("App design"),
    label: tt("App design", "线上 App 设计"),
    heading: tt("The app", "线上 App 设计"),
    blocks: slide(app),
  },
  {
    id: "planting",
    eyebrow: en("App design"),
    label: tt("Online planting", "线上种植"),
    heading: tt("Online planting", "线上种植"),
    blocks: slide(planting),
  },
  {
    id: "community",
    eyebrow: en("Community"),
    label: tt("Community", "故事社区"),
    heading: tt("Story community", "故事社区"),
    blocks: slide(community),
  },
  {
    id: "booking",
    eyebrow: en("Booking"),
    label: tt("Booking", "餐厅预订"),
    heading: tt("Restaurant booking", "餐厅预订"),
    blocks: slide(booking),
  },
  {
    id: "space-design",
    eyebrow: en("Space redesign"),
    label: tt("Space", "餐厅改造"),
    heading: tt("Redesigning the restaurant", "餐厅改造"),
    blocks: slide(space),
  },
  {
    id: "user-journey",
    eyebrow: en("User journey"),
    label: tt("Journey", "用户旅程图"),
    heading: tt("User journey", "用户旅程图"),
    blocks: slide(journey),
  },
  {
    id: "design-visivo",
    eyebrow: en("Design visivo"),
    label: tt("Visual", "视觉设计"),
    heading: tt("Visual design", "视觉设计"),
    blocks: slide(visual),
  },
  {
    id: "business",
    eyebrow: en("Discounted cash flow"),
    label: tt("Cash flow", "现金流贴现"),
    heading: tt("Discounted cash flow", "现金流贴现"),
    blocks: slide(dcf),
  },
]
