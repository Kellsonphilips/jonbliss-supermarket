import React from 'react';
import AccountInfo from './AccountInfo';
import OrdersSection from './OrdersSection';
import SavedItemsSection from './SavedItemsSection';
import BillingSection from './BillingSection';
import PasswordSection from './PasswordSection';
import LogoutSection from './LogoutSection';

export default function ProfileContent({ 
  user, 
  orders, 
  savedItems, 
  error, 
  success, 
  onUserUpdate, 
  onError, 
  onSuccess 
}) {
  return (
    <div className="px-6 py-6">
      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">{success}</h3>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
          
          <AccountInfo 
            user={user}
            onUserUpdate={onUserUpdate}
            error={error}
            success={success}
            onError={onError}
            onSuccess={onSuccess}
          />

          <OrdersSection orders={orders} />

          <SavedItemsSection 
            savedItems={savedItems}
            onSuccess={onSuccess}
            onError={onError}
          />

          <BillingSection 
            user={user}
            onUserUpdate={onUserUpdate}
            error={error}
            success={success}
            onError={onError}
            onSuccess={onSuccess}
          />

          <div className="bg-gray-50 rounded-lg p-6 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Privacy Settings</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Control your privacy and data preferences
                </p>
              </div>
            </div>
          </div>

          <PasswordSection 
            error={error}
            success={success}
            onError={onError}
            onSuccess={onSuccess}
          />

          <LogoutSection />
        </div>
      </div>
    </div>
  );
} 