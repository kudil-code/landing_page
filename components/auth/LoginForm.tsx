'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      // Placeholder for actual login API call
      console.log('Login data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard (placeholder)
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Placeholder for Google OAuth
      console.log('Google login');
      router.push('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <AuthForm onSubmit={handleLogin}>
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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {String(form.formState.errors.email?.message || 'Email is required')}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                {...form.register('password')}
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A6FA5] focus:border-transparent transition-colors"
                placeholder="Masukkan password Anda"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
              <p className="mt-1 text-sm text-red-600">
                {String(form.formState.errors.password?.message || 'Password is required')}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#4A6FA5] focus:ring-[#4A6FA5] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Ingat saya
              </label>
            </div>
            <Link
              href="/forgot-password"
              className="text-sm text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors"
            >
              Lupa password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4A6FA5] hover:bg-[#3a5a8a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A6FA5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                <span>Memproses...</span>
              </div>
            ) : (
              'Masuk'
            )}
          </button>

          {/* Social Login */}
          <SocialLogin onGoogleLogin={handleGoogleLogin} disabled={isLoading} />

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link
                href="/register"
                className="font-medium text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>
        </>
      )}
    </AuthForm>
  );
}
