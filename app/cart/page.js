"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('jonbliss-cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
      setLoading(false);
    };

    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('jonbliss-cart', JSON.stringify(updatedCart));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: updatedCart }));
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('jonbliss-cart', JSON.stringify(updatedCart));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: updatedCart }));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('jonbliss-cart');
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      let price;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace('₦', '').replace(',', ''));
      } else {
        price = parseFloat(item.price) || 0;
      }
      return total + (price * item.quantity);
    }, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.075; // 7.5% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

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
          <Image src="/vareity1.jpg" alt="Cart Background" fill className="w-full h-full object-cover object-center" />
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
            <div className="text-center py-12">
              <Image
                src="/cart.png"
                alt="Empty Cart"
                width={120}
                height={120}
                className="mx-auto mb-4 opacity-50"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-1 text-sm text-gray-500">
                Start shopping to add items to your cart.
              </p>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
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
                      <div key={item.id || index} className="p-6 flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image || '/placeholder-product.jpg'}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.size || item.weight_or_volume}</p>
                          <p className="text-lg font-semibold text-primary">{item.price}</p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Clear Cart Button */}
                  <div className="p-6 border-t border-gray-200">
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (7.5%)</span>
                      <span className="font-medium">{formatPrice(calculateTax())}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-primary">{formatPrice(calculateTotal())}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      href="/checkout"
                      className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-300 text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link
                      href="/products"
                      className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 text-center block"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 