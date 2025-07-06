import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">By using Jonbliss Supermarket, you agree to these Terms of Service. Please read them carefully.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Use of the Website</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You must be at least 18 years old or have parental consent to use our services.</li>
        <li>You agree not to use the site for unlawful purposes.</li>
        <li>Account information must be accurate and kept up to date.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Orders and Payment</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>All orders are subject to acceptance and availability.</li>
        <li>Prices and availability are subject to change without notice.</li>
        <li>Payment must be made in full before orders are processed.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Returns and Refunds</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Returns are accepted within 7 days of delivery. See our Return Policy for details.</li>
        <li>Refunds will be processed to the original payment method.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
      <p className="mb-4">All content on this site is the property of Jonbliss Supermarket and may not be used without permission.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
      <p className="mb-4">Jonbliss Supermarket is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
      <p className="mb-4">We reserve the right to update these Terms at any time. Continued use of the site constitutes acceptance of the new Terms.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact</h2>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@jonbliss.com" className="text-primary underline">support@jonbliss.com</a>.</p>
    </div>
  );
} 