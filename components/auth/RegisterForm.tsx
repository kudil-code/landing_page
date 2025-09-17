'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      // Placeholder for actual registration API call
      console.log('Registration data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to verification page
      router.push('/verify-email/sent');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      // Placeholder for Google registration
      console.log('Google registration');
    } catch (error) {
      console.error('Google registration error:', error);
    }
  };

  return (
    <AuthForm onSubmit={handleRegister}>
      {(form: UseFormReturn<FieldValues>) => (
        <div className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-3">
              Nama Lengkap *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('fullName', { required: 'Nama lengkap harus diisi' })}
                type="text"
                id="fullName"
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5] transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Masukkan nama lengkap"
              />
            </div>
            {form.formState.errors.fullName && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {String(form.formState.errors.fullName?.message || 'Nama lengkap harus diisi')}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-3">
              Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('email', { 
                  required: 'Email harus diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format email tidak valid'
                  }
                })}
                type="email"
                id="email"
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5] transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Masukkan email Anda"
              />
            </div>
            {form.formState.errors.email && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {String(form.formState.errors.email?.message || 'Email harus diisi')}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-3">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('password', { 
                  required: 'Password harus diisi',
                  minLength: {
                    value: 8,
                    message: 'Password minimal 8 karakter'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="block w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5] transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Masukkan password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {String(form.formState.errors.password?.message || 'Password harus diisi')}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-3">
              Konfirmasi Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('confirmPassword', { 
                  required: 'Konfirmasi password harus diisi',
                  validate: (value) => value === form.getValues('password') || 'Password tidak sama'
                })}
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="block w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A6FA5] focus:border-[#4A6FA5] transition-all duration-200 bg-gray-50 focus:bg-white"
                placeholder="Konfirmasi password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-100 rounded-r-xl transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {String(form.formState.errors.confirmPassword?.message || 'Konfirmasi password harus diisi')}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="pt-2">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <input
                  {...form.register('termsAccepted', { required: 'Anda harus menyetujui syarat dan ketentuan' })}
                  id="termsAccepted"
                  type="checkbox"
                  className="w-5 h-5 text-[#4A6FA5] bg-gray-100 border-2 border-gray-300 rounded focus:ring-[#4A6FA5] focus:ring-2 cursor-pointer"
                />
              </div>
              <label htmlFor="termsAccepted" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                Saya menyetujui{' '}
                <Link href="#terms" className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium underline">
                  Syarat & Ketentuan
                </Link>{' '}
                dan{' '}
                <Link href="#privacy" className="text-[#4A6FA5] hover:text-[#3a5a8a] font-medium underline">
                  Kebijakan Privasi
                </Link>
              </label>
            </div>
            {form.formState.errors.termsAccepted && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                {String(form.formState.errors.termsAccepted?.message || 'Anda harus menyetujui syarat dan ketentuan')}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white bg-gradient-to-r from-[#4A6FA5] to-[#3a5a8a] hover:from-[#3a5a8a] hover:to-[#2d4a73] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6FA5] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                <span>Mendaftar...</span>
              </div>
            ) : (
              'Daftar Sekarang'
            )}
          </button>

          {/* Divider */}
          <div className="relative pt-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Atau daftar dengan</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="pt-2">
            <SocialLogin onGoogleLogin={handleGoogleRegister} />
          </div>
        </div>
      )}
    </AuthForm>
  );
}