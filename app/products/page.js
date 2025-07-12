"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { SupermarketProvider, useSupermarket } from '../../utils/SupermarketContext';
import ProductCard from '../../components/ProductCard';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Add debounce utility
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const { getAllCategories, getItemsByCategory, searchItems, getItemsByFilters, getGroupedItemsByBaseName, getVarietiesByBaseName } = useSupermarket();
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || 'all');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);
  const [sortBy, setSortBy] = useState('name');
  const [showInStockOnly, setShowInStockOnly] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState(urlCategory || 'all');
  const [pendingSortBy, setPendingSortBy] = useState('name');
  const [pendingShowInStockOnly, setPendingShowInStockOnly] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);

  // Track changes when sidebar opens
  useEffect(() => {
    if (sidebarOpen) {
      setPendingCategory(selectedCategory);
      setPendingSortBy(sortBy);
      setPendingShowInStockOnly(showInStockOnly);
      setHasChanges(false);
    }
  }, [sidebarOpen, selectedCategory, sortBy, showInStockOnly]);

  // Check for changes
  useEffect(() => {
    if (sidebarOpen) {
      const changed = 
        pendingCategory !== selectedCategory ||
        pendingSortBy !== sortBy ||
        pendingShowInStockOnly !== showInStockOnly;
      setHasChanges(changed);
    }
  }, [sidebarOpen, pendingCategory, pendingSortBy, pendingShowInStockOnly, selectedCategory, sortBy, showInStockOnly]);

  // Handle confirm button click
  const handleConfirm = () => {
    setSelectedCategory(pendingCategory);
    setSortBy(pendingSortBy);
    setShowInStockOnly(pendingShowInStockOnly);
    setSidebarOpen(false);
    setHasChanges(false);
  };

  // Handle pending category change
  const handlePendingCategoryChange = (category) => {
    setPendingCategory(category);
  };

  // Handle pending sort change
  const handlePendingSortChange = (e) => {
    setPendingSortBy(e.target.value);
  };

  // Handle pending stock filter change
  const handlePendingStockChange = (e) => {
    setPendingShowInStockOnly(e.target.checked);
  };

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarOpen && !event.target.closest('.sidebar-content') && !event.target.closest('.sidebar-toggle')) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [sidebarOpen]);

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
    if (debouncedSearchTerm) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }
    // Apply stock filter - only show products with stock if enabled
    if (showInStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    }
    // Apply sorting
    filteredProducts = sortProducts(filteredProducts, sortBy);
    setProducts(filteredProducts);
  }, [selectedCategory, debouncedSearchTerm, sortBy, showInStockOnly, categories, getGroupedItemsByBaseName, sortProducts]);

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
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">Our Products</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white drop-shadow">
              Discover quality products for all your needs
            </p>
          </div>
        </section>

        {/* Search Input */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex justify-center w-full">
              <div className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 placeholder-gray-400 text-base font-medium shadow-md transition-all duration-200"
                  style={{ minHeight: '48px' }}
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sidebar and Products Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className={`fixed inset-0 z-[60] bg-black/50 lg:bg-transparent lg:static lg:inset-auto lg:z-auto transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} lg:block`} aria-label="Sidebar Filters">
                {/* Backdrop for mobile */}
                <div 
                  className="lg:hidden absolute inset-0 bg-black/50"
                  onClick={() => setSidebarOpen(false)}
                ></div>
                
                <div className={`sidebar-content w-80 max-w-[85vw] h-full bg-white shadow-2xl lg:shadow-none lg:rounded-none lg:w-64 lg:h-auto lg:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 relative z-10`}>
                  {/* Mobile Header with Close Button */}
                  <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                      <button 
                        onClick={() => setSidebarOpen(false)} 
                        className="sidebar-toggle p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                        aria-label="Close filters"
                      >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Sidebar Content */}
                  <div className="p-6 lg:p-0 flex flex-col h-full">
                    <div className="flex-1">
                      {/* Category Filter */}
                      <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-3">Categories</h3>
                        <div className="flex flex-wrap lg:flex-col gap-2">
                          <button
                            onClick={() => handlePendingCategoryChange('all')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${pendingCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                          >
                            All
                          </button>
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => handlePendingCategoryChange(category)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${pendingCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>
                      {/* Stock Filter */}
                      <div className="mb-6">
                        <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={pendingShowInStockOnly}
                            onChange={handlePendingStockChange}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span>In Stock Only</span>
                        </label>
                      </div>
                      {/* Sort */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                        <select
                          value={pendingSortBy}
                          onChange={handlePendingSortChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          <option value="name">Sort by Name</option>
                          <option value="price-low-high">Price: Low to High</option>
                          <option value="price-high-low">Price: High to Low</option>
                          <option value="stock-high-low">Stock: High to Low</option>
                          <option value="stock-low-high">Stock: Low to High</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Confirm Button - Mobile Only */}
                    <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
                      <button
                        onClick={handleConfirm}
                        disabled={!hasChanges}
                        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                          hasChanges 
                            ? 'bg-primary text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {hasChanges ? 'Confirm Changes' : 'No Changes Made'}
                      </button>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Sidebar Toggle Button for Mobile */}
              <button
                className="sidebar-toggle lg:hidden mb-4 px-4 py-2 bg-primary text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-all duration-200 w-max"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open Filters"
              >
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Filters
              </button>

              {/* Products Grid */}
              <div className="flex-1">
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">No products found</h3>
                    <p className="mt-1 text-base text-gray-500">
                      Sorry, we couldn&apos;t find any products matching your search.
                    </p>
                    {debouncedSearchTerm && (
                      <p className="mt-2 text-sm text-gray-400">Try a different keyword or check your spelling.</p>
                    )}
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
            </div>
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