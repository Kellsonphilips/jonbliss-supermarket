const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const itemsFile = path.join(__dirname, '../store/data/supermarketItems.js');

// Helper to sleep between requests (to avoid rate limits)
const sleep = ms => new Promise(res => setTimeout(res, ms));

// Read the file as a string
let fileContent = fs.readFileSync(itemsFile, 'utf-8');

// Extract the returned object from the export function
const objectMatch = fileContent.match(/return (\{[\s\S]*\});/);
if (!objectMatch) {
  console.error('Could not find the items object in supermarketItems.js');
  process.exit(1);
}

let itemsObjectString = objectMatch[1];
let itemsObject;
try {
  itemsObject = eval('(' + itemsObjectString + ')');
} catch (e) {
  console.error('Failed to parse items object:', e);
  process.exit(1);
}

// Open Food Facts API for food items - HIGH QUALITY
async function getOpenFoodFactsImage(name) {
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(name)}&search_simple=1&action=process&json=1&page_size=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.products && data.products.length > 0 && data.products[0].image_front_url) {
      // Get high quality image by removing size restrictions
      let imageUrl = data.products[0].image_front_url;
      // Remove any size parameters to get full resolution
      imageUrl = imageUrl.replace(/\.\d+\.\d+\.\d+\.jpg/, '.full.jpg');
      return imageUrl;
    }
  } catch (e) {
    console.log(`Open Food Facts API error for ${name}:`, e.message);
  }
  return null;
}

// TheCocktailDB API for drinks - HIGH QUALITY
async function getCocktailDBImage(name) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.drinks && data.drinks.length > 0 && data.drinks[0].strDrinkThumb) {
      // TheCocktailDB images are already high quality
      return data.drinks[0].strDrinkThumb;
    }
  } catch (e) {
    console.log(`TheCocktailDB API error for ${name}:`, e.message);
  }
  return null;
}

// Get any random image from TheCocktailDB as fallback
async function getRandomCocktailDBImage() {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.drinks && data.drinks.length > 0 && data.drinks[0].strDrinkThumb) {
      return data.drinks[0].strDrinkThumb;
    }
  } catch (e) {
    console.log(`TheCocktailDB random API error:`, e.message);
  }
  return null;
}

// Get any random image from Open Food Facts as fallback
async function getRandomOpenFoodFactsImage() {
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=food&search_simple=1&action=process&json=1&page_size=1&page=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.products && data.products.length > 0 && data.products[0].image_front_url) {
      let imageUrl = data.products[0].image_front_url;
      imageUrl = imageUrl.replace(/\.\d+\.\d+\.\d+\.jpg/, '.full.jpg');
      return imageUrl;
    }
  } catch (e) {
    console.log(`Open Food Facts random API error:`, e.message);
  }
  return null;
}

// Determine if an item is a drink based on category and name
function isDrink(category, name) {
  const drinkCategories = ['Drinks', 'Beverages'];
  const drinkKeywords = ['beer', 'wine', 'vodka', 'whiskey', 'rum', 'gin', 'tequila', 'brandy', 'liqueur', 'cocktail', 'juice', 'soda', 'cola', 'fanta', 'sprite', 'pepsi', 'coca-cola', 'malt', 'stout', 'lager', 'ale', 'cider'];
  
  return drinkCategories.includes(category) || 
         drinkKeywords.some(keyword => name.toLowerCase().includes(keyword));
}

// Determine if an item is food based on category
function isFood(category) {
  const foodCategories = ['Cereals', 'Snacks', 'Dairy & Eggs', 'Meat & Fish', 'Bakery', 'Frozen Foods', 'Canned Goods', 'Condiments', 'Fruits & Vegetables', 'Provisions'];
  return foodCategories.includes(category);
}

function makeDescription(item, category, apiDescription) {
  if (apiDescription) return apiDescription;
  return `Enjoy the delicious taste of ${item.name} (${item.size || ''}, ${item.weight_or_volume || ''}) – perfect for your ${category.toLowerCase()} needs.`;
}

async function enrichItems() {
  let totalItems = 0;
  let processedItems = 0;
  
  // Count total items first
  for (const category in itemsObject) {
    if (Array.isArray(itemsObject[category])) {
      totalItems += itemsObject[category].length;
    }
  }
  
  console.log(`Starting to process ${totalItems} items with CROSS-FALLBACK between Open Food Facts and TheCocktailDB...`);
  
  for (const category in itemsObject) {
    if (Array.isArray(itemsObject[category])) {
      console.log(`Processing category: ${category} (${itemsObject[category].length} items)`);
      
      for (let i = 0; i < itemsObject[category].length; i++) {
        const item = itemsObject[category][i];
        processedItems++;
        
        console.log(`[${processedItems}/${totalItems}] Processing: ${item.name} (${category})`);
        
        let image = null;
        let apiDescription = null;
        
        // 1. Try TheCocktailDB for drinks first
        if (isDrink(category, item.name)) {
          image = await getCocktailDBImage(item.name);
          if (image) {
            console.log(`  ✓ Found HIGH QUALITY image from TheCocktailDB`);
          } else {
            // If no drink image found, try Open Food Facts as fallback
            image = await getOpenFoodFactsImage(item.name);
            if (image) {
              console.log(`  ✓ Found HIGH QUALITY image from Open Food Facts (fallback for drink)`);
            }
          }
        }
        
        // 2. Try Open Food Facts for food items and any remaining items
        if (!image) {
          image = await getOpenFoodFactsImage(item.name);
          if (image) {
            console.log(`  ✓ Found HIGH QUALITY image from Open Food Facts`);
          } else {
            // If no food image found, try TheCocktailDB as fallback
            image = await getCocktailDBImage(item.name);
            if (image) {
              console.log(`  ✓ Found HIGH QUALITY image from TheCocktailDB (fallback for food)`);
            }
          }
        }
        
        // 3. If still no image, try Open Food Facts with category-specific search
        if (!image) {
          const searchTerm = `${item.name} ${category}`;
          image = await getOpenFoodFactsImage(searchTerm);
          if (image) {
            console.log(`  ✓ Found HIGH QUALITY image from Open Food Facts (category search)`);
          } else {
            // Try TheCocktailDB as fallback
            image = await getCocktailDBImage(searchTerm);
            if (image) {
              console.log(`  ✓ Found HIGH QUALITY image from TheCocktailDB (category search fallback)`);
            }
          }
        }
        
        // 4. Final fallback - try with just the base name
        if (!image) {
          const baseName = item.baseName || item.name.split(' ')[0];
          image = await getOpenFoodFactsImage(baseName);
          if (image) {
            console.log(`  ✓ Found HIGH QUALITY image from Open Food Facts (base name)`);
          } else {
            // Try TheCocktailDB as fallback
            image = await getCocktailDBImage(baseName);
            if (image) {
              console.log(`  ✓ Found HIGH QUALITY image from TheCocktailDB (base name fallback)`);
            }
          }
        }
        
        // 5. Ultimate fallback - use random images from either API
        if (!image) {
          // Try random TheCocktailDB image first
          image = await getRandomCocktailDBImage();
          if (image) {
            console.log(`  ✓ Using random HIGH QUALITY image from TheCocktailDB`);
          } else {
            // Try random Open Food Facts image
            image = await getRandomOpenFoodFactsImage();
            if (image) {
              console.log(`  ✓ Using random HIGH QUALITY image from Open Food Facts`);
            } else {
              // Final fallback - generic high-quality image
              image = `https://images.openfoodfacts.org/images/products/000/000/000/0000/front_en.full.jpg`;
              console.log(`  ⚠️ Using generic fallback image`);
            }
          }
        }
        
        // Update the item
        item.image = image;
        item.description = makeDescription(item, category, apiDescription);
        
        // Sleep between requests to avoid rate limits
        await sleep(300);
      }
    }
  }
  
  console.log(`\n✅ Completed processing ${processedItems} items with CROSS-FALLBACK images!`);
}

enrichItems().then(() => {
  // Convert back to JS export format
  const newFileContent = fileContent.replace(
    /return (\{[\s\S]*\});/,
    'return ' + JSON.stringify(itemsObject, null, 2) + ';'
  );
  fs.writeFileSync(itemsFile, newFileContent, 'utf-8');
  console.log('✅ supermarketItems.js updated with CROSS-FALLBACK HIGH QUALITY images from Open Food Facts and TheCocktailDB APIs!');
}).catch(error => {
  console.error('❌ Error updating items:', error);
  process.exit(1);
}); 