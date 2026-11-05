'use client'

import { useEffect, useRef } from 'react'

// ---- Tweak these ----
const INK = '#000'
const TRAIL_LIFE = 700 // ms before ink fades out
const LINE_WIDTH = 2.5 // normal stroke width
const LINE_WIDTH_PRESSED = 4.5 // stroke width while mouse is held
const SHOW_TRAIL = true // set false for pen icon only
// ---------------------

export default function PenCursor() {
  const canvasRef = useRef(null)
  const penRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const canvas = canvasRef.current
    const pen = penRef.current
    const ctx = canvas.getContext('2d')
    document.documentElement.classList.add('pen-cursor-on')

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let points = []
    let x = -100
    let y = -100
    let tilt = 0
    let pressed = false
    let visible = false
    let raf

    const onMove = (e) => {
      const dx = e.clientX - x
      x = e.clientX
      y = e.clientY
      // tilt the pen a little based on horizontal movement
      tilt += (Math.max(-25, Math.min(25, dx * 1.2)) - tilt) * 0.25
      if (!visible) {
        visible = true
        pen.style.opacity = '1'
      }
      if (SHOW_TRAIL)
        points.push({
          x,
          y,
          t: performance.now(),
          w: pressed ? LINE_WIDTH_PRESSED : LINE_WIDTH,
        })
    }
    const onDown = () => {
      pressed = true
      pen.dataset.pressed = 'true'
    }
    const onUp = () => {
      pressed = false
      pen.dataset.pressed = 'false'
    }
    const onLeave = () => {
      visible = false
      pen.style.opacity = '0'
    }
    const onEnter = () => {
      visible = true
      pen.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    const frame = () => {
      const now = performance.now()
      pen.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg)`
      tilt *= 0.9

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      points = points.filter((p) => now - p.t < TRAIL_LIFE)

      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = INK

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        // skip big jumps (e.g. mouse re-entering the window)
        if (b.t - a.t > 80) continue
        const life = 1 - (now - b.t) / TRAIL_LIFE
        ctx.globalAlpha = Math.max(0, life)
        ctx.lineWidth = b.w * (0.4 + 0.6 * life)
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.documentElement.classList.remove('pen-cursor-on')
    }
  }, [])

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html.pen-cursor-on, html.pen-cursor-on * { cursor: none !important; }
        }
        .pen-cursor { transition: opacity .2s ease; }
        .pen-cursor svg { transition: transform .15s ease; transform-origin: 2px 38px; }
        .pen-cursor[data-pressed="true"] svg { transform: scale(.9) rotate(-6deg); }
      `}</style>

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden md:block"
      />

      <div
        ref={penRef}
        aria-hidden="true"
        data-pressed="false"
        style={{ opacity: 0 }}
        className="pen-cursor pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
      >
        {/* tip of the pen sits exactly on the pointer position */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          style={{
            position: 'absolute',
            left: -2,
            top: -38,
            overflow: 'visible',
          }}
        >
          {/* nib */}
          <path
            d="M2 38 L8 24 L14 30 Z"
            fill="#000"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* body */}
          <path
            d="M8 24 L28 4 L36 12 L14 30 Z"
            fill="#F0E4CA"
            stroke="#000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* sketchy second stroke */}
          <path
            d="M9 25.5 L28.5 5.5 M13 29 L35 11"
            stroke="#000"
            strokeWidth="1"
            strokeLinecap="round"
            opacity=".6"
          />
          {/* end cap */}
          <path
            d="M28 4 L32 0.5 Q34 0 36 2 L39 5 Q40 7 38.5 8.5 L36 12"
            fill="#000"
            stroke="#000"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  )
}
