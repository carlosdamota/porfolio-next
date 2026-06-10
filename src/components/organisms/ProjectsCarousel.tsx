"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CardsButtons } from "../molecules/CardsButtons";
import { stripMarkdown } from "@/utils/text";

interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string;
  year?: number;
  description: string;
  gallery: string[];
  projectSkills: string[];
  githubProjectLink?: string;
  liveLink?: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { firstElementChild } = carouselRef.current;
      if (firstElementChild) {
        // Scroll by the width of one card + its gap (24px matching gap-6)
        const cardWidth = (firstElementChild as HTMLElement).clientWidth + 24;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative w-full group">
      {/* Navigation Arrows positioned OUTSIDE the cards viewport but absolute on the container edges */}
      {/* Visible on hover on desktop, hidden on mobile/tablet because swipe is native */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hover:-translate-x-14 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-primary text-white hover:text-primary-foreground border border-white/10 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hidden md:flex group/btn hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none"
        aria-label="Anterior proyecto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 transition-transform duration-300 group-hover/btn:-translate-x-1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hover:translate-x-14 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-primary text-white hover:text-primary-foreground border border-white/10 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 hidden md:flex group/btn hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary outline-none"
        aria-label="Siguiente proyecto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Carousel container */}
      <div
        ref={carouselRef}
        className="carousel w-full gap-6 py-4 scrollbar-none scroll-smooth overflow-x-auto snap-x snap-mandatory"
      >
        {projects.map((project: Project, index: number) => (
          <div
            key={project._id}
            id={`project-slide-${index}`}
            className="carousel-item relative w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] shrink-0 snap-start"
          >
            <div className="flex flex-col justify-between items-center rounded-2xl bg-card border border-border/50 hover:border-primary/40 gap-4 hover:shadow-xl hover:shadow-primary/5 hover:bg-gradient-to-br from-card via-primary/5 to-card transition-all duration-300 w-full overflow-hidden group/card flex-1 min-h-[460px]">
              <div className="w-full h-48 overflow-hidden shrink-0 relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-card/30 to-transparent z-10" />
                 <Image
                   className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                   src={project.gallery[0]}
                   alt={`Imagen del proyecto ${project.title}`}
                   width={500}
                   height={300}
                 />
              </div>
              <div className="flex flex-col justify-between gap-4 px-5 pb-5 pt-1 flex-1 w-full">
                <Link
                  href={`/projects/${project.slug}`}
                  passHref
                  className="space-y-3 flex-1 flex flex-col justify-between group/link"
                >
                  <div className="space-y-2">
                     <div className="flex flex-wrap justify-between items-start gap-1">
                       <h3 className="text-lg font-bold group-hover/link:text-primary transition-colors line-clamp-1">{project.title}</h3>
                       <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                           <span>{project.category}</span>
                           {project.year && (
                                <>
                                   <span>•</span>
                                   <span>{project.year}</span>
                                </>
                           )}
                       </div>
                     </div>
                     <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed font-light">
                       {stripMarkdown(project.description)}
                     </p>
                  </div>
                </Link>
                <div className="space-y-4 pt-2 border-t border-border/30 mt-auto">
                   {/* Tech Tags */}
                   <div className="flex flex-wrap gap-1.5">
                     {project.projectSkills.slice(0, 3).map((tech: string) => (
                       <span key={tech} className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default">
                         {tech}
                       </span>
                     ))}
                     {project.projectSkills.length > 3 && (
                       <span className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
                         +{project.projectSkills.length - 3}
                       </span>
                     )}
                   </div>
                   <CardsButtons
                     githubProjectLink={project.githubProjectLink}
                     liveLink={project.liveLink}
                   />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
