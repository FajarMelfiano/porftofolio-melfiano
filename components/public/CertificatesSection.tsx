'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Award, ExternalLink, Search, CheckCircle, Clock } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const { certificates, language } = useDataContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = certificates.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.competencies.some(comp => comp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="certificates" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <Award className="w-3.5 h-3.5 text-white/80" />
            <span>Accredited Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'certificates.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'certificates.subtitle')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari sertifikat (GCP, AWS, CKA, Cloud)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-sm bg-[#0F0F0F] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-mono"
          />
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="p-6 bg-[#0F0F0F] border border-white/10 rounded-sm flex flex-col justify-between hover:border-white/30 transition-all duration-300 space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {cert.issuerLogo && (
                      <img src={cert.issuerLogo} alt={cert.issuer} className="w-10 h-10 rounded-sm object-cover border border-white/10 bg-[#1A1A1A]" />
                    )}
                    <div>
                      <h3 className="font-serif italic text-white text-base leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-wider font-mono text-white/60">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 border border-white/10 text-[9px] uppercase font-mono font-bold flex items-center space-x-1 ${
                    cert.isValid
                      ? 'bg-white text-black'
                      : 'bg-[#1A1A1A] text-white/50'
                  }`}>
                    {cert.isValid ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    <span>{cert.isValid ? getTranslation(language, 'certificates.active') : getTranslation(language, 'certificates.expired')}</span>
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed font-sans">
                  {cert.description[language]}
                </p>

                {/* Competencies */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {cert.competencies.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-white/70 text-[10px] font-mono">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer info & Credential Link */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[10px]">
                <div className="text-white/40">
                  <span>Issued: {cert.issueDate}</span>
                </div>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-white font-bold uppercase tracking-wider hover:underline"
                >
                  <span>{getTranslation(language, 'certificates.verifyCredential')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
