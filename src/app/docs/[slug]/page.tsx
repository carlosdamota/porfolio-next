import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getAllDocs, getDocBySlug } from '@/utils/docs';
import { CodeBlock } from '@/components/atoms/CodeBlock';
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiTag,
  FiFolder,
  FiExternalLink,
  FiList,
} from 'react-icons/fi';

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function extractHeadings(markdown: string): HeadingItem[] {
  const lines = markdown.split(/\r?\n/);
  const headings: HeadingItem[] = [];
  let currentH2Id = '';
  const idCounts = new Map<string, number>();

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const rawText = trimmed.replace(/^##\s+/, '').replace(/\*\*/g, '').replace(/`/g, '');
      const baseId = slugify(rawText);
      const count = idCounts.get(baseId) || 0;
      idCounts.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      currentH2Id = id;
      headings.push({ id, text: rawText, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const rawText = trimmed.replace(/^###\s+/, '').replace(/\*\*/g, '').replace(/`/g, '');
      const baseId = slugify(rawText);
      const prefixedBase = currentH2Id ? `${currentH2Id}-${baseId}` : baseId;
      const count = idCounts.get(prefixedBase) || 0;
      idCounts.set(prefixedBase, count + 1);
      const id = count === 0 ? prefixedBase : `${prefixedBase}-${count}`;
      headings.push({ id, text: rawText, level: 3 });
    }
  }

  return headings;
}

function getTextFromReactNode(node: React.ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join('');
  }
  if (React.isValidElement(node) && node.props) {
    return getTextFromReactNode((node.props as any).children);
  }
  return '';
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    return {
      title: 'Documentación no encontrada | Carlos Damota',
      description: 'El recurso o guía técnica solicitado no existe.',
    };
  }

  const title = `${doc.title} | Carlos Damota`;
  const description = doc.description || 'Documentación técnica y guías en el portafolio de Carlos Damota.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://carlosdamota.com/docs/${doc.slug}`,
      publishedTime: doc.date,
      authors: [doc.author],
      tags: doc.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://carlosdamota.com/docs/${doc.slug}`,
    },
  };
}

export default async function DocDetailPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const headings = extractHeadings(doc.content);

  // Maintain heading ID counters for ReactMarkdown rendering to match TOC exactly
  let renderH2Id = '';
  const renderIdCounts = new Map<string, number>();

  const getHeadingId = (text: string, level: 2 | 3): string => {
    const baseId = slugify(text);
    if (level === 2) {
      const count = renderIdCounts.get(baseId) || 0;
      renderIdCounts.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count}`;
      renderH2Id = id;
      return id;
    } else {
      const prefixedBase = renderH2Id ? `${renderH2Id}-${baseId}` : baseId;
      const count = renderIdCounts.get(prefixedBase) || 0;
      renderIdCounts.set(prefixedBase, count + 1);
      return count === 0 ? prefixedBase : `${prefixedBase}-${count}`;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.description,
    url: `https://carlosdamota.com/docs/${doc.slug}`,
    datePublished: doc.date,
    author: {
      '@type': 'Person',
      name: doc.author,
      url: 'https://carlosdamota.com',
    },
    keywords: doc.tags.join(', '),
  };

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation & Back link */}
      <div className="mb-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} />
          <span>Volver a Documentación</span>
        </Link>
      </div>

      {/* Two Column Layout: Main Content (8 cols) + Sticky TOC (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 min-w-0">
          {/* Article Header */}
          <header className="space-y-5 pb-8 mb-8 border-b border-border/80">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md font-semibold bg-primary/10 text-primary border border-primary/20">
                <FiFolder size={12} />
                {doc.category}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <FiCalendar size={12} />
                {doc.date}
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <FiClock size={12} />
                {doc.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
              {doc.title}
            </h1>

            {doc.description && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {doc.description}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {doc.tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-card/80 text-muted-foreground border border-border/70"
                >
                  <FiTag size={11} className="text-primary/70" />
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Mobile Table of Contents (collapsible) */}
          {headings.length > 0 && (
            <div className="lg:hidden mb-8 p-4 rounded-xl bg-card/50 border border-border/70">
              <details className="group">
                <summary className="flex items-center justify-between font-semibold text-sm text-foreground cursor-pointer select-none">
                  <span className="flex items-center gap-2">
                    <FiList className="text-primary" size={16} />
                    Índice de Contenidos ({headings.length})
                  </span>
                  <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <nav className="mt-4 pt-3 border-t border-border/40 space-y-2 text-sm">
                  {headings.map((h, index) => (
                    <a
                      key={`mob-${h.id}-${index}`}
                      href={`#${h.id}`}
                      className={`block py-1 text-muted-foreground hover:text-primary transition-colors ${
                        h.level === 3 ? 'pl-4 text-xs' : 'font-medium'
                      }`}
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </details>
            </div>
          )}

          {/* Markdown Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 space-y-6">
            <ReactMarkdown
              components={{
                pre: ({ children }) => <>{children}</>,
                code: ({ node, className, children, ...props }) => {
                  return (
                    <CodeBlock className={className} {...props}>
                      {children}
                    </CodeBlock>
                  );
                },
                h1: ({ children }) => {
                  const text = getTextFromReactNode(children);
                  const id = slugify(text);
                  return (
                    <h1 id={id} className="scroll-mt-24 text-3xl font-extrabold text-foreground mt-10 mb-4 border-b border-border/50 pb-3">
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const text = getTextFromReactNode(children);
                  const id = getHeadingId(text, 2);
                  return (
                    <h2
                      id={id}
                      className="scroll-mt-24 text-2xl font-bold text-foreground mt-12 mb-4 border-b border-border/30 pb-2 group flex items-center justify-between"
                    >
                      <span>{children}</span>
                      <a
                        href={`#${id}`}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-base font-normal transition-opacity pl-2"
                        aria-label="Enlace a esta sección"
                      >
                        #
                      </a>
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const text = getTextFromReactNode(children);
                  const id = getHeadingId(text, 3);
                  return (
                    <h3
                      id={id}
                      className="scroll-mt-24 text-xl font-bold text-foreground mt-8 mb-3 group flex items-center justify-between"
                    >
                      <span>{children}</span>
                      <a
                        href={`#${id}`}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary text-sm font-normal transition-opacity pl-2"
                        aria-label="Enlace a esta sección"
                      >
                        #
                      </a>
                    </h3>
                  );
                },
                p: ({ children }) => (
                  <p className="text-muted-foreground leading-relaxed mb-4 text-base">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith('http');
                  const isAnchor = href?.startsWith('#');
                  return (
                    <a
                      href={href}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center gap-0.5 text-primary hover:text-primary-glow font-semibold hover:underline transition-colors ${
                        isAnchor ? 'cursor-pointer' : ''
                      }`}
                    >
                      {children}
                      {isExternal && <FiExternalLink className="ml-1 inline" size={13} />}
                    </a>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 py-1 my-4 bg-card/40 rounded-r-lg text-muted-foreground italic">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-xl border border-border/80">
                    <table className="w-full text-left text-sm text-foreground/90 divide-y divide-border/60">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="divide-y divide-border/40 bg-card/30">
                    {children}
                  </tbody>
                ),
                tr: ({ children }) => <tr className="hover:bg-muted/30 transition-colors">{children}</tr>,
                th: ({ children }) => <th className="px-4 py-3">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3">{children}</td>,
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1.5 my-4 text-muted-foreground">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1.5 my-4 text-muted-foreground">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              }}
            >
              {doc.content}
            </ReactMarkdown>
          </article>

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-border/80 flex justify-between items-center">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-glow transition-colors"
            >
              <FiArrowLeft size={16} />
              Explorar más guías y recursos
            </Link>
          </div>
        </div>

        {/* Sidebar Table of Contents (Desktop Sticky) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <div className="space-y-4 p-5 rounded-2xl bg-card/50 border border-border/70 backdrop-blur-sm shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-3 border-b border-border/50">
              <FiList size={14} className="text-primary" />
              <span>En esta página</span>
            </div>

            {headings.length === 0 ? (
              <p className="text-xs text-muted-foreground">Sin secciones destacadas.</p>
            ) : (
              <nav className="max-h-[calc(100vh-12rem)] overflow-y-auto space-y-1.5 text-sm pr-1 scrollbar-none">
                {headings.map((h, index) => (
                  <a
                    key={`desk-${h.id}-${index}`}
                    href={`#${h.id}`}
                    className={`block py-1 text-muted-foreground hover:text-primary transition-colors line-clamp-1 ${
                      h.level === 3 ? 'pl-4 text-xs' : 'font-medium text-xs sm:text-sm'
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            )}

            <div className="pt-3 border-t border-border/40">
              <Link
                href="/docs"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                ← Ver todas las guías
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
