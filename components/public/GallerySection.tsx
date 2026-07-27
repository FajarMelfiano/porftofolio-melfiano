'use client';

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';
import { GalleryItem } from '@/lib/types';
import { Image as ImageIcon, X, Inbox } from 'lucide-react';
import { getTranslation } from '@/lib/dictionary';

export const GallerySection: React.FC = () => {
  const { gallery, language } = useDataContext();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (activeMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeMedia]);

  const categories = Array.from(new Set(gallery.map(g => g.category)));

  const filtered = activeTab === 'all'
    ? gallery
    : gallery.filter(g => g.category === activeTab);

  return (
    <section id="gallery" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <ImageIcon className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'gallery.tag')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'gallery.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'gallery.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 border rounded-[var(--radius)] text-[10px] uppercase tracking-widest font-bold transition-colors ${
              activeTab === 'all'
                ? 'bg-fg text-canvas border-fg'
                : 'bg-surface text-fg/60 border-fg/10 hover:text-fg hover:border-fg/30'
            }`}
          >
            {getTranslation(language, 'gallery.allPhotos')}
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 border rounded-[var(--radius)] text-[10px] uppercase tracking-widest font-bold transition-colors ${
                activeTab === cat
                  ? 'bg-fg text-canvas border-fg'
                  : 'bg-surface text-fg/60 border-fg/10 hover:text-fg hover:border-fg/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {gallery.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-fg/40 space-y-4">
            <Inbox className="w-12 h-12" />
            <p className="text-sm uppercase tracking-widest font-mono">
              {getTranslation(language, 'gallery.empty')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveMedia(item)}
                className="group cursor-pointer rounded-[var(--radius)] overflow-hidden bg-surface border border-fg/10 relative h-64 hover:border-fg/30 transition"
              >
                {item.mediaType === 'video' ? (
                  <video
                    src={item.mediaUrl}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={item.title[language]}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 flex flex-col justify-end text-fg opacity-90 group-hover:opacity-100 transition">
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-fg text-canvas uppercase tracking-tighter w-max mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif italic text-base leading-snug">{item.title[language]}</h4>
                  <p className="text-[11px] text-fg/60 line-clamp-1 font-sans">{item.caption[language]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveMedia(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-overlay rounded-[var(--radius)] border border-fg/15 p-6 space-y-4 text-fg"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 p-2 text-fg/60 hover:text-fg border border-fg/10 rounded-[var(--radius)] z-10 bg-overlay"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden bg-black border border-fg/10 rounded-[var(--radius)] relative">
              {activeMedia.mediaType === 'video' ? (
                <video src={activeMedia.mediaUrl} controls className="max-h-[70vh] object-contain w-full" />
              ) : (
                <img src={activeMedia.mediaUrl} alt={activeMedia.title[language]} className="max-h-[70vh] object-contain w-full" />
              )}
            </div>

            <div className="p-2 space-y-1">
              <h3 className="font-serif italic text-xl text-fg">{activeMedia.title[language]}</h3>
              <p className="text-xs text-fg/70 font-sans">{activeMedia.caption[language]}</p>
              <span className="text-[10px] font-mono text-fg/40 block pt-1">{activeMedia.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
