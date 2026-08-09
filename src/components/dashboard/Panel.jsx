import { forwardRef } from "react"

export const TOP_ROW_HEIGHT = "h-85 lg:h-84"
export const BOTTOM_ROW_HEIGHT = "h-85 lg:h-100"

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
        <span className="font-mono-tight text-xs tracking-wide sm:text-sm">{label}</span>
      </div>
      {right ? <div className="text-base text-ink sm:text-sm">{right}</div> : null}
    </div>
  )
}
