import { getSupermarketItems } from '../../store/data/supermarketItems.js';

/**
 * Get items by category
 * @param {string} category - The category name to filter by
 * @param {string} subcategory - Optional subcategory for nested categories like Drinks
 * @returns {Array} Array of items in the specified category
 */
export function getItemsByCategory(category, subcategory = null) {
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
  const items = getSupermarketItems();
  return Object.keys(items);
}

/**
 * Get subcategories for a specific category
 * @param {string} category - The category name
 * @returns {Array} Array of subcategories or empty array if none
 */
export function getSubcategories(category) {
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
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.quantity < threshold) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.quantity < threshold) {
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
  const items = getSupermarketItems();
  let total = 0;
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        total += item.quantity;
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            total += item.quantity;
          });
        }
      });
    }
  });
  
  return total;
}

/**
 * Get items sorted by price (ascending or descending)
 * @param {string} order - Sort order ('asc' or 'desc', default: 'asc')
 * @returns {Array} Array of items sorted by price
 */
export function getItemsSortedByPrice(order = 'asc') {
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
    
    return order === 'desc' ? priceB - priceA : priceA - priceB;
  });
}

/**
 * Get items sorted by quantity (ascending or descending)
 * @param {string} order - Sort order ('asc' or 'desc', default: 'desc')
 * @returns {Array} Array of items sorted by quantity
 */
export function getItemsSortedByQuantity(order = 'desc') {
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
    return order === 'desc' ? b.quantity - a.quantity : a.quantity - b.quantity;
  });
}

/**
 * Get items by name (exact match)
 * @param {string} name - The exact item name to search for
 * @returns {Array} Array of items with the exact name
 */
export function getItemsByName(name) {
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
 * Get items by weight/volume
 * @param {string} weightOrVolume - The weight or volume to filter by
 * @returns {Array} Array of items with the specified weight/volume
 */
export function getItemsByWeightOrVolume(weightOrVolume) {
  const items = getSupermarketItems();
  const results = [];
  
  Object.values(items).forEach(categoryItems => {
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        if (item.weight_or_volume.toLowerCase() === weightOrVolume.toLowerCase()) {
          results.push(item);
        }
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            if (item.weight_or_volume.toLowerCase() === weightOrVolume.toLowerCase()) {
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
  const items = getSupermarketItems();
  const stats = {};
  
  Object.keys(items).forEach(category => {
    const categoryItems = items[category];
    let totalItems = 0;
    let totalQuantity = 0;
    let totalValue = 0;
    
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        totalItems++;
        totalQuantity += item.quantity;
        const price = parseInt(item.price.replace('₦', '').replace(',', ''));
        totalValue += price * item.quantity;
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.values(categoryItems).forEach(subcategoryItems => {
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            totalItems++;
            totalQuantity += item.quantity;
            const price = parseInt(item.price.replace('₦', '').replace(',', ''));
            totalValue += price * item.quantity;
          });
        }
      });
    }
    
    stats[category] = {
      totalItems,
      totalQuantity,
      totalValue: `₦${totalValue.toLocaleString()}`,
      averagePrice: totalItems > 0 ? `₦${Math.round(totalValue / totalItems).toLocaleString()}` : '₦0'
    };
  });
  
  return stats;
}

/**
 * Get all items flattened (useful for global search)
 * @returns {Array} Array of all items with category information
 */
export function getAllItemsFlattened() {
  const items = getSupermarketItems();
  const allItems = [];
  
  Object.keys(items).forEach(category => {
    const categoryItems = items[category];
    
    if (Array.isArray(categoryItems)) {
      categoryItems.forEach(item => {
        allItems.push({
          ...item,
          category,
          subcategory: null
        });
      });
    } else if (typeof categoryItems === 'object') {
      // Handle nested categories like Drinks
      Object.keys(categoryItems).forEach(subcategory => {
        const subcategoryItems = categoryItems[subcategory];
        if (Array.isArray(subcategoryItems)) {
          subcategoryItems.forEach(item => {
            allItems.push({
              ...item,
              category,
              subcategory
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
  let items = getAllItemsFlattened();
  
  if (filters.category) {
    items = items.filter(item => item.category === filters.category);
  }
  
  if (filters.subcategory) {
    items = items.filter(item => item.subcategory === filters.subcategory);
  }
  
  if (filters.name) {
    items = items.filter(item => 
      item.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }
  
  if (filters.size) {
    items = items.filter(item => 
      item.size.toLowerCase() === filters.size.toLowerCase()
    );
  }
  
  if (filters.minPrice || filters.maxPrice) {
    items = items.filter(item => {
      const price = parseInt(item.price.replace('₦', '').replace(',', ''));
      if (filters.minPrice && price < filters.minPrice) return false;
      if (filters.maxPrice && price > filters.maxPrice) return false;
      return true;
    });
  }
  
  if (filters.minQuantity || filters.maxQuantity) {
    items = items.filter(item => {
      if (filters.minQuantity && item.quantity < filters.minQuantity) return false;
      if (filters.maxQuantity && item.quantity > filters.maxQuantity) return false;
      return true;
    });
  }
  
  return items;
}

// Default export
export default {
  getItemsByCategory,
  getAllCategories,
  getSubcategories,
  getAllDrinks,
  searchItems,
  getItemsByPriceRange,
  getItemsBySize,
  getLowStockItems,
  getTotalInventoryCount,
  getItemsSortedByPrice,
  getItemsSortedByQuantity,
  getItemsByName,
  getItemsByWeightOrVolume,
  getCategoryStats,
  getAllItemsFlattened,
  getItemsByFilters
}; 