import { useEffect, useMemo, useRef } from "react"
import Matter from "matter-js"

const { Bodies, Body, Composite, Constraint, Engine, Query } = Matter

// A physics heap of avatar stickers: they rain in from above, pile up on the
// floor of the panel, and can be picked up and flung around with the pointer.

// Each PNG is square with a lot of transparent margin, and the artwork sits
// off-centre in some of them. `box` is the measured opaque bounding box as
// [x, y, w, h] fractions of the square, so the physics body can match what is
// actually drawn instead of the whole canvas.
const ART = [
  { src: "/个人形象/4.png", box: [0.07, 0.078, 0.895, 0.871] },
  { src: "/个人形象/5.png", box: [0.188, 0.102, 0.621, 0.789] },
  { src: "/个人形象/6.png", box: [0.066, 0.125, 0.867, 0.734] },
  { src: "/个人形象/7.png", box: [0.242, 0.047, 0.473, 0.883] },
  { src: "/个人形象/8.png", box: [0.066, 0.277, 0.867, 0.445] },
  { src: "/个人形象/9.png", box: [0.129, 0.074, 0.781, 0.852] },
  { src: "/个人形象/10.png", box: [0.105, 0.125, 0.816, 0.793] },
]

const COUNT = 14
const MIN_SIZE = 56
const MAX_SIZE = 100
const WALL = 220 // thick walls so a flung sticker can't tunnel through
const DROP_GAP = 72 // vertical spacing between stickers waiting off-screen
const DROP_SPEED = 9 // initial downward speed, so the panel fills in quickly
const IDLE_FRAMES = 45 // frames of stillness before the loop parks itself

// Grabbing a sticker punches its neighbours outwards.
const BLAST_RADIUS = 190
const BLAST_POWER = 13
const BLAST_LIFT = 3.5 // extra upward kick, so the pile pops rather than slides
const BLAST_SPIN = 0.9

// Seeded so the pile is laid out identically on every mount.
function mulberry32(seed) {
  return function random() {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildStickers() {
  const rand = mulberry32(0x5e77a)
  return Array.from({ length: COUNT }, (_, i) => {
    const art = ART[i % ART.length]
    const [bx, by, bw, bh] = art.box
    const size = Math.round(MIN_SIZE + rand() * (MAX_SIZE - MIN_SIZE))
    return {
      id: i,
      src: art.src,
      size,
      bodyW: size * bw,
      bodyH: size * bh,
      // Where the artwork's centre sits inside the square image — the body is
      // pinned here, and the image rotates about it.
      originX: size * (bx + bw / 2),
      originY: size * (by + bh / 2),
      xPct: 0.12 + rand() * 0.76,
      angle: (rand() - 0.5) * Math.PI,
      spin: (rand() - 0.5) * 0.55,
      jitter: rand(),
    }
  })
}

export default function StickerPile({ className = "" }) {
  const hostRef = useRef(null)
  const nodesRef = useRef([])
  const stickers = useMemo(buildStickers, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    let w = host.clientWidth
    let h = host.clientHeight
    if (!w || !h) return

    const engine = Engine.create()
    // NB: matter's own sleeping is unusable here. Sleeping.update() runs
    // *before* _bodiesApplyGravity(), and by then the force buffer has been
    // cleared, so its "wake bodies under force" guard never sees gravity — a
    // sticker spawned at rest in mid-air falls asleep and is skipped by
    // gravity forever. We park the rAF loop on an idle check instead.
    engine.gravity.y = 1
    engine.gravity.scale = 0.0014

    const wallOpts = { isStatic: true, friction: 0.02, restitution: 0.5 }
    const floor = Bodies.rectangle(w / 2, h + WALL / 2, w * 4, WALL, wallOpts)
    const left = Bodies.rectangle(-WALL / 2, h / 2, WALL, h * 2 + 4000, wallOpts)
    const right = Bodies.rectangle(w + WALL / 2, h / 2, WALL, h * 2 + 4000, wallOpts)
    Composite.add(engine.world, [floor, left, right])

    const bodies = stickers.map((s, i) =>
      Bodies.rectangle(
        s.xPct * w,
        -s.bodyH - i * DROP_GAP - s.jitter * DROP_GAP,
        s.bodyW,
        s.bodyH,
        {
          chamfer: { radius: Math.min(s.bodyW, s.bodyH) * 0.26 },
          angle: s.angle,
          angularVelocity: s.spin,
          // Slippery and bouncy: stickers tumble, skid and keep spinning
          // instead of sticking where they land.
          friction: 0.05,
          frictionStatic: 0.18,
          frictionAir: 0.005,
          restitution: 0.45,
          density: 0.0012,
          slop: 0.02,
        }
      )
    )
    for (const b of bodies) Body.setVelocity(b, { x: 0, y: DROP_SPEED })
    Composite.add(engine.world, bodies)

    const sync = () => {
      for (let i = 0; i < bodies.length; i++) {
        const node = nodesRef.current[i]
        if (!node) continue
        const b = bodies[i]
        const s = stickers[i]
        node.style.transform = `translate3d(${b.position.x - s.originX}px, ${
          b.position.y - s.originY
        }px, 0) rotate(${b.angle}rad)`
        node.style.opacity = "1"
      }
    }

    // Recycle anything that escapes (a hard fling into a corner, a resize).
    const recycle = () => {
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        if (b.position.y > h + 400 || b.position.x < -300 || b.position.x > w + 300) {
          Body.setPosition(b, { x: stickers[i].xPct * w, y: -stickers[i].bodyH })
          Body.setVelocity(b, { x: 0, y: 0 })
          Body.setAngularVelocity(b, 0)
        }
      }
    }

    // Reduced motion: settle the pile off-screen so it is simply *there*.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let i = 0; i < 420; i++) Engine.update(engine, 1000 / 60)
    }
    sync()

    // --- pointer dragging -------------------------------------------------
    // Only swallow the gesture when a sticker is actually grabbed, so the
    // panel stays scrollable and the rest of the card keeps its own events.
    let drag = null

    // Radial impulse from the grab point: everything nearby scatters, hardest
    // at the centre, and small stickers fly further than fat ones.
    const blast = (origin, exclude) => {
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        if (b === exclude) continue
        const dx = b.position.x - origin.x
        const dy = b.position.y - origin.y
        const dist = Math.hypot(dx, dy) || 1
        if (dist > BLAST_RADIUS) continue
        const falloff = 1 - dist / BLAST_RADIUS
        const push = (BLAST_POWER * falloff) / Math.sqrt(b.mass)
        Body.setVelocity(b, {
          x: b.velocity.x + (dx / dist) * push,
          y: b.velocity.y + (dy / dist) * push - falloff * BLAST_LIFT,
        })
        Body.setAngularVelocity(
          b,
          b.angularVelocity + (dx > 0 ? 1 : -1) * falloff * BLAST_SPIN
        )
      }
    }

    const toLocal = (event) => {
      const rect = host.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerDown = (event) => {
      if (drag) return
      const point = toLocal(event)
      const hits = Query.point(bodies, point)
      if (!hits.length) return
      const body = hits[hits.length - 1]

      drag = Constraint.create({
        pointA: point,
        bodyB: body,
        // Matter pairs an unrotated world offset with angleB — see MouseConstraint.
        pointB: { x: point.x - body.position.x, y: point.y - body.position.y },
        angleB: body.angle,
        stiffness: 0.09,
        damping: 0.03,
        length: 0,
        render: { visible: false },
      })
      Composite.add(engine.world, drag)
      blast(point, body)
      start()
      host.setPointerCapture(event.pointerId)
      host.style.cursor = "grabbing"
      event.preventDefault()
    }

    const onPointerMove = (event) => {
      if (!drag) {
        if (event.pointerType === "mouse") {
          host.style.cursor = Query.point(bodies, toLocal(event)).length ? "grab" : ""
        }
        return
      }
      drag.pointA = toLocal(event)
      event.preventDefault()
    }

    const endDrag = () => {
      if (!drag) return
      Composite.remove(engine.world, drag)
      drag = null
      host.style.cursor = ""
    }

    host.addEventListener("pointerdown", onPointerDown)
    host.addEventListener("pointermove", onPointerMove)
    host.addEventListener("pointerup", endDrag)
    host.addEventListener("pointercancel", endDrag)

    // --- loop -------------------------------------------------------------
    let raf = 0
    let last = performance.now()
    let running = false
    let quiet = 0

    // Cheap stand-in for engine sleeping: once every sticker is inside the
    // panel and has stopped moving, park the loop until something disturbs it.
    const settled = () => {
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        if (b.position.y < 0) return false
        if (b.speed > 0.4 || Math.abs(b.angularSpeed) > 0.02) return false
      }
      return true
    }

    const frame = (now) => {
      const delta = Math.min(now - last, 1000 / 30)
      last = now
      Engine.update(engine, delta)
      recycle()
      sync()
      if (!drag && settled()) {
        if (++quiet > IDLE_FRAMES) {
          running = false
          return
        }
      } else {
        quiet = 0
      }
      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (running) return
      running = true
      quiet = 0
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(raf)
      endDrag()
    }

    // Idle while the panel is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    )
    io.observe(host)

    const ro = new ResizeObserver(() => {
      const nw = host.clientWidth
      const nh = host.clientHeight
      if (!nw || !nh || (nw === w && nh === h)) return
      w = nw
      h = nh
      Body.setPosition(floor, { x: w / 2, y: h + WALL / 2 })
      Body.setPosition(left, { x: -WALL / 2, y: h / 2 })
      Body.setPosition(right, { x: w + WALL / 2, y: h / 2 })
      start()
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]
        const s = stickers[i]
        const x = Math.min(Math.max(b.position.x, s.bodyW / 2), w - s.bodyW / 2)
        const y = Math.min(b.position.y, h - s.bodyH / 2)
        if (x !== b.position.x || y !== b.position.y) Body.setPosition(b, { x, y })
      }
    })
    ro.observe(host)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      host.removeEventListener("pointerdown", onPointerDown)
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerup", endDrag)
      host.removeEventListener("pointercancel", endDrag)
      Composite.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [stickers])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`overflow-hidden ${className}`}
      style={{ touchAction: "pan-y" }}
    >
      {stickers.map((s, i) => (
        <img
          key={s.id}
          ref={(node) => {
            nodesRef.current[i] = node
          }}
          src={s.src}
          alt=""
          draggable="false"
          width={s.size}
          height={s.size}
          className="absolute left-0 top-0 max-w-none select-none will-change-transform"
          style={{ opacity: 0, transformOrigin: `${s.originX}px ${s.originY}px` }}
        />
      ))}
    </div>
  )
}
