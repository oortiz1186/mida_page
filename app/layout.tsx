import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { infoEmpresa } from "../components/config/empresa"; // Importa tu configuración actual
import "./globals.css";
import WhatsAppButton from "../components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

// Metadatos globales base del sitio web optimizados
export const metadata: Metadata = {
  metadataBase: new URL(infoEmpresa.dominio), // <-- Ajuste del Paso 2: Define la URL base global para evitar errores de rutas relativas en producción
  title: "MIDA | Consultoría TI, Soporte CONTPAQi y Servidores en León Gto",
  description: "Optimizamos la infraestructura tecnológica de tu empresa. Especialistas certificados en sistemas CONTPAQi, servidores SQL y soporte técnico empresarial en León, Guanajuato.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Objeto estructurado Schema.org mapeado con tus variables reales de infoEmpresa
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": infoEmpresa.nombre,
    "image": `${infoEmpresa.dominio}/images/oficina.png`,
    "telephone": `+${infoEmpresa.whatsappNumero}`, 
    "url": infoEmpresa.dominio,
    "email": infoEmpresa.correoContacto,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": infoEmpresa.direccionLinea1,
      "addressLocality": "León",
      "addressRegion": "Guanajuato",
      "postalCode": "37530", 
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.144415, 
      "longitude": -101.691235
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "priceRange": "$$$"
  };

  return (
    <html lang="es">
      <head>
        {/* Inyección estructural JSON-LD para los robots de búsqueda de Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}