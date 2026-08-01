'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { BlogPost } from '@/lib/types';
import { BookOpen, Eye, Heart } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, TagsInput, useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

/** Rough estimate at 200 words per minute; the admin can override it. */
const estimateReadTime = (text: string) =>
  Math.max(1, Math.round(text.trim().split(/\s+/).filter(Boolean).length / 200));

type BlogForm = Omit<BlogPost, 'id' | 'views' | 'likes' | 'commentsCount'>;

const emptyPost = (): BlogForm => ({
  slug: '',
  title: { id: '', en: '' },
  excerpt: { id: '', en: '' },
  contentMarkdown: { id: '', en: '' },
  coverImage: '',
  category: '',
  tags: [],
  readTimeMinutes: 5,
  publishedAt: new Date().toISOString().split('T')[0],
  isPublished: true,
  isDraft: false
});

export const AdminBlogManager: React.FC = () => {
  const { success } = useToast();
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useDataContext();

  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<BlogForm>(emptyPost());
  const set = <K extends keyof BlogForm>(k: K, v: BlogForm[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteBlogPost);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyPost());
    setIsEditing(true);
  };

  const startEdit = (p: BlogPost) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      contentMarkdown: p.contentMarkdown,
      coverImage: p.coverImage,
      category: p.category,
      tags: p.tags,
      readTimeMinutes: p.readTimeMinutes,
      publishedAt: p.publishedAt,
      isPublished: p.isPublished,
      isDraft: p.isDraft
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: BlogForm = {
      ...form,
      slug: form.slug.trim() || slugify(form.title.id),
      title: { id: form.title.id, en: form.title.en || form.title.id },
      excerpt: { id: form.excerpt.id, en: form.excerpt.en || form.excerpt.id },
      contentMarkdown: {
        id: form.contentMarkdown.id,
        en: form.contentMarkdown.en || form.contentMarkdown.id
      },
      // A draft is never publicly visible, whatever the publish switch says.
      isPublished: form.isDraft ? false : form.isPublished
    };
    if (editingId) updateBlogPost(editingId, payload);
    else addBlogPost(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const visible = blogPosts.filter(p =>
    filter === 'published' ? p.isPublished && !p.isDraft : filter === 'draft' ? p.isDraft : true
  );
  const draftCount = blogPosts.filter(p => p.isDraft).length;
  const liveCount = blogPosts.filter(p => p.isPublished && !p.isDraft).length;

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<BookOpen className="w-5 h-5" />}
        title="Kelola Artikel & Blog"
        subtitle="Tulis artikel dua bahasa dalam format Markdown, atur status terbit dan draf."
        action={<AddButton onClick={startAdd} label="Tulis Artikel" />}
      />

      {!isEditing && (
        <div className="flex items-center gap-2 text-xs">
          {([
            { id: 'all', label: `Semua (${blogPosts.length})` },
            { id: 'published', label: `Terbit (${liveCount})` },
            { id: 'draft', label: `Draf (${draftCount})` }
          ] as const).map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3.5 py-2 rounded-xl font-bold transition ${
                filter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Artikel' : 'Artikel Baru'}
            </h3>

            <FormSection title="Judul & Ringkasan">
              <BilingualText
                label="Judul Artikel"
                required
                value={form.title}
                onChange={v => set('title', v)}
              />
              <Grid>
                <Field label="Slug URL" hint="Kosongkan untuk dibuat otomatis dari judul.">
                  <TextInput
                    value={form.slug}
                    onChange={v => set('slug', v)}
                    placeholder={form.title.id ? slugify(form.title.id) : 'judul-artikel'}
                  />
                </Field>
                <Field label="Kategori" required>
                  <TextInput
                    required
                    value={form.category}
                    onChange={v => set('category', v)}
                    placeholder="Engineering"
                  />
                </Field>
              </Grid>
              <BilingualArea
                label="Ringkasan (Excerpt)"
                rows={2}
                value={form.excerpt}
                onChange={v => set('excerpt', v)}
              />
            </FormSection>

            <FormSection title="Isi Artikel (Markdown)">
              <p className="text-[11px] text-slate-500">
                Mendukung heading, daftar, tautan, tabel, dan blok kode. HTML mentah tidak
                dirender demi keamanan.
              </p>
              <BilingualArea
                label="Konten"
                rows={12}
                mono
                required
                value={form.contentMarkdown}
                onChange={v => set('contentMarkdown', v)}
              />
            </FormSection>

            <FormSection title="Media & Metadata">
              <Field label="URL Gambar Sampul" required>
                <ImageUploader
                  label="Gambar Sampul (Cover)"
                  value={form.coverImage}
                  onChange={v => set('coverImage', v)}
                  folder="blog"
                />
              </Field>
              {form.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.coverImage}
                  alt="Pratinjau sampul"
                  className="w-full max-w-xs h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                />
              )}
              <Field label="Tag" hint="Pisahkan dengan koma.">
                <TagsInput value={form.tags} onChange={v => set('tags', v)} />
              </Field>
              <Grid>
                <Field
                  label="Estimasi Waktu Baca (menit)"
                  hint={`Perkiraan dari isi artikel: ${estimateReadTime(
                    form.contentMarkdown.id
                  )} menit.`}
                >
                  <NumberInput
                    min={1}
                    value={form.readTimeMinutes}
                    onChange={v => set('readTimeMinutes', v)}
                  />
                </Field>
                <Field label="Tanggal Terbit">
                  <TextInput
                    type="date"
                    value={form.publishedAt}
                    onChange={v => set('publishedAt', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Status Publikasi">
              <Grid>
                <Toggle
                  label="Terbitkan artikel"
                  hint="Hanya artikel terbit yang muncul di situs publik."
                  checked={form.isPublished}
                  onChange={v => set('isPublished', v)}
                />
                <Toggle
                  label="Simpan sebagai draf"
                  hint="Draf selalu disembunyikan, meski tombol terbit aktif."
                  checked={form.isDraft}
                  onChange={v => set('isDraft', v)}
                />
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Artikel" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.map(p => (
            <div key={p.id} className="space-y-1">
              <ItemRow
                thumbnail={p.coverImage}
                title={p.title.id}
                meta={`${p.category} • ${p.publishedAt} • ${p.readTimeMinutes} menit baca`}
                badges={[
                  p.isDraft
                    ? { label: 'Draf', tone: 'warn' as const }
                    : p.isPublished
                    ? { label: 'Terbit', tone: 'ok' as const }
                    : { label: 'Belum terbit', tone: 'muted' as const },
                  { label: `${p.views} views`, tone: 'muted' as const },
                  { label: `${p.likes} suka`, tone: 'muted' as const }
                ]}
                extraActions={
                  <span className="hidden sm:flex items-center gap-3 text-slate-400 px-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {p.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {p.likes}
                    </span>
                  </span>
                }
                onEdit={() => startEdit(p)}
                onDelete={() => trigger(p.id)}
              />
              {armedId === p.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {visible.length === 0 && <EmptyState message="Tidak ada artikel pada filter ini." />}
        </div>
      )}
    </div>
  );
};
