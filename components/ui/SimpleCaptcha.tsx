'use client';

import { useState, useEffect, useRef } from 'react';
import { RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
  disabled?: boolean;
}

export default function SimpleCaptcha({ onVerify, disabled = false }: SimpleCaptchaProps) {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
    setUserInput('');
    setIsValid(null);
    onVerify(false);
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw text
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add some rotation and distortion
    for (let i = 0; i < captchaText.length; i++) {
      ctx.save();
      ctx.translate(30 + i * 25, 25);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(captchaText[i], 0, 0);
      ctx.restore();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText) {
      drawCaptcha();
    }
  }, [captchaText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    
    if (value.length === captchaText.length) {
      const valid = value.toLowerCase() === captchaText.toLowerCase();
      setIsValid(valid);
      onVerify(valid);
    } else {
      setIsValid(null);
      onVerify(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-800">
        Verifikasi Keamanan
      </label>
      
      <div className="flex items-center space-x-4">
        <div className="relative group">
          <canvas
            ref={canvasRef}
            width={150}
            height={50}
            className="border-2 border-gray-200 rounded-xl shadow-sm group-hover:border-gray-300 transition-colors duration-200"
          />
          <button
            type="button"
            onClick={generateCaptcha}
            disabled={disabled}
            className="absolute -right-2 -top-2 p-2 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
            aria-label="Refresh CAPTCHA"
          >
            <RefreshCw className="h-4 w-4 text-gray-600 hover:text-[#4A6FA5] transition-colors duration-200" />
          </button>
        </div>
        
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={disabled}
          className={`flex-1 px-4 py-3 border-2 rounded-xl bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-[#4A6FA5]/20 focus:border-[#4A6FA5] transition-all duration-200 placeholder:text-gray-400 text-gray-900 font-medium ${
            isValid === true 
              ? 'border-green-300 bg-green-50/50 focus:ring-green-500/20 focus:border-green-500' 
              : isValid === false 
              ? 'border-red-300 bg-red-50/50 focus:ring-red-500/20 focus:border-red-500' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          placeholder="Masukkan kode di atas"
          maxLength={5}
        />
      </div>
      
      {isValid === false && (
        <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50/50 border border-red-200 rounded-xl px-3 py-2">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>Kode CAPTCHA tidak sesuai. Silakan coba lagi.</span>
        </div>
      )}
      
      {isValid === true && (
        <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-50/50 border border-green-200 rounded-xl px-3 py-2">
          <CheckCircle className="h-4 w-4 flex-shrink-0" />
          <span>Verifikasi berhasil!</span>
        </div>
      )}
    </div>
  );
}
