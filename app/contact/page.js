"use client";

import Head from 'next/head';
import { 
  ContactHero, 
  ContactInfo, 
  ContactMain, 
  ContactMap 
} from './components';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Jonbliss Supermarket</title>
        <meta name="description" content="Get in touch with Jonbliss Supermarket. We're here to help with your questions, feedback, and shopping needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <ContactHero />
        <ContactInfo />
        <ContactMain />
        <ContactMap />
      </div>
    </>
  );
} 