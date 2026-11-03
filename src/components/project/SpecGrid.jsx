import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/spec"

// The Kyrall design system, told in the page's own flow layout rather than as a
// Figma board: two sub-sections (foundations, components), each a grid of cards
// with the spec's name and its screenshot. Type and spacing follow the project
// scale; the cards use the two Kyrall surfaces, and the screenshots sit in an
// ink well because they are dark-mode captures.
//
// The screenshots come in very different shapes. `fit: "contain"` keeps a wide
// one whole; everything else fills the frame from the top, which is where each
// spec puts its title and its most telling part.
function Spec({ item }) {
  const t = useT()
  return (
    <li className="flex flex-col rounded-2xl bg-[#efede8] p-4 dark:bg-[#2f2f2f]">
      <p className="px-2 pt-1 text-xl font-semibold text-cream">{t(item.name)}</p>
      <div className="mt-body aspect-[4/3] overflow-hidden rounded-xl bg-[#191717]">
        <img
          src={`${ART}/${item.file}`}
          alt={t(item.name)}
          loading="lazy"
          className={`block h-full w-full ${item.fit === "contain" ? "object-contain" : "object-cover object-top"}`}
        />
      </div>
    </li>
  )
}

export default function SpecGrid({ spec }) {
  const t = useT()
  return spec.groups.map((group, i) => (
    <div key={i} className={i === 0 ? "mt-visual" : "mt-section"}>
      <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{t(group.kicker)}</p>
      <h3 className="mt-tight text-2xl font-semibold tracking-tight text-cream">{t(group.title)}</h3>
      <ul className={`mt-visual grid gap-card sm:grid-cols-2 ${group.cols === 2 ? "" : "lg:grid-cols-3"}`}>
        {group.items.map((item) => (
          <Spec key={item.file} item={item} />
        ))}
      </ul>
    </div>
  ))
}
