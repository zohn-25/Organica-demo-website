'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    const enterTimer = requestAnimationFrame(() => setIsVisible(true));

    // Auto dismiss
    const duration = toast.duration || 4500;
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(toast.id), 300);
    }, duration);

    return () => {
      cancelAnimationFrame(enterTimer);
      clearTimeout(dismissTimer);
    };
  }, [toast, onDismiss]);

  const handleManualClose = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-[#2E5A36] shrink-0" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#2E5A36] shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'border-[#2E5A36]/30 bg-[#FAF8F3]';
      case 'error':
        return 'border-red-200 bg-[#FFF5F5]';
      case 'warning':
        return 'border-amber-200 bg-[#FFFDF5]';
      case 'info':
      default:
        return 'border-[#2E5A36]/20 bg-[#FAF8F3]';
    }
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`flex items-start gap-3.5 p-4 rounded-2xl shadow-xl border backdrop-blur-md max-w-sm w-full transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
      } ${getBorderColor()}`}
    >
      <div className="pt-0.5">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <h4 className="text-sm font-heading font-bold text-[#141412] leading-snug">
          {toast.title}
        </h4>
        {toast.message && (
          <p className="text-xs font-body text-[#6B685F] leading-relaxed">
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={handleManualClose}
        aria-label="Close notification"
        className="p-1 rounded-full text-[#6B685F] hover:text-[#141412] hover:bg-black/5 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
