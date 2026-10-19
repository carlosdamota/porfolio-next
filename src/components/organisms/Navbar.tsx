'use client'

import React, { useState } from 'react'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className='border-b border-muted-foreground/10 py-1 sticky top-0 z-50 bg-background/80 backdrop-blur-md'>
      <div className='max-w-5xl mx-auto flex justify-between items-center px-4 py-2'>
        <span className='text-xl font-bold md:text-2xl'>
          <Link href="/" onClick={closeMenu}>Carlos Damota</Link>
        </span>

        {/* Desktop navigation */}
        <nav className='items-center hidden md:flex' aria-label="Navegación principal">
          <ul className='flex gap-4 md:gap-8 font-semibold text-md'>
            <li className='text-muted-foreground hover:text-primary transition-colors'>
              <Link href="/#about">Sobre mí</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary transition-colors'>
              <Link href="/#experience">Experiencia</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary transition-colors'>
              <Link href="/#projects">Proyectos</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary transition-colors'>
              <Link href="/#skills">Habilidades</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary transition-colors'>
              <Link href="/#contact">Contacto</Link>
            </li>
          </ul>
        </nav>

        <div className='hidden md:block'>
          <Button href='/#contact'>Contrátame</Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-card focus:outline-none focus:ring-2 focus:ring-primary'
          aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          className='md:hidden border-t border-border/50 bg-background/95 px-6 py-4'
          aria-label="Navegación móvil"
        >
          <ul className='flex flex-col gap-4 font-semibold text-base mb-4'>
            <li className='text-muted-foreground hover:text-primary'>
              <Link href="/#about" onClick={closeMenu}>Sobre mí</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary'>
              <Link href="/#experience" onClick={closeMenu}>Experiencia</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary'>
              <Link href="/#projects" onClick={closeMenu}>Proyectos</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary'>
              <Link href="/#skills" onClick={closeMenu}>Habilidades</Link>
            </li>
            <li className='text-muted-foreground hover:text-primary'>
              <Link href="/#contact" onClick={closeMenu}>Contacto</Link>
            </li>
          </ul>
          <Button href='/#contact' className='w-full' onClick={closeMenu}>
            Contrátame
          </Button>
        </nav>
      )}
    </header>
  )
}
