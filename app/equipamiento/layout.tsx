import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servidores y Equipamiento TI en León | MIDA",
  description: "Servidores, redes, estaciones de trabajo, respaldos y equipamiento TI para empresas en León, con diseño e implementación especializada de MIDA.",
  alternates: { canonical: "/equipamiento" },
  openGraph: { title: "Servidores y Equipamiento TI en León | MIDA", description: "Infraestructura, servidores, redes y equipamiento tecnológico para empresas en León.", url: "/equipamiento", type: "website" },
};

export default function EquipamientoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
