import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, type = 'text', ...props }, ref) => {
    return (
      <div className="relative w-full flex items-center">
        {icon ? (
          <div className="absolute left-3.5 text-[#6B685F] pointer-events-none flex items-center justify-center">
            {icon}
          </div>
        ) : null}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full bg-[#FFFFFF] text-[#141412] placeholder-[#6B685F]/60 text-sm font-body rounded-full border border-[#E8E3D8] transition-all duration-200 focus:outline-none focus:border-[#2E5A36] focus:ring-2 focus:ring-[#2E5A36]/15 py-2.5',
            icon ? 'pl-10 pr-4' : 'px-4',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
