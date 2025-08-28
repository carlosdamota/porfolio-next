import React from 'react'
interface Project {
    projectSkills: string[]
}
export const ProjectSkills = ({projectSkills}: Project) => {
  return (
    <div className='flex flex-col gap-2'>
                                    <p className='text-neutral-100'>Tecnologias:</p>
                                    <div className='flex flex-wrap gap-4'>
                                    {projectSkills.map((skill: string, index) => (  
                                        <span key={index} className='text-muted-foreground text-sm bg-muted py-0.5 px-2 rounded hover:bg-primary hover:text-primary-foreground'>{skill}</span>
                                        
                                    ))}  
                                    </div>
                                </div>
  )
}
