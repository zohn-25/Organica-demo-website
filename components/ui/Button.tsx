import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'mustard';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-body font-bold rounded-full transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
      primary: 'bg-[#2E5A36] text-[#FAF8F3] hover:bg-[#1E3D24] focus:ring-[#2E5A36] shadow-md hover:shadow-lg',
      mustard: 'bg-[#F2B705] text-[#141412] hover:bg-[#D49E00] focus:ring-[#F2B705] shadow-md hover:shadow-lg',
      secondary: 'bg-[#FAF8F3] text-[#141412] hover:bg-[#F4EFE6] border border-[#E8E3D8] focus:ring-[#141412]',
      outline: 'bg-transparent text-[#2E5A36] border-2 border-[#2E5A36] hover:bg-[#EBF4ED] focus:ring-[#2E5A36]',
      ghost: 'bg-transparent text-[#141412] hover:bg-[#FAF8F3] focus:ring-[#141412]',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-1.5 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
