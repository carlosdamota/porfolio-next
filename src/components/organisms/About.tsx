import Image from "next/image";
import React from "react";

export const About = () => {
  return (
    <section
      id='about'
      className=' flex items-center justify-center px-4 py-16 bg-card relative overflow-hidden'
    >
      <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-center items-center px-4 py-2 gap-8 '>
        <Image
          className='w-100 h-75 object-cover object-top rounded-2xl'
          src='/Foto_perfil.jpg'
          alt='foto_perfil'
          width={500}
          height={500}
        />

        <article>
          <h2 className='text-4xl md:text-5xl font-bold mb-8 text-foreground'>Sobre mí</h2>
          <div className='space-y-6 text-lg text-muted-foreground leading-relaxed'>
            <p>
              Soy desarrollador <span className='text-primary font-medium'>Full-Stack</span> con formación especializada en un ecosistema moderno: <span className='text-primary font-medium'>React, Next.js, TypeScript y Node.js</span>, complementado con soluciones como <span className='text-primary font-medium'>Supabase y Firebase</span>. Mi transición al sector tecnológico llega tras más de 14 años de sólida trayectoria en el sector retail, una experiencia que me aporta una perspectiva única para entender el negocio, gestionar proyectos y resolver problemas con empatía y pragmatismo.
            </p>
            <p>
              Me especializo en diseñar y construir <span className='text-primary font-medium'>aplicaciones web integrales, escalables y de alto rendimiento</span>. Mi enfoque combina la arquitectura del código con los detalles de la interfaz, priorizando la experiencia de usuario y las buenas prácticas. Además, soy un adoptante temprano de los flujos de trabajo basados en <span className='text-primary font-medium'>IA y programación agéntica</span>, integrando herramientas avanzadas como <span className='text-primary font-medium'>OpenCode y Codex</span> para acelerar el desarrollo y elevar la calidad del software.
            </p>
            <p>
              Destaco por ser proactivo, detallista y estar en constante evolución técnica, siempre buscando optimizaciones que mejoren la eficiencia del desarrollo. Busco incorporarme a proyectos desafiantes como <span className='text-primary font-medium'>desarrollador Full-Stack o Front-End a tiempo completo o freelancer</span>.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
