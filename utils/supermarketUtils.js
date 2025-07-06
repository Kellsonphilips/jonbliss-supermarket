// Supermarket data and utilities
const supermarketData = {
  "Cereals": [
    {
      "name": "Kellogg's Corn Flakes",
      "price": "₦1,200",
      "size": "500g",
      "weight_or_volume": "500g",
      "quantity": 50,
      "category": "Cereals"
    },
    {
      "name": "Quaker Oats",
      "price": "₦800",
      "size": "400g",
      "weight_or_volume": "400g",
      "quantity": 75,
      "category": "Cereals"
    },
    {
      "name": "Golden Morn",
      "price": "₦950",
      "size": "450g",
      "weight_or_volume": "450g",
      "quantity": 60,
      "category": "Cereals"
    }
  ],
  "Beverages": [
    {
      "name": "Coca Cola",
      "price": "₦150",
      "size": "330ml",
      "weight_or_volume": "330ml",
      "quantity": 200,
      "category": "Beverages"
    },
    {
      "name": "Pepsi",
      "price": "₦140",
      "size": "330ml",
      "weight_or_volume": "330ml",
      "quantity": 180,
      "category": "Beverages"
    },
    {
      "name": "Sprite",
      "price": "₦130",
      "size": "330ml",
      "weight_or_volume": "330ml",
      "quantity": 150,
      "category": "Beverages"
    }
  ],
  "Snacks": [
    {
      "name": "Lay's Potato Chips",
      "price": "₦200",
      "size": "150g",
      "weight_or_volume": "150g",
      "quantity": 100,
      "category": "Snacks"
    },
    {
      "name": "Doritos Nacho Cheese",
      "price": "₦250",
      "size": "180g",
      "weight_or_volume": "180g",
      "quantity": 80,
      "category": "Snacks"
    },
    {
      "name": "Cheetos",
      "price": "₦180",
      "size": "120g",
      "weight_or_volume": "120g",
      "quantity": 120,
      "category": "Snacks"
    }
  ],
  "Household": [
    {
      "name": "Dettol Antiseptic",
      "price": "₦350",
      "size": "550ml",
      "weight_or_volume": "550ml",
      "quantity": 45,
      "category": "Household"
    },
    {
      "name": "Vim Dishwashing Liquid",
      "price": "₦280",
      "size": "500ml",
      "weight_or_volume": "500ml",
      "quantity": 60,
      "category": "Household"
    },
    {
      "name": "Ariel Detergent",
      "price": "₦450",
      "size": "1kg",
      "weight_or_volume": "1kg",
      "quantity": 40,
      "category": "Household"
    }
  ],
  "Personal Care": [
    {
      "name": "Colgate Toothpaste",
      "price": "₦220",
      "size": "100g",
      "weight_or_volume": "100g",
      "quantity": 90,
      "category": "Personal Care"
    },
    {
      "name": "Dove Soap",
      "price": "₦180",
      "size": "100g",
      "weight_or_volume": "100g",
      "quantity": 110,
      "category": "Personal Care"
    },
    {
      "name": "Head & Shoulders Shampoo",
      "price": "₦650",
      "size": "400ml",
      "weight_or_volume": "400ml",
      "quantity": 55,
      "category": "Personal Care"
    }
  ],
  "Drinks": {
    "Wines": [
      {
        "name": "Red Wine Merlot",
        "price": "₦2,500",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 25,
        "category": "Drinks",
        "subcategory": "Wines"
      },
      {
        "name": "White Wine Chardonnay",
        "price": "₦2,800",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 20,
        "category": "Drinks",
        "subcategory": "Wines"
      }
    ],
    "Whiskey": [
      {
        "name": "Jack Daniel's",
        "price": "₦4,500",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 15,
        "category": "Drinks",
        "subcategory": "Whiskey"
      },
      {
        "name": "Johnnie Walker Red Label",
        "price": "₦3,800",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 18,
        "category": "Drinks",
        "subcategory": "Whiskey"
      }
    ],
    "Tequila": [
      {
        "name": "Jose Cuervo Gold",
        "price": "₦3,200",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 12,
        "category": "Drinks",
        "subcategory": "Tequila"
      }
    ],
    "Rum": [
      {
        "name": "Bacardi White Rum",
        "price": "₦2,900",
        "size": "750ml",
        "weight_or_volume": "750ml",
        "quantity": 22,
        "category": "Drinks",
        "subcategory": "Rum"
      }
    ]
  }
};

// Utility functions
export function getSupermarketData() {
  return supermarketData;
}

export function getAllCategories(data = supermarketData) {
  if (!data) return [];
  return Object.keys(data).filter(category => category !== 'Drinks');
}

export function getSubcategories(data = supermarketData, category) {
  if (!data || !data[category] || typeof data[category] !== 'object') return [];
  
  if (category === 'Drinks') {
    return Object.keys(data[category]);
  }
  
  return [];
}

export function getItemsByCategory(data = supermarketData, category, subcategory = null) {
  if (!data || !data[category]) return [];
  
  if (category === 'Drinks') {
    if (subcategory && data[category][subcategory]) {
      return data[category][subcategory];
    }
    // Return all drinks if no subcategory specified
    return Object.values(data[category]).flat();
  }
  
  return data[category] || [];
}

export function searchItems(data = supermarketData, query) {
  if (!data || !query) return [];
  
  const results = [];
  const searchTerm = query.toLowerCase();
  
  // Search in regular categories
  Object.keys(data).forEach(category => {
    if (category === 'Drinks') {
      // Search in drinks subcategories
      Object.values(data[category]).forEach(items => {
        items.forEach(item => {
          if (item.name.toLowerCase().includes(searchTerm)) {
            results.push(item);
          }
        });
      });
    } else {
      // Search in regular categories
      data[category].forEach(item => {
        if (item.name.toLowerCase().includes(searchTerm)) {
          results.push(item);
        }
      });
    }
  });
  
  return results;
}

export function getItemsByPriceRange(data = supermarketData, min, max) {
  if (!data) return [];
  
  const results = [];
  
  Object.keys(data).forEach(category => {
    if (category === 'Drinks') {
      Object.values(data[category]).forEach(items => {
        items.forEach(item => {
          const price = parseInt(item.price.replace('₦', '').replace(',', ''));
          if (price >= min && price <= max) {
            results.push(item);
          }
        });
      });
    } else {
      data[category].forEach(item => {
        const price = parseInt(item.price.replace('₦', '').replace(',', ''));
        if (price >= min && price <= max) {
          results.push(item);
        }
      });
    }
  });
  
  return results;
}

export function getItemsBySize(data = supermarketData, size) {
  if (!data || !size) return [];
  
  const results = [];
  const targetSize = size.toLowerCase();
  
  Object.keys(data).forEach(category => {
    if (category === 'Drinks') {
      Object.values(data[category]).forEach(items => {
        items.forEach(item => {
          if (item.size.toLowerCase() === targetSize) {
            results.push(item);
          }
        });
      });
    } else {
      data[category].forEach(item => {
        if (item.size.toLowerCase() === targetSize) {
          results.push(item);
        }
      });
    }
  });
  
  return results;
}

export function getItemsSortedByPrice(data = supermarketData, order = 'asc') {
  if (!data) return [];
  
  const allItems = [];
  
  Object.keys(data).forEach(category => {
    if (category === 'Drinks') {
      Object.values(data[category]).forEach(items => {
        allItems.push(...items);
      });
    } else {
      allItems.push(...data[category]);
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

export function getItemsSortedByQuantity(data = supermarketData, order = 'asc') {
  if (!data) return [];
  
  const allItems = [];
  
  Object.keys(data).forEach(category => {
    if (category === 'Drinks') {
      Object.values(data[category]).forEach(items => {
        allItems.push(...items);
      });
    } else {
      allItems.push(...data[category]);
    }
  });
  
  return allItems.sort((a, b) => {
    if (order === 'asc') {
      return a.quantity - b.quantity;
    } else {
      return b.quantity - a.quantity;
    }
  });
}

// Export the data for direct use if needed
export { supermarketData };
