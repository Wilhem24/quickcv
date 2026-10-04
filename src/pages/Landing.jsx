import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import PhoneMockup from "../components/PhoneMockup"
import Footer from "../components/Footer"

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <PhoneMockup />
      </main>
      <Footer />
    </div>
  )
}