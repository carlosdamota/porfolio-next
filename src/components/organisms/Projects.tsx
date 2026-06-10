import { getProjects } from "@/utils/supabase/queries";
import React from "react";
import { ProjectsCarousel } from "./ProjectsCarousel";

export const Projects = async () => {
  const { projects } = await getProjects();

  return (
    <section
      id="projects"
      className="flex items-center justify-center px-4 py-24 bg-background text-foreground relative overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col justify-center items-center px-4 gap-12 relative z-10 w-full">
        <div className="text-center space-y-3 max-w-3xl">
          <span className="text-[10px] tracking-[0.2em] font-black uppercase text-primary block">CREACIONES Y DESARROLLOS</span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Proyectos Destacados</h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed">
            Portafolio de aplicaciones web responsivas y modernas desarrolladas con React, Next.js y
            tecnologías actuales.
          </p>
        </div>

        <ProjectsCarousel projects={projects} />
      </div>
    </section>
  );
};

