import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sistemas CONTPAQi en León | MIDA",
  description: "Conoce sistemas CONTPAQi para contabilidad, nóminas, facturación, administración comercial y nube, con implementación y soporte MIDA en León.",
  alternates: { canonical: "/contpaqi" },
  openGraph: { title: "Sistemas CONTPAQi en León | MIDA", description: "Soluciones CONTPAQi con implementación, capacitación y soporte especializado de MIDA.", url: "/contpaqi", type: "website" },
};

export default function ContpaqiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
