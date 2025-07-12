"use client";

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSupermarket } from '../../../utils/SupermarketContext';
import ProductsHero from './ProductsHero';
import ProductsSidebar from './ProductsSidebar';
import ProductsSearchBar from './ProductsSearchBar';
import ProductsGrid from './ProductsGrid';
import { productsHero } from '../data/hero';

function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function ProductsContent() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get('category');
  const { getAllCategories, getGroupedItemsByBaseName } = useSupermarket();
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

  useEffect(() => {
    if (sidebarOpen) {
      setPendingCategory(selectedCategory);
      setPendingSortBy(sortBy);
      setPendingShowInStockOnly(showInStockOnly);
      setHasChanges(false);
    }
  }, [sidebarOpen, selectedCategory, sortBy, showInStockOnly]);

  useEffect(() => {
    if (sidebarOpen) {
      const changed = 
        pendingCategory !== selectedCategory ||
        pendingSortBy !== sortBy ||
        pendingShowInStockOnly !== showInStockOnly;
      setHasChanges(changed);
    }
  }, [sidebarOpen, pendingCategory, pendingSortBy, pendingShowInStockOnly, selectedCategory, sortBy, showInStockOnly]);

  const handleConfirm = () => {
    setSelectedCategory(pendingCategory);
    setSortBy(pendingSortBy);
    setShowInStockOnly(pendingShowInStockOnly);
    setSidebarOpen(false);
    setHasChanges(false);
  };

  const handlePendingCategoryChange = (category) => {
    setPendingCategory(category);
  };

  const handlePendingSortChange = (e) => {
    setPendingSortBy(e.target.value);
  };

  const handlePendingStockChange = (e) => {
    setPendingShowInStockOnly(e.target.checked);
  };

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
        return sortedProducts.sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price));
      case 'price-high-low':
        return sortedProducts.sort((a, b) => getNumericPrice(b.price) - getNumericPrice(a.price));
      case 'stock-high-low':
        return sortedProducts.sort((a, b) => (parseInt(b.stock) || 0) - (parseInt(a.stock) || 0));
      case 'stock-low-high':
        return sortedProducts.sort((a, b) => (parseInt(a.stock) || 0) - (parseInt(b.stock) || 0));
      case 'name-a-z':
        return sortedProducts.sort((a, b) => (a.name || '').toLowerCase().localeCompare((b.name || '').toLowerCase()));
      case 'name-z-a':
        return sortedProducts.sort((a, b) => (b.name || '').toLowerCase().localeCompare((a.name || '').toLowerCase()));
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
    if (debouncedSearchTerm) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
    }
    if (showInStockOnly) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    }
    filteredProducts = sortProducts(filteredProducts, sortBy);
    setProducts(filteredProducts);
  }, [selectedCategory, debouncedSearchTerm, sortBy, showInStockOnly, categories, getGroupedItemsByBaseName, sortProducts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
      <ProductsHero hero={productsHero} />
      <ProductsSearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductsSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            categories={categories}
            pendingCategory={pendingCategory}
            handlePendingCategoryChange={handlePendingCategoryChange}
            pendingShowInStockOnly={pendingShowInStockOnly}
            handlePendingStockChange={handlePendingStockChange}
            pendingSortBy={pendingSortBy}
            handlePendingSortChange={handlePendingSortChange}
            handleConfirm={handleConfirm}
            hasChanges={hasChanges}
          />
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
          <div className="flex-1">
            <ProductsGrid
              products={products}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              debouncedSearchTerm={debouncedSearchTerm}
            />
          </div>
        </div>
      </div>
    </>
  );
} 