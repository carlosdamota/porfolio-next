import Link from "next/link";
import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

import { FormContact } from "./FormContact";

export const Contact = () => {
  return (
    <section
      id='contact'
      className='max-w-6xl mx-auto py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden'
    >
      <div className='flex flex-col justify-center items-center gap-12 w-full'>
        <div className='text-center space-y-3 max-w-3xl'>
          <span className="text-[10px] tracking-[0.2em] font-black uppercase text-primary block">¿TIENES UN PROYECTO?</span>
          <h2 className='text-4xl md:text-5xl font-black text-foreground tracking-tight'>Ponte en Contacto</h2>
          <p className='text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed'>
            ¿Buscas un desarrollador Front-End/Full-Stack? Contáctame y hablemos sobre cómo puedo ayudarte a construir soluciones excepcionales.
          </p>
        </div>
        
        <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'>
          {/* Form wrapper */}
          <div className="lg:col-span-7 w-full h-full">
            <FormContact />
          </div>
          
          {/* Aside social networking links */}
          <aside className='lg:col-span-5 flex flex-col w-full justify-between gap-6 h-full'>
            <div className="space-y-4">
              <h3 className='text-xs font-black uppercase tracking-[0.15em] text-primary/80 border-l-2 border-primary/50 pl-3'>
                Canales de Comunicación
              </h3>
              
              <ul className='flex flex-col gap-4 w-full'>
                <Link
                  href='https://www.linkedin.com/in/carlos-damota/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="group"
                >
                  <li className='flex gap-4 items-center bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01]'>
                    <span className='flex justify-center items-center size-12 sm:size-14 bg-secondary/40 border border-border/40 rounded-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300'>
                      <FiLinkedin className='text-primary size-5' />
                    </span>
                    <div>
                      <h4 className='text-base font-bold text-foreground group-hover:text-primary transition-colors'>LinkedIn</h4>
                      <p className='text-muted-foreground text-xs font-light'>Conectemos profesionalmente</p>
                    </div>
                  </li>
                </Link>
                
                <Link
                  href='https://github.com/CarlosDamota'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="group"
                >
                  <li className='flex gap-4 items-center bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01]'>
                    <span className='flex justify-center items-center size-12 sm:size-14 bg-secondary/40 border border-border/40 rounded-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300'>
                      <FiGithub className='text-primary size-5' />
                    </span>
                    <div>
                      <h4 className='text-base font-bold text-foreground group-hover:text-primary transition-colors'>GitHub</h4>
                      <p className='text-muted-foreground text-xs font-light'>Ve mis proyectos y código</p>
                    </div>
                  </li>
                </Link>
                
                <Link
                  href='mailto:daimondoomdev@duck.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="group"
                >
                  <li className='flex gap-4 items-center bg-card/50 hover:bg-card border border-border/50 hover:border-primary/30 rounded-2xl py-4 px-5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01]'>
                    <span className='flex justify-center items-center size-12 sm:size-14 bg-secondary/40 border border-border/40 rounded-xl group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300'>
                      <MdOutlineEmail className='text-primary size-5' />
                    </span>
                    <div>
                      <h4 className='text-base font-bold text-foreground group-hover:text-primary transition-colors'>Email</h4>
                      <p className='text-muted-foreground text-xs font-light'>Escríbeme directamente</p>
                    </div>
                  </li>
                </Link>
              </ul>
            </div>
            
            <article className='flex flex-col gap-3 w-full border border-border/50 bg-secondary/10 hover:border-primary/30 rounded-2xl p-6 transition-all duration-300'>
              <h3 className='text-sm font-bold text-foreground'>¿Buscas incorporar talento?</h3>
              <p className='text-muted-foreground text-xs leading-relaxed font-light'>
                Estoy disponible para oportunidades a tiempo completo (Full-Time) o proyectos freelance. Mi experiencia previa en retail sumada a mi rigurosa formación en desarrollo me permite aportar valor inmediato y perspectiva de negocio a tu equipo.
              </p>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
};
