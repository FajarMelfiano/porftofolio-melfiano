'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Experience } from '@/lib/types';
import { Briefcase } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Select, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, BilingualListEditor, TagsInput,
  useArmedDelete, DeleteConfirmBar
} from './ui';

const EMPLOYMENT_TYPES = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Contract' },
  { value: 'Freelance', label: 'Freelance' },
  { value: 'Internship', label: 'Internship' }
] as const;

const emptyExperience = (order: number): Omit<Experience, 'id'> => ({
  companyName: '',
  companyLogo: '',
  companyUrl: '',
  position: { id: '', en: '' },
  employmentType: 'Full-time',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: { id: '', en: '' },
  responsibilities: [],
  achievements: [],
  technologies: [],
  attachments: [],
  order
});

export const AdminExperienceManager: React.FC = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Experience, 'id'>>(emptyExperience(1));
  const set = <K extends keyof Omit<Experience, 'id'>>(k: K, v: Omit<Experience, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteExperience);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyExperience(experiences.length + 1));
    setIsEditing(true);
  };

  const startEdit = (exp: Experience) => {
    setEditingId(exp.id);
    const { id: _ignored, ...rest } = exp;
    setForm({
      ...rest,
      companyLogo: exp.companyLogo ?? '',
      companyUrl: exp.companyUrl ?? '',
      endDate: exp.endDate ?? '',
      attachments: exp.attachments ?? []
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Experience, 'id'> = {
      ...form,
      position: { id: form.position.id, en: form.position.en || form.position.id },
      description: { id: form.description.id, en: form.description.en || form.description.id },
      // A current role has no end date; clear whatever was typed before.
      endDate: form.isCurrent ? '' : form.endDate,
      responsibilities: form.responsibilities
        .filter(r => r.id.trim())
        .map(r => ({ id: r.id, en: r.en || r.id })),
      achievements: form.achievements
        .filter(a => a.id.trim())
        .map(a => ({ id: a.id, en: a.en || a.id }))
    };
    if (editingId) updateExperience(editingId, payload);
    else addExperience(payload);
    setIsEditing(false);
  };

  const sorted = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Briefcase className="w-5 h-5" />}
        title="Kelola Pengalaman Kerja"
        subtitle="Riwayat karier, tanggung jawab, pencapaian, dan teknologi yang digunakan."
        action={<AddButton onClick={startAdd} label="Tambah Pengalaman" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Pengalaman' : 'Pengalaman Baru'}
            </h3>

            <FormSection title="Perusahaan">
              <Grid>
                <Field label="Nama Perusahaan" required>
                  <TextInput required value={form.companyName} onChange={v => set('companyName', v)} />
                </Field>
                <Field label="Lokasi">
                  <TextInput
                    value={form.location}
                    onChange={v => set('location', v)}
                    placeholder="mis. Jakarta (Hybrid)"
                  />
                </Field>
              </Grid>
              <Grid>
                <Field label="URL Logo Perusahaan">
                  <TextInput value={form.companyLogo ?? ''} onChange={v => set('companyLogo', v)} />
                </Field>
                <Field label="Situs Perusahaan">
                  <TextInput
                    value={form.companyUrl ?? ''}
                    onChange={v => set('companyUrl', v)}
                    placeholder="https://"
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Posisi & Periode">
              <BilingualText
                label="Posisi"
                required
                value={form.position}
                onChange={v => set('position', v)}
              />
              <Grid cols={3}>
                <Field label="Jenis Pekerjaan">
                  <Select
                    value={form.employmentType}
                    onChange={v => set('employmentType', v)}
                    options={EMPLOYMENT_TYPES}
                  />
                </Field>
                <Field label="Mulai" hint="Format YYYY-MM" required>
                  <TextInput
                    required
                    value={form.startDate}
                    onChange={v => set('startDate', v)}
                    placeholder="2023-01"
                  />
                </Field>
                <Field label="Selesai" hint={form.isCurrent ? 'Dinonaktifkan — masih bekerja.' : 'Format YYYY-MM'}>
                  <TextInput
                    value={form.isCurrent ? '' : form.endDate ?? ''}
                    onChange={v => set('endDate', v)}
                    placeholder="2024-12"
                  />
                </Field>
              </Grid>
              <Toggle
                label="Masih bekerja di sini"
                hint="Menampilkan 'Sekarang' sebagai pengganti tanggal selesai."
                checked={form.isCurrent}
                onChange={v => set('isCurrent', v)}
              />
            </FormSection>

            <FormSection title="Deskripsi">
              <BilingualArea
                label="Deskripsi Peran"
                rows={3}
                required
                value={form.description}
                onChange={v => set('description', v)}
              />
            </FormSection>

            <FormSection title="Tanggung Jawab Utama">
              <BilingualListEditor
                value={form.responsibilities}
                onChange={v => set('responsibilities', v)}
                addLabel="Tambah tanggung jawab"
              />
            </FormSection>

            <FormSection title="Pencapaian">
              <BilingualListEditor
                value={form.achievements}
                onChange={v => set('achievements', v)}
                addLabel="Tambah pencapaian"
              />
            </FormSection>

            <FormSection title="Teknologi & Urutan">
              <Field label="Teknologi" hint="Pisahkan dengan koma.">
                <TagsInput
                  value={form.technologies}
                  onChange={v => set('technologies', v)}
                  placeholder="Next.js, TypeScript, PostgreSQL"
                />
              </Field>
              <Field label="Urutan Tampil" hint="Angka kecil tampil lebih dulu.">
                <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
              </Field>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Pengalaman" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(exp => (
            <div key={exp.id} className="space-y-1">
              <ItemRow
                thumbnail={exp.companyLogo || undefined}
                title={exp.position.id || exp.companyName}
                meta={`${exp.companyName} • ${exp.employmentType} • ${exp.startDate} – ${
                  exp.isCurrent ? 'Sekarang' : exp.endDate || '?'
                }`}
                badges={[
                  ...(exp.isCurrent ? [{ label: 'Aktif', tone: 'ok' as const }] : []),
                  { label: `${exp.responsibilities.length} tanggung jawab`, tone: 'muted' as const },
                  { label: `${exp.technologies.length} teknologi`, tone: 'muted' as const }
                ]}
                onEdit={() => startEdit(exp)}
                onDelete={() => trigger(exp.id)}
              />
              {armedId === exp.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada pengalaman kerja." />}
        </div>
      )}
    </div>
  );
};
