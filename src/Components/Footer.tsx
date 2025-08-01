import React from 'react'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import { MdOutlineEmail } from 'react-icons/md'

export const Footer = () => {
  return (
    <section className='flex flex-col items-center justify-center gap-4 py-8 
    bg-secondary'>
      <div className=' flex flex-col md:flex-row text-center md:text-left gap-4 items-center' >
      <div className='flex flex-col gap-2'>

      <p className= 'text-xl font-semibold'>Carlos Damota</p>
      <p className='text-muted-foreground text-sm'>Desarrollador Full-Stack Junior • MERN Stack</p>
      </div>
      <div className='flex gap-4'>
        <FiGithub className="text-muted-foreground size-6" />
        <FiLinkedin   className="text-muted-foreground size-6" />
        <MdOutlineEmail className="text-muted-foreground size-7" />
      </div>
      </div>
      <hr className='w-4/5 opacity-10'></hr>
      <p className='text-muted-foreground text-xs'>© 2025 Carlos Damota. Todos los derechos reservados.</p>
    </section>
  )
}
