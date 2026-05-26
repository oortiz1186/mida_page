import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContpaqiPage() {
  const soluciones = [
    { name: "CONTPAQi Nóminas", desc: "Gestiona el pago de tus colaboradores y cumple con las disposiciones de ley y timbrado de manera exacta." },
    { name: "CONTPAQi Comercial (Premium / Pro)", desc: "Controla tus inventarios, ventas, facturación y cuentas por cobrar con total precisión." },
    { name: "CONTPAQi Contabilidad", desc: "Automatiza tu proceso contable y mantén al día tus obligaciones fiscales e informativas." },
    { name: "CONTPAQi Bancos & XML", desc: "Conciliación financiera ágil y control de flujos de efectivo maximizando la descarga de comprobantes." }
  ];

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Interno */}
      <section className="bg-gradient-to-br from-mida-primary to-mida-deep text-white pt-32 pb-20 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold">Sistemas CONTPAQi</h1>
        <p className="mt-4 text-lg text-mida-gray/80 max-w-2xl mx-auto">
          Especialistas certificados en licenciamiento, soporte, migración y puesta a punto de tu software empresarial.
        </p>
      </section>

      {/* Listado de Soluciones */}
      <section className="py-20 flex-grow max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-8">
          {soluciones.map((sol) => (
            <div key={sol.name} className="border border-gray-100 bg-mida-gray/30 p-8 rounded-2xl shadow-sm hover:border-mida-light/30 transition-all">
              <h3 className="text-2xl font-bold text-mida-deep mb-3">{sol.name}</h3>
              <p className="text-gray-600 leading-relaxed">{sol.desc}</p>
              <div className="mt-6">
                <a href="/contacto" className="text-mida-primary font-semibold hover:text-mida-deep text-sm inline-flex items-center gap-1">
                  Solicitar cotización o renovación &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}