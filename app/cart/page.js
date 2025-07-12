"use client";

import { useMemo } from 'react';
import Image from 'next/image';
import CartItem from './components/CartItem';
import CartEmpty from './components/CartEmpty';
import OrderSummary from './components/OrderSummary';
import { calculateSubtotal, calculateTax, calculateTotal } from './cartUtils';
import { useCartContext } from './CartContext';

export default function Cart() {
  const { cartItems, loading, updateQuantity, removeItem, clearCart } = useCartContext();
  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);
  const tax = useMemo(() => calculateTax(cartItems), [cartItems]);
  const total = useMemo(() => calculateTotal(cartItems), [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 relative text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src="/vareity1.jpg" alt="Cart Background" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Shopping Cart</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Review your items and proceed to checkout
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Cart Items ({cartItems.length})</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={item.id || index}
                        item={item}
                        updateQuantity={updateQuantity}
                        removeItem={removeItem}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                  clearCart={clearCart}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 