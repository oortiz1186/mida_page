"use client";

import Image from "next/image";

export default function Brands() {
  // Arreglo de objetos para renderizar las marcas de forma limpia y dinámica
  const marcas = [
    {
      id: 1,
      nombre: "CONTPAQi",
      src: "/logo/logo-contpaqi.svg", // Reemplaza por tus rutas reales en public/
      alt: "Distribuidor Comercial Certificado CONTPAQi",
    },
    {
      id: 2,
      nombre: "Dell",
      src: "/logo/logo-dell.svg",
      alt: "Infraestructura y Servidores Dell",
    },
    {
      id: 3,
      nombre: "Intel",
      src: "/logo/logo-intel.svg",
      alt: "Procesadores y Tecnología Intel",
    },
    {
      id: 4,
      nombre: "HP",
      src: "/logo/logo-hp.svg",
      alt: "Equipamiento de Cómputo Corporativo HP",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
        
        {/* Título sutil institucional */}
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
          Respaldados por las mejores marcas de la industria
        </p>

        {/* Contenedor Grid Responsivo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center w-full">
          {marcas.map((marca) => (
            <div
              key={marca.id}
              className="w-full max-w-[140px] flex items-center justify-center filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <Image
                src={marca.src}
                alt={marca.alt}
                width={140}
                height={50}
                className="h-auto w-auto max-h-[45px] object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}