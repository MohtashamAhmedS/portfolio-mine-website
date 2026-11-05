'use client'

import { useEffect, useRef } from 'react'

// Heading that fills with color (left to right) as it scrolls into view
export default function FillHeading({ children, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      el.style.setProperty('--fill', '1')
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.9 // fill begins when heading top hits 90% of viewport
      const end = vh * 0.45 // fill completes when heading top reaches 45%
      const p = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))
      el.style.setProperty('--fill', p.toFixed(3))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const headingClasses = `font-secondary text-[clamp(3rem,11vw,5.5rem)] font-extrabold leading-[.9] tracking-tight md:text-[clamp(3.5rem,8vw,9rem)] ${className}`

  return (
    <div ref={ref} className="relative w-fit" style={{ '--fill': 0 }}>
      {/* Outline layer (empty state) */}
      <h2
        className={`${headingClasses} text-transparent`}
        style={{ WebkitTextStroke: '2px #000' }}
      >
        {children}
      </h2>

      {/* Filled layer, revealed left to right (clip extends past the box so descenders fill too) */}
      <span
        aria-hidden="true"
        className={`${headingClasses} pointer-events-none absolute inset-0 text-black`}
        style={{
          clipPath: 'inset(-30% calc(100% - var(--fill) * 105%) -30% -5%)',
        }}
      >
        {children}
      </span>
    </div>
  )
}
