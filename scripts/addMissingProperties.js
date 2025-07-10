const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../supermarketItems.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const sizes = [
  'Small', 'Medium', 'Large', 'Family Pack', 'Single Serve', 'Value Pack', 'Jumbo', 'Mini', 'Regular', 'Extra Large'
];
const volumes = [
  '250ml', '330ml', '500ml', '750ml', '1L', '1.5L', '2L', '3L', '5L'
];
const weights = [
  '100g', '250g', '500g', '750g', '1kg', '1.5kg', '2kg', '5kg'
];

// Helper: crude check for liquids by category or keywords
const liquidCategories = [
  'Drinks', 'Beverages', 'Dairy & Eggs', 'Juice', 'Water', 'Milk', 'Wine', 'Alcohol', 'Soda', 'Soft Drinks'
];
const liquidKeywords = [
  'juice', 'milk', 'water', 'wine', 'soda', 'drink', 'beverage', 'beer', 'cider', 'yogurt', 'smoothie', 'cola', 'energy', 'tea', 'coffee'
];

function isLiquid(item) {
  const category = (item.category || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  if (liquidCategories.some(cat => category.includes(cat.toLowerCase()))) return true;
  if (liquidKeywords.some(word => name.includes(word))) return true;
  return false;
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDescription(item) {
  // Use name, category, and a unique touch
  const base = `${item.name} (${item.category})`;
  const features = [
    `Perfect for any occasion`,
    `A customer favorite for its quality and value`,
    `Carefully selected to ensure freshness`,
    `Ideal for families and individuals alike`,
    `Enjoy the rich taste and premium quality`,
    `A staple in every household`,
    `Great for quick meals or snacks`,
    `Trusted brand, excellent choice`,
    `Packed with nutrients and flavor`,
    `Sourced from top suppliers`
  ];
  return `${base}. ${getRandom(features)}.`;
}

const updated = {};
for (const [category, items] of Object.entries(data)) {
  updated[category] = items.map(item => {
    const newItem = { ...item };
    // Random size
    newItem.size = getRandom(sizes);
    // Description
    newItem.description = generateDescription(newItem);
    // Weight or Volume
    if (isLiquid(newItem)) {
      newItem.volume = getRandom(volumes);
      if ('weight' in newItem) delete newItem.weight;
    } else {
      newItem.weight = getRandom(weights);
      if ('volume' in newItem) delete newItem.volume;
    }
    return newItem;
  });
}

fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
console.log('supermarketItems.json updated with random size, weight/volume, and unique description for all items.'); 