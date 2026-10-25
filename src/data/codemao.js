
import { tt } from "../i18n/t"

const ART = "/project/codemao"

// The deck's #06 board. Shape documented in CodemaoFlow.jsx.
export const codemaoFlow = {
  trunk: [
    { label: tt("Open the backend", "访问业务后台") },
    { label: tt("Sign in", "登录账号") },
    {
      fork: [tt("Add a course", "添加课程"), tt("Open an existing course", "打开已有课程")],
    },
    { label: tt("Edit the courseware file list", "编辑课件文件列表"), strong: true },
  ],
  branches: [
    {
      tag: tt("Regular courseware", "常规课件"),
      steps: [tt("Upload courseware", "上传课件"), tt("Check the file list", "查看文件列表")],
    },
    {
      tag: tt("Super courseware", "超级课件"),
      steps: [tt("Edit the super courseware", "编辑超级课件")],
      fork: [
        [
          tt("Add / remove a segment", "新建 / 移除流程环节"),
          tt("Fill in the segment's page", "编辑环节配置页面内容"),
        ],
        [tt("Import a local PPT", "导入本地 PPT")],
      ],
    },
  ],
  join: tt("Save the course", "保存课程内容"),
}

export const codemaoRole = tt("UX/UI Designer", "UX/UI 设计师")

export const codemaoSummary = tt(
  "This is the 2.0 version iteration for Codemao course platform, which reorganizes the functional entry and interaction process around course management and super courseware editing.",
  "编程猫 B 端教育专用数字化管理后台系统与用户运营工具，用于课程数据分析、课程管理等。本次为 2.0 版本迭代，围绕课程管理与超级课件编辑重新梳理功能入口与交互流程。"
)

export const codemaoHero = {
  image: `${ART}/10.png`,
  headline: tt(
    "Three quarters of teachers opened the platform. Barely half taught from it.",
    "四分之三的老师打开了平台，只有一半真的用它上课。"
  ),
  meta: [
    { label: tt("Role", "角色"), value: codemaoRole },
    { label: tt("Scope", "范围"), value: tt("Web · ToB CMS platform", "Web · B 端 CMS 平台") },
    { label: tt("Deadline", "时间约束"), value: tt("Into schools before September", "九月前进校园") },
  ],
}

export const codemaoTags = [
  tt("CMS 2.0", "CMS 2.0"),
  tt("ToB platform", "ToB 平台"),
  tt("Information architecture", "信息架构"),

]

export const codemaoSections = [
  {
    id: "reason",
    eyebrow: tt("01 · Reason", "01 · 迭代原因"),
    label: tt("Background", "项目背景"),
    lead: tt(
      "A B-end platform that had been left behind, and a deadline that ruled out starting over.",
      "一个被落在后面的 B 端平台，以及一个不允许推倒重来的截止日期。"
    ),
    blocks: [
      {
        type: "defs",
        items: [
          {
            term: tt("It no longer met the needs it had", "无法满足现有用户需求"),
            text: tt(
              "With the business focused on the consumer side, the ToB platform went a long time without an update, and it no longer answered what its users actually needed.",
              "由于之前业务重心在 C 端，B 端业务平台长期未迭代更新，已无法满足现有用户的需求。"
            ),
          },
          {
            term: tt("More school partnerships", "获取更多合作"),
            text: tt(
              "The company wanted the new iteration to win more school partnerships.",
              "想要通过新的迭代产品去获取到更多的校园合作。"
            ),
          },
          {
            term: tt("A muddled frame, duplicated functions", "框架混乱，功能重复"),
            text: tt(
              "Years of patch-it-when-it-breaks iteration had left parts of the architecture tangled.",
              "之前「亡羊补牢」式的迭代，导致部分功能架构混乱。"
            ),
          },
          {
            term: tt("No room for a rebuild", "无法进行全新迭代"),
            text: tt(
              "It had to be in schools before September. There was no time for a large-scale rewrite — the work had to be ordered by priority.",
              "需要在九月前进入校园，时间急，无法进行大规模的更新迭代，只能根据优先级满足需求。"
            ),
          },
        ],
      },
    ],
  },
  {
    id: "data",
    eyebrow: tt("02 · Data", "02 · 数据表现"),
    label: tt("Data Analysis", "数据表现"),
    lead: tt(
      "The weekly teaching report said the platform was being opened, not used.",
      "每周教师上课数据说明：平台被打开了，但没被用起来。"
    ),
    blocks: [
      // The weekly teaching report, transcribed from the spreadsheet on slide #02.
      // Three weeks and their average; every percentage quoted further down this page
      // is read off these rows.
      {
        type: "table",
        title: tt("Weekly teacher activity", "每周教师上课数据"),
        head: [
          tt("Week", "日期"),
          tt("Active teachers", "活跃老师数 (人)"),
          tt("Opened Future Classroom", "未来教室首页访问老师数 (人)"),
          tt("Share who visited", "访问点猫平台老师占比"),
          tt("Course centre", "课程中心页访问老师数 (人)"),
          tt("Course-pack list", "课程包列表页访问老师数 (人)"),
          tt("Course detail", "课程详情页访问老师数 (人)"),
          tt("Share who taught %", "上课老师占比 %"),
          tt("Teaching sessions", "上课的老师数 (人次)"),
          tt("Weekly avg. (sessions)", "上课老师周均上课 (人次)"),
          tt("Weekly avg. (lessons)", "上课老师周均上课 (次数)"),
        ],
        rows: [
          ["04-25", "3925", "2803", "71.41%", "2067", "1755", "1479", "52.76%", "13431", "9.08", "8.9"],
          ["04-18", "4079", "2948", "72.27%", "2267", "1911", "1649", "55.94%", "11460", "6.95", "7.07"],
          ["04-11", "3555", "2384", "67.06%", "1782", "1572", "1436", "60.23%", "10365", "7.22", "6.48"],
        ],
        foot: [tt("Average", "平均值"), "", "", "70.25%", "", "", "", "56.31%", "", "7.75", ""],
        note: tt(
          "Three consecutive weeks, and the average across them.",
          "连续三周，以及三周的平均值。"
        ),
      },
      {
        type: "stats",
        items: [
          {
            value: "75%",
            label: tt("Visited the platform", "访问平台"),
            // The deck's headline figure. The report it is read off runs 67.06%–72.27%
            // across the three weeks — said plainly here rather than quietly rounded.
            note: tt(
              "Of active teachers. Across the three weeks above: 67.06% – 72.27%.",
              "活跃教师中的访问占比。上表三周为 67.06% – 72.27%。"
            ),
          },
          {
            value: "55%",
            label: tt("Actually used it", "使用率"),
            note: tt(
              "The share that went on to teach from it: 52.76% – 60.23%, averaging 56.31%.",
              "访问之后真正用它上课的比例：52.76% – 60.23%，平均 56.31%。"
            ),
          },
          {
            value: "80%",
            label: tt("Played a video in class", "上课播放视频（课件）"),
            note: tt("Video was the main form the courseware took.", "课件资料以视频为主。"),
          },
          {
            value: "7.69%",
            label: tt("Effective video play rate", "视频有效播放率"),
            note: tt("Opened, then almost immediately left.", "打开了，然后几乎立刻离开。"),
          },
        ],
      },
      {
        type: "bullets",
        title: tt("Which reads as", "数据说明什么"),
        items: [
          tt(
            "The platform's course material does not meet what teaching needs.",
            "平台课程资料无法满足教学需求。"
          ),
          tt(
            "The platform's courseware is a reference and a prop, not the thing class is run from.",
            "平台课程课件仅为教学的参考和辅助。"
          ),
        ],
      },
    ],
  },
  {
    id: "interview",
    eyebrow: tt("03 · Interview", "03 · 用户访谈"),
    label: tt("Interview", "用户访谈"),
    lead: tt(
      "From the teacher-training team's interviews, about how a lesson actually runs.",
      "根据师训运营同事近来对教师用户的访谈，了解到老师实际上课场景有如下情况。"
    ),
    blocks: [
      {
        type: "bullets",
        items: [
          tt(
            "They teach from a PPT they made themselves, and don't open the Codemao platform at all.",
            "直接使用自己制作的 PPT 课件上课，不使用点猫编程平台。"
          ),
          tt(
            "What they want to teach and what the platform holds don't line up — and the courseware can't be edited.",
            "教师期望的教学内容与课程平台有出入，教师无法编辑课程课件。"
          ),
          tt(
            "The material is mostly video, and the video is coarse-grained: one file covering several teaching segments.",
            "课件资料以视频为主，但视频颗粒度较粗 —— 单个视频包含多个教学环节 / 任务。"
          ),
          tt(
            "Mid-lesson they are switching back and forth between the video, the document and the creative tool.",
            "教师教学过程中需要在课程视频、课程文档、创作工具之间来回切换。"
          ),
        ],
      },
      {
        type: "bullets",
        title: tt("Which reads as", "访谈说明什么"),
        items: [
          tt(
            "The platform's teaching courseware isn't flexible enough, and doesn't take much in.",
            "平台课程教学课件不够灵活，兼容性不高。"
          ),
          tt(
            "There is demand for several kinds of courseware, and the in-class experience has room to improve.",
            "存在多类型课件需求，上课体验有待提升。"
          ),
        ],
      },
    ],
  },
  {
    id: "problem",
    eyebrow: tt("04 · Situation", "04 · 问题定位"),
    label: tt("Problem", "问题定位"),
    blocks: [
      {
        type: "defs",
        items: [
          {
            term: tt("Switching between file types burns class time", "多种类型课程资料来回切换，浪费教学时间"),
            text: tt(
              "Material is filed by file type, not by teaching segment. During a lesson the teacher switches between several files; the video is coarse-grained, so they are also moving between the video, the document and the creative tool.",
              "课程资料按文件类型划分，而非教学环节，教师授课过程中需要在多个文件间来回切换，浪费教学时间；当前课件资料以视频为主，但视频颗粒度较粗，教师教学过程中需要在课程视频、课程文档、创作工具之间来回切换。"
            ),
          },
          {
            term: tt("Courseware can't be edited", "无法编辑修改课件"),
            text: tt(
              "Teachers want to edit the course material; the platform doesn't support it. Their only route is to build a PPT of their own.",
              "教师有编辑课程课件内容的诉求，但当前课程课件不支持编辑 —— 老师要改课件，只能是自己另外做 PPT。"
            ),
          },
          {
            term: tt("Class data can't be counted accurately", "实际上课数据无法准确统计"),
            text: tt(
              "Previewing the material, sending it out beforehand and teaching from it are all the same operation — open the course pack, present the file — so one function carries several different user journeys and none of them can be told apart.",
              "老师预览课程资料、课前发送资料、课中教学都会进行同样的操作（打开课程包、演示课程资料），一个功能夹杂了多个用户流程，彼此分不开。"
            ),
          },
          {
            term: tt("Other creative tools aren't supported", "不支持其他创作工具"),
            text: tt(
              "Only the Kitten 3 web version and the Wood web version are supported.",
              "当前仅支持 kitten3 网页版、海龟网页版（wood）。"
            ),
          },
        ],
      },
    ],
  },
  {
    id: "goal",
    eyebrow: tt("05 · Brief", "05 · 需求分析"),
    label: tt("How", "需求分析"),
    lead: tt(
      "Written as the lesson runs — before it, during it, after it.",
      "按一堂课的时间顺序来写：课前、课中、课后。"
    ),
    blocks: [
      {
        type: "defs",
        items: [
          {
            term: tt("Before · preparation is easy", "课前：备课方便"),
            text: tt(
              "A teacher can edit and complete the course material on top of what is there, so it fits their own teaching plan.",
              "老师可在课程资料基础上进行编辑完善，以契合自身教学计划。"
            ),
          },
          {
            term: tt(
              "During · easy for teacher and students, no class time wasted",
              "课中：老师和学生方便上课，不浪费课中教学时间"
            ),
            text: tt(
              "Teacher and students get into the lesson quickly: one action starts teaching, with no leafing through course packs. The teacher follows the teaching order instead of switching between files to present.",
              "上课开始后，老师和学生能快速进入上课状态，老师一步操作即可开始教学，无需在众多课包中来回翻阅，学生也如此；老师可按照教学流程顺序讲课，无需在多个课程文件之间来回切换演示。"
            ),
          },
          {
            term: tt("After · class data", "课后：上课数据"),
            text: tt(
              "The teacher can see their teaching data afterwards, and the business backend gets an accurate count of what was taught.",
              "课后教师可以看到教学数据，同时业务后台能统计到准确的上课数据。"
            ),
          },
        ],
      },
      {
        type: "formula",
        terms: [
          tt("Editable courseware templates", "可编辑课件模版"),
          tt("A simpler way to run a lesson", "简化上课流程"),
          tt("Takes several kinds of courseware", "兼容多类型课件"),
        ],
        result: tt("A better lesson for the teacher", "提高教师上课体验"),
      },
    ],
  },
  {
    id: "userflow",
    eyebrow: tt("06 · User flow", "06 · 用户流程图"),
    label: tt("User flow", "用户流程图"),
    lead: tt(
      "The two kinds of courseware run as parallel lanes and rejoin at save — which is what lets a teacher stay in one place for a whole lesson.",
      "常规课件与超级课件走两条并行的路，最后在「保存」处汇合 —— 这正是让老师一堂课待在同一个地方的前提。"
    ),
    blocks: [{ type: "flow", board: codemaoFlow }],
  },
  {
    id: "layout",
    eyebrow: tt("07 · Frame layout", "07 · 框架布局"),
    label: tt("Frame", "框架布局"),
    lead: tt(
      "The functions were broken apart and regrouped into three levels — background, content and global control. The control level is the important one: it carries the top bar and the side navigation.",
      "根据产品特性，将功能点分解后重新分组，分为背景、内容、全局控制三个层级。全局控制层是重要的功能层，具有顶部导航、侧边导航模块。"
    ),
    blocks: [
      {
        type: "defs",
        items: [
          {
            term: tt("Top bar", "顶部导航栏"),
            text: tt(
              "Where in the application you are, plus the avatar and messages.",
              "显示当前页面的应用信息的定位、个人头像、消息等。"
            ),
          },
          {
            term: tt("Side navigation", "左侧导航栏"),
            text: tt(
              "The main operations. It guides the way through the product so people move between modules accurately, which is most of their speed.",
              "显示主要操作，对产品功能进行引导，让用户准确地在各个模块间穿梭，提高用户效率。"
            ),
          },
          {
            term: tt("Content area", "内容区域"),
            text: tt(
              "Where an administrator does the run of management work the system is for.",
              "管理员在系统中的操作区域，完成一系列所需管理操作，帮助用户快速提升效率。"
            ),
          },
          {
            term: tt("Background", "背景区域"),
            text: tt(
              "Carries the ground colour, which is what makes the interface comfortable and tidy.",
              "用来调成背景颜色，使界面变得更加舒适、整洁。"
            ),
          },
        ],
      },
    ],
  },
  {
    id: "system",
    eyebrow: tt("08 · Design system", "08 · 设计规范"),
    label: tt("Design system", "设计规范"),
    lead: tt(
      "One blue carries every action; everything else is a role, named and fixed.",
      "一个蓝色承担所有操作，其余每个颜色都对应一个被命名、被固定下来的角色。"
    ),
    blocks: [
      {
        type: "swatches",
        groups: [
          {
            title: tt("Primary", "主色"),
            items: [{ hex: "#3490FF", label: tt("Every action in the product", "产品中的所有操作") }],
          },
          {
            title: tt("Secondary — icons, buttons and so on", "辅助色（用于图标、按钮等）"),
            items: [
              { hex: "#041C40", label: tt("Deep", "深色") },
              { hex: "#52C41A", label: tt("Success", "成功") },
              { hex: "#FAAD14", label: tt("Warning", "警告") },
              { hex: "#F5222D", label: tt("Error", "错误") },
            ],
          },
          {
            title: tt("Text, rules and ground", "文字、分割线与底色"),
            items: [
              { hex: "#041C40", label: tt("T1 emphasis", "T1 强调") },
              { hex: "#56575B", label: tt("T2 emphasis", "T2 强调") },
              { hex: "#777777", label: tt("T3 secondary", "T3 次级重要") },
              { hex: "#9D9EA2", label: tt("T4 supporting text", "T4 辅助文字") },
              { hex: "#EAEAEA", label: tt("Divider", "分割线") },
              { hex: "#F0F3FB", label: tt("Background", "背景色") },
            ],
          },
        ],
      },
      {
        type: "defs",
        items: [
          {
            term: tt("Grid", "栅格布局"),
            text: tt(
              "Designed at 1440×900, with the content area split into 12 equal columns — drawing to the grid is what keeps the visuals consistent and still flexible.",
              "页面以 1440px 为设计尺寸，内容显示区域为 12 栏等分，有效地根据栅格做图，提升视觉的一致性和灵活性。页面分辨率 1440×900。"
            ),
          },
          {
            term: tt("Measurements", "尺寸"),
            text: tt(
              "Container 1168px · 12 columns · side navigation 208px · top bar 60px · 24px padding.",
              "栅格总宽度 1168px · 12 栏 · 侧边导航 208px · 顶栏 60px · 边距 24px。"
            ),
          },
        ],
      },
      {
        type: "gridspec",
        labels: {
          header: tt("Header · 60px", "Header · 60px"),
          sider: tt("Sider · 208px", "Sider · 208px"),
          container: tt("Container · 1168px · 12 columns", "Container · 1168px · 12 栏"),
        },
      },
    ],
  },
  {
    id: "hierarchy",
    eyebrow: tt("09 · Product experience", "09 · KR1 · 提升产品体验"),
    label: tt("Main Pages", "主页重构"),
    lead: tt(
      "Same page, two versions. Drag the divider across to see where the navigation, the tabs and the table moved.",
      "同一个页面的两个版本。拖动分割线，看导航、标签页和表格分别挪到了哪里。"
    ),
    blocks: [
      {
        type: "compare",
        before: `${ART}/compare-old.jpg`,
        after: `${ART}/compare-new.jpg`,
        beforeLabel: tt("Old", "旧版"),
        afterLabel: tt("New", "新版"),
        ratio: 1600 / 1100,
      },
      {
        type: "bullets",
        title: tt("Old", "旧版"),
        items: [
          tt("The navigation's levels are vague and unmarked.", "导航栏信息层级模糊不明确。"),
          tt(
            "The tabs' entrances are muddled — the course-pack entrance sits inside “course list”.",
            "标签页入口功能混乱，课程包入口在「课程列表」里。"
          ),
          tt(
            "Super courseware already contains the video and the slides, so the extra columns are redundant.",
            "超级课件内部已经包括了视频、课件等，多余的列表应当删掉。"
          ),
        ],
      },
      {
        type: "bullets",
        title: tt("New", "新版"),
        items: [
          tt("Level lines added, so the hierarchy is stated.", "新版加入层级线，明确层级。"),
          tt("The course-pack entrance moves under the course-pack list.", "课程包入口设置在课程包列表下。"),
          tt("The entrances are consolidated, so there is less to get lost in.", "整合了入口，避免用户操作混乱。"),
        ],
      },
    ],
  },
  {
    id: "editing",
    eyebrow: tt("10 · KR1 · Interaction flow", "10 · KR1 · 优化交互流程"),
    label: tt("Detail Design", "设计细节"),
    lead: tt(
      "Editing is the thing teachers said they could not do, so it is the flow that got rebuilt first: from the course list into the course, and from the course into the lesson itself.",
      "「不能编辑」是老师反馈最集中的一点，所以这条流程先重做：从课程列表进到课程，再从课程进到这一节课本身。"
    ),
    blocks: [
      {
        type: "shots",
        items: [
          {
            src: `${ART}/new-list.jpg`,
            label: tt("Course list", "课程列表"),
            caption: tt(
              "Hitting Edit goes to Codemao courses — course list — course edit.",
              "点击【编辑】，跳转到「编程猫课程 —— 课程列表 —— 课程编辑页面」。"
            ),
          },
          {
            src: `${ART}/course-edit.jpg`,
            label: tt("Course edit", "课程编辑"),
            caption: tt(
              "Each lesson in the course, with its tool, its material and its super courseware on one page.",
              "课程下的每一课次，所用工具、素材与超级课件收在同一页。"
            ),
          },
        ],
      },
      {
        type: "numbers",
        title: tt("Notes", "交互说明"),
        items: [
          tt(
            "Hitting Edit goes to Codemao courses — course list — course edit.",
            "点击【编辑】，跳转到「编程猫课程 —— 课程列表 —— 课程编辑页面」。"
          ),
          tt("Course edit, default state.", "课程编辑 默认态。"),
          tt("Course edit, editing state.", "课程编辑 编辑态。"),
          tt(
            "Hitting Edit again opens the matching super-courseware editor.",
            "再点击【编辑】，跳转对应的超级课件编辑页面。"
          ),
          tt("The empty state, for a lesson with no super courseware yet.", "无超级课件时的空状态。"),
        ],
      },
      {
        type: "shots",
        items: [
          {
            src: `${ART}/slide-empty.jpg`,
            label: tt("Empty state", "空状态"),
            caption: tt(
              "A lesson with no teaching segments in it yet — add one, or import a PPT the teacher already has.",
              "还没有教学环节的一节课 —— 可以新增环节，也可以导入老师手上已有的 PPT。"
            ),
          },
          {
            src: `${ART}/slide-image.jpg`,
            label: tt("Editing a segment", "环节编辑"),
            caption: tt(
              "Picking the segment type changes the panel, and each type says out loud what it is for.",
              "选择教学环节类型后面板随之改变，每种类型都会说明它适用于什么教学环节。"
            ),
          },
        ],
      },
      {
        type: "numbers",
        items: [
          tt("When there is an unsaved change, the save button lights up.", "当超级课件编辑有新的修改时，按钮高亮。"),
          tt("Adding a segment drops straight into editing it.", "新增环节，直接进入编辑状态。"),
          tt("An external file can be imported instead.", "也可以导入外部文件。"),
          tt(
            "Pick the segment type; each type has its own interface.",
            "选择教学环节类型，不同环节对应不同界面。"
          ),
          tt(
            "Each type is described, so the teacher knows which teaching moment it suits.",
            "教学环节类型介绍，告知用户该类型环节适用于何种教学环节。"
          ),
        ],
      },
      {
        type: "image",
        src: `${ART}/slide-remove.jpg`,
        caption: tt(
          "Removing a segment goes through a confirmation — a lesson someone spent an evening building should not disappear on a mis-click.",
          "移除环节要经过二次确认 —— 老师花一晚上搭起来的一节课，不该因为点错一下就没了。"
        ),
      },
    ],
  },
  {
    id: "types",
    eyebrow: tt("11 · KR1 · Preparing and teaching", "11 · KR1 · 优化备课及上课流程"),
    label: tt("Detail Design", "超级课件"),
    lead: tt(
      "This is the answer to the switching. A teaching segment can be an image, a carousel, a video, a creative tool or a file to download — all of them inside the lesson, in teaching order, so the lesson runs from one place instead of four.",
      "这是对「来回切换」的回答。一个教学环节可以是图片、轮播图、视频、创作工具或可下载的附件 —— 它们都在这一节课里，按教学顺序排列，一堂课从一个地方讲完，而不是四个。"
    ),
    blocks: [
      {
        type: "shots",
        items: [
          {
            src: `${ART}/preview-image.jpg`,
            label: tt("Image", "图片"),
            caption: tt(
              "A single image, laid out flat on the page. For a plain point being explained.",
              "单张图片平铺展示，适合进行常规知识点演示与讲解。"
            ),
          },
          {
            src: `${ART}/preview-carousel.jpg`,
            label: tt("Carousel", "轮播图"),
            caption: tt("Several images, with a thumbnail strip along the bottom.", "多张图片，底部显示图片缩略图列表。"),
          },
          {
            src: `${ART}/preview-video.jpg`,
            label: tt("Video", "视频"),
            caption: tt("A built-in player, so the video is a segment rather than a file.", "内置视频播放器，视频成为一个环节而不是一个文件。"),
          },
          {
            src: `${ART}/preview-tool.jpg`,
            label: tt("Creative tool", "创作工具"),
            caption: tt("The creative tool embedded in the lesson itself.", "创作工具直接内置在这一节课里。"),
          },
          {
            src: `${ART}/preview-file.jpg`,
            label: tt("Attachment", "附件 / 文件下载"),
            caption: tt("Files for the class to download, listed in place.", "供课堂下载的文件，就地列出。"),
          },
        ],
      },
    ],
  },
]
