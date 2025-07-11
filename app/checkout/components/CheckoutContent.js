"use client";

import { LoadingSpinner, CheckoutHero, CheckoutLayout } from './index';
import OrderComplete from '../OrderComplete';
import EmptyCart from '../EmptyCart';

export default function CheckoutContent({ 
  isRedirecting, 
  loading, 
  orderComplete, 
  isEmpty, 
  cartItems, 
  setOrderComplete 
}) {
  // Show loading spinner while authentication and cart are being loaded
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show redirect message only after auth is loaded and user is not authenticated
  if (isRedirecting) {
    return <LoadingSpinner message="Redirecting to login..." />;
  }

  if (orderComplete) {
    return <OrderComplete />;
  }

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHero />
      <CheckoutLayout 
        cartItems={cartItems} 
        setOrderComplete={setOrderComplete} 
        setLoading={() => {}} // This is handled by the form component
      />
    </div>
  );
} 