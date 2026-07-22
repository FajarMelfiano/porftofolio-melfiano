'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { BookOpen, ExternalLink, Quote } from 'lucide-react';

export const PublicationsSection: React.FC = () => {
  const { publications, language } = useDataContext();

  return (
    <section id="publications" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-white/80" />
            <span>Research & Papers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'publications.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'publications.subtitle')}
          </p>
        </div>

        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-4 hover:border-white/30 transition"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1 max-w-3xl">
                  <span className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-white text-[9px] font-mono uppercase font-bold">
                    {pub.publicationType} ({pub.year})
                  </span>
                  <h3 className="text-xl font-serif italic text-white pt-1">
                    {pub.title}
                  </h3>
                  <p className="text-[10px] font-mono text-white/50 uppercase tracking-wider">
                    Penulis: {pub.authors.join(', ')}
                  </p>
                </div>

                <div className="flex items-center space-x-2 px-3 py-1 bg-[#1A1A1A] border border-white/10 text-white font-mono text-[10px]">
                  <Quote className="w-3 h-3 text-white/70" />
                  <span>{pub.citationsCount} Sitasi</span>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-serif italic">
                &ldquo;{pub.abstract[language]}&rdquo;
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-[10px] font-mono">
                <span className="text-white/40">
                  {pub.publisher} • {pub.journalName} ({pub.volumeNo})
                </span>

                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 font-bold uppercase tracking-widest text-white hover:underline"
                  >
                    <span>{getTranslation(language, 'publications.readPaper')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
