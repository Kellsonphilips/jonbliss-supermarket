const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('API Home');
});

module.exports = router; 