'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link 
              href="/" 
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              TenderInformation <span className="text-blue-800">ID</span>
            </Link>
            
            {showBackButton && (
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Beranda</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Title Section */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {children}
          </div>

          {/* Footer Links */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Dengan melanjutkan, Anda menyetujui{' '}
              <Link href="#terms" className="text-blue-600 hover:text-blue-700">
                Syarat & Ketentuan
              </Link>{' '}
              dan{' '}
              <Link href="#privacy" className="text-blue-600 hover:text-blue-700">
                Kebijakan Privasi
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

