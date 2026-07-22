'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { BlogPost } from '@/lib/types';
import { Plus, Edit2, Trash2, BookOpen, Check } from 'lucide-react';

export const AdminBlogManager: React.FC = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    titleID: '',
    titleEN: '',
    slug: '',
    coverImage: 'https://picsum.photos/seed/new-blog/800/450',
    category: 'Architecture',
    tagsStr: 'Nextjs, React, Web',
    excerptID: '',
    excerptEN: '',
    contentID: '',
    contentEN: '',
    readTimeMinutes: 5,
    isPublished: true,
    isDraft: false
  });

  const handleStartAdd = () => {
    setEditingId(null);
    setForm({
      titleID: '',
      titleEN: '',
      slug: '',
      coverImage: 'https://picsum.photos/seed/new-blog/800/450',
      category: 'Architecture',
      tagsStr: 'Nextjs, React, Web',
      excerptID: '',
      excerptEN: '',
      contentID: '',
      contentEN: '',
      readTimeMinutes: 5,
      isPublished: true,
      isDraft: false
    });
    setIsEditing(true);
  };

  const handleStartEdit = (b: BlogPost) => {
    setEditingId(b.id);
    setForm({
      titleID: b.title.id,
      titleEN: b.title.en,
      slug: b.slug,
      coverImage: b.coverImage,
      category: b.category,
      tagsStr: b.tags.join(', '),
      excerptID: b.excerpt.id,
      excerptEN: b.excerpt.en,
      contentID: b.contentMarkdown.id,
      contentEN: b.contentMarkdown.en,
      readTimeMinutes: b.readTimeMinutes,
      isPublished: b.isPublished,
      isDraft: b.isDraft
    });
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArr = form.tagsStr.split(',').map(t => t.trim()).filter(Boolean);

    if (editingId) {
      updateBlogPost(editingId, {
        title: { id: form.titleID, en: form.titleEN || form.titleID },
        slug: form.slug || form.titleID.toLowerCase().replace(/\s+/g, '-'),
        coverImage: form.coverImage,
        category: form.category,
        tags: tagsArr,
        excerpt: { id: form.excerptID, en: form.excerptEN || form.excerptID },
        contentMarkdown: { id: form.contentID, en: form.contentEN || form.contentID },
        readTimeMinutes: form.readTimeMinutes,
        isPublished: form.isPublished,
        isDraft: form.isDraft
      });
    } else {
      addBlogPost({
        title: { id: form.titleID, en: form.titleEN || form.titleID },
        slug: form.slug || form.titleID.toLowerCase().replace(/\s+/g, '-'),
        coverImage: form.coverImage,
        category: form.category,
        tags: tagsArr,
        excerpt: { id: form.excerptID, en: form.excerptEN || form.excerptID },
        contentMarkdown: { id: form.contentID, en: form.contentEN || form.contentID },
        readTimeMinutes: form.readTimeMinutes,
        publishedAt: new Date().toISOString().split('T')[0],
        isPublished: form.isPublished,
        isDraft: form.isDraft
      });
    }

    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <span>Kelola Artikel & Blog Teknis</span>
          </h2>
          <p className="text-xs text-slate-500">Tulis, jadwalkan, atau publikasikan artikel panduan dan wawasan teknis.</p>
        </div>

        <button
          onClick={handleStartAdd}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-2 shadow-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Judul Artikel (ID) *</label>
              <input
                type="text"
                required
                value={form.titleID}
                onChange={e => setForm({ ...form, titleID: e.target.value })}
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
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Konten Markdown (ID) *</label>
            <textarea
              rows={8}
              required
              value={form.contentID}
              onChange={e => setForm({ ...form, contentID: e.target.value })}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Artikel</span>
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
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs space-x-4 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <img src={post.coverImage} alt={post.title.id} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{post.title.id}</h4>
                  <p className="text-slate-500">{post.category} • {post.views} Views • {post.likes} Likes</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStartEdit(post)}
                  className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Hapus artikel ini?')) deleteBlogPost(post.id);
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
