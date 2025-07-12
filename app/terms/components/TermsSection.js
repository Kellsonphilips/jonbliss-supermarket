"use client";

import Link from 'next/link';

export default function TermsSection({ title, content }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {content.map((item, i) => {
        if (Array.isArray(item)) {
          return (
            <ul key={i} className="list-disc list-inside text-gray-700 mb-4 space-y-2">
              {item.map((li, j) => <li key={j}>{li}</li>)}
            </ul>
          );
        } else if (item === 'privacy') {
          return (
            <p key={i} className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Please review our{' '}
              <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>, which also governs your use of the Services, to understand our practices.
            </p>
          );
        } else {
          return <p key={i} className="text-gray-700 leading-relaxed mb-4">{item}</p>;
        }
      })}
    </div>
  );
} 