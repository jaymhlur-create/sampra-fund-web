'use client';

import Link from 'next/link';

export default function Process() {
  const steps = [
    {
      number: '1',
      title: 'Create an account',
      description: '',
      icon: '👤',
    },
    {
      number: '2',
      title: 'Submit your application',
      description: '',
      icon: '📄',
    },
    {
      number: '3',
      title: 'Our team reviews your proposal',
      description: '',
      icon: '🔍',
    },
    {
      number: '4',
      title: 'Receive funding & support',
      description: '',
      icon: '✓',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl py-12">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Simple Application Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-0.5 bg-gray-300"></div>
              )}

              <div className="flex flex-col items-center text-center">
                {/* Step number circle */}
                <div className="w-16 h-16 rounded-full bg-blue-100 text-white flex items-center justify-center font-bold text-xl mb-4 relative z-10">
                  {step.icon}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="text-sm text-gray-600">{step.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-colors"
          >
            START YOUR APPLICATION
          </Link>
        </div>
      </div>
    </section>
  );
}
