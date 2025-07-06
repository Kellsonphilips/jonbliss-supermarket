"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getSupermarketData, getAllCategories, getSubcategories, getItemsByCategory, searchItems, getItemsByPriceRange, getItemsBySize, getItemsSortedByPrice, getItemsSortedByQuantity } from './supermarketUtils';

const SupermarketContext = createContext();

export { SupermarketContext };

export function useSupermarket() {
  const context = useContext(SupermarketContext);
  if (!context) {
    throw new Error('useSupermarket must be used within a SupermarketProvider');
  }
  return context;
}

export function SupermarketProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load supermarket data
    const loadData = async () => {
      try {
        const supermarketData = getSupermarketData();
        setData(supermarketData);
      } catch (error) {
        console.error('Error loading supermarket data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const value = {
    data,
    loading,
    getAllCategories: () => getAllCategories(data),
    getSubcategories: (category) => getSubcategories(data, category),
    getItemsByCategory: (category, subcategory) => getItemsByCategory(data, category, subcategory),
    searchItems: (query) => searchItems(data, query),
    getItemsByPriceRange: (min, max) => getItemsByPriceRange(data, min, max),
    getItemsBySize: (size) => getItemsBySize(data, size),
    getItemsSortedByPrice: (order = 'asc') => getItemsSortedByPrice(data, order),
    getItemsSortedByQuantity: (order = 'asc') => getItemsSortedByQuantity(data, order),
  };

  return (
    <SupermarketContext.Provider value={value}>
      {children}
    </SupermarketContext.Provider>
  );
}
