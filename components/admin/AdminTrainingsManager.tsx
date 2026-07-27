'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Training } from '@/lib/types';
import { BookMarked } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  TagsInput, useArmedDelete, DeleteConfirmBar
} from './ui';

const emptyTraining = (order: number): Omit<Training, 'id'> => ({
  trainingName: '',
  organizer: '',
  date: '',
  durationHours: 8,
  instructor: '',
  skillsLearned: [],
  certificateUrl: '',
  trainingUrl: '',
  isCompleted: true,
  order
});

export const AdminTrainingsManager: React.FC = () => {
  const { trainings, addTraining, updateTraining, deleteTraining } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Training, 'id'>>(emptyTraining(1));
  const set = <K extends keyof Omit<Training, 'id'>>(k: K, v: Omit<Training, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteTraining);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyTraining(trainings.length + 1));
    setIsEditing(true);
  };

  const startEdit = (t: Training) => {
    setEditingId(t.id);
    const { id: _ignored, ...rest } = t;
    setForm({ ...rest, certificateUrl: t.certificateUrl ?? '', trainingUrl: t.trainingUrl ?? '' });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateTraining(editingId, form);
    else addTraining(form);
    setIsEditing(false);
  };

  const sorted = [...trainings].sort((a, b) => a.order - b.order);
  const totalHours = trainings.reduce((sum, t) => sum + (t.durationHours || 0), 0);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<BookMarked className="w-5 h-5" />}
        title="Kelola Pelatihan & Kursus"
        subtitle={`Program pelatihan yang diikuti — total ${totalHours} jam tercatat.`}
        action={<AddButton onClick={startAdd} label="Tambah Pelatihan" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Pelatihan' : 'Pelatihan Baru'}
            </h3>

            <FormSection title="Program">
              <Field label="Nama Pelatihan" required>
                <TextInput
                  required
                  value={form.trainingName}
                  onChange={v => set('trainingName', v)}
                />
              </Field>
              <Grid>
                <Field label="Penyelenggara" required>
                  <TextInput required value={form.organizer} onChange={v => set('organizer', v)} />
                </Field>
                <Field label="Instruktur">
                  <TextInput value={form.instructor} onChange={v => set('instructor', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Waktu">
              <Grid cols={3}>
                <Field label="Tanggal" required>
                  <TextInput required type="date" value={form.date} onChange={v => set('date', v)} />
                </Field>
                <Field label="Durasi (jam)">
                  <NumberInput
                    min={0}
                    value={form.durationHours}
                    onChange={v => set('durationHours', v)}
                  />
                </Field>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
              </Grid>
              <Toggle
                label="Sudah selesai"
                hint="Menentukan badge Selesai / Berjalan."
                checked={form.isCompleted}
                onChange={v => set('isCompleted', v)}
              />
            </FormSection>

            <FormSection title="Materi & Tautan">
              <Field label="Keterampilan yang Dipelajari" hint="Pisahkan dengan koma.">
                <TagsInput
                  value={form.skillsLearned}
                  onChange={v => set('skillsLearned', v)}
                  placeholder="Domain Driven Design, Event Sourcing"
                />
              </Field>
              <Grid>
                <Field label="URL Sertifikat">
                  <TextInput
                    value={form.certificateUrl ?? ''}
                    onChange={v => set('certificateUrl', v)}
                  />
                </Field>
                <Field label="URL Halaman Pelatihan">
                  <TextInput value={form.trainingUrl ?? ''} onChange={v => set('trainingUrl', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Pelatihan" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(t => (
            <div key={t.id} className="space-y-1">
              <ItemRow
                title={t.trainingName}
                meta={`${t.organizer} • ${t.date} • ${t.durationHours} jam${
                  t.instructor ? ` • ${t.instructor}` : ''
                }`}
                badges={[
                  t.isCompleted
                    ? { label: 'Selesai', tone: 'ok' as const }
                    : { label: 'Berjalan', tone: 'warn' as const },
                  { label: `${t.skillsLearned.length} keterampilan`, tone: 'muted' as const }
                ]}
                onEdit={() => startEdit(t)}
                onDelete={() => trigger(t.id)}
              />
              {armedId === t.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada pelatihan." />}
        </div>
      )}
    </div>
  );
};
