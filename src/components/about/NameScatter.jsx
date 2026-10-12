import { useEffect, useRef } from "react"
import Matter from "matter-js"

const { Bodies, Body, Composite, Engine } = Matter

// The name, dropped. Letters fall in from above, knock into one another and
// settle in a heap along the floor of the band — the sign-off at the end of the
// page, after the curtain has finished opening.
//
// The dashboard's sticker pile solves the same problem and is tuned the way
// Viviana wants it; its engine settings are carried over here rather than
// reinvented so the two piles fall with the same weight. It is deliberately a
// separate component though: that one is tuned, and letters need rectangles
// sized from measured glyphs rather than image boxes.
const WALL = 220 // thick walls so nothing tunnels out at speed
const DROP_GAP = 46 // vertical spacing between letters as they queue up to fall
const DROP_SPEED = 7

export default function NameScatter({ text = "shumeizhang", className = "" }) {
  const hostRef = useRef(null)
  const nodesRef = useRef([])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    const letters = Array.from(text)
    let engine = null
    let raf = 0
    let live = false
    let ro = null

    // Measuring has to wait for the font: Anton is a web font, and a rectangle
    // cut to the fallback's metrics would leave the glyphs rattling inside
    // bodies the wrong size.
    const start = () => {
      const w = host.clientWidth
      const h = host.clientHeight
      if (!w || !h) return

      engine = Engine.create()
      // matter's own sleeping is unusable here for the same reason it is in the
      // sticker pile: Sleeping.update() runs before gravity is applied, so a
      // body spawned at rest in mid-air never wakes. The loop idles instead.
      engine.gravity.y = 1
      engine.gravity.scale = 0.0014

      const wallOpts = { isStatic: true, friction: 0.02, restitution: 0.5 }
      const floor = Bodies.rectangle(w / 2, h + WALL / 2, w * 4, WALL, wallOpts)
      const left = Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 2 + 4000, wallOpts)
      const right = Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 2 + 4000, wallOpts)
      Composite.add(engine.world, [floor, left, right])

      const metrics = nodesRef.current.map((n) => {
        const r = n?.getBoundingClientRect()
        return { w: r?.width || 40, h: r?.height || 60 }
      })

      // Spread the drop across the width so they don't all land in one column,
      // and stagger the queue so they arrive as a run rather than a block.
      const bodies = letters.map((_, i) => {
        const m = metrics[i]
        const xPct = (i + 0.5) / letters.length
        return Bodies.rectangle(
          xPct * w,
          -m.h - i * DROP_GAP,
          m.w,
          m.h,
          {
            angle: (Math.random() - 0.5) * 0.5,
            angularVelocity: (Math.random() - 0.5) * 0.12,
            friction: 0.08,
            frictionStatic: 0.3,
            frictionAir: 0.006,
            restitution: 0.35,
            density: 0.0014,
            slop: 0.02,
          }
        )
      })
      for (const b of bodies) Body.setVelocity(b, { x: 0, y: DROP_SPEED })
      Composite.add(engine.world, bodies)

      const sync = () => {
        for (let i = 0; i < bodies.length; i++) {
          const node = nodesRef.current[i]
          if (!node) continue
          const b = bodies[i]
          const m = metrics[i]
          node.style.transform = `translate3d(${b.position.x - m.w / 2}px, ${
            b.position.y - m.h / 2
          }px, 0) rotate(${b.angle}rad)`
          node.style.opacity = "1"
        }
      }

      // Anyone who asked for less motion gets the heap already settled.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        for (let i = 0; i < 420; i++) Engine.update(engine, 1000 / 60)
        sync()
        return
      }

      live = true
      let last = performance.now()
      const tick = (now) => {
        if (!live) return
        const delta = Math.min(now - last, 1000 / 30)
        last = now
        Engine.update(engine, delta)
        sync()
        raf = requestAnimationFrame(tick)
      }
      sync()
      raf = requestAnimationFrame(tick)
    }

    // Only start once the band is actually on screen, so the fall is something
    // you arrive at rather than something already over.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || engine) return
        io.disconnect()
        if (document.fonts?.ready) document.fonts.ready.then(start)
        else start()
      },
      { rootMargin: "0px 0px -20% 0px" }
    )
    io.observe(host)

    return () => {
      live = false
      io.disconnect()
      if (ro) ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (engine) {
        Composite.clear(engine.world, false)
        Engine.clear(engine)
      }
    }
  }, [text])

  return (
    <div
      ref={hostRef}
      aria-label={text}
      className={`relative overflow-hidden ${className}`}
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          ref={(n) => (nodesRef.current[i] = n)}
          aria-hidden="true"
          className="absolute left-0 top-0 select-none font-condensed text-[18vw] leading-none text-cream opacity-0 sm:text-[11rem]"
          style={{ willChange: "transform" }}
        >
          {ch}
        </span>
      ))}
    </div>
  )
}
