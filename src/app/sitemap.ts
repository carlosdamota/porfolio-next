import { getProjects } from '@/utils/supabase/queries';
import { MetadataRoute } from 'next';

// Simulación de datos — en tu caso puedes obtenerlos de una API o de un archivo


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://carlosdamota.com';

  const { projects } = await getProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
