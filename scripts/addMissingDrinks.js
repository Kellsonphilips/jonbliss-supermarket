const fs = require('fs');
const path = require('path');

// Read the original data
const originalData = JSON.parse(fs.readFileSync('supermarketItems.json', 'utf8'));

// Read the current data
const currentDataPath = path.join(__dirname, '../store/data/supermarketItems.js');
const currentDataContent = fs.readFileSync(currentDataPath, 'utf8');

// Extract the current data object
const currentDataMatch = currentDataContent.match(/export function getSupermarketItems\(\) \{\s*return\s*(\{[\s\S]*\});\s*\}/);
if (!currentDataMatch) {
  console.error('Could not parse current data file');
  process.exit(1);
}

let currentData;
try {
  // Create a temporary function to evaluate the data
  const tempFunction = new Function(`return ${currentDataMatch[1]}`);
  currentData = tempFunction();
} catch (error) {
  console.error('Error parsing current data:', error);
  process.exit(1);
}

// Get the next available ID
let maxId = 0;
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    currentData[category].forEach(item => {
      if (item.id && item.id > maxId) {
        maxId = item.id;
      }
    });
  }
});

console.log(`Current max ID: ${maxId}`);

// Add drink categories with proper structure
const drinkCategories = [
  'Beverages (Non-Alcoholic)',
  'Beverages (Alcoholic)', 
  'Wines',
  'Whiskey',
  'Tequila',
  'Rum'
];

drinkCategories.forEach(category => {
  if (originalData[category] && Array.isArray(originalData[category])) {
    console.log(`Processing ${category}: ${originalData[category].length} items`);
    
    // Transform items to new structure
    const transformedItems = originalData[category].map((item, index) => {
      maxId++;
      return {
        id: maxId,
        name: item.name || item.product || `Unknown ${category} Item ${index + 1}`,
        category: category,
        price: typeof item.price === 'number' ? item.price : Math.floor(Math.random() * 5000) + 500,
        stock: typeof item.stock === 'number' ? item.stock : Math.floor(Math.random() * 300) + 50,
        status: "active",
        image: item.image || "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=60&h=60&fit=crop",
        sku: item.sku || `${category.substring(0, 3).toUpperCase()}-${String(maxId).padStart(3, '0')}`,
        isFeatured: Math.random() < 0.1, // 10% chance
        isOnSale: Math.random() < 0.15, // 15% chance
        subcategory: category // Add subcategory field for drinks
      };
    });
    
    currentData[category] = transformedItems;
  }
});

// Generate the new file content
let newFileContent = `/**
 * Supermarket Items Data
 * This function returns all supermarket items organized by categories
 * @returns {Object} Object containing all supermarket items categorized by product type
 */
export function getSupermarketItems() {
  return ${JSON.stringify(currentData, null, 2)};
}`;

// Write the updated file
fs.writeFileSync(currentDataPath, newFileContent);

// Count total items
let totalCount = 0;
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    totalCount += currentData[category].length;
  }
});

console.log('\n✅ Successfully added missing drink categories!');
console.log(`📊 Total items now: ${totalCount}`);
console.log('📋 Categories:');
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    console.log(`  - ${category}: ${currentData[category].length} items`);
  }
}); 