const fs = require('fs');
const path = require('path');

// Read the current JS data file
const jsDataPath = path.join(__dirname, '../store/data/supermarketItems.js');
const jsDataContent = fs.readFileSync(jsDataPath, 'utf8');

// Extract the data object from the JS file
const dataMatch = jsDataContent.match(/export function getSupermarketItems\(\) \{\s*return\s*(\{[\s\S]*\});\s*\}/);
if (!dataMatch) {
  console.error('Could not parse JS data file');
  process.exit(1);
}

let currentData;
try {
  // Create a temporary function to evaluate the data
  const tempFunction = new Function(`return ${dataMatch[1]}`);
  currentData = tempFunction();
} catch (error) {
  console.error('Error parsing JS data:', error);
  process.exit(1);
}

// Define drink categories to consolidate
const drinkCategories = [
  'Beverages (Non-Alcoholic)',
  'Beverages (Alcoholic)', 
  'Wines',
  'Whiskey',
  'Tequila',
  'Rum'
];

// Collect all drink items
const allDrinkItems = [];

drinkCategories.forEach(category => {
  if (currentData[category] && Array.isArray(currentData[category])) {
    console.log(`Processing ${category}: ${currentData[category].length} items`);
    
    // Transform items to have "Drinks" as category and original category as subcategory
    const transformedItems = currentData[category].map(item => ({
      ...item,
      category: "Drinks",
      subcategory: category
    }));
    
    allDrinkItems.push(...transformedItems);
    
    // Remove the original category
    delete currentData[category];
  }
});

// Add the consolidated Drinks category
currentData["Drinks"] = allDrinkItems;

console.log(`\n✅ Consolidated ${allDrinkItems.length} drink items into "Drinks" category`);

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
fs.writeFileSync(jsDataPath, newFileContent);

// Count total items
let totalCount = 0;
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    totalCount += currentData[category].length;
  }
});

console.log('\n✅ Successfully consolidated drink categories!');
console.log(`📊 Total items: ${totalCount}`);
console.log('📋 Categories:');
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    console.log(`  - ${category}: ${currentData[category].length} items`);
  }
});

// Show subcategories in Drinks
if (currentData["Drinks"]) {
  console.log('\n🍷 Drinks subcategories:');
  const subcategories = {};
  currentData["Drinks"].forEach(item => {
    if (item.subcategory) {
      subcategories[item.subcategory] = (subcategories[item.subcategory] || 0) + 1;
    }
  });
  Object.keys(subcategories).forEach(subcat => {
    console.log(`  - ${subcat}: ${subcategories[subcat]} items`);
  });
} 