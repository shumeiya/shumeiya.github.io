import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

/* ==================================================================
   素材   ——   占位阶段重复使用现有文件
   书本(可交互):  书本/1侧封.png  +  书本/1正封.png
   不可交互侧封:   书皮侧封/1-8.png
   装饰元素:       装饰元素/1-5.png
================================================================== */
const DIR = "/studies"
const src = (p) => encodeURI(`${DIR}/${p}`)

let uid = 0
const book = (w = 46, cover = 264) => ({
  id: ++uid, type: "book", w, cover,
  side: src("书本/1侧封.png"),
  front: src("书本/1正封.png"),
})
const spine = (n, w = 46) => ({ id: ++uid, type: "spine", w, img: src(`书皮侧封/${n}.png`) })
const decor = (n, w = 100) => ({ id: ++uid, type: "decor", w, img: src(`装饰元素/${n}.png`) })

// 上下两层各自混排三种元素(装饰 / 不可交互侧封 / 可交互书本)
const TOP = [
  decor(1, 92), spine(1, 44), book(), spine(2, 40), spine(3, 52),
  decor(2, 104), spine(4, 46), book(), spine(5, 42), decor(3, 96),
  spine(6, 48), book(), spine(7, 44), spine(8, 50), decor(4, 110),
  spine(1, 46), book(), spine(3, 42), decor(5, 88), spine(5, 48),
]
const BOTTOM = [
  spine(5, 48), book(), decor(4, 100), spine(6, 44), spine(7, 40),
  book(), spine(8, 52), decor(2, 96), spine(1, 46), book(),
  spine(2, 42), decor(1, 108), spine(3, 50), spine(4, 44), book(),
  decor(3, 92), spine(6, 46), spine(8, 48), decor(5, 96), book(),
]

/* ================================================================== */

export default function Studies() {
  return (
    <main className="studies flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden select-none">
      <Shelf items={TOP} />
      <Shelf items={BOTTOM} />
      <ShelfStyles />
    </main>
  )
}

/* ---- 一层书架 --------------------------------------------------- */
function Shelf({ items }) {
  const stageRef = useRef(null)
  const railRef = useRef(null)

  // 本层独立的横向滚动(滚轮 / 拖动)+ 惯性
  useEffect(() => {
    const stage = stageRef.current
    const rail = railRef.current
    if (!stage || !rail) return

    let x = 0, target = 0, min = 0, max = 0, raf = 0
    let panning = false, startX = 0, startTarget = 0

    const clamp = (v) => Math.max(min, Math.min(max, v))
    const bounds = () => { max = 0; min = Math.min(0, stage.clientWidth - rail.scrollWidth) }

    const onWheel = (e) => {
      e.preventDefault()
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      target = clamp(target - d)
    }
    const onDown = (e) => {
      if (e.target.closest("[data-nopan]")) return   // 在书本 / 装饰上按下不触发平移
      panning = true; startX = e.clientX; startTarget = target
      stage.setPointerCapture?.(e.pointerId); stage.style.cursor = "grabbing"
    }
    const onMove = (e) => { if (panning) target = clamp(startTarget + (e.clientX - startX)) }
    const onUp = () => { panning = false; stage.style.cursor = "grab" }

    const loop = () => {
      x += (target - x) * 0.1
      rail.style.transform = `translateX(${x.toFixed(2)}px)`
      raf = requestAnimationFrame(loop)
    }

    bounds()
    const ro = new ResizeObserver(bounds); ro.observe(rail); ro.observe(stage)
    stage.addEventListener("wheel", onWheel, { passive: false })
    stage.addEventListener("pointerdown", onDown)
    stage.addEventListener("pointermove", onMove)
    stage.addEventListener("pointerup", onUp)
    stage.addEventListener("pointercancel", onUp)
    loop()
    return () => {
      cancelAnimationFrame(raf); ro.disconnect()
      stage.removeEventListener("wheel", onWheel)
      stage.removeEventListener("pointerdown", onDown)
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerup", onUp)
      stage.removeEventListener("pointercancel", onUp)
    }
  }, [])

  return (
    <section ref={stageRef} className="shelf-stage" style={{ cursor: "grab" }}>
      <div ref={railRef} className="shelf-rail">
        {items.map((it) =>
          it.type === "book" ? <BookItem key={it.id} item={it} /> :
          it.type === "spine" ? <SpineItem key={it.id} item={it} /> :
          <DecorItem key={it.id} item={it} />
        )}
      </div>
      <div className="shelf-plank" />
    </section>
  )
}

/* ---- 可交互书本:侧封 → hover 翻转 → 正封 ----------------------- */
function BookItem({ item }) {
  return (
    <div data-nopan className="book" style={{ "--thick": `${item.w}px` }}>
      <div className="book-3d">
        <div className="book-side"><img src={item.side} alt="" draggable={false} /></div>
        <div className="book-cover"><img src={item.front} alt="" draggable={false} /></div>
      </div>
    </div>
  )
}

/* ---- 不可交互侧封:静止,只随邻居移动 --------------------------- */
function SpineItem({ item }) {
  return (
    <div className="spine-static" style={{ width: `${item.w}px` }}>
      <img src={item.img} alt="" draggable={false} />
    </div>
  )
}

/* ---- 装饰元素:可拖拽 → 松手掉落消失 → 回到原位 ----------------- */
function DecorItem({ item }) {
  const slotRef = useRef(null)
  const [collapsed, setCollapsed] = useState(false)   // 占位是否收起(邻居补齐)
  const [overlay, setOverlay] = useState(null)        // 浮层 {x,y,w,h}
  const [falling, setFalling] = useState(false)
  const grab = useRef({ ox: 0, oy: 0 })
  const done = useRef(false)

  const onMove = useCallback((e) => {
    setOverlay((o) => o && { ...o, x: e.clientX - grab.current.ox, y: e.clientY - grab.current.oy })
  }, [])

  const onUp = useCallback(() => {
    window.removeEventListener("pointermove", onMove)
    setFalling(true)   // 触发掉落动画;结束后在 onTransitionEnd 里复位
  }, [onMove])

  const onDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const r = slotRef.current.getBoundingClientRect()
    grab.current = { ox: e.clientX - r.left, oy: e.clientY - r.top }
    done.current = false
    setOverlay({ x: r.left, y: r.top, w: r.width, h: r.height })
    setCollapsed(true)   // 抓起瞬间空位收起,邻居补齐
    setFalling(false)
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp, { once: true })
  }

  const onFallEnd = (e) => {
    if (e.propertyName !== "transform" || done.current) return
    done.current = true
    setOverlay(null)
    setFalling(false)
    setCollapsed(false)  // 掉落消失后:占位复原,邻居退回,元素回到原位
  }

  useEffect(() => () => window.removeEventListener("pointermove", onMove), [onMove])

  return (
    <>
      <div
        ref={slotRef}
        data-nopan
        className={`decor-slot${collapsed ? " is-collapsed" : ""}`}
        style={{ width: `${item.w}px` }}
      >
        <img src={item.img} alt="" draggable={false} onPointerDown={onDown} />
      </div>

      {overlay && createPortal(
        <div
          className={`decor-overlay${falling ? " is-falling" : ""}`}
          style={{ left: overlay.x, top: overlay.y, width: overlay.w, height: overlay.h }}
          onTransitionEnd={onFallEnd}
        >
          <img src={item.img} alt="" draggable={false} />
        </div>,
        document.body
      )}
    </>
  )
}

/* ---- 样式 & 手感参数 ------------------------------------------- */
function ShelfStyles() {
  return (
    <style>{`
      .studies {
        --shelf-h: 50%;
        --book-h: clamp(200px, 34vh, 340px);
        --plank: 16px;
        --dur: .5s;
        --ease: cubic-bezier(.22,.61,.28,1);
      }

      .shelf-stage {
        position: relative; flex: 1 1 0; min-height: 0; overflow: hidden;
      }
      .shelf-rail {
        position: absolute; left: 0; bottom: var(--plank);
        display: flex; align-items: flex-end; gap: 6px;
        padding: 0 6vw; will-change: transform;
      }
      .shelf-plank {
        position: absolute; left: 0; right: 0; bottom: 0; height: var(--plank);
        background: linear-gradient(#c79a63, #b07f45 42%, #966834);
        box-shadow: 0 -1px 0 rgba(255,255,255,.35) inset,
                    0 10px 22px -8px rgba(80,50,20,.55);
        z-index: 3;
      }

      /* --- 可交互书本:书脊+正封 是直角相连的刚体,绕"书脊右边缘"整体旋转 --- */
      .book {
        position: relative; flex: 0 0 auto;
        --cover: calc(var(--book-h) * 0.752);   /* 正封宽度按封面比例算 → 高度==侧封高度 */
        width: var(--thick); height: var(--book-h);
        transition: width var(--dur) var(--ease);
        /* 透视灭点对齐旋转轴(书脊右边缘 x:thick) */
        perspective: 1400px; perspective-origin: var(--thick) 50%; z-index: 1;
      }
      /* 展开后正封落在书脊原位并向右铺开,宽度 = cover */
      .book:hover { width: var(--cover); z-index: 6; }

      /* 刚体容器:绕书脊右边缘旋转;展开时整体再左移一个书脊宽,让正封顶到书脊原位 */
      .book-3d {
        position: absolute; top: 0; left: 0; width: var(--thick); height: 100%;
        transform-style: preserve-3d;
        transform-origin: var(--thick) center;
        transform: translateX(0px) rotateY(0deg);
        transition: transform var(--dur) var(--ease);
      }
      .book:hover .book-3d {
        transform: translateX(calc(-1 * var(--thick))) rotateY(-90deg);
      }

      /* 书脊:正面(闭合可见),随刚体一起从正面转到侧立消失 */
      .book-side {
        position: absolute; top: 0; left: 0; width: var(--thick); height: 100%;
        overflow: hidden; backface-visibility: hidden;
      }
      .book-side img {
        width: 100%; height: 100%; object-fit: cover; object-position: center;
        mix-blend-mode: multiply;   /* 书本侧封是白底 → 去白融进书架 */
      }

      /* 正封:铰接在书脊右边缘,闭合折进书架(90°)隐藏;随刚体旋转到正面完全显示 */
      .book-cover {
        position: absolute; top: 0; left: var(--thick); width: var(--cover); height: 100%;
        transform-origin: left center; transform: rotateY(90deg);
        backface-visibility: hidden;
      }
      .book-cover img { width: 100%; height: 100%; object-fit: contain; }   /* 不裁切,完整正封 */
      .book:hover .book-cover img { box-shadow: 0 14px 26px -12px rgba(0,0,0,.5); }

      /* --- 不可交互侧封 --- */
      .spine-static {
        position: relative; flex: 0 0 auto; height: var(--book-h);
        overflow: hidden;
      }
      .spine-static img {
        width: 100%; height: 100%; object-fit: cover; object-position: center;
        pointer-events: none;
      }

      /* --- 装饰元素(占位) --- */
      .decor-slot {
        position: relative; flex: 0 0 auto;
        height: calc(var(--book-h) * .9);
        display: flex; align-items: flex-end; justify-content: center;
        transition: width var(--dur) var(--ease);
      }
      .decor-slot.is-collapsed { width: 0 !important; }
      .decor-slot img {
        height: 100%; width: auto; max-width: none; object-fit: contain;
        cursor: grab; -webkit-user-drag: none;
        transition: opacity .2s;
      }
      .decor-slot.is-collapsed img { opacity: 0; }

      /* --- 拖拽浮层(掉落到 body 上,不受书架裁剪) --- */
      .decor-overlay {
        position: fixed; z-index: 80; pointer-events: none;
        will-change: transform, opacity;
      }
      .decor-overlay img { width: 100%; height: 100%; object-fit: contain; -webkit-user-drag: none; }
      .decor-overlay.is-falling {
        transition: transform .7s cubic-bezier(.45,.05,.6,1), opacity .7s ease-in;
        transform: translateY(115vh) rotate(14deg);
        opacity: 0;
      }
    `}</style>
  )
}
