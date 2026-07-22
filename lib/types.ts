export type Language = 'id' | 'en';

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'content_manager' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  twoFactorEnabled: boolean;
  lastLogin: string;
}

export interface ProfileInfo {
  name: string;
  titles: { id: string; en: string }[];
  currentRole: { id: string; en: string };
  bioShort: { id: string; en: string };
  bioFull: { id: string; en: string };
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
  instagram: string;
  telegram: string;
  avatarUrl: string;
  availabilityStatus: 'available' | 'busy' | 'selective';
  yearsExperience: number;
  completedProjectsCount: number;
  happyClientsCount: number;
  awardsCount: number;
  certificatesCount: number;
  publicationsCount: number;
  birthDate: string;
  languages: { name: string; proficiency: string }[];
  hobbies: string[];
  careerGoals: { id: string; en: string };
  professionalValues: { id: string; en: string }[];
}

export interface HeroConfig {
  greeting: { id: string; en: string };
  headline: { id: string; en: string };
  subheadline: { id: string; en: string };
  primaryCtaText: { id: string; en: string };
  secondaryCtaText: { id: string; en: string };
  showStats: boolean;
  heroLayout: 'classic' | 'centered' | 'split' | 'minimal';
  heroBackground: 'gradient' | 'dots' | 'grid' | 'clean';
}

export interface SkillCategory {
  id: string;
  name: { id: string; en: string };
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  categoryId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  percentage: number;
  yearsExperience: number;
  icon: string;
  description?: { id: string; en: string };
  isFeatured: boolean;
  order: number;
}

export interface Experience {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyUrl?: string;
  position: { id: string; en: string };
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  location: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: { id: string; en: string };
  responsibilities: { id: string; en: string }[];
  achievements: { id: string; en: string }[];
  technologies: string[];
  attachments?: { name: string; url: string }[];
  order: number;
}

export interface Education {
  id: string;
  institutionName: string;
  institutionLogo?: string;
  institutionUrl?: string;
  degree: { id: string; en: string };
  fieldOfStudy: { id: string; en: string };
  startYear: string;
  endYear: string;
  gpa: string;
  maxGpa: string;
  location: string;
  description: { id: string; en: string };
  academicAchievements: { id: string; en: string }[];
  thesisTitle?: { id: string; en: string };
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: { id: string; en: string };
  fullDescription: { id: string; en: string };
  thumbnail: string;
  gallery: string[];
  videoUrl?: string;
  category: string;
  tags: string[];
  technologies: string[];
  role: { id: string; en: string };
  teamMembers?: string[];
  completedDate: string;
  status: 'Completed' | 'In Progress' | 'Archived';
  demoUrl?: string;
  repoUrl?: string;
  problemStatement?: { id: string; en: string };
  solution?: { id: string; en: string };
  keyFeatures?: { id: string; en: string }[];
  challenges?: { id: string; en: string };
  results?: { id: string; en: string };
  clientTestimonial?: { clientName: string; feedback: string; rating: number };
  isFeatured: boolean;
  order: number;
  views: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  thumbnailUrl: string;
  fileUrl?: string;
  description: { id: string; en: string };
  competencies: string[];
  category: string;
  isValid: boolean;
  isFeatured: boolean;
  order: number;
}

export interface Achievement {
  id: string;
  title: { id: string; en: string };
  level: 'International' | 'National' | 'Regional' | 'Institutional';
  organizer: string;
  date: string;
  rank: string;
  description: { id: string; en: string };
  certificateUrl?: string;
  imageUrl?: string;
  validationUrl?: string;
  category: string;
  isFeatured: boolean;
  order: number;
}

export interface Organization {
  id: string;
  organizationName: string;
  role: { id: string; en: string };
  period: string;
  location: string;
  description: { id: string; en: string };
  responsibilities: { id: string; en: string }[];
  achievements: { id: string; en: string }[];
  certificateUrl?: string;
  order: number;
}

export interface Training {
  id: string;
  trainingName: string;
  organizer: string;
  date: string;
  durationHours: number;
  instructor: string;
  skillsLearned: string[];
  certificateUrl?: string;
  trainingUrl?: string;
  isCompleted: boolean;
  order: number;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  abstract: { id: string; en: string };
  publisher: string;
  journalName?: string;
  volumeNo?: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
  keywords: string[];
  citationsCount: number;
  publicationType: 'Journal' | 'Conference' | 'Book' | 'Article' | 'Patent';
  order: number;
}

export interface Testimonial {
  id: string;
  clientName: string;
  avatarUrl: string;
  titleRole: string;
  companyName: string;
  content: { id: string; en: string };
  rating: number;
  date: string;
  profileUrl?: string;
  isApproved: boolean;
  order: number;
}

export interface Service {
  id: string;
  title: { id: string; en: string };
  icon: string;
  shortDescription: { id: string; en: string };
  startingPrice: string;
  duration: string;
  deliverables: { id: string; en: string }[];
  workflowSteps: { step: number; title: string; description: string }[];
  faqs: { question: { id: string; en: string }; answer: { id: string; en: string } }[];
  isFeatured: boolean;
  order: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  contentMarkdown: { id: string; en: string };
  coverImage: string;
  category: string;
  tags: string[];
  readTimeMinutes: number;
  publishedAt: string;
  isPublished: boolean;
  isDraft: boolean;
  views: number;
  likes: number;
  commentsCount: number;
}

export interface BlogComment {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  commentText: string;
  createdAt: string;
  isApproved: boolean;
}

export interface GalleryItem {
  id: string;
  title: { id: string; en: string };
  category: 'Events' | 'Projects' | 'Seminars' | 'Work' | 'Certificates';
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: { id: string; en: string };
  date: string;
}

export interface CVVersion {
  id: string;
  versionName: string;
  language: Language;
  type: 'ATS-Friendly' | 'Professional' | 'Academic';
  fileUrl: string;
  uploadedAt: string;
  isActive: boolean;
  downloadCount: number;
}

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  subject: string;
  serviceType?: string;
  message: string;
  attachmentUrl?: string;
  receivedAt: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived' | 'Spam';
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  isActive: boolean;
}

export interface ThemeSettings {
  primaryColor: string; // e.g. '#2563eb' or '#10b981' or '#8b5cf6'
  secondaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'Plus Jakarta Sans' | 'Outfit' | 'Playfair Display';
  borderRadius: 'sm' | 'md' | 'lg' | 'full';
  buttonStyle: 'rounded' | 'pill' | 'sharp';
  cardStyle: 'bordered' | 'shadow' | 'glassmorphism' | 'flat';
  mode: 'light' | 'dark' | 'system';
  enableAnimations: boolean;
  bgPattern: 'dots' | 'grid' | 'waves' | 'none';
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  authorName: string;
  canonicalUrl: string;
  googleAnalyticsId: string;
  googleSearchConsoleMeta: string;
  robotsTxt: string;
}

export interface SystemSettings {
  adminRoute: string;
  enableWhatsAppButton: boolean;
  whatsAppNumber: string;
  whatsAppDefaultMessage: string;
  enableMaintenanceMode: boolean;
  maintenanceMessage: string;
  enableCommandPalette: boolean;
  enableVisitorCounter: boolean;
  enableCustomCursor: boolean;
  enableAudioSynthesizer: boolean;
  enableMultiLanguage: boolean;
  defaultLanguage: Language;
}

export interface PageSectionConfig {
  id: string;
  name: string;
  key: string;
  isVisible: boolean;
  order: number;
}

export interface AuditLog {
  id: string;
  adminEmail: string;
  action: string;
  module: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalVisitors: number;
  todayVisitors: number;
  monthlyVisitors: number;
  cvDownloads: number;
  totalProjectViews: number;
  messagesCount: number;
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  browserBreakdown: { chrome: number; safari: number; firefox: number; edge: number; other: number };
  topVisitedProjects: { title: string; views: number }[];
  topVisitedArticles: { title: string; views: number }[];
  visitorTrend: { date: string; views: number }[];
}
