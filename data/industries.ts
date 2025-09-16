import { Building, Package, Zap, TrendingUp, Users } from 'lucide-react';
import { Industry, Source } from '@/types/content';

export const industries: Industry[] = [
  {
    icon: Building,
    title: "Konstruksi",
    description: "Gedung, Jalan, Infrastruktur",
    examples: [
      "Pembangunan gedung kantor",
      "Konstruksi jalan dan jembatan",
      "Infrastruktur publik",
      "Renovasi dan perbaikan"
    ],
    stats: "45% dari total tender",
    color: "blue"
  },
  {
    icon: Package,
    title: "Pengadaan Barang",
    description: "Valve, Pompa, Komputer, dll",
    examples: [
      "Peralatan kantor dan IT",
      "Mesin dan peralatan industri",
      "Kendaraan dan transportasi",
      "Material dan suku cadang"
    ],
    stats: "35% dari total tender",
    color: "green"
  },
  {
    icon: Zap,
    title: "Elektrikal",
    description: "Instalasi, Maintenance, Equipment",
    examples: [
      "Instalasi listrik gedung",
      "Maintenance sistem elektrikal",
      "Peralatan elektronik",
      "Sistem keamanan dan CCTV"
    ],
    stats: "20% dari total tender",
    color: "yellow"
  }
];

export const sources: Source[] = [
  {
    icon: Building,
    title: "Pemerintah",
    description: "Kementerian, Pemda, Instansi",
    count: "60%",
    examples: ["Kementerian PUPR", "Pemprov DKI Jakarta", "Bappenas", "Kementerian Kesehatan"]
  },
  {
    icon: Users,
    title: "BUMN",
    description: "PLN, Telkom, Pertamina, dll",
    count: "25%",
    examples: ["PLN", "Telkom Indonesia", "Pertamina", "Bank Mandiri"]
  },
  {
    icon: TrendingUp,
    title: "Swasta",
    description: "Perusahaan besar Indonesia",
    count: "15%",
    examples: ["Astra Group", "Sinar Mas", "Lippo Group", "Salim Group"]
  }
];



