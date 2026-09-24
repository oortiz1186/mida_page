import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto MIDA | CONTPAQi y Soporte TI en León",
  description: "Contacta a MIDA para asesoría, implementación, soporte CONTPAQi, SQL, servidores e infraestructura TI en León y el Bajío.",
  alternates: { canonical: "/contacto" },
  openGraph: { title: "Contacto MIDA | CONTPAQi y Soporte TI en León", description: "Solicita asesoría para CONTPAQi, SQL, servidores e infraestructura TI con MIDA.", url: "/contacto", type: "website" },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
