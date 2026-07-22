'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Users, Eye, FileText, Mail, Trophy, Award, CheckCircle } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { analytics, projects, blogPosts, messages, cvVersions, auditLogs } = useDataContext();

  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ringkasan Statistik & Performa CMS
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Monitoring pengunjung real-time, statistik proyek, unduhan CV, dan aktivitas pesan masuk.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Pengunjung</span>
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.totalVisitors.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-500 font-semibold">+12% dari bulan lalu</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Total Project Views</span>
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.totalProjectViews.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500">{projects.length} Proyek aktif</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Unduhan CV PDF</span>
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{analytics.cvDownloads}</p>
          <p className="text-[11px] text-slate-500">{cvVersions.length} Versi CV aktif</p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">Pesan Masuk Unread</span>
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{unreadMessagesCount}</p>
          <p className="text-[11px] text-amber-600 font-semibold">{messages.length} total pesan</p>
        </div>
      </div>

      {/* Visitor Traffic Line Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Grafik Tren Pengunjung (7 Hari Terakhir)
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.visitorTrend}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#2563eb" fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Content Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Projects */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Proyek Paling Banyak Dilihat</span>
          </h3>
          <div className="space-y-3">
            {projects.slice(0, 4).map((p, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{p.title}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">{p.views} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>Artikel Blog Terpopuler</span>
          </h3>
          <div className="space-y-3">
            {blogPosts.slice(0, 4).map((b, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{b.title.id}</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">{b.views} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Logs Quick Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>Aktivitas Terbaru Sistem (Audit Log)</span>
        </h3>
        <div className="space-y-2">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white mr-2">[{log.action}]</span>
                <span className="text-slate-600 dark:text-slate-300">{log.details}</span>
              </div>
              <span className="text-[10px] text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
