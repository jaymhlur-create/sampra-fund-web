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
              <svg
                viewBox="0 0 300 400"
                className="w-full h-full max-w-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Singer silhouette */}
                <circle cx="120" cy="80" r="25" fill="#8B6F47"/>
                <path d="M120 105 Q110 140 100 180 M120 115 Q115 150 110 180 M120 115 Q125 150 130 180" stroke="#F59E0B" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="90" cy="100" r="12" fill="#FCD34D"/>
                <circle cx="150" cy="140" r="30" fill="#060D47" opacity="0.1"/>

                {/* Person with laptop silhouette */}
                <circle cx="220" cy="120" r="20" fill="#1E3A8A"/>
                <rect x="200" y="150" width="40" height="60" fill="#1E3A8A"/>
                <rect x="190" y="160" width="60" height="40" fill="#3B82F6" rx="4"/>

                {/* Musical notes */}
                <g stroke="#FCD34D" strokeWidth="3" fill="none">
                  <path d="M60 200 Q70 180 80 200"/>
                  <path d="M160 250 Q175 220 190 250"/>
                </g>

                {/* Decorative elements */}
                <circle cx="250" cy="200" r="8" fill="#FCD34D"/>
                <circle cx="80" cy="300" r="10" fill="#FEF3C7" opacity="0.6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
