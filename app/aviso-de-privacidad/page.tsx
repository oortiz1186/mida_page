import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { infoEmpresa } from "@/components/config/empresa";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | MIDA Tech Consulting",
  description: "Consulta cómo MIDA Tech Consulting recaba, utiliza y protege los datos personales proporcionados a través de mida.mx.",
  alternates: { canonical: "/aviso-de-privacidad" },
};

export default function AvisoPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">
        <article className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <p className="text-sm font-bold uppercase tracking-wider text-mida-primary">Protección de datos personales</p>
          <h1 className="mt-3 text-4xl font-black text-mida-deep md:text-5xl">Aviso de Privacidad Integral</h1>
          <p className="mt-5 text-slate-600">Última actualización: 28 de septiembre de 2026.</p>

          <div className="mt-10 space-y-8 text-[16px] leading-7 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-mida-deep">1. Responsable del tratamiento</h2>
              <p className="mt-3"><strong>{infoEmpresa.nombre}</strong>, con domicilio en {infoEmpresa.direccionCompleta}, es responsable del tratamiento de los datos personales que recaba a través de este sitio web y de los medios de contacto asociados.</p>
              <p className="mt-3">Para asuntos relacionados con privacidad y protección de datos puedes comunicarte al correo <a className="font-semibold text-mida-primary underline" href={`mailto:${infoEmpresa.correoContacto}`}>{infoEmpresa.correoContacto}</a> o al teléfono {infoEmpresa.telefonoTexto}.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">2. Datos personales que podemos recabar</h2>
              <p className="mt-3">Dependiendo del formulario o servicio utilizado, podemos tratar datos de identificación y contacto, como nombre, correo electrónico y teléfono; datos laborales o comerciales, como empresa o razón social; el producto o servicio de interés; y la información que voluntariamente incluyas en mensajes, solicitudes de soporte o cotización.</p>
              <p className="mt-3">A través de este sitio no solicitamos intencionalmente datos personales sensibles. Te pedimos no incluirlos en campos de texto libre salvo que sean estrictamente necesarios para la atención de tu solicitud.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">3. Finalidades del tratamiento</h2>
              <p className="mt-3">Utilizamos tus datos para identificar y atender tus solicitudes; preparar y dar seguimiento a cotizaciones; proporcionar información sobre productos y servicios solicitados; brindar soporte y atención al cliente; dar seguimiento a relaciones comerciales; mantener registros de contacto y servicio; y proteger la seguridad y correcto funcionamiento de nuestros sistemas.</p>
              <p className="mt-3">De manera adicional, podremos utilizar tus datos de contacto para enviarte información comercial relacionada con productos, servicios, cursos o soluciones de MIDA. Puedes solicitar en cualquier momento que dejemos de utilizar tus datos para esta finalidad adicional.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">4. Proveedores tecnológicos y transferencias</h2>
              <p className="mt-3">Para operar el sitio y atender solicitudes utilizamos proveedores tecnológicos que pueden procesar información por cuenta de MIDA, incluyendo servicios de formularios, CRM, seguridad, analítica, alojamiento e infraestructura. Entre los servicios actualmente integrados al sitio se encuentran HubSpot, Formspree, Google reCAPTCHA y Google Analytics.</p>
              <p className="mt-3">Cuando una transferencia de datos personales requiera tu consentimiento conforme a la legislación aplicable, éste será solicitado antes de realizarla. No vendemos tus datos personales.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">5. Tecnologías de seguimiento</h2>
              <p className="mt-3">El sitio puede utilizar cookies y tecnologías similares necesarias para su funcionamiento, seguridad, medición y analítica. Algunos proveedores externos también pueden generar identificadores técnicos al cargar sus servicios. La disponibilidad y duración de estas tecnologías depende del servicio utilizado y de la configuración de tu navegador.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">6. Derechos ARCO</h2>
              <p className="mt-3">Puedes solicitar el acceso a tus datos personales, su rectificación, cancelación u oponerte a su tratamiento, así como solicitar la revocación de tu consentimiento o limitar el uso o divulgación de tus datos.</p>
              <p className="mt-3">Para ejercer estos derechos envía tu solicitud a <a className="font-semibold text-mida-primary underline" href={`mailto:${infoEmpresa.correoContacto}`}>{infoEmpresa.correoContacto}</a>. La solicitud deberá permitirnos identificarte, indicar el derecho que deseas ejercer y describir claramente los datos o tratamiento relacionado con tu petición. Podremos solicitar información razonable para acreditar tu identidad o representación antes de atenderla.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">7. Seguridad y conservación</h2>
              <p className="mt-3">MIDA adopta medidas administrativas y técnicas razonables para proteger los datos personales contra pérdida, alteración, acceso, uso o divulgación no autorizados. Conservaremos la información durante el tiempo necesario para las finalidades descritas y para cumplir las obligaciones legales o contractuales aplicables.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-mida-deep">8. Cambios al aviso</h2>
              <p className="mt-3">Podemos actualizar este Aviso de Privacidad cuando cambien nuestros procesos, servicios o disposiciones aplicables. La versión vigente y su fecha de actualización estarán disponibles permanentemente en esta página.</p>
            </section>

            <section className="rounded-2xl bg-slate-50 p-6">
              <h2 className="text-xl font-bold text-mida-deep">Contacto de privacidad</h2>
              <p className="mt-2">Correo: <a className="font-semibold text-mida-primary underline" href={`mailto:${infoEmpresa.correoContacto}`}>{infoEmpresa.correoContacto}</a></p>
              <p>Teléfono: {infoEmpresa.telefonoTexto}</p>
              <p>Domicilio: {infoEmpresa.direccionCompleta}</p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
