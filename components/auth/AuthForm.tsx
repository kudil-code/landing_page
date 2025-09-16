'use client';

import { ReactNode } from 'react';
import { useForm, UseFormReturn, FieldValues } from 'react-hook-form';

interface AuthFormProps {
  onSubmit: (data: FieldValues) => void | Promise<void>;
  children: (form: UseFormReturn<FieldValues>) => ReactNode;
  className?: string;
}

export default function AuthForm({
  onSubmit,
  children,
  className = '',
}: AuthFormProps) {
  const form = useForm<FieldValues>({
    mode: 'onChange',
  });

  const handleSubmit = async (data: FieldValues) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
      {children(form)}
    </form>
  );
}