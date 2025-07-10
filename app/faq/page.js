"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "What are your delivery options?",
      answer: "We offer same-day delivery for orders placed before 2 PM, next-day delivery, and standard delivery (3-5 business days). Delivery fees vary based on your location and order size."
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free shipping on orders over ₦5,000. For orders below this amount, a standard delivery fee of ₦500 applies."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase with a valid receipt. Perishable items have different return policies. Please contact our customer service for return instructions."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "Yes! Join our Jonbliss Rewards program to earn points on every purchase and receive exclusive discounts and offers."
    },
    {
      question: "Are your products fresh?",
      answer: "Absolutely! We source our products from trusted suppliers and ensure all items meet our high quality standards. Fresh produce is delivered daily."
    },
    {
      question: "Can I track my order?",
      answer: "Yes, you'll receive a tracking number via email once your order ships. You can also track your order through your account dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and cash on delivery. All online payments are processed securely."
    },
    {
      question: "Do you deliver to my area?",
      answer: "We deliver to most areas within our service region. Enter your address during checkout to confirm delivery availability."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - Jonbliss Supermarket</title>
        <meta name="description" content="Find answers to frequently asked questions about Jonbliss Supermarket's services, delivery, and policies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Still have questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our customer service team is here to help you with any questions or concerns.
                </p>
                <Link
                  href="/contact"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
} 