'use client';

import React from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences, language } = useDataContext();

  return (
    <section id="experience" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Briefcase className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'experience.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'experience.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'experience.subtitle')}
          </p>
        </div>

        {/* Timeline Container */}
        {experiences.length === 0 ? (
          <div className="text-center py-12 text-fg/50 text-sm">{getTranslation(language, 'common.noData')}</div>
        ) : (
          <div className="relative border-l border-fg/15 ml-4 sm:ml-8 lg:ml-12 space-y-12">
            {[...experiences].sort((a, b) => a.order - b.order).map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Bullet Node */}
                <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-fg border-2 border-canvas shadow-sm" />

                {/* Main Experience Card */}
                <div className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 hover:border-fg/30 transition">
                  {/* Company Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        {exp.companyLogo && (
                          <div className="relative w-10 h-10 rounded-[var(--radius)] overflow-hidden border border-fg/10 bg-inset shrink-0">
                            <Image
                              src={exp.companyLogo}
                              alt={exp.companyName}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="text-xl font-serif italic text-fg">
                            {exp.position[language]}
                          </h3>
                          <p className="text-xs uppercase tracking-widest text-fg/60 font-mono font-semibold">
                            {exp.companyName} ({exp.employmentType})
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-1 text-[10px] uppercase tracking-wider text-fg/50 font-mono">
                      <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-inset border border-fg/10 rounded-[var(--radius)] font-semibold text-fg/80">
                        <Calendar className="w-3 h-3 text-fg/60" />
                        <span>
                          {exp.startDate} – {exp.isCurrent ? getTranslation(language, 'experience.present') : exp.endDate}
                        </span>
                      </span>
                      <span className="flex items-center space-x-1 pt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-fg/80 text-sm leading-relaxed font-sans">
                    {exp.description[language]}
                  </p>

                  {/* Responsibilities List */}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono">
                        {getTranslation(language, 'experience.keyResponsibilities')}
                      </h4>
                      <ul className="space-y-1.5 text-xs text-fg/70 font-sans">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="w-3.5 h-3.5 text-fg mt-0.5 shrink-0" />
                            <span>{resp[language]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-fg/10">
                    {exp.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-inset border border-fg/10 text-fg/80 text-[10px] font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
