"use client";

import Image from 'next/image';

export default function ProductsHero({ hero = null }) {
  // Default hero data if none provided
  const defaultHero = {
    title: "Our Products",
    subtitle: "Discover our wide selection of fresh groceries and household essentials",
    image: {
      src: "/all-range.jpg",
      alt: "Products collection"
    }
  };

  const heroData = hero || defaultHero;

  return (
    <section className="pt-20 pb-16 relative">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroData.image.src}
          alt={heroData.image.alt}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">{heroData.title}</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white drop-shadow">
          {heroData.subtitle}
        </p>
      </div>
    </section>
  );
} 