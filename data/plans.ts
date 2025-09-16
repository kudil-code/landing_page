import { Check, Star, Zap, Crown } from 'lucide-react';
import { Plan } from '@/types/content';

export const plans: Plan[] = [
  {
    name: "GRATIS",
    price: "0",
    period: "Selamanya",
    description: "Cocok untuk mencoba layanan kami",
    icon: Zap,
    features: [
      "5 tender per hari",
      "Update harian",
      "Email notifikasi",
      "Filter dasar",
      "Support email",
      "Akses 7 hari terakhir"
    ],
    cta: "Mulai Gratis",
    ctaStyle: "bg-gray-600 hover:bg-gray-700",
    popular: false
  },
  {
    name: "PREMIUM",
    price: "200rb",
    period: "3 bulan",
    description: "Solusi terbaik untuk bisnis kecil-menengah",
    icon: Star,
    features: [
      "200+ tender per hari",
      "Update real-time",
      "Filter industri & lokasi",
      "Email & SMS notifikasi",
      "Support WhatsApp",
      "Akses 1 tahun terakhir",
      "Prioritas notifikasi",
      "Export data Excel"
    ],
    cta: "Pilih Premium",
    ctaStyle: "bg-primary hover:bg-primary-dark",
    popular: true
  },
  {
    name: "ENTERPRISE",
    price: "600rb",
    period: "tahun",
    description: "Untuk perusahaan besar dengan kebutuhan khusus",
    icon: Crown,
    features: [
      "Semua fitur Premium",
      "Unlimited tender",
      "API access",
      "Priority support 24/7",
      "Custom reporting",
      "Multi-user account",
      "Advanced analytics",
      "White-label solution",
      "Dedicated account manager"
    ],
    cta: "Kontak Sales",
    ctaStyle: "bg-purple-600 hover:bg-purple-700",
    popular: false
  }
];



