import React from "react";
import Image from "next/image";

export const Skills = () => {
  const skills = [
    { name: "React", icon: "/react_dark.svg" },
    { name: "Next.js / Vercel", icon: "/vercel_dark.svg" },
    { name: "TypeScript", icon: "/typescript.svg" },
    { name: "JavaScript", icon: "/javascript.svg" },
    { name: "HTML5", icon: "/html5.svg" },
    { name: "CSS3", icon: "/css_old.svg" },
    { name: "Sass", icon: "/sass.svg" },
    { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
    { name: "DaisyUI", icon: "/daisyui.svg" },
    { name: "Node.js", icon: "/nodejs.svg" },
    { name: "Express.js", icon: "/Express.js_dark.svg" },
    { name: "MongoDB", icon: "/mongodb-icon-dark.svg" },
    { name: "MySQL", icon: "/mysql-icon-dark.svg" },
    { name: "Supabase", icon: "/supabase.svg" },
    { name: "Firebase", icon: "/firebase.svg" },
    { name: "Docker", icon: "/docker.svg" },
    { name: "Git", icon: "/git.svg" },
    { name: "GitHub", icon: "/github_dark.svg" },
    { name: "VS Code", icon: "/vscode.svg" },
    { name: "Postman", icon: "/postman.svg" },
    { name: "PHP", icon: "/php_dark.svg" },
    { name: "Stripe", icon: "/stripe.svg" },
    { name: "Resend", icon: "/resend-icon-white.svg" },
    { name: "Google Cloud", icon: "/google-cloud.svg" },
    { name: "Google Analytics", icon: "/google-analytics.svg" },
  ];

  return (
    <section
      id="skills"
      className="flex items-center justify-center px-4 py-16 bg-card relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col justify-center items-center px-4 py-2 gap-8">
        <article className="flex flex-col gap-4 w-full">
          <div className="max-w-2xl flex flex-col text-center self-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Stack Tecnológico
            </h2>
            <p className="text-muted-foreground text-2xl">
              Especializado en React, Next.js, JavaScript y herramientas modernas para desarrollo
              Front-End profesional
            </p>
          </div>

          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl border border-primary/10 bg-secondary/20 hover:border-primary hover:bg-gradient-to-br from-secondary/20 via-primary-glow/5 to-secondary/20 hover:shadow-md hover:shadow-primary/10 hover:scale-105 transition-all duration-300 group cursor-default"
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
                <span className="text-foreground text-sm sm:text-md font-medium transition-colors group-hover:text-primary truncate">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

