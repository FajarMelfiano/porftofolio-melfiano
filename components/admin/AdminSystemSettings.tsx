'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Settings, Save, Download, Upload, Shield, Check } from 'lucide-react';

export const AdminSystemSettings: React.FC = () => {
  const { systemSettings, updateSystemSettings, exportDatabaseJSON, importDatabaseJSON } = useDataContext();

  const [form, setForm] = useState({
    adminRoute: systemSettings.adminRoute,
    enableWhatsAppButton: systemSettings.enableWhatsAppButton,
    whatsAppNumber: systemSettings.whatsAppNumber,
    whatsAppDefaultMessage: systemSettings.whatsAppDefaultMessage,
    enableMaintenanceMode: systemSettings.enableMaintenanceMode
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSystemSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const dataStr = exportDatabaseJSON();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_database_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importDatabaseJSON(content);
          if (success) alert('Database CMS berhasil dipulihkan!');
          else alert('Gagal memproses file cadangan.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Settings className="w-5 h-5 text-blue-500" />
          <span>Sistem & Keamanan Konfigurasi</span>
        </h2>
        <p className="text-xs text-slate-500">Ubah rute tersembunyi admin, WhatsApp gateway, status maintenance, serta cadangan data JSON.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 text-xs">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Sistem konfigurasi berhasil diperbarui!</span>
          </div>
        )}

        {/* Hidden Admin Route */}
        <div className="space-y-2">
          <label className="font-bold text-slate-700 dark:text-slate-300 block">
            URL Rute Tersembunyi Admin (Route URL)
          </label>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 font-mono">/admin?key=</span>
            <input
              type="text"
              value={form.adminRoute}
              onChange={e => setForm({ ...form, adminRoute: e.target.value })}
              className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>
          <p className="text-[11px] text-slate-500">Rute rahasia yang digunakan untuk membuka halaman login admin CMS.</p>
        </div>

        {/* WhatsApp Button Config */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 dark:text-slate-300">Aktifkan WhatsApp Floating Button</span>
            <input
              type="checkbox"
              checked={form.enableWhatsAppButton}
              onChange={e => setForm({ ...form, enableWhatsAppButton: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor WhatsApp (format internasional)</label>
            <input
              type="text"
              value={form.whatsAppNumber}
              onChange={e => setForm({ ...form, whatsAppNumber: e.target.value })}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
            />
          </div>
        </div>

        {/* Backup & Restore Section */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white">Cadangkan & Pulihkan Database CMS (JSON Backup)</h3>
          <p className="text-slate-500">Simpan seluruh konten portofolio ke dalam file JSON atau impor kembali cadangan sebelumnya.</p>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Backup JSON</span>
            </button>

            <label className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center space-x-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Impor File JSON</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-2 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Konfigurasi Sistem</span>
        </button>
      </form>
    </div>
  );
};
