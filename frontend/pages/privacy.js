import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">At Jonbliss Supermarket, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal Information: Name, email address, phone number, shipping address, payment details.</li>
        <li>Account Information: Login credentials, order history, preferences.</li>
        <li>Usage Data: Pages visited, time spent, device and browser information.</li>
        <li>Cookies and Tracking: For analytics, personalization, and security.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To process orders and deliver products.</li>
        <li>To communicate with you about your account or orders.</li>
        <li>To improve our website, products, and services.</li>
        <li>To personalize your shopping experience.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Share Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>With trusted third-party service providers (e.g., payment processors, delivery partners).</li>
        <li>With law enforcement or regulatory authorities if required by law.</li>
        <li>We do not sell your personal information to third parties.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You can update your account information at any time.</li>
        <li>You can opt out of marketing emails by following the unsubscribe link.</li>
        <li>You can disable cookies in your browser settings.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@jonbliss.com" className="text-primary underline">support@jonbliss.com</a>.</p>
    </div>
  );
} 