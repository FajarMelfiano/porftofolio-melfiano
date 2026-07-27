'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProfileManager } from './AdminProfileManager';
import { AdminHeroManager } from './AdminHeroManager';
import { AdminSkillsManager } from './AdminSkillsManager';
import { AdminExperienceManager } from './AdminExperienceManager';
import { AdminEducationManager } from './AdminEducationManager';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminCertificatesManager } from './AdminCertificatesManager';
import { AdminAchievementsManager } from './AdminAchievementsManager';
import { AdminOrganizationsManager } from './AdminOrganizationsManager';
import { AdminTrainingsManager } from './AdminTrainingsManager';
import { AdminPublicationsManager } from './AdminPublicationsManager';
import { AdminServicesManager } from './AdminServicesManager';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminTestimonialsManager } from './AdminTestimonialsManager';
import { AdminGalleryManager } from './AdminGalleryManager';
import { AdminCVManager } from './AdminCVManager';
import { AdminMessagesManager } from './AdminMessagesManager';
import { AdminSubscribersManager } from './AdminSubscribersManager';
import { AdminThemeCustomizer } from './AdminThemeCustomizer';
import { AdminPageBuilder } from './AdminPageBuilder';
import { AdminSEOSettings } from './AdminSEOSettings';
import { AdminSystemSettings } from './AdminSystemSettings';
import { AdminAuditLogViewer } from './AdminAuditLogViewer';
import { AdminFileManager } from './AdminFileManager';
import { AdminUserManager } from './AdminUserManager';

import {
  LayoutDashboard, User, Sparkles, Code2, Briefcase, GraduationCap, Folder,
  Award, Trophy, Users, BookMarked, BookOpen, Wrench, MessageSquare,
  Image as ImageIcon, FileText, Mail, UserPlus, Palette, Layers, Search,
  Settings, ScrollText, LogOut, ExternalLink, Shield, Menu, X, Loader2,
  FolderOpen, UserCog
} from 'lucide-react';

type MenuItem = { id: string; label: string; icon: React.ReactNode; badge?: number };
type MenuGroup = { group: string; items: MenuItem[] };

export const AdminLayout: React.FC = () => {
  const { isAdminLoggedIn, isAuthResolving, logoutAdmin, adminUser, messages, testimonials } =
    useDataContext();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Wait for Firebase to restore the session, otherwise a signed-in admin
  // sees the login form flash on every reload.
  if (isAuthResolving) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-6 h-6 text-slate-500 animate-spin" />
      </div>
    );
  }

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const unreadMessages = messages.filter(m => m.status === 'Unread').length;
  const pendingTestimonials = testimonials.filter(t => !t.isApproved).length;

  const menuGroups: MenuGroup[] = [
    {
      group: 'Ringkasan',
      items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> }]
    },
    {
      group: 'Profil',
      items: [
        { id: 'profile', label: 'Data Diri', icon: <User className="w-4 h-4" /> },
        { id: 'hero', label: 'Hero Banner', icon: <Sparkles className="w-4 h-4" /> },
        { id: 'skills', label: 'Keahlian', icon: <Code2 className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Riwayat',
      items: [
        { id: 'experience', label: 'Pengalaman Kerja', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'education', label: 'Pendidikan', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'organizations', label: 'Organisasi', icon: <Users className="w-4 h-4" /> },
        { id: 'trainings', label: 'Pelatihan', icon: <BookMarked className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Karya',
      items: [
        { id: 'projects', label: 'Proyek', icon: <Folder className="w-4 h-4" /> },
        { id: 'certificates', label: 'Sertifikat', icon: <Award className="w-4 h-4" /> },
        { id: 'achievements', label: 'Prestasi', icon: <Trophy className="w-4 h-4" /> },
        { id: 'publications', label: 'Publikasi', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'gallery', label: 'Galeri', icon: <ImageIcon className="w-4 h-4" /> },
        { id: 'cv', label: 'Versi CV', icon: <FileText className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Konten & Klien',
      items: [
        { id: 'services', label: 'Layanan', icon: <Wrench className="w-4 h-4" /> },
        { id: 'blog', label: 'Blog', icon: <BookOpen className="w-4 h-4" /> },
        {
          id: 'testimonials',
          label: 'Testimoni',
          icon: <MessageSquare className="w-4 h-4" />,
          badge: pendingTestimonials || undefined
        },
        {
          id: 'messages',
          label: 'Inbox Pesan',
          icon: <Mail className="w-4 h-4" />,
          badge: unreadMessages || undefined
        },
        { id: 'subscribers', label: 'Subscriber', icon: <UserPlus className="w-4 h-4" /> }
      ]
    },
    {
      group: 'Situs',
      items: [
        { id: 'builder', label: 'Page Builder', icon: <Layers className="w-4 h-4" /> },
        { id: 'theme', label: 'Tampilan & Tema', icon: <Palette className="w-4 h-4" /> },
        { id: 'seo', label: 'SEO', icon: <Search className="w-4 h-4" /> },
        { id: 'files', label: 'File Manager', icon: <FolderOpen className="w-4 h-4" /> },
        { id: 'users', label: 'Manajemen Akun', icon: <UserCog className="w-4 h-4" /> },
        { id: 'system', label: 'Sistem & Cadangan', icon: <Settings className="w-4 h-4" /> },
        { id: 'audit', label: 'Log Aktivitas', icon: <ScrollText className="w-4 h-4" /> }
      ]
    }
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'profile': return <AdminProfileManager />;
      case 'hero': return <AdminHeroManager />;
      case 'skills': return <AdminSkillsManager />;
      case 'experience': return <AdminExperienceManager />;
      case 'education': return <AdminEducationManager />;
      case 'organizations': return <AdminOrganizationsManager />;
      case 'trainings': return <AdminTrainingsManager />;
      case 'projects': return <AdminProjectsManager />;
      case 'certificates': return <AdminCertificatesManager />;
      case 'achievements': return <AdminAchievementsManager />;
      case 'publications': return <AdminPublicationsManager />;
      case 'gallery': return <AdminGalleryManager />;
      case 'cv': return <AdminCVManager />;
      case 'services': return <AdminServicesManager />;
      case 'blog': return <AdminBlogManager />;
      case 'testimonials': return <AdminTestimonialsManager />;
      case 'messages': return <AdminMessagesManager />;
      case 'subscribers': return <AdminSubscribersManager />;
      case 'builder': return <AdminPageBuilder />;
      case 'theme': return <AdminThemeCustomizer />;
      case 'seo': return <AdminSEOSettings />;
      case 'files': return <AdminFileManager />;
      case 'users': return <AdminUserManager />;
      case 'system': return <AdminSystemSettings />;
      case 'audit': return <AdminAuditLogViewer />;
      default: return <AdminDashboard onNavigate={setActiveTab} />;
    }
  };

  const totalAlerts = unreadMessages + pendingTestimonials;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Nav Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">Admin CMS</span>
          {totalAlerts > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold">
              {totalAlerts}
            </span>
          )}
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          aria-label="Buka menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 flex-shrink-0 space-y-6 md:h-screen md:sticky md:top-0 md:overflow-y-auto`}
      >
        <div className="hidden md:flex items-center space-x-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">CMS Admin</h2>
            <p className="text-[10px] text-slate-400 truncate">
              {adminUser?.email || 'Terautentikasi'}
            </p>
          </div>
        </div>

        <nav className="space-y-5">
          {menuGroups.map(group => (
            <div key={group.group} className="space-y-1">
              <p className="px-3.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {group.group}
              </p>
              {group.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center space-x-2 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Website Publik</span>
          </a>

          <button
            onClick={logoutAdmin}
            className="w-full px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 text-xs font-bold flex items-center space-x-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};
