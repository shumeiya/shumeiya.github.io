import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

const ART = "/project/kyrall/ds"

// The design system as one dark bento collage, after the showcase boards
// Shumei picked as reference: tiles of mixed sizes on a single grid, mostly
// on the brand ink, one on the brand yellow. The type specimen leads at 2×2,
// colour tokens and a toolbar column stand as two tall tiles beside it, and
// the lockup, the symbol and a pair of natively drawn chamfer buttons close
// the bottom row. The ink and the swatch text colours are brand constants,
// not theme colours, so the collage reads the same in both site modes.
const INK = "#191717"

const SWATCHES = [
  { hex: "#C2F000", name: "ky-yellow" },
  { hex: "#FDFDFD", name: "ky-white" },
  { hex: "#EFEDE8", name: "ky-grey-1" },
  { hex: "#5C5B59", name: "ky-grey-3" },
]

// The product's chamfer: one corner cut, as the buttons and tags cut it.
const CHAMFER = "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)"

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
      {/* Type specimen, 2×2. Its own ink panel melts into the tile. */}
      <Tile className="col-span-2 row-span-2 flex items-center justify-center" style={{ background: INK }}>
        <img
          src={`${ART}/type-ufficio.png`}
          alt={t(tt("Ufficio type specimen", "Ufficio 字体样张"))}
          width={1204}
          height={652}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Tile>

      {/* Colour tokens, drawn natively, 1×2. */}
      <Tile className="row-span-2 p-6" style={{ background: INK }}>
        <div className="flex h-full flex-col justify-between">
          {SWATCHES.map((s) => (
            <div key={s.name}>
              <div className="h-8 rounded-md" style={{ background: s.hex }} />
              <p className="mt-1 font-mono-tight text-note" style={{ color: "#878787" }}>
                {s.hex} · {s.name}
              </p>
            </div>
          ))}
        </div>
      </Tile>

      {/* The mono specimen answers the big one, 1×2. */}
      <Tile className="row-span-2 flex items-center justify-center" style={{ background: INK }}>
        <img
          src={`${ART}/type-mono.png`}
          alt={t(tt("Ufficio Mono specimen", "Ufficio Mono 样张"))}
          width={520}
          height={582}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </Tile>

      {/* The lockup, 2×1. */}
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

      {/* The symbol on the brand yellow, 1×1. */}
      <Tile>
        <img
          src={`${ART}/symbol-yellow.png`}
          alt={t(tt("Symbol on yellow", "黄底 Symbol"))}
          width={600}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Tile>

      {/* The button pair, drawn natively with the product's chamfer, 1×1. */}
      <Tile className="flex flex-col items-center justify-center gap-4 p-6" style={{ background: INK }}>
        <span
          className="w-full max-w-48 py-3 text-center font-mono-tight text-note font-medium tracking-wide"
          style={{ background: "#C4FF35", color: INK, clipPath: CHAMFER }}
        >
          PRIMARY BUTTON
        </span>
        <span
          className="w-full max-w-48 border py-3 text-center font-mono-tight text-note tracking-wide"
          style={{ borderColor: "#FDFDFD", color: "#FDFDFD" }}
        >
          SECONDARY BUTTON
        </span>
      </Tile>
    </div>
  )
}
