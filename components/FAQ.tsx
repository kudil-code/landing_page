'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Apa itu TenderInformation ID?",
      answer: "TenderInformation ID adalah platform terlengkap untuk informasi tender di Indonesia. Kami menyediakan 200+ informasi tender baru setiap hari dari pemerintah, BUMN, dan perusahaan swasta untuk membantu bisnis Anda mendapatkan peluang tender yang tepat."
    },
    {
      question: "Berapa harga layanan TenderInformation ID?",
      answer: "Kami menyediakan 3 paket: GRATIS (5 tender/hari), PREMIUM (Rp 200rb/3 bulan untuk 200+ tender/hari), dan ENTERPRISE (Rp 600rb/tahun dengan fitur unlimited). Anda bisa mulai gratis tanpa kartu kredit."
    },
    {
      question: "Industri apa saja yang dicakup?",
      answer: "Kami fokus pada 3 industri utama: Konstruksi (45% dari total tender), Pengadaan Barang (35%), dan Elektrikal (20%). Coverage meliputi gedung, jalan, infrastruktur, peralatan kantor, mesin industri, instalasi listrik, dan lainnya."
    },
    {
      question: "Dari mana sumber informasi tender?",
      answer: "Informasi tender kami berasal dari 3 sumber utama: Pemerintah (60% - Kementerian, Pemda, Instansi), BUMN (25% - PLN, Telkom, Pertamina, dll), dan Swasta (15% - perusahaan besar Indonesia). Semua data diverifikasi dari sumber resmi."
    },
    {
      question: "Bagaimana cara mendapatkan notifikasi tender?",
      answer: "Anda bisa menerima notifikasi via email dan SMS berdasarkan preferensi yang Anda atur. Filter otomatis akan mengirimkan notifikasi hanya untuk tender yang sesuai dengan industri, lokasi, dan nilai tender yang Anda inginkan."
    },
    {
      question: "Apakah ada jaminan keakuratan data?",
      answer: "Ya, kami menjamin keakuratan data dengan sistem verifikasi 3 tingkat. Semua informasi tender diverifikasi dari sumber resmi dan diupdate secara real-time. Tim kami memantau perubahan dan update setiap hari."
    },
    {
      question: "Bisakah saya membatalkan langganan kapan saja?",
      answer: "Tentu! Tidak ada kontrak jangka panjang. Anda bisa membatalkan langganan kapan saja tanpa biaya tambahan. Untuk paket premium, Anda tetap bisa mengakses layanan hingga masa berlangganan habis."
    },
    {
      question: "Bagaimana cara upgrade dari paket gratis?",
      answer: "Upgrade sangat mudah! Cukup masuk ke dashboard Anda, pilih paket yang diinginkan, dan lakukan pembayaran. Akses fitur premium akan aktif secara otomatis. Tidak perlu setup ulang atau kehilangan data."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xl text-gray-600">
            Temukan jawaban untuk pertanyaan umum tentang layanan TenderInformation ID
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#4A6FA5] flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Masih Ada Pertanyaan?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim support kami siap membantu menjawab semua pertanyaan Anda. 
              Hubungi kami sekarang untuk konsultasi gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6281234567890"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat WhatsApp
              </a>
              <a
                href="mailto:info@tenderinformation.id"
                className="inline-flex items-center px-6 py-3 border-2 border-[#4A6FA5] text-[#4A6FA5] font-medium rounded-lg hover:bg-[#D3D3D3] transition-colors"
              >
                Email Support
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Respon rata-rata dalam 5 menit • Tersedia 24/7
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
