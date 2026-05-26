import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CTA from "../../components/CTA";

export default function NosotrosPage() {
  const valores = [
    { titulo: "Precisión", desc: "En tecnología, cada bit cuenta. Implementamos soluciones exactas para problemas específicos." },
    { titulo: "Confianza", desc: "No somos solo proveedores; nos convertimos en el brazo tecnológico de tu organización." },
    { titulo: "Coherencia", desc: "Alineamos las herramientas tecnológicas con los objetivos reales de crecimiento de tu negocio." }
  ];

  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Institucional */}
      <section className="bg-gradient-to-br from-mida-primary to-mida-deep text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Mucho más que una <span className="text-mida-light">consultora</span> tecnológica.
            </h1>
            <p className="mt-6 text-lg text-mida-gray/80">
              MIDA nace de la necesidad de las empresas de contar con un soporte técnico que entienda no solo de cables y códigos, sino de rentabilidad y procesos humanos.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* Un placeholder visual que representa tecnología/unión */}
            <div className="w-full h-64 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center backdrop-blur-sm shadow-2xl">
                <p className="text-mida-light font-black text-6xl opacity-20 select-none">MIDA TECH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofía y Misión */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-mida-deep text-3xl font-bold mb-6">Nuestra Misión</h2>
          <p className="text-gray-600 leading-relaxed text-lg italic border-l-4 border-mida-primary pl-6">
            "Potenciar el crecimiento de las empresas mediante la integración estratégica de soluciones CONTPAQi, equipamiento de alto rendimiento y consultoría especializada, garantizando siempre la continuidad operativa de nuestros socios."
          </p>
        </div>
        <div className="bg-mida-gray p-10 rounded-3xl">
          <h2 className="text-mida-deep text-3xl font-bold mb-6">¿Por qué MIDA?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Entendemos que el software (como CONTPAQi) y el hardware (servidores y redes) son el sistema circulatorio de las empresas actuales. Si uno falla, el negocio se detiene.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nuestra ventaja competitiva radica en la **preparación técnica certificada** y en el trato humano. No solo instalamos, acompañamos.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-white py-24 border-t border-gray-100 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-mida-deep text-center text-3xl font-bold mb-16 underline decoration-mida-primary decoration-4 underline-offset-8">
            Nuestros Pilares
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {valores.map((val) => (
              <div key={val.titulo} className="p-8 rounded-2xl border border-gray-100 hover:border-mida-light/50 transition-all text-center">
                <div className="w-16 h-16 bg-mida-primary text-white flex items-center justify-center rounded-full mx-auto mb-6 font-bold text-xl">
                  {val.titulo.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-mida-deep mb-3">{val.titulo}</h3>
                <p className="text-gray-600 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Llamada a la acción reutilizable */}
      <CTA />

      <Footer />
    </main>
  );
}