import React from 'react'

export const About = () => {
  return (
    <section id='about' className=' flex items-center justify-center px-4 py-16 bg-card relative overflow-hidden'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-center items-center px-4 py-2 gap-8 '>
            
                 <img className='w-100 h-75 object-cover object-top rounded-2xl' src="Foto_perfil.jpg" alt="foto_perfil" />   
            
            <article>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Sobre mí
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Con más de 14 años de experiencia en el sector retail, he desarrollado un fuerte 
                compromiso con la calidad y el trabajo en equipo. 
              </p>
              <p>
                Ahora, como desarrollador web full-stack recién graduado de un máster en 
                <span className="text-primary font-medium"> Nuclio Digital School</span>, 
                busco aplicar mi capacidad de organización y mi nueva pasión por la tecnología 
                para construir productos digitales excepcionales.
              </p>
              <p>
                Mi experiencia previa me ha enseñado la importancia de la atención al detalle, 
                la comunicación efectiva y la resolución de problemas bajo presión - habilidades 
                que se traducen perfectamente al desarrollo de software.
              </p>
            </div>
            </article>

        </div>
    </section>
  )
}
