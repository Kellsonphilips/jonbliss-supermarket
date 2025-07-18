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

async function getCocktailDBData(name) {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(name)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.drinks && data.drinks.length > 0) {
      const drink = data.drinks[0];
      return {
        image: drink.strDrinkThumb,
        description: drink.strInstructions || null
      };
    }
  } catch (e) {
    // ignore
  }
  return null;
}

async function getOpenFoodFactsImage(name) {
  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(name)}&search_simple=1&action=process&json=1&page_size=1`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.products && data.products.length > 0 && data.products[0].image_front_url) {
      return data.products[0].image_front_url;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

function makeDescription(item, category, apiDescription) {
  if (apiDescription) return apiDescription;
  return `Enjoy the refreshing taste of ${item.name} (${item.size}, ${item.weight_or_volume}) – perfect for your ${category.toLowerCase()} needs.`;
}

async function updateDrinks() {
  const drinks = itemsObject.Drinks;
  if (!drinks || typeof drinks !== 'object') {
    console.error('No Drinks category found or Drinks is not an object!');
    return;
  }
  for (const subcat in drinks) {
    if (Array.isArray(drinks[subcat])) {
      for (let i = 0; i < drinks[subcat].length; i++) {
        const item = drinks[subcat][i];
        let image = null;
        let apiDescription = null;
        // 1. Try TheCocktailDB
        const cocktailData = await getCocktailDBData(item.name);
        if (cocktailData && cocktailData.image) {
          image = cocktailData.image;
          apiDescription = cocktailData.description;
        }
        // 2. Try Open Food Facts if not found
        if (!image) {
          image = await getOpenFoodFactsImage(item.name);
        }
        // 3. Fallback to Unsplash
        if (!image) {
          image = `https://source.unsplash.com/featured/?${encodeURIComponent(item.name)},drink`;
        }
        item.image = image;
        item.description = makeDescription(item, subcat, apiDescription);
        await sleep(200);
      }
    }
  }
}

updateDrinks().then(() => {
  // Convert back to JS export format
  const newFileContent = fileContent.replace(
    /return (\{[\s\S]*\});/,
    'return ' + JSON.stringify(itemsObject, null, 2) + ';'
  );
  fs.writeFileSync(itemsFile, newFileContent, 'utf-8');
  console.log('Drinks subcategories updated with images and descriptions!');
}); 