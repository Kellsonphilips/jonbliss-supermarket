"use client";

import PrivacyHero from './components/PrivacyHero';
import PrivacyContent from './components/PrivacyContent';

export default function PrivacyPolicy() {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      <PrivacyHero lastUpdated={lastUpdated} />
      <PrivacyContent />
    </div>
  );
} 