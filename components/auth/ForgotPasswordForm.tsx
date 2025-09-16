'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import AuthForm from './AuthForm';

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      // Placeholder for actual forgot password API call
      console.log('Forgot password data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEmailSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <Mail className="h-6 w-6 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Email Terkirim!
          </h3>
          <p className="text-sm text-gray-600">
            Kami telah mengirimkan link reset password ke email Anda. 
            Silakan periksa inbox atau folder spam.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setIsEmailSent(false)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Kirim Ulang Email
          </button>
          
          <Link
            href="/login"
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AuthForm onSubmit={handleForgotPassword}>
      {(form: UseFormReturn<FieldValues>) => (
        <>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('email')}
                type="email"
                id="email"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {String(form.formState.errors.email?.message || 'Email is required')}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Mengirim...</span>
              </div>
            ) : (
              'Kirim Link Reset Password'
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Kembali ke Login
            </Link>
          </div>
        </>
      )}
    </AuthForm>
  );
}
