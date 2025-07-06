"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SupermarketProvider, useSupermarket } from '@/utils/SupermarketContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';

function HomeContent() {
  const { getAllCategories, getItemsByCategory, getItemsSortedByPrice } = useSupermarket();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get categories excluding Drinks (since it's nested)
    const allCategories = getAllCategories().filter(cat => cat !== 'Drinks');
    setCategories(allCategories);

    // Get featured products (top 8 by price)
    const sortedProducts = getItemsSortedByPrice('desc').slice(0, 8);
    setFeaturedProducts(sortedProducts);
  }, [getAllCategories, getItemsSortedByPrice]);

  return (
    <>
      <Head>
        <title>Jonbliss Supermarket - Your One-Stop Shop for Quality Products</title>
        <meta name="description" content="Discover quality products at Jonbliss Supermarket. From groceries to household items, we have everything you need at competitive prices." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-red-orange text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-red-orange">Jonbliss</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Your trusted destination for quality groceries, household items, and more. 
                Fresh products, competitive prices, and exceptional service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products" 
                      className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-orange transition duration-300">
                  Shop Now
                </Link>
                <Link href="/products?category=Cereals" 
                      className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition duration-300">
                  View Categories
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">Premium products with quality assurance</p>
              </div>
              <div className="text-center">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Competitive prices for all your needs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our wide range of products organized by categories for easy shopping
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link 
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300 hover:scale-105"
                >
                  <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">{category}</h3>
                </Link>
              ))}
              <Link 
                href="/products?category=Drinks"
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Drinks</h3>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and trending products
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link 
                href="/products"
                className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-orange transition duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Jonbliss for their daily needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products"
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition duration-300"
              >
                Browse Products
              </Link>
              <Link 
                href="/signup"
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition duration-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <SupermarketProvider>
      <HomeContent />
    </SupermarketProvider>
  );
}
