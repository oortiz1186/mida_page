import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solicitud recibida | MIDA",
  description: "Confirmación de recepción de solicitud en MIDA Tech Consulting.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/gracias",
  },
};

export default function GraciasLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
