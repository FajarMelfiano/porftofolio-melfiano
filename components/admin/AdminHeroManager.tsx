'use client';

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';
import { HeroConfig } from '@/lib/types';
import { Sparkles, Save } from 'lucide-react';
import {
  PanelHeader, Card, Field, Select, Toggle, Grid, FormSection,
  BilingualText, BilingualArea, SavedBanner
} from './ui';

const LAYOUTS = [
  { value: 'classic', label: 'Classic' },
  { value: 'centered', label: 'Centered' },
  { value: 'split', label: 'Split' },
  { value: 'minimal', label: 'Minimal' }
] as const;

const BACKGROUNDS = [
  { value: 'gradient', label: 'Gradient' },
  { value: 'dots', label: 'Dots' },
  { value: 'grid', label: 'Grid' },
  { value: 'clean', label: 'Clean' }
] as const;

export const AdminHeroManager: React.FC = () => {
  const { heroConfig, updateHeroConfig } = useDataContext();

  const [form, setForm] = useState<HeroConfig>(heroConfig);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setForm(heroConfig); }, [heroConfig]);
  const [saved, setSaved] = useState(false);
  const set = <K extends keyof HeroConfig>(k: K, v: HeroConfig[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroConfig({
      ...form,
      greeting: { id: form.greeting.id, en: form.greeting.en || form.greeting.id },
      headline: { id: form.headline.id, en: form.headline.en || form.headline.id },
      subheadline: { id: form.subheadline.id, en: form.subheadline.en || form.subheadline.id },
      primaryCtaText: {
        id: form.primaryCtaText.id,
        en: form.primaryCtaText.en || form.primaryCtaText.id
      },
      secondaryCtaText: {
        id: form.secondaryCtaText.id,
        en: form.secondaryCtaText.en || form.secondaryCtaText.id
      }
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Sparkles className="w-5 h-5" />}
        title="Kelola Hero Banner"
        subtitle="Teks sambutan, headline, tombol ajakan, dan tampilan bagian paling atas situs."
      />

      <Card>
        <form onSubmit={save} className="space-y-5 text-xs">
          <SavedBanner show={saved} message="Hero banner berhasil diperbarui!" />

          <FormSection title="Teks Utama">
            <BilingualText
              label="Sapaan"
              value={form.greeting}
              onChange={v => set('greeting', v)}
              hint="Muncul di atas nama, mis. 'Halo 👋, Saya'."
            />
            <BilingualArea
              label="Headline"
              rows={2}
              value={form.headline}
              onChange={v => set('headline', v)}
            />
            <BilingualArea
              label="Subheadline"
              rows={3}
              value={form.subheadline}
              onChange={v => set('subheadline', v)}
            />
          </FormSection>

          <FormSection title="Tombol Ajakan">
            <BilingualText
              label="Tombol Utama"
              value={form.primaryCtaText}
              onChange={v => set('primaryCtaText', v)}
            />
            <BilingualText
              label="Tombol Kedua"
              value={form.secondaryCtaText}
              onChange={v => set('secondaryCtaText', v)}
            />
          </FormSection>

          <FormSection title="Tampilan">
            <Grid>
              <Field label="Tata Letak Hero">
                <Select
                  value={form.heroLayout}
                  onChange={v => set('heroLayout', v)}
                  options={LAYOUTS}
                />
              </Field>
              <Field label="Latar Belakang">
                <Select
                  value={form.heroBackground}
                  onChange={v => set('heroBackground', v)}
                  options={BACKGROUNDS}
                />
              </Field>
            </Grid>
            <Toggle
              label="Tampilkan baris statistik"
              hint="Menampilkan angka pengalaman, proyek, sertifikat, dan publikasi."
              checked={form.showStats}
              onChange={v => set('showStats', v)}
            />
          </FormSection>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Hero Banner</span>
          </button>
        </form>
      </Card>
    </div>
  );
};
