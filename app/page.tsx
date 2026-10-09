import { infoEmpresa } from "../components/config/empresa";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Authority from "../components/Authority";
import Services from "../components/Services";
import SolutionLinks from "../components/SolutionLinks";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import HomePromotions from "../components/HomePromotions";
import SolutionFinder from "../components/SolutionFinder";

export const metadata = {
  title: "Distribuidor CONTPAQi en León | MIDA",
  description: "Implementamos, optimizamos y damos soporte a sistemas CONTPAQi, servidores, SQL y redes empresariales en León y el Bajío.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <Authority />
        <HomePromotions />
        <SolutionFinder />
        <Services />
        <SolutionLinks />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
