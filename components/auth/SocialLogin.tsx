'use client';

import { useState } from 'react';
import { Chrome } from 'lucide-react';

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
      // Placeholder for Google OAuth integration
      console.log('Google login clicked');
      if (onGoogleLogin) {
        await onGoogleLogin();
      }
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">atau</span>
        </div>
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={disabled || isLoading}
        className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
        ) : (
          <>
            <Chrome className="h-5 w-5 mr-2" />
            <span>Lanjutkan dengan Google</span>
          </>
        )}
      </button>
    </div>
  );
}

