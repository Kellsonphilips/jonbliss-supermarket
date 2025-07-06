exports.getAllCategories = (req, res) => {
  res.json({ message: 'Get all categories (placeholder)' });
};

exports.getCategoryById = (req, res) => {
  res.json({ message: `Get category ${req.params.id} (placeholder)` });
};

exports.createCategory = (req, res) => {
  res.json({ message: 'Create category (placeholder)' });
};

exports.updateCategory = (req, res) => {
  res.json({ message: `Update category ${req.params.id} (placeholder)` });
};

exports.deleteCategory = (req, res) => {
  res.json({ message: `Delete category ${req.params.id} (placeholder)` });
}; 