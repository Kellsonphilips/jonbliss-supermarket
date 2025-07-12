"use client";

import { termsSections } from '../data/sections';
import TermsSection from './TermsSection';

export default function TermsContent() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {termsSections.map((section, idx) => (
            <TermsSection
              key={section.title}
              title={section.title}
              content={section.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 