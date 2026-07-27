'use client';

import React from 'react';
import { useDataContext } from '@/lib/data-context';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import {
  Users, Eye, FileText, Mail, Trophy, CheckCircle, AlertTriangle,
  Code2, Briefcase, GraduationCap, Folder, Award, BookOpen, MessageSquare,
  Image as ImageIcon, Wrench, ArrowRight
} from 'lucide-react';
import { Card, PanelHeader } from './ui';

export const AdminDashboard: React.FC<{ onNavigate?: (tab: string) => void }> = ({ onNavigate }) => {
  const {
    analytics, profile, projects, blogPosts, messages, cvVersions, auditLogs,
    skills, experiences, educations, certificates, achievements, organizations,
    trainings, publications, testimonials, services, gallery, subscribers,
    pageSections, isDarkMode
  } = useDataContext();

  const unreadMessages = messages.filter(m => m.status === 'Unread').length;
  const pendingTestimonials = testimonials.filter(t => !t.isApproved).length;
  const draftPosts = blogPosts.filter(p => p.isDraft).length;

  // Surfaces things that silently break the public site rather than raw counts.
  const warnings: { text: string; tab: string }[] = [];
  if (cvVersions.length === 0) {
    warnings.push({ text: 'Belum ada versi CV — tombol unduh CV tidak berfungsi.', tab: 'cv' });
  } else if (!cvVersions.some(c => c.isActive)) {
    warnings.push({ text: 'Tidak ada CV yang ditandai aktif.', tab: 'cv' });
  }
  if (pendingTestimonials > 0) {
    warnings.push({
      text: `${pendingTestimonials} testimoni menunggu persetujuan dan belum tampil di situs.`,
      tab: 'testimonials'
    });
  }
  if (unreadMessages > 0) {
    warnings.push({ text: `${unreadMessages} pesan masuk belum dibaca.`, tab: 'messages' });
  }
  if (projects.length === 0) {
    warnings.push({ text: 'Belum ada proyek di portofolio.', tab: 'projects' });
  }
  const hiddenSections = pageSections.filter(s => !s.isVisible).length;
  if (hiddenSections > 0) {
    warnings.push({
      text: `${hiddenSections} seksi halaman sedang disembunyikan di Page Builder.`,
      tab: 'builder'
    });
  }

  const contentStats = [
    { label: 'Keahlian', count: skills.length, icon: <Code2 className="w-4 h-4" />, tab: 'skills' },
    { label: 'Pengalaman', count: experiences.length, icon: <Briefcase className="w-4 h-4" />, tab: 'experience' },
    { label: 'Pendidikan', count: educations.length, icon: <GraduationCap className="w-4 h-4" />, tab: 'education' },
    { label: 'Proyek', count: projects.length, icon: <Folder className="w-4 h-4" />, tab: 'projects' },
    { label: 'Sertifikat', count: certificates.length, icon: <Award className="w-4 h-4" />, tab: 'certificates' },
    { label: 'Prestasi', count: achievements.length, icon: <Trophy className="w-4 h-4" />, tab: 'achievements' },
    { label: 'Organisasi', count: organizations.length, icon: <Users className="w-4 h-4" />, tab: 'organizations' },
    { label: 'Pelatihan', count: trainings.length, icon: <BookOpen className="w-4 h-4" />, tab: 'trainings' },
    { label: 'Publikasi', count: publications.length, icon: <BookOpen className="w-4 h-4" />, tab: 'publications' },
    { label: 'Layanan', count: services.length, icon: <Wrench className="w-4 h-4" />, tab: 'services' },
    { label: 'Artikel', count: blogPosts.length, icon: <BookOpen className="w-4 h-4" />, tab: 'blog' },
    { label: 'Testimoni', count: testimonials.length, icon: <MessageSquare className="w-4 h-4" />, tab: 'testimonials' },
    { label: 'Galeri', count: gallery.length, icon: <ImageIcon className="w-4 h-4" />, tab: 'gallery' },
    { label: 'Subscriber', count: subscribers.length, icon: <Mail className="w-4 h-4" />, tab: 'subscribers' }
  ];

  const kpis = [
    {
      label: 'Total Pengunjung',
      value: analytics.totalVisitors.toLocaleString('id-ID'),
      note: `${analytics.todayVisitors} hari ini`,
      icon: <Users className="w-5 h-5" />,
      tone: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600'
    },
    {
      label: 'Total Project Views',
      value: projects.reduce((s, p) => s + p.views, 0).toLocaleString('id-ID'),
      note: `${projects.length} proyek aktif`,
      icon: <Eye className="w-5 h-5" />,
      tone: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'
    },
    {
      label: 'Unduhan CV',
      value: cvVersions.reduce((s, c) => s + c.downloadCount, 0).toLocaleString('id-ID'),
      note: `${cvVersions.length} versi tersedia`,
      icon: <FileText className="w-5 h-5" />,
      tone: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600'
    },
    {
      label: 'Pesan Belum Dibaca',
      value: String(unreadMessages),
      note: `${messages.length} total pesan`,
      icon: <Mail className="w-5 h-5" />,
      tone: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600'
    }
  ];

  const axisColor = isDarkMode ? '#64748b' : '#94a3b8';

  return (
    <div className="space-y-8">
      <PanelHeader
        icon={<Trophy className="w-5 h-5" />}
        title={`Selamat datang, ${profile.name.split(' ')[0]}`}
        subtitle="Ringkasan konten, statistik pengunjung, dan hal yang perlu ditindaklanjuti."
      />

      {/* Action items */}
      {warnings.length > 0 && (
        <Card className="border-amber-300 dark:border-amber-900">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Perlu Ditindaklanjuti ({warnings.length})</span>
            </h3>
            <div className="space-y-2">
              {warnings.map((w, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate?.(w.tab)}
                  className="w-full text-left p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-xs flex items-center justify-between gap-3 hover:bg-amber-100 dark:hover:bg-amber-950/70 transition"
                >
                  <span>{w.text}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map(k => (
          <Card key={k.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">{k.label}</span>
              <div className={`p-2 rounded-xl ${k.tone}`}>{k.icon}</div>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{k.value}</p>
            <p className="text-[11px] text-slate-500">{k.note}</p>
          </Card>
        ))}
      </div>

      {/* Visitor trend */}
      <Card className="space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Tren Pengunjung (7 Hari Terakhir)
          </h3>
          <p className="text-[11px] text-slate-500">
            Data contoh bawaan — belum terhubung ke layanan analitik sungguhan.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.visitorTrend} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={axisColor} strokeOpacity={0.2} vertical={false} />
              <XAxis dataKey="date" stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke={axisColor} fontSize={11} tickLine={false} axisLine={false} width={40} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  fontSize: 12,
                  background: isDarkMode ? '#0f172a' : '#ffffff',
                  color: isDarkMode ? '#e2e8f0' : '#0f172a',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)'
                }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViews)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Content inventory */}
      <Card className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Isi Konten</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {contentStats.map(s => (
            <button
              key={s.label}
              onClick={() => onNavigate?.(s.tab)}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition space-y-1"
            >
              <div className="text-slate-400">{s.icon}</div>
              <p className="text-lg font-black text-slate-900 dark:text-white leading-none">
                {s.count}
              </p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {s.label}
              </p>
            </button>
          ))}
        </div>
        {draftPosts > 0 && (
          <p className="text-[11px] text-slate-500">
            {draftPosts} artikel masih berstatus draf dan belum tampil di situs publik.
          </p>
        )}
      </Card>

      {/* Popular content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Proyek Paling Banyak Dilihat</span>
          </h3>
          <div className="space-y-2">
            {[...projects]
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
              .map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 gap-3"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {p.title}
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono shrink-0">
                    {p.views}
                  </span>
                </div>
              ))}
            {projects.length === 0 && <p className="text-xs text-slate-500">Belum ada proyek.</p>}
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Artikel Terpopuler</span>
          </h3>
          <div className="space-y-2">
            {[...blogPosts]
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
              .map(b => (
                <div
                  key={b.id}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 gap-3"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {b.title.id}
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono shrink-0">
                    {b.views}
                  </span>
                </div>
              ))}
            {blogPosts.length === 0 && <p className="text-xs text-slate-500">Belum ada artikel.</p>}
          </div>
        </Card>
      </div>

      {/* Audit log */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Aktivitas Terbaru</span>
          </h3>
          <button
            onClick={() => onNavigate?.('audit')}
            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Lihat semua
          </button>
        </div>
        <div className="space-y-2">
          {auditLogs.slice(0, 6).map(log => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs flex flex-wrap items-center justify-between gap-2"
            >
              <div className="min-w-0">
                <span className="font-bold text-slate-900 dark:text-white mr-2">[{log.action}]</span>
                <span className="text-slate-600 dark:text-slate-300">{log.details}</span>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0">
                {new Date(log.timestamp).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
          {auditLogs.length === 0 && (
            <p className="text-xs text-slate-500">Belum ada aktivitas tercatat.</p>
          )}
        </div>
      </Card>
    </div>
  );
};
