// HMI (Granstudio × Shumei Zhang) — the case-study deck, rebuilt as page content.
//
// The source is the "Granstudio" page of the Figma file (1920×1080 slides, white
// ground, Montserrat, a navy heading ink and one purple accent that marks the path
// the project actually designs: manual → autonomous). Nothing here is a flattened
// export of a slide: every word is real text in both languages, and every column is
// a real box that reflows, so the deck reads on a phone as well as on a laptop.
// The artwork — SAE-level figures, avatars, G-Va, the wheel, the breath light, the
// two screens in both modes — is exported from the same file into
// /public/project/hmi/deck/.
//
// Each entry is one slide. `kind` picks the layout in HmiDeck.jsx; the rest is that
// layout's content. `**…**` inside a string marks the words the slide set in bold.
import { tt } from "../i18n/t"

const ART = "/project/hmi/deck"

// --- The page header -------------------------------------------------------
//
// The deck's cover ("GRANSTUDIO × Shumei Zhang") folds into the page's own hero,
// the way the Kyrall page opens: the key visual runs full-bleed behind the name,
// the one line the project is about, and a meta row.

export const hmiRole = tt("UX/UI · HMI Interaction Design", "UX/UI · 车机交互设计")

export const hmiSummary = tt(
  "Designing the moment a car takes over from its driver — the transition from Manual to Autonomous Driving mode, across voice, lever, instrument cluster and centre display, prototyped in ProtoPie.",
  "设计汽车从驾驶员手中接过控制权的那一刻 —— 从手动驾驶切换到自动驾驶模式，覆盖语音、拨杆、仪表盘与中控屏，并用 ProtoPie 做成可交互原型。"
)

export const hmiHero = {
  image: `${ART}/dash-auto.png`,
  headline: tt(
    "Hand the wheel to the car, without losing the driver.",
    "把方向盘交给车，但别把驾驶员丢掉。"
  ),
  meta: [
    { label: tt("Role", "角色"), value: hmiRole },
    { label: tt("Tools", "工具"), value: "Figma · ProtoPie" },
  ],
}

export const hmiTags = [
  tt("HMI design", "HMI 设计"),
  tt("Automotive UX", "汽车体验设计"),
  tt("ProtoPie", "ProtoPie"),
]

// --- Shared copy -----------------------------------------------------------

const ENTER = tt("Enter into Autonomous Driving Mode", "进入自动驾驶模式")
const MANUAL_MODE = tt("Manual Driving Mode", "手动驾驶模式")
const AUTO_MODE = tt("Autonomous Driving Mode", "自动驾驶模式")

// --- The slides ------------------------------------------------------------

// 02 · Background — the six SAE levels, then the sentence that frames the project.
const background = {
  kind: "levels",
  levels: [
    { img: `${ART}/level-0.png`, n: tt("Level 0", "L0"), label: tt("No Driving Automation", "无驾驶自动化") },
    { img: `${ART}/level-1.png`, n: tt("Level 1", "L1"), label: tt("Driver Assistance", "驾驶辅助") },
    { img: `${ART}/level-2.png`, n: tt("Level 2", "L2"), label: tt("Partial Driving Automation", "部分驾驶自动化") },
    { img: `${ART}/level-3.png`, n: tt("Level 3", "L3"), label: tt("Conditional Driving Automation", "有条件驾驶自动化") },
    { img: `${ART}/level-4.png`, n: tt("Level 4", "L4"), label: tt("High Driving Automation", "高度驾驶自动化") },
    { img: `${ART}/level-5.png`, n: tt("Level 5", "L5"), label: tt("Full Driving Automation", "完全驾驶自动化") },
  ],
  statement: tt(
    "With the popularization of assisted driving functions such as L2 and L3, the mode switch between driver-controlled and vehicle-controlled driving has become an important vehicle control function.",
    "随着 L2、L3 等辅助驾驶功能的普及，「由人控制」与「由车控制」之间的模式切换，已经成为一项重要的车辆控制功能。"
  ),
}

// 11 · Design trends — where the industry stands, and where the interaction is heading.
const trends = {
  kind: "trends",
  flag: `${ART}/flag.png`,
  here: tt("Level 2.5", "Level 2.5"),
  hereNote: tt("we are here", "我们在这里"),
  items: [
    tt("Personalization", "个性化"),
    tt("Intelligent emotional interaction", "智能情感化交互"),
    tt("Multi-channel interaction coordination", "多通道交互协同"),
    tt("… …", "… …"),
  ],
}

// 03 · User interview — three drivers already living with L2/L3 systems.
const interview = {
  kind: "interview",
  people: [
    {
      avatar: `${ART}/avatar-hu.png`,
      name: tt("Hu, 29", "胡，29 岁"),
      meta: [tt("Shenzhen, China", "中国深圳"), tt("AITO M5 (Huawei ADS 2.0)", "问界 M5（华为 ADS 2.0）")],
      quotes: [
        tt("Autonomous driving is unbeatable!", "自动驾驶太香了！"),
        tt(
          "My concern is that it will **change driving habits**, **leading to less focused attention** and increased risk.",
          "我担心它会**改变驾驶习惯**，**让注意力不再集中**，反而增加风险。"
        ),
        tt(
          "The interaction of turning the steering wheel every 30 seconds during high-speed driving assistance is quite useless.",
          "高速辅助驾驶时每 30 秒要扶一下方向盘的交互，挺没用的。"
        ),
      ],
    },
    {
      avatar: `${ART}/avatar-gao.png`,
      name: tt("Gao, 24", "高，24 岁"),
      meta: [tt("Shenzhen, China", "中国深圳"), tt("BMW 325Li M", "宝马 325Li M")],
      quotes: [
        tt("Did not consider buying smart driving because of **safety issues**", "因为**安全问题**，没考虑买智能驾驶"),
        tt(
          "Worried about imperfect laws and regulations and accident liability",
          "担心法律法规不完善，以及事故责任归属"
        ),
        tt("**Can't fully trust** intelligent driving", "**没法完全信任**智能驾驶"),
      ],
    },
    {
      avatar: `${ART}/avatar-yang.png`,
      name: tt("Yang, 35", "杨，35 岁"),
      meta: [tt("Guangzhou, China", "中国广州"), tt("Avatr 11 (Huawei ADS 2.0)", "阿维塔 11（华为 ADS 2.0）")],
      quotes: [
        tt(
          "In complex road conditions, autonomous driving is not very intelligent.",
          "复杂路况下，自动驾驶不太聪明。"
        ),
        tt(
          "The warning for autonomous driving failure is **not timely** in complex situations, leading to potential danger (due to a **lack of roadside information** support).",
          "复杂情况下自动驾驶失效的提醒**不够及时**，有潜在危险（因为**缺少路侧信息**的支持）。"
        ),
        tt(
          "Complex road conditions require **frequent switching** between modes.",
          "复杂路况需要在两种模式之间**频繁切换**。"
        ),
      ],
    },
  ],
}

// 04 · User journey map — five stages; the two the project designs are lit.
const journey = {
  kind: "journey",
  stages: [
    {
      label: tt("Get in the Car / Ready to Depart", "上车 / 准备出发"),
      steps: [tt("User Starts the Car", "用户启动车辆"), tt("Set Navigation", "设置导航")],
    },
    {
      label: tt("Manual Driving", "手动驾驶"),
      steps: [
        tt("User Controls the Vehicle", "用户控制车辆"),
        tt("System Indicates Autonomous Driving is Available", "系统提示可进入自动驾驶"),
        tt("Receive Prompt", "收到提示"),
      ],
    },
    {
      label: tt("Preparing to Enter Autonomous Driving Mode", "准备进入自动驾驶模式"),
      lit: true,
      steps: [
        tt("Choose to enter Autonomous Driving Mode", "选择进入自动驾驶模式"),
        tt("Confirm Entry into Autonomous Driving Mode", "确认进入自动驾驶模式"),
        tt("Receive Successful Entry into Driving Mode Notification", "收到成功进入的通知"),
        tt("Reduce Driving Attention", "降低驾驶注意力"),
      ],
    },
    {
      label: AUTO_MODE,
      lit: true,
      steps: [
        tt("Driver Rests", "驾驶员休息"),
        tt("Receive Autonomous Driving Behavior Information", "接收自动驾驶的行为信息"),
        tt("Observe Vehicle Behavior", "观察车辆行为"),
        tt("Perform Non-Driving Related Tasks (such as Entertainment)", "进行与驾驶无关的事（例如娱乐）"),
      ],
    },
    {
      label: tt("Exiting Autonomous Driving Mode", "退出自动驾驶模式"),
      steps: [
        tt("Choose to Exit Autonomous Driving Mode", "选择退出自动驾驶模式"),
        tt("Confirm Exit from Autonomous Driving", "确认退出自动驾驶"),
        tt("Receive Successful Exit Notification", "收到成功退出的通知"),
        tt("Take Over the Vehicle", "接管车辆"),
        tt("Drive the Car", "开车"),
      ],
    },
  ],
}

// 09 · Possible scenarios — three ways into the mode; the middle one is the project.
const scenarios = {
  kind: "scenarios",
  columns: [
    {
      title: tt("Directly Enter Autonomous Driving Mode", "直接进入自动驾驶模式"),
      steps: [tt("User Starts the Car", "用户启动车辆"), tt("Set Navigation", "设置导航"), ENTER],
    },
    {
      title: tt("Manual Mode Transitioning to Autonomous Driving Mode", "从手动模式切换到自动驾驶模式"),
      lit: true,
      steps: [tt("… …", "… …"), tt("Manual Driving", "手动驾驶"), ENTER],
    },
    {
      title: tt("Re-enter After Exiting Autonomous Driving Mode", "退出自动驾驶后再次进入"),
      steps: [
        tt("… …", "… …"),
        AUTO_MODE,
        tt("Autonomous Driving Failure Warning", "自动驾驶失效告警"),
        tt("Take Control of the Vehicle", "接管车辆"),
        tt("System Indicates Autonomous Driving is Available", "系统提示可进入自动驾驶"),
        ENTER,
      ],
    },
  ],
}

// 07 · Key point — what the research adds up to.
export const hmiKeyPoints = [
  tt(
    "Safety issues require ongoing vigilance and preemptive alerts in both static and dynamic scenarios.",
    "安全问题需要在静态与动态场景下持续警惕，并提前预警。"
  ),
  tt(
    "Simplify operation paths by integrating channel interactions with situational relevance.",
    "结合场景整合多通道交互，简化操作路径。"
  ),
  tt("There are human-machine trust issues with autonomous driving.", "自动驾驶存在人机信任问题。"),
  tt(
    "Policy and technological issues (whether the city's road driving supports autonomous driving).",
    "政策与技术问题（城市道路是否支持自动驾驶）。"
  ),
  tt("Legal issues (incomplete regulations, accident liability)", "法律问题（法规不完善、事故责任归属）"),
]

// 20 · Design point — the two ideas the design rests on.
const designPoint = {
  kind: "designpoint",
  light: {
    title: tt("Breath Light", "呼吸灯"),
    images: [`${ART}/light-green.png`, `${ART}/light-yellow.png`, `${ART}/light-red.png`],
    notes: [
      tt(
        "Road safety reminder. Continuous monitoring and early warning alerts under autonomous driving conditions.",
        "路况安全提醒。在自动驾驶状态下持续监测，并提前预警。"
      ),
      tt(
        "Breathing lights that mimic the rhythm of human breathing, narrowing the emotional distance with the driver.",
        "呼吸灯模仿人类呼吸的节奏，拉近与驾驶员的情感距离。"
      ),
    ],
  },
  channels: {
    title: tt("Combining channel interaction", "多通道交互结合"),
    images: [`${ART}/gva.png`, `${ART}/wheel-lever.png`, `${ART}/console-auto.png`],
    note: tt("Multi-channel interaction, suitable for various scenarios.", "多通道交互，适配不同场景。"),
  },
}

// 12 · Voice interaction — the G-Va dialogue, and the four-step flow behind it.
const voice = {
  kind: "voice",
  robot: `${ART}/gva.png`,
  messages: [
    { from: "user", text: tt("Hi, G-Va", "嗨，G-Va") },
    { from: "gva", text: tt("Hi, what can I help you", "嗨，有什么可以帮你") },
    { from: "user", text: tt("I want to enter the autonomous driving mode.", "我想进入自动驾驶模式。") },
    {
      from: "gva",
      text: tt("Ok! Are you ready to enter the autonomous Driving mode now?", "好的！现在准备进入自动驾驶模式了吗？"),
    },
    { from: "user", text: tt("YES !", "是的！") },
    { from: "gva", text: tt("Entering autonomous driving mode now.", "正在进入自动驾驶模式。") },
  ],
  flow: [
    tt("Evoke the voice assistant", "唤醒语音助手"),
    tt("Input command", "说出指令"),
    tt("Confirm command", "确认指令"),
    tt("Enter the autonomous driving mode", "进入自动驾驶模式"),
  ],
}

// 13 · Mechanical interaction — the lever, and the breath light it switches on.
const mechanical = {
  kind: "mechanical",
  wheel: `${ART}/wheel-lever.png`,
  lights: [
    { img: `${ART}/light-green.png`, caption: tt("breath light on", "呼吸灯亮起") },
    { img: `${ART}/light-yellow.png` },
    { img: `${ART}/light-red.png` },
  ],
  lightsCaption: tt("road safety reminder", "路况安全提醒"),
  flow: [tt("Toggle the levers twice", "连拨两次拨杆"), tt("Enter the autonomous driving mode", "进入自动驾驶模式")],
  lightTitle: tt("Breath Light", "呼吸灯"),
  lightPoints: [
    {
      term: tt("Anthropomorphized", "拟人化"),
      text: tt(
        "Exists like a person in the passenger seat, constantly accompanying during autonomous driving, enhancing the driver's trust in autonomous driving.",
        "像坐在副驾的一个人，在自动驾驶全程持续陪伴，增强驾驶员对自动驾驶的信任。"
      ),
    },
    {
      term: tt("Lightweight presence", "轻量存在"),
      text: tt(
        "In autonomous driving, it exists unobtrusively, not distracting the driver from focusing on other things.",
        "自动驾驶时它安静地存在着，不会干扰驾驶员专注于别的事。"
      ),
    },
    {
      term: tt("Road safety reminder", "路况安全提醒"),
      text: tt(
        "Assesses the conditions of the autonomous driving section and changes color when the road conditions are complex, providing early warnings to increase safety.",
        "评估自动驾驶路段的路况，在路况复杂时改变颜色，提前预警以提高安全性。"
      ),
    },
  ],
}

// 14 · Interface — where the driver can see, and where they can reach.
const iface = {
  kind: "interface",
  dashboard: {
    title: tt("Dashboard", "仪表盘"),
    blind: tt("Blind Spot", "盲区"),
    visible: tt("Visible Area", "可视区域"),
    photo: `${ART}/cockpit.png`,
  },
  console: {
    title: tt("Central Console Display", "中控屏"),
    zones: [
      tt("Optimal Touch Zone", "最佳触控区"),
      tt("Easy-to-Touch Zone", "易触区"),
      tt("Hard-to-Touch Zone", "难触区"),
    ],
    photo: `${ART}/reach.png`,
  },
}

// 15 · Dashboard — wireframe, then the cluster in both modes.
const dashboard = {
  kind: "dashboard",
  wire: {
    gear: tt("Gear position", "挡位"),
    driving: tt("Driving Information", "行车信息"),
    nav: tt("Navigation information", "导航信息"),
    road: tt("Road condition information", "路况信息"),
    custom: tt("Custom Content Area", "自定义内容区"),
    caption: tt("Wireframe", "线框图"),
  },
  manual: {
    img: `${ART}/dash-manual.png`,
    icon: `${ART}/icon-road.svg`,
    callout: tt("Indicate this road supports Autonomous Driving Mode", "提示当前道路支持自动驾驶模式"),
    caption: MANUAL_MODE,
  },
  auto: {
    img: `${ART}/dash-auto.png`,
    icon: `${ART}/icon-auto.svg`,
    callout: tt("Indicator light for Autonomous Driving Mode", "自动驾驶模式指示灯"),
    caption: AUTO_MODE,
  },
  between: tt("Change background color, add icon prompt", "改变背景色，加入图标提示"),
}

// 16 · Central console display — wireframe over screen, in both modes.
const consoleSlide = {
  kind: "console",
  header: tt("Header Bar", "顶栏"),
  footer: tt("Footer Menu Bar", "底部菜单栏"),
  manual: {
    img: `${ART}/console-manual.png`,
    caption: MANUAL_MODE,
    boxes: {
      nav: tt("Navigation information", "导航信息"),
      map: tt("3D Navigation map", "3D 导航地图"),
      zoom: tt("Zoom In / Zoom Out", "放大 / 缩小"),
      search: tt("Map Search Bar", "地图搜索栏"),
      dest: tt("Destination Information", "目的地信息"),
    },
    note: tt(
      "Drivers pay more attention to map routes, road information, etc., 3D map is more suitable to needs",
      "驾驶员更关注路线与路况等信息，3D 地图更符合需求"
    ),
  },
  auto: {
    img: `${ART}/console-auto.png`,
    caption: AUTO_MODE,
    boxes: {
      map: tt("2D Navigation map", "2D 导航地图"),
      custom: tt("Custom Content Area", "自定义内容区"),
    },
    note: tt(
      "Drivers focusing more on entertainment or other information, 3D maps are converted to 2D maps and minimized",
      "驾驶员更关注娱乐或其他信息，3D 地图转为 2D 并缩小"
    ),
  },
}

// 17 · Mode transition — everything that changes, side by side.
const transition = {
  kind: "transition",
  manual: tt("Manual Driving mode", "手动驾驶模式"),
  auto: tt("Autonomous Driving mode", "自动驾驶模式"),
  rows: [
    { label: tt("Prompt voice", "语音提示") },
    {
      label: tt("“Breath light” on", "「呼吸灯」亮起"),
      left: { img: `${ART}/light-off.png`, fit: "contain" },
      right: { img: `${ART}/light-green.png`, fit: "contain" },
    },
    {
      label: tt("Dashboard change", "仪表盘变化"),
      left: { img: `${ART}/dash-manual.png` },
      right: { img: `${ART}/dash-auto.png`, badge: tt("Autonomous Driving mode", "自动驾驶模式") },
    },
    {
      label: tt("Central Console Display change", "中控屏变化"),
      left: { img: `${ART}/console-manual.png` },
      right: { img: `${ART}/console-auto.png` },
    },
  ],
}

// 18 · ProtoPie — the greeting that opens the prototype.
const gva = {
  kind: "gva",
  robot: `${ART}/gva.png`,
  hello: tt("Hi, I am G-Va~", "嗨，我是 G-Va～"),
}

// --- The sections ------------------------------------------------------------
//
// One section per slide, in the deck's own order. The page's chapter index lists
// `label`; `eyebrow` is the slide number; the board carries the slide itself. The
// eyebrow already names the slide, so the heading is kept for the index and the
// outline but not drawn a second time.

const slide = (kind) => [{ type: "hmideck", slide: kind }]

export const hmiSections = [
  {
    id: "background",
    eyebrow: tt("01 · Background", "01 · 背景"),
    label: tt("Background", "背景"),
    titleHidden: true,
    lead: tt(
      "Mode switching is now a core vehicle control function.",
      "模式切换，如今已是一项核心的车辆控制功能。"
    ),
    blocks: slide(background),
  },
  {
    id: "trends",
    eyebrow: tt("02 · Design trends", "02 · 设计趋势"),
    label: tt("Design trends", "设计趋势"),
    titleHidden: true,
    lead: tt(
      "The industry sits at Level 2.5. The interaction is heading somewhere else.",
      "行业停在 Level 2.5，而交互正在往别的方向走。"
    ),
    blocks: slide(trends),
  },
  {
    id: "interview",
    eyebrow: tt("03 · User interview", "03 · 用户访谈"),
    label: tt("User interview", "用户访谈"),
    titleHidden: true,
    lead: tt(
      "Three drivers already living with L2/L3 systems.",
      "三位已经天天在用 L2/L3 系统的驾驶员。"
    ),
    blocks: slide(interview),
  },
  {
    id: "journey",
    eyebrow: tt("04 · User journey map", "04 · 用户旅程图"),
    label: tt("User journey map", "用户旅程图"),
    titleHidden: true,
    lead: tt(
      "Five stages, from getting in the car to driving it again.",
      "五个阶段 —— 从上车，到再次自己开。"
    ),
    blocks: slide(journey),
  },
  {
    id: "scenarios",
    eyebrow: tt("05 · Possible scenarios", "05 · 可能的场景"),
    label: tt("Possible scenarios", "可能的场景"),
    titleHidden: true,
    lead: tt(
      "Three ways a driver arrives in autonomous mode. The middle one is the project.",
      "驾驶员进入自动驾驶模式的三条路，中间那条就是这个项目。"
    ),
    blocks: slide(scenarios),
  },
  {
    id: "keypoint",
    eyebrow: tt("06 · Key point", "06 · 关键点"),
    label: tt("Key point", "关键点"),
    titleHidden: true,
    lead: tt("What the research adds up to.", "调研加起来说明了什么。"),
    blocks: [{ type: "bullets", items: hmiKeyPoints }],
  },
  {
    id: "designpoint",
    eyebrow: tt("07 · Design point", "07 · 设计要点"),
    label: tt("Design point", "设计要点"),
    titleHidden: true,
    lead: tt(
      "An ambient light that breathes, and a mode you can enter three ways.",
      "一盏会呼吸的氛围灯，以及三种进入同一个模式的方式。"
    ),
    blocks: slide(designPoint),
  },
  {
    id: "voice",
    eyebrow: tt("08 · Voice interaction", "08 · 语音交互"),
    label: tt("Voice interaction", "语音交互"),
    titleHidden: true,
    lead: tt("Evoke → command → confirm → enter.", "唤醒 → 指令 → 确认 → 进入。"),
    blocks: slide(voice),
  },
  {
    id: "mechanical",
    eyebrow: tt("09 · Mechanical interaction", "09 · 机械交互"),
    label: tt("Mechanical interaction", "机械交互"),
    titleHidden: true,
    lead: tt(
      "Toggle the levers twice to enter autonomous driving mode.",
      "连拨两次拨杆，进入自动驾驶模式。"
    ),
    blocks: slide(mechanical),
  },
  {
    id: "interface",
    eyebrow: tt("10 · Interface", "10 · 界面"),
    label: tt("Interface", "界面"),
    titleHidden: true,
    lead: tt(
      "Where the driver can actually see and reach.",
      "驾驶员真正看得到、伸手够得着的地方。"
    ),
    blocks: slide(iface),
  },
  {
    id: "dashboard",
    eyebrow: tt("11 · Dashboard", "11 · 仪表盘"),
    label: tt("Dashboard", "仪表盘"),
    titleHidden: true,
    lead: tt(
      "The same cluster in both modes: the background changes, and an icon says the road allows it.",
      "同一块仪表盘的两种模式：背景色改变，并用一个图标说明这条路允许自动驾驶。"
    ),
    blocks: slide(dashboard),
  },
  {
    id: "console",
    eyebrow: tt("12 · Central console display", "12 · 中控屏"),
    label: tt("Central console display", "中控屏"),
    titleHidden: true,
    lead: tt(
      "A 3D map while the driver drives; a 2D map, minimised, once the car does.",
      "人开车时是 3D 地图；车开车时，地图降为 2D 并缩小。"
    ),
    blocks: slide(consoleSlide),
  },
  {
    id: "transition",
    eyebrow: tt("13 · Mode transition", "13 · 模式切换"),
    label: tt("Mode transition", "模式切换"),
    titleHidden: true,
    lead: tt(
      "What changes, all at once, at the moment of handover.",
      "交接的那一刻，有哪些东西同时改变。"
    ),
    blocks: slide(transition),
  },
  {
    id: "prototype",
    eyebrow: tt("14 · ProtoPie", "14 · ProtoPie 原型"),
    label: tt("Prototype", "原型"),
    titleHidden: true,
    lead: tt("Built and testable in ProtoPie.", "用 ProtoPie 做成，可以直接试。"),
    blocks: [
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
          {
            label: tt("Download the ProtoPie file", "下载 ProtoPie 源文件"),
            href: "https://drive.google.com/file/d/1OZEXEFnGgxuHZWrpMgBwkDYmcTT890DJ/view?usp=drive_link",
            note: tt("The .pie source, on Google Drive.", "存放在 Google Drive 的 .pie 源文件。"),
          },
        ],
      },
      {
        type: "bullets",
        title: tt("Before you try it", "试用之前"),
        items: [
          tt(
            "Since ProtoPie cannot activate voice recognition through a voice command, when G-Va appears you need to first click on G-Va. After clicking on G-Va, normal voice interaction can then proceed.",
            "ProtoPie 无法用语音指令唤起语音识别，所以当 G-Va 出现时，需要先点一下 G-Va，之后就能正常进行语音交互。"
          ),
          tt(
            "The keyword to activate the autonomous driving mode is “autonomous driving mode”.",
            "开启自动驾驶模式的关键词是「autonomous driving mode」。"
          ),
        ],
      },
      ...slide(gva),
      {
        type: "video",
        src: "https://www.youtube.com/embed/aotbVnrCKbU",
        title: tt("HMI Design for Autonomous Driving Mode Switching", "自动驾驶模式切换的 HMI 设计"),
        caption: tt("Walkthrough of the full mode-switching interaction.", "完整模式切换交互的演示。"),
      },
    ],
  },
]
