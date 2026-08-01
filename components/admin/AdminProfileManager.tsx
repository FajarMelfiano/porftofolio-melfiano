'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { ProfileInfo } from '@/lib/types';
import { User, Save, Plus, Trash2 } from 'lucide-react';
import {
  PanelHeader, Card, Field, TextInput, NumberInput, Select,
  Grid, FormSection, BilingualText, BilingualArea, BilingualListEditor, StringListEditor, ImageUploader
} from './ui';

const AVAILABILITY = [
  { value: 'available', label: 'Tersedia untuk pekerjaan' },
  { value: 'busy', label: 'Sedang menangani proyek' },
  { value: 'selective', label: 'Terbuka untuk kesempatan terbatas' }
] as const;

export const AdminProfileManager: React.FC = () => {
  const { success } = useToast();
  const { profile, updateProfile } = useDataContext();

  const [form, setForm] = useState<ProfileInfo>(profile);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setForm(profile); }, [profile]);  const set = <K extends keyof ProfileInfo>(k: K, v: ProfileInfo[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      ...form,
      currentRole: { id: form.currentRole.id, en: form.currentRole.en || form.currentRole.id },
      bioShort: { id: form.bioShort.id, en: form.bioShort.en || form.bioShort.id },
      bioFull: { id: form.bioFull.id, en: form.bioFull.en || form.bioFull.id },
      careerGoals: { id: form.careerGoals.id, en: form.careerGoals.en || form.careerGoals.id },
      titles: form.titles.filter(t => t.id.trim()).map(t => ({ id: t.id, en: t.en || t.id })),
      professionalValues: form.professionalValues
        .filter(v => v.id.trim())
        .map(v => ({ id: v.id, en: v.en || v.id })),
      hobbies: form.hobbies.filter(Boolean),
      languages: form.languages.filter(l => l.name.trim())
    });
    success('Perubahan berhasil disimpan!');
    
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<User className="w-5 h-5" />}
        title="Kelola Data Diri"
        subtitle="Identitas, biografi, kontak, statistik, bahasa, minat, dan nilai profesional."
      />

      <form onSubmit={handleSave} className="space-y-4">
        <Card>
          <div className="space-y-5 text-xs">
            
            <FormSection title="Identitas">
              <Grid>
                <Field label="Nama Lengkap" required>
                  <TextInput required value={form.name} onChange={v => set('name', v)} />
                </Field>
                <Field label="URL Foto Profil">
                  <ImageUploader
                    label="URL Foto Profil (Avatar)"
                    value={form.avatarUrl}
                    onChange={v => set('avatarUrl', v)}
                    folder="profile"
                  />
                </Field>
              </Grid>
              {form.avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.avatarUrl}
                  alt="Pratinjau foto profil"
                  className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
              )}
              <BilingualText
                label="Peran Utama"
                value={form.currentRole}
                onChange={v => set('currentRole', v)}
              />
              <Grid>
                <Field label="Tanggal Lahir">
                  <TextInput
                    type="date"
                    value={form.birthDate}
                    onChange={v => set('birthDate', v)}
                  />
                </Field>
                <Field label="Status Ketersediaan">
                  <Select
                    value={form.availabilityStatus}
                    onChange={v => set('availabilityStatus', v)}
                    options={AVAILABILITY}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Gelar / Titel Bergilir">
              <p className="text-[11px] text-slate-500">
                Titel-titel ini berganti otomatis di bawah nama pada hero banner.
              </p>
              <BilingualListEditor
                value={form.titles}
                onChange={v => set('titles', v)}
                addLabel="Tambah titel"
              />
            </FormSection>

            <FormSection title="Biografi">
              <BilingualArea
                label="Biografi Singkat"
                rows={2}
                value={form.bioShort}
                onChange={v => set('bioShort', v)}
              />
              <BilingualArea
                label="Biografi Lengkap"
                rows={5}
                value={form.bioFull}
                onChange={v => set('bioFull', v)}
              />
              <BilingualArea
                label="Tujuan Karier"
                rows={3}
                value={form.careerGoals}
                onChange={v => set('careerGoals', v)}
              />
            </FormSection>

            <FormSection title="Kontak">
              <Grid cols={3}>
                <Field label="Email" required>
                  <TextInput
                    required
                    type="email"
                    value={form.email}
                    onChange={v => set('email', v)}
                  />
                </Field>
                <Field label="Telepon">
                  <TextInput value={form.phone} onChange={v => set('phone', v)} />
                </Field>
                <Field label="WhatsApp" hint="Format internasional tanpa +, mis. 6281234567890">
                  <TextInput value={form.whatsapp} onChange={v => set('whatsapp', v)} />
                </Field>
              </Grid>
              <Field label="Lokasi Domisili">
                <TextInput value={form.location} onChange={v => set('location', v)} />
              </Field>
            </FormSection>

            <FormSection title="Jejaring Sosial">
              <Grid>
                <Field label="GitHub">
                  <TextInput value={form.github} onChange={v => set('github', v)} />
                </Field>
                <Field label="LinkedIn">
                  <TextInput value={form.linkedin} onChange={v => set('linkedin', v)} />
                </Field>
              </Grid>
              <Grid>
                <Field label="Instagram">
                  <TextInput value={form.instagram} onChange={v => set('instagram', v)} />
                </Field>
                <Field label="Telegram">
                  <TextInput value={form.telegram} onChange={v => set('telegram', v)} />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Statistik Hero">
              <p className="text-[11px] text-slate-500">
                Angka-angka ini ditampilkan di hero banner dan tidak dihitung otomatis dari data
                lain — isi sesuai yang ingin ditonjolkan.
              </p>
              <Grid cols={3}>
                <Field label="Tahun Pengalaman">
                  <NumberInput
                    min={0}
                    value={form.yearsExperience}
                    onChange={v => set('yearsExperience', v)}
                  />
                </Field>
                <Field label="Proyek Selesai">
                  <NumberInput
                    min={0}
                    value={form.completedProjectsCount}
                    onChange={v => set('completedProjectsCount', v)}
                  />
                </Field>
                <Field label="Klien Puas">
                  <NumberInput
                    min={0}
                    value={form.happyClientsCount}
                    onChange={v => set('happyClientsCount', v)}
                  />
                </Field>
              </Grid>
              <Grid cols={3}>
                <Field label="Penghargaan">
                  <NumberInput
                    min={0}
                    value={form.awardsCount}
                    onChange={v => set('awardsCount', v)}
                  />
                </Field>
                <Field label="Sertifikat">
                  <NumberInput
                    min={0}
                    value={form.certificatesCount}
                    onChange={v => set('certificatesCount', v)}
                  />
                </Field>
                <Field label="Publikasi">
                  <NumberInput
                    min={0}
                    value={form.publicationsCount}
                    onChange={v => set('publicationsCount', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Bahasa yang Dikuasai">
              <div className="space-y-2">
                {form.languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={lang.name}
                      placeholder="Bahasa (mis. English)"
                      onChange={e =>
                        set(
                          'languages',
                          form.languages.map((l, j) =>
                            j === i ? { ...l, name: e.target.value } : l
                          )
                        )
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      value={lang.proficiency}
                      placeholder="Tingkat (mis. Professional C1)"
                      onChange={e =>
                        set(
                          'languages',
                          form.languages.map((l, j) =>
                            j === i ? { ...l, proficiency: e.target.value } : l
                          )
                        )
                      }
                      className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => set('languages', form.languages.filter((_, j) => j !== i))}
                      className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 shrink-0"
                      aria-label="Hapus bahasa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => set('languages', [...form.languages, { name: '', proficiency: '' }])}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah bahasa</span>
                </button>
              </div>
            </FormSection>

            <FormSection title="Minat & Hobi">
              <StringListEditor
                value={form.hobbies}
                onChange={v => set('hobbies', v)}
                placeholder="mis. Open Source Contributing"
                addLabel="Tambah hobi"
              />
            </FormSection>

            <FormSection title="Nilai Profesional">
              <BilingualListEditor
                value={form.professionalValues}
                onChange={v => set('professionalValues', v)}
                addLabel="Tambah nilai"
              />
            </FormSection>
          </div>
        </Card>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md transition text-xs"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Semua Perubahan Profil</span>
        </button>
      </form>
    </div>
  );
};
