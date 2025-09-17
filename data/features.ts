import { 
  TrendingUp, 
  Clock, 
  Filter, 
  Bell, 
  Database, 
  Shield,
  Globe,
  Users,
  Zap,
  LucideIcon
} from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: TrendingUp,
    title: "200+ Tender Baru Setiap Hari",
    description: "Update harian dengan 200+ informasi tender terbaru dari berbagai sumber terpercaya di Indonesia."
  },
  {
    icon: Clock,
    title: "Update Real-time",
    description: "Informasi tender terupdate langsung dari pemerintah, BUMN, dan perusahaan swasta secara real-time."
  },
  {
    icon: Filter,
    title: "Filter Berdasarkan Industri & Lokasi",
    description: "Temukan tender yang sesuai dengan industri dan lokasi Anda. Filter cerdas untuk efisiensi maksimal."
  },
  {
    icon: Bell,
    title: "Notifikasi Email & SMS",
    description: "Dapatkan notifikasi langsung via email dan SMS untuk tender yang sesuai dengan kriteria Anda."
  },
  {
    icon: Database,
    title: "Database Lengkap 10.000+ Tender",
    description: "Akses database terlengkap dengan 10.000+ tender dari berbagai sumber terpercaya di Indonesia."
  },
  {
    icon: Shield,
    title: "Data Terpercaya & Akurat",
    description: "Semua informasi tender diverifikasi dan dijamin keakuratannya dari sumber resmi."
  },
  {
    icon: Globe,
    title: "Coverage Nasional",
    description: "Mencakup seluruh Indonesia dari Sabang sampai Merauke dengan fokus pada semua provinsi."
  },
  {
    icon: Users,
    title: "Support Tim Profesional",
    description: "Tim support berpengalaman siap membantu 24/7 untuk memastikan kesuksesan bisnis Anda."
  },
  {
    icon: Zap,
    title: "Setup Cepat 5 Menit",
    description: "Dapatkan akses ke platform dalam waktu kurang dari 5 menit. Tidak perlu setup rumit."
  }
];
