'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Project } from '@/lib/types';
import { Folder, Eye } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Select, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, BilingualListEditor, TagsInput, StringListEditor,
  useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const STATUSES = [
  { value: 'Completed', label: 'Selesai' },
  { value: 'In Progress', label: 'Sedang Berjalan' },
  { value: 'Archived', label: 'Diarsipkan' }
] as const;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');

const emptyProject = (order: number): Omit<Project, 'id' | 'views'> => ({
  slug: '',
  title: '',
  shortDescription: { id: '', en: '' },
  fullDescription: { id: '', en: '' },
  thumbnail: '',
  gallery: [],
  videoUrl: '',
  category: '',
  tags: [],
  technologies: [],
  role: { id: '', en: '' },
  teamMembers: [],
  completedDate: '',
  status: 'Completed',
  demoUrl: '',
  repoUrl: '',
  problemStatement: { id: '', en: '' },
  solution: { id: '', en: '' },
  keyFeatures: [],
  challenges: { id: '', en: '' },
  results: { id: '', en: '' },
  clientTestimonial: undefined,
  projectType: 'default' as const,
  plantTimeline: [],
  plantInfo: undefined,
  isFeatured: true,
  order
});

/** Blank bilingual blocks are dropped so the public modal hides the section. */
const orUndefined = (v: { id: string; en: string }) =>
  v.id.trim() ? { id: v.id, en: v.en || v.id } : undefined;

export const AdminProjectsManager: React.FC = () => {
  const { projects, addProject, updateProject, deleteProject } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id' | 'views'>>(emptyProject(1));
  const set = <K extends keyof Omit<Project, 'id' | 'views'>>(
    k: K,
    v: Omit<Project, 'id' | 'views'>[K]
  ) => setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteProject);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyProject(projects.length + 1));
    setIsEditing(true);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      thumbnail: p.thumbnail,
      gallery: p.gallery ?? [],
      videoUrl: p.videoUrl ?? '',
      category: p.category,
      tags: p.tags,
      technologies: p.technologies,
      role: p.role,
      teamMembers: p.teamMembers ?? [],
      completedDate: p.completedDate,
      status: p.status,
      demoUrl: p.demoUrl ?? '',
      repoUrl: p.repoUrl ?? '',
      problemStatement: p.problemStatement ?? { id: '', en: '' },
      solution: p.solution ?? { id: '', en: '' },
      keyFeatures: p.keyFeatures ?? [],
      challenges: p.challenges ?? { id: '', en: '' },
      results: p.results ?? { id: '', en: '' },
      clientTestimonial: p.clientTestimonial,
      projectType: p.projectType ?? 'default',
      plantTimeline: p.plantTimeline ?? [],
      plantInfo: p.plantInfo,
      isFeatured: p.isFeatured,
      order: p.order
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Project, 'id' | 'views'> = {
      ...form,
      slug: form.slug.trim() || slugify(form.title),
      shortDescription: {
        id: form.shortDescription.id,
        en: form.shortDescription.en || form.shortDescription.id
      },
      fullDescription: {
        id: form.fullDescription.id,
        en: form.fullDescription.en || form.fullDescription.id
      },
      role: { id: form.role.id, en: form.role.en || form.role.id },
      gallery: form.gallery.filter(Boolean),
      teamMembers: form.teamMembers?.filter(Boolean),
      problemStatement: orUndefined(form.problemStatement ?? { id: '', en: '' }),
      solution: orUndefined(form.solution ?? { id: '', en: '' }),
      challenges: orUndefined(form.challenges ?? { id: '', en: '' }),
      results: orUndefined(form.results ?? { id: '', en: '' }),
      clientTestimonial: form.clientTestimonial,
      projectType: form.projectType,
      plantTimeline: form.plantTimeline,
      plantInfo: form.plantInfo,
      keyFeatures: (form.keyFeatures ?? [])
        .filter(f => f.id.trim())
        .map(f => ({ id: f.id, en: f.en || f.id }))
    };
    if (editingId) updateProject(editingId, payload);
    else addProject(payload);
    setIsEditing(false);
  };

  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Folder className="w-5 h-5" />}
        title="Kelola Proyek & Portofolio"
        subtitle="Studi kasus lengkap: masalah, solusi, fitur, hasil, galeri, dan tautan."
        action={<AddButton onClick={startAdd} label="Tambah Proyek" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Proyek' : 'Proyek Baru'}
            </h3>

            <FormSection title="Informasi Dasar">
              <Grid>
                <Field label="Judul Proyek" required>
                  <TextInput required value={form.title} onChange={v => set('title', v)} />
                </Field>
                <Field label="Slug URL" hint="Kosongkan untuk dibuat otomatis dari judul.">
                  <TextInput
                    value={form.slug}
                    onChange={v => set('slug', v)}
                    placeholder={form.title ? slugify(form.title) : 'nama-proyek'}
                  />
                </Field>
              </Grid>
              <Grid cols={3}>
                <Field label="Kategori" required>
                  <TextInput
                    required
                    value={form.category}
                    onChange={v => set('category', v)}
                    placeholder="AI & Web SaaS"
                  />
                </Field>
                <Field label="Status">
                  <Select value={form.status} onChange={v => set('status', v)} options={STATUSES} />
                </Field>
                <Field label="Tanggal Selesai">
                  <TextInput
                    type="date"
                    value={form.completedDate}
                    onChange={v => set('completedDate', v)}
                  />
                </Field>
              </Grid>
              <BilingualText label="Peran Anda" value={form.role} onChange={v => set('role', v)} />
            </FormSection>

            <FormSection title="Deskripsi">
              <BilingualArea
                label="Deskripsi Singkat"
                rows={2}
                required
                value={form.shortDescription}
                onChange={v => set('shortDescription', v)}
              />
              <BilingualArea
                label="Deskripsi Lengkap"
                rows={4}
                value={form.fullDescription}
                onChange={v => set('fullDescription', v)}
              />
            </FormSection>

            <FormSection title="Studi Kasus">
              <p className="text-[11px] text-slate-500">
                Bagian yang dikosongkan akan disembunyikan otomatis di modal studi kasus.
              </p>
              <BilingualArea
                label="Tantangan / Masalah"
                rows={3}
                value={form.problemStatement ?? { id: '', en: '' }}
                onChange={v => set('problemStatement', v)}
              />
              <BilingualArea
                label="Solusi"
                rows={3}
                value={form.solution ?? { id: '', en: '' }}
                onChange={v => set('solution', v)}
              />
              <BilingualArea
                label="Kendala Teknis"
                rows={3}
                value={form.challenges ?? { id: '', en: '' }}
                onChange={v => set('challenges', v)}
              />
              <BilingualArea
                label="Hasil & Dampak"
                rows={3}
                value={form.results ?? { id: '', en: '' }}
                onChange={v => set('results', v)}
              />
            </FormSection>

            <FormSection title="Fitur Utama">
              <BilingualListEditor
                value={form.keyFeatures ?? []}
                onChange={v => set('keyFeatures', v)}
                addLabel="Tambah fitur"
              />
            </FormSection>

            <FormSection title="Media">
              <Field label="URL Thumbnail" required>
                <ImageUploader
                  label="Thumbnail Utama"
                  value={form.thumbnail}
                  onChange={v => set('thumbnail', v)}
                  folder="projects"
                />
              </Field>
              {form.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.thumbnail}
                  alt="Pratinjau"
                  className="w-full max-w-xs h-32 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                />
              )}
              <Field label="Galeri Gambar" hint="Satu URL per baris.">
                <StringListEditor
                  value={form.gallery}
                  onChange={v => set('gallery', v)}
                  placeholder="https://..."
                  addLabel="Tambah gambar galeri"
                />
              </Field>
              <Field label="URL Video">
                <ImageUploader
                  label="Video Demo (Opsional)"
                  value={form.videoUrl ?? ''}
                  onChange={v => set('videoUrl', v)}
                  folder="projects"
                  accept="video/*"
                />
              </Field>
            </FormSection>

            <FormSection title="Teknologi & Tim">
              <Field label="Tag" hint="Tampil sebagai label di kartu proyek. Pisahkan dengan koma.">
                <TagsInput value={form.tags} onChange={v => set('tags', v)} />
              </Field>
              <Field label="Teknologi" hint="Tampil di modal studi kasus. Pisahkan dengan koma.">
                <TagsInput value={form.technologies} onChange={v => set('technologies', v)} />
              </Field>
              <Field label="Anggota Tim" hint="Pisahkan dengan koma.">
                <TagsInput
                  value={form.teamMembers ?? []}
                  onChange={v => set('teamMembers', v)}
                />
              </Field>
            </FormSection>

            <FormSection title="Tautan">
              <Grid>
                <Field label="URL Demo">
                  <TextInput value={form.demoUrl ?? ''} onChange={v => set('demoUrl', v)} />
                </Field>
                <Field label="URL Repository">
                  <TextInput value={form.repoUrl ?? ''} onChange={v => set('repoUrl', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Tampilan">
              <Grid>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
                <Toggle
                  label="Proyek unggulan"
                  checked={form.isFeatured}
                  onChange={v => set('isFeatured', v)}
                />
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Proyek" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(p => (
            <div key={p.id} className="space-y-1">
              <ItemRow
                thumbnail={p.thumbnail}
                title={p.title}
                meta={`${p.category} • ${p.status} • ${p.completedDate}`}
                badges={[
                  ...(p.isFeatured ? [{ label: 'Unggulan', tone: 'ok' as const }] : []),
                  { label: `${p.views} views`, tone: 'muted' as const },
                  { label: `${p.keyFeatures?.length ?? 0} fitur`, tone: 'muted' as const },
                  ...(p.demoUrl ? [{ label: 'Ada demo', tone: 'muted' as const }] : [])
                ]}
                extraActions={
                  p.demoUrl ? (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                      title="Buka demo"
                    >
                      <Eye className="w-4 h-4" />
                    </a>
                  ) : undefined
                }
                onEdit={() => startEdit(p)}
                onDelete={() => trigger(p.id)}
              />
              {armedId === p.id && <DeleteConfirmBar onCancel={() => trigger(null as any)} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada proyek." />}
        </div>
      )}
    </div>
  );
};
