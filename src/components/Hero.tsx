'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ✅ Parent controls stagger timing
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// ✅ Each item animates in sequence
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="relative bg-white overflow-hidden"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            {/* Heading block */}
            <motion.div variants={item}>
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Funding the Future of{' '}
                <span className="text-yellow-400">Music & Culture</span> in South Africa.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                We support artists, creators, and organisations with the resources they need to grow, create, and make lasting impact.
              </p>
            </motion.div>

            {/* Paragraph */}
            <motion.p
              variants={item}
              className="text-base text-gray-700"
            >
              Apply for funding, access development programs, and take your creative career to the next level.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
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
            </motion.div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={item}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl flex items-center justify-center overflow-hidden">

              <motion.img
                src="/singingLady.svg"
                alt="Singing Lady"
                className="w-full h-full object-contain"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: [1.2, 0.9, 1], opacity: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />

            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}