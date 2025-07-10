"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { 
  getItemsByCategory, 
  getAllCategories, 
  getSubcategories,
  searchItems,
  getItemsByPriceRange,
  getItemsSortedByPrice,
  getItemsSortedByQuantity,
  getAllItemsFlattened,
  getItemsByFilters,
  getGroupedItemsByBaseName,
  getVarietiesByBaseName
} from './supermarketUtils';

const SupermarketContext = createContext();

export function SupermarketProvider({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for data initialization
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const value = {
    loading,
    getItemsByCategory,
    getAllCategories,
    getSubcategories,
    searchItems,
    getItemsByPriceRange,
    getItemsSortedByPrice,
    getItemsSortedByQuantity,
    getAllItemsFlattened,
    getItemsByFilters,
    getGroupedItemsByBaseName,
    getVarietiesByBaseName
  };

  return (
    <SupermarketContext.Provider value={value}>
      {children}
    </SupermarketContext.Provider>
  );
}

export function useSupermarket() {
  const context = useContext(SupermarketContext);
  if (context === undefined) {
    throw new Error('useSupermarket must be used within a SupermarketProvider');
  }
  return context;
}
