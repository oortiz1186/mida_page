"use client";

import { infoEmpresa } from '../components/config/empresa'; // IMPORTAMOS LAS VARIABLES

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${encodeURIComponent(infoEmpresa.whatsappMensajePredeterminado)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center justify-center group"
      aria-label="Contacto por WhatsApp"
    >
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 1.981 14.062.96 11.435.96c-5.44 0-9.866 4.372-9.87 9.802 0 1.689.454 3.342 1.316 4.806l-.991 3.616 3.757-.97z" />
      </svg>
      <span className="absolute right-16 bg-mida-deep text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
        ¿Soporte urgente? Escríbenos
      </span>
    </a>
  );
}