// About-page content, carried over from the 2025 site's about page.
// Logos live in /public/about; the two résumés in /public/documents.

export const intro = {
  name: "Shumei Zhang",
  role: "UX & UI Designer",
  video: "https://www.youtube.com/embed/GgV5PRF9mPs",
  resumes: [
    { label: "Download resume", href: "/documents/shumei-zhang-resume.pdf" },
    { label: "下载中文简历", href: "/documents/shumei-zhang-resume-cn.pdf" },
  ],
}

// Schooling, from the same résumé and kept in the same shape as `experience`
// so one component can lay both of them out. Newest first here — the page does
// not reverse this one; the résumé already reads this way.
export const education = [
  {
    school: "Politecnico di Torino",
    degree: "MSc in Systems Design",
    place: "Turin, Italy",
    period: "2021.10 – 2024.07",
    details: [
      { label: "GPA", text: "91 / 100" },
      {
        label: "Coursework",
        text: "Innovative Design, Human-Computer Interaction, Virtual Design, Product Component Design, System Design, Ecology, Economic Project Management.",
      },
    ],
  },
  {
    school: "Shenzhen University",
    degree: "Bachelor in Industrial Design",
    place: "Shenzhen, China",
    period: "2017.09 – 2021.07",
    details: [
      { label: "GPA", text: "93 / 100" },
      {
        label: "Coursework",
        text: "Design Thinking, Fundamentals of Product Design, Design Thinking and Innovation for Smart Products, Product Design Methodology, Ergonomics.",
      },
    ],
  },
]

// Work history, transcribed from the current résumé. Oldest first — the page
// reverses it so the newest post is W/001, the way the reference ledger counts.
// `details` are the résumé's own bullets: `label` is the bolded lead-in, `group`
// names a project when one post covers more than one (Granstudio's two briefs).
export const experience = [
  {
    company: "Tencent CSIG Business Group",
    role: "Interaction Design Intern",
    place: "Shenzhen, China",
    period: "2021.03 – 2021.07",
    logo: "/about/logo/abcmouse.png",
    details: [
      {
        label: "Interaction Design",
        text: "Responsible for the interactive design of gamified teaching activities, with over 10 activities already launched.",
      },
      {
        label: "User Testing",
        text: "Conducted user testing, observing interaction and completion rates, and iteratively optimizing results.",
      },
    ],
  },
  {
    company: "Dianmao Technology Co., Ltd.",
    role: "Interaction Designer",
    place: "Shenzhen, China",
    period: "2021.07 – 2021.08",
    logo: "/about/logo/codemao.png",
    details: [
      {
        label: "Course Platform Design",
        text: "Drove iteration of the B-side admin platform from back-office usage data, covering course management, courseware templates and related functions.",
      },
      {
        label: "Design Iteration",
        text: "Iterated the teacher-facing and student-facing designs of the in-school platform against user testing results and user data.",
      },
    ],
  },
  {
    company: "Granstudio",
    role: "UX/UI Design Intern",
    place: "Turin, Italy",
    period: "2024.02 – 2024.05",
    logo: "/about/logo/granstudio.png",
    invert: true,
    details: [
      {
        group: "Interactive / Visual Design for JIYUE Supercar",
        label: "Interaction Design",
        text: "Defined and optimized infotainment system interaction design, establishing interaction guidelines.",
      },
      {
        label: "Visual Design",
        text: "Converted conceptual ideas into visual and animation solutions through interaction analysis.",
      },
      {
        group: "HMI Experience Design for a Haier Smart Home Appliance",
        label: "Trend Research",
        text: "Performed industry research on competitors, electronics, and in-car interfaces, summarizing 27 trends related to technology, UI, and UX.",
      },
      {
        label: "Conceptual Solutions",
        text: "Created innovative user experience concepts by integrating brand characteristics and research, generating 3 sets of conceptual proposals.",
      },
      {
        label: "Solution Outputs",
        text: "Delivered one comprehensive set of user experience design solutions, covering the entire process from concept to UX/UI implementation.",
      },
    ],
  },
  {
    company: "DPS & wetter.com",
    role: "UX/UI Design Engineer",
    place: "Munich, Germany",
    period: "2024.09 – 2025.07",
    logo: "/about/logo/wetter.svg",
    details: [
      {
        label: "AI Concept & Research",
        text: "Surveyed 260 users and conducted 25 interviews to define a GenAI mascot-outfit weather app concept for younger audiences.",
      },
      {
        label: "UX&UI Design & Prototyping",
        text: "Developed an GenAi Mascot that adapts outfits to the weather, enhancing engagement through A/B-tested high-fidelity prototypes.",
      },
      {
        label: "Design System",
        text: "Built high-fidelity prototypes and iterated AI mascot interactions through testing, then implemented responsive UI using Tailwind CSS.",
      },
      {
        label: "Frontend",
        text: "Developed the onboarding page and implemented responsive front-end styling for the mobile app",
      },
    ],
  },
  {
    company: "Kyrall GmbH",
    role: "AI Product Design Engineer",
    place: "Munich, Germany",
    period: "2025.09 – Present",
    current: true,
    // A near-white wordmark, so it is painted as a mask like the skill icons
    // rather than placed as an image — that way it takes a site token and is
    // legible on the light theme as well as the dark one.
    logo: "/about/logo/kyrall.svg",
    mask: true,
    details: [
      {
        label: "AI Strategy & Feature Definition",
        text: "Explored and defined AI-assisted CAD modeling features, including AI suggestions, generation guidance, and non-chatbox interaction patterns for engineering workflows.",
      },
      {
        label: "Product & UX/UI Ownership",
        text: "Built the design system and led UX/UI design across the web app and website, shaping core product flows and iterating designs based on testing and feedback.",
      },
      {
        label: "AI Workflow Design",
        text: "Designed end-to-end workflows for AI-driven CAD generation, from multi-prompt input to generation feedback, waiting states, result review, and post-editing.",
      },
      {
        label: "Frontend Implementation",
        text: "Implemented editor and dashboard UI components with React, HTML, and CSS, including layout, styling, and interaction logic.",
      },
    ],
  },
]

// Tools, drawn as single-colour SVGs. The page renders them as CSS masks rather
// than images, so whatever each file paints itself is ignored and the icon takes
// a site token — which is also why they follow the light and dark themes. The
// space in Claude Code's filename is percent-encoded; a raw one breaks the URL.
export const skills = [
  { name: "Figma", icon: "/about/skill/Figma.svg" },
  { name: "ProtoPie", icon: "/about/skill/Protopie.svg" },
  { name: "Webflow", icon: "/about/skill/Webflow.svg" },
  { name: "Illustrator", icon: "/about/skill/Illustrator.svg" },
  { name: "Photoshop", icon: "/about/skill/Photoshop.svg" },
  { name: "After Effects", icon: "/about/skill/Effects.svg" },
  { name: "Premiere Pro", icon: "/about/skill/Premiere.svg" },
  { name: "Rhino", icon: "/about/skill/Rhino.svg" },
  { name: "Blender", icon: "/about/skill/Blender.svg" },
  { name: "KeyShot", icon: "/about/skill/Keyshot.svg" },
  { name: "Onshape", icon: "/about/skill/Onshape.svg" },
  { name: "HTML", icon: "/about/skill/HTML.svg" },
  { name: "CSS", icon: "/about/skill/CSS.svg" },
  { name: "JavaScript", icon: "/about/skill/JavaScript.svg" },
  { name: "Claude Code", icon: "/about/skill/Claude%20Code.svg" },
  { name: "Codex", icon: "/about/skill/codex.svg" },
  { name: "ComfyUI", icon: "/about/skill/ComfyUI.svg" },
  { name: "Midjourney", icon: "/about/skill/Midjourney.svg" },
]

// Stickers strewn around the opening statement — the same cast as the dashboard's
// pile, resized down since nothing here is bigger than a few hundred pixels.
//
// Positions are percentages so the scatter keeps its shape as the column narrows.
// They were placed by walking the viewport's perimeter at even arc intervals —
// even ANGLES crowd the top and bottom, since on a 16:9 canvas those edges
// subtend twice the angle the sides do — then pulling each one inward by an
// alternating amount, so neighbours never share a depth and the run never reads
// as a row. Nothing lands inside the box the name and links occupy, and the
// three portraits are spaced onto different sides so they don't read as a set.
//
// `sm` marks the ones that drop away on a phone, where there is no room to strew.
// `drift` and `wobble` are how far each one sinks and turns as the curtain closes
// over it — varied per sticker so the pile jostles rather than moving as a slab.
// `depth` is how far it slides against the pointer: the bigger ones get the
// bigger numbers, so the near ones outrun the far ones and the field has depth.
export const scatter = [
  { src: "/about/scatter/s1.png", left: "10%", top: "19%", w: 175, rotate: -9, drift: 34, wobble: 7, depth: 22 },
  { src: "/about/scatter/s2.png", left: "85%", top: "17%", w: 150, rotate: 11, sm: true, drift: 52, wobble: -9, depth: 19 },
  { src: "/about/scatter/s3.png", left: "80%", top: "38%", w: 195, rotate: 7, sm: true, drift: 22, wobble: -5, depth: 24 },
  { src: "/about/scatter/s4.png", left: "64%", top: "90%", w: 165, rotate: -13, drift: 44, wobble: 11, depth: 21 },
  { src: "/about/scatter/s5.png", left: "65%", top: "22%", w: 190, rotate: 5, sm: true, drift: 18, wobble: 6, depth: 24 },
  { src: "/about/scatter/s7.png", left: "32%", top: "21%", w: 205, rotate: -6, sm: true, drift: 14, wobble: 4, depth: 26 },
  { src: "/about/scatter/s8.png", left: "45%", top: "17%", w: 150, rotate: 17, sm: true, drift: 48, wobble: -12, depth: 19 },
  { src: "/about/scatter/s9.png", left: "20%", top: "69%", w: 160, rotate: -11, sm: true, drift: 30, wobble: 8, depth: 20 },
  { src: "/about/scatter/s10.png", left: "26%", top: "86%", w: 135, rotate: 9, sm: true, drift: 26, wobble: -6, depth: 17 },
  { src: "/about/scatter/s11.png", left: "45%", top: "89%", w: 150, rotate: -8, sm: true, drift: 20, wobble: 5, depth: 19 },
  { src: "/about/scatter/s12.png", left: "73%", top: "76%", w: 145, rotate: 12, sm: true, drift: 16, wobble: -7, depth: 18 },
  { src: "/about/scatter/s13.png", left: "90%", top: "71%", w: 125, rotate: -14, sm: true, drift: 38, wobble: 9, depth: 16 },
  { src: "/about/scatter/s14.png", left: "10%", top: "52%", w: 130, rotate: 6, sm: true, drift: 12, wobble: -4, depth: 16 },
]
