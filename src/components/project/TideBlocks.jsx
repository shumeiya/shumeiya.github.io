import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { animate, motion, useMotionValue } from "framer-motion"
import { Pause, Play, RotateCcw } from "lucide-react"
import { useT } from "../../i18n/lang"
import { tt } from "../../i18n/t"
import { ui } from "../../i18n/ui"
import { reducedMotion, useInView } from "./wpMotion"

// The TIDE case study's own blocks. The source is the studio's Figma file, and
// the site it describes is an underwater world that moves, so the pages are
// shown moving too: a wall of them drifting, a browser that scrolls itself, a
// 404 whose seahorse can really be dragged home. All the pictures are exports
// of the Figma frames (public/project/tide); the styles live under "TIDE" in
// index.css. Colours are the brand's own nine, fixed in both themes, because
// these are plates of the brand and not parts of this site's interface.

const COPY = {
  pause: tt("Pause the scroll", "暂停滚动"),
  play: tt("Play the scroll", "继续滚动"),
  desktop: tt("Desktop", "桌面端"),
  mobile: tt("Mobile", "移动端"),
  again: tt("Again", "再来一次"),
}

const Caption = ({ children }) =>
  children ? <figcaption className="mt-body text-note text-fog">{children}</figcaption> : null

// A quiet two- or many-way switch. Used for desktop / mobile and for the pages
// of the final site.
function Switch({ items, value, onChange, className = "" }) {
  return (
    <div role="tablist" className={`no-scrollbar flex gap-1 overflow-x-auto ${className}`}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          role="tab"
          aria-selected={value === it.id}
          onClick={() => onChange(it.id)}
          className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-note font-medium transition-colors ${
            value === it.id ? "bg-ink text-box" : "text-fog hover:text-ink"
          }`}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}

// --- overview: the wall ------------------------------------------------------------
// Every page of the finished site, in columns that drift past each other. Each
// column holds its shots twice, so sliding it by half its height loops unseen.
export function TideWall({ columns, caption }) {
  const ref = useRef(null)
  const on = useInView(ref, { threshold: 0.05 })
  return (
    <figure className="mt-visual">
      <div
        ref={ref}
        className={`tide-wall tide-clip relative aspect-[4/3] rounded-2xl bg-[#1e1f5d] sm:aspect-[16/9] ${on ? "is-on" : ""}`}
      >
        <div className="absolute -left-[12%] -top-[30%] flex w-[124%] -rotate-6 gap-3 sm:gap-4">
          {columns.map((col, i) => (
            <div key={i} className={`min-w-0 flex-1 ${i > 2 ? "max-sm:hidden" : ""}`}>
              <div
                className="tide-drift flex flex-col gap-3 pb-3 sm:gap-4 sm:pb-4"
                style={{
                  animationDuration: `${col.speed}s`,
                  animationDelay: `${-col.speed * (i / columns.length)}s`,
                  animationDirection: i % 2 ? "reverse" : "normal",
                }}
              >
                {[...col.shots, ...col.shots].map((s, j) => (
                  <img key={j} src={s.src} width={s.w} height={s.h} alt="" className="block h-auto w-full rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(#1e1f5d99, #1e1f5d00 28%, #1e1f5d00 68%, #1e1f5db3)" }}
        />
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}

// --- introduction: the wordmark, at high tide ---------------------------------------
// The mark sits half under water. The water is two wave-edged layers that drift
// sideways and rise and fall; the front one carries a white copy of the mark,
// so the part below the waterline reads inverted. See `.tide-water`.
export function TideLogo({ caption }) {
  return (
    <figure className="mt-visual">
      <div className="tide-plate relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#fbfbfb] sm:aspect-[16/7]" role="img" aria-label="tide">
        <div className="tide-mark bg-[#91a4fd]" />
        <div className="tide-water tide-water--back bg-[#91a4fd]/45" />
        <div className="tide-water bg-[#587ffc]">
          <div className="tide-mark bg-white" />
        </div>
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}

// --- site map -----------------------------------------------------------------------
// The Figma site map as a real tree. Hovering a page lights it and, because the
// branch it hangs from is hovered too, the whole way back up to the homepage.
const leaves = (n) => (n.children?.length ? n.children.reduce((a, c) => a + leaves(c), 0) : 1)

function Branch({ node, depth }) {
  return (
    <li style={{ flexGrow: leaves(node) }}>
      <span className={`tide-node ${depth < 2 ? "tide-node--main" : ""}`} style={{ "--d": depth }}>
        {node.label}
      </span>
      {node.children?.length > 0 && (
        <ul>
          {node.children.map((c) => (
            <Branch key={c.label} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TideSitemap({ tree, caption }) {
  const t = useT()
  const ref = useRef(null)
  const rail = useRef(null)
  const seen = useInView(ref, { threshold: 0.3, once: true })
  // Where the tree is wider than the screen, open on its middle: the homepage,
  // not the left-most branch.
  useEffect(() => {
    const el = rail.current
    if (el) el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2
  }, [])
  return (
    <figure className="mt-visual">
      <div ref={rail} className="no-scrollbar overflow-x-auto rounded-2xl bg-[#e5eaf5] p-6 sm:p-8">
        <div ref={ref} className={`tide-tree min-w-[880px] ${seen ? "is-in" : ""}`}>
          <ul>
            <Branch node={tree} depth={0} />
          </ul>
        </div>
      </div>
      <Caption>
        {caption} <span className="lg:hidden">{t(ui.scrollSideways)}</span>
      </Caption>
    </figure>
  )
}

// --- wireframes ---------------------------------------------------------------------
// Every wireframe at one scale, in a strip that scrolls sideways (and drags with
// a mouse), with a switch between the two breakpoints. The exports keep Figma's
// own artboard shadow, so the strip is the artboard grey they were drawn on.
export function TideStrip({ sets, caption }) {
  const [id, setId] = useState(sets[0].id)
  const set = sets.find((s) => s.id === id) ?? sets[0]
  const rail = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    if (rail.current) rail.current.scrollLeft = 0
  }, [id])

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return
    drag.current = { x: e.clientX, left: rail.current.scrollLeft }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (drag.current) rail.current.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
  }
  const stop = () => {
    drag.current = null
  }

  return (
    <figure className="mt-visual">
      <Switch items={sets} value={id} onChange={setId} />
      <div
        ref={rail}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="no-scrollbar mt-body flex cursor-grab items-start gap-2 overflow-x-auto rounded-2xl bg-[#e5e5e5] p-4 active:cursor-grabbing sm:p-6"
      >
        {set.items.map((it) => (
          <div key={it.src} className="shrink-0" style={{ width: set.width }}>
            <img
              src={it.src}
              width={it.w}
              height={it.h}
              alt={it.label}
              loading="lazy"
              draggable={false}
              className="block h-auto w-full select-none"
            />
            <p className="text-center text-note text-[#191b1e]/70">{it.label}</p>
          </div>
        ))}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}

// --- the tour -----------------------------------------------------------------------
// A browser and a phone showing the same page, scrolling themselves from top to
// bottom like a screen recording, then winding back. One number drives both:
// `--p` on the stage, 0 at the top of the page and 1 at the bottom, which the
// two images turn into their own translate (see `.tide-scroll`). Nothing here
// captures the wheel, so the case study itself always scrolls.
//
// A page can name stops: places on it, as a share of its height. They are listed
// under the frames, the one in view is marked, and pressing one glides there.
// With text they read as numbered motion notes, without as plain jump chips.
const VIEW = { desktop: 16 / 10, mobile: 390 / 760 }
const NONE = []
const ease = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2)

export function TideTour({ pages, caption }) {
  const t = useT()
  const [tab, setTab] = useState(pages[0].id)
  const [device, setDevice] = useState("desktop")
  const [playing, setPlaying] = useState(true)
  const [active, setActive] = useState(0)
  const stage = useRef(null)
  const inView = useInView(stage, { threshold: 0.25 })
  const p = useRef(0)
  const hold = useRef(0)
  const glide = useRef(null)

  const page = pages.find((x) => x.id === tab) ?? pages[0]
  const stops = page.stops ?? NONE
  // How much of the page the browser shows at once. A stop's `at` is where its
  // section starts, so the scroll that puts it at the top is at / (1 - shown).
  const shown = page.desktop.w / page.desktop.h / VIEW.desktop
  const toP = useCallback((at) => Math.min(1, Math.max(0, at / (1 - shown))), [shown])

  const paint = useCallback(() => {
    stage.current?.style.setProperty("--p", p.current.toFixed(4))
    let i = 0
    stops.forEach((s, k) => {
      if (toP(s.at) <= p.current + 0.02) i = k
    })
    setActive((a) => (a === i ? a : i))
  }, [stops, toP])

  // A new page starts at its top, after a beat to take it in.
  useEffect(() => {
    p.current = 0
    glide.current = null
    hold.current = performance.now() + 1400
    paint()
  }, [tab, paint])

  useEffect(() => {
    if (!inView) return
    const still = reducedMotion()
    const pass = Math.max(14, (1 / shown) * 4.2) * 1000
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(64, now - last)
      last = now
      const g = glide.current
      if (g) {
        const k = Math.min(1, (now - g.t0) / g.dur)
        p.current = g.from + (g.to - g.from) * ease(k)
        if (k >= 1) glide.current = null
        paint()
      } else if (playing && !still && now > hold.current) {
        if (p.current >= 1) {
          glide.current = { from: 1, to: 0, t0: now, dur: 1200 }
          hold.current = now + 2600
        } else {
          p.current = Math.min(1, p.current + dt / pass)
          if (p.current >= 1) hold.current = now + 1800
          paint()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, playing, shown, paint])

  const go = (i) => {
    const now = performance.now()
    glide.current = { from: p.current, to: toP(stops[i].at), t0: now, dur: 700 }
    hold.current = now + 4500
  }

  const noted = stops.some((s) => s.text)
  const shot = (d, eager) => (
    <img
      key={d.src}
      src={d.src}
      width={d.w}
      height={d.h}
      alt=""
      loading={eager ? undefined : "lazy"}
      draggable={false}
      className="tide-scroll absolute left-0 top-0 block h-auto w-full select-none"
    />
  )

  return (
    <figure className="mt-visual">
      {(pages.length > 1 || page.mobile) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {pages.length > 1 && <Switch items={pages} value={tab} onChange={setTab} className="min-w-0" />}
          {page.mobile && (
            <Switch
              className="sm:hidden"
              value={device}
              onChange={setDevice}
              items={[
                { id: "desktop", label: t(COPY.desktop) },
                { id: "mobile", label: t(COPY.mobile) },
              ]}
            />
          )}
        </div>
      )}

      <div
        ref={stage}
        className="tide-tour mt-body flex items-end justify-center gap-4 rounded-2xl bg-box-2 p-4 sm:gap-6 sm:p-6"
        style={{ "--p": 0 }}
      >
        <div
          className={`min-w-0 flex-1 rounded-xl border border-line bg-box shadow-sm ${
            device === "mobile" && page.mobile ? "max-sm:hidden" : ""
          }`}
        >
          <div className="flex items-center gap-3 px-3 py-2">
            <span aria-hidden="true" className="flex shrink-0 gap-1">
              <i className="size-2 rounded-full bg-ink/15" />
              <i className="size-2 rounded-full bg-ink/15" />
              <i className="size-2 rounded-full bg-ink/15" />
            </span>
            <span className="mx-auto min-w-0 truncate rounded-full bg-box-2 px-4 py-1 text-note text-fog">{page.url}</span>
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={t(playing ? COPY.pause : COPY.play)}
              className="shrink-0 cursor-pointer rounded-full p-1 text-fog transition-colors hover:text-ink"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
          </div>
          <div className="tide-view relative rounded-b-xl" style={{ aspectRatio: VIEW.desktop }}>
            {shot(page.desktop)}
          </div>
        </div>

        {page.mobile && (
          <div
            className={`w-[62%] max-w-[230px] shrink-0 rounded-[1.75rem] bg-[#191b1e] p-1 shadow-sm sm:w-[21%] ${
              device === "desktop" ? "max-sm:hidden" : ""
            }`}
          >
            <div className="tide-view relative rounded-[1.5rem]" style={{ aspectRatio: VIEW.mobile }}>
              {shot(page.mobile)}
            </div>
          </div>
        )}
      </div>

      {stops.length > 0 &&
        (noted ? (
          <ol className="mt-visual grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {stops.map((s, i) => (
              <li key={s.label}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={active === i ? "step" : undefined}
                  className={`block w-full cursor-pointer border-t-2 pt-3 text-left transition-colors ${
                    active === i ? "border-[#587ffc]" : "border-line hover:border-ink/40"
                  }`}
                >
                  <span className="font-mono-tight text-note uppercase tracking-wide text-ink">
                    {String(i + 1).padStart(2, "0")} · {s.label}
                  </span>
                  <span className={`mt-2 block text-copy transition-colors ${active === i ? "text-ink" : "text-fog"}`}>
                    {s.text}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-lead flex flex-wrap gap-2">
            {stops.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => go(i)}
                aria-current={active === i ? "step" : undefined}
                className={`cursor-pointer rounded-full border px-3 py-1 text-note transition-colors ${
                  active === i ? "border-[#587ffc] bg-[#587ffc] text-white" : "border-line text-fog hover:text-ink"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        ))}
      <Caption>{caption}</Caption>
    </figure>
  )
}

// --- 404 ----------------------------------------------------------------------------
// "Mi hai ritrovato! Trascinami per portami alla home": the error page asks you
// to drag the seahorse home, so here you can. The scene is the Figma frame with
// the seahorse lifted out of it; the seahorse is the frame's own animated GIF,
// placed where the two Figma states put it (lost on the left, home by the coral).
//
// All of it in shares of the 1920×1080 frame, so it holds at any width. The GIF
// bobs: over its loop the seahorse drifts up by 91 of the GIF's own pixels and
// back, so the box is the whole range it swims through (rows 465 to 778 of a
// 563×1218 canvas, columns 255 to 352), not one frame's outline. In the frame
// the GIF is drawn 1.9425 times its size, with the first frame's seahorse at
// y 494: that puts the top of the range at 494 − 91 × 1.9425 = 317.
const LOST = { left: 270 / 1920, top: 317 / 1080 }
const HOME = { left: 1486 / 1920, top: 317 / 1080 }
const SIZE = { w: 190 / 1920, h: 610 / 1080 }
const SPRITE = {
  backgroundImage: "url(/project/tide/seahorse.gif)",
  backgroundSize: `${(563 / 98) * 100}% ${(1218 / 314) * 100}%`,
  backgroundPosition: `${(255 / (563 - 98)) * 100}% ${(465 / (1218 - 314)) * 100}%`,
}

export function Tide404({ hint, found, caption }) {
  const t = useT()
  const stage = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [home, setHome] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const spring = { type: "spring", stiffness: 260, damping: 26 }

  // Glide to the other spot, then make that spot the resting position, so the
  // seahorse stays put when the page is resized afterwards.
  const settle = (toHome) => {
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    const from = home ? HOME : LOST
    const to = toHome ? HOME : LOST
    animate(y, 0, spring)
    animate(x, (to.left - from.left) * box.width, spring).then(() => {
      // In one paint: the new resting spot and the offset that led to it, cleared.
      flushSync(() => setHome(toHome))
      x.set(0)
    })
  }

  const onDragEnd = () => {
    setDragging(false)
    const box = stage.current?.getBoundingClientRect()
    if (!box) return
    const from = home ? HOME : LOST
    const cx = (from.left + SIZE.w / 2) * box.width + x.get()
    settle(cx > box.width * 0.66)
  }

  const at = home ? HOME : LOST
  return (
    <figure className="mt-visual">
      <div ref={stage} className="tide-clip relative aspect-[16/9] rounded-2xl bg-[#1e1f5d]">
        <img
          src="/project/tide/404-bg.webp"
          width={1600}
          height={900}
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 block size-full select-none"
        />
        {/* Where home is, while the seahorse is in hand. */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute rounded-full border-2 border-dashed border-[#f0d344] transition-opacity duration-300 ${
            dragging && !home ? "opacity-100" : "opacity-0"
          }`}
          style={{ left: "73%", top: "36%", width: "23%", height: "54%" }}
        />
        <motion.button
          type="button"
          drag
          dragConstraints={stage}
          dragElastic={0.08}
          dragMomentum={false}
          onDragStart={() => {
            setDragging(true)
            setTouched(true)
          }}
          onDragEnd={onDragEnd}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return
            e.preventDefault()
            setTouched(true)
            settle(!home)
          }}
          whileDrag={{ scale: 1.06 }}
          aria-label={hint}
          className="absolute cursor-grab touch-none rounded-xl active:cursor-grabbing"
          style={{
            x,
            y,
            left: `${at.left * 100}%`,
            top: `${at.top * 100}%`,
            width: `${SIZE.w * 100}%`,
            height: `${SIZE.h * 100}%`,
          }}
        >
          {/* The GIF is drawn facing left; both Figma states mirror it. */}
          <span className="block size-full -scale-x-100" style={SPRITE} />
          {!touched && (
            <span className="tide-nudge pointer-events-none absolute -top-2 left-1/2 w-max -translate-x-1/2 -translate-y-full rounded-full bg-[#f0d344] px-3 py-1 text-note font-medium text-[#1e1f5d]">
              {hint}
            </span>
          )}
        </motion.button>
        {home && (
          <div className="tide-fade absolute bottom-3 left-3 flex items-center gap-3 rounded-full bg-white/95 py-1 pl-4 pr-1 text-note font-medium text-[#1e1f5d] sm:bottom-4 sm:left-4">
            {found}
            <button
              type="button"
              onClick={() => settle(false)}
              className="flex cursor-pointer items-center gap-1 rounded-full bg-[#1e1f5d] px-3 py-1 text-white"
            >
              <RotateCcw size={13} />
              {t(COPY.again)}
            </button>
          </div>
        )}
      </div>
      <Caption>{caption}</Caption>
    </figure>
  )
}
