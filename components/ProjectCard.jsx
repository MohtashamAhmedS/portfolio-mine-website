import Link from 'next/link'

export default function ProjectCard({
  index,
  title,
  description,
  tags = [],
  year,
  href = '#',
  onHover,
}) {
  return (
    <li className="border-b border-black" onMouseEnter={onHover}>
      <Link
        href={href}
        className="group block bg-transparent transition-colors duration-500 ease-out hover:bg-black/[0.07] focus-visible:bg-black/[0.07]"
      >
        <div className="flex flex-col gap-3 px-4 py-5 transition-transform duration-500 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10 lg:py-6">
          {/* Left: number, title, description */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="font-primary text-2xl leading-tight text-black transition-all duration-500 ease-out [-webkit-text-stroke:0px_black] group-hover:[-webkit-text-stroke:1px_black] group-focus-visible:[-webkit-text-stroke:1px_black] sm:text-3xl lg:text-5xl">
              {index}. {title}:
            </h3>
            <p className="text-sm text-black sm:text-base lg:text-xl">
              {description}
            </p>
          </div>

          {/* Right: tags, year, arrow */}
          <div className="flex shrink-0 items-center gap-2 text-black">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/60 px-2 py-0.5 text-[10px] leading-none sm:text-xs"
              >
                {tag}
              </span>
            ))}
            <span className="ml-1 text-[10px] sm:text-xs">{year}</span>
            <svg
              className="h-3 w-3 shrink-0 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:h-4 sm:w-4"
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
          </div>
        </div>
      </Link>
    </li>
  )
}
