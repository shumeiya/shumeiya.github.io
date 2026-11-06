import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

const ART = "/project/kyrall/ds"

// The design system told the way the slow-food chapter tells its visual
// design: a few curated plates on quiet cards, not the full specification.
// One ink panel carries the lockup with three chips for the shape language;
// the colour card paints the real tokens in CSS; the two typeface panels are
// cropped from the Figma specimen; and a row of four square tiles shows the
// system at work. The full pages live in Figma (and SpecGallery.jsx, kept).
const CHIPS = [tt("Chamfer corners", "切角造型"), tt("Engineered grid", "工程网格"), tt("Sharp geometry", "锐利几何")]

const SWATCHES = [
  { hex: "#C2F000", name: "ky-yellow" },
  { hex: "#191717", name: "ky-black" },
  { hex: "#EFEDE8", name: "ky-grey-1" },
  { hex: "#5C5B59", name: "ky-grey-3" },
]

const TILES = [
  { src: `${ART}/symbol-yellow.png`, alt: tt("Symbol on yellow", "黄底 Symbol") },
  { src: `${ART}/keyline.png`, alt: tt("Icon keyline grid", "图标 keyline 网格") },
  { src: `${ART}/dialog.png`, alt: tt("Dialog component", "Dialog 组件") },
  { src: `${ART}/toolbar.png`, alt: tt("Editor toolbar", "Editor 工具栏") },
]

function Label({ children }) {
  return <p className="text-note uppercase tracking-wide text-fog">{children}</p>
}

export default function KyrallVisual() {
  const t = useT()
  return (
    <div className="mt-visual space-y-card">
      {/* Logo and colours share the first row. */}
      <div className="grid gap-card lg:grid-cols-3">
        <div className="rounded-2xl bg-band p-6 lg:col-span-2">
          <Label>{t(tt("Logo", "标志"))}</Label>
          {/* The lockup sits on the brand ink in both site modes; the ink is a
              brand constant, not a theme colour. */}
          <div className="mt-body flex items-center justify-center rounded-xl bg-[#191717] px-8 py-16">
            <img
              src={`${ART}/lockup.png`}
              alt={t(tt("Kyrall lockup, yellow on dark", "Kyrall 组合标志，深底品牌绿"))}
              width={2000}
              height={360}
              loading="lazy"
              className="h-auto w-full max-w-md"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {CHIPS.map((c, i) => (
              <span key={i} className="chip">
                {t(c)}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-band p-6">
          <Label>{t(tt("Colours", "颜色"))}</Label>
          <div className="mt-body grid grid-cols-2 gap-card">
            {SWATCHES.map((s) => (
              <div key={s.hex}>
                <div className="h-20 rounded-xl ring-1 ring-line" style={{ background: s.hex }} />
                <p className="mt-2 font-mono-tight text-note text-ink">{s.hex}</p>
                <p className="font-mono-tight text-note text-fog">{s.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The two typefaces, as the specimen panels from the Figma source. */}
      <div className="rounded-2xl bg-band p-6">
        <Label>{t(tt("Typefaces", "字体"))}</Label>
        <div className="mt-body grid gap-card lg:grid-cols-[2.07fr_1fr]">
          <figure>
            <img
              src={`${ART}/type-ufficio.png`}
              alt="Ufficio"
              width={1204}
              height={652}
              loading="lazy"
              className="block h-auto w-full rounded-xl"
            />
            <figcaption className="mt-body text-copy text-ink">
              <span className="font-semibold text-cream">{t(tt("Primary", "主字体"))}</span> · Ufficio
            </figcaption>
          </figure>
          <figure>
            <img
              src={`${ART}/type-mono.png`}
              alt="Ufficio Mono"
              width={520}
              height={582}
              loading="lazy"
              className="block h-auto w-full rounded-xl"
            />
            <figcaption className="mt-body text-copy text-ink">
              <span className="font-semibold text-cream">{t(tt("Technical", "等宽"))}</span> · Ufficio Mono
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Four square tiles: the system at work. */}
      <div>
        <Label>{t(tt("In use", "应用"))}</Label>
        <div className="mt-body grid grid-cols-2 gap-card lg:grid-cols-4">
          {TILES.map((tile) => (
            <div key={tile.src} className="aspect-square overflow-hidden rounded-xl">
              <img src={tile.src} alt={t(tile.alt)} loading="lazy" className="block h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
