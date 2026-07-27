'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { BookOpen, ExternalLink, Quote } from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const { publications, language } = useDataContext();

  return (
    <section id="publications" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'publications.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'publications.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'publications.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 hover:border-fg/30 transition"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <span className="px-2 py-0.5 bg-inset border border-fg/10 text-fg text-[9px] font-mono uppercase font-bold">
                    {pub.publicationType} ({pub.year})
                  </span>
                  <h3 className="text-xl font-serif italic text-fg pt-1">
                    {pub.title}
                  </h3>
                  <p className="text-[10px] font-mono text-fg/50 uppercase tracking-wider">
                    {getTranslation(language, 'common.authors')} {pub.authors.join(', ')}
                  </p>
                </div>

                <div className="flex items-center space-x-2 px-3 py-1 bg-inset border border-fg/10 text-fg font-mono text-[10px]">
                  <Quote className="w-3 h-3 text-fg/70" />
                  <span>{pub.citationsCount} {getTranslation(language, 'publications.citations')}</span>
                </div>
              </div>

              <p className="text-xs text-fg/70 leading-relaxed font-serif italic">
                &ldquo;{pub.abstract[language]}&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-fg/10 text-[10px] font-mono">
                <span className="text-fg/40">
                  {pub.publisher}{pub.journalName ? ` • ${pub.journalName}` : ''}{pub.volumeNo ? ` (${pub.volumeNo})` : ''}
                </span>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 font-bold uppercase tracking-widest text-fg hover:underline"
                  >
                    <span>{getTranslation(language, 'publications.readPaper')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {publications.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
