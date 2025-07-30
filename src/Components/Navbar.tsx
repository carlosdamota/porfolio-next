import React from 'react'
import { Button } from './Button'

export const Navbar = () => {
  return (
    <header className='border-b border-muted-foreground/10 py-1 sticky top-0 z-50 bg-background/90'>
        <div className='max-w-4xl mx-auto flex justify-between items-center px-4 py-2 '>
        <h1 className='text-xl font-bold md:2xl'>Carlos Damota</h1>
        <nav className='items-center hidden md:flex'>
            <ul className='flex gap-4 md:gap-8 font-semibold text-md text'>
                <li className='text-muted-foreground hover:text-primary'><a href="#about">Sobre mí</a></li>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Proyectos</a></li>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Habilidades</a></li>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Contacto</a></li>
            </ul>
        </nav>
        <Button >Contrátame</Button>
        </div>
    </header>
  )
}
