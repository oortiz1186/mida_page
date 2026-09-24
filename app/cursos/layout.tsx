import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos CONTPAQi en León | MIDA",
  description: "Cursos y capacitación CONTPAQi para empresas y usuarios en León, con formación práctica y acompañamiento especializado de MIDA.",
  alternates: { canonical: "/cursos" },
  openGraph: { title: "Cursos CONTPAQi en León | MIDA", description: "Capacitación y cursos CONTPAQi para empresas y usuarios con acompañamiento MIDA.", url: "/cursos", type: "website" },
};

export default function CursosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
