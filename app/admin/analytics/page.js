import React from 'react';
import DashboardStats from '../../../components/admin/DashboardStats';
import SalesChart from '../../../components/admin/SalesChart';
import TopProducts from '../../../components/admin/TopProducts';
import RecentOrders from '../../../components/admin/RecentOrders';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full">Admin</span>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <SalesChart />
        </div>
        {/* Top Products */}
        <div className="col-span-1 bg-white rounded-lg shadow p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h2>
          <TopProducts />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
        <RecentOrders />
      </div>
    </div>
  );
} 