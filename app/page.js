"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SupermarketProvider, useSupermarket } from '../utils/SupermarketContext';
import HeroSlideshow from '../components/HeroSlideshow';
import ProductCard from '../components/ProductCard';
import Image from 'next/image';

function HomeContent() {
  const { getAllCategories, getItemsByCategory, getItemsSortedByQuantity } = useSupermarket();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadHomeData = () => {
      try {
        // Get all categories
        const allCategories = getAllCategories();
        setCategories(allCategories.slice(0, 6)); // Show first 6 categories

        // Get featured products (top selling items)
        const topProducts = getItemsSortedByQuantity('desc')
          .filter(product => product.stock > 0) // Only show products with stock
          .slice(0, 8);
        setFeaturedProducts(topProducts);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
      setLoading(false);
    };

    loadHomeData();
  }, [getAllCategories, getItemsSortedByQuantity]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Jonbliss Supermarket - Quality Groceries Delivered</title>
        <meta name="description" content="Shop quality groceries, household items, and more at Jonbliss Supermarket. Fast delivery, competitive prices, and excellent customer service." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <HeroSlideshow />

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our wide range of products organized by category for easy shopping
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category, index) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={`group bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-white/20 shadow-lg ${selectedCategory === category ? 'ring-4 ring-primary/40 border-primary' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-all duration-300 ${selectedCategory === category ? 'bg-primary/10 ring-4 ring-primary/40 scale-110' : ''}`}>
                    <span className={`text-4xl group-hover:scale-110 transition-transform duration-300 ${selectedCategory === category ? 'text-primary scale-125' : ''}`}>
                      {category === 'Cereals' && '🌾'}
                      {category === 'Beverages' && '🧃'}
                      {category === 'Snacks' && '🍪'}
                      {category === 'Household' && '🧹'}
                      {category === 'Personal Care' && '🪥'}
                      {category === 'Drinks' && '🥤'}
                      {category === 'Fruits & Vegetables' && '🍎'}
                      {category === 'Dairy & Eggs' && '🧀'}
                      {category === 'Meat & Fish' && '🐟'}
                      {category === 'Bakery' && '🍞'}
                      {category === 'Frozen Foods' && '❄️'}
                      {category === 'Canned Goods' && '🥫'}
                      {category === 'Condiments' && '🥄'}
                      {category === 'Baby Care' && '🍼'}
                      {category === 'Pet Supplies' && '🐾'}
                      {category === 'Health & Wellness' && '🩺'}
                      {category === 'Cleaning Supplies' && '🧴'}
                      {category === 'Paper & Plastic' && '🧻'}
                      {category === 'Electronics' && '💡'}
                      {category === 'Clothing' && '👗'}
                      {category === 'Toiletries' && '🧻'}
                      {category === 'Baby Items' && '🧸'}
                      {category === 'Cosmetics' && '💄'}
                      {category === 'Household Items' && '🧺'}
                      {/* Add any missing categories here, e.g.: */}
                      {category === 'Groceries' && '🛍️'}
                      {category === 'Vegetables' && '🥦'}
                      {category === 'Fish' && '🐠'}
                      {category === 'Eggs' && '🥚'}
                      {category === 'Milk' && '🥛'}
                      {/* Fallback icon for any category not listed above */}
                      {!['Cereals', 'Beverages', 'Snacks', 'Household', 'Personal Care', 'Drinks', 'Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Fish', 'Bakery', 'Frozen Foods', 'Canned Goods', 'Condiments', 'Baby Care', 'Pet Supplies', 'Health & Wellness', 'Cleaning Supplies', 'Paper & Plastic', 'Electronics', 'Clothing', 'Groceries', 'Vegetables', 'Fish', 'Eggs', 'Milk', 'Toiletries', 'Baby Items', 'Cosmetics', 'Household Items'].includes(category) && '🛒'}
                    </span>
                  </div>
                  <h3 className={`font-semibold text-sm group-hover:text-primary transition-colors duration-300 ${selectedCategory === category ? 'text-primary' : ''}`}>
                    {category}
                  </h3>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-red-700 transition duration-300"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our most popular items that customers love
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id || index} product={product} />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-red-700 transition duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/all-range.jpg"
              alt="Inside supermarket view"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              style={{ zIndex: 0 }}
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-white drop-shadow">
              Join thousands of satisfied customers who trust Jonbliss Supermarket for their daily needs
            </p>
            <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-white text-sm sm:text-base md:text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-primary transition-all duration-300 bg-primary/80 hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-0 flex-1 sm:flex-none sm:w-auto"
              >
                <span className="truncate">Shop Now</span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-white text-sm sm:text-base md:text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-primary transition-all duration-300 bg-primary/80 hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-0 flex-1 sm:flex-none sm:w-auto"
              >
                <span className="truncate">Learn More</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Same-day delivery available for orders placed before 2 PM
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">
                  All products meet our high quality standards
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600">
                  Multiple secure payment options available
                </p>
              </div>
            </div>
          </div>
        </section>
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
