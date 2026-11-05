'use client'

import { useState } from 'react'
import Image from 'next/image'
import SketchButton from './SketchButton'
import ProjectCard from './ProjectCard'
import FillHeading from './FillHeading'

const projects = [
  {
    title: 'Portfolio',
    description: 'Property management software',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: '#',
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
    href: '#',
    image: '/projects/legallens.png',
  },
  {
    title: 'Sufiyana Thread',
    description: 'Ecommerce website',
    tags: ['Next.js', 'Supabase', 'UI/UX'],
    year: '2025',
    href: '#',
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
]

const PREVIEW_W = 300
const PREVIEW_H = 220

export default function Work() {
  const [active, setActive] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const onRight = e.clientX + 24 + PREVIEW_W > window.innerWidth
    const x = onRight ? e.clientX - 24 - PREVIEW_W : e.clientX + 24
    const y = e.clientY - PREVIEW_H / 2
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
            onHover={() => setActive(i)}
          />
        ))}
      </ul>

      {/* Cursor-following preview (desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden transition-transform duration-300 ease-out md:block"
        style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      >
        <div
          className={`relative overflow-hidden rounded-md border border-black bg-[#F0E4CA] shadow-lg transition-all duration-500 ease-out ${
            active !== null ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          }`}
          style={{ width: PREVIEW_W, height: PREVIEW_H }}
        >
          {projects.map((project, i) => (
            <Image
              key={project.title}
              src={project.image}
              alt=""
              fill
              sizes="300px"
              className={`object-cover transition-opacity duration-500 ease-out ${
                active === i ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
