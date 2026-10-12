// About-page content, carried over from the 2025 site's about page.
// Logos live in /public/about; the two résumés in /public/documents.

export const intro = {
  name: "Shumei Zhang",
  role: "Product & UX Designer",
  video: "https://www.youtube.com/embed/GgV5PRF9mPs",
  resumes: [
    { label: "Download résumé", href: "/documents/shumei-zhang-resume.pdf" },
    { label: "下载中文简历", href: "/documents/shumei-zhang-resume-cn.pdf" },
  ],
}

export const education = [
  {
    degree: "Industrial Design",
    level: "Bachelor",
    school: "Shenzhen University, China",
    period: "2017.09 – 2021.07",
    logo: "/about/logo/szu.png",
  },
  {
    degree: "Systemic Design",
    level: "Master",
    school: "Politecnico di Torino, Italy",
    period: "2021.10 – 2024.07",
    logo: "/about/logo/polito.png",
  },
]

export const experience = [
  {
    role: "Interaction Design",
    team: "CSIG Business Group",
    company: "Tencent",
    place: "Shenzhen, China",
    period: "2021.03 – 2021.07",
    logo: "/about/logo/abcmouse.png",
    tags: ["ABC Mouse application", "ToC", "Transnational team"],
  },
  {
    role: "Interaction Design",
    team: "Product Development Center",
    company: "Dianmao Technology Co., Ltd.",
    place: "Shenzhen, China",
    period: "2021.07 – 2021.08",
    logo: "/about/logo/codemao.png",
    tags: ["Platform Design", "ToB"],
  },
  {
    role: "UX/UI Design",
    company: "TIDE Digital Design Studio",
    place: "Turin, Italy",
    period: "2022.02 – 2022.07",
    logo: "/about/logo/tide.png",
    tags: ["Web Design", "Design Consulting"],
  },
  {
    role: "UX/UI Design",
    team: "User Experience Group",
    company: "Granstudio Design Company",
    place: "Turin, Italy",
    period: "2024.02 – 2024.05",
    logo: "/about/logo/granstudio.png",
    tags: ["Automotive Design", "HMI Design", "International Design Team"],
  },
  {
    role: "UX/UI Design",
    company: "wetter.com",
    place: "Munich, Germany",
    period: "2024.09 – now",
    logo: "/about/logo/wetter.svg",
    tags: ["UX/UI Design", "User Interview", "User Testing"],
    current: true,
  },
]

export const skills = [
  { name: "Figma", icon: "/about/skill/figma.png" },
  { name: "ProtoPie", icon: "/about/skill/protopie.png" },
  { name: "Webflow", icon: "/about/skill/webflow.png" },
  { name: "Rhino", icon: "/about/skill/rhino.png" },
  { name: "Blender", icon: "/about/skill/blender.png" },
  { name: "Illustrator", icon: "/about/skill/Ai.png" },
  { name: "Photoshop", icon: "/about/skill/ps.png" },
  { name: "After Effects", icon: "/about/skill/ae.png" },
  { name: "Adobe XD", icon: "/about/skill/xd.png" },
]

// Stickers strewn around the opening statement — the same cast as the dashboard's
// pile, resized down since nothing here is bigger than a few hundred pixels.
// Positions are percentages so the scatter keeps its shape as the column narrows;
// `sm` marks the ones that drop away on a phone, where there is no room to strew.
// `drift` and `wobble` are how far each one sinks and turns as the curtain closes
// over it — varied per sticker so the pile jostles rather than moving as a slab.
export const scatter = [
  { src: "/about/scatter/s1.png", left: "4%", top: "6%", w: 112, rotate: -9, drift: 34, wobble: 7 },
  { src: "/about/scatter/s2.png", left: "80%", top: "2%", w: 96, rotate: 11, sm: true, drift: 52, wobble: -9 },
  { src: "/about/scatter/s3.png", left: "16%", top: "62%", w: 104, rotate: 7, sm: true, drift: 22, wobble: -5 },
  { src: "/about/scatter/s4.png", left: "88%", top: "44%", w: 88, rotate: -13, drift: 44, wobble: 11 },
  { src: "/about/scatter/s5.png", left: "70%", top: "76%", w: 120, rotate: 5, sm: true, drift: 18, wobble: 6 },
  { src: "/about/scatter/s6.png", left: "0%", top: "34%", w: 86, rotate: 14, sm: true, drift: 40, wobble: -8 },
  { src: "/about/scatter/s7.png", left: "46%", top: "88%", w: 92, rotate: -6, sm: true, drift: 14, wobble: 4 },
  { src: "/about/scatter/s8.png", left: "62%", top: "18%", w: 78, rotate: 17, sm: true, drift: 48, wobble: -12 },
]

// The opening line, set in brackets the way the reference page does.
export const opener = "[ Let's start this page with me ]"
