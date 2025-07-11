"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logoutUser, onAuthStateChanged } from '../utils/auth';
import { useSupermarket } from '../utils/SupermarketContext';
import { useCartContext } from '../app/cart/CartContext';

// Add debounce utility
function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function Navbar() {
  const { getGroupedItemsByBaseName } = useSupermarket();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Separate user dropdown state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 250);
  const { cartItems } = useCartContext();
  const [user, setUser] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Load user data
    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Load cart data
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('jonbliss-cart');
        if (savedCart) {
          // setCartItems(JSON.parse(savedCart)); // This line is removed as per edit hint
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
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

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe && unsubscribe();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchLoading(true);
      const allProducts = getGroupedItemsByBaseName ? getGroupedItemsByBaseName() : [];
      const results = allProducts.filter(product => product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      setSearchResults(results);
      setSearchLoading(false);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm, getGroupedItemsByBaseName]);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsSearchOpen(false);
      setSearchTerm('');
      setSearchResults([]);
    }
  };

  const calculateCartTotal = () => {
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

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // User menu toggle handler
  const handleUserMenuToggle = () => {
    setIsUserMenuOpen((prev) => !prev);
    setIsMenuOpen(false); // Close mobile menu if open
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/jonbliss.png"
                  alt="Jonbliss Supermarket"
                  width={48}
                  height={48}
                  className="h-12 w-12 lg:h-14 lg:w-14 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="ml-3 lg:ml-4">
                <span className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  Jon<span className="text-primary">bliss</span>
                </span>
                <p className="text-xs lg:text-sm text-gray-500 -mt-1">Supermarket</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Right side - Search, Cart and User */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-64 lg:w-80 px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50/50 hover:bg-white"
                    onFocus={() => setIsSearchOpen(true)}
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {/* Search Suggestions Dropdown */}
                  {isSearchOpen && searchTerm && (
                    <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                      {searchLoading ? (
                        <div className="p-4 text-center text-gray-400">Searching...</div>
                      ) : searchResults.length > 0 ? (
                        searchResults.slice(0, 8).map(product => (
                          <div
                            key={product.id}
                            className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => {
                              router.push(`/product/${product.id}`);
                              setIsSearchOpen(false);
                              setSearchTerm('');
                              setSearchResults([]);
                            }}
                          >
                            <Image
                              src={product.image || '/placeholder-product.jpg'}
                              alt={product.name}
                              width={32}
                              height={32}
                              className="rounded object-cover mr-3"
                            />
                            <span className="text-gray-900 font-medium truncate">{product.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-400">
                          No products found. Try a different keyword.
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="ml-2 p-2.5 text-primary hover:text-red-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Cart */}
            <div className="relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 group"
              >
                <div className="relative">
                  <Image
                    src="/cart.png"
                    alt="Shopping Cart"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                  />
                  {getCartItemCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg animate-pulse">
                      {getCartItemCount()}
                    </span>
                  )}
                </div>
              </button>

              {/* Cart Dropdown */}
              {isCartOpen && (
                <div className={`absolute right-0 mt-2 w-80 lg:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden transition-all duration-200 ${isMobile ? 'left-1/2 -translate-x-1/2 right-auto w-11/12 max-w-xs' : ''}`}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                        </div>
                        <p className="text-gray-500 font-medium">Your cart is empty</p>
                        <p className="text-sm text-gray-400 mt-1">Add some products to get started</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                          {cartItems.map((item, index) => (
                            <div key={item.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                              <Image
                                src={item.image || '/placeholder-product.jpg'}
                                alt={item.name}
                                width={48}
                                height={48}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="text-sm font-bold text-primary">{item.price}</p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-900">Total:</span>
                            <span className="font-bold text-xl text-primary">₦{calculateCartTotal().toLocaleString()}</span>
                          </div>
                          <Link
                            href="/cart"
                            className="w-full bg-gradient-to-r from-primary to-red-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-center block shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={() => setIsCartOpen(false)}
                          >
                            View Cart
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={handleUserMenuToggle}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg px-3 py-2 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
                    <span className="text-white text-sm lg:text-base font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:block font-medium">{user.name}</span>
                  <svg className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Profile</span>
                        </Link>
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsUserMenuOpen(false);
                          }}
                          className="flex items-center space-x-3 px-3 py-2.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 w-full text-left"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all text-nowrap duration-200 font-medium"
                >
                  Sign In
                </Link>
                {/* <Link
                  href="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-primary to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link> */}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden relative z-50">
            <div className="px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200 shadow-lg rounded-b-2xl">
              <Link
                href="/"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
              </Link>
              <Link
                href="/products"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span className="font-medium">Products</span>
              </Link>
              <Link
                href="/about"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">About</span>
              </Link>
              <Link
                href="/contact"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">Contact</span>
              </Link>
              
              {/* Mobile Search */}
              <div className="px-4 py-3">
                <form onSubmit={handleSearch} className="flex items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-gray-50/50"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button
                    type="submit"
                    className="ml-2 p-3 text-primary hover:text-red-700 hover:bg-gray-50 rounded-xl transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isCartOpen || isMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsCartOpen(false);
            setIsMenuOpen(false);
            setIsSearchOpen(false);
          }}
        />
      )}
    </nav>
  );
} 