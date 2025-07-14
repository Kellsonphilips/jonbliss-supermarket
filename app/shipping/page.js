"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { faqSections } from '../faq/data/faqData';

const shippingFaqs = faqSections.find(s => s.title.toLowerCase().includes('delivery'))?.faqs || [];

export default function ShippingInfo() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    setTrackingResult(null);
    setTimeout(() => {
      // Mock tracking result
      if (orderNumber.trim() === '') {
        setTrackingResult({ error: 'Please enter a valid order number.' });
      } else if (orderNumber === '123456') {
        setTrackingResult({
          status: 'Delivered',
          date: '2024-05-01',
          location: 'Front Desk',
          message: 'Your order was delivered successfully.'
        });
      } else {
        setTrackingResult({
          status: 'In Transit',
          date: 'Expected: 2024-05-10',
          location: 'Distribution Center',
          message: 'Your order is on its way!'
        });
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/shipping.jpg" alt="Shipping Service" fill className="w-full h-full object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Shipping & Delivery Information</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            Learn about our delivery options, timelines, and how to track your order with Jonbliss Supermarket.
          </p>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Our Shipping Works</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4 mb-8">
            <li><strong>Same-Day Delivery:</strong> Orders placed before 2 PM are delivered the same day (subject to availability and location).</li>
            <li><strong>Next-Day Delivery:</strong> Orders after 2 PM are delivered the next day.</li>
            <li><strong>Delivery Windows:</strong> Choose your preferred delivery window at checkout for added convenience.</li>
            <li><strong>Free Delivery:</strong> Enjoy free delivery on orders above ₦10,000. Delivery fees apply to smaller orders.</li>
            <li><strong>Service Area:</strong> We deliver to all major cities and towns within our service area. Enter your address at checkout to confirm availability.</li>
            <li><strong>Contactless Delivery:</strong> For your safety, we offer contactless delivery options.</li>
          </ul>
          <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg text-primary font-semibold mb-4">
            Need help? <Link href="/help" className="underline hover:text-orange-600">Visit our Help Center</Link> or <Link href="/contact" className="underline hover:text-orange-600">Contact Support</Link>.
          </div>
        </div>
      </section>

      {/* Track Order Feature */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Order</h2>
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <input
              type="text"
              placeholder="Enter your order number"
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
              disabled={loading}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-all duration-300 min-w-[150px]"
              disabled={loading}
            >
              {loading ? 'Tracking...' : 'Track Order'}
            </button>
          </form>
          {trackingResult && (
            <div className={`mt-4 p-6 rounded-lg shadow text-left ${trackingResult.error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-800'}`}>
              {trackingResult.error ? (
                <div>{trackingResult.error}</div>
              ) : (
                <div>
                  <div className="font-bold mb-2">Status: <span className="text-primary">{trackingResult.status}</span></div>
                  <div>Date: {trackingResult.date}</div>
                  <div>Location: {trackingResult.location}</div>
                  <div className="mt-2">{trackingResult.message}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Shipping FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping & Delivery FAQ</h2>
          <div className="space-y-6">
            {shippingFaqs.map((faq, idx) => (
              <details key={idx} className="bg-gray-50 rounded-lg p-6 shadow group">
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
      </section>
    </div>
  );
} 