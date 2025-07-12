"use client";

import ProductCard from '../../../components/ProductCard';

export default function ProductsGrid({ products, selectedCategory, searchTerm, debouncedSearchTerm }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="mt-2 text-lg font-semibold text-gray-900">No products found</h3>
        <p className="mt-1 text-base text-gray-500">
          Sorry, we couldn&apos;t find any products matching your search.
        </p>
        {debouncedSearchTerm && (
          <p className="mt-2 text-sm text-gray-400">Try a different keyword or check your spelling.</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </>
  );
} 