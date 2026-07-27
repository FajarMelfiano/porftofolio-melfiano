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

/*
 * Seed content for Fajar Melfiano.
 *
 * Sources: melfiano.tech (previous portfolio), github.com/FajarMelfiano,
 * manunggalsolution.com, and details supplied directly.
 *
 * Anything marked TODO could not be verified from those sources — fill it in
 * from the admin panel rather than leaving a guess on the live site.
 */

export const initialProfile: ProfileInfo = {
  name: 'Fajar Melfiano Obese Afoan Toan',
  titles: [
    { id: 'Siswa SMK Krian 1 Sidoarjo', en: 'Student at SMK Krian 1 Sidoarjo' },
    { id: 'Cloud & DevOps Enthusiast', en: 'Cloud & DevOps Enthusiast' },
    { id: 'Web Developer', en: 'Web Developer' },
    { id: 'Teknisi Servis HP', en: 'Mobile Device Technician' }
  ],
  currentRole: {
    id: 'Pelajar SMK & Cloud Computing Enthusiast',
    en: 'Vocational Student & Cloud Computing Enthusiast'
  },
  bioShort: {
    id: 'Pelajar SMK Krian 1 Sidoarjo yang senang mengoprek Linux, membangun otomasi, dan belajar cloud computing.',
    en: 'Vocational student at SMK Krian 1 Sidoarjo who enjoys tinkering with Linux, building automation, and learning cloud computing.'
  },
  bioFull: {
    id: 'Saya suka eksperimen teknologi sejak kecil. Dari ngoprek Linux, main Hyprland, sampai bikin bot WhatsApp dan server sendiri. Sekarang saya fokus mendalami cloud computing dan infrastructure as code, sambil terus mengerjakan proyek web dan otomasi.',
    en: 'I have loved experimenting with technology since I was little — from tinkering with Linux and ricing Hyprland to building WhatsApp bots and running my own servers. These days I focus on cloud computing and infrastructure as code, while continuing to build web and automation projects.'
  },
  location: 'Krian, Sidoarjo, Jawa Timur',
  email: 'support@melfiano.my.id',
  phone: '', // TODO: isi nomor telepon asli
  whatsapp: '', // TODO: isi nomor WhatsApp asli (format 62xxx)
  github: 'https://github.com/FajarMelfiano',
  linkedin: '', // TODO: isi bila punya LinkedIn
  instagram: 'https://instagram.com/melfiano',
  telegram: '', // TODO: isi bila punya Telegram publik
  avatarUrl: '', // TODO: unggah foto profil, lalu isi URL-nya
  availabilityStatus: 'available',
  yearsExperience: 3,
  completedProjectsCount: 20,
  happyClientsCount: 4,
  awardsCount: 2,
  certificatesCount: 2,
  publicationsCount: 0,
  birthDate: '', // TODO: isi tanggal lahir
  languages: [
    { name: 'Indonesia', proficiency: 'Bahasa Ibu' },
    { name: 'English', proficiency: 'Membaca dokumentasi teknis' }
  ],
  hobbies: [
    'Ngoprek Linux & Arch',
    'Ricing Hyprland',
    'Membaca buku',
    'Astronomi',
    'Cerita action inspiratif'
  ],
  careerGoals: {
    id: 'Menjadi cloud engineer yang mampu merancang dan mengelola infrastruktur andal, sambil terus berbagi ilmu lewat proyek open source.',
    en: 'Become a cloud engineer capable of designing and operating reliable infrastructure, while sharing what I learn through open source projects.'
  },
  professionalValues: [
    { id: 'Belajar Mandiri', en: 'Self-Directed Learning' },
    { id: 'Rasa Ingin Tahu', en: 'Curiosity' },
    { id: 'Otomatisasi Pekerjaan Berulang', en: 'Automate the Repetitive' },
    { id: 'Berbagi Ilmu', en: 'Share What You Learn' }
  ]
};

export const initialHeroConfig: HeroConfig = {
  greeting: { id: 'Halo 👋, Saya', en: 'Hello 👋, I am' },
  headline: {
    id: 'Belajar Membangun Infrastruktur Cloud & Otomasi',
    en: 'Learning to Build Cloud Infrastructure & Automation'
  },
  subheadline: {
    id: 'Pelajar SMK Krian 1 Sidoarjo. Mengerjakan proyek web, bot otomasi, dan infrastructure as code — dari ngoprek Linux sampai deploy ke cloud.',
    en: 'A vocational student from Sidoarjo building web projects, automation bots, and infrastructure as code — from ricing Linux to deploying on the cloud.'
  },
  primaryCtaText: { id: 'Lihat Proyek Saya', en: 'See My Projects' },
  secondaryCtaText: { id: 'Unduh CV', en: 'Download CV' },
  showStats: true,
  heroLayout: 'classic',
  heroBackground: 'dots'
};

export const initialSkillCategories: SkillCategory[] = [
  { id: 'cat-os', name: { id: 'Sistem Operasi & Linux', en: 'Operating Systems & Linux' }, icon: 'Server' },
  { id: 'cat-cloud', name: { id: 'Cloud & Infrastruktur', en: 'Cloud & Infrastructure' }, icon: 'Cloud' },
  { id: 'cat-prog', name: { id: 'Bahasa Pemrograman', en: 'Programming Languages' }, icon: 'Code2' },
  { id: 'cat-web', name: { id: 'Pengembangan Web', en: 'Web Development' }, icon: 'Layers' },
  { id: 'cat-automation', name: { id: 'Otomasi & Bot', en: 'Automation & Bots' }, icon: 'Sparkles' },
  { id: 'cat-hardware', name: { id: 'Perangkat Keras', en: 'Hardware' }, icon: 'Wrench' }
];

export const initialSkills: Skill[] = [
  {
    id: 'sk-1',
    name: 'Linux & Arch Linux',
    categoryId: 'cat-os',
    level: 'Advanced',
    percentage: 90,
    yearsExperience: 4,
    icon: 'Server',
    description: {
      id: 'Instalasi, konfigurasi, dan pemeliharaan sistem Arch Linux untuk pemakaian harian.',
      en: 'Installing, configuring, and maintaining Arch Linux systems for daily driving.'
    },
    isFeatured: true,
    order: 1
  },
  {
    id: 'sk-2',
    name: 'Shell Scripting (Bash, Zsh, Fish)',
    categoryId: 'cat-os',
    level: 'Advanced',
    percentage: 88,
    yearsExperience: 3,
    icon: 'Code2',
    description: {
      id: 'Menulis skrip otomatisasi untuk mempercepat pekerjaan yang berulang.',
      en: 'Writing automation scripts to speed up repetitive work.'
    },
    isFeatured: true,
    order: 2
  },
  {
    id: 'sk-3',
    name: 'Hyprland, Waybar & Theming',
    categoryId: 'cat-os',
    level: 'Advanced',
    percentage: 85,
    yearsExperience: 2,
    icon: 'Palette',
    description: {
      id: 'Kustomisasi window manager Wayland beserta status bar dan tema desktop.',
      en: 'Customising a Wayland window manager along with status bars and desktop theming.'
    },
    isFeatured: true,
    order: 3
  },
  {
    id: 'sk-4',
    name: 'Bot Development (WhatsApp, Telegram, Discord)',
    categoryId: 'cat-automation',
    level: 'Advanced',
    percentage: 85,
    yearsExperience: 4,
    icon: 'Sparkles',
    description: {
      id: 'Membangun bot untuk balas otomatis, notifikasi, dan jembatan antar platform.',
      en: 'Building bots for auto-replies, notifications, and cross-platform bridges.'
    },
    isFeatured: true,
    order: 4
  },
  {
    id: 'sk-5',
    name: 'Web Scraping & Integrasi API',
    categoryId: 'cat-automation',
    level: 'Intermediate',
    percentage: 80,
    yearsExperience: 3,
    icon: 'Code2',
    description: {
      id: 'Mengambil dan mengolah data dari berbagai sumber web dan REST API.',
      en: 'Collecting and processing data from various web sources and REST APIs.'
    },
    isFeatured: true,
    order: 5
  },
  {
    id: 'sk-6',
    name: 'Terraform & Infrastructure as Code',
    categoryId: 'cat-cloud',
    level: 'Intermediate',
    percentage: 75,
    yearsExperience: 1,
    icon: 'Cloud',
    description: {
      id: 'Mendefinisikan infrastruktur cloud sebagai kode, dipakai pada LKS Cloud Computing.',
      en: 'Defining cloud infrastructure as code, used in the LKS Cloud Computing contest.'
    },
    isFeatured: true,
    order: 6
  },
  {
    id: 'sk-7',
    name: 'AWS (ECS, Glue, SageMaker, S3)',
    categoryId: 'cat-cloud',
    level: 'Intermediate',
    percentage: 70,
    yearsExperience: 1,
    icon: 'Cloud',
    description: {
      id: 'Deploy container ke ECS Fargate, pipeline ETL dengan Glue, dan model ML di SageMaker.',
      en: 'Deploying containers to ECS Fargate, ETL pipelines with Glue, and ML models on SageMaker.'
    },
    isFeatured: true,
    order: 7
  },
  {
    id: 'sk-8',
    name: 'Python',
    categoryId: 'cat-prog',
    level: 'Intermediate',
    percentage: 78,
    yearsExperience: 3,
    icon: 'Code2',
    description: {
      id: 'Skrip otomasi, aplikasi CLI, pemrosesan data, dan tooling internal.',
      en: 'Automation scripts, CLI applications, data processing, and internal tooling.'
    },
    isFeatured: true,
    order: 8
  },
  {
    id: 'sk-9',
    name: 'TypeScript & JavaScript',
    categoryId: 'cat-prog',
    level: 'Intermediate',
    percentage: 75,
    yearsExperience: 3,
    icon: 'Code2',
    description: {
      id: 'Bahasa utama untuk hampir semua proyek web yang saya kerjakan.',
      en: 'The main language behind almost every web project I build.'
    },
    isFeatured: true,
    order: 9
  },
  {
    id: 'sk-10',
    name: 'React & Next.js',
    categoryId: 'cat-web',
    level: 'Intermediate',
    percentage: 72,
    yearsExperience: 2,
    icon: 'Atom',
    description: {
      id: 'Membangun antarmuka web interaktif dan situs yang dideploy ke Vercel.',
      en: 'Building interactive web interfaces and sites deployed to Vercel.'
    },
    isFeatured: true,
    order: 10
  },
  {
    id: 'sk-11',
    name: 'Tailwind CSS',
    categoryId: 'cat-web',
    level: 'Intermediate',
    percentage: 70,
    yearsExperience: 2,
    icon: 'Palette',
    description: {
      id: 'Menyusun tampilan responsif dengan pendekatan utility-first.',
      en: 'Composing responsive interfaces with a utility-first approach.'
    },
    isFeatured: false,
    order: 11
  },
  {
    id: 'sk-12',
    name: 'Servis Hardware & Software HP',
    categoryId: 'cat-hardware',
    level: 'Advanced',
    percentage: 85,
    yearsExperience: 3,
    icon: 'Wrench',
    description: {
      id: 'Flashing, unlock, ganti sparepart, dan troubleshooting perangkat Android maupun iPhone.',
      en: 'Flashing, unlocking, part replacement, and troubleshooting on Android and iPhone devices.'
    },
    isFeatured: true,
    order: 12
  }
];

export const initialExperiences: Experience[] = [
  {
    id: 'exp-1',
    companyName: 'Leo Printing Tarik',
    companyUrl: '',
    position: {
      id: 'Peserta Praktik Kerja Lapangan (PKL)',
      en: 'Internship Student (PKL)'
    },
    employmentType: 'Internship',
    location: 'Tarik, Sidoarjo',
    startDate: '2025-07',
    endDate: '2025-10',
    isCurrent: false,
    description: {
      id: 'Menjalani praktik kerja lapangan selama empat bulan di percetakan Leo Printing Tarik, Sidoarjo.',
      en: 'Completed a four-month vocational internship at Leo Printing Tarik, a printing business in Sidoarjo.'
    },
    responsibilities: [
      // TODO: rinci tugas harian selama PKL agar bagian ini lebih meyakinkan
    ],
    achievements: [],
    technologies: [],
    order: 1
  },
  {
    id: 'exp-2',
    companyName: 'Manunggal Solution',
    companyUrl: 'https://www.manunggalsolution.com/',
    position: {
      id: 'Teknisi IT', // TODO: sesuaikan dengan jabatan resmi Anda
      en: 'IT Technician'
    },
    employmentType: 'Part-time',
    location: 'Waru, Sidoarjo',
    startDate: '2024-01', // TODO: sesuaikan bulan mulai yang tepat
    endDate: '2025-12', // TODO: sesuaikan bulan selesai yang tepat
    isCurrent: false,
    description: {
      id: 'Bekerja di perusahaan penyedia solusi IT yang menangani servis hardware dan software komputer, laptop, serta perangkat mobile, sekaligus pengembangan perangkat lunak.',
      en: 'Worked at an IT solutions company handling hardware and software servicing for computers, laptops, and mobile devices, alongside software development.'
    },
    responsibilities: [
      // TODO: rinci tanggung jawab Anda di Manunggal Solution
    ],
    achievements: [],
    technologies: [],
    order: 2
  },
  {
    id: 'exp-3',
    companyName: 'Freelance / Mandiri',
    position: {
      id: 'Teknisi Servis HP',
      en: 'Mobile Device Technician'
    },
    employmentType: 'Freelance',
    location: 'Krian, Sidoarjo',
    startDate: '2023-01',
    endDate: '2024-12',
    isCurrent: false,
    description: {
      id: 'Menerima servis hardware dan software perangkat Android maupun iPhone secara mandiri.',
      en: 'Independently took on hardware and software repair jobs for Android and iPhone devices.'
    },
    responsibilities: [
      {
        id: 'Flashing, unlock, dan pemulihan sistem perangkat mobile.',
        en: 'Flashing, unlocking, and recovering mobile device systems.'
      },
      {
        id: 'Penggantian sparepart dan troubleshooting kerusakan hardware.',
        en: 'Replacing spare parts and troubleshooting hardware faults.'
      }
    ],
    achievements: [],
    technologies: [],
    order: 3
  }
];

export const initialEducations: Education[] = [
  {
    id: 'edu-1',
    institutionName: 'SMK Krian 1 Sidoarjo',
    institutionUrl: '',
    degree: { id: 'Sekolah Menengah Kejuruan', en: 'Vocational High School' },
    fieldOfStudy: {
      id: 'Teknik Komputer & Jaringan', // TODO: ganti bila jurusan Anda berbeda
      en: 'Computer & Network Engineering'
    },
    startYear: '2023', // TODO: sesuaikan tahun masuk
    endYear: '2026', // TODO: sesuaikan tahun lulus
    gpa: '',
    maxGpa: '',
    location: 'Krian, Sidoarjo',
    description: {
      id: 'Menempuh pendidikan kejuruan sambil aktif mengikuti Lomba Kompetensi Siswa bidang Cloud Computing.',
      en: 'Pursuing vocational education while actively competing in the Cloud Computing category of the national student skills contest (LKS).'
    },
    academicAchievements: [
      {
        id: 'Peserta LKS Cloud Computing Tingkat Kabupaten 2026',
        en: 'Participant, LKS Cloud Computing — Regency Level 2026'
      },
      {
        id: 'Peserta LKS Cloud Computing Tingkat Provinsi Jawa Timur 2026',
        en: 'Participant, LKS Cloud Computing — East Java Province Level 2026'
      }
    ],
    order: 1
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    slug: 'healthpredict-ai',
    title: 'HealthPredict AI',
    shortDescription: {
      id: 'Pipeline machine learning end-to-end di AWS untuk prediksi kesehatan — dikerjakan pada LKS Cloud Computing Tingkat Provinsi 2026.',
      en: 'An end-to-end machine learning pipeline on AWS for health prediction, built for the LKS Cloud Computing provincial contest 2026.'
    },
    fullDescription: {
      id: 'Proyek ini menggabungkan ETL berbasis PySpark di AWS Glue dengan pipeline SageMaker tiga tahap: processing, training, dan deployment ke real-time endpoint. Dikerjakan sebagai materi Lomba Kompetensi Siswa bidang Cloud Computing tingkat Provinsi Jawa Timur 2026.',
      en: 'The project combines a PySpark ETL job on AWS Glue with a three-step SageMaker pipeline covering processing, training, and deployment to a real-time endpoint. Built as material for the 2026 East Java provincial Cloud Computing skills contest.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Cloud & Machine Learning',
    tags: ['AWS', 'SageMaker', 'AWS Glue', 'PySpark', 'Python'],
    technologies: ['Python', 'PySpark', 'AWS Glue', 'Amazon SageMaker', 'Amazon S3'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-04-15',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/healthpredict',
    keyFeatures: [
      { id: 'ETL PySpark sembilan tahap transformasi data', en: 'Nine-stage PySpark ETL data transformation' },
      { id: 'Pipeline SageMaker tiga langkah', en: 'Three-step SageMaker pipeline' },
      { id: 'Deployment model ke real-time endpoint', en: 'Model deployment to a real-time endpoint' }
    ],
    isFeatured: true,
    order: 1,
    views: 0
  },
  {
    id: 'proj-2',
    slug: 'lks-url-shortener',
    title: 'LKS URL Shortener — Arsitektur ECS Fargate',
    shortDescription: {
      id: 'Monorepo tiga layanan yang dideploy sebagai container ECS Fargate di belakang satu Application Load Balancer.',
      en: 'A three-service monorepo deployed as ECS Fargate containers behind a single Application Load Balancer.'
    },
    fullDescription: {
      id: 'Aplikasi pemendek URL yang dipecah menjadi beberapa layanan terpisah, masing-masing berjalan sebagai container di ECS Fargate dan diarahkan melalui satu ALB. Merupakan Modul 2 LKS Cloud Computing Jawa Timur 2026.',
      en: 'A URL shortener split into separate services, each running as an ECS Fargate container and routed through a single ALB. This is Module 2 of the 2026 East Java Cloud Computing skills contest.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Cloud & DevOps',
    tags: ['AWS', 'ECS Fargate', 'ALB', 'TypeScript', 'Docker'],
    technologies: ['TypeScript', 'Docker', 'AWS ECS Fargate', 'Application Load Balancer'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-04-15',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/APP-Terraform',
    isFeatured: true,
    order: 2,
    views: 0
  },
  {
    id: 'proj-3',
    slug: 'infrastructure-terraform',
    title: 'Infrastructure as Code dengan Terraform',
    shortDescription: {
      id: 'Definisi infrastruktur cloud sebagai kode menggunakan Terraform untuk LKS Cloud Computing Jawa Timur 2026.',
      en: 'Cloud infrastructure defined as code with Terraform for the 2026 East Java Cloud Computing contest.'
    },
    fullDescription: {
      id: 'Kumpulan modul Terraform yang menyediakan seluruh infrastruktur pendukung aplikasi kontes, sehingga lingkungan dapat dibangun ulang secara konsisten dan berulang.',
      en: 'A set of Terraform modules that provision the entire supporting infrastructure for the contest application, so the environment can be rebuilt consistently and repeatably.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Cloud & DevOps',
    tags: ['Terraform', 'HCL', 'AWS', 'IaC'],
    technologies: ['Terraform', 'HCL', 'AWS'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-04-15',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/infrastructure-terraform',
    isFeatured: true,
    order: 3,
    views: 0
  },
  {
    id: 'proj-3-plant',
    slug: 'dokumentasi-tanaman',
    title: 'Proyek Pertanian: Dokumentasi Tanaman',
    shortDescription: {
      id: 'Dokumentasi progress tanaman selama 3 bulan dari benih hingga panen.',
      en: 'Documentation of plant progress over 3 months from seed to harvest.'
    },
    fullDescription: {
      id: 'Proyek penugasan untuk menanam dan mendokumentasikan perkembangan tanaman secara kronologis dari minggu ke minggu.',
      en: 'An assignment project to plant and document plant development chronologically week by week.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Dokumentasi',
    tags: ['Pertanian', 'Dokumentasi', 'Tugas'],
    technologies: [],
    role: { id: 'Pengamat', en: 'Observer' },
    completedDate: '2026-10-01', // Example date
    status: 'In Progress',
    projectType: 'plant-documentation',
    plantInfo: {
      name: 'Cabai Rawit', // Placeholder
      variety: 'Capsicum frutescens',
      plantDate: '2026-07-01', // Placeholder
      expectedHarvestDate: '2026-10-01'
    },
    plantTimeline: [
      {
        id: 'timeline-1',
        date: '2026-07-01',
        photoUrl: '', // Add image later
        week: 1,
        growthStage: 'seeding',
        description: {
          id: 'Hari pertama: penyemaian benih di polybag kecil dengan campuran tanah dan kompos.',
          en: 'Day 1: Seeding in small polybags with a mix of soil and compost.'
        }
      }
    ],
    isFeatured: true,
    order: 4,
    views: 0
  },
  {
    id: 'proj-4',
    slug: 'moviebox-client',
    title: 'Moviebox Client',
    shortDescription: {
      id: 'Klien Python tak resmi untuk mencari, streaming, dan mengunduh film, serial, atau anime lengkap dengan subtitle.',
      en: 'An unofficial Python client for searching, streaming, and downloading movies, series, or anime with subtitle support.'
    },
    fullDescription: {
      id: 'Aplikasi terminal dengan antarmuka TUI layar penuh dan alur Home → Search → Source → Subtitle → Run. Mendukung banyak penyedia sumber untuk film, serial, maupun anime, serta beberapa sumber subtitle sekaligus.',
      en: 'A terminal application with a full-screen TUI and a Home → Search → Source → Subtitle → Run flow. It supports multiple stream providers for movies, series, and anime, plus several subtitle sources.'
    },
    thumbnail: '',
    gallery: [],
    category: 'CLI & Automation',
    tags: ['Python', 'TUI', 'CLI', 'Stremio'],
    technologies: ['Python'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-05-07',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/MOVIEBOX-CLIENT',
    keyFeatures: [
      { id: 'TUI interaktif layar penuh', en: 'Interactive full-screen TUI' },
      { id: 'Resolusi stream berbasis banyak provider', en: 'Provider-based stream resolution' },
      { id: 'Pemilihan sumber subtitle', en: 'Subtitle source selection' }
    ],
    isFeatured: true,
    order: 4,
    views: 0
  },
  {
    id: 'proj-5',
    slug: 'bridge-whatsapp-telegram',
    title: 'Bridge WhatsApp ↔ Telegram',
    shortDescription: {
      id: 'Jembatan pesan dua arah yang meneruskan percakapan antara WhatsApp dan Telegram.',
      en: 'A two-way message bridge that relays conversations between WhatsApp and Telegram.'
    },
    fullDescription: {
      id: 'Alat otomasi yang menyambungkan dua platform pesan berbeda sehingga percakapan dapat dipantau dan dibalas dari satu tempat.',
      en: 'An automation tool that connects two different messaging platforms so conversations can be monitored and answered from a single place.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Otomasi & Bot',
    tags: ['WhatsApp', 'Telegram', 'Bot', 'Automation'],
    technologies: ['Node.js', 'Baileys', 'Telegram Bot API'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-05-15',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/Bridge-Whatsapp-Telegram',
    isFeatured: true,
    order: 5,
    views: 0
  },
  {
    id: 'proj-6',
    slug: 'uno-game',
    title: 'UNO Game Online',
    shortDescription: {
      id: 'Permainan kartu UNO berbasis web yang bisa dimainkan langsung dari browser.',
      en: 'A browser-based UNO card game playable straight from the web.'
    },
    fullDescription: {
      id: 'Implementasi permainan kartu UNO dengan antarmuka web interaktif, dibangun menggunakan TypeScript dan dideploy ke Vercel.',
      en: 'An implementation of the UNO card game with an interactive web interface, built with TypeScript and deployed to Vercel.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web & Game',
    tags: ['TypeScript', 'React', 'Game'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-06-28',
    status: 'Completed',
    demoUrl: 'https://uno-game-kappa.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/UNO-GAME',
    isFeatured: true,
    order: 6,
    views: 0
  },
  {
    id: 'proj-7',
    slug: 'gallery-photos',
    title: 'Gallery Photos',
    shortDescription: {
      id: 'Galeri foto web dengan tata letak responsif dan pratinjau gambar.',
      en: 'A web photo gallery with a responsive layout and image previews.'
    },
    fullDescription: {
      id: 'Aplikasi galeri untuk menampilkan koleksi foto dengan navigasi yang ringan dan tampilan yang menyesuaikan ukuran layar.',
      en: 'A gallery application for presenting photo collections with lightweight navigation and a layout that adapts to screen size.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web Development',
    tags: ['TypeScript', 'React', 'Gallery'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-05-25',
    status: 'Completed',
    demoUrl: 'https://gallery-photos-cnbm.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/Gallery-Photos',
    isFeatured: false,
    order: 7,
    views: 0
  },
  {
    id: 'proj-8',
    slug: 'kedai-kopi',
    title: 'Kedai Kopi',
    shortDescription: {
      id: 'Situs profil kedai kopi dengan daftar menu dan tampilan yang hangat.',
      en: 'A coffee shop profile site with a menu listing and a warm visual style.'
    },
    fullDescription: {
      id: 'Website statis untuk memperkenalkan sebuah kedai kopi, memuat menu, suasana, dan informasi kontak.',
      en: 'A static website introducing a coffee shop, covering its menu, atmosphere, and contact details.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web Development',
    tags: ['TypeScript', 'React', 'Landing Page'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-05-11',
    status: 'Completed',
    demoUrl: 'https://kedai-kopi-mauve.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/Kedai-Kopi',
    isFeatured: false,
    order: 8,
    views: 0
  },
  {
    id: 'proj-9',
    slug: 'game-rpg',
    title: 'Game RPG Berbasis Web',
    shortDescription: {
      id: 'Permainan RPG sederhana yang berjalan sepenuhnya di browser.',
      en: 'A simple RPG that runs entirely in the browser.'
    },
    fullDescription: {
      id: 'Eksperimen membuat permainan bergaya RPG dengan sistem pertarungan dan progres karakter, dibangun memakai TypeScript.',
      en: 'An experiment in building an RPG-style game with a combat system and character progression, built with TypeScript.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web & Game',
    tags: ['TypeScript', 'React', 'Game'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2025-09-04',
    status: 'Completed',
    demoUrl: 'https://rpg-v2-three.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/RPG-V2',
    isFeatured: false,
    order: 9,
    views: 0
  },
  {
    id: 'proj-10',
    slug: 'data-bank-soal',
    title: 'Data Bank Soal',
    shortDescription: {
      id: 'Aplikasi web untuk mengelola dan menelusuri bank soal.',
      en: 'A web application for managing and browsing a question bank.'
    },
    fullDescription: {
      id: 'Alat bantu belajar yang mengumpulkan kumpulan soal dalam satu tempat sehingga mudah dicari dan dipakai berulang.',
      en: 'A study aid that gathers question sets in one place so they are easy to search and reuse.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web Development',
    tags: ['Web App', 'Education'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2025-10-05',
    status: 'Completed',
    demoUrl: 'https://data-bank-soal.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/DATA-BANK-SOAL',
    isFeatured: false,
    order: 10,
    views: 0
  },
  {
    id: 'proj-11',
    slug: 'portofolio-devira',
    title: 'Portofolio Devira',
    shortDescription: {
      id: 'Situs portofolio pribadi yang dibuat untuk klien.',
      en: 'A personal portfolio site built for a client.'
    },
    fullDescription: {
      id: 'Website portofolio yang dirancang dan dideploy untuk klien, menampilkan profil, karya, dan informasi kontak.',
      en: 'A portfolio website designed and deployed for a client, presenting their profile, work, and contact details.'
    },
    thumbnail: '',
    gallery: [],
    category: 'Web Development',
    tags: ['TypeScript', 'React', 'Portfolio'],
    technologies: ['TypeScript', 'React', 'Vercel'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2026-07-22',
    status: 'Completed',
    demoUrl: 'https://portofolio-devira.vercel.app',
    repoUrl: 'https://github.com/FajarMelfiano/PORTOFOLIO-DEVIRA',
    isFeatured: false,
    order: 11,
    views: 0
  },
  {
    id: 'proj-12',
    slug: 'mesin-kasir-python',
    title: 'Mesin Kasir Python',
    shortDescription: {
      id: 'Aplikasi kasir sederhana berbasis Python untuk mencatat transaksi penjualan.',
      en: 'A simple Python point-of-sale application for recording sales transactions.'
    },
    fullDescription: {
      id: 'Program kasir yang menangani pencatatan barang, perhitungan total, dan struk transaksi — proyek awal saya dalam belajar Python.',
      en: 'A cash register program handling item entry, total calculation, and receipts — one of my early Python learning projects.'
    },
    thumbnail: '',
    gallery: [],
    category: 'CLI & Automation',
    tags: ['Python', 'CLI'],
    technologies: ['Python'],
    role: { id: 'Pengembang Tunggal', en: 'Sole Developer' },
    completedDate: '2024-09-16',
    status: 'Completed',
    repoUrl: 'https://github.com/FajarMelfiano/Mesin-kasir-python',
    isFeatured: false,
    order: 12,
    views: 0
  }
];

/*
 * The certificate folder on Google Drive requires sign-in, so only the two
 * folder names were visible. Titles below reflect those names; fill in the
 * issuer, dates, and file links from the admin panel.
 */
export const initialCertificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'LKS Cloud Computing Tingkat Provinsi Jawa Timur 2026',
    issuer: '', // TODO: isi penyelenggara resmi
    issueDate: '2026-04-28',
    credentialId: '',
    credentialUrl: '',
    thumbnailUrl: '',
    fileUrl: '', // TODO: unggah berkas sertifikat lalu isi URL-nya
    description: {
      id: 'Sertifikat keikutsertaan Lomba Kompetensi Siswa bidang Cloud Computing tingkat Provinsi Jawa Timur tahun 2026.',
      en: 'Certificate of participation in the 2026 East Java provincial student skills contest for Cloud Computing.'
    },
    competencies: ['Cloud Computing', 'AWS', 'Terraform', 'Infrastructure as Code'],
    category: 'Cloud Computing',
    isValid: true,
    isFeatured: true,
    order: 1
  },
  {
    id: 'cert-2',
    title: 'LKS Cloud Computing Tingkat Kabupaten 2026',
    issuer: '', // TODO: isi penyelenggara resmi
    issueDate: '2026-04-28',
    credentialId: '',
    credentialUrl: '',
    thumbnailUrl: '',
    fileUrl: '', // TODO: unggah berkas sertifikat lalu isi URL-nya
    description: {
      id: 'Sertifikat keikutsertaan Lomba Kompetensi Siswa bidang Cloud Computing tingkat Kabupaten tahun 2026.',
      en: 'Certificate of participation in the 2026 regency-level student skills contest for Cloud Computing.'
    },
    competencies: ['Cloud Computing', 'AWS'],
    category: 'Cloud Computing',
    isValid: true,
    isFeatured: true,
    order: 2
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: {
      id: 'Lomba Kompetensi Siswa Cloud Computing — Tingkat Provinsi Jawa Timur 2026',
      en: 'Student Skills Contest in Cloud Computing — East Java Province 2026'
    },
    level: 'Regional',
    organizer: 'Lomba Kompetensi Siswa (LKS) Jawa Timur',
    date: '2026-04-28',
    rank: '', // TODO: isi peringkat yang diraih
    description: {
      id: 'Mewakili sekolah pada LKS bidang Cloud Computing tingkat provinsi, mengerjakan modul infrastructure as code dan pipeline machine learning di AWS.',
      en: 'Represented the school at the provincial Cloud Computing skills contest, working on infrastructure-as-code and machine learning pipeline modules on AWS.'
    },
    category: 'Kompetisi Cloud Computing',
    isFeatured: true,
    order: 1
  },
  {
    id: 'ach-2',
    title: {
      id: 'Lomba Kompetensi Siswa Cloud Computing — Tingkat Kabupaten 2026',
      en: 'Student Skills Contest in Cloud Computing — Regency Level 2026'
    },
    level: 'Regional',
    organizer: 'Lomba Kompetensi Siswa (LKS) Kabupaten Sidoarjo',
    date: '2026-04-28',
    rank: '', // TODO: isi peringkat yang diraih
    description: {
      id: 'Mengikuti seleksi LKS bidang Cloud Computing di tingkat kabupaten sebagai tahap menuju kompetisi provinsi.',
      en: 'Competed in the regency-level Cloud Computing skills contest as the qualifying stage for the provincial round.'
    },
    category: 'Kompetisi Cloud Computing',
    isFeatured: true,
    order: 2
  }
];

// TODO: isi bila Anda aktif di organisasi sekolah atau komunitas.
export const initialOrganizations: Organization[] = [];

// TODO: isi bila Anda pernah mengikuti pelatihan atau kursus bersertifikat.
export const initialTrainings: Training[] = [];

// Tidak ada publikasi ilmiah — seksi ini bisa disembunyikan lewat Page Builder.
export const initialPublications: Publication[] = [];

// TODO: minta testimoni dari pembimbing PKL atau klien, lalu tambahkan di sini.
export const initialTestimonials: Testimonial[] = [];

export const initialServices: Service[] = [
  {
    id: 'srv-1',
    title: { id: 'Pembuatan Website', en: 'Website Development' },
    icon: 'Code',
    shortDescription: {
      id: 'Pembuatan situs portofolio, landing page, dan aplikasi web sederhana memakai React dan Next.js.',
      en: 'Building portfolio sites, landing pages, and simple web applications with React and Next.js.'
    },
    startingPrice: '', // TODO: isi bila Anda ingin menampilkan harga
    duration: '1 - 3 Minggu',
    deliverables: [
      { id: 'Kode sumber lengkap di GitHub', en: 'Complete source code on GitHub' },
      { id: 'Tampilan responsif untuk ponsel dan desktop', en: 'Responsive layout for mobile and desktop' },
      { id: 'Deployment ke hosting (Vercel)', en: 'Deployment to hosting (Vercel)' }
    ],
    workflowSteps: [
      { step: 1, title: 'Diskusi Kebutuhan', description: 'Menentukan tujuan situs, isi, dan gaya tampilan.' },
      { step: 2, title: 'Pengerjaan', description: 'Membangun halaman dan fungsionalitas sesuai kesepakatan.' },
      { step: 3, title: 'Revisi & Peluncuran', description: 'Perbaikan akhir lalu situs dionlinekan.' }
    ],
    faqs: [],
    isFeatured: true,
    order: 1
  },
  {
    id: 'srv-2',
    title: { id: 'Bot Otomasi WhatsApp & Telegram', en: 'WhatsApp & Telegram Automation Bots' },
    icon: 'Sparkles',
    shortDescription: {
      id: 'Pembuatan bot untuk balas otomatis, notifikasi, dan menjembatani percakapan antar platform.',
      en: 'Building bots for auto-replies, notifications, and bridging conversations across platforms.'
    },
    startingPrice: '', // TODO: isi bila Anda ingin menampilkan harga
    duration: '1 - 2 Minggu',
    deliverables: [
      { id: 'Bot siap pakai beserta panduan menjalankan', en: 'A ready-to-run bot with setup instructions' },
      { id: 'Kode sumber yang bisa dikembangkan sendiri', en: 'Source code you can extend yourself' }
    ],
    workflowSteps: [
      { step: 1, title: 'Perancangan Alur', description: 'Menentukan perintah dan alur balasan bot.' },
      { step: 2, title: 'Pembuatan & Uji Coba', description: 'Membangun bot lalu mengujinya pada perangkat nyata.' }
    ],
    faqs: [],
    isFeatured: true,
    order: 2
  },
  {
    id: 'srv-3',
    title: { id: 'Servis Perangkat Mobile', en: 'Mobile Device Repair' },
    icon: 'Server',
    shortDescription: {
      id: 'Servis hardware dan software perangkat Android maupun iPhone: flashing, unlock, ganti sparepart, dan troubleshooting.',
      en: 'Hardware and software repair for Android and iPhone devices: flashing, unlocking, part replacement, and troubleshooting.'
    },
    startingPrice: '',
    duration: 'Menyesuaikan kerusakan',
    deliverables: [
      { id: 'Diagnosa kerusakan', en: 'Fault diagnosis' },
      { id: 'Perbaikan hardware atau software', en: 'Hardware or software repair' }
    ],
    workflowSteps: [
      { step: 1, title: 'Pemeriksaan', description: 'Mengecek kondisi perangkat dan menentukan penyebab kerusakan.' },
      { step: 2, title: 'Perbaikan', description: 'Melakukan perbaikan sesuai hasil pemeriksaan.' }
    ],
    faqs: [],
    isFeatured: false,
    order: 3
  }
];

// TODO: tulis artikel pertama Anda lewat panel admin.
export const initialBlogPosts: BlogPost[] = [];

// TODO: unggah dokumentasi kegiatan, lomba, atau PKL lewat panel admin.
export const initialGallery: GalleryItem[] = [];

// TODO: unggah berkas CV ke folder public/ lalu daftarkan di sini.
export const initialCVVersions: CVVersion[] = [];

export const initialThemeSettings: ThemeSettings = {
  primaryColor: '#ffffff',
  secondaryColor: '#0f0f0f',
  accentColor: '#38bdf8',
  fontFamily: 'Plus Jakarta Sans',
  borderRadius: 'sm',
  buttonStyle: 'rounded',
  cardStyle: 'bordered',
  mode: 'dark',
  enableAnimations: true,
  bgPattern: 'dots'
};

export const initialSEOSettings: SEOSettings = {
  metaTitle: 'Fajar Melfiano | Pelajar SMK & Cloud Computing Enthusiast',
  metaDescription:
    'Portofolio Fajar Melfiano Obese Afoan Toan — pelajar SMK Krian 1 Sidoarjo yang menekuni Linux, otomasi, pengembangan web, dan cloud computing.',
  keywords:
    'Fajar Melfiano, Melfiano, portofolio, SMK Krian 1 Sidoarjo, cloud computing, Linux, Terraform, AWS, web developer Sidoarjo',
  ogImage: '', // TODO: siapkan gambar 1200x630 lalu isi URL-nya
  authorName: 'Fajar Melfiano Obese Afoan Toan',
  canonicalUrl: 'https://www.melfiano.tech',
  googleAnalyticsId: '',
  googleSearchConsoleMeta: '',
  robotsTxt: 'User-agent: *\nAllow: /\nSitemap: https://www.melfiano.tech/sitemap.xml'
};

export const initialSystemSettings: SystemSettings = {
  adminRoute: '/secure-control-panel',
  enableWhatsAppButton: false, // dinyalakan setelah nomor WhatsApp asli diisi
  whatsAppNumber: '',
  whatsAppDefaultMessage:
    'Halo Fajar, saya melihat portofolio Anda dan ingin berdiskusi mengenai sebuah proyek.',
  enableMaintenanceMode: false,
  maintenanceMessage: 'Situs sedang dalam pemeliharaan. Silakan kembali beberapa saat lagi.',
  enableCommandPalette: true,
  enableVisitorCounter: false,
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
  { id: 'sec-org', name: 'Organisasi & Komunitas', key: 'organization', isVisible: false, order: 9 },
  { id: 'sec-trainings', name: 'Pelatihan & Kursus', key: 'trainings', isVisible: false, order: 10 },
  { id: 'sec-publications', name: 'Publikasi & Karya', key: 'publications', isVisible: false, order: 11 },
  { id: 'sec-services', name: 'Layanan Profesional', key: 'services', isVisible: true, order: 12 },
  { id: 'sec-blog', name: 'Artikel & Blog', key: 'blog', isVisible: false, order: 13 },
  { id: 'sec-testimonials', name: 'Testimoni Klien', key: 'testimonials', isVisible: false, order: 14 },
  { id: 'sec-gallery', name: 'Galeri Dokumentasi', key: 'gallery', isVisible: false, order: 15 },
  { id: 'sec-cv', name: 'Pratinjau CV Interaktif', key: 'cv', isVisible: true, order: 16 },
  { id: 'sec-contact', name: 'Formulir Kontak', key: 'contact', isVisible: true, order: 17 }
];

export const initialAuditLogs: AuditLog[] = [];

export const initialAnalytics: AnalyticsSummary = {
  totalVisitors: 0,
  todayVisitors: 0,
  monthlyVisitors: 0,
  cvDownloads: 0,
  totalProjectViews: 0,
  messagesCount: 0,
  deviceBreakdown: { desktop: 0, mobile: 0, tablet: 0 },
  browserBreakdown: { chrome: 0, safari: 0, firefox: 0, edge: 0, other: 0 },
  topVisitedProjects: [],
  topVisitedArticles: [],
  visitorTrend: []
};

export const initialMessages: ContactMessage[] = [];

export const initialSubscribers: Subscriber[] = [];
