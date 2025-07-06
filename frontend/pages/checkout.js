"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    // Load cart items from localStorage
    const savedCart = localStorage.getItem('jonbliss-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₦', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getShippingCost = () => {
    return getSubtotal() > 5000 ? 0 : 500;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  const handleShippingInfoChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateShippingInfo = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state'];
    return required.every(field => shippingInfo[field].trim() !== '');
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateShippingInfo()) {
      alert('Please fill in all required shipping information');
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = () => {
    // TODO: Implement order placement logic
    alert('Order placed successfully! This is a demo - no actual order will be processed.');
    localStorage.removeItem('jonbliss-cart');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">You need to add items to your cart before checkout.</p>
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-orange transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - Jonbliss Supermarket</title>
        <meta name="description" content="Complete your purchase at Jonbliss Supermarket" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2 text-sm text-gray-600">
              <span className={currentStep >= 1 ? 'text-primary' : ''}>Shipping</span>
              <span className="mx-2">•</span>
              <span className={currentStep >= 2 ? 'text-primary' : ''}>Payment</span>
              <span className="mx-2">•</span>
              <span className={currentStep >= 3 ? 'text-primary' : ''}>Review</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {currentStep === 1 && (
                /* Shipping Information */
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => handleShippingInfoChange('firstName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => handleShippingInfoChange('lastName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        id="checkout-email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingInfoChange('address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => handleShippingInfoChange('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        id="state"
                        name="state"
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => handleShippingInfoChange('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) => handleShippingInfoChange('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        value={shippingInfo.country}
                        onChange={(e) => handleShippingInfoChange('country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                /* Payment Method */
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Credit/Debit Card</div>
                        <div className="text-sm text-gray-500">Pay securely with your card</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Bank Transfer</div>
                        <div className="text-sm text-gray-500">Pay via bank transfer</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-primary focus:ring-primary"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">Cash on Delivery</div>
                        <div className="text-sm text-gray-500">Pay when you receive your order</div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        Demo mode: No actual payment will be processed. In a real application, 
                        this would integrate with a payment gateway like Stripe or Paystack.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                /* Order Review */
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Review</h2>
                  
                  <div className="space-y-6">
                    {/* Shipping Information Review */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          {shippingInfo.firstName} {shippingInfo.lastName}<br />
                          {shippingInfo.email}<br />
                          {shippingInfo.phone}<br />
                          {shippingInfo.address}<br />
                          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                          {shippingInfo.country}
                        </p>
                      </div>
                    </div>

                    {/* Payment Method Review */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600 capitalize">
                          {paymentMethod.replace('-', ' ')} Payment
                        </p>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-500 ml-1">x{item.quantity}</span>
                      </div>
                      <span className="font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₦{getSubtotal().toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {getShippingCost() === 0 ? 'Free' : `₦${getShippingCost().toLocaleString()}`}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₦{getTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="space-y-3 mt-6">
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevStep}
                      className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNextStep}
                      className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-red-orange transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-red-orange transition-colors"
                    >
                      Place Order
                    </button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="/cart"
                    className="text-sm text-primary hover:text-primary"
                  >
                    Back to Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
    </div>
    </>
  );
}
