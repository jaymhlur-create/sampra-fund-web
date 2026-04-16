'use client';

export default function Stats() {
  const stats = [
    {
      number: 'R25M+',
      description: 'distributed in funding',
      icon: '💰',
    },
    {
      number: '500+',
      description: 'artists supported',
      icon: '🎤',
    },
    {
      number: '100+',
      description: 'projects funded annually',
      icon: '⭐',
    },
  ];

  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 font-medium mb-12">
          Trusted by artists, organisations, and cultural leaders across South Africa
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 font-medium">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
