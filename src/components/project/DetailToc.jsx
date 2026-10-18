// Left-hand chapter index — geometry, type and transitions matched to the reference layout:
// fixed at left:16px, vertically centred, and an active item that steps up from
// 18px/400 at 0.4 opacity to 28px/500 at full opacity over 0.3s — 18px because the
// project pages hold a hard floor there (see CLAUDE.md).
// Row spacing breathes around the active item: the gaps next to it are the widest
// (GAP_MAX) and tighten by GAP_STEP per row of distance, never below GAP_MIN.
// Hover gives an inactive row a preview of that step-up — scaled from the left edge
// rather than resized, so the surrounding rows never shift under the cursor.
import { useState } from "react"
import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

const GAP_MAX = 20
const GAP_MIN = 13
const GAP_STEP = 2
const HOVER_SCALE = 1.2

export default function DetailToc({ sections, active }) {
  const t = useT()
  const [hovered, setHovered] = useState(null)
  const jump = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const activeIndex = sections.findIndex((section) => section.id === active)

  // Gap between row i and row i+1 — driven by whichever of the pair sits closer to the active row.
  const gapAfter = (i) => {
    if (activeIndex < 0) return GAP_MAX
    const distance = Math.min(Math.abs(i - activeIndex), Math.abs(i + 1 - activeIndex))
    return Math.max(GAP_MIN, GAP_MAX - distance * GAP_STEP)
  }

  return (
    <nav
      aria-label={t(ui.sectionIndex)}
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col lg:flex"
    >
      {sections.map((section, i) => {
        const isActive = active === section.id
        const isHovered = hovered === section.id && !isActive
        return (
          <div
            key={section.id}
            className="flex items-center gap-3 transition-all duration-300"
            style={{ marginBottom: i === sections.length - 1 ? 0 : `${gapAfter(i)}px` }}
          >
            <a
              href={`#${section.id}`}
              onClick={jump(section.id)}
              onMouseEnter={() => setHovered(section.id)}
              onMouseLeave={() => setHovered((id) => (id === section.id ? null : id))}
              onFocus={() => setHovered(section.id)}
              onBlur={() => setHovered((id) => (id === section.id ? null : id))}
              className="text-ink no-underline transition-all duration-300"
              style={{
                fontFamily: "var(--font-chapter)",
                fontSize: isActive ? "28px" : "18px",
                fontWeight: isActive ? 500 : 400,
                lineHeight: 1.2,
                opacity: isActive ? 1 : isHovered ? 0.75 : 0.4,
                transform: isHovered ? `scale(${HOVER_SCALE})` : "scale(1)",
                transformOrigin: "left center",
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
