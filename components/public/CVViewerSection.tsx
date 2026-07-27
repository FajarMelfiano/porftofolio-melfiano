'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { FileText, Download, Printer, QrCode } from 'lucide-react';

export const CVViewerSection: React.FC = () => {
  const { cvVersions, language, profile, experiences, educations, skills, seoSettings, incrementCVDownload } = useDataContext();
  const [selectedCvId, setSelectedCvId] = useState<string>(cvVersions[0]?.id || '');
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

  useEffect(() => {
    if (cvVersions.length > 0 && !cvVersions.find(cv => cv.id === selectedCvId)) {
      // Fix cascading render
      setTimeout(() => setSelectedCvId(cvVersions[0].id), 0);
    }
  }, [cvVersions, selectedCvId]);

  useEffect(() => {
    if (showQRModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQRModal]);

  const activeCV = cvVersions.find(c => c.id === selectedCvId) || cvVersions[0];

  const handleDownload = () => {
    if (activeCV) {
      incrementCVDownload(activeCV.id);
      const link = document.createElement('a');
      link.href = activeCV.fileUrl;
      link.download = activeCV.versionName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="cv" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <FileText className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'cv.tag') || 'Official Dossier'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'cv.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'cv.subtitle')}
          </p>
        </div>

        {/* Toolbar & Version Selection — the version picker and download button
            are pointless until at least one CV file has been registered. */}
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-surface border border-fg/10 rounded-[var(--radius)] shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className={`flex items-center space-x-2 ${cvVersions.length === 0 ? 'hidden' : ''}`}>
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-fg/50">{getTranslation(language, 'cv.selectVersion')}:</span>
            <select
              value={selectedCvId}
              onChange={e => setSelectedCvId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-[var(--radius)] bg-inset border border-fg/10 text-fg font-mono font-semibold focus:outline-none focus:border-fg/40"
            >
              {cvVersions.map(cv => (
                <option key={cv.id} value={cv.id}>
                  {cv.type} ({cv.language.toUpperCase()}) — {cv.versionName}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2 border border-fg/10 rounded-[var(--radius)] bg-inset text-fg/80 hover:text-fg transition"
              title="Scan QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-fg/10 rounded-[var(--radius)] bg-inset text-fg text-[10px] uppercase font-bold tracking-widest hover:bg-fg hover:text-canvas transition flex items-center space-x-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{getTranslation(language, 'cv.print') || 'Cetak'}</span>
            </button>
            {cvVersions.length > 0 && (
              <button
                onClick={handleDownload}
                className="px-5 py-2 bg-fg text-canvas rounded-[var(--radius)] text-[10px] uppercase font-bold tracking-widest flex items-center space-x-2 hover:bg-fg/90 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{getTranslation(language, 'cv.downloadPdf')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive ATS CV Render Frame */}
        <div className="max-w-4xl mx-auto bg-surface text-fg rounded-[var(--radius)] p-8 sm:p-12 border border-fg/15 shadow-2xl space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-fg/10 pb-6 flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif italic text-fg">{profile.name}</h1>
              <p className="text-xs uppercase tracking-widest text-fg/60 font-mono mt-1">{profile.currentRole[language]}</p>
              <p className="text-[10px] font-mono text-fg/40 mt-1">{profile.location} • {profile.email} • {profile.phone}</p>
            </div>
            <div className="text-right text-[10px] font-mono text-fg/40">
              <span className="px-2.5 py-1 bg-inset border border-fg/10 text-fg font-bold block mb-1">
                {activeCV?.type || 'Professional'} Format
              </span>
              <span>{getTranslation(language, 'cv.downloaded') || 'Diunduh'}: {activeCV?.downloadCount || 0}x</span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-fg/40 border-b border-fg/10 pb-1">
              {getTranslation(language, 'about.title') || 'Ringkasan Profesi'}
            </h2>
            <p className="text-xs leading-relaxed text-fg/80">{profile.bioFull[language]}</p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-fg/40 border-b border-fg/10 pb-1">
              {getTranslation(language, 'experience.title') || 'Pengalaman Kerja'}
            </h2>
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-fg font-serif italic text-sm">
                    <span>{exp.position[language]} — {exp.companyName}</span>
                    <span className="font-mono not-italic text-[10px] text-fg/50">{exp.startDate} – {exp.isCurrent ? getTranslation(language, 'common.present') || 'Sekarang' : exp.endDate}</span>
                  </div>
                  <p className="text-fg/70 leading-relaxed">{exp.description[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-fg/40 border-b border-fg/10 pb-1">
              {getTranslation(language, 'skills.title') || 'Keahlian Utama'}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="px-2 py-0.5 bg-inset border border-fg/10 text-fg/80 text-[10px] font-mono">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-fg/40 border-b border-fg/10 pb-1">
              {getTranslation(language, 'education.title') || 'Pendidikan'}
            </h2>
            {educations.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <div className="font-serif italic text-fg text-sm">{edu.degree[language]} ({edu.fieldOfStudy[language]})</div>
                  <div className="text-fg/50 text-[10px] font-mono">{edu.institutionName} • IPK: {edu.gpa}/{edu.maxGpa}</div>
                </div>
                <span className="font-mono text-[10px] text-fg/40">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShowQRModal(false)}
        >
          <div 
            className="bg-overlay border border-fg/15 rounded-[var(--radius)] p-8 max-w-sm w-full text-center space-y-4 text-fg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-serif italic text-fg">{getTranslation(language, 'cv.qrTitle') || 'QR Code Profil & CV'}</h3>
            {/* QR codes need a literal white quiet zone to stay scannable —
                this one must not follow the theme token. */}
            <div className="relative p-4 bg-white rounded-[var(--radius)] inline-block w-56 h-56 mx-auto">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(seoSettings.canonicalUrl || 'https://fajarmelfiano.dev')}`}
                alt="QR Code"
                fill
                className="object-contain p-4"
              />
            </div>
            <p className="text-xs text-fg/60">{getTranslation(language, 'cv.qrSubtitle') || 'Pindai QR Code di atas menggunakan smartphone untuk langsung menyimpan halaman profil.'}</p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 bg-inset border border-fg/10 text-fg font-bold text-[10px] uppercase tracking-widest"
            >
              {getTranslation(language, 'common.close') || 'Tutup'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
