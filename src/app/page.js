import Navbar from '../../components/Navbar'
import Hero from '../../components/Hero'
import Work from '../../components/Work'
import About from '../../components/About'
import Testimonials from '../../components/Testimonials'
import Contact from '../../components/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 w-full flex-col bg-[#F0E4CA]">
        <Hero />
        <Work />
        <About />
        <Testimonials />
        <Contact />
      </main>
    </>
  )
}
