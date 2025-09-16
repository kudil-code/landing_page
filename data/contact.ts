import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactInfo } from '@/types/content';

export const contactInfo: ContactInfo[] = [
  {
    icon: Phone,
    title: "Telepon",
    details: ["+62 812-3456-7890", "+62 21-1234-5678"],
    action: "Hubungi Sekarang"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@tenderinformation.id", "support@tenderinformation.id"],
    action: "Kirim Email"
  },
  {
    icon: MapPin,
    title: "Alamat",
    details: ["Jl. Sudirman No. 123", "Jakarta Pusat 10270", "Indonesia"],
    action: "Lihat Peta"
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    details: ["Senin - Jumat: 08:00 - 17:00", "Sabtu: 09:00 - 15:00", "Support 24/7 via WhatsApp"],
    action: "Chat WhatsApp"
  }
];

export const industries = [
  "Konstruksi",
  "Pengadaan Barang", 
  "Elektrikal",
  "IT & Teknologi",
  "Konsultan",
  "Lainnya"
];



