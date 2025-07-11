"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SupermarketProvider, useSupermarket } from '../../utils/SupermarketContext';
import ProductCard from '../../components/ProductCard';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const { getAllCategories, getItemsByCategory, searchItems, getItemsByFilters, getGroupedItemsByBaseName, getVarietiesByBaseName } = useSupermarket();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showInStockOnly, setShowInStockOnly] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const allCategories = getAllCategories();
      setCategories(allCategories);
      // Use grouped items for initial load
      const grouped = getGroupedItemsByBaseName();
      setProducts(grouped);
      setLoading(false);
    };
    loadData();
  }, [getAllCategories, getGroupedItemsByBaseName]);

  useEffect(() => {
    if (urlCategory && urlCategory !== selectedCategory) {
      setSelectedCategory(urlCategory);
    }
  }, [urlCategory, selectedCategory]);

  const sortProducts = useCallback((products, sortBy) => {
    if (!products || products.length === 0) return products;
    
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-low-high':
        return sortedProducts.sort((a, b) => {
          const priceA = getNumericPrice(a.price);
          const priceB = getNumericPrice(b.price);
          return priceA - priceB;
        });
        
      case 'price-high-low':
        return sortedProducts.sort((a, b) => {
          const priceA = getNumericPrice(a.price);
          const priceB = getNumericPrice(b.price);
          return priceB - priceA;
        });
        
      case 'stock-high-low':
        return sortedProducts.sort((a, b) => {
          const stockA = parseInt(a.stock) || 0;
          const stockB = parseInt(b.stock) || 0;
          return stockB - stockA;
        });
        
      case 'stock-low-high':
        return sortedProducts.sort((a, b) => {
          const stockA = parseInt(a.stock) || 0;
          const stockB = parseInt(b.stock) || 0;
          return stockA - stockB;
        });
        
      case 'name-a-z':
        return sortedProducts.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
      case 'name-z-a':
        return sortedProducts.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameB.localeCompare(nameA);
        });
        
      default:
        return sortedProducts;
    }
  }, []);

  useEffect(() => {
    let filteredProducts = [];
    if (selectedCategory === 'all') {
      filteredProducts = getGroupedItemsByBaseName();
    } else {
      filteredProducts = getGroupedItemsByBaseName(selectedCategory);
    }
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Apply stock filter - only show products with stock if enabled
    if (showInStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    }
    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, sortBy);
    setProducts(filteredProducts);
  }, [selectedCategory, searchTerm, sortBy, showInStockOnly, categories, getGroupedItemsByBaseName, sortProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Helper function to extract numeric price value
  const getNumericPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      // Remove currency symbol, commas, and spaces, then parse
      const cleanPrice = price.replace(/[₦$,]/g, '').replace(/\s/g, '');
      const numericPrice = parseFloat(cleanPrice);
      return isNaN(numericPrice) ? 0 : numericPrice;
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Products - Jonbliss Supermarket</title>
        <meta name="description" content="Browse our wide selection of quality products at Jonbliss Supermarket. Find groceries, household items, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
              alt="Fresh groceries and products"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">Our Products</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white drop-shadow">
              Discover quality products for all your needs
            </p>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Stock Filter */}
              <div className="flex items-center space-x-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="stock-high-low">Stock: High to Low</option>
                <option value="stock-low-high">Stock: Low to High</option>
              </select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="text-gray-600">
                    Showing {products.length} product{products.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                    {searchTerm && ` matching "${searchTerm}"`}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <ProductCard key={product.id || index} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default function Products() {
  return (
    <SupermarketProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div><p className="mt-4 text-gray-600">Loading products...</p></div></div>}>
        <ProductsContent />
      </Suspense>
    </SupermarketProvider>
  );
} 