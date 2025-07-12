"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCurrentUser, updateUserProfile, changePassword, isLoggedIn, logoutUser } from '../../utils/auth';
import { getSocialIcon } from '../../components/SocialIcons';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [orders, setOrders] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const router = useRouter();

  // Profile form data
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profile: {
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    }
  });

  // Billing form data
  const [billingData, setBillingData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Nigeria'
    }
  });

  // Password change form data
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Password strength state
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: '', color: 'gray' });

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    let label = 'Very Weak', color = 'red';
    if (score === 1) { label = 'Very Weak'; color = 'red'; }
    else if (score === 2) { label = 'Weak'; color = 'orange'; }
    else if (score === 3) { label = 'Moderate'; color = 'yellow'; }
    else if (score === 4) { label = 'Strong'; color = 'green'; }
    else if (score === 5) { label = 'Very Strong'; color = 'emerald'; }
    return { score, label, color };
  };

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }

    // Load user data
    const loadUserData = () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setProfileData({
          name: currentUser.name || '',
          email: currentUser.email || '',
          profile: {
            phone: currentUser.profile?.phone || '',
            address: currentUser.profile?.address || '',
            city: currentUser.profile?.city || '',
            state: currentUser.profile?.state || '',
            zipCode: currentUser.profile?.zipCode || '',
            country: currentUser.profile?.country || 'Nigeria'
          }
        });
      }
      setLoading(false);
    };

    // Load saved items from localStorage
    const loadSavedItems = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
          const items = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
          setSavedItems(items);
        } else {
          setSavedItems([]);
        }
      } catch (e) {
        setSavedItems([]);
      }
    };

    // Load orders from localStorage
    const loadOrders = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          const ordersKey = `jonbliss-orders-${currentUser.id}`;
          const userOrders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
          setOrders(userOrders);
        } else {
          setOrders([]);
        }
      } catch (e) {
        setOrders([]);
      }
    };

    loadUserData();
    loadSavedItems();
    loadOrders();

    // Listen for saved items and orders updates
    const handleSavedItemsUpdate = () => {
      loadSavedItems();
    };
    const handleOrdersUpdate = () => {
      loadOrders();
    };
    window.addEventListener('saved-items-updated', handleSavedItemsUpdate);
    window.addEventListener('storage', handleSavedItemsUpdate);
    window.addEventListener('orders-updated', handleOrdersUpdate);
    window.addEventListener('storage', handleOrdersUpdate);
    return () => {
      window.removeEventListener('saved-items-updated', handleSavedItemsUpdate);
      window.removeEventListener('storage', handleSavedItemsUpdate);
      window.removeEventListener('orders-updated', handleOrdersUpdate);
      window.removeEventListener('storage', handleOrdersUpdate);
    };
  }, [router]);

  // Listen for logout events and redirect to login
  useEffect(() => {
    const handleLogoutEvent = () => {
      setUser(null);
      setLoading(false);
      router.push('/login?message=You have been logged out. Please sign in again to access your profile.');
    };

    const handleAuthStateChange = (event) => {
      const { isLoggedIn, user } = event.detail;
      if (!isLoggedIn) {
        setUser(null);
        setLoading(false);
        router.push('/login?message=You have been logged out. Please sign in again to access your profile.');
      }
    };

    window.addEventListener('user-logged-out', handleLogoutEvent);
    window.addEventListener('auth-state-changed', handleAuthStateChange);
    
    return () => {
      window.removeEventListener('user-logged-out', handleLogoutEvent);
      window.removeEventListener('auth-state-changed', handleAuthStateChange);
    };
  }, [router]);

  // Periodic authentication check
  useEffect(() => {
    const checkAuthStatus = () => {
      if (!isLoggedIn()) {
        setUser(null);
        setLoading(false);
        router.push('/login?message=Your session has expired. Please sign in again to access your profile.');
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkAuthStatus, 30000);
    
    return () => clearInterval(interval);
  }, [router]);

  // Prefill billing form with user billing info if available
  useEffect(() => {
    if (user && user.billing) {
      setBillingData({
        cardNumber: user.billing.cardNumber || '',
        cardHolder: user.billing.cardHolder || '',
        expiryDate: user.billing.expiryDate || '',
        cvv: user.billing.cvv || '',
        billingAddress: {
          address: user.billing.billingAddress?.address || '',
          city: user.billing.billingAddress?.city || '',
          state: user.billing.billingAddress?.state || '',
          zipCode: user.billing.billingAddress?.zipCode || '',
          country: user.billing.billingAddress?.country || 'Nigeria'
        }
      });
    }
  }, [user]);

  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(passwordData.newPassword));
  }, [passwordData.newPassword]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBillingData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear messages when user starts typing
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedUser = await updateUserProfile(profileData);
      setUser(updatedUser);
      setSuccess('Profile updated successfully!');
      setShowProfileForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Save billing info to user profile
      const updatedUser = await updateUserProfile({
        billing: billingData
      });
      setUser(updatedUser);
      setSuccess('Billing information updated successfully!');
      setShowBillingForm(false);
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setSuccess('Password changed successfully! You will be logged out.');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
      // Logout after short delay
      setTimeout(() => {
        logoutUser();
        router.push('/login?message=Password changed successfully! Please log in again.');
      }, 2000);
      // Clear success message after 3 seconds (if not already redirected)
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    router.push('/login?message=You have been logged out. Please sign in again to access your profile.');
  };

  const removeFromSaved = (itemId) => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        setError('User not found');
        return;
      }
      
      // Remove item from localStorage using user-specific key
      const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
      const currentSavedItems = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
      const updatedSavedItems = currentSavedItems.filter(item => item.id !== itemId);
      localStorage.setItem(savedItemsKey, JSON.stringify(updatedSavedItems));
      
      // Update state
      setSavedItems(updatedSavedItems);
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('saved-items-updated'));
      
      setSuccess('Item removed from saved items successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to remove item from saved items');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Shipped':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProviderIcon = (provider) => {
    const IconComponent = getSocialIcon(provider);
    if (IconComponent) {
      return <IconComponent className="w-4 h-4" />;
    }
    return <span className="text-lg">🔐</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                {user.isSocialLogin && (
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <span className="mr-2">{getProviderIcon(user.provider)}</span>
                    Signed in with {user.providerName}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {error && (
              <div className="mb-6 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">{success}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
                
                {/* Account Information Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Account Information</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Your saved profile information
                      </p>
                    </div>
                    <button
                      onClick={() => setShowProfileForm(!showProfileForm)}
                      className="text-primary hover:text-red-orange text-sm font-medium"
                    >
                      {showProfileForm ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  {!showProfileForm ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Full Name</p>
                        <p className="text-sm text-gray-900 mt-1">{user.name || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email Address</p>
                        <p className="text-sm text-gray-900 mt-1">{user.email}</p>
                      </div>
                      {user.isSocialLogin && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sign-in Method</p>
                          <p className="text-sm text-gray-900 mt-1 flex items-center">
                            <span className="mr-2">{getProviderIcon(user.provider)}</span>
                            {user.providerName || 'Social Login'}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone Number</p>
                        <p className="text-sm text-gray-900 mt-1">{user.profile?.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Country</p>
                        <p className="text-sm text-gray-900 mt-1">{user.profile?.country || 'Not provided'}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Address</p>
                        <p className="text-sm text-gray-900 mt-1">
                          {user.profile?.address ? (
                            <>
                              {user.profile.address}
                              {user.profile.city && `, ${user.profile.city}`}
                              {user.profile.state && `, ${user.profile.state}`}
                              {user.profile.zipCode && ` ${user.profile.zipCode}`}
                            </>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={profileData.email}
                            readOnly
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed sm:text-sm"
                            title="Email address cannot be changed"
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Email address cannot be changed for security reasons
                          </p>
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="profile.phone"
                            value={profileData.profile.phone}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                            Country
                          </label>
                          <select
                            id="country"
                            name="profile.country"
                            value={profileData.profile.country}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          >
                            <option value="Nigeria">Nigeria</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Kenya">Kenya</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                          </label>
                          <input
                            type="text"
                            id="address"
                            name="profile.address"
                            value={profileData.profile.address}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your address"
                          />
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="profile.city"
                            value={profileData.profile.city}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your city"
                          />
                        </div>

                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                            State/Province
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="profile.state"
                            value={profileData.profile.state}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your state/province"
                          />
                        </div>

                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="profile.zipCode"
                            value={profileData.profile.zipCode}
                            onChange={handleProfileChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter your ZIP/postal code"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                          type="submit"
                          disabled={saving}
                          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm shadow-sm"
                        >
                          {saving ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating...
                            </>
                          ) : (
                            'Update Profile'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Orders Section */}
                <div className="bg-green-50 rounded-lg p-6 mt-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-green-900">My Orders</h4>
                      <p className="text-sm text-green-600 mt-1">
                        View your order history and track current orders
                      </p>
                    </div>
                    <button
                      onClick={() => setShowOrders(!showOrders)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      {showOrders ? 'Hide Orders' : 'View Orders'}
                    </button>
                  </div>
                  
                  {showOrders && (
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="bg-white rounded-lg p-4 border border-green-200">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="font-medium text-gray-900">Order {order.id}</h5>
                                <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </span>
                                <span className="font-medium text-gray-900">₦{order.total.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{item.name} x{item.quantity}</span>
                                  <span>₦{item.price.toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Saved Items Section */}
                <div className="bg-purple-50 rounded-lg p-6 mt-4 border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-purple-900">Saved Items</h4>
                      <p className="text-sm text-purple-600 mt-1">
                        Your favorite products and wishlist items
                      </p>
                    </div>
                    <button
                      onClick={() => setShowSavedItems(!showSavedItems)}
                      className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
                    >
                      {showSavedItems ? 'Hide Saved' : 'View Saved'}
                    </button>
                  </div>
                  
                  {showSavedItems && (
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedItems.map((item) => (
                          <div key={item.id} className="bg-white rounded-lg p-4 border border-purple-200">
                            <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={128}
                                  height={128}
                                  className="w-full h-full object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div className="hidden items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                                <span className="text-gray-500 text-sm">No Image</span>
                              </div>
                            </div>
                            <h5 className="font-medium text-gray-900 mb-1">{item.name}</h5>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-gray-900">₦{item.price.toLocaleString()}</span>
                              <div className="flex space-x-2">
                                <button className="text-primary hover:text-red-orange text-sm font-medium">
                                  Add to Cart
                                </button>
                                <button 
                                  onClick={() => removeFromSaved(item.id)}
                                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Billing Information Section */}
                <div className="bg-orange-50 rounded-lg p-6 mt-4 border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-orange-900">Billing Information</h4>
                      <p className="text-sm text-orange-600 mt-1">
                        Manage your payment methods and billing details
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBillingForm(!showBillingForm)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
                    >
                      {showBillingForm ? 'Cancel' : 'Edit Billing'}
                    </button>
                  </div>
                  
                  {!showBillingForm ? (
                    <div className="mt-4 pt-4 border-t border-orange-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Card Number</p>
                          <p className="text-sm text-gray-900 mt-1">•••• •••• •••• 1234</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Card Holder</p>
                          <p className="text-sm text-gray-900 mt-1">{user.name || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Expiry Date</p>
                          <p className="text-sm text-gray-900 mt-1">12/25</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Billing Address</p>
                          <p className="text-sm text-gray-900 mt-1">
                            {user.profile?.address ? (
                              <>
                                {user.profile.address}
                                {user.profile.city && `, ${user.profile.city}`}
                                {user.profile.state && `, ${user.profile.state}`}
                              </>
                            ) : (
                              'Not provided'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBillingSubmit} className="mt-4 pt-4 border-t border-orange-200">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={billingData.cardNumber}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>

                        <div>
                          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                            Card Holder Name
                          </label>
                          <input
                            type="text"
                            id="cardHolder"
                            name="cardHolder"
                            value={billingData.cardHolder}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={billingData.expiryDate}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="MM/YY"
                          />
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={billingData.cvv}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="123"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="billingAddress" className="block text-sm font-medium text-gray-700">
                            Billing Address
                          </label>
                          <input
                            type="text"
                            id="billingAddress"
                            name="billingAddress.address"
                            value={billingData.billingAddress.address}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter billing address"
                          />
                        </div>

                        <div>
                          <label htmlFor="billingCity" className="block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            type="text"
                            id="billingCity"
                            name="billingAddress.city"
                            value={billingData.billingAddress.city}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter city"
                          />
                        </div>

                        <div>
                          <label htmlFor="billingState" className="block text-sm font-medium text-gray-700">
                            State
                          </label>
                          <input
                            type="text"
                            id="billingState"
                            name="billingAddress.state"
                            value={billingData.billingAddress.state}
                            onChange={handleBillingChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Enter state"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <button
                          type="submit"
                          disabled={saving}
                          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
                        >
                          {saving ? 'Updating...' : 'Update Billing'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Privacy Settings</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Control your privacy and data preferences
                      </p>
                    </div>
                  </div>
                </div>

                {/* Change Password Section */}
                <div className="bg-blue-50 rounded-lg p-6 mt-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-blue-900">Change Password</h4>
                      <p className="text-sm text-blue-600 mt-1">
                        Update your account password for enhanced security
                      </p>
                    </div>
                    <button
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      {showPasswordForm ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>
                  
                  {showPasswordForm && (
                    <div className="mt-4 pt-4 border-t border-blue-200">
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                          {/* Password Strength Meter */}
                          {passwordData.newPassword && (
                            <div className="mt-2">
                              <div className={`h-2 rounded transition-all duration-300 bg-${passwordStrength.color}-400`} style={{ width: `${passwordStrength.score * 20}%` }}></div>
                              <span className={`text-xs font-medium text-${passwordStrength.color}-600 mt-1 block`}>
                                Strength: {passwordStrength.label}
                              </span>
                            </div>
                          )}
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            type="submit"
                            disabled={saving}
                            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-red-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium text-sm"
                          >
                            {saving ? 'Changing Password...' : 'Update Password'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                {/* Sign Out Section */}
                <div className="bg-red-50 rounded-lg p-6 mt-4 border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-red-900">Sign Out</h4>
                      <p className="text-sm text-red-600 mt-1">
                        Sign out of your account. You will need to sign in again to access your account.
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 