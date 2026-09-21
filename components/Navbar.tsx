"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const contpaqiLinks = [
  ["Soluciones CONTPAQi®", "/contpaqi"],
  ["Distribuidor CONTPAQi® en León", "/distribuidor-contpaqi-leon"],
  ["CONTPAQi® Contabilidad", "/contpaqi-contabilidad"],
  ["CONTPAQi® Nóminas", "/contpaqi-nominas"],
  ["CONTPAQi® Comercial Pro", "/contpaqi-comercial-pro"],
  ["Factura Electrónica", "/contpaqi-factura-electronica"],
  ["CONTPAQi® Personia", "/contpaqi-personia"],
  ["Renovaciones", "/renovacion-contpaqi"],
  ["Soporte CONTPAQi®", "/soporte-contpaqi-leon"],
  ["Cursos CONTPAQi®", "/cursos-contpaqi"],
];

const serviceLinks = [
  ["Todos los servicios", "/#servicios"],
  ["Instalación CONTPAQi®", "/instalacion-contpaqi"],
  ["Migración CONTPAQi®", "/migracion-contpaqi"],
  ["Servidores CONTPAQi®", "/servidores-contpaqi"],
  ["Optimización SQL", "/optimizacion-sql"],
  ["Pólizas de soporte TI", "/polizas-soporte-ti"],
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<"servicios" | "contpaqi" | null>(null);
  const pathname = usePathname();

  const contpaqiActive =
    pathname === "/contpaqi" ||
    pathname.startsWith("/contpaqi-") ||
    ["/distribuidor-contpaqi-leon", "/renovacion-contpaqi", "/soporte-contpaqi-leon", "/cursos-contpaqi"].includes(pathname);

  const servicesActive = [
    "/instalacion-contpaqi",
    "/migracion-contpaqi",
    "/servidores-contpaqi",
    "/optimizacion-sql",
    "/polizas-soporte-ti",
  ].includes(pathname);

  const closeMobile = () => {
    setIsOpen(false);
    setMobileSection(null);
  };

  const desktopLink = (active: boolean) =>
    active
      ? "text-mida-primary font-bold transition-colors"
      : "hover:text-mida-light transition-colors text-mida-deep";

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center w-full">
        <a href="/" className="flex items-center hover:opacity-90 transition-opacity shrink-0" aria-label="MIDA - Inicio">
          <Image src="/logo/Logotipo-mida-azul.svg" alt="MIDA Tech Consulting" width={120} height={36} priority className="h-auto" />
        </a>

        <div className="hidden md:flex gap-5 font-semibold items-center text-sm">
          <a href="/" className={desktopLink(pathname === "/")}>Inicio</a>

          <div className="relative group">
            <button type="button" className={`flex items-center gap-1 py-3 ${desktopLink(servicesActive)}`} aria-haspopup="true">
              Servicios
              <span className="text-xs transition-transform group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute left-0 top-full w-64 pt-2 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
                {serviceLinks.map(([label, href]) => (
                  <a key={href} href={href} className="block px-4 py-3 rounded-xl text-mida-deep hover:bg-gray-50 hover:text-mida-primary transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <button type="button" className={`flex items-center gap-1 py-3 ${desktopLink(contpaqiActive)}`} aria-haspopup="true">
              CONTPAQi®
              <span className="text-xs transition-transform group-hover:rotate-180">▼</span>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-[560px] pt-2 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 grid grid-cols-2 gap-1">
                {contpaqiLinks.map(([label, href]) => (
                  <a key={href} href={href} className="px-4 py-3 rounded-xl text-mida-deep hover:bg-gray-50 hover:text-mida-primary transition-colors">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/equipamiento" className={desktopLink(pathname === "/equipamiento")}>Equipamiento</a>
          <a href="/cursos" className={desktopLink(pathname === "/cursos")}>Cursos</a>
          <a href="/contacto" className="bg-mida-primary text-white px-5 py-2.5 rounded-full hover:bg-mida-deep transition-all shadow-md">Contacto</a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-mida-deep focus:outline-none p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
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

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-5 font-semibold text-mida-deep shadow-inner max-h-[calc(100vh-72px)] overflow-y-auto">
          <a href="/" onClick={closeMobile} className="block py-3 border-b border-gray-100">Inicio</a>

          <button
            onClick={() => setMobileSection(mobileSection === "servicios" ? null : "servicios")}
            className="w-full flex justify-between items-center py-3 border-b border-gray-100"
          >
            Servicios <span>{mobileSection === "servicios" ? "−" : "+"}</span>
          </button>
          {mobileSection === "servicios" && (
            <div className="pl-4 py-2 bg-gray-50 rounded-xl my-2">
              {serviceLinks.map(([label, href]) => (
                <a key={href} href={href} onClick={closeMobile} className="block py-2.5 text-sm">{label}</a>
              ))}
            </div>
          )}

          <button
            onClick={() => setMobileSection(mobileSection === "contpaqi" ? null : "contpaqi")}
            className="w-full flex justify-between items-center py-3 border-b border-gray-100"
          >
            CONTPAQi® <span>{mobileSection === "contpaqi" ? "−" : "+"}</span>
          </button>
          {mobileSection === "contpaqi" && (
            <div className="pl-4 py-2 bg-gray-50 rounded-xl my-2">
              {contpaqiLinks.map(([label, href]) => (
                <a key={href} href={href} onClick={closeMobile} className="block py-2.5 text-sm">{label}</a>
              ))}
            </div>
          )}

          <a href="/equipamiento" onClick={closeMobile} className="block py-3 border-b border-gray-100">Equipamiento</a>
          <a href="/cursos" onClick={closeMobile} className="block py-3 border-b border-gray-100">Cursos</a>
          <a href="/contacto" onClick={closeMobile} className="block bg-mida-primary text-white text-center px-5 py-3 rounded-xl hover:bg-mida-deep transition-all mt-4 shadow-md">Contacto</a>
        </div>
      )}
    </header>
  );
}
