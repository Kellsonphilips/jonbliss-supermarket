"use client";

export default function ProductsSidebar({
  sidebarOpen,
  setSidebarOpen,
  categories,
  pendingCategory,
  handlePendingCategoryChange,
  pendingShowInStockOnly,
  handlePendingStockChange,
  pendingSortBy,
  handlePendingSortChange,
  handleConfirm,
  hasChanges
}) {
  return (
    <aside className={`fixed inset-0 z-[60] bg-black/50 lg:bg-transparent lg:static lg:inset-auto lg:z-auto transition-all duration-300 ${sidebarOpen ? 'block' : 'hidden'} lg:block`} aria-label="Sidebar Filters">
      {/* Backdrop for mobile */}
      <div 
        className="lg:hidden absolute inset-0 bg-black/50"
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`sidebar-content w-80 max-w-[85vw] h-full bg-white shadow-2xl lg:shadow-none lg:rounded-none lg:w-64 lg:h-auto lg:max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 relative z-10`}>
        {/* Mobile Header with Close Button */}
        <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="sidebar-toggle p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        {/* Sidebar Content */}
        <div className="p-6 lg:p-0 flex flex-col h-full">
          <div className="flex-1">
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                <button
                  onClick={() => handlePendingCategoryChange('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${pendingCategory === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handlePendingCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors w-full text-left ${pendingCategory === category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {/* Stock Filter */}
            <div className="mb-6">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={pendingShowInStockOnly}
                  onChange={handlePendingStockChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>
            {/* Sort */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={pendingSortBy}
                onChange={handlePendingSortChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="stock-high-low">Stock: High to Low</option>
                <option value="stock-low-high">Stock: Low to High</option>
              </select>
            </div>
          </div>
          {/* Confirm Button - Mobile Only */}
          <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleConfirm}
              disabled={!hasChanges}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                hasChanges 
                  ? 'bg-primary text-white hover:bg-red-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {hasChanges ? 'Confirm Changes' : 'No Changes Made'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
} 