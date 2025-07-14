"use client"

import Image from 'next/image';
import Link from 'next/link';
import { faqSections } from '../faq/data/faqData';
import { useState } from 'react';

const quickLinks = [
  { label: 'Ordering', href: '/products', icon: '🛒' },
  { label: 'Delivery', href: '/shipping', icon: '🚚' },
  { label: 'Payments', href: '/profile', icon: '💳' },
  { label: 'Returns', href: '/returns', icon: '↩️' },
  { label: 'Account', href: '/profile', icon: '👤' },
  { label: 'Contact Support', href: '/contact', icon: '📞' },
];

export default function HelpCenter() {
  const [search, setSearch] = useState('');
  const filteredFaqs = faqSections
    .map(section => ({
      ...section,
      faqs: section.faqs.filter(faq =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(section => section.faqs.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/service1.webp" alt="Help Center" fill className="w-full h-full object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Help Center</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            How can we help you today? Find answers, resources, and support for all your Jonbliss needs.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
            {quickLinks.map(link => (
              <Link key={link.label} href={link.href} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg shadow hover:bg-primary/10 transition-all">
                <span className="text-3xl mb-2">{link.icon}</span>
                <span className="text-sm font-semibold text-gray-900 text-center">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Searchable FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full max-w-md px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm mx-auto"
            />
          </div>
          <div className="space-y-10">
            {filteredFaqs.length === 0 && (
              <div className="text-center text-gray-500">No results found.</div>
            )}
            {filteredFaqs.map(section => (
              <div key={section.title} id={section.title.toLowerCase().replace(/\s+/g, '-')}
                className="bg-white rounded-xl shadow p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">{section.title}</h3>
                <div className="divide-y divide-gray-200">
                  {section.faqs.map((faq, idx) => (
                    <details key={idx} className="py-4 group">
                      <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between group-open:text-primary">
                        {faq.question}
                        <span className="ml-2 text-primary">▼</span>
                      </summary>
                      <div className="mt-2 text-gray-700 text-base leading-relaxed">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support & Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-8">Our support team is here for you. Reach out for personalized assistance or explore more resources below.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-all duration-300">Contact Support</Link>
            <a href="mailto:support@jonbliss.com" className="px-6 py-3 bg-white border border-primary text-primary font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition-all duration-300">Email Us</a>
            <a href="tel:0800-JONBLISS" className="px-6 py-3 bg-white border border-primary text-primary font-semibold rounded-lg shadow hover:bg-primary hover:text-white transition-all duration-300">Call 0800-JONBLISS</a>
          </div>
          <div className="text-gray-500 text-sm">Support hours: 8:00 AM – 8:00 PM, Monday to Saturday</div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/faq" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-primary/10 transition-all">
              <span className="text-4xl mb-2">❓</span>
              <span className="font-semibold text-gray-900 mb-1">Full FAQ</span>
              <span className="text-gray-600 text-sm text-center">Browse all frequently asked questions</span>
            </Link>
            <Link href="/shipping" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-primary/10 transition-all">
              <span className="text-4xl mb-2">🚚</span>
              <span className="font-semibold text-gray-900 mb-1">Shipping Info</span>
              <span className="text-gray-600 text-sm text-center">Learn about delivery options and timelines</span>
            </Link>
            <Link href="/returns" className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:bg-primary/10 transition-all">
              <span className="text-4xl mb-2">↩️</span>
              <span className="font-semibold text-gray-900 mb-1">Returns & Refunds</span>
              <span className="text-gray-600 text-sm text-center">Understand our return and refund policies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 