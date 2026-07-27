'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Publication } from '@/lib/types';
import { BookOpen } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput, Select,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualArea, TagsInput, useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const TYPES = [
  { value: 'Journal', label: 'Jurnal' },
  { value: 'Conference', label: 'Konferensi' },
  { value: 'Book', label: 'Buku' },
  { value: 'Article', label: 'Artikel' },
  { value: 'Patent', label: 'Paten' }
] as const;

const emptyPublication = (order: number): Omit<Publication, 'id'> => ({
  title: '',
  authors: [],
  year: new Date().getFullYear(),
  abstract: { id: '', en: '' },
  publisher: '',
  journalName: '',
  volumeNo: '',
  doi: '',
  url: '',
  pdfUrl: '',
  thumbnailUrl: '',
  keywords: [],
  citationsCount: 0,
  publicationType: 'Journal',
  order
});

export const AdminPublicationsManager: React.FC = () => {
  const { publications, addPublication, updatePublication, deletePublication } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Publication, 'id'>>(emptyPublication(1));
  const set = <K extends keyof Omit<Publication, 'id'>>(k: K, v: Omit<Publication, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deletePublication);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyPublication(publications.length + 1));
    setIsEditing(true);
  };

  const startEdit = (p: Publication) => {
    setEditingId(p.id);
    const { id: _ignored, ...rest } = p;
    setForm({
      ...rest,
      journalName: p.journalName ?? '',
      volumeNo: p.volumeNo ?? '',
      doi: p.doi ?? '',
      url: p.url ?? '',
      pdfUrl: p.pdfUrl ?? '',
      thumbnailUrl: p.thumbnailUrl ?? ''
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Publication, 'id'> = {
      ...form,
      abstract: { id: form.abstract.id, en: form.abstract.en || form.abstract.id }
    };
    if (editingId) updatePublication(editingId, payload);
    else addPublication(payload);
    setIsEditing(false);
  };

  const sorted = [...publications].sort((a, b) => a.order - b.order);
  const totalCitations = publications.reduce((s, p) => s + (p.citationsCount || 0), 0);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<BookOpen className="w-5 h-5" />}
        title="Kelola Publikasi Ilmiah"
        subtitle={`Jurnal, konferensi, dan karya tulis — total ${totalCitations} sitasi tercatat.`}
        action={<AddButton onClick={startAdd} label="Tambah Publikasi" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Publikasi' : 'Publikasi Baru'}
            </h3>

            <FormSection title="Identitas">
              <Field label="Judul Publikasi" required>
                <TextInput required value={form.title} onChange={v => set('title', v)} />
              </Field>
              <Field label="Penulis" hint="Pisahkan dengan koma, sesuai urutan penulisan.">
                <TagsInput
                  value={form.authors}
                  onChange={v => set('authors', v)}
                  placeholder="Fajar Melfiano Obese A.T., Prof. Dr. S. Widodo"
                />
              </Field>
              <Grid cols={3}>
                <Field label="Jenis Publikasi">
                  <Select
                    value={form.publicationType}
                    onChange={v => set('publicationType', v)}
                    options={TYPES}
                  />
                </Field>
                <Field label="Tahun" required>
                  <NumberInput min={1900} value={form.year} onChange={v => set('year', v)} />
                </Field>
                <Field label="Jumlah Sitasi">
                  <NumberInput
                    min={0}
                    value={form.citationsCount}
                    onChange={v => set('citationsCount', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Penerbit">
              <Grid>
                <Field label="Penerbit" required>
                  <TextInput required value={form.publisher} onChange={v => set('publisher', v)} />
                </Field>
                <Field label="Nama Jurnal">
                  <TextInput value={form.journalName ?? ''} onChange={v => set('journalName', v)} />
                </Field>
              </Grid>
              <Grid>
                <Field label="Volume / Nomor" hint="mis. Vol. 30, No. 4">
                  <TextInput value={form.volumeNo ?? ''} onChange={v => set('volumeNo', v)} />
                </Field>
                <Field label="DOI" hint="Tanpa awalan https://doi.org/">
                  <TextInput
                    value={form.doi ?? ''}
                    onChange={v => set('doi', v)}
                    placeholder="10.1109/TSE.2024.309218"
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Abstrak & Kata Kunci">
              <BilingualArea
                label="Abstrak"
                rows={4}
                value={form.abstract}
                onChange={v => set('abstract', v)}
              />
              <Field label="Kata Kunci" hint="Pisahkan dengan koma.">
                <TagsInput value={form.keywords} onChange={v => set('keywords', v)} />
              </Field>
            </FormSection>

            <FormSection title="Tautan & Urutan">
              <Grid cols={3}>
                <Field label="URL Publikasi">
                  <TextInput value={form.url ?? ''} onChange={v => set('url', v)} />
                </Field>
                <ImageUploader
                  label="File PDF Publikasi (Opsional)"
                  value={form.pdfUrl}
                  onChange={v => setForm({ ...form, pdfUrl: v })}
                  folder="publications"
                  accept="application/pdf"
                />
                <ImageUploader
                  label="Thumbnail Jurnal (Opsional)"
                  value={form.thumbnailUrl}
                  onChange={v => setForm({ ...form, thumbnailUrl: v })}
                  folder="publications"
                />
              </Grid>
              <Field label="Urutan Tampil">
                <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
              </Field>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Publikasi" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(p => (
            <div key={p.id} className="space-y-1">
              <ItemRow
                thumbnail={p.thumbnailUrl || undefined}
                title={p.title}
                meta={`${p.authors.join(', ') || 'Tanpa penulis'} • ${p.publisher} (${p.year})`}
                badges={[
                  { label: p.publicationType, tone: 'ok' as const },
                  { label: `${p.citationsCount} sitasi`, tone: 'muted' as const },
                  ...(p.doi ? [{ label: 'DOI tersedia', tone: 'muted' as const }] : [])
                ]}
                onEdit={() => startEdit(p)}
                onDelete={() => trigger(p.id)}
              />
              {armedId === p.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada publikasi." />}
        </div>
      )}
    </div>
  );
};
