import React from "react";
import { AiOutlineDownload, AiOutlineMail } from "react-icons/ai";
import { Button } from "./Button";

export const Hero = () => {
  return (
    <section className='min-h-screen flex items-center justify-center px-4 py-16 bg-background relative overflow-hidden'>
      <div
        className='
        absolute top-20 left-20
        w-32 h-32
        bg-gradient-to-bl from-secondary to-primary-glow opacity-10 rounded-full
        animate-[float_5s_ease-in-out_infinite]
        delay-100
      '
      />
      <div
        className='
        absolute top-20 left-20
        w-30h-34
        bg-gradient-to-bl from-secondary-foreground to-secondary opacity-5 rounded-full
        animate-[morph_8s_ease-in-out_infinite]
        delay-200
      '
      />
      <div
        className='
        absolute bottom-20 right-30
        w-24 h-24
        bg-gradient-to-bl from-primary to-secondary opacity-5 rounded-full
        animate-[float_3s_ease-in-out_infinite]
        delay-100
      '
      />
      <div
        className='
        absolute bottom-20 right-30
        w-20 h-20
        bg-gradient-to-bl from-primary to-secondary opacity-10 rounded-full
        animate-[morph_8s_ease-in-out_infinite]
        delay-300
      '
      />

      <div
        className='
        absolute top-1/3 right-1/4
        w-16 h-16
       bg-gradient-to-bl from-primary to-primary-glow opacity-10 rounded-full
       animate-[float_3s_ease-in-out_infinite]
        delay-100
      '
      />
      <div
        className='
        absolute top-1/3 right-1/4
        w-14 h-14
       bg-gradient-to-bl from-secondary to-primary-glow opacity-10 rounded-full
       animate-[morph_2s_ease-in-out_infinite]
        delay-200
      '
      />

      <div className='max-w-3xl text-center space-y-2 z-10'>
        <h1 className='text-6xl font-bold text-primary mb-4'>Carlos Damota</h1>
        <p className='text-2xl font-normal text-muted-foreground'>
          Desarrollador Front-End especializado en{" "}
          <span className='text-primary font-semibold'>
            React, Next.js y soluciones web modernas
          </span>
        </p>
        <div className='flex justify-center gap-8 mt-8'>
          <Button href='/#contact'>
            <AiOutlineMail className='size-5' /> Contrátame
          </Button>
          <Button
            download
            style='secondary'
            href='/Curriculum Carlos Damota Front-end.pdf'
            target='_blank'
          >
            <AiOutlineDownload className='size-5' />
            Descargar CV
          </Button>
        </div>
      </div>
    </section>
  );
};
