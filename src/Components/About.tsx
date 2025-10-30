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
              Soy desarrollador Front-End con formación especializada en{" "}
              <span className='text-primary font-medium'>React, Next.js y JavaScript moderno</span>.
              Cuento con más de 14 años de experiencia en gestión de proyectos, comunicación
              efectiva y resolución de problemas en entornos empresariales. Esta combinación de
              habilidades me permite abordar proyectos web con una perspectiva única que equilibra
              requisitos técnicos con necesidades de usuario.
            </p>
            <p>
              Me especializo en construir{" "}
              <span className='text-primary font-medium'>
                aplicaciones web escalables, responsivas y de alto rendimiento
              </span>
              , con énfasis en experiencia de usuario, accesibilidad y mejores prácticas de
              desarrollo. Busco colaborar en proyectos desafiantes como{" "}
              <span className='text-primary font-medium'>
                desarrollador Front-End a tiempo completo o freelancer
              </span>
              .
            </p>
            <p>
              Proactivo, atento a los detalles y comprometido con la calidad del código. Siempre en
              busca de optimizaciones, nuevas tecnologías y metodologías que mejoren la experiencia
              del usuario y la eficiencia del desarrollo.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
