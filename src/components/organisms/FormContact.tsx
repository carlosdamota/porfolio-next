'use client'
import React, { useState } from 'react'

// interface formContactProps {
//   name: string,
//   email: string,
//   message: string
// }
export const FormContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Enviando...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if(res.ok) {
      setStatus("Mensaje enviado correctamente ✅");
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus("Error al enviar el mensaje ❌");
    }
  }

 const handlerChange =  (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
   
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <aside className='flex flex-col w-full justify-center items-center gap-4 outline-1 outline-primary/20 rounded-xl bg-card p-8 hover:shadow-lg hover:shadow-primary/40'>
            <form
              action=''
              className='flex flex-col justify-center  gap-4 w-full'
              onSubmit={handlerSubmit}
            >
              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Nombre</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handlerChange}
                  placeholder='Nombre'
                  className='py-2 px-4 text-sm outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={formData.email}
                  onChange={handlerChange}
                  className='py-2 px-4 outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor='message'>Mensaje</label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handlerChange}
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                  className='py-2 px-4 outline-1 outline-primary/20 rounded-xl bg-card text-foreground placeholder:text-muted-foreground'
                  rows={9}
                ></textarea>
              </div>
              <button type='submit' className='btn rounded-xl glass bg-primary/5 hover:bg-primary-glow/10 hover:shadow-lg hover:shadow-primary/40 hover:scale-105 transition-transform duration-200'>Enviar</button>
              {status && <p>{status}</p>}
            </form>
          </aside>
          
  )
}
