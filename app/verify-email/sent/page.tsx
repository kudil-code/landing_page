'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';
import AuthLayout from '../../../components/auth/AuthLayout';

export default function VerifyEmailSentPage() {
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // Placeholder for resend email API call
      console.log('Resending verification email');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message or toast
      alert('Email verifikasi telah dikirim ulang');
    } catch (error) {
      console.error('Resend email error:', error);
      alert('Gagal mengirim email verifikasi');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <AuthLayout
      title="Email Verifikasi Terkirim"
      subtitle="Silakan periksa inbox email Anda"
      showBackButton={false}
    >
      <div className="text-center space-y-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Periksa Email Anda
          </h3>
          <p className="text-sm text-gray-600">
            Kami telah mengirimkan email verifikasi ke alamat email yang Anda daftarkan. 
            Silakan periksa inbox atau folder spam Anda.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 text-left">
          <h4 className="font-medium text-blue-900 mb-2">Langkah selanjutnya:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Buka email yang kami kirimkan</li>
            <li>2. Klik link verifikasi di dalam email</li>
            <li>3. Akun Anda akan langsung aktif</li>
            <li>4. Anda dapat login ke dashboard</li>
          </ol>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Mengirim...</span>
              </div>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Kirim Ulang Email</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => router.push('/login')}
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kembali ke Login</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Tidak menerima email? Periksa folder spam atau{' '}
            <button
              onClick={handleResendEmail}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              kirim ulang
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

