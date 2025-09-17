'use client';

import { useState, useCallback, useRef } from 'react';

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitState {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  blockUntil?: number;
}

export function useRateLimit(options: RateLimitOptions) {
  const { maxAttempts, windowMs, blockDurationMs = 300000 } = options; // Default 5 minutes block
  const stateRef = useRef<RateLimitState>({
    attempts: 0,
    lastAttempt: 0,
    isBlocked: false,
  });

  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const state = stateRef.current;

    // Check if we're still in the block period
    if (state.isBlocked && state.blockUntil && now < state.blockUntil) {
      const remaining = Math.ceil((state.blockUntil - now) / 1000);
      setRemainingTime(remaining);
      setIsBlocked(true);
      return { allowed: false, remainingTime: remaining };
    }

    // Reset block if time has passed
    if (state.isBlocked && state.blockUntil && now >= state.blockUntil) {
      state.isBlocked = false;
      state.attempts = 0;
      state.blockUntil = undefined;
      setIsBlocked(false);
      setRemainingTime(0);
    }

    // Check if we're within the time window
    if (now - state.lastAttempt > windowMs) {
      // Reset attempts if outside the window
      state.attempts = 0;
    }

    // Check if we've exceeded the limit
    if (state.attempts >= maxAttempts) {
      state.isBlocked = true;
      state.blockUntil = now + blockDurationMs;
      setIsBlocked(true);
      setRemainingTime(Math.ceil(blockDurationMs / 1000));
      return { allowed: false, remainingTime: Math.ceil(blockDurationMs / 1000) };
    }

    return { allowed: true, remainingTime: 0 };
  }, [maxAttempts, windowMs, blockDurationMs]);

  const recordAttempt = useCallback(() => {
    const now = Date.now();
    const state = stateRef.current;

    state.attempts += 1;
    state.lastAttempt = now;

    // Check if we should be blocked after this attempt
    if (state.attempts >= maxAttempts) {
      state.isBlocked = true;
      state.blockUntil = now + blockDurationMs;
      setIsBlocked(true);
      setRemainingTime(Math.ceil(blockDurationMs / 1000));
    }
  }, [maxAttempts, blockDurationMs]);

  const reset = useCallback(() => {
    stateRef.current = {
      attempts: 0,
      lastAttempt: 0,
      isBlocked: false,
    };
    setIsBlocked(false);
    setRemainingTime(0);
  }, []);

  return {
    checkRateLimit,
    recordAttempt,
    reset,
    isBlocked,
    remainingTime,
  };
}

// Format time helper
export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }
  return `${remainingSeconds}s`;
}



