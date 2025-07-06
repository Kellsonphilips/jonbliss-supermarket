"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SupermarketProvider, useSupermarket } from '@/utils/SupermarketContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Link from 'next/link';

function ProductsContent() {
  const router = useRouter();
  const { 
    getAllCategories, 
    getSubcategories, 
    getItemsByCategory, 
    searchItems, 
    getItemsByPriceRange,
    getItemsBySize,
    getItemsSortedByPrice,
    getItemsSortedByQuantity
  } = useSupermarket();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedSize, setSelectedSize] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !router.isReady) return;

    const allCategories = getAllCategories();
    setCategories(allCategories);
    
    // Set initial category from URL params
    if (router.query.category) {
      setSelectedCategory(router.query.category);
    }
    
    setLoading(false);
  }, [getAllCategories, router.query.category, mounted, router.isReady]);

  useEffect(() => {
    if (selectedCategory) {
      const subs = getSubcategories(selectedCategory);
      setSubcategories(subs);
      setSelectedSubcategory('');
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, getSubcategories]);

  useEffect(() => {
    let result = [];

    // Get products based on category and subcategory
    if (selectedCategory) {
      if (selectedSubcategory) {
        result = getItemsByCategory(selectedCategory, selectedSubcategory);
      } else {
        result = getItemsByCategory(selectedCategory);
      }
    } else {
      // Get all products
      result = getAllProducts();
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply price range filter
    if (priceRange.min || priceRange.max) {
      const min = priceRange.min ? parseInt(priceRange.min) : 0;
      const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
      result = result.filter(product => {
        const price = parseInt(product.price.replace('₦', '').replace(',', ''));
        return price >= min && price <= max;
      });
    }

    // Apply size filter
    if (selectedSize) {
      result = result.filter(product => 
        product.size.toLowerCase() === selectedSize.toLowerCase()
      );
    }

    // Apply sorting
    result = sortProducts(result, sortBy, sortOrder);

    setProducts(result);
    setCurrentPage(1);
  }, [selectedCategory, selectedSubcategory, searchTerm, priceRange, selectedSize, sortBy, sortOrder]);

  const getAllProducts = () => {
    const allProducts = [];
    categories.forEach(category => {
      if (category === 'Drinks') {
        const drinks = getItemsByCategory('Drinks');
        allProducts.push(...drinks);
      } else {
        const categoryProducts = getItemsByCategory(category);
        allProducts.push(...categoryProducts);
      }
    });
    return allProducts;
  };

  const sortProducts = (products, sortBy, order) => {
    return [...products].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = parseInt(a.price.replace('₦', '').replace(',', ''));
          bValue = parseInt(b.price.replace('₦', '').replace(',', ''));
          break;
        case 'quantity':
          aValue = a.quantity;
          bValue = b.quantity;
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedSubcategory('');
    setSearchTerm('');
    setPriceRange({ min: '', max: '' });
    setSelectedSize('');
    setSortBy('name');
    setSortOrder('asc');
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const getSizeOptions = () => {
    const sizes = new Set();
    products.forEach(product => sizes.add(product.size));
    return Array.from(sizes).sort();
  };

  if (loading || !mounted) {
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
        <meta name="description" content="Browse our wide selection of quality products at Jonbliss Supermarket" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Discover our wide range of quality products</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:text-primary"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <input
                    id="search"
                    name="search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory Filter */}
                {subcategories.length > 0 && (
                  <div className="mb-6">
                    <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <select
                      id="subcategory"
                      name="subcategory"
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">All Subcategories</option>
                      {subcategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range (₦)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="priceMin"
                      name="priceMin"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="Min"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      id="priceMax"
                      name="priceMax"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="Max"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Size Filter */}
                <div className="mb-6">
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                    Size
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">All Sizes</option>
                    {getSizeOptions().map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    id="sortBy"
                    name="sortBy"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-2"
                  >
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="quantity">Quantity</option>
                  </select>
                  <select
                    id="sortOrder"
                    name="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-gray-600">
                      Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, products.length)} of {products.length} products
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-sm text-gray-500">
                      {selectedCategory && `Category: ${selectedCategory}`}
                      {selectedSubcategory && ` > ${selectedSubcategory}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {currentProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-orange transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default function Products() {
  return (
    <SupermarketProvider>
      <ProductsContent />
    </SupermarketProvider>
  );
}
