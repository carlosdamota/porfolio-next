import React from 'react'

export const Navbar = () => {
  return (
    <header className='border-b border-muted-foreground/10 py-1 sticky top-0 z-50 bg-background/5'>
        <div className='max-w-4xl mx-auto flex justify-between items-center px-4 py-2 '>
        <h1 className='text-2xl font-bold'>Carlos Damota</h1>
        <nav>
            <ul className='flex gap-8 font-semibold text-md text'>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Proyectos</a></li>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Habilidades</a></li>
                <li className='text-muted-foreground hover:text-primary'><a href="#">Contacto</a></li>
            </ul>
        </nav>
        <button className='' >Contratame</button>
        </div>
    </header>
  )
}
