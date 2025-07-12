import React, { useState } from 'react';

export default function OrdersSection({ orders }) {
  const [showOrders, setShowOrders] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-600 bg-green-100';
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Shipped':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-green-50 rounded-lg p-6 mt-4 border border-green-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-green-900">My Orders</h4>
          <p className="text-sm text-green-600 mt-1">
            View your order history and track current orders
          </p>
        </div>
        <button
          onClick={() => setShowOrders(!showOrders)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
        >
          {showOrders ? 'Hide Orders' : 'View Orders'}
        </button>
      </div>
      
      {showOrders && (
        <div className="mt-4 pt-4 border-t border-green-200">
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found</p>
                <p className="text-sm text-gray-400 mt-1">Your order history will appear here</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-medium text-gray-900">Order {order.id}</h5>
                      <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="font-medium text-gray-900">₦{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₦{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
} 