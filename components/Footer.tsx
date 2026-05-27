import Image from 'next/image';
import { infoEmpresa } from '../components/config/empresa'; // 1. IMPORTAMOS LAS VARIABLES

export default function Footer() {
  return (
    <footer className="bg-mida-deep text-white border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
        
        {/* COLUMNA 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image src="/logo/Logotipo-mida-blanco.svg" alt="MIDA Logo" width={120} height={35} />
          </div>
          <p className="text-sm text-mida-gray/70 leading-relaxed max-w-xs">
            Consultoría especializada en sistemas CONTPAQi, soporte a infraestructura TI y equipamiento tecnológico de alto nivel para empresas.
          </p>
        </div>

        {/* COLUMNA 2 */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-mida-light">Navegación</h4>
          <ul className="space-y-2.5 text-sm text-mida-gray/80">
            <li><a href="/" className="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="/servicios" className="hover:text-white transition-colors">Servicios</a></li>
            <li><a href="/contpaqi" className="hover:text-white transition-colors">CONTPAQi</a></li>
            <li><a href="/equipamiento" className="hover:text-white transition-colors">Equipamiento</a></li>
            <li><a href="/tickets" className="text-gray-400 hover:text-white transition-colors">Portal de Soporte</a></li>
            <li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>

        {/* COLUMNA 3: USANDO LAS VARIABLES CENTRALIZADAS */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-mida-light">Contacto Institucional</h4>
          <ul className="space-y-4 text-sm text-mida-gray/80">
            
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-mida-light shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p className="font-semibold text-white">Ubicación Corporativa</p>
                <p className="text-xs text-mida-gray/70 mt-0.5">
                  {infoEmpresa.direccionLinea1}<br />
                  {infoEmpresa.direccionLinea2}
                </p>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-mida-light shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p className="font-semibold text-white">Teléfono de Oficina</p>
                <a href={`tel:${infoEmpresa.telefonoEnlace}`} className="text-xs hover:text-white transition-colors underline decoration-mida-light/40">
                  {infoEmpresa.telefonoTexto}
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 1.981 14.062.96 11.435.96c-5.44 0-9.866 4.372-9.87 9.802 0 1.689.454 3.342 1.316 4.806l-.991 3.616 3.757-.97z" />
              </svg>
              <div>
                <p className="font-semibold text-white">Soporte por WhatsApp</p>
                <a 
                  href={`https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs text-[#25D366] hover:underline transition-all"
                >
                  {infoEmpresa.whatsappTexto}
                </a>
              </div>
            </li>

          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-xs text-mida-gray/40">
        <p>© {new Date().getFullYear()} {infoEmpresa.nombre}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}