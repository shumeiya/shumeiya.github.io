export default function CategoryFilter({ categories, counts, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="mr-1 font-mono-tight text-[11px] uppercase tracking-wide text-ink/40">
        View by
      </span>
      {categories.map((cat) => {
        const isActive = active === cat.key
        const count = counts[cat.key] || 0
        return (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
              isActive
                ? "border-ink bg-ink text-cream"
                : "border-page-line bg-white/70 text-ink/60 hover:text-ink"
            }`}
          >
            {cat.label} <span className={isActive ? "text-cream/50" : "text-ink/30"}>{count}</span>
          </button>
        )
      })}
    </div>
  )
}
