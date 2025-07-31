import { getProjectById } from '@/Services/projectsServices';
import Link from 'next/link';
import React from 'react'

interface ProjectDetailsProps {
    params: { projectID: string };
}
export const page = async ({params}: ProjectDetailsProps) => {
    const {projectID} = params

   
    const { project, error, message } = await getProjectById(projectID); // Ajusta tu función de servicio

  if (error) {
    return (
      <section className='py-16 text-center'>
        <h2 className='text-4xl text-red-500'>Error al cargar el proyecto</h2>
        <p>{message}</p>
        <Link href="/projects" className="text-blue-500 hover:underline mt-4 block">
          Volver a la lista de proyectos
        </Link>
      </section>
    );
  }

  if (!project) {
    return (
      <section className='py-16 text-center'>
        <h2 className='text-4xl'>Proyecto no encontrado</h2>
        <p>El ID de proyecto {projectID} no corresponde a ningún proyecto.</p>
        <Link href="/projects" className="text-blue-500 hover:underline mt-4 block">
          Volver a la lista de proyectos
        </Link>
      </section>
    );
  }

  return (
    <div>page</div>
  )
}
