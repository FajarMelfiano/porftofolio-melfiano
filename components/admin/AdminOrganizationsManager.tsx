'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { Organization } from '@/lib/types';
import { Users } from 'lucide-react';
import {
  PanelHeader, Card, AddButton, Field, TextInput, NumberInput,
  Grid, FormSection, FormActions, ItemRow, EmptyState,
  BilingualText, BilingualArea, BilingualListEditor,
  useArmedDelete, DeleteConfirmBar, ImageUploader
} from './ui';

const emptyOrganization = (order: number): Omit<Organization, 'id'> => ({
  organizationName: '',
  role: { id: '', en: '' },
  period: '',
  location: '',
  description: { id: '', en: '' },
  responsibilities: [],
  achievements: [],
  certificateUrl: '',
  order
});

export const AdminOrganizationsManager: React.FC = () => {
  const { success } = useToast();
  const { organizations, addOrganization, updateOrganization, deleteOrganization } =
    useDataContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Organization, 'id'>>(emptyOrganization(1));
  const set = <K extends keyof Omit<Organization, 'id'>>(k: K, v: Omit<Organization, 'id'>[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const { armedId, trigger } = useArmedDelete(deleteOrganization);

  const startAdd = () => {
    setEditingId(null);
    setForm(emptyOrganization(organizations.length + 1));
    setIsEditing(true);
  };

  const startEdit = (o: Organization) => {
    setEditingId(o.id);
    const { id: _ignored, ...rest } = o;
    setForm({ ...rest, certificateUrl: o.certificateUrl ?? '' });
    setIsEditing(true);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Omit<Organization, 'id'> = {
      ...form,
      role: { id: form.role.id, en: form.role.en || form.role.id },
      description: { id: form.description.id, en: form.description.en || form.description.id },
      responsibilities: form.responsibilities
        .filter(r => r.id.trim())
        .map(r => ({ id: r.id, en: r.en || r.id })),
      achievements: form.achievements
        .filter(a => a.id.trim())
        .map(a => ({ id: a.id, en: a.en || a.id }))
    };
    if (editingId) updateOrganization(editingId, payload);
    else addOrganization(payload);
    success('Data berhasil disimpan!');
      setIsEditing(false);
  };

  const sorted = [...organizations].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Users className="w-5 h-5" />}
        title="Kelola Organisasi & Komunitas"
        subtitle="Peran kepemimpinan, tanggung jawab, dan kontribusi di komunitas."
        action={<AddButton onClick={startAdd} label="Tambah Organisasi" />}
      />

      {isEditing ? (
        <Card>
          <form onSubmit={save} className="space-y-5 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {editingId ? 'Ubah Organisasi' : 'Organisasi Baru'}
            </h3>

            <FormSection title="Organisasi">
              <Grid>
                <Field label="Nama Organisasi" required>
                  <TextInput
                    required
                    value={form.organizationName}
                    onChange={v => set('organizationName', v)}
                  />
                </Field>
                <Field label="Lokasi">
                  <TextInput value={form.location} onChange={v => set('location', v)} />
                </Field>
              </Grid>
              <BilingualText label="Peran" required value={form.role} onChange={v => set('role', v)} />
              <Grid>
                <Field label="Periode" hint="mis. 2022 - Sekarang" required>
                  <TextInput required value={form.period} onChange={v => set('period', v)} />
                </Field>
                <Field label="Urutan Tampil">
                  <NumberInput min={1} value={form.order} onChange={v => set('order', v)} />
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

            <FormSection title="Tanggung Jawab">
              <BilingualListEditor
                value={form.responsibilities}
                onChange={v => set('responsibilities', v)}
                addLabel="Tambah tanggung jawab"
              />
            </FormSection>

            <FormSection title="Kontribusi & Pencapaian">
              <BilingualListEditor
                value={form.achievements}
                onChange={v => set('achievements', v)}
                addLabel="Tambah pencapaian"
              />
            </FormSection>

            <FormSection title="Bukti">
              <ImageUploader
                label="File Sertifikat (Opsional)"
                value={form.certificateUrl}
                onChange={v => setForm({ ...form, certificateUrl: v })}
                folder="organizations"
                accept="*/*"
              />
            </FormSection>

            <FormActions onCancel={() => setIsEditing(false)} saveLabel="Simpan Organisasi" />
          </form>
        </Card>
      ) : (
        <div className="space-y-3">
          {sorted.map(o => (
            <div key={o.id} className="space-y-1">
              <ItemRow
                title={o.role.id || o.organizationName}
                meta={`${o.organizationName} • ${o.period} • ${o.location}`}
                badges={[
                  { label: `${o.responsibilities.length} tanggung jawab`, tone: 'muted' as const },
                  { label: `${o.achievements.length} pencapaian`, tone: 'muted' as const }
                ]}
                onEdit={() => startEdit(o)}
                onDelete={() => trigger(o.id)}
              />
              {armedId === o.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
            </div>
          ))}
          {sorted.length === 0 && <EmptyState message="Belum ada organisasi." />}
        </div>
      )}
    </div>
  );
};
