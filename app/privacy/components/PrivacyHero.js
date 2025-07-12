"use client";

export default function PrivacyHero({ lastUpdated }) {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-r from-primary to-red-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto">
          Your privacy is important to us. Learn how we protect and handle your information.
        </p>
        <p className="text-lg mt-4 opacity-90">Last updated: {lastUpdated}</p>
      </div>
    </section>
  );
} 