import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Centro de Atención | MIDA",
  description: "Centro de atención de MIDA Tech Consulting.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/tickets",
  },
};

export default function TicketsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
