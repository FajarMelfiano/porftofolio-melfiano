'use client';

import React from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { GraduationCap, Award, BookOpen, MapPin } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { educations, language } = useDataContext();

  return (
    <section id="education" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'education.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'education.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'education.subtitle')}
          </p>
        </div>

        {educations.length === 0 ? (
          <div className="text-center py-12 text-fg/50 text-sm">{getTranslation(language, 'common.noData')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...educations].sort((a, b) => a.order - b.order).map((edu) => (
              <div
                key={edu.id}
                className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 hover:border-fg/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {edu.institutionLogo && (
                      <div className="relative w-11 h-11 rounded-[var(--radius)] overflow-hidden border border-fg/10 bg-inset shrink-0">
                        <Image
                          src={edu.institutionLogo}
                          alt={edu.institutionName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-serif italic text-fg">
                        {edu.institutionName}
                      </h3>
                      <p className="text-[10px] uppercase tracking-wider text-fg/40 flex items-center space-x-1 font-mono mt-0.5">
                        <MapPin className="w-3 h-3" />
                        <span>{edu.location}</span>
                      </p>
                    </div>
                  </div>

                  <div className="px-2.5 py-1 bg-inset border border-fg/10 text-fg text-[10px] font-bold font-mono">
                    {getTranslation(language, 'education.gpa')} {edu.gpa} / {edu.maxGpa}
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-serif italic text-fg">
                    {edu.degree[language]}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-wider text-fg/50 mt-1">
                    {edu.fieldOfStudy[language]} • ({edu.startYear} – {edu.endYear})
                  </p>
                </div>

                <p className="text-xs text-fg/70 leading-relaxed font-sans">
                  {edu.description[language]}
                </p>

                {edu.thesisTitle && edu.thesisTitle?.[language] && (
                  <div className="p-3 bg-surface-2 border border-fg/10 text-xs space-y-1">
                    <span className="font-bold text-fg flex items-center space-x-1 uppercase text-[10px] tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-fg/70" />
                      <span>{getTranslation(language, 'education.thesis')}</span>
                    </span>
                    <p className="text-fg/60 italic font-serif">
                      &ldquo;{edu.thesisTitle?.[language] || edu.thesisTitle?.id || ''}&rdquo;
                    </p>
                  </div>
                )}

                {edu.academicAchievements && edu.academicAchievements.length > 0 && (
                  <div className="space-y-1 pt-1">
                    {edu.academicAchievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-xs text-fg/80 font-mono">
                        <Award className="w-3.5 h-3.5 text-fg/70" />
                        <span>{ach[language]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
