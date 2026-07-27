'use client';

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Search, X, Folder, BookOpen, Award, Code, Phone, FileText, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getTranslation } from '@/lib/dictionary';

export const CommandPaletteModal: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    projects,
    blogPosts,
    skills,
    certificates,
    language
  } = useDataContext();

  const [searchQuery, setSearchQuery] = useState('');

  // Handle hotkey Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  const query = searchQuery.toLowerCase().trim();

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.shortDescription[language].toLowerCase().includes(query) ||
    p.tags.some(t => t.toLowerCase().includes(query))
  );

  const filteredPosts = blogPosts.filter(b =>
    b.title[language].toLowerCase().includes(query) ||
    b.tags.some(t => t.toLowerCase().includes(query))
  );

  const filteredSkills = skills.filter(s =>
    s.name.toLowerCase().includes(query)
  );

  const filteredCerts = certificates.filter(c =>
    c.title.toLowerCase().includes(query) ||
    c.issuer.toLowerCase().includes(query)
  );

  const quickNavs = [
    { name: getTranslation(language, 'common.projects'), icon: Folder, href: '#projects' },
    { name: getTranslation(language, 'common.skills'), icon: Code, href: '#skills' },
    { name: getTranslation(language, 'common.certificates'), icon: Award, href: '#certificates' },
    { name: getTranslation(language, 'common.resume'), icon: FileText, href: '#cv' },
    { name: getTranslation(language, 'common.contact'), icon: Phone, href: '#contact' },
    { name: getTranslation(language, 'common.blog'), icon: BookOpen, href: '#blog' }
  ];

  const handleSelectNav = (href: string) => {
    setIsCommandPaletteOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-[var(--radius)] bg-overlay border border-fg/15 text-fg shadow-2xl"
          >
          {/* Header Input */}
          <div className="flex items-center px-4 border-b border-fg/10">
            <Search className="w-4 h-4 text-fg/40 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Cari proyek, artikel, keahlian, atau navigasi..."
              className="w-full py-4 text-sm bg-transparent border-0 text-fg placeholder-fg/30 focus:outline-none font-mono"
            />
            <button
              onClick={() => setIsCommandPaletteOpen(false)}
              className="p-1 rounded-[var(--radius)] text-fg/40 hover:text-fg border border-transparent hover:border-fg/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-96 overflow-y-auto p-4 space-y-6 text-xs font-sans">
            {/* Quick Navigation if query is empty */}
            {query === '' && (
              <div>
                <p className="px-2 text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono mb-2">
                  Navigasi Cepat
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickNavs.map((nav, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectNav(nav.href)}
                      className="flex items-center justify-between p-2.5 bg-surface-2 border border-fg/5 rounded-[var(--radius)] text-left text-fg/80 hover:text-fg hover:border-fg/20 transition"
                    >
                      <div className="flex items-center space-x-2.5 font-mono text-[11px]">
                        <nav.icon className="w-3.5 h-3.5 text-fg/60" />
                        <span>{nav.name}</span>
                      </div>
                      <ArrowRight className="w-3 h-3 opacity-50" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <p className="px-2 text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono mb-2">
                  Proyek ({filteredProjects.length})
                </p>
                <div className="space-y-1">
                  {filteredProjects.slice(0, 4).map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelectNav('#projects')}
                      className="w-full text-left p-2.5 bg-surface-2 border border-fg/5 rounded-[var(--radius)] hover:border-fg/20 flex items-start justify-between"
                    >
                      <div>
                        <div className="font-serif italic text-fg text-sm">{p.title}</div>
                        <div className="text-xs text-fg/50 line-clamp-1">{p.shortDescription[language]}</div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 bg-fg text-canvas font-mono font-bold uppercase tracking-tighter ml-2">
                        {p.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Blog Posts */}
            {filteredPosts.length > 0 && (
              <div>
                <p className="px-2 text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono mb-2">
                  Artikel & Blog ({filteredPosts.length})
                </p>
                <div className="space-y-1">
                  {filteredPosts.slice(0, 3).map(b => (
                    <button
                      key={b.id}
                      onClick={() => handleSelectNav('#blog')}
                      className="w-full text-left p-2.5 bg-surface-2 border border-fg/5 rounded-[var(--radius)] hover:border-fg/20 flex items-start justify-between"
                    >
                      <div>
                        <div className="font-serif italic text-fg text-sm">{b.title[language]}</div>
                        <div className="text-[10px] font-mono text-fg/40">{b.publishedAt} • {b.readTimeMinutes} min read</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Skills */}
            {filteredSkills.length > 0 && (
              <div>
                <p className="px-2 text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono mb-2">
                  Keahlian / Skills ({filteredSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5 p-1">
                  {filteredSkills.map(s => (
                    <span
                      key={s.id}
                      className="px-2.5 py-1 bg-inset border border-fg/10 text-fg/80 text-[10px] font-mono"
                    >
                      {s.name} ({s.percentage}%)
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Filtered Certificates */}
            {filteredCerts.length > 0 && (
              <div>
                <p className="px-2 text-[10px] font-bold text-fg/40 uppercase tracking-widest font-mono mb-2">
                  Sertifikat ({filteredCerts.length})
                </p>
                <div className="space-y-1">
                  {filteredCerts.slice(0, 3).map(c => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectNav('#certificates')}
                      className="w-full text-left p-2.5 bg-surface-2 border border-fg/5 rounded-[var(--radius)] hover:border-fg/20 flex items-start justify-between"
                    >
                      <div>
                        <div className="font-serif italic text-fg text-sm">{c.title}</div>
                        <div className="text-[10px] font-mono text-fg/40">{c.issuer} • {c.issueDate}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Empty Search Result */}
            {query !== '' && filteredProjects.length === 0 && filteredPosts.length === 0 && filteredSkills.length === 0 && filteredCerts.length === 0 && (
              <div className="py-8 text-center text-fg/40 font-mono text-xs">
                <p>Tidak ada hasil untuk kata kunci &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts */}
          <div className="px-4 py-2.5 bg-canvas border-t border-fg/10 text-[10px] font-mono text-fg/40 flex items-center justify-between">
            <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-inset border border-fg/10 text-fg/80">Esc</kbd> untuk menutup</span>
            <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-inset border border-fg/10 text-fg/80">{typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) ? '⌘K' : 'Ctrl+K'}</kbd></span>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
