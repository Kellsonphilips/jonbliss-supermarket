"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { faqSections } from '../faq/data/faqData';

const returnsFaqs = faqSections.find(s => s.title.toLowerCase().includes('returns'))?.faqs || [];

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ order: '', item: '', reason: '', contact: '', type: 'return' });
  const [formResult, setFormResult] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    setTrackingResult(null);
    setTimeout(() => {
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormResult(null);
    setTimeout(() => {
      if (!form.order || !form.item || !form.reason || !form.contact) {
        setFormResult({ error: 'Please fill in all fields.' });
      } else {
        setFormResult({
          success: `Your request to ${form.type} item "${form.item}" from order #${form.order} has been received. Our team will contact you at ${form.contact}.`
        });
        setForm({ order: '', item: '', reason: '', contact: '', type: 'return' });
      }
      setFormLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/returns.jpg" alt="Returns & Refunds" fill className="w-full h-full object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Returns & Refunds</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            Learn about our return policy, track your order, or request a return or replacement easily.
          </p>
        </div>
      </section>

      {/* Returns & Refunds Info */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Return & Refund Policy</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4 mb-8">
            <li><strong>Easy Returns:</strong> If you receive a wrong, damaged, or expired item, contact us within 24 hours for a replacement or refund.</li>
            <li><strong>Return Window:</strong> Returns are accepted within 30 days of purchase for eligible items with a valid receipt.</li>
            <li><strong>Perishable Items:</strong> Special return policies apply to perishable goods. Contact support for details.</li>
            <li><strong>Refunds:</strong> Approved refunds are processed within 3-5 business days to your original payment method.</li>
            <li><strong>How to Request:</strong> Use the form below or contact our support team for assistance.</li>
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

      {/* Return/Replace Request Form */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Request a Return or Replacement</h2>
          <form onSubmit={handleFormSubmit} className="space-y-6 bg-gray-50 rounded-xl shadow p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="order"
                placeholder="Order Number"
                value={form.order}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
                disabled={formLoading}
              />
              <input
                type="text"
                name="item"
                placeholder="Item Name or SKU"
                value={form.item}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
                disabled={formLoading}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="type"
                value={form.type}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
                disabled={formLoading}
              >
                <option value="return">Return</option>
                <option value="replace">Replace</option>
              </select>
              <input
                type="text"
                name="contact"
                placeholder="Your Email or Phone"
                value={form.contact}
                onChange={handleFormChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
                disabled={formLoading}
              />
            </div>
            <textarea
              name="reason"
              placeholder="Reason for return or replacement"
              value={form.reason}
              onChange={handleFormChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary text-gray-900 text-lg shadow-sm"
              rows={3}
              disabled={formLoading}
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition-all duration-300"
              disabled={formLoading}
            >
              {formLoading ? 'Submitting...' : 'Submit Request'}
            </button>
            {formResult && (
              <div className={`mt-2 p-4 rounded-lg shadow text-left ${formResult.error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                {formResult.error ? formResult.error : formResult.success}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Returns FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Returns & Refunds FAQ</h2>
          <div className="space-y-6">
            {returnsFaqs.map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg p-6 shadow group">
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