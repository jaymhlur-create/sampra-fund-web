'use client';

import Link from 'next/link';

export default function Eligibility() {
  const categories = [
    'Independent musicians',
    'Cultural organisations',
    'Event organisers',
    'Music producers',
    'Industry professionals',
  ];

  return (
    <section className="py-16 lg:py-20 bg-yellow-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Who Is This For?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              We support a wide range of applicants across the creative industry:
            </p>

            <ul className="space-y-4 mb-8">
              {categories.map((category, idx) => (
                <li key={idx} className="flex items-center space-x-3">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700 font-medium">{category}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/eligibility"
              className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-colors"
            >
              CHECK ELIGIBILITY
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96 flex items-center justify-center">
              <img
                src="/GuitarLady.svg"
                alt="Guitar Lady"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
