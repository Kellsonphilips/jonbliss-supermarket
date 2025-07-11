"use client";

import { useState } from 'react';
import { faqSections } from '../data/faqData';
import FAQSection from './FAQSection';
import ContactCTA from './ContactCTA';

export default function FAQContent() {
  const [openFaq, setOpenFaq] = useState(null);
  let faqIndex = 0;

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="space-y-8">
            {faqSections.map((section, sectionIdx) => {
              const startIndex = faqIndex;
              faqIndex += section.faqs.length;
              return (
                <FAQSection
                  key={section.title}
                  section={section}
                  openFaq={openFaq}
                  setOpenFaq={setOpenFaq}
                  startIndex={startIndex}
                />
              );
            })}
          </div>
          <ContactCTA />
        </div>
      </div>
    </section>
  );
} 