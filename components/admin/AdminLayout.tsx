'use client';

import React, { useState } from 'react';
import { useDataContext } from '@/lib/data-context';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import { AdminProfileManager } from './AdminProfileManager';
import { AdminProjectsManager } from './AdminProjectsManager';
import { AdminBlogManager } from './AdminBlogManager';
import { AdminMessagesManager } from './AdminMessagesManager';
import { AdminThemeCustomizer } from './AdminThemeCustomizer';
import { AdminPageBuilder } from './AdminPageBuilder';
import { AdminSEOSettings } from './AdminSEOSettings';
import { AdminSystemSettings } from './AdminSystemSettings';

import {
  LayoutDashboard,
  User,
  Folder,
  BookOpen,
  Mail,
  Palette,
  Layers,
  Search,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { isAdminLoggedIn, logoutAdmin, messages } = useDataContext();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Data Diri', icon: <User className="w-4 h-4" /> },
    { id: 'projects', label: 'Portofolio Proyek', icon: <Folder className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog & Panduan', icon: <BookOpen className="w-4 h-4" /> },
    {
      id: 'messages',
      label: 'Inbox Pesan',
      icon: <Mail className="w-4 h-4" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined
    },
    { id: 'builder', label: 'Page Builder', icon: <Layers className="w-4 h-4" /> },
    { id: 'theme', label: 'Kustomisasi Tampilan', icon: <Palette className="w-4 h-4" /> },
    { id: 'seo', label: 'Pengaturan SEO', icon: <Search className="w-4 h-4" /> },
    { id: 'system', label: 'Sistem & Cadangan', icon: <Settings className="w-4 h-4" /> },
  ];

  const renderActiveView = () => {
    switch (activeTab) {
      case 'profile': return <AdminProfileManager />;
      case 'projects': return <AdminProjectsManager />;
      case 'blog': return <AdminBlogManager />;
      case 'messages': return <AdminMessagesManager />;
      case 'builder': return <AdminPageBuilder />;
      case 'theme': return <AdminThemeCustomizer />;
      case 'seo': return <AdminSEOSettings />;
      case 'system': return <AdminSystemSettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* Mobile Top Nav Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-blue-500" />
          <span className="font-extrabold text-sm text-white">Admin CMS</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`${
        mobileMenuOpen ? 'block' : 'hidden'
      } md:block w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex-shrink-0 space-y-6`}>
        <div className="hidden md:flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-white">CMS Admin</h2>
            <p className="text-[10px] text-slate-400">Terautentikasi (Superadmin)</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center space-x-2 transition"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Website Publik</span>
          </a>

          <button
            onClick={logoutAdmin}
            className="w-full px-3.5 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold flex items-center space-x-2 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto overflow-y-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};
