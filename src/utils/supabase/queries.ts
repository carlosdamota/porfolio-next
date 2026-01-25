import { createClient } from './server';

export async function getProjects() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    return { projects: [], error: error.message };
  }

  // Map DB fields to component expected shape
  const mappedProjects = projects.map((p) => ({
    _id: p.id,
    slug: p.slug,
    created_at: p.created_at,
    title: p.title,
    description: p.description,
    category: p.role || 'Web Dev',
    gallery: p.images || [],
    projectSkills: p.tags || [],
    githubProjectLink: p.repo_url,
    liveLink: p.demo_url,
  }));

  return { projects: mappedProjects, error: null };
}

export async function getProjectBySlug(slug: string) {
  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
     // Handle invalid UUID or not found specifically if needed
    return { project: null, error: error.message, message: error.message };
  }

  const mappedProject = {
    _id: project.id,
    slug: project.slug,
    created_at: project.created_at, // Consider using project.year if you want to display the manual year
    year: project.year,
    title: project.title,
    description: project.description,
    category: project.role || 'Web Dev',
    gallery: project.images || [],
    projectSkills: project.tags || [],
    githubProjectLink: project.repo_url,
    liveLink: project.demo_url,
  };

  return { project: mappedProject, error: null, message: null };
}
