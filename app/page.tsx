import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import HowItWorks from '@/components/HowItWorks'
import ServiceAreas from '@/components/ServiceAreas'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import MobileCtaBar from '@/components/MobileCtaBar'

export default function Home() {
  return (
    <div className="w-full bg-cream">
      <Navbar />
      <main className="w-full">
        <Hero />
        <Stats />
        <div id="services"><Services /></div>
        <div id="how-it-works"><HowItWorks /></div>
        <ServiceAreas />
        <div id="faq"><FAQ /></div>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  )
}
