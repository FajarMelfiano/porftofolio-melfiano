'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences, language } = useDataContext();

  return (
    <section id="experience" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <Briefcase className="w-3.5 h-3.5 text-white/80" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'experience.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'experience.subtitle')}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-8 lg:ml-12 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-white border-2 border-[#050505] shadow-sm" />

              {/* Main Experience Card */}
              <div className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-4 hover:border-white/30 transition">
                {/* Company Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-3">
                      {exp.companyLogo && (
                        <img
                          src={exp.companyLogo}
                          alt={exp.companyName}
                          className="w-10 h-10 rounded-sm object-cover border border-white/10 bg-[#1A1A1A]"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-serif italic text-white">
                          {exp.position[language]}
                        </h3>
                        <p className="text-xs uppercase tracking-widest text-white/60 font-mono font-semibold">
                          {exp.companyName} ({exp.employmentType})
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-1 text-[10px] uppercase tracking-wider text-white/50 font-mono">
                    <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#1A1A1A] border border-white/10 rounded-sm font-semibold text-white/80">
                      <Calendar className="w-3 h-3 text-white/60" />
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
                <p className="text-white/80 text-sm leading-relaxed font-sans">
                  {exp.description[language]}
                </p>

                {/* Responsibilities List */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">
                      {getTranslation(language, 'experience.keyResponsibilities')}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-white/70 font-sans">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                          <span>{resp[language]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {exp.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#1A1A1A] border border-white/10 text-white/80 text-[10px] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
