import Image from "next/image";
import { infoEmpresa } from "../components/config/empresa";

export default function Footer() {
  return (
    <footer className="bg-mida-deep text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image src="/logo/Logotipo-mida-blanco.svg" alt="MIDA Tech Consulting, distribuidor CONTPAQi en León" width={120} height={35} />
          </div>
          <p className="text-sm text-white/80 leading-relaxed max-w-xs">Consultoría especializada en sistemas CONTPAQi, soporte a infraestructura TI y equipamiento tecnológico para empresas.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Navegación</h2>
          <ul className="space-y-2.5 text-sm text-white/80">
            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="/servicios" className="hover:text-white transition-colors">Servicios</a></li>
            <li><a href="/contpaqi" className="hover:text-white transition-colors">CONTPAQi</a></li>
            <li><a href="/soporte-contpaqi-leon" className="hover:text-white transition-colors">Soporte CONTPAQi</a></li>
            <li><a href="/equipamiento" className="hover:text-white transition-colors">Equipamiento</a></li>
            <li><a href="/cursos" className="hover:text-white transition-colors">Cursos</a></li>
            <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contacto Institucional</h2>
          <ul className="space-y-4 text-sm text-white/80">
            <li><p className="font-semibold text-white">Ubicación Corporativa</p><p className="text-xs text-white/75 mt-0.5">{infoEmpresa.direccionLinea1}<br />{infoEmpresa.direccionLinea2}</p></li>
            <li><p className="font-semibold text-white">Teléfono de Oficina</p><a href={`tel:${infoEmpresa.telefonoEnlace}`} className="text-xs hover:text-white underline decoration-white/60">{infoEmpresa.telefonoTexto}</a></li>
            <li><p className="font-semibold text-white">Soporte por WhatsApp</p><a href={`https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#25D366] hover:underline">{infoEmpresa.whatsappTexto}</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/70">
        <p>© {new Date().getFullYear()} {infoEmpresa.nombre}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
