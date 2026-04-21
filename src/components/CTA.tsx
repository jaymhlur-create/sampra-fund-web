'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function CTA() {
  return (
    <motion.section
      className="py-16 lg:py-20 bg-yellow-400"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* TITLE */}
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
          variants={item}
        >
          Ready to take the next step in your creative journey?
        </motion.h2>

        {/* SUBTEXT */}
        <motion.p
          className="text-lg text-gray-800 mb-8"
          variants={item}
        >
          We're here to help you create, grow, and make an impact.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={item}
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-full transition-colors"
          >
            APPLY FOR FUNDING
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-bold rounded-full transition-colors border-2 border-gray-900"
          >
            CONTACT US
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}