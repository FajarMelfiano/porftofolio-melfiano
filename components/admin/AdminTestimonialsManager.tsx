'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Testimonial } from '@/lib/types';
import { MessageSquare, Check, Star } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualArea, useArmedDelete, DeleteConfirmBar
} from './ui';

const emptyTestimonial = (order: number): Omit<Testimonial, 'id' | 'isApproved'> => ({
  clientName: '',
  avatarUrl: '',
  titleRole: '',
  companyName: '',
  content: { id: '', en: '' },
  rating: 5,
  date: '',
  profileUrl: '',
  order
});

export const AdminTestimonialsManager: React.FC = () => {
  const {
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial, approveTestimonial
  } = useDataContext();

  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyTestimonial(1));
  const set = <K extends keyof ReturnType<typeof emptyTestimonial>>(
    k: K,
    v: ReturnType<typeof emptyTestimonial>[K]
  ) => setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteTestimonial);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyTestimonial(testimonials.length + 1));
    setIsEditing(true);
  };

  const startEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      clientName: t.clientName,
      avatarUrl: t.avatarUrl,
      titleRole: t.titleRole,
      companyName: t.companyName,
      content: t.content,
      rating: t.rating,
      date: t.date,
      profileUrl: t.profileUrl ?? '',
      order: t.order
    });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      content: { id: form.content.id, en: form.content.en || form.content.id }
    };
    if (editingId) updateTestimonial(editingId, payload);
    // New testimonials start unapproved so nothing reaches the public site
    // without a deliberate approval step.
    else addTestimonial(payload);
    setIsEditing(false);
  };

  const visible = testimonials.filter(t =>
    filter === 'approved' ? t.isApproved : filter === 'pending' ? !t.isApproved : true
  );
  const sorted = [...visible].sort((a, b) => a.order - b.order);
  const pendingCount = testimonials.filter(t => !t.isApproved).length;

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<MessageSquare className="w-5 h-5" />}
        title="Kelola Testimoni"
        subtitle="Ulasan klien. Hanya testimoni yang disetujui yang tampil di situs publik."
        action={<AddButton onClick={startAdd} label="Tambah Testimoni" />}
      />

      {!isEditing && (
        <div className="flex items-center gap-2 text-xs">
          {([
            { id: 'all', label: `Semua (${testimonials.length})` },
            { id: 'approved', label: `Disetujui (${testimonials.length - pendingCount})` },
            { id: 'pending', label: `Menunggu (${pendingCount})` }
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
              {editingId ? 'Ubah Testimoni' : 'Testimoni Baru'}
            </h3>

            <FormSection title="Pemberi Testimoni">
              <Grid>
                <Field label="Nama Klien" required>
                  <TextInput required value={form.clientName} onChange={v => set('clientName', v)} />
                </Field>
                <Field label="Jabatan">
                  <TextInput
                    value={form.titleRole}
                    onChange={v => set('titleRole', v)}
                    placeholder="Chief Technology Officer"
                  />
                </Field>
              </Grid>
              <Grid>
                <Field label="Perusahaan">
                  <TextInput value={form.companyName} onChange={v => set('companyName', v)} />
                </Field>
                <Field label="URL Foto Profil">
                  <TextInput value={form.avatarUrl} onChange={v => set('avatarUrl', v)} />
                </Field>
              </Grid>
              <Field label="URL Profil (LinkedIn, dll.)">
                <TextInput value={form.profileUrl ?? ''} onChange={v => set('profileUrl', v)} />
              </Field>
            </FormSection>

            <FormSection title="Isi Testimoni">
              <BilingualArea
                label="Testimoni"
                rows={4}
                required
                value={form.content}
                onChange={v => set('content', v)}
              />
            </FormSection>

            <FormSection title="Penilaian">
              <Grid cols={3}>
                <Field label="Rating (1–5)">
                  <NumberInput
                    min={1}
                    max={5}
                    value={form.rating}
                    onChange={v => set('rating', Math.min(5, Math.max(1, v)))}
                  />
                </Field>
                <Field label="Tanggal">
                  <TextInput type="date" value={form.date} onChange={v => set('date', v)} />
                </Field>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Testimoni" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(t => (
            <div key={t.id} className="space-y-1">
              <ItemRow
                thumbnail={t.avatarUrl || undefined}
                title={t.clientName}
                meta={`${t.titleRole}${t.companyName ? ` — ${t.companyName}` : ''} • ${t.date}`}
                badges={[
                  t.isApproved
                    ? { label: 'Disetujui', tone: 'ok' as const }
                    : { label: 'Menunggu persetujuan', tone: 'warn' as const },
                  { label: `${'★'.repeat(t.rating)}`, tone: 'muted' as const }
                ]}
                extraActions={
                  !t.isApproved ? (
                    <button
                      onClick={() => approveTestimonial(t.id)}
                      className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center space-x-1 transition"
                      title="Setujui untuk tampil di situs publik"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Setujui</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateTestimonial(t.id, { isApproved: false })}
                      className="p-2 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 transition"
                      title="Tarik dari situs publik"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )
                }
                onEdit={() => startEdit(t)}
                onDelete={() => trigger(t.id)}
              />
              {armedId === t.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Tidak ada testimoni pada filter ini." />}
        </div>
      )}
    </div>
  );
};
