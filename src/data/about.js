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
