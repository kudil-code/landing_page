'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);

  const quickMessages = [
    "Saya ingin konsultasi gratis",
    "Bagaimana cara mendaftar?",
    "Saya butuh info paket Premium",
    "Ada pertanyaan tentang tender"
  ];

  const handleQuickMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Preview */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">TenderInformation ID</h4>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600">
                Halo! Ada yang bisa kami bantu? Pilih pesan cepat atau tulis pesan Anda.
              </p>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-gray-500">Pesan Cepat:</p>
              {quickMessages.map((message, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(message)}
                  className="w-full text-left p-2 text-sm bg-[#D3D3D3] text-[#4A6FA5] rounded-lg hover:bg-[#b8b8b8] transition-colors"
                >
                  {message}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors"
            >
              Buka WhatsApp
            </button>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Chat WhatsApp"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>
      </div>
    </>
  );
}
