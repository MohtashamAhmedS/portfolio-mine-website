'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const paragraphs = [
  "I'm Mohtashim, a web developer and designer with 5 years of experience turning ideas into thoughtful, functional, and visually engaging digital experiences.",
  "For me, building a website is about more than writing code or making something look good. It's about understanding the brand behind it, what makes it different, and how that identity should translate into the digital world. Every brand has its own personality, and I believe its website should reflect that rather than follow the same patterns as everything else.",
  'My approach combines design and development to create websites that feel intentional from the first interaction to the last. I pay attention to the details, from layout, typography, and color choices to animations, responsiveness, and the overall user experience. Every element should have a purpose, and every decision should contribute to the bigger picture.',
  "Over the years, I've worked across different areas of web development, from designing interfaces in Figma and building responsive frontends with React and Next.js to developing backend systems, APIs, and database-driven applications. This allows me to look at a project from both a design and technical perspective, making sure the final product is not only visually strong but also practical, reliable, and built to work.",
  "I enjoy exploring new ideas, experimenting with motion and interactions, and finding ways to make digital experiences feel more natural and memorable. At the same time, I understand that good design isn't just about aesthetics. A website should communicate clearly, be easy to use, perform well, and help a business build trust with its audience.",
  "Whether I'm working on a new website from scratch or helping an existing brand improve its online presence, my goal remains the same: to create something that feels right for the brand, serves its purpose, and stands out for the right reasons.",
  'Everything I build is intentional. From the way a page flows to the smallest detail in its design, I want every decision to have a reason behind it.',
]

// Fades + slides its content in the first time it scrolls into view
function Reveal({ as: Tag = 'div', className = '', delay = 0, children }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </Tag>
  )
}

// Heading that fills with color (left to right) as it scrolls into view
function FillHeading({ children }) {
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

  const headingClasses =
    'font-secondary text-[clamp(3rem,11vw,5.5rem)] font-extrabold leading-[.9] tracking-tight md:text-[clamp(3.5rem,8vw,9rem)]'

  return (
    <div ref={ref} className="relative w-fit" style={{ '--fill': 0 }}>
      {/* Outline layer (empty state) */}
      <h2
        className={`${headingClasses} text-transparent`}
        style={{ WebkitTextStroke: '2px #000' }}
      >
        {children}
      </h2>

      {/* Filled layer, revealed left to right */}
      <span
        aria-hidden="true"
        className={`${headingClasses} pointer-events-none absolute inset-0 text-black`}
        style={{ clipPath: 'inset(0 calc(100% - var(--fill) * 100%) 0 0)' }}
      >
        {children}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="mt-10 w-full overflow-x-clip bg-[#F0E4CA] font-primary tracking-[0.02em] md:mt-16"
    >
      <div className="px-4 pb-12 pt-8 sm:px-6 md:pb-16 md:pt-12 lg:px-10">
        {/* Heading */}
        <FillHeading>About me</FillHeading>

        {/* Content */}
        <div className="mt-8 grid grid-cols-1 items-center gap-10 md:mt-12 md:grid-cols-2 md:gap-12 lg:gap-20">
          {/* Text */}
          <div className="flex w-full flex-col gap-5 text-base leading-relaxed text-black sm:text-lg lg:text-xl">
            {paragraphs.map((text, i) => (
              <Reveal as="p" key={i}>
                {text}
              </Reveal>
            ))}
          </div>

          {/* Portrait */}
          <Reveal
            className="flex w-full items-center justify-center"
            delay={150}
          >
            <Image
              src="/about-portrait.png"
              alt="Portrait illustration of Mohtashim"
              width={700}
              height={760}
              className="h-auto w-full max-w-[420px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
