'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { FileText, Download, Printer, QrCode } from 'lucide-react';

export const CVViewerSection: React.FC = () => {
  const { cvVersions, language, profile, experiences, educations, skills, incrementCVDownload } = useDataContext();
  const [selectedCvId, setSelectedCvId] = useState<string>(cvVersions[0]?.id || '');
  const [showQRModal, setShowQRModal] = useState<boolean>(false);

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
    <section id="cv" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <FileText className="w-3.5 h-3.5 text-white/80" />
            <span>Official Dossier</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'cv.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'cv.subtitle')}
          </p>
        </div>

        {/* Toolbar & Version Selection */}
        <div className="max-w-4xl mx-auto mb-8 p-4 bg-[#0F0F0F] border border-white/10 rounded-sm shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-white/50">{getTranslation(language, 'cv.selectVersion')}:</span>
            <select
              value={selectedCvId}
              onChange={e => setSelectedCvId(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-sm bg-[#1A1A1A] border border-white/10 text-white font-mono font-semibold focus:outline-none focus:border-white/40"
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
              className="p-2 border border-white/10 rounded-sm bg-[#1A1A1A] text-white/80 hover:text-white transition"
              title="Scan QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-white/10 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition flex items-center space-x-2"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-white text-black rounded-sm text-[10px] uppercase font-bold tracking-widest flex items-center space-x-2 hover:bg-neutral-200 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{getTranslation(language, 'cv.downloadPdf')}</span>
            </button>
          </div>
        </div>

        {/* Interactive ATS CV Render Frame */}
        <div className="max-w-4xl mx-auto bg-[#0F0F0F] text-white rounded-sm p-8 sm:p-12 border border-white/15 shadow-2xl space-y-8 font-sans">
          {/* Header */}
          <div className="border-b border-white/10 pb-6 flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif italic text-white">{profile.name}</h1>
              <p className="text-xs uppercase tracking-widest text-white/60 font-mono mt-1">{profile.currentRole[language]}</p>
              <p className="text-[10px] font-mono text-white/40 mt-1">{profile.location} • {profile.email} • {profile.phone}</p>
            </div>
            <div className="text-right text-[10px] font-mono text-white/40">
              <span className="px-2.5 py-1 bg-[#1A1A1A] border border-white/10 text-white font-bold block mb-1">
                {activeCV?.type || 'Professional'} Format
              </span>
              <span>Diunduh: {activeCV?.downloadCount || 0}x</span>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-white/40 border-b border-white/10 pb-1">
              Ringkasan Profesi
            </h2>
            <p className="text-xs leading-relaxed text-white/80">{profile.bioFull[language]}</p>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-white/40 border-b border-white/10 pb-1">
              Pengalaman Kerja
            </h2>
            <div className="space-y-4">
              {experiences.map(exp => (
                <div key={exp.id} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-white font-serif italic text-sm">
                    <span>{exp.position[language]} — {exp.companyName}</span>
                    <span className="font-mono not-italic text-[10px] text-white/50">{exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}</span>
                  </div>
                  <p className="text-white/70 leading-relaxed">{exp.description[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-2">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-white/40 border-b border-white/10 pb-1">
              Keahlian Utama
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(s => (
                <span key={s.id} className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-white/80 text-[10px] font-mono">
                  {s.name}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-[10px] font-bold uppercase tracking-widest font-mono text-white/40 border-b border-white/10 pb-1">
              Pendidikan
            </h2>
            {educations.map(edu => (
              <div key={edu.id} className="flex justify-between text-xs">
                <div>
                  <div className="font-serif italic text-white text-sm">{edu.degree[language]} ({edu.fieldOfStudy[language]})</div>
                  <div className="text-white/50 text-[10px] font-mono">{edu.institutionName} • IPK: {edu.gpa}/{edu.maxGpa}</div>
                </div>
                <span className="font-mono text-[10px] text-white/40">{edu.startYear} – {edu.endYear}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A0A0A] border border-white/15 rounded-sm p-8 max-w-sm w-full text-center space-y-4 text-[#F5F5F5]">
            <h3 className="text-lg font-serif italic text-white">QR Code Profil & CV</h3>
            <div className="p-4 bg-white rounded-sm inline-block">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://oqiifebriansyah.dev')}`}
                alt="QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-xs text-white/60">Pindai QR Code di atas menggunakan smartphone untuk langsung menyimpan halaman profil.</p>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-2.5 bg-[#1A1A1A] border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
