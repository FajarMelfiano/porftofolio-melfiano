'use client';

import React, { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';
import { DataProvider, useDataContext } from '@/lib/data-context';
import { Navbar } from '@/components/public/Navbar';
import { HeroSection } from '@/components/public/HeroSection';
import { AboutSection } from '@/components/public/AboutSection';
import { SkillsSection } from '@/components/public/SkillsSection';
import { ExperienceSection } from '@/components/public/ExperienceSection';
import { EducationSection } from '@/components/public/EducationSection';
import { ProjectsSection } from '@/components/public/ProjectsSection';
import { CertificatesSection } from '@/components/public/CertificatesSection';
import { AchievementsSection } from '@/components/public/AchievementsSection';
import { OrganizationSection } from '@/components/public/OrganizationSection';
import { TrainingsSection } from '@/components/public/TrainingsSection';
import { PublicationsSection } from '@/components/public/PublicationsSection';
import { ServicesSection } from '@/components/public/ServicesSection';
import { BlogSection } from '@/components/public/BlogSection';
import { TestimonialsSection } from '@/components/public/TestimonialsSection';
import { GallerySection } from '@/components/public/GallerySection';
import { CVViewerSection } from '@/components/public/CVViewerSection';
import { ContactSection } from '@/components/public/ContactSection';
import { Footer } from '@/components/public/Footer';
import { WhatsAppFloatingButton } from '@/components/public/WhatsAppFloatingButton';
import { CommandPaletteModal } from '@/components/public/CommandPaletteModal';
import { SiteSettings } from '@/components/SiteSettings';
import { AdminLayout } from '@/components/admin/AdminLayout';

function PortfolioAppContent() {
  const { pageSections, systemSettings } = useDataContext();
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkAdminRoute = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const path = window.location.pathname;

      const rawRoute = systemSettings.adminRoute || '/secure-control-panel';
      const cleanAdminRoute = rawRoute.startsWith('/') ? rawRoute : `/${rawRoute}`;
      const strippedAdminRoute = cleanAdminRoute.replace(/^\//, '');

      const isSecretParam = urlParams.get('admin') === 'true' || urlParams.get('key') === rawRoute;
      const isSecretHash = hash === '#admin' || hash === `#${strippedAdminRoute}`;
      const isPathMatch =
        path === cleanAdminRoute ||
        path === '/admin' ||
        (cleanAdminRoute !== '/' && path.startsWith(cleanAdminRoute)) ||
        path.startsWith('/admin/');

      if (isSecretParam || isSecretHash || isPathMatch) {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    };

    checkAdminRoute();

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);

    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [systemSettings.adminRoute]);

  if (isAdminRoute) {
    return <AdminLayout />;
  }

  // Maintenance mode hides the public site but never the admin route above,
  // otherwise switching it on would lock the owner out of the CMS.
  if (systemSettings.enableMaintenanceMode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-canvas text-fg font-sans">
        <div className="max-w-md text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-surface border border-fg/10 rounded-sm text-[10px] uppercase tracking-[0.25em] text-fg/60 font-bold">
            <Wrench className="w-3.5 h-3.5 text-fg/80" />
            <span>Maintenance</span>
          </div>
          <h1 className="text-3xl font-serif italic text-fg">Sedang Dalam Pemeliharaan</h1>
          <p className="text-sm text-fg/60 leading-relaxed">
            {systemSettings.maintenanceMessage}
          </p>
        </div>
      </div>
    );
  }

  // Sorted list of visible public page sections according to Page Builder settings
  const visibleSections = [...pageSections]
    .filter(s => s.isVisible)
    .sort((a, b) => a.order - b.order);

  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero': return <HeroSection key={key} />;
      case 'about': return <AboutSection key={key} />;
      case 'skills': return <SkillsSection key={key} />;
      case 'experience': return <ExperienceSection key={key} />;
      case 'education': return <EducationSection key={key} />;
      case 'projects': return <ProjectsSection key={key} />;
      case 'certificates': return <CertificatesSection key={key} />;
      case 'achievements': return <AchievementsSection key={key} />;
      case 'organization': return <OrganizationSection key={key} />;
      case 'trainings': return <TrainingsSection key={key} />;
      case 'publications': return <PublicationsSection key={key} />;
      case 'services': return <ServicesSection key={key} />;
      case 'blog': return <BlogSection key={key} />;
      case 'testimonials': return <TestimonialsSection key={key} />;
      case 'gallery': return <GallerySection key={key} />;
      case 'cv': return <CVViewerSection key={key} />;
      case 'contact': return <ContactSection key={key} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-fg selection:bg-fg selection:text-canvas font-sans">
      <Navbar />
      <main>
        {visibleSections.map(sec => renderSectionByKey(sec.key))}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      {systemSettings.enableCommandPalette && <CommandPaletteModal />}
    </div>
  );
}

export default function Home() {
  return (
    <DataProvider>
      <SiteSettings />
      <PortfolioAppContent />
    </DataProvider>
  );
}
