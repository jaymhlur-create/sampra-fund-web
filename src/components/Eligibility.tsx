'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Eligibility() {
  const categories = [
    'Independent musicians',
    'Cultural organisations',
    'Event organisers',
    'Music producers',
    'Industry professionals',
  ];

  return (
    <motion.section
      className="py-16 lg:py-20 bg-yellow-white"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div variants={item}>

            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-6"
              variants={item}
            >
              Who Is This For?
            </motion.h2>

            <motion.p
              className="text-gray-700 text-lg leading-relaxed mb-8"
              variants={item}
            >
              We support a wide range of applicants across the creative industry:
            </motion.p>

            {/* LIST */}
            <motion.ul className="space-y-4 mb-8">
              {categories.map((category, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-center space-x-3"
                  variants={item}
                >
                  <span className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    {category}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item}>
              <Link
                href="/eligibility"
                className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-colors"
              >
                CHECK ELIGIBILITY
              </Link>
            </motion.div>

          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            variants={item}
          >
            <div className="relative w-full h-96 flex items-center justify-center">
              <motion.img
                src="/GuitarLady.svg"
                alt="Guitar Lady"
                className="w-full h-full object-contain"
                initial={{ opacity: 0, scale: 1.1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}