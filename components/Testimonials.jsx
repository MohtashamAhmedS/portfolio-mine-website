import TestimonialCard from './TestimonialCard'
import FillHeading from './FillHeading'

const testimonials = [
  {
    name: 'Zach',
    text: 'Mohtasham has hustle and talent. Great experience!',
    source: 'Upwork',
    year: '2025',
  },
  {
    name: 'Client',
    text: 'Mohtasham Ahmed was super responsive and gave me exactly what I needed - 10/10.',
    source: 'Upwork',
    year: '2025',
  },
  {
    name: 'Client',
    text: 'Mohtasham is an excellent and very talented freelancer. Our project required a wide range of skills including graphic/UX design, HTML, CSS and JavaScript and he has all of these skills…',
    source: 'Upwork',
    year: '2024',
  },
  {
    name: 'Client',
    text: 'Mohtasham Ahmed delivered an outstanding UI/UX design for our project. His creativity, attention to detail, and ability to balance aesthetics with usability exceeded our expectations. Communication was seamless, and the…',
    source: 'Upwork',
    year: '2024',
  },
  {
    name: 'Client',
    text: 'Mohtasham A. is an exceptional web designer who brings creativity and precision to every project. His professionalism and dedication shine through his work, delivering outstanding results. Collaborating with Mohtasham was…',
    source: 'Upwork',
    year: '2024',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mt-10 w-full overflow-x-clip bg-[#F0E4CA] font-primary tracking-[0.02em] md:mt-16"
    >
      <div className="px-4 pt-8 sm:px-6 md:pt-12 lg:px-10">
        <FillHeading>Testimonials</FillHeading>
      </div>

      {/* Infinite loop carousel */}
      <div className="mt-1 w-full overflow-x-clip pb-6 pt-3 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] md:mt-2">
        <div
          className="marquee-track flex w-max"
          style={{ '--marquee-duration': '45s' }}
        >
          {/* Set 1 */}
          <div className="flex shrink-0 items-stretch gap-5 pr-5 sm:gap-6 sm:pr-6">
            {testimonials.map((item, i) => (
              <TestimonialCard key={`a-${i}`} {...item} />
            ))}
          </div>

          {/* Set 2 (duplicate for a seamless loop) */}
          <div
            className="flex shrink-0 items-stretch gap-5 pr-5 sm:gap-6 sm:pr-6"
            aria-hidden="true"
          >
            {testimonials.map((item, i) => (
              <TestimonialCard key={`b-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
