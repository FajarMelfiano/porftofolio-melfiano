'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { Education } from '@/lib/types';
import { GraduationCap } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, BilingualListEditor,
  useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const emptyEducation = (order: number): Omit<Education, 'id'> => ({
  institutionName: '',
  institutionLogo: '',
  institutionUrl: '',
  degree: { id: '', en: '' },
  fieldOfStudy: { id: '', en: '' },
  startYear: '',
  endYear: '',
  gpa: '',
  maxGpa: '4.00',
  location: '',
  description: { id: '', en: '' },
  academicAchievements: [],
  thesisTitle: { id: '', en: '' },
  order
});

export const AdminEducationManager: React.FC = () => {
  const { success } = useToast();
  const { educations, addEducation, updateEducation, deleteEducation } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Education, 'id'>>(emptyEducation(1));
  const set = <K extends keyof Omit<Education, 'id'>>(k: K, v: Omit<Education, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteEducation);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyEducation(educations.length + 1));
    setIsEditing(true);
  };

  const startEdit = (edu: Education) => {
    setEditingId(edu.id);
    const { id: _ignored, ...rest } = edu;
    setForm({
      ...rest,
      institutionLogo: edu.institutionLogo ?? '',
      institutionUrl: edu.institutionUrl ?? '',
      thesisTitle: edu.thesisTitle ?? { id: '', en: '' }
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const hasThesis = Boolean(form.thesisTitle?.id.trim());
    const payload: Omit<Education, 'id'> = {
      ...form,
      degree: { id: form.degree.id, en: form.degree.en || form.degree.id },
      fieldOfStudy: { id: form.fieldOfStudy.id, en: form.fieldOfStudy.en || form.fieldOfStudy.id },
      description: { id: form.description.id, en: form.description.en || form.description.id },
      academicAchievements: form.academicAchievements
        .filter(a => a.id.trim())
        .map(a => ({ id: a.id, en: a.en || a.id })),
      // Leaving the thesis blank should remove the block, not render an empty card.
      thesisTitle: hasThesis
        ? { id: form.thesisTitle!.id, en: form.thesisTitle!.en || form.thesisTitle!.id }
        : undefined
    };
    if (editingId) updateEducation(editingId, payload);
    else addEducation(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const sorted = [...educations].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<GraduationCap className="w-5 h-5" />}
        title="Kelola Riwayat Pendidikan"
        subtitle="Institusi, gelar, IPK, prestasi akademik, dan judul tugas akhir."
        action={<AddButton onClick={startAdd} label="Tambah Pendidikan" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Pendidikan' : 'Pendidikan Baru'}
            </h3>

            <FormSection title="Institusi">
              <Grid>
                <Field label="Nama Institusi" required>
                  <TextInput
                    required
                    value={form.institutionName}
                    onChange={v => set('institutionName', v)}
                  />
                </Field>
                <Field label="Lokasi">
                  <TextInput value={form.location} onChange={v => set('location', v)} />
                </Field>
              </Grid>
              <Grid>
                <Field label="URL Logo">
                  <ImageUploader
                    label="Logo Institusi (Opsional)"
                    value={form.institutionLogo ?? ''}
                    onChange={v => set('institutionLogo', v)}
                    folder="education"
                  />
                </Field>
                <Field label="Situs Institusi">
                  <TextInput
                    value={form.institutionUrl ?? ''}
                    onChange={v => set('institutionUrl', v)}
                    placeholder="https://"
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Program Studi">
              <BilingualText
                label="Gelar"
                required
                value={form.degree}
                onChange={v => set('degree', v)}
              />
              <BilingualText
                label="Bidang Studi"
                value={form.fieldOfStudy}
                onChange={v => set('fieldOfStudy', v)}
              />
            </FormSection>

            <FormSection title="Periode & Nilai">
              <Grid cols={3}>
                <Field label="Tahun Mulai" required>
                  <TextInput
                    required
                    value={form.startYear}
                    onChange={v => set('startYear', v)}
                    placeholder="2019"
                  />
                </Field>
                <Field label="Tahun Selesai">
                  <TextInput
                    value={form.endYear}
                    onChange={v => set('endYear', v)}
                    placeholder="2021"
                  />
                </Field>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
              </Grid>
              <Grid>
                <Field label="IPK">
                  <TextInput value={form.gpa} onChange={v => set('gpa', v)} placeholder="3.92" />
                </Field>
                <Field label="Skala IPK">
                  <TextInput value={form.maxGpa} onChange={v => set('maxGpa', v)} placeholder="4.00" />
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

            <FormSection title="Prestasi Akademik">
              <BilingualListEditor
                value={form.academicAchievements}
                onChange={v => set('academicAchievements', v)}
                addLabel="Tambah prestasi"
              />
            </FormSection>

            <FormSection title="Tugas Akhir / Tesis">
              <BilingualText
                label="Judul"
                hint="Kosongkan bila tidak ada — blok ini akan disembunyikan."
                value={form.thesisTitle ?? { id: '', en: '' }}
                onChange={v => set('thesisTitle', v)}
              />
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Pendidikan" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(edu => (
            <div key={edu.id} className="space-y-1">
              <ItemRow
                thumbnail={edu.institutionLogo || undefined}
                title={edu.degree.id || edu.institutionName}
                meta={`${edu.institutionName} • ${edu.startYear}–${edu.endYear} • IPK ${edu.gpa}/${edu.maxGpa}`}
                badges={[
                  ...(edu.thesisTitle?.id ? [{ label: 'Ada tesis', tone: 'ok' as const }] : []),
                  {
                    label: `${edu.academicAchievements.length} prestasi`,
                    tone: 'muted' as const
                  }
                ]}
                onEdit={() => startEdit(edu)}
                onDelete={() => trigger(edu.id)}
              />
              {armedId === edu.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada riwayat pendidikan." />}
        </div>
      )}
    </div>
  );
};
