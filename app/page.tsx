import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="w-full bg-cream">
      <Navbar />
      <main className="w-full">
        <Hero />
        <div id="services"><Services /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <div id="faq"><FAQ /></div>
      </main>
      <Footer />
    </div>
  )
}
