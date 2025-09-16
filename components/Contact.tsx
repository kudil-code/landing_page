'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    industry: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Terima kasih! Pesan Anda telah dikirim. Tim kami akan menghubungi Anda dalam 24 jam.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          industry: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
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

  const industries = [
    "Konstruksi",
    "Pengadaan Barang", 
    "Elektrikal",
    "IT & Teknologi",
    "Konsultan",
    "Lainnya"
  ];

  return (
    <section id="contact" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Siap membantu bisnis Anda mendapatkan tender yang tepat. 
            Tim profesional kami siap memberikan konsultasi gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Kirim Pesan
            </h3>

            {/* Status Message */}
            {submitStatus !== 'idle' && (
              <div className={`mb-6 p-4 rounded-lg flex items-center ${
                submitStatus === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                )}
                <span className="text-sm">{submitMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent placeholder:text-gray-500 placeholder:opacity-75"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent placeholder:text-gray-500 placeholder:opacity-75"
                    placeholder="nama@perusahaan.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent placeholder:text-gray-500 placeholder:opacity-75"
                    placeholder="PT. Nama Perusahaan"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent placeholder:text-gray-500 placeholder:opacity-75"
                    placeholder="+62 812-3456-7890"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                  Industri
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="" className="text-gray-500">Pilih industri</option>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 placeholder:opacity-75"
                  placeholder="Ceritakan kebutuhan tender Anda..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4A6FA5] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#3a5a8a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#D3D3D3] rounded-lg flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-[#4A6FA5]" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h4>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-gray-600">
                              {detail}
                            </p>
                          ))}
                        </div>
                        <button className="mt-2 text-[#4A6FA5] hover:text-[#3a5a8a] font-medium text-sm">
                          {info.action}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#D3D3D3] rounded-xl p-6 border border-[#b8b8b8]">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Butuh Bantuan Cepat?
              </h4>
              <p className="text-gray-600 mb-4">
                Tim support kami tersedia 24/7 untuk membantu Anda. 
                Dapatkan respons dalam 5 menit.
              </p>
              <div className="space-y-3">
                <a
                  href="https://wa.me/6281234567890"
                  className="flex items-center justify-center w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat WhatsApp
                </a>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center justify-center w-full border-2 border-[#4A6FA5] text-[#4A6FA5] py-3 px-4 rounded-lg font-medium hover:bg-[#D3D3D3] transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Telepon Sekarang
                </a>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Jam Operasional
              </h4>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Senin - Jumat:</span>
                  <span>08:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sabtu:</span>
                  <span>09:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Minggu:</span>
                  <span>Tutup</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between text-green-600">
                    <span>Support 24/7:</span>
                    <span>WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
