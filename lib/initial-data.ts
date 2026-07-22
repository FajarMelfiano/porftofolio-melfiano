import {
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
  ThemeSettings,
  SEOSettings,
  SystemSettings,
  PageSectionConfig,
  AuditLog,
  AnalyticsSummary,
  ContactMessage,
  Subscriber
} from './types';

export const initialProfile: ProfileInfo = {
  name: 'Fajar Melfiano Obese A.T.',
  titles: [
    { id: 'Full Stack Engineer', en: 'Full Stack Engineer' },
    { id: 'Software Engineer', en: 'Software Engineer' },
    { id: 'AI Application Enthusiast', en: 'AI Application Enthusiast' },
    { id: 'Tech Blogger', en: 'Tech Blogger' }
  ],
  currentRole: {
    id: 'Full-Stack Developer',
    en: 'Full-Stack Developer'
  },
  bioShort: {
    id: 'Insinyur Perangkat Lunak, antusias dengan teknologi web dan AI.',
    en: 'Software Engineer passionate about web technologies and AI.'
  },
  bioFull: {
    id: 'Saya adalah insinyur perangkat lunak yang berdedikasi membangun aplikasi web yang fungsional dan user-friendly.',
    en: 'I am a software engineer dedicated to building functional and user-friendly web applications.'
  },
  location: 'Indonesia',
  email: 'fajarmelfiano@example.com',
  phone: '+62 812 3456 7890',
  whatsapp: '+6281234567890',
  github: 'https://github.com/FajarMelfiano',
  linkedin: 'https://linkedin.com/in/fajarmelfiano',
  instagram: 'https://instagram.com/fajarmelfiano',
  telegram: 'https://t.me/fajarmelfiano',
  avatarUrl: 'https://picsum.photos/seed/fajar-avatar/800/800',
  availabilityStatus: 'available',
  yearsExperience: 7,
  completedProjectsCount: 38,
  happyClientsCount: 26,
  awardsCount: 12,
  certificatesCount: 18,
  publicationsCount: 6,
  birthDate: '1996-08-15',
  languages: [
    { name: 'Indonesia', proficiency: 'Native / Flawless' },
    { name: 'English', proficiency: 'Professional Working Proficiency (C1)' },
    { name: 'Japanese', proficiency: 'Elementary (N4)' }
  ],
  hobbies: ['Open Source Contributing', 'Tech Blogging', 'Chess', 'Photography', 'Trail Running'],
  careerGoals: {
    id: 'Membangun platform cloud berskala global dan membimbing generasi muda talenta digital Indonesia.',
    en: 'Build global cloud platforms and empower the next generation of Indonesian tech talent.'
  },
  professionalValues: [
    { id: 'Inovasi Berkelanjutan', en: 'Continuous Innovation' },
    { id: 'Kode Bersih & Teruji', en: 'Clean & Testable Code' },
    { id: 'Kepemimpinan Empatis', en: 'Empathetic Leadership' },
    { id: 'Fokus Solusi Bisnis', en: 'Business Impact Focus' }
  ]
};

export const initialHeroConfig: HeroConfig = {
  greeting: { id: 'Halo 👋, Saya', en: 'Hello 👋, I am' },
  headline: {
    id: 'Membangun Masa Depan Digital Berbasis AI & Cloud Architecture',
    en: 'Building the Digital Future with AI & Cloud Architecture'
  },
  subheadline: {
    id: 'Mengubah ide kompleks menjadi aplikasi web elegan, cepat, aman, dan siap pakai untuk skala enterprise.',
    en: 'Transforming complex ideas into elegant, fast, secure, and enterprise-grade web applications.'
  },
  primaryCtaText: { id: 'Lihat Portofolio Proyek', en: 'Explore My Projects' },
  secondaryCtaText: { id: 'Unduh CV PDF', en: 'Download CV PDF' },
  showStats: true,
  heroLayout: 'classic',
  heroBackground: 'dots'
};

export const initialSkillCategories: SkillCategory[] = [
  { id: 'cat-prog', name: { id: 'Bahasa Pemrograman', en: 'Programming Languages' }, icon: 'Code2' },
  { id: 'cat-frameworks', name: { id: 'Framework & Libs', en: 'Frameworks & Libraries' }, icon: 'Layers' },
  { id: 'cat-cloud', name: { id: 'Cloud & Infrastructure', en: 'Cloud & Infrastructure' }, icon: 'Cloud' },
  { id: 'cat-database', name: { id: 'Database & Storage', en: 'Database & Storage' }, icon: 'Database' },
  { id: 'cat-tools', name: { id: 'Developer Tools', en: 'Developer Tools' }, icon: 'Wrench' },
  { id: 'cat-soft', name: { id: 'Keahlian Manajerial', en: 'Soft Skills & Leadership' }, icon: 'Users' }
];

export const initialSkills: Skill[] = [
  {
    id: 'sk-1',
    name: 'TypeScript & JavaScript (ESNext)',
    categoryId: 'cat-prog',
    level: 'Expert',
    percentage: 96,
    yearsExperience: 7,
    icon: 'Code2',
    description: { id: 'Mastery dalam asynchronous JS, generic types, AST, dan node ecosystem.', en: 'Mastery in async JS, generics, AST transformations, and Node ecosystem.' },
    isFeatured: true,
    order: 1
  },
  {
    id: 'sk-2',
    name: 'React 19 & Next.js 15 App Router',
    categoryId: 'cat-frameworks',
    level: 'Expert',
    percentage: 95,
    yearsExperience: 6,
    icon: 'Atom',
    description: { id: 'Server Components, Streaming SSR, Server Actions, Middleware, dan Turbopack.', en: 'Server Components, Streaming SSR, Server Actions, Middleware, and Turbopack.' },
    isFeatured: true,
    order: 2
  },
  {
    id: 'sk-3',
    name: 'Tailwind CSS & Framer Motion',
    categoryId: 'cat-frameworks',
    level: 'Expert',
    percentage: 92,
    yearsExperience: 5,
    icon: 'Palette',
    description: { id: 'Desain responsif mikro-interaksi, layout fluid, WCAG AA accessibility.', en: 'Responsive micro-interactions, fluid layouts, WCAG AA accessibility.' },
    isFeatured: true,
    order: 3
  },
  {
    id: 'sk-4',
    name: 'Node.js, Express & NestJS',
    categoryId: 'cat-frameworks',
    level: 'Advanced',
    percentage: 90,
    yearsExperience: 6,
    icon: 'Server',
    description: { id: 'Pengembangan REST, GraphQL, WebSocket server, dan Microservices API.', en: 'Developing REST, GraphQL, WebSocket servers, and Microservices APIs.' },
    isFeatured: true,
    order: 4
  },
  {
    id: 'sk-5',
    name: 'PostgreSQL, Prisma ORM & Redis',
    categoryId: 'cat-database',
    level: 'Advanced',
    percentage: 88,
    yearsExperience: 5,
    icon: 'Database',
    description: { id: 'Optimasi query SQL, indexing, database migrations, dan caching strategy.', en: 'SQL query optimization, indexing, migrations, and caching strategies.' },
    isFeatured: true,
    order: 5
  },
  {
    id: 'sk-6',
    name: 'Google Cloud Platform & Cloud Run',
    categoryId: 'cat-cloud',
    level: 'Advanced',
    percentage: 86,
    yearsExperience: 4,
    icon: 'Cloud',
    description: { id: 'Deploy containerized Docker apps, GCP PubSub, BigQuery, IAM Security.', en: 'Deploy containerized Docker apps, GCP Pub/Sub, BigQuery, and IAM Security.' },
    isFeatured: true,
    order: 6
  },
  {
    id: 'sk-7',
    name: 'Generative AI & Gemini API Integration',
    categoryId: 'cat-tools',
    level: 'Advanced',
    percentage: 89,
    yearsExperience: 3,
    icon: 'Sparkles',
    description: { id: 'Prompt Engineering, RAG Architectures, Multimodal AI, dan Fine-Tuning.', en: 'Prompt Engineering, RAG Architectures, Multimodal AI, and Fine-Tuning.' },
    isFeatured: true,
    order: 7
  },
  {
    id: 'sk-8',
    name: 'Technical Team Leadership & Mentorship',
    categoryId: 'cat-soft',
    level: 'Expert',
    percentage: 92,
    yearsExperience: 4,
    icon: 'Users',
    description: { id: 'Agile Scrum Facilitation, Code Review Standards, dan Talent Development.', en: 'Agile Scrum Facilitation, Code Review Standards, and Talent Development.' },
    isFeatured: true,
    order: 8
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    companyName: 'Nusantara Global Tech',
    companyLogo: 'https://picsum.photos/seed/nusantara-logo/200/200',
    companyUrl: 'https://example.com',
    position: {
      id: 'Lead Software Architect & Engineering Manager',
      en: 'Lead Software Architect & Engineering Manager'
    },
    employmentType: 'Full-time',
    location: 'Jakarta (Hybrid)',
    startDate: '2023-01',
    isCurrent: true,
    description: {
      id: 'Memimpin tim yang terdiri dari 14 insinyur frontend, backend, dan DevOps untuk membangun platform Fintech SaaS berskala internasional.',
      en: 'Leading an engineering team of 14 frontend, backend, and DevOps engineers building an international Fintech SaaS platform.'
    },
    responsibilities: [
      { id: 'Merancang arsitektur micro-frontend berbasis Next.js dan Tailwind.', en: 'Designed micro-frontend architecture using Next.js and Tailwind.' },
      { id: 'Mengimplementasikan CI/CD pipeline otomatis dengan GitHub Actions & Cloud Run.', en: 'Implemented automated CI/CD pipelines with GitHub Actions & Cloud Run.' },
      { id: 'Mengurangi latensi API sebesar 42% melalui caching layer Redis & Query Optimization.', en: 'Reduced API response latency by 42% using Redis caching layers and Query Optimization.' }
    ],
    achievements: [
      { id: 'Berhasil meluncurkan produk tepat waktu dengan 99.98% SLA uptime.', en: 'Successfully launched platform on schedule with 99.98% SLA uptime.' },
      { id: 'Dianugerahi "Tech Innovator of the Year 2024" oleh perusahaan.', en: 'Awarded "Tech Innovator of the Year 2024" by executive leadership.' }
    ],
    technologies: ['Next.js 15', 'TypeScript', 'PostgreSQL', 'GCP', 'Docker', 'Redis', 'Gemini AI API'],
    order: 1
  },
  {
    id: 'exp-2',
    companyName: 'Astra Digital Solution',
    companyLogo: 'https://picsum.photos/seed/astra-logo/200/200',
    companyUrl: 'https://example.com',
    position: {
      id: 'Senior Full Stack Developer',
      en: 'Senior Full Stack Developer'
    },
    employmentType: 'Full-time',
    location: 'Bandung, Indonesia',
    startDate: '2020-06',
    endDate: '2022-12',
    isCurrent: false,
    description: {
      id: 'Bertanggung jawab atas pengembangan aplikasi E-Commerce enterprise dengan traffic bulanan lebih dari 2 juta pengguna aktif.',
      en: 'Responsible for core development of an enterprise E-Commerce application with over 2M monthly active users.'
    },
    responsibilities: [
      { id: 'Membangun checkout engine yang aman dengan integrasi multi-payment gateway.', en: 'Built secure payment checkout engine integrating multi-payment gateways.' },
      { id: 'Mengatur state management global berbasis Zustand dan React Query.', en: 'Architected global state management using Zustand and React Query.' }
    ],
    achievements: [
      { id: 'Meningkatkan konversi penjualan e-commerce sebesar 18%.', en: 'Increased overall checkout conversion rate by 18%.' }
    ],
    technologies: ['React', 'Node.js', 'Express', 'GraphQL', 'PostgreSQL', 'Tailwind CSS'],
    order: 2
  },
  {
    id: 'exp-3',
    companyName: 'Inovasi Media Studio',
    companyLogo: 'https://picsum.photos/seed/inovasi-logo/200/200',
    position: {
      id: 'Frontend Web Developer',
      en: 'Frontend Web Developer'
    },
    employmentType: 'Full-time',
    location: 'Yogyakarta, Indonesia',
    startDate: '2018-02',
    endDate: '2020-05',
    isCurrent: false,
    description: {
      id: 'Mengembangkan puluhan situs web interaktif, portal berita, dan dashboard analytics untuk klien korporat.',
      en: 'Developed dozens of interactive web applications, news portals, and analytics dashboards for corporate clients.'
    },
    responsibilities: [
      { id: 'Slice UI dari Figma ke HTML/CSS/JS dengan presisi pixel-perfect.', en: 'Sliced Figma UI designs into pixel-perfect responsive HTML/CSS/JS code.' }
    ],
    achievements: [
      { id: 'Menyelesaikan 25+ proyek client dalam 2 tahun dengan skor kepuasan 100%.', en: 'Completed 25+ client projects over 2 years with a 100% satisfaction score.' }
    ],
    technologies: ['JavaScript', 'Vue.js', 'Tailwind CSS', 'REST API', 'Webpack'],
    order: 3
  }
];

export const initialEducations: Education[] = [
  {
    id: 'edu-1',
    institutionName: 'Universitas Gadjah Mada (UGM)',
    institutionLogo: 'https://picsum.photos/seed/ugm-logo/200/200',
    institutionUrl: 'https://ugm.ac.id',
    degree: { id: 'Magister Teknik Informatika (M.Kom.)', en: 'Master of Computer Science (M.Kom.)' },
    fieldOfStudy: { id: 'Sistem Terdistribusi & Kecerdasan Buatan', en: 'Distributed Systems & Artificial Intelligence' },
    startYear: '2019',
    endYear: '2021',
    gpa: '3.92',
    maxGpa: '4.00',
    location: 'Yogyakarta, Indonesia',
    description: {
      id: 'Fokus penelitian pada optimasi pemrosesan data terdistribusi dan model pembelajaran mesin untuk analisis prediksi pasar.',
      en: 'Research focus on distributed data processing optimization and machine learning prediction models.'
    },
    academicAchievements: [
      { id: 'Lulus dengan Predikat Cumlaude', en: 'Graduated with Cum Laude Honors' },
      { id: 'Publikasi Jurnal Internasional Terindeks Scopus Q1', en: 'Published Scopus Q1 Indexed International Journal Paper' }
    ],
    thesisTitle: {
      id: 'Arsitektur RAG Berbasis Graph Neural Network untuk Pencarian Pengetahuan Terdistribusi',
      en: 'Graph Neural Network-Based RAG Architecture for Distributed Knowledge Retrieval'
    },
    order: 1
  },
  {
    id: 'edu-2',
    institutionName: 'Institut Teknologi Bandung (ITB)',
    institutionLogo: 'https://picsum.photos/seed/itb-logo/200/200',
    degree: { id: 'Sarjana Teknik Informatika (S.T.)', en: 'Bachelor of Computer Science (B.Sc.)' },
    fieldOfStudy: { id: 'Rekayasa Perangkat Lunak', en: 'Software Engineering' },
    startYear: '2014',
    endYear: '2018',
    gpa: '3.81',
    maxGpa: '4.00',
    location: 'Bandung, Indonesia',
    description: {
      id: 'Mengikuti berbagai kompetisi pemrograman, menjadi Asisten Dosen Algoritma & Struktur Data.',
      en: 'Participated in competitive programming contests and served as Teaching Assistant for Data Structures & Algorithms.'
    },
    academicAchievements: [
      { id: 'Juara 1 Gemastik Bidang Pemrograman Web', en: '1st Winner of National Gemastik Web Programming' },
      { id: 'Dean’s Honor List 6 Semester Berturut-turut', en: 'Dean’s Honor List for 6 Consecutive Semesters' }
    ],
    order: 2
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'ai-enterprise-knowledge-base',
    title: 'NexusAI - Enterprise Knowledge Base Platform',
    shortDescription: {
      id: 'Platform SaaS Manajemen Pengetahuan Perusahaan terintegrasi Gemini 1.5 Pro RAG, Vector DB, dan Realtime Multi-User Editor.',
      en: 'Enterprise Knowledge Management SaaS platform powered by Gemini 1.5 Pro RAG, Vector DB, and Realtime Multi-User Editor.'
    },
    fullDescription: {
      id: 'NexusAI adalah aplikasi web enterprise modern yang memfasilitasi pencarian pengetahuan cepat, ringkasan dokumen otomatis, dan tanya jawab kontekstual atas seluruh file PDF, Word, dan Notion internal perusahaan.',
      en: 'NexusAI is a modern enterprise web application facilitating ultra-fast knowledge retrieval, automated document summarization, and contextual Q&A across all internal PDFs, Word files, and Notion documents.'
    },
    thumbnail: 'https://picsum.photos/seed/nexus-ai-thumb/1200/800',
    gallery: [
      'https://picsum.photos/seed/nexus-ai-1/1200/800',
      'https://picsum.photos/seed/nexus-ai-2/1200/800',
      'https://picsum.photos/seed/nexus-ai-3/1200/800'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'AI & Web SaaS',
    tags: ['Next.js 15', 'Gemini AI API', 'PostgreSQL', 'Vector Search', 'Tailwind CSS'],
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Google GenAI SDK', 'Prisma', 'Cloud Run'],
    role: { id: 'Lead Full Stack Architect & AI Developer', en: 'Lead Full Stack Architect & AI Developer' },
    completedDate: '2024-11-15',
    status: 'Completed',
    demoUrl: 'https://example.com/demo/nexusai',
    repoUrl: 'https://github.com/oqiifebriansyah/nexus-ai-platform',
    problemStatement: {
      id: 'Perusahaan mengalami kesulitan memproses ribuan dokumen SOP internal sehingga waktu pencarian informasi memakan rata-rata 35 menit per tiket.',
      en: 'The company struggled with indexing thousands of internal SOP documents, taking employees an average of 35 minutes per query.'
    },
    solution: {
      id: 'Membangun engine RAG berbasis Gemini AI API yang dapat menjawab pertanyaan spesifik dari dokumen secara presisi lengkap dengan sitasi halaman.',
      en: 'Built a Gemini AI-powered RAG engine answering specific document queries with pinpoint accuracy and exact page citations.'
    },
    keyFeatures: [
      { id: 'Upload dokumen PDF/Docx multi-folder', en: 'Multi-folder PDF/Docx drag-and-drop upload' },
      { id: 'Pencarian semantik berbasis Vektor (<100ms response)', en: 'Semantic Vector Search (<100ms response time)' },
      { id: 'Sistem RAG Gemini AI dengan riwayat sitasi', en: 'Gemini AI RAG chat stream with citation history' },
      { id: 'Role-based access control (RBAC) granular', en: 'Granular Role-Based Access Control (RBAC)' }
    ],
    challenges: {
      id: 'Memastikan latensi streaming balasan AI tetap terjangkau di bawah 1.5 detik pada dokumen >500 halaman.',
      en: 'Ensuring AI streaming response latency remained under 1.5s even on 500+ page PDFs.'
    },
    results: {
      id: 'Mengurangi waktu pencarian dokumen dari 35 menit menjadi 8 detik per kueri.',
      en: 'Reduced internal knowledge lookup time from 35 minutes down to 8 seconds per query.'
    },
    isFeatured: true,
    order: 1,
    views: 1420
  },
  {
    id: 'proj-2',
    slug: 'finflow-crypto-fiat-dashboard',
    title: 'FinFlow - Omnichannel Financial Analytics',
    shortDescription: {
      id: 'Dashboard Analytics Keuangan Realtime dengan Grafik Interaktif, Otomatisasi Laporan Pajak, dan Deteksi Anomali.',
      en: 'Realtime Omnichannel Financial Analytics Dashboard featuring Interactive Recharts, Automated Tax Reporting, and Anomaly Alerts.'
    },
    fullDescription: {
      id: 'FinFlow menyediakan solusi visualisasi keuangan menyeluruh untuk startup FinTech. Mengombinasikan feed transaksi perbankan dan transaksi aset digital dalam satu antarmuka yang bersih.',
      en: 'FinFlow offers comprehensive financial visualization for FinTech startups, merging banking transaction feeds and digital asset movements into a unified, crisp interface.'
    },
    thumbnail: 'https://picsum.photos/seed/finflow-thumb/1200/800',
    gallery: [
      'https://picsum.photos/seed/finflow-1/1200/800',
      'https://picsum.photos/seed/finflow-2/1200/800'
    ],
    category: 'Fintech & Dashboard',
    tags: ['React 19', 'Recharts', 'Tailwind CSS', 'Node.js', 'WebSocket'],
    technologies: ['React 19', 'TypeScript', 'Recharts', 'Zustand', 'Tailwind CSS', 'Framer Motion'],
    role: { id: 'Senior Frontend Developer', en: 'Senior Frontend Developer' },
    completedDate: '2024-06-20',
    status: 'Completed',
    demoUrl: 'https://example.com/demo/finflow',
    repoUrl: 'https://github.com/oqiifebriansyah/finflow-dashboard',
    isFeatured: true,
    order: 2,
    views: 980
  },
  {
    id: 'proj-3',
    slug: 'medicare-telehealth-mobile-web',
    title: 'MediCare - Integrated Healthcare System',
    shortDescription: {
      id: 'Sistem Rumah Sakit & Konsultasi Dokter Online dengan Fitur Resep Digital, Video Call, dan Rekam Medis Terenkripsi.',
      en: 'Integrated Hospital & Doctor Teleconsultation Web System with Digital Prescriptions, Video Calls, and Encrypted EHR.'
    },
    fullDescription: {
      id: 'Platform telehealth komprehensif yang menghubungkan lebih dari 150+ rumah sakit di Indonesia dengan pasien untuk jadwal janji temu dan konsultasi medis.',
      en: 'Comprehensive telehealth portal connecting over 150+ hospitals across Indonesia with patients for online appointment bookings and medical records.'
    },
    thumbnail: 'https://picsum.photos/seed/medicare-thumb/1200/800',
    gallery: ['https://picsum.photos/seed/medicare-1/1200/800'],
    category: 'Healthcare & Mobile Web',
    tags: ['Next.js', 'WebRTC', 'PostgreSQL', 'Tailwind CSS'],
    technologies: ['Next.js', 'TypeScript', 'WebRTC', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    role: { id: 'Full Stack Engineer', en: 'Full Stack Engineer' },
    completedDate: '2023-09-10',
    status: 'Completed',
    demoUrl: 'https://example.com/demo/medicare',
    isFeatured: true,
    order: 3,
    views: 850
  }
];

export const initialCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Google Cloud Professional Cloud Architect',
    issuer: 'Google Cloud Training',
    issuerLogo: 'https://picsum.photos/seed/gcp-badge/200/200',
    issueDate: '2023-08-10',
    expiryDate: '2026-08-10',
    credentialId: 'GCP-PCA-98320491',
    credentialUrl: 'https://www.credly.com',
    thumbnailUrl: 'https://picsum.photos/seed/gcp-cert-thumb/800/600',
    description: {
      id: 'Sertifikasi profesional tingkat lanjut untuk perancangan arsitektur sistem cloud yang aman, terisolasi, scalable, dan efisien biaya di Google Cloud Platform.',
      en: 'Advanced professional certification for designing secure, resilient, scalable, and cost-effective cloud architectures on Google Cloud Platform.'
    },
    competencies: ['Cloud Architecture', 'GCP Compute & Storage', 'Security & Compliance', 'DevOps & Migration'],
    category: 'Cloud Architecture',
    isValid: true,
    isFeatured: true,
    order: 1
  },
  {
    id: 'cert-2',
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    issuerLogo: 'https://picsum.photos/seed/aws-badge/200/200',
    issueDate: '2022-11-14',
    expiryDate: '2025-11-14',
    credentialId: 'AWS-ASA-88203912',
    credentialUrl: 'https://www.credly.com',
    thumbnailUrl: 'https://picsum.photos/seed/aws-cert-thumb/800/600',
    description: {
      id: 'Validasi kemampuan merancang sistem terdistribusi pada infrastruktur Amazon Web Services.',
      en: 'Validates expertise in designing distributed systems on Amazon Web Services infrastructure.'
    },
    competencies: ['AWS VPC & EC2', 'S3 & DynamoDB', 'IAM Security', 'Serverless Lambda'],
    category: 'Cloud Architecture',
    isValid: true,
    isFeatured: true,
    order: 2
  },
  {
    id: 'cert-3',
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'The Linux Foundation & CNCF',
    issuerLogo: 'https://picsum.photos/seed/cka-badge/200/200',
    issueDate: '2023-03-22',
    expiryDate: '2026-03-22',
    credentialId: 'CKA-29019231',
    credentialUrl: 'https://www.credly.com',
    thumbnailUrl: 'https://picsum.photos/seed/cka-cert-thumb/800/600',
    description: {
      id: 'Kemampuan mengelola cluster Kubernetes, networking, storage, trobleshoot, dan deployment kontainer.',
      en: 'Demonstrates ability to manage Kubernetes clusters, networking, storage, troubleshooting, and container deployments.'
    },
    competencies: ['Kubernetes Cluster Setup', 'Pod Security', 'Storage Volumes', 'Cluster Networking'],
    category: 'DevOps & Containers',
    isValid: true,
    isFeatured: true,
    order: 3
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: {
      id: 'Juara 1 Indonesia AI Hackathon 2024 (Kategori Smart City)',
      en: '1st Winner Indonesia AI Hackathon 2024 (Smart City Category)'
    },
    level: 'National',
    organizer: 'Kementerian Komunikasi dan Informatika RI & Google',
    date: '2024-05-18',
    rank: 'Juara 1 (Gold Medal)',
    description: {
      id: 'Mengembangkan sistem prediksi kemacetan lalu lintas berbasis sensor IoT dan AI Generatif untuk deteksi dini insiden jalan raya.',
      en: 'Developed an IoT sensor & Generative AI congestion prediction platform for early highway incident alerts.'
    },
    category: 'Hackathon & AI',
    isFeatured: true,
    order: 1
  },
  {
    id: 'ach-2',
    title: {
      id: 'Penghargaan Outstanding Software Engineer 2023',
      en: 'Outstanding Software Engineer Award 2023'
    },
    level: 'Institutional',
    organizer: 'Nusantara Global Tech',
    date: '2023-12-20',
    rank: 'Top Innovator',
    description: {
      id: 'Dianugerahi sebagai insinyur terbaik atas pencapaian memodernisasi arsitektur monolith ke micro-services.',
      en: 'Awarded top engineer honors for modernizing core monolith architecture into high-performing micro-services.'
    },
    category: 'Corporate Award',
    isFeatured: true,
    order: 2
  }
];

export const initialOrganizations: Organization[] = [
  {
    id: 'org-1',
    organizationName: 'Google Developer Group (GDG) Jakarta',
    role: { id: 'Core Organizer & Tech Speaker', en: 'Core Organizer & Tech Speaker' },
    period: '2022 - Sekarang',
    location: 'Jakarta, Indonesia',
    description: {
      id: 'Mengorganisir seminar teknis, devfest, dan workshop rutin bulanan untuk 5.000+ anggota komunitas pengembang.',
      en: 'Organizing monthly tech meetups, DevFests, and hands-on workshops for 5,000+ developer community members.'
    },
    responsibilities: [
      { id: 'Menyusun materi workshop seputar Next.js dan GCP AI.', en: 'Curating technical tracks on Next.js and GCP AI.' },
      { id: 'Menjadi pembicara dalam acara DevFest Jakarta 2023 & 2024.', en: 'Keynote speaker at DevFest Jakarta 2023 & 2024.' }
    ],
    achievements: [
      { id: 'Meningkatkan partisipasi komunitas sebesar 120% YoY.', en: 'Increased developer meetup attendance by 120% YoY.' }
    ],
    order: 1
  }
];

export const initialTrainings: Training[] = [
  {
    id: 'trn-1',
    trainingName: 'Advanced Microservices Architecture & Domain Driven Design',
    organizer: 'O’Reilly Media & Tech Excellence',
    date: '2024-02-15',
    durationHours: 40,
    instructor: 'Martin Fowler & Eric Evans Alumni Network',
    skillsLearned: ['Domain Driven Design (DDD)', 'Event Sourcing', 'CQRS Pattern', 'Distributed Tracing'],
    isCompleted: true,
    order: 1
  }
];

export const initialPublications: Publication[] = [
  {
    id: 'pub-1',
    title: 'Optimizing Multimodal Generative AI Retrieval for High-Throughput Web Applications',
    authors: ['Oqii Febriansyah', 'Prof. Dr. Ir. S. Widodo', 'Dr. R. Haryanto'],
    year: 2024,
    abstract: {
      id: 'Makalah ini mengusulkan teknik pengindeksan vektor adaptif baru yang memangkas waktu pemrosesan kueri dokumen hingga 68% tanpa mengorbankan akurasi kontekstual.',
      en: 'This paper proposes a novel adaptive vector indexing method cutting document retrieval time by 68% without losing contextual accuracy.'
    },
    publisher: 'IEEE Xplore Transactions on Software Engineering',
    journalName: 'IEEE Transactions on Software Engineering',
    volumeNo: 'Vol. 30, No. 4',
    doi: '10.1109/TSE.2024.309218',
    keywords: ['Generative AI', 'Vector Search', 'RAG Architecture', 'Next.js', 'Distributed Systems'],
    citationsCount: 42,
    publicationType: 'Journal',
    order: 1
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    clientName: 'Budi Santoso',
    avatarUrl: 'https://picsum.photos/seed/budi-avatar/200/200',
    titleRole: 'Chief Technology Officer',
    companyName: 'Fintech Nusantara Global',
    content: {
      id: 'Oqii adalah insinyur luar biasa. Ia berhasil memimpin transformasi platform kami dalam 4 bulan tanpa downtime tunggal. Kemampuan teknis dan kepemimpinannya sangat menonjol.',
      en: 'Oqii is an extraordinary engineer. He led our platform overhaul in 4 months with zero downtime. His technical mastery and leadership are top-tier.'
    },
    rating: 5,
    date: '2024-10-12',
    isApproved: true,
    order: 1
  },
  {
    id: 'test-2',
    clientName: 'Sarah Jenkins',
    avatarUrl: 'https://picsum.photos/seed/sarah-avatar/200/200',
    titleRole: 'VP of Product Development',
    companyName: 'Apex Cloud Solutions USA',
    content: {
      id: 'Sangat terkesan dengan ketelitian, kecepatan komunikasi, dan kualitas kode yang dihasilkan Oqii. Sangat direkomendasikan untuk proyek enterprise!',
      en: 'Incredibly impressed with Oqii’s attention to detail, communication speed, and code quality. Highly recommended for complex enterprise builds!'
    },
    rating: 5,
    date: '2024-08-04',
    isApproved: true,
    order: 2
  }
];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    title: { id: 'Full-Stack Web Application Development', en: 'Full-Stack Web Application Development' },
    icon: 'Code',
    shortDescription: {
      id: 'Pengembangan situs web SaaS modern, dashboard analytics, dan portal e-commerce berbasis Next.js 15, TypeScript, dan Tailwind CSS.',
      en: 'Building modern SaaS platforms, analytics dashboards, and e-commerce portals using Next.js 15, TypeScript, and Tailwind CSS.'
    },
    startingPrice: '$1,500 USD',
    duration: '2 - 6 Minggu',
    deliverables: [
      { id: 'Source code lengkap di GitHub', en: 'Complete clean source code repository' },
      { id: 'Desain UI/UX responsif WCAG AA', en: 'Responsive WCAG AA compliant UI/UX' },
      { id: 'Integrasi backend API & Database', en: 'Backend API & Database integration' },
      { id: 'Deployment otomatis ke Cloud', en: 'Automated Cloud deployment setup' }
    ],
    workflowSteps: [
      { step: 1, title: 'Discovery & System Design', description: 'Memahami kebutuhan produk, riset, dan menyusun arsitektur data.' },
      { step: 2, title: 'Agile Sprint Execution', description: 'Pengodean bertahap dengan demo berkala setiap minggu.' },
      { step: 3, title: 'QA Testing & Cloud Launch', description: 'Pengujian performa, keamanan, SEO, dan peluncuran publik.' }
    ],
    faqs: [
      {
        question: { id: 'Apakah kode sepenuhnya milik klien?', en: 'Does the client own 100% of the code?' },
        answer: { id: 'Ya, seluruh hak cipta dan repository dipindahtandatangkan langsung ke klien.', en: 'Yes, full copyright and repository ownership are transferred to you.' }
      }
    ],
    isFeatured: true,
    order: 1
  },
  {
    id: 'srv-2',
    title: { id: 'Generative AI Integration & RAG Engine', en: 'Generative AI Integration & RAG Engine' },
    icon: 'Sparkles',
    shortDescription: {
      id: 'Integrasi model Gemini AI, pencarian pengetahuan terdistribusi, chatbot cerdas, dan analisis teks dokumen perusahaan.',
      en: 'Integrating Gemini AI models, custom knowledge vector retrieval, smart AI agents, and automated document processors.'
    },
    startingPrice: '$2,000 USD',
    duration: '2 - 4 Minggu',
    deliverables: [
      { id: 'Server AI API Proxy terisolasi aman', en: 'Secure isolated AI API Proxy route' },
      { id: 'Pipeline ekstraksi dokumen & vector DB', en: 'Document extraction pipeline & vector DB' },
      { id: 'Antarmuka chat streaming interaktif', en: 'Interactive streaming chat interface' }
    ],
    workflowSteps: [
      { step: 1, title: 'Dataset Preparation', description: 'Penyiapan data dan penyesuaian prompt engineering.' },
      { step: 2, title: 'Vector Pipeline & API Integration', description: 'Pembangunan RAG engine dan integrasi API route.' }
    ],
    faqs: [
      {
        question: { id: 'Apakah data internal saya aman?', en: 'Is my internal company data safe?' },
        answer: { id: 'Sangat aman. Seluruh data diproses secara terisolasi tanpa disimpan untuk pelatihan umum AI.', en: '100% safe. Data is processed in an isolated environment and never used for public AI training.' }
      }
    ],
    isFeatured: true,
    order: 2
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'panduan-arsitektur-nextjs-15-enterprise',
    title: {
      id: 'Panduan Lengkap Arsitektur Next.js 15 App Router untuk Aplikasi Enterprise',
      en: 'Complete Guide to Next.js 15 App Router Architecture for Enterprise Applications'
    },
    excerpt: {
      id: 'Pelajari cara menyusun folder modular, mengoptimalkan Server Components, mengelola global state, dan meningkatkan skor Lighthouse hingga 99.',
      en: 'Learn how to structure modular folders, optimize Server Components, manage global state, and reach a 99 Lighthouse score.'
    },
    contentMarkdown: {
      id: `# Panduan Next.js 15 App Router Enterprise\n\nNext.js 15 membawa era baru dalam pengembangan aplikasi web modern dengan memperkenalkan Server Components yang sangat dioptimalkan, Turbopack, dan Server Actions yang aman.\n\n## 1. Pemisahan Folder Modular\n\nSelalu pisahkan logika bisnis dari UI component untuk memastikan keterbacaan kode yang tinggi:\n\n- \`components/ui\` : Komponen atomic murni (button, badge, dialog)\n- \`features/\` : Fitur berlingkup domain (profile, project, analytics)\n- \`lib/\` : Utility, helper, dan database client\n\n## 2. Praktik Terbaik Gemini AI Integration\n\nPastikan seluruh API key seperti \`GEMINI_API_KEY\` diakses secara eksplisit dari sisi server di Next.js API Routes (\`/app/api/*\`) untuk mencegah kebocoran kredensial di browser.`,
      en: `# Complete Next.js 15 Enterprise Guide\n\nNext.js 15 represents a major leap forward for modern web development, offering ultra-optimized Server Components, Turbopack, and secure Server Actions.\n\n## 1. Modular Architecture Pattern\n\nAlways decouple business logic from UI elements:\n\n- \`components/ui\`: Pure atomic elements (buttons, badges, modals)\n- \`features/\`: Domain-scoped functional blocks\n- \`lib/\`: Utilities, state store, and clients\n\n## 2. Gemini AI Integration Best Practices\n\nAlways proxy your \`GEMINI_API_KEY\` through server-side API Routes (\`/app/api/*\`) to ensure zero key exposure to client browser DevTools.`
    },
    coverImage: 'https://picsum.photos/seed/blog-nextjs15/1200/800',
    category: 'Engineering',
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'Web Architecture'],
    readTimeMinutes: 6,
    publishedAt: '2024-11-01',
    isPublished: true,
    isDraft: false,
    views: 1840,
    likes: 128,
    commentsCount: 14
  },
  {
    id: 'post-2',
    slug: 'mengapa-rag-dan-gemini-3-5-mengubah-lanskap-saas',
    title: {
      id: 'Mengapa RAG dan Gemini 3.5 AI Mengubah Lanskap Aplikasi SaaS Modern',
      en: 'Why RAG and Gemini 3.5 AI Are Revolutionizing Modern SaaS Platforms'
    },
    excerpt: {
      id: 'Analisis mendalam bagaimana teknik Retrieval-Augmented Generation memungkinkan aplikasi menjawab pertanyaan kompleks langsung dari basis data internal.',
      en: 'Deep dive into how Retrieval-Augmented Generation techniques allow applications to answer complex queries directly from internal databases.'
    },
    contentMarkdown: {
      id: `# Lanskap Baru AI dalam SaaS Enterprise\n\nInovasi AI Generatif bukan lagi sekadar fitur hiburan, melainkan pilar utama pengolahan informasi enterprise.\n\nDengan memanfaatkan model Gemini AI dan arsitektur RAG, pengguna dapat menemukan informasi dari ribuan berkas dokumen hanya dalam hitungan detik.`,
      en: `# The New Frontier of AI in Enterprise SaaS\n\nGenerative AI is no longer a gimmick; it has become the core infrastructure of modern knowledge processing.\n\nBy leveraging Gemini AI models and RAG architectures, users can surface contextual answers from thousands of documents in seconds.`
    },
    coverImage: 'https://picsum.photos/seed/blog-rag-ai/1200/800',
    category: 'Artificial Intelligence',
    tags: ['Gemini AI', 'RAG', 'Vector Database', 'SaaS'],
    readTimeMinutes: 8,
    publishedAt: '2024-10-18',
    isPublished: true,
    isDraft: false,
    views: 2410,
    likes: 215,
    commentsCount: 22
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: { id: 'Pembicara Keynote di GDG DevFest Jakarta 2024', en: 'Keynote Speaker at GDG DevFest Jakarta 2024' },
    category: 'Seminars',
    mediaUrl: 'https://picsum.photos/seed/devfest-speaker/1200/800',
    mediaType: 'image',
    caption: { id: 'Membawakan materi tentang Modern Web Performance & Gemini AI Integration di hadapan 1,200+ pengembang.', en: 'Presenting on Modern Web Performance & Gemini AI Integration in front of 1,200+ developers.' },
    date: '2024-11-20'
  },
  {
    id: 'gal-2',
    title: { id: 'Tim Pemenang Hackathon AI Kominfo 2024', en: 'Winning Team at Kominfo AI Hackathon 2024' },
    category: 'Events',
    mediaUrl: 'https://picsum.photos/seed/hackathon-winner/1200/800',
    mediaType: 'image',
    caption: { id: 'Momen penganugerahan piala Juara 1 Nasional oleh Menteri Kominfo RI.', en: 'Receiving 1st Place National Trophy presented by the Minister of Communication & IT.' },
    date: '2024-05-18'
  },
  {
    id: 'gal-3',
    title: { id: 'Workshop Code Review & Architecture di Kantor', en: 'Engineering Architecture Workshop at HQ' },
    category: 'Work',
    mediaUrl: 'https://picsum.photos/seed/workshop-office/1200/800',
    mediaType: 'image',
    caption: { id: 'Sesi mentoring arsitektur micro-services untuk tim insinyur perangkat lunak muda.', en: 'Mentoring session on micro-services architecture for junior software engineers.' },
    date: '2024-03-12'
  }
];

export const initialCVVersions: CVVersion[] = [
  {
    id: 'cv-1',
    versionName: 'Oqii_Febriansyah_CV_Senior_Software_Engineer_2025.pdf',
    language: 'en',
    type: 'Professional',
    fileUrl: '/assets/sample-cv.pdf',
    uploadedAt: '2025-01-10',
    isActive: true,
    downloadCount: 342
  },
  {
    id: 'cv-2',
    versionName: 'Oqii_Febriansyah_CV_Bahasa_Indonesia_ATS_2025.pdf',
    language: 'id',
    type: 'ATS-Friendly',
    fileUrl: '/assets/sample-cv-id.pdf',
    uploadedAt: '2025-01-08',
    isActive: true,
    downloadCount: 218
  }
];

export const initialThemeSettings: ThemeSettings = {
  primaryColor: '#ffffff',
  secondaryColor: '#0f0f0f',
  accentColor: '#a1a1aa',
  fontFamily: 'Playfair Display',
  borderRadius: 'sm',
  buttonStyle: 'rounded',
  cardStyle: 'bordered',
  mode: 'dark',
  enableAnimations: true,
  bgPattern: 'dots'
};

export const initialSEOSettings: SEOSettings = {
  metaTitle: 'Oqii Febriansyah | Senior Full Stack Engineer & Cloud Architect',
  metaDescription: 'Personal portfolio of Oqii Febriansyah - Senior Full Stack Engineer specializing in Next.js 15, Cloud Architecture, and Gemini AI integration.',
  keywords: 'Oqii Febriansyah, Portfolio, Full Stack Engineer, Next.js Developer, Cloud Architect, AI Developer, Jakarta Software Engineer',
  ogImage: 'https://picsum.photos/seed/oqii-og/1200/630',
  authorName: 'Oqii Febriansyah',
  canonicalUrl: 'https://oqiifebriansyah.dev',
  googleAnalyticsId: 'G-MEASUREMENT_ID',
  googleSearchConsoleMeta: 'google-site-verification-token',
  robotsTxt: 'User-agent: *\nAllow: /\nSitemap: https://oqiifebriansyah.dev/sitemap.xml'
};

export const initialSystemSettings: SystemSettings = {
  adminRoute: '/secure-control-panel',
  enableWhatsAppButton: true,
  whatsAppNumber: '6281234567890',
  whatsAppDefaultMessage: 'Halo Oqii, saya melihat portofolio profesional Anda dan ingin berdiskusi mengenai proyek.',
  enableMaintenanceMode: false,
  maintenanceMessage: 'Website sedang dalam pemeliharaan berkala. Silakan kembali beberapa saat lagi.',
  enableCommandPalette: true,
  enableVisitorCounter: true,
  enableCustomCursor: false,
  enableAudioSynthesizer: false,
  enableMultiLanguage: true,
  defaultLanguage: 'id'
};

export const initialPageSections: PageSectionConfig[] = [
  { id: 'sec-hero', name: 'Hero Banner', key: 'hero', isVisible: true, order: 1 },
  { id: 'sec-about', name: 'Tentang Saya (About)', key: 'about', isVisible: true, order: 2 },
  { id: 'sec-skills', name: 'Keahlian (Skills)', key: 'skills', isVisible: true, order: 3 },
  { id: 'sec-exp', name: 'Pengalaman Kerja (Experience)', key: 'experience', isVisible: true, order: 4 },
  { id: 'sec-edu', name: 'Pendidikan (Education)', key: 'education', isVisible: true, order: 5 },
  { id: 'sec-projects', name: 'Proyek Unggulan (Projects)', key: 'projects', isVisible: true, order: 6 },
  { id: 'sec-certs', name: 'Sertifikat (Certificates)', key: 'certificates', isVisible: true, order: 7 },
  { id: 'sec-achievements', name: 'Prestasi & Penghargaan', key: 'achievements', isVisible: true, order: 8 },
  { id: 'sec-org', name: 'Organisasi & Komunitas', key: 'organization', isVisible: true, order: 9 },
  { id: 'sec-trainings', name: 'Pelatihan & Kursus', key: 'trainings', isVisible: true, order: 10 },
  { id: 'sec-publications', name: 'Publikasi & Karya', key: 'publications', isVisible: true, order: 11 },
  { id: 'sec-services', name: 'Layanan Profesional', key: 'services', isVisible: true, order: 12 },
  { id: 'sec-blog', name: 'Artikel & Blog', key: 'blog', isVisible: true, order: 13 },
  { id: 'sec-testimonials', name: 'Testimoni Klien', key: 'testimonials', isVisible: true, order: 14 },
  { id: 'sec-gallery', name: 'Galeri Dokumentasi', key: 'gallery', isVisible: true, order: 15 },
  { id: 'sec-cv', name: 'Pratinjau CV Interaktif', key: 'cv', isVisible: true, order: 16 },
  { id: 'sec-contact', name: 'Formulir Kontak', key: 'contact', isVisible: true, order: 17 }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    adminEmail: 'oqiifebriansyah@gmail.com',
    action: 'LOGIN_SUCCESS',
    module: 'Authentication',
    details: 'Berhasil login ke Admin Panel menggunakan 2FA OTP verification.',
    ipAddress: '182.253.120.45',
    timestamp: '2026-07-21T16:45:00Z'
  },
  {
    id: 'log-2',
    adminEmail: 'oqiifebriansyah@gmail.com',
    action: 'UPDATE_PROJECT',
    module: 'Projects',
    details: 'Memperbarui informasi proyek "NexusAI - Enterprise Knowledge Base Platform".',
    ipAddress: '182.253.120.45',
    timestamp: '2026-07-21T17:05:12Z'
  }
];

export const initialAnalytics: AnalyticsSummary = {
  totalVisitors: 14850,
  todayVisitors: 284,
  monthlyVisitors: 3910,
  cvDownloads: 560,
  totalProjectViews: 12400,
  messagesCount: 48,
  deviceBreakdown: { desktop: 68, mobile: 28, tablet: 4 },
  browserBreakdown: { chrome: 62, safari: 21, firefox: 9, edge: 6, other: 2 },
  topVisitedProjects: [
    { title: 'NexusAI - Enterprise Knowledge Base Platform', views: 1420 },
    { title: 'FinFlow - Omnichannel Financial Analytics', views: 980 },
    { title: 'MediCare - Integrated Healthcare System', views: 850 }
  ],
  topVisitedArticles: [
    { title: 'Panduan Lengkap Arsitektur Next.js 15 App Router untuk Aplikasi Enterprise', views: 1840 },
    { title: 'Mengapa RAG dan Gemini 3.5 AI Mengubah Lanskap Aplikasi SaaS Modern', views: 2410 }
  ],
  visitorTrend: [
    { date: '15 Jul', views: 210 },
    { date: '16 Jul', views: 245 },
    { date: '17 Jul', views: 198 },
    { date: '18 Jul', views: 310 },
    { date: '19 Jul', views: 275 },
    { date: '20 Jul', views: 320 },
    { date: '21 Jul', views: 284 }
  ]
};

export const initialMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    senderName: 'Rian Hidayat',
    senderEmail: 'rian.hidayat@techcorp.id',
    senderPhone: '+628119876543',
    subject: 'Penawaran Kerjasama Proyek Cloud & AI Integration',
    serviceType: 'Generative AI Integration',
    message: 'Halo Mas Oqii, kami terkesan dengan portofolio Anda di bidang Gemini RAG. Apakah ada waktu luang minggu ini untuk diskusi konsultasi arsitektur?',
    receivedAt: '2026-07-21T10:15:00Z',
    status: 'Unread'
  }
];

export const initialSubscribers: Subscriber[] = [
  {
    id: 'sub-1',
    email: 'dev.fan@example.com',
    subscribedAt: '2026-06-12T08:00:00Z',
    isActive: true
  }
];
