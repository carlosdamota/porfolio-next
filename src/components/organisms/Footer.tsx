import Link from 'next/link'
import React from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'

export const Footer = () => {
  return (
    <footer className='flex flex-col gap-4 py-8 bg-secondary'>
      <div className='max-w-5xl w-full mx-auto px-4 flex flex-col md:flex-row justify-between md:text-left gap-4 items-center'>
        <div className='flex flex-col items-center md:items-start'>
          <p className='text-xl font-semibold'>
            <Link href="/" className="hover:text-primary transition-colors">Carlos Damota</Link>
          </p>
          <p className='text-muted-foreground text-sm'>Desarrollador Full-Stack • MERN Stack</p>
        </div>
        <div className='flex gap-4 items-center'>
          <Link
            href="https://github.com/CarlosDamota"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de GitHub de Carlos Damota"
            className="p-2 rounded-lg hover:text-primary hover:bg-card/40 transition-colors"
          >
            <FiGithub className="size-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/carlos-damota/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Perfil de LinkedIn de Carlos Damota"
            className="p-2 rounded-lg hover:text-primary hover:bg-card/40 transition-colors"
          >
            <FiLinkedin className="size-6 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link
            href="mailto:daymondoomdev@duck.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar correo electrónico a Carlos Damota"
            className="p-2 rounded-lg hover:text-primary hover:bg-card/40 transition-colors"
          >
            <MdOutlineEmail className="size-7 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
      <hr className='w-4/5 opacity-10 self-center' />
      <p className='text-muted-foreground text-xs self-center'>© 2026 Carlos Damota. Todos los derechos reservados.</p>
    </footer>
  )
}
