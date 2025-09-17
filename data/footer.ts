export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinks {
  company: FooterLink[];
  services: FooterLink[];
  support: FooterLink[];
  legal: FooterLink[];
}

export const footerLinks: FooterLinks = {
  company: [
    { name: 'Tentang Kami', href: '#about' },
    { name: 'Tim Kami', href: '#team' },
    { name: 'Karir', href: '#careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press Kit', href: '#press' }
  ],
  services: [
    { name: 'Tender Konstruksi', href: '#construction' },
    { name: 'Pengadaan Barang', href: '#procurement' },
    { name: 'Tender Elektrikal', href: '#electrical' },
    { name: 'Analisis Tender', href: '#analysis' },
    { name: 'Konsultasi', href: '#consultation' }
  ],
  support: [
    { name: 'Pusat Bantuan', href: '#help' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontak', href: '#contact' },
    { name: 'Login', href: '/login' },
    { name: 'Status Layanan', href: '#status' },
    { name: 'API Documentation', href: '#api' }
  ],
  legal: [
    { name: 'Syarat & Ketentuan', href: '#terms' },
    { name: 'Kebijakan Privasi', href: '#privacy' },
    { name: 'Kebijakan Cookie', href: '#cookies' },
    { name: 'Disclaimer', href: '#disclaimer' },
    { name: 'GDPR', href: '#gdpr' }
  ]
};
