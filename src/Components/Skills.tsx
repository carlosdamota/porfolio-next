import React from 'react'

export const Skills = () => {

  const skills = [
  { name: "HTML", id: "html" },
  { name: "CSS", id: "css" },
  { name: "Sass", id: "sass" },
  { name: "JavaScript", id: "js" },
  { name: "TypeScript", id: "ts" },
  { name: "React", id: "react" },
  { name: "Next.js", id: "nextjs" },
  { name: "Node.js", id: "nodejs" },
  { name: "Express", id: "express" },
  { name: "MongoDB", id: "mongodb" },
  { name: "Socket.IO", id: "socketio" },
  { name: "Tailwind CSS", id: "tailwind" },
  { name: "DaisyUI", id: "daisyui" }, // este no está en la lista oficial, pero puedes usar un fallback
  { name: "Docker", id: "docker" },
  { name: "Git", id: "git" },
  { name: "GitHub", id: "github" },
  { name: "VS Code", id: "vscode" },
  { name: "Vercel", id: "vercel" },
  { name: "Netlify", id: "netlify" },
  { name: "Render", id: "render" }, // está en la lista
  { name: "Postman", id: "postman" },
  { name: "Python", id: "py" },
  { name: "Warp", id: "warp" } // no aparece en el listado oficial
];


  return (
    <section id='about' className=' flex items-center justify-center px-4 py-16 bg-card relative overflow-hidden'>
        <div className='max-w-5xl mx-auto flex flex-col  justify-center items-center px-4 py-2 gap-8 '>

        <article className='flex flex-col gap-4'>
          <div className='max-w-2xl flex flex-col text-center '>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Mis Habilidades
            </h2>
            <p className='text-muted-foreground text-2xl'>Stack tecnológico especializado en MERN y tecnologías modernas para desarrollo web</p>
          </div>
            
          <div className='grid grid-cols-2 md:grid-cols-4 flex-wrap  gap-6  mt-6'>

          {skills.map((skill) => (
            <div key={skill.id} className="flex outline-1 outline-primary/10 hover:outline-primary items-center space-x-2  px-4 py-2 rounded-lg ">
              <img className='size-4 sm:size-8' src={`https://skillicons.dev/icons?i=${skill.id}`} alt="logo skill tech "/>
              <span className="text-primary text-sm sm:text-md">{skill.name}</span>
            </div>
          ))}
          </div>
        </article>
        </div>
    </section>
  )
}
