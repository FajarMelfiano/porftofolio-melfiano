'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Trophy, Calendar, Award } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { achievements, language } = useDataContext();

  return (
    <section id="achievements" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Trophy className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'achievements.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'achievements.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'achievements.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-3 hover:border-fg/30 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-inset border border-fg/10 text-fg text-[9px] font-mono uppercase font-bold flex items-center space-x-1">
                    <Award className="w-3 h-3 text-fg/70" />
                    <span>{ach.level}</span>
                  </span>
                  {ach.rank && (
                    <span className="px-2 py-0.5 bg-surface border border-fg/10 text-fg text-[9px] font-mono uppercase font-bold">
                      {ach.rank}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-fg/40 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{ach.date}</span>
                </span>
              </div>

              <h3 className="text-lg font-serif italic text-fg">
                {ach.title[language]}
              </h3>

              <p className="text-[10px] uppercase font-mono tracking-wider text-fg/60">
                {getTranslation(language, 'common.organizer')} {ach.organizer}
              </p>

              <p className="text-xs text-fg/70 leading-relaxed font-sans">
                {ach.description[language]}
              </p>
            </div>
          ))}
        </div>

        {achievements.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
