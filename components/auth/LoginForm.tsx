'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Shield, Loader2, CheckCircle } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginFormData } from '../../lib/validations';
import { useRateLimit, formatTime } from '../../lib/hooks/useRateLimit';
import { useRememberMe } from '../../lib/hooks/useRememberMe';
import { useToast } from '../ui/Toast';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';
import ToggleSwitch from '../ui/ToggleSwitch';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();
  const { success, error: showError } = useToast();
  const { saveRememberMe, getRememberedEmail, isRemembered } = useRememberMe();
  
  // Rate limiting: 5 attempts per 15 minutes, block for 5 minutes
  const { checkRateLimit, recordAttempt, isBlocked, remainingTime } = useRateLimit({
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 5 * 60 * 1000, // 5 minutes
  });

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: getRememberedEmail(),
    },
  });

  // Set remember me state from saved data - DISABLED FOR TESTING
  // useEffect(() => {
  //   setRememberMe(isRemembered());
  // }, [isRemembered]);


  const handleLogin = async (data: LoginFormData) => {
    // Check rate limit first
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setError(`Terlalu banyak percobaan login. Coba lagi dalam ${formatTime(rateLimitCheck.remainingTime)}`);
      showError('Login Diblokir', `Terlalu banyak percobaan login. Coba lagi dalam ${formatTime(rateLimitCheck.remainingTime)}`);
      return;
    }


    setIsLoading(true);
    setError(null);
    
    try {
      // Record the attempt
      recordAttempt();
      
      // Placeholder for actual login API call
      console.log('Login data:', data);
      
      // Simulate API call with potential error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random error for demo
          if (Math.random() < 0.3) {
            reject(new Error('Email atau password salah'));
          } else {
            resolve(true);
          }
        }, 1000);
      });
      
      // Store remember me preference
      saveRememberMe(data.email, rememberMe);
      
      // Show success message
      success('Login Berhasil', 'Selamat datang kembali!');
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat login';
      setError(errorMessage);
      showError('Login Gagal', errorMessage);
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
    <div className="space-y-6">
      {/* Rate Limit Warning */}
      {isBlocked && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 animate-pulse">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <Shield className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-800 mb-1">Akses Dibatasi</h4>
            <p className="text-sm text-amber-700">
              Terlalu banyak percobaan login. Coba lagi dalam {formatTime(remainingTime)}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && !isBlocked && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 flex items-start space-x-3 animate-fade-in-up">
          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="h-4 w-4 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-red-800 mb-1">Login Gagal</h4>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className={`h-5 w-5 transition-colors duration-200 ${
                form.formState.errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#4A6FA5]'
              }`} />
            </div>
            <input
              {...form.register('email')}
              type="email"
              id="email"
              autoComplete="email"
              className={`block w-full pl-12 pr-4 py-4 border-2 rounded-2xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#4A6FA5]/20 focus:border-[#4A6FA5] transition-all duration-200 placeholder:text-gray-400 text-gray-900 ${
                form.formState.errors.email 
                  ? 'border-red-300 bg-red-50/50 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Masukkan email Anda"
              aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
            />
          </div>
          {form.formState.errors.email && (
            <p id="email-error" className="mt-2 text-sm text-red-600 flex items-center space-x-1" role="alert">
              <AlertCircle className="h-4 w-4" />
              <span>{form.formState.errors.email.message}</span>
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className={`h-5 w-5 transition-colors duration-200 ${
                form.formState.errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#4A6FA5]'
              }`} />
            </div>
            <input
              {...form.register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              className={`block w-full pl-12 pr-14 py-4 border-2 rounded-2xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#4A6FA5]/20 focus:border-[#4A6FA5] transition-all duration-200 placeholder:text-gray-400 text-gray-900 ${
                form.formState.errors.password 
                  ? 'border-red-300 bg-red-50/50 focus:ring-red-500/20 focus:border-red-500' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              placeholder="Masukkan password Anda"
              aria-describedby={form.formState.errors.password ? 'password-error' : undefined}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-4 flex items-center group/eye"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-[#4A6FA5] transition-colors duration-200" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-[#4A6FA5] transition-colors duration-200" />
              )}
            </button>
          </div>
          {form.formState.errors.password && (
            <p id="password-error" className="mt-2 text-sm text-red-600 flex items-center space-x-1" role="alert">
              <AlertCircle className="h-4 w-4" />
              <span>{form.formState.errors.password.message}</span>
            </p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <ToggleSwitch
            checked={rememberMe}
            onChange={setRememberMe}
            label="Ingat saya"
            id="remember-me"
          />
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors duration-200 hover:underline"
          >
            Lupa password?
          </Link>
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !form.formState.isValid || isBlocked}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-[#4A6FA5] to-[#3a5a8a] hover:from-[#3a5a8a] hover:to-[#2d4a73] text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#4A6FA5]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 disabled:hover:translate-y-0"
          aria-describedby={!form.formState.isValid ? 'form-errors' : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="relative flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Memproses...</span>
              </>
            ) : isBlocked ? (
              <>
                <Shield className="h-5 w-5" />
                <span>Coba lagi dalam {formatTime(remainingTime)}</span>
              </>
            ) : (
              <>
                <span>Masuk ke Akun</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </>
            )}
          </div>
        </button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">atau</span>
        </div>
      </div>

      {/* Social Login */}
      <SocialLogin onGoogleLogin={handleGoogleLogin} disabled={isLoading} />

      {/* Register Link */}
      <div className="text-center pt-4">
        <p className="text-gray-600">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="font-semibold text-[#4A6FA5] hover:text-[#3a5a8a] transition-colors duration-200 hover:underline"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
