"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', product);
  };

  const getStockStatus = (quantity) => {
    if (quantity > 10) {
      return { text: 'In Stock', color: 'text-primary', bg: 'bg-primary-100' };
    } else if (quantity > 0) {
      return { text: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    } else {
      return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    }
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        
        {/* Stock Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
          {stockStatus.text}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                product.quantity === 0 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-red-orange'
              }`}
            >
              {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.size}</span>
          <span className="text-sm text-gray-500">{product.weight_or_volume}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-primary">{product.price}</span>
          <span className="text-sm text-gray-500">Qty: {product.quantity}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/product/${encodeURIComponent(product.name)}`}
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              product.quantity === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-red-orange'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 