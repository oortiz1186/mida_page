import { MetadataRoute } from 'next';
import { infoEmpresa } from '../components/config/empresa'; // <--- Importación homologada

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/api/'], // Bloquea páginas privadas y administración
    },
    // Jala automáticamente el dominio que tengas editado en tu archivo de empresa
    sitemap: `${infoEmpresa.dominio}/sitemap.xml`, 
  };
}