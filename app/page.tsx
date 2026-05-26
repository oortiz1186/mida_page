import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Services from "../components/Services"
import FAQ from "../components/FAQ"
import Footer from "../components/Footer"

export default function Home() {
  const marcas = ["CONTPAQi", "Dell Technologies", "Windows Server", "Intel", "Microsoft 365"];

  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Services />
      
      {/* SECCIÓN DE ALIANZAS Y MARCAS */}
      <section className="py-16 bg-mida-gray border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
            Infraestructura homologada y respaldada por líderes globales
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 select-none">
            {marcas.map((marca) => (
              <span 
                key={marca} 
                className="text-xl md:text-2xl font-black tracking-tight text-mida-deep grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                {marca}
              </span>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </main>
  )
}