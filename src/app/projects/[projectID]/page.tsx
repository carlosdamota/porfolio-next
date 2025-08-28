import { Button } from "@/Components/Button";
import { ProjectSkills } from "@/Components/ProjectSkills";
import { getProjectById } from "@/Services/projectsServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Params {
  projectID: string;
}
const Page = async ({ params }: { params: Promise<Params> }) => {
  const { projectID } = await params;

  const { project, error, message } = await getProjectById(projectID); // Ajusta tu función de servicio
 
  if (error) {
    return (
      <section className='py-16 text-center'>
        <h2 className='text-4xl text-red-500'>Error al cargar el proyecto</h2>
        <p>{message}</p>
        <Link
          href='/projects'
          className='text-blue-500 hover:underline mt-4 block'
        >
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
        <Link
          href='/projects'
          className='text-blue-500 hover:underline mt-4 block'
        >
          Volver a la lista de proyectos
        </Link>
      </section>
    );
  }

  return (
    <section className='flex flex-col items-center justify-between py-16 bg-background text-foreground relative overflow-hidden'>
     
      <div className='m-auto rounded-2xl bg-card  max-w-6xl mx-auto flex flex-col justify-start items-center  gap-8 pb-8 pt-[-10] overflow-hidden'>
        <div className='carousel w-full h-100 sm:h-200 '>
          {project.gallery.map((image: string, index: number) => (
            <div
              id={`slide${index + 1}`}
              className='carousel-item relative w-full h-100 sm:h-200'
              key={index}
            >
              <Image
                alt='imagenes proyecto'
                src={image}
                className='w-full object-cover'
                width={2560}
                height={1440}
              />
              <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                <a
                  href={`#slide${index === 0 ? project.gallery.length : index}`}
                  className='btn btn-circle'
                >
                  ❮
                </a>
                <a
                  href={`#slide${index === project.gallery.length - 1 ? 1 : index + 2}`}
                  className='btn btn-circle'
                >
                  ❯
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col justify-between items-center px-4 sm:px-8 pt-2  gap-8 '>
          <div className=' space-y-4 '>
            <div className='flex flex-wrap justify-between items-center'>
              <h2 className='text-3xl font-bold'>{project.title}</h2>
              <p className='text-muted-foreground text-sm'>{project.category}</p>
            </div>
            <div className="sm:flex gap-4 sm:gap-8 ">

            <p className='text-muted-foreground whitespace-pre-line break-words text-md'>
              {project.description}
            </p>
            <div className="sm:border-l sm:border-muted-foreground/10 sm:max-w-xs sm:pl-8 flex flex-col gap-8">

            <ProjectSkills projectSkills={project.projectSkills} />
            <div className='flex sm:flex-col justify-center gap-4'>
              <Button
                href={`${project.githubProjectLink}`}
                target='_blank'
                style='secondary-card'
                >
                <FiGithub />
                Codigo
              </Button>
              <Button
                href={`${project.liveLink}`}
                target='_blank'
                style='primary-card'
                >
                <FiExternalLink />
                Demo
              </Button>
                  </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;

{
  /* <div className='max-w-3xl mx-auto flex flex-col justify-center items-center px-4 py-2 gap-8 '>
        <div className='text-center space-y-4 max-w-2xl'>
          <h2 className='text-5xl font-bold'>{project.title}</h2>
          <p className='text-muted-foreground text-2xl'>{project.description}</p> 
        </div>
        </div> */
}
