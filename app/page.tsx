import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import FAQ from "../components/FAQ" // Importado correctamente
import Footer from "../components/Footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <FAQ />
      
      <Footer />
    </main>
  )
}