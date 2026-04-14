'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Animated Gradient Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blue-purple gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        {/* Secondary accent glow */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-l from-indigo-600/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8 animation-fade-in">
        {/* Hero Title */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
            SAMPRA FUND
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-200 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          A digital platform for funding applications, reviews, and approvals.
        </h2>

        {/* Description */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Apply, track, and manage funding applications in one place. Streamline your funding process with our modern, intuitive platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {/* Sign Up Button (Primary) */}
          <Link
            href="/signup"
            className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border border-blue-500/30 hover:border-blue-400/50 text-center"
          >
            <span className="relative flex items-center justify-center gap-2">
              Get Started
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          {/* Login Button (Secondary) */}
          <Link
            href="/login"
            className="group px-8 py-3 bg-slate-800/60 hover:bg-slate-700/60 text-slate-200 font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105 border border-slate-700/50 hover:border-slate-600 backdrop-blur-xl text-center"
          >
            <span className="flex items-center justify-center gap-2">
              Sign In
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Features Highlight (Optional) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          {/* Feature 1 */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors duration-300">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-white mb-2">Easy Applications</h3>
            <p className="text-sm text-slate-400">Simple multi-step form process</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors duration-300">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-white mb-2">Real-time Tracking</h3>
            <p className="text-sm text-slate-400">Monitor your application status</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/30 transition-colors duration-300">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-semibold text-white mb-2">Fast Reviews</h3>
            <p className="text-sm text-slate-400">Quick approvals and feedback</p>
          </div>
        </div>
      </div>

      {/* Inline Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animation-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
