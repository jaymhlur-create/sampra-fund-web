'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 flex-shrink-0">
            <Image
              src="/sampra-logo.svg"
              alt="SAMPRA Development Fund"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-gray-900">sampra</h1>
            <p className="text-xs text-gray-500 font-medium">DEVELOPMENT FUND</p>
          </div>
        </Link>

        {/* Auth Links */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors px-4 py-2"
          >
            LOGIN
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold text-white bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-full transition-colors"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </header>
  );
}
