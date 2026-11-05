export default function SketchField({
  as = 'input',
  label,
  className = '',
  ...props
}) {
  const Tag = as

  return (
    <label className={`group relative isolate block ${className}`}>
      <span className="sr-only">{label}</span>

      {/* Hand-drawn sketch border (same style as the testimonial cards) */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="-2 -2 404 48"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Fill that darkens on hover and focus */}
        <path
          fill="currentColor"
          className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-[0.04] group-focus-within:opacity-[0.08]"
          d="M10 2 C100 0 300 1 390 2 C396 3 399 7 398 14 C399 22 398 30 398 36 C397 41 393 43 386 43 C300 44 100 43 14 43 C6 42 2 39 2 33 C1 25 2 15 2 10 C3 5 6 3 10 2 Z"
        />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-black transition-all duration-300 group-focus-within:[stroke-width:1.8]"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M10 2 C100 0 300 1 390 2 C396 3 399 7 398 14 C399 22 398 30 398 36 C397 41 393 43 386 43 C300 44 100 43 14 43 C6 42 2 39 2 33 C1 25 2 15 2 10 C3 5 6 3 10 2"
          />
          <path
            vectorEffect="non-scaling-stroke"
            opacity=".7"
            d="M6 1 C110 3 290 -1 394 3 C399 6 400 11 399 18 C398 26 400 34 398 38 C395 43 390 45 382 44 C290 42 110 45 16 44 C5 43 0 38 1 30 C2 22 -1 14 1 9 C2 4 7 2 12 1"
          />
        </g>
      </svg>

      <Tag
        className="relative block h-11 w-full resize-none bg-transparent px-4 py-2.5 font-primary text-base tracking-[0.02em] text-black outline-none placeholder:text-black/70 sm:h-12 sm:text-lg"
        {...props}
      />
    </label>
  )
}
