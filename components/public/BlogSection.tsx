'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { BlogPost } from '@/lib/types';
import { BookOpen, Heart, Eye, Calendar, Clock, X, Share2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const BlogSection: React.FC = () => {
  const { blogPosts, language, incrementBlogLike } = useDataContext();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const publishedPosts = blogPosts.filter(p => p.isPublished && !p.isDraft);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    incrementBlogLike(id);
  };

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedPost]);

  return (
    <section id="blog" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <BookOpen className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'blog.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'blog.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-surface border border-fg/10 rounded-[var(--radius)] overflow-hidden flex flex-col justify-between hover:border-fg/30 transition-all duration-300"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-inset">
                  <Image
                    src={post.coverImage}
                    alt={post.title[language]}
                    fill
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2 py-0.5 bg-fg text-canvas text-[9px] uppercase font-bold tracking-tighter">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-3 text-[10px] uppercase tracking-wider text-fg/40 font-mono">
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

                  <h3 className="text-xl font-serif italic text-fg group-hover:text-fg/80 transition">
                    {post.title[language]}
                  </h3>

                  <p className="text-xs text-fg/60 line-clamp-2 leading-relaxed font-sans">
                    {post.excerpt[language]}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {post.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-inset border border-fg/10 text-fg/60 text-[9px] font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 py-3.5 bg-surface-2 border-t border-fg/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-fg group-hover:underline">
                  {getTranslation(language, 'blog.readArticle')} →
                </span>

                <div className="flex items-center space-x-4 text-fg/40 font-mono">
                  <span className="flex items-center space-x-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.views}</span>
                  </span>
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center space-x-1 hover:text-fg transition"
                  >
                    <Heart className="w-3.5 h-3.5 text-fg/70" />
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {publishedPosts.length === 0 && (
          <div className="py-12 text-center text-fg/40 text-xs font-mono uppercase tracking-widest">
            <p>{getTranslation(language, 'common.noData')}</p>
          </div>
        )}
      </div>

      {/* Article Detail Reading Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={() => setSelectedPost(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-overlay border border-fg/15 p-6 sm:p-10 shadow-2xl space-y-6 rounded-[var(--radius)] text-fg"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 p-2 text-fg/60 hover:text-fg border border-fg/10 rounded-[var(--radius)]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3 pr-10">
                <span className="px-2 py-0.5 bg-fg text-canvas text-[9px] uppercase font-bold tracking-tighter">
                  {selectedPost.category}
                </span>
                <h2 className="text-3xl font-serif italic text-fg">
                  {selectedPost.title[language]}
                </h2>
                <div className="flex items-center space-x-4 text-[10px] uppercase tracking-wider text-fg/40 font-mono">
                  <span>{getTranslation(language, 'common.published')} {selectedPost.publishedAt}</span>
                  <span>•</span>
                  <span>{selectedPost.readTimeMinutes} {getTranslation(language, 'blog.readTime')}</span>
                </div>
              </div>

              <div className="relative border border-fg/10 overflow-hidden h-64 bg-inset">
                <Image src={selectedPost.coverImage} alt={selectedPost.title[language]} fill className="object-cover" />
              </div>

              {/* Rendered Body — react-markdown escapes raw HTML by default,
                  so post content can't inject markup. */}
              <div className="prose prose-sm max-w-none font-sans
                prose-headings:font-serif prose-headings:italic prose-headings:text-fg
                prose-p:text-fg/80 prose-li:text-fg/80 prose-strong:text-fg
                prose-a:text-fg prose-a:underline
                prose-code:text-fg prose-code:bg-inset prose-code:px-1 prose-code:py-0.5
                prose-code:rounded-[var(--radius)] prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-inset prose-pre:text-fg prose-pre:border prose-pre:border-fg/10
                prose-blockquote:text-fg/70 prose-blockquote:border-fg/20
                prose-hr:border-fg/10">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {selectedPost.contentMarkdown[language]}
                </ReactMarkdown>
              </div>

              {/* Tags & Action Row */}
              <div className="flex items-center justify-between pt-6 border-t border-fg/10 text-xs">
                <div className="flex items-center space-x-2">
                  <Tag className="w-3.5 h-3.5 text-fg/40" />
                  <div className="flex flex-wrap gap-1">
                    {selectedPost.tags.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-inset border border-fg/10 text-[9px] font-mono text-fg/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert(getTranslation(language, 'common.copied'));
                  }}
                  className="px-4 py-2 bg-fg text-canvas text-[10px] uppercase font-bold tracking-widest flex items-center space-x-1.5 hover:bg-fg/90 transition"
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
