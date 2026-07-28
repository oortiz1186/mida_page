"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { infoEmpresa } from "../../components/config/empresa";

export default function CursosPage() {
  const modalidades = [
    {
      titulo: "Cursos presenciales",
      descripcion:
        "Capacitación práctica en León, Guanajuato, con acompañamiento directo, ejercicios guiados y atención personalizada para cada participante.",
      detalles: [
        "Sesiones individuales o para grupos",
        "Ejercicios y prácticas paso a paso",
        "Contenido adaptable a las necesidades de tu empresa",
      ],
      icono: (
        <svg className="h-6 w-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      titulo: "Cursos en línea",
      descripcion:
        "Clases remotas en vivo para aprender desde cualquier lugar, compartir pantalla, realizar ejercicios y resolver dudas durante cada sesión.",
      detalles: [
        "Clases en vivo desde computadora",
        "Material y ejercicios digitales",
        "Asesoría y resolución de dudas durante el curso",
      ],
      icono: (
        <svg className="h-6 w-6 text-mida-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const areas = [
    "Sistemas CONTPAQi",
    "Herramientas digitales",
    "Tecnologías de información",
    "Capacitación empresarial personalizada",
  ];

  const mensajeCursos = encodeURIComponent(
    "Hola, me interesa recibir información sobre los cursos de MIDA."
  );
  const urlWhatsApp = `https://wa.me/${infoEmpresa.whatsappNumero}?text=${mensajeCursos}`;

  return (
    <main className="bg-mida-gray min-h-screen flex flex-col">
      <Navbar />

      <section className="pt-40 pb-16 bg-mida-deep text-white px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <span className="inline-block text-mida-light font-bold text-xs uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full">
            Capacitación MIDA
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Cursos presenciales y <span className="text-mida-light">en línea</span>
          </h1>
          <p className="text-mida-gray/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Fortalece tus conocimientos y los de tu equipo con capacitación práctica en tecnología, sistemas empresariales y herramientas digitales.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 w-full flex-grow">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">
            Elige cómo capacitarte
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-mida-deep">
            Modalidades pensadas para ti y tu empresa
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modalidades.map((modalidad) => (
            <article
              key={modalidad.titulo}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-8 md:p-10"
            >
              <div className="w-12 h-12 bg-mida-primary/10 rounded-2xl flex items-center justify-center mb-6">
                {modalidad.icono}
              </div>
              <h3 className="text-2xl font-black text-mida-deep mb-3">
                {modalidad.titulo}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {modalidad.descripcion}
              </p>
              <ul className="space-y-3">
                {modalidad.detalles.map((detalle) => (
                  <li key={detalle} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mida-primary text-xs font-bold text-white">
                      ✓
                    </span>
                    <span>{detalle}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white px-6 border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">
              Temas de capacitación
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-mida-deep">
              Contenido práctico y aplicable
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Los temarios pueden ajustarse al nivel de los participantes y a los procesos que necesite fortalecer cada organización.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {areas.map((area) => (
              <div key={area} className="rounded-2xl bg-mida-gray/40 border border-gray-100 p-5 font-bold text-mida-deep">
                {area}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-mida-gray/50 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-mida-deep">
            Solicita fechas, horarios y temarios
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Cuéntanos qué deseas aprender y si buscas capacitación individual o para tu equipo. Te ayudaremos a elegir la modalidad adecuada.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contacto"
              className="w-full sm:w-auto bg-mida-primary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-mida-deep transition-all shadow-md text-sm uppercase tracking-wider text-center"
            >
              Solicitar información
            </a>
            <a
              href={urlWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-gray-200 bg-white text-mida-deep font-bold px-8 py-3.5 rounded-xl hover:bg-mida-gray/40 transition-all text-sm uppercase tracking-wider text-center shadow-sm"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
