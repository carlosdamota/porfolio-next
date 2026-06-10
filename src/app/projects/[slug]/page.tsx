import { Button } from "@/components/atoms/Button";
import { Carousel } from "@/components/molecules/Carousel";
import { getProjectBySlug } from "@/utils/supabase/queries";
import Link from "next/link";
import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReactMarkdown from "react-markdown";

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
    <article className='min-h-screen bg-background text-foreground py-10 px-4 md:px-8 relative overflow-hidden'>
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
           <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/45 backdrop-blur-md border border-border/60 text-muted-foreground hover:text-primary transition-all hover:-translate-x-1 group text-sm font-medium"
           >
              <AiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" size={16}/> Volver al portafolio
           </Link>
      </div>

      <div className='max-w-7xl mx-auto space-y-12 relative z-10'>
        
        {/* TOP SECTION: Carousel & Metadata */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT: Carousel with Premium Glow Container */}
            <div className='lg:col-span-7 xl:col-span-8 relative group p-2 rounded-3xl bg-gradient-to-tr from-primary/10 via-border/50 to-primary/5 shadow-2xl'>
               <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary/25 to-transparent rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
               <div className="relative rounded-[22px] overflow-hidden bg-card/30 backdrop-blur-sm">
                  <Carousel images={project.gallery} />
               </div>
            </div>

            {/* RIGHT: Metadata & Actions with Glassmorphism */}
            <div className='lg:col-span-5 xl:col-span-4 flex flex-col gap-6 sticky top-24'>
               
               {/* Title & Category Info Card */}
               <div className="p-6 rounded-2xl bg-card/55 backdrop-blur-md border border-border/80 shadow-md space-y-4">
                  <span className="text-[10px] tracking-[0.2em] font-black uppercase text-primary block">PROYECTO DESTACADO</span>
                  <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-foreground bg-clip-text'>
                     {project.title}
                  </h1>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
                     <div>
                        <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">Categoría</span>
                        <span className="text-xs font-semibold text-foreground px-2.5 py-1 rounded-md bg-secondary/80 border border-border/40 inline-block">
                           {project.category}
                        </span>
                     </div>
                     {project.year && (
                        <div>
                           <span className="text-[9px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">Año de Creación</span>
                           <span className="text-sm font-semibold text-foreground inline-block pt-1">
                              {project.year}
                           </span>
                        </div>
                     )}
                  </div>
               </div>

               {/* Tech Stack card */}
               <div className="p-6 rounded-2xl bg-card/55 backdrop-blur-md border border-border/80 shadow-md space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                     {project.projectSkills.map((tech: string) => (
                        <span 
                           key={tech} 
                           className="px-3 py-1 bg-primary/5 text-primary text-xs rounded-lg border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all font-semibold"
                        >
                           {tech}
                        </span>
                     ))}
                  </div>
               </div>

               {/* Action Buttons card */}
               <div className="p-6 rounded-2xl bg-card/55 backdrop-blur-md border border-border/80 shadow-md space-y-3">
                  {project.liveLink && (
                       <Button
                         href={project.liveLink}
                         target='_blank'
                         style='primary-card'
                         className="w-full justify-center py-3.5 text-base font-semibold bg-gradient-to-r from-primary/80 to-primary hover:from-primary hover:to-primary-glow border border-primary/30 transition-all duration-300"
                       >
                         <FiExternalLink className="mr-2" size={18} />
                         Ver Demo En Vivo
                       </Button>
                  )}
                  {project.githubProjectLink && (
                       <Button
                         href={project.githubProjectLink}
                         target='_blank'
                         style='secondary-card'
                         className="w-full justify-center py-3.5 text-base font-semibold border border-border/80 hover:bg-secondary/40 transition-all duration-300"
                       >
                         <FiGithub className="mr-2" size={18} />
                         Ver Código Fuente
                       </Button>
                  )}
               </div>

            </div>
        </div>

        {/* BOTTOM SECTION: Two Column Details / Description */}
        <div className="border-t border-border pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* LEFT: Project specifications card */}
           <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50 space-y-4">
                 <h3 className="text-base font-bold text-foreground border-b border-border pb-3">Ficha Técnica</h3>
                 <ul className="space-y-3.5 text-sm text-muted-foreground">
                    <li className="flex justify-between items-center">
                       <span>Plataforma</span>
                       <span className="font-semibold text-foreground">Web Responsiva</span>
                    </li>
                    <li className="flex justify-between items-center">
                       <span>Despliegue</span>
                       <span className="font-semibold text-foreground">Vercel / Cloud</span>
                    </li>
                    <li className="flex justify-between items-center">
                       <span>Base de Datos</span>
                       <span className="font-semibold text-foreground">Supabase / PostgreSQL</span>
                    </li>
                    <li className="flex justify-between items-center">
                       <span>Arquitectura</span>
                       <span className="font-semibold text-foreground">Next.js App Router</span>
                    </li>
                 </ul>
              </div>
           </div>

           {/* RIGHT: Structured Rich Text Description */}
           <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Sobre el Proyecto</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6 [&_p:first-of-type]:first-letter:text-4xl [&_p:first-of-type]:first-letter:font-black [&_p:first-of-type]:first-letter:text-primary [&_p:first-of-type]:first-letter:mr-2 [&_p:first-of-type]:first-letter:float-left [&_p:first-of-type]:text-lg [&_p:first-of-type]:text-foreground/90">
                 <ReactMarkdown
                    components={{
                       p: ({ children }) => (
                          <p className="text-muted-foreground leading-relaxed mb-4">
                             {children}
                          </p>
                       ),
                       a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow hover:underline font-semibold transition-colors">
                             {children}
                          </a>
                       ),
                       h1: ({ children }) => (
                          <h1 className="text-3xl font-extrabold text-foreground mt-8 mb-4 border-b border-border/40 pb-2">
                             {children}
                          </h1>
                       ),
                       h2: ({ children }) => (
                          <h2 className="text-2xl font-bold text-foreground mt-6 mb-3">
                             {children}
                          </h2>
                       ),
                       h3: ({ children }) => (
                          <h3 className="text-xl font-bold text-foreground mt-4 mb-2">
                             {children}
                          </h3>
                       ),
                       ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                             {children}
                          </ul>
                       ),
                       ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-2 my-4 pl-4 text-muted-foreground">
                             {children}
                          </ol>
                       ),
                       li: ({ children }) => (
                          <li className="leading-relaxed">
                             {children}
                          </li>
                       ),
                       blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary/50 pl-4 italic my-4 text-muted-foreground bg-primary/5 py-2 rounded-r-lg">
                             {children}
                          </blockquote>
                       ),
                       code: ({ children }) => (
                          <code className="bg-secondary/80 text-primary border border-border/50 rounded px-1.5 py-0.5 text-sm font-mono">
                             {children}
                          </code>
                       )
                    }}
                 >
                    {project.description}
                 </ReactMarkdown>
              </div>
           </div>
        </div>

      </div>
    </article>
  );
};

export default Page;
