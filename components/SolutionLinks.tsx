const groups = [
  {
    title: "CONTPAQi",
    items: [
      ["Venta de licencias", "/distribuidor-contpaqi-leon"],
      ["Renovaciones y actualizaciones", "/renovacion-contpaqi"],
      ["Implementación e instalación", "/instalacion-contpaqi"],
      ["Soporte especializado", "/soporte-contpaqi-leon"],
      ["Capacitación", "/cursos-contpaqi"],
    ],
  },
  {
    title: "Infraestructura",
    items: [
      ["Servidores para CONTPAQi", "/servidores-contpaqi"],
      ["Optimización SQL", "/optimizacion-sql"],
      ["Pólizas de soporte TI", "/polizas-soporte-ti"],
    ],
  },
  {
    title: "Soluciones empresariales",
    items: [
      ["Consultoría TI", "/servicios"],
      ["Desarrollo a la medida", "/servicios"],
      ["Integraciones de sistemas", "/servicios"],
    ],
  },
];

export default function SolutionLinks() {
  return (
    <section className="py-20 bg-mida-deep text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <span className="text-white font-bold text-xs uppercase tracking-widest">Soluciones MIDA</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black">Tecnología, soporte e implementación para tu empresa</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div key={group.title} className="rounded-2xl bg-white/5 border border-white/10 p-7">
              <h3 className="text-xl font-bold mb-5">{group.title}</h3>
              <div className="space-y-3">
                {group.items.map(([label, href]) => (
                  <a key={label} href={href} className="flex items-center justify-between text-sm text-white/90 hover:text-white transition-colors">
                    <span>{label}</span><span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
