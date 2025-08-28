import React from 'react'

export const Skills = () => {

  const skills = [
  { name: "HTML", id: "html-5" },
  { name: "CSS", id: "css-3" },
  { name: "Sass", id: "sass" },
  { name: "JavaScript", id: "javascript" },
  { name: "TypeScript", id: "typescript-icon" },
  { name: "React", id: "react" },
  { name: "Next.js", id: "nextjs-icon" },
  { name: "Node.js", id: "nodejs-icon" },
  { name: "Express", id: "express" },
  { name: "MongoDB", id: "mongodb-icon" },
  { name: "Socket.IO", id: "socket.io" },
  { name: "Tailwind", id: "tailwindcss-icon" },
  { name: "DaisyUI", id: "daisyUI-icon" }, // este no está en la lista oficial, pero puedes usar un fallback
  { name: "Docker", id: "docker-icon" },
  { name: "Git", id: "git-icon" },
  { name: "GitHub", id: "github-icon" },
  { name: "VS Code", id: "visual-studio-code" },
  { name: "Vercel", id: "vercel-icon" },
  { name: "Netlify", id: "netlify-icon" },
  { name: "GitLab", id: "gitlab-icon" }, // está en la lista
  { name: "Postman", id: "postman-icon" },
  { name: "Python", id: "python" },
  { name: "Copilot", id: "github-copilot" } // no aparece en el listado oficial
];


  return (
    <section id='skills' className=' flex items-center justify-center px-4 py-16 bg-card relative overflow-hidden'>
        <div className='max-w-5xl mx-auto flex flex-col  justify-center items-center px-4 py-2 gap-8 '>

        <article className='flex flex-col gap-4'>
          <div className='max-w-2xl flex flex-col text-center self-center '>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Mis Habilidades
            </h2>
            <p className='text-muted-foreground text-2xl'>Stack tecnológico especializado en MERN y tecnologías modernas para desarrollo web</p>
          </div>
            
          <div className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 flex-wrap  gap-6  mt-6'>

          {skills.map((skill) => (
            <div key={skill.id} className="flex outline-1 outline-primary/10 hover:outline-primary items-center space-x-2  px-4 py-2 rounded-lg ">
              <div className='flex justify-center items-center glass rounded-md p-1  min-w-6'>

              <img className='size-4 sm:size-6' src={`https://cdn.svglogos.dev/logos/${skill.id}.svg`} alt="logo skill tech "/>
              </div>
              <span className="text-primary text-sm sm:text-md">{skill.name}</span>
            </div>
          ))}
          </div>
        </article>
        </div>
    </section>
  )
}
