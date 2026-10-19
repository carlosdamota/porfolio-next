import React from 'react';
import type { Metadata } from 'next';
import { getAllDocs, getAllCategories } from '@/utils/docs';
import { DocsList } from '@/components/organisms/DocsList';
import { FiBookOpen } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Documentación & Recursos Técnicos | Carlos Damota',
  description:
    'Base de conocimiento técnico, registro de skills de agentes de IA, playbooks de desarrollo y guías de configuración de herramientas como Gentle-AI, OpenDesign y más.',
  openGraph: {
    title: 'Documentación & Recursos Técnicos | Carlos Damota',
    description:
      'Guías, playbooks y documentación de herramientas de desarrollo asistido por IA, arquitectura frontend y skills para agentes.',
    url: 'https://carlosdamota.com/docs',
    siteName: 'Carlos Damota',
    type: 'website',
  },
  alternates: {
    canonical: 'https://carlosdamota.com/docs',
  },
};

export default async function DocsPage() {
  const docs = await getAllDocs();
  const categories = await getAllCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Documentación & Recursos Técnicos - Carlos Damota',
    description:
      'Registro técnico de herramientas, skills agénticas y patrones de desarrollo por Carlos Damota.',
    url: 'https://carlosdamota.com/docs',
    hasPart: docs.map((doc) => ({
      '@type': 'TechArticle',
      headline: doc.title,
      description: doc.description,
      url: `https://carlosdamota.com/docs/${doc.slug}`,
      datePublished: doc.date,
      author: {
        '@type': 'Person',
        name: doc.author,
      },
    })),
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header / Hero */}
      <div className="space-y-4 mb-12 border-b border-border/60 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <FiBookOpen size={14} />
          <span>Knowledge Hub & Playbooks</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Documentación & Recursos
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Registro técnico de herramientas, guías de instalación, catálogo de skills para agentes de IA y conceptos prácticos de desarrollo de software.
        </p>
      </div>

      {/* Interactive Docs List */}
      <DocsList initialDocs={docs} categories={categories} />
    </main>
  );
}
