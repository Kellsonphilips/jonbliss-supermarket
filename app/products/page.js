"use client";

import { SupermarketProvider } from '../../utils/SupermarketContext';
import { Suspense } from 'react';
import ProductsContent from './components/ProductsContent';

export default function Products() {
  return (
    <SupermarketProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div><p className="mt-4 text-gray-600">Loading products...</p></div></div>}>
        <ProductsContent />
      </Suspense>
    </SupermarketProvider>
  );
} 