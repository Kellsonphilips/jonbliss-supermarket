"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Simulate signup success for demo
      console.log('Signup data:', formData);
      
      // Store user data in localStorage for demo
      localStorage.setItem('userData', JSON.stringify(formData));
      
      // Redirect to login page
      router.push('/login?message=Account created successfully! Please sign in.');
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Create Account</h1>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input 
              id="signup-name"
              name="name" 
              type="text" 
              placeholder="Enter your full name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="signup-email"
              name="email" 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="signup-password"
              name="password" 
              type="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <div>
            <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input 
              id="signup-confirm-password"
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm your password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-red-orange transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}
        
        <div className="mt-6 text-center text-gray-700">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-primary font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 