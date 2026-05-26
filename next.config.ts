import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cabeceras de seguridad avanzadas para proteger los datos en producción
  async headers() {
    return [
      {
        // Aplica estas reglas de seguridad a todas las rutas del sitio web
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Previene ataques de Clickjacking (que clonen tu web en un marco falso)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Fuerza al navegador a respetar los tipos MIME oficiales de tus archivos
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Protege la privacidad de la ruta de origen del usuario
          },
        ],
      },
    ];
  },
};

export default nextConfig;