'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { User, Target, Award, Heart, Globe, ChevronDown, ChevronUp } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile, language } = useDataContext();
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="py-20 bg-[#050505] text-[#F5F5F5] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <User className="w-3.5 h-3.5 text-white/80" />
            <span>Profil Profesional</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'about.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-4 shadow-xl">
              <h3 className="text-lg font-serif italic text-white flex items-center space-x-2">
                <span>Insinyur Perangkat Lunak & Arsitek Cloud</span>
              </h3>
              <p className="text-white/80 leading-relaxed text-sm sm:text-base font-sans">
                {profile.bioShort[language]}
              </p>
              
              <div className="text-white/60 leading-relaxed text-sm space-y-3 font-sans">
                <p>{profile.bioFull[language]}</p>
                {showMore && (
                  <div className="pt-3 border-t border-white/10 space-y-3 animate-fadeIn">
                    <p>
                      Selama lebih dari 7 tahun berkarir, saya berfokus pada desain sistem terdistribusi skala besar, pengembangan Next.js modern, optimasi database PostgreSQL, serta penerapan arsitektur RAG menggunakan Gemini AI.
                    </p>
                    <p>
                      Prinsip kerja utama saya berlandaskan pada kode yang bersih, mudah diuji, performansi tinggi, serta dampak bisnis yang terukur bagi pengguna akhir.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-widest font-bold text-white hover:text-white/70 pt-2 transition-colors"
              >
                <span>{showMore ? getTranslation(language, 'about.readLess') : getTranslation(language, 'about.readMore')}</span>
                {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Career Goals */}
            <div className="p-6 bg-[#111111] border border-white/15 rounded-sm space-y-2">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
                <Target className="w-3.5 h-3.5 text-white/80" />
                <span>{getTranslation(language, 'about.careerGoalsTitle')}</span>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
                &ldquo;{profile.careerGoals[language]}&rdquo;
              </p>
            </div>
          </div>

          {/* Side Cards: Values, Languages & Hobbies */}
          <div className="lg:col-span-5 space-y-6">
            {/* Professional Values */}
            <div className="p-6 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-4">
              <h4 className="text-sm uppercase tracking-widest font-bold text-white flex items-center space-x-2">
                <Award className="w-4 h-4 text-white/80" />
                <span>{getTranslation(language, 'about.valuesTitle')}</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {profile.professionalValues.map((val, idx) => (
                  <div key={idx} className="p-3 bg-[#1A1A1A] border border-white/5 rounded-sm text-[11px] font-mono text-white/80 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span>{val[language]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spoken Languages */}
            <div className="p-6 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-3">
              <h4 className="text-sm uppercase tracking-widest font-bold text-white flex items-center space-x-2">
                <Globe className="w-4 h-4 text-white/80" />
                <span>{getTranslation(language, 'about.languagesTitle')}</span>
              </h4>
              <div className="space-y-2">
                {profile.languages.map((lang, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-[#1A1A1A] border border-white/5 rounded-sm text-xs">
                    <span className="font-semibold text-white">{lang.name}</span>
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-wider">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="p-6 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-3">
              <h4 className="text-sm uppercase tracking-widest font-bold text-white flex items-center space-x-2">
                <Heart className="w-4 h-4 text-white/80" />
                <span>Minat & Hobi</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((hobby, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#1A1A1A] border border-white/10 text-white/70 text-[10px] uppercase tracking-wider font-mono rounded-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
