import React from 'react';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse our products, add items to your cart, and proceed to checkout. You will need to create an account or log in to complete your purchase.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Paystack, credit/debit cards, and other secure payment options.'
  },
  {
    question: 'How can I track my order?',
    answer: 'Log in to your account and go to the "Order History" section to view your order status and tracking information.'
  },
  {
    question: 'Can I return or exchange a product?',
    answer: 'Yes, you can return or exchange products within 7 days of delivery. Please see our Return Policy for details.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach us via the Contact Us page, email (support@jonbliss.com), or phone (+1 234 567 890).'
  },
  {
    question: 'Is my personal information safe?',
    answer: 'Yes, we use industry-standard security measures to protect your data. See our Privacy Policy for more.'
  },
];

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded shadow p-4">
            <h2 className="font-semibold text-lg mb-2 text-jonbliss-blue">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 