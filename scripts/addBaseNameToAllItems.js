// addBaseNameToAllItems.js
const fs = require('fs');
const path = require('path');

const jsFile = path.join(__dirname, '../store/data/supermarketItems.js');
const jsonFile = path.join(__dirname, '../supermarketItems.json');

function addBaseNameToItem(item) {
  if (item && typeof item === 'object' && !Array.isArray(item)) {
    if (!item.baseName && item.name) {
      item.baseName = item.name;
    }
    // Handle varieties or subarrays recursively
    if (Array.isArray(item.varieties)) {
      item.varieties = item.varieties.map(addBaseNameToItem);
    }
  }
  return item;
}

function addBaseNameToAll(data) {
  for (const category in data) {
    if (Array.isArray(data[category])) {
      data[category] = data[category].map(addBaseNameToItem);
    }
  }
  return data;
}

// --- Update JSON file ---
function updateJsonFile() {
  const jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  const updatedJson = addBaseNameToAll(jsonData);
  fs.writeFileSync(jsonFile, JSON.stringify(updatedJson, null, 2), 'utf8');
  console.log('✅ Updated supermarketItems.json with baseName for all items.');
}

if (require.main === module) {
  updateJsonFile();
} 