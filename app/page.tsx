import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Brands from "../components/Brands"; // 
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export const metadata = {
  title: "MIDA | Consultoría TI, Soporte CONTPAQi y Servidores en León Gto",
  description: "Optimizamos la infraestructura tecnológica de tu empresa. Especialistas certificados en sistemas CONTPAQi, servidores SQL y soporte técnico empresarial en León, Guanajuato.",
};

export default function Home() {
  return (
    <main className="bg-white">
      {/* Menú de navegación fijo en la parte superior */}
      <Navbar />
      
      {/* Hero Section con el nuevo fondo oscuro unificado */}
      <Hero />
      
      {/* 2. Reemplazamos la sección de texto plano anterior por el componente dinámico */}
      <Brands />

      {/* Sección de servicios principales */}
      <Services />

      {/* Sección de acordeones de preguntas frecuentes */}
      <FAQ />
      
      {/* Cierre institucional de la página */}
      <Footer />
    </main>
  );
}