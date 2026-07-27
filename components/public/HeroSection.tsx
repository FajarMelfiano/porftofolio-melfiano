'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Download, ArrowRight, Github, Linkedin, Instagram, Send, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { profile, heroConfig, language, cvVersions, incrementCVDownload } = useDataContext();

  // Profession rotation animation
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  useEffect(() => {
    if (!profile.titles || profile.titles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTitleIndex(prev => (prev + 1) % profile.titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [profile.titles]);

  const handleDownloadCV = () => {
    const activeCV = cvVersions.find(c => c.isActive) || cvVersions[0];
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

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentTitle = profile.titles[currentTitleIndex]?.[language] || profile.currentRole[language];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-canvas text-fg">
      {/* Background Subtle Lines */}
      <div className="absolute inset-0 bg-grid-lines [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Name & Architect Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-fg/70 font-semibold">
                {profile.availabilityStatus === 'available'
                  ? getTranslation(language, 'hero.availableForWork')
                  : profile.availabilityStatus === 'busy'
                  ? getTranslation(language, 'hero.busy')
                  : getTranslation(language, 'hero.selective')}
              </span>
            </div>

            {/* Name & Rotating Role */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fg/40 font-bold mb-2">
                {heroConfig.greeting?.[language] || heroConfig.greeting?.id || ''}
              </p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-normal tracking-tight leading-none text-fg">
                {profile.name}
              </h1>

              {/* Animated Profession */}
              <div className="h-8 flex items-center mt-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTitleIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-fg/60 italic"
                  >
                    {currentTitle}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Subheadline / Bio Statement */}
            <p className="text-sm text-fg/70 leading-relaxed max-w-xl border-l border-fg/15 pl-4 py-1">
              {heroConfig.subheadline?.[language] || heroConfig.subheadline?.id || ''}
            </p>

            {/* Location & Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-fg/50 font-medium">
              <span className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-fg/70" />
                <span>{profile.location}</span>
              </span>
              <span className="text-fg/20">•</span>
              <span className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-fg/70" />
                <span>{profile.yearsExperience}+ {getTranslation(language, 'hero.yearsExp')}</span>
              </span>
            </div>

            {/* Action Buttons in High-Contrast Monochromatic Style */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handleScrollTo('#projects')}
                className="px-6 py-3 bg-fg text-canvas text-[11px] font-bold uppercase tracking-widest hover:bg-fg/90 transition-colors rounded-[var(--radius)] flex items-center space-x-2 shadow-md"
              >
                <span>{heroConfig.primaryCtaText?.[language] || heroConfig.primaryCtaText?.id || ''}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Hidden until a CV file exists — otherwise the button is a
                  silent no-op for the visitor. */}
              {cvVersions.length > 0 && (
                <button
                  onClick={handleDownloadCV}
                  className="px-6 py-3 border border-fg/20 text-fg text-[11px] font-bold uppercase tracking-widest hover:bg-fg hover:text-canvas transition-colors rounded-[var(--radius)] flex items-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{heroConfig.secondaryCtaText?.[language] || heroConfig.secondaryCtaText?.id || ''}</span>
                </button>
              )}

              <button
                onClick={() => handleScrollTo('#contact')}
                className="px-6 py-3 border border-fg/10 text-fg/80 text-[11px] font-bold uppercase tracking-widest hover:bg-fg/10 transition-colors rounded-[var(--radius)]"
              >
                {getTranslation(language, 'hero.contactMe')}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-4 border-t border-fg/10">
              <span className="text-[10px] uppercase tracking-widest text-fg/40 font-semibold mr-2">Network:</span>
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-fg/10 flex items-center justify-center text-fg/60 hover:text-fg hover:border-fg/40 transition">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-fg/10 flex items-center justify-center text-fg/60 hover:text-fg hover:border-fg/40 transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-fg/10 flex items-center justify-center text-fg/60 hover:text-fg hover:border-fg/40 transition">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {profile.telegram && (
                <a href={profile.telegram} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-fg/10 flex items-center justify-center text-fg/60 hover:text-fg hover:border-fg/40 transition">
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column: Avatar Photo & Sophisticated Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Photo Frame Container */}
              <div className="w-64 h-80 sm:w-72 sm:h-96 bg-surface-2 border border-fg/15 p-2 relative group rounded-[var(--radius)] shadow-2xl">
                <div className="w-full h-full bg-inset overflow-hidden relative">
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={profile.name}
                      fill
                      className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    // Falls back to initials so an unset photo doesn't leave a
                    // broken image frame on the page.
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-serif italic text-6xl text-fg/25 select-none">
                        {profile.name
                          .split(' ')
                          .slice(0, 2)
                          .map(w => w.charAt(0))
                          .join('')}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
                </div>

                {/* Floating Availability Badge */}
                <div className="absolute -bottom-3 -right-3 bg-canvas border border-fg/15 px-3 py-1.5 flex items-center gap-2 rounded-[var(--radius)] shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-fg/80 font-bold">
                {profile.availabilityStatus === 'available' ? getTranslation(language, 'common.availableForProjects') : getTranslation(language, 'common.verifiedProfile')}
              </span>
                </div>
              </div>

              {/* Stat Badge Overlay */}
              <div className="absolute -top-4 -left-6 bg-surface border border-fg/10 p-4 rounded-[var(--radius)] shadow-xl hidden sm:block max-w-[160px]">
                <div className="text-2xl font-serif text-fg">{profile.completedProjectsCount}+</div>
                <div className="text-[9px] uppercase tracking-widest text-fg/40 font-semibold mt-0.5">
                  {getTranslation(language, 'hero.projectsDone')}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Analytics Widget / Quick Stats Row */}
        {heroConfig.showStats && (
          <div className="mt-16 bg-surface border border-fg/10 p-6 sm:p-8 rounded-[var(--radius)] grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-fg">{profile.yearsExperience}+</div>
              <div className="text-[10px] uppercase tracking-widest text-fg/40 font-bold mt-1">
                {getTranslation(language, 'hero.yearsExp')}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-fg">{profile.completedProjectsCount}+</div>
              <div className="text-[10px] uppercase tracking-widest text-fg/40 font-bold mt-1">
                {getTranslation(language, 'hero.projectsDone')}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-fg">{profile.certificatesCount}+</div>
              <div className="text-[10px] uppercase tracking-widest text-fg/40 font-bold mt-1">
                {getTranslation(language, 'common.professionalCerts')}
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif text-fg">{profile.publicationsCount}+</div>
              <div className="text-[10px] uppercase tracking-widest text-fg/40 font-bold mt-1">
                {getTranslation(language, 'common.publicationsWorks')}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
