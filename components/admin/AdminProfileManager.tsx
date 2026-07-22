'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { User, Save, Check } from 'lucide-react';

export const AdminProfileManager: React.FC = () => {
  const { profile, updateProfile } = useDataContext();

  const [form, setForm] = useState({
    name: profile.name,
    avatarUrl: profile.avatarUrl,
    currentRoleID: profile.currentRole.id,
    currentRoleEN: profile.currentRole.en,
    shortBioID: profile.bioShort.id,
    shortBioEN: profile.bioShort.en,
    fullBioID: profile.bioFull.id,
    fullBioEN: profile.bioFull.en,
    careerGoalsID: profile.careerGoals.id,
    careerGoalsEN: profile.careerGoals.en,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    github: profile.github,
    linkedin: profile.linkedin,
    instagram: profile.instagram,
    telegram: profile.telegram
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: form.name,
      avatarUrl: form.avatarUrl,
      currentRole: { id: form.currentRoleID, en: form.currentRoleEN },
      bioShort: { id: form.shortBioID, en: form.shortBioEN },
      bioFull: { id: form.fullBioID, en: form.fullBioEN },
      careerGoals: { id: form.careerGoalsID, en: form.careerGoalsEN },
      email: form.email,
      phone: form.phone,
      location: form.location,
      github: form.github,
      linkedin: form.linkedin,
      instagram: form.instagram,
      telegram: form.telegram
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <User className="w-5 h-5 text-blue-500" />
          <span>Kelola Data Diri & Profil</span>
        </h2>
        <p className="text-xs text-slate-500">Ubah informasi pribadi, biografi, kontak, dan tautan jejaring sosial.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Profil berhasil disimpan!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">URL Foto Profil (Avatar)</label>
            <input
              type="text"
              value={form.avatarUrl}
              onChange={e => setForm({ ...form, avatarUrl: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Peran Utama (Bahasa Indonesia)</label>
            <input
              type="text"
              value={form.currentRoleID}
              onChange={e => setForm({ ...form, currentRoleID: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Current Role (English)</label>
            <input
              type="text"
              value={form.currentRoleEN}
              onChange={e => setForm({ ...form, currentRoleEN: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Biografi Singkat (Bahasa Indonesia)</label>
          <textarea
            rows={2}
            value={form.shortBioID}
            onChange={e => setForm({ ...form, shortBioID: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Biografi Lengkap (Bahasa Indonesia)</label>
          <textarea
            rows={4}
            value={form.fullBioID}
            onChange={e => setForm({ ...form, fullBioID: e.target.value })}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Resmi</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Telepon / WhatsApp</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Lokasi Domisili</label>
            <input
              type="text"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Profil</span>
        </button>
      </form>
    </div>
  );
};
