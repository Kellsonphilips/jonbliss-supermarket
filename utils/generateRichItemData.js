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

function makeDescription(item, category) {
  return `Enjoy the delicious taste of ${item.name} (${item.size}, ${item.weight_or_volume}) – perfect for your ${category.toLowerCase()} needs.`;
}

async function enrichItems() {
  for (const category in itemsObject) {
    if (Array.isArray(itemsObject[category])) {
      for (let i = 0; i < itemsObject[category].length; i++) {
        const item = itemsObject[category][i];
        let image = await getOpenFoodFactsImage(item.name);
        if (!image) {
          image = `https://source.unsplash.com/featured/?${encodeURIComponent(item.name)},grocery`;
        }
        item.image = image;
        item.description = makeDescription(item, category);
        // Sleep 200ms between requests to avoid hammering the API
        await sleep(200);
      }
    }
  }
}

enrichItems().then(() => {
  // Convert back to JS export format
  const newFileContent = fileContent.replace(
    /return (\{[\s\S]*\});/,
    'return ' + JSON.stringify(itemsObject, null, 2) + ';'
  );
  fs.writeFileSync(itemsFile, newFileContent, 'utf-8');
  console.log('supermarketItems.js updated with rich images and descriptions!');
}); 