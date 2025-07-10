const fs = require('fs');
const path = require('path');

// Fruits & Vegetables items data
const fruitsAndVegetablesItems = [
  {
    name: "Organic Bananas",
    category: "Fruits & Vegetables",
    price: 450,
    stock: 234,
    status: "active",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=60&h=60&fit=crop",
    sku: "BAN-001",
    isFeatured: true,
    isOnSale: false
  },
  {
    name: "Fresh Tomatoes",
    category: "Fruits & Vegetables",
    price: 350,
    stock: 189,
    status: "active",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=60&h=60&fit=crop",
    sku: "TOM-001",
    isFeatured: true,
    isOnSale: false
  },
  {
    name: "Green Bell Peppers",
    category: "Fruits & Vegetables",
    price: 280,
    stock: 156,
    status: "active",
    image: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=60&h=60&fit=crop",
    sku: "PEP-001",
    isFeatured: false,
    isOnSale: true
  },
  {
    name: "Fresh Onions",
    category: "Fruits & Vegetables",
    price: 320,
    stock: 267,
    status: "active",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=60&h=60&fit=crop",
    sku: "ONI-001",
    isFeatured: false,
    isOnSale: false
  },
  {
    name: "Organic Carrots",
    category: "Fruits & Vegetables",
    price: 420,
    stock: 198,
    status: "active",
    image: "https://images.unsplash.com/photo-1447175008436-1701707d0aa3?w=60&h=60&fit=crop",
    sku: "CAR-001",
    isFeatured: true,
    isOnSale: false
  },
  {
    name: "Fresh Spinach",
    category: "Fruits & Vegetables",
    price: 380,
    stock: 145,
    status: "active",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=60&h=60&fit=crop",
    sku: "SPI-001",
    isFeatured: false,
    isOnSale: true
  },
  {
    name: "Sweet Potatoes",
    category: "Fruits & Vegetables",
    price: 550,
    stock: 178,
    status: "active",
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=60&h=60&fit=crop",
    sku: "SWP-001",
    isFeatured: false,
    isOnSale: false
  },
  {
    name: "Fresh Garlic",
    category: "Fruits & Vegetables",
    price: 290,
    stock: 223,
    status: "active",
    image: "https://images.unsplash.com/photo-1587735243615-4d25c5c3c4c0?w=60&h=60&fit=crop",
    sku: "GAR-001",
    isFeatured: false,
    isOnSale: false
  },
  {
    name: "Organic Apples",
    category: "Fruits & Vegetables",
    price: 680,
    stock: 167,
    status: "active",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=60&h=60&fit=crop",
    sku: "APP-001",
    isFeatured: true,
    isOnSale: false
  },
  {
    name: "Fresh Oranges",
    category: "Fruits & Vegetables",
    price: 520,
    stock: 189,
    status: "active",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=60&h=60&fit=crop",
    sku: "ORA-001",
    isFeatured: false,
    isOnSale: true
  },
  {
    name: "Ripe Mangoes",
    category: "Fruits & Vegetables",
    price: 750,
    stock: 134,
    status: "active",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=60&h=60&fit=crop",
    sku: "MAN-001",
    isFeatured: true,
    isOnSale: false
  },
  {
    name: "Fresh Pineapples",
    category: "Fruits & Vegetables",
    price: 890,
    stock: 98,
    status: "active",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
    sku: "PIN-001",
    isFeatured: false,
    isOnSale: true
  },
  {
    name: "Organic Cucumbers",
    category: "Fruits & Vegetables",
    price: 320,
    stock: 167,
    status: "active",
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=60&h=60&fit=crop",
    sku: "CUC-001",
    isFeatured: false,
    isOnSale: false
  },
  {
    name: "Fresh Lettuce",
    category: "Fruits & Vegetables",
    price: 280,
    stock: 145,
    status: "active",
    image: "https://images.unsplash.com/photo-1622205313162-be1d5716a43b?w=60&h=60&fit=crop",
    sku: "LET-001",
    isFeatured: false,
    isOnSale: false
  },
  {
    name: "Green Beans",
    category: "Fruits & Vegetables",
    price: 380,
    stock: 123,
    status: "active",
    image: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?w=60&h=60&fit=crop",
    sku: "BEA-001",
    isFeatured: false,
    isOnSale: true
  }
];

// Helper function to generate SKU
function generateSKU(name, category) {
  const prefix = category === "Fruits & Vegetables" ? 
    name.substring(0, 3).toUpperCase() : 
    name.substring(0, 3).toUpperCase();
  const randomNum = Math.floor(Math.random() * 999) + 1;
  return `${prefix}-${randomNum.toString().padStart(3, '0')}`;
}

// Helper function to generate random stock
function generateStock() {
  return Math.floor(Math.random() * 300) + 50;
}

// Helper function to determine if item should be featured
function shouldBeFeatured() {
  return Math.random() < 0.2; // 20% chance
}

// Helper function to determine if item should be on sale
function shouldBeOnSale() {
  return Math.random() < 0.3; // 30% chance
}

// Helper function to convert price string to number
function convertPriceToNumber(priceString) {
  if (typeof priceString === 'number') return priceString;
  return parseInt(priceString.replace(/[₦,]/g, '')) || Math.floor(Math.random() * 5000) + 100;
}

// Helper function to get appropriate image based on category
function getCategoryImage(category, name) {
  const categoryImages = {
    "Cereals": "https://images.unsplash.com/photo-1612507093780-705c6c2bfd05?w=60&h=60&fit=crop",
    "Beverages": "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=60&h=60&fit=crop",
    "Snacks": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=60&h=60&fit=crop",
    "Dairy": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=60&h=60&fit=crop",
    "Bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=60&h=60&fit=crop",
    "Canned Goods": "https://images.unsplash.com/photo-1584270357649-c26e0d0d4b7c?w=60&h=60&fit=crop",
    "Frozen Foods": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=60&h=60&fit=crop",
    "Personal Care": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
    "Household": "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=60&h=60&fit=crop",
    "Baby Care": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
    "Pet Care": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
    "Health & Wellness": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
    "Fruits & Vegetables": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=60&h=60&fit=crop"
  };
  
  return categoryImages[category] || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop";
}

// Main function to update items
function updateSupermarketItems() {
  try {
    // Read the current file
    const filePath = path.join(__dirname, '../store/data/supermarketItems.js');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the existing data structure - look for the return statement
    const dataMatch = content.match(/return\s*(\{[\s\S]*?\});\s*}/);
    
    if (!dataMatch) {
      throw new Error('Could not parse existing data structure');
    }
    
    // Create a safe evaluation context
    const existingData = Function('return ' + dataMatch[1])();
    let itemId = 1;
    const updatedData = {};
    
    // Process each category
    Object.keys(existingData).forEach(category => {
      if (category === 'Drinks' && typeof existingData[category] === 'object' && !Array.isArray(existingData[category])) {
        // Flatten subcategories
        const drinksFlat = [];
        Object.entries(existingData[category]).forEach(([subcat, items]) => {
          if (Array.isArray(items)) {
            items.forEach(item => {
              drinksFlat.push({ ...item, subcategory: subcat });
            });
          }
        });
        updatedData[category] = drinksFlat.map(item => ({
          id: itemId++,
          name: item.name,
          category: category,
          subcategory: item.subcategory,
          price: convertPriceToNumber(item.price),
          stock: generateStock(),
          status: "active",
          image: getCategoryImage(category, item.name),
          sku: generateSKU(item.name, category),
          isFeatured: shouldBeFeatured(),
          isOnSale: shouldBeOnSale()
        }));
      } else if (Array.isArray(existingData[category])) {
        updatedData[category] = existingData[category].map(item => {
          const updatedItem = {
            id: itemId++,
            name: item.name,
            category: category,
            price: convertPriceToNumber(item.price),
            stock: generateStock(),
            status: "active",
            image: getCategoryImage(category, item.name),
            sku: generateSKU(item.name, category),
            isFeatured: shouldBeFeatured(),
            isOnSale: shouldBeOnSale()
          };
          return updatedItem;
        });
      } else {
        console.warn(`Warning: Category "${category}" is not an array or drinks object, skipping...`);
      }
    });
    
    // Add Fruits & Vegetables category
    updatedData["Fruits & Vegetables"] = fruitsAndVegetablesItems.map(item => ({
      ...item,
      id: itemId++
    }));
    
    // Generate the new file content
    const newContent = `/**
 * Supermarket Items Data
 * This function returns all supermarket items organized by categories
 * @returns {Object} Object containing all supermarket items categorized by product type
 */
export function getSupermarketItems() {
  return ${JSON.stringify(updatedData, null, 2)};
}`;
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    
    console.log('✅ Successfully updated supermarket items!');
    console.log(`📊 Total items updated: ${itemId - 1}`);
    console.log(`📁 Categories: ${Object.keys(updatedData).join(', ')}`);
    console.log(`🥤 Drinks flattened with subcategories. 🥬 Fruits & Vegetables added.`);
    
  } catch (error) {
    console.error('❌ Error updating supermarket items:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// --- BASE NAME ADDER SCRIPT START ---
const itemsFile = path.join(__dirname, '../store/data/supermarketItems.js');

function addBaseNameToItems() {
  let fileContent = fs.readFileSync(itemsFile, 'utf8');
  // Extract the object literal from the export function
  const match = fileContent.match(/return\s*({[\s\S]*});/);
  if (!match) {
    console.error('Could not find items object in supermarketItems.js');
    return;
  }
  let itemsObjStr = match[1];
  // Convert to JSON-compatible string
  let jsonStr = itemsObjStr
    .replace(/(\w+):/g, '"$1":') // unquoted keys to quoted
    .replace(/,\s*}/g, '}') // remove trailing commas
    .replace(/,\s*]/g, ']');
  let itemsObj;
  try {
    itemsObj = JSON.parse(jsonStr);
  } catch (e) {
    console.error('Failed to parse items object:', e);
    return;
  }
  let updatedCount = 0;
  for (const category in itemsObj) {
    itemsObj[category] = itemsObj[category].map(item => {
      if (!item.baseName) {
        item.baseName = item.name;
        updatedCount++;
      }
      // If item has subcategory or varieties as arrays, handle recursively (not seen in sample, but future-proof)
      if (Array.isArray(item.varieties)) {
        item.varieties = item.varieties.map(v => {
          if (!v.baseName) v.baseName = v.name;
          return v;
        });
      }
      return item;
    });
  }
  // Write back to file (as JS, not JSON)
  const newObjStr = JSON.stringify(itemsObj, null, 2);
  const newFileContent = fileContent.replace(/return\s*({[\s\S]*});/, `return ${newObjStr};`);
  fs.writeFileSync(itemsFile, newFileContent, 'utf8');
  console.log(`Added baseName to ${updatedCount} items.`);
}

if (require.main === module) {
  addBaseNameToItems();
}
// --- BASE NAME ADDER SCRIPT END ---

// Run the update
updateSupermarketItems(); 