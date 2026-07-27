'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { adminHref } from '@/lib/utils';
import { ArrowUp, Code2, Github, Linkedin, Instagram, Send, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, language, systemSettings } = useDataContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-canvas-deep text-fg/50 py-16 border-t border-fg/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-[var(--radius)] bg-fg text-canvas flex items-center justify-center font-bold text-lg shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif italic text-xl text-fg tracking-tight">
                  {profile.name}
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-fg/40">
                  {getTranslation(language, 'common.portfolio')}
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-fg/60 font-sans">
              {profile.bioShort[language]}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-bold text-fg uppercase tracking-widest font-mono">
              {getTranslation(language, 'footer.quickLinks')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-wider">
              <a href="#about" className="hover:text-fg transition">{getTranslation(language, 'nav.about')}</a>
              <a href="#skills" className="hover:text-fg transition">{getTranslation(language, 'nav.skills')}</a>
              <a href="#projects" className="hover:text-fg transition">{getTranslation(language, 'nav.projects')}</a>
              <a href="#experience" className="hover:text-fg transition">{getTranslation(language, 'nav.experience')}</a>
              <a href="#certificates" className="hover:text-fg transition">{getTranslation(language, 'nav.certificates')}</a>
              <a href="#blog" className="hover:text-fg transition">{getTranslation(language, 'nav.blog')}</a>
              <a href="#cv" className="hover:text-fg transition">{getTranslation(language, 'nav.cv')}</a>
              <a href="#contact" className="hover:text-fg transition">{getTranslation(language, 'nav.contact')}</a>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <h4 className="text-[10px] font-bold text-fg uppercase tracking-widest font-mono">
              {getTranslation(language, 'common.socialLinks')}
            </h4>
            <div className="flex items-center md:justify-end space-x-2">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-[var(--radius)] bg-surface border border-fg/10 hover:border-fg/30 text-fg/70 hover:text-fg transition">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-[var(--radius)] bg-surface border border-fg/10 hover:border-fg/30 text-fg/70 hover:text-fg transition">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-[var(--radius)] bg-surface border border-fg/10 hover:border-fg/30 text-fg/70 hover:text-fg transition">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {profile.telegram && (
                <a href={profile.telegram} target="_blank" rel="noreferrer" className="p-2.5 rounded-[var(--radius)] bg-surface border border-fg/10 hover:border-fg/30 text-fg/70 hover:text-fg transition">
                  <Send className="w-4 h-4" />
                </a>
              )}
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-surface border border-fg/10 text-fg text-[10px] uppercase font-mono font-bold tracking-widest rounded-[var(--radius)] hover:bg-fg hover:text-canvas transition"
              >
                <span>{getTranslation(language, 'footer.backToTop')}</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-fg/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-fg/40 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. {getTranslation(language, 'footer.rights')}</p>
          <div className="flex items-center space-x-4">
            <a href={adminHref(systemSettings.adminRoute)} className="hover:text-fg flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-fg/50" />
              <span>{getTranslation(language, 'common.systemAdmin')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
