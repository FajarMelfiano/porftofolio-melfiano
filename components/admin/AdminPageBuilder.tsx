'use client';

import React from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { Layers, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

export const AdminPageBuilder: React.FC = () => {
  const { success } = useToast();
  const { pageSections, updatePageSections } = useDataContext();

  const handleToggle = (id: string) => {
    const updated = pageSections.map(sec =>
      sec.id === id ? { ...sec, isVisible: !sec.isVisible } : sec
    );
    updatePageSections(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newArr = [...pageSections];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newArr.length) return;

    const temp = newArr[index];
    newArr[index] = newArr[targetIdx];
    newArr[targetIdx] = temp;

    // re-assign order
    const updated = newArr.map((sec, i) => ({ ...sec, order: i + 1 }));
    updatePageSections(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Layers className="w-5 h-5 text-blue-500" />
          <span>Page Builder & Urutan Seksi Website</span>
        </h2>
        <p className="text-xs text-slate-500">Atur seksi halaman publik yang ingin ditampilkan atau disembunyikan serta urutannya.</p>
      </div>

      <div className="space-y-3">
        {pageSections.map((section, idx) => (
          <div
            key={section.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center text-slate-500">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{section.name}</h4>
                <p className="text-slate-500 font-mono text-[11px]">Key: #{section.key}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-30"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === pageSections.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 disabled:opacity-30"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleToggle(section.id)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1 ${
                  section.isVisible
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700'
                    : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700'
                }`}
              >
                {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{section.isVisible ? 'Tampil' : 'Sembunyi'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
