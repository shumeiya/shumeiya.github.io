import { useT } from "../../i18n/lang"

const ART = "/project/kyrall/persona"

// The Kyrall personas in the page's own flow layout (the Figma board,
// PersonaBoard.jsx, is kept but no longer on the page). Three cards side by
// side: who they are, what they say, their goal and pain, and where Kyrall comes
// in. A supporting chapter, so it runs a step smaller than body copy: 14px
// text, 13px labels, 16px names. Spacing follows the project scale; the cards use the warm band,
// and the Kyrall green appears only as the fill of the opportunity chips.
function Label({ children }) {
  return <p className="font-mono-tight text-note uppercase tracking-wide text-fog">{children}</p>
}

function Card({ card, labels }) {
  const t = useT()
  return (
    <li className="flex flex-col rounded-2xl bg-band p-6">
      <div className="flex items-center gap-4">
        <img
          src={`${ART}/${card.photo}`}
          alt=""
          loading="lazy"
          className="size-12 shrink-0 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="text-copy font-semibold text-cream">{card.name}</p>
          <p className="text-note text-fog">{t(card.meta)}</p>
        </div>
      </div>
      <p className="chip mt-4 self-start">{t(card.stage)}</p>

      <p className="mt-4 text-callout text-cream">{t(card.quote)}</p>

      <div className="mt-4 border-t border-ink/10 pt-4">
        <Label>{t(labels.goal)}</Label>
        <p className="mt-1 text-callout text-ink">{t(card.goal)}</p>
      </div>
      <div className="mt-4">
        <Label>{t(labels.pain)}</Label>
        <p className="mt-1 text-callout text-ink">{t(card.pain)}</p>
      </div>

      <div className="mt-auto pt-6">
        <Label>{t(labels.chance)}</Label>
        <ul className="mt-2 flex flex-wrap gap-2">
          {card.chances.map((c, i) => (
            <li key={i} className="chip-accent">
              {t(c)}
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}

export default function PersonaCards({ persona }) {
  return (
    <ul className="mt-visual grid gap-card lg:grid-cols-3">
      {persona.cards.map((card) => (
        <Card key={card.name} card={card} labels={persona.flowLabels} />
      ))}
    </ul>
  )
}
