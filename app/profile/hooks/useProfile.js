import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isLoggedIn, logoutUser } from '../../../utils/auth';

export default function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const router = useRouter();

  // Load user data
  const loadUserData = () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
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

  // Update user data
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  // Handle errors
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  // Handle success messages
  const handleSuccess = (successMessage) => {
    setSuccess(successMessage);
    setTimeout(() => setSuccess(null), 3000);
  };

  // Handle logout
  const handleLogout = () => {
    logoutUser();
    router.push('/login?message=You have been logged out. Please sign in again to access your profile.');
  };

  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn()) {
      router.push('/login');
      return;
    }

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

  return {
    user,
    loading,
    error,
    success,
    orders,
    savedItems,
    updateUser,
    handleError,
    handleSuccess,
    handleLogout
  };
} 