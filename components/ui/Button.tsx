import { ReactNode, ButtonHTMLAttributes, forwardRef, isValidElement, cloneElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  asChild = false,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#4A6FA5] text-white hover:bg-[#3a5a8a] focus:ring-[#4A6FA5]',
    outline: 'border-2 border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#D3D3D3] focus:ring-[#4A6FA5]',
    ghost: 'text-[#4A6FA5] hover:bg-gray-100 focus:ring-[#4A6FA5]',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  } as const;
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };
  
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  
  // Note: asChild functionality removed for simplicity
  // if (asChild && isValidElement(children)) {
  //   return cloneElement(children, {
  //     ...children.props,
  //     className: cn(children.props.className, classes),
  //     ref,
  //   });
  // }
  
  return (
    <button 
      ref={ref}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
