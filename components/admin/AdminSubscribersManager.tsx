'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Mail, Download, UserCheck, UserX, Plus } from 'lucide-react';
import {
  PanelHeader, Card, Field, TextInput, EmptyState,
  useArmedDelete, DeleteConfirmBar, ItemRow
} from './ui';

export const AdminSubscribersManager: React.FC = () => {
  const { subscribers, addSubscriber, updateSubscriber, deleteSubscriber } = useDataContext();

  const [newEmail, setNewEmail] = useState('');
  const [notice, setNotice] = useState<{ tone: 'ok' | 'err'; text: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const { armedId, trigger } = useArmedDelete(deleteSubscriber);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmail.trim();
    if (!email) return;
    const ok = addSubscriber(email);
    setNotice(
      ok
        ? { tone: 'ok', text: `${email} ditambahkan.` }
        : { tone: 'err', text: `${email} sudah terdaftar.` }
    );
    if (ok) setNewEmail('');
    window.setTimeout(() => setNotice(null), 3000);
  };

  const exportCsv = () => {
    // Quote every field so a comma inside an address can't shift the columns.
    const rows = [
      ['email', 'subscribedAt', 'isActive'],
      ...subscribers.map(s => [s.email, s.subscribedAt, String(s.isActive)])
    ];
    const csv = rows.map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const activeCount = subscribers.filter(s => s.isActive).length;
  const visible = subscribers.filter(s =>
    filter === 'active' ? s.isActive : filter === 'inactive' ? !s.isActive : true
  );

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Mail className="w-5 h-5" />}
        title="Kelola Subscriber"
        subtitle={`${subscribers.length} pelanggan terdaftar — ${activeCount} aktif.`}
        action={
          <button
            onClick={exportCsv}
            disabled={subscribers.length === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 disabled:opacity-50 transition"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        }
      />

      <Card>
        <form onSubmit={handleAdd} className="space-y-3 text-xs">
          <Field label="Tambah Subscriber Manual">
            <div className="flex items-center gap-2">
              <TextInput
                type="email"
                value={newEmail}
                onChange={setNewEmail}
                placeholder="nama@domain.com"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1.5 shrink-0 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </button>
            </div>
          </Field>
          {notice && (
            <p
              className={`text-[11px] font-bold ${
                notice.tone === 'ok'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              }`}
            >
              {notice.text}
            </p>
          )}
        </form>
      </Card>

      <div className="flex items-center gap-2 text-xs">
        {([
          { id: 'all', label: `Semua (${subscribers.length})` },
          { id: 'active', label: `Aktif (${activeCount})` },
          { id: 'inactive', label: `Nonaktif (${subscribers.length - activeCount})` }
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

      <div className="space-y-3">
        {visible.map(s => (
          <div key={s.id} className="space-y-1">
            <ItemRow
              title={s.email}
              meta={`Berlangganan sejak ${new Date(s.subscribedAt).toLocaleDateString('id-ID')}`}
              badges={
                s.isActive
                  ? [{ label: 'Aktif', tone: 'ok' as const }]
                  : [{ label: 'Nonaktif', tone: 'warn' as const }]
              }
              extraActions={
                <button
                  onClick={() => updateSubscriber(s.id, { isActive: !s.isActive })}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                  title={s.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                >
                  {s.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </button>
              }
              onDelete={() => trigger(s.id)}
            />
            {armedId === s.id && <DeleteConfirmBar onCancel={() => trigger('')} />}
          </div>
        ))}
        {visible.length === 0 && <EmptyState message="Tidak ada subscriber pada filter ini." />}
      </div>
    </div>
  );
};
