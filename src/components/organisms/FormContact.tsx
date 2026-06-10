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
    <div className='flex flex-col w-full justify-center items-center gap-4 border border-border/50 rounded-2xl bg-card/40 backdrop-blur-sm p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300'>
      <form
        className='flex flex-col justify-center gap-5 w-full'
        onSubmit={handlerSubmit}
      >
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='name' className="text-xs font-black uppercase tracking-wider text-foreground">Nombre</label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handlerChange}
            placeholder='Escribe tu nombre'
            className='py-2.5 px-4 text-sm rounded-xl bg-secondary/25 border border-border/80 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200'
            required
          />
        </div>
        
        <div className='flex flex-col gap-1.5'>
          <label htmlFor='email' className="text-xs font-black uppercase tracking-wider text-foreground">Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={handlerChange}
            placeholder='tu@correo.com'
            className='py-2.5 px-4 text-sm rounded-xl bg-secondary/25 border border-border/80 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200'
            required
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label htmlFor='message' className="text-xs font-black uppercase tracking-wider text-foreground">Mensaje</label>
          <textarea
            name='message'
            id='message'
            value={formData.message}
            onChange={handlerChange}
            placeholder="Cuéntame sobre tu proyecto o idea..."
            className='py-2.5 px-4 text-sm rounded-xl bg-secondary/25 border border-border/80 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-1 focus:ring-primary/20 outline-none transition-all duration-200 resize-none'
            rows={6}
            required
          ></textarea>
        </div>
        
        <button 
          type='submit' 
          className='w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary-glow shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 mt-2 text-sm uppercase tracking-wider'
        >
          Enviar Mensaje
        </button>
        
        {status && (
          <p className={`text-center text-xs font-medium mt-2 p-2.5 rounded-lg ${status.includes('correctamente') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
