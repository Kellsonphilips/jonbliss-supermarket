import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Example stat cards */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">120</div>
              <div className="text-gray-500">Products</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">45</div>
              <div className="text-gray-500">Orders</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">8</div>
              <div className="text-gray-500">Categories</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-gray-500">Low Inventory</div>
            </div>
          </div>
          <div>[Key Stats Placeholder]</div>
        </main>
      </div>
    </div>
  );
} 