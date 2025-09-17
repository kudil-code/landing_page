export interface TenderExample {
  title: string;
  value: string;
  type: string;
  deadline: string;
}

export interface HeroStats {
  daily: string;
  database: string;
  update: string;
}

export const heroStats: HeroStats = {
  daily: "200+",
  database: "10.000+",
  update: "24/7"
};

export const tenderExamples: TenderExample[] = [
  {
    title: "Pembangunan Gedung Kantor Pemda Jakarta",
    value: "Rp 5.2 Miliar",
    type: "Konstruksi",
    deadline: "15 Jan 2024"
  },
  {
    title: "Pengadaan Peralatan Komputer Kantor",
    value: "Rp 850 Juta",
    type: "Pengadaan",
    deadline: "20 Jan 2024"
  },
  {
    title: "Instalasi Sistem Elektrikal Gedung",
    value: "Rp 2.1 Miliar",
    type: "Elektrikal",
    deadline: "25 Jan 2024"
  }
];
