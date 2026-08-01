'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { GalleryItem } from '@/lib/types';
import { Image as ImageIcon } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, Select,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const CATEGORIES = [
  { value: 'Events', label: 'Events' },
  { value: 'Projects', label: 'Projects' },
  { value: 'Seminars', label: 'Seminars' },
  { value: 'Work', label: 'Work' },
  { value: 'Certificates', label: 'Certificates' }
] as const;

const MEDIA_TYPES = [
  { value: 'image', label: 'Gambar' },
  { value: 'video', label: 'Video' }
] as const;

const emptyItem = (): Omit<GalleryItem, 'id'> => ({
  title: { id: '', en: '' },
  category: 'Events',
  mediaUrl: '',
  mediaType: 'image',
  caption: { id: '', en: '' },
  date: ''
});

export const AdminGalleryManager: React.FC = () => {
  const { success } = useToast();
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useDataContext();

  const [filter, setFilter] = useState<string>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<GalleryItem, 'id'>>(emptyItem());
  const set = <K extends keyof Omit<GalleryItem, 'id'>>(k: K, v: Omit<GalleryItem, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteGalleryItem);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyItem());
    setIsEditing(true);
  };

  const startEdit = (g: GalleryItem) => {
    setEditingId(g.id);
    const { id: _ignored, ...rest } = g;
    setForm(rest);
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<GalleryItem, 'id'> = {
      ...form,
      title: { id: form.title.id, en: form.title.en || form.title.id },
      caption: { id: form.caption.id, en: form.caption.en || form.caption.id }
    };
    if (editingId) updateGalleryItem(editingId, payload);
    else addGalleryItem(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const visible = filter === 'all' ? gallery : gallery.filter(g => g.category === filter);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<ImageIcon className="w-5 h-5" />}
        title="Kelola Galeri Dokumentasi"
        subtitle="Foto dan video kegiatan, seminar, dan momen penting."
        action={<AddButton onClick={startAdd} label="Tambah Media" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Media' : 'Media Baru'}
            </h3>

            <FormSection title="Media">
              <Field label="URL Media" required>
                <ImageUploader
                  label="File Media"
                  value={form.mediaUrl}
                  onChange={v => set('mediaUrl', v)}
                  folder="gallery"
                  accept={form.mediaType === 'video' ? 'video/*' : 'image/*'}
                />
              </Field>
              {form.mediaUrl && form.mediaType === 'image' && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.mediaUrl}
                  alt="Pratinjau"
                  className="w-full max-w-xs h-40 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                />
              )}
              <Grid cols={3}>
                <Field label="Jenis Media">
                  <Select
                    value={form.mediaType}
                    onChange={v => set('mediaType', v)}
                    options={MEDIA_TYPES}
                  />
                </Field>
                <Field label="Kategori">
                  <Select
                    value={form.category}
                    onChange={v => set('category', v)}
                    options={CATEGORIES}
                  />
                </Field>
                <Field label="Tanggal">
                  <TextInput type="date" value={form.date} onChange={v => set('date', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Keterangan">
              <BilingualText
                label="Judul"
                required
                value={form.title}
                onChange={v => set('title', v)}
              />
              <BilingualArea
                label="Caption"
                rows={2}
                value={form.caption}
                onChange={v => set('caption', v)}
              />
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Media" />
          </form>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                filter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Semua ({gallery.length})
            </button>
            {CATEGORIES.map(c => {
              const count = gallery.filter(g => g.category === c.value).length;
              return (
                <button
                  key={c.value}
                  onClick={() => setFilter(c.value)}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    filter === c.value
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {c.label} ({count})
                </button>
              );
            })}
          </div>

          <div className="space-y-3">
            {visible.map(g => (
              <div key={g.id} className="space-y-1">
                <ItemRow
                  thumbnail={g.mediaType === 'image' ? g.mediaUrl : undefined}
                  title={g.title.id}
                  meta={`${g.category} • ${g.date} • ${g.caption.id}`}
                  badges={[{ label: g.mediaType === 'image' ? 'Gambar' : 'Video', tone: 'muted' }]}
                  onEdit={() => startEdit(g)}
                  onDelete={() => trigger(g.id)}
                />
                {armedId === g.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
              </div>
            ))}
            {visible.length === 0 && <EmptyState message="Belum ada media pada kategori ini." />}
          </div>
        </>
      )}
    </div>
  );
};
