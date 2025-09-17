'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Memproses login Google...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');

        // Check for OAuth error
        if (error) {
          setStatus('error');
          setMessage('Login Google dibatalkan atau gagal');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Verify state parameter
        const storedState = sessionStorage.getItem('google_oauth_state');
        if (!state || state !== storedState) {
          setStatus('error');
          setMessage('State parameter tidak valid');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Clear stored state
        sessionStorage.removeItem('google_oauth_state');

        if (!code) {
          setStatus('error');
          setMessage('Authorization code tidak ditemukan');
          setTimeout(() => router.push('/login'), 3000);
          return;
        }

        // Exchange code for tokens (this would be done on your backend)
        const response = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, state }),
        });

        if (!response.ok) {
          throw new Error('Failed to exchange code for tokens');
        }

        const data = await response.json();

        // Store user data (in a real app, you'd store JWT tokens)
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          setStatus('success');
          setMessage('Login berhasil! Mengalihkan ke dashboard...');
          setTimeout(() => router.push('/dashboard'), 2000);
        } else {
          throw new Error('User data not received');
        }

      } catch (error) {
        console.error('Google callback error:', error);
        setStatus('error');
        setMessage('Terjadi kesalahan saat memproses login Google');
        setTimeout(() => router.push('/login'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Memproses Login</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Login Berhasil!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Login Gagal</h2>
            <p className="text-gray-600">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Kembali ke Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}



