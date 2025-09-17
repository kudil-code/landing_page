'use client';

import { useState } from 'react';
import GoogleIcon from '../ui/GoogleIcon';

interface SocialLoginProps {
  onGoogleLogin?: () => void;
  disabled?: boolean;
}

export default function SocialLogin({ onGoogleLogin, disabled = false }: SocialLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    try {
      // Google OAuth 2.0 implementation
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        throw new Error('Google Client ID not configured');
      }

      // Create Google OAuth URL
      const redirectUri = `${window.location.origin}/auth/google/callback`;
      const scope = 'openid email profile';
      const state = Math.random().toString(36).substring(7);
      
      // Store state for verification
      sessionStorage.setItem('google_oauth_state', state);
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=${encodeURIComponent(scope)}&` +
        `response_type=code&` +
        `state=${state}&` +
        `access_type=offline&` +
        `prompt=consent`;

      // Redirect to Google OAuth
      window.location.href = authUrl;
      
    } catch (error) {
      console.error('Google login error:', error);
      if (onGoogleLogin) {
        await onGoogleLogin();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={disabled || isLoading}
        className="w-full group relative overflow-hidden flex justify-center items-center px-6 py-4 border-2 border-gray-200 rounded-xl bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-100/50 to-gray-50/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        <div className="relative flex items-center justify-center space-x-3">
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600"></div>
              <span>Memproses...</span>
            </>
          ) : (
            <>
              <GoogleIcon className="transition-transform duration-200 group-hover:scale-110" size={20} />
              <span>Lanjutkan dengan Google</span>
            </>
          )}
        </div>
      </button>
    </div>
  );
}

