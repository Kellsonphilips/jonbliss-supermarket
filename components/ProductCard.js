"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSupermarket } from '../utils/SupermarketContext';
import { isLoggedIn, onAuthStateChanged, getCurrentUser } from '../utils/auth';

const ProductCard = React.memo(function ProductCard({ product, onAddToCart, onAddToWishlist, isWishlisted = false, children = null }) {
  const { getVarietiesByBaseName } = useSupermarket();
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showVarietyModal, setShowVarietyModal] = useState(false);
  const [selectedVariety, setSelectedVariety] = useState(product);
  const [toast, setToast] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
      const savedItems = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
      setIsSaved(savedItems.some(item => item.id === product.id));
    } else {
      setIsSaved(false);
    }

    // Listen for auth state changes to save remembered favorite
    const unsubscribe = onAuthStateChanged(({ isLoggedIn }) => {
      if (isLoggedIn) {
        const pendingFavorite = localStorage.getItem('pending-favorite');
        if (pendingFavorite) {
          try {
            const favProduct = JSON.parse(pendingFavorite);
            const currentUser = getCurrentUser();
            if (currentUser) {
              const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
              // Only add if not already in favorites
              const currentSaved = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
              if (!currentSaved.some(item => item.id === favProduct.id)) {
                currentSaved.push(favProduct);
                localStorage.setItem(savedItemsKey, JSON.stringify(currentSaved));
                window.dispatchEvent(new CustomEvent('saved-items-updated'));
              }
            }
            localStorage.removeItem('pending-favorite');
          } catch (e) {
            localStorage.removeItem('pending-favorite');
          }
        }
      }
    });
    return () => unsubscribe && unsubscribe();
  }, [product.id]);

  const varieties = getVarietiesByBaseName ? getVarietiesByBaseName(product.baseName, product.category) : [product];
  const hasVarieties = varieties.length > 1;

  const addToCart = (item) => {
    try {
      const existingCart = localStorage.getItem('jonbliss-cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];
      const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
      if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
      localStorage.setItem('jonbliss-cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-updated', { detail: cart }));
      setToast('Added to cart!');
      setTimeout(() => setToast(''), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToCart = () => {
    if (hasVarieties) {
      setShowVarietyModal(true);
    } else {
      addToCart(product);
    }
  };

  const handleVarietySelect = (e) => {
    const v = varieties.find(v => String(v.id) === e.target.value);
    setSelectedVariety(v);
  };

  const handleVarietyAdd = () => {
    addToCart(selectedVariety);
    setShowVarietyModal(false);
  };

  const toggleSaved = () => {
    if (!isLoggedIn()) {
      // Remember the product user wanted to favorite
      localStorage.setItem('pending-favorite', JSON.stringify(product));
      setShowAuthModal(true);
      return;
    }
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        console.error('User not found');
        return;
      }
      
      const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
      const savedItems = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
      
      if (isSaved) {
        // Remove from saved items
        const updatedSavedItems = savedItems.filter(item => item.id !== product.id);
        localStorage.setItem(savedItemsKey, JSON.stringify(updatedSavedItems));
        setIsSaved(false);
        console.log('Product removed from saved items:', product.name);
      } else {
        // Add to saved items
        const updatedSavedItems = [...savedItems, product];
        localStorage.setItem(savedItemsKey, JSON.stringify(updatedSavedItems));
        setIsSaved(true);
        console.log('Product added to saved items:', product.name);
      }

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('saved-items-updated'));
    } catch (error) {
      console.error('Error toggling saved item:', error);
    }
  };

  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 relative group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block group/product-img relative h-40 sm:h-44 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary">
        <Image
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isOnSale && (
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
              SALE
            </div>
          )}
          {product.isFeatured && (
            <div className="bg-yellow-400 text-white px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
              FEATURED
            </div>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleSaved(); }}
          className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-200 group/save"
          aria-label={isSaved ? 'Remove from saved items' : 'Add to saved items'}
        >
          <svg 
            className={`w-4 h-4 transition-colors duration-200 ${isSaved ? 'text-red-500 fill-current' : 'text-gray-600 hover:text-red-500'}`}
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>

        {/* Compact Variety Indicator */}
        {hasVarieties && (
          <button
            type="button"
            onClick={e => { e.preventDefault(); setShowVarietyModal(true); }}
            className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium shadow-sm border border-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all duration-200 hover:scale-105 active:scale-95 z-10"
            tabIndex={0}
            aria-label="View Varieties"
          >
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="font-semibold">{varieties.length}</span>
            </div>
          </button>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-3">
        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="block font-medium text-gray-900 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          tabIndex={0}
          aria-label={`View details for ${product.name}`}
        >
          {product.name}
        </Link>

        {/* Price and Size */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base font-bold text-primary whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-xs text-gray-500 line-through whitespace-nowrap">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600 whitespace-nowrap flex-shrink-0 ml-2">
            {product.size || product.weight_or_volume}
          </span>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock > 0 ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-600 font-medium">
                In Stock
              </span>
              <span className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                {product.stock} left
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-600 font-medium">
                Out of Stock
              </span>
              <span className="text-xs text-gray-500">
                {product.stock} available
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200 transition duration-200 text-center shadow-sm flex items-center justify-center min-h-[32px]"
          >
            View
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-primary text-white py-2 px-3 rounded-lg text-xs font-semibold hover:bg-red-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm flex items-center justify-center min-h-[32px]"
          >
            Add
          </button>
        </div>
        {children}
      </div>

      {/* Variety Modal */}
      {showVarietyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-auto max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg text-white">Select Variety</h4>
                <button
                  onClick={() => setShowVarietyModal(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="space-y-2 mb-4 max-h-[50vh] overflow-y-auto">
                {varieties.map(v => (
                  <label
                    key={v.id}
                    className={`block cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedVariety?.id === v.id
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="variety"
                        value={v.id}
                        checked={selectedVariety?.id === v.id}
                        onChange={() => setSelectedVariety(v)}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {v.name}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-600">
                            {v.volume || v.weight || '-'}
                          </span>
                          <span className="text-sm font-bold text-primary">
                            {v.price ? `₦${v.price.toLocaleString()}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleVarietyAdd}
                  disabled={!selectedVariety}
                  className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm flex items-center justify-center min-h-[40px]"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setShowVarietyModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition duration-200 flex items-center justify-center min-h-[40px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center justify-center">
            <h4 className="font-bold text-lg mb-2 text-center text-primary">Sign in to save favorites</h4>
            <p className="text-gray-700 mb-4 text-center text-sm">Create an account or sign in to save your favorite items for later.</p>
            <div className="flex flex-col gap-2 w-full">
              <a href="/login" className="w-full bg-primary text-white py-2.5 px-4 rounded-lg font-semibold text-center hover:bg-red-700 transition duration-200 flex items-center justify-center min-h-[40px]">Sign In</a>
              <a href="/signup" className="w-full bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg font-medium text-center hover:bg-gray-300 transition duration-200 flex items-center justify-center min-h-[40px]">Create Account</a>
              <button onClick={() => setShowAuthModal(false)} className="w-full mt-2 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg font-medium hover:bg-gray-200 transition duration-200 flex items-center justify-center min-h-[40px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProductCard; 