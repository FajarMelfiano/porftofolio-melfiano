'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { ArrowUp, Code2, Github, Linkedin, Instagram, Send, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, language, systemSettings } = useDataContext();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-white/50 py-16 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-sm bg-white text-black flex items-center justify-center font-bold text-lg shadow-sm">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif italic text-xl text-white tracking-tight">
                  {profile.name}
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-white/40">
                  Personal Portfolio & CMS
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed max-w-sm text-white/60 font-sans">
              {profile.bioShort[language]}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">
              {getTranslation(language, 'footer.quickLinks')}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-wider">
              <a href="#about" className="hover:text-white transition">Tentang</a>
              <a href="#skills" className="hover:text-white transition">Keahlian</a>
              <a href="#projects" className="hover:text-white transition">Proyek</a>
              <a href="#experience" className="hover:text-white transition">Karir</a>
              <a href="#certificates" className="hover:text-white transition">Sertifikat</a>
              <a href="#blog" className="hover:text-white transition">Blog</a>
              <a href="#cv" className="hover:text-white transition">CV PDF</a>
              <a href="#contact" className="hover:text-white transition">Kontak</a>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 space-y-4 md:text-right">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">
              Tautan Sosial
            </h4>
            <div className="flex items-center md:justify-end space-x-2">
              <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition">
                <Github className="w-4 h-4" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={profile.telegram} target="_blank" rel="noreferrer" className="p-2.5 rounded-sm bg-[#0F0F0F] border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition">
                <Send className="w-4 h-4" />
              </a>
            </div>

            <div>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0F0F0F] border border-white/10 text-white text-[10px] uppercase font-mono font-bold tracking-widest rounded-sm hover:bg-white hover:text-black transition"
              >
                <span>{getTranslation(language, 'footer.backToTop')}</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-white/40 gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. {getTranslation(language, 'footer.rights')}</p>
          <div className="flex items-center space-x-4">
            <a href={systemSettings.adminRoute} className="hover:text-white flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-white/50" />
              <span>System Admin</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
