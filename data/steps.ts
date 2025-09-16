import { UserPlus, Filter, Bell, TrendingUp } from 'lucide-react';
import { Step } from '@/types/content';

export const steps: Step[] = [
  {
    step: "01",
    icon: UserPlus,
    title: "Daftar Gratis",
    description: "Buat akun dalam 2 menit. Tidak perlu kartu kredit untuk memulai.",
    details: [
      "Isi form pendaftaran sederhana",
      "Verifikasi email Anda",
      "Akses langsung ke dashboard"
    ]
  },
  {
    step: "02", 
    icon: Filter,
    title: "Atur Preferensi",
    description: "Tentukan industri, lokasi, dan kriteria tender yang Anda inginkan.",
    details: [
      "Pilih industri (Konstruksi, Pengadaan, Elektrikal)",
      "Tentukan lokasi geografis",
      "Set nilai tender minimum/maksimum"
    ]
  },
  {
    step: "03",
    icon: Bell,
    title: "Terima Notifikasi",
    description: "Dapatkan notifikasi real-time via email atau SMS untuk tender yang sesuai.",
    details: [
      "Notifikasi langsung saat ada tender baru",
      "Filter otomatis berdasarkan preferensi",
      "Prioritas berdasarkan relevansi"
    ]
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Menangkan Tender",
    description: "Gunakan informasi lengkap untuk mempersiapkan proposal yang kompetitif.",
    details: [
      "Akses detail lengkap tender",
      "Download dokumen tender",
      "Timeline dan deadline yang jelas"
    ]
  }
];



