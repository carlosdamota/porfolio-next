import Link from 'next/link'
import React from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'

export const Footer = () => {
  return (
    <section className='flex flex-col gap-4 py-8 
    bg-secondary'>
      

      <div className='max-w-5xl flex flex-col md:flex-row self-center justify-between md:text-left gap-4 items-center ' >
   
  <div className='flex flex-col'>
      <p className= 'text-xl font-semibold'><Link href="/">Carlos Damota</Link></p>
      <p className='text-muted-foreground text-sm'>Desarrollador Full-Stack • MERN Stack</p>
      </div>
      <div className='flex gap-4'>
        <Link href="https://github.com/CarlosDamota" target="_blank" rel="noopener noreferrer">
        <FiGithub className="text-muted-foreground size-6" />
        </Link>
        <Link href="https://www.linkedin.com/in/carlos-damota/" target="_blank" rel="noopener noreferrer">
        <FiLinkedin   className="text-muted-foreground size-6" />
        </Link>
        <Link href="mailto:daymondoomdev@duck.com" target="_blank" rel="noopener noreferrer">
        <MdOutlineEmail className="text-muted-foreground size-7" />
        </Link>
      </div>
      </div>
      <hr className='w-4/5 opacity-10 self-center'></hr>
      <p className='text-muted-foreground text-xs self-center'>© 2025 Carlos Damota. Todos los derechos reservados.</p>
    </section>
  )
}
