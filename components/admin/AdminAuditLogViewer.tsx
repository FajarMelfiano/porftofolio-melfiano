'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { ScrollText, Download, Trash2, Search } from 'lucide-react';
import { PanelHeader, Card, EmptyState, TextInput, Field } from './ui';

export const AdminAuditLogViewer: React.FC = () => {
  const { auditLogs, clearAuditLogs } = useDataContext();

  const [query, setQuery] = useState('');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  const modules = Array.from(new Set(auditLogs.map(l => l.module))).sort();

  const visible = auditLogs.filter(l => {
    const matchesModule = moduleFilter === 'all' || l.module === moduleFilter;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      q === '' ||
      l.action.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.adminEmail.toLowerCase().includes(q);
    return matchesModule && matchesQuery;
  });

  const exportLogs = () => {
    const blob = new Blob([JSON.stringify(auditLogs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit_log_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const toneFor = (action: string) => {
    if (action.startsWith('DELETE') || action.includes('FAILED') || action === 'RESET_DATABASE')
      return 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300';
    if (action.startsWith('CREATE'))
      return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
    if (action.startsWith('UPDATE') || action.startsWith('REORDER'))
      return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<ScrollText className="w-5 h-5" />}
        title="Log Aktivitas Sistem"
        subtitle={`${auditLogs.length} catatan aktivitas admin tersimpan di perangkat ini.`}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={exportLogs}
              disabled={auditLogs.length === 0}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 disabled:opacity-50 transition"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor</span>
            </button>
            <button
              onClick={() => {
                if (confirmClear) {
                  clearAuditLogs();
                  setConfirmClear(false);
                } else {
                  setConfirmClear(true);
                  window.setTimeout(() => setConfirmClear(false), 4000);
                }
              }}
              disabled={auditLogs.length === 0}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center space-x-2 disabled:opacity-50 transition ${
                confirmClear
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span>{confirmClear ? 'Klik lagi untuk hapus' : 'Bersihkan'}</span>
            </button>
          </div>
        }
      />

      <Card>
        <div className="space-y-3 text-xs">
          <Field label="Cari">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari aksi, detail, atau email admin..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              />
            </div>
          </Field>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setModuleFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                moduleFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Semua modul
            </button>
            {modules.map(m => (
              <button
                key={m}
                onClick={() => setModuleFilter(m)}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  moduleFilter === m
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        {visible.map(log => (
          <div
            key={log.id}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex flex-wrap items-start justify-between gap-3"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${toneFor(log.action)}`}>
                  {log.action}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {log.module}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">{log.details}</p>
              <p className="text-[10px] text-slate-400 font-mono">
                {log.adminEmail} • {log.ipAddress}
              </p>
            </div>
            <span className="text-[10px] text-slate-400 font-mono shrink-0">
              {new Date(log.timestamp).toLocaleString('id-ID')}
            </span>
          </div>
        ))}
        {visible.length === 0 && (
          <EmptyState
            message={
              auditLogs.length === 0
                ? 'Belum ada aktivitas tercatat.'
                : 'Tidak ada catatan yang cocok dengan filter.'
            }
          />
        )}
      </div>
    </div>
  );
};
