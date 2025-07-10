"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChanged } from './auth';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.role === 'admin') {
      setAdminUser(user);
    }
    setLoading(false);

    const unsubscribe = onAuthStateChanged(({ isLoggedIn, user }) => {
      if (isLoggedIn && user && user.role === 'admin') {
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminUser, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
} 