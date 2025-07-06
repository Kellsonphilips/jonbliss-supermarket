"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Update cart item count from localStorage
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('jonbliss-cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCartItemCount(cartItems.length);
      } else {
        setCartItemCount(0);
      }
    };

    // Check login status
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn');
      const email = localStorage.getItem('userEmail');
      setIsLoggedIn(loginStatus === 'true');
      setUserEmail(email || '');
    };

    updateCartCount();
    checkLoginStatus();
    
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);
    window.addEventListener('storage', checkLoginStatus);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <Image
                  src="/jonbliss.png"
                  alt="Jonbliss Logo"
                  width={60}
                  height={60}
                  className="mr-2"
                />
                <span className="text-xl font-bold">Jon<span className="text-primary">bliss</span></span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/jonbliss.png"
                alt="Jonbliss Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <span className="text-xl font-bold text-gray-900">Jonbliss</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                >
                  {item.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Right side - Search, Cart, User */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <input
                id="desktop-search"
                name="search"
                type="text"
                placeholder="Search products..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <Image
                src="/cart.png"
                alt="Cart"
                width={28}
                height={28}
                className="inline-block align-middle"
                priority
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              {isLoggedIn ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{userEmail}</span>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('isLoggedIn');
                      localStorage.removeItem('userEmail');
                      setIsLoggedIn(false);
                      setUserEmail('');
                    }}
                    className="text-sm text-red-orange hover:text-primary"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200">
                  <svg className="h-6 w-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
          <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
              )}
          </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-primary-50 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile search and cart */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <input
                  id="mobile-search"
                  name="search"
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Cart and Account */}
              <div className="flex items-center justify-between">
                <Link
                  href="/cart"
                  className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    src="/cart.png"
                    alt="Cart"
                    width={28}
                    height={28}
                    className="inline-block align-middle mr-2"
                    priority
                  />
                  <span className="text-sm font-medium">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </Link>

                {isLoggedIn ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm text-gray-700">{userEmail}</span>
            <button
                      onClick={() => {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        setIsLoggedIn(false);
                        setUserEmail('');
                        setIsMenuOpen(false);
                      }}
                      className="text-sm text-red-orange hover:text-primary"
                    >
                      Logout
            </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 