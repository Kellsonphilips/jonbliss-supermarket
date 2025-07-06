"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('jonbliss-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // Save cart items to localStorage whenever cart changes
    localStorage.setItem('jonbliss-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₦', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getShippingCost = () => {
    return getSubtotal() > 5000 ? 0 : 500; // Free shipping over ₦5000
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
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
    <>
      <Head>
        <title>Shopping Cart - Jonbliss Supermarket</title>
        <meta name="description" content="Review and manage your shopping cart at Jonbliss Supermarket" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">
              {cartItems.length === 0 
                ? 'Your cart is empty' 
                : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart`
              }
            </p>
          </div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                href="/products"
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-orange transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-900">Cart Items</h2>
                      <button
                        onClick={clearCart}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Clear Cart
                      </button>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center">
                          {/* Product Image */}
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>

                          {/* Product Details */}
                          <div className="ml-4 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {item.size} • {item.weight_or_volume}
                                </p>
                                <p className="text-lg font-semibold text-primary mt-1">{item.price}</p>
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
                                
                                <span className="w-12 text-center text-gray-900 font-medium">
                                  {item.quantity}
                                </span>
                                
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
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-600 hover:text-red-700 ml-4"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>

                            {/* Stock Warning */}
                            {item.quantity > item.stock && (
                              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                                <p className="text-sm text-red-600">
                                  Only {item.stock} items available in stock
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">₦{getSubtotal().toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {getShippingCost() === 0 ? 'Free' : `₦${getShippingCost().toLocaleString()}`}
                      </span>
                    </div>
                    
                    {getShippingCost() > 0 && (
                      <div className="text-xs text-primary">
                        Free shipping on orders over ₦5,000
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₦{getTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-red-orange transition-colors"
                  >
                    Proceed to Checkout
                  </Link>

                  <div className="mt-4 text-center">
                    <Link
                      href="/products"
                      className="text-sm text-primary hover:text-primary"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
    </div>
    </>
  );
}
