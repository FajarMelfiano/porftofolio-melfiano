'use client';

import React from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Star, MessageSquare } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, language } = useDataContext();

  const approvedTestimonials = testimonials.filter(t => t.isApproved);

  return (
    <section id="testimonials" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'testimonials.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'testimonials.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'testimonials.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approvedTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 flex flex-col justify-between hover:border-fg/30 transition shadow-xl"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 text-fg">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className={`w-3.5 h-3.5 ${idx < item.rating ? 'fill-fg text-fg' : 'text-fg/20'}`} />
                  ))}
                </div>

                <p className="text-sm text-fg/80 font-serif italic leading-relaxed">
                  &ldquo;{item.content[language]}&rdquo;
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-fg/10">
                {item.avatarUrl ? (
                  <div className="relative w-10 h-10 rounded-[var(--radius)] overflow-hidden border border-fg/10 bg-inset shrink-0">
                    <Image
                      src={item.avatarUrl}
                      alt={item.clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-[var(--radius)] border border-fg/10 bg-inset flex items-center justify-center text-fg/60 font-mono text-xs uppercase font-bold">
                    {item.clientName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="font-serif italic text-fg text-base">
                    {item.clientName}
                  </h4>
                  <p className="text-[10px] uppercase tracking-wider text-fg/50 font-mono">
                    {item.titleRole} — <span className="text-fg font-semibold">{item.companyName}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {approvedTestimonials.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
