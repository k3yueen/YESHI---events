import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="inline-flex items-center space-x-3 group">
      {/* Logo image */}
      <div className="h-12 w-12 rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <Image
          src="/yeshi.logo.jpg"
          alt="YESHI Logo"
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand name */}
      <div className="text-left">
        <span className="text-3xl font-bold font-space-grotesk text-white">
          YESHI
        </span>
        <p className="text-xs text-gray-500 -mt-1 font-medium">
          ieși afară
        </p>
      </div>
    </Link>
  );
}
