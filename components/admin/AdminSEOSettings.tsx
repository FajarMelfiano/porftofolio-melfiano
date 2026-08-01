'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { SEOSettings } from '@/lib/types';
import { Search, Save, AlertTriangle } from 'lucide-react';
import {
  PanelHeader, Card, Field, TextInput, TextArea, Grid, FormSection, ImageUploader
} from './ui';

/** Google truncates around these lengths, so warn rather than hard-limit. */
const TITLE_MAX = 60;
const DESC_MAX = 160;

export const AdminSEOSettings: React.FC = () => {
  const { success } = useToast();
  const { seoSettings, updateSEOSettings } = useDataContext();

  const [form, setForm] = useState<SEOSettings>(seoSettings);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setForm(seoSettings); }, [seoSettings]);  const set = <K extends keyof SEOSettings>(k: K, v: SEOSettings[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSEOSettings(form);
    success('Perubahan berhasil disimpan!');
    
  };

  const counter = (value: string, max: number) => (
    <span className={value.length > max ? 'text-amber-600 dark:text-amber-400 font-bold' : ''}>
      {value.length}/{max} karakter
      {value.length > max && ' — berisiko terpotong di hasil pencarian'}
    </span>
  );

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Search className="w-5 h-5" />}
        title="Pengaturan SEO & Meta Tag"
        subtitle="Judul pencarian, deskripsi, Open Graph, kanonikal, dan verifikasi Search Console."
      />

      <form onSubmit={handleSave} className="space-y-4">
        <Card>
          <div className="space-y-5 text-xs">
            
            <FormSection title="Metadata Dasar">
              <Field label="Judul Halaman (Meta Title)" required>
                <TextInput required value={form.metaTitle} onChange={v => set('metaTitle', v)} />
              </Field>
              <p className="text-[11px] text-slate-500 -mt-2">
                {counter(form.metaTitle, TITLE_MAX)}
              </p>

              <Field label="Deskripsi Halaman (Meta Description)">
                <TextArea
                  rows={3}
                  value={form.metaDescription}
                  onChange={v => set('metaDescription', v)}
                />
              </Field>
              <p className="text-[11px] text-slate-500 -mt-2">
                {counter(form.metaDescription, DESC_MAX)}
              </p>

              <Field label="Kata Kunci" hint="Pisahkan dengan koma.">
                <TextInput value={form.keywords} onChange={v => set('keywords', v)} />
              </Field>
              <Grid>
                <Field label="Nama Penulis">
                  <TextInput value={form.authorName} onChange={v => set('authorName', v)} />
                </Field>
                <Field
                  label="URL Kanonikal"
                  hint="Juga dipakai untuk QR code di bagian CV."
                >
                  <TextInput
                    value={form.canonicalUrl}
                    onChange={v => set('canonicalUrl', v)}
                    placeholder="https://domain-anda.com"
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Pratinjau Hasil Pencarian">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate">
                  {form.canonicalUrl || 'https://domain-anda.com'}
                </p>
                <p className="text-blue-700 dark:text-blue-400 text-sm font-medium truncate">
                  {form.metaTitle || 'Judul halaman belum diisi'}
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">
                  {form.metaDescription || 'Deskripsi halaman belum diisi.'}
                </p>
              </div>
            </FormSection>

            <FormSection title="Gambar Berbagi (Open Graph)">
              <Field
                label="URL Gambar OG"
                hint="Ukuran ideal 1200×630 piksel. Dipakai saat tautan dibagikan."
              >
                <ImageUploader
                  label="Open Graph Image (1200x630)"
                  value={form.ogImage}
                  onChange={v => set('ogImage', v)}
                  folder="seo"
                />
              </Field>
              {form.ogImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={form.ogImage}
                  alt="Pratinjau gambar OG"
                  className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-700"
                />
              )}
            </FormSection>

            <FormSection title="Analitik & Verifikasi">
              <Grid>
                <Field
                  label="Google Analytics ID"
                  hint="Disimpan untuk dipakai nanti — skrip analitik belum dipasang."
                >
                  <TextInput
                    value={form.googleAnalyticsId}
                    onChange={v => set('googleAnalyticsId', v)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </Field>
                <Field
                  label="Token Verifikasi Search Console"
                  hint="Ditulis sebagai meta google-site-verification."
                >
                  <TextInput
                    value={form.googleSearchConsoleMeta}
                    onChange={v => set('googleSearchConsoleMeta', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="robots.txt">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-[11px] flex items-start space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Isi ini belum disajikan sebagai <code>/robots.txt</code> sungguhan — situs ini
                  belum punya route server untuk itu. Nilainya tersimpan dan siap dipakai bila
                  route tersebut dibuat.
                </span>
              </div>
              <Field label="Isi robots.txt">
                <TextArea
                  rows={4}
                  mono
                  value={form.robotsTxt}
                  onChange={v => set('robotsTxt', v)}
                />
              </Field>
            </FormSection>
          </div>
        </Card>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md transition text-xs"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Pengaturan SEO</span>
        </button>
      </form>
    </div>
  );
};
