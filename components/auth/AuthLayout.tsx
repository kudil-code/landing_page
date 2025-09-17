'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { ToastContainer, useToast } from '../ui/Toast';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
}

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  showBackButton = true 
}: AuthLayoutProps) {
  const { toasts, removeToast } = useToast();

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 h-16">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-gradient-to-r from-[#4A6FA5] to-[#3a5a8a] bg-clip-text text-transparent hover:from-[#3a5a8a] hover:to-[#2d4a73] transition-all duration-300"
            >
              TenderInformation <span className="text-[#4A6FA5]">ID</span>
            </Link>
            
            {showBackButton && (
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-[#4A6FA5] transition-all duration-200 group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                <span className="hidden sm:inline">Kembali ke Beranda</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Centered Layout */}
      <main className="flex min-h-screen justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="w-full max-w-md flex flex-col justify-center">
          {/* Title Section */}
          <div className="text-center mb-8 mt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            {subtitle && (
              <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#4A6FA5]/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#3a5a8a]/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>
              Dengan melanjutkan, Anda menyetujui{' '}
              <Link href="#terms" className="text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors font-medium">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="#privacy" className="text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors font-medium">
                Kebijakan Privasi
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

