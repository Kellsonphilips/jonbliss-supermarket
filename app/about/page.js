"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Stats from './Stats';
import StoryMissionTabs from './StoryMissionTabs';
import CoreValues from './CoreValues';
import Team from './Team';
import CTASection from './CTASection';
import { stats } from './statsData';
import { values } from './valuesData';
import { team } from './teamData';

export default function About() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <>
      <Head>
        <title>About Us - Jonbliss Supermarket</title>
        <meta name="description" content="Learn about Jonbliss Supermarket's journey, mission, and commitment to providing quality products and exceptional service to our community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative text-white overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <Image src="/about.jpg" alt="About Jonbliss" fill className="w-full h-full object-cover object-center" priority />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">About Jonbliss</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-md">
              Your trusted partner for quality groceries and exceptional service since 2014
            </p>
          </div>
        </section>
        <Stats stats={stats} />
        <StoryMissionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <CoreValues values={values} />
        <Team team={team} />
        <CTASection />
      </div>
    </>
  );
} 