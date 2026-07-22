'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { GalleryItem } from '@/lib/types';
import { Image as ImageIcon, X } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { gallery, language } = useDataContext();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const categories = Array.from(new Set(gallery.map(g => g.category)));

  const filtered = activeTab === 'all'
    ? gallery
    : gallery.filter(g => g.category === activeTab);

  return (
    <section id="gallery" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <ImageIcon className="w-3.5 h-3.5 text-white/80" />
            <span>Activities & Events</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            Galeri & Aktivitas Profesional
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            Kumpulan dokumentasi seminar, acara komunitas, pelatihan, dan momen penting perjalanan karir.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
              activeTab === 'all'
                ? 'bg-white text-black border-white'
                : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            Semua Foto
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
                activeTab === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveMedia(item)}
              className="group cursor-pointer rounded-sm overflow-hidden bg-[#0F0F0F] border border-white/10 relative h-64 hover:border-white/30 transition"
            >
              <img
                src={item.mediaUrl}
                alt={item.title[language]}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end text-white opacity-90 group-hover:opacity-100 transition">
                <span className="text-[9px] font-bold px-2 py-0.5 bg-white text-black uppercase tracking-tighter w-max mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif italic text-base leading-snug">{item.title[language]}</h4>
                <p className="text-[11px] text-white/60 line-clamp-1 font-sans">{item.caption[language]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-[#0A0A0A] rounded-sm border border-white/15 p-6 space-y-4 text-[#F5F5F5]">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 p-2 text-white/60 hover:text-white border border-white/10 rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden bg-black border border-white/10">
              <img src={activeMedia.mediaUrl} alt={activeMedia.title[language]} className="max-h-[70vh] object-contain" />
            </div>

            <div className="p-2 space-y-1">
              <h3 className="font-serif italic text-xl text-white">{activeMedia.title[language]}</h3>
              <p className="text-xs text-white/70 font-sans">{activeMedia.caption[language]}</p>
              <span className="text-[10px] font-mono text-white/40 block pt-1">{activeMedia.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
