'use client';

import { 
  TrendingUp, 
  Clock, 
  Filter, 
  Bell, 
  Database, 
  Shield,
  Globe,
  Users,
  Zap
} from 'lucide-react';

export default function Features() {
  const features = [
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

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mengapa Pilih TenderInformation ID?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform terlengkap dengan fitur-fitur canggih yang dirancang khusus 
            untuk membantu bisnis Anda mendapatkan tender yang tepat.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#4A6FA5] transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#D3D3D3] rounded-lg flex items-center justify-center group-hover:bg-[#4A6FA5] transition-colors">
                      <IconComponent className="h-6 w-6 text-[#4A6FA5] group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Siap Memulai Perjalanan Tender Anda?
            </h3>
            <p className="text-gray-600 mb-6">
              Bergabunglah dengan ribuan perusahaan yang sudah mempercayai TenderInformation ID
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mulai Sekarang - Gratis
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
