'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { GraduationCap, Clock, User, Calendar, CheckCircle2, Loader, ExternalLink } from 'lucide-react';

export const TrainingsSection: React.FC = () => {
  const { trainings, language } = useDataContext();

  if (trainings.length === 0) return null;

  return (
    <section id="trainings" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <GraduationCap className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'trainings.tag') || 'Continuous Learning'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'trainings.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'trainings.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trainings.map((trn) => (
            <div
              key={trn.id}
              className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 hover:border-fg/30 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-serif italic text-fg leading-snug">
                    {trn.trainingName}
                  </h3>
                  <span
                    className={`px-2 py-0.5 border border-fg/10 text-[9px] uppercase font-mono font-bold flex items-center space-x-1 shrink-0 ${
                      trn.isCompleted ? 'bg-fg text-canvas' : 'bg-inset text-fg/50'
                    }`}
                  >
                    {trn.isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <Loader className="w-3 h-3" />}
                    <span>
                      {trn.isCompleted
                        ? getTranslation(language, 'trainings.completed')
                        : getTranslation(language, 'trainings.ongoing')}
                    </span>
                  </span>
                </div>

                <p className="text-[10px] uppercase tracking-wider font-mono text-fg/60">
                  {trn.organizer}
                </p>

                {/* Metadata row */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-mono text-fg/50 uppercase tracking-wider pt-1">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-3 h-3 text-fg/70" />
                    <span>{trn.date}</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <Clock className="w-3 h-3 text-fg/70" />
                    <span>{trn.durationHours} {getTranslation(language, 'trainings.hours')}</span>
                  </span>
                  {trn.instructor && (
                    <span className="flex items-center space-x-1.5">
                      <User className="w-3 h-3 text-fg/70" />
                      <span>{trn.instructor}</span>
                    </span>
                  )}
                </div>

                {/* Skills learned */}
                {trn.skillsLearned && trn.skillsLearned.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono">
                      {getTranslation(language, 'trainings.skillsLearned')}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {trn.skillsLearned.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-inset border border-fg/10 text-fg/80 text-[10px] font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {(trn.certificateUrl || trn.trainingUrl) && (
                <div className="pt-3 border-t border-fg/10 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                  {trn.certificateUrl && (
                    <a
                      href={trn.certificateUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-fg hover:underline"
                    >
                      <span>{getTranslation(language, 'trainings.viewCertificate')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {trn.trainingUrl && (
                    <a
                      href={trn.trainingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-fg/60 hover:text-fg transition"
                    >
                      <span>{getTranslation(language, 'trainings.viewTraining')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
