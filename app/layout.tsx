import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. IMPORTAMOS EL BOTÓN DESDE LA CARPETA DE COMPONENTES
import WhatsAppButton from "../components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Puedes aprovechar para personalizar los textos que se ven en la pestaña del navegador
export const metadata: Metadata = {
  title: "MIDA - Consultoría Tecnológica",
  description: "Soluciones de infraestructura, sistemas CONTPAQi y equipamiento de cómputo profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" // Cambiado a "es" para el idioma en español de tu negocio
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Aquí se renderizan tus páginas automáticamente */}
        {children}
        
        {/* 2. AGREGAMOS EL BOTÓN AQUÍ PARA QUE FLOTE DE FORMA GLOBAL */}
        <WhatsAppButton />
      </body>
    </html>
  );
}