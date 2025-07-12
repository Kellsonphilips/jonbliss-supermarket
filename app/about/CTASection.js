import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 w-full h-full">
        <Image src="/vareity1.jpg" alt="CTA Background" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
          Ready to Experience Jonbliss?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-white drop-shadow">
          Join thousands of satisfied customers who trust us for their daily needs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-semibold rounded-lg text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Shop Now
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-lg font-semibold rounded-lg text-white hover:bg-white hover:text-primary transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
} 