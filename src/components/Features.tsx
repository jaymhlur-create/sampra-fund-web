'use client';

export default function Features() {
  const features = [
    {
      title: 'Artist Funding',
      description: 'Financial support for recording, production, and creative projects.',
      icon: '🎵',
    },
    {
      title: 'Development Programs',
      description: 'Workshops, mentorship, and training to grow your skills.',
      icon: '🎓',
    },
    {
      title: 'Cultural Projects',
      description: 'Support for festivals, events, and community initiatives.',
      icon: '📅',
    },
    {
      title: 'Travel Grants',
      description: 'Funding for artists representing South Africa internationally.',
      icon: '✈️',
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          How We Support You
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"></p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="text-5xl mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
