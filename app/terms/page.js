"use client";

import TermsHero from './components/TermsHero';
import TermsContent from './components/TermsContent';

export default function TermsOfService() {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      <TermsHero lastUpdated={lastUpdated} />
      <TermsContent />
    </div>
  );
} 