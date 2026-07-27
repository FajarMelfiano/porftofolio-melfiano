'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Wrench, Check, Clock, MessageSquare, Code, Sparkles, Server } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { services, language } = useDataContext();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-fg" />;
      case 'Server': return <Server className="w-5 h-5 text-fg" />;
      default: return <Code className="w-5 h-5 text-fg" />;
    }
  };

  const handleConsult = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Wrench className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'services.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'services.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="p-8 bg-surface border border-fg/10 rounded-[var(--radius)] flex flex-col justify-between space-y-6 hover:border-fg/30 transition shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 bg-inset border border-fg/10 rounded-[var(--radius)] flex items-center justify-center">
                    {getServiceIcon(srv.icon)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-fg/40 font-mono uppercase tracking-widest block">{getTranslation(language, 'services.startingFrom')}</span>
                    <span className="text-lg font-serif italic text-fg">{srv.startingPrice}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif italic text-fg">
                  {srv.title[language]}
                </h3>

                <p className="text-xs text-fg/70 leading-relaxed font-sans">
                  {srv.shortDescription[language]}
                </p>

                <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-fg/50">
                  <Clock className="w-3.5 h-3.5 text-fg/70" />
                  <span>{getTranslation(language, 'services.estimatedDuration')}: {srv.duration}</span>
                </div>

                {/* Deliverables */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono">
                    {getTranslation(language, 'services.deliverables')}
                  </h4>
                  <ul className="space-y-2 text-xs text-fg/80 font-sans">
                    {srv.deliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-fg shrink-0" />
                        <span>{deliv[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleConsult}
                className="w-full py-3 bg-fg text-canvas font-bold text-[10px] uppercase tracking-widest hover:bg-fg/90 transition-colors rounded-[var(--radius)] flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'services.consultNow')}</span>
              </button>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
