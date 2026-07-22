'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Code2, Atom, Palette, Server, Database, Cloud, Sparkles, Users, Wrench, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills, skillCategories, language } = useDataContext();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(s => s.categoryId === activeCategory);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-white" />;
      case 'Atom': return <Atom className="w-4 h-4 text-white" />;
      case 'Palette': return <Palette className="w-4 h-4 text-white" />;
      case 'Server': return <Server className="w-4 h-4 text-white" />;
      case 'Database': return <Database className="w-4 h-4 text-white" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-white" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-white" />;
      case 'Users': return <Users className="w-4 h-4 text-white" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-white" />;
      default: return <Layers className="w-4 h-4 text-white" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#050505] text-[#F5F5F5] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#0F0F0F] border border-white/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-white/60 font-bold">
            <Code2 className="w-3.5 h-3.5 text-white/80" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            {getTranslation(language, 'skills.title')}
          </h2>
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'skills.subtitle')}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
              activeCategory === 'all'
                ? 'bg-white text-black border-white'
                : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            {getTranslation(language, 'skills.allCategories')}
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-black border-white'
                  : 'bg-[#0F0F0F] text-white/60 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map(skill => (
            <div
              key={skill.id}
              className="p-6 bg-[#0F0F0F] border border-white/10 rounded-sm hover:border-white/25 transition-all duration-300 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-[#1A1A1A] border border-white/10 rounded-sm flex items-center justify-center">
                    {getIconComponent(skill.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif italic text-white text-lg">{skill.name}</h3>
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                      Level: <strong className="text-white">{skill.level}</strong> ({skill.yearsExperience} {getTranslation(language, 'skills.years')})
                    </span>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-white/80">
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#1A1A1A] h-1.5 rounded-none border border-white/5 overflow-hidden">
                <div
                  className="bg-white h-full transition-all duration-1000"
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>

              {skill.description?.[language] && (
                <p className="text-xs text-white/60 leading-relaxed font-sans pt-1">
                  {skill.description[language]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
