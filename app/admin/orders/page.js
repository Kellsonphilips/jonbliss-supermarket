"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const mockOrders = [
  {
    id: '#1234',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: 45000,
    status: 'pending',
    date: '2024-01-15',
    items: 3
  },
  {
    id: '#1235',
    customer: 'Sarah Wilson',
    email: 'sarah@example.com',
    amount: 32500,
    status: 'completed',
    date: '2024-01-15',
    items: 2
  },
  {
    id: '#1236',
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    amount: 78900,
    status: 'processing',
    date: '2024-01-14',
    items: 5
  },
  {
    id: '#1237',
    customer: 'Emma Davis',
    email: 'emma@example.com',
    amount: 12300,
    status: 'cancelled',
    date: '2024-01-14',
    items: 1
  },
  {
    id: '#1238',
    customer: 'David Miller',
    email: 'david@example.com',
    amount: 56700,
    status: 'completed',
    date: '2024-01-13',
    items: 4
  }
];

const statuses = ['all', 'pending', 'processing', 'completed', 'cancelled'];

export default function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [orders, setOrders] = useState(mockOrders);
  const router = useRouter();

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || order.status === status;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 md:p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by order, customer, or email"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
          >
            {statuses.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <button
            onClick={() => { setSearch(''); setStatus('all'); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {/* Orders Table */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <div className="px-4 md:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <h3 className="text-lg font-medium text-gray-900">
              Orders ({filteredOrders.length})
            </h3>
            <div className="text-sm text-gray-500">
              Showing {filteredOrders.length} of {orders.length} orders
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.items} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₦{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">View</button>
                      <button className="text-red-600 hover:text-red-900">Edit</button>
                      <button className="text-gray-600 hover:text-gray-900">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">No orders found</h3>
            <p className="mt-1 text-base text-gray-500">
              Sorry, we couldn&apos;t find any orders matching your search.
            </p>
            {search && (
              <p className="mt-2 text-sm text-gray-400">Try a different keyword or check your spelling.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 