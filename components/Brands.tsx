"use client";

export default function Brands() {
  const marcas = [
    {
      id: 1,
      nombre: "CONTPAQi®",
      src: "/images/Logo_Institucional_CONTPAQi/Logo_Institucional_CONTPAQi/Logotipo.png", 
      alt: "CONTPAQi® - software empresarial | Distribuidor MIDA en León",
    },
    {
      id: 2,
      nombre: "Dell",
      src: "/logo/logo-dell.svg",
      alt: "Infraestructura y servidores Dell para empresas en León",
    },
    {
      id: 3,
      nombre: "Intel",
      src: "/logo/logo-intel.svg",
      alt: "Tecnología Intel para infraestructura empresarial",
    },
    {
      id: 4,
      nombre: "HP",
      src: "/logo/logo-hp.svg",
      alt: "Equipamiento de cómputo HP para empresas en León",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
        
        <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
          Respaldados por las mejores marcas de la industria
        </p>

        {/* Grid de 4 columnas perfectamente alineadas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 items-center justify-items-center w-full">
          {marcas.map((marca) => {
            const esContpaqi = marca.nombre === "CONTPAQi®";
            
            return (
              <div
                key={marca.id}
                /* AJUSTE DE CONTENEDORES:
                  - Mantenemos a CONTPAQi con su espacio amplio.
                  - Incrementamos el ancho máximo de Dell, Intel y HP de 130px a 170px (max-w-[150px] md:max-w-[170px]) para permitirles expandirse.
                */
               
                className={`w-full flex items-center justify-center h-20
                  ${esContpaqi ? "max-w-[240px] md:max-w-[340px]" : "max-w-[150px] md:max-w-[170px]"}
                `}
              >
                <img
                  src={marca.src}
                  alt={marca.alt}
                  /* ESCALADO MAESTRO DE IMÁGENES:
                    - CONTPAQi se queda en su escala ideal (h-16 en móvil, h-20 en escritorio con scale).
                    - Subimos la altura de los otros logos: pasaron de h-10 a h-14 en móvil, y a h-16 en escritorio de forma nativa.
                  */
                  className={`object-contain ${
                    esContpaqi 
                      ? "h-auto w-full max-w-[250px]" 
                      : "h-14 md:h-16 w-auto"
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}