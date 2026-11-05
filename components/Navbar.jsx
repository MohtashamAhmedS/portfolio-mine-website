'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative top-0 z-50 w-full bg-[#F0E4CA] font-primary tracking-[0.02em]">
      <div className="grid h-16 w-full grid-cols-2 items-center px-4 sm:px-6 md:h-20 md:grid-cols-3 lg:px-10">
        {/* Logo */}
        <Link href="#home" className="justify-self-start" aria-label="Home">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={32}
            height={32}
            priority
            className="h-6 w-auto sm:h-7 md:h-9"
          />
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center justify-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-primary text-base tracking-wider text-black transition-opacity hover:opacity-60 lg:text-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Spacer keeps desktop links centered */}
        <div className="hidden md:block" />

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative h-11 w-11 justify-self-end md:hidden"
        >
          {/* Hamburger icon */}
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              open
                ? 'rotate-90 scale-50 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            }`}
          >
            <Image
              src="/hamburger-icon.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7"
            />
          </span>

          {/* Close icon */}
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              open
                ? 'rotate-0 scale-100 opacity-100'
                : '-rotate-90 scale-50 opacity-0'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-7 w-7"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </span>
        </button>
      </div>

      {/* Mobile menu (absolute overlay, animated) */}
      <nav
        aria-hidden={!open}
        className={`absolute left-0 top-full flex w-full flex-col items-center gap-5 border-t border-black/10 bg-[#F0E4CA] px-4 pb-6 pt-5 font-primary tracking-[0.02em] shadow-md transition-[opacity,transform,visibility] duration-300 ease-out md:hidden ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'pointer-events-none invisible -translate-y-3 opacity-0'
        }`}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${i * 50 + 100}ms` : '0ms' }}
            className={`font-primary text-xl tracking-[0.02em] text-black transition-[opacity,transform] duration-300 hover:opacity-60 ${
              open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
