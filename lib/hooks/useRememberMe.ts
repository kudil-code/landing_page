'use client';

import { useState, useEffect } from 'react';

interface RememberMeData {
  email: string;
  rememberMe: boolean;
  timestamp: number;
}

const REMEMBER_ME_KEY = 'rememberMeData';
const REMEMBER_ME_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export function useRememberMe() {
  const [rememberMeData, setRememberMeData] = useState<RememberMeData | null>(null);

  useEffect(() => {
    // Load remembered data on mount
    const savedData = localStorage.getItem(REMEMBER_ME_KEY);
    if (savedData) {
      try {
        const parsed: RememberMeData = JSON.parse(savedData);
        const now = Date.now();
        
        // Check if data is still valid (not expired)
        if (now - parsed.timestamp < REMEMBER_ME_DURATION) {
          setRememberMeData(parsed);
        } else {
          // Remove expired data
          localStorage.removeItem(REMEMBER_ME_KEY);
        }
      } catch (error) {
        console.error('Error parsing remember me data:', error);
        localStorage.removeItem(REMEMBER_ME_KEY);
      }
    }
  }, []);

  const saveRememberMe = (email: string, rememberMe: boolean) => {
    if (rememberMe) {
      const data: RememberMeData = {
        email,
        rememberMe,
        timestamp: Date.now(),
      };
      localStorage.setItem(REMEMBER_ME_KEY, JSON.stringify(data));
      setRememberMeData(data);
    } else {
      localStorage.removeItem(REMEMBER_ME_KEY);
      setRememberMeData(null);
    }
  };

  const clearRememberMe = () => {
    localStorage.removeItem(REMEMBER_ME_KEY);
    setRememberMeData(null);
  };

  const getRememberedEmail = (): string => {
    return rememberMeData?.email || '';
  };

  const isRemembered = (): boolean => {
    return rememberMeData?.rememberMe || false;
  };

  return {
    rememberMeData,
    saveRememberMe,
    clearRememberMe,
    getRememberedEmail,
    isRemembered,
  };
}




