const fs = require('fs');
const path = require('path');

const itemsFile = path.join(__dirname, '../store/data/supermarketItems.js');
const fileContent = fs.readFileSync(itemsFile, 'utf-8');
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
console.log('Categories:', Object.keys(itemsObject)); 