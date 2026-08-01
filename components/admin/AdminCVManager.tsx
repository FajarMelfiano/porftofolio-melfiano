'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { CVVersion } from '@/lib/types';
import { FileText, Star, AlertTriangle } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, Select,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const CV_TYPES = [
  { value: 'ATS-Friendly', label: 'ATS-Friendly' },
  { value: 'Professional', label: 'Professional' },
  { value: 'Academic', label: 'Academic' }
] as const;

const LANGUAGES = [
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'en', label: 'English' }
] as const;

const emptyCV = (): Omit<CVVersion, 'id' | 'downloadCount'> => ({
  versionName: '',
  language: 'id',
  type: 'Professional',
  fileUrl: '',
  uploadedAt: new Date().toISOString().split('T')[0],
  isActive: false
});

export const AdminCVManager: React.FC = () => {
  const { success } = useToast();
  const { cvVersions, addCVVersion, updateCVVersion, deleteCVVersion, setActiveCV } =
    useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyCV());
  const set = <K extends keyof ReturnType<typeof emptyCV>>(
    k: K,
    v: ReturnType<typeof emptyCV>[K]
  ) => setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteCVVersion);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyCV());
    setIsEditing(true);
  };

  const startEdit = (cv: CVVersion) => {
    setEditingId(cv.id);
    setForm({
      versionName: cv.versionName,
      language: cv.language,
      type: cv.type,
      fileUrl: cv.fileUrl,
      uploadedAt: cv.uploadedAt,
      isActive: cv.isActive
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) updateCVVersion(editingId, form);
    else addCVVersion(form);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  // The hero's download button falls back to the first entry, so an empty list
  // means the button silently does nothing.
  const hasActive = cvVersions.some(cv => cv.isActive);
  const totalDownloads = cvVersions.reduce((s, cv) => s + (cv.downloadCount || 0), 0);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<FileText className="w-5 h-5" />}
        title="Kelola Versi CV"
        subtitle={`Berkas CV yang bisa diunduh pengunjung — total ${totalDownloads} unduhan.`}
        action={<AddButton onClick={startAdd} label="Tambah Versi CV" />}
      />

      {!isEditing && cvVersions.length > 0 && !hasActive && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>
            Belum ada versi CV yang ditandai aktif. Tombol unduh di halaman utama akan memakai
            entri pertama.
          </span>
        </div>
      )}

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Versi CV' : 'Versi CV Baru'}
            </h3>

            <FormSection title="Berkas">
              <Field label="Nama Berkas / Versi" required>
                <TextInput
                  required
                  value={form.versionName}
                  onChange={v => set('versionName', v)}
                  placeholder="Fajar_Melfiano_CV_2026.pdf"
                />
              </Field>
              <Field
                label="URL Berkas"
                required
                hint="Taruh PDF di folder public/ lalu isi dengan /nama-berkas.pdf, atau tempel URL penuh."
              >
                <ImageUploader
                  label="Unggah File CV"
                  value={form.fileUrl}
                  onChange={v => set('fileUrl', v)}
                  folder="cvs"
                  accept="application/pdf"
                />
              </Field>
            </FormSection>

            <FormSection title="Klasifikasi">
              <Grid cols={3}>
                <Field label="Bahasa">
                  <Select
                    value={form.language}
                    onChange={v => set('language', v)}
                    options={LANGUAGES}
                  />
                </Field>
                <Field label="Tipe CV">
                  <Select value={form.type} onChange={v => set('type', v)} options={CV_TYPES} />
                </Field>
                <Field label="Tanggal Unggah">
                  <TextInput
                    type="date"
                    value={form.uploadedAt}
                    onChange={v => set('uploadedAt', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Versi CV" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {cvVersions.map(cv => (
            <div key={cv.id} className="space-y-1">
              <ItemRow
                title={cv.versionName}
                meta={`${cv.type} • ${cv.language.toUpperCase()} • diunggah ${cv.uploadedAt} • ${
                  cv.downloadCount
                } unduhan`}
                badges={
                  cv.isActive
                    ? [{ label: 'Aktif', tone: 'ok' as const }]
                    : [{ label: 'Tidak aktif', tone: 'muted' as const }]
                }
                extraActions={
                  !cv.isActive ? (
                    <button
                      onClick={() => setActiveCV(cv.id)}
                      className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1 transition"
                      title="Jadikan CV utama untuk tombol unduh"
                    >
                      <Star className="w-3.5 h-3.5" />
                      <span>Jadikan Aktif</span>
                    </button>
                  ) : undefined
                }
                onEdit={() => startEdit(cv)}
                onDelete={() => trigger(cv.id)}
              />
              {armedId === cv.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {cvVersions.length === 0 && <EmptyState message="Belum ada versi CV yang diunggah." />}
        </div>
      )}
    </div>
  );
};
