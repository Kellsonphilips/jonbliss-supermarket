const fs = require('fs');
const path = require('path');

// Path to the supermarketItems.js file
const itemsFile = path.join(__dirname, '../store/data/supermarketItems.js');

// Read the file as a string
let fileContent = fs.readFileSync(itemsFile, 'utf-8');

// Extract the returned object from the export function
const objectMatch = fileContent.match(/return (\{[\s\S]*\});/);
if (!objectMatch) {
  console.error('Could not find the items object in supermarketItems.js');
  process.exit(1);
}

let itemsObjectString = objectMatch[1];

// Parse the object (eval is safe here because it's local dev and trusted data)
let itemsObject;
try {
  itemsObject = eval('(' + itemsObjectString + ')');
} catch (e) {
  console.error('Failed to parse items object:', e);
  process.exit(1);
}

// Update each item in each category (only if it's an array)
for (const category in itemsObject) {
  if (Array.isArray(itemsObject[category])) {
    itemsObject[category] = itemsObject[category].map(item => {
      const name = item.name || 'grocery';
      return {
        ...item,
        image: `https://source.unsplash.com/featured/?${encodeURIComponent(name)},grocery`,
        description: `A delicious ${name} perfect for your supermarket needs.`
      };
    });
  }
}

// Convert back to JS export format
const newFileContent = fileContent.replace(
  /return (\{[\s\S]*\});/,
  'return ' + JSON.stringify(itemsObject, null, 2) + ';'
);

fs.writeFileSync(itemsFile, newFileContent, 'utf-8');
console.log('supermarketItems.js updated with image and description fields!'); 