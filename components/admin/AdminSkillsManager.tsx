'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Skill, SkillCategory } from '@/lib/types';
import { Code2, Layers, Star } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, TextArea, NumberInput, Select, Toggle,
  Grid, FormSection, FormActions, ItemRow, EmptyState, BilingualText,
  useArmedDelete, DeleteConfirmBar
} from './ui';

const LEVELS = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Expert', label: 'Expert' }
] as const;

const ICONS = [
  'Code2', 'Atom', 'Palette', 'Server', 'Database', 'Cloud', 'Sparkles', 'Users', 'Wrench', 'Layers'
].map(v => ({ value: v, label: v }));

const emptySkill = (order: number, categoryId: string): Omit<Skill, 'id'> => ({
  name: '',
  categoryId,
  level: 'Intermediate',
  percentage: 70,
  yearsExperience: 1,
  icon: 'Code2',
  description: { id: '', en: '' },
  isFeatured: true,
  order
});

export const AdminSkillsManager: React.FC = () => {
  const {
    skills, skillCategories,
    addSkill, updateSkill, deleteSkill,
    addSkillCategory, updateSkillCategory, deleteSkillCategory
  } = useDataContext();

  const [tab, setTab] = useState<'skills' | 'categories'>('skills');
  const [filter, setFilter] = useState<string>('all');

  // --- skill form ---
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<Omit<Skill, 'id'>>(
    emptySkill(1, skillCategories[0]?.id ?? '')
  );
  const set = <K extends keyof Omit<Skill, 'id'>>(k: K, v: Omit<Skill, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  // --- category form ---
  const [catEditingId, setCatEditingId] = useState<string | null>(null);
  const [catForm, setCatForm] = useState<Omit<SkillCategory, 'id'>>({
    name: { id: '', en: '' },
    icon: 'Layers'
  });

  const skillDelete = useArmedDelete(deleteSkill);
  const catDelete = useArmedDelete(deleteSkillCategory);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptySkill(skills.length + 1, skillCategories[0]?.id ?? ''));
    setIsEditing(true);
  };

  const startEdit = (s: Skill) => {
    setEditingId(s.id);
    const { id: _ignored, ...rest } = s;
    setForm({ ...rest, description: s.description ?? { id: '', en: '' } });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, description: { id: form.description?.id ?? '', en: form.description?.en || form.description?.id || '' } };
    if (editingId) updateSkill(editingId, payload);
    else addSkill(payload);
    setIsEditing(false);
  };

  const saveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...catForm, name: { id: catForm.name.id, en: catForm.name.en || catForm.name.id } };
    if (catEditingId) updateSkillCategory(catEditingId, payload);
    else addSkillCategory(payload);
    setCatEditingId(null);
    setCatForm({ name: { id: '', en: '' }, icon: 'Layers' });
  };

  const categoryName = (id: string) =>
    skillCategories.find(c => c.id === id)?.name.id ?? 'Tanpa kategori';

  const visible = filter === 'all' ? skills : skills.filter(s => s.categoryId === filter);
  const sorted = [...visible].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Code2 className="w-5 h-5" />}
        title="Kelola Keahlian"
        subtitle="Atur daftar keahlian teknis beserta kategori, tingkat penguasaan, dan urutannya."
        action={
          tab === 'skills' ? (
            <AddButton onClick={startAdd} label="Tambah Keahlian" />
          ) : (
            <AddButton
              onClick={() => {
                setCatEditingId(null);
                setCatForm({ name: { id: '', en: '' }, icon: 'Layers' });
              }}
              label="Kategori Baru"
            />
          )
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 text-xs">
        {([
          { id: 'skills', label: `Keahlian (${skills.length})` },
          { id: 'categories', label: `Kategori (${skillCategories.length})` }
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3.5 py-2 rounded-xl font-bold transition ${
              tab === t.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'skills' && (
        <>
          {isEditing ? (
            <Card>
              <form onSubmit={save} className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {editingId ? 'Ubah Keahlian' : 'Keahlian Baru'}
                </h3>

                <Grid>
                  <Field label="Nama Keahlian" required>
                    <TextInput
                      required
                      value={form.name}
                      onChange={v => set('name', v)}
                      placeholder="mis. TypeScript & JavaScript"
                    />
                  </Field>
                  <Field label="Kategori">
                    <Select
                      value={form.categoryId}
                      onChange={v => set('categoryId', v)}
                      options={
                        skillCategories.length > 0
                          ? skillCategories.map(c => ({ value: c.id, label: c.name.id }))
                          : [{ value: '', label: 'Belum ada kategori' }]
                      }
                    />
                  </Field>
                </Grid>

                <Grid cols={3}>
                  <Field label="Tingkat">
                    <Select value={form.level} onChange={v => set('level', v)} options={LEVELS} />
                  </Field>
                  <Field label="Persentase (0–100)">
                    <NumberInput
                      min={0}
                      max={100}
                      value={form.percentage}
                      onChange={v => set('percentage', Math.min(100, Math.max(0, v)))}
                    />
                  </Field>
                  <Field label="Tahun Pengalaman">
                    <NumberInput
                      min={0}
                      value={form.yearsExperience}
                      onChange={v => set('yearsExperience', v)}
                    />
                  </Field>
                </Grid>

                <Grid>
                  <Field label="Ikon" hint="Nama ikon Lucide yang dipakai di kartu keahlian.">
                    <Select value={form.icon} onChange={v => set('icon', v)} options={ICONS} />
                  </Field>
                  <Field label="Urutan Tampil">
                    <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
                  </Field>
                </Grid>

                <FormSection title="Deskripsi">
                  <Grid>
                    <Field label="Deskripsi (Indonesia)">
                      <TextArea
                        rows={3}
                        value={form.description?.id ?? ''}
                        onChange={v => set('description', { id: v, en: form.description?.en ?? '' })}
                      />
                    </Field>
                    <Field label="Description (English)" hint="Kosongkan untuk memakai teks Indonesia.">
                      <TextArea
                        rows={3}
                        value={form.description?.en ?? ''}
                        onChange={v => set('description', { id: form.description?.id ?? '', en: v })}
                      />
                    </Field>
                  </Grid>
                </FormSection>

                <Toggle
                  label="Tampilkan sebagai unggulan"
                  hint="Keahlian unggulan ditonjolkan di ringkasan."
                  checked={form.isFeatured}
                  onChange={v => set('isFeatured', v)}
                />

                <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Keahlian" />
              </form>
            </Card>
          ) : (
            <>
              {/* Category filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-bold ${
                    filter === 'all'
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Semua ({skills.length})
                </button>
                {skillCategories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold ${
                      filter === c.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {c.name.id} ({skills.filter(s => s.categoryId === c.id).length})
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {sorted.map(s => (
                  <div key={s.id} className="space-y-1">
                    <ItemRow
                      title={s.name}
                      meta={`${categoryName(s.categoryId)} • ${s.level} • ${s.percentage}% • ${s.yearsExperience} thn`}
                      badges={[
                        ...(s.isFeatured ? [{ label: 'Unggulan', tone: 'ok' as const }] : []),
                        { label: `#${s.order}`, tone: 'muted' as const }
                      ]}
                      onEdit={() => startEdit(s)}
                      onDelete={() => skillDelete.trigger(s.id)}
                    />
                    {skillDelete.armedId === s.id && (
                      <DeleteConfirmBar onCancel={() => skillDelete.trigger('')} />
                    )}
                  </div>
                ))}
                {sorted.length === 0 && <EmptyState message="Belum ada keahlian pada kategori ini." />}
              </div>
            </>
          )}
        </>
      )}

      {tab === 'categories' && (
        <div className="space-y-4">
          <Card>
            <form onSubmit={saveCategory} className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <Layers className="w-4 h-4 text-blue-500" />
                <span>{catEditingId ? 'Ubah Kategori' : 'Kategori Baru'}</span>
              </h3>

              <BilingualText
                label="Nama Kategori"
                required
                value={catForm.name}
                onChange={v => setCatForm(f => ({ ...f, name: v }))}
              />

              <Field label="Ikon">
                <Select
                  value={catForm.icon}
                  onChange={v => setCatForm(f => ({ ...f, icon: v }))}
                  options={ICONS}
                />
              </Field>

              <FormActions
                onCancel={() => {
                  setCatEditingId(null);
                  setCatForm({ name: { id: '', en: '' }, icon: 'Layers' });
                }}
                saveLabel={catEditingId ? 'Simpan Kategori' : 'Tambah Kategori'}
              />
            </form>
          </Card>

          <div className="space-y-3">
            {skillCategories.map(c => (
              <div key={c.id} className="space-y-1">
                <ItemRow
                  title={c.name.id}
                  meta={`${c.name.en} • ikon: ${c.icon} • ${
                    skills.filter(s => s.categoryId === c.id).length
                  } keahlian`}
                  onEdit={() => {
                    setCatEditingId(c.id);
                    setCatForm({ name: c.name, icon: c.icon });
                  }}
                  onDelete={() => catDelete.trigger(c.id)}
                />
                {catDelete.armedId === c.id && (
                  <div className="space-y-1">
                    <DeleteConfirmBar onCancel={() => catDelete.trigger('')} />
                    {skills.some(s => s.categoryId === c.id) && (
                      <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 px-1">
                        <Star className="w-3 h-3" />
                        {skills.filter(s => s.categoryId === c.id).length} keahlian memakai kategori
                        ini dan akan menjadi tanpa kategori.
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
            {skillCategories.length === 0 && <EmptyState message="Belum ada kategori keahlian." />}
          </div>
        </div>
      )}
    </div>
  );
};
