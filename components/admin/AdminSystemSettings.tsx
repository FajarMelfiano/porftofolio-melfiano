'use client';

import React, { useState, useEffect } from 'react';
import { useDataContext } from '@/lib/data-context';
import { SystemSettings } from '@/lib/types';
import { Settings, Save, Download, Upload, AlertTriangle, RotateCcw } from 'lucide-react';
import {
  PanelHeader, Card, Field, TextInput, TextArea, Select, Toggle,
  Grid, FormSection, SavedBanner
} from './ui';

const LANGUAGES = [
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'en', label: 'English' }
] as const;

export const AdminSystemSettings: React.FC = () => {
  const {
    systemSettings, updateSystemSettings,
    exportDatabaseJSON, importDatabaseJSON, resetToDefaultData
  } = useDataContext();

  const [form, setForm] = useState<SystemSettings>(systemSettings);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setForm(systemSettings); }, [systemSettings]);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const set = <K extends keyof SystemSettings>(k: K, v: SystemSettings[K]) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemSettings(form);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const blob = new Blob([exportDatabaseJSON()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const ok = content ? importDatabaseJSON(content) : false;
      setNotice(
        ok
          ? { tone: 'ok', text: 'Cadangan berhasil dipulihkan.' }
          : { tone: 'err', text: 'Berkas cadangan tidak valid atau rusak.' }
      );
      window.setTimeout(() => setNotice(null), 4000);
    };
    reader.readAsText(file);
    // Allows re-importing the same file twice in a row.
    e.target.value = '';
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Settings className="w-5 h-5" />}
        title="Sistem & Konfigurasi"
        subtitle="Rute admin, WhatsApp, fitur situs, bahasa, mode pemeliharaan, dan cadangan data."
      />

      <form onSubmit={handleSave} className="space-y-4">
        <Card>
          <div className="space-y-5 text-xs">
            <SavedBanner show={saved} message="Konfigurasi sistem berhasil diperbarui!" />

            <FormSection title="Akses Admin">
              <Field
                label="Rute Admin"
                hint="Panel dibuka lewat /?key=<rute>. Tautan Admin di navbar dan footer mengikuti nilai ini."
              >
                <TextInput
                  value={form.adminRoute}
                  onChange={v => set('adminRoute', v)}
                  placeholder="/secure-control-panel"
                />
              </Field>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-[11px] flex items-start space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>
                  Rute ini hanya menyembunyikan tautan, bukan pengaman. Keamanan sesungguhnya
                  berasal dari Firebase Authentication di layar login.
                </span>
              </div>
            </FormSection>

            <FormSection title="WhatsApp">
              <Toggle
                label="Aktifkan tombol WhatsApp mengambang"
                checked={form.enableWhatsAppButton}
                onChange={v => set('enableWhatsAppButton', v)}
              />
              <Grid>
                <Field label="Nomor WhatsApp" hint="Format internasional tanpa +, mis. 6281234567890">
                  <TextInput
                    value={form.whatsAppNumber}
                    onChange={v => set('whatsAppNumber', v)}
                  />
                </Field>
                <Field label="Pesan Bawaan">
                  <TextInput
                    value={form.whatsAppDefaultMessage}
                    onChange={v => set('whatsAppDefaultMessage', v)}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Bahasa">
              <Grid>
                <Toggle
                  label="Aktifkan dua bahasa"
                  hint="Menampilkan tombol ID/EN di navbar."
                  checked={form.enableMultiLanguage}
                  onChange={v => set('enableMultiLanguage', v)}
                />
                <Field label="Bahasa Bawaan">
                  <Select
                    value={form.defaultLanguage}
                    onChange={v => set('defaultLanguage', v)}
                    options={LANGUAGES}
                  />
                </Field>
              </Grid>
            </FormSection>

            <FormSection title="Fitur Situs">
              <Toggle
                label="Command Palette (Ctrl + K)"
                hint="Pencarian cepat proyek, artikel, dan keahlian."
                checked={form.enableCommandPalette}
                onChange={v => set('enableCommandPalette', v)}
              />
              <Toggle
                label="Penghitung pengunjung"
                hint="Disimpan untuk dipakai nanti — belum ada widget yang menampilkannya."
                checked={form.enableVisitorCounter}
                onChange={v => set('enableVisitorCounter', v)}
              />
              <Toggle
                label="Kursor kustom"
                hint="Disimpan untuk dipakai nanti — efek kursor belum diimplementasikan."
                checked={form.enableCustomCursor}
                onChange={v => set('enableCustomCursor', v)}
              />
              <Toggle
                label="Audio synthesizer"
                hint="Disimpan untuk dipakai nanti — efek suara belum diimplementasikan."
                checked={form.enableAudioSynthesizer}
                onChange={v => set('enableAudioSynthesizer', v)}
              />
            </FormSection>

            <FormSection title="Mode Pemeliharaan">
              <Toggle
                label="Aktifkan mode pemeliharaan"
                hint="Menyembunyikan situs publik. Panel admin tetap bisa diakses."
                checked={form.enableMaintenanceMode}
                onChange={v => set('enableMaintenanceMode', v)}
              />
              <Field label="Pesan Pemeliharaan">
                <TextArea
                  rows={2}
                  value={form.maintenanceMessage}
                  onChange={v => set('maintenanceMessage', v)}
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
          <span>Simpan Konfigurasi Sistem</span>
        </button>
      </form>

      {/* Backup lives outside the settings form so saving one can't trigger the other. */}
      <Card>
        <div className="space-y-4 text-xs">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Cadangan & Pemulihan Data</h3>
            <p className="text-slate-500 mt-0.5">
              Seluruh konten CMS tersimpan di peramban ini. Ekspor rutin sangat disarankan —
              membersihkan data situs akan menghapusnya.
            </p>
          </div>

          {notice && (
            <div
              className={`p-3 rounded-xl font-bold ${
                notice.tone === 'ok'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
              }`}
            >
              {notice.text}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-2 transition"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Cadangan JSON</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-2 cursor-pointer transition">
              <Upload className="w-4 h-4" />
              <span>Impor Cadangan</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              type="button"
              onClick={() => {
                if (confirmReset) {
                  resetToDefaultData();
                  setConfirmReset(false);
                  setNotice({ tone: 'ok', text: 'Data dikembalikan ke bawaan.' });
                  window.setTimeout(() => setNotice(null), 4000);
                } else {
                  setConfirmReset(true);
                  window.setTimeout(() => setConfirmReset(false), 5000);
                }
              }}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                confirmReset
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>
                {confirmReset ? 'Klik lagi — semua data akan hilang' : 'Reset ke Data Bawaan'}
              </span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
