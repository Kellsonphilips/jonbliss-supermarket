"use client";

import { useState } from 'react';
import { useCheckoutAuth } from './useCheckoutAuth';
import { useCartContext } from '../../cart/CartContext';

export const useCheckoutState = () => {
  const { isAuthenticated, isLoading: authLoading } = useCheckoutAuth();
  const { cartItems, loading: cartLoading } = useCartContext();
  const [orderComplete, setOrderComplete] = useState(false);

  // Don't determine redirect state until auth is loaded
  const isRedirecting = !authLoading && !isAuthenticated;
  const isEmpty = cartItems.length === 0;
  const isReady = !authLoading && isAuthenticated && !cartLoading && !orderComplete && !isEmpty;
  const isLoading = authLoading || cartLoading;

  return {
    // State
    cartItems,
    loading: isLoading,
    orderComplete,
    isAuthenticated,
    
    // Computed states
    isRedirecting,
    isEmpty,
    isReady,
    
    // Actions
    setOrderComplete,
  };
}; 