import Link from 'next/link';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const circleSize = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-11 h-11';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm';
  const leafSize = size === 'sm' ? 'w-2.5 h-2.5 -top-1 -right-0.5' : size === 'lg' ? 'w-4 h-4 -top-2 -right-1' : 'w-3 h-3 -top-1.5 -right-1';

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Black circle with white serif wordmark & green leaf accent */}
      <div className={`relative ${circleSize} rounded-full bg-[#141412] text-[#FAF8F3] flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105`}>
        <span className={`font-heading font-extrabold tracking-widest ${textSize}`}>
          O
        </span>
        {/* Little organic leaf floating on the emblem */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`absolute ${leafSize} text-[#4B885C] fill-current transform rotate-12 transition-transform duration-300 group-hover:rotate-45`}
        >
          <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17 9C17 9 16 14 11 16C9 16.8 6 16.5 6 16.5C6 16.5 7 13.5 9 11.5C12 8.5 17 9 17 9Z" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="relative inline-block leading-none">
          <span className="font-heading font-black text-[#141412] tracking-[0.18em] text-lg sm:text-xl">
            ORGANICA
          </span>
          {/* Natural leaf accent over the final 'A' */}
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="absolute -top-2 -right-0.5 w-3.5 h-3.5 text-[#2E5A36] transform -rotate-12 group-hover:rotate-12 transition-transform duration-300 pointer-events-none"
          >
            <path d="M8 1c3.5 0 6 2.5 6 6 0 3-2 5.5-5 6-.5-2-1.5-4-3-5.5C4.5 6 5.5 2.5 8 1z" />
          </svg>
        </div>
        <span className="text-[9px] uppercase tracking-[0.28em] text-[#6B685F] font-body font-semibold">
          Clean Eating • Delivered
        </span>
      </div>
    </Link>
  );
}
