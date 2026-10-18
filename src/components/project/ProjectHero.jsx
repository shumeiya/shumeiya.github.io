import { useT } from "../../i18n/lang"
import { ui } from "../../i18n/ui"

// The detail page's opening: the project's key visual running the full width of the
// page, dissolving downward into the page's own background, with the name and the
// line the project is really about sitting on it.
//
// The image is veiled in the page's own colour (see `.hero-veil` in index.css), so it
// reads as a dark picture on the dark theme and a pale watermark on the light one. That
// is what lets every word here use the theme's ordinary ink: a fixed white would only
// have worked in one of the two modes.
//
// Everything except the name is optional. A project with no `hero` block still gets a
// complete header: its name set large, its summary under it, role and category below.
export default function ProjectHero({ project, detail }) {
  const t = useT()
  const hero = detail.hero ?? {}
  const image = hero.image ?? project.image
  const lead = detail.summary ?? project.description

  // With a headline, the name steps back to a label above it — the headline is the
  // thing worth reading first. Without one, the name is the headline.
  const headline = hero.headline
  const meta = hero.meta ?? [
    { label: t(ui.labelRole), value: detail.role },
    { label: t(ui.labelCategory), value: project.category },
  ]

  return (
    <header className="relative isolate mb-16">
      {/* Full-bleed backdrop. It starts above the page's own top padding so the
          image runs under the (transparent) nav bar, and stops at the header's own
          bottom edge — a stacking context paints over every later sibling that isn't
          positioned, so letting it hang lower would veil the case study itself. */}
      <div
        aria-hidden="true"
        className="hero-veil pointer-events-none absolute bottom-0 left-1/2 -top-32 -z-10 w-screen -translate-x-1/2 overflow-hidden"
      >
        {image && <img src={image} alt="" className="h-full w-full object-cover" />}
        {/* An even veil over the whole image, in the page's colour — deep enough
            that copy stays legible wherever the picture happens to be busy. */}
        <div className="absolute inset-0" style={{ background: "var(--hero-veil)" }} />
        {/* The dissolve. A fixed height rather than a percentage of the box, so it
            always finishes in the same place relative to the copy above it however
            long that copy runs. */}
        <div
          className="absolute inset-x-0 bottom-0 h-72"
          style={{
            background: "linear-gradient(to top, var(--color-page) 20%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative pb-8 pt-10 sm:pt-16">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-3 shrink-0 rounded-[3px]"
            style={{ background: project.color }}
          />
          <h1
            className={
              headline
                ? "text-copy font-medium text-ink"
                : "text-3xl font-semibold tracking-tight text-cream sm:text-4xl"
            }
          >
            {project.name}
          </h1>
        </div>

        {headline && (
          <p className="mt-7 max-w-2xl text-3xl font-semibold leading-tight text-cream sm:text-4xl">
            {headline}
          </p>
        )}

        {lead && (
          <p className="mt-4 max-w-xl text-copy leading-relaxed text-fog">{lead}</p>
        )}

        {detail.tags && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {detail.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-mono-tight text-note uppercase tracking-wide text-fog"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

    {/* `relative` is load-bearing: the backdrop sits in its own stacking context,
        which paints over any later sibling that isn't positioned. */}
      <dl className="relative mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-3">
        {meta.map((item) => (
          <div key={item.label}>
            <dt className="font-mono-tight text-note uppercase tracking-wide text-fog">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-copy text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      {hero.stats?.length > 0 && (
        <ul className="relative mt-7 grid gap-3 sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <li key={stat.label} className="rounded-xl border border-line bg-box px-5 py-4">
              <p className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-note leading-relaxed text-fog">{stat.label}</p>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
