'use client'

import { useRef, useState } from 'react'
import SketchButton from './SketchButton'
import ProjectCard from './ProjectCard'
import FillHeading from './FillHeading'

const projects = [
  {
    title: 'Portfolio',
    description: 'Property management software',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: 'https://property-portfolio-management.vercel.app/',
    image: '/projects/portfolio.png',
  },
  {
    title: 'Supellex',
    description: 'Furniture ecommerce website.',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: '#',
    image: '/projects/supellex.png',
  },
  {
    title: 'LegalLens',
    description: 'API based legal document analyzer.',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: 'https://www.loom.com/share/84b6f8e1891942c2ac9dbf57b41454d6',
    image: '/projects/legallens.png',
  },
  {
    title: 'Sufiyana Thread',
    description: 'Ecommerce website',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: 'https://sufiyanathreads.com/',
    image: '/projects/sufiyana-thread.png',
  },
  {
    title: 'AlarfajLaw',
    description: 'Law firm website',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: '#',
    image: '/projects/alarfajlaw.png',
  },
  {
    title: 'AirPass',
    description: 'QR Boarding Pass in Seconds',
    tags: ['Node.js', 'Stripe', 'UI/UX'],
    year: '2025',
    href: 'https://airpass-flight-detail-qrcode-b5ww.vercel.app/',
    image: '/projects/airpass.png',
  },
]

const PREVIEW_W = 340 // fixed preview width in px (height follows the image)
const EDGE = 16 // min gap from the top/bottom of the screen

export default function Work() {
  const [active, setActive] = useState(null) // hovered row (null = none)
  const [current, setCurrent] = useState(0) // last hovered row, keeps the box sized while fading out
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const boxRef = useRef(null)

  const handleMove = (e) => {
    const h = boxRef.current?.offsetHeight || 0
    const onRight = e.clientX + 24 + PREVIEW_W > window.innerWidth
    const x = onRight ? e.clientX - 24 - PREVIEW_W : e.clientX + 24

    // center on the cursor, but keep the box on screen (tall images start at the top)
    const maxY = window.innerHeight - h - EDGE
    const y = Math.max(EDGE, Math.min(e.clientY - h / 2, maxY))
    setPos({ x, y })
  }

  return (
    <section
      id="work"
      className="mt-10 w-full overflow-x-clip bg-[#F0E4CA] font-primary tracking-[0.02em] md:mt-16"
    >
      <div className="px-4 pt-8 sm:px-6 md:pt-12 lg:px-10">
        {/* Header row */}
        <div className="flex items-end justify-between gap-4">
          <FillHeading>My Work</FillHeading>

          <SketchButton href="#all-work" size="sm" className="mb-2 shrink-0">
            See All
          </SketchButton>
        </div>
      </div>

      {/* Project list */}
      <ul
        className="mt-8 border-t border-black md:mt-10"
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            index={i + 1}
            title={project.title}
            description={project.description}
            tags={project.tags}
            year={project.year}
            href={project.href}
            onHover={() => {
              setActive(i)
              setCurrent(i)
            }}
          />
        ))}
      </ul>

      {/* Cursor-following preview (desktop only, fixed width, full image, no cropping) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden transition-transform duration-300 ease-out md:block"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        <div
          ref={boxRef}
          className={`relative overflow-hidden rounded-md border border-black bg-[#F0E4CA] shadow-lg transition-[opacity,scale] duration-500 ease-out ${
            active !== null ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={{ width: PREVIEW_W }}
        >
          {projects.map((project, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={project.title}
              src={project.image}
              alt=""
              draggable={false}
              style={{ width: '100%', height: 'auto' }}
              className={`block transition-opacity duration-500 ease-out ${
                current === i
                  ? 'relative opacity-100'
                  : 'absolute left-0 top-0 opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
