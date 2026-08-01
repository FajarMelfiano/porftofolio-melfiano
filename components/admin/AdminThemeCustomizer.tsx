'use client';

import React from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { ThemeSettings } from '@/lib/types';
import { Palette } from 'lucide-react';

export const AdminThemeCustomizer: React.FC = () => {
  const { success } = useToast();
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
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Mode Tampilan</h3>
          <div className="flex flex-wrap items-center gap-3">
            {([
              { label: 'Terang', val: 'light' },
              { label: 'Gelap', val: 'dark' },
              { label: 'Ikuti Sistem', val: 'system' }
            ] as const).map(m => (
              <button
                key={m.val}
                onClick={() => updateThemeSettings({ mode: m.val })}
                className={`px-4 py-2 rounded-xl font-bold ${
                  themeSettings.mode === m.val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Berlaku untuk seluruh situs publik dan panel admin.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Aktifkan Animasi</h3>
              <p className="text-[11px] text-slate-500">
                Mematikan transisi dan animasi di seluruh situs.
              </p>
            </div>
            <input
              type="checkbox"
              checked={themeSettings.enableAnimations}
              onChange={e => updateThemeSettings({ enableAnimations: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">Warna Aksen</h3>
          <p className="text-[11px] text-slate-500 mb-3">
            Warna aksen dipakai pada bar tingkat keahlian. Warna primer dan sekunder
            disimpan untuk komponen bertema di kemudian hari.
          </p>
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
              onChange={e => updateThemeSettings({ fontFamily: e.target.value as ThemeSettings['fontFamily'] })}
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
                onClick={() => updateThemeSettings({ borderRadius: r.val as ThemeSettings['borderRadius'] })}
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

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Button Style</h3>
          <div className="flex items-center space-x-3">
            {[
              { label: 'Rounded', val: 'rounded' },
              { label: 'Pill', val: 'pill' },
              { label: 'Sharp', val: 'sharp' }
            ].map(r => (
              <button
                key={r.val}
                onClick={() => updateThemeSettings({ buttonStyle: r.val as ThemeSettings['buttonStyle'] })}
                className={`px-4 py-2 rounded-xl capitalize font-bold ${
                  themeSettings.buttonStyle === r.val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Card Style</h3>
          <div className="flex items-center space-x-3">
            {[
              { label: 'Bordered', val: 'bordered' },
              { label: 'Shadow', val: 'shadow' },
              { label: 'Glassmorphism', val: 'glassmorphism' },
              { label: 'Flat', val: 'flat' }
            ].map(r => (
              <button
                key={r.val}
                onClick={() => updateThemeSettings({ cardStyle: r.val as ThemeSettings['cardStyle'] })}
                className={`px-4 py-2 rounded-xl capitalize font-bold ${
                  themeSettings.cardStyle === r.val
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white mb-3">Background Pattern</h3>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: 'Dots', val: 'dots' },
              { label: 'Grid', val: 'grid' },
              { label: 'Waves', val: 'waves' },
              { label: 'None', val: 'none' }
            ].map(r => (
              <button
                key={r.val}
                onClick={() => updateThemeSettings({ bgPattern: r.val as ThemeSettings['bgPattern'] })}
                className={`px-4 py-2 rounded-xl capitalize font-bold ${
                  themeSettings.bgPattern === r.val
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
