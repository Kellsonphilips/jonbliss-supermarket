"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSupermarket } from '../utils/SupermarketContext';
import { isLoggedIn, onAuthStateChanged, getCurrentUser } from '../utils/auth';

export default function ProductCard({ product, children }) {
  const { getVarietiesByBaseName } = useSupermarket ? useSupermarket() : { getVarietiesByBaseName: null };
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
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block group/product-img relative h-48 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary">
        <Image
          src={product.image || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {product.isOnSale && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow">
            SALE
          </div>
        )}
        {product.isFeatured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold shadow">
            FEATURED
          </div>
        )}
        {hasVarieties && (
          <button
            type="button"
            onClick={e => { e.preventDefault(); setShowVarietyModal(true); }}
            className="absolute bottom-2 left-2 flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white px-2 sm:px-3 md:px-4 py-1 rounded-full text-xs font-semibold shadow-xl border-2 border-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300 hover:scale-110 active:scale-95 z-10 group/variety"
            tabIndex={0}
            aria-label="View Varieties"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow transition-transform duration-300 group-hover/variety:rotate-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8M12 8v8" />
            </svg>
            <span className="font-bold tracking-wide whitespace-nowrap">
              <span className="hidden sm:inline">Varieties Available</span>
              <span className="sm:hidden">Varieties</span>
            </span>
          </button>
        )}
      </Link>
      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Product Name and Save Button */}
        <div className="flex items-start justify-between mb-2 gap-2">
          <Link
            href={`/product/${product.id}`}
            className="font-semibold text-gray-900 line-clamp-2 flex-1 text-sm sm:text-base group-hover:text-primary transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-primary min-w-0"
            tabIndex={0}
            aria-label={`View details for ${product.name}`}
          >
            {product.name}
          </Link>
          <button
            onClick={toggleSaved}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label={isSaved ? 'Remove from saved items' : 'Add to saved items'}
          >
            <svg 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${isSaved ? 'text-primary fill-current' : 'text-gray-400 hover:text-red-500'}`}
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
        </div>

        {/* Price and Size/Weight */}
        <div className="flex items-center justify-between mb-2 gap-2">
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
            <span className="text-base sm:text-lg font-bold text-primary whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-xs sm:text-sm text-gray-500 line-through whitespace-nowrap">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-600 whitespace-nowrap flex-shrink-0">
            {product.size || product.weight_or_volume}
          </span>
        </div>

        {/* Stock Status */}
        <div className="mb-3">
          {product.stock > 0 ? (
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-600 font-medium whitespace-nowrap">
                In Stock
              </span>
              <span className={`text-xs font-medium whitespace-nowrap ${product.stock > 10 ? 'text-green-600' : 'text-red-600 animate-pulse'}`}>
                Stock: {product.stock}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-600 font-medium whitespace-nowrap">
                Out of Stock
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {product.stock} available
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 sm:gap-2 mt-2">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 bg-gray-100 text-gray-700 py-1.5 sm:py-2 px-1 sm:px-2 md:px-4 rounded-lg text-xs font-medium hover:bg-gray-200 transition duration-200 text-center shadow-sm whitespace-nowrap min-w-0"
          >
            <span className="hidden sm:inline">View Details</span>
            <span className="sm:hidden">View</span>
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 bg-primary text-white py-1.5 sm:py-2 px-1 sm:px-2 md:px-4 rounded-lg text-xs font-semibold hover:bg-red-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm whitespace-nowrap min-w-0"
          >
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
        {children}
      </div>
      {/* Variety Modal */}
      {showVarietyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md mx-auto max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-lg sm:text-xl text-white">Select Variety</h4>
                <button
                  onClick={() => setShowVarietyModal(false)}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="space-y-3 mb-6 max-h-[50vh] overflow-y-auto">
                {varieties.map(v => (
                  <label
                    key={v.id}
                    className={`block cursor-pointer p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedVariety?.id === v.id
                        ? 'border-primary bg-primary/5 shadow-md'
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
                        <div className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                          {v.name}
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs sm:text-sm text-gray-600">
                            {v.volume || v.weight || '-'}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-primary">
                            {v.price ? `₦${v.price.toLocaleString()}` : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleVarietyAdd}
                  disabled={!selectedVariety}
                  className="flex-1 bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-red-700 transition duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                >
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add to Cart</span>
                </button>
                <button
                  onClick={() => setShowVarietyModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition duration-200"
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
            <p className="text-gray-700 mb-4 text-center">Create an account or sign in to save your favorite items for later.</p>
            <div className="flex flex-col gap-2 w-full">
              <a href="/login" className="w-full bg-primary text-white py-2 rounded-lg font-semibold text-center hover:bg-red-700 transition duration-200">Sign In</a>
              <a href="/signup" className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-center hover:bg-gray-300 transition duration-200">Create Account</a>
              <button onClick={() => setShowAuthModal(false)} className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition duration-200">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 