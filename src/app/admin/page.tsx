"use client";

import { createClient } from "@/utils/supabase/client";
import { logout } from "@/actions/auth";
import { deleteProject, updateProjectOrder } from "@/actions/projects";
import { CreateProjectForm } from "@/components/organisms/CreateProjectForm";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [projectToEdit, setProjectToEdit] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  const fetchData = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    const { data: projectsData } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
    
    const mapped = projectsData?.map(p => ({
        _id: p.id,
        title: p.title,
        description: p.description,
        gallery: p.images || [],
        projectSkills: p.tags || [],
        githubProjectLink: p.repo_url,
        liveLink: p.demo_url,
        year: p.year,
        category: p.role,
        sort_order: p.sort_order
    })) || [];

    setProjects(mapped);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (project: any) => {
    setProjectToEdit(project);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setProjectToEdit(null);
    fetchData();
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const project1 = projects[index];
    const project2 = projects[targetIndex];

    let order1 = project2.sort_order;
    let order2 = project1.sort_order;

    if (order1 === order2) {
      order1 = index - 1;
      order2 = index;
    }

    const fd1 = new FormData();
    fd1.append("id", project1._id);
    fd1.append("sort_order", String(order1));

    const fd2 = new FormData();
    fd2.append("id", project2._id);
    fd2.append("sort_order", String(order2));

    await Promise.all([
      updateProjectOrder(fd1),
      updateProjectOrder(fd2)
    ]);

    await fetchData();
  };

  if (isLoading) return <div className="p-8 text-center">Cargando...</div>;

  return (
    <section className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div>
             <h1 className="text-2xl md:text-3xl font-bold text-primary">Admin Dashboard</h1>
             <p className="text-sm text-muted-foreground">Sesión: {user?.email}</p>
          </div>
          <form action={logout}>
            <button className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90 transition-colors">
              Cerrar Sesión
            </button>
          </form>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* FORM SECTION */}
          <div className="sticky top-8">
             <CreateProjectForm 
                key={projectToEdit ? projectToEdit._id : "new-project"}
                projectToEdit={projectToEdit} 
                onCancelEdit={handleCancelEdit} 
             />
          </div>

          {/* PROJECT LIST */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold px-2">Gestionar Proyectos</h2>
            <div className="grid gap-4">
                {projects.map((project, idx) => (
                <div key={project._id} className="flex gap-4 p-4 bg-card rounded-xl border border-border items-center hover:border-primary/50 transition-colors group">
                    <div className="relative w-24 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    {project.gallery && project.gallery[0] ? (
                        <Image src={project.gallery[0]} alt={project.title} fill className="object-cover" />
                    ) : (
                        <div className="w-full h-full bg-secondary" />
                    )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                             <h3 className="font-bold truncate text-sm">{project.title}</h3>
                             <span className="text-[10px] bg-primary/10 text-primary px-1.5 rounded uppercase font-bold">
                                Ord: {project.sort_order}
                             </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{project.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Sort buttons */}
                        <div className="flex flex-col gap-0.5 mr-2">
                            <button 
                                onClick={() => handleMove(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 hover:bg-primary/10 text-primary rounded disabled:opacity-20 disabled:hover:bg-transparent transition-colors text-[10px] leading-none"
                                title="Subir"
                            >
                                ▲
                            </button>
                            <button 
                                onClick={() => handleMove(idx, 'down')}
                                disabled={idx === projects.length - 1}
                                className="p-1 hover:bg-primary/10 text-primary rounded disabled:opacity-20 disabled:hover:bg-transparent transition-colors text-[10px] leading-none"
                                title="Bajar"
                            >
                                ▼
                            </button>
                        </div>
                        <button 
                            onClick={() => handleEdit(project)}
                            className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                            title="Editar"
                        >
                            ✏️
                        </button>
                        <form 
                            action={deleteProject} 
                            onSubmit={(e) => {
                                if (!confirm(`¿Estás seguro de que deseas eliminar "${project.title}"?`)) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            <input type="hidden" name="id" value={project._id} />
                            <button className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Eliminar">
                                🗑️
                            </button>
                        </form>
                    </div>
                </div>
                ))}
            </div>
            {projects.length === 0 && (
              <p className="text-muted-foreground text-center py-12 bg-card rounded-xl border border-dashed border-border">
                No hay proyectos. ¡Empieza creando uno!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
