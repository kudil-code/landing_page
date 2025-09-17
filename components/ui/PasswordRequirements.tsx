'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirementsProps {
  password: string;
  show?: boolean;
}

interface Requirement {
  id: string;
  text: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  {
    id: 'length',
    text: 'Minimal 8 karakter',
    test: (password) => password.length >= 8,
  },
  {
    id: 'lowercase',
    text: 'Mengandung huruf kecil',
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    text: 'Mengandung huruf besar',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'number',
    text: 'Mengandung angka',
    test: (password) => /\d/.test(password),
  },
];

export default function PasswordRequirements({ password, show = false }: PasswordRequirementsProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    if (password.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [password]);

  if (!isVisible) return null;

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Persyaratan Password:</h4>
      <ul className="space-y-1">
        {requirements.map((requirement) => {
          const isValid = requirement.test(password);
          return (
            <li key={requirement.id} className="flex items-center text-sm">
              {isValid ? (
                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              ) : (
                <X className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
              )}
              <span className={isValid ? 'text-green-700' : 'text-red-700'}>
                {requirement.text}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}




