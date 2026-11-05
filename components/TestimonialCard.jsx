const tilts = [-4, 3, -2, 4, -3]

function Star({ tilt = 0 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 sm:h-6 sm:w-6"
      style={{ transform: `rotate(${tilt}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M12 4.5 L14.47 9.6 L20.08 10.37 L15.99 14.3 L17 19.88 L12 17.2 L7 19.88 L8.01 14.3 L3.92 10.37 L9.53 9.6 Z"
        fill="black"
        stroke="black"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function TestimonialCard({ name, text, source, year }) {
  return (
    <article className="group relative isolate flex w-[85vw] shrink-0 flex-col justify-between gap-6 p-5 text-black transition-transform duration-500 ease-out hover:-translate-y-1.5 hover:-rotate-[0.6deg] sm:w-[440px] sm:p-6 md:w-[500px] lg:w-[580px] lg:p-8">
      {/* Hand-drawn sketch border */}
      <svg
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
        viewBox="-2 -2 304 134"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Fill that darkens on hover */}
        <path
          fill="currentColor"
          className="opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-[0.08]"
          d="M12 2 C80 0 220 1 288 2 C296 3 299 8 298 16 C299 50 298 90 298 114 C297 122 292 127 284 128 C210 130 90 129 16 128 C7 127 2 122 2 114 C1 80 2 40 2 16 C3 8 6 3 12 2 Z"
        />
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            vectorEffect="non-scaling-stroke"
            d="M12 2 C80 0 220 1 288 2 C296 3 299 8 298 16 C299 50 298 90 298 114 C297 122 292 127 284 128 C210 130 90 129 16 128 C7 127 2 122 2 114 C1 80 2 40 2 16 C3 8 6 3 12 2"
          />
          <path
            vectorEffect="non-scaling-stroke"
            opacity=".7"
            d="M8 1 C90 3 210 -1 292 4 C299 8 300 14 299 22 C298 60 301 95 299 112 C296 124 290 130 280 129 C200 127 100 131 18 129 C6 128 0 120 1 108 C2 70 -1 35 1 20 C2 8 8 3 14 1"
          />
        </g>
      </svg>

      {/* Top: stars + quote */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-0.5" aria-label="5 out of 5 stars">
          {tilts.map((tilt, i) => (
            <Star key={i} tilt={tilt} />
          ))}
        </div>
        <p className="font-secondary text-base font-semibold leading-snug tracking-tight sm:text-lg lg:text-xl">
          {text}
        </p>
      </div>

      {/* Bottom: author + source */}
      <div className="flex items-center justify-between gap-3 font-primary tracking-[0.02em]">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs text-[#F0E4CA]">
            {name.charAt(0)}
          </span>
          <span className="text-base sm:text-lg">{name}</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] sm:text-xs">
          <span className="rounded-full border border-black/60 px-2 py-0.5 leading-none">
            {source}
          </span>
          <span>{year}</span>
        </div>
      </div>
    </article>
  )
}
