'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { FiBookOpen, FiArrowRight, FiSearch, FiClock, FiCalendar, FiTag } from 'react-icons/fi';
import { DocItem } from '@/utils/docs';

interface DocsListProps {
  initialDocs: DocItem[];
  categories: string[];
}

export const DocsList: React.FC<DocsListProps> = ({ initialDocs, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDocs = useMemo(() => {
    return initialDocs.filter((doc) => {
      const matchesCategory =
        selectedCategory === 'all' || doc.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        doc.title.toLowerCase().includes(query) ||
        doc.description.toLowerCase().includes(query) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialDocs, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-card/60 text-muted-foreground border-border/80 hover:text-foreground hover:border-primary/40'
            }`}
          >
            Todos ({initialDocs.length})
          </button>
          {categories.map((category) => {
            const count = initialDocs.filter((d) => d.category === category).length;
            const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-card/60 text-muted-foreground border-border/80 hover:text-foreground hover:border-primary/40'
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por título, tag o concepto..."
            className="w-full pl-10 pr-4 py-2 bg-card/70 border border-border/80 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Docs Grid */}
      {filteredDocs.length === 0 ? (
        <div className="text-center py-16 px-4 bg-card/30 rounded-2xl border border-border/60">
          <FiBookOpen className="mx-auto text-muted-foreground mb-3" size={32} />
          <h3 className="text-lg font-bold text-foreground">No se encontraron documentos</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Prueba a buscar con otros términos o cambia la categoría seleccionada.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card/60 hover:bg-card/90 border border-border/80 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                {/* Header: Category & Read Time */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-md font-semibold bg-primary/10 text-primary border border-primary/20">
                    {doc.category}
                  </span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {doc.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      {doc.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {doc.description}
                </p>
              </div>

              {/* Footer: Tags and Action Link */}
              <div className="pt-6 mt-4 border-t border-border/40 flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <FiTag size={12} className="text-muted-foreground mr-0.5" />
                  {doc.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50"
                    >
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="text-[10px] text-muted-foreground">+{doc.tags.length - 3}</span>
                  )}
                </div>

                <span className="inline-flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  Leer guía <FiArrowRight className="ml-1" size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
