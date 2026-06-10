import React from "react";
import { AiOutlineDownload, AiOutlineMail } from "react-icons/ai";
import { Button } from "../atoms/Button";

export const Hero = () => {
  return (
    <section className='min-h-screen flex items-center justify-center px-4 py-16 bg-background relative overflow-hidden'>
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Animated abstract floating glass shapes */}
      <div
        className='
        absolute top-20 left-10 md:left-20
        w-28 h-28 md:w-36 md:h-36
        bg-gradient-to-tr from-primary/10 via-primary-glow/5 to-transparent
        rounded-full border border-white/5 backdrop-blur-3xl shadow-2xl shadow-primary/5
        animate-[float_6s_ease-in-out_infinite]
        pointer-events-none
      '
      />
      <div
        className='
        absolute top-36 left-16 md:left-28
        w-20 h-20 md:w-24 md:h-24
        bg-gradient-to-bl from-accent/10 via-primary/5 to-transparent
        rounded-full border border-white/5 backdrop-blur-2xl shadow-xl shadow-accent/5
        animate-[morph_10s_ease-in-out_infinite]
        pointer-events-none
        delay-300
      '
      />
      <div
        className='
        absolute bottom-24 right-12 md:right-28
        w-24 h-24 md:w-32 md:h-32
        bg-gradient-to-tr from-accent/10 via-primary-glow/5 to-transparent
        rounded-full border border-white/5 backdrop-blur-3xl shadow-2xl shadow-accent/5
        animate-[float_5s_ease-in-out_infinite]
        pointer-events-none
        delay-150
      '
      />
      <div
        className='
        absolute bottom-36 right-8 md:right-20
        w-16 h-16 md:w-20 md:h-20
        bg-gradient-to-br from-primary/10 via-accent/5 to-transparent
        rounded-full border border-white/5 backdrop-blur-2xl shadow-xl shadow-primary/5
        animate-[morph_8s_ease-in-out_infinite]
        pointer-events-none
        delay-500
      '
      />

      {/* Main content wrapper */}
      <div className='max-w-4xl text-center space-y-6 z-10 px-4 animate-fade-in'>
        <span className="text-[11px] font-black tracking-[0.3em] uppercase text-primary bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
           BIENVENIDO A MI PORTAFOLIO
        </span>
        
        <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground leading-none'>
          Carlos <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-glow to-primary'>Damota</span>
        </h1>
        
        <p className='text-lg sm:text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
          Desarrollador <span className="text-foreground font-semibold">Full-Stack</span> especializado en crear{" "}
          <span className='text-primary font-medium border-b border-primary/20 pb-0.5 hover:border-primary transition-colors duration-300'>
            interfaces interactivas, escalables y modernas.
          </span>
        </p>
        
        <div className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-4'>
          <Button href='/#contact' className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/40 py-3 px-8 text-base font-semibold">
            <AiOutlineMail className='size-5 mr-1' /> Contrátame
          </Button>
          <Button
            download
            style='secondary'
            href='/Curriculum_Carlos_Damota.pdf'
            target='_blank'
            className="w-full sm:w-auto border border-border/80 hover:bg-secondary/40 py-3 px-8 text-base font-semibold"
          >
            <AiOutlineDownload className='size-5 mr-1' />
            Descargar CV
          </Button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-primary transition-all duration-300 cursor-pointer z-20 hover:scale-105"
        aria-label="Desplazar hacia abajo"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Descubrir</span>
        <div className="w-5 h-9 border border-current rounded-full flex justify-center p-1 opacity-70">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </a>
    </section>
  );
};
