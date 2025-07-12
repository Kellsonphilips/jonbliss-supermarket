"use client";

import { privacySections } from '../data/sections';
import PrivacySection from './PrivacySection';

export default function PrivacyContent() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {privacySections.map((section, idx) => (
            <PrivacySection
              key={section.title}
              title={section.title}
              content={section.content}
              subsections={section.subsections}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 