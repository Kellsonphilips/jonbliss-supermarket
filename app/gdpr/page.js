"use client";

import { useState } from 'react';
import GDPRHero from './components/GDPRHero';
import GDPRRights from './components/GDPRRights';
import GDPRProcessing from './components/GDPRProcessing';
import GDPRCompliance from './components/GDPRCompliance';
import { dataRights } from './data/rights';
import { legalBases } from './data/legalBases';
import { dataCategories } from './data/dataCategories';

export default function GDPR() {
  const [activeTab, setActiveTab] = useState('rights');
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50">
      <GDPRHero lastUpdated={lastUpdated} />
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center mb-8">
            <button
              onClick={() => setActiveTab('rights')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'rights' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Your Rights
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'processing' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Data Processing
            </button>
            <button
              onClick={() => setActiveTab('compliance')}
              className={`px-6 py-3 mx-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'compliance' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Our Compliance
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            {activeTab === 'rights' && <GDPRRights dataRights={dataRights} />}
            {activeTab === 'processing' && <GDPRProcessing legalBases={legalBases} dataCategories={dataCategories} />}
            {activeTab === 'compliance' && <GDPRCompliance />}
          </div>
        </div>
      </section>
    </div>
  );
} 