import { infoEmpresa } from "../components/config/empresa"; // <-- Centralización de SEO
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Brands from "../components/Brands"; 
import Services from "../components/Services";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA"; // <-- Importación del cierre comercial
import Footer from "../components/Footer";

// Optimizamos los metadatos dinámicamente con tu configuración global
export const metadata = {
  title: `${infoEmpresa.nombreEstructura || "MIDA"} | Consultoría TI, Soporte CONTPAQi y Servidores en León Gto`,
  description: "Optimizamos la infraestructura tecnológica de tu empresa. Especialistas certificados en sistemas CONTPAQi, servidores SQL y soporte técnico empresarial en León, Guanajuato.",
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      {/* Menú de navegación fijo en la parte superior */}
      <Navbar />
      
      {/* Contenido principal ordenado estratégicamente */}
      <div className="flex-grow">
        {/* Hero Section con propuesta de valor clara */}
        <Hero />
        
        {/* Carrusel / Grid de marcas aliadas (CONTPAQi, Dell, Intel, HP) */}
        <Brands />

        {/* Módulos de servicios técnicos y comerciales */}
        <Services />

        {/* Sección de acordeones para romper objeciones frecuentes */}
        <FAQ />
        
        {/* Bloque de conversión final (Llamado a la Acción antes del cierre) */}
        <CTA />
      </div>
      
      {/* Cierre institucional de la página */}
      <Footer />
    </main>
  );
}