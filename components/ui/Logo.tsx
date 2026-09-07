import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export function Logo({ className = '', size = 'md', priority = true }: LogoProps) {
  // Responsive height classes for different size variants
  const heightClasses =
    size === 'sm'
      ? 'h-5 sm:h-6'
      : size === 'lg'
      ? 'h-8 sm:h-10 md:h-12'
      : 'h-6 sm:h-7 md:h-8';

  return (
    <Link
      href="/"
      className={`inline-flex items-center group select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2E5A36] rounded-xl transition-transform active:scale-98 ${className}`}
      aria-label="Organica — Home"
    >
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-2xs group-hover:shadow-sm transition-all duration-300">
        <Image
          src="/images/logo.jpg"
          alt="Organica Clean Eating Delivered"
          width={432}
          height={72}
          priority={priority}
          className={`${heightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-103`}
        />
      </div>
    </Link>
  );
}
