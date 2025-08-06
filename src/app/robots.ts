import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',          // Aplica la regla a TODOS los bots
      allow: '/',              // Permite el rastreo de TODO el sitio
      disallow: '/private/',   // Mantiene la carpeta /private/ como no rastreable
    },
    sitemap: 'https://carlosdamota.com/sitemap.xml',
  }
}