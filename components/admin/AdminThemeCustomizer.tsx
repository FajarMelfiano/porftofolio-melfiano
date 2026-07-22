'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { Palette, Check } from 'lucide-react';

export const AdminThemeCustomizer: React.FC = () => {
  const { themeSettings, updateThemeSettings } = useDataContext();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Palette className="w-5 h-5 text-blue-500" />
          <span>Kustomisasi Tampilan & Tema</span>
        </h2>
        <p className="text-xs text-slate-500">Atur skema warna, font, dan gaya tampilan website secara real-time.</p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 text-xs">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Warna Utama (Palette)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-500 mb-1">Primary Color</label>
              <input
                type="color"
                value={themeSettings.primaryColor}
                onChange={e => updateThemeSettings({ primaryColor: e.target.value })}
                className="w-full h-10 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Secondary Color</label>
              <input
                type="color"
                value={themeSettings.secondaryColor}
                onChange={e => updateThemeSettings({ secondaryColor: e.target.value })}
                className="w-full h-10 rounded-xl cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-slate-500 mb-1">Accent Color</label>
              <input
                type="color"
                value={themeSettings.accentColor}
                onChange={e => updateThemeSettings({ accentColor: e.target.value })}
                className="w-full h-10 rounded-xl cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Tipografi & Font Family</h3>
          <div>
            <label className="block text-slate-500 mb-1">Font Utama</label>
            <select
              value={themeSettings.fontFamily}
              onChange={e => updateThemeSettings({ fontFamily: e.target.value as any })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            >
              <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
              <option value="Inter">Inter</option>
              <option value="Outfit">Outfit</option>
              <option value="Playfair Display">Playfair Display</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Gaya Sudut Kartu (Border Radius)</h3>
          <div className="flex items-center space-x-3">
            {[
              { label: 'Kecil', val: 'sm' },
              { label: 'Sedang', val: 'md' },
              { label: 'Besar', val: 'lg' },
              { label: 'Bulat', val: 'full' }
            ].map(r => (
              <button
                key={r.val}
                onClick={() => updateThemeSettings({ borderRadius: r.val as any })}
                className={`px-4 py-2 rounded-xl capitalize font-bold ${
                  themeSettings.borderRadius === r.val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
