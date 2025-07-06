import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
          <div className="bg-white rounded-lg shadow p-6">[Product CRUD UI Placeholder]</div>
        </main>
      </div>
    </div>
  );
} 