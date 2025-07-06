exports.getAllProducts = (req, res) => {
  res.json({ message: 'Get all products (placeholder)' });
};

exports.getProductById = (req, res) => {
  res.json({ message: `Get product ${req.params.id} (placeholder)` });
};

exports.createProduct = (req, res) => {
  res.json({ message: 'Create product (placeholder)' });
};

exports.updateProduct = (req, res) => {
  res.json({ message: `Update product ${req.params.id} (placeholder)` });
};

exports.deleteProduct = (req, res) => {
  res.json({ message: `Delete product ${req.params.id} (placeholder)` });
}; 