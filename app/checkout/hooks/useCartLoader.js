"use client";

import { useState, useEffect } from 'react';

export const useCartLoader = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  return { cartItems, setCartItems, loading };
}; 