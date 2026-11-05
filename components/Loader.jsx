'use client'

import { useEffect, useRef, useState } from 'react'

// ---- Tweak these ----
const DRAW_MS = 2600 // time to write the "m" (the name reveals in sync)
const HOLD_MS = 450 // pause after writing, before fading out
const FADE_MS = 600 // fade-out duration
const PEN_SCALE = 0.8 // pen size inside the logo
const NAME = 'Mohtashim'
// ---------------------

// Invisible centerline through your logo: stem down, back up, arch, down, back up, arch, down
const GUIDE_PATH =
  'M10 8 L10 102 L10 72 C12 44 28 22 52 18 C74 15 84 30 84 52 L84 102 L84 70 C88 44 104 26 130 16 C150 9 164 12 165 32 L167 104'

const LOGO_PATH =
  'M19.6875 103.828C13.2812 106.484 8.98438 107.812 6.79688 107.812C4.76562 107.812 3.35938 107.578 2.57812 107.109C1.79688 106.641 0.9375 105.547 0 103.828C0 98.6719 0.15625 92.1875 0.46875 84.375C0.9375 76.5625 1.32812 68.2031 1.64062 59.2969C1.95312 50.3906 2.10938 41.4062 2.10938 32.3438C2.10938 23.2812 1.64062 15 0.703125 7.5C0.703125 2.5 4.0625 0 10.7812 0C12.3438 0 13.5156 2.8125 14.2969 8.4375C15.2344 14.0625 15.8594 18.4375 16.1719 21.5625C16.6406 24.6875 17.0312 26.9531 17.3438 28.3594C21.4062 21.0156 29.4531 15.2344 41.4844 11.0156C47.8906 8.98438 53.9062 7.96875 59.5312 7.96875C65.1562 7.96875 70.0781 8.67188 74.2969 10.0781C78.6719 11.3281 82.3438 13.75 85.3125 17.3438C88.4375 20.7812 90 25.3906 90 31.1719C94.0625 23.5156 103.203 16.6406 117.422 10.5469C130.391 4.76562 142.031 1.875 152.344 1.875C167.188 1.875 174.453 7.5 174.141 18.75L179.062 105.938C179.062 106.719 176.797 107.266 172.266 107.578C163.516 108.203 159.141 107.422 159.141 105.234C158.984 102.109 158.906 98.9844 158.906 95.8594L160.078 58.125C160.078 40.4688 158.359 26.4844 154.922 16.1719C144.609 16.9531 136.641 18.6719 131.016 21.3281C125.547 23.8281 120.703 27.0312 116.484 30.9375C112.266 34.6875 108.516 39.7656 105.234 46.1719C97.8906 60.5469 94.2188 79.6094 94.2188 103.359C93.2812 106.641 90.2344 108.281 85.0781 108.281C81.6406 108.281 78.8281 107.734 76.6406 106.641C74.4531 105.391 73.5938 104.297 74.0625 103.359C77.0312 86.7969 78.5156 73.9062 78.5156 64.6875C78.5156 57.3438 77.7344 50.3906 76.1719 43.8281C74.7656 37.1094 72.9688 29.4531 70.7812 20.8594C48.2812 20.8594 33.125 29.8438 25.3125 47.8125C21.875 55.7812 19.9219 63.2812 19.4531 70.3125C19.1406 77.1875 18.9844 83.125 18.9844 88.125C18.9844 92.9688 19.2188 98.2031 19.6875 103.828Z'

const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function Loader() {
  const guideRef = useRef(null)
  const penRef = useRef(null)
  const nameRef = useRef(null)
  const [phase, setPhase] = useState('drawing') // drawing | leaving | done

  useEffect(() => {
    const guide = guideRef.current
    const pen = penRef.current
    const nameEl = nameRef.current
    if (!guide || !pen || !nameEl) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reduce ? 0 : DRAW_MS
    const total = guide.getTotalLength()

    // lock scroll while loading
    const html = document.documentElement
    const prevOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    guide.style.strokeDasharray = `${total}`
    guide.style.strokeDashoffset = `${total}`

    const place = (p) => {
      const pt = guide.getPointAtLength(total * p)
      pen.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
    }
    const reveal = (p) => {
      // wipe the name in left to right, with a small fade-up
      nameEl.style.clipPath = `inset(-20% ${(1 - p) * 100}% -20% -5%)`
      nameEl.style.opacity = `${Math.min(1, p * 4)}`
      nameEl.style.transform = `translateY(${(1 - Math.min(1, p * 3)) * 10}px)`
    }
    place(0)
    reveal(0)

    let raf
    let t1
    let t2
    const start = performance.now()

    const frame = (now) => {
      const raw = duration === 0 ? 1 : Math.min(1, (now - start) / duration)
      const p = easeInOut(raw)
      guide.style.strokeDashoffset = `${total * (1 - p)}`
      place(p)
      reveal(p)

      if (raw < 1) {
        raf = requestAnimationFrame(frame)
      } else {
        pen.style.opacity = '0'
        t1 = setTimeout(() => {
          setPhase('leaving')
          html.style.overflow = prevOverflow
          t2 = setTimeout(() => setPhase('done'), FADE_MS)
        }, HOLD_MS)
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(t1)
      clearTimeout(t2)
      html.style.overflow = prevOverflow
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      aria-hidden="true"
      style={{ transitionDuration: `${FADE_MS}ms` }}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-4 bg-[#F0E4CA] transition-opacity ease-out sm:gap-5 ${
        phase === 'leaving' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <svg
        viewBox="0 0 180 109"
        className="h-auto w-[clamp(160px,28vw,280px)] overflow-visible"
        fill="none"
      >
        <defs>
          <mask
            id="loader-m-reveal"
            maskUnits="userSpaceOnUse"
            x="-20"
            y="-20"
            width="220"
            height="150"
          >
            <path
              ref={guideRef}
              d={GUIDE_PATH}
              stroke="#fff"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </mask>
        </defs>

        {/* Your logo, revealed as the pen writes */}
        <g mask="url(#loader-m-reveal)">
          <path d={LOGO_PATH} fill="#000" />
        </g>

        {/* Pen (tip rides the centerline) */}
        <g ref={penRef} style={{ transition: 'opacity .25s ease' }}>
          <g transform={`scale(${PEN_SCALE}) translate(-2 -38)`}>
            <path
              d="M2 38 L8 24 L14 30 Z"
              fill="#000"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 24 L28 4 L36 12 L14 30 Z"
              fill="#F0E4CA"
              stroke="#000"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9 25.5 L28.5 5.5 M13 29 L35 11"
              stroke="#000"
              strokeWidth="1"
              strokeLinecap="round"
              opacity=".6"
            />
            <path
              d="M28 4 L32 0.5 Q34 0 36 2 L39 5 Q40 7 38.5 8.5 L36 12"
              fill="#000"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      {/* Name, revealed in sync with the pen */}
      <span
        ref={nameRef}
        style={{ opacity: 0, clipPath: 'inset(-20% 100% -20% -5%)' }}
        className="font-secondary text-[clamp(1.75rem,5vw,3rem)] font-extrabold leading-none tracking-tighter text-black"
      >
        {NAME}
      </span>
    </div>
  )
}
