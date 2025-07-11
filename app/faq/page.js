"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function FAQ() {
  // Grouped FAQ data
  const faqSections = [
    {
      title: 'General',
      faqs: [
        {
          question: "What is Jonbliss Supermarket?",
          answer: "Jonbliss Supermarket is an online grocery and household goods store offering a wide range of quality products delivered quickly and conveniently to your doorstep."
        },
        {
          question: "Where do you deliver?",
          answer: "We deliver to all major cities and towns within our service area. Enter your address at checkout to confirm delivery availability."
        },
        {
          question: "What are your operating hours?",
          answer: "Our website is open 24/7 for orders. Customer support is available from 8:00 AM to 8:00 PM, Monday to Saturday."
        },
      ]
    },
    {
      title: 'Ordering & Products',
      faqs: [
        {
          question: "How do I place an order?",
          answer: "Simply browse our products, add items to your cart, and proceed to checkout. You’ll need to create an account or log in to complete your purchase."
        },
        {
          question: "Can I modify or cancel my order after placing it?",
          answer: "Yes, you can modify or cancel your order within 30 minutes of placing it by contacting our customer support."
        },
        {
          question: "Are all products always in stock?",
          answer: "We strive to keep our inventory updated. If an item is out of stock, it will be marked as such and you won’t be able to add it to your cart."
        },
        {
          question: "Do you offer fresh produce and perishable items?",
          answer: "Yes! We offer a wide selection of fresh fruits, vegetables, dairy, and other perishable goods."
        },
      ]
    },
    {
      title: 'Delivery',
      faqs: [
        {
          question: "How long does delivery take?",
          answer: "Standard delivery is same-day for orders placed before 2 PM. Orders after 2 PM are delivered the next day."
        },
        {
          question: "Can I schedule a delivery time?",
          answer: "Yes, you can select your preferred delivery window at checkout."
        },
        {
          question: "How much does delivery cost?",
          answer: "Delivery is free for orders above ₦10,000. For smaller orders, a delivery fee is calculated at checkout."
        },
        {
          question: "What if I’m not home during delivery?",
          answer: "Our delivery team will contact you. You can reschedule or authorize someone to receive your order."
        },
      ]
    },
    {
      title: 'Payments',
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, bank transfers, and select mobile payment options."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption and secure payment gateways to protect your information."
        },
        {
          question: "Can I pay on delivery?",
          answer: "Yes, cash on delivery is available for select locations and order values."
        },
      ]
    },
    {
      title: 'Returns & Refunds',
      faqs: [
        {
          question: "What is your return policy?",
          answer: "If you receive a wrong, damaged, or expired item, contact us within 24 hours for a replacement or refund."
        },
        {
          question: "How do I request a refund?",
          answer: "Contact our support team with your order details. Refunds are processed within 3-5 business days."
        },
      ]
    },
    {
      title: 'Account & Security',
      faqs: [
        {
          question: "Do I need an account to shop?",
          answer: "You can browse products without an account, but you’ll need to sign up or log in to place an order."
        },
        {
          question: "I forgot my password. What should I do?",
          answer: "Click ‘Forgot Password’ on the login page and follow the instructions to reset your password."
        },
        {
          question: "How do I update my address or contact information?",
          answer: "Log in, go to your profile, and update your details under ‘Account Settings.’"
        },
      ]
    },
    {
      title: 'Promotions & Loyalty',
      faqs: [
        {
          question: "Do you offer discounts or promotions?",
          answer: "Yes! Check our homepage and subscribe to our newsletter for the latest deals and offers."
        },
        {
          question: "Is there a loyalty program?",
          answer: "Yes, earn points with every purchase and redeem them for discounts on future orders."
        },
      ]
    },
    {
      title: 'Contact & Support',
      faqs: [
        {
          question: "How can I contact customer support?",
          answer: "Use the contact form on our website, email support@jonbliss.com, or call our hotline at 0800-JONBLISS."
        },
        {
          question: "Where can I give feedback or suggestions?",
          answer: "We value your feedback! Use our contact page or email us directly."
        },
      ]
    },
  ];

  // Flattened index for openFaq
  const [openFaq, setOpenFaq] = useState(null);
  let faqIndex = 0;

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
              <div className="space-y-8">
                {faqSections.map((section, sectionIdx) => (
                  <div key={section.title}>
                    <h2 className="text-2xl font-bold text-primary mb-4">{section.title}</h2>
                    <div className="space-y-4">
                      {section.faqs.map((faq, idx) => {
                        const currentIndex = faqIndex;
                        faqIndex++;
                        return (
                          <div key={faq.question} className="border border-gray-200 rounded-lg">
                            <button
                              onClick={() => setOpenFaq(openFaq === currentIndex ? null : currentIndex)}
                              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                            >
                              <span className="font-semibold text-gray-900">{faq.question}</span>
                              <svg
                                className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === currentIndex ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            {openFaq === currentIndex && (
                              <div className="px-6 pb-4">
                                <p className="text-gray-700">{faq.answer}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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