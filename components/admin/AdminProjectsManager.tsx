'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Project } from '@/lib/types';
import { Plus, Edit2, Trash2, Folder, Check } from 'lucide-react';

export const AdminProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject, language } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    thumbnail: 'https://picsum.photos/seed/new-project/800/600',
    category: 'Web SaaS',
    tagsStr: 'Next.js, TypeScript, Tailwind',
    shortDescID: '',
    shortDescEN: '',
    fullDescID: '',
    fullDescEN: '',
    roleID: 'Lead Developer',
    roleEN: 'Lead Developer',
    completedDate: '2025-01-01',
    demoUrl: '',
    repoUrl: '',
    isFeatured: true
  });

  const handleStartAdd = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      thumbnail: 'https://picsum.photos/seed/new-project/800/600',
      category: 'Web SaaS',
      tagsStr: 'Next.js, TypeScript, Tailwind',
      shortDescID: '',
      shortDescEN: '',
      fullDescID: '',
      fullDescEN: '',
      roleID: 'Lead Developer',
      roleEN: 'Lead Developer',
      completedDate: '2025-01-01',
      demoUrl: '',
      repoUrl: '',
      isFeatured: true
    });
    setIsEditing(true);
  };

  const handleStartEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      thumbnail: p.thumbnail,
      category: p.category,
      tagsStr: p.tags.join(', '),
      shortDescID: p.shortDescription.id,
      shortDescEN: p.shortDescription.en,
      fullDescID: p.fullDescription.id,
      fullDescEN: p.fullDescription.en,
      roleID: p.role.id,
      roleEN: p.role.en,
      completedDate: p.completedDate,
      demoUrl: p.demoUrl || '',
      repoUrl: p.repoUrl || '',
      isFeatured: p.isFeatured
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = form.tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    if (editingId) {
      updateProject(editingId, {
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
        thumbnail: form.thumbnail,
        category: form.category,
        tags: tagsArr,
        technologies: tagsArr,
        shortDescription: { id: form.shortDescID, en: form.shortDescEN || form.shortDescID },
        fullDescription: { id: form.fullDescID, en: form.fullDescEN || form.fullDescID },
        role: { id: form.roleID, en: form.roleEN },
        completedDate: form.completedDate,
        demoUrl: form.demoUrl,
        repoUrl: form.repoUrl,
        isFeatured: form.isFeatured
      });
    } else {
      addProject({
        title: form.title,
        slug: form.slug || form.title.toLowerCase().replace(/\s+/g, '-'),
        thumbnail: form.thumbnail,
        gallery: [form.thumbnail],
        category: form.category,
        tags: tagsArr,
        technologies: tagsArr,
        shortDescription: { id: form.shortDescID, en: form.shortDescEN || form.shortDescID },
        fullDescription: { id: form.fullDescID, en: form.fullDescEN || form.fullDescID },
        role: { id: form.roleID, en: form.roleEN },
        completedDate: form.completedDate,
        status: 'Completed',
        demoUrl: form.demoUrl,
        repoUrl: form.repoUrl,
        isFeatured: form.isFeatured,
        order: projects.length + 1
      });
    }

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Folder className="w-5 h-5 text-blue-500" />
            <span>Kelola Proyek & Portofolio</span>
          </h2>
          <p className="text-xs text-slate-500">Tambah, edit, atau hapus karya proyek yang ditampilkan di publik.</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
            {editingId ? 'Edit Proyek' : 'Tambah Proyek Baru'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul Proyek *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
              <input
                type="text"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">URL Gambar Thumbnail</label>
            <input
              type="text"
              value={form.thumbnail}
              onChange={e => setForm({ ...form, thumbnail: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Teknologi & Tag (pisahkan dengan koma)</label>
            <input
              type="text"
              value={form.tagsStr}
              onChange={e => setForm({ ...form, tagsStr: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Deskripsi Singkat (Bahasa Indonesia) *</label>
              <textarea
                rows={2}
                required
                value={form.shortDescID}
                onChange={e => setForm({ ...form, shortDescID: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Short Description (English)</label>
              <textarea
                rows={2}
                value={form.shortDescEN}
                onChange={e => setForm({ ...form, shortDescEN: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Demo Live URL</label>
              <input
                type="text"
                value={form.demoUrl}
                onChange={e => setForm({ ...form, demoUrl: e.target.value })}
                placeholder="https://demo.example.com"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">GitHub Repository URL</label>
              <input
                type="text"
                value={form.repoUrl}
                onChange={e => setForm({ ...form, repoUrl: e.target.value })}
                placeholder="https://github.com/user/repo"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Proyek</span>
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
            >
              Batal
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs space-x-4 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <img src={proj.thumbnail} alt={proj.title} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{proj.title}</h4>
                  <p className="text-slate-500">{proj.category} • {proj.views} Views</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStartEdit(proj)}
                  className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Hapus proyek ini?')) deleteProject(proj.id);
                  }}
                  className="p-2 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
