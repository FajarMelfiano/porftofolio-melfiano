'use client';

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Search, Sun, Moon, Globe, Menu, X, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    isDarkMode,
    toggleDarkMode,
    setIsCommandPaletteOpen,
    isAdminLoggedIn,
    profile,
    systemSettings
  } = useDataContext();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: getTranslation(language, 'nav.home'), href: '#hero' },
    { name: getTranslation(language, 'nav.about'), href: '#about' },
    { name: getTranslation(language, 'nav.skills'), href: '#skills' },
    { name: getTranslation(language, 'nav.experience'), href: '#experience' },
    { name: getTranslation(language, 'nav.projects'), href: '#projects' },
    { name: getTranslation(language, 'nav.certificates'), href: '#certificates' },
    { name: getTranslation(language, 'nav.services'), href: '#services' },
    { name: getTranslation(language, 'nav.blog'), href: '#blog' },
    { name: getTranslation(language, 'nav.cv'), href: '#cv' },
    { name: getTranslation(language, 'nav.contact'), href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initialLetter = profile.name ? profile.name.charAt(0) : 'A';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-[#050505]/60 backdrop-blur-sm border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Engine Title */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-serif italic font-bold text-lg rounded-sm shadow-sm transition-transform group-hover:scale-105">
            {initialLetter}
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest font-semibold text-white/90">
              {profile.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-mono">
              Portfolio Engine v2.0
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-[10px] uppercase tracking-[0.2em] font-medium text-white/60">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="hover:text-white transition-colors py-1 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Controls & Quick Tools */}
        <div className="flex items-center space-x-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 border border-white/15 rounded-sm text-[10px] uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition"
            title="Search Ctrl + K"
          >
            <Search className="w-3 h-3" />
            <span>Search</span>
            <kbd className="px-1 py-0.2 text-[9px] bg-white/10 border border-white/10 rounded-xs font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 border border-white/15 rounded-sm text-[10px] uppercase tracking-wider font-semibold text-white/80 hover:text-white hover:bg-white/5 transition"
            title="Switch Language ID / EN"
          >
            <Globe className="w-3 h-3 text-white/60" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 border border-white/15 rounded-sm text-white/80 hover:text-white hover:bg-white/5 transition"
            title="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Admin Dashboard CTA */}
          <a
            href={systemSettings.adminRoute}
            className={`px-3 py-1.5 border border-white/20 rounded-sm text-[10px] uppercase tracking-wider font-semibold transition-colors ${
              isAdminLoggedIn
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'text-white/80 hover:bg-white hover:text-black'
            }`}
            title="Admin CMS"
          >
            <span className="hidden sm:inline">Admin CMS</span>
            <Shield className="w-3.5 h-3.5 sm:hidden inline" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 border border-white/15 rounded-sm text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A0A0A] border-b border-white/10 px-6 py-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-[11px] uppercase tracking-widest text-white/70">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 border border-white/5 rounded-sm bg-[#111111] hover:bg-white hover:text-black transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
