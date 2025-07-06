const express = require('express');
const app = express();

app.use(express.json());

// Import routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// Default route
app.get('/', (req, res) => res.send('Jonbliss Supermarket API'));

module.exports = app; 