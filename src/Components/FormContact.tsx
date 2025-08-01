'use client'
import React from 'react'
import { Button } from './Button'

export const FormContact = () => {
  return (
    <aside className='flex flex-col w-full justify-center items-center gap-4 outline-1 outline-primary/20 rounded-xl bg-card p-8'>
            <form
              action=''
              className='flex flex-col justify-center  gap-4 w-full'
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Nombre</label>
                <input
                  type='text'
                  name='name'
                  placeholder='Nombre'
                  className='py-2 px-4 text-sm outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='Email'
                  className='py-2 px-4 outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor='message'>Mensaje</label>
                <textarea
                  placeholder='Mensaje'
                  className='py-2 px-4 outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                ></textarea>
              </div>
              <Button href='#contact' style='primary-card'>Enviar</Button>
            </form>
          </aside>
          
  )
}
