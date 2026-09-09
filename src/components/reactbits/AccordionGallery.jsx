// Accordion gallery from React Bits (https://reactbits.dev/components/accordion-gallery),
// JS + Tailwind variant. Local tweaks: `height` also accepts a CSS string so the gallery
// can fill a dashboard panel, `panelColor` themes the empty panel backdrop, and
// `onItemSelect` lets the router handle navigation instead of a full page load. Items may
// also carry `color` (accent bar tint) and `sublabel` (second line under the label).
// `dim` controls how far inactive panels are darkened (0 disables the scrim entirely),
// and `shadow={false}` drops the panel drop shadow while keeping the focus ring.
// `activeAspect` (e.g. 16 / 9) overrides `expandRatio`: the active panel is sized from the
// measured cross-axis size so it holds that aspect ratio, with `minItemSize` reserving a
// floor for the collapsed panels when the container is too narrow to honour both.
import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"

const DEFAULT_ITEMS = [
  { image: "https://picsum.photos/id/1015/900/1200", label: "Canyon", link: "#" },
  { image: "https://picsum.photos/id/1018/900/1200", label: "Ridgeline", link: "#" },
  { image: "https://picsum.photos/id/1039/900/1200", label: "Falls", link: "#" },
  { image: "https://picsum.photos/id/1043/900/1200", label: "Harbour", link: "#" },
  { image: "https://picsum.photos/id/1044/900/1200", label: "Skyline", link: "#" },
]

const PANEL_BASE_CLASS =
  "group relative block min-w-0 min-h-0 flex-[1_1_0] cursor-pointer overflow-hidden no-underline outline-none [transform-style:preserve-3d] [transform-origin:center] max-[520px]:min-h-[84px] max-[520px]:!transform-none"

const PANEL_SHADOW_CLASS =
  "[box-shadow:0_10px_30px_-18px_rgba(0,0,0,0.8)] focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent),0_10px_30px_-18px_rgba(0,0,0,0.8)]"

const PANEL_NO_SHADOW_CLASS = "focus-visible:[box-shadow:0_0_0_2px_var(--ag-accent)]"

const clampRatio = v => Math.min(Math.max(v, 0.2), 0.9)

const AccordionGallery = ({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  accentColor = "#ffffff",
  overlayColor = "#060010",
  textColor = "#ffffff",
  panelColor = "#0a0713",
  height = 460,
  gap = 10,
  radius = 16,
  expandRatio = 0.52,
  activeAspect = 0,
  minItemSize = 0,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 8,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = true,
  dim = 0.35,
  shadow = true,
  onItemSelect,
  className = "",
}) => {
  const rootRef = useRef(null)
  const panelRefs = useRef([])
  const mediaRefs = useRef([])
  const barRefs = useRef([])
  const textRefs = useRef([])
  const tlRef = useRef(null)
  const firstRunRef = useRef(true)
  const mediaSizeRef = useRef(320)
  // Resolved share of the track taken by the active panel. `measure` recomputes it whenever
  // `activeAspect` is in play, so applyLayout reads it instead of the raw prop.
  const ratioRef = useRef(clampRatio(expandRatio))

  const vertical = orientation === "vertical"
  const count = items.length
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), count - 1))

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false

  // Both scrim layers are driven by custom properties set on the *panel*, not on the
  // media span: the overlay is a sibling of the media, and custom properties inherit
  // downward only, so vars parked on the media element never reach it.
  // --ag-scrim fades the bottom gradient (there for label legibility) out on inactive
  // panels; --ag-dim is the overall darkening, and `dim={0}` removes it entirely.
  const overlayBg = `linear-gradient(180deg, transparent 45%, color-mix(in srgb, ${overlayColor} calc(var(--ag-scrim, 1) * 78%), transparent) 100%), color-mix(in srgb, ${overlayColor} calc(var(--ag-dim, ${dim}) * 100%), transparent)`

  const applyLayout = useCallback(
    animate => {
      const panels = panelRefs.current
      if (!panels.length) return

      const r = ratioRef.current
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1
      const mediaSize = mediaSizeRef.current

      tlRef.current?.kill()
      const dur = animate && !prefersReduced ? duration : 0
      const tl = gsap.timeline()

      panels.forEach((panel, i) => {
        if (!panel) return
        const isActive = i === active
        const media = mediaRefs.current[i]
        const bar = barRefs.current[i]
        const text = textRefs.current[i]

        const rot = isActive ? 0 : i < active ? tilt : -tilt
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot }

        tl.to(
          panel,
          {
            flexGrow: isActive ? grow : 1,
            ...rotProp,
            "--ag-dim": isActive ? 0 : dim,
            "--ag-scrim": isActive ? 1 : 0,
            duration: dur,
            ease,
          },
          0
        )

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i))
          const shift = drift * parallax * mediaSize * 0.06
          const gray = grayscale ? (isActive ? 0 : 1) : 0
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              "--ag-gray": gray,
              duration: dur,
              ease,
            },
            0
          )
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0)
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0)
          }
        }
      })

      tlRef.current = tl
    },
    [
      active,
      count,
      duration,
      ease,
      vertical,
      tilt,
      parallax,
      grayscale,
      dim,
      showLabels,
      stagger,
      prefersReduced,
    ]
  )

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const measure = () => {
      const rect = el.getBoundingClientRect()
      const total = vertical ? rect.height : rect.width
      const cross = vertical ? rect.width : rect.height
      const usable = Math.max(total - gap * (count - 1), 120)

      let r = clampRatio(expandRatio)
      if (activeAspect > 0 && count > 1 && cross > 0) {
        // Width (or height, when vertical) the active panel needs for the requested aspect,
        // capped so the collapsed panels keep `minItemSize` each on narrow containers.
        const wanted = vertical ? cross / activeAspect : cross * activeAspect
        const capped = Math.min(wanted, usable - minItemSize * (count - 1))
        r = clampRatio(capped / usable)
      }
      ratioRef.current = r

      const size = Math.max(140, usable * r * 1.22)
      mediaSizeRef.current = size
      el.style.setProperty("--ag-media-size", `${size}px`)
      applyLayout(!firstRunRef.current)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [applyLayout, gap, count, expandRatio, activeAspect, minItemSize, vertical])

  useEffect(() => {
    applyLayout(!firstRunRef.current)
    firstRunRef.current = false
  }, [applyLayout])

  useEffect(
    () => () => {
      tlRef.current?.kill()
    },
    []
  )

  const handleEnter = i => {
    if (trigger === "hover") setActive(i)
  }

  const handleClick = (i, e) => {
    if (i !== active) {
      e.preventDefault()
      setActive(i)
      return
    }
    if (onItemSelect) {
      e.preventDefault()
      onItemSelect(items[i], i)
    }
  }

  const handleKeyDown = (i, e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  const rootHeight = typeof height === "number" ? `${vertical ? Math.round(height * 1.6) : height}px` : height

  return (
    <div
      ref={rootRef}
      className={`flex ${vertical ? "flex-col" : "flex-row"} w-full max-w-full [perspective:1400px] max-[520px]:!flex-col max-[520px]:[perspective:none] ${className}`}
      style={{ gap: `${gap}px`, height: rootHeight }}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === active
        const Tag = item.link ? "a" : "div"
        return (
          <Tag
            key={i}
            ref={el => (panelRefs.current[i] = el)}
            className={`${PANEL_BASE_CLASS} ${shadow ? PANEL_SHADOW_CLASS : PANEL_NO_SHADOW_CLASS}`}
            style={{
              borderRadius: `${radius}px`,
              background: panelColor,
              "--ag-accent": accentColor,
              "--ag-dim": isActive ? 0 : dim,
              "--ag-scrim": isActive ? 1 : 0,
              willChange: "flex-grow, transform",
            }}
            href={item.link || undefined}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            onFocus={() => setActive(i)}
            onKeyDown={e => handleKeyDown(i, e)}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                ref={el => (mediaRefs.current[i] = el)}
                className="absolute top-1/2 left-1/2 [filter:grayscale(var(--ag-gray,1))]"
                style={{
                  width: vertical ? "100%" : "var(--ag-media-size, 320px)",
                  height: vertical ? "var(--ag-media-size, 320px)" : "100%",
                  // Seed the filter so a `grayscale={false}` gallery never flashes grey
                  // between first paint and the first GSAP pass.
                  "--ag-gray": grayscale ? 1 : 0,
                  willChange: "transform, filter",
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  draggable="false"
                  className="block h-full w-full select-none object-cover [-webkit-user-drag:none]"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>
            {showLabels && (
              <span
                className="pointer-events-none absolute bottom-5 left-5 right-5 z-[2] flex items-center gap-3"
                aria-hidden="true"
              >
                <span
                  ref={el => (barRefs.current[i] = el)}
                  className="h-[26px] w-[3px] flex-none rounded-[3px] opacity-0"
                  style={{
                    background: item.color || accentColor,
                    boxShadow: `0 0 12px color-mix(in srgb, ${item.color || accentColor} 60%, transparent)`,
                  }}
                />
                <span
                  ref={el => (textRefs.current[i] = el)}
                  className="min-w-0 flex-1 opacity-0"
                  style={{ color: textColor }}
                >
                  <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-[clamp(0.95rem,1.2vw,1.3rem)] font-semibold tracking-[0.01em] [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                    {item.label}
                  </span>
                  {item.sublabel && (
                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap font-mono-tight text-[11px] opacity-75 [text-shadow:0_2px_14px_rgba(0,0,0,0.55)]">
                      {item.sublabel}
                    </span>
                  )}
                </span>
              </span>
            )}
          </Tag>
        )
      })}
    </div>
  )
}

export default AccordionGallery
