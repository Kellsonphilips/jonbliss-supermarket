"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isLoggedIn } from '../../utils/auth';
import DashboardStats from '../../components/admin/DashboardStats';
import RecentOrders from '../../components/admin/RecentOrders';
import TopProducts from '../../components/admin/TopProducts';
import SalesChart from '../../components/admin/SalesChart';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      {/* Page Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome back, {currentUser?.name}. Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <SalesChart />
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
          <TopProducts />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <RecentOrders />
      </div>
    </div>
  );
} 