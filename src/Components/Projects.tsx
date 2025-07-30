import { getProjects } from '@/Services/projectsServices';
import React from 'react'
import { Button } from './Button';
import { FiExternalLink, FiGithub } from 'react-icons/fi';


export const Projects = async () => {
    const projects  = await getProjects();
    console.log(projects);
  return (
    <section className='flex items-center justify-center px-4 py-16 bg-background text-foreground relative overflow-hidden'>
            <div className='max-w-5xl mx-auto flex flex-col justify-center items-center px-4 py-2 gap-8 '>
                 <div className='text-center space-y-4 max-w-2xl'>
            <h2 className='text-5xl font-bold'>Mis Proyectos</h2>
                <p className='text-muted-foreground text-2xl'>Una selección de proyectos que demuestran mis habilidades en desarrollo full-stack</p>
                    </div>

                    <div className='flex flex-wrap justify-center gap-8'> 
                        {projects?.projects.map((project: any) => (
                            <div key={project.id} className='flex flex-col justify-center items-center outline-1 rounded-2xl bg-card gap-4 outline-accent-foreground hover:outline-primary hover:shadow-lg shadow-primary hover:bg-gradient-to-br from-card via-primary-glow/10 via-10% to-card hover:transition-colors duration-700 max-w-sm '>
                                <img src={project.gallery[0]} alt="imagen proyecto" />
                                <div className='flex flex-col justify-center gap-4 p-4'>
                                <h3 className='text-lg font-bold'>{project.title}</h3>
                                <p className='text-muted-foreground line-clamp-4 whitespace-pre-line break-words text-sm '>{project.description}</p>
                                <div className='flex flex-wrap gap-2'>
                                    {project.projectSkills.map((skill: string, index: number) => (
                                        <span key={index} className='text-muted-foreground text-sm bg-muted py-0.5 px-2 rounded hover:bg-primary hover:text-primary-foreground'>{skill}</span>
                                    ))}  
                                </div>
                                </div>
                                <div className='flex gap-4 pb-6'>
                                    <Button style='secondary'><FiGithub />Codigo</Button>
                                    <Button style='primary-card'><FiExternalLink />Demo</Button>
                                    </div>
                                </div>
                        ))}
                    </div>  
            </div>
    </section>
  )
}
