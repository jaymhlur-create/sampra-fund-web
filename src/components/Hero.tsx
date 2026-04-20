'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Funding the Future of <span className="text-yellow-400">Music & Culture</span> in South Africa.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We support artists, creators, and organisations with the resources they need to grow, create, and make lasting impact.
              </p>
            </div>

            <p className="text-base text-gray-700">
              Apply for funding, access development programs, and take your creative career to the next level.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-colors whitespace-nowrap"
              >
                APPLY FOR FUNDING
              </Link>
              <Link
                href="#opportunities"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-colors whitespace-nowrap"
              >
                EXPLORE OPPORTUNITIES
              </Link>
            </div>
          </div>

          {/* Right Illustration Placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl flex items-center justify-center overflow-hidden">
              {/* Placeholder for illustration - creative silhouettes */}
              <img
                src ="/singingLady.svg"
                alt="Singing Lady"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
