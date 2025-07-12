"use client";

import Link from 'next/link';

export default function PrivacySection({ title, content, subsections }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {subsections ? (
        subsections.map((sub, idx) => (
          <div key={idx} className="mb-6">
            {sub.subtitle && <h3 className="text-xl font-semibold text-gray-900 mb-3">{sub.subtitle}</h3>}
            {sub.content.map((item, i) =>
              Array.isArray(item) ? (
                <ul key={i} className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                  {item.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              ) : (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{item}</p>
              )
            )}
          </div>
        ))
      ) : (
        content.map((item, i) => {
          if (Array.isArray(item)) {
            return (
              <ul key={i} className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                {item.map((li, j) => <li key={j}>{li}</li>)}
              </ul>
            );
          } else if (item === 'cookies') {
            return (
              <p key={i} className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. For detailed information about our use of cookies, please see our{' '}
                <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
              </p>
            );
          } else {
            return <p key={i} className="text-gray-700 leading-relaxed mb-4">{item}</p>;
          }
        })
      )}
    </div>
  );
} 