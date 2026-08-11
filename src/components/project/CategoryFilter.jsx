export default function CategoryFilter({ categories, counts, active, onChange }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
      {categories.map((cat) => {
        const isActive = active === cat.key
        const count = counts[cat.key] || 0
        return (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium backdrop-blur-md transition-colors ${
              isActive
                ? "bg-ink text-page"
                : "bg-box/50 text-ink/60 hover:text-ink"
            }`}
          >
            {cat.label}
            <span
              className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[11px] font-semibold leading-none ${
                isActive ? "bg-page/25 text-page" : "bg-ink/10 text-ink/50"
              }`}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
