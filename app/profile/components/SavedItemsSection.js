import React, { useState } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '../../../utils/auth';

export default function SavedItemsSection({ savedItems, onRemoveItem, onSuccess, onError }) {
  const [showSavedItems, setShowSavedItems] = useState(false);

  const removeFromSaved = (itemId) => {
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) {
        onError('User not found');
        return;
      }
      
      // Remove item from localStorage using user-specific key
      const savedItemsKey = `jonbliss-saved-items-${currentUser.id}`;
      const currentSavedItems = JSON.parse(localStorage.getItem(savedItemsKey) || '[]');
      const updatedSavedItems = currentSavedItems.filter(item => item.id !== itemId);
      localStorage.setItem(savedItemsKey, JSON.stringify(updatedSavedItems));
      
      // Dispatch event to notify other components
      window.dispatchEvent(new CustomEvent('saved-items-updated'));
      
      onSuccess('Item removed from saved items successfully!');
      setTimeout(() => onSuccess(''), 3000);
    } catch (error) {
      onError('Failed to remove item from saved items');
    }
  };

  return (
    <div className="bg-purple-50 rounded-lg p-6 mt-4 border border-purple-200">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-purple-900">Saved Items</h4>
          <p className="text-sm text-purple-600 mt-1">
            Your favorite products and wishlist items
          </p>
        </div>
        <button
          onClick={() => setShowSavedItems(!showSavedItems)}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
        >
          {showSavedItems ? 'Hide Saved' : 'View Saved'}
        </button>
      </div>
      
      {showSavedItems && (
        <div className="mt-4 pt-4 border-t border-purple-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedItems.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No saved items found</p>
                <p className="text-sm text-gray-400 mt-1">Items you save will appear here</p>
              </div>
            ) : (
              savedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 border border-purple-200">
                  <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="hidden items-center justify-center w-full h-full bg-gray-200 rounded-lg">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  </div>
                  <h5 className="font-medium text-gray-900 mb-1">{item.name}</h5>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">₦{item.price.toLocaleString()}</span>
                    <div className="flex space-x-2">
                      <button className="text-primary hover:text-red-orange text-sm font-medium">
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => removeFromSaved(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
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