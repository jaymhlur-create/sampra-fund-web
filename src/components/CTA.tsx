'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-16 lg:py-20 bg-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Ready to take the next step in your creative journey?
        </h2>
        <p className="text-lg text-gray-800 mb-8">
          We're here to help you create, grow, and make an impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full transition-colors"
          >
            APPLY FOR FUNDING
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-full transition-colors border-2 border-gray-900"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </section>
  );
}
