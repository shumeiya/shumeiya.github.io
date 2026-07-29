import { forwardRef } from "react"

const Panel = forwardRef(function Panel(
  { children, className = "", as: Tag = "div", ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      className={`relative overflow-hidden rounded-2xl bg-ink text-cream ${className}`}
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
      <div className="flex items-center gap-2 text-fog">
        {Icon ? <Icon size={14} strokeWidth={2} /> : null}
        <span className="font-mono-tight text-[11px] tracking-wide sm:text-xs">{label}</span>
      </div>
      {right ? <div className="text-[11px] text-fog sm:text-xs">{right}</div> : null}
    </div>
  )
}
