'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { Service } from '@/lib/types';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, TextArea, NumberInput, Select, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, BilingualListEditor,
  useArmedDelete, DeleteConfirmBar
} from './ui';

const ICONS = ['Code', 'Sparkles', 'Server'].map(v => ({ value: v, label: v }));

const emptyService = (order: number): Omit<Service, 'id'> => ({
  title: { id: '', en: '' },
  icon: 'Code',
  shortDescription: { id: '', en: '' },
  startingPrice: '',
  duration: '',
  deliverables: [],
  workflowSteps: [],
  faqs: [],
  isFeatured: true,
  order
});

export const AdminServicesManager: React.FC = () => {
  const { success } = useToast();
  const { services, addService, updateService, deleteService } = useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>(emptyService(1));
  const set = <K extends keyof Omit<Service, 'id'>>(k: K, v: Omit<Service, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteService);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyService(services.length + 1));
    setIsEditing(true);
  };

  const startEdit = (s: Service) => {
    setEditingId(s.id);
    const { id: _ignored, ...rest } = s;
    setForm(rest);
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Service, 'id'> = {
      ...form,
      title: { id: form.title.id, en: form.title.en || form.title.id },
      shortDescription: {
        id: form.shortDescription.id,
        en: form.shortDescription.en || form.shortDescription.id
      },
      deliverables: form.deliverables
        .filter(d => d.id.trim())
        .map(d => ({ id: d.id, en: d.en || d.id })),
      // Renumber steps so deleting a middle row doesn't leave a gap.
      workflowSteps: form.workflowSteps
        .filter(w => w.title.trim())
        .map((w, i) => ({ ...w, step: i + 1 })),
      faqs: form.faqs
        .filter(f => f.question.id.trim())
        .map(f => ({
          question: { id: f.question.id, en: f.question.en || f.question.id },
          answer: { id: f.answer.id, en: f.answer.en || f.answer.id }
        }))
    };
    if (editingId) updateService(editingId, payload);
    else addService(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Wrench className="w-5 h-5" />}
        title="Kelola Layanan Profesional"
        subtitle="Paket layanan, harga, deliverables, alur kerja, dan FAQ."
        action={<AddButton onClick={startAdd} label="Tambah Layanan" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Layanan' : 'Layanan Baru'}
            </h3>

            <FormSection title="Identitas Layanan">
              <BilingualText
                label="Nama Layanan"
                required
                value={form.title}
                onChange={v => set('title', v)}
              />
              <BilingualArea
                label="Deskripsi Singkat"
                rows={3}
                value={form.shortDescription}
                onChange={v => set('shortDescription', v)}
              />
            </FormSection>

            <FormSection title="Harga & Durasi">
              <Grid cols={3}>
                <Field label="Harga Mulai" hint="mis. $1,500 USD">
                  <TextInput
                    value={form.startingPrice}
                    onChange={v => set('startingPrice', v)}
                  />
                </Field>
                <Field label="Estimasi Durasi" hint="mis. 2 - 6 Minggu">
                  <TextInput value={form.duration} onChange={v => set('duration', v)} />
                </Field>
                <Field label="Ikon">
                  <Select value={form.icon} onChange={v => set('icon', v)} options={ICONS} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Deliverables">
              <BilingualListEditor
                value={form.deliverables}
                onChange={v => set('deliverables', v)}
                addLabel="Tambah deliverable"
              />
            </FormSection>

            <FormSection title="Alur Kerja">
              <div className="space-y-3">
                {form.workflowSteps.map((w, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Langkah {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          set('workflowSteps', form.workflowSteps.filter((_, j) => j !== i))
                        }
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                        aria-label="Hapus langkah"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <TextInput
                      value={w.title}
                      placeholder="Judul langkah"
                      onChange={v =>
                        set(
                          'workflowSteps',
                          form.workflowSteps.map((x, j) => (j === i ? { ...x, title: v } : x))
                        )
                      }
                    />
                    <TextArea
                      rows={2}
                      value={w.description}
                      placeholder="Penjelasan langkah"
                      onChange={v =>
                        set(
                          'workflowSteps',
                          form.workflowSteps.map((x, j) => (j === i ? { ...x, description: v } : x))
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    set('workflowSteps', [
                      ...form.workflowSteps,
                      { step: form.workflowSteps.length + 1, title: '', description: '' }
                    ])
                  }
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah langkah</span>
                </button>
              </div>
            </FormSection>

            <FormSection title="FAQ">
              <div className="space-y-3">
                {form.faqs.map((f, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        FAQ {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => set('faqs', form.faqs.filter((_, j) => j !== i))}
                        className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                        aria-label="Hapus FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <TextInput
                      value={f.question.id}
                      placeholder="Pertanyaan (Indonesia)"
                      onChange={v =>
                        set(
                          'faqs',
                          form.faqs.map((x, j) =>
                            j === i ? { ...x, question: { ...x.question, id: v } } : x
                          )
                        )
                      }
                    />
                    <TextInput
                      value={f.question.en}
                      placeholder="Question (English, opsional)"
                      onChange={v =>
                        set(
                          'faqs',
                          form.faqs.map((x, j) =>
                            j === i ? { ...x, question: { ...x.question, en: v } } : x
                          )
                        )
                      }
                    />
                    <TextArea
                      rows={2}
                      value={f.answer.id}
                      placeholder="Jawaban (Indonesia)"
                      onChange={v =>
                        set(
                          'faqs',
                          form.faqs.map((x, j) =>
                            j === i ? { ...x, answer: { ...x.answer, id: v } } : x
                          )
                        )
                      }
                    />
                    <TextArea
                      rows={2}
                      value={f.answer.en}
                      placeholder="Answer (English, opsional)"
                      onChange={v =>
                        set(
                          'faqs',
                          form.faqs.map((x, j) =>
                            j === i ? { ...x, answer: { ...x.answer, en: v } } : x
                          )
                        )
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    set('faqs', [
                      ...form.faqs,
                      { question: { id: '', en: '' }, answer: { id: '', en: '' } }
                    ])
                  }
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah FAQ</span>
                </button>
              </div>
            </FormSection>

            <FormSection title="Tampilan">
              <Grid>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                </Field>
                <Toggle
                  label="Layanan unggulan"
                  checked={form.isFeatured}
                  onChange={v => set('isFeatured', v)}
                />
              </Grid>
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Layanan" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(s => (
            <div key={s.id} className="space-y-1">
              <ItemRow
                title={s.title.id}
                meta={`${s.startingPrice || 'Harga belum diisi'} • ${s.duration || 'Durasi belum diisi'}`}
                badges={[
                  { label: `${s.deliverables.length} deliverable`, tone: 'muted' as const },
                  { label: `${s.workflowSteps.length} langkah`, tone: 'muted' as const },
                  { label: `${s.faqs.length} FAQ`, tone: 'muted' as const },
                  ...(s.isFeatured ? [{ label: 'Unggulan', tone: 'ok' as const }] : [])
                ]}
                onEdit={() => startEdit(s)}
                onDelete={() => trigger(s.id)}
              />
              {armedId === s.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada layanan." />}
        </div>
      )}
    </div>
  );
};
