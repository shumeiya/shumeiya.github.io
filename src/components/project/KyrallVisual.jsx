import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"

const ART = "/project/kyrall/ds"

// The design system as the brand board Shumei supplied, rebuilt tile by tile
// on one grid: the lockup on brand yellow leads, a 3×3 icon grid and the app
// mark with a numeral sheet stand beside it, and the bottom band runs part
// photo, palette, a specimen card in the product's voice, and the mission
// photo. Palette, numerals and the specimen card are drawn natively; the two
// photos come from the board itself. Fixed colours here are brand constants,
// not theme colours, so the board reads the same in both site modes.
const INK = "#191717"
const YELLOW = "#C4FF35"
const GREY = "#878787"

const ICONS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

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
      {/* The lockup, black on brand yellow, 2×2. */}
      <Tile className="col-span-2 row-span-2 flex items-center justify-center px-12" style={{ background: YELLOW }}>
        <img
          src={`${ART}/lockup-black.png`}
          alt={t(tt("Kyrall lockup on yellow", "黄底 Kyrall 组合标志"))}
          width={2000}
          height={360}
          loading="lazy"
          className="h-auto w-full max-w-md"
        />
      </Tile>

      {/* Nine icons from the library, 1×2. */}
      <Tile className="row-span-2 grid grid-cols-3 items-center gap-6 p-6" style={{ background: INK }}>
        {ICONS.map((n) => (
          <img key={n} src={`${ART}/ico-${n}.png`} alt="" width={200} height={200} loading="lazy" className="h-auto w-full" />
        ))}
      </Tile>

      {/* The app mark on grey, 1×1. */}
      <Tile className="flex items-center justify-center" style={{ background: "#5C5B59" }}>
        <img
          src={`${ART}/symbol-yellow.png`}
          alt={t(tt("App mark", "应用图标"))}
          width={600}
          height={600}
          loading="lazy"
          className="size-24 rounded-2xl object-cover"
        />
      </Tile>

      {/* The numeral sheet, 1×1, drawn natively. */}
      <Tile className="flex items-center justify-center" style={{ background: "#FDFDFD" }}>
        <div className="font-mono-tight text-6xl font-semibold tabular-nums" style={{ color: "#A5A095" }}>
          <p>
            <span className="px-2" style={{ background: YELLOW, color: INK }}>
              1
            </span>
            234
          </p>
          <p>5678</p>
        </div>
      </Tile>

      {/* The part photo, 1×2. */}
      <Tile className="row-span-2">
        <img
          src={`${ART}/flange.png`}
          alt={t(tt("Flange render, light and dark halves", "法兰件渲染，明暗各半"))}
          width={373}
          height={426}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Tile>

      {/* The palette, 1×2, drawn natively. */}
      <Tile className="row-span-2 flex flex-col">
        <div className="grid flex-1 grid-cols-2">
          <div style={{ background: YELLOW }} />
          <div style={{ background: "#FDFDFD" }} />
        </div>
        <div className="grid flex-1 grid-cols-4">
          <div style={{ background: "#EFEDE8" }} />
          <div style={{ background: "#DAD8D2" }} />
          <div style={{ background: GREY }} />
          <div style={{ background: INK }} />
        </div>
      </Tile>

      {/* The specimen card in the product's voice, 1×2, drawn natively. */}
      <Tile className="row-span-2 flex flex-col p-6" style={{ background: INK }}>
        <h4 className="text-2xl font-semibold tracking-tight" style={{ color: "#FDFDFD" }}>
          {t(tt("Multi-bore cylindrical tube bundle bracket", "多孔圆柱管束支架"))}
        </h4>
        <div className="mt-auto flex gap-4 font-mono-tight text-note" style={{ color: GREY }}>
          <p className="shrink-0">
            H: 200mm
            <br />
            W: 120mm
            <br />
            D: 95mm
          </p>
          <p>
            {t(
              tt(
                "High-gloss anodised aluminium, smooth edges between each bore; the cross-sections meet in a petal-like geometry whose shared walls add rigidity across the assembly.",
                "高光阳极氧化铝材质，孔与孔之间边缘平滑；截面相交处呈花瓣状几何，共享壁为整个组件增加结构刚性。"
              )
            )}
          </p>
        </div>
      </Tile>

      {/* The mission photo, 1×2. */}
      <Tile className="row-span-2">
        <img
          src={`${ART}/rocket.png`}
          alt={t(tt("Kyrall: automating design for the physical world", "Kyrall：为物理世界自动化设计"))}
          width={373}
          height={426}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Tile>
    </div>
  )
}
