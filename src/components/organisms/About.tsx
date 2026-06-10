import Image from "next/image";
import React from "react";

export const About = () => {
  return (
    <section
      id='about'
      className='flex items-center justify-center px-4 py-24 bg-card/40 backdrop-blur-sm border-y border-border/40 relative overflow-hidden'
    >
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 justify-center items-center px-4 gap-12 relative z-10'>
        
        {/* LEFT: Image with glowing double border */}
        <div className="lg:col-span-5 flex justify-center items-center group relative">
          <div className="absolute -inset-1.5 bg-gradient-to-tr from-primary/35 to-accent/35 rounded-[26px] blur-md opacity-25 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative p-2 bg-gradient-to-tr from-primary/25 via-border/60 to-accent/25 rounded-[24px] shadow-2xl transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
            <Image
              className='w-full max-w-[380px] h-[340px] md:h-[400px] object-cover object-top rounded-2xl bg-card'
              src='/Foto_perfil.jpg'
              alt='Foto de perfil de Carlos Damota'
              width={400}
              height={450}
              priority
            />
          </div>
        </div>

        {/* RIGHT: Texts & Stats */}
        <article className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-primary block">TRAYECTORIA & ENFOQUE</span>
            <h2 className='text-4xl md:text-5xl font-black text-foreground tracking-tight'>Sobre mí</h2>
          </div>

          <div className='space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed font-light'>
            <p>
              Soy desarrollador <span className='text-primary font-semibold'>Full-Stack</span> con formación especializada en un ecosistema moderno: <span className='text-foreground font-semibold'>React, Next.js, TypeScript y Node.js</span>, complementado con soluciones como <span className='text-foreground font-semibold'>Supabase y Firebase</span>. Mi transición al sector tecnológico llega tras más de 14 años de sólida trayectoria en el sector retail, una experiencia que me aporta una perspectiva única para entender el negocio, gestionar proyectos y resolver problemas con empatía y pragmatismo.
            </p>
            <p>
              Me especializo en diseñar y construir <span className='text-primary font-semibold'>aplicaciones web integrales, escalables y de alto rendimiento</span>. Mi enfoque combina la arquitectura del código con los detalles de la interfaz, priorizando la experiencia de usuario y las buenas prácticas. Además, soy un adoptante temprano de los flujos de trabajo basados en <span className='text-primary font-semibold'>IA y programación agéntica</span>, integrando herramientas avanzadas para acelerar el desarrollo y elevar la calidad del software.
            </p>
          </div>

          {/* Metrics / Key points grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
             <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-center space-y-1 hover:border-primary/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-primary block">14+</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Años Retail</span>
             </div>
             <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-center space-y-1 hover:border-primary/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-primary block">Full</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Stack Focus</span>
             </div>
             <div className="p-4 rounded-xl bg-card/60 border border-border/50 text-center space-y-1 hover:border-primary/30 transition-colors">
                <span className="text-2xl sm:text-3xl font-black text-primary block">AI</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Developer</span>
             </div>
          </div>
        </article>
      </div>
    </section>
  );
};
