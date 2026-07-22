'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { GraduationCap, Award, BookOpen, MapPin } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { educations, language } = useDataContext();

  return (
    <section id="education" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-white/80" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'education.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'education.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-4 hover:border-white/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  {edu.institutionLogo && (
                    <img
                      src={edu.institutionLogo}
                      alt={edu.institutionName}
                      className="w-11 h-11 rounded-sm object-cover border border-white/10 bg-[#1A1A1A]"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-serif italic text-white">
                      {edu.institutionName}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider text-white/40 flex items-center space-x-1 font-mono mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{edu.location}</span>
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 bg-[#1A1A1A] border border-white/10 text-white text-[10px] font-bold font-mono">
                  {getTranslation(language, 'education.gpa')} {edu.gpa} / {edu.maxGpa}
                </div>
              </div>

              <div>
                <h4 className="text-base font-serif italic text-white">
                  {edu.degree[language]}
                </h4>
                <p className="text-xs font-mono uppercase tracking-wider text-white/50 mt-1">
                  {edu.fieldOfStudy[language]} • ({edu.startYear} – {edu.endYear})
                </p>
              </div>

              <p className="text-xs text-white/70 leading-relaxed font-sans">
                {edu.description[language]}
              </p>

              {edu.thesisTitle && (
                <div className="p-3 bg-[#111111] border border-white/10 text-xs space-y-1">
                  <span className="font-bold text-white flex items-center space-x-1 uppercase text-[10px] tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-white/70" />
                    <span>{getTranslation(language, 'education.thesis')}</span>
                  </span>
                  <p className="text-white/60 italic font-serif">
                    &ldquo;{edu.thesisTitle[language]}&rdquo;
                  </p>
                </div>
              )}

              {edu.academicAchievements && edu.academicAchievements.length > 0 && (
                <div className="space-y-1 pt-1">
                  {edu.academicAchievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5 text-xs text-white/80 font-mono">
                      <Award className="w-3.5 h-3.5 text-white/70" />
                      <span>{ach[language]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
