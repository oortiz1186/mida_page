import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import { infoEmpresa } from "../components/config/empresa";
import "./globals.css";
import WhatsAppButton from "../components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(infoEmpresa.dominio),
  title: { default: "MIDA | CONTPAQi, SQL y Soporte TI en León", template: "%s" },
  description: "Soluciones CONTPAQi, servidores, SQL, soporte y consultoría TI para empresas en León y el Bajío.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "MIDA Tech Consulting",
    title: "MIDA | CONTPAQi, SQL y Soporte TI en León",
    description: "Soluciones CONTPAQi, servidores, SQL, soporte y consultoría TI para empresas en León y el Bajío.",
  },
  twitter: { card: "summary_large_image", title: "MIDA | CONTPAQi, SQL y Soporte TI en León", description: "Soluciones CONTPAQi, servidores, SQL, soporte y consultoría TI para empresas en León y el Bajío." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: infoEmpresa.nombre,
    url: infoEmpresa.dominio,
    logo: `${infoEmpresa.dominio}/logo/Logotipo-mida-azul.svg`,
    telephone: `+${infoEmpresa.whatsappNumero}`,
    email: infoEmpresa.correoContacto,
    description: "Distribuidor CONTPAQi, consultoría TI, SQL, servidores y soporte empresarial en León y el Bajío.",
    address: {
      "@type": "PostalAddress",
      streetAddress: infoEmpresa.direccionLinea1,
      addressLocality: "León",
      addressRegion: "Guanajuato",
      postalCode: "37530",
      addressCountry: "MX",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: ["León, Guanajuato", "Bajío, México"],
  };

  return (
    <html lang="es" className={inter.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={dmSans.className}>
        {children}
        <WhatsAppButton />
        {infoEmpresa.googleAnalyticsId && infoEmpresa.googleAnalyticsId !== "G-XXXXXXX" && <GoogleAnalytics gaId={infoEmpresa.googleAnalyticsId} />}
      </body>
    </html>
  );
}
