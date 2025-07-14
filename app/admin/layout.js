"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isLoggedIn } from '../../utils/auth';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminLayout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoggedIn()) {
        router.push('/login');
        return;
      }
      const user = getCurrentUser();
      if (!user || user.role !== 'admin') {
        router.push('/');
        return;
      }
      setCurrentUser(user);
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row lg:pt-4">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen lg:pt-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-4 flex-1 w-full pt-20 lg:pt-24">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 