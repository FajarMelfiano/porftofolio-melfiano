'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Award, ExternalLink, Search, CheckCircle, Clock } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const { certificates, language } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates
    .filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.competencies.some(comp => comp.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => a.order - b.order);

  return (
    <section id="certificates" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Award className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'certificates.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'certificates.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'certificates.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-fg/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={getTranslation(language, 'projects.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-[var(--radius)] bg-surface border border-fg/10 text-fg placeholder-fg/40 focus:outline-none focus:border-fg/40 font-mono"
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-surface border border-fg/10 rounded-[var(--radius)] flex flex-col justify-between hover:border-fg/30 transition-all duration-300 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {cert.issuerLogo && (
                      <div className="relative w-10 h-10 rounded-[var(--radius)] overflow-hidden border border-fg/10 bg-inset shrink-0">
                        <Image src={cert.issuerLogo} alt={cert.issuer} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-serif italic text-fg text-base leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-wider font-mono text-fg/60">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 border border-fg/10 text-[9px] uppercase font-mono font-bold flex items-center space-x-1 ${
                    cert.isValid
                      ? 'bg-fg text-canvas'
                      : 'bg-inset text-fg/50'
                  }`}>
                    {cert.isValid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{cert.isValid ? getTranslation(language, 'certificates.active') : getTranslation(language, 'certificates.expired')}</span>
                  </span>
                </div>

                <p className="text-xs text-fg/70 leading-relaxed font-sans">
                  {cert.description[language]}
                </p>

                {/* Competencies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.competencies.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-inset border border-fg/10 text-fg/70 text-[10px] font-mono">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer info & Credential Link */}
              <div className="pt-3 border-t border-fg/10 flex items-center justify-between text-xs font-mono text-[10px]">
                <div className="text-fg/40">
                  <span>{getTranslation(language, 'certificates.issuedOn')} {cert.issueDate}</span>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-fg font-bold uppercase tracking-wider hover:underline"
                  >
                    <span>{getTranslation(language, 'certificates.verifyCredential')}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>
    </section>
  );
};
