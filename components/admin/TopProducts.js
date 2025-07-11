"use client";

import React from 'react';
import Image from 'next/image';

export default function TopProducts() {
  const products = [
    {
      id: 1,
      name: 'Organic Bananas',
      category: 'Fruits',
      sales: 234,
      revenue: '₦117,000',
      growth: '+12.5%',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=40&h=40&fit=crop'
    },
    {
      id: 2,
      name: 'Fresh Milk',
      category: 'Dairy',
      sales: 189,
      revenue: '₦94,500',
      growth: '+8.2%',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=40&h=40&fit=crop'
    },
    {
      id: 3,
      name: 'Whole Grain Bread',
      category: 'Bakery',
      sales: 156,
      revenue: '₦78,000',
      growth: '+15.3%',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=40&h=40&fit=crop'
    },
    {
      id: 4,
      name: 'Organic Eggs',
      category: 'Dairy',
      sales: 142,
      revenue: '₦71,000',
      growth: '+6.7%',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=40&h=40&fit=crop'
    },
    {
      id: 5,
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      sales: 128,
      revenue: '₦64,000',
      growth: '+9.1%',
      image: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=40&h=40&fit=crop'
    }
  ];

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-500">{product.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
                <p className="text-xs text-gray-500">{product.sales} sold</p>
              </div>
            </div>
            
            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs text-green-600 font-medium">{product.growth}</span>
                <span className="text-xs text-gray-500 ml-1">vs last month</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-xs text-red-600 hover:text-red-800 font-medium">
                  View
                </button>
                <button className="text-xs text-gray-600 hover:text-gray-800">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-red-600 hover:text-red-800 font-medium">
          View all products →
        </button>
      </div>
    </div>
  );
} 