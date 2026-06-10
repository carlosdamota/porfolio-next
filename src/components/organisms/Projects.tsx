import { getProjects } from "@/utils/supabase/queries";
import React from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";

export const Projects = async () => {
  const { projects } = await getProjects();

  return (
    <section
      id="projects"
      className="flex items-center justify-center px-4 py-16 bg-background text-foreground relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-4 py-2 gap-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h2 className="text-5xl font-bold">Proyectos Destacados</h2>
          <p className="text-muted-foreground text-2xl">
            Portafolio de aplicaciones web responsivas y modernas desarrolladas con React, Next.js y
            tecnologías actuales
          </p>
        </div>

        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

