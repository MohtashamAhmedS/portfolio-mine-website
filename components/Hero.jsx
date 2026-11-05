import Image from 'next/image'
import SketchButton from './SketchButton'

export default function Hero() {
  return (
    <section id="home" className=" bg-[#F0E4CA] font-primary tracking-[0.02em]">
      <div className="grid w-full grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_clamp(320px,50vw,860px)] md:gap-6 md:py-0 lg:px-10">
        {/* Text */}
        <div className="flex flex-col items-start gap-4 sm:gap-5">
          <p className="-mb-5 ml-1.5 text-lg text-black sm:text-xl lg:text-4xl">
            I am Mohtashim
          </p>

          <h1 className="font-secondary text-[clamp(3.25rem,15vw,5.5rem)] font-extrabold leading-[.8] tracking-tighter text-black md:text-[clamp(3rem,7vw,8rem)]">
            Developer
            <br />
            Designer
          </h1>

          <p className="max-w-sm text-lg text-black sm:max-w-md sm:text-xl lg:max-w-xl lg:text-2xl xl:text-2xl">
            Tailoring websites with a premium digital aesthetic.
          </p>

          <SketchButton href="#contact" className="mt-2">
            Contact me
          </SketchButton>
        </div>

        {/* Illustration */}
        <div className="flex w-full justify-center md:justify-end">
          <Image
            src="/hero-illustration.png"
            alt="Illustration of a developer working at a desk"
            width={714}
            height={672}
            priority
            className="h-auto w-full max-w-[520px] md:max-w-none"
          />
        </div>
      </div>
    </section>
  )
}
