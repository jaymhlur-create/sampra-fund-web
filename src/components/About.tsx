'use client';

export default function About() {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full h-80 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full max-w-xs"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="100" cy="100" r="90" fill="none" stroke="#F59E0B" strokeWidth="3" opacity="0.3"/>
                <circle cx="100" cy="100" r="70" fill="none" stroke="#10B981" strokeWidth="3" opacity="0.3"/>
                <circle cx="100" cy="100" r="50" fill="none" stroke="#3B82F6" strokeWidth="3" opacity="0.3"/>

                {/* Center musical note */}
                <g transform="translate(100, 100)">
                  <path d="M-8 -10 Q 0 -15 8 -10 L 8 10 Q 0 15 -8 10 Z" fill="#FCD34D"/>
                  <circle cx="8" cy="12" r="6" fill="#FCD34D"/>
                </g>
              </svg>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              About the SAMPRA Development Fund
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              The SAMPRA Development Fund ("The Fund") is the Corporate Social Investment (CSI) arm of SAMPRA. Our mission is to empower South African artists by providing funding, resources, and opportunities that drive long-term growth and sustainability.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are dedicated to promoting the development and sustainability of SAMPRA members through strategic initiatives that support the music industry's growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
