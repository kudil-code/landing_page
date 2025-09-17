'use client';

import { ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import { heroStats, tenderExamples } from '@/data/hero';

export default function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Dapatkan{' '}
              <span className="text-[#4A6FA5]">200+</span>{' '}
              Informasi Tender Setiap Hari
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Platform terlengkap untuk informasi tender konstruksi, pengadaan barang, 
              dan elektrikal di Indonesia. Update real-time dari pemerintah, BUMN & swasta.
            </p>

            {/* Key Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4A6FA5]">{heroStats.daily}</div>
                <div className="text-sm text-gray-600">Tender/Hari</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4A6FA5]">{heroStats.database}</div>
                <div className="text-sm text-gray-600">Database</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4A6FA5]">{heroStats.update}</div>
                <div className="text-sm text-gray-600">Update</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#pricing"
                className="bg-[#4A6FA5] text-white px-8 py-4 rounded-lg hover:bg-[#3a5a8a] transition-colors font-medium text-lg flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Mulai Gratis Sekarang</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#features"
                className="border-2 border-[#4A6FA5] text-[#4A6FA5] px-8 py-4 rounded-lg hover:bg-[#D3D3D3] transition-colors font-medium text-lg"
              >
                Lihat Fitur
              </a>
              <a
                href="/login"
                className="bg-[#D3D3D3] text-[#4A6FA5] px-8 py-4 rounded-lg hover:bg-[#b8b8b8] transition-colors font-medium text-lg"
              >
                Masuk Dashboard
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Gratis 5 tender/hari</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Tanpa kontrak</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Setup 5 menit</span>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tender Hari Ini
                  </h3>
                  <div className="flex items-center space-x-2 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">+200</span>
                  </div>
                </div>

                {/* Tender List Preview */}
                <div className="space-y-4">
                  {tenderExamples.map((tender, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900 text-sm leading-tight">
                          {tender.title}
                        </h4>
                        <span className="text-xs text-[#4A6FA5] bg-[#D3D3D3] px-2 py-1 rounded">
                          {tender.type}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-600">
                        <span className="font-medium text-green-600">{tender.value}</span>
                        <span>Deadline: {tender.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium text-sm">
                    Lihat Semua Tender →
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              Real-time Update
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#4A6FA5] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              200+ Tender/Hari
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
