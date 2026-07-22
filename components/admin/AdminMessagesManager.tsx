'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { Mail, CheckCircle2, Archive, Trash2, Reply } from 'lucide-react';

export const AdminMessagesManager: React.FC = () => {
  const { messages, updateMessageStatus, deleteMessage } = useDataContext();
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Replied'>('All');

  const filteredMessages = messages.filter(m => {
    if (filter === 'Unread') return m.status === 'Unread';
    if (filter === 'Replied') return m.status === 'Replied';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Pesan Masuk (Inbox Kontak)</span>
          </h2>
          <p className="text-xs text-slate-500">Kelola dan tanggapi konsultasi atau pesan dari pengunjung website.</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {(['All', 'Unread', 'Replied'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold ${
                filter === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredMessages.map((msg) => (
          <div
            key={msg.id}
            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border ${
              msg.status === 'Unread' ? 'border-blue-500 shadow-md' : 'border-slate-200 dark:border-slate-800'
            } space-y-3 text-xs`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">{msg.subject}</h3>
                <p className="text-slate-500">
                  Dari: <strong className="text-slate-800 dark:text-slate-200">{msg.senderName}</strong> ({msg.senderEmail}) • {msg.senderPhone || 'Tidak ada HP'}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                  msg.status === 'Unread' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {msg.status}
                </span>
                <span className="text-[10px] text-slate-400">{new Date(msg.receivedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {msg.message}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold">
                Layanan Ditanyakan: {msg.serviceType}
              </span>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${msg.senderEmail}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                  onClick={() => updateMessageStatus(msg.id, 'Replied')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center space-x-1"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Balas Email</span>
                </a>

                {msg.status === 'Unread' && (
                  <button
                    onClick={() => updateMessageStatus(msg.id, 'Read')}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    title="Tandai Dibaca"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    if (confirm('Hapus pesan ini?')) deleteMessage(msg.id);
                  }}
                  className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400"
                  title="Hapus"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredMessages.length === 0 && (
          <div className="p-12 text-center text-slate-500 text-xs">
            Tidak ada pesan ditemukan.
          </div>
        )}
      </div>
    </div>
  );
};
