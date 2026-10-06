import { forwardRef } from "react"

// Narrow screens keep a fixed panel height and let the page scroll. From `lg` up the
// dashboard grid owns the height — it stretches to fill the viewport (see Dashboard.jsx),
// so the panels just fill whatever row they land in.
export const TOP_ROW_HEIGHT = "h-85 lg:h-full"
export const BOTTOM_ROW_HEIGHT = "h-85 lg:h-full"

const Panel = forwardRef(function Panel(
  { children, className = "", as: Tag = "div", ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`relative overflow-hidden rounded-xl bg-box text-cream transition-colors duration-300 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
})

export default Panel

export function PanelHeader({ icon: Icon, label, right }) {
  return (
    <div className="mb-3 flex shrink-0 items-center justify-between">
      <div className="flex items-center gap-2 text-ink">
        {Icon ? <Icon size={14} strokeWidth={2} /> : null}
        <span className="font-mono-tight text-xs tracking-wide sm:text-xs">{label}</span>
      </div>
      {right ? <div className="text-base text-ink sm:text-sm">{right}</div> : null}
    </div>
  )
}
