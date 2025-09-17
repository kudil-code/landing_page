'use client';

import { useState } from 'react';

interface CustomCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  id?: string;
}

export default function CustomCheckbox({ checked, onChange, label, id }: CustomCheckboxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <div
        id={id}
        className="relative"
        onClick={() => onChange(!checked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '24px',
          height: '24px',
          minWidth: '24px',
          minHeight: '24px',
          border: checked ? '3px solid #4A6FA5' : '3px solid #6B7280',
          borderRadius: '6px',
          backgroundColor: checked ? '#4A6FA5' : '#FFFFFF',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease-in-out',
          boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {checked && (
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 'bold',
              lineHeight: '1',
              display: 'block',
            }}
          >
            ✓
          </span>
        )}
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
