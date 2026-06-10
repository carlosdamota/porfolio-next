import React from "react";
import Image from "next/image";

export const Skills = () => {
  const categories = [
    {
      title: "Desarrollo Frontend",
      skills: [
        { name: "React", icon: "/react_dark.svg" },
        { name: "Next.js / Vercel", icon: "/vercel_dark.svg" },
        { name: "TypeScript", icon: "/typescript.svg" },
        { name: "JavaScript", icon: "/javascript.svg" },
        { name: "HTML5", icon: "/html5.svg" },
        { name: "CSS3", icon: "/css_old.svg" },
        { name: "Sass", icon: "/sass.svg" },
        { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
        { name: "DaisyUI", icon: "/daisyui.svg" },
      ]
    },
    {
      title: "Backend & Bases de Datos",
      skills: [
        { name: "Node.js", icon: "/nodejs.svg" },
        { name: "Express.js", icon: "/Express.js_dark.svg" },
        { name: "MongoDB", icon: "/mongodb-icon-dark.svg" },
        { name: "MySQL", icon: "/mysql-icon-dark.svg" },
        { name: "Supabase", icon: "/supabase.svg" },
        { name: "Firebase", icon: "/firebase.svg" },
        { name: "PHP", icon: "/php_dark.svg" },
      ]
    },
    {
      title: "Servicios & Integraciones",
      skills: [
        { name: "Stripe", icon: "/stripe.svg" },
        { name: "Resend", icon: "/resend-icon-white.svg" },
        { name: "Google Cloud", icon: "/google-cloud.svg" },
        { name: "Google Analytics", icon: "/google-analytics.svg" },
      ]
    },
    {
      title: "Herramientas de Trabajo",
      skills: [
        { name: "Docker", icon: "/docker.svg" },
        { name: "Git", icon: "/git.svg" },
        { name: "GitHub", icon: "/github_dark.svg" },
        { name: "VS Code", icon: "/vscode.svg" },
        { name: "Postman", icon: "/postman.svg" },
      ]
    }
  ];

  return (
    <section
      id="skills"
      className="flex items-center justify-center px-4 py-24 bg-card/40 backdrop-blur-sm border-t border-border/40 relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col justify-center items-center px-4 gap-12 relative z-10 w-full">
        <article className="flex flex-col gap-10 w-full">
          <div className="max-w-3xl flex flex-col text-center self-center space-y-3">
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-primary block">HABILIDADES & TECNOLOGÍAS</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Stack Tecnológico
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed">
              Especializado en React, Next.js y herramientas modernas para el desarrollo
              Front-End y Full-Stack profesional.
            </p>
          </div>

          <div className="space-y-10">
            {categories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80 border-l-2 border-primary/50 pl-3">
                  {category.title}
                </h3>
                
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center space-x-3 px-4 py-3.5 rounded-xl border border-border/60 bg-secondary/10 hover:border-primary/45 hover:bg-gradient-to-br from-secondary/15 via-primary-glow/5 to-secondary/15 hover:shadow-md hover:shadow-primary/5 hover:scale-[1.03] transition-all duration-300 group cursor-default"
                    >
                      <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-black/40 border border-white/5 p-1.5 transition-transform duration-300 group-hover:scale-110 shrink-0">
                        <Image
                          className="w-full h-full object-contain"
                          src={skill.icon}
                          alt={`Logo de ${skill.name}`}
                          width={32}
                          height={32}
                        />
                      </div>
                      <span className="text-foreground text-xs sm:text-sm font-medium transition-colors group-hover:text-primary truncate">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

