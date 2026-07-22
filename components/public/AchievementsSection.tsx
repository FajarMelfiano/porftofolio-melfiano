'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Trophy, Calendar, Award } from 'lucide-react';

export const AchievementsSection: React.FC = () => {
  const { achievements, language } = useDataContext();

  return (
    <section id="achievements" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <Trophy className="w-3.5 h-3.5 text-white/80" />
            <span>Honors & Awards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'achievements.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'achievements.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-3 hover:border-white/30 transition"
            >
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-white text-[9px] font-mono uppercase font-bold flex items-center space-x-1">
                  <Award className="w-3 h-3 text-white/70" />
                  <span>{ach.level}</span>
                </span>
                <span className="text-[10px] font-mono text-white/40 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{ach.date}</span>
                </span>
              </div>

              <h3 className="text-lg font-serif italic text-white">
                {ach.title[language]}
              </h3>

              <p className="text-[10px] uppercase font-mono tracking-wider text-white/60">
                Penyelenggara: {ach.organizer}
              </p>

              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {ach.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
