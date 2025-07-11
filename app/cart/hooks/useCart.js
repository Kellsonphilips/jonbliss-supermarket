"use client";

import { useState, useEffect, useCallback } from 'react';

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage
  const loadCart = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('jonbliss-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
    }
    setLoading(false);
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cart-updated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, [loadCart]);

  const removeItem = useCallback((itemId) => {
    setCartItems(prev => {
      const updatedCart = prev.filter(item => item.id !== itemId);
      localStorage.setItem('jonbliss-cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: updatedCart }));
      return updatedCart;
    });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCartItems(prev => {
      const updatedCart = prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('jonbliss-cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: updatedCart }));
      return updatedCart;
    });
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('jonbliss-cart');
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: [] }));
  }, []);

  return {
    cartItems,
    loading,
    updateQuantity,
    removeItem,
    clearCart,
    setCartItems, // for context use if needed
  };
} 