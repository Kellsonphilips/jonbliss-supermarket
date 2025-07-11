"use client";

import Head from 'next/head';
import { useCookieTabs } from './hooks';
import { CookieHero, CookieTabs, CookieContent } from './components';

export default function CookiePolicy() {
  const { activeTab, setActiveTab } = useCookieTabs();
  const lastUpdated = "December 15, 2024";

  return (
    <>
      <Head>
        <title>Cookie Policy - Jonbliss Supermarket</title>
        <meta
          name="description"
          content="Learn about how Jonbliss Supermarket uses cookies and similar technologies to enhance your browsing experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CookieHero lastUpdated={lastUpdated} />
        
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <CookieTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <CookieContent activeTab={activeTab} />
          </div>
        </section>
      </div>
    </>
  );
} 