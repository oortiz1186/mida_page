"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContpaqiPage() {
  const categorias = [
    {
      titulo: "Contables",
      productos: [
        { nombre: "CONTPAQi Bancos", desc: "Controla tus flujos de efectivo y conciliaciones bancarias al instante.", img: "/images/productos/bancos.png" },
        { nombre: "CONTPAQi Contabilidad", desc: "El estándar para tu contabilidad electrónica y reportes financieros.", img: "/images/productos/contabilidad.png" },
        { nombre: "CONTPAQi Nóminas", desc: "Calcula sueldos, impuestos y prestaciones con total precisión.", img: "/images/productos/nominas.png" },
        { nombre: "CONTPAQi XML en línea+", desc: "Administra y descarga masiva de tus CFDI de forma segura.", img: "/images/productos/xml.png" }
      ]
    },
    {
      titulo: "Comerciales",
      productos: [
        { nombre: "CONTPAQi Comercial Pro", desc: "Gestión avanzada de inventarios, compras y ventas.", img: "/images/productos/comercial_pro.png" },
        { nombre: "CONTPAQi Comercial Premium", desc: "La solución robusta para empresas en crecimiento.", img: "/images/productos/comercial_premium.avif" },
        { nombre: "CONTPAQi Comercial Start", desc: "Administración comercial ágil y sencilla.", img: "/images/productos/comercial_start.png" }
      ]
    },
    {
      titulo: "Nube",
      productos: [
        { nombre: "CONTPAQi CFDI en Linea", desc: "Tu facturación siempre disponible. Gestiona, envía y recibe tus comprobantes fiscales desde cualquier dispositivo.", img: "/images/productos/cfdi_linea.png" },
        { nombre: "CONTPAQi Evalúa", desc: "Soluciones de evaluación y desempeño en la nube.", img: "/images/productos/evalua.png" },
        { nombre: "CONTPAQi Contabiliza", desc: "Tu contabilidad disponible desde cualquier lugar.", img: "/images/productos/contabiliza.png" },
        { nombre: "CONTPAQi Personia", desc: "Gestión de capital humano digitalizado.", img: "/images/productos/personia.png" },
        { nombre: "CONTPAQi Vende", desc: "Plataforma de ventas en línea para tu negocio.", img: "/images/productos/vende.png" },
        { nombre: "CONTPAQi Optimiza", desc: "Herramientas de eficiencia operativa.", img: "/images/productos/optimiza.png" },
        { nombre: "CONTPAQi Anticipa", desc: "Gestiona pagos y anticipos con facilidad.", img: "/images/productos/anticipa.png" },
        { nombre: "Escritorio Virtual", desc: "Accede a tu software desde cualquier dispositivo.", img: "/images/productos/escritorio.png" },
        { nombre: "CONTPAQi Respaldos", desc: "Seguridad total para tu información empresarial.", img: "/images/productos/respaldos1.png" }
      ]
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />

      <section className="py-24 max-w-7xl mx-auto px-6 space-y-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-black text-mida-deep">Soluciones CONTPAQi</h1>
        </div>

        {categorias.map((cat) => (
          <div key={cat.titulo}>
            <h2 className="text-2xl font-bold text-mida-primary mb-10 border-b-2 border-mida-primary/10 pb-2">
              {cat.titulo}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.productos.map((prod) => (
                <div key={prod.nombre} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group">
                  
                  {/* Contenedor Fijo: w-24 h-24 asegura que todos los logos ocupen el mismo espacio */}
                  <div className="w-24 h-24 mb-8 flex items-center justify-center relative">
                    <Image 
                      src={prod.img} 
                      alt={prod.nombre} 
                      width={96} 
                      height={96}
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  
                  <h4 className="font-bold text-mida-deep text-lg mb-3 leading-tight">{prod.nombre}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">
                    {prod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </main>
  );
}