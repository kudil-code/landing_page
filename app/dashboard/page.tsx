'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Settings, LogOut, TrendingUp, FileText, Bell } from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Placeholder for logout API call
      console.log('Logging out...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                TenderInformation <span className="text-blue-800">ID</span>
              </Link>
              <span className="text-sm text-gray-500">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Link
              href="/"
              className="flex items-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali ke Beranda
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang di Dashboard!
          </h1>
          <p className="text-gray-600">
            Ini adalah halaman dashboard placeholder. Dashboard yang sebenarnya akan dibuat terpisah dan diintegrasikan nanti.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tender Hari Ini</p>
                <p className="text-2xl font-bold text-gray-900">247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Database</p>
                <p className="text-2xl font-bold text-gray-900">10,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Akun Aktif</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Dashboard Sedang Dalam Pengembangan
            </h3>
            
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Dashboard yang lengkap dengan fitur-fitur canggih sedang dalam tahap pengembangan. 
              Sistem authentication yang Anda lihat sekarang sudah siap untuk diintegrasikan dengan 
              dashboard yang akan datang.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="text-left p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">✅ Yang Sudah Selesai:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Sistem Authentication Frontend</li>
                  <li>• Form Validation dengan Zod</li>
                  <li>• Responsive Design</li>
                  <li>• Modular Components</li>
                </ul>
              </div>
              
              <div className="text-left p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">🚧 Yang Akan Dibuat:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dashboard Interface</li>
                  <li>• Backend API</li>
                  <li>• Database Integration</li>
                  <li>• Real-time Updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

