'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast-context';
import { useDataContext } from '@/lib/data-context';
import { ContactMessage } from '@/lib/types';
import { Mail, CheckCircle2, Archive, Trash2, Reply, Search, Download } from 'lucide-react';
import { PanelHeader, Card, Field, EmptyState, useArmedDelete } from './ui';

const STATUSES: ContactMessage['status'][] = ['Unread', 'Read', 'Replied', 'Archived', 'Spam'];

const STATUS_TONE: Record<ContactMessage['status'], string> = {
  Unread: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200',
  Read: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  Replied: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200',
  Archived: 'bg-slate-100 dark:bg-slate-800 text-slate-500',
  Spam: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200'
};

export const AdminMessagesManager: React.FC = () => {
  const { success } = useToast();
  const { messages, updateMessageStatus, deleteMessage } = useDataContext();

  const [filter, setFilter] = useState<'All' | ContactMessage['status']>('All');
  const [query, setQuery] = useState('');
  const { armedId, trigger } = useArmedDelete(deleteMessage);

  const counts = STATUSES.reduce(
    (acc, s) => ({ ...acc, [s]: messages.filter(m => m.status === s).length }),
    {} as Record<ContactMessage['status'], number>
  );

  const visible = messages.filter(m => {
    const matchesStatus = filter === 'All' || m.status === filter;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      q === '' ||
      m.senderName.toLowerCase().includes(q) ||
      m.senderEmail.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const exportCsv = () => {
    const rows = [
      ['nama', 'email', 'telepon', 'subjek', 'layanan', 'pesan', 'diterima', 'status'],
      ...messages.map(m => [
        m.senderName, m.senderEmail, m.senderPhone ?? '', m.subject,
        m.serviceType ?? '', m.message, m.receivedAt, m.status
      ])
    ];
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `pesan_masuk_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <PanelHeader
        icon={<Mail className="w-5 h-5" />}
        title="Inbox Pesan Kontak"
        subtitle={`${messages.length} pesan diterima — ${counts.Unread ?? 0} belum dibaca.`}
        action={
          <button
            onClick={exportCsv}
            disabled={messages.length === 0}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center space-x-2 disabled:opacity-50 transition"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV</span>
          </button>
        }
      />

      <Card>
        <div className="space-y-3 text-xs">
          <Field label="Cari Pesan">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari nama, email, subjek, atau isi pesan..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60"
              />
            </div>
          </Field>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter('All')}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                filter === 'All'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Semua ({messages.length})
            </button>
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg font-bold ${
                  filter === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {s} ({counts[s] ?? 0})
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {visible.map(msg => (
          <div
            key={msg.id}
            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border space-y-3 text-xs shadow-sm ${
              msg.status === 'Unread'
                ? 'border-blue-500'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {msg.subject}
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Dari{' '}
                  <strong className="text-slate-800 dark:text-slate-200">{msg.senderName}</strong>{' '}
                  <a href={`mailto:${msg.senderEmail}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                    {msg.senderEmail}
                  </a>
                  {msg.senderPhone && ` • ${msg.senderPhone}`}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${STATUS_TONE[msg.status]}`}
                >
                  {msg.status}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(msg.receivedAt).toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {msg.message}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              {msg.serviceType && (
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                  Layanan ditanyakan: {msg.serviceType}
                </span>
              )}

              <div className="flex flex-wrap items-center gap-2 ml-auto">
                <a
                  href={`mailto:${msg.senderEmail}?subject=${encodeURIComponent(
                    `Re: ${msg.subject}`
                  )}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1 transition"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Balas Email</span>
                </a>
                
                {msg.status !== 'Replied' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'Replied')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 font-bold flex items-center space-x-1 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandai Sudah Dibalas</span>
                  </button>
                )}

                {msg.status === 'Unread' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'Read')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    title="Tandai sudah dibaca"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                {msg.status !== 'Archived' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'Archived')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                    title="Arsipkan"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                )}

                {msg.status !== 'Spam' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'Spam')}
                    className="px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 font-bold transition"
                    title="Tandai sebagai spam"
                  >
                    Spam
                  </button>
                )}

                <button
                  onClick={() => trigger(msg.id)}
                  className={`p-1.5 rounded-lg transition ${
                    armedId === msg.id
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
                  }`}
                  title={armedId === msg.id ? 'Klik lagi untuk konfirmasi' : 'Hapus'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {armedId === msg.id && (
              <p className="text-[11px] font-bold text-rose-600 dark:text-rose-400">
                Klik ikon hapus sekali lagi untuk menghapus pesan ini secara permanen.
              </p>
            )}
          </div>
        ))}

        {visible.length === 0 && (
          <EmptyState
            message={
              messages.length === 0
                ? 'Belum ada pesan masuk.'
                : 'Tidak ada pesan yang cocok dengan filter.'
            }
          />
        )}
      </div>
    </div>
  );
};
