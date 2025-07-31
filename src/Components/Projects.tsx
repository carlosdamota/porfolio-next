import { getProjects } from '@/Services/projectsServices';
import React from 'react'
import { Button } from './Button';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import Link from 'next/link';
import { ProjectSkills } from './ProjectSkills';


export const Projects = async () => {
    const result  = await getProjects();


  const projects = result.projects || [];
  console.log(projects);

    
  return (
    <section id='projects' className='flex items-center justify-center px-4 py-16 bg-background text-foreground relative overflow-hidden'>
            <div className=' mx-auto flex flex-col justify-center items-center px-4 py-2 gap-8 '>
                 <div className='text-center space-y-4 max-w-2xl'>
            <h2 className='text-5xl font-bold'>Mis Proyectos</h2>
                <p className='text-muted-foreground text-2xl'>Una selección de proyectos que demuestran mis habilidades en desarrollo full-stack</p>
                    </div>

                    <div className='flex flex-wrap justify-center gap-8'> 
                        {projects.map((project: any) => (
                            
                            <div key={project._id} className='flex flex-col justify-between items-center outline-1 rounded-2xl bg-card gap-4 outline-accent-foreground hover:outline-primary hover:shadow-lg shadow-primary hover:bg-gradient-to-br from-card via-primary-glow/10 via-10% to-card hover:transition-colors duration-700 max-w-sm  overflow-hidden '>
                                <img className='w-full h-48 object-cover' src={project.gallery[0]} alt="imagen proyecto" />
                                <div className='flex flex-col justify-between   gap-4 px-6 pt-2 pb-6 flex-1'>
                                <Link href={`/${project._id}`}  passHref>
                                    <div className='flex flex-wrap justify-between items-center'>
                                <h3 className='text-lg font-bold'>{project.title}</h3>
                                <p className='text-muted-foreground text-xs'>{project.category}</p>

                                    </div>
                                <p className='text-muted-foreground line-clamp-4 whitespace-pre-line break-words text-sm flex-1'>{project.description}</p>
                                </Link>
                                <ProjectSkills projectSkills={project.projectSkills} />
                                
                                </div>
                                </div>
                                    
                        ))}
                    </div>  
            </div>
    </section>
  )
}
