"use client";

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) => {
    return pathname === path 
      ? "text-mida-primary font-bold transition-colors" 
      : "hover:text-mida-light transition-colors text-mida-deep";
  };

  const mobileLinkClass = (path: string) => {
    return pathname === path
      ? "py-3 text-mida-primary font-bold border-b border-gray-100 transition-colors"
      : "py-3 hover:text-mida-light border-b border-gray-50 transition-colors";
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        
        {/* Logotipo Oficial */}
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0">
          <Image 
            src="/logo/Logotipo-mida-azul.svg" 
            alt="MIDA Logo" 
            width={120} 
            height={36} 
            priority
            className="h-auto"
          />
        </a>
        
        {/* MENÚ PARA COMPUTADORA */}
        <div className="hidden md:flex gap-8 font-semibold items-center">
          <a href="/" className={linkClass("/")}>Inicio</a>
          {/* CAMBIO: Apunta al ancla interna de la Home */}
          <a href="/#servicios" className="hover:text-mida-light transition-colors text-mida-deep">Servicios</a>
          <a href="/contpaqi" className={linkClass("/contpaqi")}>CONTPAQi</a>
          <a href="/equipamiento" className={linkClass("/equipamiento")}>Equipamiento</a>
          <a href="/contacto" className="bg-mida-primary text-white px-5 py-2.5 rounded-full hover:bg-mida-deep transition-all shadow-md hover:shadow-lg">
            Contacto
          </a>
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-mida-deep focus:outline-none p-1.5 rounded-lg hover:bg-mida-gray/40 transition-colors"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 flex flex-col gap-2 font-semibold text-mida-deep shadow-inner">
          <a href="/" onClick={() => setIsOpen(false)} className={mobileLinkClass("/")}>Inicio</a>
          {/* CAMBIO: Al dar clic, se cierra la cortina móvil de inmediato */}
          <a href="/#servicios" onClick={() => setIsOpen(false)} className="py-3 hover:text-mida-light border-b border-gray-50 transition-colors">Servicios</a>
          <a href="/contpaqi" onClick={() => setIsOpen(false)} className={mobileLinkClass("/contpaqi")}>CONTPAQi</a>
          <a href="/equipamiento" onClick={() => setIsOpen(false)} className={mobileLinkClass("/equipamiento")}>Equipamiento</a>
          <a href="/contacto" onClick={() => setIsOpen(false)} className="bg-mida-primary text-white text-center px-5 py-3 rounded-xl hover:bg-mida-deep transition-all mt-4 shadow-md">
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}