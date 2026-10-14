import Link from "next/link";

const areas = [
  { number: "01", title: "Factura Electrónica", description: "Asesoría en emisión de CFDI, configuración y operación de CONTPAQi Factura Electrónica." },
  { number: "02", title: "Nóminas", description: "Acompañamiento en procesos de nómina y uso de CONTPAQi Nóminas." },
  { number: "03", title: "Sistemas de escritorio", description: "Experiencia técnica en implementación, configuración y operación de soluciones CONTPAQi de escritorio." },
];

export default function HomeCertifications() {
  return (
    <section aria-labelledby="certificaciones-titulo" className="bg-slate-50 py-20 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-mida-primary">Preparación que respalda nuestro servicio</p>
            <h2 id="certificaciones-titulo" className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Asesores certificados en soluciones CONTPAQi</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Nuestro equipo cuenta con certificaciones en áreas clave para acompañar a tu empresa con atención especializada.</p>
          </div>
          <Link href="/certificaciones" className="inline-flex w-fit items-center justify-center rounded-full bg-mida-primary px-6 py-3 font-semibold text-white hover:bg-mida-deep transition-colors">Conoce nuestras certificaciones <span aria-hidden="true" className="ml-2">→</span></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {areas.map(area => (
            <article key={area.title} className="rounded-2xl bg-white border border-gray-100 p-7 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-mida-primary font-black">{area.number}</span>
              <h3 className="mt-5 text-xl font-bold text-mida-deep">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
