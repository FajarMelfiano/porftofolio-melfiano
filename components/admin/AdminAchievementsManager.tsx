'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Achievement } from '@/lib/types';
import { Trophy } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Select, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, useArmedDelete, DeleteConfirmBar
} from './ui';

const LEVELS = [
  { value: 'International', label: 'Internasional' },
  { value: 'National', label: 'Nasional' },
  { value: 'Regional', label: 'Regional' },
  { value: 'Institutional', label: 'Institusional' }
] as const;

const emptyAchievement = (order: number): Omit<Achievement, 'id'> => ({
  title: { id: '', en: '' },
  level: 'National',
  organizer: '',
  date: '',
  rank: '',
  description: { id: '', en: '' },
  certificateUrl: '',
  imageUrl: '',
  validationUrl: '',
  category: '',
  isFeatured: true,
  order
});

export const AdminAchievementsManager: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Achievement, 'id'>>(emptyAchievement(1));
  const set = <K extends keyof Omit<Achievement, 'id'>>(k: K, v: Omit<Achievement, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteAchievement);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyAchievement(achievements.length + 1));
    setIsEditing(true);
  };

  const startEdit = (a: Achievement) => {
    setEditingId(a.id);
    const { id: _ignored, ...rest } = a;
    setForm({
      ...rest,
      certificateUrl: a.certificateUrl ?? '',
      imageUrl: a.imageUrl ?? '',
      validationUrl: a.validationUrl ?? ''
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Achievement, 'id'> = {
      ...form,
      title: { id: form.title.id, en: form.title.en || form.title.id },
      description: { id: form.description.id, en: form.description.en || form.description.id }
    };
    if (editingId) updateAchievement(editingId, payload);
    else addAchievement(payload);
    setIsEditing(false);
  };

  const sorted = [...achievements].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Trophy className="w-5 h-5" />}
        title="Kelola Prestasi & Penghargaan"
        subtitle="Kompetisi, penghargaan, tingkat, peringkat, dan bukti validasi."
        action={<AddButton onClick={startAdd} label="Tambah Prestasi" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Prestasi' : 'Prestasi Baru'}
            </h3>

            <FormSection title="Judul">
              <BilingualText
                label="Judul Prestasi"
                required
                value={form.title}
                onChange={v => set('title', v)}
              />
            </FormSection>

            <FormSection title="Detail">
              <Grid cols={3}>
                <Field label="Tingkat">
                  <Select value={form.level} onChange={v => set('level', v)} options={LEVELS} />
                </Field>
                <Field label="Peringkat" hint="mis. Juara 1 (Gold Medal)">
                  <TextInput value={form.rank} onChange={v => set('rank', v)} />
                </Field>
                <Field label="Tanggal" required>
                  <TextInput
                    required
                    type="date"
                    value={form.date}
                    onChange={v => set('date', v)}
                  />
                </Field>
              </Grid>
              <Grid>
                <Field label="Penyelenggara" required>
                  <TextInput required value={form.organizer} onChange={v => set('organizer', v)} />
                </Field>
                <Field label="Kategori" hint="mis. Hackathon & AI">
                  <TextInput value={form.category} onChange={v => set('category', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Deskripsi">
              <BilingualArea
                label="Deskripsi"
                rows={3}
                value={form.description}
                onChange={v => set('description', v)}
              />
            </FormSection>

            <FormSection title="Bukti & Tautan">
              <Grid cols={3}>
                <Field label="URL Sertifikat">
                  <TextInput
                    value={form.certificateUrl ?? ''}
                    onChange={v => set('certificateUrl', v)}
                  />
                </Field>
                <Field label="URL Gambar">
                  <TextInput value={form.imageUrl ?? ''} onChange={v => set('imageUrl', v)} />
                </Field>
                <Field label="URL Validasi">
                  <TextInput
                    value={form.validationUrl ?? ''}
                    onChange={v => set('validationUrl', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Tampilan">
              <Grid>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
                <Toggle
                  label="Prestasi unggulan"
                  checked={form.isFeatured}
                  onChange={v => set('isFeatured', v)}
                />
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Prestasi" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(a => (
            <div key={a.id} className="space-y-1">
              <ItemRow
                thumbnail={a.imageUrl || undefined}
                title={a.title.id}
                meta={`${a.organizer} • ${a.date}${a.rank ? ` • ${a.rank}` : ''}`}
                badges={[
                  { label: a.level, tone: 'ok' as const },
                  ...(a.category ? [{ label: a.category, tone: 'muted' as const }] : []),
                  ...(a.isFeatured ? [{ label: 'Unggulan', tone: 'muted' as const }] : [])
                ]}
                onEdit={() => startEdit(a)}
                onDelete={() => trigger(a.id)}
              />
              {armedId === a.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada prestasi." />}
        </div>
      )}
    </div>
  );
};
