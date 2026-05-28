"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { infoEmpresa } from "../../components/config/empresa";

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

  const serviciosContpaqi = [
    {
      titulo: "Instalación y Configuración Certificada",
      descripcion: "Implementamos sistemas bajo arquitecturas seguras en red o terminales remotas.",
      imagen: "/images/contpaqi-instalacion.webp",
      icono: <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>
    },
    {
      titulo: "Soporte Técnico Especializado",
      descripcion: "Solucionamos errores de timbrado, fallas SQL y problemas de licenciamiento.",
      imagen: "/images/contpaqi-soporte.webp",
      icono: <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
    },
    {
      titulo: "Renovación y Venta de Licencias",
      descripcion: "Asesoría para adquirir o renovar licencias asegurando actualizaciones fiscales.",
      imagen: "/images/contpaqi-licencias.webp",
      icono: <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    },
    {
      titulo: "Optimización de Bases de Datos SQL",
      descripcion: "Mantenimiento estructural para acelerar reportes y evitar corrupción de datos.",
      imagen: "/images/contpaqi-sql.webp",
      icono: <svg className="w-6 h-6 text-mida-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s8-1.79 8-4"/></svg>
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
            <h2 className="text-2xl font-bold text-mida-primary mb-10 border-b-2 border-mida-primary/10 pb-2">{cat.titulo}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {cat.productos.map((prod) => (
                <div key={prod.nombre} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 mb-8 flex items-center justify-center relative">
                    <Image src={prod.img} alt={prod.nombre} width={96} height={96} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-bold text-mida-deep text-lg mb-3 leading-tight">{prod.nombre}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{prod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Sección de Servicios Profesional */}
      <section className="py-24 bg-gray-100 rounded-[3rem] mx-6 mb-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-mida-deep text-center mb-16">Nuestros Servicios Profesionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviciosContpaqi.map((servicio) => (
              <div key={servicio.titulo} className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-mida-primary transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col">
                <div className="h-40 w-full relative">
                  <Image src={servicio.imagen} alt={servicio.titulo} fill className="object-cover" />
                </div>
                <div className="p-8">
                  <div className="w-12 h-12 bg-mida-primary/10 rounded-2xl mb-6 flex items-center justify-center -mt-16 relative z-10 border-4 border-white shadow-sm">
                    {servicio.icono}
                  </div>
                  <h3 className="text-lg font-bold text-mida-deep mb-3">{servicio.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a href="/contacto" className="bg-mida-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-mida-deep transition-all shadow-lg uppercase tracking-wider text-sm">
              Solicitar Consultoría Técnica
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}