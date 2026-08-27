// Left-hand chapter index — geometry, type and transitions matched to the reference layout:
// fixed at left:16px, vertically centred, 16px row gap, and an active item
// that steps up from 20px/400 at 0.4 opacity to 28px/500 at full opacity over 0.3s.
export default function DetailToc({ sections, active }) {
  const jump = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      aria-label="Section index"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {sections.map((section) => {
        const isActive = active === section.id
        return (
          <div key={section.id} className="flex items-center gap-3">
            <a
              href={`#${section.id}`}
              onClick={jump(section.id)}
              className="text-ink no-underline transition-all duration-300"
              style={{
                fontFamily: "var(--font-chapter)",
                fontSize: isActive ? "28px" : "20px",
                fontWeight: isActive ? 500 : 400,
                lineHeight: 1.2,
                opacity: isActive ? 1 : 0.4,
              }}
            >
              {section.label}
            </a>
          </div>
        )
      })}
    </nav>
  )
}
