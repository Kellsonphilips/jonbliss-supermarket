"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // Simple client-side validation for demo
    if (email === 'test@jonbliss.com' && password === 'password') {
      setError(null);
      // Store login state in localStorage for demo
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      router.push('/');
    } else {
      setError('Invalid email or password. Use test@jonbliss.com / password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Customer Login</h1>
        
        <form className="space-y-4" onSubmit={handleCredentialsLogin}>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="login-email"
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="login-password"
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-orange transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
        
        <div className="mt-6 text-center text-gray-700">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-primary hover:text-primary font-medium">
              Sign up
            </Link>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Test credentials: test@jonbliss.com / password
          </p>
        </div>
      </div>
    </div>
  );
} 