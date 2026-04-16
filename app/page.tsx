'use client';

import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import Stats from '@/src/components/Stats';
import Features from '@/src/components/Features';
import Eligibility from '@/src/components/Eligibility';
import Process from '@/src/components/Process';
import About from '@/src/components/About';
import CTA from '@/src/components/CTA';
import Footer from '@/src/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Stats />
      <Features />
      <Eligibility />
      <Process />
      <About />
      <CTA />
      <Footer />
    </div>
  );
}
