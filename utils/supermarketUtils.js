// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Import store data only in browser environment
let getSupermarketItems;
if (isBrowser) {
  try {
    const storeModule = require('../store/data/supermarketItems.js');
    getSupermarketItems = storeModule.getSupermarketItems;
  } catch (error) {
    console.error('Error loading supermarket items:', error);
    getSupermarketItems = () => ({});
  }
} else {
  // Server-side fallback
  getSupermarketItems = () => ({});
}

/**
 * Get items by category
 * @param {string} category - The category name to filter by
 * @param {string} subcategory - Optional subcategory for nested categories like Drinks
 * @returns {Array} Array of items in the specified category
 */
export function getItemsByCategory(category, subcategory = null) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  
  if (subcategory && items[category] && items[category][subcategory]) {
    return items[category][subcategory] || [];
  }
  
  return items[category] || [];
}

/**
 * Get all categories
 * @returns {Array} Array of all available categories
 */
export function getAllCategories() {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  return Object.keys(items);
}

/**
 * Get subcategories for a specific category
 * @param {string} category - The category name
 * @returns {Array} Array of subcategories or empty array if none
 */
export function getSubcategories(category) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const categoryData = items[category];
  
  if (categoryData && typeof categoryData === 'object' && !Array.isArray(categoryData)) {
    return Object.keys(categoryData);
  }
  
  return [];
}

/**
 * Get all drinks items (combines all drink subcategories)
 * @returns {Array} Array of all drink items
 */
export function getAllDrinks() {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const drinks = items.Drinks || {};
  const allDrinks = [];
  
  Object.values(drinks).forEach(subcategory => {
    if (Array.isArray(subcategory)) {
      allDrinks.push(...subcategory);
    }
  });
  
  return allDrinks;
}

/**
 * Search items by name
 * @param {string} searchTerm - The search term to look for in item names
 * @returns {Array} Array of items matching the search term
 */
export function searchItems(searchTerm) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get items by price range
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Array} Array of items within the price range
 */
export function getItemsByPriceRange(minPrice, maxPrice) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        const price = parseInt(item.price.replace('₦', '').replace(',', ''));
        if (price >= minPrice && price <= maxPrice) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            const price = parseInt(item.price.replace('₦', '').replace(',', ''));
            if (price >= minPrice && price <= maxPrice) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get items by size
 * @param {string} size - The size to filter by (Small, Medium, Large, Family Pack, etc.)
 * @returns {Array} Array of items with the specified size
 */
export function getItemsBySize(size) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.size.toLowerCase() === size.toLowerCase()) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.size.toLowerCase() === size.toLowerCase()) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get low stock items (quantity less than specified threshold)
 * @param {number} threshold - The quantity threshold (default: 20)
 * @returns {Array} Array of items with low stock
 */
export function getLowStockItems(threshold = 20) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if ((item.stock || 0) < threshold) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if ((item.stock || 0) < threshold) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get total inventory count
 * @returns {number} Total number of items in inventory
 */
export function getTotalInventoryCount() {
  if (!isBrowser) return 0;
  
  const items = getSupermarketItems();
  let total = 0;
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      total += categoryItems.length;
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          total += subcategoryItems.length;
        }
      });
    }
  });
  
  return total;
}

/**
 * Get items sorted by price
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Array of items sorted by price
 */
export function getItemsSortedByPrice(order = 'asc') {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const allItems = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      allItems.push(...categoryItems);
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          allItems.push(...subcategoryItems);
        }
      });
    }
  });
  
  return allItems.sort((a, b) => {
    const priceA = parseInt(a.price.replace('₦', '').replace(',', ''));
    const priceB = parseInt(b.price.replace('₦', '').replace(',', ''));
    
    if (order === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
}

/**
 * Get items sorted by quantity
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Array of items sorted by quantity
 */
export function getItemsSortedByQuantity(order = 'desc') {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const allItems = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      allItems.push(...categoryItems);
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          allItems.push(...subcategoryItems);
        }
      });
    }
  });
  
  return allItems.sort((a, b) => {
    if (order === 'asc') {
      return (a.stock || 0) - (b.stock || 0);
    } else {
      return (b.stock || 0) - (a.stock || 0);
    }
  });
}

/**
 * Get items by exact name match
 * @param {string} name - The exact name to search for
 * @returns {Array} Array of items with exact name match
 */
export function getItemsByName(name) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.name.toLowerCase() === name.toLowerCase()) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.name.toLowerCase() === name.toLowerCase()) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get items by weight or volume
 * @param {string} weightOrVolume - The weight or volume to filter by
 * @returns {Array} Array of items with the specified weight or volume
 */
export function getItemsByWeightOrVolume(weightOrVolume) {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.weight_or_volume && item.weight_or_volume.toLowerCase() === weightOrVolume.toLowerCase()) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.weight_or_volume && item.weight_or_volume.toLowerCase() === weightOrVolume.toLowerCase()) {
              results.push(item);
            }
          });
        }
      });
    }
  });
  
  return results;
}

/**
 * Get category statistics
 * @returns {Object} Object containing statistics for each category
 */
export function getCategoryStats() {
  if (!isBrowser) return {};
  
  const items = getSupermarketItems();
  const stats = {};
  
  Object.entries(items).forEach(([category, categoryItems]) => {
    if (Array.isArray(categoryItems)) {
      stats[category] = {
        itemCount: categoryItems.length,
        totalQuantity: categoryItems.reduce((sum, item) => sum + (item.stock || 0), 0),
        averagePrice: categoryItems.reduce((sum, item) => {
          const price = parseInt(item.price.replace('₦', '').replace(',', ''));
          return sum + price;
        }, 0) / categoryItems.length
      };
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      let totalItems = 0;
      let totalQuantity = 0;
      let totalPrice = 0;
      
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          totalItems += subcategoryItems.length;
          subcategoryItems.forEach(item => {
            totalQuantity += (item.stock || 0);
            totalPrice += parseInt(item.price.replace('₦', '').replace(',', ''));
          });
        }
      });
      
      stats[category] = {
        itemCount: totalItems,
        totalQuantity: totalQuantity,
        averagePrice: totalItems > 0 ? totalPrice / totalItems : 0
      };
    }
  });
  
  return stats;
}

/**
 * Get all items flattened into a single array
 * @returns {Array} Array of all items across all categories
 */
export function getAllItemsFlattened() {
  if (!isBrowser) return [];
  
  const items = getSupermarketItems();
  const allItems = [];
  
  Object.entries(items).forEach(([category, categoryItems]) => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        allItems.push({
          ...item,
          category: category
        });
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.entries(categoryItems).forEach(([subcategory, subcategoryItems]) => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            allItems.push({
              ...item,
              category: category,
              subcategory: subcategory
            });
          });
        }
      });
    }
  });
  
  return allItems;
}

/**
 * Get items by multiple filters
 * @param {Object} filters - Object containing filter criteria
 * @returns {Array} Array of items matching all filters
 */
export function getItemsByFilters(filters = {}) {
  if (!isBrowser) return [];
  
  let items = getAllItemsFlattened();
  
  if (filters.category) {
    items = items.filter(item => item.category === filters.category);
  }
  
  if (filters.subcategory) {
    items = items.filter(item => item.subcategory === filters.subcategory);
  }
  
  if (filters.minPrice) {
    items = items.filter(item => {
      const price = parseInt(item.price.replace('₦', '').replace(',', ''));
      return price >= filters.minPrice;
    });
  }
  
  if (filters.maxPrice) {
    items = items.filter(item => {
      const price = parseInt(item.price.replace('₦', '').replace(',', ''));
      return price <= filters.maxPrice;
    });
  }
  
  if (filters.size) {
    items = items.filter(item => item.size.toLowerCase() === filters.size.toLowerCase());
  }
  
  if (filters.searchTerm) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }
  
  if (filters.inStock) {
    items = items.filter(item => (item.stock || 0) > 0);
  }
  
  return items;
}

/**
 * Get grouped items by baseName (one representative per group)
 * @param {string|null} category - Optional category to filter by
 * @returns {Array} Array of representative items, one per baseName
 */
export function getGroupedItemsByBaseName(category = null) {
  if (!isBrowser) return [];
  const items = getSupermarketItems();
  let allItems = [];
  if (category && items[category]) {
    if (Array.isArray(items[category])) {
      allItems = items[category];
    } else if (typeof items[category] === 'object') {
      // Handle nested categories
      Object.values(items[category]).forEach(subcat => {
        if (Array.isArray(subcat)) allItems.push(...subcat);
      });
    }
  } else {
    // All categories
    Object.values(items).forEach(catItems => {
      if (Array.isArray(catItems)) {
        allItems.push(...catItems);
      } else if (typeof catItems === 'object') {
        Object.values(catItems).forEach(subcat => {
          if (Array.isArray(subcat)) allItems.push(...subcat);
        });
      }
    });
  }
  const grouped = {};
  allItems.forEach(item => {
    if (item.baseName && !grouped[item.baseName]) {
      grouped[item.baseName] = item;
    }
  });
  return Object.values(grouped);
}

/**
 * Get all varieties for a given baseName
 * @param {string} baseName - The baseName to search for
 * @param {string|null} category - Optional category to filter by
 * @returns {Array} Array of items with the given baseName
 */
export function getVarietiesByBaseName(baseName, category = null) {
  if (!isBrowser) return [];
  const items = getSupermarketItems();
  let allItems = [];
  if (category && items[category]) {
    if (Array.isArray(items[category])) {
      allItems = items[category];
    } else if (typeof items[category] === 'object') {
      Object.values(items[category]).forEach(subcat => {
        if (Array.isArray(subcat)) allItems.push(...subcat);
      });
    }
  } else {
    Object.values(items).forEach(catItems => {
      if (Array.isArray(catItems)) {
        allItems.push(...catItems);
      } else if (typeof catItems === 'object') {
        Object.values(catItems).forEach(subcat => {
          if (Array.isArray(subcat)) allItems.push(...subcat);
        });
      }
    });
  }
  return allItems.filter(item => item.baseName && item.baseName.toLowerCase() === baseName.toLowerCase());
}
