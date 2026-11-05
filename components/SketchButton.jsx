import Link from 'next/link'

const sizes = {
  md: 'h-11 px-6 text-lg sm:h-12 sm:px-7 sm:text-xl lg:h-14 lg:px-8 lg:text-2xl',
  sm: 'h-8 px-4 text-sm sm:h-9 sm:px-5 sm:text-base',
}

const arrowSizes = {
  md: 'h-4 w-4',
  sm: 'h-3 w-3',
}

export default function SketchButton({
  href,
  children,
  className = '',
  size = 'md',
  type = 'button',
  ...props
}) {
  const classes = `group relative isolate inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-primary tracking-[0.02em] text-black transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black disabled:pointer-events-none disabled:opacity-50 ${sizes[size]} ${className}`

  const inner = (
    <>
      {/* Sketch fill (wipes in on hover) */}
      <svg
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full overflow-visible text-black transition-[clip-path] duration-500 ease-out [clip-path:inset(-20%_105%_-20%_-5%)] group-hover:[clip-path:inset(-20%_-5%_-20%_-5%)] group-focus-visible:[clip-path:inset(-20%_-5%_-20%_-5%)]"
        viewBox="-5 -5 206 46"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M36 -1 C100 -3 168 0 180 4 C200 10 194 35 168 37 C115 39 48 35 15 32 C-5 29 -9 6 14 2 C23 0 33 0 41 1"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M26 1 C69 -2 148 -2 175 2 C198 6 197 30 175 35 C138 38 54 36 17 33 C-7 30 -5 4 19 1 C29 -1 42 0 49 0"
          />
        </g>
      </svg>

      {/* Hand-drawn border */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible text-black"
        viewBox="-5 -5 206 46"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth=".65"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".85"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M26 1 C69 -2 148 -2 175 2 C198 6 197 30 175 35 C138 38 54 36 17 33 C-7 30 -5 4 19 1 C29 -1 42 0 49 0"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M36 -1 C100 -3 168 0 180 4 C200 10 194 35 168 37 C115 39 48 35 15 32 C-5 29 -9 6 14 2 C23 0 33 0 41 1"
          />
          <path
            vectorEffect="non-scaling-stroke"
            d="M149 0 C183 -1 195 5 195 16.66 C196 33 182 36 159 35 C106 33 45 39 14 31 C-7 26 -3 4 18 0 C46 -4 113 1 157 2"
          />
        </g>
      </svg>

      <span>{children}</span>

      <svg
        className={`shrink-0 ${arrowSizes[size]}`}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 13 13 3M3 3h10v10" />
      </svg>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {inner}
    </button>
  )
}
