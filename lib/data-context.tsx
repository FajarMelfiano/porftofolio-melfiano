'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser
} from 'firebase/auth';
import { db, auth } from './firebase';
import {
  Language,
  ProfileInfo,
  HeroConfig,
  Skill,
  SkillCategory,
  Experience,
  Education,
  Project,
  Certificate,
  Achievement,
  Organization,
  Training,
  Publication,
  Testimonial,
  Service,
  BlogPost,
  GalleryItem,
  CVVersion,
  ContactMessage,
  Subscriber,
  ThemeSettings,
  SEOSettings,
  SystemSettings,
  PageSectionConfig,
  AuditLog,
  AnalyticsSummary,
  AdminUser
} from './types';

import {
  initialProfile,
  initialHeroConfig,
  initialSkillCategories,
  initialSkills,
  initialExperiences,
  initialEducations,
  initialProjects,
  initialCertificates,
  initialAchievements,
  initialOrganizations,
  initialTrainings,
  initialPublications,
  initialTestimonials,
  initialServices,
  initialBlogPosts,
  initialGallery,
  initialCVVersions,
  initialThemeSettings,
  initialSEOSettings,
  initialSystemSettings,
  initialPageSections,
  initialAuditLogs,
  initialAnalytics,
  initialMessages,
  initialSubscribers
} from './initial-data';

interface DataContextType {
  // Global states
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  isAuthResolving: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ ok: boolean; error?: string }>;
  logoutAdmin: () => Promise<void>;
  
  // Entities
  profile: ProfileInfo;
  updateProfile: (data: Partial<ProfileInfo>) => void;
  
  heroConfig: HeroConfig;
  updateHeroConfig: (data: Partial<HeroConfig>) => void;
  
  skillCategories: SkillCategory[];
  addSkillCategory: (cat: Omit<SkillCategory, 'id'>) => void;
  updateSkillCategory: (id: string, cat: Partial<SkillCategory>) => void;
  deleteSkillCategory: (id: string) => void;

  skills: Skill[];
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  experiences: Experience[];
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  
  educations: Education[];
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  projects: Project[];
  addProject: (proj: Omit<Project, 'id' | 'views'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  incrementProjectView: (id: string) => void;
  
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: string) => void;
  
  achievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
  
  organizations: Organization[];
  addOrganization: (org: Omit<Organization, 'id'>) => void;
  updateOrganization: (id: string, org: Partial<Organization>) => void;
  deleteOrganization: (id: string) => void;
  
  trainings: Training[];
  addTraining: (trn: Omit<Training, 'id'>) => void;
  updateTraining: (id: string, trn: Partial<Training>) => void;
  deleteTraining: (id: string) => void;
  
  publications: Publication[];
  addPublication: (pub: Omit<Publication, 'id'>) => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  deletePublication: (id: string) => void;
  
  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id' | 'isApproved'>) => void;
  updateTestimonial: (id: string, test: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  approveTestimonial: (id: string) => void;
  
  services: Service[];
  addService: (srv: Omit<Service, 'id'>) => void;
  updateService: (id: string, srv: Partial<Service>) => void;
  deleteService: (id: string) => void;
  
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'views' | 'likes' | 'commentsCount'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  incrementBlogLike: (id: string) => void;
  incrementBlogView: (id: string) => void;
  
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  cvVersions: CVVersion[];
  addCVVersion: (cv: Omit<CVVersion, 'id' | 'downloadCount'>) => void;
  updateCVVersion: (id: string, cv: Partial<CVVersion>) => void;
  deleteCVVersion: (id: string) => void;
  setActiveCV: (id: string) => void;
  incrementCVDownload: (id: string) => void;
  
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'receivedAt' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;
  
  subscribers: Subscriber[];
  addSubscriber: (email: string) => boolean;
  updateSubscriber: (id: string, sub: Partial<Subscriber>) => void;
  deleteSubscriber: (id: string) => void;
  
  themeSettings: ThemeSettings;
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void;
  
  seoSettings: SEOSettings;
  updateSEOSettings: (seo: Partial<SEOSettings>) => void;
  
  systemSettings: SystemSettings;
  updateSystemSettings: (sys: Partial<SystemSettings>) => void;
  
  pageSections: PageSectionConfig[];
  updatePageSections: (sections: PageSectionConfig[]) => void;
  
  auditLogs: AuditLog[];
  addAuditLog: (action: string, module: string, details: string) => void;
  clearAuditLogs: () => void;
  
  analytics: AnalyticsSummary;
  
  // Helper methods
  resetToDefaultData: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean;
  
  // UI Helpers
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'PORTFOLIO_CMS_DATA_V1';

/**
 * Bump this whenever initial-data.ts changes in a way that must override a
 * cached copy. Without it a snapshot saved under the old seed keeps winning
 * over the new one forever — the page renders the new data, then the restore
 * effect silently replaces it with the stale cache a tick later.
 */
const DATA_VERSION = 2;
// Must match the key read by the pre-paint theme script in app/layout.tsx.
const THEME_STORAGE_KEY = 'PORTFOLIO_CMS_THEME';

const toAdminUser = (user: FirebaseUser): AdminUser => ({
  id: user.uid,
  name: user.displayName || user.email || 'Administrator',
  email: user.email || '',
  role: 'super_admin',
  avatar: user.photoURL || '',
  twoFactorEnabled: false,
  lastLogin: user.metadata.lastSignInTime || new Date().toISOString()
});

/** Turns a Firebase auth error code into something an admin can act on. */
const authErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Format email tidak valid.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email atau kata sandi salah.';
    case 'auth/user-disabled':
      return 'Akun ini dinonaktifkan.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Coba lagi beberapa saat lagi.';
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke server autentikasi. Periksa koneksi Anda.';
    case 'auth/operation-not-allowed':
      return 'Metode Email/Password belum diaktifkan di konsol Firebase.';
    default:
      return 'Gagal masuk. Silakan coba lagi.';
  }
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  // True until Firebase reports the restored session, so the login form isn't
  // flashed at an already-signed-in admin on every page load.
  const [isAuthResolving, setIsAuthResolving] = useState<boolean>(true);
  
  const [profile, setProfile] = useState<ProfileInfo>(initialProfile);
  const [heroConfig, setHeroConfig] = useState<HeroConfig>(initialHeroConfig);
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(initialSkillCategories);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings);
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [cvVersions, setCvVersions] = useState<CVVersion[]>(initialCVVersions);
  const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers);
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(initialThemeSettings);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(initialSEOSettings);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>(initialSystemSettings);
  const [pageSections, setPageSections] = useState<PageSectionConfig[]>(initialPageSections);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [analytics, setAnalytics] = useState<AnalyticsSummary>(initialAnalytics);
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Guards the save effect: without it, the effect fires on mount with the
  // seed data and overwrites saved data before the async load finishes.
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // Restore persisted state on mount
  useEffect(() => {
    let hadLocalSnapshot = false;
    let hadStaleSnapshot = false;

    const timer = setTimeout(async () => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : null;

        if (parsed && parsed.__version !== DATA_VERSION) {
          // Snapshot predates the current seed. Discard it rather than let it
          // shadow the new content, and remember it existed so the Firestore
          // step below doesn't resurrect an equally stale profile.
          localStorage.removeItem(LOCAL_STORAGE_KEY);
          hadStaleSnapshot = true;
        } else if (parsed) {
          hadLocalSnapshot = true;
          // Each entity is restored only when present, so a backup written by
          // an older build never blanks out entities it didn't know about.
          if (parsed.profile) setProfile(parsed.profile);
          if (parsed.heroConfig) setHeroConfig(parsed.heroConfig);
          if (parsed.skillCategories) setSkillCategories(parsed.skillCategories);
          if (parsed.skills) setSkills(parsed.skills);
          if (parsed.experiences) setExperiences(parsed.experiences);
          if (parsed.educations) setEducations(parsed.educations);
          if (parsed.projects) setProjects(parsed.projects);
          if (parsed.certificates) setCertificates(parsed.certificates);
          if (parsed.achievements) setAchievements(parsed.achievements);
          if (parsed.organizations) setOrganizations(parsed.organizations);
          if (parsed.trainings) setTrainings(parsed.trainings);
          if (parsed.publications) setPublications(parsed.publications);
          if (parsed.testimonials) setTestimonials(parsed.testimonials);
          if (parsed.services) setServices(parsed.services);
          if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
          if (parsed.gallery) setGallery(parsed.gallery);
          if (parsed.cvVersions) setCvVersions(parsed.cvVersions);
          if (parsed.messages) setMessages(parsed.messages);
          if (parsed.subscribers) setSubscribers(parsed.subscribers);
          if (parsed.themeSettings) setThemeSettings(parsed.themeSettings);
          if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
          if (parsed.systemSettings) setSystemSettings(parsed.systemSettings);
          if (parsed.pageSections) setPageSections(parsed.pageSections);
          if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
          if (parsed.analytics) setAnalytics(parsed.analytics);
        }
      } catch (e) {
        console.error('Failed to restore local data', e);
      }

      // Firestore currently stores only the profile document, so it can't be
      // the source of truth for the site. It is used as a first-run fallback
      // only: pulling it in on every load would reintroduce the same bug the
      // version check above fixes, just from a remote stale copy instead.
      if (!hadLocalSnapshot && !hadStaleSnapshot) {
        try {
          const docRef = doc(db, 'portfolio', 'profile');
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data() as ProfileInfo);
          } else {
            await setDoc(docRef, initialProfile);
          }
        } catch (e) {
          // Security rules deny unauthenticated access, which is expected —
          // the seed data already rendered, so there is nothing to recover.
          console.debug('Firestore profile unavailable, using local seed', e);
        }
      }

      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Firebase owns the session — it persists and restores it across reloads,
  // so there is no admin session in localStorage to trust or forge.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
      if (user) {
        setAdminUser(toAdminUser(user));
        setIsAdminLoggedIn(true);
      } else {
        setAdminUser(null);
        setIsAdminLoggedIn(false);
      }
      setIsAuthResolving(false);
    });
    return () => unsubscribe();
  }, []);

  // Save to local storage on changes
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const dataToSave = {
        __version: DATA_VERSION,
        profile,
        heroConfig,
        skillCategories,
        skills,
        experiences,
        educations,
        projects,
        certificates,
        achievements,
        organizations,
        trainings,
        publications,
        testimonials,
        services,
        blogPosts,
        gallery,
        cvVersions,
        messages,
        subscribers,
        themeSettings,
        seoSettings,
        systemSettings,
        pageSections,
        auditLogs,
        analytics,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    } catch (e) {
      console.error('Failed to save to local storage', e);
    }
  }, [
    isHydrated,
    profile, heroConfig, skillCategories, skills, experiences, educations, projects,
    certificates, achievements, organizations, trainings, publications,
    testimonials, services, blogPosts, gallery, cvVersions, messages,
    subscribers, themeSettings, seoSettings, systemSettings, pageSections, auditLogs, analytics
  ]);

  // Adopt whatever the pre-paint script in the layout already applied, so the
  // toggle icon matches the theme actually on screen.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      // Private-mode storage failures shouldn't break the toggle.
    }
  }, [isDarkMode]);

  // The navbar toggle and the admin Theme panel must not fight each other:
  // both write the same `themeSettings.mode`, which is the single source of
  // truth. Without this the toggle would be undone on the next page load.
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      setThemeSettings(current => ({ ...current, mode: next ? 'dark' : 'light' }));
      return next;
    });
  };

  const addAuditLog = (action: string, module: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      adminEmail: adminUser?.email || 'admin@portfolio.local',
      action,
      module,
      details,
      ipAddress: '127.0.0.1 (Session)',
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const loginAdmin = async (email: string, pass: string): Promise<{ ok: boolean; error?: string }> => {
    try {
      // Firebase verifies the credential; onAuthStateChanged sets the session.
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      addAuditLog('LOGIN_SUCCESS', 'Authentication', `Admin logged in successfully (${email})`);
      return { ok: true };
    } catch (e) {
      const code = (e as { code?: string })?.code || '';
      addAuditLog('LOGIN_FAILED', 'Authentication', `Failed login attempt (${email})`);
      return { ok: false, error: authErrorMessage(code) };
    }
  };

  const logoutAdmin = async () => {
    addAuditLog('LOGOUT', 'Authentication', 'Admin logged out');
    try {
      await signOut(auth);
    } catch (e) {
      console.error('Failed to sign out', e);
    }
    // Clear any leftover session from the previous localStorage-based login.
    localStorage.removeItem('PORTFOLIO_CMS_ADMIN_SESSION');
  };

  // CRUD Implementations
  const updateProfile = async (data: Partial<ProfileInfo>) => {
    const newProfile = { ...profile, ...data };
    setProfile(newProfile);
    try {
        await updateDoc(doc(db, 'portfolio', 'profile'), newProfile as any);
    } catch (e) {
        console.error('Failed to update profile in Firestore', e);
    }
    addAuditLog('UPDATE_PROFILE', 'Profile', 'Profile information updated');
  };

  const updateHeroConfig = (data: Partial<HeroConfig>) => {
    setHeroConfig(prev => ({ ...prev, ...data }));
    addAuditLog('UPDATE_HERO', 'Hero Section', 'Hero config updated');
  };

  const addSkillCategory = (cat: Omit<SkillCategory, 'id'>) => {
    setSkillCategories(prev => [...prev, { ...cat, id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }]);
    addAuditLog('CREATE_SKILL_CATEGORY', 'Skills', `Added category: ${cat.name.id}`);
  };

  const updateSkillCategory = (id: string, cat: Partial<SkillCategory>) => {
    setSkillCategories(prev => prev.map(c => (c.id === id ? { ...c, ...cat } : c)));
    addAuditLog('UPDATE_SKILL_CATEGORY', 'Skills', `Updated category ID: ${id}`);
  };

  const deleteSkillCategory = (id: string) => {
    setSkillCategories(prev => prev.filter(c => c.id !== id));
    // Skills keep their categoryId; the UI shows them as uncategorised rather
    // than deleting a skill the admin didn't ask to remove.
    addAuditLog('DELETE_SKILL_CATEGORY', 'Skills', `Deleted category ID: ${id}`);
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = { ...skill, id: `sk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setSkills(prev => [...prev, newSkill]);
    addAuditLog('CREATE_SKILL', 'Skills', `Added skill: ${skill.name}`);
  };

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setSkills(prev => prev.map(s => s.id === id ? { ...s, ...skill } : s));
    addAuditLog('UPDATE_SKILL', 'Skills', `Updated skill ID: ${id}`);
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    addAuditLog('DELETE_SKILL', 'Skills', `Deleted skill ID: ${id}`);
  };

  const addExperience = (exp: Omit<Experience, 'id'>) => {
    const newExp: Experience = { ...exp, id: `exp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setExperiences(prev => [newExp, ...prev]);
    addAuditLog('CREATE_EXP', 'Experience', `Added experience at ${exp.companyName}`);
  };

  const updateExperience = (id: string, exp: Partial<Experience>) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, ...exp } : e));
    addAuditLog('UPDATE_EXP', 'Experience', `Updated experience ID: ${id}`);
  };

  const deleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
    addAuditLog('DELETE_EXP', 'Experience', `Deleted experience ID: ${id}`);
  };

  const addEducation = (edu: Omit<Education, 'id'>) => {
    const newEdu: Education = { ...edu, id: `edu-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setEducations(prev => [newEdu, ...prev]);
    addAuditLog('CREATE_EDU', 'Education', `Added education: ${edu.institutionName}`);
  };

  const updateEducation = (id: string, edu: Partial<Education>) => {
    setEducations(prev => prev.map(e => e.id === id ? { ...e, ...edu } : e));
    addAuditLog('UPDATE_EDU', 'Education', `Updated education ID: ${id}`);
  };

  const deleteEducation = (id: string) => {
    setEducations(prev => prev.filter(e => e.id !== id));
    addAuditLog('DELETE_EDU', 'Education', `Deleted education ID: ${id}`);
  };

  const addProject = (proj: Omit<Project, 'id' | 'views'>) => {
    const newProj: Project = { ...proj, id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, views: 0 };
    setProjects(prev => [newProj, ...prev]);
    addAuditLog('CREATE_PROJECT', 'Projects', `Created project: ${proj.title}`);
  };

  const updateProject = (id: string, proj: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...proj } : p));
    addAuditLog('UPDATE_PROJECT', 'Projects', `Updated project ID: ${id}`);
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    addAuditLog('DELETE_PROJECT', 'Projects', `Deleted project ID: ${id}`);
  };

  const incrementProjectView = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
  };

  const addCertificate = (cert: Omit<Certificate, 'id'>) => {
    const newCert: Certificate = { ...cert, id: `cert-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setCertificates(prev => [newCert, ...prev]);
    addAuditLog('CREATE_CERT', 'Certificates', `Added certificate: ${cert.title}`);
  };

  const updateCertificate = (id: string, cert: Partial<Certificate>) => {
    setCertificates(prev => prev.map(c => c.id === id ? { ...c, ...cert } : c));
    addAuditLog('UPDATE_CERT', 'Certificates', `Updated certificate ID: ${id}`);
  };

  const deleteCertificate = (id: string) => {
    setCertificates(prev => prev.filter(c => c.id !== id));
    addAuditLog('DELETE_CERT', 'Certificates', `Deleted certificate ID: ${id}`);
  };

  const addAchievement = (ach: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = { ...ach, id: `ach-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setAchievements(prev => [newAch, ...prev]);
    addAuditLog('CREATE_ACHIEVEMENT', 'Achievements', 'Added new achievement');
  };

  const updateAchievement = (id: string, ach: Partial<Achievement>) => {
    setAchievements(prev => prev.map(a => a.id === id ? { ...a, ...ach } : a));
    addAuditLog('UPDATE_ACHIEVEMENT', 'Achievements', `Updated achievement ID: ${id}`);
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
    addAuditLog('DELETE_ACHIEVEMENT', 'Achievements', `Deleted achievement ID: ${id}`);
  };

  const addOrganization = (org: Omit<Organization, 'id'>) => {
    const newOrg: Organization = { ...org, id: `org-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setOrganizations(prev => [newOrg, ...prev]);
    addAuditLog('CREATE_ORG', 'Organizations', `Added organization: ${org.organizationName}`);
  };

  const updateOrganization = (id: string, org: Partial<Organization>) => {
    setOrganizations(prev => prev.map(o => o.id === id ? { ...o, ...org } : o));
    addAuditLog('UPDATE_ORG', 'Organizations', `Updated organization ID: ${id}`);
  };

  const deleteOrganization = (id: string) => {
    setOrganizations(prev => prev.filter(o => o.id !== id));
    addAuditLog('DELETE_ORG', 'Organizations', `Deleted organization ID: ${id}`);
  };

  const addTraining = (trn: Omit<Training, 'id'>) => {
    const newTrn: Training = { ...trn, id: `trn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setTrainings(prev => [newTrn, ...prev]);
    addAuditLog('CREATE_TRAINING', 'Trainings', `Added training: ${trn.trainingName}`);
  };

  const updateTraining = (id: string, trn: Partial<Training>) => {
    setTrainings(prev => prev.map(t => t.id === id ? { ...t, ...trn } : t));
    addAuditLog('UPDATE_TRAINING', 'Trainings', `Updated training ID: ${id}`);
  };

  const deleteTraining = (id: string) => {
    setTrainings(prev => prev.filter(t => t.id !== id));
    addAuditLog('DELETE_TRAINING', 'Trainings', `Deleted training ID: ${id}`);
  };

  const addPublication = (pub: Omit<Publication, 'id'>) => {
    const newPub: Publication = { ...pub, id: `pub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setPublications(prev => [newPub, ...prev]);
    addAuditLog('CREATE_PUB', 'Publications', `Added publication: ${pub.title}`);
  };

  const updatePublication = (id: string, pub: Partial<Publication>) => {
    setPublications(prev => prev.map(p => p.id === id ? { ...p, ...pub } : p));
    addAuditLog('UPDATE_PUB', 'Publications', `Updated publication ID: ${id}`);
  };

  const deletePublication = (id: string) => {
    setPublications(prev => prev.filter(p => p.id !== id));
    addAuditLog('DELETE_PUB', 'Publications', `Deleted publication ID: ${id}`);
  };

  const addTestimonial = (test: Omit<Testimonial, 'id' | 'isApproved'>) => {
    const newTest: Testimonial = { ...test, id: `test-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, isApproved: false };
    setTestimonials(prev => [newTest, ...prev]);
  };

  const updateTestimonial = (id: string, test: Partial<Testimonial>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...test } : t));
    addAuditLog('UPDATE_TESTIMONIAL', 'Testimonials', `Updated testimonial ID: ${id}`);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    addAuditLog('DELETE_TESTIMONIAL', 'Testimonials', `Deleted testimonial ID: ${id}`);
  };

  const approveTestimonial = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, isApproved: true } : t));
    addAuditLog('APPROVE_TESTIMONIAL', 'Testimonials', `Approved testimonial ID: ${id}`);
  };

  const addService = (srv: Omit<Service, 'id'>) => {
    const newSrv: Service = { ...srv, id: `srv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setServices(prev => [...prev, newSrv]);
    addAuditLog('CREATE_SERVICE', 'Services', 'Added service');
  };

  const updateService = (id: string, srv: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...srv } : s));
    addAuditLog('UPDATE_SERVICE', 'Services', `Updated service ID: ${id}`);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    addAuditLog('DELETE_SERVICE', 'Services', `Deleted service ID: ${id}`);
  };

  const addBlogPost = (post: Omit<BlogPost, 'id' | 'views' | 'likes' | 'commentsCount'>) => {
    const newPost: BlogPost = { ...post, id: `post-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, views: 0, likes: 0, commentsCount: 0 };
    setBlogPosts(prev => [newPost, ...prev]);
    addAuditLog('CREATE_BLOG', 'Blog', 'Created blog post');
  };

  const updateBlogPost = (id: string, post: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, ...post } : p));
    addAuditLog('UPDATE_BLOG', 'Blog', `Updated blog post ID: ${id}`);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== id));
    addAuditLog('DELETE_BLOG', 'Blog', `Deleted blog post ID: ${id}`);
  };

  const incrementBlogLike = (id: string) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const incrementBlogView = (id: string) => {
    setBlogPosts(prev => prev.map(p => p.id === id ? { ...p, views: p.views + 1 } : p));
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...item, id: `gal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` };
    setGallery(prev => [newItem, ...prev]);
    addAuditLog('CREATE_GALLERY', 'Gallery', 'Added gallery item');
  };

  const updateGalleryItem = (id: string, item: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => (g.id === id ? { ...g, ...item } : g)));
    addAuditLog('UPDATE_GALLERY', 'Gallery', `Updated gallery item ID: ${id}`);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    addAuditLog('DELETE_GALLERY', 'Gallery', `Deleted gallery item ID: ${id}`);
  };

  const addCVVersion = (cv: Omit<CVVersion, 'id' | 'downloadCount'>) => {
    const newCV: CVVersion = { ...cv, id: `cv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, downloadCount: 0 };
    setCvVersions(prev => [newCV, ...prev]);
    addAuditLog('CREATE_CV', 'CV', `Uploaded new CV version: ${cv.versionName}`);
  };

  const updateCVVersion = (id: string, cv: Partial<CVVersion>) => {
    setCvVersions(prev => prev.map(c => (c.id === id ? { ...c, ...cv } : c)));
    addAuditLog('UPDATE_CV', 'CV', `Updated CV version ID: ${id}`);
  };

  const deleteCVVersion = (id: string) => {
    setCvVersions(prev => prev.filter(c => c.id !== id));
    addAuditLog('DELETE_CV', 'CV', `Deleted CV version ID: ${id}`);
  };

  const setActiveCV = (id: string) => {
    setCvVersions(prev => prev.map(c => ({ ...c, isActive: c.id === id })));
    addAuditLog('SET_ACTIVE_CV', 'CV', `Set active CV ID: ${id}`);
  };

  const incrementCVDownload = (id: string) => {
    setCvVersions(prev => prev.map(c => c.id === id ? { ...c, downloadCount: c.downloadCount + 1 } : c));
    setAnalytics(prev => ({ ...prev, cvDownloads: prev.cvDownloads + 1 }));
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'receivedAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      receivedAt: new Date().toISOString(),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const addSubscriber = (email: string): boolean => {
    let added = false;
    setSubscribers(prev => {
      if (prev.some(s => s.email.toLowerCase() === email.toLowerCase())) {
        return prev;
      }
      added = true;
      const newSub: Subscriber = {
        id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        email,
        subscribedAt: new Date().toISOString(),
        isActive: true
      };
      return [newSub, ...prev];
    });
    return added;
  };

  const updateSubscriber = (id: string, sub: Partial<Subscriber>) => {
    setSubscribers(prev => prev.map(s => (s.id === id ? { ...s, ...sub } : s)));
    addAuditLog('UPDATE_SUBSCRIBER', 'Subscribers', `Updated subscriber ID: ${id}`);
  };

  const deleteSubscriber = (id: string) => {
    setSubscribers(prev => prev.filter(s => s.id !== id));
    addAuditLog('DELETE_SUBSCRIBER', 'Subscribers', `Deleted subscriber ID: ${id}`);
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
  };

  const updateThemeSettings = (settings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => {
      const next = { ...prev, ...settings };
      if (settings.mode !== undefined) {
        if (settings.mode === 'system') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          setIsDarkMode(prefersDark);
        } else {
          setIsDarkMode(settings.mode === 'dark');
        }
      }
      return next;
    });
    addAuditLog('UPDATE_THEME', 'Settings', 'Theme settings updated');
  };

  const updateSEOSettings = (seo: Partial<SEOSettings>) => {
    setSeoSettings(prev => ({ ...prev, ...seo }));
    addAuditLog('UPDATE_SEO', 'Settings', 'SEO settings updated');
  };

  const updateSystemSettings = (sys: Partial<SystemSettings>) => {
    setSystemSettings(prev => ({ ...prev, ...sys }));
    addAuditLog('UPDATE_SYSTEM', 'Settings', 'System settings updated');
  };

  const updatePageSections = (sections: PageSectionConfig[]) => {
    setPageSections(sections);
    addAuditLog('REORDER_SECTIONS', 'Page Builder', 'Updated page sections ordering & visibility');
  };

  const resetToDefaultData = () => {
    setProfile(initialProfile);
    setHeroConfig(initialHeroConfig);
    setSkillCategories(initialSkillCategories);
    setSkills(initialSkills);
    setExperiences(initialExperiences);
    setEducations(initialEducations);
    setProjects(initialProjects);
    setCertificates(initialCertificates);
    setAchievements(initialAchievements);
    setOrganizations(initialOrganizations);
    setTrainings(initialTrainings);
    setPublications(initialPublications);
    setTestimonials(initialTestimonials);
    setServices(initialServices);
    setBlogPosts(initialBlogPosts);
    setGallery(initialGallery);
    setCvVersions(initialCVVersions);
    setThemeSettings(initialThemeSettings);
    setSeoSettings(initialSEOSettings);
    setSystemSettings(initialSystemSettings);
    setPageSections(initialPageSections);
    setMessages(initialMessages);
    setSubscribers(initialSubscribers);
    setAuditLogs(initialAuditLogs);
    setAnalytics(initialAnalytics);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    addAuditLog('RESET_DATABASE', 'System', 'Database reset to initial default seed values');
  };

  const exportDatabaseJSON = () => {
    const data = {
      profile, heroConfig, skillCategories, skills, experiences, educations, projects,
      certificates, achievements, organizations, trainings, publications,
      testimonials, services, blogPosts, gallery, cvVersions, messages,
      subscribers, themeSettings, seoSettings, systemSettings, pageSections, auditLogs,
      analytics
    };
    return JSON.stringify(data, null, 2);
  };

  const importDatabaseJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      // Must cover every entity that exportDatabaseJSON writes, otherwise a
      // restore silently drops whatever isn't listed here.
      if (parsed.profile) setProfile(parsed.profile);
      if (parsed.heroConfig) setHeroConfig(parsed.heroConfig);
      if (parsed.skillCategories) setSkillCategories(parsed.skillCategories);
      if (parsed.skills) setSkills(parsed.skills);
      if (parsed.experiences) setExperiences(parsed.experiences);
      if (parsed.educations) setEducations(parsed.educations);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.certificates) setCertificates(parsed.certificates);
      if (parsed.achievements) setAchievements(parsed.achievements);
      if (parsed.organizations) setOrganizations(parsed.organizations);
      if (parsed.trainings) setTrainings(parsed.trainings);
      if (parsed.publications) setPublications(parsed.publications);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.services) setServices(parsed.services);
      if (parsed.blogPosts) setBlogPosts(parsed.blogPosts);
      if (parsed.gallery) setGallery(parsed.gallery);
      if (parsed.cvVersions) setCvVersions(parsed.cvVersions);
      if (parsed.messages) setMessages(parsed.messages);
      if (parsed.subscribers) setSubscribers(parsed.subscribers);
      if (parsed.themeSettings) setThemeSettings(parsed.themeSettings);
      if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      if (parsed.systemSettings) setSystemSettings(parsed.systemSettings);
      if (parsed.pageSections) setPageSections(parsed.pageSections);
      if (parsed.auditLogs) setAuditLogs(parsed.auditLogs);
      if (parsed.analytics) setAnalytics(parsed.analytics);
      addAuditLog('IMPORT_DATABASE', 'System', 'Successfully imported database JSON file');
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        language,
        setLanguage,
        isAdminLoggedIn,
        adminUser,
        isAuthResolving,
        loginAdmin,
        logoutAdmin,
        profile,
        updateProfile,
        heroConfig,
        updateHeroConfig,
        skillCategories,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        experiences,
        addExperience,
        updateExperience,
        deleteExperience,
        educations,
        addEducation,
        updateEducation,
        deleteEducation,
        projects,
        addProject,
        updateProject,
        deleteProject,
        incrementProjectView,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        organizations,
        addOrganization,
        updateOrganization,
        deleteOrganization,
        trainings,
        addTraining,
        updateTraining,
        deleteTraining,
        publications,
        addPublication,
        updatePublication,
        deletePublication,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        approveTestimonial,
        services,
        addService,
        updateService,
        deleteService,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        incrementBlogLike,
        incrementBlogView,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        cvVersions,
        addCVVersion,
        updateCVVersion,
        deleteCVVersion,
        setActiveCV,
        incrementCVDownload,
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        subscribers,
        addSubscriber,
        updateSubscriber,
        deleteSubscriber,
        themeSettings,
        updateThemeSettings,
        seoSettings,
        updateSEOSettings,
        systemSettings,
        updateSystemSettings,
        pageSections,
        updatePageSections,
        auditLogs,
        addAuditLog,
        clearAuditLogs,
        analytics,
        resetToDefaultData,
        exportDatabaseJSON,
        importDatabaseJSON,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
