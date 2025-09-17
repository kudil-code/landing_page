'use client';

import { features } from '@/data/features';

export default function Features() {
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
