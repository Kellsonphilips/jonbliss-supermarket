"use client";

import Head from 'next/head';
import { FAQHero, FAQContent } from './components';

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Jonbliss Supermarket</title>
        <meta name="description" content="Find answers to frequently asked questions about Jonbliss Supermarket's services, delivery, and policies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <FAQHero />
        <FAQContent />
      </div>
    </>
  );
} 