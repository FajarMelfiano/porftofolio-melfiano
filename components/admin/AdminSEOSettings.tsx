'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Search, Save, Check } from 'lucide-react';

export const AdminSEOSettings: React.FC = () => {
  const { seoSettings, updateSEOSettings } = useDataContext();

  const [form, setForm] = useState({
    metaTitle: seoSettings.metaTitle,
    metaDescription: seoSettings.metaDescription,
    keywords: seoSettings.keywords,
    ogImage: seoSettings.ogImage,
    googleSearchConsoleMeta: seoSettings.googleSearchConsoleMeta || ''
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOSettings({
      metaTitle: form.metaTitle,
      metaDescription: form.metaDescription,
      keywords: form.keywords,
      ogImage: form.ogImage,
      googleSearchConsoleMeta: form.googleSearchConsoleMeta
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Search className="w-5 h-5 text-blue-500" />
          <span>Pengaturan SEO & Meta Tags</span>
        </h2>
        <p className="text-xs text-slate-500">Kelola judul penelusuran Google, deskripsi meta, kata kunci, dan gambar OpenGraph.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Pengaturan SEO berhasil diperbarui!</span>
          </div>
        )}

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul Halaman (Meta Title)</label>
          <input
            type="text"
            value={form.metaTitle}
            onChange={e => setForm({ ...form, metaTitle: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Deskripsi Halaman (Meta Description)</label>
          <textarea
            rows={3}
            value={form.metaDescription}
            onChange={e => setForm({ ...form, metaDescription: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kata Kunci Utama (Keywords)</label>
          <input
            type="text"
            value={form.keywords}
            onChange={e => setForm({ ...form, keywords: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">URL OpenGraph Sharing Image</label>
          <input
            type="text"
            value={form.ogImage}
            onChange={e => setForm({ ...form, ogImage: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Simpan SEO Settings</span>
        </button>
      </form>
    </div>
  );
};
