import { BlogPost, BlogCategory } from '@/types/content';

export const blogCategories: BlogCategory[] = [
  { name: 'Tender & Proyek', slug: 'tender-proyek', count: 8 },
  { name: 'Tips & Strategi', slug: 'tips-strategi', count: 6 },
  { name: 'Industri & Sektor', slug: 'industri-sektor', count: 4 },
  { name: 'Teknologi', slug: 'teknologi', count: 3 },
  { name: 'Regulasi', slug: 'regulasi', count: 2 },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'panduan-lengkap-tender-pemerintah-2024',
    title: 'Panduan Lengkap Mengikuti Tender Pemerintah 2024',
    excerpt: 'Pelajari strategi dan tips terbaik untuk memenangkan tender pemerintah dengan peluang sukses yang lebih tinggi. Dari persiapan dokumen hingga strategi pricing.',
    content: 'Artikel lengkap tentang strategi mengikuti tender pemerintah...',
    author: 'Tim TenderPro',
    publishedAt: '2024-01-15',
    readTime: '8 min',
    category: 'Tender & Proyek',
    tags: ['tender', 'pemerintah', 'strategi', 'panduan'],
    image: '/api/placeholder/600/400',
    featured: true
  },
  {
    id: '5-kesalahan-fatal-proposal-tender',
    title: '5 Kesalahan Fatal dalam Pengajuan Proposal Tender',
    excerpt: 'Hindari kesalahan-kesalahan umum yang sering dilakukan peserta tender yang menyebabkan proposal ditolak. Pelajari dari pengalaman para ahli.',
    content: 'Kesalahan-kesalahan yang harus dihindari dalam pengajuan proposal...',
    author: 'Sarah Wijaya',
    publishedAt: '2024-01-12',
    readTime: '6 min',
    category: 'Tips & Strategi',
    tags: ['proposal', 'kesalahan', 'tips', 'tender'],
    image: '/api/placeholder/600/400',
    featured: true
  },
  {
    id: 'analisis-tren-tender-konstruksi-q1-2024',
    title: 'Analisis Tren Tender Konstruksi Q1 2024',
    excerpt: 'Tinjauan mendalam tentang tren dan peluang tender konstruksi di kuartal pertama tahun 2024. Data terbaru dan prediksi pasar.',
    content: 'Analisis mendalam tentang tren tender konstruksi...',
    author: 'Ahmad Rizki',
    publishedAt: '2024-01-10',
    readTime: '10 min',
    category: 'Industri & Sektor',
    tags: ['konstruksi', 'tren', 'analisis', '2024'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'cara-membuat-dokumen-teknis-menarik',
    title: 'Cara Membuat Dokumen Teknis yang Menarik',
    excerpt: 'Panduan step-by-step membuat dokumen teknis yang profesional dan menarik bagi evaluator tender. Template dan contoh yang bisa digunakan.',
    content: 'Panduan lengkap membuat dokumen teknis...',
    author: 'Maria Santoso',
    publishedAt: '2024-01-08',
    readTime: '7 min',
    category: 'Tips & Strategi',
    tags: ['dokumen', 'teknis', 'proposal', 'profesional'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'teknologi-ai-dalam-tender-digital',
    title: 'Teknologi AI dalam Proses Tender Digital',
    excerpt: 'Bagaimana artificial intelligence mengubah landscape tender digital dan meningkatkan efisiensi proses. Inovasi terbaru di industri.',
    content: 'Revolusi AI dalam tender digital...',
    author: 'Dr. Budi Hartono',
    publishedAt: '2024-01-05',
    readTime: '9 min',
    category: 'Teknologi',
    tags: ['AI', 'digital', 'teknologi', 'efisiensi'],
    image: '/api/placeholder/600/400',
    featured: true
  },
  {
    id: 'strategi-pricing-kompetitif-tender',
    title: 'Strategi Pricing yang Kompetitif untuk Tender',
    excerpt: 'Teknik menentukan harga yang kompetitif namun tetap profitable dalam mengikuti tender. Analisis biaya dan margin yang tepat.',
    content: 'Strategi pricing yang efektif...',
    author: 'Lisa Permata',
    publishedAt: '2024-01-03',
    readTime: '5 min',
    category: 'Tips & Strategi',
    tags: ['pricing', 'strategi', 'kompetitif', 'profit'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-sektor-kesehatan-peluang-tantangan',
    title: 'Tender Sektor Kesehatan: Peluang dan Tantangan',
    excerpt: 'Analisis mendalam tentang peluang tender di sektor kesehatan dan tantangan yang dihadapi. Prospek masa depan industri kesehatan.',
    content: 'Peluang tender di sektor kesehatan...',
    author: 'Dr. Rina Sari',
    publishedAt: '2024-01-01',
    readTime: '8 min',
    category: 'Industri & Sektor',
    tags: ['kesehatan', 'sektor', 'peluang', 'tantangan'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'perubahan-regulasi-tender-2024',
    title: 'Perubahan Regulasi Tender 2024 yang Perlu Diketahui',
    excerpt: 'Update terbaru regulasi tender pemerintah yang berlaku mulai tahun 2024 dan dampaknya terhadap industri. Perubahan penting yang harus dipahami.',
    content: 'Perubahan regulasi tender terbaru...',
    author: 'Hukum Tender Indonesia',
    publishedAt: '2023-12-28',
    readTime: '12 min',
    category: 'Regulasi',
    tags: ['regulasi', '2024', 'perubahan', 'hukum'],
    image: '/api/placeholder/600/400',
    featured: true
  },
  {
    id: 'membangun-tim-tender-efektif',
    title: 'Membangun Tim Tender yang Efektif',
    excerpt: 'Tips membentuk dan mengelola tim tender yang solid untuk meningkatkan peluang menang. Struktur tim dan pembagian tugas yang optimal.',
    content: 'Panduan membangun tim tender...',
    author: 'Agus Setiawan',
    publishedAt: '2023-12-25',
    readTime: '6 min',
    category: 'Tips & Strategi',
    tags: ['tim', 'manajemen', 'efektif', 'organisasi'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'blockchain-transparansi-tender',
    title: 'Blockchain untuk Transparansi Tender',
    excerpt: 'Implementasi teknologi blockchain dalam sistem tender untuk meningkatkan transparansi dan kepercayaan. Inovasi teknologi terbaru.',
    content: 'Blockchain dalam tender...',
    author: 'Tech Innovation Lab',
    publishedAt: '2023-12-22',
    readTime: '11 min',
    category: 'Teknologi',
    tags: ['blockchain', 'transparansi', 'teknologi', 'kepercayaan'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-infrastruktur-proyek-besar-2024',
    title: 'Tender Infrastruktur: Proyek Besar 2024',
    excerpt: 'Daftar proyek infrastruktur besar yang akan ditenderkan pada tahun 2024 dan cara mempersiapkannya. Peluang emas untuk kontraktor.',
    content: 'Proyek infrastruktur besar 2024...',
    author: 'Infrastructure Watch',
    publishedAt: '2023-12-20',
    readTime: '9 min',
    category: 'Tender & Proyek',
    tags: ['infrastruktur', 'proyek', 'besar', '2024'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'negosiasi-kontrak-tender-tips-sukses',
    title: 'Negosiasi Kontrak Tender: Tips Sukses',
    excerpt: 'Strategi negosiasi yang efektif dalam tahap kontrak tender untuk mendapatkan kondisi terbaik. Teknik dan tips dari para ahli.',
    content: 'Tips negosiasi kontrak tender...',
    author: 'Negotiation Expert',
    publishedAt: '2023-12-18',
    readTime: '7 min',
    category: 'Tips & Strategi',
    tags: ['negosiasi', 'kontrak', 'strategi', 'sukses'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-sektor-pendidikan-analisis-pasar',
    title: 'Tender Sektor Pendidikan: Analisis Pasar',
    excerpt: 'Tinjauan komprehensif tentang pasar tender di sektor pendidikan dan peluang yang tersedia. Tren dan prospek masa depan.',
    content: 'Analisis tender sektor pendidikan...',
    author: 'Education Market Research',
    publishedAt: '2023-12-15',
    readTime: '8 min',
    category: 'Industri & Sektor',
    tags: ['pendidikan', 'sektor', 'analisis', 'pasar'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'digitalisasi-proses-tender-manfaat-implementasi',
    title: 'Digitalisasi Proses Tender: Manfaat dan Implementasi',
    excerpt: 'Keuntungan digitalisasi proses tender dan langkah-langkah implementasinya di organisasi. Transformasi digital yang efektif.',
    content: 'Digitalisasi proses tender...',
    author: 'Digital Transformation Team',
    publishedAt: '2023-12-12',
    readTime: '10 min',
    category: 'Teknologi',
    tags: ['digitalisasi', 'proses', 'implementasi', 'manfaat'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'manajemen-risiko-proyek-tender',
    title: 'Manajemen Risiko dalam Proyek Tender',
    excerpt: 'Identifikasi dan mitigasi risiko-risiko yang mungkin terjadi dalam proyek tender. Framework dan tools yang bisa digunakan.',
    content: 'Manajemen risiko proyek tender...',
    author: 'Risk Management Consultant',
    publishedAt: '2023-12-10',
    readTime: '9 min',
    category: 'Tips & Strategi',
    tags: ['risiko', 'manajemen', 'proyek', 'mitigasi'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-egovernment-peluang-digital',
    title: 'Tender E-Government: Peluang Digital',
    excerpt: 'Peluang dan tantangan dalam tender proyek e-government dan digitalisasi layanan publik. Prospek teknologi pemerintahan.',
    content: 'Tender e-government...',
    author: 'E-Gov Specialist',
    publishedAt: '2023-12-08',
    readTime: '7 min',
    category: 'Tender & Proyek',
    tags: ['e-government', 'digital', 'layanan', 'publik'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'kpi-metrik-sukses-tender',
    title: 'KPI dan Metrik Sukses dalam Tender',
    excerpt: 'Key Performance Indicators yang tepat untuk mengukur kesuksesan dalam proses tender. Dashboard dan monitoring yang efektif.',
    content: 'KPI dan metrik sukses tender...',
    author: 'Performance Analyst',
    publishedAt: '2023-12-05',
    readTime: '6 min',
    category: 'Tips & Strategi',
    tags: ['KPI', 'metrik', 'sukses', 'pengukuran'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-sektor-energi-terbarukan',
    title: 'Tender Sektor Energi Terbarukan',
    excerpt: 'Peluang besar dalam tender proyek energi terbarukan dan strategi untuk memenangkannya. Green energy dan sustainability.',
    content: 'Tender energi terbarukan...',
    author: 'Renewable Energy Expert',
    publishedAt: '2023-12-03',
    readTime: '8 min',
    category: 'Industri & Sektor',
    tags: ['energi', 'terbarukan', 'sustainability', 'proyek'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'compliance-audit-tender',
    title: 'Compliance dan Audit dalam Tender',
    excerpt: 'Pentingnya compliance dan audit dalam proses tender untuk memastikan transparansi dan akuntabilitas. Best practices industri.',
    content: 'Compliance dan audit tender...',
    author: 'Compliance Officer',
    publishedAt: '2023-12-01',
    readTime: '11 min',
    category: 'Regulasi',
    tags: ['compliance', 'audit', 'transparansi', 'akuntabilitas'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-internasional-peluang-global',
    title: 'Tender Internasional: Peluang Global',
    excerpt: 'Panduan mengikuti tender internasional dan strategi untuk bersaing di pasar global. Ekspansi bisnis ke luar negeri.',
    content: 'Tender internasional...',
    author: 'International Business Consultant',
    publishedAt: '2023-11-28',
    readTime: '12 min',
    category: 'Tender & Proyek',
    tags: ['internasional', 'global', 'ekspor', 'pasar'],
    image: '/api/placeholder/600/400',
    featured: true
  },
  {
    id: 'fintech-tender-inovasi-pembayaran',
    title: 'Fintech dalam Tender: Inovasi Pembayaran',
    excerpt: 'Peran teknologi finansial dalam modernisasi sistem pembayaran tender dan kontrak. Inovasi fintech terbaru.',
    content: 'Fintech dalam tender...',
    author: 'Fintech Innovation',
    publishedAt: '2023-11-25',
    readTime: '9 min',
    category: 'Teknologi',
    tags: ['fintech', 'pembayaran', 'inovasi', 'modernisasi'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-sektor-pertanian-potensi-besar',
    title: 'Tender Sektor Pertanian: Potensi Besar',
    excerpt: 'Analisis peluang tender di sektor pertanian dan agribisnis yang sering terlewatkan. Potensi besar di industri pangan.',
    content: 'Tender sektor pertanian...',
    author: 'Agricultural Business Analyst',
    publishedAt: '2023-11-22',
    readTime: '7 min',
    category: 'Industri & Sektor',
    tags: ['pertanian', 'agribisnis', 'potensi', 'peluang'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'membangun-relasi-pemberi-tender',
    title: 'Membangun Relasi dengan Pemberi Tender',
    excerpt: 'Strategi membangun dan memelihara hubungan baik dengan instansi pemberi tender. Networking yang efektif.',
    content: 'Membangun relasi pemberi tender...',
    author: 'Relationship Manager',
    publishedAt: '2023-11-20',
    readTime: '6 min',
    category: 'Tips & Strategi',
    tags: ['relasi', 'networking', 'hubungan', 'instansi'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'tender-proyek-smart-city',
    title: 'Tender Proyek Smart City',
    excerpt: 'Peluang dalam tender proyek smart city dan teknologi yang dibutuhkan untuk implementasinya. Kota pintar masa depan.',
    content: 'Tender proyek smart city...',
    author: 'Smart City Consultant',
    publishedAt: '2023-11-18',
    readTime: '10 min',
    category: 'Tender & Proyek',
    tags: ['smart city', 'teknologi', 'kota', 'digital'],
    image: '/api/placeholder/600/400',
    featured: false
  },
  {
    id: 'analisis-kompetitor-tender',
    title: 'Analisis Kompetitor dalam Tender',
    excerpt: 'Teknik menganalisis kompetitor dan positioning yang tepat untuk memenangkan tender. Competitive intelligence yang efektif.',
    content: 'Analisis kompetitor tender...',
    author: 'Competitive Intelligence',
    publishedAt: '2023-11-15',
    readTime: '8 min',
    category: 'Tips & Strategi',
    tags: ['kompetitor', 'analisis', 'positioning', 'strategi'],
    image: '/api/placeholder/600/400',
    featured: false
  }
];

// Helper functions
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};

export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};



