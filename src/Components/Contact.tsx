
import Link from "next/link";
import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

import { FormContact } from "./FormContact";

export const Contact = () => {
  return (
    <section
      id='contact'
      className='max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8'
    >
      <div className='flex flex-col justify-center items-center gap-8 '>
        <div className='text-center space-y-4 max-w-2xl'>
          <h2 className='text-4xl font-bold'>Hablemos</h2>
          <p className='text-muted-foreground text-xl'>
            Si tienes alguna pregunta o quieres trabajar juntos, no dudes en contactarme.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
          <FormContact />
          <aside className='flex flex-col w-full justify-center items-center gap-4'>
            <h3 className='text-xl font-bold '>También puedes contactarme a traves de:</h3>
            <ul className='flex flex-col gap-4 w-full'>
                <Link href="https://github.com/CarlosDamota" target="_blank">
                <li className='flex gap-4 items-center glass rounded-xl py-4 px-4 sm:px-8 hover:shadow-lg hover:shadow-primary/40'>
                    <span className="flex justify-center items-center size-14 sm:size-16 bg-secondary/40 rounded-xl"><FiLinkedin   className="text-primary size-6" /></span>
                    <div>
                    <h4 className='text-lg font-bold'>
Linkdin</h4>
                    <p className='text-muted-foreground text-sm'>Conectemos profesionalmente</p>
                    </div>
                </li>
                </Link>
                <Link href="https://github.com/CarlosDamota" target="_blank">
                <li className='flex gap-4 items-center glass rounded-xl  py-4 px-4 sm:px-8  hover:shadow-lg hover:shadow-primary/40'>
                    <span className="flex justify-center items-center size-14 sm:size-16 bg-secondary/40 rounded-xl"><FiGithub className="text-primary size-6" /></span>
                    <div>
                    <h4 className='text-lg font-bold'>Github</h4>
                    <p className='text-muted-foreground text-sm '>Ve mis proyectos y código</p>
                    </div>
                </li>
                </Link>
                <Link href="mailto:daimondoomdev@duck.com" target="_blank">
                <li className='flex gap-4 items-center glass rounded-xl  py-4 px-4 sm:px-8  hover:shadow-lg hover:shadow-primary/40'>
                    <span className="flex justify-center items-center size-14 sm:size-16 bg-secondary/40 rounded-xl"><MdOutlineEmail className="text-primary size-6" /></span>
                    <div>
                    <h4 className='text-lg font-bold'>Email</h4>
                    <p className='text-muted-foreground text-sm'>Escribeme directamente</p>
                    </div>
                </li>
                </Link>
            </ul>
            <article className="flex flex-col gap-4 w-full mt-8 outline-1 outline-primary/20 rounded-xl bg-card p-8">
                <h3 className='text-xl font-medium '>¿Buscas talento junior?</h3>
                <p className="text-muted-foreground text-sm ">Estoy disponible para oportunidades full-time o colaboraciones. Mi experiencia en retail + formación técnica me permite aportar una perspectiva única a tu equipo.</p>
            </article>
            </aside>
        </div>
      </div>
    </section>
  );
};
