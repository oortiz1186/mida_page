"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logotipo Oficial */}
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity">
          <Image 
            src="/logo/Logotipo-mida-azul.svg" 
            alt="MIDA Logo" 
            width={130} 
            height={40} 
            priority
          />
        </a>
        
        {/* MENÚ PARA COMPUTADORA (Invisible en móviles) */}
        <div className="hidden md:flex gap-8 font-semibold text-mida-deep items-center">
          <a href="/" className="hover:text-mida-light transition-colors">Inicio</a>
          <a href="/servicios" className="hover:text-mida-light transition-colors">Servicios</a>
          <a href="/contpaqi" className="hover:text-mida-light transition-colors">CONTPAQi</a>
          <a href="/equipamiento" className="hover:text-mida-light transition-colors">Equipamiento</a>
          <a href="/contacto" className="bg-mida-primary text-white px-5 py-2.5 rounded-full hover:bg-mida-deep transition-all shadow-md hover:shadow-lg">
            Contacto
          </a>
        </div>

        {/* BOTÓN HAMBURGUESA (Solo visible en móviles) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-mida-deep focus:outline-none p-2"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              // Icono de X (Cerrar)
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Icono de Hamburguesa (Abrir)
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* MENÚ DESPLEGABLE MÓVIL (Solo se muestra si isOpen es true) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 font-semibold text-mida-deep shadow-inner animate-fadeIn">
          <a href="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-mida-light border-b border-gray-50">Inicio</a>
          <a href="/servicios" onClick={() => setIsOpen(false)} className="py-2 hover:text-mida-light border-b border-gray-50">Servicios</a>
          <a href="/contpaqi" onClick={() => setIsOpen(false)} className="py-2 hover:text-mida-light border-b border-gray-50">CONTPAQi</a>
          <a href="/equipamiento" onClick={() => setIsOpen(false)} className="py-2 hover:text-mida-light border-b border-gray-50">Equipamiento</a>
          <a href="/contacto" onClick={() => setIsOpen(false)} className="bg-mida-primary text-white text-center px-5 py-3 rounded-xl hover:bg-mida-deep transition-all mt-2 shadow-md">
            Contacto
          </a>
        </div>
      )}
    </header>
  );
}