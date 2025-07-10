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

// Write the data to the JSON file
const jsonDataPath = path.join(__dirname, '../supermarketItems.json');
fs.writeFileSync(jsonDataPath, JSON.stringify(currentData, null, 2));

// Count items for verification
let totalCount = 0;
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    totalCount += currentData[category].length;
  }
});

console.log('✅ Successfully updated supermarketItems.json backup!');
console.log(`📊 Total items backed up: ${totalCount}`);
console.log('📋 Categories backed up:');
Object.keys(currentData).forEach(category => {
  if (Array.isArray(currentData[category])) {
    console.log(`  - ${category}: ${currentData[category].length} items`);
  }
});

// Verify the backup by reading it back
try {
  const backupData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));
  let backupCount = 0;
  Object.keys(backupData).forEach(category => {
    if (Array.isArray(backupData[category])) {
      backupCount += backupData[category].length;
    }
  });
  
  if (backupCount === totalCount) {
    console.log('\n✅ Backup verification successful!');
    console.log(`📊 Backup contains ${backupCount} items (matches original)`);
  } else {
    console.log('\n❌ Backup verification failed!');
    console.log(`📊 Original: ${totalCount} items, Backup: ${backupCount} items`);
  }
} catch (error) {
  console.log('\n❌ Error verifying backup:', error.message);
} 