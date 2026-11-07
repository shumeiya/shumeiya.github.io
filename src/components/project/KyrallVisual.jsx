import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

const ART = "/project/kyrall/ds"

// The design system as one dark bento collage, laid out the way Shumei marked
// it up: the lockup leads top left with the weights-and-paragraph specimen
// under it, colour tokens and the mono specimen stand as the two tall tiles
// beside them, and the bottom rows carry the icon DNA, the symbol on yellow,
// the natively drawn chamfer buttons, the dialog family, the keyline grid and
// the native 4pt spacing scale. The ink and the fixed text colours are brand
// constants, not theme colours, so the collage reads the same in both modes.
const INK = "#191717"

const SWATCHES = [
  { hex: "#C2F000", name: "ky-yellow" },
  { hex: "#FDFDFD", name: "ky-white" },
  { hex: "#EFEDE8", name: "ky-grey-1" },
  { hex: "#5C5B59", name: "ky-grey-3" },
]


function Tile({ className = "", style, children }) {
  return (
    <div className={`overflow-hidden rounded-2xl ${className}`} style={style}>
      {children}
    </div>
  )
}

export default function KyrallVisual() {
  const t = useT()
  return (
    <div className="mt-visual grid auto-rows-[10rem] grid-cols-2 gap-card sm:auto-rows-[11rem] lg:grid-cols-4">
      {/* The lockup, 2×1, top left. */}
      <Tile className="col-span-2 flex items-center justify-center px-12" style={{ background: INK }}>
        <img
          src={`${ART}/lockup.png`}
          alt={t(tt("Kyrall lockup", "Kyrall 组合标志"))}
          width={2000}
          height={360}
          loading="lazy"
          className="h-auto w-full max-w-sm"
        />
      </Tile>

      {/* Colour tokens, drawn natively, one 2×2 tile. */}
      <Tile className="col-span-2 row-span-2 p-6" style={{ background: INK }}>
        <div className="grid h-full grid-cols-2 gap-card">
          {SWATCHES.map((s) => (
            <div key={s.name} className="flex flex-col">
              <div className="min-h-0 flex-1 rounded-xl" style={{ background: s.hex }} />
              <p className="mt-2 font-mono-tight text-note" style={{ color: "#878787" }}>
                {s.hex} · {s.name}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      {/* Weights and the brand paragraph, 2×1, under the lockup. */}
      <Tile className="col-span-2 flex items-center justify-center" style={{ background: INK }}>
        <img
          src={`${ART}/type-text.png`}
          alt={t(tt("Ufficio weights and paragraph", "Ufficio 字重与段落"))}
          width={1204}
          height={312}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Tile>

      {/* Symbol to icons: the shared DNA diagram, 2×1. */}
      <Tile className="col-span-2 flex items-center justify-center p-6" style={{ background: INK }}>
        <img
          src={`${ART}/icon-dna.png`}
          alt={t(tt("Shared symbol and icon DNA", "Symbol 与图标同源结构"))}
          width={980}
          height={331}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Tile>

      {/* The symbol on the brand yellow, 1×1, never cropped. */}
      <Tile className="flex items-center justify-center" style={{ background: "#C4FF35" }}>
        <img
          src={`${ART}/symbol-yellow.png`}
          alt={t(tt("Symbol on yellow", "黄底 Symbol"))}
          width={600}
          height={600}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Tile>

      {/* The three buttons of the system, drawn natively, square-cornered. */}
      <Tile className="flex flex-col items-center justify-center gap-3 p-6" style={{ background: INK }}>
        <span
          className="w-full max-w-48 py-2 text-center font-mono-tight text-note font-medium tracking-wide"
          style={{ background: "#C4FF35", color: INK }}
        >
          PRIMARY BUTTON
        </span>
        <span
          className="w-full max-w-48 py-2 text-center font-mono-tight text-note font-medium tracking-wide"
          style={{ background: "#FDFDFD", color: INK }}
        >
          SECONDARY BUTTON
        </span>
        <span
          className="w-full max-w-48 border py-2 text-center font-mono-tight text-note tracking-wide"
          style={{ borderColor: "#FDFDFD", color: "#FDFDFD" }}
        >
          THIRDLY BUTTON
        </span>
      </Tile>

      {/* The icon library, one wide 4×2 tile: Editor tools over common icons,
          both strips running the tile's full width. */}
      <Tile className="col-span-2 row-span-2 flex flex-col justify-center gap-8 p-8 lg:col-span-4" style={{ background: INK }}>
        <img
          src={`${ART}/icons-row1.png`}
          alt={t(tt("Editor tool icons", "Editor 工具图标"))}
          width={2398}
          height={200}
          loading="lazy"
          className="h-auto w-full"
        />
        <img
          src={`${ART}/icons-row2.png`}
          alt={t(tt("Common icons", "通用图标"))}
          width={2680}
          height={200}
          loading="lazy"
          className="h-auto w-full"
        />
      </Tile>
    </div>
  )
}
