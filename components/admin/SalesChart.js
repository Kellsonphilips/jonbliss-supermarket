"use client";

import React from 'react';

export default function SalesChart() {
  const chartData = [
    { day: 'Mon', sales: 45000 },
    { day: 'Tue', sales: 52000 },
    { day: 'Wed', sales: 48000 },
    { day: 'Thu', sales: 61000 },
    { day: 'Fri', sales: 55000 },
    { day: 'Sat', sales: 72000 },
    { day: 'Sun', sales: 68000 }
  ];

  const maxSales = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Weekly Sales</p>
          <p className="text-2xl font-bold text-gray-900">₦397,000</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-green-600 font-medium">+12.5%</p>
          <p className="text-xs text-gray-500">vs last week</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end justify-between space-x-2">
        {chartData.map((data, index) => {
          const height = (data.sales / maxSales) * 100;
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t" style={{ height: `${height}%` }}>
                <div className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t transition-all duration-300 hover:from-red-600 hover:to-orange-600" style={{ height: '100%' }}></div>
              </div>
              <div className="mt-2 text-xs text-gray-600">{data.day}</div>
              <div className="text-xs font-medium text-gray-900">₦{(data.sales / 1000).toFixed(0)}k</div>
            </div>
          );
        })}
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded mr-1"></div>
          <span>Sales</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-200 rounded mr-1"></div>
          <span>Target</span>
        </div>
      </div>
    </div>
  );
} 