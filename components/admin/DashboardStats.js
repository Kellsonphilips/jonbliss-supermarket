"use client";

import React from 'react';

export default function DashboardStats() {
  const stats = [
    {
      name: 'Total Sales',
      value: '₦2,450,000',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      description: 'From last month'
    },
    {
      name: 'Total Orders',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      description: 'From last month'
    },
    {
      name: 'Active Customers',
      value: '892',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
      description: 'From last month'
    },
    {
      name: 'Products',
      value: '1,680',
      change: '+2.1%',
      changeType: 'positive',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      description: 'Total inventory'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg flex flex-col h-full">
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 min-w-0">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <dl>
                <dt className="text-xs sm:text-sm font-medium text-gray-500 truncate w-full break-words">{stat.name}</dt>
                <dd className="flex flex-col sm:flex-row flex-wrap items-baseline min-w-0">
                  <div className="text-xl sm:text-2xl font-semibold text-gray-900 truncate break-words min-w-0 max-w-full" style={{wordBreak:'break-word'}}>{stat.value}</div>
                  <div className={`sm:ml-2 flex items-center text-xs sm:text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'} truncate break-words min-w-0 max-w-full`} style={{wordBreak:'break-word'}}>
                    <svg className="self-center flex-shrink-0 h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">{stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by</span>
                    {stat.change}
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <div className="bg-gray-50 px-4 sm:px-5 py-2 sm:py-3 mt-auto">
            <div className="text-xs sm:text-sm">
              <span className="text-gray-500">{stat.description}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 