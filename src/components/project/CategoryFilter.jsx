// The archive's category pills, cut like the outline pills on the Projects reel:
// a hairline ring at rest, solid ink when chosen. Below lg they sit on one line
// that scrolls sideways and bleeds to the screen edges, so five pills never
// stack into two ragged rows on a phone; from lg they simply sit in a row.
export default function CategoryFilter({ categories, counts, active, onChange, className = "" }) {
  return (
    <div
      role="group"
      className={`no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:shrink-0 lg:overflow-visible lg:px-0 ${className}`}
    >
      {categories.map((cat) => {
        const isActive = active === cat.key
        return (
          <button
            key={cat.key}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(cat.key)}
            className={`flex shrink-0 items-baseline gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-[15px] font-medium leading-tight transition-colors ${
              isActive
                ? "border-ink bg-ink text-page"
                : "border-ink/20 text-ink/70 hover:border-ink/60 hover:text-ink"
            }`}
          >
            {cat.label}
            <span className={`font-mono-tight text-[13px] font-normal ${isActive ? "text-page/60" : "text-fog"}`}>
              {counts[cat.key] || 0}
            </span>
          </button>
        )
      })}
    </div>
  )
}
