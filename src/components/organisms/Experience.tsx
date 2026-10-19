'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FiBriefcase, FiAward, FiExternalLink, FiGithub, FiTrendingUp, FiCheckCircle } from 'react-icons/fi'

interface ExperienceItem {
  role: string
  organization: string
  period: string
  type: 'saas' | 'client' | 'team' | 'operations'
  description: string
  highlights: string[]
  metrics?: string[]
  technologies: string[]
  links?: { label: string; url: string; icon: 'web' | 'github' }[]
}

interface EducationItem {
  degree: string
  institution: string
  year: string
  description: string
  skills: string[]
  badge?: string
}

export const Experience = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work')

  const experiences: ExperienceItem[] = [
    {
      role: 'Fundador & Lead Developer',
      organization: 'Fittwiz (SaaS)',
      period: '2025 — Actualidad',
      type: 'saas',
      description: 'PWA de fitness y nutrición potenciada por Inteligencia Artificial agéntica.',
      highlights: [
        'Arquitectura basada en LLMs (Gemini, Google AI Studio) para generación de rutinas hiper-personalizadas y análisis nutricional por imagen.',
        'Integración completa de pagos recurrentes con Stripe y sincronización con Strava API.',
        'Optimización de carga y renderizado en Next.js/PWA.',
      ],
      metrics: ['-30% tiempo de carga', 'AI Agéntica', 'Stripe Subscriptions'],
      technologies: ['Next.js', 'TypeScript', 'Gemini AI', 'Tailwind CSS', 'Stripe', 'PWA'],
    },
    {
      role: 'Fundador & Desarrollador Principal',
      organization: 'Kidpoints (SaaS)',
      period: '2025',
      type: 'saas',
      description: 'PWA de gestión conductual y refuerzo positivo diseñada para familias con niños neurodivergentes.',
      highlights: [
        'Diseño y despliegue de arquitectura serverless de alta disponibilidad en Google Cloud Run y Firebase.',
        'Flujo automatizado de transacciones con Stripe y notificaciones por correo transaccional mediante Resend.',
      ],
      metrics: ['99.9% disponibilidad', 'Cloud Run', 'Firebase Auth/DB'],
      technologies: ['React', 'TypeScript', 'Cloud Run', 'Firebase', 'Stripe', 'Resend'],
    },
    {
      role: 'Full-Stack Developer',
      organization: 'Elena Art (E-commerce)',
      period: '2025',
      type: 'client',
      description: 'Plataforma de comercio electrónico para artista independiente con back-office de pedidos y encargos.',
      highlights: [
        'Desarrollo asistido por metodología SDD y TDD estricto con OpenCode.',
        'Gestión integral de catálogo, cobros mediante Stripe y base de datos relacional en Supabase.',
      ],
      metrics: ['TDD asistido', 'E-commerce', 'Back-office'],
      technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Stripe', 'Resend'],
    },
    {
      role: 'Desarrollador Web (Scrum)',
      organization: 'Codepply (MERN Stack)',
      period: '2025',
      type: 'team',
      description: 'Plataforma para gestión y evaluación de perfiles técnicos desarrollada en equipo ágil.',
      highlights: [
        'Implementación de sistema de mensajería síncrona en tiempo real mediante WebSockets.',
        'Optimización en la transmisión de eventos y gestión de salas colaborativas.',
      ],
      metrics: ['-60% latencia en chat', 'WebSockets', 'Metodología Scrum'],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Scrum'],
    },
    {
      role: 'Liderazgo Operativo & Automatización de Software',
      organization: 'Cash Converters España',
      period: '2010 — 2024 · 14 años',
      type: 'operations',
      description: '14 años liderando operaciones retail de alta demanda, logística, e-commerce y desarrollo de herramientas internas.',
      highlights: [
        'Intra-emprendimiento técnico: Creación autogestionada de una herramienta web en JavaScript Vanilla para tasación de componentes informáticos, eliminando errores de cálculo manual.',
        'Supervisión y gestión de e-commerce durante 7 años: catálogo, gestión de pedidos y flujos de garantía/RMA.',
        'Gestión de inventario y liderazgo de equipos de operaciones (2-3 personas) en entornos de alto volumen.',
      ],
      metrics: ['-60% tiempos de espera', '14 años operaciones', 'Software interno en producción'],
      technologies: ['JavaScript Vanilla', 'HTML5/CSS3', 'E-commerce Ops', 'Logística', 'Gestión de Equipos'],
    },
  ]

  const education: EducationItem[] = [
    {
      degree: 'Certificado Profesional Nivel 3: Desarrollo de Aplicaciones con Tecnología Web',
      institution: 'CEOP Tarragona',
      year: '2026',
      badge: 'IFCD0210 Oficial',
      description: 'Certificación oficial de cualificación profesional del SEPE en desarrollo de software web frontend, backend y persistencia.',
      skills: ['Desarrollo Web Full-Stack', 'Bases de Datos', 'Seguridad Web', 'Arquitectura de Software'],
    },
    {
      degree: 'Máster en Desarrollo Web Full-Stack',
      institution: 'Nuclio Digital School',
      year: '2025',
      badge: 'MERN Stack',
      description: 'Programa intensivo de formación técnica avanzada en ecosistema JavaScript moderno, arquitectura de sistemas y metodologías ágiles.',
      skills: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Clean Code', 'Scrum'],
    },
    {
      degree: 'Certificado Profesional de Ciberseguridad',
      institution: 'Google Career Certificates',
      year: '2024',
      badge: 'Google Certified',
      description: 'Especialización en análisis de riesgos, seguridad en redes, detección de vulnerabilidades, respuesta a incidentes y scripting defensivo.',
      skills: ['Gestión de Riesgos', 'Seguridad en Redes', 'Linux/Bash', 'Auditoría de Vulnerabilidades'],
    },
    {
      degree: 'Desarrollo Python Full Stack',
      institution: 'IBM SkillsBuild',
      year: '2024',
      badge: 'IBM Certified',
      description: 'Construcción y consumo de APIs RESTful utilizando Python, Flask y PostgreSQL para modelado y persistencia de datos.',
      skills: ['Python', 'Flask', 'PostgreSQL', 'REST APIs'],
    },
    {
      degree: 'Técnico en Electrónica (Formación Profesional Grado Medio)',
      institution: 'Escola del Treball de Barcelona',
      year: '2006',
      description: 'Bases de circuitos, hardware, diagnóstico de fallos lógicos y resolución sistemática de incidencias electrónicas.',
      skills: ['Electrónica', 'Diagnóstico de Hardware', 'Lógica de Circuitos'],
    },
  ]

  return (
    <section id='experience' className='py-24 px-4 relative overflow-hidden bg-background border-b border-border/40'>
      {/* Decorative ambient gradients */}
      <div className='absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none' />

      <div className='max-w-6xl mx-auto space-y-12 relative z-10'>
        {/* Header */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border/60 pb-8'>
          <div className='space-y-2'>
            <span className='text-[10px] tracking-[0.2em] font-black uppercase text-primary block'>
              EXPERIENCIA & FORMACIÓN
            </span>
            <h2 className='text-4xl md:text-5xl font-black text-foreground tracking-tight'>
              Trayectoria Profesional
            </h2>
            <p className='text-muted-foreground text-base max-w-xl'>
              Una combinación singular de desarrollo Full-Stack impulsado por IA y 14 años de liderazgo operativo en retail y e-commerce.
            </p>
          </div>

          {/* Tab selector */}
          <div className='flex p-1.5 rounded-2xl bg-card/80 border border-border/80 backdrop-blur-md self-stretch sm:self-auto'>
            <button
              type='button'
              onClick={() => setActiveTab('work')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'work'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FiBriefcase className='size-4' />
              <span>Experiencia ({experiences.length})</span>
            </button>
            <button
              type='button'
              onClick={() => setActiveTab('education')}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === 'education'
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FiAward className='size-4' />
              <span>Formación ({education.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content: Experiencia */}
        {activeTab === 'work' && (
          <div className='grid grid-cols-1 gap-6 animate-fade-in'>
            {experiences.map((exp, idx) => (
              <article
                key={idx}
                className='group relative p-6 sm:p-8 rounded-2xl bg-card/50 hover:bg-card/80 border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl'
              >
                <div className='flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4'>
                  <div>
                    <div className='flex flex-wrap items-center gap-3 mb-1'>
                      <h3 className='text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors'>
                        {exp.role}
                      </h3>
                      <span className='text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20'>
                        {exp.organization}
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm leading-relaxed'>{exp.description}</p>
                  </div>
                  <span className='text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-background/80 border border-border text-muted-foreground whitespace-nowrap self-start'>
                    {exp.period}
                  </span>
                </div>

                {/* Highlights */}
                <ul className='space-y-2 mb-5 text-sm text-foreground/90'>
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className='flex items-start gap-2.5'>
                      <FiCheckCircle className='size-4 text-primary shrink-0 mt-0.5' />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Metrics + Techs */}
                <div className='flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/40'>
                  {exp.metrics && exp.metrics.length > 0 && (
                    <div className='flex flex-wrap items-center gap-2'>
                      {exp.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className='inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md bg-accent/15 text-accent border border-accent/25'
                        >
                          <FiTrendingUp className='size-3' /> {m}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className='flex flex-wrap items-center gap-1.5'>
                    {exp.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className='text-[11px] font-mono px-2 py-0.5 rounded-md bg-background/60 text-muted-foreground border border-border/40'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab Content: Formación */}
        {activeTab === 'education' && (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in'>
            {education.map((edu, idx) => (
              <article
                key={idx}
                className='p-6 sm:p-7 rounded-2xl bg-card/50 hover:bg-card/80 border border-border/60 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between space-y-4'
              >
                <div className='space-y-3'>
                  <div className='flex justify-between items-start gap-2'>
                    {edu.badge && (
                      <span className='text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20'>
                        {edu.badge}
                      </span>
                    )}
                    <span className='text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-background border border-border/40'>
                      {edu.year}
                    </span>
                  </div>

                  <h3 className='text-lg font-bold text-foreground leading-snug'>
                    {edu.degree}
                  </h3>
                  <p className='text-primary text-sm font-semibold'>{edu.institution}</p>
                  <p className='text-muted-foreground text-sm leading-relaxed'>{edu.description}</p>
                </div>

                <div className='pt-3 border-t border-border/40 flex flex-wrap gap-1.5'>
                  {edu.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className='text-[11px] font-mono px-2 py-0.5 rounded-md bg-background/60 text-muted-foreground border border-border/40'
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
