import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

const ART = "/project/kyrall/ds"

// The design system as a specimen catalogue, replacing the deck's overlapping
// card stack (SpecBoard.jsx, kept in the repo). Fresh exports from the Figma
// source, flattened onto the brand ink and cropped to the part that matters:
// the type specimen opens full width, colour and spacing share a row, logo
// and icons share a row, and the dialog components close full width. Each
// plate carries a quiet numbered caption in the site's own type.
const PLATES = [
  [{ n: "01", name: tt("Typeface", "字体"), src: `${ART}/type.png`, w: 1871, h: 938 }],
  [
    { n: "02", name: tt("Color tokens", "颜色 Token"), src: `${ART}/color.png`, w: 1192, h: 1073 },
    { n: "03", name: tt("Spacing", "间距"), src: `${ART}/spacing.png`, w: 1192, h: 1073 },
  ],
  [
    { n: "04", name: tt("Logo", "标志"), src: `${ART}/logo.png`, w: 1697, h: 900 },
    { n: "05", name: tt("Icons", "图标"), src: `${ART}/icon.png`, w: 1697, h: 900 },
  ],
  [{ n: "06", name: tt("Components", "组件"), src: `${ART}/components.png`, w: 1477, h: 921 }],
]

export default function SpecGallery() {
  const t = useT()
  return (
    <div className="mt-visual space-y-visual">
      {PLATES.map((row, i) => (
        <div key={i} className={row.length > 1 ? "grid gap-x-card gap-y-visual sm:grid-cols-2" : undefined}>
          {row.map((p) => (
            <figure key={p.n}>
              <figcaption className="flex items-baseline gap-4">
                <span className="font-mono-tight text-note tabular-nums text-fog">{p.n}</span>
                <span className="text-copy font-semibold tracking-tight text-cream">{t(p.name)}</span>
              </figcaption>
              <div className="mt-body overflow-hidden rounded-xl">
                <img src={p.src} alt={t(p.name)} width={p.w} height={p.h} loading="lazy" className="block h-auto w-full" />
              </div>
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}
