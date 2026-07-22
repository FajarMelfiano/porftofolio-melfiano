'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { BlogPost } from '@/lib/types';
import { BookOpen, Heart, Eye, Calendar, Clock, X, Share2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogSection: React.FC = () => {
  const { blogPosts, language, incrementBlogLike } = useDataContext();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const publishedPosts = blogPosts.filter(p => p.isPublished && !p.isDraft);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    incrementBlogLike(id);
  };

  return (
    <section id="blog" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-white/80" />
            <span>Journal & Research</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'blog.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-[#0F0F0F] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all duration-300"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={post.coverImage}
                    alt={post.title[language]}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-0.5 bg-white text-black text-[9px] uppercase font-bold tracking-tighter">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[10px] uppercase tracking-wider text-white/40 font-mono">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTimeMinutes} {getTranslation(language, 'blog.readTime')}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-serif italic text-white group-hover:text-white/80 transition">
                    {post.title[language]}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                    {post.excerpt[language]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-white/60 text-[9px] font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-[#111111] border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-white group-hover:underline">
                  {getTranslation(language, 'blog.readArticle')} →
                </span>

                <div className="flex items-center space-x-4 text-white/40 font-mono">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.views}</span>
                  </span>
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center space-x-1 hover:text-white transition"
                  >
                    <Heart className="w-3.5 h-3.5 text-white/70" />
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6 rounded-sm text-[#F5F5F5]"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white border border-white/10 rounded-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-10">
                <span className="px-2 py-0.5 bg-white text-black text-[9px] uppercase font-bold tracking-tighter">
                  {selectedPost.category}
                </span>
                <h2 className="text-3xl font-serif italic text-white">
                  {selectedPost.title[language]}
                </h2>
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-wider text-white/40 font-mono">
                  <span>Dipublikasikan: {selectedPost.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedPost.readTimeMinutes} min read</span>
                </div>
              </div>

              <div className="border border-white/10 overflow-hidden h-64 bg-[#1A1A1A]">
                <img src={selectedPost.coverImage} alt={selectedPost.title[language]} className="w-full h-full object-cover" />
              </div>

              {/* Rendered Body */}
              <div className="text-white/80 text-sm leading-relaxed whitespace-pre-wrap font-sans space-y-4">
                {selectedPost.contentMarkdown[language]}
              </div>

              {/* Tags & Action Row */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs">
                <div className="flex items-center space-x-2">
                  <Tag className="w-3.5 h-3.5 text-white/40" />
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#1A1A1A] border border-white/10 text-[9px] font-mono text-white/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Tautan artikel berhasil disalin!');
                  }}
                  className="px-4 py-2 bg-white text-black text-[10px] uppercase font-bold tracking-widest flex items-center space-x-1.5 hover:bg-neutral-200 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{getTranslation(language, 'blog.shareArticle')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
