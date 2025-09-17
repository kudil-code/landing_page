'use client';

import { useState } from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function ToggleSwitch({ checked, onChange, label, id }: ToggleSwitchProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center space-x-3">
      <div
        id={id}
        onClick={() => onChange(!checked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '50px',
          height: '28px',
          minWidth: '50px',
          minHeight: '28px',
          backgroundColor: checked ? '#4A6FA5' : '#E5E7EB',
          borderRadius: '14px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          border: '2px solid #FFFFFF',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          padding: '2px',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            transition: 'transform 0.3s ease-in-out',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: checked ? 'translateX(22px)' : 'translateX(0px)',
          }}
        >
          {checked && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                color: '#4A6FA5',
                stroke: 'currentColor',
                strokeWidth: '3',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
              }}
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          )}
        </div>
      </div>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 cursor-pointer select-none"
          onClick={() => onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
}
