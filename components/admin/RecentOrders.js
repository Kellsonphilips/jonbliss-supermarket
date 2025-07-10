"use client";

import React from 'react';

export default function RecentOrders() {
  const orders = [
    {
      id: '#1234',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: '₦45,000',
      status: 'pending',
      date: '2024-01-15',
      items: 3
    },
    {
      id: '#1235',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      amount: '₦32,500',
      status: 'completed',
      date: '2024-01-15',
      items: 2
    },
    {
      id: '#1236',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: '₦78,900',
      status: 'processing',
      date: '2024-01-14',
      items: 5
    },
    {
      id: '#1237',
      customer: 'Emma Davis',
      email: 'emma@example.com',
      amount: '₦12,300',
      status: 'cancelled',
      date: '2024-01-14',
      items: 1
    },
    {
      id: '#1238',
      customer: 'David Miller',
      email: 'david@example.com',
      amount: '₦56,700',
      status: 'completed',
      date: '2024-01-13',
      items: 4
    }
  ];

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

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
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
                {order.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(order.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-red-600 hover:text-red-900 mr-3">
                  View
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
            <span className="font-medium">1,234</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm text-white bg-red-600 border border-red-600 rounded-md hover:bg-red-700">
              1
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 