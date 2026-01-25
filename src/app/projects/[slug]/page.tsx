import { Button } from "@/components/atoms/Button";
import { Carousel } from "@/components/molecules/Carousel";
import { getProjectBySlug } from "@/utils/supabase/queries";
import Link from "next/link";
import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface Params {
  slug: string;
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { project } = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
      description: 'El proyecto que buscas no existe o ha sido movido.',
    };
  }

  const title = `${project.title} | Carlos Damota`;
  const description = project.description?.substring(0, 160) || 'Detalles del proyecto en el portafolio de Carlos Damota.';
  const images = project.gallery && project.gallery.length > 0 ? [project.gallery[0]] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: images.map(img => ({ url: img, alt: project.title })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}
const Page = async ({ params }: { params: Promise<Params> }) => {
  const { slug } = await params;

  const { project, error, message } = await getProjectBySlug(slug);
 
  if (error || !project) {
    return (
      <section className='min-h-screen flex flex-col items-center justify-center p-4 text-center'>
        <h2 className='text-3xl font-bold mb-4'>Proyecto no encontrado</h2>
        <p className="text-muted-foreground mb-6">{message || `El slug "${slug}" no existe.`}</p>
        <Link href='/'>
          <Button style="secondary">
              <AiOutlineArrowLeft className="mr-2"/> Volver a Proyectos
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <article className='min-h-screen bg-background text-foreground py-10 px-4 md:px-8'>
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8">
           <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
              <AiOutlineArrowLeft className="mr-2"/> Volver al portafolio
           </Link>
      </div>

      <div className='max-w-7xl mx-auto space-y-12'>
        
        {/* TOP SECTION: Carousel & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Carousel */}
            <div className='lg:col-span-7 xl:col-span-8'>
               <Carousel images={project.gallery} />
            </div>

            {/* RIGHT: Metadata & Actions */}
            <div className='lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-24'>
               
               {/* Title & Info */}
               <div className="space-y-4 border-b border-border pb-6">
                  <h1 className='text-4xl md:text-5xl font-bold leading-tight'>{project.title}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                     <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {project.category}
                     </span>
                     {project.year && (
                        <span className="text-muted-foreground text-sm">
                            {project.year}
                        </span>
                     )}
                  </div>
               </div>

                {/* Tech Stack */}
               <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                     {project.projectSkills.map((tech: string) => (
                        <span key={tech} className="px-3 py-1.5 bg-secondary/50 text-secondary-foreground text-sm rounded-md border border-border/50">
                           {tech}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col gap-3 pt-4">
                 {project.liveLink && (
                      <Button
                        href={project.liveLink}
                        target='_blank'
                        style='primary-card'
                        className="w-full justify-center py-3 text-lg"
                        >
                        <FiExternalLink className="mr-2" size={20} />
                        Ver Demo
                      </Button>
                 )}
                 {project.githubProjectLink && (
                      <Button
                        href={project.githubProjectLink}
                        target='_blank'
                        style='secondary-card'
                         className="w-full justify-center py-3"
                        >
                        <FiGithub className="mr-2" size={20} />
                        Ver Código
                      </Button>
                 )}
               </div>

            </div>
        </div>

        {/* BOTTOM SECTION: Full Width Description */}
        <div className="border-t border-border pt-12">
           <h2 className="text-2xl font-bold mb-6">Sobre el Proyecto</h2>
           <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">
              {project.description}
           </div>
        </div>

      </div>
    </article>
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
