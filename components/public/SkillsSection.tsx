'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { getTranslation } from '@/lib/dictionary';
import { Code2, Atom, Palette, Server, Database, Cloud, Sparkles, Users, Wrench, Layers } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills, skillCategories, language } = useDataContext();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = (activeCategory === 'all'
    ? skills
    : skills.filter(s => s.categoryId === activeCategory)).sort((a, b) => a.order - b.order);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-fg" />;
      case 'Atom': return <Atom className="w-4 h-4 text-fg" />;
      case 'Palette': return <Palette className="w-4 h-4 text-fg" />;
      case 'Server': return <Server className="w-4 h-4 text-fg" />;
      case 'Database': return <Database className="w-4 h-4 text-fg" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-fg" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-fg" />;
      case 'Users': return <Users className="w-4 h-4 text-fg" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-fg" />;
      default: return <Layers className="w-4 h-4 text-fg" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-canvas text-fg border-b border-fg/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-[var(--radius)] text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Code2 className="w-3.5 h-3.5 text-fg/80" />
            <span>{getTranslation(language, 'skills.title')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-fg tracking-tight">
            {getTranslation(language, 'skills.title')}
          </h2>
          <p className="text-xs sm:text-sm text-fg/50 uppercase tracking-widest font-mono">
            {getTranslation(language, 'skills.subtitle')}
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 border rounded-[var(--radius)] text-[10px] uppercase tracking-widest font-bold transition-colors ${
              activeCategory === 'all'
                ? 'bg-fg text-canvas border-fg'
                : 'bg-surface text-fg/60 border-fg/10 hover:text-fg hover:border-fg/30'
            }`}
          >
            {getTranslation(language, 'skills.allCategories')}
          </button>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 border rounded-[var(--radius)] text-[10px] uppercase tracking-widest font-bold transition-colors ${
                activeCategory === cat.id
                  ? 'bg-fg text-canvas border-fg'
                  : 'bg-surface text-fg/60 border-fg/10 hover:text-fg hover:border-fg/30'
              }`}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-fg/50 text-sm">{getTranslation(language, 'common.noData')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map(skill => (
              <div
                key={skill.id}
                className="p-6 bg-surface border border-fg/10 rounded-[var(--radius)] hover:border-fg/25 transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-inset border border-fg/10 rounded-[var(--radius)] flex items-center justify-center">
                      {getIconComponent(skill.icon)}
                    </div>
                    <div>
                      <h3 className="font-serif italic text-fg text-lg">{skill.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider text-fg/40 font-mono">
                        {getTranslation(language, 'common.level')} <strong className="text-fg">{skill.level}</strong> ({skill.yearsExperience} {getTranslation(language, 'skills.years')})
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-mono font-bold text-fg/80">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-inset h-1.5 rounded-none border border-fg/5 overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000"
                    style={{ width: `${skill.percentage}%`, backgroundColor: 'var(--accent)' }}
                  />
                </div>

                {skill.description?.[language] && (
                  <p className="text-xs text-fg/60 leading-relaxed font-sans pt-1">
                    {skill.description[language]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
