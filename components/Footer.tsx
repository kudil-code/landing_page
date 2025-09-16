'use client';

import { 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { name: 'Tentang Kami', href: '#about' },
      { name: 'Tim Kami', href: '#team' },
      { name: 'Karir', href: '#careers' },
      { name: 'Blog', href: '#blog' },
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


  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#4A6FA5] mb-2">
                TenderInformation <span className="text-white">ID</span>
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                200 informasi tender tersedia per hari di meja anda
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, 
                dan elektrikal di Indonesia. Membantu ribuan perusahaan mendapatkan 
                peluang tender yang tepat.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-3 text-[#4A6FA5]" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3 text-[#4A6FA5]" />
                <span>info@tenderinformation.id</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-3 text-[#4A6FA5]" />
                <span>Jl. Sudirman No. 123, Jakarta Pusat</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#4A6FA5] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#4A6FA5] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Dukungan</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#4A6FA5] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#4A6FA5] transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 TenderInformation ID. Semua hak dilindungi undang-undang.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-gray-400">Made with ❤️ in Indonesia</span>
              <button
                onClick={scrollToTop}
                className="flex items-center text-[#4A6FA5] hover:text-[#5a7fb5] transition-colors"
              >
                <ArrowUp className="h-4 w-4 mr-1" />
                Kembali ke Atas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              <span>Data Terpercaya</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🏆</span>
              <span>ISO 27001</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🇮🇩</span>
              <span>Made in Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
