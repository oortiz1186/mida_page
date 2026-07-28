const cursos = [
  {
    modalidad: "Presencial",
    titulo: "Capacitación práctica para empresas",
    descripcion:
      "Cursos impartidos en León, Guanajuato, con acompañamiento directo, ejercicios guiados y atención personalizada para tu equipo.",
    detalles: ["Sesiones para grupos", "Prácticas paso a paso", "Contenido adaptado a tu empresa"],
  },
  {
    modalidad: "En línea",
    titulo: "Aprende desde cualquier lugar",
    descripcion:
      "Capacitación remota en vivo para que tú o tu equipo puedan aprender sin trasladarse y resolver dudas durante cada sesión.",
    detalles: ["Clases en vivo", "Acceso desde computadora", "Asesoría durante el curso"],
  },
];

export default function Courses() {
  return (
    <section id="cursos" className="py-24 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest bg-mida-primary/10 px-4 py-1.5 rounded-full">
            Capacitación MIDA
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-mida-deep">
            Cursos presenciales y en línea
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Fortalece tus conocimientos y los de tu equipo con cursos prácticos en tecnología, sistemas empresariales y herramientas digitales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cursos.map((curso) => (
            <article
              key={curso.modalidad}
              className="rounded-3xl border border-gray-100 bg-mida-gray/20 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-5">
                <span className="inline-flex items-center rounded-full bg-mida-deep px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  {curso.modalidad}
                </span>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-mida-deep">
                    {curso.titulo}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {curso.descripcion}
                  </p>
                </div>

                <ul className="space-y-3">
                  {curso.detalles.map((detalle) => (
                    <li key={detalle} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mida-primary text-xs font-bold text-white">
                        ✓
                      </span>
                      <span>{detalle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-3xl bg-mida-deep px-8 py-10 text-center text-white md:px-12">
          <div className="mx-auto max-w-3xl space-y-5">
            <h3 className="text-2xl md:text-3xl font-black">
              Solicita información sobre próximos cursos
            </h3>
            <p className="text-white/80 leading-relaxed">
              Conoce fechas, horarios, temarios y opciones de capacitación para empresas o participantes individuales.
            </p>
            <a
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-mida-primary px-7 py-3 font-bold text-white shadow-md transition-all hover:bg-mida-light"
            >
              Pedir información
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
