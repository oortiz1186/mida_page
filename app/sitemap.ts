import { MetadataRoute } from 'next';
import { infoEmpresa } from '../components/config/empresa';

export default function sitemap(): MetadataRoute.Sitemap {
  // Obtenemos la URL base configurada (actualmente tu enlace temporal de Vercel)
  const baseUrl = infoEmpresa.dominio;

  // Definimos las rutas principales de tu sitio web de MIDA
  const rutas = [
    '',               // Página de inicio (/)
    '/servicios',     // Catálogo de Servicios (/servicios)
    '/contpaqi',      // Especialización CONTPAQi (/contpaqi)
    '/equipamiento',  // Servidores y Hardware (/equipamiento)
    '/contacto',      // Formulario Corporativo (/contacto)
  ];

  // Mapeamos las rutas con el formato estándar requerido por los motores de búsqueda
  return rutas.map((ruta) => ({
    url: `${baseUrl}${ruta}`,
    lastModified: new Date(), // Le avisa a Google que el sitio está actualizado dinámicamente
    changeFrequency: 'weekly' as const, // Frecuencia ideal para sitios corporativos y de soporte
    priority: ruta === '' ? 1.0 : 0.8,  // El Home tiene prioridad máxima (1.0), las secundarias (0.8)
  }));
}