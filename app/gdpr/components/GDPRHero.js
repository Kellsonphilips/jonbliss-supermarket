"use client";

export default function GDPRHero({ lastUpdated }) {
  return (
    <section
      className="pt-20 pb-16 text-white relative min-h-[300px] flex items-center justify-center"
      style={{
        backgroundImage: "url('/policy.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">GDPR Compliance</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto drop-shadow">
          Your data protection rights under the General Data Protection Regulation
        </p>
        <p className="text-lg mt-4 opacity-90">Last updated: {lastUpdated}</p>
      </div>
    </section>
  );
} 