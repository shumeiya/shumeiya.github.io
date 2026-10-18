// Shared drawing primitives for the two Kyrall deck boards.
//
// Every panel in the deck is a rectangle with some of its corners cut at 45°. The cut
// is given per corner, because the deck uses three variants: all four cut (chips,
// cards, the closing rail), the top-right alone (the flow cards), and none (the
// before/after panels).

const corner = (c) => ({ tl: 0, tr: 0, br: 0, bl: 0, ...(typeof c === "number" ? { tl: c, tr: c, br: c, bl: c } : c) })

function chamferPath(c) {
  const { tl, tr, br, bl } = corner(c)
  return [
    `${tl}px 0`,
    `calc(100% - ${tr}px) 0`,
    `100% ${tr}px`,
    `100% calc(100% - ${br}px)`,
    `calc(100% - ${br}px) 100%`,
    `${bl}px 100%`,
    `0 calc(100% - ${bl}px)`,
    `0 ${tl}px`,
  ].join(", ")
}

// Insetting a 45° cut by `w` shortens it by w·(2−√2) — the parallel line through the
// inset corner, not the corner point itself. Getting this wrong leaves a visible
// thickening at each corner.
const inset = (c, w) => {
  const k = w * (2 - Math.SQRT2)
  const { tl, tr, br, bl } = corner(c)
  return { tl: Math.max(0, tl - k), tr: Math.max(0, tr - k), br: Math.max(0, br - k), bl: Math.max(0, bl - k) }
}

// Border and fill as two clipped layers: a border can't follow a cut corner. `fill`
// may be omitted for the deck's outline-only shapes, which let the page through.
export function Chamfer({ fill, stroke, width = 2, cut = 12 }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: stroke, clipPath: `polygon(${chamferPath(cut)})` }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          inset: `${width}px`,
          background: fill ?? "var(--color-page)",
          clipPath: `polygon(${chamferPath(inset(cut, width))})`,
        }}
      />
    </>
  )
}
