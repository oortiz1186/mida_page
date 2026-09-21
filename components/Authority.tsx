const metrics = [
  { value: "14+", label: "años de experiencia" },
  { value: "1,200+", label: "clientes atendidos" },
  { value: "800+", label: "implementaciones realizadas" },
  { value: "2 h", label: "tiempo promedio de respuesta" },
];

export default function Authority() {
  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Experiencia que genera confianza</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Especialistas en CONTPAQi, SQL e infraestructura empresarial</h2>
          <p className="mt-4 text-gray-600">Acompañamos a empresas del Bajío con implementación, soporte y soluciones tecnológicas orientadas a la continuidad de su operación.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-2xl border border-gray-100 bg-mida-gray/20 p-6 text-center shadow-sm">
              <div className="text-3xl md:text-4xl font-black text-mida-primary">{item.value}</div>
              <div className="mt-2 text-sm font-semibold text-mida-deep">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">Especialistas certificados en tecnologías SQL y soluciones CONTPAQi.</p>
      </div>
    </section>
  );
}
