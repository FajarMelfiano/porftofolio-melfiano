'use client';

import React, { useState, useMemo } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { Certificate } from '@/lib/types';
import { Award } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualArea, TagsInput, useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const emptyCertificate = (order: number): Omit<Certificate, 'id'> => ({
  title: '',
  issuer: '',
  issuerLogo: '',
  issueDate: '',
  expiryDate: '',
  credentialId: '',
  credentialUrl: '',
  thumbnailUrl: '',
  fileUrl: '',
  description: { id: '', en: '' },
  competencies: [],
  category: '',
  isValid: true,
  isFeatured: true,
  order
});

export const AdminCertificatesManager: React.FC = () => {
  const { success } = useToast();
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Certificate, 'id'>>(emptyCertificate(1));
  const set = <K extends keyof Omit<Certificate, 'id'>>(k: K, v: Omit<Certificate, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteCertificate);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyCertificate(certificates.length + 1));
    setIsEditing(true);
  };

  const startEdit = (c: Certificate) => {
    setEditingId(c.id);
    const { id: _ignored, ...rest } = c;
    setForm({
      ...rest,
      issuerLogo: c.issuerLogo ?? '',
      expiryDate: c.expiryDate ?? '',
      fileUrl: c.fileUrl ?? ''
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Certificate, 'id'> = {
      ...form,
      description: { id: form.description.id, en: form.description.en || form.description.id }
    };
    if (editingId) updateCertificate(editingId, payload);
    else addCertificate(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const [now] = useState(() => Date.now());

  const sorted = [...certificates].sort((a, b) => a.order - b.order);
  const isExpired = (c: Certificate) =>
    Boolean(c.expiryDate) && now > 0 && new Date(c.expiryDate as string).getTime() < now;

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Award className="w-5 h-5" />}
        title="Kelola Sertifikat"
        subtitle="Sertifikasi profesional, kredensial, masa berlaku, dan kompetensi."
        action={<AddButton onClick={startAdd} label="Tambah Sertifikat" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Sertifikat' : 'Sertifikat Baru'}
            </h3>

            <FormSection title="Identitas Sertifikat">
              <Grid>
                <Field label="Judul Sertifikat" required>
                  <TextInput required value={form.title} onChange={v => set('title', v)} />
                </Field>
                <Field label="Penerbit" required>
                  <TextInput required value={form.issuer} onChange={v => set('issuer', v)} />
                </Field>
              </Grid>
              <Grid>
                <Field label="Kategori" hint="mis. Cloud Architecture, DevOps">
                  <TextInput value={form.category} onChange={v => set('category', v)} />
                </Field>
                <Field label="Nomor Kredensial">
                  <TextInput value={form.credentialId} onChange={v => set('credentialId', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Masa Berlaku">
              <Grid cols={3}>
                <Field label="Tanggal Terbit" hint="Format YYYY-MM-DD" required>
                  <TextInput
                    required
                    type="date"
                    value={form.issueDate}
                    onChange={v => set('issueDate', v)}
                  />
                </Field>
                <Field label="Tanggal Kedaluwarsa" hint="Kosongkan bila berlaku selamanya.">
                  <TextInput
                    type="date"
                    value={form.expiryDate ?? ''}
                    onChange={v => set('expiryDate', v)}
                  />
                </Field>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Tautan & Gambar">
              <Grid>
                <Field label="URL Verifikasi Kredensial">
                  <TextInput
                    value={form.credentialUrl}
                    onChange={v => set('credentialUrl', v)}
                    placeholder="https://credly.com/..."
                  />
                </Field>
                <ImageUploader
                  label="File Asli (PDF/Image - Opsional)"
                  value={form.fileUrl}
                  onChange={v => setForm({ ...form, fileUrl: v })}
                  folder="certificates"
                  accept="*/*"
                />
              </Grid>
              <Grid>
                <ImageUploader
                  label="Logo Penerbit (Opsional)"
                  value={form.issuerLogo}
                  onChange={v => setForm({ ...form, issuerLogo: v })}
                  folder="certificates"
                />
                <ImageUploader
                  label="Thumbnail/Gambar Sertifikat"
                  value={form.thumbnailUrl}
                  onChange={v => setForm({ ...form, thumbnailUrl: v })}
                  folder="certificates"
                />
              </Grid>
            </FormSection>

            <FormSection title="Deskripsi & Kompetensi">
              <BilingualArea
                label="Deskripsi"
                rows={3}
                value={form.description}
                onChange={v => set('description', v)}
              />
              <Field label="Kompetensi" hint="Pisahkan dengan koma.">
                <TagsInput
                  value={form.competencies}
                  onChange={v => set('competencies', v)}
                  placeholder="Cloud Architecture, IAM Security"
                />
              </Field>
            </FormSection>

            <FormSection title="Status">
              <Grid>
                <Toggle
                  label="Masih valid"
                  hint="Menentukan badge Aktif / Kedaluwarsa."
                  checked={form.isValid}
                  onChange={v => set('isValid', v)}
                />
                <Toggle
                  label="Sertifikat unggulan"
                  checked={form.isFeatured}
                  onChange={v => set('isFeatured', v)}
                />
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Sertifikat" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(c => (
            <div key={c.id} className="space-y-1">
              <ItemRow
                thumbnail={c.issuerLogo || c.thumbnailUrl || undefined}
                title={c.title}
                meta={`${c.issuer} • terbit ${c.issueDate}${c.expiryDate ? ` • s.d. ${c.expiryDate}` : ''}`}
                badges={[
                  c.isValid
                    ? { label: 'Valid', tone: 'ok' as const }
                    : { label: 'Tidak valid', tone: 'warn' as const },
                  ...(isExpired(c) && c.isValid
                    ? [{ label: 'Tanggal sudah lewat', tone: 'warn' as const }]
                    : []),
                  ...(c.isFeatured ? [{ label: 'Unggulan', tone: 'muted' as const }] : [])
                ]}
                onEdit={() => startEdit(c)}
                onDelete={() => trigger(c.id)}
              />
              {armedId === c.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada sertifikat." />}
        </div>
      )}
    </div>
  );
};
