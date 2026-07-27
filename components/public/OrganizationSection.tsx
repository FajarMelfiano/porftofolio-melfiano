'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Users, MapPin, CheckCircle, Award, ExternalLink } from 'lucide-react';

export const OrganizationSection: React.FC = () => {
  const { organizations, language } = useDataContext();

  if (organizations.length === 0) return null;

  return (
    <section id="organization" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Users className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'organization.tag') || 'Community & Leadership'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'organization.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'organization.subtitle')}
          </p>
        </div>

        <div className="space-y-8">
          {organizations.map((org) => (
            <div
              key={org.id}
              className="p-6 sm:p-8 bg-surface border border-fg/10 rounded-[var(--radius)] space-y-4 hover:border-fg/30 transition"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif italic text-fg">
                    {org.role[language]}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-fg/60 font-mono font-semibold mt-0.5">
                    {org.organizationName}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end space-y-1 text-[10px] uppercase tracking-wider text-fg/50 font-mono">
                  <span className="px-2.5 py-1 bg-inset border border-fg/10 rounded-[var(--radius)] font-semibold text-fg/80">
                    {org.period}
                  </span>
                  <span className="flex items-center space-x-1 pt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{org.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-fg/80 text-sm leading-relaxed font-sans">
                {org.description[language]}
              </p>

              {/* Responsibilities */}
              {org.responsibilities && org.responsibilities.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono">
                    {getTranslation(language, 'organization.responsibilities')}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-fg/70 font-sans">
                    {org.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-fg mt-0.5 shrink-0" />
                        <span>{resp[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {org.achievements && org.achievements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-fg/10">
                  <h4 className="text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono">
                    {getTranslation(language, 'organization.achievements')}
                  </h4>
                  <div className="space-y-1">
                    {org.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-xs text-fg/80 font-mono">
                        <Award className="w-3.5 h-3.5 text-fg/70 shrink-0" />
                        <span>{ach[language]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {org.certificateUrl && (
                <div className="pt-3 border-t border-fg/10">
                  <a
                    href={org.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest text-fg hover:underline"
                  >
                    <span>{getTranslation(language, 'organization.viewCertificate')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
