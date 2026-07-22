'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Project } from '@/lib/types';
import { Folder, ExternalLink, Github, Eye, Search, X, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectsSection: React.FC = () => {
  const { projects, language, incrementProjectView } = useDataContext();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(projects.map(p => p.category)));

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = query === '' ||
      p.title.toLowerCase().includes(query) ||
      p.shortDescription[language].toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const handleOpenCaseStudy = (p: Project) => {
    setSelectedProject(p);
    incrementProjectView(p.id);
  };

  return (
    <section id="projects" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <Folder className="w-3.5 h-3.5 text-white/80" />
            <span>Curated Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'projects.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'projects.subtitle')}
          </p>
        </div>

        {/* Filter Controls & Search bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {getTranslation(language, 'projects.allCategories')}
            </button>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={getTranslation(language, 'projects.searchPlaceholder')}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-sm bg-[#0F0F0F] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-mono"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#0F0F0F] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/30 transition-all duration-300"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative h-48 overflow-hidden bg-[#1A1A1A]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-0.5 bg-white text-black text-[9px] uppercase font-bold tracking-tighter">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-black/80 border border-white/10 text-white/80 text-[9px] font-mono flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{project.views}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-serif italic text-white group-hover:text-white/80 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans">
                    {project.shortDescription[language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] px-2 py-1 border border-white/10 text-white/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="px-6 py-4 bg-[#111111] border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  className="text-white hover:underline flex items-center space-x-1"
                >
                  <span>{getTranslation(language, 'projects.viewDetail')}</span>
                  <span>→</span>
                </button>

                <div className="flex items-center space-x-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-white/60 hover:text-white transition"
                      title={getTranslation(language, 'projects.viewDemo')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-white/60 hover:text-white transition"
                      title={getTranslation(language, 'projects.viewRepo')}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-white/40 text-xs font-mono uppercase tracking-widest">
            <p>Tidak ada proyek yang sesuai dengan kriteria pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* Case Study Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6 rounded-sm text-[#F5F5F5]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-white/60 hover:text-white border border-white/10 hover:border-white/30 rounded-sm transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="space-y-2 pr-10">
                <span className="px-2 py-0.5 bg-white text-black text-[9px] uppercase font-bold tracking-tighter">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-serif italic text-white">
                  {selectedProject.title}
                </h2>
                <p className="text-[10px] uppercase tracking-wider text-white/50 font-mono">
                  Peran: <strong className="text-white">{selectedProject.role[language]}</strong> • Selesai: {selectedProject.completedDate}
                </p>
              </div>

              {/* Main Image Banner */}
              <div className="border border-white/10 overflow-hidden h-64 sm:h-80 bg-[#1A1A1A]">
                <img src={selectedProject.thumbnail} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              {/* Description */}
              <div className="space-y-3 text-sm text-white/80 leading-relaxed font-sans">
                <h3 className="font-serif italic text-white text-lg">Deskripsi Proyek</h3>
                <p>{selectedProject.fullDescription[language]}</p>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {selectedProject.problemStatement && (
                  <div className="p-4 bg-[#111111] border border-white/10 text-xs space-y-1">
                    <span className="font-bold text-white flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
                      <AlertCircle className="w-3.5 h-3.5 text-white/70" />
                      <span>{getTranslation(language, 'projects.problem')}</span>
                    </span>
                    <p className="text-white/70">{selectedProject.problemStatement[language]}</p>
                  </div>
                )}

                {selectedProject.solution && (
                  <div className="p-4 bg-[#111111] border border-white/10 text-xs space-y-1">
                    <span className="font-bold text-white flex items-center space-x-1.5 uppercase tracking-wider text-[10px]">
                      <Lightbulb className="w-3.5 h-3.5 text-white/70" />
                      <span>{getTranslation(language, 'projects.solution')}</span>
                    </span>
                    <p className="text-white/70">{selectedProject.solution[language]}</p>
                  </div>
                )}
              </div>

              {/* Key Features */}
              {selectedProject.keyFeatures && selectedProject.keyFeatures.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-serif italic text-white text-base">
                    {getTranslation(language, 'projects.keyFeatures')}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                    {selectedProject.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2 p-2.5 bg-[#111111] border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>{feat[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">Teknologi yang Digunakan:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-[#1A1A1A] border border-white/10 text-white/80 text-[10px] font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Links */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 bg-white text-black font-bold text-[10px] uppercase tracking-widest flex items-center space-x-2 hover:bg-neutral-200 transition"
                  >
                    <span>{getTranslation(language, 'projects.viewDemo')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest flex items-center space-x-2 hover:bg-white/10 transition"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>{getTranslation(language, 'projects.viewRepo')}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
