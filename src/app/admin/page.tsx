import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "@/actions/auth";
import { AdminDashboardClient, AdminProject } from "@/components/organisms/AdminDashboardClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Carlos Damota",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: projectsData, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin projects:", error.message);
  }

  const projects: AdminProject[] = (projectsData || []).map((p: any) => ({
    _id: p.id,
    title: p.title,
    description: p.description,
    gallery: p.images || [],
    projectSkills: p.tags || [],
    githubProjectLink: p.repo_url,
    liveLink: p.demo_url,
    year: p.year,
    category: p.role,
    sort_order: p.sort_order ?? 0,
  }));

  return (
    <section className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Sesión: {user.email}</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-destructive-foreground bg-destructive rounded-lg hover:bg-destructive/90 transition-colors cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </form>
        </header>

        <AdminDashboardClient initialProjects={projects} />
      </div>
    </section>
  );
}
