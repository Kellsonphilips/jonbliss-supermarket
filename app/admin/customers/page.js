"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const mockCustomers = [
  {
    id: '#C001',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    joined: '2023-11-10',
    orders: 12,
    totalSpent: 245000
  },
  {
    id: '#C002',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    status: 'inactive',
    joined: '2023-09-22',
    orders: 5,
    totalSpent: 78000
  },
  {
    id: '#C003',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'active',
    joined: '2024-01-02',
    orders: 8,
    totalSpent: 120500
  },
  {
    id: '#C004',
    name: 'Emma Davis',
    email: 'emma@example.com',
    status: 'active',
    joined: '2023-12-15',
    orders: 3,
    totalSpent: 32000
  },
  {
    id: '#C005',
    name: 'David Miller',
    email: 'david@example.com',
    status: 'inactive',
    joined: '2023-10-05',
    orders: 2,
    totalSpent: 15000
  }
];

const statuses = ['all', 'active', 'inactive'];

export default function AdminCustomers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [customers, setCustomers] = useState(mockCustomers);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch =
      customer.id.toLowerCase().includes(search.toLowerCase()) ||
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'all' || customer.status === status;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      <main className="py-4 flex-1 w-full">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customers</h1>
          <p className="text-gray-600">Manage and view all registered customers</p>
        </div>
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or ID"
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
        {/* Customers Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
              <h3 className="text-lg font-medium text-gray-900">
                Customers ({filteredCustomers.length})
              </h3>
              <div className="text-sm text-gray-500">
                Showing {filteredCustomers.length} of {customers.length} customers
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(customer.joined).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{customer.totalSpent.toLocaleString()}</td>
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
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">No customers found</h3>
              <p className="mt-1 text-base text-gray-500">
                Sorry, we couldn&apos;t find any customers matching your search.
              </p>
              {search && (
                <p className="mt-2 text-sm text-gray-400">Try a different keyword or check your spelling.</p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 